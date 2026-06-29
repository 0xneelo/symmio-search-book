---
id: "authored-referral-access-gated-launch"
title: "Referral Access-Gated Launch"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-06-access-phasing", "section-17-referral-program-17-docs-06-access-phasing-6-1-phase-a-access-gated-launch", "authored-referral-access-phasing-operating-model"]
---

# Referral Access-Gated Launch

Neelo's access-phasing source starts with an access-gated launch. In this phase, codes are required for high-sensitivity actions such as trading and listing.

The point is launch control, not permanent exclusion. The source says gating keeps launch risk bounded while infrastructure hardens.

## What The Gate Protects

Early trading, listing, attribution, reward accounting, and monitoring are all sensitive surfaces. Opening them all at once gives abuse patterns more room before the system has enough observed behavior.

Access gating lets operators stage real usage, observe failure modes, and keep sensitive flows tied to known code paths while the referral and reward stack matures.

## Publication Boundary

This page explains the source launch phase. It should not publish live beta access criteria, supported sensitive actions, code distribution lists, listing eligibility, trading limits, launch dates, or capacity commitments until operator and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 6: Access Phasing", "Phase A - Access-Gated Launch".
- `spec-03`: Current referral-depth and product-state caveats.

## Related Pages

- `authored-referral-access-phasing-operating-model`
- `authored-referral-abuse-patterns`
- `authored-referral-qualified-issuance-gating`
