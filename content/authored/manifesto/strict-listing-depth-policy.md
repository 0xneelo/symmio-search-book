---
id: "authored-strict-listing-depth-policy"
title: "Strict Listing Policy Protects Depth"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "publication-candidate-needs-current-source-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers", "hyperliquid-hip3"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/01-order-books-dydx-hyperliquid", "https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/hyperevm/hip-3-deploying-hip-3-assets"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-01-order-books-dydx-hyperliquid", "authored-hyperliquid-gap-lower-layer", "authored-vibe-as-discovery-layer"]
---

# Strict Listing Policy Protects Depth

The listing annex treats Hyperliquid-style discipline as an intellectually honest response to order-book limits. If CLOBs work best when assets are already active enough for two-sided flow, then a venue should not pretend that every new symbol can carry mature depth immediately.

Strict listing policy trades breadth for microstructure quality. It says fewer markets with better expected depth can be more coherent than many markets that technically exist but feel empty.

## The Tradeoff

The benefit is predictable trader experience for listed markets. The cost is that long-tail assets still need somewhere else to prove they deserve deeper execution.

That is the gap Vibe wants to occupy. Vibe can be the earlier discovery and stress-test layer: show whether a token has real directional demand, short interest, solver pricing interest, and market-quality signals before it asks for a mature order-book slot.

## Publication Boundary

Do not publish exact third-party auction cadence, governance parameters, deployment requirements, or listing frequency without current official source review. The source-backed point is the tradeoff: strict listing protects order-book quality but leaves a lower-layer discovery problem.

## Sources

- `vibe-papers`: Neelo, "Section 1.4: Hyperliquid: acknowledging limits via rare listings".
- `hyperliquid-hip3`: Hyperliquid HIP-3 official documentation for builder-deployed perp context.

## Related Pages

- `authored-hyperliquid-gap-lower-layer`
- `authored-vibe-as-discovery-layer`
- `authored-order-books-as-graduation-layer`
