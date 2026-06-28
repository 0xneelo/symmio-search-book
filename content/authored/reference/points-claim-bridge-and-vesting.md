---
id: "authored-points-claim-bridge-and-vesting"
title: "Points Claim Bridge And Vesting"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/04-points-and-rewards", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-04-points-and-rewards-4-2-finalization-and-eligibility", "section-17-referral-program-17-docs-04-points-and-rewards-4-3-bridging-model", "section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-4-point-system-requirements"]
---

# Points Claim Bridge And Vesting

The source proposes a phased bridge from off-chain point balances into on-chain representation. The reason is simple: real-time point displays are useful for motivation, but final economic claims should not be considered settled until the inputs have been finalized.

A safe bridge has several parts:

- daily or epoch-based source finalization;
- explicit buckets for trading, LP, referral, and program activity;
- claim authorization after eligibility checks;
- cooldown or vesting before full transferability;
- anomaly checks before economically active release.

The rewards-pack source gives an example flow: users earn points off-chain, claim them on-chain after finalization, pass through a vesting window, and then choose whether to hold direct points or convert into additional reward objects. The details remain future-facing, but the integrity model is durable.

## Reader Implication

When a user asks whether points are "final," the docs should answer by state. Provisional points are not the same as finalized claimable points, and claimable points are not automatically the same as transferable economic exposure.

## Sources

- `vibe-papers`: Neelo, "Section 4: Points and Rewards".
- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: Final TGE mechanics remain owner-review.

## Related Pages

- `authored-referral-points-economic-state`
- `authored-tge-settlement-multiplier`
- `authored-referral-metrics-and-integrity`
