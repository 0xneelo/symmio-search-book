---
id: "authored-perp-paper-contribution-map"
title: "The Perp Paper Contribution Map"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/09-conclusion", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/09-conclusion#9-1-summary-of-contributions"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-09-conclusion", "section-01-perp-classes-zscore-01-docs-09-conclusion-9-1-summary-of-contributions", "authored-perp-protocol-framework", "authored-bootstrap-trilemma"]
---

# The Perp Paper Contribution Map

Neelo's conclusion says the Perp Classes / Z-Score paper contributes three things: a protocol-design framework, the bootstrap trilemma, and a hybrid architecture path through that trilemma.

The framework contribution gives readers the three axes: matching architecture, collateralization architecture, and insurance topology. That matters because it prevents lazy comparisons between protocols that solve different market states.

The trilemma contribution names the constraint: a single static architecture struggles to deliver permissionless listing, capital efficiency, and reliable counterparty at the same time. Some systems favor mature efficiency. Some systems favor capitalized counterparty. Some experiments try to avoid the payer question and break under bootstrap conditions.

The hybrid contribution is temporal. Vibe is framed as a system that can accept inefficiency at bootstrap, measure market maturity, and move toward more efficient structure as evidence accumulates.

## Publication Boundary

Treat this as the paper's argument map, not proof that any live implementation has completed every transition. Venue comparisons, production graduation behavior, Z-score thresholds, and automatic integration claims need operator/product review before public final language.

## Sources

- `vibe-papers`: Neelo, "Section 9: Conclusion: 9.1 Summary of Contributions".

## Related Pages

- `authored-perp-protocol-framework`
- `authored-bootstrap-trilemma`
- `authored-static-perp-design-failures`
