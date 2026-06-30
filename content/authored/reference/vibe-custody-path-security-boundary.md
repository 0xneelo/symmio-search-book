---
id: "authored-vibe-custody-path-security-boundary"
title: "Vibe Custody Path Security Boundary"
section: "product-reference"
track: "Account And Safety"
status: "published"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-account-creation", "vibe-security-audits", "vibe-deposits-withdrawals"]
sourceUrls: ["https://docs.vibe.trading/getting-started/account-creation.md", "https://docs.vibe.trading/more-info/security-and-audits.md", "https://docs.vibe.trading/getting-started/deposits-and-withdrawals.md"]
relatedGeneratedPages: ["vibe-account-creation", "vibe-security-audits", "vibe-deposits-withdrawals", "authored-vibe-login-path-choice"]
---

# Vibe Custody Path Security Boundary

Vibe account security has two different layers: account custody path and contract/audit posture. They should not be collapsed into one answer.

The account-creation source says the EOA path is the more secure path because the user keeps direct wallet control. The email or social path is more convenient, but the same source warns that funds are not stored in the user's own wallet and compares that posture to a centralized exchange. Separately, the security page describes Vibe's settlement-contract audit context.

## Why The Boundary Matters

A user choosing a login path is making a custody tradeoff. A user asking about audits is asking about contract assurance. Both are security questions, but they are not the same question.

The docs should answer them separately:

- custody path: who controls the wallet or smart-wallet flow, how deposits move, and what assumptions change;
- contract assurance: which settlement contracts are named, which audit source is linked, and which future modules still lack public detail;
- withdrawal safety: large-withdrawal controls add a fraud-proof window but do not erase the custody-path distinction.

## Reader Guidance

When a user asks "which login is safer?", route to the login-path and custody-boundary pages. When they ask "is Vibe audited?", route to the settlement-contract audit page. Mixing those answers can make the docs sound comforting while failing to answer the user's actual risk question.

## Current-Source Verification

Last verified against the official public sources on 2026-06-30. The account-creation guide still distinguishes EOA wallet control from email/social smart-wallet convenience, and the security guide still scopes audit evidence separately to settlement contracts. Refresh this page if Vibe changes login/custody wording or publishes new custody/audit coverage.

## Sources

- `vibe-account-creation`: official EOA versus email/social account paths and custody caveat.
- `vibe-security-audits`: official settlement-contract security/audit posture.
- `vibe-deposits-withdrawals`: deposit and withdrawal flow context for funded accounts.

## Related Pages

- `authored-vibe-login-path-choice`
- `authored-vibe-account-creation-and-login`
- `authored-vibe-deposits-and-withdrawals`
- `authored-vibe-security-and-audits`
