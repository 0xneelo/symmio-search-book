---
id: "authored-referral-rollout-capacity-decision-lane"
title: "Referral Rollout And Capacity Decision Lane"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-access-phasing", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "section-17-referral-program-17-docs-10-open-decisions-10-4-rollout-and-capacity", "authored-referral-access-gated-launch"]
---

# Referral Rollout And Capacity Decision Lane

The rollout and capacity lane decides how fast the referral system should expand while accounting, market listing, and security controls are still hardening.

Neelo's open-decisions source names three rollout questions:

- what launch capacity limits should be enforced for listing throughput;
- which features are mandatory in month one versus month three;
- how partner commitments should be sequenced relative to core hardening work.

These questions prevent a growth program from outrunning the infrastructure that has to honor it. Referral systems touch user access, market listing, partner distribution, reward accounting, claim controls, analytics, and support. A launch plan that maximizes code distribution without capacity gates can create misleading market-creation metrics and operational debt.

## Capacity Boundary

The docs can describe the source-backed sequencing logic: access-code beta, reward-eligible code activation, broader participation, and future reward-object expansion should be phased. They should not publish launch dates, listing throughput limits, partner priority, mandatory feature dates, or phase cutovers until owners approve the operating plan.

Partner sequencing deserves special care. Commercial commitments can accelerate distribution, but the source explicitly asks how they should be sequenced relative to core hardening work. That means partner promises should not force the system past its accounting or security readiness.

## Reader Implication

When market listers or partners ask "when can we launch?", the answer should separate architecture from capacity. The system can support phased referral and market-creation incentives, but launch eligibility, throughput, month-one feature scope, and partner sequencing need explicit owner-approved milestones.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions", "Rollout and Capacity".
- `vibe-papers`: Neelo, "Section 9: Access Phasing".
- `spec-03`: referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-access-gated-launch`
- `authored-referral-launch-sequencing`
- `authored-referral-market-creation-velocity`
