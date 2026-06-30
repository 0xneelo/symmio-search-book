---
id: "authored-perp-framework-summary"
title: "The Perp Framework In One Table"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-7-summary"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-02-framework-2-7-summary"]
---

# The Perp Framework In One Table

The framework summary gives the compact version: three dimensions, each with a tradeoff.

Matching runs from synchronous to asynchronous. Synchronous matching is efficient when both sides are present; asynchronous execution is more useful when the opposite side is not yet there. Collateralization runs from netted to collateralized. Netted exposure is efficient when winners and losers can pay each other; collateralized exposure is more reliable when a persistent payer is needed. Insurance runs from cross-market sharing to isolation. Cross-margin improves efficiency; isolation contains new-market risk.

The summary matters because it makes the rest of the paper readable. The landscape section applies the table to existing protocols. The trilemma section explains why the table creates hard constraints. The Vibe architecture section argues for moving through the table over time rather than choosing one cell forever.

## Reader Implication

Use this page when a reader wants the short version of the taxonomy. The answer should be simple enough to remember: matching is about timing, collateralization is about the payer, and insurance is about where losses can travel.

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Categorizing Perpetual Protocols: 2.7 Summary".

## Related Pages

- `authored-systematic-perp-categorization`
- `authored-perp-protocol-framework`
- `authored-synchronous-matching-counterparty-requirement`
- `authored-collateralization-payout-source`
