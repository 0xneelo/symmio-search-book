---
id: "authored-settlement-state-boundary"
title: "Settlement State Boundary"
section: "manifesto"
track: "07 — Technical Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-2-settlement-layer-on-chain", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-7-security-model"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-2-settlement-layer-on-chain", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-7-security-model"]
---

# Settlement State Boundary

Neelo's technical deep-dive is clearest when it separates financial truth from operational computation. Position ownership, collateral balances, vault shares, insurance balances, and settlement records belong in the trustless settlement boundary. Order-book state, risk calculations, market metrics, and Z-score computations can be managed by the solver layer because they are fast-changing operational inputs rather than final custody state.

That distinction should become a recurring pattern in the compendium. The reader should not be asked to trust an off-chain service with final balances. They should understand which state is enforceable, which state is advisory, and which state is used to quote or manage risk before an enforceable update is submitted.

## What Settles

The settlement model in the source centers on vaults, positions, and insurance. A trade begins as a user intent, passes through solver validation and execution, and ends with contract-side state updates for positions and balances. In publication prose, this should be described as a boundary, not as a finalized contract specification.

The source also defines what the solver cannot do: steal user funds, execute at arbitrary prices, prevent withdrawals, or rewrite past settlements. Those are the right security semantics to teach before discussing any particular implementation.

## Publication Boundary

The source includes illustrative function signatures and TODO notes for final contract architecture, access controls, and upgrade mechanisms. Until those are confirmed by production contracts or product owners, the docs should present the settlement boundary as a model: durable financial state on-chain, operational calculations off-chain, and solver powers bounded by verifiable constraints.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.2 Settlement Layer".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.7 Security Model".

## Related Pages

- `authored-hybrid-settlement-solver-stack`
- `authored-symmio-clearing-house-layer`
- `authored-collateral-margin-cva`
