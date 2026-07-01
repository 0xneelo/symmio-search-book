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
| `discord-ingestion-contract` | `data/discord-corpus.json` | Generated Discord/Lafa scraper and export-import contract; proves the ingestion path exists but is not a substitute for the actual Discord corpus. |

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
| `vibe-what-is` | https://docs.vibe.trading/about-vibe-trading/what-is-vibe-trading.md | Vibe product positioning, Binance perp market coverage wording, 390+ market-count claim, and lowcap listing claims. |
| `vibe-architecture` | https://docs.vibe.trading/architectural-overview.md | AMFQ/aMFQ legacy intent naming, intent flow, solver offers, on-chain execution. |
| `vibe-referral-program` | https://docs.vibe.trading/trading/referral-program.md | Referral commission tiers and daily referral points. |
| `vibe-points` | https://docs.vibe.trading/trading/vibe-points.md | Trading, referring, and community points categories. |
| `vibe-referral-codes` | https://docs.vibe.trading/getting-started/referral-codes.md | Referral-code entry, account NFT minting, code sharing, QR/link flow, rakeback benefit, and referrer/referee benefit framing. |
| `vibe-rakeback` | https://docs.vibe.trading/trading/rakeback-trading-fees.md | Progressive trading-fee rakeback tiers for users who sign up with a friend's referral code. |
| `vibe-trading-program` | https://docs.vibe.trading/trading/trading-program.md | Pre-TGE trading leaderboard points, daily points pool, reset time, and rank bands. |
| `vibe-platform` | https://docs.vibe.trading/about-vibe-trading/the-platform.md | Vibe platform overview, accessible trader UX, cross-chain/account-abstraction/SYMMIO positioning, 390+ market-count wording, leverage, deposits, points, revenue-share, and rakeback claims. |
| `vibe-margin` | https://docs.vibe.trading/trading/managing-vibecaps-margin.md | VibeCaps margin behavior. |
| `vibe-simple-trade` | https://docs.vibe.trading/getting-started/placing-a-simple-trade.md | Simple trade placement flow and trade ticket controls. |
| `vibe-order-types` | https://docs.vibe.trading/trading/order-types.md | Market, limit, TP/SL, stop, scale, and TWAP order behavior. |
| `vibe-tpsl` | https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md | Take-profit and stop-loss setup, amendment, and execution caveats. |
| `vibe-oi-liquidity` | https://docs.vibe.trading/trading/open-interest-oi-and-available-liquidity.md | Open interest, available liquidity, and solver capacity semantics. |
| `vibe-collateral-margining` | https://docs.vibe.trading/trading/collateral-and-margining.md | Collateral, CVA, cross-margin, isolated margin, and virtual-account behavior. |
| `vibe-fees` | https://docs.vibe.trading/trading/fees.md | User-facing fee categories and trade-panel fee breakdown caveat. |
| `vibe-funding` | https://docs.vibe.trading/trading/funding.md | Funding-rate direction, holding-cost effects, solver pricing, and minimum payment threshold. |
| `vibe-account-creation` | https://docs.vibe.trading/getting-started/account-creation.md | EOA wallet and email/social account creation paths, one-click gas-free trading setup, and custody/security tradeoffs. |
| `vibe-deposits-withdrawals` | https://docs.vibe.trading/getting-started/deposits-and-withdrawals.md | Deposit entry points, allocated-balance crediting, chain support by account path, and large-withdrawal fraud-proof window. |
| `vibe-account-portfolio` | https://docs.vibe.trading/trading/my-account-portfolio-charts-and-data.md | My Account portfolio, PnL, funding, fee, transaction-history, account-health, referral, points, and CSV export views. |
| `vibe-account-health-liquidations` | https://docs.vibe.trading/trading/account-health-and-liquidations.md | Account-health semantics, equity balance, maintenance margin/CVA, liquidation scope, locked margin, and available-for-orders formulas. |
| `vibe-security-audits` | https://docs.vibe.trading/more-info/security-and-audits.md | Public Vibe security/audit posture, SYMMIO-Core v0.8.4 settlement-contract audit statement, and token/staking audit roadmap caveat. |
| `sherlock-symmetrical-contest` | https://audits.sherlock.xyz/contests/85 | Sherlock contest page linked by Vibe's security guide for Symmetrical/SYMMIO-Core audit context. |
| `vibe-hotkeys` | https://docs.vibe.trading/trading/hot-keys.md | Keyboard shortcuts for order type, amount, token picker, long/short, trade placement, leverage, price, orderbook, deposit, and TP/SL controls. |
| `vibe-mobile-pwa` | https://docs.vibe.trading/trading/mobile-app-pwa.md | Mobile PWA installation on iOS/Android, push-notification categories, and configurable notification settings. |
| `vibe-tradingview-control` | https://docs.vibe.trading/trading/tradingview-control.md | In-app TradingView controls for indicators, chart customization, saved layouts, ticker switching, and watchlists. |
| `vibe-system-visualization` | https://docs.vibe.trading/system-visualisation.md | Public system visualization for project supply loans, perp listing, solver hedging, solver profit sources, and project profit-share ranges. |
| `vibe-project-listing-terms` | https://docs.vibe.trading/more-info/project-listing-terms-and-conditions.md | Project listing and market-making terms covering services, token custody, audits, profits, conduct restrictions, termination, and delisting process. |
| `vibe-add-token-info` | https://docs.vibe.trading/more-info/add-token-info.md | Official project-managed token metadata submission flow for VibeCaps markets, including fields, payment, review states, rejection reasons, and safety caveats. |
| `vibe-trading-notion` | https://vibe-trading.notion.site/Turning-your-perpetual-listing-into-a-Perpetual-Bid-24ebff5b367a80519db4fa0317dcf3d5 | Operator-provided Vibe Trading Notion workspace page and child pitch pages, fetched through the Notion MCP with a paraphrase-only public-use boundary. |
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
| `symmio-funding-rates` | https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/funding-rates.md | Per-symbol funding epochs, funding-rate windows, legacy opened-price adjustment, and newer weighted-average balance deduction. |
| `symmio-liquidations` | https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/liquidations.md | Cross-margin liquidation, pending/locked/free balance treatment, PartyA account-wide liquidation, Muon data, and liquidator role. |
| `symmio-settlement` | https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/settlement.md | Settlement converting unrealized PnL into allocated balance, Muon-signed price/PnL checks, solvency protections, and funding-fee handling in newer versions. |
| `symmio-profit-realization` | https://docs.symm.io/liquidity-provider-documentation/core-concepts/settlement-and-profit-realization.md | Solver-side settlement and profit-realization context for avoiding profitable accounts getting stuck with insufficient realized balance. |
| `symmio-settlement-costs` | https://docs.symm.io/exchange-builder-documentation/settlement-costs-in-symmio.md | Product-specific settlement costs, zero solver/market-maker settlement fees, platform fees, and affiliate/frontend credits. |
| `symmio-trading-fees` | https://docs.symm.io/trader-documentation/trading-fees.md | Current Symmio trading-fee pointer to product-specific settlement-cost pages and per-symbol/per-affiliate fee structure. |
| `symmio-market-limit-orders` | https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/market-vs.-limit-orders.md | Market and limit quote semantics, slippage, pending/close-pending states, partial fills, force-close boundary, and quote data. |
| `symmio-solver-role` | https://docs.symm.io/liquidity-provider-documentation/role-of-a-liquidity-provider-solver.md | Solver as PartyB, quote listening, risk checks, collateral/solvency, APIs, instant trading, and conditional-order responsibilities. |
| `symmio-hedging-strategies` | https://docs.symm.io/liquidity-provider-documentation/core-concepts/hedging-strategies.md | Solver hedged, partially hedged, and unhedged operating styles, with protocol solvency rules as the enforced boundary. |
| `symmio-solving` | https://docs.symm.io/liquidity-provider-documentation/solving-for-symmio.md | Solver-section clarifications: educational scope, off-chain hedging independence, and protocol isolation from solver external systems. |
| `symmio-build-solver` | https://docs.symm.io/liquidity-provider-documentation/building-a-solver-on-symmio.md | Current solver-builder documentation index for intent lifecycle, seeing intents, hedging, on-chain open/close, APIs, websockets, instant trading, and conditionals. |
| `symmio-whitepaper` | https://docs.symm.io/security-and-architecture/symmio-whitepaper.md | Current Symmio whitepaper page, v0.8 PDF pointer, and work-in-progress boundary for whitepaper/protocol claims. |
| `symmio-contract-architecture` | https://docs.symm.io/security-and-architecture/contract-architecture-overview.md | Current Symmio contract architecture: perps diamond, Account Layer, Instant Layer, Muon verifier, ClearingHouse, account hierarchy, quote lifecycle, liquidation, funding aggregation, and withdrawal system. |
| `symmio-contract-interactions` | https://docs.symm.io/trader-documentation/interacting-with-contracts.md | Trader contract-interaction index for querying contract info and closing positions on-chain. |
| `symmio-frontend-builder` | https://docs.symm.io/exchange-builder-documentation/frontend-builder-introduction.md | Frontend-builder/B2B framing, third-party frontend responsibility, integration model, and list disclaimer. |
| `symmio-audit-reports` | https://docs.symm.io/security-and-architecture/audit-reports.md | Current Symmio audit-report index covering SYMM versions, vaults, staking, and vesting audit links. |
| `symmio-options-docs` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1.md | Symmio options protocol documentation index and current entry point. |
| `symmio-options-technical-architecture` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/the-symmio-diamond.md | Symmio options Diamond architecture, shared storage, facets, libraries, and upgrade model. |
| `symmio-options-facets` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets.md | Facet model and modular function boundaries for the options protocol. |
| `symmio-options-partya-open` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partya-open-facet.md | PartyA open-intent creation, trade-agreement terms, cancellation, expiry, and instant-mode boundary. |
| `symmio-options-partyb-open` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partyb-open-facet.md | PartyB open-intent locking, unlocking, filling, partial fills, and cancellation acknowledgement. |
| `symmio-options-partya-close` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partya-close-facet.md | PartyA close-intent creation, partial close, deadline, cancellation, and expiry behavior. |
| `symmio-options-partyb-close` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/facets/partyb-close-facet.md | PartyB close-intent fills, partial fills, favorable-price checks, and cancellation acknowledgement. |
| `symmio-options-instant-layer` | https://docs.symm.io/contract-documentation/symmio-options-v0.2.1/helper-contracts/instant-layer.md | Instant Layer signed operations, replay protection, template execution, PartyB and MultiAccount registration. |
| `symmio-earliest-docs` | https://github.com/SYMM-IO/docs | SYMM-IO docs repository and Whitepaper folder; starting point for earliest-docs and version-history review. |
| `symmio-docs-initial-commit` | https://github.com/SYMM-IO/docs/commit/3e6e9687248cb48952d89cf7616b158d94373c54 | Official docs repository initial commit evidence from 2023-08-22, adding hedger documentation but not the original whitepaper artifact. |
| `symmio-whitepaper-0-8-pdf` | https://github.com/SYMM-IO/docs/blob/main/Whitepaper/SYMMIO_paper_0_8.pdf | Official SYMMIO paper v0.8 PDF tracked in the SYMM-IO docs repository. |
| `symmio-whitepaper-0-8-commit` | https://github.com/SYMM-IO/docs/commit/e1715f85768b7f06933e91e41568422591729e16 | Official Git history showing `Whitepaper/SYMMIO_paper_0_8.pdf` introduced on 2023-11-16 by Lafachief. |
| `symm-io-github` | https://github.com/SYMM-IO | Official SYMM-IO GitHub organization and repository index. |
| `symm-io-protocol-core` | https://github.com/SYMM-IO/protocol-core | Protocol core repository for on-chain settlement and contract implementation evidence. |
| `symm-io-protocol-core-readme` | https://github.com/SYMM-IO/protocol-core/blob/main/README.md | Current protocol-core README framing SYMMIO as a trustless hybrid clearing house and intent-centric meta-derivatives engine. |
| `symm-io-protocol-core-initial-commit` | https://github.com/SYMM-IO/protocol-core/commit/e40c16ddedff545e0cb51bc137102e835dcb8753 | Official protocol-core initial commit evidence from 2023-06-13. |
| `symm-io-options-core` | https://github.com/SYMM-IO/options-core | Options protocol repository for implementation-level options references. |
| `symm-io-subgraphs` | https://github.com/SYMM-IO/subgraphs | Subgraph repository for Symmio indexing/reference data context. |
| `symm-io-analytics` | https://github.com/SYMM-IO/analytics | Analytics repository for Symmio/Vibe data pipeline context. |
| `superflow-she-openapi` | https://dev.superflow.exchange/openapi.json | Operator-provided SuperFlow Redoc/OpenAPI spec titled SYMMIO Hybrid Exchange (SHE), covering REST and WebSocket market, order, account, position, funding, auth, and dev/admin endpoint surfaces. |
| `symmio-foundation-metasolver` | https://docs.symmio.foundation/roadmap-and-vision/symmios-endgame/introducing-meta-solvers | Symmio Foundation Meta-Solvers source defining localized order-matching nodes, global arbitrage, and the long-term clearing-layer direction. |
| `symmio-foundation-clearing-layers` | https://docs.symmio.foundation/roadmap-and-vision/symmios-endgame/blockchains-are-clearing-layers | Symmio Foundation clearing-layer companion source for settlement and verification boundaries around Meta-Solvers. |

