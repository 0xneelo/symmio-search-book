---
id: "authored-funding-state-variable-map"
title: "Funding State Variable Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-04-variable-definitions", "neelo-15-funding-model-15-docs-05-utilization-modes", "authored-utilization-modes-inventory-insurance"]
---

# Funding State Variable Map

The funding model is easier to understand if readers see the state map before the equations. Neelo's variable definitions split a market into inventories, open interest, exposure, utilization, skew, insurance capacity, volatility, revenue, cost, and control variables.

## Market State

The first state group is inventory and exposure. Token deposits, remaining tokens, token price, covered notional, long open interest, short open interest, netted amount, and solver exposure define whether the market is mostly self-offsetting or whether the solver is carrying directional risk.

The second state group is utilization and imbalance. Token utilization asks how much net exposure is covered by token inventory. Insurance utilization asks how much unhedged loss could stress available local and global insurance. Skew explains which side of the market is dominant.

The third state group is risk and economics. Volatility, profit deviation, exposure loss estimates, revenue categories, hedge cost, borrow cost, trader PnL, shortfall, and insurance budget determine whether ordinary pricing is enough or whether the market is moving toward defense layers.

## Control Surface

The source also separates state from controls. The system can change funding, borrow, spread, insurance spend, hedging, and ADL fraction. That distinction matters: a docs answer should not say "utilization caused ADL" without showing the intervening control choices and budgets.

## Reader Implication

When a solver, LP, or project asks why a market's terms changed, the right answer is rarely one metric. The funding model reads the binding constraint: token inventory, insurance capacity, skew, volatility, profit deviation, or residual stress.

## Publication Boundary

This page maps source-model state categories. It does not publish live inventory feeds, volatility windows, profit targets, insurance budgets, control policies, oracle vendors, or production parameter values without operator, implementation, risk, legal, and accounting review.

## Sources

- `vibe-papers`: Neelo, "Variable Definitions".
- `vibe-papers`: Neelo, "Utilization Modes: Token Inventory vs Insurance Fund".

## Related Pages

- `authored-utilization-modes-inventory-insurance`
- `authored-dynamic-pricing-controls`
- `authored-cross-market-risk-mutualization`
