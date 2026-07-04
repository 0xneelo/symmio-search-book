# Build prompt — "Symmiopedia" wiki (v4 Wikipedia treatment)

Copy-paste everything below to a coding/design agent.

---

You are building a two-screen encyclopedia-style wiki called **Symmiopedia** for the Symmio ecosystem. It must look like a classic MediaWiki/legacy-Vector site — pure white content, paper-gray canvas, blue links, serif headings — without ever using the Wikipedia name, wordmark, or logo. Deliver a single HTML page (plain HTML/CSS/JS preferred; no build step) containing both screens and a hand-drawn SVG "puzzle globe" logo.

## Screen 1 — Main page (default)
Pure white, everything centered in one column: the puzzle globe at 228px; the wordmark SYMMIOPEDIA (Linux Libertine/Georgia serif, 36px, 4px letter-spacing); tagline "The Open Ecosystem Encyclopedia" (13.5px, #54595d); a search bar min(480px, 92vw) × 46px (1px #a2a9b1 border, 2px radius, borderless input at 16px, flat #f8f9fa magnifier button); below it a 12px hint line: Try "Symmio ecosystem" — today's featured article. Nothing else. Enter, the button, or the hint link opens Screen 2.

## Screen 2 — Article: "Symmio ecosystem"
Grid: 172px left column + fluid content. Canvas #f6f6f6; content area white with a 1px #a7d7f9 border (none on top/right).
- Left column: clickable logo block (globe 118px + wordmark + tagline → back to main page), then sidebar link boxes: Navigation (Main page, Contents, Current events, Random article, About Symmiopedia, Contact us), Ecosystem (Vibe, Symmio, Carbon, Pear, Privex, Ivy → anchor to their sections), Tools, Languages. Box headings 12px #54595d; links 12px #0645ad, underline on hover only.
- Header: tiny personal bar right-aligned (Not logged in · Talk · Contributions · Create account · Log in, 11.7px); a tab row sitting on one #a7d7f9 line — Article/Talk left, Read/Edit/View history/☆ right, then a 300×27px search box. Selected tabs (Article, Read) are white with #a7d7f9 side borders and a white bottom edge covering the line; unselected tabs fill linear-gradient(to top, #e8f0f6, #ffffff).
- Article body (sans-serif 14px/1.6, #202122): h1 "Symmio ecosystem" (serif 28.8px, normal weight, 1px #a2a9b1 rule) → "From Symmiopedia, the open ecosystem encyclopedia" → italic hatnote → lead with footnote sups → floated-right infobox (286px, #f8f9fa, 1px #a2a9b1: bold caption, the globe, italic-free caption line, label/value table incl. the six member links and "Epoch close 00:00 UTC, daily") → boxed Contents TOC with numbered entries and a working [hide] toggle → sections with serif h2s + [edit] spans: Overview · Architecture (floated thumb figure: six stacked gray boxes TRADER → FRONTEND → REFERRAL GRAPH → SYMM CLEARING → SOLVER / LP → SETTLEMENT with ↓ arrows + caption) · Member protocols (h3 + 1–2 neutral sentences per product; give Privex a [citation needed]) · Points and revenue (wikitable: Protocol operations 34% / Network revenue pool 30% / Referrer share 22% / Trader rebate 14%; borders #a2a9b1, header #eaecf0) · See also (make "Solver auction" a #ba0000 red link) · References (5 numbered refs with ^ backlinks, 12.6px) → categories bar (#f8f9fa, pipe-separated links). Below the white area: gray footer "This page was last edited on 4 July 2026, at 12:47 (UTC)." + license line + Privacy policy / About / Disclaimers / Mobile view links.
- Links everywhere: #0645ad (external #3366bb), no underline at rest, underline on hover.

## The puzzle globe (draw it in SVG — no raster images)
Grayscale sphere of interlocking jigsaw pieces labeled Symmio, Vibe, Carbon, Pear, Privex, Ivy. Define it once (`<g id="pglobe">` in defs) and instance with `<use>` at all three sizes. ViewBox 640×672, sphere center (320,320), r 289. Layer order inside a circular clip:
1. Core disc #6e6e6e.
2. Pieces as adjacent paths whose edges are shallow quadratic curves: latitude seams at y = 150/286/430/548 bowing down 18–30px at center; longitude seams bow sideways and stagger between rows; extend shapes past the clip. Grays: Symmio #ededed, Vibe #5f5f5f, Carbon #c6c6c6, Pear #dfdfdf, Privex #565656, Ivy #d2d2d2, plus edge slivers/caps from #cdcdcd down to #7d7d7d. Draw each piece twice: flat fill, then the same path filled with a bounding-box vertical gradient (white 42% opacity → transparent → black 25%) for a pillowed 3D read.
3. Restroke the seams 5.5px #525252, round caps, with a white drop-shadow filter (dy≈2.4, 55%) as a bevel.
4. Puzzle tabs: #525252-stroked circles (r 14–18) straddling seams, each covered by an offset same-fill circle shifted ~5px into its owner piece so only the protruding lobe stays outlined. Two small white socket circles (one notching the silhouette at 12 o'clock).
5. Lighting: soft white specular ellipse top-left; blurred (σ6) rim-light arcs — top-left rgba(255,255,255,.6) w10, bottom rgba(255,255,255,.22) w8; whole-sphere radial overlay (white .88 at 34%/26% → black .52 at edge); 1px #8e8e8e rim; two soft ground-shadow ellipses beneath.
6. Labels: bold 'Times New Roman' on curved textPaths following the latitude bow (arch up in the upper hemisphere, down in the lower). Sizes 63/56/52/48/46/42 for Symmio/Carbon/Privex/Ivy/Vibe/Pear. Dark #3c3c3c text + white drop shadow on light pieces; #ececec text + dark drop shadow on dark pieces.

## Acceptance checklist
- Opens on the main page; search (Enter/button/hint) → article; logo or "Main page" → back; scroll resets on switch.
- TOC [hide]/[show] works; anchor links (TOC, Ecosystem box, infobox members) jump to sections; dead chrome links don't jump the page.
- Globe is one reusable SVG definition, crisp at 118/228/~250px, labels legible and following the sphere's curvature.
- Zero chroma outside link blue and the #a7d7f9 chrome line; no rounded corners beyond 2px; no drop shadows on chrome; system fonts only (no webfont loads).
- No Wikipedia branding anywhere.
