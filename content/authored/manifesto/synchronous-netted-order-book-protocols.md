---
id: "authored-synchronous-netted-order-book-protocols"
title: "Synchronous Fully Netted Order-Book Protocols"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-current-source-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-2-category-1-synchronous-fully-netted-order-book-protocols"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-03-landscape-3-2-category-1-synchronous-fully-netted-order-book-protocols"]
---

# Synchronous Fully Netted Order-Book Protocols

In Neelo's landscape, order-book protocols are synchronous and fully netted. They match buyers and sellers through a book, settle long and short PnL through a clearing function, and use insurance funds or backstops for stress rather than requiring a vault to pay every ordinary winner.

That architecture explains their strength. When a market is mature, synchronous netting is capital efficient. Traders and market makers provide live quotes, price discovery is tight, and the venue does not have to warehouse every unit of exposure itself.

The same architecture explains their bootstrap weakness. If a new token starts with an empty book, the first long has no ask and the first short has no bid. Market makers may refuse to quote until there is evidence of demand, risk, and hedgeability. The book can facilitate demand once counterparties exist; it does not create the missing counterparty by itself.

The source uses Hyperliquid, dYdX, and centralized exchanges as examples in this category. The publication-safe lesson is stage fit: order-book venues can be excellent endpoints for proven markets while still being weak at day-one market creation.

## Publication Boundary

Do not publish source-time Hyperliquid volume, listed-market counts, latency claims, HIP-3 auction outcomes, dYdX architecture details, or centralized-exchange listing behavior as current without fresh primary-source review. The durable source claim is architectural: synchronous fully netted systems need existing liquidity to work well.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols: 3.2 Category 1: Synchronous + Fully Netted (Order Book Protocols)".

## Related Pages

- `authored-synchronous-matching-counterparty-requirement`
- `authored-order-books-solve-mature-version`
- `authored-order-book-bootstrap-limit`
- `authored-order-book-integration-handshake`
