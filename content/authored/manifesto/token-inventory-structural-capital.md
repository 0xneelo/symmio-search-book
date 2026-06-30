---
id: "authored-token-inventory-structural-capital"
title: "Token Inventory As Structural Capital"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure4"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-figure4", "authored-token-holder-inventory-alignment", "authored-token-inventory-risk-localization", "authored-risk-adjusted-capital-efficiency"]
---

# Token Inventory As Structural Capital

Figure4 gives the token-inventory design a simpler structural-capital equation: `K_V = T`.

`T` is the SIM inventory contributed by projects, whales, or committed holders. In the source model, gross open interest is `Q_V = lambda * T`, so systemic leverage becomes `sysLev_V = Q_V / K_V = lambda`. The capital base is the inventory itself because the asset holders already own the risk that the market is trying to organize.

That does not remove risk. It changes the capital source. Instead of asking generic USDC LPs to underwrite every low-cap market, the system starts from market-native inventory whose holders may want token utility, liquidity, hedging, and fee flow around the asset they already hold.

## Reader Implication

Token inventory should be documented as structural market capital, not as decorative staking. It becomes useful when solver operations, settlement rules, risk limits, and loss allocation make that inventory available to support real market exposure.

## Publication Boundary

Keep `K_V = T` and `sysLev_V = lambda` as source-model notation until live inventory eligibility, withdrawal rights, rehypothecation limits, solver access, risk limits, loss ordering, and accounting treatment are approved.

## Sources

- `vibe-papers`: Neelo, "Figure4".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-token-inventory-risk-localization`
- `authored-risk-adjusted-capital-efficiency`
