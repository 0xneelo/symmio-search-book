---
id: "authored-funding-defense-layer-cost-ordering"
title: "Funding Defense Layer Cost Ordering"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#comparison-what-each-layer-costs", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#why-this-order"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-defense-hierarchy", "authored-funding-full-objective"]
---

# Funding Defense Layer Cost Ordering

Neelo's defense hierarchy orders defenses by cost. The source comparison says netting has no capital cost, no operational cost, and no UX cost. Token inventory has holding and management cost. Local insurance consumes market earnings and accounting capacity. Global insurance introduces shared-pool governance. ADL has high UX cost.

That is why the hierarchy is not arbitrary. It minimizes user impact, isolates contagion, and aligns incentives:

- netting comes first because it is free and invisible to users;
- token inventory comes next because capital was already committed;
- local insurance comes before global insurance because the market should use its own buffer first;
- global insurance is capped because shared capital can create contagion;
- ADL is last because forced deleveraging protects solvency at the cost of trust and user experience.

## How To Explain It

The defense stack is a cost ladder. A healthy market should spend the cheapest forms of protection first. A stressed market should not jump directly to socialized insurance or ADL while cheaper, more local, and less disruptive layers remain available.

This is also why poor markets have less runway. Good markets build local buffers from liquidations and profits. Weak markets, suspicious markets, or manipulated markets should not automatically inherit unlimited global protection.

## Publication Boundary

This page explains the source-model cost ordering. It should not publish live profit shares, liquidation routing, global eligibility rules, risk fractions, governance procedures, user-compensation semantics, or production ADL guarantees without operator, legal, risk, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Defense Hierarchy", "Comparison: What Each Layer Costs" and "Why This Order?"

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-funding-full-objective`
- `authored-funding-adl-priority-ranking`
