---
id: "section-01-perp-classes-zscore-01-docs-02-framework-2-6-framework-implications"
title: "Section 2: A Framework for Categorizing Perpetual Protocols: 2.6 Framework Implications"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-6-framework-implications"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-02-framework"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/02-Framework.md"
headingId: "2-6-framework-implications"
---

# Section 2: A Framework for Categorizing Perpetual Protocols: 2.6 Framework Implications

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-6-framework-implications

## Extracted Section Draft

## 2.6 Framework Implications

This framework reveals several critical insights:

### Insight 1: No Single Quadrant Solves Permissionless + Efficient

- Quadrant 1 cannot bootstrap
- Quadrant 3 fails at bootstrap
- Quadrant 4 cannot scale

### Insight 2: Market Lifecycle Requires Quadrant Traversal

A truly permissionless system must:
1. **Start** in Quadrant 4 (async + collateralized) for bootstrap
2. **Mature** through intermediate states
3. **Graduate** to Quadrant 1 (sync + netted) for efficiency

### Insight 3: Insurance Topology Should Follow Maturity

- New markets: Isolated (contain risk)
- Proven markets: Cross-margin (improve efficiency)

### Insight 4: The Industry Gap Explained

The gap between token launch and perp listing exists because:
- Quadrant 1 protocols (Hyperliquid) cannot list new assets
- Quadrant 4 protocols (GMX) have not scaled their model
- No protocol traverses quadrants dynamically

---
