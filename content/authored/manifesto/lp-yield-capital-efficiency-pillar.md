---
id: "authored-lp-yield-capital-efficiency-pillar"
title: "LP Yield And Capital Efficiency"
section: "manifesto"
track: "07 — Architecture Thesis"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/04-pillar-three-lp-yield-and-capital-efficiency"]
relatedGeneratedPages: ["neelo-10-vibe-pillars-10-docs-04-pillar-three-lp-yield-and-capital-efficiency", "authored-vibe-pillars", "authored-lp-profit-and-dynamic-pricing"]
---

# LP Yield And Capital Efficiency

The third Vibe pillar asks why the capital supporting an early market should stay.

If a solver, maker, vault, or designated residual counterparty helps bootstrap a market, that capital is doing real work. It may warehouse inventory, absorb directional exposure, fund stable collateral, or support quotes while natural flow is one-sided.

## Yield As Survival Test

Neelo's pillar paper makes the economic point directly: low-cap perps cannot rely on large amounts of idle capital earning weak or inconsistent yield. The long tail breaks if every market requires too much passive balance sheet.

So the question is not whether LPs can earn yield in a generic sense. The question is whether they can earn enough risk-adjusted return to justify thin-market volatility, adverse selection, and residual counterparty exposure.

## Capital Efficiency

Capital efficiency links the third pillar back to the first two. A highly safe system that cannot pay its makers will not scale. A highly bootstrappable system that burns too much capital per market will not persist.

This is why the compendium should treat LP economics as architecture, not as a reward table. The yield layer is proof that the system can keep real risk-bearing capital engaged.

## Publication Boundary

This page publishes the architectural role of risk-adjusted yield. Exact public Vibe economics, LP profit share, fee routing, solver compensation, vault rights, Phase B revenue disclosures, and live yield claims remain operator/accounting/legal/risk/implementation review items.

## Sources

- `vibe-papers`: Neelo, "Pillar Three: LP Yield and Capital Efficiency".

## Related Pages

- `authored-vibe-pillars`
- `authored-lp-profit-and-dynamic-pricing`
- `authored-token-vault-perps-versus-usdc-pools`
- `neelo-10-vibe-pillars-10-docs-04-pillar-three-lp-yield-and-capital-efficiency`
