---
id: "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-6-position-lifecycle"
title: "Section 6: Technical Deep Dive: 6.6 Position Lifecycle"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-6-position-lifecycle"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/06-Technical-Deep-Dive.md"
headingId: "6-6-position-lifecycle"
---

# Section 6: Technical Deep Dive: 6.6 Position Lifecycle

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-6-position-lifecycle

## Extracted Section Draft

## 6.6 Position Lifecycle

### 6.6.1 Opening a Position

```
User Request: Open 10 ETH long with 100 USDC margin

1. VALIDATION
   - Check margin ≥ initial_margin_required(size, leverage)
   - Check position size ≤ max_position_size(market)
   - Check OI headroom exists

2. QUOTE
   - Solver generates execution price
   - Entry_Price = Oracle + Spread

3. EXECUTION
   - User signs transaction
   - Margin transferred to vault
   - Position created on-chain

4. SOLVER UPDATE
   - Solver position updated
   - Z-Score recalculated
   - Risk parameters adjusted if needed
```

### 6.6.2 Managing a Position

```
Ongoing Position Management:

MARGIN OPERATIONS:
- Add margin: increase collateral, lower liquidation price
- Remove margin: if above initial margin, withdrawal allowed

PnL TRACKING:
- Unrealized PnL = Position_Size × (Current_Price - Entry_Price)
- Effective_Margin = Deposited_Margin + Unrealized_PnL - Fees_Accrued

FUNDING PAYMENTS:
- Applied every funding interval
- Deducted from/added to margin
```

### 6.6.3 Closing a Position

```
Close Request: Close 10 ETH long position

1. QUOTE
   - Exit_Price = Oracle - Spread (selling)

2. PNL CALCULATION
   - Realized_PnL = Size × (Exit_Price - Entry_Price)
   - Total_Fees = Entry_Fee + Exit_Fee + Accrued_Funding
   - Net_PnL = Realized_PnL - Total_Fees

3. SETTLEMENT
   - If Net_PnL > 0: User receives margin + PnL
   - If Net_PnL < 0: User receives margin - |PnL|
   - If margin insufficient: liquidation (shouldn't reach close)

4. SOLVER UPDATE
   - Solver position closes
   - Vault capital freed
```

---
