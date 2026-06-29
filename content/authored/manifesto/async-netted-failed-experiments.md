---
id: "authored-async-netted-failed-experiments"
title: "Async-Netted Perp Experiments Fail At The Payer Question"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-4-category-3-asynchronous-fully-netted-the-failed-experiments"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-03-landscape-3-4-category-3-asynchronous-fully-netted-the-failed-experiments", "authored-async-netted-no-payer-failure", "authored-collateralization-payout-source"]
---

# Async-Netted Perp Experiments Fail At The Payer Question

The async-netted category looks like the most elegant answer to long-tail perps. It promises asynchronous execution for permissionless listing and netted accounting for capital efficiency. In the abstract, that sounds like the best parts of vaults and order books.

Neelo's landscape critique says the combination breaks at market birth. Netted systems pay winners from losers. Asynchronous execution lets a trader enter before the opposite side exists. If the first trader is profitable before any offsetting counterparty appears, the market has created an obligation without a payer.

Dynamic funding does not remove that obligation. Funding can encourage balance after a market has participants, but it cannot force a rational short to arrive during a fast one-sided pump, and it cannot retroactively create collateral for a winning long that already needs to be paid. The system still needs a defined capitalized counterparty path before it accepts the trade.

The landscape version of this point is harsher than the broad trilemma summary: "execute without matching, but pay only from matches" is incoherent for a cold-start market. It may describe a balanced market after liquidity exists. It does not bootstrap the first profitable imbalance.

## Publication Boundary

The source names Derp.fun, Imperial-style experiments, virtual counterparties, and community-backed variants as examples. Current project status, implementation details, market outcomes, and any public failure claims must be verified from current primary sources before publication.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols: 3.4 Category 3: Asynchronous + Fully Netted (The Failed Experiments)".

## Related Pages

- `authored-async-netted-no-payer-failure`
- `authored-collateralization-payout-source`
- `authored-static-perp-design-failures`
