---
id: "authored-percolator-hybrid-risk-execution-model"
title: "Percolator Hybrid Risk And Execution Model"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture", "authored-percolator-engineering-vs-economics", "authored-slab-isolation-capital-inefficiency"]
---

# Percolator Hybrid Risk And Execution Model

Neelo's architecture section frames Percolator as a hybrid: synthetics-style risk with orderbook-style execution.

The synthetics side is the shared balance sheet. Users trade against LP accounts, and the engine enforces margin, liquidation, ADL or socialization, and withdrawal safety. The orderbook-style side is execution: LPs can provide a matcher program over CPI, including passive AMM-style pricing, RFQ logic, or custom market-making logic.

That distinction matters because Percolator is not simply an AMM and not simply a CLOB. It is a risk engine plus a pluggable execution surface. The system can make local accounting legible while leaving pricing logic to LP-scoped matcher programs.

## Reader Implication

When docs compare Percolator to Vibe, the fair comparison is not "on-chain AMM versus solver." It is "local on-chain risk engine plus matcher" versus "intent, solver, inventory, and settlement architecture." The first can be technically elegant while still inheriting token-margined economic constraints.

## Publication Boundary

Do not turn this architecture description into claims about current Percolator deployments, matcher safety, liquidity quality, or production parameters beyond the cited source without fresh primary-source review.

## Sources

- `vibe-papers`: Neelo, "Section 2: Percolator Architecture".

## Related Pages

- `authored-percolator-engineering-vs-economics`
- `authored-slab-isolation-capital-inefficiency`
- `authored-active-risk-management-vs-passive-physics`
