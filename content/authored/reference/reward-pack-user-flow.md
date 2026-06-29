---
id: "authored-reward-pack-user-flow"
title: "Reward Pack User Flow"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system#12-3-user-flow", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-3-user-flow", "authored-reward-pack-end-to-end-loop", "authored-points-claim-bridge-and-vesting", "authored-reward-pack-ev-supply-policy"]
---

# Reward Pack User Flow

The source's user flow has four stages: earn, claim, vest, then convert or manage exposure.

Users can earn through trading activity, LP participation, and referral contribution. Points are finalized off-chain first, then a claim path can move approved balances into an on-chain economically active state. The source sketches a vesting delay, with a first-claim window and rolling unlocks for later daily claims. After that, users could hold direct points, hold packs as unopened expected-value containers, or open packs into artifacts with variance and optional boosts.

The vesting numbers in the source should not be published as live policy by themselves. They belong to the source model and still need owner approval before they become user-facing terms.

## Reader Implication

The most important user-facing distinction is not the pack animation or artifact reveal. It is which state the user's exposure is in: provisional off-chain points, claimable points, claimed points, unopened pack exposure, or opened artifact exposure. Each state needs its own eligibility, transferability, and TGE-accounting rule.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System", 12.3.
- `spec-03`: Live claim delays, vesting windows, and conversion rules remain owner-review.

## Related Pages

- `authored-reward-pack-end-to-end-loop`
- `authored-points-claim-bridge-and-vesting`
- `authored-reward-pack-ev-supply-policy`
