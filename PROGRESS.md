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

## 2026-06-28 — Listing Monopoly Authored Pages

- Added five authored Volume 03 manifesto pages from Neelo's Listing Monopoly corpus: lifecycle gates as market power, listing-plus-liquidity, the gap-filling perps protocol, partnership over venue war, and the Thielian listing-monopoly strategy.
- Added five direct question routes so Ask can answer listing-power strategy questions from authored pages before falling back to generated source chapters.
- Kept the distinction between source-backed strategic model and live product commitments: graduation thresholds, venue handoffs, and exact liquidity mechanics still need implementation/product review before becoming public promises.
- Strengthened the 500-800 page compendium's book spine without changing the 794-page manifest target.

## 2026-06-28 — Information And Trade Convergence Pages

- Added five authored Volume 04 manifesto pages from Neelo's Information/Trade Convergence corpus: continuous truth markets beyond Polymarket, intent OTC as long-tail verification, hybrid solver liquidity waterfall, Vibe as listing source of truth, and financialized rejection via the Thumbs Down.
- Added five direct question routes so Ask can answer information-market and negative-signal questions from authored pages before falling back to generated source chapters.
- Kept solver automation, vault inventory, fee-share, and graduation-threshold examples under operator/implementation review instead of turning source models into live product claims.
- Strengthened Volume 04, which still has a large generated source spine around token margin, funding, and information/trade architecture.

## 2026-06-28 — Token-Margined Percolator Critique Pages

- Added five authored Volume 04 manifesto pages from Neelo's Percolator critique: token-margined LP lose-lose, oracle circuit-breaker paradox, slab isolation and capital inefficiency, Percolator engineering versus economics, and USDC settlement/inventory separation.
- Added five direct question routes so Ask can answer token-margin risk questions from authored pages instead of only generated source chapters.
- Preserved the distinction between engineering quality and economic model: Percolator is treated as a serious technical proof-of-concept while its inverse low-cap economics remain the critique target.
- Kept Vibe-specific settlement, fee-share, vault, and defense-parameter claims under operator/implementation review.

## 2026-06-28 — Vibe Product Reference Authored Pages

- Added four authored Vibe product-reference pages: product overview, intent architecture, VibeCaps margin management, and Vibe points program.
- Re-routed the first high-traffic product questions from generated companion pages into authored pages.
- Preserved caveats around current market counts, onboarding-versus-Vibe points, referral-depth accounting, and product-specific risk guarantees.
- Captured the AMFQ/aMFQ terminology nuance: Automated Market for Quotes is legacy naming for the current intent-based model, and solvers can stream offers before capital commitment, but accepted requests still move into collateral lock, solver review, solver collateral deposit, and bilateral agreement.

## 2026-06-28 — Seed Route Quality Pass

- Routed the basic Symmio seed question to `authored-symmio-clearing-house-layer` instead of the generated companion page.
- Added `authored-dashboard-revenue-pulse` so the revenue-counter motion question no longer depends on the legacy curated corpus.
- Kept the pulse page source-limited to tracked local implementation behavior and the existing revenue disclosure caveat.
- Current seed route map now resolves all 46 answerable questions to authored pages.

## 2026-06-28 — Authored Volume Placement

- Updated the compendium volume map generator so authored manifesto and product-reference pages are assigned to their intended book volumes instead of defaulting almost entirely to Volume 01.
- Placed market-formation and Proof-of-Value pages in Volume 02, order-book/listing-power pages in Volume 03, token-margin/funding/risk pages in Volume 04, solver/protocol pages in Volume 05, product trading/risk pages in Volume 07, and dashboard/living-doc pages in Volume 08.
- Kept the 794-page generated manifest unchanged; this slice improves reader navigation and editor workload distribution over the same source-traceable corpus.

## 2026-06-28 — Audit Guardrails For Authored Coverage

