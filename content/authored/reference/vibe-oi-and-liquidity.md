---
id: "authored-vibe-oi-and-liquidity"
title: "Vibe Open Interest And Available Liquidity"
section: "product-reference"
track: "Trading Guides"
status: "published"
sourceKeys: ["vibe-oi-liquidity", "vibe-architecture", "symmio-core"]
sourceUrls: ["https://docs.vibe.trading/trading/open-interest-oi-and-available-liquidity.md", "https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["vibe-oi-liquidity", "vibe-simple-trade", "vibe-order-types", "authored-vibe-intent-architecture"]
---

# Vibe Open Interest And Available Liquidity

Open interest and available liquidity are the practical capacity signals a trader sees before or during trading.

The official Vibe guide defines open interest as the total value of active perpetual contracts that remain open. It defines available liquidity as the amount of liquidity solvers are currently offering, and it notes that Vibe itself does not set those limits.

## Why The Two Numbers Differ

Open interest describes active exposure already in the market. Available liquidity describes how much additional capacity solvers are currently making available. A market can have meaningful open interest while still having limited incremental capacity if solver availability contracts.

That is why the guide says activity near the available-liquidity limit can restrict new trades until existing positions close or solver capacity changes.

## Solver Context

Vibe's architecture docs make this a solver-quality issue, not just a dashboard metric. Solver deposits, risk appetite, market conditions, and trading capacity influence what is quotable. Symmio's PartyA/PartyB model gives the protocol vocabulary for why the counterparty side must be able to accept, collateralize, and manage the resulting position.

## Reader Implication

When a trader asks whether a market is liquid enough, the answer should not only show a number. The docs should explain whether current solver capacity can support new exposure and whether high open interest is approaching the available-liquidity boundary.

## Sources

- `vibe-oi-liquidity`: official OI and available-liquidity definitions and capacity caveat.
- `vibe-architecture`: solver quotation context.
- `symmio-core`: PartyA/PartyB and collateral vocabulary.

## Related Pages

- `authored-vibe-intent-architecture`
- `authored-solver-event-monitoring`
- `authored-vibe-simple-trade-flow`
- `vibe-oi-liquidity`
