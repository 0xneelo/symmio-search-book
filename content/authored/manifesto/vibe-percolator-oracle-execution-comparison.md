---
id: "authored-vibe-percolator-oracle-execution-comparison"
title: "Vibe And Percolator Oracle Execution Comparison"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/09-vibe-vs-percolator"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-09-vibe-vs-percolator", "authored-oracle-reference-solver-quote-layer", "authored-capped-oracle-latency-arbitrage"]
---

# Vibe And Percolator Oracle Execution Comparison

Neelo's comparison treats oracle design as an execution-design problem, not only as a data-source problem.

Percolator is described as depending on an on-chain oracle and deterministic matcher logic. That gives clear state transitions, but it can also create predictable latency windows. If the oracle lags or moves through capped increments, a trader can sometimes know where the mark is going before the market fully reflects it.

Vibe is described as solver-quoted. The oracle remains a reference input, but the solver's quote is the execution surface. The solver can widen, cap, refuse, or delay exposure when the reference price is suspect or when market conditions are too unstable.

## The Core Difference

The passive design asks whether the oracle value permits execution. The active design asks whether accepting the trade at that price and size is economically coherent.

That second question is essential for low-cap markets because the reference price itself may be easier to manipulate than in mature BTC or ETH markets. If the market must execute deterministically at a lagging reference, the oracle becomes a tradeable target.

## Reader Implication

When a reader asks why Vibe does not simply execute every oracle-priced trade, route here. The answer is that the oracle is not the whole market. It is one input into solver judgment, and solver judgment exists precisely to avoid turning stale or manipulable references into guaranteed fills.

## Publication Boundary

Current oracle providers, solver quote policy, refusal policy, latency bounds, execution guarantees, and supported-market risk rules require implementation/operator/security/risk review before publication as live behavior. This page preserves the source's oracle/execution contrast.

## Sources

- `vibe-papers`: Neelo, "Section 9: Vibe vs. Percolator - Full Comparison", "9.6 Oracle and Manipulation".

## Related Pages

- `authored-oracle-reference-solver-quote-layer`
- `authored-capped-oracle-latency-arbitrage`
- `authored-solver-refusal-as-oracle-defense`
