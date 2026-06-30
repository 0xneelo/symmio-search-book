---
id: "authored-ddq-execution-netting-risk-split"
title: "DDQ Execution And Netting Risk Split"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "authored-netting-state-risk-transfer", "authored-ddq-asynchronous-matching-engine"]
---

# DDQ Execution And Netting Risk Split

After order submission, the DDQ walkthrough moves to execution and netting. The solver fills the order and attempts to match it against opposing trader flow.

This is where the risk split becomes visible. The netted portion is trader-to-trader risk: a winning long is paid by a losing short, or a winning short is paid by a losing long. The un-netted portion is temporarily solver-to-trader risk until the solver hedges, rebalances, or attracts offsetting flow.

## Partial Netting Is Normal

The source does not require a market to be only 100 percent netted or 0 percent netted. Real flow can be a blend. A fill may be partly matched by existing opposing interest and partly warehoused by the solver while the market matures.

That is why the solver is described elsewhere as an asynchronous matching engine. It can bridge time-mismatched flow without forcing every market to behave like a mature order book from day one.

## Reader Implication

When a reader asks what changes at execution, route them to the risk split:

- netted exposure means directional PnL moves between traders;
- un-netted exposure means the solver is the effective counterparty for the residual until risk is hedged or rebalanced;
- most live states are blends, so the answer is often proportional rather than binary.

This is also the clean way to explain why a solver can be essential without saying "the solver always takes the other side." The solver operates the matching and residual-risk layer. The amount of residual exposure depends on current flow.

## Publication Boundary

Do not publish final netting priority, matching formulas, hedge timing, allocation rules, or per-market residual-exposure limits without operator and implementation review. The source-backed claim is the lifecycle distinction between netted trader-to-trader exposure and un-netted solver-to-trader residual exposure.

## Sources

- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".

## Related Pages

- `authored-netting-state-risk-transfer`
- `authored-ddq-asynchronous-matching-engine`
- `authored-internal-netting-before-external-execution`
- `neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes`
