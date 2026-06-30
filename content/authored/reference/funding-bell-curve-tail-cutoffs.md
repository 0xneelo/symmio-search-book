---
id: "authored-funding-bell-curve-tail-cutoffs"
title: "Funding Bell-Curve Tail Cutoffs"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening#threshold-parameters"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "authored-cross-market-risk-mutualization", "authored-funding-bell-curve-transfer-pool"]
---

# Funding Bell-Curve Tail Cutoffs

Bell-curve flattening does not treat every profitable or losing market as a tail event. Neelo's source first calculates the mean market profit and the dispersion around that mean, then uses a threshold parameter to define upper and lower cutoffs.

The upper cutoff marks markets that are unusually profitable relative to the rest of the system. The lower cutoff marks markets that are unusually stressed or loss-making. Only values beyond those cutoffs become the right-tail surplus or left-tail shortfall used by the transfer logic.

That distinction matters because mutualization should not tax ordinary profitable markets or subsidize ordinary losing ones by default. The model is aimed at extreme tails, not daily noise.

## Why The Cutoffs Exist

Without cutoffs, every market would be pulled toward the average. That would make the system less legible and could punish healthy markets for normal variation. With cutoffs, the model asks a narrower question: which markets are far enough from the distribution that their excess or deficit should enter the cross-market risk layer?

The threshold parameter controls how wide the protected middle is. A higher threshold means fewer markets count as tails. A lower threshold means more markets can be included in flattening.

## Publication Boundary

This page explains the source-model cutoff concept. It does not publish live tail thresholds, profit windows, dispersion calculations, market eligibility rules, or production flattening intensity.

## Sources

- `vibe-papers`: Neelo, "Bell Curve Flattening", threshold parameters and cutoffs.

## Related Pages

- `authored-cross-market-risk-mutualization`
- `authored-funding-bell-curve-transfer-pool`
- `authored-funding-global-insurance-eligibility`
