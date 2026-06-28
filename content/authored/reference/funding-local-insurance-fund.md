---
id: "authored-funding-local-insurance-fund"
title: "Funding Local Insurance Fund"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "neelo-15-funding-model-15-docs-10-defense-hierarchy", "section-15-funding-model-15-docs-04-variable-definitions-insurance-safety-variables"]
---

# Funding Local Insurance Fund

In Neelo's funding model, local insurance is a per-market USDC protection fund. It sits after user netting and solver token inventory, and before any shared global insurance or ADL.

The source model gives three local-fund inflows:

- `100%` of liquidation profits from the same market;
- `30%` of positive solver profits from the same market;
- CVA-style charges where applicable.

The important property is isolation. A local insurance fund belongs to its market. It cannot be drained by another market, and it is the first explicit USDC protection layer after token inventory is depleted.

## Why Local Comes Before Global

Local insurance keeps loss responsibility close to the market that generated the risk. A permissionless low-cap market should build its own runway from its own operations before it asks for shared protection.

That also makes reporting clearer. If a market reaches insurance mode, users should be able to see whether the local fund is healthy, how much can be spent in the current period, and which source-model inflows are being counted.

## Publication Boundary

The source model uses example percentages and formulas. Public docs should not present `30%`, spend caps, CVA treatment, or liquidation-profit routing as live production policy until operator and implementation review confirm the deployed values.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic".
- `vibe-papers`: Neelo, "Defense Hierarchy".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-conditional-global-insurance-allocation`
- `authored-loss-waterfall-and-profit-caps`
