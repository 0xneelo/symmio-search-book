---
id: "section-15-funding-model-15-docs-04-variable-definitions-computed-risk-signals-inputs-to-risk-function"
title: "04. Variable Definitions: Computed Risk Signals (Inputs to Risk Function)"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#computed-risk-signals-inputs-to-risk-function"]
parentPageId: "neelo-15-funding-model-15-docs-04-variable-definitions"
sourcePath: "Docs/public/15_funding_model/15_docs/04_variable_definitions.md"
headingId: "computed-risk-signals-inputs-to-risk-function"
---

# 04. Variable Definitions: Computed Risk Signals (Inputs to Risk Function)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#computed-risk-signals-inputs-to-risk-function

## Extracted Section Draft

## Computed Risk Signals (Inputs to Risk Function)

| Signal | Symbol | Formula | When High |
|--------|--------|---------|-----------|
| Inventory Utilization | `u₁` | `E_usd / C_usd` | Low token coverage |
| Insurance Utilization | `u₂` | `L(E_usd) / B_ins` | Exposure loss > insurance |
| Skew | `|skew|` | `|L − S| / (L + S)` | Imbalanced market |
| Volatility | `σ` | From price data | Unstable market |
| Profit Deviation | `dev` | `profitDeviation` | Below target profit |
| Residual Stress | `D_m_res` | `max(0, D_m − x_m)` | Uncovered after insurance |

---

*Next: [05. Utilization modes](05_utilization_modes.md)*
