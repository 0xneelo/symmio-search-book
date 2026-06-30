---
id: "authored-ddq-asynchronous-matching-engine"
title: "DDQ Asynchronous Matching Engine"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/risk-walthrough"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-risk-walthrough", "authored-bootstrap-counterparty-pillar"]
---

# DDQ Asynchronous Matching Engine

The DDQ introduction says the solver manages the perpetuals layer as an asynchronous matching engine. It tries to match long and short trader flow without requiring both sides to arrive at the same moment in an order book.

When opposing flow exists, exposure can be netted between traders. When opposing flow is missing, the solver may temporarily act as residual counterparty, using the hybrid margin/perps design and available vault liquidity under defined constraints.

## Why Asynchronous Matching Exists

Long-tail markets have intermittent demand. One trader may want exposure before an equal and opposite trader arrives. A pure synchronous book can fail at market birth because it needs the other side to exist now, at the right size and price.

An asynchronous engine can serve that early demand by letting a solver bridge time mismatch. The solver's job is then to decide whether the request is safe, whether it can be hedged or backed, how much spread or funding is required, and when new flow can net the exposure down.

## Reader Implication

For traders, asynchronous matching explains why an early market can quote before it has mature book depth, but also why capacity and pricing are risk-dependent. The fill is not magic liquidity. It is a managed counterparty path.

For solvers and LPs, this page explains why residual exposure is a temporary and controlled state rather than the desired endpoint. As markets mature, the system should move toward more trader-to-trader netting and less balance-sheet burden.

## Publication Boundary

Do not publish final netting guarantees, matching priority, solver inventory limits, funding rules, residual-exposure duration, or closeout sequencing without operator and implementation review. The source-backed claim is the execution model: the solver can bridge asynchronous flow and net opposing positions when available.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".
- `vibe-papers`: Neelo DDQ, "Risk Walkthrough".

## Related Pages

- `authored-bootstrap-counterparty-pillar`
- `authored-netting-state-risk-transfer`
- `authored-internal-netting-before-external-execution`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`
