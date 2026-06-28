# Question Ledger

Questions are grouped by whether the current source set can answer them.

## Answerable In Prototype

| Question | Routed page | Confidence | Notes |
| --- | --- | --- | --- |
| What is Vibe Trading? | `authored-vibe-product-overview` | Medium | Public Vibe docs answer; exact market counts need fresh verification before final publication. |
| What is Symmio? | `authored-symmio-clearing-house-layer` | High | Public Symmio docs answer; authored page explains the clearing-house and hybrid settlement model. |
| What is an intent? | `authored-vibe-intent-architecture` | High | Vibe architecture and Symmio lifecycle docs explain intent as requested trade outcome plus protocol state. |
| Who are PartyA and PartyB? | `authored-symmio-party-a-party-b` | High | Symmio core docs support the role distinction. |
| What does a solver do? | `authored-vibe-intent-architecture` | High | Vibe architecture and Symmio lifecycle docs explain solver quote, collateral, hedging, and lifecycle responsibilities. |
| How does VibeCaps margin work? | `authored-vibecaps-margin-management` | High | Public Vibe margin page explains add/remove behavior, liquidation-distance effects, and removal constraints. |
| How do I place a simple Vibe trade? | `authored-vibe-simple-trade-flow` | High | Public Vibe simple-trade docs support the ticket sequence, with architecture docs covering the intent layer. |
| Which order types does Vibe support? | `authored-vibe-order-types` | High | Public Vibe order-type docs support market, limit, TP/SL, stop-market, stop-limit, and coming-soon advanced types. |
| How do TP/SL orders work on Vibe? | `authored-vibe-tpsl` | High | Public Vibe TP/SL docs support trigger behavior, input methods, amendment flow, full-position default, and slippage caveat. |
| What do open interest and available liquidity mean? | `authored-vibe-oi-and-liquidity` | High | Public Vibe docs define OI, available liquidity, and solver-capacity caveats. |
| What is the difference between collateral and margin? | `authored-vibe-collateral-and-margining` | High | Public Vibe docs and Symmio core docs support collateral, margin, CVA, cross-margin, isolated margin, and virtual-account language. |
| What fees or funding should I understand before trading? | `authored-vibe-fees-and-funding` | Medium | Public Vibe fee docs identify cost categories but contain placeholder percentages; funding docs support funding-direction and minimum-payment behavior. |
| How are Vibe points earned? | `authored-vibe-points-program` | Medium | Public docs cover trading, referring, and community categories; onboarding dashboard has separate campaign logic. |
| How is estimated network revenue calculated? | `authored-estimated-network-revenue` | Medium | Local implementation supports formula; label as estimate and keep disclosure caveat. |
| Why does the dashboard revenue number move? | `authored-dashboard-revenue-pulse` | Medium | Local pulse code derives a non-negative rate from recent revenue history or cold-start account age; keep it distinct from settled payout. |
| What does the Dashboard Overview show? | `authored-dashboard-overview` | Medium | Local dashboard code supports the route and cards; revenue and depth wording still carry operator caveats. |
| Where do I see my invite statuses? | `authored-dashboard-invites` | High | Local My invites view shows masked invites, status, follow-up, dashboard-opened state, and referee progress. |
| What does My network show? | `authored-dashboard-network` | Medium | Local graph/tree behavior is sourced; final public depth language remains unresolved. |
| Where does network volume come from? | `authored-dashboard-volume` | Medium | Current code uses backend wallet-volume snapshots; planned subgraph migration remains a tracked gap. |
| Why does network volume use daily snapshots? | `authored-volume-snapshot-cadence` | Medium | Local volume code supports cache, stale-while-revalidate, daily snapshots, and stale UI markers. |
| What is the Barometer volume upgrade? | `authored-barometer-subgraph-upgrade` | Medium | Linear research and Goldsky docs support the subgraph-backed direction; exact endpoint and venue mapping remain owner-review. |
| What do dashboard tasks unlock? | `authored-dashboard-tasks` | High | Local task view and FAQ explain onboarding actions, bonuses, and referral-completion context. |
| What can I change in Settings? | `authored-dashboard-settings` | High | Local settings code captures contact metadata and recovery email without implying live email recovery. |
| Where is the dashboard FAQ sourced from? | `authored-dashboard-faq` | Medium | Local FAQ is a seed until Discord/Lafa import is provided. |
| What are the different kinds of points? | `authored-points-taxonomy` | Medium | Local points ledger, network points aggregation, dashboard footer, and public Vibe docs support rail-by-rail terminology. |
| How do onboarding points settle at TGE? | `authored-tge-settlement-multiplier` | Low | Dashboard footer and grounding spec support the TGE multiplier concept; final formula and claim mechanics need owner review. |
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
| Why is exploit resistance a Vibe pillar? | `authored-exploit-resistance-pillar` | Medium | Neelo's Vibe Pillars paper frames leveraged-market defense as the first architecture constraint. |
| Why does Vibe need asynchronous counterparty formation? | `authored-bootstrap-counterparty-pillar` | Medium | Neelo's second pillar explains why thin markets cannot rely on continuous synchronous matching. |
| Why is LP yield part of market design? | `authored-lp-yield-capital-efficiency-pillar` | Low | Neelo's third pillar supports the capital-efficiency argument; exact public economics still require operator review. |
| Why are the Vibe pillars coupled? | `authored-coupled-design-problem` | Medium | Neelo's coupled design section explains why optimizing only defense, bootstrap, or yield breaks the model. |
| What is the defense hierarchy before ADL? | `authored-funding-defense-hierarchy` | Low | Neelo's funding model supports the layered defense framework; production percentages and ADL behavior still need implementation review. |
| What does the SYMM LP case study show? | `authored-symm-lp-case-setup` | Low | Neelo's SYMM LP case supports the mechanism and setup; it remains one favorable-period case, not a generalized return promise. |
| How should I read SYMM LP unit economics? | `authored-symm-lp-unit-economics` | Low | The case-study data supports realized/unrealized and token/cash distinctions; audited attribution and drawdowns are still needed for final performance claims. |
| What risks could make an LP case study reverse? | `authored-symm-lp-risk-and-edge-cases` | Low | Neelo's risk section names regime, leverage, liquidity, concentration, and unrealized-PnL risks; exact production controls need operator review. |
| Can the SYMM LP model be replicated? | `authored-symm-lp-replication-framework` | Low | The scaling paper supports phased pilots, validation, tranche scaling, and KPI reporting rather than one-step generalized deployment. |
| Which metrics need guardrails in the SYMM LP case study? | `authored-symm-lp-data-guardrails` | Low | The data snapshot defines sign conventions and reproducibility notes; public yield wording still needs careful accounting review. |
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
| What is Symmio's clearing-house model? | `authored-symmio-clearing-house-layer` | High | Official Symmio docs frame the protocol as a hybrid clearing-house layer with off-chain pricing and on-chain collateral, position, and settlement state. |
| How does a Symmio intent become a position? | `authored-bilateral-intent-lifecycle` | High | Official Symmio core and lifecycle docs support the PartyA submit, solver observe, lock, collateral allocation, open, close, and reconciliation path. |
| What does a Symmio solver monitor? | `authored-solver-event-monitoring` | High | Official lifecycle docs describe quote events, PartyB whitelists, risk checks, locking, collateral allocation, partial fills, and status reconciliation. |
| What are collateral, margin, and CVA? | `authored-collateral-margin-cva` | High | Official Symmio core docs define collateral, locked margin, CVA, available balance, and the current collateral formula. |
| How does a solver hedge before accepting a lowcap trade? | `authored-residual-counterparty-hedge-first` | Low | Neelo DDQ sources support hedge-first residual counterparty behavior; production-specific hedge policy needs operator review. |
| What happens if a solver cannot hedge? | `authored-solver-hedging-failure-modes` | Low | Neelo DDQ sources describe constrained hedging, refusal/tightening/freezing paths, and strategic unhedged exposure caveats. |
| What happens if a solver goes offline? | `authored-solver-operational-failure-force-close` | Low | Neelo DDQ sources describe Force Close as an escape hatch; exact production timers/proofs/UI need implementation review. |
| What happens if a solver defaults? | `authored-solver-default-and-continuity` | Low | Neelo DDQ sources distinguish protocol-operated and third-party solver default modes; exact production behavior needs operator review. |
| Who bears losses in a tail event? | `authored-loss-waterfall-and-profit-caps` | Low | Neelo DDQ sources describe the loss waterfall and profit-cap model; exact caps and insurance policy need operator review. |

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
