---
id: "authored-reward-ledger-game-layer-boundary"
title: "Reward Ledger And Game Layer Boundary"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system#12-1-core-shift-not-finalized", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-1-core-shift-not-finalized", "authored-reward-packs-future-facing-status", "authored-rewards-packs-and-artifacts", "authored-points-value-state-lifecycle"]
---

# Reward Ledger And Game Layer Boundary

The rewards-pack source makes a clean architectural split: points are the reward ledger, while packs and artifacts are the optional game layer around that ledger.

That boundary is the important part. Points should remain the simple accounting object because they carry source, finalization, claim, and TGE-eligibility implications. Packs and artifacts can add engagement, variance, rarity, and secondary-market behavior only after the base ledger is already trustworthy.

The source is also explicit that this is future-facing. Packs and artifacts are not current product policy, not a feature announcement, and not an endorsed live reward commitment. They are a design model for how reward exposure could become more interactive without letting the game layer rewrite core accounting.

## Documentation Rule

When readers ask why packs exist, the answer should not be "more rewards." The source's stronger answer is separation of concerns: keep base reward accounting auditable, then allow optional objects to package or express that exposure if supply, EV, rarity, transferability, and TGE treatment are approved.

## Publication Boundary

This page publishes the ledger-versus-game-layer architecture only. It does not announce reward packs or artifacts as live products, finalize transferability, define supply or rarity, set expected value, approve secondary markets, or define TGE conversion treatment.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System", 12.1.
- `spec-03`: Final reward policy and TGE language remain owner-review.

## Related Pages

- `authored-reward-packs-future-facing-status`
- `authored-rewards-packs-and-artifacts`
- `authored-points-value-state-lifecycle`
