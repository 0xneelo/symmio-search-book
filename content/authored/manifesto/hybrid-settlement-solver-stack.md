---
id: "authored-hybrid-settlement-solver-stack"
title: "Hybrid Settlement And Solver Stack"
section: "manifesto"
track: "07 — Technical Architecture"
status: "publication-candidate"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-1-system-architecture-overview", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-2-settlement-layer-on-chain", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-3-solver-layer-off-chain", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-4-oracle-layer"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-1-system-architecture-overview", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-2-settlement-layer-on-chain", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-3-solver-layer-off-chain", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-4-oracle-layer"]
---

# Hybrid Settlement And Solver Stack

The technical architecture in Neelo's corpus is hybrid by design. The settlement layer anchors enforceable state, while off-chain solver infrastructure performs the computations required for complex derivatives markets.

That split is central to the compendium. A purely on-chain market-maker is too limited for path-dependent risk, utilization curves, funding logic, hedging decisions, liquidations, and market graduation. A purely off-chain venue would lose the settlement guarantees that make on-chain markets credible. The architecture therefore separates durable settlement from fast risk operation.

## Layer Roles

The user interface and integrations collect intent. The solver layer quotes, evaluates risk, matches where possible, hedges, and handles graduation logic. The settlement layer records vault state, positions, and enforceable outcomes. The oracle layer supplies external prices and market data.

The point is not that every implementation detail is already final. The point is that the compendium should teach the boundary: state and settlement are not the same thing as risk computation.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.1 System Architecture Overview".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.2 Settlement Layer".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.3 Solver Layer".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.4 Oracle Layer".

## Related Pages

- `authored-solver-owned-market-maker`
- `authored-symmio-party-a-party-b`
- `authored-token-vault-perps-versus-usdc-pools`
