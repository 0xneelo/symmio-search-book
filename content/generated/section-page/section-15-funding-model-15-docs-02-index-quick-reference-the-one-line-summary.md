---
id: "section-15-funding-model-15-docs-02-index-quick-reference-the-one-line-summary"
title: "Vibe Perpetual Market - Full Mathematical Derivation: Quick Reference: The One-Line Summary"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#quick-reference-the-one-line-summary"]
parentPageId: "neelo-15-funding-model-15-docs-02-index"
sourcePath: "Docs/public/15_funding_model/15_docs/02_index.md"
headingId: "quick-reference-the-one-line-summary"
---

# Vibe Perpetual Market - Full Mathematical Derivation: Quick Reference: The One-Line Summary

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#quick-reference-the-one-line-summary

## Extracted Section Draft

## Quick Reference: The One-Line Summary

**System Objective:**

```
max  Σ_m Π'_m  −  λ Σ_m R_m  −  Σ_m C_adl(a_m)
```

Where:
- `Π'_m` = flattened per-market profit (after cross-market insurance transfer)
- `R_m` = local risk score (utilization, skew, exposure, volatility)
- `C_adl(a_m)` = ADL penalty (UX cost of forced deleveraging)
- `λ` = risk aversion parameter

**The Core Invariant:**

> Liquidations are inventory reallocations, not loss events. No trader loss event requires selling the base token into the spot market.

---
