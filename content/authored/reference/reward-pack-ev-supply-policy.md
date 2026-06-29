---
id: "authored-reward-pack-ev-supply-policy"
title: "Reward Pack EV And Supply Policy"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "authored-rewards-packs-and-artifacts", "authored-reward-packs-future-facing-status"]
---

# Reward Pack EV And Supply Policy

The pack model only works if supply and expected value are documented before users treat packs as economic objects.

The source's supply requirements are straightforward: pack issuance should be fixed or tightly governed, rarity distributions should be explicit, and probabilities should be disclosed. Without those rules, unopened packs become opaque claims on future rewards rather than auditable expected-value containers.

Expected value also needs a policy boundary. The source allows for packs whose typical output is slightly deflationary versus input points while preserving upside through low-probability high-rarity outcomes. That is a design model, not a final promise. Public docs should not imply pack EV, rarity, or mint odds until those values are approved.

## Documentation Standard

A production pack page needs:

- total or phase supply;
- rarity classes and probability tables;
- input point cost or earning path;
- expected output policy;
- whether market price can diverge from expected value;
- how unopened packs count for TGE exposure.

## Sources

- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: Reward formulas and conversion terms need owner approval.

## Related Pages

- `authored-rewards-packs-and-artifacts`
- `authored-reward-packs-future-facing-status`
- `authored-tge-qualifying-exposure-across-rewards`
