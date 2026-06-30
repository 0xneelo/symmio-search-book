---
id: "authored-slab-isolation-capital-inefficiency"
title: "Slab Isolation And Capital Inefficiency"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/06-capital-and-historical", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-06-capital-and-historical", "neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture", "neelo-07-token-margined-issues-perculator-07-docs-09-vibe-vs-percolator"]
---

# Slab Isolation And Capital Inefficiency

Percolator's market structure is clean: one market, one slab, one isolated vault and risk engine. That is attractive for auditability and local reasoning. It is also expensive for capital.

In the source, slab isolation means positive PnL in one market cannot offset risk in another, LP capital must be funded market by market, and collateral remains locked for the life of resulting positions. A market maker operating many symbols cannot net exposure across the system. The capital requirement scales with every market it touches.

That matters for permissionless perps because the whole thesis is breadth. If thousands of long-tail markets need separate on-chain collateral commitments, the system can become permissionless in listing but not in practical liquidity. The venue may create many markets that professional capital cannot efficiently support.

This is one reason the compendium keeps returning to netting, solver risk, and cross-market insurance. A long-tail perp system cannot only ask whether each market is locally safe. It also has to ask whether the portfolio of markets can share information, collateral, hedges, and insurance without letting one toxic market endanger the whole system.

## Reader Implication

Builders should distinguish isolation for accounting from isolation as a capital model. Too much isolation makes the system legible but starves liquidity. Too little isolation makes losses contagious. The architecture has to pick the boundary deliberately.

## Sources

- `vibe-papers`: Neelo, "Section 6: Capital Inefficiency and Historical Precedent".
- `vibe-papers`: Neelo, "Section 2: Percolator Architecture".

## Related Pages

- `authored-temporal-separation-of-concerns`
- `authored-funding-defense-hierarchy`
- `authored-hybrid-solver-liquidity-waterfall`
