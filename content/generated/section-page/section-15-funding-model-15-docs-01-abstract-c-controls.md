---
id: "section-15-funding-model-15-docs-01-abstract-c-controls"
title: "Abstract: (C) Controls"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#c-controls"]
parentPageId: "neelo-15-funding-model-15-docs-01-abstract"
sourcePath: "Docs/public/15_funding_model/15_docs/01_abstract.md"
headingId: "c-controls"
---

# Abstract: (C) Controls

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#c-controls

## Extracted Section Draft

## (C) Controls

| # | Section | Description |
|---|---------|-------------|
| C0 | Control Surface Overview | All available knobs and their domains |
| C1 | Funding Modes | Token inventory mode vs insurance mode switch logic |
| C2 | Dynamic Funding Function | f(u₁, skew, u₂) with regime multipliers |
| C3 | Dynamic Borrow Function | b(u₁, dev) paid to LP/solver |
| C4 | Dynamic Spread Function | Two-sided vs one-sided, directional asymmetry |
| C5 | Incentive Shaping | Negative spread / rebates to rebalancing side |
| C6 | Recovery Constraint | F_spread + F_fund + F_borrow ≥ ρ·L(E) |
| C7 | Cross-Market Recovery | Global spread/funding lift option |
| C8 | Bell-Curve: Profit-Tail | Transfer from Π > U to Π < L |
| C9 | Bell-Curve: Stress-Tail | Allocate insurance to D_m proportionally |
| C10 | Flattening Pool | T = β·min(E_total, S_total), cutoffs k·σ |
| C11 | Flattening Allocation | τ_m, γ_m proportional shares |
| C12 | Flattening Invariants | Σ Π' = Σ Π (conservation) |
| C13 | Decision Outputs | Final knobs per market per epoch |

---
