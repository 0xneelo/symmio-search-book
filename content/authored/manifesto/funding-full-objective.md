---
id: "authored-funding-full-objective"
title: "The Full Funding Objective"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/11-full-objective", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-11-full-objective", "neelo-15-funding-model-15-docs-08-bell-curve-flattening", "neelo-15-funding-model-15-docs-09-insurance-adl"]
---

# The Full Funding Objective

The full funding objective in Neelo's model combines four ideas: maximize flattened market profit, penalize local risk, account for insurance cost, and make ADL expensive enough to remain a last resort.

In plain English, the system wants profitable markets, but not by ignoring unstable local states. It wants to compress extreme outcomes across markets, but not by allowing every weak market to drain shared insurance. It wants to spend insurance when it protects solvency, but not so freely that insurance becomes the ordinary counterparty.

## Components

Flattened profit is the cross-market piece. Winner markets can contribute from excess profit above a cutoff, stressed markets can receive support below a cutoff, and the aggregate distribution becomes less extreme.

Local risk is the market-specific piece. Utilization, insurance stress, skew, volatility, profit deviation, and residual stress create penalties that push the system away from danger zones.

Insurance cost and ADL cost are the hard-defense pieces. Insurance spend consumes scarce budget. ADL protects solvency but damages user experience and trust, so the model treats it as a costly action rather than a normal operating tool.

## Reader Implication

This page is the bridge between the manifesto and risk controls. The objective explains why Vibe's funding model is not only "charge the crowded side." It is trying to route capital, risk, insurance, and forced unwind decisions through one coherent system.

## Publication Boundary

This page explains the source-model objective. It does not publish production weights, cutoff rules, insurance policy, ADL policy, solver cost assumptions, eligibility thresholds, or user-facing guarantees without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Full Combined Objective: The Complete Optimization Problem".
- `vibe-papers`: Neelo, "Bell Curve Flattening: Cross-Market Risk Mutualization".
- `vibe-papers`: Neelo, "Insurance & ADL Logic".

## Related Pages

- `authored-cross-market-risk-mutualization`
- `authored-utilization-modes-inventory-insurance`
- `authored-funding-defense-hierarchy`
