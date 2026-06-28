# Progress

## 2026-06-28 — Session 1 Dossier And Manifest

- Created the research dossier, source registry, decisions, gaps, style guide, question ledger, and seed questions.
- Built a 794-page manifest for the operator's 500-800 page target.
- Used Neelo's GitHub docs as the backbone: 188 source pages and 541 section expansions.
- Added 65 companion pages for Vibe public docs, Symmio protocol docs, local dashboard implementation, Linear research, and HIP-3 context.
- Added a static throwaway answer-engine prototype.
- Checkpoint commits: `edebeba`, `b892f9a`.

## 2026-06-28 — Generated Content Corpus

- Added `scripts/build-content-corpus.mjs`.
- Generated 794 source-traceable draft markdown files under `content/generated/`.
- Generated compact search indexes: `data/search-index.json` and `data/search-index.js`.
- Wired the static prototype to search the generated 794-entry index.
- Current corpus status:
  - 187 source pages imported from primary Neelo markdown.
  - 1 source page imported from generated Neelo HTML because markdown was excluded from the local clone.
  - 541 section pages extracted from primary Neelo H2 sections.
  - 63 companion pages source-mapped for later authoring.
  - 2 companion pages intentionally marked `needs-reconciliation`.

## 2026-06-28 — Navigation And Living-Docs Prototype

- Added `scripts/build-navigation-tree.mjs`.
- Generated `data/navigation-tree.json` and `data/navigation-tree.js` from the manifest plus search index.
- Expanded `index.html` from three prototype variants into Ask & search, Browse docs, Journeys, and Search insights.
- Browse docs now renders the full 794-page corpus grouped across 22 sections and 49 tracks.
- Search insights now reads local question, rating, and gap events; low-rated or unanswered answers become local gap rows.
- Improved static routing so high-signal curated pages stay in the search set alongside generated pages.

## 2026-06-28 — Authored Publication Candidates

- Added 12 hand-shaped pages under `content/authored/`.
- Added `scripts/build-authored-index.mjs`.
- Generated `data/authored-pages.json` and `data/authored-pages.js`.
- Wired the prototype to search authored pages before curated routes and generated draft pages.
- Covered initial manifesto/reference spine: bootstrap trilemma, intents/order books, Vibe discovery layer, intents/solvers, PartyA/PartyB, Vibe trade flow, revenue, volume, points, referral-depth gap, living-docs loop, and core glossary.

## 2026-06-28 — Exact Page Reader

- Added addressable page rendering with `index.html?page=<page-id>`.
- Extended `scripts/build-authored-index.mjs` so authored pages carry full Markdown bodies into `data/authored-pages.{json,js}`.
- Search answers, authored cards, high-signal routes, Browse docs rows, Journey chips, and related-page chips now open the local reader instead of raw file paths.
- The reader renders authored Markdown, generated-page previews, source keys, source URLs, related pages, indexed routes, and page-level feedback.
- Page feedback writes into the same local ratings and gaps queues used by Search insights.

## 2026-06-28 — Publication Quality Audit

- Added `scripts/build-quality-audit.mjs`.
- Generated `data/quality-audit.json` and `data/quality-audit.js`.
- The audit checks manifest target size, generated-file parity, search-index parity, registered source-key coverage, source URL coverage, authored bodies, duplicate ids, open operator blockers, and Discord/Lafa import status.
- Current audit result: 7 of 9 gates pass. The two open gates are expected parked requirements: operator inbox resolution and Discord/Lafa corpus import.
- Search insights now renders a Publication Audit panel with gate rows, source coverage, reader-routable page count, open operator items, and tracked gaps.

## 2026-06-28 — Dashboard View Reference Pages

- Added 7 hand-authored dashboard reference pages for Overview, My invites, My network, Volume, Tasks, FAQ, and Settings.
- Registered per-view dashboard source keys so view-specific claims cite the exact local component, not only the dashboard shell.
- Extended the question ledger with dashboard operational questions so Ask can route directly to the authored view pages.
- These pages satisfy the "every dashboard view" reference-scope requirement except for final revenue, Discord/Lafa FAQ, and referral-depth wording that remain parked in the operator inbox.

## 2026-06-28 — Neelo Vision Authored Pages

- Added 8 authored pages from Neelo's GitHub corpus: Proof of Value, Missing No Button, Listing Monopoly, Game Theory of Listings, Three Vibe Pillars, LP Profit and Dynamic Pricing, Token-Vault Perps Versus USDC Pools, and Referral Architecture as Market Formation.
- Expanded the authored layer from dashboard/reference coverage into the stronger 500-800 page compendium spine.
- Extended the question ledger with direct routes for Neelo-backed vision questions.
- Kept speculative/economic pages labeled for operator or editorial review where they intersect public revenue, referral, or product-claim boundaries.

## 2026-06-28 — Guided Journey Map

- Added `scripts/build-journey-map.mjs` and generated `data/journeys.json` plus `data/journeys.js`.
- Added 6 role-based journeys with 38 exact-page steps: new reader, trader, market creator, solver/LP, researcher, and dashboard user.
- Updated the prototype Journeys tab to render the generated map instead of the legacy small `answer-corpus.js` journey list.
- Extended the quality audit with a journey-route gate; current result is 8 of 10 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Seeded Question Routes

