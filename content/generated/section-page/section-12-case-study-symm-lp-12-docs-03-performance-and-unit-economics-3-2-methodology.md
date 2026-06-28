---
id: "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-2-methodology"
title: "Performance and Unit Economics: 3.2 Methodology"
section: "vision-sections"
track: "12 - First Vibe Perp Vault Case study"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-2-methodology"]
parentPageId: "neelo-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics"
sourcePath: "Docs/public/12_case_study_symm_lp/12_docs/03-Performance-and-Unit-Economics.md"
headingId: "3-2-methodology"
---

# Performance and Unit Economics: 3.2 Methodology

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-2-methodology

## Extracted Section Draft

## 3.2 Methodology

Daily yields are computed from averaged per-day profit and active token notional, then averaged over the analysis window and annualized.

- `tokenYield_day = avgTokenProfitPerDay / tokenAmountThatDay`
- `usdcYield_day = avgUsdcProfitPerDay / activeUsdNotionalThatDay`
- `avgYield_day = mean(yield_day over analysis window)`
- `avgYield_year = avgYield_day * 365`

Window assumptions used in this paper:

- analysis window starts at first deposit (`29/12/2025`) and ends at the referenced dashboard snapshot (`20:48:23` data cut);
- the daily yield series uses the same case-study source set documented in `07-Data-Snapshot-and-Metric-Definitions.md`;
- annualization uses a simple 365-day multiplier (no compounding adjustment).
