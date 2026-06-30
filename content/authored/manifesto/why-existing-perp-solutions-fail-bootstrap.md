---
id: "authored-why-existing-perp-solutions-fail-bootstrap"
title: "Why Existing Perp Solutions Fail Bootstrap"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/01-introduction#1-4-why-existing-solutions-fail"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-01-introduction-1-4-why-existing-solutions-fail", "authored-static-perp-design-failures", "authored-bootstrap-trilemma"]
---

# Why Existing Perp Solutions Fail Bootstrap

The introduction gives the short version of the bootstrap problem: existing perp architectures solve different parts of the lifecycle, but none of the static forms solves new-market creation cleanly.

Order-book protocols can be excellent once a market has buyers, sellers, market makers, and continuous flow. They do not create the missing side of a brand-new market. A new asset can have one-sided demand before there is enough synchronous liquidity to make a book useful.

Collateralized vault or pool protocols can make a market available earlier, but they do it by making LP capital stand behind payouts. That is the source of the fee, spread, leverage, and capacity limits that make the model hard to scale across thousands of long-tail assets.

Async-netted hybrid attempts promise a tempting combination: permissionless access and better capital efficiency. The source's critique is that the payer question returns at bootstrap. If a trader wins before the opposing side exists, a netted design still needs a defined counterparty.

## Publication Boundary

Use this page as the introduction-level answer. Deeper architecture claims should route to the landscape, bootstrap-trilemma, and framework pages. Current venue behavior, third-party protocol status, capital limits, and failure examples require publication-date primary-source review before final public comparisons.

## Sources

- `vibe-papers`: Neelo, "Section 1: Introduction: 1.4 Why Existing Solutions Fail".

## Related Pages

- `authored-static-perp-design-failures`
- `authored-bootstrap-trilemma`
- `authored-async-netted-no-payer-failure`
