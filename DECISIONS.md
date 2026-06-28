# Decisions

## D-001: Start With A Session 1 Dossier Before Writing The Full Book

**Decision:** Build a research package, source registry, gaps list, questions list, and 500-800 page manifest before authoring full pages.

**Reason:** The prompt requires source-traceable long-form documentation. Current repo facts, public docs, and Linear issues contain contradictions that would become costly if baked into polished prose too early.

**Status:** Accepted for this phase.

## D-002: Use A Static Throwaway Prototype For The Front Door

**Decision:** Put a self-contained static prototype in `src/search-book/index.html` with local corpus data in `answer-corpus.js`.

**Reason:** The repo currently has a lightweight static frontend pattern and no docs framework dependency. This lets us test the answer-loop interaction without adding platform lock-in or touching dashboard code.

**Status:** Accepted for Session 1. Must be deleted or absorbed when a production platform is chosen.

## D-003: Keep Platform Choice Open Until Phase 0 Is Explicitly Resolved

**Decision:** Do not commit to Mintlify, Fumadocs, GitBook, or a custom docs app in this package.

**Reason:** The prompt calls out a build/buy decision. A docs platform choice needs owner approval on repo location, auth, analytics, answer-engine implementation, and update workflow.

**Status:** Pending operator decision.

## D-004: Treat Revenue Rates As Configurable Current Inputs

**Decision:** The docs may explain the current revenue formula and dashboard implementation, but rates must be labeled as configurable/current, not immutable protocol law.

**Reason:** Local code defaults to a platform-fee and referrer-share formula, while Linear issues describe Phase B revenue sources that are not fully implemented.

**Status:** Accepted.

## D-005: Treat Referral Depth As A Contradiction Until Reconciled

**Decision:** Do not publish a single final answer for referral depth without reconciliation. The dossier tracks 5-level and 15-level evidence separately.

**Reason:** Local code defaults/config support 5 or 15 levels, FAQ copy says 15, and rollout issues describe 15-level deployment/backfill. Some older comments and surfaces still say 5.

**Status:** Open gap.

## D-006: Use Vibe Docs Branding For This Prototype

**Decision:** The prototype follows the app-docs mockup direction: dark navy, Vibe pink, restrained editorial layout, mono metadata.

**Reason:** The search-book spec and mockup are Vibe-branded. The broader repo AGENTS guidance is Ivy-oriented, but this task is scoped to Vibe x Symmio docs.

**Status:** Accepted for prototype.

## D-007: Do Not Publish Secrets Or Private Operational Coordinates

**Decision:** Source summaries can mention data classes and implementation paths, but must not expose env names beyond already-public local code names, credentials, private endpoints, or operator-only tokens.

**Reason:** The final book is public/user-facing. Research notes must be safe to promote.

**Status:** Accepted.

## D-008: Treat Neelo's GitHub Docs As The Vision Backbone

**Decision:** Use `0xneelo/vibe_docs` as the primary vision source for the compendium's category thesis, market-formation narrative, listing-power framework, proof-of-value arc, funding model, referral architecture, and Vibe's role relative to order books.

**Reason:** The operator identified Neelo's GitHub docs as the strongest vision source. They also provide 17 collections and 188 generated source pages with enough internal section structure to support a 500-800 page compendium without filler.

**Status:** Accepted.

## D-009: Raise The Manifest Target To 500-800 Pages

**Decision:** The page manifest targets 500-800 pages, currently 794 entries: 188 Neelo source pages, 541 Neelo section expansions, and 65 companion product/protocol/local pages.

**Reason:** The operator raised the scope from 100 pages to a 500-800 page compendium. Section expansion keeps the scale source-traceable instead of inventing placeholder pages.

**Status:** Accepted.

## D-010: Generate A Transparent Draft Corpus Before Editorial Rewrite

**Decision:** Generate `content/generated/` from `page-manifest.json` as source-traceable draft material, not final publication copy.

**Reason:** The compendium needs hundreds of cited pages. The safest next step is to surface every mapped page as a concrete draft with status frontmatter, source URLs, and extracted primary-source content where available. This gives future agents and editors real material to restructure without pretending companion pages or unresolved contradictions are complete.

