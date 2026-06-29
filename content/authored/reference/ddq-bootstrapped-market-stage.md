---
id: "authored-ddq-bootstrapped-market-stage"
title: "DDQ Bootstrapped Market Stage"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "authored-lp-ignition-capital-lifecycle", "authored-conservative-launch-collateralization"]
---

# DDQ Bootstrapped Market Stage

The DDQ Attractiveness for LPs source describes the first market phase as the bootstrapped stage: fully asynchronous execution supported by LP deposits and conservative risk limits.

This is the phase where a market is real enough to quote, but not mature enough to assume deep two-sided flow. The solver and LP capacity carry more of the market-formation burden because natural longs and shorts may not yet arrive at the same time, size, and price.

## What LP Deposits Do Here

At launch, LP deposits provide initial liquidity and hedging capacity. They are not merely passive yield assets. They help the solver make the first market safely enough to collect trade history, observe liquidity behavior, test hedge routes, and discover whether demand is durable.

The source frames this as ignition capital. LP deposits help a market start. The long-term goal is not permanent dependence on LP balance sheet, but a transition toward more trader-to-trader netting as the market proves itself.

## Reader Implication

For traders, the bootstrapped stage can mean tighter limits, wider spreads, lower leverage, or more conservative quote behavior. Those constraints are part of launch safety, not necessarily a sign that the market failed.

For projects and LPs, the practical question is whether the market can produce the evidence needed to move out of this stage: real flow, healthier liquidity, fewer manipulation signals, and enough netting that the solver's residual role can shrink over time.

## Publication Boundary

Do not publish final launch-stage deposit requirements, leverage bands, open-interest caps, vault utilization targets, or market-opening criteria without operator and implementation review. The source-backed claim is stage-level: early markets use LP deposits and conservative risk limits to bootstrap asynchronous trading.

## Sources

- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".

## Related Pages

- `authored-lp-ignition-capital-lifecycle`
- `authored-conservative-launch-collateralization`
- `authored-ddq-asynchronous-matching-engine`
- `neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps`
