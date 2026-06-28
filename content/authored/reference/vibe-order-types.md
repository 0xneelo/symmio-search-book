---
id: "authored-vibe-order-types"
title: "Vibe Order Types"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
sourceKeys: ["vibe-order-types", "vibe-tpsl", "vibe-simple-trade"]
sourceUrls: ["https://docs.vibe.trading/trading/order-types.md", "https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md", "https://docs.vibe.trading/getting-started/placing-a-simple-trade.md"]
relatedGeneratedPages: ["vibe-order-types", "symmio-market-limit-orders", "vibe-tpsl", "vibe-simple-trade"]
---

# Vibe Order Types

Vibe's current order-type guide separates execution timing from exit automation.

Market orders are for immediate execution at the current market price. Limit orders are for execution at the selected limit price or better. TP/SL orders are closing instructions that activate when a specified profit or loss condition is reached.

## Triggered Orders

The same guide also documents stop-market and stop-limit behavior. A stop-market order activates when price reaches a stop level and then behaves as a market order. A stop-limit order activates at the stop level but constrains execution to a preset limit price.

Those distinctions matter because "stop" describes the trigger, while "market" or "limit" describes how the order executes after the trigger.

## Pending Advanced Types

Scale and TWAP are marked as coming soon in the current official guide. Scale is described as multiple limit orders across a range, with possible even or skewed distribution. TWAP is described as a larger order split into smaller time-based suborders with a stated maximum slippage rule.

Until those types are live and confirmed, final docs should label them as planned or coming soon rather than presenting them as active workflows.

## Reader Implication

Order-type docs should help traders choose the execution primitive:

- Use Market when immediacy matters most.
- Use Limit when the entry or exit price matters most.
- Use Stop Market when the trigger level matters and execution certainty matters more than price control.
- Use Stop Limit when both trigger level and price bounds matter.
- Treat Scale and TWAP as planned advanced workflows unless current product state confirms they are live.

## Sources

- `vibe-order-types`: official order-type list and coming-soon labels.
- `vibe-tpsl`: TP/SL closing-order behavior.
- `vibe-simple-trade`: where Market and Limit appear in the simple trade flow.

## Related Pages

- `authored-vibe-simple-trade-flow`
- `authored-vibe-tpsl`
- `authored-vibe-trade-flow`
- `symmio-market-limit-orders`
