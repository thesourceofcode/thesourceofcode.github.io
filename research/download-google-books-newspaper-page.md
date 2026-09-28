# Downloading a page from Google Books newspaper archive (high quality)

How to save a specific page of a Google Books-hosted newspaper (e.g. *The Indian Express*,
6 Jul 1992) as a PDF at the same quality the browser viewer shows. Works for volumes where
`can_download_pdf` is `false` (no official PDF button) but the page is in full view.

Example used throughout: `id=i39lAAAAIBAJ`, page 13 (`pg=PA13`).

## TL;DR

1. Scrape the viewer HTML for the page's `sig` token, `tileres` resolution tiers, and
   `page_scanjob_coordinates`.
2. Quick path: append `&w=2048` to the page image URL → single PNG capped at ~1918x2500 (slightly soft).
3. Best path: drive the viewer with Playwright, sweep-scroll the whole page, collect the
   256px tile positions from the DOM, canvas-stitch, screenshot → PDF (native ~2355x3072 or more).

---

## 1. Confirm the volume is full-view and identify the scanjob coordinates

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

curl -s -A "$UA" "https://books.google.co.in/books?id=<ID>&jscmd=SearchWithinVolume2&q=<anyword>"
```

Returns JSON with matching page ids — proves full-view access (no login needed for these archives).

## 2. Get the signed page URL + tile metadata

```bash
curl -s -A "$UA" "https://books.google.co.in/books?id=<ID>&pg=PA<NN>&source=gbs_selected_pages&hl=en" -o bookpage.html
```

Inside `bookpage.html`, find the JSON block for your page (`{"pid":"PA13",...}`). It contains:

| Field | Use |
|---|---|
| `src` | page image URL incl. `sig=...` token (works from curl) |
| `h`, `w` | full scan dimensions |
| `additional_info.[NewspaperJSONPageInfo].tileres` | resolution tiers `[{"h":1280,"w":981,"z":0},{"h":2048,...,"z":2},{"h":3072,...,"z":4},{"h":4352,...,"z":6}]` |
| `page_scanjob_coordinates` `{x,y}` | **tile URLs use `pg=x%2Cy`, NOT `pg=PA13`** |
| volume JSON `[NewspaperJSONVolumeInfo].res_h` | the tier heights again |

The same `sig` token works for every zoom/tile request of that page.

## 3. Quick method (single image, decent but capped)

```bash
curl -s -A "$UA" -e "https://books.google.co.in/books?id=<ID>&pg=PA<NN>" \
  "https://books.google.co.in/books/content?id=<ID>&pg=PA<NN>&img=1&zoom=3&hl=en&w=2048&sig=<SIG>" \
  -o page.png

sips -s format pdf page.png --out page.pdf
```

Notes:
- `&w=N` raises resolution but the server caps around **1918x2500** no matter how large N is.
- `zoom=` alone (0..6) only changes between small fixed renditions; the big win is `&w=`.
- Tiles may be PNG or JPEG — check magic bytes, don't trust extensions.

## 4. Best method (tile stitching — true browser quality)

The browser renders the page from **256x256 tiles**:

```
https://books.google.co.in/books/content?id=<ID>&pg=<X>%2C<Y>&img=1&zoom=<Z>&hl=en&sig=<SIG>&tid=<N>
```

- `<X>,<Y>` = `page_scanjob_coordinates` (e.g. `pg=0%2C39226`)
- `<Z>` = tier from `tileres` (the viewer used tier 4 → 3072px-tall page; tier 6 exists server-side)
- `<N>` = tile index

**Do NOT guess the tid→position mapping.** It is grouped in 3x3 blocks with per-strip offsets
and the viewer skips some edge columns — empirical guessing produced shuffled tiles.
Instead let the viewer tell you the layout:

### 4a. Sweep-scroll the viewer and collect tile positions (Playwright)

Open `https://books.google.co.in/books?id=<ID>&pg=PA<NN>&source=gbs_selected_pages&hl=en` then run:

