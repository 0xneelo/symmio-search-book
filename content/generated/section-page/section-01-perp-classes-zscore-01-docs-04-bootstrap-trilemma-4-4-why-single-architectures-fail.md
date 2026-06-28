---
id: "section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-4-why-single-architectures-fail"
title: "Section 4: The Bootstrap Trilemma: 4.4 Why Single Architectures Fail"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-4-why-single-architectures-fail"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/04-Bootstrap-Trilemma.md"
headingId: "4-4-why-single-architectures-fail"
---

# Section 4: The Bootstrap Trilemma: 4.4 Why Single Architectures Fail

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-4-why-single-architectures-fail

## Extracted Section Draft

## 4.4 Why Single Architectures Fail

### 4.4.1 Attempting All Three with Netted Architecture

**Approach**: Use fully netted accounting (for capital efficiency) with asynchronous execution (for permissionless listing).

**Why Reliable Counterparty Fails**:
```
Netted means: Long Profit = Short Loss
Async means: Long can exist before Short
Combined: Long profits with no Short = ???
```

The profit cannot be paid. The counterparty doesn't exist.

**Mathematical Proof**:
```
Let L(t) = Long open interest at time t
Let S(t) = Short open interest at time t
Let P(t) = Price at time t
Let PnL_L = L(t) × (P(t) - P(0)) = Long profit
Let PnL_S = S(t) × (P(0) - P(t)) = Short profit

In a netted system: Payout_L = -PnL_S

If S(t) = 0 (bootstrap scenario):
    Payout_L = 0, regardless of price movement

Trader cannot be paid → Reliable Counterparty FAILS
```

### 4.4.2 Attempting All Three with Collateralized Architecture

**Approach**: Use full collateralization (for reliable counterparty) with permissionless listing.

**Why Capital Efficiency Fails**:
```
Collateralized means: Max_Payout ≤ Collateral
Max_Payout = OI × Max_Leverage × Max_Price_Move
```

**Example Calculation**:
```
Desired OI: $10M
Trader Leverage: 20x
Max Price Move (before liquidation): 50%
Max Payout: $10M × 0.5 = $5M

Required Collateral: ≥ $5M
LP Capital Efficiency: $10M OI / $5M collateral = 2x

Compare to Hyperliquid:
No collateral required → Infinite capital efficiency
```

For LPs to earn competitive returns at 2x capital efficiency, fees must be **dramatically higher** than netted systems.

**Numerical Example**:
```
GMX-style Protocol:
- LP deposits $10M
- Supports $20M OI
- Annual fees: 0.1% × 2 sides × $20M × 365 turns = ~$14.6M
- LP gross return: ~146% APR (before losses)
- After trader edge + adverse selection: Maybe 20% APR?

Hyperliquid-style Protocol:
- HLP deposits $10M
- Supports unlimited OI (netted)
- Market making profits on spread
- No directional exposure
- Target: 10-30% APR with much lower risk
```

The collateralized protocol must charge **much higher fees** to attract LPs.

### 4.4.3 Attempting All Three with Synchronous Architecture

**Approach**: Use order book matching with some form of LP backstop for empty markets.

**Why Permissionless Listing Fails**:
```
Order book requires: Bid AND Ask present simultaneously
New market has: Neither
LP backstop would require: Full collateralization (see 4.4.2)
```

You cannot make an order book work without participants on both sides. Any mechanism to provide those participants requires capital, bringing you back to the capital efficiency problem.

---