- Added publication-audit gates for authored seed-question routes and authored volume spread.
- The audit now fails if answerable seed questions fall back to generated/curated pages or if any compendium volume has no authored pages.
- Current audit gate count is 20 of 23 passing, with failures still limited to parked source-ingestion, operator-inbox, and Discord requirements.

## 2026-06-28 — Vibe Trading Guide Authored Pages

- Registered seven official Vibe guide sources for simple trading, order types, TP/SL, OI/liquidity, collateral/margining, fees, and funding.
- Added six authored Volume 07 pages so user-facing trading, risk, liquidity, and fee questions resolve to publication-candidate pages instead of generated stubs.
- Added six direct question routes for practical trading questions while preserving the fee-page limitation: current official docs expose fee categories but not final numeric percentages.
- Kept fee percentages and broader public revenue disclosure under operator review through the existing revenue boundary blocker.

## 2026-06-28 — Neelo Vibe Pillars Authored Pages

- Verified the local Neelo docs clone against the public GitHub remote head `c6a6a78`.
- Added five authored manifesto pages from the Vibe Pillars and funding-model corpus: exploit resistance, bootstrap/counterparty formation, LP yield/capital efficiency, coupled design, and the funding defense hierarchy.
- Added five direct question routes so the Ask surface can explain the pillars and pre-ADL defense stack from authored pages.
- Placed the new pillar/funding pages in Volume 04 through explicit volume overrides instead of letting manifesto defaults send them to Volume 01.

## 2026-06-28 — Solver And LP Risk Authored Pages

- Added five authored protocol-reference pages from Neelo's DDQ solver-risk corpus: residual counterparty hedge-first execution, hedging failure modes, operational failure and Force Close, solver default and continuity, and the loss waterfall/profit-cap model.
- Added five direct question routes for solver and LP risk questions that previously depended on generated DDQ drafts.
- Kept all DDQ-derived production-sensitive mechanics under operator/implementation review, including Force Close timers, solver liquidation flags, exact compensation behavior, insurance allocations, and tail-event caps.

## 2026-06-28 — 500-800 Target Contract Hardening

- Confirmed the active specs and search-book artifacts already target a 500-800 page compendium, with the current manifest at 794 pages.
- Added a shared compendium-target helper so manifest generation, content-corpus generation, requirement mapping, volume mapping, navigation, and quality audit all read the same 500-800 bounds.
- Extended the quality audit payload and README verification so the generated data exposes the minimum, maximum, and in-range status rather than relying only on prose.

## 2026-06-28 — Product Reference Depth Batch

- Added four authored product-reference pages for the required revenue/volume/points layer: volume snapshot cadence, Barometer subgraph upgrade, points taxonomy, and TGE settlement multiplier.
- Routed four new practical questions to those pages so Ask can answer snapshot lag, Barometer status, points rails, and TGE settlement without falling back to generated local-code stubs.
- Preserved operator-review caveats around referral depth, final public revenue/source disclosure, exact Barometer endpoint mapping, and the final TGE settlement formula.

## 2026-06-28 — SYMM LP Case Study Authored Layer

- Added five authored Volume 05 reference pages from Neelo's SYMM LP case-study corpus: setup, unit economics, risk and edge cases, replication framework, and data guardrails.
- Routed five new LP/treasury questions to authored pages so Ask can answer the case-study mechanism without treating raw generated source imports as final copy.
- Kept the case framed as a proof of mechanism from one favorable-period data cut, with realized/unrealized PnL, sign conventions, drawdown gaps, and replication conditions explicit.

## 2026-06-28 — Referral Architecture Authored Layer

- Added five authored Volume 06 reference pages from Neelo's referral-program architecture corpus: identity and claim flow, rakeback policy, qualified issuance/anti-gaming, market-scoped referrals, and referral metrics/integrity.
- Routed five new referral architecture questions to authored pages while preserving the parked public referral-depth and historical-accounting decision.
- Framed referrals as market-formation infrastructure tied to listings, attribution, fee flow, and integrity controls rather than only a campaign-growth surface.

