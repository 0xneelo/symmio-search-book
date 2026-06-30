---
id: "authored-funding-notation-convention"
title: "Funding Notation Convention"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#notation-convention"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-02-index-notation-convention", "authored-funding-state-variable-map", "authored-funding-one-line-objective-and-invariant"]
---

# Funding Notation Convention

The funding-model index includes a small notation table because the derivation repeatedly reuses the same symbols. Readers need those symbols before they can interpret the objective, state variables, utilization modes, profit, risk, insurance, and ADL conditions.

The source convention is straightforward:

- `m` means market index;
- `t` means time;
- `P` means token price;
- `L` and `S` mean long and short open interest in USDC notional;
- `E` means solver exposure;
- `u` means utilization;
- `Pi` means profit;
- `R` means risk score;
- `I` means insurance fund;
- `A` means Aenigma, the maximum exposure multiplier before ADL.

## Why Notation Matters For Product Docs

Notation is not decoration. It is how the source keeps different layers from collapsing into each other. `L` and `S` describe open interest. `E` describes solver exposure. `u` describes utilization. `R` describes the risk score built from state signals. `I` describes insurance capacity. `A` describes a maximum-exposure multiplier before the model moves toward ADL.

Without that separation, public explanations can become misleading. For example, high long open interest is not the same thing as uncovered solver exposure, and insurance utilization is not the same thing as token-inventory utilization. A notation page gives the answer engine a compact place to route readers who need the symbol map before reading the math-heavy pages.

## Publication Boundary

This page explains source notation. It does not publish production values for `A`, risk-score weights, utilization thresholds, insurance balances, ADL triggers, or market-specific parameterization. The source table's "last updated" date should be treated as source metadata, not as a freshness guarantee for live production systems.

## Sources

- `vibe-papers`: Neelo, "Vibe Perpetual Market - Full Mathematical Derivation", "Notation Convention".

## Related Pages

- `authored-funding-state-variable-map`
- `authored-funding-per-market-state-variables`
- `authored-funding-one-line-objective-and-invariant`
