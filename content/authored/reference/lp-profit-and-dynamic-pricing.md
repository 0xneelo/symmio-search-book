---
id: "authored-lp-profit-and-dynamic-pricing"
title: "LP Profit And Dynamic Pricing"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/06-lp-profit", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-06-lp-profit", "neelo-15-funding-model-15-docs-07-dynamic-pricing"]
---

# LP Profit And Dynamic Pricing

The funding-model papers describe LP and solver economics as a control problem: revenue, costs, trader PnL, hedge PnL, and shortfall risk must be balanced by pricing that reacts before insurance or ADL is needed.

The LP profit decomposition separates trade fees, spread revenue, funding, liquidation fees, maintenance-margin charges, and borrow revenue from hedge costs, external borrow costs, operations, trader winnings, hedge PnL, and shortfall losses. In bootstrap mode, the LP or solver absorbs more trader PnL; in a mature market, opposing traders can offset more of that exposure.

Dynamic pricing is the system's first response to stress. Funding, borrow rates, and spreads respond to utilization, skew, volatility, insurance stress, and profit deviation. The source framing is clear: it is cheaper to use prices to rebalance a market than to wait for hard failure modes.

## Reader Implication

This page should be treated as economics architecture, not a final public parameter sheet. Operator inbox item `#1` still controls which current and planned revenue inputs can be published as product promises.

## Sources

- `vibe-papers`: Neelo, "06. LP Profit Decomposition".
- `vibe-papers`: Neelo, "07. Dynamic Pricing: Funding, Spread, and Borrow Rates".
- `spec-03`: Phase B economics and revenue disclosure boundary.

## Related Pages

- `authored-vibe-pillars`
- `authored-estimated-network-revenue`
- `neelo-15-funding-model-15-docs-06-lp-profit`
