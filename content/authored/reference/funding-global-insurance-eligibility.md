---
id: "authored-funding-global-insurance-eligibility"
title: "Funding Global Insurance Eligibility"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-09-insurance-adl", "neelo-15-funding-model-15-docs-10-defense-hierarchy", "section-15-funding-model-15-docs-01-abstract-d-safety-adl"]
---

# Funding Global Insurance Eligibility

Global insurance is shared protection, but Neelo's funding model is explicit that not every token qualifies. Eligibility is manual in the source model, and non-eligible markets can only use local insurance.

That design is about contagion control. If every new token market could immediately drain shared insurance, a weak or manipulated market could externalize its losses to unrelated markets. The model therefore gives global insurance three constraints:

- a market must be eligible;
- the per-market allocation is capped;
- the system should never risk the whole global fund in one market.

## How To Explain It To Users

Global insurance should be described as a capped risk budget, not a guarantee. A market may have zero allocation, a small allocation, or a larger allocation after it earns trust through cleaner price formation, better liquidity, and safer behavior.

This also explains why early markets can have stricter terms. A market that has not earned shared protection must rely more heavily on netting, token inventory, local insurance, dynamic pricing, and tighter limits.

## Publication Boundary

Do not publish final eligibility rules, allocation caps, governance paths, or per-token examples as live policy until operator review confirms them. The source-backed claim is the architecture principle: shared insurance is conditional and capped.

## Sources

- `vibe-papers`: Neelo, "Insurance & ADL Logic".
- `vibe-papers`: Neelo, "Defense Hierarchy".

## Related Pages

- `authored-conditional-global-insurance-allocation`
- `authored-cross-market-risk-mutualization`
- `authored-funding-local-insurance-fund`
