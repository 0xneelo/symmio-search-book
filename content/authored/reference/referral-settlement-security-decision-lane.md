---
id: "authored-referral-settlement-security-decision-lane"
title: "Referral Settlement And Security Decision Lane"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "section-17-referral-program-17-docs-10-open-decisions-10-3-settlement-and-security", "authored-referral-settlement-security-controls"]
---

# Referral Settlement And Security Decision Lane

The settlement and security lane decides how referral value moves from policy into enforceable economic state.

Neelo's open-decisions source names three unresolved questions:

- what portion of rebate can be computed in-flow versus claim-based;
- which signer model and custody controls are mandatory at each phase;
- what freeze and rollback scopes are acceptable during incidents.

These are implementation and trust decisions, not only UX decisions. In-flow rebates can feel immediate but need deterministic accounting. Claim-based flows can add review and replay protection but create claim lifecycle requirements. Signer models and custody controls define who can authorize value movement. Freeze and rollback scope defines what the system can safely do when something goes wrong.

## Security Boundary

The public docs can explain the control categories: signer isolation, replay-safe claims, audit trails, monitoring, cooldowns, freeze scopes, and fail-closed incident operations. They should not publish final signer topology, custody model, message schema, nonce storage, exact freeze powers, rollback criteria, or incident runbooks until security and implementation owners approve them.

The security-control source makes the reason explicit: incentive systems should fail closed on settlement. Growth can restart after verification; silent over-issuance or unsafe claims damage credibility.

## Reader Implication

When readers ask "are referral rewards instant?", "who signs claims?", or "can the team reverse a bad payout?", the answer should not blur policy and settlement. It should route to the approved settlement model once available and preserve the current caveat that phase-specific controls are still owner-review.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions", "Settlement and Security".
- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `spec-03`: current points and referral-settlement caveats.

## Related Pages

- `authored-referral-settlement-security-controls`
- `authored-referral-replay-safe-claim-authorizations`
- `authored-referral-fail-closed-incident-operations`
