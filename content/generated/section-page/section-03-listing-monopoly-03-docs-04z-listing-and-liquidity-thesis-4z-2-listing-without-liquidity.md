---
id: "section-03-listing-monopoly-03-docs-04z-listing-and-liquidity-thesis-4z-2-listing-without-liquidity"
title: "Section 4Z: Listing, Liquidity, and the Generalized Bootstrap Problem: 4Z.2 Listing Without Liquidity"
section: "vision-sections"
track: "03 — Listing Monopoly"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/04z-listing-and-liquidity-thesis#4z-2-listing-without-liquidity"]
parentPageId: "neelo-03-listing-monopoly-03-docs-04z-listing-and-liquidity-thesis"
sourcePath: "Docs/public/03_listing_monopoly/03_docs/04z-Listing-And-Liquidity-Thesis.md"
headingId: "4z-2-listing-without-liquidity"
---

# Section 4Z: Listing, Liquidity, and the Generalized Bootstrap Problem: 4Z.2 Listing Without Liquidity

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/04z-listing-and-liquidity-thesis#4z-2-listing-without-liquidity

## Extracted Section Draft

## 4Z.2 Listing Without Liquidity

Order-book perpetual venues illustrate the split between **instrument existence** and **market quality**. A venue may allow broad market creation, governance-approved expansion, or user-driven proposals, yet each new instrument still depends on **makers choosing to quote**. Until they do, the market is listed in name but thin or empty in practice—sometimes described as “permissionless listing” with **no generalized liquidity follow-through**.

Venues such as **dYdX** sit in this structural category: the architecture contemplates many markets, but **depth is not automatic**. Liquidity is supplied by participants who must be incentivized, coordinated, or paid. **Listing scales more easily than quoting.** The bottleneck is not the symbol; it is the absence of a **generalized** liquidity engine that attaches to arbitrary new perps without bespoke arrangement.

This distinction matters for how we read “permissionless perpetuals.” If a protocol only lowers the cost of **creating** a derivatives market, it may produce a graveyard of empty books. The category-defining problem is **permissionless listing paired with scalable liquidity generation**.

---
