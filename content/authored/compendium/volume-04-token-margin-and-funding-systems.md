---
id: "authored-volume-04-token-margin-and-funding-systems"
title: "Volume 04: Token Margin, Pillars, And Funding Systems"
section: "compendium"
track: "Volume 04"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers", "vibe-architecture", "spec-02", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-abstract", "https://docs.vibe.trading/architectural-overview.md", "_specs/app-docs/02-narrative-thesis.md", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["authored-vibe-pillars", "authored-token-vault-perps-versus-usdc-pools", "authored-required-risk-premium-for-usdc-lps", "authored-percolator-dissertation-source-map", "authored-percolator-section-fragments-source-map", "authored-funding-model-reading-boundary", "authored-funding-derivation-document-index", "authored-funding-worked-examples-reading-guide", "authored-funding-defense-hierarchy"]
---

# Volume 04: Token Margin, Pillars, And Funding Systems

This volume turns the market thesis into infrastructure. If Vibe is a way to bootstrap derivative markets for token communities, then inventory, margin, funding, solver pricing, and settlement cost are not back-office details. They are the mechanism that makes the thesis legible.

The token-margin material is important because Vibe is not simply "USDC perps with more listings." The system asks whether project treasuries, whales, LPs, and solvers can use token inventory as market-formation capital while keeping the risk bounded and understandable.

## What This Volume Does

- It explains why collateral form changes the economics of market bootstrap.
- It connects the three Vibe pillars to the operational design of intent-based markets.
- It frames funding and utilization as signals about inventory pressure, not decorative finance jargon.
- It prepares readers for the solver, LP, and protocol operations volume.

## Reading Order

Start with `authored-vibe-pillars`. That page gives the design frame for the whole volume: bootstrap and counterparty formation, exploit resistance, and LP yield with capital efficiency have to work together. A market that lists but cannot defend itself is not healthy; a market that defends itself but cannot pay risk capital is not durable.

Then read the collateral path: `authored-token-vault-perps-versus-usdc-pools`, `authored-usdc-settlement-inventory-separation`, and `authored-required-risk-premium-for-usdc-lps`. This path separates two questions that are often blurred. Token inventory can help form markets, but settlement credibility and LP compensation still have to be priced in a unit and risk model that can survive low-cap volatility.

Use `authored-required-risk-premium-for-usdc-lps` when the reader asks about USDC backstop economics. It routes component questions into expected loss, opportunity cost, adverse selection, break-even APR, and high-APR sustainability without treating model output as final Vibe LP terms.

Next read the Percolator critique path: `authored-percolator-dissertation-source-map`, `authored-percolator-section-fragments-source-map`, `authored-token-margined-reflexivity-risk`, `authored-percolator-engineering-vs-economics`, and `authored-percolator-seven-failure-mode-synthesis`. This path is a fair comparison point. It credits token-margined on-chain engineering where the source credits it, then asks whether same-asset collateral, inverse payout, LP constraints, oracle fragility, and token-denominated insurance are suitable for volatile long-tail markets.

Finish with the funding-control path: `authored-funding-model-reading-boundary`, `authored-funding-derivation-document-index`, `authored-funding-core-invariant`, `authored-funding-state-variable-map`, `authored-funding-rate-regime-model`, `authored-funding-full-objective`, `authored-funding-defense-hierarchy`, and `authored-funding-worked-examples-reading-guide`. This path turns the volume from collateral design into operations: observe market state, identify exposure, apply funding/spread/borrow controls, spend insurance carefully, and treat ADL as a final solvency tool.

## Reader Implication

If you are a treasury or LP, read this volume before the case studies. It is where the docs clarify what kind of capital is being contributed, what risk it absorbs, and how the system should report that risk.

## Publication Boundary

Treat this volume as the compendium's collateral, funding, and risk-control spine, not as a live parameter sheet. Exact APR ranges, expected-loss ranges, adverse-selection premiums, live LP terms, fee levels, funding rates, spread policy, borrow policy, insurance budgets, ADL thresholds, Percolator live parameters, Vibe vault rights, solver funding sources, loss ordering, reserve policy, partner claims, market eligibility, and graduation thresholds remain source-model, implementation, risk, legal, accounting, security, and operator review items before publication as current facts.

## Sources

- `vibe-papers`: Neelo token-margin, Vibe pillars, and funding-model papers.
- `vibe-architecture`: Public Vibe architecture source.
- `spec-02`: Architecture and product-system requirements.
- `spec-03`: Product economics and Phase B grounding.

## Related Pages

- `authored-vibe-pillars`
- `authored-token-vault-perps-versus-usdc-pools`
- `authored-required-risk-premium-for-usdc-lps`
- `authored-percolator-dissertation-source-map`
- `authored-percolator-section-fragments-source-map`
- `authored-funding-model-reading-boundary`
- `authored-funding-derivation-document-index`
- `authored-funding-worked-examples-reading-guide`
