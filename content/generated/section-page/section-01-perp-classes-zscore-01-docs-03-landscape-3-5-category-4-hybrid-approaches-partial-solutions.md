---
id: "section-01-perp-classes-zscore-01-docs-03-landscape-3-5-category-4-hybrid-approaches-partial-solutions"
title: "Section 3: The Landscape of Existing Protocols: 3.5 Category 4: Hybrid Approaches (Partial Solutions)"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-5-category-4-hybrid-approaches-partial-solutions"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-03-landscape"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/03-Landscape.md"
headingId: "3-5-category-4-hybrid-approaches-partial-solutions"
---

# Section 3: The Landscape of Existing Protocols: 3.5 Category 4: Hybrid Approaches (Partial Solutions)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-5-category-4-hybrid-approaches-partial-solutions

## Extracted Section Draft

## 3.5 Category 4: Hybrid Approaches (Partial Solutions)

### 3.5.1 Virtual AMMs (Perpetual Protocol v1)

**Concept**:
Use an AMM formula (like Uniswap's x*y=k) to price perpetual positions.

**Problems**:
- AMM formulas designed for spot, not derivatives
- No connection between AMM state and actual market conditions
- Funding rate mechanisms awkward to implement
- Manipulable through AMM dynamics

**Status**: Mostly abandoned approach

### 3.5.2 Intent-Based Systems

**Concept**:
Traders express "intents" (desired trades), and solvers compete to fill them.

**For Perpetuals**:
This creates an interesting middle ground:
- Asynchronous (intents can wait)
- Potentially netted (solver can batch)
- But solver must have capital to fill imbalances

**Current State**: Emerging category, not yet proven for perpetuals

> **TO:DO**: Add analysis of any specific intent-based perpetual implementations if they've launched by the time of publication.

---
