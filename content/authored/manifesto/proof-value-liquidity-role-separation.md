---
id: "authored-proof-value-liquidity-role-separation"
title: "Liquidity Is Two Jobs, Not One"
section: "manifesto"
track: "13 — Proof of Value Framework"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition"]
relatedGeneratedPages: ["section-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition-3-1-the-core-design-insight", "authored-solver-funded-usdc-capital-loop", "authored-token-holder-inventory-alignment"]
---

# Liquidity Is Two Jobs, Not One

Neelo's Proof of Value framework starts the LP argument by separating two roles that are often collapsed into one word: stablecoin liquidity and token inventory.

Stablecoin liquidity supports settlement, hedging, cross-chain operations, and short operational capital cycles. Token inventory supports the specific market being created. Those roles have different risk profiles, different natural providers, and different failure paths.

That distinction is the core design insight. If a protocol asks one generic pool to do every job, the documentation may look simpler, but the risk explanation becomes worse. Readers cannot tell whether capital is settling trades, absorbing bad debt, providing inventory, funding hedges, or warehousing directional exposure.

## Why The Split Matters

In the source model, solver- or protocol-funded stablecoin capital handles the settlement and hedging side. Token holders, projects, whales, and treasuries provide inventory for the asset they already hold. The point is not that either role is risk-free. The point is that each role is assigned to the participant best positioned to understand and bear it.

This helps the compendium avoid a lazy liquidity story. "More liquidity" is not enough. A permissionless perp market needs the right type of capital in the right place: stable settlement capital for realized obligations, market-specific inventory for exposure management, and solver judgment for quote acceptance and hedging.

## Publication Boundary

This page documents the source-backed role separation. Do not publish final solver funding sources, token-vault rights, reserve requirements, rehypothecation policy, fee split, or loss-ordering semantics until operator, accounting, legal, and implementation review approve the live wording.

## Sources

- `vibe-papers`: Neelo, "Section 3: LP Value Proposition", "The Core Design Insight".

## Related Pages

- `authored-solver-funded-usdc-capital-loop`
- `authored-token-holder-inventory-alignment`
- `authored-usdc-settlement-inventory-separation`