**Status:** Accepted for the build pipeline.

## D-011: Keep The Prototype Platform-Neutral But Exercise The Living-Docs Loop

**Decision:** Add generated navigation data and local question/rating/gap persistence to the static prototype before choosing the final docs platform.

**Reason:** The platform/repo/backend decision is parked with the operator, but the final product still needs an ask-first front door, browseable IA, ratings, question tracking, and a gaps queue. A deterministic static loop lets the team test those mechanics against the full 794-page corpus without pretending it is the final vector/Claude-backed production engine.

**Status:** Accepted for prototype iteration.

## D-012: Add An Authored Layer Separate From Generated Drafts

**Decision:** Keep `content/generated/` as source-traceable draft material and add `content/authored/` for hand-shaped publication candidates.

**Reason:** The compendium needs hundreds of mapped pages, but the final site also needs a clear editorial layer that argues, explains, cross-links, and labels unresolved claims. Separating authored pages from generated imports prevents raw source extracts from being mistaken for finished docs.

**Status:** Accepted for Session 2 authoring.

## D-013: Add A Static Exact-Page Reader Before Platform Selection

**Decision:** Keep the prototype static, but add addressable `?page=<id>` page rendering for authored and generated pages. Authored pages render full Markdown from the authored index; generated pages render indexed previews with status/source metadata.

**Reason:** The answer engine requirement is not just search. A reader must be routed to the exact page, see sources, rate usefulness, and continue to related material. This can be exercised locally without deciding Mintlify, Fumadocs, or a custom production app.

**Status:** Accepted for prototype iteration.

## D-014: Treat Publication Readiness As A Generated Audit

**Decision:** Add a deterministic `quality-audit` dataset that checks manifest size, generated-file parity, search-index parity, source-key and source-URL coverage, authored page bodies, duplicate ids, and unresolved operator/Discord gates.

**Reason:** The compendium is large enough that readiness cannot be judged by manual scanning. A generated audit keeps source traceability, parked blockers, and remaining editorial work visible without claiming the static prototype is final production.

**Status:** Accepted for QA and handoff.

## D-015: Document Dashboard Views As First-Class Reference Pages

**Decision:** Add authored reference pages for every dashboard view named in the spec: Overview, My invites, My network, Volume, Tasks, FAQ, Settings, plus the already covered hidden revenue route.

**Reason:** The final compendium must onboard users into the product, not only the protocol thesis. The dashboard is where revenue, volume, points, referral status, invite safety, and settings semantics become observable, so each view needs a directly routable page.

**Status:** Accepted for the authored layer.

## D-016: Promote Neelo Vision Pages Into The Authored Spine

**Decision:** Convert high-leverage Neelo GitHub draft material into hand-authored manifesto and reference pages before attempting a full editorial rewrite of all 794 mapped pages.

**Reason:** Neelo's corpus is the strongest vision source and already supplies the category thesis. Authored synthesis pages make that thesis searchable and routable now while generated section pages preserve the full 500-800 page map for later expansion.

**Status:** Accepted for the authored layer.

## D-017: Generate Guided Journeys From Exact Page IDs

**Decision:** Store role-based journeys as generated data with validated page ids, then render them in the static prototype.

**Reason:** The spec requires the docs to onboard readers into the system. Hardcoded journey copy in the prototype can drift from the authored/indexed corpus; a generated map lets the audit catch broken routes while keeping the final platform decision open.

**Status:** Accepted for prototype iteration.

## D-018: Prefer Seeded Question Routes Before Fuzzy Search

**Decision:** Generate `data/question-routes.*` from `QUESTIONS.md` and let the prototype answer engine check those routes before scoring the full corpus.

**Reason:** The living-docs loop requires tracked questions to shape retrieval. The current fuzzy search is useful, but explicit question-led routes are better evidence that known user questions resolve to exact pages and can be audited for drift.

**Status:** Accepted for prototype iteration.

## D-019: Keep Glossary Terms Generated And Audited

**Decision:** Generate `data/glossary.*` from a maintained glossary definition list, validate every term against registered source keys and exact page ids, and render it as a dedicated prototype view.

