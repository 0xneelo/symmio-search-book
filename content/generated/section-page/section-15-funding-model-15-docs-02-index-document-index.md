---
id: "section-15-funding-model-15-docs-02-index-document-index"
title: "Vibe Perpetual Market - Full Mathematical Derivation: Document Index"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#document-index"]
parentPageId: "neelo-15-funding-model-15-docs-02-index"
sourcePath: "Docs/public/15_funding_model/15_docs/02_index.md"
headingId: "document-index"
---

# Vibe Perpetual Market - Full Mathematical Derivation: Document Index

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#document-index

## Extracted Section Draft

## Document Index

This folder contains the complete mathematical specification for Vibe's perpetual futures system, including funding rates, dynamic spreads, insurance mechanisms, and auto-deleveraging logic.

> **Start here:** [01_abstract.md](01_abstract.md) — System overview, master formula, and spec table of contents
> **Why this math exists:** [00_informal_intro.md](00_informal_intro.md) — Informal framing: what the derivation claims vs does not claim, and how it relates to markets, z-score traversal, and solver design

---

### Core Documents

| # | File | Description |
|---|------|-------------|
| 00 | [Informal intro (thought process)](00_informal_intro.md) | Why the problem is not “solvable by math alone”; formulas as problem-sharpening; UX vs LP tradeoff; role of ADL and solvers |
| 01 | [Abstract & spec TOC](01_abstract.md) | System overview, master formula, specification index |
| 02 | [Document index](02_index.md) | This file: directory index and quick reference |
| 03 | [Core concepts](03_core_concepts.md) | Gradient flow analogy, attractor-repeller dynamics |
| 04 | [Variable definitions](04_variable_definitions.md) | All per-market state variables and notation |
| 05 | [Utilization modes](05_utilization_modes.md) | Token inventory vs insurance fund utilization |
| 06 | [LP profit decomposition](06_lp_profit.md) | Revenue streams, costs, trader PnL accounting |
| 07 | [Dynamic pricing](07_dynamic_pricing.md) | Funding, spread, and borrow rate formulas |
| 08 | [Bell curve flattening](08_bell_curve_flattening.md) | Cross-market risk mutualization |
| 09 | [Insurance & ADL](09_insurance_adl.md) | Local/global insurance, spend caps, ADL triggers |
| 10 | [Defense hierarchy](10_defense_hierarchy.md) | Complete protection stack and activation sequence |
| 11 | [Full combined objective](11_full_objective.md) | The complete optimization problem |
| 12 | [Worked examples](12_worked_examples.md) | Numerical examples with real values |

---
