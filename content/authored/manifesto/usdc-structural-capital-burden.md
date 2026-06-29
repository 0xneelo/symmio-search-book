---
id: "authored-usdc-structural-capital-burden"
title: "USDC Structural Capital Burden"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure4"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-figure4", "authored-risk-adjusted-capital-efficiency", "authored-usdc-vault-negative-feedback-loop", "authored-usdc-opportunity-cost-floor"]
---

# USDC Structural Capital Burden

Figure4 treats a USDC LP design as carrying more structural capital than the visible LP deposit alone.

In the Imperial side of the source model, USDC LP deposit `L = 1,000,000` supports gross open interest `Q = 830,000`, but total structural capital is written as `K_I = L + 0.04 * Q`. That formula matters because the market does not only need passive deposited dollars. It also needs risk capital, reserves, or required backing attached to the open interest it creates.

That extra term is the burden. A low-cap USDC backstop has to compensate capital that did not naturally want the asset exposure, while also maintaining enough buffer for adverse selection, liquidation failure, bad debt, and stress states. The structural-capital denominator therefore expands before the system can claim efficiency.

## Reader Implication

When a docs page compares a USDC vault to token-inventory support, it should not ask only "how many dollars are deposited?" It should ask what total capital structure is needed for the market to remain credible when open interest grows.

## Publication Boundary

Use `K_I = L + 0.04 * Q` as a source-model equation, not as a live Vibe or Imperial parameter. Final publication needs current vault terms, capital charges, reserve assumptions, margin policy, loss waterfall, and legal/accounting review before this becomes a product metric.

## Sources

- `vibe-papers`: Neelo, "Figure4".

## Related Pages

- `authored-risk-adjusted-capital-efficiency`
- `authored-usdc-vault-negative-feedback-loop`
- `authored-usdc-opportunity-cost-floor`
