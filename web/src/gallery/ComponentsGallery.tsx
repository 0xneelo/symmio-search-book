import { useState } from 'react'
import {
  AnnouncementBar,
  AnswerCard,
  AskField,
  AskPanel,
  ChapterHeading,
  Chip,
  DashedRule,
  DismissGuard,
  FigEpoch,
  FigIntentLifecycle,
  FigReferralGraph,
  FigRevenueSplit,
  FigStack,
  FigurePlate,
  GlossaryGrid,
  Kicker,
  Prose,
  ProseColumns,
  RatingButtons,
  Sidebar,
  TopBar,
  type Rating,
} from '@/components/manual'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 2,
          color: '#8fa0d8',
          borderBottom: '1px solid rgba(255,255,255,0.14)',
          paddingBottom: 8,
          marginBottom: 24,
        }}
      >
        {title}
      </div>
      {children}
    </section>
  )
}

const GALLERY_NAV = [
  { id: 'cover', num: '00', name: 'Cover & Ask' },
  { id: 'why', num: '01', name: 'Why We Need a Manual?' },
  { id: 'start', num: '02', name: 'Getting Started' },
  { id: 'glossary', num: '06', name: 'Glossary' },
]

/** Review route for every M2 component and its states (SYN-349). */
export function ComponentsGallery() {
  const [rating, setRating] = useState<Rating>(null)
  const [modalRating, setModalRating] = useState<Rating>(null)
  const [guardOpen, setGuardOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeField, setActiveField] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [navActive, setNavActive] = useState('cover')

  const ghost = (me: string) => activeField !== null && activeField !== me && query.length > 0

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '34px 48px 110px' }}>
        <Kicker size={14} tracking={3} style={{ marginBottom: 6 }}>
          COMPONENT GALLERY
        </Kicker>
        <h1
          style={{
            margin: '0 0 40px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 54,
            letterSpacing: -2.2,
            color: '#ffffff',
          }}
        >
          Field Manual design system<span style={{ color: 'var(--ink)' }}>.</span>
        </h1>

        <Section title="TYPOGRAPHY — CHAPTER HEADING / DASHED RULE / PROSE + DROP CAP / KICKER">
          <ChapterHeading title="Why we need a manual" punctuation="?" />
          <ProseColumns>
            <Prose dropcap>
              Before and between the moment a trade is placed and the moment a payout lands, a lot
              happens. This manual takes that path apart, layer by layer. Nothing here is meant to
              be a black box.
            </Prose>
            <Prose last>
              Read it like a reference, not a story. Jump to a chapter from the index, or ask the
              manual a direct question on the cover.
            </Prose>
          </ProseColumns>
        </Section>

        <Section title="ANNOUNCEMENT BAR / TOP BAR">
          <div style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
            <AnnouncementBar
              message="Referral Program is officially live — earn rewards by inviting friends."
              cta={{ label: 'JOIN NOW ↗', href: '#' }}
            />
            <TopBar breadcrumb="VIBE × SYMM · FIELD MANUAL" section={{ num: '03', name: 'REWARDS & REFERRALS' }}>
              <AskField
                value={ghost('top') ? '' : query}
                onChange={setQuery}
                onSubmit={() => setAnswered(true)}
                onFocus={() => setActiveField('top')}
                onBlur={() => setActiveField((f) => (f === 'top' ? null : f))}
                placeholder="Ask the manual —"
                ghost={ghost('top')}
              />
            </TopBar>
          </div>
        </Section>

        <Section title="SIDEBAR — HOVER TO EXPAND 64→272 (CROSS-FIELD GHOST WIRED TO THE OTHER FIELDS)">
          <div style={{ position: 'relative', height: 460, border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' }}>
            <Sidebar
              items={GALLERY_NAV}
              activeId={navActive}
              onNavigate={setNavActive}
              search={{
                value: query,
                onChange: setQuery,
                onSubmit: () => setAnswered(true),
                onFocus: () => setActiveField('side'),
                onBlur: () => setActiveField((f) => (f === 'side' ? null : f)),
                ghost: ghost('side'),
              }}
              backLink={{ label: 'Back to app', href: '#' }}
            />
            <div style={{ marginLeft: 64, padding: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5f6cb0' }}>
              content pane — hover the rail
            </div>
          </div>
        </Section>

        <Section title="ASK PANEL + CHIPS → ANSWER CARD + RATING (FULL FLOW, WITH DISMISS-GUARD)">
          <div style={{ width: 720, maxWidth: '100%' }}>
            <AskPanel
              query={query}
              onQuery={setQuery}
              onSubmit={() => setAnswered(true)}
              onFocus={() => setActiveField('cover')}
              onBlur={() => setActiveField((f) => (f === 'cover' ? null : f))}
              ghost={ghost('cover')}
              chips={[
                { label: 'When do referral points credit?', onClick: () => setAnswered(true) },
                { label: 'How is my revenue calculated?', onClick: () => setAnswered(true) },
                { label: 'Why is my live counter not moving?', onClick: () => setAnswered(true) },
                { label: 'How do I get more invites?', onClick: () => setAnswered(true) },
              ]}
              answered={answered}
              echoedQuery={query || 'When do referral points credit?'}
              answer={
                <AnswerCard
                  meta="routed answer / score question-route:118"
                  title="When referral points credit"
                  body="Referral points accrue continuously as your invitees trade, but they settle to your balance at the close of each epoch (00:00 UTC). A point is final only once the underlying fill is settled on the SYMM clearing layer."
                  source="vibe-manual / §02 referrals"
                  confidence="High"
                  rating={
                    <RatingButtons
                      rating={rating}
                      onRate={setRating}
                      onDismiss={() => {
                        if (rating) {
                          setAnswered(false)
                          setRating(null)
                        } else {
                          setGuardOpen(true)
                        }
                      }}
                    />
                  }
                />
              }
            />
            {answered && (
              <button
                type="button"
                onClick={() => {
                  setAnswered(false)
                  setRating(null)
                }}
                style={{
                  marginTop: 12,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#8fa0d8',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                reset flow
              </button>
            )}
          </div>
        </Section>

        <Section title="RATING BUTTONS — ISOLATED STATES">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <RatingButtons rating={null} onRate={() => {}} />
            <RatingButtons rating="up" onRate={() => {}} />
            <RatingButtons rating="down" onRate={() => {}} />
            <RatingButtons rating={null} onRate={() => {}} error="rating failed — try again" />
          </div>
        </Section>

        <Section title="CHIPS">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            <Chip>When do referral points credit?</Chip>
            <Chip>How is my revenue calculated?</Chip>
            <Chip>Why is my live counter not moving?</Chip>
          </div>
        </Section>

        <Section title="FIGURE PLATE — BARE">
          <FigurePlate
            fig="FIG_000 — SPECIMEN"
            tag="[ PLATE ]"
            maxWidth={880}
            footnote="Mono caption/footnote below the figure body."
          >
            <div
              style={{
                marginTop: 20,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: '#cdd8ff',
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              diagram content lives here
            </div>
          </FigurePlate>
        </Section>

        <Section title="FIG_001 — NETWORK STACK (AUTO-CYCLING HIGHLIGHT)">
          <FigStack />
        </Section>

        <Section title="FIG_010 — EPOCH TIMELINE">
          <FigEpoch />
        </Section>

        <Section title="FIG_021 — REFERRAL GRAPH (PULSES FLOW INWARD)">
          <div style={{ maxWidth: 560 }}>
            <FigReferralGraph />
          </div>
        </Section>

        <Section title="FIG_031 — REVENUE SPLIT">
          <FigRevenueSplit
            formula={
              <>
                net_revenue<span style={{ color: 'var(--ink)' }}>ℹ</span> &nbsp;=&nbsp; Σ ( vol
                <sub>graph</sub> · fee_rate · tier<span style={{ color: 'var(--ink)' }}>ℹ</span> )
                &nbsp;−&nbsp; solver_rebate
              </>
            }
          />
        </Section>

        <Section title="FIG_041 — INTENT LIFECYCLE">
          <FigIntentLifecycle />
        </Section>

        <Section title="GLOSSARY GRID">
          <GlossaryGrid
            entries={[
              {
                term: 'Epoch',
                definition:
                  'The accounting window. Opens, accrues volume, then closes and finalizes at 00:00 UTC.',
              },
              {
                term: 'Referral graph',
                definition:
                  'The directional record of who you invited and who they invited, across multiple hops.',
              },
              {
                term: 'Fill',
                definition:
                  'A trade matched and settled on the clearing layer. Only settled fills are final.',
              },
            ]}
          />
        </Section>

        <Section title="DISMISS-GUARD MODAL">
          <button
            type="button"
            className="chip"
            onClick={() => {
              setModalRating(null)
              setGuardOpen(true)
            }}
            style={{
              background: 'transparent',
              border: '2px solid #2e6bff',
              color: '#cdd8ff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 12,
              padding: '8px 14px',
              cursor: 'pointer',
            }}
          >
            Open dismiss-guard
          </button>
        </Section>

        <Section title="DASHED RULE">
          <DashedRule style={{ margin: 0 }} />
        </Section>
      </div>

      <DismissGuard
        open={guardOpen}
        rating={modalRating}
        onRate={(dir) => {
          setModalRating(dir)
          // DESIGN.MD §8: rating from the modal auto-dismisses after 850ms.
          setTimeout(() => {
            setGuardOpen(false)
            setModalRating(null)
            setAnswered(false)
            setRating(null)
          }, 850)
        }}
        onCancel={() => setGuardOpen(false)}
        onDismiss={() => {
          setGuardOpen(false)
          setModalRating(null)
          setAnswered(false)
          setRating(null)
        }}
      />
    </div>
  )
}
