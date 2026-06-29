---
id: "authored-reward-packs-future-facing-status"
title: "Reward Packs Are Future-Facing Design Models"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "authored-rewards-packs-and-artifacts", "authored-points-claim-bridge-and-vesting"]
---

# Reward Packs Are Future-Facing Design Models

The rewards-pack source is explicit about status: packs and artifacts are a future-facing thought experiment, not a current product announcement or endorsed live feature.

That caveat matters because the model introduces economically sensitive concepts: on-chain point claims, transferable points, unopened packs, opened artifacts, rarity, boosts, and TGE accounting across multiple asset forms. Publishing those as live policy before the operator has approved supply, dates, eligibility, transferability, and valuation rules would mislead users.

The docs should therefore use two layers:

- the current principle: points require source-bucketed accounting, finalization, eligibility checks, and anti-abuse controls;
- the future model: packs and artifacts show how reward exposure could become composable once those controls are ready.

## Publication Boundary

This page should answer whether packs are live by saying no final public commitment is established from the source alone. The useful takeaway is architectural: keep base point accounting simple, and only add game mechanics after supply, EV, rarity, transferability, and TGE rules can be audited.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: Final product status and reward-policy wording require owner review.

## Related Pages

- `authored-rewards-packs-and-artifacts`
- `authored-points-claim-bridge-and-vesting`
- `authored-referral-points-economic-state`
