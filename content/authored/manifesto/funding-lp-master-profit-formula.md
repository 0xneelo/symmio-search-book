---
id: "authored-funding-lp-master-profit-formula"
title: "Funding LP Master Profit Formula"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/06-lp-profit#the-master-formula"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-06-lp-profit", "authored-lp-profit-and-dynamic-pricing", "authored-funding-revenue-cost-accounting-map"]
---

# Funding LP Master Profit Formula

Neelo's LP-profit section defines market profit as a full accounting equation, not as a yield label. For each market, profit starts with revenue, subtracts costs, subtracts the share of trader PnL that the LP or solver stack must absorb, adds hedge PnL, and subtracts bad debt or liquidation shortfall. In compact form:

```text
market profit = revenue - cost - counterparty_share * trader_pnl + hedge_pnl - shortfall
```

That structure is the key answer. The LP is not paid just because volume exists. The market has to earn enough through trading fees, spreads, funding, liquidation fees, maintenance-margin fees, and borrow revenue to cover hedge cost, external borrow cost, operations, trader winnings, and shortfall risk. The global LP result is then the sum of those market-level results across markets.

## Why This Matters

The formula makes Vibe's long-tail thesis more concrete. Permissionless market creation cannot be judged only by open interest, gross fee rate, or collateral efficiency. A market can look busy and still be unprofitable if trader PnL, hedge expense, or shortfall outruns the revenue stack. Conversely, a thin market can be economically useful if its risk is netted, priced, and hedged well enough.

This is also why dynamic pricing, utilization modes, insurance, and ADL belong in the same model as LP profit. They are not separate features. They are control surfaces that try to keep the profit equation inside acceptable bounds before the system reaches harder defense layers.

## Publication Boundary

This page explains the source-model equation. It does not publish live Vibe LP terms, final fee shares, market-specific rates, hedge venues, accounting treatment, token buyback policy, or a promised vault yield. Those remain operator, implementation, legal, and accounting review items.

## Sources

- `vibe-papers`: Neelo, "06. LP Profit Decomposition".

## Related Pages

- `authored-lp-profit-and-dynamic-pricing`
- `authored-funding-revenue-cost-accounting-map`
- `authored-funding-full-objective`
