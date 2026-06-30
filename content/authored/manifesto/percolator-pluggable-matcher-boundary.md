---
id: "authored-percolator-pluggable-matcher-boundary"
title: "Percolator Pluggable Matcher Boundary"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/07-percolator-strengths"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-07-percolator-strengths", "authored-percolator-hybrid-risk-execution-model", "authored-passive-matcher-vulnerability"]
---

# Percolator Pluggable Matcher Boundary

Neelo's Section 7 credits Percolator's pluggable matcher architecture as a real engineering achievement. The risk engine can be kept separate from pricing and execution logic, while matchers can be built around AMM, RFQ, or CLOB-style behavior through CPI-based integration.

That boundary is valuable because it prevents one matcher design from becoming the whole protocol. A market can experiment with execution logic while the core accounting and validation layer remains more stable. In a purely technical comparison, this modularity is a strength.

The economic caveat is that matcher modularity does not change what the market is margined and settled in. If collateral, fees, funding, profit, and loss are all token-denominated, a better matcher can improve execution quality but cannot remove inverse payoff risk, LP short-volatility exposure, or token-collateral reflexivity.

## Why This Is A Fair-Critique Page

The point is not to deny Percolator's flexibility. The point is to locate it. Pluggable matchers solve an execution-interface problem. They do not by themselves solve the settlement, collateral, oracle, and payout-credibility problems described elsewhere in the Percolator critique.

## Reader Implication

When a reader asks whether Percolator is technically rigid, route here. The source-backed answer is no: the matcher layer is modular. The follow-up is that modular execution still inherits the economic model underneath it.

## Publication Boundary

Live matcher implementations, allowed matcher actions, LP delegation rules, program upgrade state, and security guarantees require primary-source, implementation, and security review before publication as current facts. This page preserves the source's pluggability claim and the source-bounded critique.

## Sources

- `vibe-papers`: Neelo, "Section 7: What Percolator Gets Right", "7.1 Engineering Achievements".

## Related Pages

- `authored-percolator-hybrid-risk-execution-model`
- `authored-rfq-before-order-book`
- `authored-passive-matcher-vulnerability`
