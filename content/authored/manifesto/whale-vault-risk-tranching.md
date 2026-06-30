---
id: "authored-whale-vault-risk-tranching"
title: "Whale Vaults And Risk Tranching"
section: "manifesto"
track: "05 - Proof Of Value"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/06-hybrid-solver-model"]
relatedGeneratedPages: ["neelo-02-proof-of-value-02-docs-06-hybrid-solver-model", "section-02-proof-of-value-02-docs-06-hybrid-solver-model-6-3-whale-vaults-risk-tranching", "authored-token-holder-inventory-alignment"]
---

# Whale Vaults And Risk Tranching

The proof-of-value source introduces whale vaults as a way to separate who is best positioned to bear which risk.

In the source model, large holders or project-side inventory providers contribute token inventory. The solver contributes execution, pricing, stable settlement capacity, and backstop logic. That division matters because a token holder already bears directional exposure to the asset, while a generic stablecoin LP may demand a much higher premium to underwrite the same low-cap tail risk.

The vault concept is therefore not only "more collateral." It is risk tranching. Token-side inventory absorbs market-specific directional risk. Solver and settlement infrastructure handle execution and cashflow boundaries. External solvers can still compete when they can hedge or price the flow better.

## Publication Boundary

The source also discusses covered-perp language and perpetual fee sharing. Those are not final public commitments until current vault terms, revenue disclosure, LP rights, inventory custody, and loss allocation are operator-approved. The publishable principle is narrower: use the capital source that naturally owns the risk, and keep settlement risk distinct from token inventory risk.

## Sources

- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.3 Whale Vaults: Risk Tranching".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-usdc-settlement-inventory-separation`
- `authored-risk-adjusted-capital-efficiency`
