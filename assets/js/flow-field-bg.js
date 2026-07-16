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
    areaPerParticle: 7500,  // css px^2 of screen per particle
    particleCap: 2400,
    lifeSpan: [70, 220],    // frames a particle lives, [min, max]
    trailFade: 0.08,        // backdrop alpha per frame (higher = shorter trails)
    strokeAlpha: 0.5,
    strokeWidth: 2,
    targetFps: 30,
    fallbackBg: "#252a34",  // minimal-mistakes dark skin background
    colors: [
      "#4fc3a1", "#3a9fbf", "#8888d8", "#d98e4a", "#c94f6d", "#cfd8dc"
    ],
    colorBias: [4, 4, 3, 3, 2, 1] // relative frequency of each colour
  };

  var canvas, ctx, bgColor;
  var width, height, halfW, halfH, fieldScale;
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

  // Flattened weighted colour list so a uniform pick honours colorBias.
  var colorPool = [];
  SETTINGS.colors.forEach(function (c, i) {
    for (var n = 0; n < (SETTINGS.colorBias[i] || 1); n++) colorPool.push(c);
  });

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
    tint[i] = (Math.random() * colorPool.length) | 0;
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
    for (var i = 0; i < count; i++) respawn(i);
  }

  function clearTo(alpha) {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = alpha;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
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
    clearTo(1);
    allocParticles();
  }

  function advance() {
    clearTo(SETTINGS.trailFade);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = SETTINGS.strokeWidth;
    ctx.lineCap = "round";

    for (var i = 0; i < count; i++) {
      fieldAt(px[i], py[i], clock);
      var nx = px[i] + vel.x * SETTINGS.stepSize;
      var ny = py[i] + vel.y * SETTINGS.stepSize;

      // ease in at birth and out near death so trails don't pop
      var envelope = Math.min(1, Math.min(age[i], life[i] - age[i]) / 20);
      var pace = Math.min(1, Math.hypot(vel.x, vel.y) / 1.7);
      ctx.globalAlpha = SETTINGS.strokeAlpha * envelope * (0.3 + 0.7 * pace);
      ctx.strokeStyle = colorPool[tint[i]];
      ctx.beginPath();
      ctx.moveTo(px[i], py[i]);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      px[i] = nx;
      py[i] = ny;
      age[i]++;
      if (age[i] >= life[i] ||
        nx < -24 || nx > width + 24 || ny < -24 || ny > height + 24) {
        respawn(i);
      }
    }
    ctx.globalAlpha = 1;
    clock += SETTINGS.morphRate;
  }

  // One frozen frame of longer streamlines for prefers-reduced-motion.
  function drawStill() {
    clearTo(1);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = SETTINGS.strokeWidth;
    ctx.lineCap = "round";
    for (var i = 0; i < count; i++) {
      var x = px[i], y = py[i];
      for (var s = 0; s < 80; s++) {
        fieldAt(x, y, 0);
        var nx = x + vel.x * SETTINGS.stepSize;
        var ny = y + vel.y * SETTINGS.stepSize;
        ctx.globalAlpha = SETTINGS.strokeAlpha * 0.25;
        ctx.strokeStyle = colorPool[tint[i]];
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

    // minimal-mistakes paints the page background on <html>; fall back past
    // any fully transparent computed values
    bgColor = [
      getComputedStyle(document.documentElement).backgroundColor,
      getComputedStyle(document.body).backgroundColor
    ].find(function (c) {
      return c && c !== "transparent" && c !== "rgba(0, 0, 0, 0)";
    }) || SETTINGS.fallbackBg;

    fit();
    play();

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
