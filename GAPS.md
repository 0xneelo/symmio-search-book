# Gaps And Contradictions

## G-001: Discord Source Mining Is Blocked

The prompt asks to mine Discord, especially Lafa answers and repeated support questions. This environment does not have Discord export access. The prototype seeds a question list from local FAQ and source docs only.

The repository now has `src/search-book/scripts/build-discord-corpus.mjs` and generated `data/discord-corpus.*`, which define the import contract and Discord REST export path. That closes the tooling gap, not the source gap: no Discord messages, Lafa author id map, or public-use boundary are imported yet.

**Needed:** Discord export or channel/API access, channel list, date range, Lafa author identity, and permission to cite, paraphrase, use internally, or exclude the corpus.

## G-002: Competitive Sweep Opyn Target Is Excluded

The prompt requests a 25-sub-agent competitive sweep. The package now has a generated 50-doc target list across 25 lanes plus five returned explorer batches covering derivatives/options, DeFi, infrastructure, data/devtools, and product/wallet docs. It also has a published authored competitive benchmark synthesis page. The only unreviewed official-doc target is Opyn; the operator excluded Opyn because it shut down, so the launch benchmark remains a documented 49/50 sweep rather than using mirrors or third-party snippets.

**Disposition:** Resolved for v1 by documented exclusion. Keep the 49/50 benchmark and exclusion visible; replace or rerun this lane only in a future benchmark refresh.

## G-002A: 500-800 Page Manifest Is Authored And Published; Source/Deploy Gaps Remain

The manifest maps 794 pages, mostly from Neelo's vision corpus plus protocol/product companions. The authored layer is now book-scale and launch-classified: `data/page-state-registry.*` reports 799 authored pages, 798 published public-navigation pages, 0 candidate pages, 792 source companions, and 3 internal drafts. The public compendium spans the strongest Neelo thesis material, official Symmio protocol mechanics, official Vibe trading guides, Neelo DDQ solver-risk material, the SYMM LP case-study layer, referral architecture, rewards and tokenized-points boundaries, and local product-reference mechanics. Source companions remain retrieval and traceability material, not public navigation pages.

The latest Vibe product-reference pass publishes the final two product-reference operator-review pages: Vibe Platform Overview and Vibe Security And Audits. It keeps platform claims bounded to public-docs product shape rather than frozen market counts, leverage ceilings, revenue-share economics, token-holder rights, or chain support, and keeps security claims scoped to SYMMIO-Core v0.8.4 settlement contracts, Sherlock audit context, and token/staking coming-soon caveats. The previous Vibe market-creation and referral-guide pass publishes official-source coverage for Add Token Info, fees/funding, system visualization, project listing terms, project audit and exit rights, project supply-loan flow, project token custody, project profit-share boundaries, project solver profit sources, rakeback/trading fees, referral-code flow, and referral commission, with explicit boundaries around live payment/form details, legal terms, project commercial terms, fee/funding exactness, profit share, custody, solver economics, coming-soon referral flows, payout timing, and TGE settlement. The previous Symmio contract/options reference pass also publishes official-source coverage for the protocol contract surface, Account Layer and Virtual Accounts, contract quote lifecycle, withdrawal/provider system, frontend-builder/audit posture, and options intent lifecycle, with explicit version, product-support, and audit-scope boundaries.

The repo now has `src/search-book/scripts/build-publication-plan.mjs` and generated `data/publication-plan.*`, which turn the page-state registry, volume map, route ledger, gap queue, crosslinks, and source catalog into a progressive authoring queue. It queues all source-companion pages, carries source-block requirements, suggests whether to fold material into existing authored pages or create new authored source maps/reference pages, and separates candidate pages that still need source/operator/editorial review.

The coverage-aware publication-plan pass now reports all `792/792` source companions covered by authored pages and `0` companions needing authored coverage. Source companions remain useful for retrieval and traceability, but the authoring queue no longer needs to promote them as standalone public pages.

