# Source Registry

This registry is the current source map for the Session 1 dossier. It is not exhaustive yet.

## Local Specs

| Key | Source | Use |
| --- | --- | --- |
| `spec-prompt` | `/home/tabor/.codex/attachments/4632c9a8-89bd-47cd-9f2b-514b80548daa/pasted-text-1.txt` | Original objective and non-negotiables. |
| `spec-00` | `_specs/app-docs/00-goal-prompt.md` | Full goal prompt in repo. |
| `spec-01` | `_specs/app-docs/01-mission-and-done.md` | Definition of done. |
| `spec-02` | `_specs/app-docs/02-narrative-thesis.md` | Narrative thesis and required topics. |
| `spec-03` | `_specs/app-docs/03-product-grounding.md` | Product facts and revenue/referral contradictions. |
| `spec-04` | `_specs/app-docs/04-source-map.md` | Required source families. |
| `spec-05` | `_specs/app-docs/05-information-architecture.md` | Ask-first IA and original 100+ page shape, superseded by operator's 500-800 page instruction. |
| `spec-06` | `_specs/app-docs/06-answer-engine.md` | Ask/rate/ask-again loop. |
| `spec-07` | `_specs/app-docs/07-research-session.md` | Session 1 research gate. |
| `spec-08` | `_specs/app-docs/08-implementation-session.md` | Session 2 implementation gate. |
| `spec-09` | `_specs/app-docs/09-design-reference.md` | Mockup and visual direction. |

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
| `dashboard-volume` | `src/dashboard/volume.jsx` | Dashboard network-volume UI and 5-level remnants. |
| `dashboard-app` | `src/dashboard/app.jsx` | Points distinction and dashboard shell. |

## Linear Research

| Key | Source | Use |
| --- | --- | --- |
| `syn-166` | Linear issue SYN-166, "timo wants to add a USD counter in your dashboard" | User demand for USD counter, calculator, and network scenarios. |
| `syn-200` | Linear issue SYN-200, "Barometer: switch network-volume source from Vibe backend to subgraphs" | Subgraph migration research and more accurate volume path. |
| `syn-203` | Linear issue SYN-203, "Phase B revenue/points farmed scope" | Future revenue components and data dependencies. |
| `syn-172` | Linear issue SYN-172, "15-level rollout" | Referral-depth rollout and percentage schedule. |
| `syn-118` | Linear issue SYN-118, "network volume level question" | Historical product question about aggregation depth. |

## Public Vibe Sources

| Key | Source | Use |
| --- | --- | --- |
| `vibe-llms` | https://docs.vibe.trading/llms.txt | Public Vibe docs index. |
| `vibe-what-is` | https://docs.vibe.trading/about-vibe-trading/what-is-vibe-trading.md | Vibe product positioning and market claims. |
| `vibe-architecture` | https://docs.vibe.trading/architectural-overview.md | AMFQ, intent flow, solver offers, on-chain execution. |
| `vibe-referral-program` | https://docs.vibe.trading/trading/referral-program.md | Referral commission tiers and daily referral points. |
| `vibe-points` | https://docs.vibe.trading/trading/vibe-points.md | Trading, referring, and community points categories. |
| `vibe-margin` | https://docs.vibe.trading/trading/managing-vibecaps-margin.md | VibeCaps margin behavior. |
| `vibe-papers` | https://github.com/0xneelo/vibe_docs | Research-paper corpus and long-form themes. |
| `vibe-papers-site` | https://0xneelo.github.io/vibe_docs/ | Reader-first published version of Neelo's papers. |
| `vibe-papers-data` | `/tmp/vibe_docs/Website/public/generated/docs-data.json` | Session 1 local clone data used to derive the 794-page manifest. |

## Public Symmio Sources

| Key | Source | Use |
| --- | --- | --- |
| `symmio-llms` | https://docs.symm.io/llms.txt | Symmio docs index and required deep links. |
| `symmio-what-is` | https://docs.symm.io/getting-started/what-is-symmio.md | Symmio clearing-house model, DaaS framing, no order book/pools. |
| `symmio-core` | https://docs.symm.io/getting-started/core-concepts.md | PartyA, PartyB, solvers, intents, collateral, margin, CVA. |
| `symmio-intent-lifecycle` | https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md | Solver event monitoring and quote lifecycle. |
| `symmio-whitepaper` | https://docs.symm.io/security-and-architecture/symmio-whitepaper.md | Whitepaper pointer and protocol status note. |

## Competitive Context

| Key | Source | Use |
| --- | --- | --- |
| `hyperliquid-llms` | https://hyperliquid.gitbook.io/hyperliquid-docs/llms.txt | Hyperliquid docs index. |
| `hyperliquid-hip3` | https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals.md | Builder-deployed perps, staking, deployer duties, independent margin/order books. |
