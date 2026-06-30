---
id: "authored-funding-winner-surplus-loser-shortfall"
title: "Funding Winner Surplus And Loser Shortfall"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening#tail-identification"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "authored-funding-bell-curve-tail-cutoffs", "authored-funding-bell-curve-transfer-pool"]
---

# Funding Winner Surplus And Loser Shortfall

After the upper and lower cutoffs are set, the model measures only the amount beyond each cutoff. A winner market contributes surplus only above the upper cutoff. A loser or stressed market has shortfall only below the lower cutoff.

In the source notation, right-tail excess is the positive distance from the market's profit to the upper cutoff. Left-tail shortfall is the positive distance from the lower cutoff to the market's profit. If a market is inside the middle band, both values are zero.

This keeps the flattening layer focused. A market can be profitable without becoming a donor. A market can lose money without receiving cross-market support. The tail measurement is about extreme deviation, not whether the raw number is positive or negative.

## Why This Helps The Answer Engine

Readers may ask whether "winner markets pay loser markets" means all gains are pooled. The source model is narrower. It identifies excess and shortfall at the margin, then uses those quantities to size and allocate support.

That makes the answer more credible for solvers and LPs: the model is not one socialized PnL bucket. It is a tail-risk compression layer with explicit measurements.

## Publication Boundary

This page explains the source-model tail measurements. It does not publish live profit accounting windows, eligibility rules, cutoff values, or production definitions of which market outcomes count as winner surplus or loser shortfall.

## Sources

- `vibe-papers`: Neelo, "Bell Curve Flattening", tail identification.

## Related Pages

- `authored-funding-bell-curve-tail-cutoffs`
- `authored-funding-bell-curve-transfer-pool`
- `authored-funding-stress-demand-and-insurance-spend`
