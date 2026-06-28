---
id: "section-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition-3-7-lp-profit-decomposition-technical"
title: "Section 3: LP Value Proposition: 3.7 LP Profit Decomposition (Technical)"
section: "vision-sections"
track: "13 — Proof of Value Framework"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition#3-7-lp-profit-decomposition-technical"]
parentPageId: "neelo-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition"
sourcePath: "Docs/public/13_framework_value_permissionless_perps/13_docs/03-LP-Value-Proposition.md"
headingId: "3-7-lp-profit-decomposition-technical"
---

# Section 3: LP Value Proposition: 3.7 LP Profit Decomposition (Technical)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition#3-7-lp-profit-decomposition-technical

## Extracted Section Draft

## 3.7 LP Profit Decomposition (Technical)

From the vibe_full_derivation specification, LP profit per market:

```
Π_m = Rev_m − Cost_m − α·Π_m_traders + Π_m_hedge − L_m_shortfall
```

Where:
- `Rev_m` = trading fees, spread, funding, liquidation fees, borrow revenue
- `Cost_m` = hedge cost, external borrow, operations
- `α` = counterparty share (Phase 1: ~1, Phase 2: ~0 as netting increases)
- `Π_m_traders` = aggregate trader PnL
- `Π_m_hedge` = solver hedge PnL
- `L_m_shortfall` = bad debt / liquidation shortfall

As markets mature, netting increases, `α` decreases, and LP risk exposure declines while revenue persists.

---

*Next Section: Trader and Project Value →*
