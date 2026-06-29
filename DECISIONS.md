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

## D-067: Separate Symmio Protocol Surface From Frontend Responsibility

**Decision:** Add authored pages from current official Symmio contract architecture, frontend-builder, contract-interaction, and audit-report docs for the protocol contract surface, Account Layer and Virtual Accounts, contract quote lifecycle, withdrawal/provider system, and frontend-builder/audit posture.

**Reason:** Vibe's docs need to explain the real Symmio operating substrate without making Symmio, Vibe, and third-party frontends sound like one undifferentiated venue. These pages teach the multi-diamond protocol surface, account isolation, lifecycle state, withdrawal architecture, and versioned security posture while keeping deployed version, frontend support, provider coverage, and audit inventory publication-date sensitive.

**Status:** Accepted for the authored protocol-reference layer.

## D-068: Treat AMFQ/aMFQ As Legacy Intent Terminology

**Decision:** Expand AMFQ/aMFQ as "Automated Market for Quotes" and describe it as legacy naming for the current intent-based trading model wherever the docs use that term.

**Reason:** The source corpus still contains AMFQ/aMFQ language, especially in Vibe architecture and Symmio frontend-builder text, but readers should understand it as the earlier name for intents rather than a separate protocol concept.

**Status:** Accepted for terminology normalization.

## D-069: Separate Published, Candidate, Source-Companion, And Internal Draft States

**Decision:** Add a deterministic page-state registry that classifies every reader-routable page as `published`, `candidate`, `source-companion`, or `internal-draft`. Current authored pages remain candidates until final review, generated source material remains source-companion retrieval/authoring input, and unresolved contradiction pages remain internal drafts.

**Reason:** The LLM and launch pipeline need an explicit boundary between reviewable public prose and raw source scaffolding. Without that boundary, generated companion material could accidentally appear as final documentation or unresolved referral/revenue contradictions could leak into answer synthesis.

**Status:** Accepted for production readiness and quality-audit enforcement.

## D-070: Keep Deterministic Routing As The Answer-Engine Fallback

**Decision:** Add a deterministic answer-engine contract that proves seeded exact-question routes, refusal/gap behavior, citation source coverage, retrieval eligibility, and feedback event shapes before adding LLM synthesis.

**Reason:** The production LLM should not become the only way to answer. The docs need a measurable fallback: exact page routing when the corpus already knows the question, retrieval over eligible chunks for broader questions, and refusal/gap creation when evidence is missing. This protects primary-source discipline and gives the LLM layer a golden set.

**Status:** Accepted for answer-engine implementation readiness.

## D-071: Specify LLM RAG Before Runtime Integration

**Decision:** Add a provider-neutral LLM RAG API contract and adversarial evaluation set before implementing model calls. The contract defines request, retrieval context, response, citation, refusal, validation, and gap-creation semantics while keeping `llmProductionReady` false.

**Reason:** The model layer must inherit the deterministic route fallback, page-state boundaries, source-key validation, and operator-inbox refusal rules. A contract-first slice lets implementation, QA, and design work proceed without binding the docs to a provider or allowing uncited synthesis into production.

**Status:** Accepted for production answer-engine implementation readiness.

## D-072: Validate Answer Shapes Before Live Model Calls

**Decision:** Add an executable answer-validation report that checks cited-answer fixtures and refusal fixtures against current chunks, page states, source catalog entries, gap ids, and operator inbox ids before any live LLM runtime is trusted.

**Reason:** The LLM contract defines the shape, but production needs a validator that can fail concrete responses. Validating synthetic fixtures first gives the runtime implementation a testable target for citation integrity, internal-draft exclusion, and gap/refusal persistence.

**Status:** Accepted for answer-engine QA readiness.

## D-073: Track Answer-Engine Readiness Separately From Runtime Launch

**Decision:** Promote deterministic routing, LLM RAG contract coverage, adversarial evals, and answer-validation fixtures into a dedicated completion requirement while keeping the answer-engine front door itself partial until the production runtime endpoint and datastore exist.

**Reason:** The compendium now has strong pre-runtime proof: exact-route and refusal golden tests pass, the LLM API contract is specified, adversarial cases pass, and response-shape validation is executable. That should count as implementation readiness, but it must not imply that live model answering, persistent ratings, or deployed answer storage are production-ready.

**Status:** Accepted for requirement-map and quality-audit readiness tracking.

## D-074: Present Proof Of Value As Costly Evidence, Not Perfect Truth

**Decision:** Expand the authored Proof of Value layer with pages that document the shadow side of market-cap verification, leverage as conviction amplification, solver quote refusal, protocol-owned solver fallback, and whale-vault risk tranching.

**Reason:** Neelo's proof-of-value source is strongest when it is allowed to be ambitious and internally honest. The public compendium should preserve the thesis that markets can verify claims through capital at risk, while making clear that price is evidence rather than absolute truth and that live leverage, solver, vault, fee-share, and loss-allocation semantics need operator-approved implementation sources.

**Status:** Accepted for the authored manifesto layer.

## D-075: Turn The DDQ Into Partner-Grade Risk Answers

**Decision:** Add authored Volume 05 reference pages from Neelo's DDQ corpus that explain the architecture stack, netting-state risk transfer, token LP attractiveness, Force Close versus escape-mode recovery, and trader-compensation continuity.

**Reason:** The DDQ material is where Vibe's thesis becomes diligence language. These pages let the compendium answer allocator, partner, solver, and risk-review questions directly while keeping exact Force Close parameters, proof-network details, revenue share, partner traction, CVA percentages, insurance rules, buyout mechanics, and live vault terms under operator and implementation review.

**Status:** Accepted for the authored protocol-reference layer.

## D-076: Frame Vibe As The Pre-Order-Book Proving Ground

**Decision:** Add authored Volume 03 pages from Neelo's Ode to OrderBooks Part II corpus for the order-book admission bottleneck, Hyperliquid gap, launchpad-to-order-book assembly line, graduation-data checklist, and house-of-all-finance proving ground.

**Reason:** The compendium should praise mature order books while explaining why admission remains the bottleneck. These pages make Vibe's role precise: a lower discovery layer that produces real derivatives demand and maturity data before an order-book venue must spend scarce listing capacity.

**Status:** Accepted for the authored manifesto layer.

## D-077: Implement Retrieval Runtime Before Live LLM Calls

**Decision:** Add a provider-neutral runtime harness for search-book answering before choosing or calling a production LLM provider. The runtime performs deterministic preflight, scans real answer chunks, enforces page-state boundaries, returns cited extractive answers locally, and fails closed in LLM mode unless approved provider configuration is present.

**Reason:** The answer engine needs actual corpus scanning and citation validation now, but live LLM synthesis requires operator approval for provider/model/API key and external-context handling. Splitting retrieval/runtime from provider selection lets the product advance without sending private documentation context to an unapproved model endpoint.

**Status:** Accepted for production-readiness work; live LLM provider remains parked under OPERATOR-INBOX #11.

## D-078: Make Living Docs Events Executable Before Production Persistence

**Decision:** Add a generated living-docs event contract for Search Insights question, rating, and gap events before choosing the production datastore. The contract validates local prototype event shapes, linked gap ids, linked operator inbox ids, low-rated-answer gaps, page-feedback gaps, no-grounded-page gaps, and operator-blocked refusals.

**Reason:** The docs vision depends on every question being tracked, every answer being rated, and gaps driving improvement. The prototype already stores events locally, but production readiness needs machine-checkable event semantics that can move into a backend without guessing at field names or refusal behavior.

**Status:** Accepted for living-docs implementation readiness; production persistence remains parked under OPERATOR-INBOX #4 and Discord import remains parked under OPERATOR-INBOX #2.

## D-079: Treat Proof Of Value Economics As A Review-Bound Framework

**Decision:** Expand Neelo's Proof of Value framework into authored pages for solver-funded USDC, trader payout certainty, project token utility, no-ponzi sustainability, and value creation versus capture, while marking the pages for operator review.

**Reason:** This source is central to the vision, but it contains strong economics claims such as revenue share, capital-efficiency estimates, partner traction, solver-funding assumptions, and protocol capture mechanisms. The compendium should preserve the framework because it explains why the architecture matters, but it must not turn model claims or strategy analysis into final public guarantees before accounting/operator review.

**Status:** Accepted for the authored manifesto layer; exact economics remain parked under OPERATOR-INBOX #1 and platform/deploy choices remain parked under OPERATOR-INBOX #4.

## D-080: Treat AMFQ As Legacy Naming For Intents

**Decision:** Canonicalize `Intent` as the current term and treat AMFQ/aMFQ, short for Automated Market for Quotes, as legacy Vibe architecture naming for the same intent-based quotation model.

**Reason:** The source corpus and older Vibe architecture language use AMFQ/aMFQ, while the operator clarified that AMFQ was the old name for Intents. Without a terminology lock, the compendium could accidentally imply two separate systems.

**Status:** Accepted for all current docs. Use AMFQ only when translating older source material, search queries, or archived diagrams into the current Intents vocabulary.

## D-081: Translate Information/Trade Vision Into Review-Bound Mechanism

