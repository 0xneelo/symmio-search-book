---
id: "authored-referral-issuance-and-anti-gaming"
title: "Referral Issuance And Anti-Gaming"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/05-referral-economics", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-05-referral-economics", "neelo-17-referral-program-17-docs-06-access-phasing", "section-17-referral-program-17-docs-05-referral-economics-5-1-why-referral-systems-get-gamed"]
---

# Referral Issuance And Anti-Gaming

Neelo's referral-economics section is blunt about the failure modes: self-referral loops, code shopping, and attribution disputes can turn a growth system into extraction. The design goal is not maximum code count. It is durable, fee-producing attribution that can survive adversarial behavior.

Qualified issuance is the main control. Instead of giving every user reward-eligible code issuance immediately, the source proposes activity thresholds, tier thresholds, curated campaign grants, or progressive unlock criteria. That preserves referral signal quality and makes early cohorts accountable.

## Uniform Referee Benefit

The source's anti-gaming logic favors uniform baseline referee benefits. If every valid code gives the same baseline benefit to the new user, code quality depends on issuer eligibility rather than discount magnitude. That reduces "best code" arbitrage and keeps social referrals viable.

## Phasing

The access-phasing section describes a controlled path:

- access-gated launch, where codes bound high-sensitivity actions such as trading and listing;
- unified access and referral identity, where onboarding and attribution become one surface;
- open participation, where codes become optional accelerators instead of mandatory gates.

This sequencing avoids opening incentive surfaces before monitoring is mature, while also avoiding permanent gating that throttles network effects.

## Reader Implication

The docs should frame referral-code scarcity as a quality-control mechanism, not as artificial exclusivity. Any early-cohort or master-code model needs eligibility, duration, propagation limits, and sunset rules before it becomes public policy.

## Publication Boundary

This page publishes the source threat model and the source-backed control categories. It does not publish final sybil rules, abuse thresholds, issuer eligibility thresholds, master-code terms, penalty rules, attribution-dispute process, monitoring signals, enforcement procedures, or historical reassignment behavior until operator, security, legal, accounting, and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 5: Referral Economics".
- `vibe-papers`: Neelo, "Section 6: Access Phasing".
- `spec-03`: Historical referral-depth contradiction; public v1 stance is now 15 levels with additive backfill.

## Related Pages

- `authored-referral-identity-and-claim-flow`
- `authored-referral-qualified-issuance-gating`
- `authored-referral-abuse-patterns`
