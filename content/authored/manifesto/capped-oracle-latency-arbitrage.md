---
id: "authored-capped-oracle-latency-arbitrage"
title: "Capped Oracle Latency Arbitrage"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-current-source-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/05-oracle-manipulation-death-spiral"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-05-oracle-manipulation-death-spiral", "authored-oracle-circuit-breaker-paradox", "authored-passive-matcher-vulnerability"]
---

# Capped Oracle Latency Arbitrage

The circuit-breaker paradox becomes concrete when a capped oracle moves toward a known external price. Neelo's source uses a Percolator SOV example with a per-push update cap. If the real DEX price jumps faster than the oracle can update, an attacker can observe the destination before the on-chain price arrives.

In the source sequence, the real price jumps from `$1.00` toward `$1.50`, while the capped oracle advances in smaller steps. A trader can open a leveraged long at the lagging oracle price, wait as the oracle catches up, and close after the deterministic path has already become visible.

## Why This Is Different From Ordinary Staleness

Ordinary stale data is bad because the price is old. A capped catch-up path is worse in one respect: the attacker may know not only that the oracle is stale, but also the direction it must travel if the external market remains there.

That turns a protective mechanism into a predictable latency-arbitrage surface. The circuit breaker reduces flash-loan manipulation risk, but it can create a window where informed traders buy a winning ticket after the outcome is already visible off-chain.

## Publication Boundary

Percolator-specific cap values, data vendors, current deployment state, and live exploitability require fresh primary-source review before publication. The durable lesson is architectural: capped oracle motion can protect against one attack while creating another.

## Sources

- `vibe-papers`: Neelo, "Section 5: Oracle Paradox, Manipulation, and Death Spiral", "5.2 The Circuit Breaker Paradox".

## Related Pages

- `authored-oracle-circuit-breaker-paradox`
- `authored-oracle-trilemma`
- `authored-passive-matcher-vulnerability`
