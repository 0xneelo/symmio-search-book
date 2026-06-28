---
id: "section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-3-the-solver-protocol-owned-market-maker"
title: "Section 5: Vibe Trading Architecture: 5.3 The Solver: Protocol-Owned Market Maker"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-3-the-solver-protocol-owned-market-maker"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-05-vibe-architecture"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/05-Vibe-Architecture.md"
headingId: "5-3-the-solver-protocol-owned-market-maker"
---

# Section 5: Vibe Trading Architecture: 5.3 The Solver: Protocol-Owned Market Maker

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-3-the-solver-protocol-owned-market-maker

## Extracted Section Draft

## 5.3 The Solver: Protocol-Owned Market Maker

Central to Vibe's architecture is the **Solver**—an off-chain operator that provides the critical functions impossible to implement purely on-chain.

### 5.3.1 Why a Solver is Required

**Derivatives are computationally complex**:

Unlike spot trading (where x*y=k suffices), perpetual futures require:

| Computation | Description | Complexity |
|-------------|-------------|------------|
| Utilization curves | Dynamic fee pricing | State-dependent |
| Risk parameters | Position limits, margin requirements | Portfolio-dependent |
| Hedging ratios | Protocol exposure management | Market-dependent |
| Liquidation ordering | Which positions to close first | Optimization problem |
| Funding calculations | Interest rate equilibrium | Multi-factor |
| Max win calculations | Payout capacity management | Path-dependent |

**These cannot be reliably computed on-chain**:
- Gas costs prohibitive for complex optimization
- State size limitations
- Timing constraints
- Probabilistic elements

### 5.3.2 Solver Functions

The Solver performs several critical functions:

**1. Residual Counterparty**
When trader flow is imbalanced, the Solver takes the residual position:
```
Net_Trader_Position = Sum(Longs) - Sum(Shorts)
Solver_Position = -Net_Trader_Position
```

**2. Risk Management**
- Monitors aggregate exposure
- Adjusts parameters dynamically
- Manages hedging across venues
- Triggers liquidations as needed

**3. Price Execution**
- Provides quotes for trade execution
- Manages spread based on risk
- Ensures execution quality

**4. Transition Orchestration**
- Monitors market maturity metrics
- Triggers state transitions
- Manages order book activation

### 5.3.3 Solver Economics

The Solver is economically aligned through:

**Revenue**:
- Spread on trades
- Funding payments (when positioned correctly)
- Liquidation bonuses
- Trading profits from market making

**Costs**:
- Adverse selection losses
- Hedging costs
- Infrastructure
- Capital costs

> **TO:DO**: Add detailed Solver economics model with expected returns under various market conditions and maturity states.

---
