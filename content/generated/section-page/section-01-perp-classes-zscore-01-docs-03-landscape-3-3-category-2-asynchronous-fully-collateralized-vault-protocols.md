---
id: "section-01-perp-classes-zscore-01-docs-03-landscape-3-3-category-2-asynchronous-fully-collateralized-vault-protocols"
title: "Section 3: The Landscape of Existing Protocols: 3.3 Category 2: Asynchronous + Fully Collateralized (Vault Protocols)"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-3-category-2-asynchronous-fully-collateralized-vault-protocols"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-03-landscape"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/03-Landscape.md"
headingId: "3-3-category-2-asynchronous-fully-collateralized-vault-protocols"
---

# Section 3: The Landscape of Existing Protocols: 3.3 Category 2: Asynchronous + Fully Collateralized (Vault Protocols)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-3-category-2-asynchronous-fully-collateralized-vault-protocols

## Extracted Section Draft

## 3.3 Category 2: Asynchronous + Fully Collateralized (Vault Protocols)

### 3.3.1 Architecture Overview

Vault protocols enable trading against a collateral pool rather than other traders. Key characteristics:

- **Liquidity vault** holds assets to pay winners
- **Oracle-based pricing** (no order book)
- **Traders vs. vault** rather than traders vs. traders
- **LP risk** in exchange for fees

### 3.3.2 GMX v1: The Pioneer

**Architecture**:
- GLP vault holds basket of assets (ETH, BTC, stablecoins)
- Traders trade against GLP
- Oracle provides execution price
- Vault profits when traders lose, loses when traders win

**Mechanism Deep Dive**:

*For Long Positions*:
1. Trader deposits USDC as margin
2. Trader opens long ETH position
3. If ETH price rises: Vault pays profit in ETH
4. If ETH price falls: Trader's margin covers loss

The vault is essentially writing perpetual contracts to traders, fully collateralizing each position.

*Capital Requirements*:
```
If open interest = $100M long ETH
And max profit potential = 900% (10x leverage, 90% price increase)
Then vault must hold ≥ $900M in ETH
```

This is why GMX has **open interest caps** and **position size limits**.

**Why GMX Works for Bootstrap**:

Unlike order books, GMX can serve one-sided flow:
1. Only longs exist → vault takes the short side
2. Only shorts exist → vault takes the long side
3. No matching required → instant execution
4. Liquidity always available → markets always tradeable

**Why GMX Doesn't Scale**:

The same properties that enable bootstrap create scaling problems:

| Factor | Consequence |
|--------|-------------|
| Full collateralization | Massive capital requirements |
| LP directional risk | High fees to compensate |
| Oracle dependency | No true price discovery |
| Vault capacity limits | OI caps on all markets |

**Fee Structure Reflection**:
GMX fees (entry/exit + funding) reflect the LP risk premium. Traders pay more because LPs are taking counterparty risk.

> **TO:DO**: Include specific fee comparison data between GMX and Hyperliquid showing the cost difference for equivalent trades.

### 3.3.3 Gains Network (gTrade)

**Architecture**:
- Similar vault model to GMX
- gDAI vault provides collateral
- Synthetic positions (no physical underlying)
- Unique NFT-based market maker incentives

**Innovation**:
Gains introduced several optimizations:
- Smaller position collateral requirements
- Dynamic spread based on market conditions
- Decentralized keeper network

**Same Fundamental Limitations**:
Despite innovations, Gains faces the same constraints:
- Capital inefficiency
- LP risk premium in fees
- Scaling limitations

### 3.3.4 Wasabi Protocol

**Architecture**:
- Margin trading against liquidity pools
- Fully collateralized positions
- Focus on "exotic" assets

**Relevance**:
Wasabi demonstrates that the async + collateralized model can support any asset—the question is whether it can do so efficiently enough to matter.

### 3.3.5 Summary: Vault Protocol Limitations

| Strength | Limitation |
|----------|------------|
| Can bootstrap markets | Capital inefficient |
| Permissionless listing possible | High fees |
| No ADL risk | LP risk deters capital |
| Oracle-based (simple) | No price discovery |

**Conclusion**: Vault protocols solve bootstrap but cannot compete with order books on efficiency. They occupy a niche rather than becoming the dominant model.

---
