/*
 * Animated "prime flow field" background.
 *
 * Inspired by (and math from) https://brt.fyi/posts/prime-flow-field/ —
 * this is an original implementation written from the equations published
 * in that post, not a copy of that site's code.
 *
 * The idea: define a stream function
 *
 *     psi(x, y, t) = sum over primes p of
 *                    (1/p) * sin(p*K*x + wx_p*t) * cos(p*K*y + wy_p*t)
 *
 * and move particles along its curl, v = (d psi / dy, -d psi / dx).
 * Any velocity field built as the curl of a scalar is divergence-free,
 * so the flow is incompressible and the particles trace closed swirls
 * instead of bunching up. Prime wavenumbers keep the sum of waves from
 * visibly repeating, since it can only tile at the LCM of the periods.
 */
(function () {
  "use strict";

  var PRIMES = [2, 3, 5, 7, 11, 13];

  var SETTINGS = {
    waveScale: 1.25,        // K: higher = more, smaller vortices
    stepSize: 1.35,         // how far a particle moves per frame
    morphRate: 0.0045,      // how quickly the field evolves over time
    areaPerParticle: 5600,  // css px^2 of screen per particle
    particleCap: 2400,
    lifeSpan: [70, 220],    // frames a particle lives, [min, max]
    trailSeconds: 2,        // how long a stroke lingers before fading out fully
    strokeAlpha: 0.5,
    strokeWidth: 2,
    targetFps: 30,
    paletteDriftMinutes: 4, // one full hue rotation of the palette; 0 disables
    colors: [
      "#4fc3a1", "#3a9fbf", "#8888d8", "#d98e4a", "#c94f6d", "#cfd8dc"
    ],
    colorBias: [4, 4, 3, 3, 2, 1] // relative frequency of each colour
  };

  var canvas, ctx;
  var width, height, halfW, halfH, fieldScale;

  // Per-frame erase alpha derived from trailSeconds: a stroke's remaining
  // alpha after fps*seconds fade passes drops below one 8-bit level, i.e.
  // (1 - eraseAlpha)^(fps * seconds) = 1/255, at which point it's gone.
  var eraseAlpha =
    1 - Math.pow(1 / 255, 1 / (SETTINGS.targetFps * SETTINGS.trailSeconds));

  // The multiplicative fade stalls in 8-bit: once a * eraseAlpha < 0.5 the
  // rounded result equals a again, so pixels freeze a few levels above zero
  // and would leave permanent grey ghost paths. Each particle therefore
  // drags a virtual cleaner behind it: a ring buffer remembers its last
  // histLen positions, and every frame the oldest segment — which has just
  // finished its visible fade — is hard-erased exactly where it was drawn.
  // Residue never outlives its trail and nothing wipes across the screen.
  var histLen =
    Math.max(2, Math.round(SETTINGS.targetFps * SETTINGS.trailSeconds));
  var hx, hy;       // per-particle position history (shared ring buffers)
  var skipSeg;      // 1 = segment ending at this slot crosses a respawn
  var cursor = 0;   // ring-buffer write index, shared by all particles
  var px, py, age, life, tint;      // particle state (typed arrays)
  var count = 0;
  var clock = 0;
  var animating = false;
  var prefersStill =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Per-prime temporal drift and phase offsets, precomputed once. The exact
  // numbers are arbitrary; they just need to be mutually incommensurate so
  // the field never settles into a repeating pattern.
  var driftA = PRIMES.map(function (_, i) { return 0.16 + 0.06 * i; });
  var driftB = PRIMES.map(function (_, i) { return 0.11 + 0.05 * i; });
  var phaseA = PRIMES.map(function (p) { return (p * 2.399) % (2 * Math.PI); });
  var phaseB = PRIMES.map(function (p) { return (p * 1.618) % (2 * Math.PI); });

  // Flattened weighted palette-index list so a uniform pick honours colorBias.
  var colorPool = [];
  SETTINGS.colors.forEach(function (_, i) {
    for (var n = 0; n < (SETTINGS.colorBias[i] || 1); n++) colorPool.push(i);
  });

  // ---- palette: HSL shades + slow hue drift -------------------------------
  // Colours are kept as HSL so the whole palette can rotate its hue over
  // paletteDriftMinutes, and so each colour gets "hotter" (lighter, less
  // saturated) variants for fast-moving particles.
  function hexToHsl(hex) {
    var r = parseInt(hex.slice(1, 3), 16) / 255;
    var g = parseInt(hex.slice(3, 5), 16) / 255;
    var b = parseInt(hex.slice(5, 7), 16) / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    var l = (max + min) / 2;
    var s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    var h = 0;
    if (d > 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h: h, s: s * 100, l: l * 100 };
  }

  var baseHsl = SETTINGS.colors.map(hexToHsl);
  var HEAT = [0, 0.12, 0.28, 0.55]; // white-mix per speed bucket
  var shades = null;                // shades[colorIdx][bucket] -> css colour
  var shadeHue = -1;

  // Quadratic in pace so mid-speed strokes keep their base colour and only
  // the genuinely fast ones heat up toward white.
  function heatBucket(pace) {
    return (pace * pace * 3.999) | 0;
  }

  function currentHueShift() {
    var mins = SETTINGS.paletteDriftMinutes;
    if (!(mins > 0)) return 0;
    var period = mins * 60000;
    return (performance.now() % period) / period * 360;
  }

  function updateShades() {
    var hue = currentHueShift();
    if (shades && Math.abs(hue - shadeHue) < 1.5) return;
    shadeHue = hue;
    shades = baseHsl.map(function (c) {
      return HEAT.map(function (mix) {
        var h = (c.h + hue) % 360;
        var s = c.s * (1 - 0.45 * mix);
        var l = c.l + (96 - c.l) * mix;
        return "hsl(" + h.toFixed(1) + "," + s.toFixed(1) + "%," +
          l.toFixed(1) + "%)";
      });
    });
  }

  var vel = { x: 0, y: 0 };

  // v = (d psi/dy, -d psi/dx). Differentiating psi term by term, the p*K
  // factor from the chain rule cancels the 1/p amplitude up to K, which is
  // folded into stepSize; what remains per prime is:
  //   u = -sin(ax) * sin(ay),  v = -cos(ax) * cos(ay)
  function fieldAt(x, y, t) {
    var fx = (x - halfW) / fieldScale;
    var fy = (y - halfH) / fieldScale;
    var u = 0, w = 0;
    for (var i = 0; i < PRIMES.length; i++) {
      var f = PRIMES[i] * SETTINGS.waveScale;
      var ax = f * fx + driftA[i] * t + phaseA[i];
      var ay = f * fy + driftB[i] * t + phaseB[i];
      var amp = 1 / PRIMES[i];
      u -= amp * Math.sin(ax) * Math.sin(ay);
      w -= amp * Math.cos(ax) * Math.cos(ay);
    }
    vel.x = u;
    vel.y = w;
  }

  function respawn(i) {
    px[i] = Math.random() * width;
    py[i] = Math.random() * height;
    var span = SETTINGS.lifeSpan;
    life[i] = span[0] + Math.random() * (span[1] - span[0]);
    age[i] = Math.random() * life[i]; // stagger so respawns don't pulse
    tint[i] = colorPool[(Math.random() * colorPool.length) | 0];
    // the next history write starts a new life: the segment from the death
    // point to the spawn point was never drawn, so the cleaner must skip it
    skipSeg[i * histLen + (cursor + 1) % histLen] = 1;
  }

  function allocParticles() {
    count = Math.min(
      SETTINGS.particleCap,
      Math.max(300, Math.round((width * height) / SETTINGS.areaPerParticle))
    );
    px = new Float32Array(count);
    py = new Float32Array(count);
    age = new Float32Array(count);
    life = new Float32Array(count);
    tint = new Uint8Array(count);
    hx = new Float32Array(count * histLen);
    hy = new Float32Array(count * histLen);
    skipSeg = new Uint8Array(count * histLen);
    cursor = 0;
    for (var i = 0; i < count; i++) respawn(i);
  }

  // The canvas stays transparent (the page background shows through), and
  // trails are faded by erasing alpha with destination-out. Repainting a
  // translucent background colour instead would stall a few 8-bit levels
  // short of the backdrop and leave permanent grey ghosts.
  function fadeTrails() {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, " + eraseAlpha + ")";
    ctx.fillRect(0, 0, width, height);
  }

  function clearAll() {
    ctx.clearRect(0, 0, width, height);
  }

  // Erase every particle's oldest history segment in one batched
  // destination-out stroke, slightly wider than the drawn strokes so the
  // antialiased fringe goes too. By the time a segment is erased it has
  // already faded below visibility, so the erase itself can't be seen —
  // it only removes the stalled residue. Segments flagged in skipSeg
  // connect a death point to an unrelated spawn point and are skipped
  // (they were never drawn).
  function cleanTails() {
    var next = (cursor + 1) % histLen;
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1;
    ctx.lineWidth = SETTINGS.strokeWidth * 1.5 + 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (var i = 0; i < count; i++) {
      var a = i * histLen + cursor;
      var b = i * histLen + next;
      if (skipSeg[b]) { skipSeg[b] = 0; continue; }
      if (hx[a] === hx[b] && hy[a] === hy[b]) continue; // unwritten slot
      ctx.moveTo(hx[a], hy[a]);
      ctx.lineTo(hx[b], hy[b]);
    }
    ctx.stroke();
  }

  function fit() {
    // 1.5x DPR is plenty for soft glowing trails, and fill cost grows as dpr^2
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    halfW = width / 2;
    halfH = height / 2;
    fieldScale = Math.min(width, height) * 0.45;
    clearAll();
    allocParticles();
  }

  function advance() {
    fadeTrails();
    cleanTails();
    updateShades();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    for (var i = 0; i < count; i++) {
      fieldAt(px[i], py[i], clock);
      var nx = px[i] + vel.x * SETTINGS.stepSize;
      var ny = py[i] + vel.y * SETTINGS.stepSize;

      // ease in at birth and out near death so trails don't pop
      var envelope = Math.min(1, Math.min(age[i], life[i] - age[i]) / 20);
      var pace = Math.min(1, Math.hypot(vel.x, vel.y) / 1.7);
      // fast particles draw thicker, whiter strokes so vortex cores glow
      ctx.lineWidth = SETTINGS.strokeWidth * (0.65 + 0.85 * pace);
      ctx.globalAlpha = SETTINGS.strokeAlpha * envelope * (0.3 + 0.7 * pace);
      ctx.strokeStyle = shades[tint[i]][heatBucket(pace)];
      ctx.beginPath();
      ctx.moveTo(px[i], py[i]);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      px[i] = nx;
      py[i] = ny;
      hx[i * histLen + cursor] = nx;
      hy[i * histLen + cursor] = ny;
      age[i]++;
      if (age[i] >= life[i] ||
        nx < -24 || nx > width + 24 || ny < -24 || ny > height + 24) {
        respawn(i);
      }
    }
    ctx.globalAlpha = 1;
    cursor = (cursor + 1) % histLen;
    clock += SETTINGS.morphRate;
  }

  // One frozen frame of longer streamlines for prefers-reduced-motion.
  function drawStill() {
    clearAll();
    updateShades();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    for (var i = 0; i < count; i++) {
      var x = px[i], y = py[i];
      for (var s = 0; s < 80; s++) {
        fieldAt(x, y, 0);
        var nx = x + vel.x * SETTINGS.stepSize;
        var ny = y + vel.y * SETTINGS.stepSize;
        var pace = Math.min(1, Math.hypot(vel.x, vel.y) / 1.7);
        ctx.lineWidth = SETTINGS.strokeWidth * (0.65 + 0.85 * pace);
        ctx.globalAlpha = SETTINGS.strokeAlpha * 0.25;
        ctx.strokeStyle = shades[tint[i]][heatBucket(pace)];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        x = nx;
        y = ny;
        if (x < 0 || x > width || y < 0 || y > height) break;
      }
    }
    ctx.globalAlpha = 1;
  }

  // The field morphs slowly, so cap real work at targetFps even on
  // high-refresh displays.
  var lastTick = 0;
  var minFrameMs = 1000 / SETTINGS.targetFps;
  function tick(now) {
    if (!animating) return;
    requestAnimationFrame(tick);
    if (now - lastTick < minFrameMs) return;
    lastTick = now;
    advance();
  }

  function play() {
    if (prefersStill) { drawStill(); return; }
    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }

  function boot() {
    canvas = document.createElement("canvas");
    canvas.id = "flow-field-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    ctx = canvas.getContext("2d");
    if (!ctx) { canvas.remove(); return; }

    fit();
    play();

    // the stylesheet starts the canvas at opacity 0 with a transition, so
    // flipping it here fades the effect in instead of popping
    requestAnimationFrame(function () { canvas.style.opacity = "1"; });

    window.addEventListener("resize", function () {
      fit();
      if (prefersStill) drawStill();
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) animating = false;
      else play();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
