---
id: "authored-percolator-formal-verification-boundary"
title: "Percolator Formal Verification Boundary"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture", "authored-percolator-engineering-vs-economics", "authored-active-risk-management-vs-passive-physics"]
---

# Percolator Formal Verification Boundary

The Percolator critique should credit the engineering before it criticizes the economics.

Neelo's architecture source says Percolator has formal verification around conservation, isolation, and no-teleport properties, with 118 of 118 proofs passing. It also credits pluggable matchers, clean trust boundaries, and the balance-sheet invariant that no user can withdraw more value than exists on the exchange balance sheet.

Those are meaningful achievements. They prove important properties about the program and risk engine. They do not prove that token-margined inverse markets are economically robust for volatile assets. Formal verification can show that balances are conserved while the conserved balances still fail to pay winners in credible economic terms.

## Reader Implication

Docs should separate code correctness from market design. A verified state machine can still instantiate reflexive collateral, inverse payoff convexity, token-denominated insurance, passive oracle exposure, and ADL haircuts. The question is not only "does the program conserve balances?" It is also "does the market remain economically useful under stress?"

## Publication Boundary

Do not generalize this source into a full security audit of Percolator or Vibe. Verification scope, proof targets, current repository state, deployed programs, and audit status need fresh primary-source confirmation before publication as security documentation.

## Sources

- `vibe-papers`: Neelo, "Section 2: Percolator Architecture".

## Related Pages

- `authored-percolator-engineering-vs-economics`
- `authored-active-risk-management-vs-passive-physics`
- `authored-oracle-circuit-breaker-paradox`