**Decision:** Add authored pages for Neelo's Information/Trade convergence thesis that preserve the ambition of the source while translating it into mechanism-first, review-bound prose: convergence, synthetic abundance, market-cap signaling, the Strait Gate, and the global reputation protocol endgame.

**Reason:** The raw source is one of the strongest vision documents in the corpus, but several claims need careful publication framing. Market cap should be documented as costly evidence rather than perfect truth. Strait Gate graduation paths and thresholds should remain examples until confirmed. Global reputation protocol language should be framed as a category thesis that depends on adoption, solver participation, data quality, and downstream integrations.

**Status:** Accepted for the authored manifesto layer; exact graduation rules, reputation metrics, and live venue adoption claims remain under operator/product review.

## D-082: Treat Z-Score Strategy As Market-Infrastructure Evidence

**Decision:** Add authored pages from the Perp Classes / Z-score source for lifecycle gap economics, market maturation states, order-book integration, listing data, and the small-market wedge strategy while keeping numeric thresholds and monopoly language review-bound.

**Reason:** The source is foundational for explaining why Vibe is market-creation infrastructure rather than only another perp venue. It also contains sample metrics, market-cap ranges, Z-score bands, graduation triggers, and Thiel-style monopoly assessments that are useful as strategy but should not become live product guarantees without operator/product confirmation.

**Status:** Accepted for the authored manifesto layer; exact Z-score thresholds, maturity formulas, destination venue integrations, listing-data products, and durability claims remain under product/operator review.

## D-083: Treat Referral Rollout As Operations Infrastructure

**Decision:** Expand the authored referral layer with pages for access phasing, settlement security controls, market creation velocity, dashboard reporting standards, and rollout governance while keeping exact live policy review-bound.

**Reason:** Neelo's referral corpus is not only a rewards pitch. It defines phased launch control, claim-security surfaces, KPI governance, public dashboard standards, and decision ownership. The compendium should preserve that operational discipline so referral growth is documented as market-formation infrastructure rather than a generic acquisition funnel.

**Status:** Accepted for the authored reference layer; referral depth, code activation thresholds, transferability, signer models, partner tiers, reward caps, and public dashboard publication policy remain under operator/product/security review.

## D-084: Document Token-Margin Failure Modes As Mechanisms

**Decision:** Add authored mechanism pages for inverse payoff convexity, 1x leverage ceilings, passive matcher vulnerability, shorting death spirals, and active risk management versus passive physics.

**Reason:** The token-margined/Percolator critique is most useful when it shows how specific mechanisms fail, not merely that same-asset collateral is risky. These pages let the compendium explain why settlement unit, matcher design, leverage capacity, payout denomination, and solver agency are core architecture choices for long-tail perps.

**Status:** Accepted for the authored manifesto layer; exact production Vibe parameters, solver controls, insurance allocations, leverage bands, and ADL behavior remain under implementation/operator review.

## D-085: Treat DDQ Risk Controls As Stage-Based Policy Models

**Decision:** Add authored reference pages for the DDQ's stage-based risk-control mechanics: conservative launch collateralization, conditional global insurance allocation, tail-event profit caps, RFQ per-quote risk tuning, and maturation-driven risk posture changes.

**Reason:** The DDQ is strongest when it explains how low-cap markets become safer before they become looser. These pages let partners, solvers, LPs, and traders understand why an early market may have tighter terms, why global insurance is not automatic, why emergency caps exist, and how the RFQ/intent model lets a solver tune risk before accepting exposure.

**Status:** Accepted for the authored protocol-reference layer; exact collateral ratios, insurance formulas, cap triggers, solver quote policy, leverage bands, and market-classification thresholds remain under implementation/operator review.

## D-086: Extend The Order-Book Thesis Into Strategy Subclaims

**Decision:** Add authored Volume 03 pages from Neelo's CLOB-upgrade and House of All Finance sections for improve-before-replacing, upstream trust, cooperation-created optionality, protocol-defined lifecycle, and continuous market formation.

**Reason:** The compendium already explains that order books are the mature layer and Vibe is the upstream discovery layer. These subclaims make the strategy more explicit: Vibe should first improve order-book ecosystems, earn trust upstream through repeated graduation outcomes, preserve optional execution paths, and frame open finance as connected market-formation infrastructure rather than one venue listing everything.

**Status:** Accepted for the authored manifesto layer; exact SSHE behavior, destination venue integrations, graduation automation, and beyond-crypto asset expansion remain under operator/product/source review.

## D-087: Promote Listing-Landscape Diagnostics Into Askable Pages

**Decision:** Add authored Volume 03 pages from Neelo's Listing Additional Notes that turn practical long-tail-perp diagnostics into first-class answers: listing versus vault liquidity, the CLOB liquidity coordination loop, pooled backstop mismatch, the venue term inside derivatives trades, and exchange deviation.

**Reason:** The annex is strongest when it converts protocol landscape observations into user-facing diagnostics. The compendium should help readers distinguish symbol count from liquidity, TVL from payout reliability, index exposure from venue-internal settlement risk, and asynchronous entry from economically complete settlement.

**Status:** Accepted for the authored manifesto layer; live dYdX, Hyperliquid, GMX, Percolator-family, Perk.fund, and derp.fun parameters remain current-source-review items before final publication.

## D-088: Make Proof Of Value Verification Subclaims Directly Askable

**Decision:** Add authored Volume 02/03 pages from Neelo's Proof of Value source for Proof of Authority to Proof of Value, truth as an asset class, the Market's Eye View, short sellers as fact-checkers, and Verified on Vibe as a stress-test badge.

**Reason:** The compendium already has broad Proof of Value and Information/Trade pages, but the answer engine still needs direct routes for the source's strongest verification primitives. These pages preserve the ambition while keeping the public framing precise: market price is costly evidence, not perfect truth; shorting is adversarial validation, not moral certainty; Verified on Vibe is a review-bound thesis, not a launched badge or listing guarantee.

**Status:** Accepted for the authored manifesto layer; exact badge policy, graduation thresholds, downstream listing paths, reputation metrics, and public truth-claim language remain under operator/product/editorial review.

## D-089: Split SYMM LP Measurement Questions Into Practical Reference Pages

**Decision:** Add authored Volume 05 reference pages for SYMM LP Current Debt and UPnL, benchmark interpretation, low-volume driver analysis, regime dependence, and beta-report KPIs.

**Reason:** The existing SYMM LP pages explain the broad setup, unit economics, risk, replication, and data guardrails, but the answer engine needs direct routes for the practical measurement questions an LP, treasury, solver, or operator will ask before treating the case study as evidence. These pages keep realized and unrealized accounting separate, read the benchmark table as a regime-specific wealth comparison, and convert the beta-report checklist into a public reporting standard.

**Status:** Accepted for the authored protocol-reference layer; audited attribution, vault-level time series, public yield language, capacity stress, and dashboard-field semantics remain under operator/accounting review.

## D-090: Promote Funding Insurance Mechanics Into Reference Pages

**Decision:** Add authored Volume 05 reference pages for the funding model's local insurance fund, global insurance eligibility, stress demand and insurance spend, bell-curve transfer pool, and ADL trigger/target mechanics.

**Reason:** The existing manifesto pages explain funding as a regime-control system and defense hierarchy, but operational readers need direct reference answers for where insurance comes from, when shared insurance applies, what residual stress means, how winner-market surplus can support stressed markets, and when ADL becomes the final exposure-reduction step. These pages preserve the formulas as source-model mechanics while keeping live thresholds and parameters review-bound.

**Status:** Accepted for the authored protocol-reference layer; live insurance percentages, eligibility policy, allocation caps, safe-exposure formulas, ADL thresholds, and position-ranking behavior remain under implementation/operator review.

## D-091: Split Proof Of Value Strategy Into Due-Diligence Subclaims

**Decision:** Add authored Volume 02 manifesto pages for the risk alignment matrix, project alternative cost stack, pre-revenue commitment signal, solver sustainability condition, and value-capture durability scorecard.

**Reason:** The existing Proof of Value pages explain the broad thesis, but sophisticated readers will ask narrower diligence questions: who bears each risk, what project alternatives Vibe displaces, what early commitment actually proves, whether solver economics can stay durable, and how capture avoids becoming extraction. These pages turn those follow-ups into routed answers while keeping economic and partner metrics review-bound.

**Status:** Accepted for the authored manifesto layer; vault terms, insurance policy, live partner figures, solver profitability, fee routing, protocol share, and revenue-share claims remain under operator/accounting review.

## D-092: Expand Listing Game Theory Into Askable Market-Evolution Subclaims

**Decision:** Add authored Volume 03 manifesto pages for the region left of the listing threshold, asymmetric blame in curated venues, listing metrics becoming targets, the zero perceived interest zone, and Vibe/perps as an anti-bottleneck layer.

**Reason:** The existing listing-game pages explain perceived versus actual interest, curation cost, and zero-cost discovery, but the answer engine needs direct routes for the follow-up questions market creators and researchers will ask. These pages make the game-theoretic mechanism concrete: curation creates thresholds, thresholds create proxy optimization, proxy optimization delays actual-interest discovery, and Vibe's derivative layer can test markets earlier without pretending every early market is high quality.

