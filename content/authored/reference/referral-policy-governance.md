---
id: "authored-referral-policy-governance"
title: "Referral Policy Governance"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/11-conclusion", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "neelo-17-referral-program-17-docs-11-conclusion", "authored-referral-policy-decision-lane"]
---

# Referral Policy Governance

The referral source is clear that several policy questions remain open. That does not make the architecture unusable. It means the docs need a governance layer that records the owner, milestone, public policy statement, and acceptance criteria for every unresolved economic decision.

The open decisions fall into four groups:

- referral policy: the resolved 15-level public depth, referee benefit variants, and whether referral attachment can change after signup;
- economic policy: private tiers, transferability, TGE weighting, and reward caps;
- settlement and security: claim-based versus in-flow rebates, signer controls, freezes, and rollback scope;
- rollout and capacity: launch throughput, phase sequencing, and partner commitments.

The conclusion of the source gives the north star: referrals should connect user acquisition, market creation, and fee distribution while preserving trust under adversarial conditions.

## Reader Implication

Final docs should not hide unresolved policies inside confident marketing copy. They should publish the stable architecture, route the resolved 15-level depth to the current public policy, label the remaining open decisions, and update the answer engine when operator-approved policy resolves.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions".
- `vibe-papers`: Neelo, "Section 11: Conclusion".
- `spec-03`: resolved referral depth and public-economics caveats.

## Related Pages

- `authored-referral-policy-decision-lane`
- `authored-referral-rakeback-policy-model`
- `authored-referral-metrics-and-integrity`
