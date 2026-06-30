---
id: "authored-gap-filling-perps-protocol"
title: "The Gap-Filling Perps Protocol"
section: "manifesto"
track: "06 - Listing Power"
status: "published"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/05-permissionless-perps-hypothesis", "https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/04-the-lifecycle-gap"]
relatedGeneratedPages: ["neelo-03-listing-monopoly-03-docs-05-permissionless-perps-hypothesis", "neelo-03-listing-monopoly-03-docs-04-the-lifecycle-gap", "section-03-listing-monopoly-03-docs-05-permissionless-perps-hypothesis-5-3-what-the-hypothetical-solution-would-look-like"]
---

# The Gap-Filling Perps Protocol

The missing layer in Neelo's lifecycle framework is not a larger Binance and not a smaller Hyperliquid. It is a protocol class for tokens that have enough spot activity to deserve derivative discovery, but not enough maturity to receive deep order-book perp markets.

The source describes a plausible pattern: bootstrap, maturation, graduation. In the bootstrap phase, the system supplies an initial counterparty or liquidity path so a market can exist before natural two-sided flow appears. In the maturation phase, the market is measured against objective quality signals: volume, spread behavior, open interest, persistence, liquidation behavior, and dependence on solver inventory. In the graduation phase, markets that prove themselves can move toward deeper order-book or centralized venues.

This gives Vibe's thesis a concrete shape. It is not "list everything forever." It is "start markets earlier, measure them honestly, and let the best markets earn a more efficient execution layer." That is how the permissionless derivatives idea avoids becoming a graveyard of unsupported symbols.

The exact live product thresholds, venues, and transition rules still need implementation review before public promises are made. The source-backed strategic model is already strong: a derivatives layer for the lifecycle gap should be temporary where possible, durable where necessary, and measured throughout.

## Reader Implication

A project should not ask only whether it can get a perp. It should ask what stage its market is in, which mechanism makes that stage tradeable, and what evidence would justify graduation. A trader should understand that early markets can be useful before they resemble mature order books.

## Sources

- `vibe-papers`: Neelo, "Section 5: A Hypothetical Permissionless Perps Protocol".
- `vibe-papers`: Neelo, "Section 4: The Lifecycle Gap".

## Related Pages

- `authored-market-lifecycle-gap`
- `authored-z-score-graduation-criteria`
- `authored-order-books-as-graduation-layer`