**Status:** Accepted for the authored manifesto layer; token eligibility, market launch workflow, safety filters, HIP-3 handoff, and downstream graduation policy remain under operator/product review.

## D-093: Split Vibe Account Funding Mechanics Into Exact Reference Answers

**Decision:** Add authored Volume 07 product-reference pages for Vibe login path choice, deposit chain support, Allocated Balance, large-withdrawal safety windows, and account history/CSV export.

**Reason:** The broad official Vibe account, deposits, withdrawals, and My Account pages already exist in the authored layer, but common support questions need exact answers. Users ask which login path to choose, which chains can fund an account, what Allocated Balance means, why some withdrawals wait, and where account history can be exported. These pages keep official-source facts precise while avoiding unsupported thresholds or time-sensitive chain claims.

**Status:** Accepted for the authored product-reference layer; chain support, withdrawal-size thresholds, custody wording, and publication-date product behavior remain under current-source review.

## D-094: Split Vibe Trading Costs And Controls Into Exact Reference Answers

**Decision:** Add authored Volume 07 product-reference pages for trade-panel cost breakdown, funding payment direction, TP/SL slippage threshold, stop-order trigger semantics, and available-liquidity capacity.

**Reason:** The existing official Vibe trading pages explain fees, funding, order types, TP/SL, and OI/liquidity broadly, but answer-engine users will ask narrower operational questions: what to inspect before confirming a trade, who pays funding, why TP/SL may not fully execute, how stop-market differs from stop-limit, and why more size can be unavailable. Exact pages improve routing while keeping unsupported fee percentages, future order types, and live capacity claims out of public prose.

**Status:** Accepted for the authored product-reference layer; fee percentages, Scale/TWAP live status, and publication-date-sensitive liquidity/capacity behavior remain under current-source review.

## D-095: Split Vibe Mobile And Interface Controls Into Exact Reference Answers

**Decision:** Add authored Volume 07 product-reference pages for iOS PWA install, Android PWA install, PWA notification categories, hotkey execution guardrails, and TradingView layouts/watchlists.

**Reason:** The existing mobile, hotkeys, and TradingView pages explain the broad interfaces, but support and answer-engine traffic will likely ask platform-specific and behavior-specific questions. Exact pages let the front door answer how iOS and Android installs differ, which notification categories exist, whether keyboard shortcuts change trade semantics, and what chart state can persist, without inventing native-app, notification-delivery, or full TradingView feature-matrix claims.

**Status:** Accepted for the authored product-reference layer; native-app assumptions, notification reliability language, and unlisted TradingView capabilities remain outside publication unless current official sources support them.

## D-096: Split Vibe Security And Audit Claims Into Versioned Exact Answers

**Decision:** Add authored Volume 07 product-reference pages for settlement-contract audit scope, token/staking audit caveats, the Sherlock contest reference, versioned security-claim wording, and custody-path security boundaries.

**Reason:** The broad Vibe security page is enough to answer whether Vibe publishes audit context, but production docs need exact routes for security-sensitive follow-ups. Readers need to know which contract family and version the public audit claim covers, where the linked Sherlock evidence lives, which token/staking details remain coming soon, and why login-path custody assumptions are separate from contract audit posture.

**Status:** Accepted for the authored product-reference layer; publication-date contract inventory, token/staking audit details, future module coverage, and custody wording remain current-source-review items.

## D-097: Split Vibe Project Listing Terms Into Exact Market-Creation Answers

**Decision:** Add authored Volume 07 product-reference pages for project supply-loan flow, solver profit-source categories, project profit-share boundaries, project token custody/security-fund boundaries, and project audit/exit rights.

**Reason:** Broad system visualization/listing terms pages cover the loop, but project-side readers ask narrower diligence questions. Exact routes help answer inventory, solver economics, profit-share, custody, audit, and delisting without overclaiming commercial/legal terms.

**Status:** Accepted for the authored product-reference layer; supply ranges, project distribution examples, custody/security-fund language, legal terms, and live agreement/SOW details remain operator/accounting/legal/current-source review.

## D-098: Split Vibe Pillars Into Exact Architecture-Constraint Answers

**Decision:** Add authored Volume 04 manifesto pages for perps as credit systems, episodic long-tail flow, residual counterparty balance-sheet work, yield as a market-survival constraint, and single-pillar optimization failure.

**Reason:** The broad Vibe Pillars pages explain defense, bootstrap, LP yield, and coupling, but answer-engine users will ask narrower architecture questions. Exact routes help explain why low-cap perps are hard without reducing the thesis to "more leverage" or "more listings."

**Status:** Accepted for the authored manifesto layer; exact leverage, solver capitalization, vault economics, LP rights, fee routing, and live risk parameters remain operator/implementation/accounting review items.

## D-099: Split Information/Trade Mechanism Claims Into Exact Answers

**Decision:** Add authored manifesto pages for agency model over casino model, one-counterparty niche verification, AI solver verification thesis, the universal perp wedge, and the Thumbs Down mechanism stack.

**Reason:** Existing Information/Trade pages cover the broad convergence, verification, solver-waterfall, and Thumbs Down theses, but answer-engine users need exact routes for how intents, solvers, long-tail perps, and short-side rejection map into the mechanism. These pages preserve Neelo's vision while translating aggressive source language into publication-safe architecture and product boundaries.

**Status:** Accepted for the authored manifesto layer; AI-solver behavior, exact product categories, token eligibility, market-cap/liquidity limits, vault/solver mechanics, and any "truth market" wording remain operator/product/implementation review.

## D-100: Split Hybrid Solver Execution Claims Into Exact Answers

**Decision:** Add authored manifesto pages for external-solver first look, safety-premium backstop quotes, pass-through execution boundaries, TWAP inventory rebalancing, and the LP capacity-rent model.

**Reason:** The existing hybrid-solver page explains the waterfall, but sophisticated readers will ask how the waterfall actually allocates flow, why fallback quotes are wider, what pass-through execution means, how inventory is rebalanced, and why LPs are paid for capacity. These pages answer those mechanism questions while keeping live routing, fee-share, vault, slippage, and accounting claims review-bound.

**Status:** Accepted for the authored manifesto layer; external-solver routing, backstop quote policy, vault custody, execution venues, TWAP behavior, slippage allocation, LP rights, and exact fee shares remain operator/product/implementation/accounting review.

## D-101: Split Missing NO Button Claims Into Exact Answers

**Decision:** Add authored manifesto pages for long-only markets as hype filters, shorting at launch as an immune-system loop, the NO button as market filter, profitable fact-checking, and adversarial selection pressure.

**Reason:** Existing NO-button pages explain the broad short-side thesis, but answer-engine readers need exact routes for why long-only markets are asymmetric, why launch timing matters, how fake narratives are filtered, why correction can be incentivized, and how to translate aggressive source metaphors into publication-safe market mechanics.

**Status:** Accepted for the authored manifesto layer; live shorting eligibility, leverage, market-support timing, solver/vault availability, abuse controls, and user-facing risk language remain operator/product/implementation review.

## D-102: Split Solver Default Modes Into Diligence Answers

**Decision:** Add authored protocol-reference pages for strict solver liquidation, soft solver liquidation, protocol-owned solver depletion, solver CVA compensation buffers, and distressed-position buyout continuity.

**Reason:** The broad DDQ solver-default pages explain the continuity model, but solver/LP diligence readers need exact answers for each failure-mode branch. Splitting the modes makes it easier to distinguish ordinary third-party liquidation, reputation-sensitive de-risking, protocol-owned bootstrapping boundaries, CVA collateral, and buyout/auction continuity without turning any source-model parameter into a production guarantee.

**Status:** Accepted for the authored protocol-reference layer; maintenance-margin thresholds, liquidation flags, solver reputation rules, CVA sizing, buyout probabilities, auction rules, protocol-owned solver depletion handling, and trader-compensation semantics remain operator/implementation/legal review.

## D-103: Split Residual Counterparty Execution Into Exact Diligence Answers

**Decision:** Add authored protocol-reference pages for internal inventory as the primary low-cap hedge, residual-counterparty dynamic spread inputs, internal netting before external execution, executable closeout pricing, and protective posture when liquidity disappears.

**Reason:** The broad residual-counterparty page explains hedge-first solver behavior, but solver/LP and trader diligence readers need exact routes for where the hedge comes from, why quotes widen, how netting reduces external execution, why exits reflect executable liquidity, and what controls tighten when liquidity disappears. Splitting these answers improves answer-engine routing while preserving the source boundary.

**Status:** Accepted for the authored protocol-reference layer; inventory custody, vault rights, spread formulas, execution venues, closeout rules, slippage allocation, protective thresholds, ADL rules, market-closing authority, and production solver policy remain operator/implementation/legal review.

## D-104: Split Force Close Recovery Into Exact Diligence Answers

**Decision:** Add authored protocol-reference pages for Force Close failure detection, the Force Close protocol timer, Force Close price proofs, the Force Close proof network, and Force Close latency risk.

**Reason:** The broad operational-failure and escape-mode pages explain Force Close as a position-level recovery path, but support and diligence readers need exact answers for how the path starts, why a timer exists, what evidence finalizes the close, why proof is independent of the solver, and what financial risk remains while recovery completes.

