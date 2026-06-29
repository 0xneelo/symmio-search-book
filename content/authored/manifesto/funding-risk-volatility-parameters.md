---
id: "authored-funding-risk-volatility-parameters"
title: "Funding Risk And Volatility Parameters"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#risk-volatility-variables", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#aenigma-the-adl-exposure-threshold"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-risk-volatility-variables", "section-15-funding-model-15-docs-04-variable-definitions-aenigma-the-adl-exposure-threshold", "authored-funding-risk-signals-map"]
---

# Funding Risk And Volatility Parameters

Neelo's funding model uses risk and volatility variables to estimate how far a market can move before ordinary inventory assumptions stop being enough.

The source names volatility, profit deviation, market max pump, average user max pump, max market drawdown, and max deposit drawdown. Those variables connect price behavior, user behavior, and inventory management. A market with high volatility or large pump potential is not equivalent to a quiet, mature market even if both have the same current open interest.

The source also defines Aenigma as a worst-case exposure multiplier before positions are assumed to unwind. It takes the maximum of market pump, user pump, and drawdown-style parameters. The purpose is to estimate where the system becomes fully exposed because token inventory is no longer enough to cover positions under the modeled stress.

## Why This Belongs In The Docs

Long-tail assets can move violently, and user behavior can make that movement worse. A price pump can make short exposure dangerous. A drawdown can make token sales or inventory unwinds costly. Profit deviation can show that the market is not being compensated for the risk it is carrying.

These parameters help the docs explain why the same position size can be acceptable in one market and dangerous in another. The risk model is not only reading present exposure; it is asking how bad the next move could be before the system can unwind.

## Publication Boundary

This page does not publish live volatility windows, pump assumptions, drawdown assumptions, safety quantiles, Aenigma values, or ADL exposure thresholds. It explains the source model's categories so production docs can later map them to reviewed implementation parameters.

## Sources

- `vibe-papers`: Neelo, "Risk & Volatility Variables".
- `vibe-papers`: Neelo, "Aenigma: The ADL Exposure Threshold".

## Related Pages

- `authored-funding-risk-signals-map`
- `authored-funding-adl-trigger-and-target`
- `authored-funding-rate-regime-model`
