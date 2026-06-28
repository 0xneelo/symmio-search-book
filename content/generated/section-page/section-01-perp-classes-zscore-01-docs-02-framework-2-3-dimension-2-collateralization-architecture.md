---
id: "section-01-perp-classes-zscore-01-docs-02-framework-2-3-dimension-2-collateralization-architecture"
title: "Section 2: A Framework for Categorizing Perpetual Protocols: 2.3 Dimension 2: Collateralization Architecture"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-3-dimension-2-collateralization-architecture"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-02-framework"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/02-Framework.md"
headingId: "2-3-dimension-2-collateralization-architecture"
---

# Section 2: A Framework for Categorizing Perpetual Protocols: 2.3 Dimension 2: Collateralization Architecture

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-3-dimension-2-collateralization-architecture

## Extracted Section Draft

## 2.3 Dimension 2: Collateralization Architecture

Collateralization determines **who pays winning traders** and how losses are absorbed. This is perhaps the most misunderstood dimension in perpetual protocol design.

### 2.3.1 Fully Netted Systems

**Definition**: In a fully netted system, longs pay shorts directly (and vice versa). There is no external collateral backing the system—all payouts come from other participants.

**Canonical Example**: Hyperliquid, Binance Futures, traditional futures exchanges

**Mechanism**:
1. For every long position, there must be an equal short position
2. When price moves up, longs profit and shorts lose
3. Shorts' losses directly fund longs' profits
4. The exchange is merely a clearinghouse

**Key Property**: **The sum of all profits and losses is always zero** (excluding fees)

```
Long Profit = Short Loss
Short Profit = Long Loss
System Net = 0
```

**Risk Management**:
- Liquidations close positions before losses exceed margin
- Insurance funds cover gaps from fast market moves
- Auto-deleveraging (ADL) as last resort: winning positions are reduced

**Advantages**:
- Extremely capital efficient
- Both sides can have high leverage
- Low fees possible (no LP risk premium)
- Proven model at scale

**Disadvantages**:
- Requires balanced flow (longs ≈ shorts)
- ADL risk in extreme conditions
- Cannot function with one-sided interest
- **Fundamentally incompatible with market bootstrap**

### 2.3.2 Fully Collateralized Systems

**Definition**: In a fully collateralized system, all potential payouts are backed by actual assets held in the protocol. An LP or vault provides the capital to pay winning traders.

**Canonical Example**: GMX v1, Gains Network, traditional options markets

**Mechanism**:
1. LPs deposit assets into a vault
2. Traders trade against the vault
3. Trader wins = Vault pays out
4. Trader loses = Vault receives payment
5. The vault's capital backs all open positions

**Key Property**: **Maximum possible payout is always collateralized**

```
If trader can win $X, vault must hold ≥ $X
Maximum System Loss = Vault Capital
```

**Risk Management**:
- Open interest caps based on vault size
- Maximum win limits per position
- Dynamic fees based on utilization
- LP risk pricing into spreads

**Advantages**:
- Can serve one-sided flow
- Deterministic payout capability
- Can bootstrap new markets
- No ADL risk for traders

**Disadvantages**:
- Capital inefficient (1:1 or worse collateralization)
- LPs take directional risk
- Higher fees to compensate LPs
- Limited leverage on LP side

### 2.3.3 The Collateralization Spectrum

```
FULLY NETTED                                    FULLY COLLATERALIZED
      |                                                  |
      v                                                  v
[Zero Collateral] --- [Partial] --- [Full Collateral]
  Pure P2P            Insurance        LP Vault
  Hyperliquid         Fund Backed      GMX v1
```

**Key Insight**: Netted systems are efficient but require two-sided flow. Collateralized systems can handle one-sided flow but at significant capital cost. **No existing protocol dynamically moves between these states.**

---
