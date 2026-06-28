---
id: "authored-rewards-packs-and-artifacts"
title: "Rewards Packs And Artifacts"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/04-points-and-rewards", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-5-pack-system", "section-17-referral-program-17-docs-12-rewards-packs-artifact-system-12-6-artifact-system"]
---

# Rewards Packs And Artifacts

The rewards-pack source is explicitly future-facing. It should be documented as a design model, not as current product policy.

The core split is useful: points are the reward ledger; packs and artifacts are a gamified layer around that ledger. Points keep accounting simple. Packs can create expected-value containers. Artifacts can create persistent assets with embedded point value, rarity, and optional boost fields.

That structure can improve retention only if the economic rules are public enough to audit. The source names the needed guardrails: bounded supply, disclosed rarity or probability rules, clear expected-value policy, vesting delay, anomaly monitoring, and explicit TGE accounting across direct points, unopened packs, and artifacts.

## TGE Accounting Principle

The source's accounting rule is that final allocation should use total qualifying point exposure across approved forms. Unclaimed off-chain points should not count until they pass the claim and eligibility path. Packs and artifacts need defined valuation rules before they can be treated as qualifying exposure.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `vibe-papers`: Neelo, "Section 4: Points and Rewards".
- `spec-03`: TGE settlement needs product-owner approval.

## Related Pages

- `authored-points-claim-bridge-and-vesting`
- `authored-tge-settlement-multiplier`
- `authored-referral-points-economic-state`