## Competitive Context

| Key | Source | Use |
| --- | --- | --- |
| `hyperliquid-llms` | https://hyperliquid.gitbook.io/hyperliquid-docs/llms.txt | Hyperliquid docs index. |
| `hyperliquid-hip3` | https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals.md | Builder-deployed perps, staking, deployer duties, independent margin/order books. |
| `goldsky-subgraphs` | https://docs.goldsky.com/subgraphs/introduction | Goldsky subgraph product docs for indexing and subgraph-backed data access. |
| `goldsky-graphql-endpoints` | https://docs.goldsky.com/subgraphs/graph-endpoints | Goldsky GraphQL endpoint documentation for querying indexed subgraph data. |
| `competitive-sweep-batch-01` | `data/competitive-sweep.json` | Official-docs benchmark batch over 50 target docs, 25 lanes, five returned explorer batches, 49 verified official docs, and one documented Opyn exclusion. |
| `competitive-sweep-synthesis` | `content/authored/manifesto/competitive-docs-benchmark.md` | Authored synthesis of benchmark patterns Vibe x Symmio should borrow or avoid. |

## Authored Publication Candidates

| Key | Source | Use |
| --- | --- | --- |
| `authored-pages` | `content/authored/**` | Hand-shaped publication-candidate pages built from the registered primary sources above. |
| `authored-index` | `data/authored-pages.json` | Prototype search/index payload for authored pages. |