The latest Volume 04 publication batch completes the entire Volume 04 candidate lane by publishing the residual funding-market-balancing, hybrid solver liquidity waterfall, intent OTC verification, LP yield/capital-efficiency, residual counterparty balance-sheet, Thumbs Down mechanism, token-vault versus USDC-pool, listing-source-of-truth, and yield-survival pages. It keeps live funding/control parameters, solver liquidity routing, intent/OTC verification claims, LP yield/economics, counterparty guarantees, token-vault versus USDC pool semantics, listing-source claims, market-survival conclusions, and legal/risk/accounting/security-sensitive advice under primary-source/operator/product/risk/legal/security review. Previous Volume 04 passes completed the Percolator/token-margined, USDC-vs-token-margined, and Funding Rate Model candidate tracks.

The latest Volume 05 publication batches publish the funding-defense, solver-risk operations, SYMM LP setup/evidence, SYMM LP performance/economics, residual Solver/LP economics, technical/information manifesto, and final protocol/source-boundary clusters. The funding-defense pass covers conditional global insurance allocation, conservative launch collateralization, discontinuous-market guardrails, external USDC LP risk-premium mismatch, ADL priority/target/trigger handling, bell-curve transfer logic, defense activation/cost ordering, exposure loss estimates, insurance spend caps, hedge-cost coverage, local/global insurance, solver token-inventory defense, netting, defense budgets, and surplus/shortfall accounting. The solver-risk pass covers internal inventory, internal netting, liquidity-collapse freeze logic, protective posture, first-loss/loss-waterfall handling, LP vault exposure, market-tier limits, netting-state risk transfer, protocol-owned solver depletion, residual-counterparty spread/hedge-first execution, RFQ/last-look controls, strict/soft liquidation modes, CVA buffers, solver default/continuity, hedging failure/resource buffers, strategic unhedged exposure, tail-event profit caps, trader compensation continuity, and VibeCaps hedge-first requirements. The SYMM LP setup/evidence pass covers benchmark reading, beta-report KPI requirements, case setup, community replication readiness, dashboard data cuts, data guardrails, document maps, drawdown/recovery reporting, executive interpretation, favorable-regime caveats, gross-to-net attribution, headline result shape, market context, proof-of-possibility framing, realized/marked PnL split, regime dependence, risk/edge cases, and reproducibility notes. The SYMM LP performance/economics pass covers bootstrap collateral role, current debt/UPnL, economic channels, low-volume drivers, operational objectives, pilot allocation discipline, regime-updated benchmarks, steady-state bounds, tranche stop conditions, unit economics, vault NAV time series, and yield methodology. The residual economics pass covers LP ignition deposits, LP profit and dynamic pricing, project-token inventory, solver-funded stablecoin operations, replication/scaling/scope/test-case reporting, and token-holder/token-LP alignment. The technical/information manifesto pass covers bootstrap oracle risk tiers, settlement state and contract responsibilities, position lifecycle state machines, solver operating loops, quote/risk engines, technical capability/security models, external solver first-look routing, safety-premium backstop quotes, pass-through execution, TWAP inventory rebalancing, and LP capacity rent. The final boundary pass covers Symmio whitepaper-history evidence limits, SuperFlow/SHE API scope without claiming unresolved SSHE coverage, and solver worst-case scenario routing. These pages keep live insurance allocation, launch collateralization, ADL settings, bell-curve thresholds, hedge-cost coverage, defense budgets, netting rules, solver liquidation/default behavior, compensation, VibeCaps inventory/hedge requirements, SYMM LP yield/accounting/performance claims, Phase B economics, reproducibility, audited attribution, live contract/security guarantees, solver routing, execution policy, exact original-whitepaper claims, SSHE completeness, and legal/risk/accounting/security-sensitive advice under primary-source/operator/product/risk/legal/security review.

The latest Volume 06 referral architecture source-map batch publishes the first remaining rewards/referrals operator-review pages: Referral Program Source Table Of Contents, Referral Three-Plane Architecture, Referral Identity And Claim Flow, Referral Unified Access And Identity, Referral Metrics And Integrity, Referral Dashboard Reporting Standards, Referral Design Coverage Routing Map, and Referral Related Chapter Routing. These pages keep referral source routing, identity and claim-flow implementation, dashboard metrics, public 15-level referral depth with additive backfill, Phase B economics, final TGE settlement, reward economics, transferability, signer/security controls, rollout capacity, and anti-gaming enforcement inside their approved public/source boundaries.

