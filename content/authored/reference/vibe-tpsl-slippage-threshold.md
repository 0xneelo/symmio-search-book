---
id: "authored-vibe-tpsl-slippage-threshold"
title: "Vibe TP/SL Slippage Threshold"
section: "product-reference"
track: "Trading Guides"
status: "published"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-tpsl", "vibe-order-types", "vibe-oi-liquidity"]
sourceUrls: ["https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md", "https://docs.vibe.trading/trading/order-types.md", "https://docs.vibe.trading/trading/open-interest-oi-and-available-liquidity.md"]
relatedGeneratedPages: ["vibe-tpsl", "vibe-order-types", "vibe-oi-liquidity", "authored-vibe-tpsl"]
---

# Vibe TP/SL Slippage Threshold

A take-profit or stop-loss trigger is not a guarantee that the position closes at the exact displayed price.

The official TP/SL guide says TP/SL market orders use a 10% slippage threshold and may not fully execute if price impact exceeds that threshold. That caveat belongs in direct answers to "why did my TP/SL not fully close?" or "why did it execute differently than expected?"

## Trigger Versus Execution

TP/SL defines a closing condition. Once market price reaches the configured level, the closing order can activate. Execution still depends on market impact and available liquidity. The user should understand the difference between:

- the trigger level that activates the close;
- the market order that attempts to close after activation;
- the slippage threshold that can constrain full execution.

## Reader Guidance

Route users here when they expect TP/SL to behave like an exact-price guarantee. For broader setup instructions, route them to the TP/SL overview. For capacity questions, route them to open interest and available liquidity.

## Sources

- `vibe-tpsl`: official TP/SL trigger behavior, input modes, amendment path, full-position default, and 10% slippage threshold.
- `vibe-order-types`: official TP/SL category in the order-type model.
- `vibe-oi-liquidity`: official available-liquidity context for execution capacity.

## Related Pages

- `authored-vibe-tpsl`
- `authored-vibe-order-types`
- `authored-vibe-available-liquidity-capacity`