- Added `scripts/build-question-routes.mjs` and generated `data/question-routes.json` plus `data/question-routes.js` from `QUESTIONS.md`.
- Validated 29 answerable question routes across authored, generated, and curated prototype pages; 7 reconciliation questions remain gap-tracked.
- Updated the Ask flow to prefer seeded question routes before fuzzy corpus search and show the matched seed question with confidence.
- Extended the quality audit with a question-route gate; current result is 9 of 11 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Routed Glossary Layer

- Added `scripts/build-glossary.mjs` and generated `data/glossary.json` plus `data/glossary.js`.
- Validated 32 source-backed glossary terms across 10 categories, with every term resolving to registered source keys and exact page ids.
- Added a dedicated Glossary prototype view with term filtering, category chips, source chips, and exact-page links.
- Updated Ask routing to use glossary definitions after seeded question routes and before fuzzy corpus search.
- Extended the quality audit with a glossary-route gate; current result is 10 of 12 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Source Catalog Citations

- Added `scripts/build-source-catalog.mjs` and generated `data/source-catalog.json` plus `data/source-catalog.js` from `SOURCES.md`.
- Validated 51 registered source keys across 7 registry groups and 5 source kinds; 45 entries carry direct browser links to public URLs or repo-local files.
- Updated Ask answers and page-reader source chips to use the generated catalog for citation links and source-use labels instead of bare source keys only.
- Extended the quality audit with a source-catalog gate; current result is 11 of 13 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Reader Crosslink Map

- Added `scripts/build-crosslink-map.mjs` and generated `data/crosslinks.json` plus `data/crosslinks.js`.
- Validated 821 reader-routable pages with 820 previous links, 820 next links, 820 pages with related links, and 0 broken explicit related-page routes.
- Updated the page reader to use generated related pages and render Previous/Next controls.
- Extended the quality audit with a reader-crosslinks gate; current result is 12 of 14 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Local FAQ Seed Map

- Added `scripts/build-faq-map.mjs` and generated `data/faq.json` plus `data/faq.js` from `QUESTIONS.md`, `GAPS.md`, the validated question-route map, and the source catalog.
- Validated 36 local FAQ entries: 29 answerable routes, 7 reconciliation/gap entries, 10 categories, 0 missing page ids, and 0 missing source keys.
- Added a dedicated FAQ prototype view with filtering, category chips, exact-page links, source chips, and "Ask this" actions.
- Extended the quality audit with a local FAQ route gate; current result is 13 of 15 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Living-Docs Gap Queue

- Added `scripts/build-gap-queue.mjs` and generated `data/gap-queue.json` plus `data/gap-queue.js` from `GAPS.md`, reconciliation questions, operator inbox items, and parked pages.
- Validated 11 prioritized gap items with 7 linked question signals, 4 operator-blocked signals, 2 parked page signals, 0 missing gap ids, 0 missing related page ids, and 0 missing source keys.
- Updated Search insights so "Where Docs Fall Short" renders the structured queue with priority, category, source chips, related page links, and live local low-rated/unanswered gaps.
- Extended the quality audit with a gap-queue gate; current result is 14 of 16 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Answer Retrieval Chunks

- Added `scripts/build-answer-chunks.mjs` and generated `data/answer-chunks.json` plus `data/answer-chunks.js` across the current reader corpus.
- Validated 839 pages, 1,384 deterministic chunks, 38 used source keys, 0 pages missing chunks, 0 duplicate chunk ids, and 0 unknown source keys.
- Updated the Ask flow so seeded question routes and glossary definitions still win, then chunk-level matching routes into exact pages before broad page scoring.
- Extended Search insights and the quality audit with answer-chunk coverage; current result is 15 of 17 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Compendium Volume Map

- Added `scripts/build-volume-map.mjs` and generated `data/volume-map.json` plus `data/volume-map.js` over the current reader-routable corpus.
- Validated 8 volumes, 55 chapters, 794 generated manifest pages inside the 500-800 target, and 821 reader pages assigned exactly once.
- Added Compendium Volumes to Browse so the corpus has book-scale structure before final platform selection.
- Extended Search insights and the quality audit with volume-map coverage; current result is 16 of 18 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Authored Volume Overviews

- Added 8 source-cited authored overview pages under `content/authored/compendium/`, one for each compendium volume.
- Extended authored page metadata with `volumeId` so generated maps can attach each overview to the right book part.
- Regenerated authored index, crosslinks, answer chunks, volume map, and quality audit: 35 authored pages, 829 reader-routable pages, 1,400 answer chunks, and 8 audited volume overview routes.
- Updated Browse volume cards to expose an exact-page "Open overview" action; current audit result remains 16 of 18 gates passing, with only parked operator and Discord/Lafa gates open.

## Still Open

- Full editorial rewrite into final publication pages.
- Discord/Lafa FAQ import after operator provides export.
- Revenue disclosure boundary.
- Referral-depth public stance.
- Production docs platform/repository decision.
- Deployed/preview production docs site.
