---
id: "authored-hypothetical-permissionless-perps-model"
title: "The Hypothetical Permissionless Perps Model"
section: "manifesto"
track: "03 - Listing Monopoly"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/05-permissionless-perps-hypothesis#5-3-what-the-hypothetical-solution-would-look-like"]
relatedGeneratedPages: ["section-03-listing-monopoly-03-docs-05-permissionless-perps-hypothesis-5-3-what-the-hypothetical-solution-would-look-like", "authored-gap-filling-perps-protocol", "authored-permissionless-perps-lifecycle-position"]
---

# The Hypothetical Permissionless Perps Model

Neelo's hypothetical model has three phases: bootstrap, maturation, and graduation.

The problem is the same lifecycle discontinuity: tokens can reach DEX spot early, while perp markets usually appear much later. In the middle, spot can trade but derivatives are absent.

The bootstrap phase gives the market an initial counterparty or liquidity path so the perp can exist before natural two-sided liquidity forms. The maturation phase measures whether the market is becoming real: volume, spread behavior, open interest, liquidation performance, persistence, and other quality signals. The graduation phase lets sufficiently mature markets move toward deeper order-book venues or coexist with later-stage perp listings.

## Lifecycle Continuity

The model creates a continuous path:

fair launch -> DEX spot -> permissionless perp bootstrap -> mature perp venue.

That path is complementary to later venues. A permissionless bootstrap layer can create evidence before the order book arrives. Later venues can then list markets with better information, or the bootstrap market can keep serving assets that never become large enough for the deepest venues.

## Publication Boundary

This is explicitly a source model and hypothesis. Do not publish it as final Vibe product mechanics, a confirmed automatic graduation pipeline, a current listing policy, a guaranteed solver obligation, or an approved venue integration without operator/product/risk/legal/implementation review.

## Sources

- `vibe-papers`: Neelo, "Section 5: A Hypothetical Permissionless Perps Protocol: 5.3 What the Hypothetical Solution Would Look Like".

## Related Pages

- `authored-gap-filling-perps-protocol`
- `authored-permissionless-perps-lifecycle-position`
- `authored-listing-plus-liquidity-thesis`
