# Source Registry

This registry is the current source map for the Session 1 dossier. It is not exhaustive yet.

## Local Specs

| Key | Source | Use |
| --- | --- | --- |
| `spec-prompt` | `/home/tabor/.codex/attachments/4632c9a8-89bd-47cd-9f2b-514b80548daa/pasted-text-1.txt` | Original objective and non-negotiables. |
| `spec-00` | `_specs/app-docs/00-goal-prompt.md` | Full goal prompt in repo. |
| `spec-01` | `_specs/app-docs/01-mission.md` | Definition of done. |
| `spec-02` | `_specs/app-docs/02-narrative-thesis.md` | Narrative thesis and required topics. |
| `spec-03` | `_specs/app-docs/03-grounding.md` | Product facts and revenue/referral contradictions. |
| `spec-04` | `_specs/app-docs/04-sources.md` | Required source families. |
| `spec-05` | `_specs/app-docs/05-architecture.md` | Ask-first IA, 500-800 page shape, and guided journey structure. |
| `spec-06` | `_specs/app-docs/06-answer-engine.md` | Ask/rate/ask-again loop. |
| `spec-07` | `_specs/app-docs/07-research-session.md` | Session 1 research gate. |
| `spec-08` | `_specs/app-docs/08-implementation-session.md` | Session 2 implementation gate. |
| `spec-09` | `_specs/app-docs/09-design-reference.md` | Mockup and visual direction. |
| `styleguide` | `src/search-book/STYLEGUIDE.md` | Local terminology and page-structure lock for authored pages. |

## Local Product And Code

| Key | Source | Use |
| --- | --- | --- |
| `local-revenue-doc` | `docs/network-revenue.md` | Phase A and Phase B revenue model explanation. |
| `dashboard-revenue-doc` | `src/dashboard/revenue-doc.jsx` | Dashboard copy for revenue model. |
| `server-pulse` | `server/pulse.js` | Current estimated revenue formula and defaults. |
| `server-volume` | `server/volume.js` | Current Vibe backend volume source, caching, normalization. |
| `server-volume-snapshots` | `server/volume-snapshots.js` | Daily snapshot behavior. |
| `server-me` | `server/routes/me.js` | Network, volume, pulse, and configured depth behavior. |
| `server-points` | `server/points.js` | Referral depth config and percentages. |
| `dashboard-faq` | `src/dashboard/faq.jsx` | User-facing FAQ copy, including 15-level wording. |
| `dashboard-overview` | `src/dashboard/overview.jsx` | Overview cards for revenue, tasks, referral link, invites, and points ledger. |
| `dashboard-codes` | `src/dashboard/codes.jsx` | My invites table, filters, masked invite values, and referee progress states. |
| `dashboard-network` | `src/dashboard/network.jsx` | My network graph/tree view, depth controls, focus drawer, and node-level display. |
| `dashboard-volume` | `src/dashboard/volume.jsx` | Dashboard network-volume UI and 5-level remnants. |
| `dashboard-tasks` | `src/dashboard/tasks.jsx` | Dashboard task checklist, bonus actions, task progress events, and funnel bridges. |
| `dashboard-settings` | `src/dashboard/settings.jsx` | Contact channel, handle, and recovery-email settings UI. |
| `dashboard-data` | `src/dashboard/data.jsx` | Dashboard data-source seam, bearer-token calls, and local fixture mode. |
| `dashboard-app` | `src/dashboard/app.jsx` | Points distinction and dashboard shell. |

## Linear Research

