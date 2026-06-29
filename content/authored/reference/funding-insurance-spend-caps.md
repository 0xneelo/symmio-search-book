---
id: "authored-funding-insurance-spend-caps"
title: "Funding Insurance Spend Caps"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl#spend-caps-per-period", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#layer-3-local-insurance-fund", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#layer-4-global-insurance-fund"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-insurance-safety-budgets"]
---

# Funding Insurance Spend Caps

Insurance spend in Neelo's funding model is capped. The model separates local spend, global spend, and total defense budget so a single stressed market cannot silently consume every available reserve.

The source names three spend constraints:

```
x_m_loc <= B_m_loc
sum_m x_m_glob <= B_glob
x_m <= B_m_def
```

with:

```
B_m_def = B_m_loc + B_m_glob
```

`x_m_loc` is spend from the market's local insurance fund. `x_m_glob` is spend from the eligible global allocation. `x_m` is the combined insurance deployed for that market in the period.

## Why The Caps Are Separate

Local insurance is isolated by market. It can be spent first without draining unrelated markets. Global insurance is shared and therefore more sensitive: the source says not every token qualifies, eligibility is manual per market, and allocation should never risk all of the global fund in one market.

The total defense budget ties those layers together. It defines how much explicit insurance defense can be used before the residual stress calculation starts pointing toward ADL or another emergency posture.

## Publication Boundary

This page explains the source-model cap structure. It should not publish live local caps, global caps, risk fractions, market eligibility, spend cadence, reserve balances, or allocation percentages without operator, accounting, risk, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic", "Insurance Spend Mechanism".
- `vibe-papers`: Neelo, "Defense Hierarchy", "Local Insurance Fund" and "Global Insurance Fund".

## Related Pages

- `authored-funding-insurance-safety-budgets`
- `authored-funding-local-insurance-fund`
- `authored-funding-global-insurance-eligibility`
