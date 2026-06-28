---
id: "authored-perp-protocol-framework"
title: "The Three Axes Of Perp Protocol Design"
section: "manifesto"
track: "01 — Perps Categories & Bootstrap Trilemma"
status: "publication-candidate"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/09-conclusion"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-02-framework", "section-01-perp-classes-zscore-01-docs-02-framework-2-2-dimension-1-matching-engine-architecture", "section-01-perp-classes-zscore-01-docs-02-framework-2-3-dimension-2-collateralization-architecture"]
---

# The Three Axes Of Perp Protocol Design

Neelo's framework gives the compendium a vocabulary for comparing perpetual protocols without reducing them to brand names. A perp protocol is not just "an order book" or "a pool." It makes choices across three axes: matching, collateralization, and insurance topology.

The first axis is matching architecture. Synchronous systems require both sides to be present at execution time; order books are the canonical example. Asynchronous systems let a trader execute against a persistent counterparty such as a vault, AMM, or solver.

The second axis is collateralization. Fully netted systems let longs and shorts pay each other. Fully collateralized systems rely on a vault or LP side to pay winning traders. The source's core point is that netted systems are efficient only when flow is balanced, while collateralized systems can serve one-sided flow only by tying up capital.

The third axis is insurance topology. Cross-market insurance and cross-margining improve capital efficiency for proven markets, but they couple risk across markets. Isolated markets are less efficient, but a bad new listing cannot drain established markets.

## Reader Implication

This framework should appear early in the compendium because it explains why Vibe is not merely another perp venue. Vibe is positioned as a system that can move across these axes as a market matures, rather than choosing one static point forever.

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Categorizing Perpetual Protocols".
- `vibe-papers`: Neelo, "Section 9: Conclusion".

## Related Pages

- `authored-bootstrap-trilemma`
- `authored-perpetual-protocol-design-space`
- `neelo-01-perp-classes-zscore-01-docs-02-framework`