## 2026-06-28 — Referral Rewards Authored Layer

- Added five authored Volume 06 reference pages from Neelo's referral rewards corpus: referral points as economic state, points claim bridge and vesting, rewards packs and artifacts, tokenized-points-perps as a hypothetical composability scenario, and referral policy governance.
- Routed five new rewards/referral questions to authored pages while preserving unresolved referral depth, final TGE weighting, transferability, and pack/artifact policy under operator review.
- Kept tokenized points perps explicitly labeled as hypothetical and not current product policy.

## 2026-06-28 — Bootstrap And Z-Score Thesis Pages

- Added five authored Volume 02 manifesto pages from Neelo's perps categories, bootstrap trilemma, Vibe architecture, and Proof of Value corpus: perp design axes, static design failures, temporal separation of concerns, Z-score graduation criteria, and market price as verification.
- Routed five new thesis questions to authored pages so Ask can explain the mechanics beneath the broader bootstrap and Proof of Value pages.
- Kept Z-score graduation thresholds and live-dashboard status labeled for product confirmation rather than presenting source-model ranges as implemented product rules.

## 2026-06-28 — Funding Model Control Authored Layer

- Added five authored Volume 04 manifesto pages from Neelo's funding-model corpus: the funding model as a control problem, gradient-flow market balancing, utilization modes, dynamic pricing controls, and cross-market risk mutualization.
- Routed five new funding-system questions to authored pages so Ask can explain why funding, utilization, spreads, borrow, insurance, and ADL are one risk-control stack.
- Kept thresholds, rates, rebates, insurance eligibility, allocation caps, and live production status under operator and implementation review.

## 2026-06-28 — Proof Of Value Framework Authored Layer

- Added five authored Volume 02 manifesto pages from Neelo's Proof of Value framework: four-constituency value alignment, token-holder inventory alignment, trader/project value loop, hybrid-perps comparative advantage, and validation/sustainability.
- Routed five new value-framework questions to authored pages so Ask can explain why Proof of Value has to serve LPs, traders, projects, and ecosystem participants rather than only proving that a market can be listed.
- Kept revenue-share examples, launch-partner metrics, capital-efficiency estimates, and current vault economics under operator/accounting review.

## 2026-06-28 — Ode To OrderBooks Authored Layer

- Added five authored Volume 03 manifesto pages from Neelo's Ode to OrderBooks corpus: order books as the mature end state, order-book bootstrap limits, RFQ before order book, lifecycle hardening before listing, and programmatic market graduation.
- Routed five new order-book lifecycle questions to authored pages so Ask can explain why Vibe complements order-book venues instead of flattening the thesis into a venue war.
- Kept exact graduation formulas, venue routing, and SSHE-specific mechanics under operator/source review.

## 2026-06-28 — USDC Versus Token-Margin Authored Layer

- Added five authored Volume 04 manifesto pages from Neelo's USDC vs token-margined perps corpus: USDC LP backstop cascades, incentive-based attack risk, required USDC LP risk premium, token-inventory risk localization, and risk-adjusted capital efficiency.
- Routed five new collateral/risk questions to authored pages so Ask can explain why low-cap perp capital efficiency depends on who supplies capital, what unit settles claims, and who absorbs failure paths.
- Kept APR ranges, risk-premium ratios, efficiency multipliers, vault terms, and loss ordering under operator/accounting/implementation review.

## 2026-06-28 — Last Primitive Authored Layer

- Added five authored Volume 03 manifesto pages from Neelo's Fix Industry One Primitive corpus: information systems as validation infrastructure, issuance abundance as validation debt, spot-only market one-sidedness, tokens as information objects, and the self-correcting token market stack.
- Routed five new primitive-thesis questions to authored pages so Ask can explain why Vibe x Symmio is framed as missing market infrastructure rather than only a trading venue.
- Kept exact market-creation workflow, graduation policy, solver responsibilities, and vault exposure under operator/product review.

