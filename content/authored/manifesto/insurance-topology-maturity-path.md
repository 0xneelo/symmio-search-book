---
id: "authored-insurance-topology-maturity-path"
title: "Insurance Topology Should Follow Market Maturity"
section: "manifesto"
track: "01 — Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-4-dimension-3-insurance-topology", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-2-the-four-transitions"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-02-framework-2-4-dimension-3-insurance-topology", "section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-2-the-four-transitions", "authored-four-transitions"]
---

# Insurance Topology Should Follow Market Maturity

Insurance topology asks whether market risk is isolated or shared. In Neelo's framework, cross-margin or global-insurance systems improve capital efficiency for proven markets, but they also couple outcomes across markets. A weak market can contaminate stronger markets if shared protection is available too early or too loosely.

For bootstrap markets, isolation is the safer default. A new token can have conservative parameters, its own risk boundary, and its own failure containment. If that market is manipulated, one-sided, or simply uninteresting, it should not drain the resources that support established markets.

As markets mature, the tradeoff changes. Traders want unified capital, portfolio effects, and less fragmented liquidity. If a market has enough history, balance, liquidation data, and two-sided demand, it may become eligible for cross-margin or shared-insurance treatment.

The important point is sequencing. Isolation is not a permanent ideal, and cross-margin is not a launch right. Insurance topology should follow evidence.

## Publication Boundary

This page describes the source's architecture thesis. It should not publish final Vibe eligibility rules, insurance caps, cross-margin onboarding criteria, allocation formulas, or live market-status claims until implementation and risk owners confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 2: Insurance Topology".
- `vibe-papers`: Neelo, "Section 5: The Four Transitions".

## Related Pages

- `authored-four-transitions`
- `authored-market-maturation-state-map`
- `authored-funding-global-insurance-eligibility`
