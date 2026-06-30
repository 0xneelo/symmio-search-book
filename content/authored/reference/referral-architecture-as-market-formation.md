---
id: "authored-referral-architecture-as-market-formation"
title: "Referral Architecture As Market Formation"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/00-abstract", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/05-referral-economics", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-00-abstract", "neelo-17-referral-program-17-docs-05-referral-economics", "local-points-engine"]
---

# Referral Architecture As Market Formation

Neelo's referral architecture paper treats referrals as market-formation infrastructure, not just campaign growth copy.

The design objective is to increase high-quality market listings while preserving fee integrity and limiting abuse. That means the referral layer has to balance on-chain identity, configurable partner economics, rakeback, points, reward abstractions, issuance policy, and operational safeguards.

The referral-economics section highlights why this is hard. Self-referrals, code shopping, and attribution disputes can turn a growth program into extraction if benefits are unequal or issuance is unconstrained. A durable system needs clear issuer eligibility, uniform referee benefits where possible, and explicit ownership rules for referral rights.

## Reader Implication

This page should link the dashboard referral mechanics back to the bigger market-formation thesis. The current onboarding app tracks referrals, points, invites, and network visibility. Public depth is 15 levels, and historical backfill is additive without lowering balances; the remaining caution is around private overlays, settlement terms, and reward economics that need their own approved policy pages.

## Publication Boundary

This page can publish the architecture thesis: referrals are part of market formation when they connect distribution, attribution, and fee-producing market activity. It should not publish private partner overlays, final issuer eligibility, live payout/share formulas beyond the approved Phase A revenue boundary, reward accounting rules, TGE settlement terms, transferability, signer/security controls, anti-gaming enforcement thresholds, or rollout state until the relevant product, commercial, legal, accounting, security, and operator owners approve them.

## Sources

- `vibe-papers`: Neelo, "Referral Program Architecture".
- `vibe-papers`: Neelo, "Section 5: Referral Economics".
- `spec-03`: current onboarding-dashboard points and referral-policy grounding.

## Related Pages

- `authored-dashboard-network`
- `authored-dashboard-invites`
- `neelo-17-referral-program-17-docs-05-referral-economics`
