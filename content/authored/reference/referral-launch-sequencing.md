---
id: "authored-referral-launch-sequencing"
title: "Referral Launch Sequencing"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-06-access-phasing", "section-17-referral-program-17-docs-06-access-phasing-6-6-launch-sequencing-notes", "authored-rewards-packs-and-artifacts"]
---

# Referral Launch Sequencing

Neelo's launch-sequencing notes describe a staged rollout:

1. an access-code beta window for controlled onboarding;
2. referral-code activation;
3. broader reward-layer expansion, including on-chain transferability, packs, and an artifact economy.

The sequence supports two goals at once: early growth through scarcity and clear onboarding logic, and reduced abuse risk while the accounting stack hardens.

## Why Sequencing Beats One Big Switch

The source treats access, referral activation, and reward expansion as different risk levels. Access controls who can enter sensitive flows. Referral activation controls who can route reward-eligible attribution. Reward-layer expansion controls how economic state becomes more transferable or composable.

Doing those at once would make it harder to isolate problems. Sequencing gives the system clearer evidence about which layer created a problem and which layer can safely expand next.

## Publication Boundary

This page explains the source sequencing model. It should not publish launch dates, beta duration, activation order, transferability timing, pack mechanics, artifact eligibility, or reward-layer commitments until operator, legal, accounting, and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 6: Access Phasing", "Launch Sequencing Notes".
- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: Current referral-depth and public-economics caveats.

## Related Pages

- `authored-referral-access-gated-launch`
- `authored-referral-qualified-issuance-gating`
- `authored-rewards-packs-and-artifacts`
