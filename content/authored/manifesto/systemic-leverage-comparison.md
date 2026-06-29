---
id: "authored-systemic-leverage-comparison"
title: "Systemic Leverage Comparison"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure4", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure5"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-figure4", "neelo-06-usdc-token-perps-06-docs-figure5", "authored-usdc-structural-capital-burden", "authored-token-inventory-structural-capital"]
---

# Systemic Leverage Comparison

The systemic leverage comparison asks how much open interest a capital structure can support per unit of structural capital.

In Figure4, the USDC-side equation is `sysLev_I = Q / K_I`, with the example landing near `0.80x`. The token-inventory side is `sysLev_V = Q_V / K_V = lambda`. Figure5 then uses a sample `sysLev_V = 5x`, producing a capital-efficiency ratio of about `6.22x` versus the USDC-side example.

The comparison is useful because it separates gross open interest from the denominator that makes that open interest credible. A system can look active while being capital-constrained if the backstop capital is expensive, fragile, or structurally misaligned with the market. Conversely, token inventory can support higher market-specific exposure when the risk is held by capital that already wanted the underlying asset.

## Reader Implication

Docs should present systemic leverage as a comparative model, not as a leaderboard number. The important question is what kind of capital sits behind the exposure and whether that capital is naturally aligned with the market being listed.

## Publication Boundary

The `0.80x`, `5x`, and `6.22x` values are source-model examples. Do not publish them as current Vibe leverage, final vault limits, or live solvency metrics without current risk parameters, exposure caps, accounting definitions, and operator approval.

## Sources

- `vibe-papers`: Neelo, "Figure4".
- `vibe-papers`: Neelo, "Figure5".

## Related Pages

- `authored-usdc-structural-capital-burden`
- `authored-token-inventory-structural-capital`
- `authored-risk-adjusted-capital-efficiency`
