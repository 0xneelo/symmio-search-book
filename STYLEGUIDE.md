# Style Guide

This is the single public-writing style contract for the standalone Search Book. It covers the Vibe x Symmio documentation compendium, the answer-engine front door, living-docs review surfaces, and any generated excerpts that become public navigation.

## Generated Evidence Snapshot

Refresh source: `npm run search-book:verify` plus `npm run search-book:check-status-evidence`.

- Corpus scale: 794 manifest pages, 801 authored pages, 800 public-navigation pages, 792 source companions, and 3 internal drafts.
- Source status: Source ingestion is 17/17 complete with 0 partial, 0 parked, and 0 missing source families; `sourceCompletionReady:true`.
- Answer-engine status: 890 exact public question routes, 892 FAQ entries, 890/890 exact-route tests, 32/32 glossary route tests, 2/2 refusal tests, and 28/28 answer-validation fixtures.
- Live LLM evidence: live OpenAI `gpt-4.1-mini` eval passes 44/44 total fixtures, including 16/16 adversarial cases and 28/28 answer-validation cases.
- Discord/Lafa evidence: Discord/Lafa import is internal-only with 5,000 imported messages, 723 question clusters, 837 configured Lafa answer candidates, `corpusReady:true`, and `storesMessageText:false`.
- Discord review state: 160 routed review items, 91/91 page-fit groups covered by public route aliases, 91/91 source-backed page-fit groups, 91/91 public-copy-ready page-fit groups, and 13/13 refusal-policy-ready items.
- Production boundary: `completionReady:false`, `llmProductionReady:false`, and `livingDocsProductionReady:false` remain intentional until OPERATOR-INBOX #11 production VPS env install and OPERATOR-INBOX #4 public frontend platform/repo/deploy route are resolved.

## Voice

- Precise, composed, and source-led.
- Write for sophisticated crypto market participants who understand options, derivatives, market making, treasury inventory, and solver workflows.
- Explain the mechanism before the claim.
- Use "current implementation", "current docs say", "source boundary", "publication-date check", and "planned Phase B" when a fact depends on source status.
- Treat Neelo's GitHub docs as the backbone for the vision, category thesis, market-formation narrative, and the compendium's manifesto voice. Preserve the contrarian argument, but keep public claims tied to primary sources.
- Avoid retail crypto hype, exaggerated certainty, unsupported superlatives, generic SaaS phrasing, and investment advice.

## Page Structure

Every substantive public page should include:

1. One-sentence answer.
2. Mechanism explanation.
3. User-facing implications.
4. Source notes.
5. Related questions.
6. Open gaps if the page depends on unresolved facts.

Use this shape for concise reference pages as well as manifesto chapters. Long manifesto pages can expand the argument, but they still need a source note and a clear boundary between sourced fact, interpretation, and future work.

## Source Rules

- Cite the exact source for every substantive claim.
- Use primary sources first: local code/docs, Vibe docs, Symmio docs, official GitHub repositories, Hyperliquid docs, Goldsky docs, Linear issue records, and explicitly registered source artifacts.
- Use source companions for retrieval and traceability, not as public-navigation pages.
- Mark internal implementation claims separately from public product claims.
- Do not quote long passages. Paraphrase and link.
- Do not expose private endpoints, secrets, keys, operational credentials, reviewer tokens, raw Discord text, raw Lafa answers, Notion signed-media URLs, payment details, or static treasury/commercial details.
- Do not claim production launch from local or CI evidence. Local `.secrets/search-book.env` is complete for local live eval; production still requires `/etc/symmio-search-book/search-book.env`.

## Terminology

- `Intent`: current public term for a trade request or desired action expressed before a solver accepts it.
- `AMFQ` / `aMFQ`: legacy Vibe name for Intents, short for Automated Market for Quotes. Use `Intent` in current docs; mention AMFQ/aMFQ only when translating older architecture/source language.
- `PartyA`: trader/requester side in Symmio language.
- `PartyB`: solver/market-maker counterparty in Symmio language.
- `Solver`: professional counterparty that prices, accepts, hedges, and settles trades.
- `VibeCaps`: Vibe lowcap perps surface. Describe with margin, isolated-market, and source-boundary context; do not invent covered-call or vault-backed inventory exposure semantics.
- `Network volume`: descendant wallet trading volume used by the onboarding/dashboard model. Public referral depth is 15 levels; historical backfill is additive and never lowers a balance.
- `Estimated revenue`: Phase A dashboard estimate from `networkVolume x platformFeeRate x referrerPlatformShare`, with public defaults `0.05%` / `5 bps` platform fee and a 30% referrer platform share. Do not present this as realized protocol accounting.
- `Phase B`: planned revenue/economics expansion. Phase B economics are out of scope for v1 public answers and should refuse in answer validation when asked for unapproved specifics.
- `Points`: distinguish onboarding points, referral points, network/trading points, and Vibe points. The public TGE settlement formula is deferred and not public for v1.

## Source Boundaries

- Discord/Lafa: imported as internal-only demand and review evidence. Do not quote raw Discord/Lafa text or use specific Lafa statements as public authority until editorial review maps them to primary-source-backed Search Book copy. Public-safe probes should refuse with the Discord review boundary.
- Notion: registered as `vibe-trading-notion` with a paraphrase-only public-use boundary. Do not quote Notion text, publish signed media URLs, or publish payment/static commercial details.
- SSHE: v1 boundary is SuperFlow/SHE OpenAPI plus Symmio Foundation Meta-Solvers/Clearing Layers. Do not claim a Vibe production integration without implementation evidence.
- Symmio whitepaper history: original/pre-v0.8 recovery is out of scope for v1. Use current official docs and located official Git evidence; do not claim an exact original artifact.
- Add Token Info: use the official Markdown source for general page coverage. Route fee, payment, chain, token-address, and treasury details to the live form or agreement-specific materials.
- Vibe market counts and leverage: cite current public-docs wording only after publication-day source-freshness verification.

## Answer And Runtime Rules

- The answer-engine front door must answer from supplied context with citations, route to exact pages where possible, and refuse when the source family or publication boundary is insufficient.
- LLM responses must preserve citation validity: primary page ids, citation page ids, chunk ids, source keys, and source hrefs must be copied from supplied context.
- The live OpenAI `gpt-4.1-mini` evidence is runtime proof, not production launch proof.
- Keep local live evals behind `node --env-file=.secrets/search-book.env`; never print the env file, API key, or runtime secrets.
- Keep production wording bounded to preview-ready until #11 production VPS env install and #4 public frontend/deploy route are resolved.

## UI Direction

- Base: dark navy `#070d1a`.
- Accent: Vibe pink `#f584ee`.
- Secondary accent: cyan for routing/search state, green only for verified positive economics or success.
- Typography: Plus Jakarta Sans preference, with Inter/system fallbacks; mono for metadata.
- Layout: editorial hierarchy with dense reference affordances, not a generic SaaS dashboard.
- Components: prominent ask bar, exact page routes, source chips, rating controls, question ledger, gap ledger, and Search Insights.
