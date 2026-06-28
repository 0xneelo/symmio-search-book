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
| What is referral identity in Vibe? | `authored-referral-identity-and-claim-flow` | Low | Neelo's referral architecture supports identity, policy, attribution, and claim-flow concepts; final production depth and settlement wording remain parked. |
| How should referral rakeback be documented? | `authored-referral-rakeback-policy-model` | Low | The referral paper supports self/referral channel separation and public/private policy overlays; exact economics need operator review. |
| Why should referral code issuance be qualified? | `authored-referral-issuance-and-anti-gaming` | Low | Neelo's referral-economics source names self-referral, code-shopping, and attribution risks; final public issuance policy remains owner-controlled. |
| What are market-scoped referrals? | `authored-market-scoped-referrals` | Low | The LP/category layer supports market-level referral attachment and partner overlays; current live partner semantics need product confirmation. |
| Which referral metrics prove quality? | `authored-referral-metrics-and-integrity` | Low | Neelo's metrics and security sections support market-quality KPIs and integrity controls; dashboard publication needs phase and formula versioning. |
| What is HIP-3 and why compare it? | `authored-vibe-as-discovery-layer` | Medium | Hyperliquid docs support builder-deployed perps context; Neelo docs frame Vibe as a discovery layer. |
| What are the three axes of perp protocol design? | `authored-perp-protocol-framework` | Medium | Neelo's framework defines matching architecture, collateralization architecture, and insurance topology. |
| Why do static perp designs fail at bootstrap? | `authored-static-perp-design-failures` | Medium | Neelo's landscape and trilemma sections explain why order books, vaults, and async-netted systems each break in a different market state. |
| What is temporal separation of concerns? | `authored-temporal-separation-of-concerns` | Medium | Neelo's trilemma escape frames bootstrap, growth, and maturity as different architecture phases rather than one static configuration. |
| How does Z-score guide market graduation? | `authored-z-score-graduation-criteria` | Low | Neelo's Z-score model supports graduation logic; exact live thresholds and dashboard status require product confirmation. |
| Why is market price a verification layer? | `authored-market-price-as-verification` | Medium | Neelo's Proof of Value source frames market price and short-side expression as verification mechanisms for cheap information. |
| Why do intents matter if order books already exist? | `authored-intents-complete-order-books` | Medium | Neelo docs frame Vibe as a complement to order books, not a denial of them. |
| What does Proof of Value mean? | `authored-proof-of-value` | Medium | Neelo's paper provides the vision; treat as thesis rather than implemented dashboard behavior. |
| Who has to receive value for Vibe to work? | `authored-proof-value-four-constituencies` | Low | Neelo's Proof of Value framework names LPs, traders, projects, and ecosystem as aligned constituencies; exact economics remain owner-review. |
| Why are token holders natural inventory providers? | `authored-token-holder-inventory-alignment` | Low | Neelo's LP value proposition argues token holders already bear directional exposure; vault terms and revenue shares need operator confirmation. |
| What value do traders and projects get from Vibe? | `authored-trader-project-value-loop` | Low | Neelo's trader/project value source supports market access, hedging, utility, and treasury productivity; public economics need review. |
| How does Vibe compare with USDC vault and token-margined perps? | `authored-hybrid-perps-comparative-advantage` | Low | Neelo's comparative-advantage source supports the capital-structure comparison while estimates remain source-model claims. |
| What would prove Vibe is sustainable? | `authored-proof-value-validation-sustainability` | Low | Neelo's validation section supports partner interest, lifecycle maturity, real trading revenue, and stress performance as proof points; current metrics need verification. |
| Why does Vibe need a short side? | `authored-truth-markets-no-button` | Medium | Neelo's information/trade paper frames shorting as the missing negative market signal. |
| Why is Vibe not just a prediction market? | `authored-beyond-polymarket-continuous-truth-markets` | Medium | Neelo's Information/Trade source distinguishes resolved prediction markets from continuous tokenized credibility markets. |
| How do intents help verify long-tail information? | `authored-intent-otc-long-tail-verification` | Low | Neelo's source frames intent-based OTC as a way to price niche long-tail claims without requiring every market to begin with a deep AMM pool. |
| What is the hybrid solver liquidity waterfall? | `authored-hybrid-solver-liquidity-waterfall` | Low | Neelo's source describes external solvers first, then a protocol-operated backstop; exact production solver/vault economics need implementation review. |
| How can Vibe become evidence for downstream listings? | `authored-vibe-as-listing-source-of-truth` | Low | Neelo's source frames Vibe as a stress-test layer for real perp demand; example thresholds are not final product rules. |
| What is the Thumbs Down for the tokenized economy? | `authored-financialized-rejection-thumbs-down` | Medium | Neelo's source turns the missing NO button into a product metaphor for financialized rejection and short-side discipline. |
| What is the listing monopoly? | `authored-listing-monopoly` | Medium | Neelo's lifecycle framework explains why derivatives access is a power center. |
| Why do lifecycle gates create market power? | `authored-lifecycle-gates-as-market-power` | Medium | Neelo's listing-monopoly framework treats creation, graduation, spot, and perp availability as control points that capture users, fees, data, and influence. |
| Why is permissionless listing not enough? | `authored-listing-plus-liquidity-thesis` | Medium | Neelo's Section 4Z distinguishes symbolic market creation from tradeable markets with scalable liquidity generation. |
| What would a gap-filling perp protocol look like? | `authored-gap-filling-perps-protocol` | Medium | Neelo's hypothetical permissionless perps model uses bootstrap, maturation, and graduation rather than treating every listing as a mature market. |
| Why is Vibe complementary to launchpads and order books? | `authored-partnership-over-venue-war` | Medium | Neelo's strategic implications frame the gap-filling layer as upstream evidence and market maturation infrastructure for existing lifecycle controllers. |
| Why is the listing-monopoly thesis a monopoly strategy? | `authored-thielian-listing-monopoly` | Medium | Neelo's Thielian analysis defines the small initial market, value capture, network effects, and durability claims behind lifecycle control. |
| Why are curated listings gameable? | `authored-game-theory-of-listings` | Medium | Neelo's game-theory paper separates perceived interest from actual market interest. |
| What are the three Vibe pillars? | `authored-vibe-pillars` | Medium | Neelo's pillars paper links bootstrap, defense, and LP economics. |
| How do LP profit and dynamic pricing work? | `authored-lp-profit-and-dynamic-pricing` | Low | Neelo's funding model supports the architecture, but public economics wording depends on operator review. |
| What is the funding model trying to control? | `authored-funding-model-control-problem` | Low | Neelo's funding-model intro and abstract support the control-surface framing; exact production policies need operator review. |
| What does gradient flow mean for Vibe markets? | `authored-gradient-flow-market-balancing` | Low | Neelo's core-concepts source explains local risk as repellers and global profit/OI as an attractor; implementation mapping remains review-bound. |
| What are token-inventory and insurance-fund utilization modes? | `authored-utilization-modes-inventory-insurance` | Low | Neelo's utilization-mode source separates ordinary inventory pressure from insurance-capacity stress; source thresholds are not final product values. |
| Which dynamic pricing controls balance a Vibe market? | `authored-dynamic-pricing-controls` | Low | Neelo's dynamic-pricing source covers funding, borrow, spreads, directionality, and rebates; live rates and caps need implementation review. |
| What is bell-curve flattening in Vibe risk management? | `authored-cross-market-risk-mutualization` | Low | Neelo's bell-curve and insurance sources support cross-market risk mutualization, with eligibility and allocation policy still operator-controlled. |
| Why compare token-vault perps with USDC pools? | `authored-token-vault-perps-versus-usdc-pools` | Low | Neelo's risk-premium material supports the distinction; final product claims need editorial review. |
| Why is a generic USDC pool risky for low-cap perps? | `authored-usdc-lp-backstop-cascade` | Low | Neelo's USDC-vs-token source models how thin liquidity, oracle manipulation, imbalance, liquidation latency, and backstop correlation can route losses to USDC LPs. |
| Why are manipulation attacks economic, not random? | `authored-incentive-based-attack-risk` | Medium | Neelo's risk-premium derivation frames low-cap attacks as incentive-based games where exploitability depends on profit versus manipulation cost. |
| Why would USDC LPs demand a high risk premium? | `authored-required-risk-premium-for-usdc-lps` | Low | Neelo's APR derivation separates opportunity cost, expected loss, and adverse-selection premium; exact ranges remain source-model claims. |
| How does token inventory localize risk? | `authored-token-inventory-risk-localization` | Low | Neelo's Vibecaps figure separates token-holder inventory and solver drawdown from generalized USDC backstop losses. |
| What does risk-adjusted capital efficiency mean? | `authored-risk-adjusted-capital-efficiency` | Low | Neelo's leverage and risk-premium figures show why useful capital efficiency must include required return and loss absorption, not only gross OI. |
| Why are referrals part of market formation? | `authored-referral-architecture-as-market-formation` | Medium | Neelo's referral architecture frames incentives as listing-quality infrastructure; depth claims remain parked. |
| Why is exploit resistance a Vibe pillar? | `authored-exploit-resistance-pillar` | Medium | Neelo's Vibe Pillars paper frames leveraged-market defense as the first architecture constraint. |
| Why does Vibe need asynchronous counterparty formation? | `authored-bootstrap-counterparty-pillar` | Medium | Neelo's second pillar explains why thin markets cannot rely on continuous synchronous matching. |
| Why is LP yield part of market design? | `authored-lp-yield-capital-efficiency-pillar` | Low | Neelo's third pillar supports the capital-efficiency argument; exact public economics still require operator review. |
| Why are the Vibe pillars coupled? | `authored-coupled-design-problem` | Medium | Neelo's coupled design section explains why optimizing only defense, bootstrap, or yield breaks the model. |
| What is the defense hierarchy before ADL? | `authored-funding-defense-hierarchy` | Low | Neelo's funding model supports the layered defense framework; production percentages and ADL behavior still need implementation review. |
| Why do token-margined LPs face a lose-lose setup? | `authored-token-margined-lp-lose-lose` | Medium | Neelo's Percolator critique explains why token-denominated collateral, fees, funding, and PnL make LPs short volatility and constrain safe leverage. |
| Why can oracle circuit breakers create arbitrage? | `authored-oracle-circuit-breaker-paradox` | Medium | Neelo's Percolator source shows how capped oracle updates can turn volatility protection into a predictable latency-arbitrage path. |
| Why is isolated slab capital inefficient for many perps? | `authored-slab-isolation-capital-inefficiency` | Medium | Neelo's Percolator source explains why one-market-one-vault accounting is legible but scales capital requirements linearly across long-tail markets. |
| What does Percolator get right? | `authored-percolator-engineering-vs-economics` | Medium | Neelo's critique credits Percolator's formal verification and clean on-chain architecture while separating those strengths from inverse-market economics. |
| Why separate token inventory from USDC settlement? | `authored-usdc-settlement-inventory-separation` | Low | Neelo's Percolator comparison frames Vibe's alternative as separating inventory risk from stable settlement; production parameters still need owner review. |
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
| Why does Vibe praise order books? | `authored-order-books-as-mature-end-state` | Medium | Neelo's Ode to OrderBooks source frames order books as the mature endpoint and Vibe as the upstream discovery layer. |
| Why can't order books bootstrap every long-tail market? | `authored-order-book-bootstrap-limit` | Medium | Neelo's order-book limit and listings chapters explain selectivity, infrastructure cost, and perceived-interest gatekeeping. |
| What does RFQ before order book mean? | `authored-rfq-before-order-book` | Low | Neelo's source supports RFQ/intents as the bootstrap stage before order-book graduation; venue routing and SSHE mechanics remain review-bound. |
| How does Vibe harden a token before listing? | `authored-lifecycle-hardening-before-listing` | Medium | Neelo's lifecycle-hardening source ties shorting and two-sided price discovery to better downstream listing evidence. |
| What is programmatic market graduation? | `authored-programmatic-market-graduation` | Low | Neelo's Part II source names graduation criteria categories; exact thresholds and automation need product confirmation. |
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
