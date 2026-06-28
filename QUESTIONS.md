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
| How is estimated network revenue calculated? | `authored-estimated-network-revenue` | Medium | Local implementation supports formula; label as estimate and keep disclosure caveat. |
| Why does the dashboard revenue number move? | `revenue-pulse` | Medium | Local code/docs describe pulse from volume history. |
| What does the Dashboard Overview show? | `authored-dashboard-overview` | Medium | Local dashboard code supports the route and cards; revenue and depth wording still carry operator caveats. |
| Where do I see my invite statuses? | `authored-dashboard-invites` | High | Local My invites view shows masked invites, status, follow-up, dashboard-opened state, and referee progress. |
| What does My network show? | `authored-dashboard-network` | Medium | Local graph/tree behavior is sourced; final public depth language remains unresolved. |
| Where does network volume come from? | `authored-dashboard-volume` | Medium | Current code uses backend wallet-volume snapshots; planned subgraph migration remains a tracked gap. |
| What do dashboard tasks unlock? | `authored-dashboard-tasks` | High | Local task view and FAQ explain onboarding actions, bonuses, and referral-completion context. |
| What can I change in Settings? | `authored-dashboard-settings` | High | Local settings code captures contact metadata and recovery email without implying live email recovery. |
| Where is the dashboard FAQ sourced from? | `authored-dashboard-faq` | Medium | Local FAQ is a seed until Discord/Lafa import is provided. |
| What is HIP-3 and why compare it? | `authored-vibe-as-discovery-layer` | Medium | Hyperliquid docs support builder-deployed perps context; Neelo docs frame Vibe as a discovery layer. |
| Why do intents matter if order books already exist? | `authored-intents-complete-order-books` | Medium | Neelo docs frame Vibe as a complement to order books, not a denial of them. |
| What does Proof of Value mean? | `authored-proof-of-value` | Medium | Neelo's paper provides the vision; treat as thesis rather than implemented dashboard behavior. |
| Why does Vibe need a short side? | `authored-truth-markets-no-button` | Medium | Neelo's information/trade paper frames shorting as the missing negative market signal. |
| What is the listing monopoly? | `authored-listing-monopoly` | Medium | Neelo's lifecycle framework explains why derivatives access is a power center. |
| Why are curated listings gameable? | `authored-game-theory-of-listings` | Medium | Neelo's game-theory paper separates perceived interest from actual market interest. |
| What are the three Vibe pillars? | `authored-vibe-pillars` | Medium | Neelo's pillars paper links bootstrap, defense, and LP economics. |
| How do LP profit and dynamic pricing work? | `authored-lp-profit-and-dynamic-pricing` | Low | Neelo's funding model supports the architecture, but public economics wording depends on operator review. |
| Why compare token-vault perps with USDC pools? | `authored-token-vault-perps-versus-usdc-pools` | Low | Neelo's risk-premium material supports the distinction; final product claims need editorial review. |
| Why are referrals part of market formation? | `authored-referral-architecture-as-market-formation` | Medium | Neelo's referral architecture frames incentives as listing-quality infrastructure; depth claims remain parked. |
| Explain the whole Vibe x Symmio thesis. | `authored-bootstrap-trilemma` | Medium | The generated new-reader journey starts here, then routes through Proof of Value, listing power, intents, solvers, trade flow, and dashboard overview. |
| What should I read first as a solver or LP? | `authored-intents-and-solvers` | Medium | The generated solver/LP journey starts with mechanism, then PartyB responsibilities, Symmio solver role, pillars, economics, and token-vault risk. |
| What should I read first as a dashboard user? | `authored-dashboard-overview` | High | The generated dashboard-user journey walks Overview, invites, network, volume, tasks, FAQ, and settings. |
| What should Vibe x Symmio borrow from the best docs? | `authored-competitive-docs-benchmark` | Medium | Competitive synthesis from the verified official-docs batch; Opyn remains an access gap. |
| How do Vibe options use Symmio settlement? | `authored-options-intent-lifecycle` | Medium | Official Symmio options docs support the open/close intent lifecycle; Vibe-specific vault/inventory examples still need owner review. |
| What is the market assembly line? | `authored-market-assembly-line` | Medium | Neelo's order-book paper frames Vibe as a lifecycle stage between spot liquidity and deeper execution; SSHE details remain owner-review. |
| Does Vibe compete with order books? | `authored-order-books-as-graduation-layer` | Medium | Neelo's CLOB-upgrade thesis frames Vibe as an upstream discovery layer for order-book ecosystems, not a replacement claim. |
| Why are narrative-based listings weak? | `authored-end-of-narrative-based-listings` | Medium | Neelo's order-book Part II notes separate actual interest from perceived interest and explain Vibe's demand-discovery role. |
| What does liquidity mean for traders? | `authored-liquidity-as-trader-experience` | Medium | Neelo's listing notes define liquidity as enter/exit/settle reliability, not only TVL or open interest. |
| What is the last primitive? | `authored-last-primitive` | Medium | Neelo's one-primitive paper frames permissionless derivatives as the missing layer after token issuance and spot trading. |
| Why is token-margined risk reflexive? | `authored-token-margined-reflexivity-risk` | Medium | Neelo's Percolator critique explains same-asset collateral/exposure reflexivity and inverse payoff risk. |
| Why does information validation matter to Vibe? | `authored-information-validation-crisis` | Medium | Neelo's one-primitive paper frames markets as validation infrastructure in an era of cheap information generation. |
| Why does universal token issuance need derivatives? | `authored-universal-issuance-needs-derivatives` | Medium | Neelo's issuance-revolution argument explains why spot access alone leaves token markets one-sided. |
| Why do derivatives matter? | `authored-why-derivatives-matter` | Medium | Neelo's thesis frames derivatives as the missing layer for two-sided price discovery, hedging, and market discipline. |
| How should I compare perpetual protocol designs? | `authored-perpetual-protocol-design-space` | Medium | Neelo's framework compares matching, collateralization, and insurance topology across perp architectures. |
| Who bears risk in permissionless perps? | `authored-economic-clarity-for-permissionless-perps` | Low | Neelo's economic-clarity source supports the risk-allocation framework; exact Vibe economics still need owner review. |

## Prototype Event Log

The static prototype records asked questions, routed pages, answer ratings, and low-rated or unanswered gaps in browser `localStorage`. The Search insights view can export that JSON for later ingestion into the production datastore once the platform/backend decision is resolved.

## Needs Reconciliation

| Question | Gap | Notes |
| --- | --- | --- |
| Does referral depth count 5 or 15 levels? | `G-003` | Do not publish a single final answer until production state and copy are aligned. |
| Are onboarding points the same as Vibe trading points? | `G-009` | Local dashboard distinguishes them; public docs need canonical naming. |
| Which revenue sources are live today? | `G-004` | Phase A versus Phase B needs public wording. |
| Is network volume sourced from backend REST or subgraphs? | `G-005` | Current code uses backend REST; Linear research recommends subgraphs, and public Goldsky docs are now registered for the future source path. |
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