The latest Volume 06 referral market-formation batch publishes the next rewards/referrals architecture pages: Referral Architecture As Market Formation, Referral Architecture Failure Modes, Referral Architecture Target Principle, Referral Is Not A Marketing Widget, Referral Attachment At Market Creation, Referral Market Creation Velocity, Referral Durable Fee-Producing Attribution, Referral Sustainable Fee Flow Objective, and Referral Reliable Incentives Under Scale. These pages keep referral-as-market-formation framing, failure modes, settlement/policy separation, market-scoped attachment, quality-adjusted market creation velocity, durable fee-producing attribution, sustainable fee flow, reliable incentives under scale, public 15-level referral depth with additive backfill, Phase B economics, private partner overlays, reward accounting, TGE settlement, transferability, signer/security controls, anti-gaming enforcement, dashboard implementation metrics, market-performance promises, and live rollout state inside their approved public/source boundaries.

The latest Volume 06 referral policy and KPI batch publishes the next rewards/referrals architecture pages: Referral Category Partner Overlays, Referral Claim Versus In-Flow Rebate UX, Referral Code Activation Gates, Referral Demand KPIs, Referral Dual Incentive Rails, Referral Early-Code Scarcity Cohorts, Referral Economic Policy Decision Lane, Fail-Closed Referral Incident Operations, Referral Game-Layer KPIs, Referral Graph Portability Limits, Referral Growth Funnel KPIs, and Referral Identity Anchor. These pages keep category overlays, rebate UX, activation gates, demand and growth KPIs, dual incentive rails, early-code scarcity, economic policy decisions, fail-closed operations, future game-layer metrics, graph portability, identity anchoring, public 15-level referral depth with additive backfill, Phase B economics, private partner overlays, payout/rebate formulas, reward accounting, TGE settlement, transferability, signer/security controls, anti-gaming enforcement, live dashboard formulas, exact launch targets, incident thresholds, graph migration rights, and rollout state inside their approved public/source boundaries.

The latest Volume 06 referral phase and governance batch publishes the next rewards/referrals architecture pages: Referral Illustrative Phase Targets, Referral Launch Sequencing, Referral Phase Definitions, Referral Phase Migration Requirements, Referral Phase And Version Reporting Rules, Referral Policy Clarity Requirements, Referral Policy Decision Lane, Referral Policy Governance, Referral Public Statement Readiness, Referral Rollout And Capacity Decision Lane, and Referral Rollout Governance Checklist. These pages keep phase targets, launch sequencing, migration, formula-version reporting, policy clarity, governance, public statement readiness, rollout capacity, public 15-level referral depth with additive backfill, Phase B economics, private partner overlays, final reward/rakeback/referral percentages, payout/rebate formulas, TGE settlement, transferability, signer/security controls, anti-gaming enforcement, launch dates, eligibility thresholds, target bands, phase cutovers, incident thresholds, partner commitments, and rollout state inside their approved public/source boundaries.

The latest Volume 06 referral economics and benefit-boundary batch publishes the next rewards/referrals architecture pages: Referral LP-Side Bounded Accounting, Referral Market Precedence And Payout Buckets, Referral Mixed Accountability Boundary, No Market Attachment Means No Market-Level Share, Referral Open Participation With Optional Benefits, Referral Points As Economic State, Referral Private Deal Opacity Risk, Referral Public And Private Economics Boundary, Referral Public And Private Policy Overlays, Referral Rakeback Policy Model, Referral Tiering Constraint Boundaries, and Referral Uniform Referee Benefit. These pages keep LP-side accounting, payout buckets, mixed accountability, market attachment, open participation, referral points, private overlays, public/private economics, rakeback, tiering, uniform referee benefits, public 15-level referral depth with additive backfill, Phase B economics, private partner terms, final percentages, caps, stacking, thresholds, payout cadence, TGE conversion, transferability, reward weighting, signer/security controls, anti-gaming enforcement, legal/accounting/investment-sensitive claims, and future depth or eligibility changes inside their approved public/source boundaries.

