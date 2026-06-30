---
id: "authored-pump-bankruptcy-arithmetic"
title: "Pump Bankruptcy Arithmetic"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "authored-one-x-leverage-ceiling", "authored-token-margined-short-volatility-profile"]
---

# Pump Bankruptcy Arithmetic

Neelo's 1x leverage argument is not only qualitative. The source gives a simple inverse-PnL example: an LP deposits `1,000,000` tokens, traders open `10,000,000` tokens of long exposure, and price rises from `$1.00` to `$1.1111`.

Using the source's inverse-PnL form:

```text
PnL_tokens = 10,000,000 * (1 / 1.00 - 1 / 1.1111)
```

The resulting trader profit is approximately `1,000,000` tokens. That is the LP's entire collateral. In the source model, a roughly `11.11%` pump can bankrupt a token-margined LP when open interest is `10x` LP collateral.

## Why The Example Matters

The example is not a universal risk limit. It is a stress proof for the architecture category. If the market lets open interest become many times larger than token collateral, a modest pump can turn winning longs into a token-denominated claim larger than the LP can pay.

That is the practical bridge from inverse payoff math to market design. The system can either restrict open interest and utilization aggressively, or it can risk a state where profitable traders cannot be paid without socialization, haircuts, or other emergency mechanics.

## Reader Implication

When a market advertises leverage, readers should ask what collateral-to-OI ratio keeps the payer solvent under plausible price moves. The answer engine should route "can token-margined LPs support 10x leverage?" to the arithmetic, not only to a general risk warning.

## Publication Boundary

The pump example is source-level stress arithmetic, not a live margin rule, liquidation threshold, market cap band, leverage offer, insolvency prediction, or user risk recommendation. Current production limits and solvency claims require risk, legal, implementation, and operator review.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint", "4.4.1 The Mathematical Proof".

## Related Pages

- `authored-one-x-leverage-ceiling`
- `authored-percolator-formal-verification-boundary`
- `authored-open-interest-without-payout-reliability`
