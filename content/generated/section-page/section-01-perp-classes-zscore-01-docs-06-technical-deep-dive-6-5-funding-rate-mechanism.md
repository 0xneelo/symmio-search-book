---
id: "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-5-funding-rate-mechanism"
title: "Section 6: Technical Deep Dive: 6.5 Funding Rate Mechanism"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-5-funding-rate-mechanism"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/06-Technical-Deep-Dive.md"
headingId: "6-5-funding-rate-mechanism"
---

# Section 6: Technical Deep Dive: 6.5 Funding Rate Mechanism

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-5-funding-rate-mechanism

## Extracted Section Draft

## 6.5 Funding Rate Mechanism

### 6.5.1 Purpose

Funding rates anchor perpetual prices to spot:
- Perp > Spot → Longs pay shorts → Price decreases
- Perp < Spot → Shorts pay longs → Price increases

### 6.5.2 Vibe Funding Model

**Standard Funding**:
```
Funding_Rate = (Perp_Price - Spot_Price) / Spot_Price × K

Where K is a dampening constant
```

**Solver-Adjusted Funding**:
During bootstrap, funding adjusts for Solver position:
```
Adjusted_Rate = Base_Rate + Solver_Incentive

Solver_Incentive = f(Z_Score, Solver_Position_Direction)
```

When Solver is heavily exposed, funding incentivizes opposing positions.

### 6.5.3 Funding Payment Flow

```
Every funding_interval (e.g., 8 hours):

  For each position:
    funding_payment = position_size × funding_rate

    if position.side == LONG and funding_rate > 0:
      position.margin -= funding_payment
    elif position.side == SHORT and funding_rate > 0:
      position.margin += funding_payment
    # Vice versa for negative funding
```

---
