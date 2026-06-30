---
id: "authored-technical-capability-map"
title: "Technical Capability Map"
section: "manifesto"
track: "07 — Technical Architecture"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-8-technical-summary"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-8-technical-summary", "authored-technical-architecture-layer-map", "authored-vibe-market-evolution-architecture-summary"]
---

# Technical Capability Map

The technical summary compresses Vibe's architecture into five enabled capabilities: permissionless listing, bootstrap liquidity, market maturation, efficient operation, and security.

The point of the map is that none of those capabilities comes from a single component. Permissionless listing needs price-source options and market isolation. Bootstrap liquidity needs a solver and backing capital. Market maturation needs measurement and graduation logic. Efficient operation needs a path toward netting and order books. Security needs a hybrid on-chain/off-chain structure with bounded solver power.

## Capability Table

| Capability | How the source says it is achieved |
| --- | --- |
| Permissionless listing | DEX-derived oracles and isolated markets |
| Bootstrap liquidity | Solver as counterparty and LP vault backing |
| Market maturation | Z-score tracking and graduation engine |
| Efficient operation | Transition to netting and order books |
| Security | Hybrid on/off-chain architecture and bounded solver |

This is the technical counterpart to the manifesto. The thesis says markets should evolve; the capability map lists the machinery that makes evolution possible.

## Publication Boundary

The source is an architecture summary. Live claims about DEX-derived oracle availability, LP vault terms, Z-score deployment, graduation automation, order-book integrations, and solver-bound enforcement need current product, risk, security, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.8 Technical Summary".

## Related Pages

- `authored-technical-architecture-layer-map`
- `authored-vibe-market-evolution-architecture-summary`
- `authored-trilemma-escape-requirements`
