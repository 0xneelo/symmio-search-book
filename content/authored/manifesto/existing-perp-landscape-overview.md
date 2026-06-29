---
id: "authored-existing-perp-landscape-overview"
title: "The Existing Perp Protocol Landscape"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-1-overview"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-03-landscape-3-1-overview"]
---

# The Existing Perp Protocol Landscape

The landscape section applies the framework to existing perpetual futures protocols. Its point is not to rank brands by popularity. It is to show that protocol categories cluster around different architecture choices, and each cluster has characteristic strengths and limits.

Order-book systems are the mature-market cluster: efficient, familiar, and strong when there is enough two-sided flow. Vault or pool-backed systems are the availability cluster: they can serve one-sided flow earlier, but the cost appears in LP risk, capital requirements, caps, fees, or spreads. Async-netted experiments try to combine permissionless access with efficiency, but the payer problem returns when a trader wins before the opposite side exists.

This is the bridge between taxonomy and trilemma. Once the landscape is mapped, the bootstrap problem becomes easier to see: the industry has useful designs for different market states, but not enough dynamic infrastructure for moving a market from empty to mature.

## Publication Boundary

Use this as the source's category overview. Current venue metrics, protocol market counts, fee levels, liquidity programs, listing rules, and implementation status must be refreshed from primary sources before being published as current comparisons.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols: 3.1 Overview".

## Related Pages

- `authored-static-perp-design-failures`
- `authored-synchronous-netted-order-book-protocols`
- `authored-bootstrap-trilemma`
- `authored-perp-framework-summary`
