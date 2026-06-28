---
id: "authored-vibe-mobile-pwa"
title: "Vibe Mobile PWA"
section: "product-reference"
track: "Account And Safety"
status: "publication-candidate"
sourceKeys: ["vibe-mobile-pwa", "vibe-account-creation"]
sourceUrls: ["https://docs.vibe.trading/trading/mobile-app-pwa.md", "https://docs.vibe.trading/getting-started/account-creation.md"]
relatedGeneratedPages: ["vibe-mobile-pwa", "vibe-account-creation", "vibe-account-health-liquidations"]
---

# Vibe Mobile PWA

The mobile PWA page positions Vibe as an installable trading surface for users who want position control and alerts away from desktop. It is especially relevant to email-created accounts, where the official source recommends installing the app for smoother mobile usage.

## Notifications

The public page lists push notifications for opened trades, closed trades, referral updates, liquidations, new features, rewards, and newly added trading pairs. It also says users can configure which notifications they receive in app settings.

For documentation, that notification list should be treated as product-surface scope. It does not replace risk monitoring; it tells the user which events the mobile app is designed to surface.

## Installation Flow

The official setup flow is platform-specific:

- On iOS, open Safari, visit `app.vibe.trading`, choose Install PWA App from the navigation menu, use the share sheet, and add the app to the home screen.
- On Android, open Chrome or another browser, visit `app.vibe.trading`, choose Install PWA App, use the browser menu, and add the app to the home screen.

## Reader Implication

When a user asks whether Vibe has a mobile app, the precise answer is "mobile PWA." The docs should explain installation, alert categories, and configurable settings, then route risk-sensitive questions back to account health, liquidation, and portfolio pages.

## Sources

- `vibe-mobile-pwa`: official iOS/Android setup instructions, notification categories, and configurable settings.
- `vibe-account-creation`: account-path context for email/social onboarding.

## Related Pages

- `authored-vibe-account-creation-and-login`
- `authored-vibe-portfolio-and-account-data`
- `authored-vibe-account-health-and-liquidations`