| Key | Source | Use |
| --- | --- | --- |
| `syn-56` | Linear issue SYN-56, "Dashboard FAQ / Help surface" | Shared dashboard FAQ/help scope, feeder issues, and current FAQ source-of-truth relationship. |
| `syn-73` | Linear issue SYN-73, "Upgrade the Vibe cut calculator based on this HTML implementation" | In-funnel cut-calculator walkthrough, proof CTA behavior, and calculator QA notes. |
| `syn-98` | Linear issue SYN-98, "Upgrade standalone Revenue Calculator walkthrough" | Standalone revenue calculator flow, solver-economics defaults, and browser verification notes. |
| `syn-118` | Linear issue SYN-118, "network volume level question" | Historical product question about aggregation depth. |
| `syn-163` | Linear issue SYN-163, "Implement daily volume snapshots and 5-level network aggregation" | Daily per-wallet snapshots, 5-level network-volume aggregation, refresh cadence, and verification comments. |
| `syn-166` | Linear issue SYN-166, "timo wants to add a USD counter in your dashboard" | User demand for USD counter, calculator, and network scenarios. |
| `syn-172` | Linear issue SYN-172, "15-level rollout" | Referral-depth rollout and percentage schedule. |
| `syn-192` | Linear issue SYN-192, "let users adjust the volume 25%, 50%, 100%" | Volume-adjustment demand signal for calculator/scenario controls. |
| `syn-200` | Linear issue SYN-200, "Barometer: switch network-volume source from Vibe backend to subgraphs" | Subgraph migration research and more accurate volume path. |
| `syn-201` | Linear issue SYN-201, "Dashboard network-revenue Phase B — in-dashboard revenue calculator + economics" | Deferred Phase B revenue calculator and economics surface beyond the live odometer. |
| `syn-203` | Linear issue SYN-203, "Phase B revenue/points farmed scope" | Future revenue components and data dependencies. |
| `syn-204` | Linear issue SYN-204, "Revenue odometer polish — flat-volume rate fix + accumulator finalize" | Odometer fallback-rate, accumulator, cache-bust, and uncommitted-polish handoff evidence. |
| `syn-205` | Linear issue SYN-205, "Deploy v1.1.0 to production (Track A — feature deploy)" | Production deploy gate, JSON-runtime boundary, 15-level rollout dependency, and verification sequence. |

## Public Vibe Sources

| Key | Source | Use |
| --- | --- | --- |
| `vibe-llms` | https://docs.vibe.trading/llms.txt | Public Vibe docs index. |
| `vibe-what-is` | https://docs.vibe.trading/about-vibe-trading/what-is-vibe-trading.md | Vibe product positioning and market claims. |
| `vibe-architecture` | https://docs.vibe.trading/architectural-overview.md | AMFQ, intent flow, solver offers, on-chain execution. |
| `vibe-referral-program` | https://docs.vibe.trading/trading/referral-program.md | Referral commission tiers and daily referral points. |
| `vibe-points` | https://docs.vibe.trading/trading/vibe-points.md | Trading, referring, and community points categories. |
| `vibe-margin` | https://docs.vibe.trading/trading/managing-vibecaps-margin.md | VibeCaps margin behavior. |
| `vibe-simple-trade` | https://docs.vibe.trading/getting-started/placing-a-simple-trade.md | Simple trade placement flow and trade ticket controls. |
| `vibe-order-types` | https://docs.vibe.trading/trading/order-types.md | Market, limit, TP/SL, stop, scale, and TWAP order behavior. |
| `vibe-tpsl` | https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md | Take-profit and stop-loss setup, amendment, and execution caveats. |
| `vibe-oi-liquidity` | https://docs.vibe.trading/trading/open-interest-oi-and-available-liquidity.md | Open interest, available liquidity, and solver capacity semantics. |
| `vibe-collateral-margining` | https://docs.vibe.trading/trading/collateral-and-margining.md | Collateral, CVA, cross-margin, isolated margin, and virtual-account behavior. |
| `vibe-fees` | https://docs.vibe.trading/trading/fees.md | User-facing fee categories and trade-panel fee breakdown caveat. |
| `vibe-funding` | https://docs.vibe.trading/trading/funding.md | Funding-rate direction, holding-cost effects, solver pricing, and minimum payment threshold. |
| `vibe-papers` | https://github.com/0xneelo/vibe_docs | Research-paper corpus and long-form themes. |
| `vibe-papers-site` | https://0xneelo.github.io/vibe_docs/ | Reader-first published version of Neelo's papers. |
| `vibe-papers-data` | `/tmp/vibe_docs/Website/public/generated/docs-data.json` | Session 1 local clone data used to derive the 794-page manifest. |

## Public Symmio Sources

