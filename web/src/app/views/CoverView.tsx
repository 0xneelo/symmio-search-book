import { useCallback, useRef } from 'react'
import { AskPanel, DashedRule, DismissGuard, RatingButtons } from '@/components/manual'
import { recordAnswerRating, type VoteValue } from '@/lib/voting'
import type { SearchBookApp } from '../useSearchBook'
import { AnswerBody } from '../AnswerBody'
import { useVote } from '../useVote'
import { useState } from 'react'

/**
 * §00 Cover & Ask — comp cover layout: title row + tagline over the dashed
 * rule, 720px Ask panel centered in the remaining space. Answer replaces the
 * ask form with the question echoed above (DESIGN.MD §8). Voting is one-shot
 * with optimistic reaction and the dismiss-guard (SYN-352).
 */
export function CoverView({ app }: { app: SearchBookApp }) {
  const [guardOpen, setGuardOpen] = useState(false)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const answer = app.answer
  const persist = useCallback(
    (value: VoteValue) => {
      if (!answer) return Promise.reject(new Error('No answer to rate.'))
      return recordAnswerRating({
        eventId: answer.eventId,
        rating: value,
        isServiceAnswer: !!answer.result.serviceResponse,
        query: answer.query,
        pageTitle: answer.result.page?.title || 'No grounded page',
        pageId: answer.result.page?.id ?? null,
        curatedExamples: app.examples,
      }).then((outcome) => {
        app.bumpInsights()
        return outcome
      })
    },
    [answer, app],
  )
  const voteState = useVote(persist)

  const resetAnswer = useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current)
    app.dismissAnswer()
    voteState.reset()
    setGuardOpen(false)
  }, [app, voteState])

  const requestDismiss = () => {
    if (voteState.rating) resetAnswer()
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
            voteState.reset()
            app.handleAsk(app.query)
          }}
          onFocus={() => app.setActiveField('cover')}
          onBlur={() => app.setActiveField(app.activeField === 'cover' ? null : app.activeField)}
          ghost={ghost}
          chips={app.examples.map((label) => ({
            label,
            onClick: () => {
              voteState.reset()
              app.setQuery(label)
              app.handleAsk(label, 'example')
            },
          }))}
          answered={!!answer}
          echoedQuery={answer?.query}
          answer={
            answer &&
            (answer.loading ? (
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
                result={answer.result}
                query={answer.query}
                eventId={answer.eventId}
                onOpenPage={app.setActivePage}
                rating={
                  <RatingButtons
                    rating={voteState.rating}
                    locked={voteState.locked}
                    error={voteState.error}
                    onRate={(dir) => void voteState.vote(dir)}
                    onDismiss={requestDismiss}
                  />
                }
              />
            ))
          }
        />
      </div>

      <DismissGuard
        open={guardOpen}
        rating={voteState.rating}
        locked={voteState.locked}
        error={voteState.error}
        onRate={(dir) => {
          void voteState.vote(dir).then((ok) => {
            // DESIGN.MD §8: a successful modal rating auto-dismisses after 850ms.
            if (ok) dismissTimer.current = setTimeout(resetAnswer, 850)
          })
        }}
        onCancel={() => setGuardOpen(false)}
        onDismiss={resetAnswer}
      />
    </div>
  )
}
