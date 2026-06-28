---
id: "authored-vibe-ios-pwa-install"
title: "Installing The Vibe PWA On iOS"
section: "product-reference"
track: "Account And Safety"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-mobile-pwa", "vibe-account-creation"]
sourceUrls: ["https://docs.vibe.trading/trading/mobile-app-pwa.md", "https://docs.vibe.trading/getting-started/account-creation.md"]
relatedGeneratedPages: ["vibe-mobile-pwa", "vibe-account-creation", "authored-vibe-mobile-pwa"]
---

# Installing The Vibe PWA On iOS

The precise iOS answer is that Vibe is installed as a mobile PWA, not as a separate native App Store application in the current public source.

The official mobile guide says iOS users should open Safari, visit `app.vibe.trading`, select the Install PWA App option from Vibe's navigation menu, use the iOS share sheet, and add the app to the home screen.

## Why Safari Matters

The installation path is platform-specific. On iOS, the source names Safari and the share sheet. The docs should not collapse iOS and Android into one generic "install the app" instruction because the menus are different.

After installation, the PWA gives the user a home-screen entry point for monitoring trades, alerts, and account state. It does not change custody, margin, liquidation, or order-execution semantics.

## Sources

- `vibe-mobile-pwa`: official iOS PWA setup flow.
- `vibe-account-creation`: email/social account context where mobile setup is especially relevant.

## Related Pages

- `authored-vibe-mobile-pwa`
- `authored-vibe-android-pwa-install`
- `authored-vibe-pwa-notification-categories`
