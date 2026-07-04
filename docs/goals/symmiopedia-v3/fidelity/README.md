# Symmiopedia v3 — Design-fidelity packet (SYN-371)

Evidence for the operator sign-off gate (SYN-372). Shots are full-page captures
of the built app (`npm run web:build`, 800/800 prerendered) at desktop 1440px
and mobile 390px, taken at the branch head recorded on SYN-371.

## Surfaces

| Shot pair | Surface | Comp / spec anchor |
|---|---|---|
| `portal-*.png` | Public `/` — portal main page | comp Screen 1; DESIGN.MD Part B §4 "Portal" |
| `article-rich-*.png` | `?page=authored-ecosystem-synergy-map` — full anatomy (infobox, TOC, See also, References, categories) | comp Screen 2; Part B §4 "Article" + design-mapping.md anatomy table |
| `article-thin-*.png` | `?page=authored-vibe-android-pwa-install` — smallest corpus page; degradation by omission | design-mapping.md §"Degrade by omission" |
| `search-results-*.png` | `?search=` special page — wiki list register | Part A "Search" |
| `reference-desk-*.png` | `?ask=` special page — answer + flat voting | Part A "Ask / answer engine" |

## Hard rules (Part B §8) — how each is proven

1. **Zero chroma** outside `#0645ad` / `#3366bb` / `#ba0000` links + the
   `#a7d7f9` chrome line — automated: `web/tests/symmiopedia-fidelity.spec.ts`
   scans every element's computed color/background/border on all four public
   surfaces (near-gray tolerance for the legacy-Vector neutrals); visible in
   every shot.
2. **System fonts only, no webfont loads** — automated: the same spec asserts
   zero font-file network requests per route. The v2 Poppins/Space Mono
   fontsource CSS loads only behind `?admin=1` (main.tsx).
3. **≤2px radii** — automated per element; the 2px search-bar ceiling is the
   only rounding (portal + header + results bars).
4. **No shadows on chrome** — automated per element (`box-shadow: none`
   everywhere inside `.wiki`); the globe's bevel/ground shadows are SVG filter
   artwork per Part B §5, not chrome.
5. **No Wikipedia branding** — automated: document HTML contains no
   "wikipedia" (case-insensitive) on any public surface; the globe and
   SYMMIOPEDIA wordmark are the site's own mark.

## Globe

One `<g id="pglobe">` def lifted live from the operator comp (never
hand-unescaped), instanced at 118 (logo cell), 228 (portal), 234 (infobox);
curved label textPaths intact — see `portal-*.png` and the infobox in
`article-rich-desktop.png`.

## Behavior parity

Voting (one-shot lock, dismiss-guard, thank-you countdown), flagged-answer
quarantine (service refusals render as refusals), search routing, `?page=`
deep links, and the admin gate are covered by the Playwright suite
(`field-manual*.spec.ts` + `symmiopedia-fidelity.spec.ts`) — run counts and
the exact head are recorded on SYN-371/SYN-372.

Regenerate: `docs/goals/symmiopedia-v3/fidelity/` shots via the preview server
(see SYN-371 comments) after `npm run web:build`.
