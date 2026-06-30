---
id: "authored-vibe-account-creation-and-login"
title: "Vibe Account Creation And Login"
section: "product-reference"
track: "Account And Safety"
status: "published"
sourceKeys: ["vibe-account-creation"]
sourceUrls: ["https://docs.vibe.trading/getting-started/account-creation.md"]
relatedGeneratedPages: ["vibe-account-creation", "vibe-deposits-withdrawals", "authored-vibe-simple-trade-flow"]
---

# Vibe Account Creation And Login

Vibe account creation has two public onboarding paths: an EOA wallet path and an email or social login path. The account page should explain them as a custody and convenience choice, not merely as two buttons.

## EOA Wallet Path

The official account guide frames an EOA wallet connection as the more secure path because the user keeps direct control of funds. The flow is: choose a supported chain, prepare a compatible wallet with USDC collateral and gas on that chain, connect the wallet to Vibe, create the account, deposit USDC, and then trade through Vibe's one-click gas-free flow.

This path is the better default explanation for readers who care about self-custody. The docs should still avoid implying that users never need chain assets at all: the setup step requires collateral and gas on the chosen chain before the Vibe account can be funded.

## Email Or Social Login Path

The email/social path optimizes for convenience and device portability. The official guide says the user can enter an email, confirm a 6-digit code, deposit USDC into the provided smart-wallet address, wait for the deposit to appear, create the account, then move funds from the smart wallet into the Vibe account.

The same page carries the key security caveat: funds are not stored in the user's own wallet, making this path comparable in security posture to a centralized exchange. That sentence belongs near the login choice, not buried later in a risk section.

## Reader Implication

When a new user asks "how do I create an account?", answer with the path decision first. EOA wallet login is the self-custody-oriented path; email/social login is the convenience path with a different custody model. After that, route the user to deposit mechanics and simple trade flow.

## Sources

- `vibe-account-creation`: official Vibe account-creation paths, wallet preparation, email-code flow, smart-wallet deposit flow, one-click gas-free trading claim, and custody caveat.

## Related Pages

- `authored-vibe-deposits-and-withdrawals`
- `authored-vibe-simple-trade-flow`
- `authored-vibe-security-and-audits`