**Status:** Accepted for the authored protocol-reference layer; exact timeout values, timer duration, proof format, proof sources, freshness windows, node counts, supported markets, chain-specific finalization, UI behavior, and production availability remain operator/implementation/security review.

## D-105: Split DDQ Loss-Bearer Waterfall Into Exact Risk Answers

**Decision:** Add authored protocol-reference pages for losing traders as first loss, solver hedging resources before insurance, LP vault capacity exposure boundaries, local insurance as a tail buffer, and market-tier loss limits.

**Reason:** The broad loss-waterfall page answers who bears losses overall, but diligence readers need exact routes for each layer of the waterfall. Splitting these claims makes it clearer that ordinary directional loss starts with trader margin, residual exposure then reaches solver hedging resources, LP capacity is conditional on actual vault use and terms, local insurance is market-specific protection before global allocation, and market tiers can bound losses after extreme events.

**Status:** Accepted for the authored protocol-reference layer; live margin thresholds, solver capital and hedge policy, LP vault rights, insurance inflows and allocations, tier limits, ADL triggers, delisting authority, and user-compensation semantics remain operator/implementation/legal review.

## D-106: Split DDQ LP Attractiveness Into Exact Capital-Structure Answers

**Decision:** Add authored protocol-reference pages for LP deposits as ignition capital, solver-funded stablecoin operations, external USDC LP risk-premium mismatch, token-holder incremental risk alignment, and project token inventory without stablecoin deployment.

**Reason:** The broad token-LP attractiveness page explains the thesis, but project and LP diligence readers need exact routes for the capital-structure split: what LP deposits do at launch, who funds the stablecoin side, why outside USDC LPs are expensive, why token holders are naturally aligned inventory providers, and how projects can support a market without first spending stablecoins.

**Status:** Accepted for the authored protocol-reference layer; live vault terms, revenue-share percentages, partner/deposit traction, stablecoin balances, solver accounting, withdrawal rights, and LP loss-ordering remain operator/accounting/legal/implementation review.

## D-107: Split DDQ Hedging Risk Into Exact Solver-Control Answers

**Decision:** Add authored protocol-reference pages for the VibeCaps hedge-first requirement, soft quote and last-look risk gating, liquidity-collapse freeze logic, discontinuous-outcome market guardrails, and strategic unhedged exposure boundaries.

**Reason:** The broad solver-hedging failure page explains the overall risk model, but diligence readers need exact routes for why low-cap markets are hedge-first, how the RFQ/intent structure avoids forced unhedgeable fills, what a liquidity collapse changes, why discontinuous markets need mode switches, and when unhedged solver exposure is a strategic maturity choice rather than a failure.

**Status:** Accepted for the authored protocol-reference layer; live hedge tests, quote-validity behavior, liquidity thresholds, market-freeze rules, discontinuity support, solver inventory limits, and maturity criteria remain operator/implementation/legal review.

## D-108: Split DDQ Architecture Stack Into Primitive-Level Answers

**Decision:** Add authored protocol-reference pages for the DDQ margin protocol role, perpetuals layer role, bilateral OTC derivatives primitive, proprietary solver role, and token-vault liquidity role.

**Reason:** The broad DDQ architecture-stack page names the six primitives, but partner and diligence readers need exact answers for what each primitive contributes. Splitting the stack makes it easier to explain why Vibe is not merely a margin vault, not merely a perp UI, and not merely an LP pool: collateral discipline, perpetual lifecycle, bilateral counterparty formation, solver risk operation, and token inventory each do different work.

**Status:** Accepted for the authored protocol-reference layer; live margin formulas, funding/closeout rules, PartyA/PartyB permissions, solver algorithms, vault rights, custody, fee share, and LP loss ordering remain operator/implementation/legal/accounting review.

## D-109: Split DDQ Hybrid Liquidity Mechanics Into Exact Answers

**Decision:** Add authored protocol-reference pages for the DDQ request-based settlement layer, near one-to-one backing limit, USDC vault supply-attack pattern, hybrid liquidity model, and asynchronous matching engine.

**Reason:** The broad DDQ architecture-stack page and primitive pages explain what is in the stack, but diligence readers also need exact routes for why the stack exists. Splitting these mechanics makes the risk argument inspectable: request-based settlement supports pre-acceptance risk review, near 1:1 backing can become too capital hungry, generic USDC vaults can be attacked in thin markets, the hybrid model assigns capital by risk type, and asynchronous matching bridges time-mismatched flow without pretending a mature book exists.

**Status:** Accepted for the authored protocol-reference layer; quote validity, collateral ratios, attack thresholds, vault exposure caps, LP terms, funding formulas, netting priority, and residual-exposure limits remain operator/risk/security/implementation/accounting review.

## D-110: Split DDQ Market Lifecycle Into Stage-Level Answers

**Decision:** Add authored protocol-reference pages for the DDQ bootstrapped market stage, maturing market stage, mature market stage, systemic leverage ramp, and derivatives lifecycle expansion.

**Reason:** The LP-attractiveness source explains Vibe as a lifecycle system, not a static vault or static exchange. Exact stage-level answers help partners, LPs, solvers, and project teams understand why launch conditions can be conservative, how two-sided flow changes the solver's role, why capital efficiency should improve only with evidence, and why more complex derivatives belong later in the lifecycle.

**Status:** Accepted for the authored protocol-reference layer; launch criteria, graduation thresholds, leverage schedules, collateralization ratios, options availability, covered-call examples, revenue share, and market-support terms remain operator/product/risk/implementation/accounting review.

## D-111: Split DDQ Trade Risk Lifecycle Into Step-Level Answers

**Decision:** Add authored protocol-reference pages for DDQ order-submission risk ownership, execution/netting risk split, imbalance management and hedging, ongoing position lifecycle risk, and closeout/settlement risk ownership.

**Reason:** The broad netting-state and loss-waterfall pages explain the overall model, but trader, LP, and diligence readers need exact routes for each lifecycle step. Splitting the walkthrough makes the answer-engine precise about when risk starts with the trader, when it becomes trader-to-trader versus solver-to-trader, when LP capacity can become relevant, how ordinary position risk differs from residual system risk, and how settlement traces back to the party or resource stack that held the offsetting exposure.

**Status:** Accepted for the authored protocol-reference layer; final margin thresholds, netting rules, hedge venues, vault exposure terms, funding/liquidation formulas, closeout pricing, settlement timing, and waterfall implementation remain operator/risk/legal/accounting/implementation review.

## D-112: Split SYMM LP Case Study Into Exact Diligence Answers

**Decision:** Add authored protocol-reference pages for the SYMM LP headline result shape, proof-of-possibility meaning, favorable-regime caveat, economic channels, and dashboard data-cut interpretation.

**Reason:** The broad SYMM LP setup, unit-economics, risk, replication, and measurement pages explain the case, but solver/LP and treasury readers need exact routes for the questions they will ask first: what the headline numbers are, what the case actually proves, why the regime caveat matters, which channels produced the result, and what dashboard state supports the analysis. Splitting these answers keeps the case useful without turning a favorable data cut into a generalized yield promise.

**Status:** Accepted for the authored protocol-reference layer; audited attribution, live vault performance, drawdown history, fee/funding/liquidation distribution, dashboard-field ownership, source refresh cadence, tax/accounting treatment, and public yield language remain operator/accounting/legal/implementation review.

## D-113: Split Funding-Model Caveats Into Exact Manifesto Answers

**Decision:** Add authored Volume 04 manifesto pages for the funding math-not-solution caveat, trader UX versus LP efficiency tradeoff, liquidation-as-inventory invariant, funding risk inversion, and two-utilization-mode rationale.

**Reason:** Existing funding pages explain the broad control problem, core invariant, gradient-flow frame, and utilization modes, but answer-engine readers will ask narrower questions about what the model does not prove, why launch constraints can feel conservative, why liquidations are not simply bad-debt events, how Vibe LP risk differs from AMM LP risk, and why insurance utilization is not the same as token-inventory utilization. Splitting these answers makes the model more precise without publishing live parameters as guarantees.

**Status:** Accepted for the authored manifesto layer; live market eligibility, leverage, utilization thresholds, liquidation accounting, insurance allocation, ADL behavior, LP rights, fee shares, and public risk wording remain operator/implementation/legal/accounting review.

## D-114: Split Funding Variable Definitions Into Exact State-And-Control Answers

**Decision:** Add authored Volume 04 manifesto pages for the funding risk-signal map, control-action map, dynamic pricing multipliers, revenue/cost accounting map, and phase/counterparty-share parameter.

**Reason:** The broad funding state-variable and objective pages make the model legible, but answer-engine readers need exact routes for the variables they will see in formulas and diligence conversations. Splitting these definitions clarifies the difference between observed state, chosen controls, dynamic cost adjustment, market profitability, and maturity phase without turning source-model symbols into live product commitments.

**Status:** Accepted for the authored manifesto layer; live thresholds, base rates, multiplier curves, insurance budgets, hedge venues, accounting treatment, LP/vault profit distribution, phase thresholds, graduation criteria, and production risk policy remain operator/implementation/legal/accounting review.

