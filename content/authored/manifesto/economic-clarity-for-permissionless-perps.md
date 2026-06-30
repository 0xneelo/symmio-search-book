---
id: "authored-economic-clarity-for-permissionless-perps"
title: "Economic Clarity For Permissionless Perps"
section: "manifesto"
track: "05 — Proof Of Value"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/02-framework", "https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/05-economic-clarity"]
relatedGeneratedPages: ["neelo-13-framework-value-permissionless-perps-13-docs-02-framework", "neelo-13-framework-value-permissionless-perps-13-docs-05-economic-clarity", "authored-liquidity-as-trader-experience", "authored-solver-owned-market-maker"]
---

# Economic Clarity For Permissionless Perps

Permissionless derivatives only work if the docs can answer a hard question clearly: who bears risk, when, and how?

Neelo's value framework names four constituencies: LPs, traders, projects, and the broader ecosystem. The design is only durable if value and risk are aligned across them. Traders need execution, payout certainty, hedging, and market access. Projects need a way to turn inventory into useful market structure. LPs need yield that fits the risk they already hold. Solvers need enough edge to warehouse and hedge residual exposure.

The economic-clarity source decomposes a perp fill into netted and un-netted exposure. When flow is balanced, value transfers between traders. When flow is imbalanced, the solver temporarily warehouses residual exposure and hedges or uses liquidity resources according to the venue's disclosed risk terms. That distinction is central to trust. Readers should know whether a position is trader-to-trader, trader-to-solver, or partly both.

The source-backed principle is already usable: a credible permissionless perp market has to document risk allocation before asking sophisticated users to trust the market.

## Reader Implication

The docs should make every market legible in due-diligence terms: who backs the fill, how imbalance is hedged, where losses go, and when ADL or insurance enters the picture. If those answers are unclear, the market is not self-serve for serious participants.

## Publication Boundary

Publish the risk-allocation principle, not final commercial terms. Exact Vibe economics, revenue shares, vault terms, solver obligations, insurance/ADL waterfalls, and any market-specific guarantee need approved production sources before they become public reference claims.

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Value Dimensions".
- `vibe-papers`: Neelo, "Section 5: Economic Clarity".

## Related Pages

- `authored-liquidity-as-trader-experience`
- `authored-solver-owned-market-maker`
- `authored-token-margined-reflexivity-risk`
