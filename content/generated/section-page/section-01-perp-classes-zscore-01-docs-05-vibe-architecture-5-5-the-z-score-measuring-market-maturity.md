---
id: "section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-5-the-z-score-measuring-market-maturity"
title: "Section 5: Vibe Trading Architecture: 5.5 The Z-Score: Measuring Market Maturity"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-5-the-z-score-measuring-market-maturity"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-05-vibe-architecture"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/05-Vibe-Architecture.md"
headingId: "5-5-the-z-score-measuring-market-maturity"
---

# Section 5: Vibe Trading Architecture: 5.5 The Z-Score: Measuring Market Maturity

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-5-the-z-score-measuring-market-maturity

## Extracted Section Draft

## 5.5 The Z-Score: Measuring Market Maturity

### 5.5.1 Definition

The Z-Score quantifies how much a market depends on the Solver as residual counterparty versus natural trader flow.

**Formula**:
```
Z = |Net_Solver_Position| / Total_Open_Interest

Where:
- Net_Solver_Position = |Sum(Long_OI) - Sum(Short_OI)|
- Total_Open_Interest = Sum(Long_OI) + Sum(Short_OI)

Z ranges from 0 to 1:
- Z = 1: Completely one-sided (100% Solver exposure)
- Z = 0: Perfectly balanced (0% Solver exposure)
```

### 5.5.2 Z-Score Interpretation

| Z-Score Range | Interpretation | Market State |
|---------------|----------------|--------------|
| 0.8 - 1.0 | Heavily Solver-dependent | Bootstrap |
| 0.5 - 0.8 | Moderate Solver dependency | Early Growth |
| 0.2 - 0.5 | Low Solver dependency | Growth |
| 0.05 - 0.2 | Minimal Solver dependency | Mature |
| 0 - 0.05 | Essentially netted | Order Book Ready |

### 5.5.3 Z-Score Dynamics

The Z-Score typically follows a pattern as markets mature:

```
Z-Score
  1.0 |*
      | *
  0.8 |  *
      |   *
  0.6 |    *
      |     **
  0.4 |       **
      |         ***
  0.2 |            ****
      |                *****
  0.0 |____________________******___________
      0    30    60    90   120   150   180  Days
           Early  Growth    Mature    Order
                                      Book
```

### 5.5.4 Additional Maturity Metrics

While Z-Score is primary, other metrics inform maturation:

| Metric | Description | Threshold |
|--------|-------------|-----------|
| Daily Volume | Trading activity | >$1M/day |
| Unique Traders | User diversity | >100/week |
| Average Position Size | Market depth | Market-dependent |
| Liquidation Rate | Risk health | <5% of positions |
| Funding Volatility | Price stability | Converging |

> **TO:DO**: Define specific threshold values for each metric that trigger state transitions. These should be calibrated based on historical data from comparable markets.

---
