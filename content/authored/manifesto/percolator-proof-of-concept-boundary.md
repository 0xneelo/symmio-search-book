---
id: "authored-percolator-proof-of-concept-boundary"
title: "Percolator Proof Of Concept Boundary"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/10-conclusion"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-10-conclusion", "authored-percolator-formal-verification-boundary", "authored-fully-on-chain-keeper-model"]
---

# Percolator Proof Of Concept Boundary

Neelo's conclusion gives Percolator a precise place: it is a strong technology demonstration of a fully on-chain, formally verified derivatives engine with pluggable execution and clean accounting.

That credit matters. Percolator shows that an on-chain risk engine can enforce local balance-sheet rules and expose execution to inspection. It is not dismissed as unserious engineering.

The boundary is financial product suitability. The source argues that for volatile assets, especially low-cap or meme assets, the token-margined model remains structurally unsound even if the program is elegant.

## Engineering Validity Versus Product Robustness

A proof of concept can prove that a mechanism can run. It does not automatically prove that the mechanism creates sustainable markets for the assets users most want to trade.

This distinction keeps the critique fair. The compendium should not claim that formal verification is irrelevant. It should say formal verification answers one question: does the system enforce the rules it wrote down? The economic critique asks another: are those rules the right balance-sheet rules for volatile long-tail perps?

## Reader Implication

When a reader asks whether Percolator is a failure, route here. The answer is more precise: as a technology demonstration, it is significant; as a general low-cap perp product model, the source argues the token-margined architecture is the wrong economic foundation.

## Publication Boundary

Current deployed-program status, formal-verification scope, audit claims, market availability, supported assets, and product robustness guarantees require primary-source, security, implementation, and operator review before publication as live facts. This page preserves the source's proof-of-concept distinction.

## Sources

- `vibe-papers`: Neelo, "Section 10: Conclusion", "10.2 Percolator's Place".

## Related Pages

- `authored-percolator-formal-verification-boundary`
- `authored-fully-on-chain-keeper-model`
- `authored-engineering-fix-economics-limit`
