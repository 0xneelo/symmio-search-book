---
id: "authored-artifact-exposure-and-boost-rules"
title: "Artifact Exposure And Boost Rules"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "authored-rewards-packs-and-artifacts", "authored-reward-pack-ev-supply-policy"]
---

# Artifact Exposure And Boost Rules

The artifact model turns opened packs into persistent assets. Each artifact can carry embedded point value, rarity, and optional boost fields.

Those properties are economically sensitive. Embedded point value affects future exposure. Rarity affects secondary-market pricing. Boosts affect user behavior if they change earning rates, eligibility, or utility. The docs should not present any boost as live until policy defines what the boost does, when it applies, whether it stacks, and how it is audited.

The source also separates equipped and unequipped artifacts. Unequipped artifacts still retain embedded point exposure, while equipped artifacts may apply boosts under explicit policy rules. That distinction should be preserved because it changes how users reason about inventory.

## Publication Boundary

Artifacts can be described as a possible reward-object layer, not as a current rewards guarantee. A final page needs an artifact catalog, rarity classes, embedded point values, slot rules, boost formulas, stacking rules, transferability, and audit trail before users can treat artifacts as production economics.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: Boosts, TGE weight, and transferability require product-owner approval.

## Related Pages

- `authored-rewards-packs-and-artifacts`
- `authored-reward-pack-ev-supply-policy`
- `authored-tge-qualifying-exposure-across-rewards`
