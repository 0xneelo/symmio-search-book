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

## 2026-06-28 — Requirement Coverage Map

- Added `scripts/build-requirement-map.mjs` and generated `data/requirement-map.json` plus `data/requirement-map.js` from the original definition-of-done requirements and current local artifacts.
- Validated 16 completion requirements: 6 complete, 4 partial, 5 parked behind operator inbox decisions, and 1 missing final report/deploy artifact.
- Updated Search insights with a Completion Requirements console showing status, evidence, source spec references, blockers, and next actions for every requirement.
- Extended the quality audit with a requirement-map gate; current result is 17 of 19 gates passing, with only parked operator and Discord/Lafa gates open.

## 2026-06-28 — Neelo Market-Architecture Thesis Pages

- Added 8 authored Neelo-backed thesis pages covering the market-creation gap, autonomous market creation, four market transitions, solver-owned market making, Z-score maturation, hybrid settlement/solver architecture, funding as balancing, and the lifecycle gap as product surface.
- Expanded the authored manifesto layer from 9 to 17 pages and the total authored layer from 35 to 43 pages.
- Regenerated authored pages, reader crosslinks, answer chunks, volume map, requirement map, and quality audit: 837 reader-routable pages, 1,414 answer chunks, 66 chapters, and audit 17 of 19 gates passing.
- Kept funding and other implementation-sensitive claims labeled for operator review where they need current Vibe/Symmio reconciliation before publication.

## 2026-06-28 — Required Source Ingestion Coverage

- Logged missing Vibe Trading Notion access in `_specs/app-docs/OPERATOR-INBOX.md` and added `G-011` for the missing Notion source family.
- Added `scripts/build-source-ingestion-map.mjs` and generated `data/source-ingestion.json` plus `data/source-ingestion.js` from the spec-required source families and current `SOURCES.md`.
- Validated 16 required source families: 7 complete, 5 partial, 2 parked, and 2 missing. Notion and Discord remain parked; symm-io GitHub and SuperFlow/SSHE remain missing.
- Updated Search insights with a Source Ingestion console and tightened requirement coverage so source traceability is not marked complete while required source families are still unmined.
- Extended the quality audit with a required-source ingestion gate; current result is 16 of 20 gates passing, with source ingestion, operator inbox, and Discord/Lafa gates still open.

## 2026-06-28 — Linear Source Coverage Pass

- Verified the spec-named Synchronicity issues through the Linear MCP, including comments where present, for FAQ, calculators, volume aggregation, revenue odometer, Phase B economics, referral rollout, and deploy readiness.
- Registered the missing Linear source keys in `SOURCES.md`: `syn-56`, `syn-73`, `syn-98`, `syn-163`, `syn-192`, `syn-201`, `syn-204`, and `syn-205`.
- Updated the source-ingestion expected set to include `syn-172`, so the already-cited 15-level rollout issue is counted in the Linear source family.
- The 794-page Neelo-backed manifest remains the scale baseline; this pass improves source defensibility rather than changing page count.

## 2026-06-28 — Public Source Family Expansion

- Verified official public source URLs for Symmio Foundation docs, Symmio options docs, SYMM-IO GitHub repositories, and Goldsky subgraph/GraphQL docs.
- Registered the new public source keys in `SOURCES.md` and narrowed `G-005`, `G-007`, and `G-008` so the remaining gaps describe what is still unsourced or unauthored.
- Kept SuperFlow/SSHE and the exact original Symmio whitepaper open because this pass did not find strong primary-source evidence for those source families.

## 2026-06-28 — Competitive Sweep Batch 01 And 500-800 Target Lock

- Updated the app-docs spec package so the mission, launch prompt, research gate, implementation gate, and README all require a 500-800 page compendium instead of the older 100-page floor.
- Added `scripts/build-competitive-sweep.mjs` and generated `data/competitive-sweep.json` plus `data/competitive-sweep.js`.
- Integrated the five returned official-docs explorer batches: 50 target docs across 25 lanes, 49 verified official docs, 1 unverified access gap for Opyn, 5 completed explorer batches, and 25 lane reviews.
- Registered `competitive-sweep-batch-01` in `SOURCES.md`, wired it into source ingestion, and added quality-audit coverage so the benchmark is tracked without claiming the full sweep/final synthesis is complete.

