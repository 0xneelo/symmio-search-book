# Design mapping — comp → app (Symmiopedia v3)

Comp reference: `comp/field-manual-wikipedia.html` (render it in a browser — see §Globe extraction). Views live in `web/src/app/views/`. Where this file and DESIGN.MD disagree, DESIGN.MD wins.

## Views

| Comp element | App target | Notes |
|---|---|---|
| Screen 1 — portal | public `/` (replaces the v2 cover as public landing) | globe 228 + wordmark + tagline + search + hint line; nothing else |
| Screen 2 — article | ReaderView (`/page/:slug`), template for all 800 SSG pages | full anatomy below; chrome constant, content column varies |
| — (not in comp) | Search results special page | wiki list register: blue title links, snippet lines, muted meta; colors/type strictly per DESIGN.MD |
| — (not in comp) | Ask / answer-engine special page | reference-desk register; voting + flagged-answer quarantine parity per `parity-checklist.md` |
| (none) | BrowseView, GlossaryView, FaqView, JourneyView, InsightsView | **OUT OF SCOPE** (SYN-363) — untouched, admin-gated |

Article chrome (logo cell, personal bar, tab row, sidebar boxes, footer) is constant across pages. Personal bar and tab row are cosmetic: dead links `preventDefault`; tabs always show Article/Read selected. The sidebar Ecosystem box links to the six protocols' corpus pages (anchor to in-page sections only where a page has them).

## Article anatomy ← corpus fields

| Anatomy element | Source | Fallback |
|---|---|---|
| h1 (serif 28.8px) | page title | — |
| siteSub | fixed: "From Symmiopedia, the open ecosystem encyclopedia" | — |
| hatnote (italic, indented) | page dek/summary field if present | omit |
| lead + footnote sups | first body section; sups only where inline citations exist | plain lead |
| infobox (286px right float) | page metadata: type, protocols/tags, source count, updated date, related links; globe as image | omit box if fewer than 3 real rows |
| TOC box + working [hide] | page headings (h2/h3) | omit if fewer than 3 sections |
| section h2/h3 + [edit] spans | body sections; [edit] renders (showEditLinks=true) but dead | — |
| references (12.6px, ^ backlinks) | page source citations, numbered in text order | omit section if none |
| categories bar | page tags/collections | omit if none |
| red links (#ba0000) | internal refs whose target slug doesn't resolve | — |
| [citation needed] | do NOT auto-generate — comp-only flourish | — |

**Degrade by omission, never invention:** an element without a real corpus source is dropped for that page.

## M3 checkpoint (mandatory)

Implement the anatomy on 5 representative pages first — suggested spread: a long authored reference page; a short thin page; a citation-heavy page; a page with no citations; a page with rich metadata. Post desktop + mobile shots on SYN-369, label `needs:operator`, WAIT for approval, then mass-regen all 800.

## Globe extraction (M1)

The comp embeds its markup in escaped JS strings (claude.ai artifact export with a bundler wrapper). **Do not hand-unescape the source.** Render `comp/field-manual-wikipedia.html` in a browser, then lift the live DOM: the 0×0 `<svg><defs>` block containing `<g id="pglobe">` plus its gradients/filters (`pgSheen`, `pgShade`, drop-shadow filters, clipPath). Check it into `web/src` as a component/asset; instance with `<use href="#pglobe">` at 118 (article logo cell), 228 (portal), infobox size. Verify the curved label textPaths survive extraction — the labels following the sphere's latitude bow are the fidelity-critical part (DESIGN.MD Part B §5).
