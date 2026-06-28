---
id: "section-15-funding-model-15-docs-04-variable-definitions-per-market-state-variables"
title: "04. Variable Definitions: Per-Market State Variables"
section: "vision-sections"
track: "15 - Funding Rate Model"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#per-market-state-variables"]
parentPageId: "neelo-15-funding-model-15-docs-04-variable-definitions"
sourcePath: "Docs/public/15_funding_model/15_docs/04_variable_definitions.md"
headingId: "per-market-state-variables"
---

# 04. Variable Definitions: Per-Market State Variables

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#per-market-state-variables

## Extracted Section Draft

## Per-Market State Variables

For a market `m` at time `t`:

### Inventory / Balances

| Variable | Symbol | Formula | Description |
|----------|--------|---------|-------------|
| Initial Token Deposit | `T₀` | `initialTokenDeposit` | Total tokens deposited by LP |
| Total USDC Held | `U` | `totalUSDCHeld` | All USDC (includes insurance, sales, profits) |
| Token Price | `P` | `tokenPrice` | Current spot/mark price |
| Covered Amount (USDC) | `C_usd` | `coveredAmount` | USDC notional covered by token holdings |
| Covered Amount (tokens) | `C_tok` | `C_usd / P` | Token equivalent |
| Remaining Tokens | `T_rem` | `remainingTokens` | Token holdings − covered locked amount |
| Obtainable Tokens | `T_ob` | `currentObtainableTokens` | Max tokens buyable with profits |
| Absolute Tokens | `T_abs` | `C_tok + T_ob` | Total token capacity |

### Open Interest (USDC Notional)

| Variable | Symbol | Formula | Description |
|----------|--------|---------|-------------|
| Total Long OI | `L` | `totalLongExposure` | All long positions (USDC notional) |
| Total Short OI | `S` | `totalShortExposure` | All short positions (USDC notional) |
| Netted Amount | `N` | `min(L, S)` | Positions that cancel each other |
| Solver Exposure | `E_usd` | `|L − S|` | Un-netted exposure (USDC notional) |
| Exposure (tokens) | `E_tok` | `E_usd / P` | Exposure in token units |
| Exposure Direction | `dir` | `LONG if L > S else SHORT` | Which side solver is exposed to |

### Utilization Metrics

| Variable | Symbol | Formula | Description |
|----------|--------|---------|-------------|
| Utilization | `u` | `E_usd / C_usd` | Solver exposure / covered amount |
| Absolute Utilization | `u_abs` | `E_usd / (P · T_abs)` | Including obtainable tokens |
| Theoretical Overexposure | `OE` | `(L + S) / (P · T_abs)` | Total OI / absolute token capacity |
| Max Overexposure | `OE_max` | `maxOverExposure` | Configurable limit |

### Skew / Imbalance

| Variable | Symbol | Formula | Description |
|----------|--------|---------|-------------|
| Skew | `skew` | `(L − S) / (L + S)` | Range: `[-1, 1]` |
| Non-Covered Exposure | `NCE` | `max(0, E_usd − C_usd)` | Exposure beyond token coverage |
| Non-Covered Ratio | `NCR` | `NCE / C_usd` | As percentage of covered |

---
