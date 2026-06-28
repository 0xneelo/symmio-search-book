---
id: "section-15-funding-model-15-docs-04-variable-definitions-insurance-safety-variables"
title: "04. Variable Definitions: Insurance & Safety Variables"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#insurance-safety-variables"]
parentPageId: "neelo-15-funding-model-15-docs-04-variable-definitions"
sourcePath: "Docs/public/15_funding_model/15_docs/04_variable_definitions.md"
headingId: "insurance-safety-variables"
---

# 04. Variable Definitions: Insurance & Safety Variables

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#insurance-safety-variables

## Extracted Section Draft

## Insurance & Safety Variables

| Variable | Symbol | Formula | Description |
|----------|--------|---------|-------------|
| Local Insurance Fund | `I_loc` | `insuranceFundLocal` | Per-market fund from liquidations |
| Global Insurance (this market) | `I_m_glob` | `insuranceFundGlobalOnThisMarket` | Allocated global fund |
| Max Local Spend/Period | `B_m_loc` | — | Cap on local insurance spend |
| Max Global Spend/Period | `B_m_glob` | — | Cap on global insurance spend |
| Total Defense Budget | `B_m_def` | `B_m_loc + B_m_glob` | Combined spend cap |

---
