---
id: "authored-funding-insurance-safety-budgets"
title: "Funding Insurance And Safety Budgets"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#insurance-safety-variables"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-insurance-safety-variables", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-funding-control-actions-map"]
---

# Funding Insurance And Safety Budgets

Neelo's variable definitions separate local insurance, global insurance allocation, local spend caps, global spend caps, and total defense budget. That separation is the accounting backbone of the defense hierarchy.

Local insurance is the market-specific protection fund. It is tied to the market that generated or needs the protection, so it can be spent before any shared pool is touched. Global insurance is different. It is a shared or allocated resource, so the source model treats it as capped and policy-bound rather than freely available to every stressed market.

Spend caps matter as much as balances. A market can have an insurance fund but still be limited in how much can be spent per period. That keeps one event or one market from consuming too much protection at once and gives the system time to price, hedge, reduce exposure, or escalate.

## Why The Budget Split Matters

The source model prevents a false binary. A market is not simply "insured" or "not insured." It has a local budget, possible global allocation, spend caps, and a combined defense budget. Those budget layers determine whether dynamic pricing is enough, whether local protection can absorb stress, whether shared support is eligible, and whether ADL is nearing the edge.

For LPs and projects, this explains why insurance should be documented as capacity with rules, not as a blanket guarantee. For traders, it explains why a stressed market can still have constrained terms even when an insurance fund exists.

## Publication Boundary

This page should not publish live insurance balances, allocation percentages, spend caps, governance rights, or user-claim language. It documents the source-model distinction between local funds, global allocations, and defense-budget limits.

## Sources

- `vibe-papers`: Neelo, "Insurance & Safety Variables".

## Related Pages

- `authored-funding-local-insurance-fund`
- `authored-funding-global-insurance-eligibility`
- `authored-funding-control-actions-map`
