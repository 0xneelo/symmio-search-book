---
id: "authored-vibe-add-token-info"
title: "Vibe Add Token Info"
section: "product-reference"
track: "Market Creation"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-add-token-info", "vibe-project-listing-terms", "spec-04"]
sourceUrls: ["https://docs.vibe.trading/more-info/add-token-info.md", "https://docs.vibe.trading/more-info/project-listing-terms-and-conditions", "_specs/app-docs/04-sources.md"]
relatedGeneratedPages: ["vibe-add-token-info", "vibe-project-listing-terms", "authored-vibe-project-listing-terms"]
---

# Vibe Add Token Info

Add Token Info is the VibeCaps project-managed metadata flow. Once approved, a token trading page can show project-managed banner artwork, logo, description, website, social links, and an optional X feed instead of relying only on default token metadata.

The official source exposes two entry points. A project can start from a VibeCaps market that does not already have approved token info by using the Add Token Info action beside the token identity and safety icons. It can also start from the listed pool detail page, where the button appears only for listed pools without approved token info.

## What A Project Can Submit

The source-backed fields are:

- banner artwork;
- token logo;
- project description;
- website;
- social links;
- X feed profile.

If the X feed is approved, posts can appear in the trading page feed panel and as chart markers. The purpose is contextual: traders can connect market movement with project updates without leaving the trading surface.

## Submission Flow

The submitter needs a connected wallet, the target VibeCaps market, optional JPG/PNG/WebP artwork, optional links, a review contact email, optional Telegram contact, and USDC on one of the chains shown in the app.

The source flow is:

1. Open the relevant VibeCaps market.
2. Choose Add Token Info.
3. Fill in the project details.
4. Add the review contact email.
5. Continue to payment.
6. Choose the deposit chain.
7. Send the exact USDC fee to the treasury address shown in the form.
8. Paste the deposit transaction hash or explorer URL.
9. Submit for review.

The app verifies that the selected treasury received enough USDC on the selected chain before accepting the submission.

## Payment, Review, And Status

The fee is a one-time USDC review fee. The live amount is shown inside the app before payment, and the docs must not publish a static fee amount, treasury address, token address, or chain list unless a current app source supports it.

Submission history belongs to the connected wallet. The public statuses are:

- pending review: the Vibe team received the submission;
- approved: the submitted token info is live;
- rejected: the submission was not approved;
- replaced: a newer approved submission is live for that token.

Pending submissions can be edited. Updating a pending submission replaces the pending row and reuses the original payment transaction hash. Rejected submissions may be refunded at Vibe's discretion.

## Review Boundaries

The official rejection examples are fraud or scam suspicion, inactive or inconsistent information, and verification mismatch between the submitted website/socials and the token or smart contract. Public docs should therefore frame Add Token Info as a reviewed metadata request, not as an automatic branding right.

Two safety rules matter for answer synthesis:

- use only the payment amount, USDC token, chain, and treasury address shown inside the Vibe app;
- if payment details fail to load, do not guess the fee or treasury address.

## Reader Implication

When projects ask what metadata they can add, route here. When they ask for current payment details, route them back to the live in-app form rather than giving a static address or amount.

## Sources

- `vibe-add-token-info`: official Add Token Info Markdown page.
- `vibe-project-listing-terms`: adjacent project listing terms linked by the Add Token Info source.
- `spec-04`: source-ingestion requirement for Vibe public docs.

## Related Pages

- `authored-vibe-project-listing-terms`
- `vibe-add-token-info`
- `vibe-project-listing-terms`
