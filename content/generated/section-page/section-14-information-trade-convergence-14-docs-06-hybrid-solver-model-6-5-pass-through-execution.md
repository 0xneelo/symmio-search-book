---
id: "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-5-pass-through-execution"
title: "Section 6: The Hybrid Solver Model: 6.5 Pass-Through Execution"
section: "vision-sections"
track: "14 - Information and Trade Convergence"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/06-hybrid-solver-model#6-5-pass-through-execution"]
parentPageId: "neelo-14-information-trade-convergence-14-docs-06-hybrid-solver-model"
sourcePath: "Docs/public/14_information_trade_convergence/14_docs/06-Hybrid-Solver-Model.md"
headingId: "6-5-pass-through-execution"
---

# Section 6: The Hybrid Solver Model: 6.5 Pass-Through Execution

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/06-hybrid-solver-model#6-5-pass-through-execution

## Extracted Section Draft

## 6.5 Pass-Through Execution

**Trader Wins**: Protocol sells whale inventory (market sell or short TWAP) and passes cash to trader. Zero price risk for protocol. Slippage is the trader's problem.

**Protocol Wins**: Protocol TWAP-buys tokens back into the vault. Buy only with TWAP to avoid pumping price against itself.

**70% of all fees** generated in perpetuity go to LPs—even when the market is matured and traders net each other. This is the "Landlord" model: LPs own the land (collateral); traders are tenants. The fee is rent for providing the capacity for the market to exist.

---

*Next Section: The Game Theory of Listings →*
