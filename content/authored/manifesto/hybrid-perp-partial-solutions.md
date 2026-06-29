---
id: "authored-hybrid-perp-partial-solutions"
title: "Hybrid Perp Approaches Are Partial Solutions"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-5-category-4-hybrid-approaches-partial-solutions"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-03-landscape-3-5-category-4-hybrid-approaches-partial-solutions", "authored-bootstrap-thesis-statement", "authored-markets-are-dynamic-not-static"]
---

# Hybrid Perp Approaches Are Partial Solutions

The hybrid category is where the landscape starts to point toward Vibe, but Neelo treats existing hybrids carefully. A hybrid label alone is not enough. The question is what the design actually combines, which lifecycle stage it serves, and whether it solves the counterparty, capital, and execution problems together.

Virtual AMM designs are one partial answer. They can offer continuous pricing without a traditional order book, but AMM formulas built for spot assets can become awkward when used for perpetual exposure, funding, oracle alignment, and manipulation resistance.

Intent-based systems are the more relevant partial answer. A trader can express the desired outcome, and solvers can compete or coordinate to fill it. That creates an asynchronous interface and can allow batching or netting behind the scenes. But the solver still needs capital, risk controls, pricing discipline, and a path for imbalanced flow.

The source's point is that hybrid is not a magic word. A useful hybrid architecture must specify when the market is vault-like, when it is solver-backed, when it can become netted, when it can graduate toward order-book efficiency, and who pays when the market is still one-sided.

## Publication Boundary

The source mentions Perpetual Protocol v1-style virtual AMMs and intent-based perpetual systems as category examples. Current implementation state, launch status, solver design, market outcomes, and any comparison to live Vibe infrastructure require fresh primary-source and operator/product/risk review.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols: 3.5 Category 4: Hybrid Approaches (Partial Solutions)".

## Related Pages

- `authored-bootstrap-thesis-statement`
- `authored-markets-are-dynamic-not-static`
- `authored-hybrid-retrofit-is-new-protocol`
