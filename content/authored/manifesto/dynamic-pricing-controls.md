---
id: "authored-dynamic-pricing-controls"
title: "Dynamic Pricing Controls"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/07-dynamic-pricing", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-07-dynamic-pricing", "neelo-15-funding-model-15-docs-11-full-objective", "authored-lp-profit-and-dynamic-pricing"]
---

# Dynamic Pricing Controls

The funding-model source treats dynamic pricing as the first defense layer. Before insurance is spent and before ADL is considered, the market should change prices so traders have incentives to rebalance the state.

The source names three instruments: funding, borrow, and spread.

Funding is periodic pressure on the dominant side of open interest. Borrow is an ongoing cost of holding positions and compensates risk-bearing capital. Spread is immediate trade-level pricing that can widen against the direction that worsens exposure or narrow toward the side that helps rebalance.

## What The Controls Respond To

The controls do not respond to a single market variable. The source combines inventory utilization, insurance utilization, long/short skew, volatility, and profit deviation. That means the market can react differently to several superficially similar states.

High skew can make the dominant side pay more even if raw utilization is not yet critical. High volatility can widen spreads even before insurance is active. Profit deviation can raise borrow or spread pressure when the market is not recovering enough revenue relative to risk. Insurance utilization can push the system into more aggressive pricing when unhedged exposure is stressing the defense budget.

The most important design point is directional pricing. If one side worsens the solver's exposure, opening that side can become expensive. If the opposite side reduces exposure, the system can make it cheaper, and the source even contemplates rebates in insurance mode.

## Why It Matters

Dynamic pricing is cheaper than forced unwinds. A market that can pay traders to bring itself back toward balance, or charge traders for worsening imbalance, has a softer control path than one that waits until insurance is exhausted.

For the compendium, this page should teach dynamic pricing as a risk-routing instrument. It belongs in the manifesto because it explains why Vibe can try to open long-tail markets without treating every thin market like a mature exchange book.

## Publication Note

This is architecture language from the source model. Public Vibe docs should publish concrete rates, ramps, rebates, and caps only after implementation and disclosure review.

## Sources

- `vibe-papers`: Neelo, "07. Dynamic Pricing: Funding, Spread, and Borrow Rates".
- `vibe-papers`: Neelo, "11. Full Combined Objective".

## Related Pages

- `authored-lp-profit-and-dynamic-pricing`
- `authored-gradient-flow-market-balancing`
- `authored-vibe-fees-and-funding`
