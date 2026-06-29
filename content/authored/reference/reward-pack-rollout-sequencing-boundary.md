---
id: "authored-reward-pack-rollout-sequencing-boundary"
title: "Reward Pack Rollout Sequencing Boundary"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system#12-11-rollout-notes-from-transcript", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-11-rollout-notes-from-transcript", "authored-referral-access-phasing-operating-model", "authored-reward-pack-system-guardrails", "authored-reward-packs-future-facing-status"]
---

# Reward Pack Rollout Sequencing Boundary

The rewards-pack source treats launch sequencing as phased operating context, not as an immutable protocol guarantee.

The transcript-derived rollout note suggests an order: beta access with invite-code gating, referral activation in a following phase, and on-chain transferability or packs in later milestones. The important point is sequence discipline. The system should not expose value-bearing game objects before the underlying access, referral, claim, and accounting layers are ready.

## Why Sequence Matters

Invite-code gating controls early access. Referral activation expands attribution and incentive surfaces. On-chain transferability, packs, and artifacts make the reward layer more composable and therefore harder to govern.

If those milestones are collapsed into one launch, the system inherits every risk at once: unclear eligibility, unaudited supply, disputes over attribution, premature secondary markets, and public expectations around TGE accounting.

## Documentation Boundary

Dates, caps, transfer rules, pack launch criteria, and milestone names should be treated as planning inputs until approved release notes exist. Public docs should explain the dependency order without promising an exact calendar.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System", "Rollout Notes from Transcript".
- `spec-03`: current referral, points, and rewards caveats.

## Related Pages

- `authored-referral-access-phasing-operating-model`
- `authored-reward-pack-system-guardrails`
- `authored-reward-packs-future-facing-status`
