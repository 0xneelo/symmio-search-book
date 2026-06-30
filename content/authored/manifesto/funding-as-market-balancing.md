---
id: "authored-funding-as-market-balancing"
title: "Funding As Market Balancing"
section: "manifesto"
track: "07 — Technical Architecture"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-5-funding-rate-mechanism"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-5-funding-rate-mechanism"]
---

# Funding As Market Balancing

Funding is the feedback mechanism that keeps a perpetual market from drifting too far away from spot. In the standard explanation, longs pay shorts when the perp is rich, shorts pay longs when the perp is cheap, and the payment creates pressure back toward equilibrium.

Neelo's market-creation version adds the solver dimension. During bootstrap, the solver may be carrying residual exposure because natural flow is imbalanced. Funding can then do two jobs at once: anchor the perp to spot and encourage trades that reduce the solver's directional burden.

This matters for the compendium because funding is not just a fee line. It is a market-shaping instrument. When markets are young, funding can help invite the other side of the trade. When markets mature, funding becomes more like the familiar balancing mechanism in conventional perps.

## Publication Boundary

This page summarizes Neelo's model. Exact Vibe and Symmio funding formulas, funding intervals, caps, venue-specific mechanics, solver funding policy, user-facing fee displays, and current disclosure policy require implementation/operator/product review before publication as live facts.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.5 Funding Rate Mechanism".

## Related Pages

- `authored-hybrid-settlement-solver-stack`
- `authored-market-maturation-z-score`
- `authored-estimated-network-revenue`
