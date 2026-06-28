---
id: "authored-referral-rollout-governance-checklist"
title: "Referral Rollout Governance Checklist"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/11-conclusion", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/14-meeting-traceability", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "section-17-referral-program-17-docs-10-open-decisions-10-5-governance-requirement", "neelo-17-referral-program-17-docs-11-conclusion", "neelo-17-referral-program-17-docs-14-meeting-traceability"]
---

# Referral Rollout Governance Checklist

The open-decisions chapter does not treat unresolved referral policy as a reason to stop. It defines a governance requirement: each open decision needs an owner, target milestone, policy statement, and measurable acceptance criteria.

That checklist is the difference between a living docs system and a pile of caveats. The compendium can publish the architecture while keeping unresolved policy clearly review-bound.

## Decision Groups

The source groups open decisions into four practical lanes:

- referral policy: depth, referee-benefit variants, and attachment changes after signup;
- economic policy: private tiers, transferability, TGE weighting, and reward caps;
- settlement and security: in-flow versus claim-based rebates, signer models, freezes, and rollback scope;
- rollout and capacity: listing throughput, month-one versus month-three features, and partner sequencing.

Each lane has a different owner profile. Product can decide wording and launch phases. Security and protocol owners need to sign off settlement controls. Commercial owners need to define partner tiers without obscuring public economics.

## Documentation Rule

The design coverage map says chapter-level details belong in their primary files, not duplicated across the docs. When chapter scope changes, update the relevant chapter first, then update the map.

For the public compendium, that becomes a traceability rule: do not bury a policy change inside FAQ copy. Update the owning page, regenerate routes and answer chunks, then let the answer engine point users to the new source of truth.

## Reader Implication

The referral docs should be comfortable saying "architecture decided, policy pending" when that is the true state. That is more credible than publishing a final-looking answer before referral depth, transferability, signer controls, and rollout capacity are operator-approved.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions".
- `vibe-papers`: Neelo, "Section 11: Conclusion".
- `vibe-papers`: Neelo, "Design Coverage Map".
- `spec-03`: current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-policy-governance`
- `authored-referral-depth-open-question`
- `authored-referral-settlement-security-controls`
