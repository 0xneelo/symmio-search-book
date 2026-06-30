---
id: "authored-vibe-large-withdrawal-window"
title: "Vibe Large Withdrawal Safety Window"
section: "product-reference"
track: "Account And Safety"
status: "published"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-deposits-withdrawals"]
sourceUrls: ["https://docs.vibe.trading/getting-started/deposits-and-withdrawals.md"]
relatedGeneratedPages: ["vibe-deposits-withdrawals", "authored-vibe-deposits-and-withdrawals", "authored-vibe-security-and-audits"]
---

# Vibe Large Withdrawal Safety Window

The official withdrawal guide separates small withdrawals from large withdrawals.

Small withdrawals are described as basically instantaneous. Large withdrawals use a 12-hour fraud-proof window. The source frames that waiting period as a safety measure against exploits and double-spend attempts, not as a normal settlement delay for every withdrawal.

The user-visible large-withdrawal flow has four important behaviors:

- the user initiates the request from the trade panel, account dropdown, or My Account;
- the withdrawal waits through the 12-hour window;
- the user can cancel during the window and return the funds to Allocated Balance;
- a second request groups with the existing request and resets the window to 12 hours.

After the window elapses, the user approves the withdrawal if the request is valid.

## Current-Source Verification

Last verified against the official public source on 2026-06-30. The public source does not define the threshold that makes a withdrawal "large." Do not invent that value. The source-backed answer is the behavior: small withdrawals are intended to be fast, while large withdrawals introduce a 12-hour fraud-proof safety window.

Because withdrawal thresholds and chain support can change, this page should be rechecked before launch or any user-facing release copy.

## Sources

- `vibe-deposits-withdrawals`: official small-withdrawal note, 12-hour large-withdrawal fraud-proof flow, cancel behavior, grouped-request reset, and approval step.

## Related Pages

- `authored-vibe-deposits-and-withdrawals`
- `authored-vibe-allocated-balance`
- `authored-symmio-withdrawal-provider-system`
