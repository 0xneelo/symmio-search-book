---
id: "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-solver-worst-case-scenarios"
title: "Solver Worst-Case scenarios"
section: "vision-papers"
track: "08 - Due Diligence Questionnaire"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/solver-worst-case-scenarios"]
sourcePath: "Docs/public/08_due_diligence_questionnaire/08_docs/Solver_worst_case_scenarios/Solver Worst-Case scenarios.md"
---

# Solver Worst-Case scenarios

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/solver-worst-case-scenarios

## Source Draft

This section documents the protocol’s primary “worst-case” and tail-risk scenarios involving the solver, with a focus on two questions: **(i) how user positions remain safe and closeable when off-chain components fail**, and **(ii) how losses are bounded and allocated when markets experience extreme volatility or adversarial conditions**.

At a high level, Vibe is designed around an intent/RFQ execution model where the solver quotes, nets long/short flow asynchronously, and hedges residual exposure using internal inventory, LP vault liquidity, and (where appropriate) external venue execution. In normal conditions, traders largely pay each other (netted flow). In stressed conditions, the system relies on explicit guardrails: conservative market bootstrapping (high protocol-side collateralization at launch), dynamic risk parameters (spreads/funding/limits), insurance allocation policy (local + pro rata global), and—only in absolute tail events—profit caps and forced de-risking mechanisms to prevent uncontrolled loss propagation.

Operationally, the key worst-case failure mode is solver unresponsiveness. To address this, the protocol provides a **trust-minimized Force Close escape hatch**: if the solver is offline, users can submit an on-chain request and close specific positions (“surgically”) using a proof from a decentralized node network within minutes, rather than waiting for prolonged operator downtime. This section also benchmarks similar recovery systems in other protocols (e.g., Lighter’s desert-mode pathway) to clarify tradeoffs and highlight why Vibe’s Force Close is built for leveraged-trading continuity rather than only long-horizon fund recovery.

Finally, this section covers financial worst cases: solver hedging failure modes (liquidity gaps, basis risk, and execution constraints), solver default scenarios under high volatility (strict liquidation vs. soft liquidation/margin-call flows, and protocol-operated solver bootstrapping posture), and the corresponding **loss absorption waterfall** (trader margin first, then solver/LP hedging resources as applicable, then local insurance, then pro rata global insurance), with explicit hard stops intended to protect LPs and protocol capital in adversarial markets.
