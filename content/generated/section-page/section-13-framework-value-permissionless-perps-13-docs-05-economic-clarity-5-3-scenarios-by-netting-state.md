---
id: "section-13-framework-value-permissionless-perps-13-docs-05-economic-clarity-5-3-scenarios-by-netting-state"
title: "Section 5: Economic Clarity: 5.3 Scenarios by Netting State"
section: "vision-sections"
track: "13 — Proof of Value Framework"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/05-economic-clarity#5-3-scenarios-by-netting-state"]
parentPageId: "neelo-13-framework-value-permissionless-perps-13-docs-05-economic-clarity"
sourcePath: "Docs/public/13_framework_value_permissionless_perps/13_docs/05-Economic-Clarity.md"
headingId: "5-3-scenarios-by-netting-state"
---

# Section 5: Economic Clarity: 5.3 Scenarios by Netting State

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/05-economic-clarity#5-3-scenarios-by-netting-state

## Extracted Section Draft

## 5.3 Scenarios by Netting State

### Scenario 1: Trader Goes Long, 100% Netted vs. a Short

- **Price up**: Short trader pays long trader.
- **Price down**: Long trader pays short trader.
- **Risk holder**: Traders (trader-to-trader).

### Scenario 2: Trader Goes Long, 0% Netted (No Offsetting Short)

The **solver temporarily warehouses the residual short exposure** (directly or via hedging).

- **Price up**: Un-netted portion of long profits paid by solver's hedging P&L and/or liquidity resources (including LP vault capacity), per the venue's risk waterfall.
- **Price down**: Long trader pays losses; solver's residual exposure benefits.
- **Risk holder**: Solver (and LP vault capacity, per risk terms) until hedged.

### In Practice

The live system is a **continuous blend** (partial netting is most common). The solver's objective: keep the system close to delta-neutral, increasing LP returns while reducing risk.

---
