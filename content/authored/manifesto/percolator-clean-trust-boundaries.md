---
id: "authored-percolator-clean-trust-boundaries"
title: "Percolator Clean Trust Boundaries"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/07-percolator-strengths"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-07-percolator-strengths", "authored-percolator-formal-verification-boundary", "authored-percolator-one-market-one-slab-accounting"]
---

# Percolator Clean Trust Boundaries

Neelo's Section 7 says Percolator gets an important trust-boundary separation right: the risk engine handles accounting, the program handles validation, and the matcher handles LP-scoped execution logic.

That is a better architecture than a system where every concern is fused into one opaque contract. Clean boundaries make review, testing, formal reasoning, and failure analysis easier. If a matcher is wrong, the question can be separated from whether the core balance-sheet logic conserves state.

The critique is that clean trust boundaries are not the same as clean economic boundaries. A program can separate accounting from matching while still binding collateral, PnL, fees, insurance, and settlement to the same volatile token unit. The software boundary is clean; the risk unit can remain reflexive.

## Trust Boundary Versus Risk Boundary

A trust boundary says which component is allowed to do what. A risk boundary says who eats loss when the market moves, when the oracle lags, or when winning traders need payment. Percolator's engineering can make the first boundary legible while the token-margined model leaves the second boundary economically fragile.

## Reader Implication

When docs describe architecture quality, separate module isolation from risk localization. Clean components are necessary for credible infrastructure, but they do not prove that volatile-asset liabilities are safely assigned.

## Publication Boundary

Current Percolator component boundaries, matcher permissions, program audit status, deployed configuration, and Vibe comparative guarantees require source refresh and operator/security review before publication as live facts. This page preserves the source's architecture-quality distinction.

## Sources

- `vibe-papers`: Neelo, "Section 7: What Percolator Gets Right", "7.1 Engineering Achievements".

## Related Pages

- `authored-percolator-formal-verification-boundary`
- `authored-token-margin-manipulation-amplifier`
- `authored-token-inventory-risk-localization`
