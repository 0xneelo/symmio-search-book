---
id: "authored-cross-market-risk-mutualization"
title: "Cross-Market Risk Mutualization"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "neelo-15-funding-model-15-docs-09-insurance-adl", "neelo-15-funding-model-15-docs-11-full-objective"]
---

# Cross-Market Risk Mutualization

The bell-curve flattening section of Neelo's funding model introduces a cross-market insurance idea: extreme winner markets can contribute part of their surplus to stressed markets.

That does not change the aggregate goal of profitable markets. It changes the distribution of tail outcomes. If one market is unusually profitable while another market is under stress, a controlled transfer can compress the extremes and reduce the probability that one local failure reaches ADL.

In the source model, this works through a defined pool. Profitable outliers contribute from excess above an upper cutoff. Stressed markets receive support based on shortfall or uncovered stress. Protocol retention can also route part of the pool into insurance reserves.

## Why It Is Not One Big Shared Vault

The same corpus is careful about contagion. Local insurance is market-specific. Global insurance has eligibility rules and allocation caps. Not every market should be able to drain shared protection, especially if the token is low quality, manipulated, or outside the operator's risk policy.

That balance matters. Cross-market mutualization is useful because isolated tail events are expensive. But unlimited mutualization can make weak markets dangerous to strong ones. The architecture therefore needs both shared support and strict eligibility.

## Relationship To ADL

Bell-curve flattening and insurance sit before ADL in the defense stack. Dynamic pricing tries to rebalance the market first. Local insurance absorbs market-specific shocks. Global allocation can help when the market is eligible and stress exceeds local support. ADL remains the final backstop when budget or exposure safety limits are breached.

For readers, the key point is not the exact formula. It is the principle: profitable markets can help stabilize the system, but public docs must show the gates, caps, and loss-ordering that prevent uncontrolled contagion.

## Publication Boundary

The source model supports the architecture, but public docs must not imply that a production global insurance layer is live or disclose eligibility policy, allocation caps, retained percentages, or loss-ordering rules beyond what approved sources publish.

## Sources

- `vibe-papers`: Neelo, "08. Bell Curve Flattening: Cross-Market Risk Mutualization".
- `vibe-papers`: Neelo, "09. Insurance & ADL Logic".
- `vibe-papers`: Neelo, "11. Full Combined Objective".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-utilization-modes-inventory-insurance`
- `authored-loss-waterfall-and-profit-caps`