```js
async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const scroller = document.querySelector('.overflow-scrolling');
  // Anchor to the ANCESTOR of a known tile img for YOUR scanjob coords — do NOT find the
  // page div by scrollWidth/Height equality: sibling pages in the scroll strip can have
  // same-sized divs, and width can be off by 1px from tileres (both caused silent 0-tile runs).
  const t0 = document.querySelector('img[src*="<X>%2C<Y>"][src*="tid="]');
  let pageDiv = t0.parentElement;
  while (pageDiv && !(pageDiv.scrollHeight >= 3070 && pageDiv.scrollHeight <= 3075 &&
        pageDiv.clientHeight === pageDiv.scrollHeight && pageDiv.clientWidth > 1500))
    pageDiv = pageDiv.parentElement;
  const sr = scroller.getBoundingClientRect(), pr = pageDiv.getBoundingClientRect();
  const pageTop = pr.top - sr.top + scroller.scrollTop;
  const pageLeft = pr.left - sr.left + scroller.scrollLeft;
  const map = {};
  const collect = () => {
    Array.from(pageDiv.querySelectorAll('img[src*="tid="]')).forEach(im => {
      const tid = +(im.src.match(/tid=(\d+)/) || [])[1];
      map[tid] = { l: parseFloat(im.style.left) || 0, t: parseFloat(im.style.top) || 0 };
    });
  };
  const maxL = scroller.scrollWidth - scroller.clientWidth;   // IMPORTANT: sweep ALL the way right
  for (let top = pageTop - 300; top < pageTop + 3072 + 300; top += 400) {
    for (let left = 0; left <= maxL; left += 400) {
      scroller.scrollTop = Math.max(0, Math.min(top, scroller.scrollHeight - scroller.clientHeight));
      scroller.scrollLeft = left;
      await sleep(650);
      collect();
    }
  }
  window.__tileMap = map;
  return Object.keys(map).length;
}
```

Gotchas that each cost a re-run:
- the first sweep only reached `scrollLeft=pageLeft+500` and silently missed the right-most
  tile column. Always sweep to `scrollWidth - clientWidth`.
- matching the page div by `scrollWidth === <tileres w>`: on one volume the rendered div was
  1px narrower (2255 vs 2256) → no match, and on another an equal-sized sibling page div was
  picked → collected 0 tiles despite 65 tile imgs being in the DOM. The tile-img-ancestor
  lookup above avoids both; tile imgs are filterable by your page's own `pg=<X>%2C<Y>` token.

### 4b. Stitch on a canvas (same page context, same-origin fetch works)

```js
async () => {
  const map = window.__tileMap;
  const base = 'https://books.google.co.in/books/content?id=<ID>&pg=<X>%2C<Y>&img=1&zoom=<Z>&hl=en&sig=<SIG>&tid=';
  const canvas = document.createElement('canvas');
  canvas.id = 'stitched';
  canvas.width = 2355; canvas.height = 3072;            // tileres w x h for the tier
  canvas.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;background:#fff';
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const [tid, v] of Object.entries(map)) {
    const r = await fetch(base + tid, { credentials: 'include' });
    const bmp = await createImageBitmap(await r.blob());
    ctx.drawImage(bmp, v.l, v.t);
  }
  document.body.appendChild(canvas);
  window.scrollTo(0, 0);
  return 'done';
}
```

### 4c. Screenshot the canvas → PNG → PDF

```
await page.locator('#stitched').screenshot({ path: 'page.png', scale: 'css', type: 'png' });
```

```bash
sips -s format pdf page.png --out page.pdf
```

A 2355x3072 canvas screenshots fine (CSS-pixel scale = exact device-independent capture).

## 5. Verify before shipping

Open the stitched PNG and check:
- right edge not truncated mid-word (missing tile column = sweep didn't go far enough right)
- no shuffled columns/rows (wrong tid→position assumption)
- no white seams or gray "image not available" boxes (those are 196x256 placeholders returned
  for invalid tids; edge stubs can also be e.g. 8x256 or 51x256)
- scroll the viewer before sweeping: if `document.body.innerText` still includes 'Loading'
  and collected tiles are 0, wait longer and re-check `img[src*="tid="]` counts

If you spot a hairline vertical seam (split/clipped glyphs, few-px vertical step): before
debugging your stitch, check whether it's in Google's source scan — old pages were sometimes
digitized in vertical strips. Fetch the server-side composite (quick method URL from §3) and
look at the same spot; if the seam is there too, your stitch is faithful and nothing is fixable.

## 6. Misc facts

- pid ↔ folio page number: in the volumes tested, `PA11` = printed page "11", `order` = number − 1
  (confirm in the viewer JSON page list: `{"pid":"PA14","order":13,"title":"14"}`). A pasted URL's
  `pg=` can point at a different page than the one you actually want — check `title`, and check
  the folio on the stitched image before converting.
- Native download disabled: volume JSON has `"can_download_pdf":false`.
- Older pale tiles vs sharp tiles: the viewer uses one tier (z=4 = 3072px tall for this paper);
  z=6 (4352px) exists server-side but its tid permutation doesn't follow the viewer's z=4
  scheme and the viewer never requests it — not worth it.
- ~9 cols x 12 rows of content tiles at z=4; the remaining scan margin is blank paper edge.
- `browser_run_code_unsafe` in the Playwright MCP has no `require`/dynamic import — write
  output files via page screenshots or fetch inside the page instead of Node fs.
- curl tricks: `-A <UA>` and `-e <referer>` headers; batch parallel with `&` + `wait` in
  groups of ~16; a signed URL keeps working for repeated fetches.
