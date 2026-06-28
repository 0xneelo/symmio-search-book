---
id: "authored-vibe-hotkey-execution-guardrails"
title: "Vibe Hotkey Execution Guardrails"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-hotkeys", "vibe-simple-trade", "vibe-order-types"]
sourceUrls: ["https://docs.vibe.trading/trading/hot-keys.md", "https://docs.vibe.trading/getting-started/placing-a-simple-trade.md", "https://docs.vibe.trading/trading/order-types.md"]
relatedGeneratedPages: ["vibe-hotkeys", "vibe-simple-trade", "vibe-order-types", "authored-vibe-hotkeys"]
---

# Vibe Hotkey Execution Guardrails

Hotkeys accelerate the Vibe interface. They do not create a separate execution model.

The official hotkey page lists shortcuts for order-type selection, amount and price focus, token picker opening, long and short direction, trade placement, leverage modal opening, orderbook visibility, deposit flow, and TP/SL controls.

## Shortcut Does Not Change Semantics

A keyboard shortcut can move the user faster through the same ticket. The resulting trade still follows the selected order type, amount, direction, leverage, margin, fee, funding, liquidity, and TP/SL rules.

That distinction matters for support. If a user asks why a hotkey-selected order behaved a certain way, the answer should identify the shortcut as the UI input and then route to the relevant execution page.

## Sources

- `vibe-hotkeys`: official shortcut categories.
- `vibe-simple-trade`: official trade-ticket sequence.
- `vibe-order-types`: official execution semantics for order modes.

## Related Pages

- `authored-vibe-hotkeys`
- `authored-vibe-simple-trade-flow`
- `authored-vibe-order-types`
