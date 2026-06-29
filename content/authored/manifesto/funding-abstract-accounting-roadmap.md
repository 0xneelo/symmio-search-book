---
id: "authored-funding-abstract-accounting-roadmap"
title: "Funding Abstract Accounting Roadmap"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#a-accounting"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-01-abstract-a-accounting", "authored-funding-revenue-cost-accounting-map", "authored-funding-state-variable-map"]
---

# Funding Abstract Accounting Roadmap

The funding-model abstract opens its accounting track by naming the pieces a market has to measure before it can decide whether pricing, insurance, hedging, or deleveraging should change. The source lists the accounting path from scope and units through market state, inventory capacity, exposure decomposition, revenue, cost, profit, phase parameters, buyback accounting, insurance funds, profit deviation, and smoothing.

That roadmap matters because it says the model is not "a funding rate" in isolation. It is an accounting system for a long-tail perp market. The market first needs to know what unit it is measuring, which market window it is in, what inventory it holds, what open interest exists, how much exposure is covered by token inventory, how much remains uncovered, which revenue and cost streams apply, and how much profit or stress is left after those streams are counted.

## What The Accounting Track Teaches

The track separates raw state from derived capacity. Open interest, price, token holdings, and USDC holdings are inputs. Covered amount, obtainable tokens, absolute token capacity, netted exposure, solver exposure, and direction are interpretations built from those inputs.

It also separates gross revenue from final profit. Trading fees, spreads, funding, liquidations, market-making, and borrow revenue are not enough by themselves. They have to be compared against hedge cost, external borrow cost, operations, shortfall, and counterparty exposure to trader PnL. Only then can the model talk about per-market LP or solver profit.

The final accounting pieces connect individual markets to system safety. Buyback accounting, local insurance, global insurance, profit deviation, and profit-versus-insurance smoothing are the bridge from a market's own PnL to cross-market defense policy.

## Publication Boundary

This page is a source-roadmap page. It does not publish live accounting treatment, tax treatment, buyback rules, insurance percentages, profit targets, eligibility thresholds, solver cost assumptions, or any production rate. Those values need implementation, accounting, risk, legal, and operator review before public release.

## Sources

- `vibe-papers`: Neelo, "Abstract", "(A) Accounting".

## Related Pages

- `authored-funding-state-variable-map`
- `authored-funding-revenue-cost-accounting-map`
- `authored-funding-insurance-buyback-accounting`
