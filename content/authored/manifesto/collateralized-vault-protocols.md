---
id: "authored-collateralized-vault-protocols"
title: "Asynchronous Fully Collateralized Vault Protocols"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-3-category-2-asynchronous-fully-collateralized-vault-protocols"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-03-landscape-3-3-category-2-asynchronous-fully-collateralized-vault-protocols", "authored-existing-perp-landscape-overview", "authored-static-perp-design-failures"]
---

# Asynchronous Fully Collateralized Vault Protocols

Neelo's second landscape category is the vault-backed perp design: traders execute asynchronously against a collateral pool instead of waiting for another trader to appear at the same time.

That design is useful at bootstrap. If a new market has only long demand, the vault can be the short side. If it has only short demand, the vault can be the long side. Oracle-based pricing and a capitalized liquidity pool make the market feel immediately tradable in a way an empty order book cannot.

The cost is that the counterparty guarantee becomes an LP balance-sheet problem. The pool has to stand behind winning trader PnL, absorb directional risk, and price that risk through fees, spreads, leverage limits, open-interest caps, asset mix, or other controls. The source's GMX-style example shows the core tradeoff: a vault can make execution available before two-sided flow exists, but it must reserve enough capital to survive the trader side winning.

This is why the vault category should not be described as a failure. It is a stage-fit solution. It can make one-sided markets tradeable earlier. It struggles to become the dominant long-tail model because every new market asks LP capital to accept asset-specific risk before the market has proved depth, hedging demand, and balanced flow.

## Publication Boundary

The source uses GMX v1, Gains, and Wasabi as examples. Current fee schedules, vault composition, open-interest caps, supported assets, keeper models, product status, and exact venue comparisons must be refreshed from primary sources before publishing live protocol comparisons.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols: 3.3 Category 2: Asynchronous + Fully Collateralized (Vault Protocols)".

## Related Pages

- `authored-existing-perp-landscape-overview`
- `authored-static-perp-design-failures`
- `authored-collateralized-pools-finite-long-tail`
