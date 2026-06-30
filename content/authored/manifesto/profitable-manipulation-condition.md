---
id: "authored-profitable-manipulation-condition"
title: "Profitable Manipulation Condition"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-2-expected-annual-protocol-loss-model", "authored-incentive-based-attack-risk"]
---

# Profitable Manipulation Condition

The source's sharpest risk argument is that manipulation should not always be modeled as a random event.

For low-cap perp markets, the relevant question is whether manipulation is profitable:

```
Expected Profit = Bad Debt Extracted - Cost to Manipulate Price
```

If expected profit is positive, rational attackers have an incentive to execute. Thin spot liquidity lowers the cost to move the reference market. High open interest raises the value of bad debt that can be created. Net-position imbalance determines which side becomes vulnerable. Oracle latency and liquidation infeasibility decide whether the system can react before the loss lands.

That is why the source treats "probability" differently for manipulation than for ordinary operational incidents. A profitable attack surface is a standing incentive, not a weather event.

## Reader Implication

Docs should teach low-cap market readers to compare open interest, spot liquidity, oracle design, imbalance, and liquidation feasibility. They should not imply that a thin market is safe because an historical probability estimate looks small.

## Publication Boundary

Do not publish live OI thresholds, manipulation-cost estimates, oracle details, liquidation windows, or market-specific attack profitability without current risk and implementation review. This page documents the source-model condition.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Attack Economics.

## Related Pages

- `authored-incentive-based-attack-risk`
- `authored-oracle-circuit-breaker-paradox`
- `authored-usdc-expected-loss-decomposition`
