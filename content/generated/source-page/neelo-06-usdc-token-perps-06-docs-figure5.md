---
id: "neelo-06-usdc-token-perps-06-docs-figure5"
title: "Figure5"
section: "vision-papers"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure5"]
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/Figure5.md"
---

# Figure5

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure5

## Source Draft

graph TD
  A[Imperial\nsysLev_I ≈ 0.80x] --> C[Capital Efficiency Ratio\nsysLev_V / sysLev_I ≈ 6.22x]
  B[Vibecaps\nsysLev_V = 5x] --> C

  D[USDC vs SIM Risk Premium\nr_I / r_V ≈ 15x] --> E[Risk‑Adjusted Multiplier]

  C --> F[Overall RCE Ratio\n(6.22 × 15 ≈ 93.36)]
  E --> F
