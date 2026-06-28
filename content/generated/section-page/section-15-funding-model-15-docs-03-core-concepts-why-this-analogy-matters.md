---
id: "section-15-funding-model-15-docs-03-core-concepts-why-this-analogy-matters"
title: "03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: Why This Analogy Matters"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#why-this-analogy-matters"]
parentPageId: "neelo-15-funding-model-15-docs-03-core-concepts"
sourcePath: "Docs/public/15_funding_model/15_docs/03_core_concepts.md"
headingId: "why-this-analogy-matters"
---

# 03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: Why This Analogy Matters

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#why-this-analogy-matters

## Extracted Section Draft

## Why This Analogy Matters

### 1. Local vs Global Optimization

**Problem with pure gradient ascent:**
- Converges to local maxima (often undesirable)
- Cannot see global structure
- Gets "stuck" in suboptimal states

**Our solution:**
- Local repellers (risk signals) push away from danger zones
- Global attractor (profit) pulls toward sustainability
- Multiple mechanisms prevent local traps

### 2. The Source-Sink Flow Structure

Our system exhibits **source-sink dynamics**:

```
∇·F > 0  near N (source) — divergence, repulsion
∇·F < 0  near S (sink)   — convergence, attraction
```

This structure appears in:
- Magnetism
- Fluid flow
- Capital flow
- Risk routing
- Mean-field games

### 3. Why Magnets Don't Get "Stuck in Local Maxima"

Magnetic fields are **globally constrained** (Maxwell equations):
- Field lines cannot terminate arbitrarily
- Local extrema are structurally unstable
- The geometry eliminates bad local optima by construction

Our system mimics this by:
- Using convex penalties near danger zones (blow up as `u → 1`)
- Cross-market insurance (bell curve flattening)
- Multiple defense layers before ADL

---
