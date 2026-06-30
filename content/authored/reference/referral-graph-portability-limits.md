---
id: "authored-referral-graph-portability-limits"
title: "Referral Graph Portability Limits"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#14-operational-reality", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-4-operational-reality", "authored-referral-identity-anchor"]
---

# Referral Graph Portability Limits

Neelo's system-baseline source names ambiguous referral graph portability as an early-stage limit. The problem is not only whether a code can move. It is whether the system can explain which identity, code, market, campaign, or partner relationship owns attribution after movement.

A portable referral graph can be useful if referral rights are represented cleanly. It becomes dangerous when history is mutable, when code ownership changes without versioned policy, or when downstream rewards depend on a graph that users cannot audit.

## What Portability Has To Preserve

The referral graph needs stable answers to four questions:

- who originally created the referral relationship;
- whether the relationship is account-bound, object-bound, market-scoped, or policy-scoped;
- which historical activity stays attached to the old state;
- which future activity follows the new state.

Without those boundaries, portability creates attribution disputes. A trader, referrer, partner, and market creator could all believe they own the same economic flow.

## Publication Boundary

This page explains a baseline limitation, not a live portability policy. The public docs should not claim referral NFTs, referral rights, historical attribution, or market-scoped shares are transferable until operator, legal, accounting, and implementation owners approve the state model and migration rules.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Operational Reality".
- `spec-03`: current referral-depth and public rewards caveats.

## Related Pages

- `authored-referral-identity-anchor`
- `authored-referral-rights-ownership-model`
- `authored-referral-phase-migration-requirements`
