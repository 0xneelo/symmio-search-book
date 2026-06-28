---
id: "authored-clob-vault-rails-long-tail-limits"
title: "CLOB And Vault Rails Still Hit Long-Tail Limits"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/01-order-books-dydx-hyperliquid", "https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/00-abstract"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-01-order-books-dydx-hyperliquid", "neelo-16-listing-additional-16-docs-00-abstract", "authored-order-book-bootstrap-limit"]
---

# CLOB And Vault Rails Still Hit Long-Tail Limits

The practical listing notes extend the order-book thesis into venue landscape analysis. CLOB perps are excellent when both sides of a market already want to trade and makers are present. For major assets, that combination creates tight spreads, continuous depth, and trader expectations that match the product.

The long tail breaks a different way. A market can have a symbol, an API row, or a listing path, but still lack the maker attention and two-sided flow that make an order book useful. Makers do not quote size without expected flow. Traders do not arrive without usable quotes. LPs do not commit if the earning path is unclear.

The source uses dYdX-style vault rails and Hyperliquid-style disciplined listings as contrasting examples. One direction tries to add pooled liquidity support next to order-book markets. The other throttles listings so the venue does not pretend every asset can sustain mature depth. Both are coherent responses. Neither creates generalized day-one liquidity for thousands of thin perps.

## Publication Note

The source includes field observations about venue-specific parameters. Final docs should verify live third-party venue docs before publishing exact minimums, lockups, auction cadence, or routing behavior.

## Reader Implication

Vibe should be explained as solving the bootstrap gap before CLOB maturity, not as denying the value of mature order books. The issue is not whether order books work. The issue is when they work.

## Sources

- `vibe-papers`: Neelo, "Section 1: Order Books - Bootstrap Economics, dYdX, Hyperliquid".
- `vibe-papers`: Neelo, "Permissionless Perps in Practice - Abstract".

## Related Pages

- `authored-order-book-bootstrap-limit`
- `authored-order-books-as-mature-end-state`
- `authored-order-books-as-graduation-layer`