**Reason:** The spec and mockup require a glossary, but glossary copy easily drifts when it is embedded only in pages or UI. A generated glossary gives the answer engine concise definitions while the audit catches broken source/page routes.

**Status:** Accepted for prototype iteration.

## D-020: Render Citations From A Source Catalog

**Decision:** Generate `data/source-catalog.*` from `SOURCES.md`, audit it against used source keys, and render answer/page citations through that catalog.

**Reason:** The compendium requires every claim to be traceable to primary sources. Bare source-key chips are useful for debugging but not sufficient for readers; a source catalog keeps labels, links, groups, and use notes in one maintained place.

**Status:** Accepted for prototype iteration.

## D-021: Generate Reader Crosslinks

**Decision:** Generate `data/crosslinks.*` over authored and indexed pages, validate explicit related-page ids, and use it for reader related pages plus previous/next navigation.

**Reason:** The IA requires every page to carry cross-links and prev/next navigation. A generated map keeps the 821 reader-routable pages navigable without hand-maintaining links in the static prototype.

**Status:** Accepted for prototype iteration.

## D-022: Treat The FAQ As A Local Seed Until Discord Is Imported

**Decision:** Generate `data/faq.*` from the local question ledger, route it through exact page ids and registered source keys, and render unresolved questions as gaps instead of final answers.

**Reason:** The spec requires a Discord-seeded FAQ, but the Discord/Lafa corpus is parked in the operator inbox. A local FAQ seed makes current known questions visible and auditable without pretending community mining is complete.

**Status:** Accepted for prototype iteration; superseded by Discord-derived FAQ once operator inbox item `#2` is resolved.

## D-023: Generate The Living-Docs Gap Queue

**Decision:** Generate `data/gap-queue.*` from documented gaps, reconciliation questions, operator inbox items, and parked pages, then render it in Search insights.

**Reason:** The answer-engine spec says unanswered, low-rated, and repeated questions must become a prioritized improvement queue. A generated queue keeps that demand signal visible and validates that every parked thread still points at sources and exact pages.

**Status:** Accepted for prototype iteration.

## D-024: Generate Deterministic Answer Chunks Before Production Retrieval

**Decision:** Generate `data/answer-chunks.*` from authored pages, curated prototype pages, and generated markdown, then use those chunks as the static prototype's retrieval tier before broad page scoring.

**Reason:** The production answer engine still needs a platform/backend decision, embeddings, analytics, and update workflow. Deterministic local chunks let the team validate exact-page routing, source coverage, and chunk-level answer behavior now without pretending the static prototype is the final vector or Claude-backed system.

**Status:** Accepted for prototype iteration; production retrieval remains pending D-003/operator decision.

## D-025: Map The 500-800 Page Corpus Into Volumes

**Decision:** Generate `data/volume-map.*` as an audited compendium table of contents over authored and indexed pages, using eight volumes and exact page assignments.

**Reason:** A 794-page manifest is not enough on its own. The docs need book-scale structure so readers, editors, and later platform work can reason about the corpus as volumes and chapters while keeping every page assigned exactly once.

**Status:** Accepted for prototype iteration; final production IA can adapt this map after D-003 is resolved.

## D-026: Treat Volume Overviews As Authored Pages

**Decision:** Add one authored overview page per compendium volume and attach it to `data/volume-map.*` with a stable `volumeId`.

**Reason:** The 500-800 page corpus needs editorial entry points, not just generated section listings. Volume overviews give readers and editors a human-written orientation page for each book part while keeping exact-page routing, source keys, and audit coverage deterministic.

**Status:** Accepted for the authored layer.

## D-027: Track Definition-Of-Done Coverage As Data

**Decision:** Generate `data/requirement-map.*` from the original docs-compendium requirements and current artifacts, then render complete, partial, parked, and missing states in Search insights.

**Reason:** The operator raised the target to a 500-800 page compendium, but page count alone cannot prove the goal is done. A requirement map keeps deploy, Discord, final report, authored content, answer-engine, source, and operator-decision requirements visible without blocking parallel work.

**Status:** Accepted for completion tracking until the final report and production docs site supersede the prototype.

## D-028: Deepen The Neelo Market-Architecture Spine First

