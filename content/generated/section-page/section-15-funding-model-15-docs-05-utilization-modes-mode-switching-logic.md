---
id: "section-15-funding-model-15-docs-05-utilization-modes-mode-switching-logic"
title: "05. Utilization Modes: Token Inventory vs Insurance Fund: Mode Switching Logic"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-switching-logic"]
parentPageId: "neelo-15-funding-model-15-docs-05-utilization-modes"
sourcePath: "Docs/public/15_funding_model/15_docs/05_utilization_modes.md"
headingId: "mode-switching-logic"
---

# 05. Utilization Modes: Token Inventory vs Insurance Fund: Mode Switching Logic

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-switching-logic

## Extracted Section Draft

## Mode Switching Logic

### Automatic Transition

```python
def get_utilization_mode(E_usd, C_usd, L_E, B_ins):
    u1 = E_usd / C_usd
    u2 = L_E / B_ins

    if E_usd <= C_usd:
        # Within token coverage
        return "token_inventory", u1
    else:
        # Unhedged exposure exists
        # Use the higher/more urgent utilization
        return "insurance_fund", max(u1, u2)
```

### Combined Utilization for Pricing

When determining dynamic rates:

```
u_effective = {
    u₁                    if E_usd ≤ C_usd
    max(u₁, u₂)           if E_usd > C_usd
}
```

### Why Use Max?

Using `max(u₁, u₂)` ensures:
- If token utilization is high but insurance is plentiful → rates reflect token scarcity
- If insurance utilization is high but tokens exist → rates reflect insurance stress
- The system always prices in the binding constraint

---
