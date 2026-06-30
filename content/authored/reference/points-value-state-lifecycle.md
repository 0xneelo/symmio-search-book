---
id: "authored-points-value-state-lifecycle"
title: "Points Value State Lifecycle"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/04-points-and-rewards", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-04-points-and-rewards", "neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "authored-points-claim-bridge-and-vesting"]
---

# Points Value State Lifecycle

The rewards sources separate point balances by economic state. A user-visible points number is not automatically final, transferable, or eligible for TGE accounting.

The clean lifecycle is:

- unfinalized off-chain points, which may still depend on daily or epoch source checks;
- finalized off-chain points, which are source-bucketed and eligible for a claim path if policy allows;
- claimed on-chain points, which become economically active only after authorization and any required delay;
- converted reward objects, such as packs or artifacts, if a future policy permits conversion.

This state model prevents a common documentation error: treating every displayed point as the same thing. The source warns that real-time "final points" displays can increase gaming risk if users can optimize against incomplete settlement logic.

## Reader Implication

When users ask whether points are final, the docs should answer by state. A live dashboard can show progress without implying the balance has passed finalization, claim eligibility, transferability, or TGE qualification.

## Publication Boundary

This page can publish the source-backed points-state model. It should not present any displayed balance as finalized, claimable, transferable, TGE-qualified, or convertible into reward objects unless the relevant policy and implementation path have been approved.

## Sources

- `vibe-papers`: Neelo, "Section 4: Points and Rewards".
- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: Public TGE and claim semantics remain owner-review.

## Related Pages

- `authored-referral-points-economic-state`
- `authored-points-claim-bridge-and-vesting`
- `authored-tge-settlement-multiplier`