**Decision:** Convert more of Neelo's market-creation, solver, Z-score, transition, funding, and lifecycle-gap sections into authored manifesto pages before broadening into lower-level generated pages.

**Reason:** The operator identified Neelo's GitHub docs as the strongest vision source. The 794-page manifest already preserves breadth; the next quality gain is authored synthesis around the core market-architecture thesis so the compendium reads like a book rather than a generated source dump.

**Status:** Accepted for the authored layer.

## D-029: Track Required Source Families Separately From Registered Citations

**Decision:** Generate `data/source-ingestion.*` from the spec-required source families and current `SOURCES.md`, then feed it into the audit and requirement coverage.

**Reason:** A claim can be properly cited to registered sources while the overall research mandate still has unmined source families. The compendium needs both citation integrity and ingestion completeness, especially for parked sources such as Discord and the Vibe Trading Notion.

**Status:** Accepted for research completeness tracking.

## D-030: Treat Linear MCP Records As The Linear Source Authority

**Decision:** Register the required Synchronicity issue keys in `SOURCES.md` only after checking their current Linear issue records, and comments where available, through the Linear MCP.

**Reason:** The docs spec requires Linear descriptions and comments for revenue, volume, FAQ, calculators, referral depth, and deploy context. Local deployment notes are useful corroboration, but direct Linear records are the safer source authority for the issue titles, status, relationships, and implementation notes.

**Status:** Accepted for the Linear research source family.

## D-031: Register Only Confirmed Official Public Source Families

**Decision:** Treat official Symmio Foundation/options docs, official SYMM-IO GitHub repositories, and official Goldsky subgraph/GraphQL docs as registered source families. Keep SuperFlow/SSHE and the exact original Symmio whitepaper open until stronger primary-source evidence is found.

**Reason:** Source-ingestion coverage should improve when official source material is found, but the compendium should not close vague requirements by stretching generic links. The public source map can now cite Symmio options/foundation material and Goldsky mechanics while still showing the unresolved historical and SuperFlow gaps.

**Status:** Accepted for research completeness tracking.

## D-032: Track The Competitive Sweep As Batch Evidence Until Synthesized

**Decision:** Generate `data/competitive-sweep.*` as the source of truth for the official-docs benchmark: 50 target docs, 25 lanes, five returned explorer batches, 49 verified official docs, and one Opyn access gap. Do not mark the competitive sweep complete until the final sourced synthesis is written and the unverified official-doc target is resolved or explicitly excluded.

**Reason:** The prompt requires a broad competitive sweep, but the compendium should not pretend that a target list or returned notes equal a publication-ready synthesis. The batch artifact preserves real progress and exact gaps while keeping source ingestion honest.

**Status:** Accepted for research completeness tracking.

## D-033: Promote Competitive Benchmark Findings Into Authored Guidance

**Decision:** Add `authored-competitive-docs-benchmark` as the publication-candidate synthesis of the verified competitive docs batch, and register `competitive-sweep-synthesis` as a local source artifact. Keep Opyn parked behind `OPERATOR-INBOX #8` instead of using unofficial substitutes.

**Reason:** The compendium needs the benchmark to change the IA and answer-engine requirements, not just sit as raw research data. The authored page turns the sweep into concrete guidance while preserving source honesty around the one inaccessible official target.

**Status:** Accepted for the authored layer and research completeness tracking.

## D-034: Separate Options Lifecycle Mechanics From Vibe Vault Claims

**Decision:** Treat the current official Symmio Options v0.2.1 docs as sufficient to author `authored-options-intent-lifecycle`, but keep Vibe-specific vault-backed inventory, covered-call exposure, and LP visibility claims under `G-008` until confirmed by a product owner or stronger primary Vibe source.

**Reason:** The Symmio options pages prove the protocol lifecycle: PartyA open intents, PartyB lock/fill behavior, partial fills, close intents, Diamond/facet boundaries, and Instant Layer execution. They do not by themselves prove the exact public Vibe vault inventory product semantics.

**Status:** Accepted for the authored protocol-reference layer.

## D-035: Keep Deepening The Neelo Vision Spine While Blockers Are Parked

