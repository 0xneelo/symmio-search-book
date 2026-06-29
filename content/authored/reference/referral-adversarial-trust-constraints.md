---
id: "authored-referral-adversarial-trust-constraints"
title: "Referral Adversarial Trust Constraints"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/11-conclusion", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-11-conclusion", "neelo-17-referral-program-17-docs-08-security-controls", "authored-referral-settlement-security-controls"]
---

# Referral Adversarial Trust Constraints

Neelo's conclusion says referral growth must preserve trust under adversarial conditions. It then names the required constraints: clear identity and attribution boundaries, hardened reward accounting, explicit anti-gaming policy, phased rollout discipline, and transparent KPI governance.

Those constraints are the minimum shape of a credible referral system. They keep referral economics from becoming a loose marketing promise.

## The Five Constraints

Identity and attribution boundaries answer who did what, under which code or market attachment, and whether the attribution can change.

Hardened reward accounting answers how points, claim authorizations, payout buckets, and future reward objects avoid silent mutation.

Explicit anti-gaming policy answers how the program handles self-referral, code shopping, attribution disputes, fake volume, and suspicious market-creation behavior.

Phased rollout discipline answers why the program can start with access gating, then activate referral economics, then expand only as controls harden.

Transparent KPI governance answers which public metrics are real evidence, which are campaign artifacts, and which formula version produced each chart.

## Reader Implication

When a reader asks whether referral growth is safe, the answer should not be broad reassurance. It should point to the constraints: identity, accounting, anti-gaming, rollout discipline, and KPI governance. If one of those constraints lacks an approved public policy, the docs should say so.

## Sources

- `vibe-papers`: Neelo, "Section 11: Conclusion".
- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `spec-03`: current referral and points-publication caveats.

## Related Pages

- `authored-referral-identity-anchor`
- `authored-referral-settlement-security-controls`
- `authored-referral-phase-version-reporting-rules`
