---
id: "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-3-solver-layer-off-chain"
title: "Section 6: Technical Deep Dive: 6.3 Solver Layer (Off-Chain)"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-3-solver-layer-off-chain"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/06-Technical-Deep-Dive.md"
headingId: "6-3-solver-layer-off-chain"
---

# Section 6: Technical Deep Dive: 6.3 Solver Layer (Off-Chain)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-3-solver-layer-off-chain

## Extracted Section Draft

## 6.3 Solver Layer (Off-Chain)

### 6.3.1 Quote Engine

The Quote Engine generates prices for trade execution:

**Inputs**:
- Oracle price feed
- Current inventory (Solver position)
- Market volatility
- Utilization rate
- Z-Score (market maturity)

**Pricing Model**:
```
Quote_Price = Oracle_Price × (1 + Spread)

Where:
Spread = Base_Spread + Inventory_Adjustment + Volatility_Premium

Base_Spread: Market-specific minimum
Inventory_Adjustment: Widens when Solver is overexposed
Volatility_Premium: Widens in volatile conditions
```

**Dynamic Spread Based on Z-Score**:
```
Z-Score    | Spread Multiplier | Rationale
-----------+-------------------+------------------
> 0.8      | 3.0x              | High Solver risk
0.5 - 0.8  | 2.0x              | Moderate risk
0.2 - 0.5  | 1.5x              | Lower risk
< 0.2      | 1.0x              | Minimal risk
```

### 6.3.2 Risk Engine

The Risk Engine manages protocol exposure:

**Position Limits**:
```
Max_Position_Size = f(
    vault_capacity,
    market_liquidity,
    volatility,
    z_score,
    current_exposure
)
```

**Margin Requirements**:
```
Initial_Margin = Notional × Initial_Margin_Rate
Maintenance_Margin = Notional × Maintenance_Margin_Rate

Where margin rates vary by:
- Asset volatility class
- Position size (larger = higher margin)
- Market maturity (Z-Score)
- Account risk score
```

**Real-time Monitoring**:
```
For each position:
  current_margin = deposited_margin + unrealized_pnl
  margin_ratio = current_margin / maintenance_margin

  if margin_ratio < 1.0:
    trigger_liquidation(position)
```

### 6.3.3 Match Engine

As markets mature, the Match Engine enables trader-to-trader matching:

**Matching Logic**:
```
For incoming order O:
  1. Check if natural counterparty exists
     - Scan pending intents on opposite side
     - If match found: execute peer-to-peer

  2. If no natural match:
     - Execute against Solver
     - Solver takes residual position

  3. Settlement:
     - Submit matched trade to chain
     - Update positions atomically
```

**Matching Priority**:
```
1. Price improvement (better than Solver quote)
2. Time priority (FIFO among equals)
3. Size optimization (minimize partial fills)
```

### 6.3.4 Liquidation Engine

**Liquidation Detection**:
```python
def check_liquidations():
    for position in all_positions:
        margin_ratio = position.margin / position.maintenance_requirement
        if margin_ratio < LIQUIDATION_THRESHOLD:
            queue_liquidation(position)
```

**Liquidation Execution**:
```
Liquidation Process:
1. Position identified as undercollateralized
2. Liquidation order created (opposite side)
3. Order executed against:
   a. Order book (if mature market)
   b. Solver (guaranteed fill)
   c. ADL (extreme cases)
4. Remaining margin distributed:
   - Penalty to insurance fund
   - Remainder to position holder
```

**Cascading Prevention**:
```
Safety Mechanisms:
- Incremental liquidations (partial close)
- Liquidation delays during extreme volatility
- Insurance fund injection before ADL
- Circuit breakers for market-wide events
```

### 6.3.5 Hedging Engine

The Solver manages its exposure through external hedging:

**Hedging Strategy**:
```
Net_Solver_Position = -Sum(All_Trader_Positions)

If Net_Solver_Position exceeds threshold:
  1. Identify hedging venues (CEX perps, other DEXs)
  2. Calculate optimal hedge
  3. Execute hedge trades
  4. Monitor and rebalance
```

**Hedging Considerations**:
- Cost of hedging vs. cost of exposure
- Liquidity on hedging venues
- Correlation assumptions
- Basis risk

> **TO:DO**: Detail specific hedging strategies, venue selection criteria, and rebalancing algorithms.

### 6.3.6 Graduation Engine

Monitors markets for order book readiness:

**Graduation Criteria Check**:
```python
def check_graduation_ready(market):
    metrics = get_market_metrics(market)

    criteria = {
        'z_score': metrics.z_score < 0.1,
        'daily_volume': metrics.daily_volume > MIN_VOLUME,
        'unique_traders': metrics.weekly_traders > MIN_TRADERS,
        'age': metrics.days_active > MIN_DAYS,
        'liquidation_rate': metrics.liq_rate < MAX_LIQ_RATE,
    }

    return all(criteria.values())
```

**Graduation Process**:
```
1. Market passes criteria for N consecutive days
2. Graduation proposal created
3. Order book initialized
4. Solver begins market making in book
5. AMM execution deprecated (book priority)
6. Transition period (both active)
7. AMM becomes backstop only
```

---
