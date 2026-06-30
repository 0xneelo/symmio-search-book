---
id: "authored-bootstrap-trilemma"
title: "The Bootstrap Trilemma"
section: "manifesto"
track: "01 — Market Formation Thesis"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma"]
---

# The Bootstrap Trilemma

The central market-formation problem is not listing a perpetual after liquidity exists. It is making a new market credible before the normal order-book conditions are present.

Neelo's Vibe papers frame this as a three-way constraint: permissionless listing, capital efficiency, and reliable counterparty guarantees are each desirable, but a single static architecture struggles to supply all three at market birth. Order books are capital efficient and reliable when both sides exist, but new assets often do not have enough synchronous liquidity. Fully collateralized pool designs can guarantee payouts, but the collateral burden turns into a fee and return problem. Netted systems can be efficient, but they fail if the profitable side has no actual counterparty behind it.

Vibe's claim is not that the trilemma disappears. The claim is that a market can move through architectures as it matures. Early markets need a solver and intent layer that can price demand before a book exists. Later markets can graduate into deeper, more order-book-like liquidity once real flow proves itself.

## Reader Implication

For a project, the question changes from "can I persuade a venue to list me?" to "can I create enough credible trading demand that the market earns its next layer of liquidity?" For a solver or LP, the question becomes whether the market's risk is priced well enough to justify carrying inventory or taking the other side.

## Sources

- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma".

## Related Pages

- `authored-intents-complete-order-books`
- `authored-vibe-as-discovery-layer`
- `neelo-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma`
