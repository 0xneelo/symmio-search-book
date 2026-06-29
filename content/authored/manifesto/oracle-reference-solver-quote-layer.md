---
id: "authored-oracle-reference-solver-quote-layer"
title: "Oracle Reference, Solver Quote Layer"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/08-structurally-superior-alternative"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-08-structurally-superior-alternative", "authored-solver-refusal-as-oracle-defense", "authored-oracle-trilemma"]
---

# Oracle Reference, Solver Quote Layer

Section 8 says oracle exploitation is reduced when the solver can quote prices and use the oracle as reference rather than treating an oracle value as an unconditional execution mandate.

That distinction is central to the Vibe argument. A passive on-chain market asks: what does the oracle say, and can the state machine execute? A solver-mediated market can ask a richer question: is this reference price reliable enough to quote, should the spread widen, should size be capped, or should the quote be refused?

The oracle still matters. It provides a shared reference for price, margin, liquidation, and dispute logic. But the solver quote layer inserts risk judgment before exposure is accepted.

## Why This Helps Low-Cap Markets

Low-cap markets often have thin spot liquidity, abrupt price moves, and stale or manipulable references. A passive market can become a predictable target when the oracle lags. A solver quote layer can turn that same uncertainty into price, size, or refusal.

The tradeoff is transparency and policy. Docs must explain when quotes can disappear or widen, and production systems must define which risk signals matter. But that is an explicit tradeoff rather than a hidden oracle dependency.

## Reader Implication

When a trader asks why a quote can be refused even though an oracle price exists, route here. The answer is that the oracle is a reference input, not a promise that every requested trade is safe to execute at that price.

## Sources

- `vibe-papers`: Neelo, "Section 8: The Structurally Superior Alternative", "8.2 How This Fixes Each Problem" and "8.3 The Role of Active Risk Management".

## Related Pages

- `authored-solver-refusal-as-oracle-defense`
- `authored-oracle-trilemma`
- `authored-capped-oracle-latency-arbitrage`
