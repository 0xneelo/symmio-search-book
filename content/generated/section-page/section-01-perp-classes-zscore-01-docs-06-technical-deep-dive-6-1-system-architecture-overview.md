---
id: "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-1-system-architecture-overview"
title: "Section 6: Technical Deep Dive: 6.1 System Architecture Overview"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-1-system-architecture-overview"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/06-Technical-Deep-Dive.md"
headingId: "6-1-system-architecture-overview"
---

# Section 6: Technical Deep Dive: 6.1 System Architecture Overview

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-1-system-architecture-overview

## Extracted Section Draft

## 6.1 System Architecture Overview

Vibe Trading operates as a multi-layer system combining on-chain settlement with off-chain computation. This hybrid approach balances the trustlessness of blockchain with the computational power needed for complex derivatives operations.

### 6.1.1 Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│         Trading Interface / API / Integrations           │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   SOLVER LAYER                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ Quote Engine │ │ Risk Engine  │ │ Match Engine │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │  Liquidation │ │   Hedging    │ │  Graduation  │    │
│  │   Engine     │ │   Engine     │ │   Engine     │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 SETTLEMENT LAYER                         │
│         Smart Contracts / On-chain State                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │   Vaults     │ │  Positions   │ │  Insurance   │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   ORACLE LAYER                           │
│          Price Feeds / External Data                     │
└─────────────────────────────────────────────────────────┘
```

---
