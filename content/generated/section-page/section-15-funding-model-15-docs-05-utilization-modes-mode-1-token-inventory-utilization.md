---
id: "section-15-funding-model-15-docs-05-utilization-modes-mode-1-token-inventory-utilization"
title: "05. Utilization Modes: Token Inventory vs Insurance Fund: Mode 1: Token Inventory Utilization"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-1-token-inventory-utilization"]
parentPageId: "neelo-15-funding-model-15-docs-05-utilization-modes"
sourcePath: "Docs/public/15_funding_model/15_docs/05_utilization_modes.md"
headingId: "mode-1-token-inventory-utilization"
---

# 05. Utilization Modes: Token Inventory vs Insurance Fund: Mode 1: Token Inventory Utilization

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-1-token-inventory-utilization

## Extracted Section Draft

## Mode 1: Token Inventory Utilization

### Definition

```
u₁ := u_token = E_usd / C_usd
```

Or equivalently in tokens:

```
u₁ = E_tok / C_tok
```

### When Used

- Exposure is **within** token inventory limits
- `E_usd ≤ C_usd` (we have tokens to cover)
- System is in "normal" or "stress" regime

### Interpretation

| `u₁` Value | State | Action |
|------------|-------|--------|
| `< 0.80` | Normal | Base rates |
| `0.80 - 0.95` | Stress | Elevated rates (kinked curve) |
| `> 0.95` | Critical | Emergency ramp begins |
| `> 1.00` | Over-utilized | Switch to Mode 2 |

### Example

```
Token inventory: $50,000 (5,000 tokens @ $10)
Net long exposure: $40,000

u₁ = 40,000 / 50,000 = 80%
```

Status: At the kink point, entering stress regime.

---
