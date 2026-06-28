---
id: "authored-active-risk-management-vs-passive-physics"
title: "Active Risk Management Versus Passive Physics"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/08-structurally-superior-alternative", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/comparison"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-08-structurally-superior-alternative", "neelo-07-token-margined-issues-perculator-07-docs-comparison", "authored-dynamic-pricing-controls"]
---

# Active Risk Management Versus Passive Physics

Neelo's Vibe-versus-Percolator comparison describes two risk philosophies.

Percolator is framed as passive physics: parameters are set, invariants are checked, and the state machine liquidates or applies ADL when constraints fail. Vibe is framed as active optimization: the solver adjusts spreads, funding, borrow rates, insurance deployment, and defensive escalation in response to market state.

## What The Active Layer Buys

Active risk management can use several control surfaces:

- widen spreads when volatility or utilization rises;
- adjust funding to discourage dominant-side skew;
- deploy local or global insurance before forced deleveraging;
- offer pricing incentives for rebalancing flow;
- reduce exposure when oracle or manipulation risk rises.

The point is not that an active solver can eliminate risk. It is that a solver can respond before the only remaining action is liquidation or haircut.

## What It Costs

The active approach costs simplicity. It needs risk models, monitoring, operator policy, source-backed parameters, and public documentation of failure modes. It also creates UX tradeoffs: quotes can widen, capacity can tighten, and some trades can be refused.

That cost is still part of the Vibe thesis. Long-tail markets are not mature CLOB markets. They need an adaptive counterparty layer until the market has enough two-sided flow to clear more naturally.

## Reader Implication

The docs should present active solver discretion as a risk-control mechanism, not as magic. It is more complex than passive invariant checking, but the complexity is the price of making thin, volatile markets tradeable without pretending every asset has mature liquidity from day one.

## Sources

- `vibe-papers`: Neelo, "The Structurally Superior Alternative".
- `vibe-papers`: Neelo, "Vibe Trading's OTC Solver Model vs. Percolator's Inverted Perps".

## Related Pages

- `authored-dynamic-pricing-controls`
- `authored-funding-defense-hierarchy`
- `authored-solver-engine-operating-loop`
