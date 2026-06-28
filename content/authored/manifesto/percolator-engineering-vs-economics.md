---
id: "authored-percolator-engineering-vs-economics"
title: "Percolator: Engineering Strength, Economic Limit"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/07-percolator-strengths", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/10-conclusion"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-07-percolator-strengths", "neelo-07-token-margined-issues-perculator-07-docs-10-conclusion", "neelo-07-token-margined-issues-perculator-07-docs-00-abstract"]
---

# Percolator: Engineering Strength, Economic Limit

The Percolator critique is strongest when it refuses to caricature the system. Neelo's source explicitly credits Percolator for formal verification, pluggable matchers, clean trust boundaries, balance-sheet safety, full on-chain execution, and a minimal state machine.

That distinction matters for Vibe's docs. The argument is not "Percolator is sloppy." The argument is that correct code can still instantiate a structurally fragile economic model. Reflexive collateral, inverse payoff convexity, token-denominated insurance, passive oracle execution, and slab-level capital lockup are not implementation bugs. They follow from the design constraints.

Auto-deleveraging shows the split between technical survival and market credibility. A protocol can avoid technical insolvency by haircutting winning traders, but that does not mean the market worked. If traders cannot trust that profitable positions will be paid, the market may be live on-chain and dead economically.

The compendium should use Percolator as a serious comparison point. It proves that fully on-chain derivatives engines can be elegant and verifiable. It also proves that permissionless perps need economic architecture, not only correct settlement code.

## Reader Implication

Engineers should separate software correctness from market solvency. LPs and traders should ask whether the economic model pays winners during stress, not only whether the smart contract conserves balances.

## Sources

- `vibe-papers`: Neelo, "Section 7: What Percolator Gets Right".
- `vibe-papers`: Neelo, "Section 10: Conclusion".

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-oracle-circuit-breaker-paradox`
- `authored-economic-clarity-for-permissionless-perps`
