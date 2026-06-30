---
id: "authored-vibe-deposit-chain-support"
title: "Vibe Deposit Chain Support"
section: "product-reference"
track: "Account And Safety"
status: "published"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-deposits-withdrawals", "vibe-account-creation"]
sourceUrls: ["https://docs.vibe.trading/getting-started/deposits-and-withdrawals.md", "https://docs.vibe.trading/getting-started/account-creation.md"]
relatedGeneratedPages: ["vibe-deposits-withdrawals", "vibe-account-creation", "authored-vibe-deposits-and-withdrawals"]
---

# Vibe Deposit Chain Support

Vibe deposit support depends on how the account was created.

The current public deposit guide says EOA-created accounts can deposit directly from Base only. It also says email-created Vibe accounts can deposit directly from Solana, Base, and major EVM chains. That distinction should stay visible because a generic "Vibe supports deposits" answer is not precise enough for a user preparing funds.

The account-creation guide reinforces the setup sequence. Wallet users should prepare USDC collateral and gas on the selected chain before connecting and funding the Vibe account. Email/social users receive a smart-wallet address and then move funds from that smart wallet into the Vibe account after the deposit appears.

## Current-Source Verification

Last verified against the official public sources on 2026-06-30. Chain support is time-sensitive and should be rechecked before launch because deposit coverage can change as the product adds or removes supported chains.

Do not infer support from a chain logo, social post, or internal endpoint. The safe public claim is the current official-doc distinction: EOA direct deposit path is Base-only in the source, while email-created accounts have broader direct deposit coverage.

## Sources

- `vibe-deposits-withdrawals`: official deposit entry points and account-path chain support.
- `vibe-account-creation`: official account-creation setup and smart-wallet funding sequence.

## Related Pages

- `authored-vibe-deposits-and-withdrawals`
- `authored-vibe-login-path-choice`
- `authored-vibe-account-creation-and-login`