The latest Volume 06 referral security and settlement batch publishes the next rewards/referrals architecture pages: Referral Issuance And Anti-Gaming, Referral Qualified Issuance Gating, Replay-Safe Referral Claim Authorizations, Referral Rights Ownership Model, Referral Settlement Security Controls, Referral Settlement And Security Decision Lane, Referral Signer Isolation And Key Rotation, and Referral Transferable Points Hardening Gate. These pages keep anti-gaming controls, qualified issuance, replay-safe claims, referral-right ownership, settlement controls, signer isolation, key rotation, transferable-points hardening, public 15-level referral depth with additive backfill, Phase B economics, signer authority, claim authorization formats, replay domains, transferability, anti-gaming enforcement specifics, key-management procedures, settlement timing, TGE conversion, private ledgers, exploit/incident procedures, legal/accounting/security-sensitive advice, and unlaunched reward mechanics inside their approved public/source boundaries.

The final Volume 06 rewards and tokenized-points batch publishes the remaining 24 rewards/referrals pages: the referral-metrics and KPI set, reward-pack architecture and guardrails, rewards packs/artifacts, TGE qualifying-exposure boundaries, tokenized-points wrapper/listing/perps hypotheticals, and Vibe Trading Program Points. These pages keep reward-pack availability, pack/artifact issuance, supply, rarity, probability, EV, point costs, transferability, tokenized-points markets, TGE conversion, snapshot, vesting, qualifying-exposure accounting, automatic policy triggers, and legal/accounting/investment-sensitive claims inside publication boundaries.

The candidate review queue is complete: `0` final-review-ready pages, `0` operator-review pages, `0` source-refresh pages, `0` publication-date-review pages, and `0` editorial-review pages. All 798 public authored routes are published. The remaining launch gaps are source ingestion, production LLM/deploy configuration, Discord/Lafa import, Notion ingestion, SSHE/oldest-whitepaper identification, and platform routing.

**Needed:** Keep source companions out of public navigation, keep internal drafts out of answer synthesis, and keep the generated retrieval layer synchronized as sources or operator decisions change.

## G-003: Referral Depth Was Contradictory, Now Resolved

Evidence found:

- `server/points.js` has a default referral depth of 5 and supports config values up to 15.
- `server/routes/me.js` uses configured depth for network and volume aggregation.
- Older dashboard copy carried 5-level language.
- `src/dashboard/faq.jsx` says referral points and rewards count across 15 levels.
- Linear rollout notes describe a 15-level schedule and backfill.

**Disposition:** Resolved for v1. Public referral depth is 15 levels. Historical backfill is additive and never lowers a balance.

## G-004: Revenue Phase A Versus Phase B Public Wording Is Resolved For v1

Phase A is implemented as estimated revenue from network volume, configurable platform fee, and referrer share. Phase B issues describe per-venue platform revenue, VibeCaps LP profit share, liquidation display, funding, solver data, and points farmed.

**Disposition:** Resolved for v1. Publish the Phase A formula `networkVolume × platformFeeRate × referrerPlatformShare` with defaults `0.05%` / `5 bps` platform fee and `30%` referrer platform share. Phase B economics are out of scope for v1 and should continue to refuse in answer validation.

## G-005: Subgraph Migration Is Not Implemented In This Repo

Linear research says Goldsky subgraphs should become the more accurate network-volume source than the current Vibe backend wallet-volume endpoint. Current local code still uses the backend REST source and daily snapshots.

Goldsky subgraph and GraphQL endpoint docs are now registered as public citation sources, and `authored-barometer-subgraph-upgrade` explains the current-source versus target-source distinction. This repo still has not implemented the Barometer migration, and the exact Vibe subgraph endpoint/venue mapping remains implementation-tracked rather than a v1 publication blocker.

