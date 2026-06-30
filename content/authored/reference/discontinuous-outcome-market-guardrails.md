---
id: "authored-discontinuous-outcome-market-guardrails"
title: "Discontinuous-Outcome Market Guardrails"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/b-hedging-risks/hedging-risk-considerations"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations", "authored-tail-event-profit-cap-emergency-brake", "authored-solver-refusal-as-oracle-defense"]
---

# Discontinuous-Outcome Market Guardrails

The DDQ hedging-risk source connects liquidity integrity to markets with discontinuous outcomes. Some markets do not deteriorate smoothly. Liquidity can vanish, price regimes can jump, and the reference state can change faster than ordinary hedging or liquidation can clear.

That matters for prediction-like markets, event-driven assets, and low-cap tokens with rug or liquidity-pull risk. The solver cannot safely treat every market as though prices move in small, continuous increments.

## Why Explicit Guardrails Matter

Discontinuous markets require explicit state transitions. A normal quote can become unsafe if the solver sees unreliable price formation, abnormal market behavior, or a sudden loss of executable depth. In those states, widening a spread may not be enough; the correct response can be refusal, freeze, emergency settlement logic, or market shutdown.

The source's point is that these controls make the solver engine more suitable for markets where sudden regime shifts are expected. The system needs rules for when the market has stopped being normally hedgeable.

## Reader Implication

For users, this explains why a permissionless market can feel conservative around the exact moments when speculation is most intense. The system is trying to distinguish tradable volatility from integrity failure.

For protocol reviewers, this page separates discontinuity risk from ordinary volatility. Volatility can be priced. A discontinuity may require a mode switch.

## Publication Boundary

Do not publish final prediction-market support, event categories, oracle policy, freeze criteria, settlement evidence, market-resolution rules, or discontinuity thresholds without operator and implementation review. The source-backed claim is that discontinuous markets need automated guardrails, not that every such market is already production-supported.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver Hedging Risk Considerations".

## Related Pages

- `authored-tail-event-profit-cap-emergency-brake`
- `authored-solver-refusal-as-oracle-defense`
- `authored-liquidity-collapse-freeze-logic`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations`
