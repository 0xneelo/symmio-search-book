---
id: "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-5-metric-sign-convention-critical"
title: "Performance and Unit Economics: 3.5 Metric Sign Convention (Critical)"
section: "vision-sections"
track: "12 - First Vibe Perp Vault Case study"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-5-metric-sign-convention-critical"]
parentPageId: "neelo-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics"
sourcePath: "Docs/public/12_case_study_symm_lp/12_docs/03-Performance-and-Unit-Economics.md"
headingId: "3-5-metric-sign-convention-critical"
---

# Performance and Unit Economics: 3.5 Metric Sign Convention (Critical)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-5-metric-sign-convention-critical

## Extracted Section Draft

## 3.5 Metric Sign Convention (Critical)

Per your protocol accounting definitions:

- **Current Debt** is user debt to LP that is already realized.
- **Current UPnL** is users' current unrealized PnL.
- If either field is **negative**, that means the **LP is in profit** on that component.

Operationally:

- `LP realized component ~= - Current Debt`
- `LP unrealized component ~= - Current UPnL`

Example from the provided screenshot:

- `Current Debt = -5,895.90` -> LP has about `$5,895.90` realized user debt in its favor.
- `Current UPnL = -7,999.32` -> LP has about `$7,999.32` unrealized edge at that mark.

`Current Debt` is realized and withdrawable for the LP, while `Current UPnL` remains mark-to-market and is not guaranteed as immediately withdrawable cash.
