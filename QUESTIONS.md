# Question Ledger

Questions are grouped by whether the current source set can answer them.

## Answerable In Prototype

| Question | Routed page | Confidence | Notes |
| --- | --- | --- | --- |
| What is Vibe Trading? | `vibe-what-is` | Medium | Public Vibe docs answer; exact market counts need fresh verification. |
| What is Symmio? | `symmio-what-is` | High | Public Symmio docs answer. |
| What is an intent? | `intent-lifecycle` | High | Symmio core and lifecycle docs. |
| Who are PartyA and PartyB? | `party-a-party-b` | High | Symmio core docs. |
| What does a solver do? | `solver-role` | High | Symmio and Vibe architecture docs. |
| How does VibeCaps margin work? | `vibecaps-margin` | Medium | Public Vibe margin page. |
| How are Vibe points earned? | `vibe-points` | Medium | Public docs cover categories; onboarding dashboard has separate campaign logic. |
| How is estimated network revenue calculated? | `estimated-network-revenue` | Medium | Local implementation supports formula; label as estimate. |
| Why does the dashboard revenue number move? | `revenue-pulse` | Medium | Local code/docs describe pulse from volume history. |
| What is HIP-3 and why compare it? | `hip3-context` | Medium | Hyperliquid docs support builder-deployed perps context. |

## Prototype Event Log

The static prototype records asked questions, routed pages, answer ratings, and low-rated or unanswered gaps in browser `localStorage`. The Search insights view can export that JSON for later ingestion into the production datastore once the platform/backend decision is resolved.

## Needs Reconciliation

| Question | Gap | Notes |
| --- | --- | --- |
| Does referral depth count 5 or 15 levels? | `G-003` | Do not publish a single final answer until production state and copy are aligned. |
| Are onboarding points the same as Vibe trading points? | `G-009` | Local dashboard distinguishes them; public docs need canonical naming. |
| Which revenue sources are live today? | `G-004` | Phase A versus Phase B needs public wording. |
| Is network volume sourced from backend REST or subgraphs? | `G-005` | Current code uses backend REST; Linear research recommends subgraphs. |
| How do Vibe options use Symmio settlement? | `G-008` | Needs deeper Symmio options source mining. |
| Can a vault LP see exact covered-call exposure? | `G-008` | Not sourced in this pass. |
| Which Discord answers are authoritative? | `G-001` | Discord export missing. |

## Seeded FAQ Topics For Discord Mining

- "Where did my points go?"
- "Why is my referral volume lower than expected?"
- "Does my network revenue include indirect referrals?"
- "Why does the USD counter move when I am not trading?"
- "What is the difference between referral commission and pre-TGE points?"
- "Can I list any token as a perp?"
- "What happens if a lowcap token rugs?"
- "Who takes the other side of my trade?"
- "What does isolated margin mean for VibeCaps?"
- "What does a solver hedge against?"
