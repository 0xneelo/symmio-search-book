---
id: "authored-volume-03-listing-power-and-orderbooks"
title: "Volume 03: Listing Power And Orderbook Alternatives"
section: "compendium"
track: "Volume 03"
status: "published"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers", "hyperliquid-hip3", "spec-02"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/00-abstract", "https://0xneelo.github.io/vibe_docs/docs/04-ode-to-the-orderbook/04-docs/overview", "https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals.md", "_specs/app-docs/02-narrative-thesis.md"]
relatedGeneratedPages: ["authored-listing-monopoly", "authored-listing-monopoly-source-navigation-map", "authored-game-theory-of-listings", "authored-intents-complete-order-books", "authored-ode-orderbooks-source-navigation-map", "authored-ode-part-ii-source-navigation-map", "authored-vibe-as-discovery-layer", "authored-hyperliquid-gap-lower-layer", "neelo-03-listing-monopoly-03-docs-00-abstract", "neelo-04-ode-to-the-orderbook-04-docs-overview"]
---

# Volume 03: Listing Power And Orderbook Alternatives

This volume takes the honest objection seriously: order books dominate for a reason. They are transparent, competitive, and efficient when enough liquidity and attention already exist. The argument here is not that order books are obsolete. It is that order books do not solve the whole market lifecycle.

Vibe's position is sharper: intent-based derivatives complete order books by covering the phase where a market has demand but not yet the conditions for a deep book. That is also where listing power concentrates. If a project has to beg for a listing before price discovery can start, market formation is gatekept.

## What This Volume Does

- It names listing access as a market-structure problem, not only a business-development problem.
- It explains why permissionless perps are only useful if market birth can be priced and settled credibly.
- It compares Vibe's discovery-layer role with Hyperliquid's HIP-3 surface without collapsing their settlement paths.
- It links the editorial thesis to later implementation pages about intents, solvers, and dashboard proof.

## Reading Order

Start with `authored-listing-monopoly`. That page names the central control problem: listing power is not just who can display a token symbol, but who controls the path from early attention to tradeable liquidity and later mature-market access.

Then read the Listing Monopoly path: `authored-listing-monopoly-paper-roadmap`, `authored-listing-lifecycle-stage-map`, `authored-listing-control-power-loop`, `authored-listing-plus-liquidity-thesis`, and `authored-listing-liquidity-listings-flywheel`. This path explains why listing without liquidity is weak, why the lifecycle gap matters, and why a permissionless perp layer has to produce evidence rather than merely request inclusion.

Use `authored-listing-monopoly-source-navigation-map` when you need the source map rather than the argument. It routes Neelo's overview, reading-order, 4Z listing/liquidity, conclusion, reference, and version-history fragments into exact authored pages without turning source TODOs, acknowledgments, or source-time examples into current claims.

After that, read the order-book complementarity path: `authored-intents-complete-order-books`, `authored-order-books-as-mature-end-state`, `authored-order-book-bootstrap-limit`, `authored-rfq-before-order-book`, `authored-market-assembly-line`, and `authored-order-books-as-graduation-layer`. This path is where the volume stops sounding anti-order-book. Order books are the mature destination; intents and solver-mediated liquidity are the bootstrap layer that can get more markets to that destination.

Use `authored-ode-orderbooks-source-navigation-map` and `authored-ode-part-ii-source-navigation-map` when a reader asks how Neelo's Ode sources should be read. The first map handles the order-book complementarity thesis; the second handles admission bottlenecks, narrative-based listing limits, graduation data, and the lower discovery layer beneath order books.

Finish with the HIP-3 and discovery-layer bridge: `authored-vibe-as-discovery-layer`, `authored-hyperliquid-gap-lower-layer`, `authored-launchpad-dex-vibe-orderbook-path`, and `authored-programmatic-market-graduation`. This bridge lets the compendium discuss Hyperliquid and builder-deployed perps without claiming every early market already belongs on a top-layer order book.

## Reader Implication

For market creators, this volume is the argument for building evidence before asking for venue permission. For mature-market traders, it is the bridge from familiar order books to intent-based bootstrap markets.

## Publication Boundary

Treat this volume as the compendium's listing-power and order-book-complementarity spine, not as a live venue-integration sheet. HIP-3 outcomes, direct Hyperliquid routing, SSHE mechanics, automatic graduation rules, market-maturity thresholds, market-score formulas, source-time venue market-share examples, launchpad partnerships, order-book listing policies, downstream listing influence, and monopoly or structural-superiority verdicts remain fresh primary-source, product, market, risk, legal, accounting, security, and operator review items before publication as current facts.

## Sources

- `vibe-papers`: Neelo papers on listing monopoly, order books, and market lifecycle.
- `hyperliquid-hip3`: HIP-3 builder-deployed perpetuals.
- `spec-02`: Required intents-vs-order-books and HIP-3 thesis.

## Related Pages

- `authored-listing-monopoly`
- `authored-listing-monopoly-source-navigation-map`
- `authored-game-theory-of-listings`
- `authored-intents-complete-order-books`
- `authored-ode-orderbooks-source-navigation-map`
- `authored-ode-part-ii-source-navigation-map`
- `authored-vibe-as-discovery-layer`
- `authored-hyperliquid-gap-lower-layer`