## 2026-06-28 — Game Theory Of Listings Authored Layer

- Added five authored Volume 03 manifesto pages from Neelo's Game Theory of Listings corpus: perceived-versus-actual listing interest, curation-cost distortions, zero-cost evolutionary discovery, crypto's market-access disconnect, and perps for the trenches.
- Routed five new listing-theory questions to authored pages so Ask can explain why curated venues optimize for perceived interest and why Vibe is positioned as an anti-bottleneck layer for derivative discovery.
- Kept exact token eligibility, listing workflow, solver support, vault exposure, and graduation policy under operator/product review.

## 2026-06-28 — Practical Listing Landscape Authored Layer

- Added five authored Volume 03 manifesto pages from Neelo's Listing Additional Notes annex: CLOB/vault long-tail limits, collateralized pool finite-tail limits, Percolator-wave settlement reality, technically-async versus economically-sync systems, and the long-tail perp model map.
- Routed five new model-comparison questions to authored pages so Ask can explain why CLOBs, pools, and Percolator-family systems each solve only part of permissionless long-tail liquidity.
- Kept exact third-party venue parameters and live market-state claims out of final guarantees pending current venue-source verification.

## 2026-06-28 — Technical Moat Authored Layer

- Added five authored manifesto pages from Neelo's technical deep-dive and competitive-analysis corpus: settlement state boundary, solver engine operating loop, bootstrap oracle risk tiers, position lifecycle state machine, and replication barriers/data moats.
- Routed five new technical/competitive questions to authored pages so Ask can explain how the hybrid system separates settlement from computation, how solver operations compose, and why the architecture is difficult to retrofit.
- Kept exact contract interfaces, oracle vendors and thresholds, solver policies, funding formulas, graduation parameters, and monopoly claims under operator/implementation review.

## 2026-06-28 — Official Symmio Operations Authored Layer

- Fetched current official Symmio markdown for funding rates, liquidations, settlement, settlement/profit realization, settlement costs, trading fees, solver role, hedging strategies, solving caveats, and the current solver-builder index.
- Registered specific official Symmio source keys for those pages, including current replacements for moved market/limit, trading-fee, and solver-builder URLs.
- Added five authored Volume 05 reference pages for Symmio funding epochs, cross-margin liquidations, settlement/profit realization, settlement costs and affiliate credits, and solver operations/hedging.
- Routed five new Symmio operations questions to authored pages while keeping fee percentages, live epoch values, liquidation thresholds, solver APR/history, and product-specific Vibe semantics under source or operator review.

## 2026-06-28 — Official Vibe Account And Safety Authored Layer

- Fetched current official Vibe markdown for account creation, deposits/withdrawals, My Account portfolio charts/data, account health/liquidations, and security/audits, plus the Sherlock audit-contest page linked by the security guide.
- Registered page-specific official Vibe source keys for account creation, deposits/withdrawals, portfolio/account data, account health/liquidations, security/audits, and the linked Sherlock contest instead of relying only on the broad Vibe docs index.
- Added five authored Volume 07 reference pages for account creation/login, deposits and withdrawals, portfolio/account data, account-health liquidations, and security/audits.
- Routed five new Vibe onboarding/account/risk/security questions to authored pages while keeping large-withdrawal thresholds, exact live contract inventory, token/staking audit details, and future security-roadmap claims source-limited or under operator review.

## 2026-06-28 — Official Vibe Utility And Market Access Authored Layer

- Fetched current official Vibe markdown for hotkeys, mobile PWA, TradingView controls, system visualization, and project listing terms. Two network-escalated attempts to fetch Add Token Info timed out during approval review, so that page is parked in operator inbox item #9 instead of guessed.
- Registered page-specific official Vibe source keys for hotkeys, mobile PWA, TradingView controls, system visualization, and project listing terms.
- Added five authored Volume 07 product-reference pages for keyboard operation, mobile installation and notifications, in-app chart controls, project-side system visualization, and project listing terms.
- Routed five new utility/access/market-creation questions to authored pages while keeping supply-loan ranges, project distribution percentages, custody/security-fund language, profit split, and legal terms under operator/accounting/legal review.

