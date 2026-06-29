---
id: "authored-referral-phase-migration-requirements"
title: "Referral Phase Migration Requirements"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-06-access-phasing", "section-17-referral-program-17-docs-06-access-phasing-6-5-migration-requirements", "authored-referral-access-phasing-operating-model"]
---

# Referral Phase Migration Requirements

Neelo's access-phasing source says every phase transition should include three migration controls:

- backward compatibility windows;
- code format migration rules;
- transparent communication to traders, listers, and partners.

Those controls are the difference between a controlled rollout and a support incident.

## Why Migration Is Economic

Referral access state can become economic state. If a code unlocks trading, attribution, benefits, or claims, then a phase transition can affect who receives credit and what users believe they are eligible for.

Backward compatibility protects existing users and partners from abrupt semantic changes. Format rules prevent old and new code systems from colliding. Transparent communication prevents users from mistaking a migration for a loss of rights.

## Publication Boundary

This page explains the source migration requirements. It should not publish final migration dates, compatibility windows, old-code treatment, account-merge behavior, partner migration rules, or historical credit treatment until operator, legal, accounting, and implementation review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 6: Access Phasing", "Migration Requirements".
- `spec-03`: Current referral-depth and historical-accounting caveats.

## Related Pages

- `authored-referral-access-phasing-operating-model`
- `authored-referral-rights-ownership-model`
- `authored-referral-policy-governance`
