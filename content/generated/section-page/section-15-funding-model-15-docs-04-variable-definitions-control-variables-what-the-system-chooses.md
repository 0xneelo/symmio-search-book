---
id: "section-15-funding-model-15-docs-04-variable-definitions-control-variables-what-the-system-chooses"
title: "04. Variable Definitions: Control Variables (What the System Chooses)"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#control-variables-what-the-system-chooses"]
parentPageId: "neelo-15-funding-model-15-docs-04-variable-definitions"
sourcePath: "Docs/public/15_funding_model/15_docs/04_variable_definitions.md"
headingId: "control-variables-what-the-system-chooses"
---

# 04. Variable Definitions: Control Variables (What the System Chooses)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#control-variables-what-the-system-chooses

## Extracted Section Draft

## Control Variables (What the System Chooses)

| Variable | Symbol | Range | Description |
|----------|--------|-------|-------------|
| Local Insurance Spend | `x_m_loc` | `[0, B_m_loc]` | Insurance spent this period (local) |
| Global Insurance Spend | `x_m_glob` | `[0, B_m_glob]` | Insurance spent this period (global) |
| Total Insurance Spend | `x_m` | `x_m_loc + x_m_glob` | Combined spend |
| Hedge Action | `h_m` | — | Exposure-reducing trade (tokens) |
| ADL Action | `a_m` | `[0, 1]` | Fraction of exposure to ADL |

---