## 2026-06-28 — Official Vibe Rewards And Platform Authored Layer

- Fetched current official Vibe markdown for referral codes, referral program, rakeback/trading fees, trading program, and platform overview.
- Registered page-specific official Vibe source keys for referral-code flow, rakeback, trading-program points, and platform overview, while reusing the existing referral-program source key.
- Added five authored pages for referral-code onboarding, referral commission/pre-TGE points, referee rakeback tiers, trading-program leaderboard points, and Vibe platform overview.
- Routed five new rewards/platform questions to authored pages while keeping referral-depth accounting, TGE settlement, exact market counts, leverage ceilings, revenue-share language, and live deposit coverage under operator or publication-date review.

## 2026-06-28 — Neelo Funding Model Regime Authored Layer

- Promoted five under-authored pages from Neelo's funding-rate model into Volume 04: core liquidation/inventory invariant, state-variable map, regime ladder, full objective, and worked-example reading guide.
- Routed five new funding-model questions to authored pages so Ask can explain how netting, exposure, utilization, insurance, dynamic pricing, cross-market support, and ADL fit together.
- Kept example thresholds, APRs, rebates, insurance allocations, rate caps, ADL behavior, and live liquidation/loss policy under operator and implementation review.

## 2026-06-28 — Official Symmio Contract Builder Authored Layer

- Fetched current official Symmio markdown for contract architecture overview, interacting with contracts, frontend-builder introduction, audit reports, and the Symmio Options v0.2.1 index.
- Registered exact source keys for Symmio contract architecture, contract interactions, frontend builder, and audit reports instead of relying only on the broad docs index.
- Added five authored protocol-reference pages for Symmio's protocol contract surface, SubAccounts and Virtual Accounts, contract-level quote lifecycle, withdrawal/provider system, and frontend-builder/audit posture.
- Routed five new protocol/builder/security questions to authored pages while keeping deployed contract versions, Vibe-specific surface support, withdrawal-provider coverage, cooldowns, fees, and audit inventory under publication-date review.

## 2026-06-28 — Page-State Registry For Production Readiness

- Added a generated page-state registry that classifies every reader-routable page as `published`, `candidate`, `source-companion`, or `internal-draft`.
- Wired the registry into the quality audit so launch work can prove source companions stay out of public navigation and internal drafts stay out of answer synthesis.
- Kept all current authored pages in candidate/review state; no page is marked published until final editorial, source, and operator review.

## 2026-06-28 — Deterministic Answer-Engine Contract

- Added a human-readable answer-engine contract and a generated machine-readable contract for exact routes, gap/refusal behavior, citation coverage, retrieval eligibility, feedback events, and LLM readiness.
- Proved 171 seeded exact-route tests and 7 refusal tests against the current question ledger, FAQ map, answer chunks, page-state registry, source catalog, and gap queue.
- Kept `llmProductionReady` false until runtime citation validation, prompt-injection tests, operator-blocked source decisions, and Discord/Lafa import are done.

## 2026-06-28 — LLM RAG Contract And Adversarial Evals

- Added a provider-neutral LLM RAG API contract for request, retrieval context, chunk, response, citation, refusal, validation, and gap-creation semantics.
- Added 14 adversarial evaluation cases covering prompt injection, unsupported economics, secrets, referral-depth ambiguity, security overclaims, missing source families, internal-draft exclusion, financial advice, and fabricated citations.
- Kept `runtimeImplemented` and `llmProductionReady` false until the production model route, persistence, live citation validator, and executed eval harness exist.

## 2026-06-28 — Answer Validation Harness

