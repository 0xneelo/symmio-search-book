---
id: "authored-funding-user-position-netting-defense"
title: "Funding User Position Netting Defense"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#layer-1-user-position-netting"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-defense-hierarchy", "authored-ddq-execution-netting-risk-split"]
---

# Funding User Position Netting Defense

Neelo's defense hierarchy starts with user position netting. Long and short exposure can offset naturally before the solver spends capital, deploys insurance, or considers ADL.

The source writes the netted amount as:

```
Netted Amount = min(L, S)
```

and the protection amount as:

```
Protection_netting = min(L, S)
```

The source example uses `$120,000` of longs and `$80,000` of shorts. `$80,000` nets internally, leaving `$40,000` of net exposure.

## Why This Is The First Layer

Netting is the cheapest protection in the stack. It requires no new capital, no insurance draw, no governance decision, and no forced close. It is just the economic result of opposing user flow.

This is why the compendium should not jump straight from open interest to insurance risk. The first question is whether opposing traders already absorb each other. Only residual exposure moves down the defense stack.

## Publication Boundary

This page explains the source-model netting layer. It should not publish final production netting cadence, netting pools, account-scope rules, cross-market offsets, or settlement guarantees without operator, risk, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Defense Hierarchy", "Layer 1: User Position Netting".

## Related Pages

- `authored-ddq-execution-netting-risk-split`
- `authored-economic-clarity-for-permissionless-perps`
- `authored-funding-defense-hierarchy`
