---
id: "authored-referral-architecture-as-market-formation"
title: "Referral Architecture As Market Formation"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/00-abstract", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/05-referral-economics", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-00-abstract", "neelo-17-referral-program-17-docs-05-referral-economics", "local-points-engine"]
---

# Referral Architecture As Market Formation

Neelo's referral architecture paper treats referrals as market-formation infrastructure, not just campaign growth copy.

The design objective is to increase high-quality market listings while preserving fee integrity and limiting abuse. That means the referral layer has to balance on-chain identity, configurable partner economics, rakeback, points, reward abstractions, issuance policy, and operational safeguards.

The referral-economics section highlights why this is hard. Self-referrals, code shopping, and attribution disputes can turn a growth program into extraction if benefits are unequal or issuance is unconstrained. A durable system needs clear issuer eligibility, uniform referee benefits where possible, and explicit ownership rules for referral rights.

## Reader Implication

This page should link the dashboard referral mechanics back to the bigger market-formation thesis. The current onboarding app tracks referrals, points, invites, and network visibility, but operator inbox item `#3` still controls final public depth and historical-accounting language.

## Sources

- `vibe-papers`: Neelo, "Referral Program Architecture".
- `vibe-papers`: Neelo, "Section 5: Referral Economics".
- `spec-03`: current onboarding-dashboard points and referral-depth caveats.

## Related Pages

- `authored-referral-depth-open-question`
- `authored-dashboard-invites`
- `neelo-17-referral-program-17-docs-05-referral-economics`