- Added an executable answer-validation harness that checks cited answers against page state, source catalog, source links, retrieved chunks, and paragraph citation ids.
- Added refusal fixture validation for every LLM adversarial case, including gap events, operator item ids, and gap ids where applicable.
- Proved 26/26 validation fixtures pass: 12 cited-answer samples from the deterministic route golden set and 14 refusal samples from the adversarial eval contract.

## 2026-06-28 — Requirement Readiness Map Refresh

- Updated the source-ingestion map to track the Vibe Add Token Info source family as a parked requirement behind operator inbox item #9 rather than leaving it only in `GAPS.md`.
- Updated the definition-of-done map so deterministic answer routing, LLM RAG contract coverage, adversarial evals, and answer-validation fixtures are a dedicated complete requirement.
- Regenerated source-ingestion, requirement-map, and quality-audit data: 17 source-ingestion requirements with 6 parked, 18 completion requirements with 6 complete, and quality audit still 24/27 with failures limited to source-ingestion, operator-inbox, and Discord.

## 2026-06-28 — Neelo Proof Of Value Authored Layer

- Added five authored Volume 02 manifesto pages from Neelo's Proof of Value corpus: the shadow side of market-cap verification, leverage as truth amplification, solver refusal as oracle defense, protocol-owned solver as public option, and whale-vault risk tranching.
- Routed five new proof-of-value questions to authored pages so Ask can explain the cost-of-truth thesis without flattening market price into absolute truth or publishing unconfirmed solver/vault economics.
- Regenerated dependent maps: 195 authored pages, 176 exact answer routes, 183 FAQ entries with 176 answerable, 989 reader-routable pages, 1,714 answer chunks, and quality audit 24/27 with failures limited to source-ingestion, operator-inbox, and Discord.

## 2026-06-28 — Neelo DDQ Authored Reference Layer

- Added five authored Volume 05 reference pages from Neelo's DDQ corpus: architecture stack, netting-state risk transfer, token LP attractiveness, Force Close versus escape-mode recovery, and trader-compensation continuity.
- Routed five new DDQ questions to authored pages so Ask can answer partner/operator risk questions without sending readers to raw imported DDQ notes.
- Kept solver policy, Force Close timing/proofs, revenue share, partner traction, CVA percentages, buyout rules, insurance allocation, and live vault/LP terms under operator and implementation review.
- Regenerated dependent maps: 200 authored pages, 181 exact answer routes, 188 FAQ entries with 181 answerable, 994 reader-routable pages, 1,724 answer chunks, and quality audit 24/27 with failures limited to source-ingestion, operator-inbox, and Discord.

## 2026-06-28 — Neelo OrderBook Part II Authored Layer

- Added five authored Volume 03 manifesto pages from Neelo's Ode to OrderBooks Part II corpus: order-book admission bottleneck, Hyperliquid gap/lower-layer need, launchpad-to-order-book path, graduation data checklist, and house-of-all-finance proving ground.
- Routed five new market-structure questions to authored pages so Ask can distinguish mature order-book execution from pre-order-book market discovery.
- Kept HIP-3 handoff, destination venues, listing workflow, graduation thresholds, Z-score formulas, and automation claims under product/operator review.
- Regenerated dependent maps: 205 authored pages, 186 exact answer routes, 193 FAQ entries with 186 answerable, 999 reader-routable pages, 1,734 answer chunks, and quality audit 24/27 with failures limited to source-ingestion, operator-inbox, and Discord.

## 2026-06-28 — Answer Runtime Harness

- Added a provider-neutral CLI runtime that scans `data/answer-chunks.json`, applies exact-route and gap/refusal preflight, excludes internal drafts, assembles LLM-ready context, validates citations, and returns grounded cited extractive answers.
- Added OPERATOR-INBOX item #11 for the production LLM provider/model/API key and external-context approval needed before live model calls are enabled.
- Kept model-backed `--mode llm` fail-closed until the approved runtime env exists; `llmProductionReady` remains false while the runtime harness can now be tested locally.
- Regenerated gap queue, LLM RAG contract, answer-validation report, requirement map, and quality audit: 11 operator signals, runtime implemented, 14/14 adversarial cases, 26/26 validation fixtures, and quality audit 24/27 with failures limited to source-ingestion, operator-inbox, and Discord.

