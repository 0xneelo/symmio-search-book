---
id: "authored-vibe-stop-order-trigger-model"
title: "Vibe Stop Order Trigger Model"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-order-types", "vibe-tpsl", "vibe-simple-trade"]
sourceUrls: ["https://docs.vibe.trading/trading/order-types.md", "https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md", "https://docs.vibe.trading/getting-started/placing-a-simple-trade.md"]
relatedGeneratedPages: ["vibe-order-types", "vibe-tpsl", "vibe-simple-trade", "authored-vibe-order-types"]
---

# Vibe Stop Order Trigger Model

Stop orders combine two ideas: a trigger and an execution type.

The official order-type guide distinguishes stop-market from stop-limit orders. A stop-market order activates when price reaches a stop level and then behaves as a market order. A stop-limit order also activates at the stop level, but its execution is constrained by a limit price.

## The Practical Difference

The word "stop" describes when the order wakes up. The words "market" and "limit" describe how it tries to execute after waking up.

That means:

- stop-market prioritizes execution once triggered;
- stop-limit keeps a price bound after the trigger;
- TP/SL is a related closing-order workflow, but the trader should still understand whether the activated close behaves like market execution or bounded execution.

## Publication Boundary

The current official order-type guide marks Scale and TWAP as coming soon. This page should not describe those advanced types as live workflows unless current product review confirms their status.

## Sources

- `vibe-order-types`: official stop-market, stop-limit, Scale, and TWAP labels.
- `vibe-tpsl`: official closing-order context for TP/SL.
- `vibe-simple-trade`: official trade-ticket context where order type selection matters.

## Related Pages

- `authored-vibe-order-types`
- `authored-vibe-tpsl`
- `authored-vibe-simple-trade-flow`
