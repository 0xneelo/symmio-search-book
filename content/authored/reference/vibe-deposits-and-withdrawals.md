---
id: "authored-vibe-deposits-and-withdrawals"
title: "Vibe Deposits And Withdrawals"
section: "product-reference"
track: "Account And Safety"
status: "published"
sourceKeys: ["vibe-deposits-withdrawals", "vibe-account-creation"]
sourceUrls: ["https://docs.vibe.trading/getting-started/deposits-and-withdrawals.md", "https://docs.vibe.trading/getting-started/account-creation.md"]
relatedGeneratedPages: ["vibe-deposits-withdrawals", "vibe-account-creation", "vibe-account-portfolio"]
---

# Vibe Deposits And Withdrawals

Vibe's funding guide separates deposits from withdrawal safety. Deposits are framed as straightforward balance movement into an allocated trading balance; withdrawals add controls for large requests.

## Deposits

The official deposit guide says users can start a deposit from the trade panel, account dropdown, or My Account screens. Once the transaction is confirmed on-chain, the USDC amount appears in Allocated Balance.

The account path changes chain support. The current public guide says EOA-created accounts can deposit directly from Base only. Email-created Vibe accounts can deposit directly from Solana, Base, and major EVM chains. The docs should preserve that distinction instead of giving a generic "deposit from anywhere" answer.

## Withdrawals

The official withdrawal guide says small withdrawals are basically instantaneous. For large withdrawals, Vibe uses a fraud-proof window to protect the system from exploits and double-spend attempts.

The large-withdrawal flow has five user-visible states:

- Initiate the withdrawal request from the trade panel, account dropdown, or My Account screens.
- Wait through a 12-hour fraud-proof window.
- Cancel during the window if the user wants the funds returned to Allocated Balance.
- Understand that a second request groups with the existing request and resets the window to 12 hours.
- Approve the withdrawal after the window elapses, assuming the request is valid.

The public source does not define the "large withdrawal" threshold, so publication copy should not invent one.

## Reader Implication

When answering funding questions, distinguish where the funds are in the lifecycle: wallet or smart wallet, Vibe account, Allocated Balance, pending withdrawal, or approved withdrawal. That vocabulary prevents confusion between a confirmed chain deposit, a visible trading balance, and a withdrawal request waiting through the safety window.

## Sources

- `vibe-deposits-withdrawals`: official deposit entry points, Allocated Balance crediting, account-path chain support, and 12-hour large-withdrawal fraud-proof flow.
- `vibe-account-creation`: account path context for EOA versus email/social onboarding.

## Related Pages

- `authored-vibe-account-creation-and-login`
- `authored-vibe-portfolio-and-account-data`
- `authored-vibe-account-health-and-liquidations`
