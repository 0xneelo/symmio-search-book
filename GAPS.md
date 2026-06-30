# Gaps And Contradictions

## G-001: Discord Source Mining Is Blocked

The prompt asks to mine Discord, especially Lafa answers and repeated support questions. This environment does not have Discord export access. The prototype seeds a question list from local FAQ and source docs only.

The repository now has `src/search-book/scripts/build-discord-corpus.mjs` and generated `data/discord-corpus.*`, which define the import contract and Discord REST export path. That closes the tooling gap, not the source gap: no Discord messages, Lafa author id map, or public-use boundary are imported yet.

**Needed:** Discord export or channel/API access, channel list, date range, Lafa author identity, and permission to cite, paraphrase, use internally, or exclude the corpus.

## G-002: Competitive Sweep Opyn Target Is Excluded

The prompt requests a 25-sub-agent competitive sweep. The package now has a generated 50-doc target list across 25 lanes plus five returned explorer batches covering derivatives/options, DeFi, infrastructure, data/devtools, and product/wallet docs. It also has a published authored competitive benchmark synthesis page. The only unreviewed official-doc target is Opyn; the operator excluded Opyn because it shut down, so the launch benchmark remains a documented 49/50 sweep rather than using mirrors or third-party snippets.

**Disposition:** Resolved for v1 by documented exclusion. Keep the 49/50 benchmark and exclusion visible; replace or rerun this lane only in a future benchmark refresh.

## G-002A: 500-800 Page Manifest Is Mapped, Not Fully Authored

The manifest now maps 794 pages, mostly from Neelo's vision corpus plus protocol/product companions. The authored layer is growing around the strongest Neelo thesis material, official Symmio protocol mechanics, official Vibe trading guides, Neelo DDQ solver-risk material, the SYMM LP case-study setup/unit economics/risk/replication/data-guardrail layer, Neelo's referral architecture and quality-signal layer, and local product-reference mechanics, including market formation, Proof of Value, value alignment, token-holder inventory alignment, trader/project value loops, hybrid comparative advantage, validation/sustainability, perp design axes, static-design bootstrap failures, temporal separation of concerns, Z-score graduation, market price as verification, listing power, lifecycle gates, listing-plus-liquidity, order-book endpoint positioning, order-book bootstrap limits, RFQ-before-book sequencing, lifecycle hardening, programmatic graduation, gap-filling perp protocol shape, partnership posture, monopoly durability, perceived-versus-actual listing interest, curation-cost distortions, zero-cost evolutionary discovery, crypto's market-access disconnect, perps for the trenches, CLOB/vault long-tail limits, collateralized pool finite-tail limits, Percolator-wave settlement reality, async-tech versus sync-economics, long-tail perp model mapping, continuous truth markets, intent OTC verification, hybrid solver liquidity waterfalls, listing evidence, financialized rejection, token-margined LP economics, USDC LP backstop cascades, incentive-based attack risk, USDC LP risk premiums, token-inventory risk localization, risk-adjusted capital efficiency, oracle circuit-breaker risk, slab isolation, Percolator engineering/economics, USDC settlement separation, solver architecture, settlement state boundaries, solver engine loops, bootstrap oracle risk tiers, position lifecycle state machines, competitive replication/data moats, options lifecycle, information validation, universal issuance, information systems as validation infrastructure, issuance abundance as validation debt, spot-only market one-sidedness, tokens as information objects, self-correcting token market stack, derivatives as market discipline, perpetual design space, market assembly-line, CLOB graduation, liquidity-as-experience, the last primitive, token-margined risk, Vibe's exploit-resistance/bootstrap/yield pillars, funding defense hierarchy, funding-model control, funding core invariant, funding state variables, funding regime ladder, full funding objective, funding worked examples, gradient-flow balancing, utilization-mode switching, dynamic-pricing controls, cross-market risk mutualization, residual counterparty hedging, Force Close failure handling, solver default continuity, loss waterfalls, Symmio's clearing-house layer, bilateral intent lifecycle, solver event monitoring, collateral/margin/CVA, official Symmio funding epochs, cross-margin liquidations, settlement/profit realization, settlement costs and affiliate credits, solver operations/hedging, simple trade flow, order types, TP/SL, OI/liquidity, collateral/margining, fees/funding, account creation/login, deposits/withdrawals, portfolio/account data, account-health liquidations, security/audits, hotkeys, mobile PWA, TradingView controls, system visualization, project listing terms, referral-code flow, referral commission, rakeback, trading-program points, platform overview, volume snapshot cadence, Barometer source migration, points taxonomy, referral points as economic state, points claim bridge and vesting, rewards packs/artifacts, tokenized-points-perps as a hypothetical scenario, referral policy governance, and TGE multiplier caveats. Most of the 794-page corpus is still generated draft material rather than fully edited publication prose.

