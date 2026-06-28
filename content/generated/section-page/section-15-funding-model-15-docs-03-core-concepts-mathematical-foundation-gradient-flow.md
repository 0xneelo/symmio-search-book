---
id: "section-15-funding-model-15-docs-03-core-concepts-mathematical-foundation-gradient-flow"
title: "03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: Mathematical Foundation: Gradient Flow"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#mathematical-foundation-gradient-flow"]
parentPageId: "neelo-15-funding-model-15-docs-03-core-concepts"
sourcePath: "Docs/public/15_funding_model/15_docs/03_core_concepts.md"
headingId: "mathematical-foundation-gradient-flow"
---

# 03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: Mathematical Foundation: Gradient Flow

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#mathematical-foundation-gradient-flow

## Extracted Section Draft

## Mathematical Foundation: Gradient Flow

### The Master Equation

Any system where agents follow local gradients of a potential will be repelled by local extremes and converge toward a global attractor:

```
dx/dt = -∇V(x)
```

Where:
- `V(x)` = potential (energy, risk, cost, stress)
- System moves "downhill" in the potential landscape
- Local gradients push things away from danger
- Global minimum attracts everything

### Mapping to Our System

| Our System | Mathematical Object |
|------------|---------------------|
| Local risk (per market) | High local gradient `∇V` |
| Push away from danger | Force `-∇V` |
| Converge to global profit | Global minimum of `V` |
| Capital/liquidity flow | Trajectory `x(t)` |

---
