---
id: "authored-referral-abuse-patterns"
title: "Referral Abuse Patterns"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/05-referral-economics#51-why-referral-systems-get-gamed", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-05-referral-economics", "section-17-referral-program-17-docs-05-referral-economics-5-1-why-referral-systems-get-gamed", "authored-referral-issuance-and-anti-gaming"]
---

# Referral Abuse Patterns

Neelo's referral-economics source names three abuse patterns that referral docs should treat as first-class design constraints:

- self-referral loops;
- code shopping for better referee terms;
- attribution disputes after downstream growth.

Those are not edge cases. They are the predictable result of attaching economic value to social attribution without clear issuance, benefit, and ownership rules.

## Why The Abuse Frame Matters

If the system optimizes for maximum code count, it can produce many low-quality codes and still fail at durable distribution. The source goal is different: fee-producing referral attribution that can scale without collapsing into self-directed extraction.

That means anti-gaming controls are part of the product architecture, not an afterthought. Referral docs should explain why some users may see eligibility gates, monitoring, or claim review before the system opens broader reward routing.

## Publication Boundary

This page explains the source threat model. It should not publish final sybil rules, abuse thresholds, penalty rules, attribution-dispute process, monitoring signals, or enforcement procedures until operator, security, legal, and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 5: Referral Economics", "Why Referral Systems Get Gamed".
- `spec-03`: Current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-issuance-and-anti-gaming`
- `authored-referral-qualified-issuance-gating`
- `authored-referral-settlement-security-controls`
