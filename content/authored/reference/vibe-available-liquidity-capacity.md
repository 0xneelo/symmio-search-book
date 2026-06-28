---
id: "authored-vibe-available-liquidity-capacity"
title: "Vibe Available Liquidity Capacity"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-oi-liquidity", "vibe-architecture", "symmio-core"]
sourceUrls: ["https://docs.vibe.trading/trading/open-interest-oi-and-available-liquidity.md", "https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["vibe-oi-liquidity", "vibe-simple-trade", "vibe-order-types", "authored-vibe-oi-and-liquidity"]
---

# Vibe Available Liquidity Capacity

Available liquidity is the answer to a different question than open interest.

The official Vibe OI and liquidity guide defines open interest as the total value of active perpetual contracts that remain open. It defines available liquidity as the amount of liquidity solvers are currently offering, and it says Vibe itself does not set those limits.

## Why New Size Can Be Restricted

Open interest tells the reader how much exposure already exists. Available liquidity tells the reader how much additional capacity solvers are currently making available. A market can already have open interest while still having limited room for new trades.

The guide says activity near the available-liquidity limit can restrict new trades until existing positions close or solver capacity changes. That makes capacity a live solver-side condition, not only a static product setting.

## Reader Guidance

When a user asks why they cannot open more size, answer with the capacity model:

- current open interest is active exposure already in the market;
- available liquidity is incremental quotable capacity;
- solver capacity can change with market conditions and risk appetite;
- Vibe's docs should not imply Vibe centrally fixes every market's live limit.

## Sources

- `vibe-oi-liquidity`: official open-interest definition, available-liquidity definition, Vibe limit-setting caveat, and new-trade restriction behavior near capacity.
- `vibe-architecture`: solver quote and intent context.
- `symmio-core`: PartyA/PartyB and collateral vocabulary behind bilateral derivatives positions.

## Related Pages

- `authored-vibe-oi-and-liquidity`
- `authored-vibe-intent-architecture`
- `authored-solver-event-monitoring`
