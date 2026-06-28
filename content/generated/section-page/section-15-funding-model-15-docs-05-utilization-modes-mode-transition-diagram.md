---
id: "section-15-funding-model-15-docs-05-utilization-modes-mode-transition-diagram"
title: "05. Utilization Modes: Token Inventory vs Insurance Fund: Mode Transition Diagram"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-transition-diagram"]
parentPageId: "neelo-15-funding-model-15-docs-05-utilization-modes"
sourcePath: "Docs/public/15_funding_model/15_docs/05_utilization_modes.md"
headingId: "mode-transition-diagram"
---

# 05. Utilization Modes: Token Inventory vs Insurance Fund: Mode Transition Diagram

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-transition-diagram

## Extracted Section Draft

## Mode Transition Diagram

```
                                    E_usd increases
                                         │
                                         ▼
┌──────────────────┐    u₁ > 100%    ┌──────────────────┐
│  TOKEN INVENTORY │ ───────────────▶ │  INSURANCE FUND  │
│      MODE        │                  │      MODE        │
│                  │                  │                  │
│  u = u₁         │                  │  u = max(u₁, u₂) │
│  Normal pricing │                  │  Aggressive      │
│  based on tokens │ ◀─────────────── │  pricing + ADL   │
└──────────────────┘    u₁ < 100%    └──────────────────┘
                      E reduced via
                      hedging/ADL
```

---
