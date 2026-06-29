---
id: "authored-referral-design-coverage-routing-map"
title: "Referral Design Coverage Routing Map"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/14-meeting-traceability", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-14-meeting-traceability", "section-17-referral-program-17-docs-14-meeting-traceability-coverage-by-topic", "authored-referral-rollout-governance-checklist"]
---

# Referral Design Coverage Routing Map

Neelo's design coverage map is a routing layer for the referral chapter. It tells reviewers where each major concept is specified so that updates do not scatter policy across unrelated pages.

The map assigns topic ownership across the referral stack:

- program overview and strategic framing belong in the abstract;
- architecture and trust boundaries belong in the architecture chapter;
- rakeback mechanics belong in the rakeback-design chapter;
- points and leaderboard logic belong in the points-and-rewards chapter;
- anti-gaming belongs in referral economics;
- access rollout belongs in access phasing;
- market-level referral economics and category partnerships belong in the LP and category layer;
- packs, artifacts, rewards-loop, and TGE models belong in the rewards-pack chapter;
- security belongs in security controls;
- KPI reporting belongs in the product-metrics framework;
- open decisions belong in the open-decisions chapter.

## Why A Map Belongs In The Answer Engine

The answer engine needs more than keyword routing. It needs ownership routing. If someone asks about signer controls, the canonical answer should not be buried in a campaign FAQ. If someone asks about category partnerships, the route should land in the LP/category layer before it lands in general referral copy.

That keeps the compendium maintainable as the referral system grows.

## Reader Implication

When an answer spans multiple referral concepts, route first to the page that owns the concept, then cross-link to companion pages. The map prevents the docs from becoming a set of duplicated answers with slightly different policy.

## Sources

- `vibe-papers`: Neelo, "Design Coverage Map".
- `spec-03`: current referral-publication caveats.

## Related Pages

- `authored-referral-rollout-governance-checklist`
- `authored-referral-policy-governance`
- `authored-referral-dashboard-reporting-standards`
