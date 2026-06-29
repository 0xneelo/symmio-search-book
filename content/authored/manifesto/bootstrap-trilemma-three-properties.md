---
id: "authored-bootstrap-trilemma-three-properties"
title: "The Three Properties In The Bootstrap Trilemma"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-2-the-three-properties"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-2-the-three-properties", "authored-bootstrap-trilemma-formal-constraint", "authored-bootstrap-trilemma"]
---

# The Three Properties In The Bootstrap Trilemma

Neelo's bootstrap trilemma is built from three properties: permissionless listing, capital efficiency, and reliable counterparty guarantee. Each property is attractive on its own. The trilemma appears when a new perpetual market asks for all three at the same time.

Permissionless listing means any asset can have a perp market without a listing committee, auction, existing volume threshold, or pre-arranged market maker. It is the property that makes the long tail possible. Without it, a protocol can still serve established majors, but it does not solve market creation for thousands of assets.

Capital efficiency means the market can offer competitive fees, spreads, leverage, and LP or maker economics without forcing some party to overcollateralize every possible payout. This is the property that lets a market compete after it exists. A market can be technically available but commercially unattractive if the capital cost is too high.

Reliable counterparty guarantee means winning traders know who pays them. The source is precise here: a market is not credible if payout depends on a future counterparty appearing after the winning position already exists. Every accepted trade needs a defined, solvent path for settlement.

The three-property frame is useful because it stops the compendium from treating "permissionless" as the whole product. A market must be open, efficient enough to use, and credible enough to settle.

## Sources

- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma: 4.2 The Three Properties".

## Related Pages

- `authored-bootstrap-trilemma-formal-constraint`
- `authored-bootstrap-trilemma`
- `authored-collateralization-payout-source`
