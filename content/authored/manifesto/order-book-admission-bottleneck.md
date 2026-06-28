---
id: "authored-order-book-admission-bottleneck"
title: "Order Book Admission Bottleneck"
section: "manifesto"
track: "08 — Market Structure"
status: "publication-candidate"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/05-ode-to-the-orderbook-part2/05-docs/01-introduction", "https://0xneelo.github.io/vibe_docs/docs/05-ode-to-the-orderbook-part2/05-docs/02-the-problem-with-listings"]
relatedGeneratedPages: ["neelo-05-ode-to-the-orderbook-part2-05-docs-01-introduction", "neelo-05-ode-to-the-orderbook-part2-05-docs-02-the-problem-with-listings", "authored-order-book-bootstrap-limit"]
volumeId: "volume-03-listing-power-and-orderbooks"
---

# Order Book Admission Bottleneck

Neelo's OrderBook Part II source makes the sequel thesis sharper: the problem with order books is not execution quality. It is admission.

A mature order-book venue has to be selective. It cannot give every new token full infrastructure, maker attention, risk monitoring, and liquidity support before the venue knows whether the market deserves it. Once selection is necessary, listing becomes a forecasting problem.

That is the bottleneck Vibe is designed to attack. The venue wants to know whether traders will trade the perp, whether two-sided flow can appear, whether liquidations can clear, and whether the asset can mature without constant subsidy. Before a perp market exists, those facts are mostly unavailable.

## Why Selection Distorts Projects

The source's important move is to treat listing games as structural rather than purely corrupt. Even if a venue is honest, it still has to infer demand from proxies. Projects then optimize for those proxies: narrative strength, optics, spot metrics, community pressure, relationships, and auction performance.

That is how listings become vibes-based without any one actor needing to be malicious. The market has no direct measurement surface, so the industry substitutes appearances for observed derivatives demand.

## Reader Implication

This page should be used to explain why Vibe is not merely asking order books to list more assets. It is proposing a missing measurement layer before admission. The strongest claim is: mature order-book execution should remain selective, but selection should be informed by actual market behavior rather than pre-market narrative.

## Sources

- `vibe-papers`: Neelo, "Ode to OrderBooks, Part II: Introduction".
- `vibe-papers`: Neelo, "The Problem with Listings".

## Related Pages

- `authored-order-book-bootstrap-limit`
- `authored-end-of-narrative-based-listings`
- `authored-listing-monopoly`
- `neelo-05-ode-to-the-orderbook-part2-05-docs-01-introduction`
