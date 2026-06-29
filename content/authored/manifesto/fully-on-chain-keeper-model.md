---
id: "authored-fully-on-chain-keeper-model"
title: "Fully On-Chain Keeper Model"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/07-percolator-strengths"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-07-percolator-strengths", "authored-solver-refusal-as-oracle-defense", "authored-capped-oracle-latency-arbitrage"]
---

# Fully On-Chain Keeper Model

Neelo's Section 7 credits Percolator for being fully on-chain, with no off-chain dependency and a permissionless keeper crank. It also credits a minimal, auditable state machine that is easier to reason about than a sprawling hybrid system.

That achievement matters. A fully on-chain engine makes execution and state transitions inspectable. It reduces reliance on hidden infrastructure, private risk engines, or discretionary off-chain operators. For some users and builders, that property is a core value.

The tradeoff is that full on-chain passivity can reduce the system's ability to refuse bad flow, reprice under stress, or incorporate richer off-chain risk judgment before accepting exposure. The source itself notes that some oracle-latency exploitation can only be partially addressed without introducing off-chain signers, which would undermine the fully on-chain premise.

## Transparency Versus Adaptive Risk

The design question is not whether transparency is good. It is what transparency is asked to do. If the market needs active risk controls, discretionary refusal, external hedging, or richer quote logic to survive low-cap volatility, then a purely on-chain keeper model may be transparent but economically exposed.

Vibe's answer should not be "off-chain is better." It should be that durable financial state belongs on-chain, while some pricing, hedging, and risk acceptance can be solver-managed as long as the settlement boundary is explicit and enforceable.

## Reader Implication

When readers compare Percolator and Vibe, route here for the honest tradeoff. Percolator maximizes on-chain inspectability. Vibe should justify any hybrid element by showing what economic risk that element controls.

## Sources

- `vibe-papers`: Neelo, "Section 7: What Percolator Gets Right", "7.1 Engineering Achievements".

## Related Pages

- `authored-settlement-state-boundary`
- `authored-solver-refusal-as-oracle-defense`
- `authored-active-risk-management-vs-passive-physics`
