---
id: "neelo-06-usdc-token-perps-06-docs-figure4"
title: "Figure4"
section: "vision-papers"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure4"]
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/Figure4.md"
---

# Figure4

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure4

## Source Draft

graph LR
  subgraph Imperial
    I1[USDC LP Deposit L = 1,000,000] --> I2[Total Structural Capital\nK_I = L + 0.04·Q]
    I3[Gross OI Q = 830,000] --> I4[sysLev_I = Q / K_I ≈ 0.80x]
    I2 --> I4
  end

  subgraph Vibecaps
    V1[SIM Inventory T] --> V2[Structural Capital\nK_V = T]
    V3[Gross OI Q_V = λ·T] --> V4[sysLev_V = Q_V / K_V = λ]
    V2 --> V4
  end
