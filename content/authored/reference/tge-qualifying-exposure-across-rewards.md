---
id: "authored-tge-qualifying-exposure-across-rewards"
title: "TGE Qualifying Exposure Across Reward Forms"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/04-points-and-rewards", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "neelo-17-referral-program-17-docs-04-points-and-rewards", "authored-tge-settlement-multiplier"]
---

# TGE Qualifying Exposure Across Reward Forms

The rewards-pack source gives one accounting principle: final allocation should be computed from total qualifying point exposure across approved forms.

In the future model, qualifying exposure can include:

- claimed points held directly in a wallet;
- point value represented by held unopened packs, under a defined valuation rule;
- embedded point value inside held artifacts.

The source is also explicit about what should not count: unclaimed off-chain points should not qualify until they pass finalization, eligibility, and claim authorization. That protects the allocation from provisional balances, incomplete source data, and abuse patterns that are discovered before release.

## What Remains Operator-Controlled

The model does not finalize TGE weights, conversion ratios, pack valuation, artifact valuation, snapshot timing, vesting treatment, or transferability. Those are publication-critical rules. Until they are approved, the docs should describe the accounting boundary without implying a claim formula.

## Publication Boundary

This page publishes the qualifying-exposure concept only. It does not define a claim amount, conversion ratio, token allocation, eligibility snapshot, vesting schedule, transferability right, pack valuation, artifact valuation, or legal/accounting treatment.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `vibe-papers`: Neelo, "Section 4: Points and Rewards".
- `spec-03`: TGE settlement mechanics remain owner-review.

## Related Pages

- `authored-tge-settlement-multiplier`
- `authored-points-claim-bridge-and-vesting`
- `authored-rewards-packs-and-artifacts`
