---
id: "authored-funding-core-invariant"
title: "The Funding Model Core Invariant"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/funding-rate-model"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-03-core-concepts", "neelo-15-funding-model-15-docs-funding-rate-model", "authored-funding-model-control-problem"]
---

# The Funding Model Core Invariant

Neelo's funding model turns on one practical inversion: liquidations are treated as inventory reallocations, not automatic bad-debt events.

That does not mean liquidations are harmless for users or that every market is safe. It means the risk model is not the same as a lending protocol where collateral liquidation can leave system debt behind. In the source framing, a solver or LP stack can receive collateral, rebalance token inventory, earn fees and funding, and still manage exposure through dynamic prices before the system reaches insurance or ADL.

## Why The Invariant Matters

Traditional AMM and lending analogies can mislead readers. If the docs say only "volatility is risk," users miss the difference between selling spot inventory, lending against collateral, and running a perp market where trader PnL, liquidation revenue, funding, spread, borrow, hedge cost, and shortfall risk all enter the same control loop.

The invariant lets the compendium explain why Vibe can be more aggressive about market balancing than a simple pool. Faster liquidation can improve solver safety; funding can ramp without being framed as a solvency cascade by itself; dynamic pricing can route flow away from danger before hard unwind paths activate.

## Publication Boundary

This page is conceptual architecture. It should not be read as a promise that every liquidation is profitable, every LP outcome is positive, or every production market has the same defense stack. Live liquidation thresholds, fee splits, insurance usage, and ADL behavior remain implementation and operator-review items.

## Sources

- `vibe-papers`: Neelo, "Core Concepts: Gradient Flow & Attractor-Repeller Dynamics".
- `vibe-papers`: Neelo, "Funding Rate Model for Low-Cap Perpetual Contracts".

## Related Pages

- `authored-funding-model-control-problem`
- `authored-lp-profit-and-dynamic-pricing`
- `authored-funding-defense-hierarchy`