**Decision:** Add another authored Neelo-backed batch covering market assembly-line, CLOB graduation, anti-narrative listings, liquidity as trader experience, the last primitive, and token-margined reflexivity risk. Mark SSHE-specific mechanics for owner/source review where the source mentions them but the canonical SSHE source family remains unresolved.

**Reason:** The 500-800 page target is already mapped at corpus scale, but the strongest near-term quality gain is converting high-leverage Neelo source material into compact authored pages that the answer engine can route to directly.

**Status:** Accepted for the authored manifesto layer.

## D-036: Fill The Part II Thesis Before More Long-Tail Draft Expansion

**Decision:** Add authored pages for information validation, universal issuance, derivatives as market discipline, perpetual protocol design dimensions, and economic clarity before broadening further into lower-priority generated drafts.

**Reason:** The spec's Part II thesis is the conceptual bridge from "why tokenization" to "why permissionless derivatives for any token." These topics need authored, directly routed pages so the answer engine can explain the core argument without relying on raw generated imports.

**Status:** Accepted for the authored manifesto layer.

## D-037: Keep Inside Symmio Pages Source-Limited

**Decision:** Add protocol-reference pages for Symmio's clearing-house model, bilateral intent lifecycle, solver event monitoring, and collateral/margin/CVA from official Symmio docs. Do not publish broader isolation, cross-margin, capital-efficiency, or Vibe vault-accounting claims unless a primary source supports the exact product semantics.

**Reason:** The spec calls for an "inside Symmio" explanation, but these topics mix protocol vocabulary with product-specific margin and inventory claims. The current registered sources strongly support the clearing-house, PartyA/PartyB, solver-event, and collateral vocabulary; they do not by themselves close Vibe-specific margin-mode or vault-exposure questions.

**Status:** Accepted for the authored protocol-reference layer.

## D-038: Promote Basic Vibe Product Routes To Authored Pages

**Decision:** Add authored pages for Vibe product overview, intent architecture, VibeCaps margin management, and Vibe points program, then route the corresponding seed questions to authored pages instead of generated companion drafts.

**Reason:** The answer engine's first responses should not rely on source-mapped stubs for basic onboarding questions. Official Vibe docs are sufficient for these product basics, while the pages can still preserve caveats around live market counts, local onboarding points, referral depth, and exact risk guarantees.

**Status:** Accepted for the authored product-reference layer.

## D-039: Keep Seed Questions On Authored Routes Where Possible

**Decision:** Route all answerable seed questions to authored pages once a source-backed authored target exists. For the remaining legacy revenue-pulse route, add a narrow authored page from `server/pulse.js` rather than letting the ask-first front door depend on the old curated prototype corpus.

**Reason:** The generated and curated corpora remain useful fallback layers, but known user questions should prove exact-page editorial coverage. This makes answer quality easier to audit and makes the living-docs loop less dependent on fuzzy retrieval for first-contact questions.

**Status:** Accepted for the answer-engine prototype.

## D-040: Assign Authored Pages To Book Volumes Explicitly

**Decision:** Keep the generated 794-page manifest intact, but route authored manifesto and product-reference pages into the compendium volume where their subject belongs. Use an explicit authored-page override table in `build-volume-map.mjs` for high-signal authored pages whose section name alone is too broad.

**Reason:** The `manifesto` section is an editorial mode, not a book-volume destination. Letting every manifesto page fall into Volume 01 overloaded the orientation volume and hid the authored spine inside later volumes. Explicit placement makes the 500-800 page compendium navigable as a book, not only as a search index.

**Status:** Accepted for the compendium IA.

## D-041: Audit Authored Coverage As A First-Class Readiness Signal

**Decision:** Add publication-audit gates for answerable seed questions resolving to authored pages and authored pages being distributed across every compendium volume.

**Reason:** The compendium can pass generic route and volume-map checks while still relying on generated drafts for first-contact questions or hiding authored work in one book part. These two states directly affect answer quality and editorial readiness, so the audit should protect them explicitly.

**Status:** Accepted for publication-readiness tracking.

## D-042: Promote Vibe Trading Guides Into Authored Product Reference

