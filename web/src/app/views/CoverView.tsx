import { useState } from 'react'
import { AskPanel, DashedRule, DismissGuard, RatingButtons, type Rating } from '@/components/manual'
import type { SearchBookApp } from '../useSearchBook'
import { AnswerBody } from '../AnswerBody'

/**
 * §00 Cover & Ask — comp cover layout: title row + tagline over the dashed
 * rule, 720px Ask panel centered in the remaining space. Answer replaces the
 * ask form with the question echoed above (DESIGN.MD §8).
 * Voting persistence + dismiss-guard round-trip completes in M5 (SYN-352);
 * this view renders the optimistic UI.
 */
export function CoverView({ app }: { app: SearchBookApp }) {
  const [rating, setRating] = useState<Rating>(null)
  const [guardOpen, setGuardOpen] = useState(false)

  const resetAnswer = () => {
    app.dismissAnswer()
    setRating(null)
    setGuardOpen(false)
  }

  const requestDismiss = () => {
    if (rating) resetAnswer()
    else setGuardOpen(true)
  }

  const ghost = app.activeField !== null && app.activeField !== 'cover' && app.query.length > 0

  return (
    <div data-page="cover" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 30,
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 74,
            lineHeight: 0.98,
            letterSpacing: -3,
            color: '#ffffff',
          }}
        >
          Vibe<span style={{ color: 'var(--ink)' }}>×</span>SYMM
          <span style={{ color: 'var(--ink)' }}>.</span>
        </h1>
        <p
          style={{
            margin: '0 0 8px',
            maxWidth: 340,
            textAlign: 'right',
            fontSize: 16,
            lineHeight: 1.5,
            color: '#c9d4ff',
          }}
        >
          An interactive Wikipedia of Symmio and Vibe, just ask any question you have on your mind.
        </p>
      </div>
      <DashedRule />

      <div style={{ width: 720, maxWidth: '100%', margin: 'auto', alignSelf: 'center' }}>
        <AskPanel
          query={app.query}
          onQuery={app.setQuery}
          onSubmit={() => {
            setRating(null)
            app.handleAsk(app.query)
          }}
          onFocus={() => app.setActiveField('cover')}
          onBlur={() => app.setActiveField(app.activeField === 'cover' ? null : app.activeField)}
          ghost={ghost}
          chips={app.examples.map((label) => ({
            label,
            onClick: () => {
              setRating(null)
              app.setQuery(label)
              app.handleAsk(label, 'example')
            },
          }))}
          answered={!!app.answer}
          echoedQuery={app.answer?.query}
          answer={
            app.answer &&
            (app.answer.loading ? (
              <div
                data-answer=""
                style={{
                  border: '2px solid rgba(255,255,255,0.22)',
                  background: 'color-mix(in srgb,var(--paper) 55%,#16276e)',
                  marginTop: 18,
                  padding: '18px 20px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10.5,
                    letterSpacing: 1,
                    color: '#8fa0d8',
                  }}
                >
                  service answer-engine
                </div>
                <h3
                  style={{
                    margin: '10px 0 6px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#ffffff',
                  }}
                >
                  Scanning cited context
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, color: '#d3dbff' }}>
                  Waiting for the configured Search Book answer service.
                </p>
              </div>
            ) : (
              <AnswerBody
                result={app.answer.result}
                query={app.answer.query}
                eventId={app.answer.eventId}
                onOpenPage={app.setActivePage}
                rating={
                  <RatingButtons rating={rating} onRate={(dir) => setRating(dir)} onDismiss={requestDismiss} />
                }
              />
            ))
          }
        />
      </div>

      <DismissGuard
        open={guardOpen}
        rating={rating}
        onRate={(dir) => {
          setRating(dir)
          // DESIGN.MD §8: rating from the modal auto-dismisses the answer after 850ms.
          setTimeout(resetAnswer, 850)
        }}
        onCancel={() => setGuardOpen(false)}
        onDismiss={resetAnswer}
      />
    </div>
  )
}
