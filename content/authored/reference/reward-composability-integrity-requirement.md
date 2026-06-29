---
id: "authored-reward-composability-integrity-requirement"
title: "Reward Composability Integrity Requirement"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/04-points-and-rewards#4-5-integrity-requirement", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-04-points-and-rewards", "section-17-referral-program-17-docs-04-points-and-rewards-4-5-integrity-requirement", "authored-rewards-packs-and-artifacts", "authored-points-value-state-lifecycle"]
---

# Reward Composability Integrity Requirement

Neelo's points-and-rewards source makes reward composability conditional: packs, artifacts, and other reward objects are useful only if users trust supply and attribution.

That is the integrity requirement. A game layer can make rewards more engaging, but it cannot become a black box that hides where value came from, how much exists, who earned it, or how it will be counted at TGE.

## Source-Of-Truth Path

Every reward layer should map back to a verifiable source-of-truth path:

- the original earning event or eligible activity;
- the source bucket that produced the points;
- the policy version that finalized or converted them;
- the supply, rarity, and expected-value rule for any pack or artifact;
- and the approved accounting treatment for direct points, unopened packs, and embedded artifact exposure.

Without that path, reward composability becomes opacity. Users may see an exciting object, but they cannot audit whether it represents real qualifying exposure or only provisional state.

## Reader Implication

The docs should treat reward objects as accounting surfaces, not only retention mechanics. If a pack or artifact can affect value, allocation, boost treatment, or market behavior, the page describing it must also describe the source path and review status.

## Publication Boundary

This page explains the source integrity requirement. It should not publish final supply, rarity, probabilities, expected value, TGE weighting, boost policy, transferability, or secondary-market support until product, risk, legal, accounting, and operator review approve those values.

## Sources

- `vibe-papers`: Neelo, "Section 4: Points and Rewards", "Integrity Requirement".
- `spec-03`: points, rewards, and TGE settlement caveats.

## Related Pages

- `authored-rewards-packs-and-artifacts`
- `authored-points-value-state-lifecycle`
- `authored-tge-qualifying-exposure-across-rewards`
