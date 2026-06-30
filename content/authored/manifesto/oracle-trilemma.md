---
id: "authored-oracle-trilemma"
title: "The Oracle Trilemma"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/05-oracle-manipulation-death-spiral"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-05-oracle-manipulation-death-spiral", "authored-oracle-circuit-breaker-paradox", "authored-passive-matcher-vulnerability"]
---

# The Oracle Trilemma

Neelo's Percolator oracle source frames low-cap on-chain derivatives as a trilemma. A market wants guaranteed execution, fair pricing, and LP safety, but the source argues the system can reliably hold only two at once.

Guaranteed execution means users can always trade. Fair pricing means execution occurs at market value. LP safety means informed flow cannot drain the backing account by trading against stale or manipulable prices.

## Why The Three Goals Conflict

If the protocol always executes against an oracle, traders get predictable access, but LPs can be exposed when the oracle is stale, capped, or manipulated. If the protocol rejects trades during volatility, LPs are safer, but execution is no longer guaranteed. If the protocol relies on dynamic or discretionary quotes, pricing can become safer, but the system has moved away from a purely passive on-chain matcher.

The trilemma is useful because it prevents fake simplicity. The question is not "which oracle is best?" It is which tradeoff the market chooses when real-world price, on-chain update cadence, and adversarial flow diverge.

## Reader Implication

Docs should explain oracle design as a market-structure choice, not a data plumbing detail. A reader asking why a quote widened, disappeared, or diverged from a simple oracle price should see the trilemma before seeing implementation parameters.

## Sources

- `vibe-papers`: Neelo, "Section 5: Oracle Paradox, Manipulation, and Death Spiral", "5.1 The Oracle Trilemma".

## Related Pages

- `authored-oracle-circuit-breaker-paradox`
- `authored-passive-matcher-vulnerability`
- `authored-solver-refusal-as-oracle-defense`
