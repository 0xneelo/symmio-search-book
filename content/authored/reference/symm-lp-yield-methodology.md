---
id: "authored-symm-lp-yield-methodology"
title: "SYMM LP Yield Methodology"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-2-methodology"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-2-methodology", "authored-symm-lp-unit-economics", "authored-symm-lp-data-guardrails", "authored-symm-lp-realized-marked-pnl-split"]
---

# SYMM LP Yield Methodology

The SYMM LP methodology section explains how the source computes daily and annualized yield. It does not use a compounding model. It computes average per-day profit relative to active token or USDC notional, averages the daily series over the analysis window, then annualizes by multiplying by `365`.

The source formulas are:

```text
tokenYield_day = avgTokenProfitPerDay / tokenAmountThatDay
usdcYield_day = avgUsdcProfitPerDay / activeUsdNotionalThatDay
avgYield_day = mean(yield_day over analysis window)
avgYield_year = avgYield_day * 365
```

## Window Assumptions

The source window begins at the first deposit, `29/12/2025`, and ends at the referenced dashboard snapshot data cut. The daily series uses the same case-study source set documented in the data-snapshot section.

This means the annualized number is a convention applied to the observed window. It is not the same as a full-year realized return, and it does not prove compounding behavior.

## Reader Implication

Whenever the compendium uses SYMM LP annualized yield language, it should show the methodology. The right public phrasing is "annualized from an observed daily average over this window," not "the LP earns this APY."

## Publication Boundary

Do not publish this methodology as audited accounting, tax treatment, live vault APY, or a guaranteed annual return. Final public reporting needs operator/accounting review of source ownership, time window, compounding convention, realized versus marked treatment, and current data availability.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics", "3.2 Methodology".

## Related Pages

- `authored-symm-lp-unit-economics`
- `authored-symm-lp-data-guardrails`
- `authored-symm-lp-realized-marked-pnl-split`
