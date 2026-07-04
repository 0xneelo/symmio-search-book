# Symmiopedia v3 — Design Spec (source of truth)

Part A maps the operator's two-screen comp onto the live app; Part B is the operator's original v4 spec, **verbatim**. Where they conflict, Part B's visual values win — Part A only extends them to app surfaces the comp doesn't cover. Reference comp: `comp/field-manual-wikipedia.html` (render in a browser; it is a bundler-wrapped artifact export whose markup lives in escaped JS strings). The original spec + comp build-prompt are preserved in `comp/` for provenance.

## Part A — Application to the Search Book app

- The comp is two screens; the app is the whole public surface. The **portal** (Screen 1) becomes the public `/`, replacing the v2 cover as the public landing. The **article page** (Screen 2) is the template for every corpus page rendered by ReaderView.
- The article chrome (logo cell, personal bar, tab row, sidebar boxes, gray footer) is constant across all article pages; only the content column varies per page. The footer's "last edited" line uses the page's real updated date.
- Personal bar and tab row are cosmetic chrome: all dead links `preventDefault`. Tabs always show Article/Read selected. `[edit]` spans render (`showEditLinks` default true) but are dead.
- Sidebar boxes: Navigation (Main page, Contents, Random article, About Symmiopedia — wire "Random article" to a real random corpus page; drop entries with no app equivalent rather than leaving dead ones beyond the comp's chrome set), Ecosystem (the six protocols → their corpus pages; in-page anchors only where sections exist), Tools, Languages.
- **Search:** the portal bar and the 300×27 header box hit the app's existing search; results render as a "Search results" special page in wiki list register — blue title links, snippet lines, muted meta; colors/type strictly from Part B.
- **Ask / answer engine:** restyle as a wiki special page (reference-desk register). Answer body 14px/1.6 sans; sources as numbered references with `^` backlinks; voting controls as flat wiki-style links/buttons (no chroma beyond link blue); flagged-answer quarantine behavior unchanged.
- Field mapping (which corpus field feeds which anatomy element) lives in `design-mapping.md`.
- The hard rules (Part B §8) apply to **every** surface, including states the comp doesn't show (loading, empty, error): zero chroma, system fonts, ≤2px radii, no chrome shadows.

## Part B — Operator spec (v4, verbatim, 2026-07-04)

A faithful classic-encyclopedia (legacy Vector-era wiki) treatment of the ecosystem wiki: pure white content on a paper-gray canvas, blue links, serif headings — branded **Symmiopedia** (never the Wikipedia wordmark). The hero asset is a grayscale **six-piece puzzle globe** drawn entirely in SVG, labeled Vibe / Symmio / Carbon / Pear / Privex / Ivy.

### 1. Concept & tone

- Two screens in one page: a **portal main page** (globe + wordmark + one search bar, nothing else) and an **article page** ("Symmio ecosystem") with full wiki chrome.
- Copy is written in neutral encyclopedic register: bold subject in the lead, `[1]`-style footnotes, hatnote, `[edit]` links, one `[citation needed]`, one red link. Facts reuse the Field Manual (six-layer stack, epochs close 00:00 UTC, 34/30/22/14 revenue split).
- Fidelity over invention: every element should look like MediaWiki defaults, not a "redesign".

### 2. Color

Chrome (legacy-Vector palette)
- Canvas: `#f6f6f6` · content & portal: `#ffffff`
- Tab/content accent border: `#a7d7f9` · rules & box borders: `#a2a9b1` · light figure border: `#c8ccd1`
- Box fills (infobox, TOC, categories): `#f8f9fa` · table header: `#eaecf0`
- Text: `#202122` · muted/meta: `#54595d`
- Links: `#0645ad` · external: `#3366bb` · red (missing page): `#ba0000`
- Unselected tab fill: `linear-gradient(to top, #e8f0f6 0%, #ffffff 90%)`

Globe grays (light → dark)
- Pieces: `#ededed` (Symmio) `#dfdfdf` (Pear) `#d2d2d2` (Ivy) `#cdcdcd` `#c6c6c6` (Carbon) `#bdbdbd` `#b3b3b3` `#ababab` `#a2a2a2` `#9d9d9d` `#8f8f8f` `#7d7d7d` `#5f5f5f` (Vibe) `#565656` (Privex)
- Core/gaps: `#6e6e6e` · seam stroke: `#525252` · outer rim: `#8e8e8e`

### 3. Typography

- Headings & wordmark: `'Linux Libertine', Georgia, 'Times New Roman', serif` — h1 28.8px/normal, h2 22.4px/normal, both with 1px `#a2a9b1` bottom rule. Wordmark: 17px / ls 1.5px (sidebar), 36px / ls 4px (portal), all-caps SYMMIOPEDIA.
- UI & body: `Helvetica, Arial, sans-serif` — body 14px / 1.6; h3 16px bold; sidebar links 12px; personal bar 11.7px; infobox 12.3px; references 12.6px; footnote sup 11px; captions 11.7–11.9px.
- Globe labels: `'Times New Roman', Georgia, serif` bold, 42–63px, on curved `textPath`s.

### 4. Layout & shell

**Portal (main page)** — centered flex column on pure white: globe 228px → wordmark → tagline "The Open Ecosystem Encyclopedia" → search bar `min(480px, 92vw) × 46px` (1px `#a2a9b1`, 2px radius; flat `#f8f9fa` magnifier button, hover `#eaecf0`) → 12px hint line linking the featured article.

**Article** — CSS grid `172px | 1fr`, rows `auto | 1fr`:
- Logo cell: globe 118px + wordmark + tagline; whole cell clickable → main page.
- Header cell: right-aligned personal links ("Not logged in · Talk · Contributions · Create account · Log in"); tab row sitting on a single `#a7d7f9` line — selected tabs (Article, Read) white with side borders and a white bottom edge overlapping the line; unselected tabs use the blue-white gradient; ☆ watch tab; 300×27px search box.
- Sidebar: four link boxes — Navigation, Ecosystem (the six protocols → h3 anchors), Tools, Languages. Headings 12px `#54595d`, links 12px blue, underline on hover only.
- Content: white, 1px `#a7d7f9` border (no top/right), padding `18px 40px 40px 32px`. Below it, the gray footer ("last edited 4 July 2026, at 12:47 (UTC)" + license line + link row).

Article anatomy: h1 → siteSub → italic hatnote (indented 1.6em) → lead with infobox floated right (286px: bold caption, globe, caption, label/value table) → TOC (inline-block box, numbered entries, working `[hide]`) → sections: Overview, Architecture (floated 218px thumb figure — six stacked gray boxes TRADER→…→SETTLEMENT with ↓ arrows and caption), Member protocols (six h3s), Points and revenue (wikitable of the 34/30/22/14 split), See also (incl. one red link), References (numbered, `^` backlinks) → categories bar.

### 5. The puzzle globe (SVG recipe)

Defined once as `<g id="pglobe">` inside a 0×0 `<svg><defs>`, instanced with `<use href="#pglobe">` (logo, infobox, portal). ViewBox `0 0 640 672`; sphere center (320,320), r=289.

Paint order, inside a circular `clipPath`:
1. Core disc `#6e6e6e` (shows through seam gaps).
2. **Pieces**: adjacent quadratic-edged paths extended past the clip (the clip cuts the circle). Latitude seams are shallow downward-bowing quadratics at y = 150 / 286 / 430 / 548 (center bow +18–30px); longitude seams bow sideways and **stagger between rows**. Each piece is drawn twice: flat gray fill, then the same path filled with `pgSheen` — a bounding-box vertical gradient (white .42 → transparent → black .25) that gives every piece its pillowed, domed read.
3. **Seams**: the shared edges restroked 5.5px `#525252`, round caps, with `feDropShadow(dy 2.4, white .55)` = bevel highlight under every groove.
4. **Tabs/knobs**: per knob, a `#525252`-stroked circle (r 14–18) straddling the seam + an offset same-fill cover circle shifted ~5–6px into the owner piece, so only the protruding lobe keeps its outline.
5. **Sockets**: small white circles (one notching the silhouette at 12 o'clock, one on the cap seam).
6. **Lighting**: specular ellipse top-left (radial white .5→0 at ~(226,150)); blurred rim-light arcs (top-left arc `rgba(255,255,255,.6)` w10, bottom `rgba(255,255,255,.22)` w8, `feGaussianBlur 6`); full-sphere radial overlay `pgShade` (white .88 at 34%/26% → black .52 at edge); faint inner rim.
7. Outside the clip: 1px `#8e8e8e` rim, two soft radial ground-shadow ellipses.

**Labels** ride curved `textPath`s that follow the latitude bow — arching up in the upper hemisphere, down in the lower. Dark labels (`#3c3c3c`/`#464646`) on light pieces carry the white drop shadow (engraved); light labels (`#f0f0f0`/`#ececec`) on dark pieces carry a dark drop shadow. Sizes: Symmio 63 · Carbon 56 · Privex 52 · Ivy 48 · Vibe 46 · Pear 42.

### 6. Behavior

- Single `page` state (`'main'` default | `'article'`): portal search (Enter or button) and the hint link open the article; logo cell and sidebar "Main page" return to the portal; scroll resets on switch.
- TOC `[hide]`/`[show]` toggles its list.
- All dead chrome links `preventDefault` (no `#` jumps); anchor links (TOC, Ecosystem box, infobox members) target section ids.

### 7. Tweakable props

- `showEditLinks` (bool, default true) — the `[edit]` spans on every heading
- `showHatnote` (bool, default true)
- `tocCollapsed` (bool, default false) — seeds the TOC state

### 8. Do / don't

- **Do** keep the portal to globe + wordmark + search — no feature boxes, no stats.
- **Do** keep link styling exact: `#0645ad`, no underline at rest, underline on hover.
- **Do** keep all grays neutral (zero chroma) — the only color on the page is link blue and the `#a7d7f9` chrome line.
- **Don't** use the Wikipedia name, wordmark, or trademarked logo; the globe is Symmiopedia's own mark.
- **Don't** round corners (search bar's 2px is the ceiling), add shadows to chrome, or introduce accent colors.
- **Don't** let the globe labels break their latitude curvature — text must follow the sphere.

---

## Operator amendment — Answer page (2026-07-04, post-sign-off)

Operator-supplied comp: `comp/answer-page.html` (claude.ai artifact export; extracted
markup in `comp/answer-page-extracted.html`). Amends §8 for the reference-desk
answer surfaces only:

- **Loading state (new):** bordered service box — "service answer-engine" meta,
  Courier elapsed readout, `[cancel ×]`, bold 21.7px phase ticker (Scanning cited
  context → Matching passages → Ranking sources → Composing answer) with three
  blinking dots, indeterminate slide bar (34% `#cedff2` band), four shimmer
  skeleton lines (97/100/90/62%).
- **Routed answer panel:** `#cedff2` title bar ("Routed answer" + italic question +
  `[dismiss ×]`) over a `#f5faff` body with `#a3b0bf` border; serif 21px headline;
  dashed matched-chunk quote box; bordered source-key chip; numbered raw-URL
  citations (`#3366bb` + ↗); bold "Open the exact page ↗".
- **Rate row:** "RATE THIS ANSWER" label; solid buttons — Needs work
  (`#f8f9fa`, pressed `#b32424`) and Useful (`#3366cc`, pressed `#2a4b8d`);
  `✓ logged — thank you` in `#14866d`. 2px radius stays the ceiling.
- **Idle state:** dashed "No active question" box with example questions.
- **Sanctioned chroma additions** (answer surfaces only; mirrored in
  `web/tests/symmiopedia-fidelity.spec.ts`): `#cedff2`, `#a3b0bf`, `#3366cc`,
  `#2a4b8d`, `#b32424`, `#14866d` (`#f5faff` is within neutral tolerance).

Behavior is unchanged (quarantine parity, one-shot vote lock, dismiss guard,
thank-you countdown). The vote/dismiss contract and test selectors are preserved.
