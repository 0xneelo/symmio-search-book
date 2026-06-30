---
id: "authored-percolator-seven-failure-mode-synthesis"
title: "Percolator Seven Failure Mode Synthesis"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/10-conclusion"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-10-conclusion", "authored-token-margined-reflexivity-risk", "authored-linear-pnl-versus-hyperbolic-payout"]
---

# Percolator Seven Failure Mode Synthesis

Neelo's conclusion compresses the Percolator critique into seven model-level failures: reflexive collateral, inverse negative convexity, LP lose-lose economics, near one-to-one collateral requirements, oracle paradoxes, manipulation amplification, and death-spiral payout behavior.

The important phrase is model-level. The conclusion does not argue that every failure comes from sloppy code. It argues that a token-margined inverse design makes the same volatile asset carry too many jobs at once: collateral, exposure, inventory, payout, fees, and insurance.

## Why The Failures Reinforce

Each failure is easier to understand alone, but the risk becomes dangerous because they cluster. Reflexive collateral weakens when the market moves. Negative convexity expands the token-denominated payout obligation. LPs are short volatility. Oracle defenses can create latency arbitrage or open flash-manipulation paths. If the system then uses ADL, it preserves accounting by weakening payout credibility.

That is why this conclusion page should route readers into the detailed mechanics rather than replace them. The list is a map of the failure stack.

## Reader Implication

When a reader asks for the short version of the Percolator critique, route here. The answer is that the failure modes are not seven disconnected bugs; they are seven consequences of concentrating low-cap perp risk in a token-margined inverse architecture.

## Publication Boundary

This page summarizes Neelo's failure-mode synthesis. It does not publish live Percolator risk parameters, current exploitability, market balances, ADL behavior, liquidation behavior, or Vibe comparative guarantees without separate primary-source/operator/risk/security review.

## Sources

- `vibe-papers`: Neelo, "Section 10: Conclusion", "10.1 Summary of Failure Modes".

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-linear-pnl-versus-hyperbolic-payout`
- `authored-adl-haircut-controlled-crash`