## 2026-06-28 — Competitive Docs Synthesis Page

- Logged `OPERATOR-INBOX #8` for the Opyn official docs access/exclusion decision after the official source remained unavailable through the available web path.
- Added the authored page `authored-competitive-docs-benchmark`, synthesizing the returned official-docs benchmark into concrete Vibe x Symmio documentation requirements: job-first routing, AI-readable source trust, risk architecture, data lineage, and visible living-docs loops.
- Registered `competitive-sweep-synthesis` in `SOURCES.md` and added a direct question route for "What should Vibe x Symmio borrow from the best docs?"
- Narrowed `G-002` so the remaining competitive gap is the Opyn official-source decision, not the synthesis page itself.

## 2026-06-28 — Options Intent Lifecycle Page

- Verified that the registered Symmio options overview/technical URLs had moved, then updated `SOURCES.md` to the current official Symmio Options v0.2.1 index, Diamond, facet, PartyA/PartyB open-close, and Instant Layer pages.
- Added `authored-options-intent-lifecycle`, documenting PartyA open intents, PartyB lock/fill/partial-fill behavior, close intents, Diamond/facet boundaries, and instant-mode execution surfaces.
- Moved "How do Vibe options use Symmio settlement?" from reconciliation to an answerable route while keeping exact Vibe vault-backed inventory exposure semantics parked under `G-008`.
- Narrowed `G-008` so the remaining gap is product-owner confirmation for Vibe-specific vault source, coverage rules, and LP exposure visibility.

## 2026-06-28 — Neelo Vision Authoring Batch

- Added six authored Neelo-backed manifesto pages: the market assembly line, order books as the graduation layer, the end of narrative-based listings, liquidity as trader experience, the last primitive, and token-margined reflexivity risk.
- Added six direct question routes so Ask can answer market-structure and risk-theory questions from authored pages instead of only fuzzy matching generated drafts.
- Narrowed `G-002A` to reflect that the Neelo authored spine has grown, while most of the 794-page corpus still needs Session 2 editing before publication.
- Kept SSHE-specific mechanics under owner/source review because `OPERATOR-INBOX #7` remains open.

## 2026-06-28 — Part II Thesis Authored Pages

- Added five authored pages for the `02` Part II thesis: information validation crisis, universal issuance needing derivatives, why derivatives matter, perpetual protocol design space, and economic clarity for permissionless perps.
- Added five direct question routes so Ask can answer core thesis questions before falling back to fuzzy generated-page retrieval.
- Kept exact Vibe economics/risk-waterfall claims under owner review where the Neelo value-framework source intersects unresolved revenue and product decisions.
- Narrowed `G-002A` again to show the authored spine now covers more of the thesis, while the full 794-page corpus still needs publication editing.

## 2026-06-28 — Inside Symmio Protocol Authored Pages

- Added four authored protocol-reference pages: Symmio clearing-house layer, bilateral intent lifecycle, solver event monitoring, and collateral/margin/CVA.
- Added four direct question routes so Ask can answer core Symmio mechanics from publication-candidate pages instead of generated companion drafts.
- Kept isolation, cross-margin, capital-efficiency, and Vibe-specific vault accounting claims out of final prose unless the registered primary sources support them.
- Used official Symmio docs for the clearing-house model, PartyA/PartyB lifecycle, solver quote monitoring, collateral allocation, and current collateral formula.

## Still Open

- Full editorial rewrite into final publication pages.
- Vibe Trading Notion export or read access.
- Discord/Lafa FAQ import after operator provides export.
- Opyn official-doc access, replacement, or exclusion decision for the competitive sweep.
- Vibe-specific covered-call/vault inventory example and LP exposure semantics.
- Revenue disclosure boundary.
- Referral-depth public stance.
- Production docs platform/repository decision.
- Deployed/preview production docs site.