| Key | Source | Use |
| --- | --- | --- |
| `symmio-foundation-docs` | https://docs.symmio.foundation/ | SYMMIO Foundation docs, token/economy context, and ecosystem-level governance/foundation material. |
| `symmio-token-foundation` | https://docs.symmio.foundation/symm-token/overview | SYMM token, veSYMM, staking, buybacks, utility, and tokenomics context from the Foundation docs. |
| `symmio-llms` | https://docs.symm.io/llms.txt | Symmio docs index and required deep links. |
| `symmio-what-is` | https://docs.symm.io/getting-started/what-is-symmio.md | Symmio clearing-house model, DaaS framing, no order book/pools. |
| `symmio-core` | https://docs.symm.io/getting-started/core-concepts.md | PartyA, PartyB, solvers, intents, collateral, margin, CVA. |
| `symmio-intent-lifecycle` | https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md | Solver event monitoring and quote lifecycle. |
| `symmio-whitepaper` | https://docs.symm.io/security-and-architecture/symmio-whitepaper.md | Whitepaper pointer and protocol status note. |
| `symmio-options-docs` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1.md | Symmio options protocol documentation index and current entry point. |
| `symmio-options-technical-architecture` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/the-symmio-diamond.md | Symmio options Diamond architecture, shared storage, facets, libraries, and upgrade model. |
| `symmio-options-facets` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets.md | Facet model and modular function boundaries for the options protocol. |
| `symmio-options-partya-open` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partya-open-facet.md | PartyA open-intent creation, trade-agreement terms, cancellation, expiry, and instant-mode boundary. |
| `symmio-options-partyb-open` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partyb-open-facet.md | PartyB open-intent locking, unlocking, filling, partial fills, and cancellation acknowledgement. |
| `symmio-options-partya-close` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partya-close-facet.md | PartyA close-intent creation, partial close, deadline, cancellation, and expiry behavior. |
| `symmio-options-partyb-close` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partyb-close-facet.md | PartyB close-intent fills, partial fills, favorable-price checks, and cancellation acknowledgement. |
| `symmio-options-instant-layer` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/helper-contracts/instant-layer.md | Instant Layer signed operations, replay protection, template execution, PartyB and MultiAccount registration. |
| `symmio-earliest-docs` | https://github.com/SYMM-IO/docs | SYMM-IO docs repository and Whitepaper folder; starting point for earliest-docs and version-history review. |
| `symm-io-github` | https://github.com/SYMM-IO | Official SYMM-IO GitHub organization and repository index. |
| `symm-io-protocol-core` | https://github.com/SYMM-IO/protocol-core | Protocol core repository for on-chain settlement and contract implementation evidence. |
| `symm-io-options-core` | https://github.com/SYMM-IO/options-core | Options protocol repository for implementation-level options references. |
| `symm-io-subgraphs` | https://github.com/SYMM-IO/subgraphs | Subgraph repository for Symmio indexing/reference data context. |
| `symm-io-analytics` | https://github.com/SYMM-IO/analytics | Analytics repository for Symmio/Vibe data pipeline context. |

## Competitive Context

| Key | Source | Use |
| --- | --- | --- |
| `hyperliquid-llms` | https://hyperliquid.gitbook.io/hyperliquid-docs/llms.txt | Hyperliquid docs index. |
| `hyperliquid-hip3` | https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals.md | Builder-deployed perps, staking, deployer duties, independent margin/order books. |
| `goldsky-subgraphs` | https://docs.goldsky.com/subgraphs/introduction | Goldsky subgraph product docs for indexing and subgraph-backed data access. |
| `goldsky-graphql-endpoints` | https://docs.goldsky.com/subgraphs/graph-endpoints | Goldsky GraphQL endpoint documentation for querying indexed subgraph data. |
| `competitive-sweep-batch-01` | `src/search-book/data/competitive-sweep.json` | Official-docs benchmark batch over 50 target docs, 25 lanes, five returned explorer batches, and the unresolved Opyn access gap. |
| `competitive-sweep-synthesis` | `src/search-book/content/authored/manifesto/competitive-docs-benchmark.md` | Authored synthesis of benchmark patterns Vibe x Symmio should borrow or avoid. |

## Authored Publication Candidates

| Key | Source | Use |
| --- | --- | --- |
| `authored-pages` | `src/search-book/content/authored/**` | Hand-shaped publication-candidate pages built from the registered primary sources above. |
| `authored-index` | `src/search-book/data/authored-pages.json` | Prototype search/index payload for authored pages. |
