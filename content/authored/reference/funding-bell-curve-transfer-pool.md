---
id: "authored-funding-bell-curve-transfer-pool"
title: "Funding Bell-Curve Transfer Pool"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "neelo-15-funding-model-15-docs-09-insurance-adl", "authored-cross-market-risk-mutualization"]
---

# Funding Bell-Curve Transfer Pool

Bell-curve flattening is the funding model's cross-market mutualization layer. The source phrase is blunt: give part of the profits of big winner markets to big loser or stressed markets.

The practical allocation version identifies:

- winner surplus: markets with profit above the upper cutoff;
- stress demand: markets with uncovered exposure stress;
- transfer pool: a fraction of the smaller side of those two totals;
- proportional global allocation: stressed markets receive support in proportion to stress demand, subject to their global cap.

## What It Does And Does Not Do

The transfer pool compresses tail outcomes. It can reduce the chance that one stressed market reaches ADL while another market has surplus. It does not mean every market shares one uncapped vault, and it does not erase local responsibility.

The same source model keeps global insurance eligibility and caps. That is the key safety property: mutualization should reduce tail volatility without letting one weak market drain all shared capital.

## Publication Boundary

Tail thresholds, flattening intensity, protocol retention, and global allocation formulas are model parameters. Public docs should describe the principle and publish live values only after operator and implementation review.

## Sources

- `vibe-papers`: Neelo, "Bell Curve Flattening".
- `vibe-papers`: Neelo, "Insurance & ADL Logic".

## Related Pages

- `authored-cross-market-risk-mutualization`
- `authored-funding-global-insurance-eligibility`
- `authored-funding-stress-demand-and-insurance-spend`