The latest Vibe product-reference pass publishes the final two product-reference operator-review pages: Vibe Platform Overview and Vibe Security And Audits. It keeps platform claims bounded to public-docs product shape rather than frozen market counts, leverage ceilings, revenue-share economics, token-holder rights, or chain support, and keeps security claims scoped to SYMMIO-Core v0.8.4 settlement contracts, Sherlock audit context, and token/staking coming-soon caveats. The previous Vibe market-creation and referral-guide pass publishes official-source coverage for Add Token Info, fees/funding, system visualization, project listing terms, project audit and exit rights, project supply-loan flow, project token custody, project profit-share boundaries, project solver profit sources, rakeback/trading fees, referral-code flow, and referral commission, with explicit boundaries around live payment/form details, legal terms, project commercial terms, fee/funding exactness, profit share, custody, solver economics, coming-soon referral flows, payout timing, and TGE settlement. The previous Symmio contract/options reference pass also publishes official-source coverage for the protocol contract surface, Account Layer and Virtual Accounts, contract quote lifecycle, withdrawal/provider system, frontend-builder/audit posture, and options intent lifecycle, with explicit version, product-support, and audit-scope boundaries.

The repo now has `src/search-book/scripts/build-publication-plan.mjs` and generated `data/publication-plan.*`, which turn the page-state registry, volume map, route ledger, gap queue, crosslinks, and source catalog into a progressive authoring queue. It queues all source-companion pages, carries source-block requirements, suggests whether to fold material into existing authored pages or create new authored source maps/reference pages, and separates candidate pages that still need source/operator/editorial review.

The coverage-aware publication-plan pass now reports all `792/792` source companions covered by authored pages and `0` companions needing authored coverage. Source companions remain useful for retrieval and traceability, but the authoring queue no longer needs to promote them as standalone public pages.

The latest Volume 04 publication batch adds funding formula, state, and control coverage: LP loss pressure, the LP master profit formula, master formula reading, the master optimization equation, math as problem-sharpening, math-not-market-solution boundaries, the control-problem framing, model reading boundaries, monitoring/governance maps, notation conventions, the one-line objective and invariant, operational path control, per-market state variables, and revenue/cost accounting maps. It keeps live formulas, objective weights, lambda values, risk scores, thresholds, alert triggers, solver obligations, accounting treatment, live revenue splits, insurance/ADL behavior, leverage schedules, token capacity, governance authority, and legal/risk/accounting-sensitive claims under source/operator/product/risk/legal/accounting review. The previous Volume 04 funding-objective and insurance batch adds dynamic-pricing multipliers, emergency acceleration/time ramps, the full funding objective, gradient-flow math, information traversal, insurance/buyback accounting, insurance cost penalties, insurance-fund utilization, insurance-mode spreads, insurance/safety budgets, key innovations, local-optima avoidance, and local risk penalties. Earlier Volume 04 funding-controls and risk-premium batches cover funding abstract accounting/control roadmaps, ADL and bell-curve examples, control-action maps, the funding core invariant, defense hierarchy, dynamic controls, USDC LP required-risk-premium framing, break-even versus attractive APR, cross-margin capital fungibility, cross-market risk mutualization, the Drift/LUNA token-collateral precedent, and fully on-chain keeper model tradeoffs.

The candidate review queue now includes the remaining `280` candidate pages after the first `518` source/prose/route/current-source/operator-boundary-reviewed pages moved to `published`. Its launch lanes are `0` final-review-ready pages, `280` operator-review pages, `0` source-refresh pages, `0` publication-date-review pages, and `0` editorial-review pages. The product-reference, competitive-context, compendium singleton, Volume 02, and Volume 03 lanes have no remaining candidate pages; protocol-reference candidates are down to `96`, rewards-referrals candidates are down to `84`, manifesto candidates are down to `100`, and the remaining volume lanes are Volume 04 (`88`), Volume 05 (`108`), and Volume 06 (`84`).

**Needed:** Continue with the operator-review lane; promote approved pages to `published`, keep source companions out of public navigation, and keep the generated retrieval layer synchronized as sources change.

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

The build/buy decision is resolved: build a standalone answer-engine service with SQLite, backed by the OpenAI-compatible RAG runtime. Retrieval, source chunking, citation validation, adversarial refusals, live `gpt-4.1-mini` evaluation, HTTP service endpoints, SQLite event persistence, ratings, Search Insights reads, basic request rate limiting, configurable event retention, and a disabled-by-default token-gated moderation export are now implemented in the current service boundary. Production still needs service deployment, public frontend wiring, production LLM environment installation, reviewer/admin operating workflow, and remaining source imports.

**Needed:** Public frontend platform/deploy route, production service environment, frontend-to-service deployment wiring, reviewer/admin operating workflow, and operational hardening.

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
