---
id: "authored-vibe-simple-trade-flow"
title: "Vibe Simple Trade Flow"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
sourceKeys: ["vibe-simple-trade", "vibe-order-types", "vibe-tpsl", "vibe-architecture"]
sourceUrls: ["https://docs.vibe.trading/getting-started/placing-a-simple-trade.md", "https://docs.vibe.trading/trading/order-types.md", "https://docs.vibe.trading/trading/take-profit-stop-loss-tp-sl.md", "https://docs.vibe.trading/architectural-overview.md"]
relatedGeneratedPages: ["vibe-simple-trade", "vibe-order-types", "vibe-tpsl", "authored-vibe-trade-flow"]
---

# Vibe Simple Trade Flow

The practical trade flow starts after account setup and funding. A trader chooses a market, decides whether the position is long or short, chooses immediate execution or a future entry price, allocates USDC to the trade, and optionally attaches take-profit or stop-loss instructions before submitting.

The official simple-trade guide describes the visible sequence: pick the asset from the token list, perform any chart analysis, choose an entry and exit plan, select Market for immediate execution or Limit for a specified price, enter the USDC amount, optionally enable TP/SL, then choose Long or Short.

## Product Semantics

The UI flow should be documented as a controlled expression of intent, not as a traditional order-book ticket. The user declares the desired market, direction, size, entry style, and exit guardrails. Vibe's architecture layer then routes that intent through solver quotation and execution paths.

Market and limit choices belong in the core trade ticket because they decide when the trader wants the position opened. TP/SL belongs beside the ticket because it defines how the trader wants the position closed if profit or loss thresholds are reached.

## Reader Implication

When a new trader asks how to place a trade, the docs should answer in the language of the ticket: market, direction, amount, entry type, and optional exits. When a more technical reader asks what happens behind that ticket, route them to the intent architecture and Symmio lifecycle pages.

## Sources

- `vibe-simple-trade`: official simple-trade sequence and keyboard-control references.
- `vibe-order-types`: supported order categories and pending advanced types.
- `vibe-tpsl`: TP/SL trigger and amendment behavior.
- `vibe-architecture`: intent-based solver quotation and execution context.

## Related Pages

- `authored-vibe-trade-flow`
- `authored-vibe-order-types`
- `authored-vibe-tpsl`
- `authored-vibe-intent-architecture`
