---
id: "authored-referral-reward-pack-integration"
title: "Referral Reward Pack Integration"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system#12-8-referral-integration", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-8-referral-integration", "authored-referral-dual-incentive-rails", "authored-referral-game-layer-kpis", "authored-referral-economic-policy-decision-lane"]
---

# Referral Reward Pack Integration

The rewards-pack source connects referrals to the same reward-object loop by making referral contribution a way to accelerate point accumulation. More points can increase access to future packs or artifacts if the program approves those surfaces.

The source names three potential reward surfaces: fee share, point share, and milestone rewards such as pack unlocks. Those surfaces should stay separate in public documentation. Fee share is economics. Point share is reward accounting. Pack unlocks are a game-layer milestone. Mixing them without explicit policy would make referral terms hard to audit.

The stated objective is also important: referral rewards should align with long-term inventory exposure, not only immediate payout. That keeps referrals tied to market formation and sustained fee flow rather than raw signup extraction.

## Publication Boundary

This page does not finalize referral economics, reward depth, pack unlock criteria, milestone thresholds, or TGE treatment. It documents the integration pattern: referrals can feed points; points can feed future pack/artifact access; each step needs its own approved policy and audit trail.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System", 12.8.
- `spec-03`: Referral depth, fee share, milestone rewards, and public economics remain owner-review.

## Related Pages

- `authored-referral-dual-incentive-rails`
- `authored-referral-game-layer-kpis`
- `authored-referral-economic-policy-decision-lane`