## D-115: Split Funding State And Utilization Modes Into Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for per-market state variables, insurance/safety budgets, risk and volatility parameters, token-inventory utilization mode, and insurance-fund utilization mode.

**Reason:** The funding variable map and utilization overview are useful orientation pages, but they still hide the practical distinctions readers will ask about: what a market-specific state snapshot contains, what insurance resources are actually budgeted, which volatility/pump assumptions shape modeled stress, why inventory mode can become expensive before emergency, and why insurance mode is a different tail-risk state. Splitting these pages keeps the model inspectable while preserving review boundaries around live numbers.

**Status:** Accepted for the authored manifesto layer; covered amount, inventory rights, volatility windows, Aenigma values, insurance balances, spend caps, utilization thresholds, rate ramps, loss-estimate formulas, global allocation rules, and ADL thresholds remain operator/implementation/legal/accounting review.

## D-116: Split Funding LP Profit Decomposition Into Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for the LP master profit formula, trader-PnL phase exposure, LP loss pressure signal, insurance and buyback accounting, and the Vibe-versus-Uniswap LP-risk comparison.

**Reason:** The existing LP-profit and revenue/cost pages explain the broad economics, but answer-engine readers need exact routes for the actual accounting questions: how market profit is computed, when trader PnL hits the residual counterparty, what counts as uncovered loss pressure, where insurance and buybacks sit in the accounting, and why Vibe LP risk differs from spot AMM impermanent loss. Splitting these pages improves precision without publishing live rates or yield promises.

**Status:** Accepted for the authored manifesto layer; live LP terms, fee shares, hedge venues, insurance balances, buyback policy, trader-loss assumptions, liquidation accounting, performance claims, and market-specific risk thresholds remain operator/implementation/legal/accounting review.

## D-117: Split Dynamic Pricing Into Instrument-Level Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for the three dynamic-pricing instruments, dynamic borrow rate, dynamic funding rate, emergency time ramp, and directional spreads/rebates.

**Reason:** The broad dynamic-pricing pages explain that funding, borrow, and spread are controls, but exact-answer readers will ask what each instrument does, why borrow is not funding, why funding becomes aggressive under insurance stress, why duration matters in emergency, and why spreads can reward exposure-reducing flow. Splitting the source formula sections gives the answer engine precise routes without publishing production pricing parameters.

**Status:** Accepted for the authored manifesto layer; live rates, intervals, base parameters, multiplier curves, grace periods, acceleration caps, spread tables, rebates, market classes, and user-facing execution promises remain operator/implementation/legal/accounting review.

## D-118: Split Bell-Curve Flattening Into Exact Mechanics Answers

**Decision:** Add authored protocol-reference pages for bell-curve tail cutoffs, winner surplus and loser shortfall, feasible transfer-pool sizing, proportional tail allocation, and conservation versus protocol retention.

**Reason:** The broad cross-market mutualization and transfer-pool pages explain the idea, but exact-answer readers will ask how tails are identified, what part of each market counts, why the pool is capped, how taxes and subsidies are allocated, and whether flattening creates or merely redistributes value. Splitting the mechanics preserves the source-model formulas without turning them into live insurance commitments.

**Status:** Accepted for the authored protocol-reference layer; live cutoff thresholds, profit windows, flattening intensity, retention fractions, eligibility rules, allocation caps, reserve accounting, tax/subsidy execution, and public insurance commitments remain operator/implementation/legal/accounting review.

## D-119: Split Insurance And ADL Mechanics Into Exact Answers

**Decision:** Add authored protocol-reference pages for the exposure-loss estimate, insurance spend caps, hedge-cost coverage, ADL target sizing, and ADL priority ranking.

**Reason:** The broad stress-demand, defense-hierarchy, and ADL trigger pages explain the ordering, but exact-answer readers will ask how exposure becomes a loss estimate, why insurance cannot spend without caps, when hedging can be funded, whether ADL always zeroes exposure, and which positions are selected first. Splitting these mechanics gives the answer engine precise routes while keeping live safety parameters and emergency procedures out of public commitments.

**Status:** Accepted for the authored protocol-reference layer; live Aenigma values, volatility windows, safety quantiles, spend budgets, hedge venues, ADL thresholds, ranking fields, tie-breakers, compensation semantics, and production emergency behavior remain operator/risk/legal/implementation/accounting review.

## D-120: Split Defense Hierarchy Into Layer-Level Answers

**Decision:** Add authored protocol-reference pages for user position netting, solver token inventory coverage, total pre-ADL defense budget, defense activation timeline, and defense-layer cost ordering.

**Reason:** The broad defense-hierarchy page explains the five-layer stack, but exact-answer readers need routes for how netting works, when token inventory is enough, how much loss can be absorbed before ADL, how the stack activates as stress worsens, and why the sequence is ordered by economic and UX cost. Splitting these pages makes the defense model inspectable without publishing live parameters as guarantees.

**Status:** Accepted for the authored protocol-reference layer; live netting scope, token balances, inventory rights, utilization thresholds, risk fractions, local/global allocation amounts, ramp speeds, spread tables, governance procedures, compensation semantics, and production ADL behavior remain operator/risk/legal/accounting/implementation review.

## D-121: Split Full Funding Objective Into Exact Control Answers

**Decision:** Add authored Volume 04 manifesto pages for the master optimization equation, local risk-score penalties, insurance cost penalty, ADL penalty function, and dynamic-pricing control loop.

**Reason:** The broad full-objective page explains the whole control problem, but answer-engine readers need exact routes for what the objective maximizes, how risk is penalized, why insurance is costly, why ADL is convexly discouraged, and how state-responsive funding, spread, and borrow controls enter the loop before hard defenses. Splitting these pages preserves the source math without converting example parameters into live product commitments.

**Status:** Accepted for the authored manifesto layer; live lambda values, risk weights, penalty curves, cost coefficients, pricing functions, update cadence, thresholds, source data feeds, and emergency sequencing remain operator/risk/legal/accounting/implementation review.

## D-122: Split Funding Worked Examples Into Exact Walkthrough Answers

**Decision:** Add authored Volume 04 manifesto pages for normal/stress utilization arithmetic, emergency acceleration, insurance-mode spread response, bell-curve worked arithmetic, and ADL/defense sequence walkthroughs.

**Reason:** The broad worked-example reading guide tells readers how to use the examples, but answer-engine readers need direct routes for the actual walkthroughs: how utilization is calculated, how emergency time accelerates, how insurance utilization changes spreads, how flattening preserves total profit, and how the defense stack progresses into ADL. Splitting these pages keeps the illustrative numbers legible without publishing them as deployed parameter commitments.

**Status:** Accepted for the authored manifesto layer; live market thresholds, APRs, grace periods, spread tables, insurance fractions, flattening coefficients, ADL fractions, timing, and emergency procedures remain operator/risk/legal/accounting/implementation review.

## D-123: Split Referral Baseline Architecture Into Exact Answers

**Decision:** Add authored rewards-reference pages for referral identity anchors, dual incentive rails, referral-code activation gates, three-plane referral architecture, and public/private policy overlays.

**Reason:** Existing referral pages explain the broad architecture, but answer-engine readers need exact routes for the mechanics they will ask first: what the identity anchor is, why self rakeback and referral rewards are separate, when a code becomes reward eligible, which architecture plane owns which responsibility, and how public policy can coexist with private commercial terms. Splitting these answers improves referral documentation without resolving the parked referral-depth and historical-accounting decision.

**Status:** Accepted for the authored rewards-reference layer; live referral depth, activation thresholds, tier tables, private terms, backfill behavior, transferability, signer topology, settlement contracts, and public economic commitments remain operator/legal/accounting/implementation review.

## D-124: Split Referral Economics Into Exact Anti-Gaming Answers

**Decision:** Add authored rewards-reference pages for referral abuse patterns, uniform baseline referee benefits, qualified issuance gating, referral-right ownership models, and early-code scarcity cohorts.

**Reason:** The broad referral issuance and anti-gaming page explains the economics source, but answer-engine readers need direct routes for why referral programs get gamed, why referee benefits should be uniform, why economically active codes should be gated, what can own referral rights, and why early-code cohorts need explicit sunset rules. Splitting these answers improves precision while preserving the unresolved referral-depth and historical-accounting boundary.

**Status:** Accepted for the authored rewards-reference layer; live sybil thresholds, referee benefits, issuance thresholds, campaign grants, transferability, precedence rules, cohort size, propagation depth, sunset timing, and backfill behavior remain operator/legal/accounting/implementation review.

## D-125: Split Referral Access Phasing Into Exact Phase Answers

**Decision:** Add authored rewards-reference pages for access-gated launch, unified access and referral identity, open participation with optional benefits, phase migration requirements, and referral launch sequencing.

**Reason:** The broad access-phasing page explains the operating model, but answer-engine readers need direct routes for the actual phase states and transition requirements. Splitting these answers makes launch-state questions answerable without turning the source model into live public commitments.

**Status:** Accepted for the authored rewards-reference layer; live beta gates, launch dates, supported sensitive actions, migration windows, code formats, activation timing, transferability, packs, artifacts, partner commitments, and historical credit behavior remain operator/legal/accounting/implementation review.