## 2026-06-28 — Living Docs Event Contract

- Added a generated living-docs event contract for question, rating, and gap events behind Search Insights.
- Validated 12/12 fixtures covering answered questions, useful and not-useful ratings, low-rated-answer gaps, page-feedback gaps, no-grounded-page gaps, operator-blocked revenue/referral-depth refusals, gap ids, and linked operator inbox ids.
- Wired the event contract into the requirement map and quality audit while keeping `datastoreImplemented` and `livingDocsProductionReady` false until the production platform/backend and Discord import are resolved.

## 2026-06-28 — Permissionless Perps Value Framework Layer

- Added five authored Volume 02 manifesto pages from Neelo's Proof of Value framework for solver-funded USDC, trader payout certainty, project token utility without stablecoin drag, the no-ponzi market-revenue test, and Thiel-style value creation versus capture.
- Routed five new Ask questions so the front door can explain the capital-structure and business-quality parts of the Vibe thesis without collapsing them into final economics promises.
- Kept capital-efficiency, revenue-share, partner-traction, solver-funding, and protocol-capture claims under operator/accounting review until current public disclosure boundaries are confirmed.

## 2026-06-28 — AMFQ Terminology Lock

- Added a standalone reference page that translates AMFQ/aMFQ into the current Intents vocabulary, so legacy architecture language remains searchable without creating a second canonical term.
- Added an Ask route for `What was AMFQ?` and locked the terminology in the style guide.
- Recorded the decision that current docs should use `Intent`, while AMFQ remains a legacy/source-translation term.

## 2026-06-28 — Information And Trade Convergence Thesis Layer

- Added five authored manifesto pages from Neelo's Information/Trade Convergence corpus: the convergence crossroads, synthetic-abundance verification crisis, market cap as costly signal, the Strait Gate market filter, and the global reputation protocol thesis.
- Routed five new Ask questions so the front door can explain the source's strongest vision layer without sending readers only to raw generated excerpts.
- Preserved the publication guardrails: market cap is evidence rather than perfect truth, Strait Gate thresholds are not live rules, and global reputation language is an endgame thesis rather than a current dominance claim.

## 2026-06-28 — Z-Score Market Infrastructure Strategy Layer

- Added five authored manifesto pages from Neelo's Perp Classes / Z-score corpus: the token-market valley of death, market maturation state map, order-book integration handshake, listing data product, and small-market wedge strategy.
- Routed five new Ask questions so the front door can answer market-infrastructure strategy questions from authored pages instead of raw extracted source sections.
- Kept sample Z-score bands, graduation thresholds, venue handoff mechanics, listing rules, and monopoly/last-mover claims under product/operator review.

## 2026-06-28 — Referral Operations And Measurement Reference Layer

- Added five authored Volume 06 reference pages from Neelo's referral-program corpus: access phasing, settlement security controls, market creation velocity, dashboard reporting standards, and rollout governance.
- Routed five new Ask questions so the front door can answer referral rollout, settlement, KPI, dashboard, and governance questions without relying only on raw source sections.
- Kept referral depth, code activation thresholds, transferability, signer models, partner tiers, reward caps, and live dashboard publication policy under operator/product/security review.

## Still Open

- Full editorial rewrite into final publication pages.
- Vibe Trading Notion export or read access.
- Discord/Lafa FAQ import after operator provides export.
- Opyn official-doc access, replacement, or exclusion decision for the competitive sweep.
- Vibe Add Token Info source fetch or canonical replacement.
- Vibe-specific covered-call/vault inventory example and LP exposure semantics.
- Revenue disclosure boundary.
- Referral-depth public stance.
- Production docs platform/repository decision.
- Deployed/preview production docs site.
