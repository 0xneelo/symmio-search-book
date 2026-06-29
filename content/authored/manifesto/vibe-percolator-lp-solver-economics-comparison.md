---
id: "authored-vibe-percolator-lp-solver-economics-comparison"
title: "Vibe And Percolator LP Solver Economics Comparison"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/09-vibe-vs-percolator"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-09-vibe-vs-percolator", "authored-token-margined-short-volatility-profile", "authored-token-holder-inventory-alignment"]
---

# Vibe And Percolator LP Solver Economics Comparison

Neelo's comparison separates the Percolator LP role from the Vibe solver and inventory-provider roles.

In Percolator, LPs are framed as direct counterparties to trader PnL. They provide token inventory and absorb the short-volatility profile of the market. If the token pumps, LPs can lose tokens and underperform simply holding. If the token dumps, LPs can be left with a weaker token balance and a less valuable insurance base.

In Vibe, the source model separates counterparty operation from token inventory provision. The solver manages pricing, hedging, settlement, and residual exposure, while token holders or projects can provide market-specific inventory. That inventory can earn market yield, but it is not the same as asking passive token LPs to be the entire risk engine.

## The Economic Design Claim

The comparison's strongest claim is that LP capital should not be forced into the wrong job. A passive token LP is a fragile counterparty when the market's payoff shape is inverse and volatile. A solver-managed market can price risk, limit size, refuse bad flow, and use inventory as one resource inside a broader defense stack.

This does not turn solver economics into a free lunch. The solver can draw down, hedge poorly, or price too tightly. Public docs should therefore describe the source model as an economic design claim, not as a live yield promise.

## Reader Implication

When a reader asks why Vibe's LP model is not just another vault, route here. The source's answer is that Percolator puts LPs in the full counterparty seat, while Vibe splits the jobs: active solver operation, stable settlement, market-specific token inventory, and governed protection layers.

## Sources

- `vibe-papers`: Neelo, "Section 9: Vibe vs. Percolator - Full Comparison", "9.4 LP / Solver Economics".

## Related Pages

- `authored-token-margined-short-volatility-profile`
- `authored-token-holder-inventory-alignment`
- `authored-solver-drawdown-not-protocol-insolvency`
