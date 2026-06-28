---
id: "section-15-funding-model-15-docs-04-variable-definitions-aenigma-the-adl-exposure-threshold"
title: "04. Variable Definitions: Aenigma: The ADL Exposure Threshold"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#aenigma-the-adl-exposure-threshold"]
parentPageId: "neelo-15-funding-model-15-docs-04-variable-definitions"
sourcePath: "Docs/public/15_funding_model/15_docs/04_variable_definitions.md"
headingId: "aenigma-the-adl-exposure-threshold"
---

# 04. Variable Definitions: Aenigma: The ADL Exposure Threshold

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#aenigma-the-adl-exposure-threshold

## Extracted Section Draft

## Aenigma: The ADL Exposure Threshold

**Definition:**

```
A := aenigma = max(M_pump, U_pump, D)
```

Where:
- `M_pump = 1 + marketMaxPump` (e.g., 500% → 6.0)
- `U_pump = 1 + avgAllUserMaxPump` (e.g., 400% → 5.0)
- `D = 1 + max(DD_mkt, DD_dep)` (e.g., 40% → 1.4)

**Interpretation:**

Aenigma is the worst-case multiplier of exposure before positions are assumed to unwind. It tells us exactly at which point we are fully exposed, as our tokens are not enough to cover positions.

**Example Values:**

| Scenario | M_pump | U_pump | D | A |
|----------|--------|--------|---|---|
| Conservative | 3.0 | 2.5 | 1.3 | 3.0 |
| Moderate | 6.0 | 5.0 | 1.4 | 6.0 |
| Aggressive | 11.0 | 10.0 | 1.5 | 11.0 |

---
