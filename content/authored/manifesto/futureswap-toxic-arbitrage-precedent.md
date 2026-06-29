---
id: "authored-futureswap-toxic-arbitrage-precedent"
title: "Futureswap Toxic Arbitrage Precedent"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/06-capital-and-historical"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-06-capital-and-historical", "authored-capped-oracle-latency-arbitrage", "authored-profitable-manipulation-condition"]
---

# Futureswap Toxic Arbitrage Precedent

Neelo names Futureswap V1 as a historical warning for token-margined and passive-pricing perp designs. In the source summary, LPs deposited ETH, pricing relied on a bonding curve, and bots exploited the lag between real prices and the curve.

The lesson is not merely that one early protocol failed. The source uses Futureswap to show that oracle or pricing latency can become structural when the venue offers predictable stale execution against volatile collateral.

If the outside market has moved and the on-chain pricing path has not caught up, informed traders can trade against LPs before the venue adapts. That is toxic arbitrage: the flow is not random demand; it is demand selected precisely because the market is mispriced.

## Why This Belongs In The Percolator Critique

Percolator's later oracle critique focuses on capped updates, latency windows, and attacker incentives. Futureswap supplies the historical analogy: stale or slow pricing in a volatile derivative venue does not need bad intent from the protocol to drain LPs. It only needs a predictable edge.

The general rule is brutal for low-cap perps. The thinner and more volatile the underlying, the more expensive even small pricing lags become. A mechanism that is safe for calm, deep markets can fail when the market being listed is exactly the kind of token Vibe cares about: early, reflexive, and thin.

## Reader Implication

When a reader asks whether oracle latency is theoretical, route here. The source's historical claim is that toxic arbitrage has already punished passive or lagging designs; the docs should not present latency as a parameter that can be tuned away without economic evidence.

## Sources

- `vibe-papers`: Neelo, "Section 6: Capital Inefficiency and Historical Precedent", "6.2.1 Futureswap V1 (Ethereum)".

## Related Pages

- `authored-capped-oracle-latency-arbitrage`
- `authored-oracle-trilemma`
- `authored-passive-matcher-adverse-selection`