## D-126: Split Rewards Packs Into Exact Accounting Answers

**Decision:** Add authored rewards-reference pages for reward-pack future-facing status, point value states, pack EV and supply policy, artifact exposure and boost rules, and TGE qualifying exposure across reward forms.

**Reason:** The broad packs-and-artifacts page explains the concept, but answer-engine readers need direct routes for the policy caveat and the accounting mechanics. Splitting these answers lets the docs explain the future model without announcing live product commitments.

**Status:** Accepted for the authored rewards-reference layer; live pack launch, supply, probabilities, EV, conversion cost, transferability, artifact catalog, boost formulas, stacking rules, snapshot timing, TGE weights, and claim formulas remain operator/legal/accounting/implementation review.

## D-127: Split Referral Security Controls Into Exact Control Answers

**Decision:** Add authored rewards-reference pages for referral signer isolation and key rotation, replay-safe claim authorizations, admin override audit trails, anomaly monitoring signals, and fail-closed incident operations.

**Reason:** The broad referral settlement-security page names the control set, but answer-engine readers need direct routes for each settlement risk and control. Splitting these answers makes referral security legible without exposing private thresholds or implementation-sensitive runbooks.

**Status:** Accepted for the authored rewards-reference layer; live signer topology, key custody, message schemas, nonce storage, expiration windows, admin roles, override thresholds, anomaly rules, freeze scopes, payout holds, notification copy, and incident runbooks remain operator/security/legal/accounting/implementation review.

## D-128: Split Referral Metrics Into KPI-Layer Exact Answers

**Decision:** Add authored rewards-reference pages for referral supply KPIs, demand KPIs, growth-funnel KPIs, game-layer KPIs, and phase/version reporting rules.

**Reason:** The broad referral metrics pages explain the north star, but answer-engine readers need direct routes for what each KPI layer measures and why. Splitting these answers makes the reporting model inspectable while avoiding premature publication of targets, formulas, or phase dates.

**Status:** Accepted for the authored rewards-reference layer; live KPI definitions, formula versions, target bands, phase dates, campaign labels, market-quality thresholds, game-layer instrumentation, pack/artifact support, and dashboard release wording remain operator/analytics/legal/accounting/implementation review.

## D-129: Split Referral LP And Category Layer Into Exact Accounting Answers

**Decision:** Add authored rewards-reference pages for market-creation referral attachment, no-attachment/no-share semantics, LP-side bounded accounting, category partner overlays, and market referral precedence/payout buckets.

**Reason:** The broad market-scoped referral page explains the layer, but answer-engine readers need direct routes for attachment timing, what happens when attachment is absent, why the share should be bounded, how partner category overlays differ from user-level referral, and why precedence rules are required.

**Status:** Accepted for the authored rewards-reference layer; live attachment eligibility, lister roles, market-review criteria, partner identities, category tags, uplift rates, fee splits, precedence order, stacking rules, payout cadence, dispute procedures, and accounting ledgers remain operator/commercial/legal/accounting/implementation review.

## D-130: Split Referral Open Decisions Into Lane-Level Exact Answers

**Decision:** Add authored rewards-reference pages for referral policy decisions, referral economic policy decisions, referral settlement/security decisions, referral rollout/capacity decisions, and public-statement readiness.

**Reason:** The broad governance pages show that open decisions exist, but answer-engine readers need direct routes for the lane they are asking about. Splitting the open decisions keeps unresolved referral policy visible without turning architecture notes into final product commitments.

**Status:** Accepted for the authored rewards-reference layer; live referral depth, referee benefit variants, attachment changes, private commercial tiers, reward transferability, TGE weights, in-flow versus claim settlement, signer/custody controls, freeze/rollback scope, listing throughput, month-one/month-three features, partner sequencing, owner assignments, milestones, and acceptance criteria remain operator/product/security/legal/commercial/accounting/implementation review.

## D-131: Split Referral Conclusion And Traceability Into Architecture-Coherence Answers

**Decision:** Add authored rewards-reference pages for referrals as structural infrastructure, sustainable fee-flow optimization, adversarial trust constraints, referral topic ownership routing, and primary-chapter-first change policy.

**Reason:** The referral conclusion and design coverage map are the coherence layer for the whole referral corpus. Exact answer routes should explain why referrals are not just marketing, what the system optimizes, which constraints preserve trust, and how future docs changes should route through owning chapters instead of fragmenting policy.

**Status:** Accepted for the authored rewards-reference layer; live referral depth, fee-share formulas, partner terms, transferability, TGE weighting, signer controls, launch dates, and chapter ownership changes remain operator/product/security/legal/commercial/accounting/implementation review.

## D-132: Split Tokenized Points Perps Into Hypothetical Scenario Answers

**Decision:** Add authored rewards-reference pages for the tokenized-points product disclaimer, composable point-object chain, fractionalized wrapper flow, third-party listing/perp flow, and market-risk boundary.

**Reason:** The broad tokenized-points-perps page correctly labels the concept as hypothetical, but answer-engine readers need direct routes for whether it is an announced product, how point-linked objects could become composable, how a wrapper might work, how a third-party market could emerge, and what risks prevent this from being treated as endorsed current policy.

**Status:** Accepted for the authored rewards-reference layer; live pack launch, wrapper endorsement, transferability, listing eligibility, TGE treatment, redemption semantics, market support, legal disclosures, and derivative product policy remain operator/legal/product/security/accounting/implementation review.

## D-149: Split Percolator Conclusion Into Exact Synthesis Answers

**Decision:** Add authored Volume 04 manifesto pages for the seven-failure-mode synthesis, Percolator proof-of-concept boundary, USDC-hybrid path forward, industry migration toward stable settlement, and the two-question framing for permissionless perps.

**Reason:** Section 10 is the conclusion layer for the Percolator sequence. Exact summary routes let answer-engine readers ask for the takeaway without losing the fair distinction between technical proof, economic suitability, historical precedent, and Vibe's positive architecture claim.

**Status:** Accepted for the authored manifesto layer; third-party historical examples, live Vibe/Percolator implementation details, solver policy, insurance policy, cross-market mutualization, LP terms, and final comparative public claims remain fresh primary-source/operator/security/risk/legal/implementation review.

## D-148: Split Percolator Full Comparison Into Exact Head-To-Head Answers

**Decision:** Add authored Volume 04 manifesto pages for Vibe-versus-Percolator settlement/collateral architecture, LP-versus-solver economics, defense hierarchy, oracle execution, and the trustlessness/economic-design tradeoff.

**Reason:** Section 9 is a matrix-style comparison. Exact answer routes keep each axis independently answerable so the docs can credit Percolator's trustless on-chain strengths while showing why Vibe's active USDC-margined architecture is designed for the economic failure modes that dominate low-cap perpetuals.

**Status:** Accepted for the authored manifesto layer; live solver policy, LP terms, insurance allocation, cross-market risk limits, quote/refusal rules, trust assumptions, current deployed implementations, and final comparative public claims remain operator/security/risk/legal/implementation review.

## D-133: Split Referral System-Baseline Limits Into Exact Answers

**Decision:** Add authored rewards-reference pages for referral graph portability limits, mixed on/off-chain accountability, private-deal opacity risk, transferable-points hardening gates, and the requirement that referral features become reliable incentives under scale.

**Reason:** Neelo's system-baseline source does not only describe what works today; it names the early-stage limits that must be resolved before referral economics can scale. Exact answer routes make those limits visible without publishing unresolved portability, transferability, private partner, or settlement policy.

**Status:** Accepted for the authored rewards-reference layer; live referral-right transferability, graph migration, private partner terms, point transferability, source-bucket accounting, claim authorization, anti-abuse review, settlement contracts, and public economic commitments remain operator/legal/accounting/product/security/implementation review.

## D-134: Split Listing-Additional Annex Into Exact Market-Model Answers

**Decision:** Add authored manifesto pages for CLOB majors-first stage fit, CLOB economic synchrony requirements, strict listing-depth policy, pooled-collateral tail-TVL fragmentation, and open interest without payout reliability.

**Reason:** The broad listing-annex pages explain the model map, but answer-engine readers need direct routes for the operational vocabulary used to compare order books, vault rails, pool-backed perps, and Percolator-family systems. Splitting these answers improves market-structure precision without presenting third-party field observations as current venue documentation.

**Status:** Accepted for the authored manifesto layer; third-party venue parameters, market counts, lockups, auction cadence, TVL figures, payout behavior, and implementation/code-lineage claims remain current-source and publication-date review.

## D-135: Split SYMM LP Reporting Requirements Into Exact Operational Answers

**Decision:** Add authored protocol-reference pages for SYMM LP vault NAV time series, realized versus marked PnL splitting, drawdown and recovery reporting, gross-to-net attribution, and regime-updated benchmark retesting.

**Reason:** The broad SYMM LP KPI and data-guardrail pages explain that the case is a proof of mechanism rather than a yield promise, but exact-answer readers need direct routes for the reporting controls that make that boundary enforceable. Splitting the source's measurement gaps turns them into operational requirements before future LP performance claims are generalized.

