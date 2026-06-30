---
id: "authored-distressed-position-buyout-continuity"
title: "Distressed Position Buyout Continuity"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/i-solver-default", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/ii-trader-compensation"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-ii-trader-compensation", "authored-trader-compensation-continuity-model"]
---

# Distressed Position Buyout Continuity

The DDQ's preferred third-party solver-default outcome is continuity, not simply payout-and-close.

If a third-party solver becomes distressed or liquidatable, the source describes a buyout path where a healthy solver can assume the distressed positions. The protocol-owned solver can act as buyer of last resort in that model. In a mature multi-solver environment, the source also describes a competitive auction where active solvers can bid for the positions and inherit the counterparty obligations.

The user-facing reason is practical. Traders care about their position lifecycle. If every solver default forced position closure, users would inherit timing risk, slippage, and the need to rebuild exposure during a disrupted market. A buyout path can preserve the position, margin, funding, and PnL state while replacing the counterparty behind it.

The source's continuity design also clarifies why CVA and buyout are complementary. CVA compensates default risk. Buyout keeps the trade alive where a healthy counterparty can take over.

## Publication Boundary

This page should not publish a live buyout probability, auction rule, discount formula, solver eligibility standard, or guarantee that user positions always continue after a solver default. It documents the DDQ model; implementation details require review before publication as current production behavior.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver default: Optional continuity mechanism".
- `vibe-papers`: Neelo DDQ, "Trader Compensation - position buyout and auction mechanism".

## Related Pages

- `authored-trader-compensation-continuity-model`
- `authored-solver-cva-compensation-buffer`
- `authored-protocol-owned-solver-depletion-boundary`
