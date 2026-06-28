---
id: "authored-vibe-tpsl"
title: "Vibe Take Profit And Stop Loss"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
sourceKeys: ["vibe-tpsl", "vibe-order-types", "vibe-simple-trade"]
sourceUrls: ["https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md", "https://docs.vibe.trading/trading/order-types.md", "https://docs.vibe.trading/getting-started/placing-a-simple-trade.md"]
relatedGeneratedPages: ["vibe-tpsl", "vibe-order-types", "vibe-simple-trade", "vibe-account-portfolio"]
---

# Vibe Take Profit And Stop Loss

TP/SL is the trader's automated exit layer. The official guide describes TP/SL orders as closing instructions that trigger from market price when a predefined profit or loss level is reached.

The key distinction is that TP/SL does not describe why the position was opened. It describes the condition under which the position should be closed.

## Setting TP/SL

The guide supports several input modes: exact price, dollar profit or loss, percentage movement from entry, or chart interaction through the TradingView chart. A trader can also adjust TP/SL on open positions or pending orders by opening the TP/SL modal from the panel below the chart.

By default, TP/SL orders are described as aiming to close the full position when triggered. The docs should make that default explicit before introducing any future partial-position behavior.

## Slippage Caveat

The official TP/SL page states that TP/SL market orders have a 10% slippage threshold and may not fully execute if price impact exceeds that threshold. That belongs near every TP/SL explanation because it prevents readers from treating TP/SL as a guaranteed fill at an exact displayed price.

## Reader Implication

A good TP/SL answer should say three things: what triggers the close, how the trader can set or amend the levels, and why the execution can still be constrained by market impact. For risk education, route the reader from TP/SL to margin, liquidation, and available liquidity.

## Sources

- `vibe-tpsl`: official TP/SL trigger, input modes, amendment path, full-position default, and slippage threshold.
- `vibe-order-types`: TP/SL category in the order-type model.
- `vibe-simple-trade`: TP/SL option inside the simple trade ticket.

## Related Pages

- `authored-vibe-order-types`
- `authored-vibe-simple-trade-flow`
- `authored-vibe-oi-and-liquidity`
- `authored-vibe-collateral-and-margining`
