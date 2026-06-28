---
id: "section-15-funding-model-15-docs-05-utilization-modes-mode-2-insurance-fund-utilization"
title: "05. Utilization Modes: Token Inventory vs Insurance Fund: Mode 2: Insurance Fund Utilization"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-2-insurance-fund-utilization"]
parentPageId: "neelo-15-funding-model-15-docs-05-utilization-modes"
sourcePath: "Docs/public/15_funding_model/15_docs/05_utilization_modes.md"
headingId: "mode-2-insurance-fund-utilization"
---

# 05. Utilization Modes: Token Inventory vs Insurance Fund: Mode 2: Insurance Fund Utilization

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-2-insurance-fund-utilization

## Extracted Section Draft

## Mode 2: Insurance Fund Utilization

### Definition

```
u₂ := u_insurance = L(E_usd) / B_ins
```

Where:
- `L(E_usd)` = exposure loss estimate (worst-case)
- `B_ins` = insurance budget (local + global allocation)

### Insurance Budget Formula

```
B_ins := η_loc · I_loc + η_glob · I_m_glob
```

Where:
- `η_loc ∈ [0, 1]` = fraction of local fund willing to risk (e.g., 30%)
- `η_glob ∈ [0, 1]` = fraction of global allocation willing to risk (e.g., 100%)
- `I_loc` = local insurance fund
- `I_m_glob` = global insurance allocated to this market

### Exposure Loss Estimate

Simple (transparent) version:

```
L(E_usd) := E_usd · (A − 1)
```

Where `A` is Aenigma (max exposure multiplier before unwind).

With volatility adjustment:

```
L(E_usd) := E_usd · max(A − 1, exp(z · σ · √Δt) − 1)
```

Where:
- `σ` = volatility
- `Δt` = risk horizon
- `z` = safety quantile (e.g., 2.33 for 99%)

### When Used

- Exposure **exceeds** token inventory (`E_usd > C_usd`)
- Solver has "unhedged exposure"
- System is in "insurance mode"

### Interpretation

| `u₂` Value | State | Action |
|------------|-------|--------|
| `< 0.50` | Manageable | Use insurance + aggressive rates |
| `0.50 - 0.75` | Warning | Very aggressive rates |
| `0.75 - 1.00` | Danger | Near ADL threshold |
| `≥ 1.00` | Critical | ADL likely required |

### Example

```
Unhedged exposure: $10,000
Aenigma (A): 3.0
Exposure loss estimate: L = 10,000 × (3.0 − 1) = $20,000

Local insurance: $100,000 @ 30% risk = $30,000
Global allocation: $10,000 @ 100% risk = $10,000
B_ins = $40,000

u₂ = 20,000 / 40,000 = 50%
```

Status: Warning zone, but manageable.

---
