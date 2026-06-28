---
id: "section-15-funding-model-15-docs-03-core-concepts-the-core-invariant-why-vibe-is-different"
title: "03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: The Core Invariant: Why Vibe Is Different"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#the-core-invariant-why-vibe-is-different"]
parentPageId: "neelo-15-funding-model-15-docs-03-core-concepts"
sourcePath: "Docs/public/15_funding_model/15_docs/03_core_concepts.md"
headingId: "the-core-invariant-why-vibe-is-different"
---

# 03. Core Concepts: Gradient Flow & Attractor-Repeller Dynamics: The Core Invariant: Why Vibe Is Different

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#the-core-invariant-why-vibe-is-different

## Extracted Section Draft

## The Core Invariant: Why Vibe Is Different

### Traditional Systems (Uniswap, GMX)

```
LP PnL = f(ΔP)  — Price-only, path-independent, unavoidable loss
```

- Liquidations can create bad debt
- Aggressive funding can cause cascades
- IL is mathematically inevitable

### Vibe's Invariant

> **Liquidations are inventory reallocations, not loss events.**

```
LP PnL = Fees + Funding + Liquidations − Trader_PnL
```

- Price enters only indirectly (via trader success)
- Empirically: E[Trader_PnL] < 0 → E[LP_PnL] > 0
- Liquidations generate revenue, not spot sells

### Why This Changes Everything

Because liquidations never create negative equity:
- Faster liquidations = **better** for solver safety
- We can use aggressive funding ramps without fear
- Liquidation cascades are **not** insolvency cascades

---
