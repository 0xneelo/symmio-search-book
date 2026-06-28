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

## D-049: Use Temporal Architecture As The Volume 02 Mechanism

**Decision:** Add authored Volume 02 pages that expose the mechanics beneath the bootstrap thesis: perp design axes, static-architecture failure modes, temporal separation of concerns, Z-score graduation, and market price as a verification layer.

**Reason:** The 794-page Neelo corpus already maps the broad thesis, but first-contact readers need a concise path from "perps for any token" to the actual mechanism. These pages show why Vibe's argument depends on markets changing architecture over time instead of forcing every market into one static protocol design.

**Status:** Accepted for the authored manifesto layer.

## D-050: Treat Listing Power As Bootstrap Plus Graduation

**Decision:** Add authored Volume 03 pages from Neelo's Listing Monopoly corpus that distinguish lifecycle gates, symbolic listing, tradeable liquidity, bootstrap/maturation/graduation, partnership posture, and monopoly durability.

**Reason:** The operator called Neelo's GitHub docs the strongest vision source, and the listing-monopoly corpus is one of the clearest sources for Vibe's category ambition. It prevents the compendium from flattening the thesis into "more tickers" by showing that durable power sits in the path from early market creation to real liquidity and eventual order-book readiness.

**Status:** Accepted for the authored manifesto layer.

## D-051: Translate Information/Trade Into Mechanism

**Decision:** Add authored Volume 04 pages from Neelo's Information/Trade Convergence corpus that translate the "market cap as truth" thesis into continuous markets, intent-based OTC, solver liquidity waterfalls, listing evidence, and financialized rejection.

**Reason:** The source is high-conviction but rhetorically broad. Publication-candidate docs need to preserve its strategic force while making the mechanism legible and caveating source examples that touch unresolved solver, vault, revenue-share, and graduation-policy decisions.

**Status:** Accepted for the authored manifesto layer.

## D-052: Teach Token-Margining As Economic Architecture

**Decision:** Add authored Volume 04 pages from Neelo's Percolator critique that separate software correctness from economic viability and explain LP incentives, oracle/circuit-breaker risk, capital isolation, and the USDC-settlement alternative.

**Reason:** The compendium should not treat "token-margined perps are risky" as a slogan. The Percolator corpus gives concrete mechanisms and a fair comparison point: formally verified on-chain engineering can still instantiate same-asset collateral, inverse payoff, and LP/settlement failure modes that matter directly to Vibe's architecture.

**Status:** Accepted for the authored manifesto layer.

## D-053: Present Funding As Market Control, Not A Fee Table

**Decision:** Add authored Volume 04 pages from Neelo's funding-model corpus that explain the control problem, gradient-flow analogy, utilization-mode switching, dynamic pricing controls, and cross-market risk mutualization while keeping exact rates, thresholds, rebates, and insurance policies under review.

**Reason:** The funding corpus is one of the strongest vision sources because it connects trader UX, LP efficiency, solver exposure, insurance, and ADL into one control framework. Publishing that architecture helps sophisticated readers understand Vibe's long-tail market thesis without pretending the source formulas are final production parameters.

**Status:** Accepted for the authored manifesto layer.

## D-054: Expand Proof Of Value Into A Multi-Constituency Framework

**Decision:** Add authored Volume 02 pages from Neelo's Proof of Value framework that explain value alignment across LPs, traders, projects, and the ecosystem; token-holder inventory alignment; trader/project value loops; hybrid comparative advantage; and sustainability validation.

**Reason:** The broad Proof of Value page explains the vision, but the framework corpus gives the compendium a stronger due-diligence structure. It shows that Vibe's thesis is not only permissionless market creation; it is durable value creation, risk allocation, and proof through operating evidence. Numeric examples remain source-model claims until operator/accounting review confirms what can be published.

**Status:** Accepted for the authored manifesto layer.

## D-055: Treat Order Books As The Endpoint, Not The Enemy

**Decision:** Add authored Volume 03 pages from Neelo's Ode to OrderBooks corpus that explain order books as the mature execution layer, Vibe as the upstream RFQ/intent bootstrap layer, and programmatic graduation as the bridge between them.