**Decision:** Add authored Volume 07 pages for simple trade flow, order types, TP/SL, OI/liquidity, collateral/margining, and fees/funding using current official Vibe markdown sources.

**Reason:** The compendium target is 500-800 pages, but first-contact product questions still need concise authored answers. Official Vibe docs now support the practical guide layer strongly enough to route common trading questions to publication-candidate pages while keeping placeholder fee percentages and revenue disclosures under review.

**Status:** Accepted for the authored product-reference layer.

## D-043: Treat Vibe Pillars As Architecture Spine, Not Footnotes

**Decision:** Promote the Vibe Pillars paper and funding defense hierarchy into authored manifesto pages, and explicitly place them in Volume 04 alongside token-margin and funding-system material.

**Reason:** The operator identified Neelo's GitHub docs as the strongest vision source. The pillar material explains the architecture tradeoff behind Vibe better than generic product copy: exploit resistance, asynchronous counterparty formation, LP yield, and defense layering have to be read together for the long-tail market thesis to make sense.

**Status:** Accepted for the authored manifesto layer.

## D-044: Treat Solver Risk Pages As Source-Backed Models Until Implementation Review

**Decision:** Add authored solver/LP risk pages from Neelo's DDQ material, but keep Force Close timing, solver default behavior, compensation, insurance allocation, and tail-event cap language under operator and implementation review.

**Reason:** The DDQ corpus is strong enough to explain the risk model readers need: hedge-first execution, residual counterparty behavior, operational escape hatches, default continuity, and loss waterfalls. Those topics are also production-sensitive, so the compendium should publish the model with clear caveats instead of turning source examples into live guarantees.

**Status:** Accepted for the authored protocol-reference layer.

## D-045: Enforce The 500-800 Page Scope As A Contract

**Decision:** Centralize the compendium page target in `scripts/compendium-target.mjs` and use it from manifest generation, generated-content export, navigation, volume, requirement, and quality-audit scripts.

**Reason:** The operator raised the compendium from the older 100-page floor to 500-800 pages. The current manifest already maps 794 pages; the remaining risk is drift across scripts or verification checks. A shared target helper makes the scale explicit, auditable, and hard to accidentally weaken.

**Status:** Accepted for compendium readiness checks.

## D-046: Split Product Metrics Into Source-Status Pages

**Decision:** Add separate authored pages for volume snapshot cadence, Barometer/subgraph upgrade status, points taxonomy, and TGE settlement multiplier rather than folding all product-economics semantics into the existing revenue, volume, and points overview pages.

**Reason:** The reference layer needs to answer practical user questions without overstating unresolved product decisions. Splitting current source behavior from target-source migration, and splitting point rails from TGE settlement, lets the docs be useful now while keeping referral depth, Barometer endpoint mapping, and final settlement formula under operator review.

**Status:** Accepted for the product-reference layer.

## D-047: Treat The SYMM LP Case As Proof Of Mechanism

**Decision:** Promote Neelo's SYMM LP case study into authored pages for setup, unit economics, risk, replication, and data guardrails, but label every performance-sensitive page for operator/accounting review.

**Reason:** The case study is strong evidence for Vibe's LP mechanism because it ties inventory, long skew, realized debt, unrealized PnL, benchmark comparison, and low-volume market activity into one concrete deployment. It is still one favorable-period data cut, so the compendium must preserve sign conventions, realized/unrealized separation, drawdown gaps, and regime-risk caveats before turning it into public yield language.

**Status:** Accepted for the authored protocol-reference layer.

## D-048: Keep Referral Architecture Separate From Referral-Depth Policy

**Decision:** Promote Neelo's referral-program architecture into authored pages for identity, claims, rakeback, qualified issuance, market-scoped referrals, and KPI/integrity controls, while keeping exact public depth, backfill, and settlement economics parked behind the operator decision.

**Reason:** The referral corpus is strong enough to explain referrals as market-formation infrastructure: identity anchors, fee-linked activity, tier windows, qualified code issuance, partner overlays, high-quality listing metrics, and anti-gaming controls. Those mechanisms should be documented now, but final public depth and economic promises still depend on unresolved product policy.

**Status:** Accepted for the authored rewards/referrals layer.
