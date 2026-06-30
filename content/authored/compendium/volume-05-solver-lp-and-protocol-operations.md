---
id: "authored-volume-05-solver-lp-and-protocol-operations"
title: "Volume 05: Solver, LP, And Protocol Operations"
section: "compendium"
track: "Volume 05"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["spec-02", "spec-03", "vibe-papers", "symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["_specs/app-docs/02-narrative-thesis.md", "_specs/app-docs/03-grounding.md", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive", "https://0xneelo.github.io/vibe_docs/docs/08-ddq/08-docs/00-abstract", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/01-executive-summary", "https://docs.symm.io/"]
relatedGeneratedPages: ["authored-technical-architecture-layer-map", "authored-settlement-state-boundary", "authored-solver-engine-operating-loop", "authored-solver-quote-risk-engines", "authored-ddq-source-table-of-contents", "authored-solver-worst-case-scenarios-source-map", "authored-force-close-versus-escape-mode", "authored-symm-lp-document-map", "authored-symm-lp-executive-what-happened", "authored-intents-and-solvers", "authored-lp-profit-and-dynamic-pricing", "authored-symmio-party-a-party-b", "neelo-12-case-study-symm-lp-12-docs-01-executive-summary"]
---

# Volume 05: Solver, LP, And Protocol Operations

This volume is the operating manual for the people who make the market real. Intents are only useful if someone can quote them, hedge them, settle them, and survive the risk. That means solvers, LPs, PartyA/PartyB roles, and Symmio settlement mechanics belong in the same reader path.

The DDQ and SYMM LP case study are especially useful because they make the economics concrete. They show how inventory, skew, realized debt, unrealized PnL, and daily yield can be discussed without pretending one favorable period is a permanent return profile.

## What This Volume Does

- It explains solvers and LPs as market-formation actors, not anonymous infrastructure.
- It connects Vibe's quote and inventory logic to Symmio's PartyA/PartyB settlement model.
- It turns case-study evidence into guarded, source-cited economic reasoning.
- It separates protocol mechanics from operator decisions that still need reconciliation.

## Reading Order

Start with the architecture boundary: `authored-technical-architecture-layer-map`, `authored-settlement-state-boundary`, `authored-settlement-contract-responsibility-map`, `authored-position-lifecycle-state-machine`, and `authored-technical-security-model`. These pages separate durable on-chain financial state from solver-operated quote, risk, matching, hedging, and monitoring functions. That separation is the base constraint for the whole volume.

Then read the solver operating path: `authored-solver-engine-operating-loop`, `authored-solver-quote-risk-engines`, `authored-external-solver-first-look`, `authored-safety-premium-backstop-quotes`, `authored-pass-through-execution-boundary`, `authored-twap-inventory-rebalancing`, and `authored-lp-capacity-rent-model`. This path explains why the solver is neither a magical counterparty nor a passive router. It is the actor that prices flow, allocates first look, widens or refuses when risk is expensive, uses external execution where appropriate, and pays LPs for usable capacity.

Use the DDQ path when the reader needs diligence language rather than the high-level solver thesis: `authored-ddq-source-table-of-contents`, `authored-ddq-architecture-stack`, `authored-ddq-hybrid-liquidity-model`, `authored-ddq-execution-netting-risk-split`, `authored-netting-state-risk-transfer`, and `authored-rfq-risk-tuning`. These pages translate the source into allocator, partner, solver, and risk-review questions: who owns each lifecycle step, where risk transfers, when matching can net exposure, and when RFQ-style discretion is needed.

Next read the failure and loss-handling path: `authored-solver-worst-case-scenarios-source-map`, `authored-force-close-versus-escape-mode`, `authored-strict-solver-liquidation-mode`, `authored-soft-solver-liquidation-mode`, `authored-protocol-owned-solver-depletion-boundary`, `authored-solver-cva-compensation-buffer`, and `authored-distressed-position-buyout-continuity`. Follow that with `authored-losing-trader-first-loss`, `authored-solver-hedging-resource-buffer`, `authored-lp-vault-capacity-exposure-boundary`, `authored-ddq-local-insurance-tail-buffer`, and `authored-market-tier-loss-limits`. This path makes the operational promise credible by showing what happens when liquidity, solver balance sheet, or market state gets worse.

Finish with the SYMM LP case-study path: `authored-symm-lp-document-map`, `authored-symm-lp-setup-reading-boundary`, `authored-symm-lp-executive-what-happened`, `authored-symm-lp-current-debt-and-upnl`, `authored-symm-lp-realized-marked-pnl-split`, `authored-symm-lp-benchmark-reading`, `authored-symm-lp-low-volume-driver`, `authored-symm-lp-regime-dependence`, and `authored-symm-lp-validation-phase-reporting`. This path is not a yield ad. It is a proof-of-mechanism case study that shows how to discuss LP outcomes, accounting signs, benchmark comparison, and reporting discipline from a bounded data cut.

## Reader Implication

If you price risk, contribute inventory, or integrate with settlement infrastructure, this is the practical center of the compendium. Read it after the thesis and collateral/funding volumes and before the dashboard/economics reference.

## Publication Boundary

Treat this volume as the compendium's solver, LP, lifecycle, and case-study operations spine, not as a live risk manual or final LP term sheet. Exact contract interfaces, oracle thresholds, solver routing and quote policy, hedging venues, TWAP behavior, slippage allocation, vault rights, Force Close timers, proof-network details, liquidation thresholds, CVA sizing, insurance formulas, local/global loss allocation, ADL behavior, LP yield claims, partner traction, fee shares, live capacity, and SYMM LP performance extrapolation remain implementation, risk, legal, accounting, security, product, and operator review items before publication as current facts.

## Sources

- `spec-02`: Intents, solvers, and Symmio architecture requirements.
- `spec-03`: LP, solver, and Phase B economics grounding.
- `vibe-papers`: Neelo technical deep-dive, DDQ, and SYMM LP case-study papers.
- `symmio-core`: Symmio core protocol docs.
- `symmio-intent-lifecycle`: Symmio intent lifecycle docs.

## Related Pages

- `authored-technical-architecture-layer-map`
- `authored-solver-engine-operating-loop`
- `authored-ddq-source-table-of-contents`
- `authored-solver-worst-case-scenarios-source-map`
- `authored-force-close-versus-escape-mode`
- `authored-symm-lp-document-map`
- `authored-intents-and-solvers`
- `authored-lp-profit-and-dynamic-pricing`
- `authored-symmio-party-a-party-b`
- `neelo-12-case-study-symm-lp-12-docs-01-executive-summary`