**Reason:** The order-book corpus is central to the compendium's positioning because it avoids a weak "Vibe versus CLOBs" story. Vibe's stronger category claim is that early markets need discovery, shorting, and risk-managed liquidity before order books can scale them. Publishing this layer makes the listing-power thesis more precise while keeping exact graduation rules and SSHE mechanics under review.

**Status:** Accepted for the authored manifesto layer.

## D-056: Teach Capital Source As A Risk Design Choice

**Decision:** Add authored Volume 04 pages from Neelo's USDC vs token-margined perps corpus that explain generic USDC backstop cascades, incentive-based attack risk, required USDC LP risk premiums, token-inventory risk localization, and risk-adjusted capital efficiency.

**Reason:** The collateral comparison is central to Vibe's long-tail perp thesis. The strongest claim is not that one asset is always superior; it is that the capital source, settlement unit, risk premium, and loss path must match the market phase. Publishing this layer makes the token-margin and funding-system volume more precise while keeping model numbers, vault rights, and live loss-ordering under review.

**Status:** Accepted for the authored manifesto layer.

## D-057: Treat Permissionless Derivatives As The Missing Validation Primitive

**Decision:** Add authored Volume 03 pages from Neelo's Fix Industry One Primitive corpus that explain information validation, issuance abundance, spot-only market one-sidedness, tokens as information objects, and the self-correcting stack of issuance, spot, and permissionless derivatives.

**Reason:** The source gives the compendium its broadest category frame. Vibe x Symmio should not read as only a perp venue with more tickers; it should read as infrastructure for validating abundant tokenized information through two-sided markets. Publishing this layer strengthens the manifesto while keeping exact product workflow and production guarantees under review.

**Status:** Accepted for the authored manifesto layer.

## D-058: Treat Listings As Prediction Under Cost

**Decision:** Add authored Volume 03 pages from Neelo's Game Theory of Listings corpus that separate perceived from actual interest, explain curation-cost distortions, preserve the evolutionary value of zero-cost systems, name crypto's issuance-versus-market-access disconnect, and frame Vibe as bringing perps to the trenches.

**Reason:** The listing-power thesis is strongest when readers see why curated venues do not merely choose badly; they are forced to predict demand before actual demand is observable, while bearing downside for wrong calls. Publishing this layer makes Vibe's anti-bottleneck claim precise without turning the source thesis into final production eligibility rules.

**Status:** Accepted for the authored manifesto layer.

## D-059: Use Practical Venue Comparisons As Model Maps

**Decision:** Add authored Volume 03 pages from Neelo's Listing Additional Notes annex that compare CLOB/vault rails, collateralized pools, Percolator-family systems, async technical entry, and economically complete settlement as market-structure models rather than live third-party venue documentation.

**Reason:** The annex is valuable because it shows why every current long-tail perp approach solves only part of the bootstrap problem. Exact third-party parameters can change, so the compendium should preserve the durable model comparison while marking venue-specific numbers and product-state claims for current-source verification before publication.

**Status:** Accepted for the authored manifesto layer.

## D-060: Treat Rewards As Auditable Economic State

**Decision:** Add authored Volume 06 pages from Neelo's referral rewards corpus that explain points as economic state, off-chain-to-on-chain claim bridging, packs/artifacts as future-facing reward wrappers, tokenized-points perps as an explicitly hypothetical composability scenario, and governance for unresolved referral/reward policies.

**Reason:** The final compendium must explain revenue, rewards, referrals, Vibe points, and pre-TGE accounting without overstating unresolved economics. This layer lets the docs teach the architecture and integrity model now while keeping final TGE weighting, transferability, pack/artifact policy, referral depth, and third-party derivative scenarios under owner review.

**Status:** Accepted for the authored rewards/referrals layer.

## D-061: Make The Technical Moat Legible Without Freezing Parameters

