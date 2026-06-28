---
id: "section-13-framework-value-permissionless-perps-13-docs-05-economic-clarity-5-2-decomposition-of-perp-fills"
title: "Section 5: Economic Clarity: 5.2 Decomposition of Perp Fills"
section: "vision-sections"
track: "13 — Proof of Value Framework"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/05-economic-clarity#5-2-decomposition-of-perp-fills"]
parentPageId: "neelo-13-framework-value-permissionless-perps-13-docs-05-economic-clarity"
sourcePath: "Docs/public/13_framework_value_permissionless_perps/13_docs/05-Economic-Clarity.md"
headingId: "5-2-decomposition-of-perp-fills"
---

# Section 5: Economic Clarity: 5.2 Decomposition of Perp Fills

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/05-economic-clarity#5-2-decomposition-of-perp-fills

## Extracted Section Draft

## 5.2 Decomposition of Perp Fills

Each perp fill decomposes into two components at execution:

1. **Netted exposure** (matched long vs. short internally): P&L transfers **between traders**.
2. **Un-netted exposure** (residual imbalance): The trader's P&L is effectively against the **solver (and the liquidity it uses, including LP vault capacity)** until the solver rebalances/hedges.

---
