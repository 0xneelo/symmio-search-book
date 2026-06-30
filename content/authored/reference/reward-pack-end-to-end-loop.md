---
id: "authored-reward-pack-end-to-end-loop"
title: "Reward Pack End-To-End Loop"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system#12-2-end-to-end-loop", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-2-end-to-end-loop", "authored-reward-ledger-game-layer-boundary", "authored-points-claim-bridge-and-vesting", "authored-tge-qualifying-exposure-across-rewards"]
---

# Reward Pack End-To-End Loop

The source model describes a seven-step reward loop. It starts with off-chain point earning and ends with TGE accounting across whichever reward forms qualify.

The loop is:

- users earn points off-chain;
- points are claimed on-chain through a delayed claim path;
- claimed points can be held directly or converted into packs;
- packs can be held, traded, or opened;
- opened packs mint artifacts with embedded points and optional boosts;
- users can hold or trade points, packs, and artifacts if transferability is permitted;
- final allocation uses total qualifying point exposure across the approved forms.

This is not a current production flow. It is a future design loop that shows where controls have to sit: finalization before claims, vesting or delay before economic activity, valuation rules before packs or artifacts count, and TGE rules before any object is treated as qualifying exposure.

## Why The Loop Matters

The loop prevents the docs from treating packs as isolated collectibles. In the source model, packs are connected to the point ledger, claim path, asset state, market behavior, and final allocation. A production page should therefore document the entire lifecycle, not only the mint or open action.

## Publication Boundary

This page describes a future design loop and the control points it would require. It does not publish a launch date, current claim path, transferability setting, pack opening policy, artifact minting policy, valuation rule, or final TGE allocation formula.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System", 12.2.
- `spec-03`: Claim, vesting, and TGE semantics remain owner-review.

## Related Pages

- `authored-reward-ledger-game-layer-boundary`
- `authored-points-claim-bridge-and-vesting`
- `authored-tge-qualifying-exposure-across-rewards`
