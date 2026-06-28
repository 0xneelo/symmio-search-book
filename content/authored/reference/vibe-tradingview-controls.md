---
id: "authored-vibe-tradingview-controls"
title: "Vibe TradingView Controls"
section: "product-reference"
track: "Trading Guides"
status: "publication-candidate"
sourceKeys: ["vibe-tradingview-control", "vibe-simple-trade"]
sourceUrls: ["https://docs.vibe.trading/trading/tradingview-control.md", "https://docs.vibe.trading/getting-started/placing-a-simple-trade.md"]
relatedGeneratedPages: ["vibe-tradingview-control", "vibe-simple-trade", "vibe-account-portfolio"]
---

# Vibe TradingView Controls

Vibe's TradingView controls keep chart analysis inside the trading product. The point is not only prettier charts; it is reducing context switching while a trader studies a market and prepares a trade.

## Charting Controls

The official TradingView page names five practical capabilities: adding indicators, customizing chart appearance, saving multiple layouts, switching tickers while preserving drawn lines and indicators, and creating custom watchlists.

Those controls support repeated market review. Saved layouts and persistent drawings matter because a trader can compare markets without reconstructing the chart state every time they move between tickers.

## Source Boundary

The public source does not enumerate every supported indicator, data vendor, chart interval, or watchlist constraint. The compendium should document the control categories and avoid pretending the source is a complete TradingView feature matrix.

## Reader Implication

When a user asks where to perform technical analysis, route them here. When they ask how analysis becomes an order, route them to the simple trade flow, order-type, liquidity, and TP/SL pages.

## Sources

- `vibe-tradingview-control`: official charting-control capabilities.
- `vibe-simple-trade`: trade flow that chart analysis informs.

## Related Pages

- `authored-vibe-simple-trade-flow`
- `authored-vibe-order-types`
- `authored-vibe-oi-and-liquidity`
