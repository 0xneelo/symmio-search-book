---
id: "section-15-funding-model-15-docs-01-abstract-d-safety-adl"
title: "Abstract: (D) Safety / ADL"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#d-safety-adl"]
parentPageId: "neelo-15-funding-model-15-docs-01-abstract"
sourcePath: "Docs/public/15_funding_model/15_docs/01_abstract.md"
headingId: "d-safety-adl"
---

# Abstract: (D) Safety / ADL

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract#d-safety-adl

## Extracted Section Draft

## (D) Safety / ADL

| # | Section | Description |
|---|---------|-------------|
| D0 | Defense Stack Ordering | State machine: pricing → local ins → global ins → ADL |
| D1 | Insurance Spend Budgets | Per-period caps: B_loc, B_glob |
| D2 | Insurance Spend Allocation | Local-first rule, then global proportional |
| D3 | Global Insurance Eligibility | Per-token / per-market rules (scam prevention) |
| D4 | ADL Trigger Conditions | (spend saturated ∧ D_res > 0) ∨ (E > E_safe) |
| D5 | ADL Magnitude Solver | a_m = 1 − (E_safe / E_current) |
| D6 | Market vs Account ADL | Which positions get deleveraged, priority |
| D7 | Emergency Overrides | Circuit breakers, funding clamps, OI caps |
| D8 | Flash-Crash Behavior | Fast path through defense stack |
| D9 | Safety Constraints | Hard bounds on exposure, utilization, spend |

---
