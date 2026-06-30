---
id: "authored-ddq-margin-protocol-role"
title: "DDQ Margin Protocol Role"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "authored-ddq-architecture-stack", "authored-vibe-collateral-and-margining"]
---

# DDQ Margin Protocol Role

The DDQ introduction names margin trading as one of the six primitives in the Vibe architecture stack. Its role is collateral discipline: define what backs a position, what can be lost, and when a position becomes unsafe.

That does not mean Vibe should be explained as a simple on-chain margin vault. The same source criticizes earlier permissionless margin experiments for needing near 1:1 backing at execution time. That model can make leverage expensive, reduce market depth, and widen spreads. It can also expose stablecoin vaults to attacks where a trader builds spot exposure, opens leverage, and then stresses the backing pool through spot selling.

## Why Margin Still Matters

Margin mechanics are still necessary because leveraged markets need enforceable downside boundaries. Traders need collateral, accounts need health checks, and the system needs a way to decide when exposure should be reduced or liquidated.

The DDQ's point is that margin alone is not enough for permissionless long-tail perps. If every market requires full stablecoin backing from generic LPs, then the system may become safe only by becoming too capital hungry to scale. Margin has to be combined with solver risk checks, token inventory, and perpetual-market mechanics.

## Reader Implication

When a reader asks "is this margin trading or perps?", the answer should not force a false binary. The margin layer supplies collateral and liquidation semantics. The perpetuals layer supplies ongoing position lifecycle. The solver and vault stack decide whether residual exposure can be quoted safely.

For user-facing docs, margin pages should therefore explain account health, locked collateral, CVA or buffer concepts where relevant, liquidation distance, and withdrawal constraints. They should not imply that margin collateral by itself solves long-tail market bootstrapping.

## Publication Boundary

Do not publish final margin formulas, maintenance thresholds, CVA sizing, liquidation fees, account-isolation rules, or contract-level enforcement details without operator and implementation review. The source-backed claim is architectural: margin discipline is one primitive in a hybrid system, not the whole system.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".

## Related Pages

- `authored-ddq-architecture-stack`
- `authored-vibe-collateral-and-margining`
- `authored-collateral-margin-cva`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`