**Decision:** Add authored Volume 05 and Volume 02 pages from Neelo's technical deep-dive and competitive-analysis corpus that explain the settlement state boundary, solver engine operating loop, bootstrap oracle risk tiers, position lifecycle state machine, and replication barriers/data moats.

**Reason:** The compendium needs to show how the vision becomes an operating system, not only why the category matters. These pages translate raw technical draft sections into publication-candidate explanations while keeping exact contract interfaces, oracle thresholds, solver policies, funding formulas, graduation parameters, and monopoly claims under implementation/operator review.

**Status:** Accepted for the authored manifesto layer.

## D-062: Separate Official Symmio Operations From Vibe Product Commitments

**Decision:** Add authored reference pages from current official Symmio docs for funding epochs, cross-margin liquidations, settlement/profit realization, settlement costs and affiliate credits, and solver operations/hedging. Register the specific official source keys rather than relying only on the broad Symmio docs index.

**Reason:** The compendium needs a deeper Symmio operations layer to support sophisticated traders, solvers, LPs, and frontend builders. These pages explain protocol mechanics from primary sources while avoiding overclaims about Vibe-specific fee schedules, live funding values, liquidation thresholds, solver economics, and vault/product semantics that remain under operator or implementation review.

**Status:** Accepted for the authored protocol-reference layer.

## D-063: Treat Account Safety As Product Infrastructure

**Decision:** Add authored reference pages from current official Vibe docs for account creation/login, deposits and withdrawals, My Account portfolio data, account health/liquidations, and security/audits. Register page-specific Vibe source keys and the linked Sherlock audit-contest source so Ask can route account, funding, liquidation, and audit questions to edited Volume 07 pages.

**Reason:** The larger 500-800 page compendium should not only publish the high-conviction thesis. It also has to onboard users into the product with precise custody, funding, balance, risk, and audit semantics. These pages convert practical Vibe account guides into source-backed answers while keeping large-withdrawal thresholds, exact live contract inventory, token/staking audit status, and future security-roadmap details source-limited.

**Status:** Accepted for the authored product-reference layer.

## D-064: Document Utility Surfaces Without Diluting Market-Creation Terms

**Decision:** Add authored reference pages from current official Vibe docs for hotkeys, mobile PWA, TradingView controls, system visualization, and project listing terms. Park Add Token Info behind operator inbox item #9 after two source-fetch approval timeouts instead of authoring from a one-line companion brief.

**Reason:** The compendium should answer practical product-usage questions and project-side market-creation questions, but those answer types need different publication posture. Hotkeys, mobile, and chart controls can be straightforward user guides. System visualization and project listing terms touch token supply loans, solver profit channels, project distributions, custody, audit rights, conduct restrictions, termination, and legal terms, so they must remain source-limited and review-marked.

**Status:** Accepted for the authored product-reference layer.

## D-065: Split Public Rewards Rails Instead Of Collapsing Them

**Decision:** Add authored pages from official Vibe docs for referral-code onboarding, referral commission/pre-TGE points, rakeback tiers, trading-program points, and the platform overview. Keep referral commission, referee rakeback, trading leaderboard points, Vibe points, local onboarding points, and final TGE settlement as distinct rails.

**Reason:** The public Vibe docs contain useful reward tables, but the local product and grounding docs already show unresolved referral-depth and points-accounting questions. The compendium should publish the directly sourced user flows and tables while avoiding one blended rewards answer that would overstate final economics or erase the existing 5-vs-15-level ambiguity.

**Status:** Accepted for the authored rewards/platform reference layer.

## D-066: Teach Funding As A Regime Control System

**Decision:** Add authored Volume 04 pages from Neelo's funding-rate model for the liquidation/inventory invariant, state-variable map, funding-regime ladder, full objective, and worked-example reading guide.

**Reason:** The funding model is one of the clearest places where the Vibe thesis becomes an operating system. The docs should explain how inventory, exposure, utilization, insurance, dynamic pricing, cross-market support, and ADL connect, while keeping example thresholds, APRs, rebates, insurance allocations, and live policy under implementation/operator review.

**Status:** Accepted for the authored manifesto layer.