**Disposition:** Resolved for v1. Docs describe the current production source as backend REST wallet totals plus daily snapshots and describe Goldsky/subgraph-backed Barometer as the tracked upgrade. Exact Vibe subgraph endpoint and venue mapping remain implementation details under SYN-200, not a docs blocker.

## G-006: Exact Vibe Market Counts Need Fresh Verification Before Publication

Vibe docs claim Binance perp market coverage and 390+ markets. Since market counts change, exact counts should be verified on the intended publication date.

The current official product overview and platform overview were re-fetched during authored Vibe product-reference passes. A 2026-06-30 live public-docs check confirmed the official "What is Vibe Trading?" page still says all Binance perp markets and "390+ markets," while the platform page says "390+ Markets with up to 60x Leverage (x100 on some)." That is enough to cite the public-docs wording, but the count remains a publication-date verification item rather than a static compendium fact.

**Needed:** Current Vibe product source or live market index snapshot.

## G-007: Symmio Whitepaper History Is Not Fully Mined

The public GitBook page points to the whitepaper and protocol docs, and the SYMM-IO GitHub docs repository is registered as a history/source-control starting point. Official Git evidence now confirms that `SYMM-IO/protocol-core` starts on 2023-06-13, `SYMM-IO/docs` starts on 2023-08-22, and the first located whitepaper file in the official docs repo is `Whitepaper/SYMMIO_paper_0_8.pdf`, added on 2023-11-16 by commit `e1715f85768b7f06933e91e41568422591729e16`.

A 2026-06-30 re-fetch of the current official Symmio whitepaper page confirms that the public docs still point to `SYMMIO_paper_0_8.pdf` and frame the whitepaper/protocol as evolving work. This supports a current source-boundary answer, but it still does not prove the original/oldest artifact.

This narrows the gap but does not close it. The exact original/oldest whitepaper artifact, any 2021 source, and a full oldest-to-current comparison are still not in the registered corpus.

**Needed:** Exact original whitepaper artifact, version-history comparison before v0.8 if it exists, and any archived docs outside the current official repositories.

## G-008: Options And Vault-Backed Inventory Need More Primary Sources

The prompt frames Vibe x Symmio around options intents, vault-backed inventory, PartyA buyers, solvers, and Symmio settlement. The current Symmio Options v0.2.1 docs, Diamond architecture, PartyA/PartyB open-close facets, and Instant Layer docs are now registered and synthesized into `authored-options-intent-lifecycle`. The remaining gap is the Vibe-specific covered-call/vault-backed inventory example and exact public exposure semantics.

**Needed:** Product owner confirmation, Vibe-specific example lifecycle, vault source/coverage rules, and whether vault LPs can see exact covered-call exposure before publishing product-specific claims.

## G-009: Public Versus Internal Terminology Needs Owner Review

Terms like VibeCaps, network revenue, referral commission, Vibe points, trading points, onboarding points, PartyA, PartyB, solver, and MM are all used across sources. Some are protocol terms, some product terms, and some campaign terms.

`authored-points-taxonomy` now separates onboarding points, referral points, network/trading points, and Vibe points using local code plus public Vibe docs. The canonical naming stance is approved for v1, and the final public TGE settlement formula is deferred/not public for v1.

**Disposition:** Resolved for v1. The canonical taxonomy separates onboarding points, referral points, network/trading points, and Vibe points. The public TGE settlement formula is deferred and not public for v1.

## G-010: Production Answer Engine Build Decision Is Resolved; Service Hardening Remains

The build/buy decision is resolved: build a standalone answer-engine service with SQLite, backed by the OpenAI-compatible RAG runtime. Retrieval, source chunking, citation validation, adversarial refusals, live `gpt-4.1-mini` evaluation, HTTP service endpoints, SQLite event persistence, ratings, Search Insights reads, basic request rate limiting, configurable event retention, a disabled-by-default token-gated moderation export, direct SQLite gap-summary job, and internal reviewer operations runbook are now implemented in the current service boundary. Production still needs service deployment, public frontend wiring, production LLM environment installation, production moderation access, assigned reviewer owner/cadence, and remaining source imports.

