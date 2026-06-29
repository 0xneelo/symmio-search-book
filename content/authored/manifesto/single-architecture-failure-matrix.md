---
id: "authored-single-architecture-failure-matrix"
title: "Why Single-Architecture Perp Designs Fail The Trilemma"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-4-why-single-architectures-fail"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-4-why-single-architectures-fail", "authored-static-perp-design-failures", "authored-async-netted-no-payer-failure"]
---

# Why Single-Architecture Perp Designs Fail The Trilemma

Neelo's failure matrix tests the same question three ways: what happens when a single architecture tries to hold all three bootstrap properties at once?

The async-netted attempt fails on counterparty guarantee. Netted accounting says one side pays the other. Asynchronous execution says one side can exist before the other. Put together, a winning long can appear before any short exists. The market has recorded profitable exposure without a payer.

The fully collateralized attempt fails on capital efficiency. A vault or pool can list the market and stand behind payouts, but every unit of open interest forces capital to bear directional risk. Fees, spreads, leverage, and limits must compensate that capital. The market may be safe enough to trade, but it is not as efficient as a mature netted venue.

The synchronous order-book attempt fails on permissionless bootstrap. An order book needs bids and asks at the same time. If a new market has no natural two-sided liquidity, adding a backstop reintroduces the collateralized-capital problem. The architecture is strong for mature markets, not for empty ones.

This page is the mechanical proof underneath the broad trilemma story. The failure is not aesthetic. Each static form gives up one of the required properties for a specific reason.

## Publication Boundary

The source includes simplified equations and venue-style comparisons to illustrate the mechanism. Keep those examples as source-model explanations until current venue parameters, fee levels, leverage, backstop rules, and market-maker economics are refreshed from primary sources.

## Sources

- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma: 4.4 Why Single Architectures Fail".

## Related Pages

- `authored-static-perp-design-failures`
- `authored-async-netted-no-payer-failure`
- `authored-collateralized-vault-protocols`
