/**
 * "Reference desk" Ask special page (SYN-370, DESIGN.MD Part A): the
 * ask/answer engine restyled as a wiki special page. Answer body 14px/1.6
 * sans; sources as numbered references with ^ backlinks; voting as flat
 * wiki-style links; flagged-answer quarantine behavior unchanged — service
 * refusals render as refusals, degraded mode renders the limited-mode note,
 * and no answer is ever synthesized client-side.
 *
 * Behavior parity (parity-checklist §3–5): handleAsk service branch with
 * local fallback, eventId round-trip to /rating, optimistic one-shot vote
 * lock with error revert, dismiss-guard on unrated dismissal, post-vote
 * thank-you dialog (15s countdown; cancel keeps the answer readable).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { recordAnswerRating, type VoteValue } from '@/lib/voting'
import type { Page, ServiceCitation } from '@/data/types'
import { WikiChrome } from '@/components/wiki/WikiChrome'
import {
  WikiAnswerRating,
  WikiDismissGuard,
  WikiVoteThanks,
} from '@/components/wiki/WikiVoteControls'
import type { SearchBookApp } from '../useSearchBook'
import { useVote } from '../useVote'
import { wikiChromePropsFor } from '../wikiChrome'

function Paragraphs({ text }: { text: string }) {
  const paragraphs = String(text || '')
    .split(/\n{2,}/u)
    .map((item) => item.trim())
    .filter(Boolean)
  if (!paragraphs.length) return <p>No answer text returned.</p>
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  )
}

export function AskView({ app, query }: { app: SearchBookApp; query: string }) {
  const [draft, setDraft] = useState(query)
  const [guardOpen, setGuardOpen] = useState(false)
  const [thanks, setThanks] = useState(false)
  const askedRef = useRef<string | null>(null)

  const answer = app.answer

  // Entering the page (or navigating with a new ?ask=) fires the ask once.
  useEffect(() => {
    const q = query.trim()
    if (!q || !app.data) return
    if (askedRef.current === q) return
    if (answer && answer.query === q) {
      askedRef.current = q
      return
    }
    askedRef.current = q
    void app.handleAsk(q, 'ask')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, app.data])

  useEffect(() => {
    document.title = 'Reference desk - Symmiopedia'
  }, [])

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
    app.dismissAnswer()
    voteState.reset()
    setGuardOpen(false)
    setThanks(false)
  }, [app, voteState])

  const askNext = useCallback(() => {
    resetAnswer()
    document.querySelector<HTMLInputElement>('.wk-ask-input')?.focus()
  }, [resetAnswer])

  const requestDismiss = () => {
    if (voteState.rating) resetAnswer()
    else setGuardOpen(true)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const q = draft.trim()
    if (!q) return
    voteState.reset()
    setThanks(false)
    setGuardOpen(false)
    askedRef.current = q
    app.setSpecial('ask', q)
    void app.handleAsk(q, 'ask')
  }

  const askExample = (label: string) => {
    setDraft(label)
    voteState.reset()
    setThanks(false)
    askedRef.current = label
    app.setSpecial('ask', label)
    void app.handleAsk(label, 'example')
  }

  if (!app.data) {
    return (
      <div className="wiki" style={{ minHeight: '100vh', background: 'var(--wk-canvas)', padding: 40 }}>
        <p className="wk-muted" style={{ fontSize: 12.6 }}>
          Loading the index…
        </p>
      </div>
    )
  }

  const data = app.data
  const pageLink = (page: Page, label?: ReactNode) => (
    <a
      href={`?page=${encodeURIComponent(page.id)}`}
      onClick={(event) => {
        event.preventDefault()
        app.setActivePage(page.id)
      }}
    >
      {label ?? page.title}
    </a>
  )

  const answerReferences = (citations: ServiceCitation[] | undefined, page: Page | null) => {
    const refs: ReactNode[] = []
    for (const [index, citation] of (citations || []).slice(0, 8).entries()) {
      const citedPage = citation.pageId ? data.pageById.get(citation.pageId) : undefined
      refs.push(
        <li key={`c-${index}`}>
          <span className="wk-ref-backlink">
            <a role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
              ^
            </a>
          </span>{' '}
          {citedPage ? pageLink(citedPage, citation.pageTitle || citedPage.title) : citation.pageTitle || citation.sourceKey}
          {citation.sourceKey && <span className="wk-muted"> — {citation.sourceKey}</span>}
          {citation.sourceHref && (
            <>
              {' '}
              <a className="wk-external" href={citation.sourceHref} target="_blank" rel="noreferrer">
                source
              </a>
            </>
          )}
        </li>,
      )
    }
    if (!refs.length && page) {
      for (const key of (page.sourceKeys || []).slice(0, 5)) {
        refs.push(
          <li key={`k-${key}`}>
            <span className="wk-ref-backlink">^</span> {key}
          </li>,
        )
      }
    }
    return refs
  }

  const renderAnswer = () => {
    if (!answer) return null
    if (answer.loading) {
      return (
        <div className="wk-answer" data-answer="">
          <div className="wk-answer-meta wk-muted">service answer-engine</div>
          <h3>Scanning cited context</h3>
          <p>Waiting for the configured Search Book answer service.</p>
        </div>
      )
    }
    const { result } = answer
    const page = result.page
    const ratingRow = (
      <WikiAnswerRating
        state={voteState}
        onRate={(dir) =>
          void voteState.vote(dir).then((ok) => {
            if (ok) setThanks(true)
          })
        }
        onDismiss={requestDismiss}
      />
    )

    if (result.serviceResponse) {
      const response = result.serviceResponse
      const isAnswered = response.status === 'answered'
      const title =
        page?.title || response.citations?.[0]?.pageTitle || (isAnswered ? 'Cited answer' : 'Answer unavailable')
      const refs = answerReferences(response.citations, page)
      return (
        <div className="wk-answer" data-answer="">
          <div className="wk-answer-meta wk-muted">
            {isAnswered
              ? `service answer / ${response.confidence || 'grounded'}`
              : `service refusal / ${response.refusalReason || response.status || 'not answered'}`}
          </div>
          <h3>{title}</h3>
          {response.degraded && (
            <div className="wk-answer-degraded">
              Limited mode —{' '}
              {response.degraded.reason === 'rate-limited'
                ? "you've reached your question limit. Only saved questions are answerable right now; try an example below."
                : 'the live answer engine is unavailable. Only saved questions are answerable right now; try an example below.'}
            </div>
          )}
          {isAnswered ? (
            <Paragraphs text={response.answer || ''} />
          ) : (
            <p>
              {response.message ||
                response.refusalReason ||
                'The service could not produce a grounded answer for this question.'}
            </p>
          )}
          {response.gapEvent && (
            <p>
              <strong>Gap:</strong> {response.gapEvent.reason || response.refusalReason || 'recorded'}
            </p>
          )}
          {page && <p>{pageLink(page, 'Open the exact page')}</p>}
          {refs.length > 0 && (
            <div className="wk-references">
              <h4>Sources</h4>
              <ol>{refs}</ol>
            </div>
          )}
          {ratingRow}
        </div>
      )
    }

    if (!page) {
      return (
        <div className="wk-answer" data-answer="">
          <div className="wk-answer-meta wk-muted">No grounded route / recorded gap</div>
          <h3>No exact page found yet</h3>
          <p>
            The current corpus did not produce a grounded match for &ldquo;{answer.query}&rdquo;.
            This question is now in the local gaps queue.
          </p>
          {ratingRow}
        </div>
      )
    }

    return (
      <div className="wk-answer" data-answer="">
        <div className="wk-answer-meta wk-muted">
          {page.section || 'docs'} / routed answer / score {String(result.score)}
        </div>
        <h3>{pageLink(page)}</h3>
        <p>{page.summary || page.excerpt || ''}</p>
        {result.questionRoute && (
          <p>
            <strong>Seeded route:</strong> {result.questionRoute.question}{' '}
            <span className="wk-muted">/ confidence {result.questionRoute.confidence}</span>
          </p>
        )}
        {result.glossaryTerm && (
          <p>
            <strong>Glossary:</strong> {result.glossaryTerm.term} — {result.glossaryTerm.definition}
          </p>
        )}
        {result.answerChunk?.text && (
          <p>
            <strong>Matched chunk:</strong> {result.answerChunk.text.slice(0, 420)}
            {result.answerChunk.text.length > 420 ? '…' : ''}
          </p>
        )}
        {page.gap && (
          <p>
            <strong>Gap:</strong> {page.gap}
          </p>
        )}
        <div className="wk-references">
          <h4>Sources</h4>
          <ol>{answerReferences(undefined, page)}</ol>
        </div>
        {ratingRow}
      </div>
    )
  }

  return (
    <WikiChrome {...wikiChromePropsFor(app)}>
      <h1>Reference desk</h1>
      <div className="wk-sitesub">From Symmiopedia, the open ecosystem encyclopedia</div>
      <p>
        Ask any question about the ecosystem; answers cite the encyclopedia&rsquo;s indexed
        sources. Routes your question to the nearest indexed figure.
      </p>

      <form className="wk-results-search" role="search" onSubmit={submit}>
        <input
          type="search"
          className="wk-r2 wk-ask-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask anything — points, invites, revenue, payouts…"
          aria-label="Ask the wiki"
        />
        <button type="submit">Ask</button>
      </form>

      {!answer && app.examples.length > 0 && (
        <p className="wk-ask-examples">
          Try:{' '}
          {app.examples.map((label, index) => (
            <span key={label}>
              {index > 0 && ' · '}
              <a
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.preventDefault()
                  askExample(label)
                }}
              >
                {label}
              </a>
            </span>
          ))}
        </p>
      )}

      {answer && (
        <p className="wk-muted" style={{ fontSize: 12.6 }}>
          Question: <strong>{answer.query}</strong>
        </p>
      )}
      {renderAnswer()}

      <WikiDismissGuard
        open={guardOpen}
        state={voteState}
        onRate={(dir) => {
          void voteState.vote(dir).then((ok) => {
            if (ok) {
              setGuardOpen(false)
              setThanks(true)
            }
          })
        }}
        onCancel={() => setGuardOpen(false)}
        onDismiss={resetAnswer}
      />

      {thanks && (
        // Mounted fresh per vote — a persistent mount leaks the previous
        // countdown's expired state and closes the next dialog instantly.
        <WikiVoteThanks open onAskNext={askNext} onCancel={() => setThanks(false)} onTimeout={resetAnswer} />
      )}
    </WikiChrome>
  )
}