**Needed:** Public frontend platform/deploy route, production service environment, frontend-to-service deployment wiring, production moderation access, reviewer owner/cadence assignment, backup/monitoring hardening, and remaining source imports.

## G-011: Vibe Trading Notion Is Not Ingested

The source spec names the Vibe Trading Notion workspace as a required working source. This repository has public Vibe docs, Neelo's GitHub corpus, local code, and Linear-derived facts, but no Notion export or readable local copy.

**Needed:** Notion export or shared read access, plus publication rules for quoting, paraphrasing, or internal-only synthesis.

---

## Resolutions & Dispositions (2026-06-29)

Operator decisions recorded this session (Linear epic SYN-209; operator mirror in `_specs/app-docs/OPERATOR-INBOX.md`).

- **G-001 Discord** — Disposition: build a Discord scraper (SYN-225), not a manual export. Corpus enrichment; does not block v1. Discord-sourced answers stay refused until ingested.
- **G-002 Opyn sweep** — ✅ RESOLVED: Opyn excluded (shut down, low priority) — SYN-213. Sweep finalized 49/50 with documented exclusion.
- **G-002A Manifest authoring** — Disposition: SYN-221 (promote source-companion drafts → publication pages + normalize terminology). Ongoing; the deterministic engine is already prod-ready.
- **G-003 Referral depth** — ✅ RESOLVED: public = **15 levels** (SYN-212); historical backfill additive (never lowers a balance). Fix stale 5-level copy in `src/dashboard/volume.jsx`.
- **G-004 Revenue wording** — ✅ RESOLVED: publish Phase-A formula `networkVolume × platformFeeRate × referrerPlatformShare` incl. defaults **0.05% (5 bps) fee + 30% referrer share** (SYN-212). Phase B out of scope for v1.
- **G-005 Subgraph** — ✅ RESOLVED (stance, operator 2026-06-29): docs describe the **current production source** as live and the Goldsky subgraph as a tracked upgrade. Implementation-only remainder: exact Vibe subgraph endpoint/venue mapping under SYN-200 — not a docs blocker.
- **G-006 Market counts** — Disposition: not a blocker — treat exact counts as a **publication-date verification** item (re-fetch official Vibe overview at publish), not a static compendium fact.
- **G-007 Whitepaper history** — Disposition: scrape the oldest public version (SYN-226). Origin-story completeness pending scrape.
- **G-008 Options/vault sources** — ✅ RESOLVED (operator 2026-06-29): keep the **generic Symmio options/intent lifecycle** for v1 (already authored); Vibe-specific covered-call / vault-backed claims **parked** until the operator provides the example.
- **G-009 Terminology/glossary** — ✅ RESOLVED (operator 2026-06-29): the point **taxonomy** (onboarding/referral/network/Vibe points) is **approved as canonical**; the public **TGE settlement formula is deferred / not-public for v1**.
- **G-010 Answer-engine build/buy** — ✅ RESOLVED: **BUILD** — standalone answer-engine service + SQLite (SYN-217) + OpenAI openai-compatible RAG runtime (SYN-211/SYN-215). Retrieval/chunking/citations/refusal already in the contract; rate-limits/abuse/analytics = SYN-219. Public frontend platform still open (inbox #4 / SYN-210).
- **G-011 Notion** — Disposition: provided (`https://vibe-trading.notion.site/?pvs=73`); ingestion pending (SYN-226).
- **G-012 Add-Token-Info** — ✅ RESOLVED: official Markdown fetched from `https://docs.vibe.trading/more-info/add-token-info.md`; authored reference page added. Payment details remain routed to the live in-app form.

**All publication-stance questions are now resolved** (operator, 2026-06-29). The only remaining items are **implementation/ingestion, not decisions**: the G-005 subgraph endpoint/venue mapping (SYN-200), source ingestion/scrapes (SYN-225/SYN-226), and the parked Vibe-specific options example (G-008 — re-open only if/when the operator provides one).
