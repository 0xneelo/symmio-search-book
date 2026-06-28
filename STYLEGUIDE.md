# Style Guide

## Voice

- Precise, composed, and source-led.
- Write for sophisticated crypto market participants.
- Explain the mechanism before the claim.
- Prefer "current implementation", "current docs say", and "planned Phase B" when the fact depends on source status.
- Avoid retail crypto hype, exaggerated certainty, and unsupported superlatives.

## Page Structure

Every substantive page should include:

1. One-sentence answer.
2. Mechanism explanation.
3. User-facing implications.
4. Source notes.
5. Related questions.
6. Open gaps if the page depends on unresolved facts.

## Source Rules

- Cite the exact source for every claim.
- Use primary sources first: local code/docs, Vibe docs, Symmio docs, Hyperliquid docs, issue records.
- Treat Neelo's GitHub docs as the backbone for vision, category thesis, and market-formation narrative.
- Mark internal implementation claims separately from public product claims.
- Do not quote long passages. Paraphrase and link.
- Do not expose private endpoints, secrets, keys, or operational credentials.

## Terminology

- `PartyA`: trader/requester side in Symmio language.
- `PartyB`: solver/market-maker counterparty in Symmio language.
- `Solver`: professional counterparty that prices, accepts, hedges, and settles trades.
- `Intent`: trade request or desired action expressed before a solver accepts it.
- `VibeCaps`: Vibe lowcap perps surface; describe with margin/isolated-market context.
- `Network volume`: descendant wallet trading volume used by the onboarding dashboard; depth must remain flagged until reconciled.
- `Estimated revenue`: dashboard estimate from network volume and configurable fee/share inputs; not final realized protocol accounting.

## UI Direction

- Base: dark navy `#070d1a`.
- Accent: Vibe pink `#f584ee`.
- Secondary accent: cyan for routing/search state, green only for verified positive economics or success.
- Typography: Plus Jakarta Sans preference, with Inter/system fallbacks; mono for metadata.
- Layout: editorial hierarchy with dense reference affordances, not a generic SaaS dashboard.
- Components: prominent ask bar, exact page routes, source chips, rating controls, question ledger, gap ledger.
