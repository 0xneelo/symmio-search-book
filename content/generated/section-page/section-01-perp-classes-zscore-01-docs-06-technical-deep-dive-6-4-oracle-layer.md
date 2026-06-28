---
id: "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-4-oracle-layer"
title: "Section 6: Technical Deep Dive: 6.4 Oracle Layer"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-4-oracle-layer"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/06-Technical-Deep-Dive.md"
headingId: "6-4-oracle-layer"
---

# Section 6: Technical Deep Dive: 6.4 Oracle Layer

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-4-oracle-layer

## Extracted Section Draft

## 6.4 Oracle Layer

### 6.4.1 Price Feed Requirements

Vibe requires robust price feeds for:
- Trade execution pricing
- Margin calculations
- Liquidation triggers
- Funding rate anchoring

**Oracle Properties Required**:
| Property | Requirement | Rationale |
|----------|-------------|-----------|
| Freshness | < 1 second stale | Avoid stale price exploitation |
| Accuracy | ±0.1% vs true price | Fair execution |
| Manipulation resistance | Multi-source | No single point of failure |
| Availability | 99.9%+ uptime | Markets can't pause |

### 6.4.2 Multi-Oracle Architecture

```
┌──────────────────────────────────────────┐
│              ORACLE AGGREGATOR           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Pyth     │ │Chainlink │ │ Redstone │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│         ↓           ↓           ↓        │
│    ┌────────────────────────────────┐    │
│    │     Median/Validation Logic    │    │
│    └────────────────────────────────┘    │
│                    ↓                     │
│            Validated Price               │
└──────────────────────────────────────────┘
```

### 6.4.3 Bootstrap Market Oracles

For new tokens without established oracle feeds:

**DEX Price Derivation**:
```
For token with no Pyth/Chainlink feed:
1. Query DEX pools (Raydium, Orca, etc.)
2. Apply TWAP smoothing
3. Validate liquidity depth
4. Apply confidence bounds

Price = DEX_TWAP if liquidity > MIN_DEPTH else REJECT
```

**Oracle Risk Tiers**:
| Tier | Oracle Source | Max Leverage | OI Limit |
|------|---------------|--------------|----------|
| 1 | Pyth + Chainlink | 50x | High |
| 2 | Pyth only | 20x | Medium |
| 3 | DEX-derived | 10x | Low |
| 4 | Single source | 5x | Very Low |

---
