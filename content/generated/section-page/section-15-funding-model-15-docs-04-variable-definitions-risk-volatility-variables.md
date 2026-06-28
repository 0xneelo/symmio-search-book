---
id: "section-15-funding-model-15-docs-04-variable-definitions-risk-volatility-variables"
title: "04. Variable Definitions: Risk & Volatility Variables"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#risk-volatility-variables"]
parentPageId: "neelo-15-funding-model-15-docs-04-variable-definitions"
sourcePath: "Docs/public/15_funding_model/15_docs/04_variable_definitions.md"
headingId: "risk-volatility-variables"
---

# 04. Variable Definitions: Risk & Volatility Variables

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#risk-volatility-variables

## Extracted Section Draft

## Risk & Volatility Variables

| Variable | Symbol | Formula | Description |
|----------|--------|---------|-------------|
| Volatility | `σ` | `volatility` | 30d price deviation / returns std dev |
| Profit Deviation | `dev` | `profitDeviation` | How far from target profit |
| Market Max Pump | `M_pump` | `1 + marketMaxPump` | Max price multiplier before pump stops |
| Avg User Max Pump | `U_pump` | `1 + avgAllUserMaxPump` | When users would close (aggregate) |
| Max Market Drawdown | `DD_mkt` | `maxMarketDrawdown` | Max % to sell on short opening |
| Max Deposit Drawdown | `DD_dep` | `maxDepositDrawdown` | Max % of deposited tokens to sell |

---
