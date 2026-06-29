---
id: "authored-thiel-software-scale-economics"
title: "Software-Like Scale Economics"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/10-thiel-monopoly-analysis#part-3-the-four-characteristics-of-monopoly"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-10-thiel-monopoly-analysis-part-3-the-four-characteristics-of-monopoly", "authored-capital-efficiency-trap", "authored-yield-as-market-survival-constraint"]
---

# Software-Like Scale Economics

The scale-economics claim in Neelo's Thiel analysis is not that risk disappears at scale. It is that the reusable parts of Vibe's system can cover more markets without every market needing a bespoke venue, committee, or one-off market maker.

The source frames the fixed-cost side as solver infrastructure, smart contracts, audits, oracle integrations, risk models, and operations. Those are expensive to build. The reason they matter is that the marginal market can reuse much of the same infrastructure: solver logic, contract surfaces, risk-model improvements, and graduation criteria.

This matters for long-tail derivatives because the category has a volume distribution problem. If every new token needs a full standalone venue, the economics do not clear. If market creation can reuse a shared system while still isolating and pricing local risk, the cost curve becomes more software-like.

## Reader Implication

Readers should distinguish two costs. The first is market-specific risk capital, which remains real and must be paid. The second is market-creation infrastructure, which should become cheaper per market as the system learns and repeats. Vibe's thesis depends on compressing the second cost without pretending the first cost is zero.

## Sources

- `vibe-papers`: Neelo, "Vibe Trading: A Thielian Monopoly Analysis: Economies of Scale".

## Related Pages

- `authored-capital-efficiency-trap`
- `authored-yield-as-market-survival-constraint`
- `authored-integration-data-network-effects`