**Status:** Accepted for the authored protocol-reference layer; live vault charts, accounting labels, withdrawal semantics, data ownership, gross-to-net allocation, fee/expense treatment, drawdown history, benchmark refresh cadence, and public yield wording remain operator/accounting/legal/implementation review.

## D-136: Split SYMM LP Scaling Playbook Into Phase-Level Exact Answers

**Decision:** Add authored protocol-reference pages for community replication readiness, pilot allocation discipline, validation phase reporting, tranche scale-up stop conditions, and steady-state operating bounds.

**Reason:** The broad SYMM LP replication page explains the playbook, but answer-engine readers need direct routes for each operational phase and gate. Splitting the source's replication and deployment requirements prevents the case study from being read as immediately scalable yield and turns it into a staged market-operations checklist.

**Status:** Accepted for the authored protocol-reference layer; live community eligibility, pilot sizes, treasury participation, validation cadence, tranche thresholds, stop conditions, utilization bands, emergency controls, reporting cadence, and public vault terms remain operator/risk/accounting/legal/implementation review.

## D-137: Split Proof Of Value LP Framework Into Exact Capital-Structure Answers

**Decision:** Add authored Volume 02 manifesto pages for liquidity-role separation, USDC-vault negative feedback loops, LP profit decomposition, project participation beyond revenue, and the value-reciprocity flywheel.

**Reason:** The broad Proof of Value and LP value-proposition pages explain why permissionless perps can create value, but answer-engine readers need exact routes for how the capital structure works. Splitting these pages makes the distinction between stable settlement capital and token inventory explicit, shows why generic USDC vaults can become too expensive, requires a gross-to-net LP economics bridge, explains project motives beyond fee share, and turns the flywheel into a testable alignment condition rather than a growth slogan.

**Status:** Accepted for the authored manifesto layer; live revenue shares, vault rights, solver funding sources, reserve requirements, rehypothecation policy, hedge PnL ownership, loss ordering, partner claims, market eligibility, and graduation thresholds remain operator/accounting/legal/risk/implementation review.

## D-138: Split USDC Risk Premium Derivation Into Exact Risk-Model Answers

**Decision:** Add authored Volume 04 manifesto pages for the USDC risk methodology stack, expected-loss decomposition, profitable manipulation condition, liquidation/keeper fragility, and stress-correlation cascade.

**Reason:** The broad required-risk-premium page explains that low-cap USDC backstops need high compensation, but answer-engine readers need direct routes for the mechanics underneath that conclusion. Splitting the derivation keeps game-theory attack logic, event-frequency/severity decomposition, liquidation execution risk, and correlated stress from being collapsed into one generic "risk premium" claim.

**Status:** Accepted for the authored manifesto layer; live OI thresholds, manipulation-cost estimates, oracle parameters, liquidation windows, keeper incentives, insurance allocation, loss-waterfall behavior, capital charges, APRs, and market-specific risk weights remain operator/risk/legal/accounting/implementation review.

## D-139: Split USDC Required APR Into Component-Level Answers

**Decision:** Add authored Volume 04 manifesto pages for the USDC opportunity-cost floor, expected-loss-as-capital-maintenance component, adverse-selection premium, break-even versus attractive APR distinction, and high-APR sustainability pressure.

**Reason:** The risk-model pages explain why losses can be large, but the answer engine also needs exact routes for how those losses translate into required LP return. Splitting the APR components makes the opportunity-cost floor, loss-maintenance layer, strategic-flow premium, market-equilibrium distinction, and fee/subsidy/emission sustainability pressure independently answerable.

**Status:** Accepted for the authored manifesto layer; live benchmark rates, expected-loss ranges, adverse-selection premium ranges, LP yield targets, fee levels, funding rates, spread policy, token-emission policy, subsidy plans, and token-backed APR claims remain operator/risk/accounting/legal/implementation review.

## D-140: Split USDC Empirical Validation And Finance Analogies Into Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for LP total-loss perception signals, USDC risk-premium-ratio diagnostics, unsecured-creditor analogy, catastrophe-underwriter analogy, and illiquid-market-maker analogy.

**Reason:** The APR derivation uses both empirical LP perception and finance analogies to make the required-return argument legible. Exact pages prevent those supports from being buried in a broad risk-premium page and let answer-engine readers distinguish credit risk, insurance tail risk, and illiquid market-making risk.

**Status:** Accepted for the authored manifesto layer; live LP survey evidence, risk-premium ratios, comparative APRs, yield-spread examples, insurance-premium examples, market-making fee examples, legal characterization, current vault terms, and final public economics remain operator/risk/accounting/legal/implementation review.

## D-141: Split USDC Structural Capital And RCE Figures Into Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for USDC structural capital burden, token-inventory structural capital, systemic leverage comparison, risk-adjusted efficiency multiplier, and solver drawdown versus protocol insolvency.

**Reason:** Neelo's Figure 3-5 sources carry the core capital-structure mechanics behind the USDC-versus-token-inventory argument. Exact answer routes keep the equations, leverage comparison, RCE multiplier, and loss-localization claim separate, so readers do not confuse source-model examples with live Vibe capital limits or protocol solvency guarantees.

**Status:** Accepted for the authored manifesto layer; live leverage limits, capital charges, token-inventory eligibility, solver capital requirements, hedge venues, loss waterfalls, vault rights, RCE multipliers, public economics, and final legal/risk/accounting interpretation remain operator/security/risk/accounting/legal/implementation review.

## D-142: Split Percolator Section 2 Architecture Into Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for Percolator's hybrid risk/execution model, one-market-one-slab accounting, inverted market-mode semantics, SOV insurance and deflation model, and formal-verification economic boundary.

**Reason:** The broad Percolator critique already explains that correct code can still instantiate fragile economics, but answer-engine readers need direct routes into the architecture terms. Splitting Section 2 keeps matcher execution, slab isolation, inverse market semantics, token-denominated insurance, and proof scope distinct before readers reach the later reflexivity and capital-efficiency critique.

**Status:** Accepted for the authored manifesto layer; live deployed Percolator parameters, matcher safety, SOV balances, market count, fee and circuit-breaker values, verification scope, audit status, current repository state, and security claims remain fresh primary-source and publication-date review.

## D-143: Split Percolator LP Economics Into Exact Risk Answers

**Decision:** Add authored Volume 04 manifesto pages for token-denominated fee illusion, rational LP paradox, token-margined short-volatility profile, pump-bankruptcy arithmetic, and Percolator low-utilization necessity.

**Reason:** The broad token-margined LP and 1x leverage pages explain the conclusion, but answer-engine readers need direct routes for the mechanics underneath it. Splitting Section 4 keeps the unit-of-account problem, LP motive problem, volatility payoff shape, inverse-PnL bankruptcy example, and utilization-safety interpretation separate enough to answer precise questions without overgeneralizing the source.

**Status:** Accepted for the authored manifesto layer; live Percolator SOV balances, current utilization, deployed risk parameters, haircut behavior, margin thresholds, fee/funding values, LP terms, and publication-date third-party claims remain fresh primary-source and operator/risk/legal/implementation review.

## D-144: Split Percolator Oracle Manipulation Into Exact Risk Answers

**Decision:** Add authored Volume 04 manifesto pages for the oracle trilemma, capped-oracle latency arbitrage, spot/perp pump-and-dump sequence, token-margin manipulation amplification, and ADL haircut as controlled crash.

**Reason:** The existing oracle-circuit-breaker, passive-matcher, and shorting-death-spiral pages explain the broad critique, but answer-engine readers need direct routes for the source's precise failure mechanics. Splitting Section 5 keeps the oracle tradeoff, deterministic catch-up window, cross-market attack path, margin-unit amplification, and payout-haircut credibility cost independently answerable.

**Status:** Accepted for the authored manifesto layer; live oracle providers, circuit-breaker values, matcher code, spread values, current Percolator deployment state, manipulation feasibility, ADL haircut implementation, and user-facing guarantees remain fresh primary-source and operator/security/risk/legal/implementation review.

## D-145: Split Percolator Capital Precedent Into Exact Efficiency Answers

**Decision:** Add authored Volume 04 manifesto pages for gross-OI collateral lockup, JIT liquidity duration mismatch, Futureswap toxic arbitrage precedent, Drift/LUNA token-collateral precedent, and the inverse-product retreat shown by Synthetix and BitMEX.

**Reason:** Section 6 ties Percolator's capital-efficiency critique to historical examples. Exact routes prevent readers from collapsing no-cross-margin, locked collateral, JIT duration, oracle-latency precedent, token-collateral black swans, and inverse-liability retreat into a generic "token margin is risky" claim.

**Status:** Accepted for the authored manifesto layer; third-party historical details, current venue/product states, live Percolator parameters, capital-lock behavior, JIT mechanics, and publication-date claims remain fresh primary-source and operator/security/risk/legal/implementation review.

## D-146: Split Percolator Strengths Into Exact Engineering Answers

**Decision:** Add authored Volume 04 manifesto pages for Percolator's pluggable matcher boundary, clean trust boundaries, balance-sheet safety invariant, fully on-chain keeper model, and the limit of engineering fixes against inverse-token economics.

**Reason:** Section 7 is the fair-critique layer: it credits Percolator before rejecting the token-margined economic model. Exact routes let readers inspect what the system gets right without collapsing engineering strengths into financial robustness or dismissing real technical achievements.

