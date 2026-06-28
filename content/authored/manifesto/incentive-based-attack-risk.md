---
id: "authored-incentive-based-attack-risk"
title: "Attack Risk Is Incentive-Based"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure1"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-2-expected-annual-protocol-loss-model", "neelo-06-usdc-token-perps-06-docs-figure1"]
---

# Attack Risk Is Incentive-Based

The risk-premium source rejects a weak framing of low-cap perp attacks: "what is the probability of a strange price move?" The stronger framing is economic: what does it cost to move the market, and what can be extracted from the resulting bad debt?

That matters because rational attackers do not need a rare random event. They need a profitable trade. If open interest, leverage, oracle design, and spot-market depth create a path where expected extraction exceeds manipulation cost, the risk becomes structural.

For docs, this changes the risk vocabulary. Thin liquidity, fast blocks, delayed liquidation, and net long/short imbalance are not independent footnotes. They can combine into one incentive surface. A market can be unsafe precisely when its headline growth metrics look exciting.

## Why It Belongs In The Compendium

Permissionless market creation only works if the docs teach adversarial economics. A reader should understand that "long-tail" means more than smaller assets. It means lower manipulation cost, weaker liquidation depth, more concentrated inventory, and more path-dependent risk.

## Publication Note

The source uses stylized examples and aggressive loss assumptions. Publish the incentive framework, but keep concrete thresholds and live exploitability claims under implementation/security review.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial".
- `vibe-papers`: Neelo, "Figure1".

## Related Pages

- `authored-oracle-circuit-breaker-paradox`
- `authored-token-margined-reflexivity-risk`
- `authored-solver-hedging-failure-modes`
