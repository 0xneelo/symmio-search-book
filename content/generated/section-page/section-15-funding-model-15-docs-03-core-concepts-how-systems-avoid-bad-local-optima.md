---
id: "section-15-funding-model-15-docs-03-core-concepts-how-systems-avoid-bad-local-optima"
title: "03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: How Systems Avoid Bad Local Optima"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#how-systems-avoid-bad-local-optima"]
parentPageId: "neelo-15-funding-model-15-docs-03-core-concepts"
sourcePath: "Docs/public/15_funding_model/15_docs/03_core_concepts.md"
headingId: "how-systems-avoid-bad-local-optima"
---

# 03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: How Systems Avoid Bad Local Optima

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#how-systems-avoid-bad-local-optima

## Extracted Section Draft

## How Systems Avoid Bad Local Optima

### Mechanism 1: Noise / Temperature (Simulated Annealing)

```
x_{t+1} = x_t + η∇f(x_t) + √T · ξ_t
```

- Noise lets you escape local peaks
- As `T → 0`, system settles into global maximum
- Entropy temporarily beats gradient greediness

### Mechanism 2: Momentum / Inertia

```
v_{t+1} = β·v_t + ∇f(x_t)
x_{t+1} = x_t + η·v_{t+1}
```

- Prevents getting stuck on small bumps
- Carries system across shallow local extrema

### Mechanism 3: Repulsive Local Penalties (Our Approach)

```
max_x  f(x) − λ·R_local(x)
```

- Local risk spikes create repulsive gradients
- Flatten or destabilize local maxima
- Only large, stable structures survive

### Mechanism 4: Mean-Field / Population Effects

```
ρ_{t+1}(x) ∝ ρ_t(x) · e^{β·f(x)}
```

- Bad local peaks lose mass
- Global peak accumulates mass
- Collective dynamics beat local traps

---