**Status:** Accepted for the authored manifesto layer; live verification scope, deployed program state, matcher implementations, keeper behavior, audit/security status, and current production claims remain fresh primary-source and operator/security/risk/legal/implementation review.

## D-147: Split Percolator USDC Alternative Into Exact Mechanism Answers

**Decision:** Add authored Volume 04 manifesto pages for USDC margin breaking the collateral double-hit, linear PnL versus hyperbolic payout, stable-margin manipulation economics, oracle-as-reference solver quoting, and cross-margin capital fungibility.

**Reason:** Section 8 is the mechanism bridge from the Percolator critique to Vibe's hybrid alternative. Exact routes keep stable margin, linear settlement, solver discretion, and cross-market capital use distinct instead of presenting "USDC margin" as one vague fix.

**Status:** Accepted for the authored manifesto layer; live margin parameters, solver quote rules, cross-margin implementation, insurance allocation, risk limits, supported assets, and current production claims remain operator/security/risk/legal/implementation review.

## D-150: Split Vibe Pillars Into Constraint-Level Exact Answers

**Decision:** Add authored Volume 04 manifesto pages for leverage making exploit resistance non-negotiable, markets becoming tradable before continuous flow exists, yield as architecture survival proof, order books solving the mature version, and Vibe being defined by its constraint set rather than listings alone.

**Reason:** The existing Vibe Pillars pages cover the overview, each broad pillar, and the coupled-design problem. The answer engine still benefits from narrower routes that translate the source's architecture thesis into the exact questions readers ask: why leverage changes the safety bar, why asynchronous flow matters, why capital must be paid, why order books are still the endpoint for mature markets, and why Vibe's product surface follows from constraints rather than from generic market breadth.

**Status:** Accepted for the authored manifesto layer; live listing eligibility, solver obligations, vault exposure, insurance policy, graduation criteria, risk limits, LP terms, fee routing, and market parameters remain operator/risk/legal/accounting/implementation review.

## D-151: Split One-Primitive Thesis Into Exact Validation And Lifecycle Answers

**Decision:** Add authored Volume 03 manifesto pages for the false-information-age validation bottleneck, creation-before-validation disorder, complete market expression, ungated derivatives access, and the continuous asset lifecycle.

**Reason:** The existing one-primitive pages cover the broad thesis, but the answer engine needs narrower routes for readers asking why AI/information abundance changes the problem, why universal issuance creates disorder, what derivatives add beyond spot, what permissionless derivative access removes from listing gatekeeping, and how token markets progress from creation to mature venues.

**Status:** Accepted for the authored manifesto layer; live listing eligibility, solver support, vault exposure, market approval process, leverage limits, graduation rules, integrations, and production timelines remain operator/product/risk/legal/implementation review.

## D-152: Split Perp Taxonomy Into Exact Architecture Answers

**Decision:** Add authored Volume 02 manifesto pages for synchronous matching's present-counterparty requirement, collateralization as the payout-source question, insurance topology following maturity, async-netted no-payer failure, and the solver as the initial network effect.

**Reason:** The existing framework and bootstrap-trilemma pages explain the design space broadly, but answer-engine readers need direct routes into the atomic mechanics: timing, payer identity, risk sharing, why one impossible quadrant fails, and how the solver starts the market before natural network effects exist.

**Status:** Accepted for the authored manifesto layer; live solver obligations, capital commitments, cross-margin eligibility, shared-insurance policy, market graduation thresholds, quote uptime, fee capture, and current production implementation remain operator/risk/implementation review.

## D-153: Split Competitive Barriers Into Exact Strategy Answers

**Decision:** Add authored Volume 02 manifesto pages for hybrid retrofit as a new-protocol problem, incumbent state migration risk, solver complexity as a replication barrier, the capital-efficiency trap, and integration/data network effects.

**Reason:** The existing replication-barriers page gives the broad moat thesis, but Ask needs narrower routes for operator, investor, partner, and researcher questions about why competitors cannot simply bolt on the model, what makes migration hard, what makes solvers scarce, why static architectures get trapped, and how data/integration effects compound.

**Status:** Accepted for the authored manifesto layer; live integrations, partner status, solver obligations, capital commitments, fee capture, competitor-specific judgments, timeline claims, and production economics remain operator/product/risk/legal/implementation review.

## D-154: Split Thiel Monopoly Analysis Into Exact Strategy Answers

**Decision:** Add authored Volume 02 manifesto pages for Vibe's 10x proprietary-technology test, software-like scale economics, brand as an earned market signal, the last-mover category question, and the safe publication boundary for monopoly verdicts.

**Reason:** The existing Thielian listing-monopoly, small-market wedge, and replication-barrier pages explain the broad strategy, but answer-engine readers also ask direct questions about specific Thiel criteria. Splitting the source prevents the docs from overloading "monopoly" as a slogan and gives precise routes for what is source-backed, what is conditional on execution, and what must remain review-bound before publication.

**Status:** Accepted for the authored manifesto layer; live monopoly/dominance claims, solver performance, graduation outcomes, integration status, market share, data-moat strength, public brand claims, production economics, and competitor-specific judgments remain operator/product/risk/legal/implementation review.

## D-155: Split Thiel Durability Analysis Into Exact Strategy Answers

**Decision:** Add authored Volume 02 manifesto pages for durability and long-term value, vertical integration of the market lifecycle, category creation versus feature competition, the Thiel risk checklist, and final scorecard interpretation.

**Reason:** The prior Thiel split handled proprietary technology, scale, brand, last-mover framing, and monopoly verdict boundaries. The remaining sections need direct Ask routes so readers can inspect what would make the thesis durable, how the lifecycle integration model works, why the competitive frame is category creation, which risks could falsify the thesis, and how to read the scorecard as evidence checklist rather than a dominance claim.

**Status:** Accepted for the authored manifesto layer; long-term cash-flow ladders, revenue/licensing claims, live integrations, automatic graduation promises, market share, competitor-specific judgments, regulatory conclusions, and final investment/dominance claims remain operator/product/risk/legal/implementation review.

## D-156: Split The Perp Bootstrap Conclusion Into Exact Summary Answers

**Decision:** Add authored Volume 02 manifesto pages for Neelo's contribution map, the dynamic-market insight, industry implications, future directions, and restated permissionless-perps vision.

**Reason:** The conclusion is where executive readers ask compressed questions: what the paper contributed, what the central insight is, what changes for exchanges/LPs/protocol designers, what still needs research, and what the final vision is. Splitting those sections gives the answer engine precise routes without forcing every summary question back to the broad bootstrap-trilemma page.

**Status:** Accepted for the authored manifesto layer; roadmap phases, Z-score thresholds, automatic graduation, partner/integration status, venue-specific behavior, live market counts, and universal availability remain operator/product/risk/legal/implementation review.

## D-157: Split The Perp Bootstrap Introduction Into Exact Foundation Answers

**Decision:** Add authored Volume 02 manifesto pages for the rise of perpetual futures, why existing perp solutions fail bootstrap, the listing-decision problem, the paper's thesis statement, and scope/limitations.

**Reason:** The existing framework, trilemma, conclusion, and Thiel pages answer deeper strategy questions, but answer-engine readers also need foundation routes from the introduction: why perps matter, why current architectures leave a bootstrap gap, why listing decisions need better evidence, what Vibe's thesis claims, and where the source stops short.

**Status:** Accepted for the authored manifesto layer; live market-size/share claims, venue-specific comparisons, current implementation state, graduation thresholds, integrations, regulatory conclusions, and universal listing claims remain fresh source/operator/product/risk/legal/implementation review.

## D-158: Split The Perp Bootstrap Abstract Into Exact Orientation Answers

**Decision:** Add authored Volume 02 manifesto pages for the Perp Classes / Z-Score paper abstract, keyword map, paper-structure roadmap, long-tail scale problem, and introduction contribution preview.

**Reason:** The existing introduction and conclusion pages cover specific claims, but the answer engine also needs orientation routes for readers asking what the paper is, what field it sits in, how it is organized, why the scale mismatch matters, and what the introduction promises before the proof develops.

**Status:** Accepted for the authored manifesto layer; source-time token/perp counts, live implementation state, autonomous graduation, Z-score policy, integrations, venue use of listing evidence, and universal availability remain fresh source/operator/product/risk/legal/implementation review.

## D-159: Split The Perp Framework And Landscape Bridge Into Exact Answers

**Decision:** Add authored Volume 02 manifesto pages for systematic perp categorization, framework implications, framework summary, existing-protocol landscape overview, and synchronous fully-netted order-book protocols.

**Reason:** The broad framework and trilemma pages explain the axes, but answer-engine readers also need direct routes for why the vocabulary exists, what it implies for lifecycle design, how to remember the table, how the source maps incumbent categories, and why order-book systems are mature-market endpoints rather than bootstrap engines.

**Status:** Accepted for the authored manifesto layer; live venue metrics, HIP-3 auction data, current dYdX/Hyperliquid/CEX architecture details, market counts, listing policies, insurance behavior, and production graduation rules remain fresh source/operator/product/risk review.
