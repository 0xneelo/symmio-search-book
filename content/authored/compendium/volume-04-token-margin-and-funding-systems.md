---
id: "authored-volume-04-token-margin-and-funding-systems"
title: "Volume 04: Token Margin, Pillars, And Funding Systems"
section: "compendium"
track: "Volume 04"
status: "publication-candidate"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["spec-02", "spec-03", "vibe-papers", "vibe-architecture"]
sourceUrls: ["_specs/app-docs/02-narrative-thesis.md", "_specs/app-docs/03-grounding.md", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-abstract", "https://docs.vibe.trading/architectural-overview.md"]
relatedGeneratedPages: ["authored-vibe-pillars", "authored-token-vault-perps-versus-usdc-pools", "vibe-architecture-amfq", "neelo-15-funding-model-15-docs-01-abstract"]
---

# Volume 04: Token Margin, Pillars, And Funding Systems

This volume turns the market thesis into infrastructure. If Vibe is a way to bootstrap derivative markets for token communities, then inventory, margin, funding, solver pricing, and settlement cost are not back-office details. They are the mechanism that makes the thesis legible.

The token-margin material is important because Vibe is not simply "USDC perps with more listings." The system asks whether project treasuries, whales, LPs, and solvers can use token inventory as market-formation capital while keeping the risk bounded and understandable.

## What This Volume Does

- It explains why collateral form changes the economics of market bootstrap.
- It connects the three Vibe pillars to the operational design of intent-based markets.
- It frames funding and utilization as signals about inventory pressure, not decorative finance jargon.
- It prepares readers for the solver, LP, and protocol operations volume.

## Reader Implication

If you are a treasury or LP, read this volume before the case studies. It is where the docs clarify what kind of capital is being contributed, what risk it absorbs, and how the system should report that risk.

## Sources

- `spec-02`: Architecture and product-system requirements.
- `spec-03`: Product economics and Phase B grounding.
- `vibe-papers`: Neelo token-margin, Vibe pillars, and funding-model papers.
- `vibe-architecture`: Public Vibe architecture source.

## Related Pages

- `authored-vibe-pillars`
- `authored-token-vault-perps-versus-usdc-pools`
- `vibe-architecture-amfq`
- `neelo-15-funding-model-15-docs-01-abstract`
