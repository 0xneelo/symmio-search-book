---
id: "section-01-perp-classes-zscore-01-docs-02-framework-2-5-the-complete-framework"
title: "Section 2: A Framework for Categorizing Perpetual Protocols: 2.5 The Complete Framework"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-5-the-complete-framework"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-02-framework"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/02-Framework.md"
headingId: "2-5-the-complete-framework"
---

# Section 2: A Framework for Categorizing Perpetual Protocols: 2.5 The Complete Framework

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-5-the-complete-framework

## Extracted Section Draft

## 2.5 The Complete Framework

Combining these dimensions, we can map any perpetual protocol:

```
                    COLLATERALIZATION

           Fully Netted ←————————→ Fully Collateralized
                |                         |
    Sync   [Hyperliquid]              [Impossible*]
      ↑         |                         |
 MATCHING       |                         |
      ↓         |                         |
    Async  [Derp.fun**]               [GMX v1]
                |                         |

    * Synchronous + Fully Collateralized has no efficient implementation
    ** Fails at bootstrap as we will demonstrate
```

**Insurance Topology** adds a third axis:
- Cross-margin systems cluster toward established, netted protocols
- Isolated systems are more common in collateralized protocols

### 2.5.1 The Four Quadrants

**Quadrant 1: Synchronous + Fully Netted**
- Examples: Hyperliquid, Binance, dYdX
- Works: Established markets with two-sided flow
- Fails: Market bootstrap, low-liquidity assets

**Quadrant 2: Synchronous + Fully Collateralized**
- Examples: Rare/theoretical
- Challenge: Order book with full collateralization is capital-prohibitive
- No major protocol operates here

**Quadrant 3: Asynchronous + Fully Netted**
- Examples: Derp.fun, Imperial (attempts)
- Claimed benefit: Capital efficiency + permissionless
- Reality: **Fails catastrophically** (see Section 3)

**Quadrant 4: Asynchronous + Fully Collateralized**
- Examples: GMX v1, Gains Network, Wasabi
- Works: Market bootstrap possible
- Fails: Cannot scale due to capital inefficiency

---
