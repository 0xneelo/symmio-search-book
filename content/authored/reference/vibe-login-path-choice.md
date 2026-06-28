---
id: "authored-vibe-login-path-choice"
title: "Choosing A Vibe Login Path"
section: "product-reference"
track: "Account And Safety"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-account-creation"]
sourceUrls: ["https://docs.vibe.trading/getting-started/account-creation.md"]
relatedGeneratedPages: ["vibe-account-creation", "authored-vibe-account-creation-and-login", "authored-vibe-security-and-audits"]
---

# Choosing A Vibe Login Path

Vibe's official account guide gives users two onboarding paths: an EOA wallet path and an email or social login path.

The EOA path is the self-custody-oriented path. The user connects a compatible wallet, prepares USDC collateral and gas on the chosen chain, creates a Vibe account, deposits USDC, and trades through the Vibe flow. The source frames this as the more secure path because the user retains direct wallet control.

The email or social path optimizes for convenience. The user enters an email, confirms a 6-digit code, deposits USDC into the provided smart-wallet address, waits for the deposit to appear, creates the account, and moves funds into the Vibe account. The official source also carries the important custody caveat: this path is closer to a centralized-exchange security posture because funds are not stored in the user's own wallet.

## Reader Guidance

The docs should not present the two paths as a purely cosmetic choice. The choice affects custody posture, funding flow, and mobile behavior.

Answer the user this way:

- choose the EOA path when direct wallet control is the priority;
- choose email or social login when convenience and portability matter more;
- understand that the email/social path changes custody assumptions;
- read deposit mechanics next, because the account is not useful until funds reach the Vibe account.

## Sources

- `vibe-account-creation`: official Vibe EOA wallet account flow, email/social login flow, 6-digit confirmation code, smart-wallet deposit sequence, one-click gas-free trading claim, and custody caveat.

## Related Pages

- `authored-vibe-account-creation-and-login`
- `authored-vibe-deposits-and-withdrawals`
- `authored-vibe-mobile-pwa`
