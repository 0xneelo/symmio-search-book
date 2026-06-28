---
id: "section-01-perp-classes-zscore-01-docs-02-framework-2-2-dimension-1-matching-engine-architecture"
title: "Section 2: A Framework for Categorizing Perpetual Protocols: 2.2 Dimension 1: Matching Engine Architecture"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-2-dimension-1-matching-engine-architecture"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-02-framework"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/02-Framework.md"
headingId: "2-2-dimension-1-matching-engine-architecture"
---

# Section 2: A Framework for Categorizing Perpetual Protocols: 2.2 Dimension 1: Matching Engine Architecture

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-2-dimension-1-matching-engine-architecture

## Extracted Section Draft

## 2.2 Dimension 1: Matching Engine Architecture

The matching engine determines **how and when** trades are executed. This is the most fundamental architectural decision in any trading system.

### 2.2.1 Synchronous Matching

**Definition**: A synchronous matching engine requires both counterparties to be present simultaneously. A trade only executes when a buyer is matched with a seller in real-time.

**Canonical Example**: Order books (Hyperliquid, Binance, traditional exchanges)

**Mechanism**:
1. Traders submit limit orders (bids and asks)
2. Orders rest in the book until matched
3. When a bid price meets an ask price, execution occurs
4. Both parties are immediately committed

**Characteristics**:
- Requires liquidity on both sides
- Price discovery through order flow
- Can achieve tight spreads with sufficient volume
- Market makers essential for function
- **Cannot operate without participants on both sides**

**Advantages**:
- Capital efficient (no collateral pools needed)
- True price discovery
- Familiar to traders
- Well-understood risk models

**Disadvantages**:
- Requires existing liquidity to function
- Cold start problem for new markets
- Dependent on market maker participation
- Cannot serve low-liquidity assets

### 2.2.2 Asynchronous Matching

**Definition**: An asynchronous matching engine allows trades to execute against a persistent counterparty (protocol, AMM, or solver) without requiring immediate matching with another trader.

**Canonical Example**: Automated Market Makers (Uniswap for spot; GMX for perps)

**Mechanism**:
1. A liquidity pool or solver provides persistent counterparty
2. Traders execute against this counterparty at any time
3. No need for simultaneous buyer and seller
4. The counterparty absorbs directional flow

**Characteristics**:
- Can operate with one-sided flow
- Counterparty takes directional risk
- Pricing often oracle-based
- Spreads reflect counterparty risk premium
- **Can serve markets with minimal activity**

**Advantages**:
- Can bootstrap new markets
- 24/7 availability regardless of activity
- No dependency on market makers
- Permissionless listing possible

**Disadvantages**:
- Counterparty must be capitalized
- Typically wider spreads
- May have worse execution for large orders
- Requires careful risk management

### 2.2.3 The Spectrum

In practice, matching engines exist on a spectrum:

```
FULLY SYNCHRONOUS                              FULLY ASYNCHRONOUS
       |                                              |
       v                                              v
[Pure Order Book] --- [Hybrid Systems] --- [Pure AMM/Solver]
   Hyperliquid         Intent-based            GMX v1
   Binance              Systems              Uniswap
```

**Key Insight**: The matching engine architecture fundamentally determines what markets the protocol can serve. Synchronous systems require demand; asynchronous systems can create supply.

---
