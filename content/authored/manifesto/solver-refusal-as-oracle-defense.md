---
id: "authored-solver-refusal-as-oracle-defense"
title: "Solver Refusal As Oracle Defense"
section: "manifesto"
track: "05 - Proof Of Value"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/05-intent-based-architecture"]
relatedGeneratedPages: ["neelo-02-proof-of-value-02-docs-05-intent-based-architecture", "section-02-proof-of-value-02-docs-05-intent-based-architecture-5-5-solving-the-wick-of-death", "authored-oracle-circuit-breaker-paradox"]
---

# Solver Refusal As Oracle Defense

The proof-of-value architecture uses solvers as more than fill engines. It makes them a defense layer against toxic prices.

Neelo's source names the low-cap perp failure mode: a manipulated spot move can turn an oracle-dependent perp into an extraction target. The proposed intent/solver answer is not to blindly execute against a single spot price. A solver can evaluate current market conditions, widen its spread, lower confidence, or refuse to quote when the reference price looks manipulated.

This is one of the clearest differences between a passive AMM-style execution surface and an intent-based derivatives layer. The trade is not guaranteed merely because a user asks for it. The solver's job is to decide whether the requested risk is priceable.

## Reader Implication

Traders should understand that refusal can be a safety feature, not only a UX failure. LPs and solvers should read refusal as part of the risk system: if a market cannot be priced honestly, forcing execution can be worse than waiting.

## Sources

- `vibe-papers`: Neelo, "Section 5: Intent-Based Architecture: 5.5 Solving the Wick of Death".

## Related Pages

- `authored-oracle-circuit-breaker-paradox`
- `authored-bootstrap-oracle-risk-tiers`
- `authored-solver-hedging-failure-modes`
