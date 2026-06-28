---
id: "section-15-funding-model-15-docs-01-abstract-a-accounting"
title: "Abstract: (A) Accounting"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#a-accounting"]
parentPageId: "neelo-15-funding-model-15-docs-01-abstract"
sourcePath: "Docs/public/15_funding_model/15_docs/01_abstract.md"
headingId: "a-accounting"
---

# Abstract: (A) Accounting

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#a-accounting

## Extracted Section Draft

## (A) Accounting

| # | Section | Description |
|---|---------|-------------|
| A0 | Scope, Indices, Time Window | Market indices, time discretization, window definitions |
| A1 | Unit Conventions & Normalization | Token vs USDC notional, price conversion rules |
| A2 | Core Market State Variables | Inputs: OI, price, token holdings, USDC held |
| A3 | Derived Inventory Capacity | Covered amount, obtainable tokens, absolute tokens |
| A4 | Netting & Exposure Decomposition | Netted amounts, solver exposure, direction |
| A5 | Revenue Components | Trading fees, spread, funding, liquidation, MM, borrow |
| A6 | Cost Components | Hedge cost, external borrow, operations, shortfall |
| A7 | Per-Market LP/Solver Profit (Raw) | Π_m = Rev − Cost − α·Trader_PnL |
| A8 | Phase Parameterization | Counterparty share α (Phase 1 vs Phase 2) |
| A9 | Buyback Accounting | Token buys vs USDC retention, perpetual bid logic |
| A10 | Local Insurance Fund | Definition, inflows (liquidations + 30% profits) |
| A11 | Global Insurance Fund | Allocation buckets, eligibility, caps |
| A12 | Profit Deviation Metric | Target vs actual profit ratio |
| A13 | Profit vs Insurance Smoothing | Conceptual separation of flattening uses |

---
