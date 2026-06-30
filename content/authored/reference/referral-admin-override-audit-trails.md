---
id: "authored-referral-admin-override-audit-trails"
title: "Referral Admin Override Audit Trails"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "neelo-17-referral-program-17-docs-02-architecture", "authored-referral-public-private-policy-overlays"]
---

# Referral Admin Override Audit Trails

The referral source treats tier changes and admin policy overrides as audit events. That is the right default because private partner terms, exception grants, beta cohorts, and abuse remediation can all affect future economics.

An override does not have to be bad. It can be necessary during launch. The risk is an override that changes attribution, eligibility, or payout terms without a durable record of who approved it, why it happened, which policy version it used, and which users or markets it affected.

Audit trails also protect the operator. If a user disputes rewards, the team needs to reconstruct the policy state at the time of activity rather than guessing from the current dashboard.

## Publication Boundary

The docs can require auditability for tier overrides, admin grants, partner overlays, sanctions, reversals, and manual corrections. They should not publish internal admin roles, private partner terms, enforcement thresholds, or sensitive investigation workflows.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `vibe-papers`: Neelo, "Section 2: Architecture".
- `spec-03`: referral policy and publication caveats.

## Related Pages

- `authored-referral-public-private-policy-overlays`
- `authored-referral-policy-governance`
- `authored-referral-dashboard-reporting-standards`
