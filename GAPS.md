# Gaps And Contradictions

## G-001: Discord Source Mining Is Blocked

The prompt asks to mine Discord, especially Lafa answers and repeated support questions. This environment does not have Discord export access. The prototype seeds a question list from local FAQ and source docs only.

**Needed:** Discord export, channel list, date range, and permission to cite or paraphrase.

## G-002: 25-Agent Competitive Sweep Is Not Complete

The prompt requests a 25-sub-agent competitive sweep. The package now has a generated 50-doc target list across 25 lanes plus five returned explorer batches covering derivatives/options, DeFi, infrastructure, data/devtools, and product/wallet docs. It also has an authored competitive benchmark synthesis page. It is still not complete because the official Opyn docs URL was not crawlable in the returned batch or the follow-up web check.

**Needed:** Operator-provided official Opyn source access, replacement target, or exclusion decision without relying on mirrors or third-party snippets.

## G-002A: 500-800 Page Manifest Is Mapped, Not Fully Authored

The manifest now maps 794 pages, mostly from Neelo's vision corpus plus protocol/product companions. The authored layer is growing around the strongest Neelo thesis material, official Symmio protocol mechanics, official Vibe trading guides, and Neelo DDQ solver-risk material, including market formation, Proof of Value, listing power, solver architecture, options lifecycle, information validation, universal issuance, derivatives as market discipline, perpetual design space, market assembly-line, CLOB graduation, liquidity-as-experience, the last primitive, token-margined risk, Vibe's exploit-resistance/bootstrap/yield pillars, funding defense hierarchy, residual counterparty hedging, Force Close failure handling, solver default continuity, loss waterfalls, Symmio's clearing-house layer, bilateral intent lifecycle, solver event monitoring, collateral/margin/CVA, simple trade flow, order types, TP/SL, OI/liquidity, collateral/margining, and fees/funding. Most of the 794-page corpus is still generated draft material rather than fully edited publication prose.

**Needed:** Session 2 authoring pipeline, page templates, source blocks, answer-engine ingestion, and progressive publication plan.

## G-003: Referral Depth Is Contradictory

Evidence found:

- `server/points.js` has a default referral depth of 5 and supports config values up to 15.
- `server/routes/me.js` uses configured depth for network and volume aggregation.
- `src/dashboard/volume.jsx` still carries 5-level language.
- `src/dashboard/faq.jsx` says referral points and rewards count across 15 levels.
- Linear rollout notes describe a 15-level schedule and backfill.

**Needed:** Product decision on what a public user sees today, what the system currently runs in production, and how historical points are treated.

## G-004: Revenue Phase A Versus Phase B Needs Public Wording

Phase A is implemented as estimated revenue from network volume, configurable platform fee, and referrer share. Phase B issues describe per-venue platform revenue, VibeCaps LP profit share, liquidation display, funding, solver data, and points farmed.

**Needed:** Decide which Phase B items are public roadmap, internal roadmap, or already live but not surfaced.

## G-005: Subgraph Migration Is Not Implemented In This Repo

Linear research says Goldsky subgraphs should become the more accurate network-volume source than the current Vibe backend wallet-volume endpoint. Current local code still uses the backend REST source and daily snapshots.

Goldsky subgraph and GraphQL endpoint docs are now registered as public citation sources, but this repo still has not implemented the Barometer migration.

**Needed:** Implementation status, exact Vibe subgraph endpoint/venue mapping suitable for publication, and whether docs should describe the future subgraph source or the current production source.

## G-006: Exact Vibe Market Counts Need Fresh Verification Before Publication

Vibe docs claim Binance perp market coverage and 390+ markets. Since market counts change, exact counts should be verified on the intended publication date.

The current official product overview was re-fetched during the authored Vibe product-reference pass, but the count remains a publication-date verification item rather than a static compendium fact.

**Needed:** Current Vibe product source or live market index snapshot.

## G-007: Symmio Whitepaper History Is Not Fully Mined

The public GitBook page points to the whitepaper and protocol docs, and the SYMM-IO GitHub docs repository is now registered as a history/source-control starting point. A full oldest-to-current whitepaper comparison was not completed in this pass.

**Needed:** Exact original whitepaper artifact, version-history comparison, relevant GitHub commits, and any archived docs.

## G-008: Options And Vault-Backed Inventory Need More Primary Sources

The prompt frames Vibe x Symmio around options intents, vault-backed inventory, PartyA buyers, solvers, and Symmio settlement. The current Symmio Options v0.2.1 docs, Diamond architecture, PartyA/PartyB open-close facets, and Instant Layer docs are now registered and synthesized into `authored-options-intent-lifecycle`. The remaining gap is the Vibe-specific covered-call/vault-backed inventory example and exact public exposure semantics.

**Needed:** Product owner confirmation, Vibe-specific example lifecycle, vault source/coverage rules, and whether vault LPs can see exact covered-call exposure before publishing product-specific claims.

## G-009: Public Versus Internal Terminology Needs Owner Review

Terms like VibeCaps, network revenue, referral commission, Vibe points, trading points, onboarding points, PartyA, PartyB, solver, and MM are all used across sources. Some are protocol terms, some product terms, and some campaign terms.

**Needed:** Canonical glossary approval.

## G-010: Production Answer Engine Needs A Build/Buy Decision

The prototype proves the interaction pattern only. Production still needs retrieval strategy, source chunking, answer citations, rate limits, abuse controls, analytics retention, and gap triage workflow.

**Needed:** Platform decision and implementation plan.

## G-011: Vibe Trading Notion Is Not Ingested

The source spec names the Vibe Trading Notion workspace as a required working source. This repository has public Vibe docs, Neelo's GitHub corpus, local code, and Linear-derived facts, but no Notion export or readable local copy.

**Needed:** Notion export or shared read access, plus publication rules for quoting, paraphrasing, or internal-only synthesis.
