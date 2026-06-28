---
id: "authored-solver-engine-operating-loop"
title: "Solver Engine Operating Loop"
section: "manifesto"
track: "07 — Technical Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-3-solver-layer-off-chain", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-3-6-graduation-engine"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-3-solver-layer-off-chain", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-6-position-lifecycle"]
---

# Solver Engine Operating Loop

The solver layer in Neelo's architecture is not a single quote service. It is an operating loop: quote, risk-check, match, liquidate, hedge, and graduate. That is why the source treats the solver as infrastructure rather than customer-support automation.

The quote engine starts from oracle price, current inventory, market volatility, utilization, and maturity. The risk engine constrains position size, margin, and exposure. The match engine looks for natural counterparties as markets mature, then falls back to the solver when two-sided flow is not ready. Liquidation and hedging engines keep the solver from becoming an unbounded residual risk sink. The graduation engine watches whether the market has earned a deeper execution layer.

## Why The Loop Matters

Long-tail markets do not fail only because no one can click "list." They fail when the first trade has no credible counterparty, the second trade has no risk budget, and the tenth trade has no path to better liquidity. The solver operating loop is the bridge across those states.

That is also why the docs should distinguish solver operation from solver omnipotence. The source gives the solver many responsibilities, but it also frames those responsibilities as bounded by collateral, oracle-derived pricing, position limits, and settlement verification.

## Publication Boundary

The source includes model formulas for spreads, position limits, margin requirements, liquidation checks, and graduation criteria. Those should remain illustrative until live parameters, thresholds, venues, and operator policies are confirmed. The publication-ready claim is the operating loop, not any specific number inside it.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.3 Solver Layer".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.3.6 Graduation Engine".

## Related Pages

- `authored-solver-owned-market-maker`
- `authored-residual-counterparty-hedge-first`
- `authored-z-score-graduation-criteria`
