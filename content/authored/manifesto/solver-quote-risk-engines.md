---
id: "authored-solver-quote-risk-engines"
title: "Solver Quote And Risk Engines"
section: "manifesto"
track: "07 — Technical Architecture"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-3-solver-layer-off-chain"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-3-solver-layer-off-chain", "authored-solver-engine-operating-loop", "authored-oracle-reference-solver-quote-layer"]
---

# Solver Quote And Risk Engines

The solver quote engine turns market state into executable prices. In Neelo's technical model, it starts from oracle price, current solver inventory, volatility, utilization, and market maturity. The quote is not only a mid-price. It is a risk-adjusted offer.

The risk engine decides whether the trade is acceptable at all and under what constraints. It models position limits, margin requirements, current exposure, volatility, and maturity state. This is why the solver is infrastructure: it is not just answering "what is the price?" It is also answering "can this market safely absorb this exposure now?"

## Quote Inputs

The source model names five quote inputs:

- oracle price feed;
- current solver inventory;
- market volatility;
- utilization rate;
- Z-score or market maturity.

It then frames spread as base spread plus inventory adjustment plus volatility premium. That makes the spread a risk signal, not merely a fee.

## Risk Inputs

The risk engine constrains maximum position size and margin requirements by vault capacity, market liquidity, volatility, Z-score, current exposure, asset class, account risk, and position size. Those variables let a young market trade without pretending it has mature liquidity.

## Publication Boundary

The formulas, multipliers, margin rates, and Z-score thresholds in the source are model values. Do not publish them as live parameters until implementation owners confirm the production quote engine, risk engine, and disclosure policy.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.3 Solver Layer (Off-Chain)".

## Related Pages

- `authored-solver-engine-operating-loop`
- `authored-bootstrap-oracle-risk-tiers`
- `authored-market-maturation-z-score`
