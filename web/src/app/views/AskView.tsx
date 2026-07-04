/**
 * "Reference desk" Ask special page (SYN-370, DESIGN.MD Part A; visual
 * register per the operator answer-page amendment 2026-07-04 —
 * docs/goals/symmiopedia-v3/comp/answer-page.html): loading box with phase
 * ticker / elapsed / indeterminate bar / shimmer skeleton; routed-answer
 * panel with #cedff2 title bar; numbered raw-URL citations; solid rate
 * buttons. Flagged-answer quarantine behavior unchanged — service refusals
 * render as refusals, degraded mode renders the limited-mode note, and no
 * answer is ever synthesized client-side.
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

const LOAD_PHASES = ['Scanning cited context', 'Matching passages', 'Ranking sources', 'Composing answer']

export function AskView({ app, query }: { app: SearchBookApp; query: string }) {
  const [draft, setDraft] = useState(query)
  const [guardOpen, setGuardOpen] = useState(false)
  const [thanks, setThanks] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const askedRef = useRef<string | null>(null)

  const answer = app.answer

  // Live elapsed readout while the service answer is in flight; the phase
  // label advances on a fixed cadence and holds on the last phase.
  const isLoading = !!answer?.loading
  useEffect(() => {
    if (!isLoading) return
    setElapsed(0)
    const iv = setInterval(() => setElapsed((t) => Math.round((t + 0.1) * 10) / 10), 100)
    return () => clearInterval(iv)
  }, [isLoading, answer?.query])

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

  // Numbered citation list in the comp register: the raw source URL as the
  // link text with a trailing ↗; page-link fallback when no URL is known.
  const answerReferences = (citations: ServiceCitation[] | undefined, page: Page | null) => {
    const refs: ReactNode[] = []
    for (const [index, citation] of (citations || []).slice(0, 8).entries()) {
      const citedPage = citation.pageId ? data.pageById.get(citation.pageId) : undefined
      refs.push(
        <li key={`c-${index}`}>
          {citation.sourceHref ? (
            <>
              <a className="wk-external" href={citation.sourceHref} target="_blank" rel="noreferrer">
                {citation.sourceHref}
              </a>{' '}
              <span className="wk-muted">↗</span>
            </>
          ) : citedPage ? (
            pageLink(citedPage, citation.pageTitle || citedPage.title)
          ) : (
            <>
              {citation.pageTitle || citation.sourceKey}
              {citation.sourceKey && citation.pageTitle && <span className="wk-muted"> — {citation.sourceKey}</span>}
            </>
          )}
        </li>,
      )
    }
    if (!refs.length && page) {
      for (const key of (page.sourceKeys || []).slice(0, 5)) {
        refs.push(<li key={`k-${key}`}>{key}</li>)
      }
    }
    return refs
  }

  // First cited source key → the bordered chip in the comp's "Source:" row.
  const sourceChipRow = (key: string | undefined | null) =>
    key ? (
      <div className="wk-source-row">
        <b>Source:</b>&nbsp;<span className="wk-source-chip">{key}</span>
      </div>
    ) : null

  // Shared panel shell: #cedff2 title bar ("Routed answer" + the asked
  // question + dismiss) over the pale-blue body. The meta line keeps the
  // service answer / service refusal / routed answer registers the
  // quarantine-parity specs assert on.
  const answerPanel = (meta: ReactNode, body: ReactNode) => (
    <div className="wk-answer wk-answer-panel" data-answer="">
      <div className="wk-answer-titlebar">
        <span className="wk-answer-titlebar-label">Routed answer</span>
        <span className="wk-answer-titlebar-q">&ldquo;{answer?.query}&rdquo;</span>
        <span className="wk-load-cancel">
          [
          <button type="button" title="Dismiss this answer" onClick={requestDismiss}>
            Dismiss ×
          </button>
          ]
        </span>
      </div>
      <div className="wk-answer-body">
        <div className="wk-answer-meta wk-muted">{meta}</div>
        {body}
      </div>
    </div>
  )

  const renderAnswer = () => {
    if (!answer) return null
    if (answer.loading) {
      return (
        <>
          <p className="wk-muted" style={{ fontSize: 14, margin: '4px 0 8px' }}>
            Question: <strong style={{ color: 'var(--wk-text)' }}>{answer.query}</strong>
          </p>
          <div className="wk-answer wk-answer-loading" data-answer="">
            <div className="wk-load-head">
              <span className="wk-answer-meta wk-muted">service answer-engine</span>
              <span className="wk-load-elapsed">{elapsed.toFixed(1)}s</span>
              <span className="wk-load-cancel">
                [
                <button type="button" title="Cancel this question" onClick={resetAnswer}>
                  cancel ×
                </button>
                ]
              </span>
            </div>
            <div className="wk-load-phase">
              {LOAD_PHASES[Math.min(LOAD_PHASES.length - 1, Math.floor(elapsed / 1.4))]}
              <span className="wk-load-dots" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  // Inline SVG circles: the round dots of the comp without a
                  // border-radius above the 2px hard-rules ceiling.
                  <svg key={i} width="6" height="6" viewBox="0 0 6 6" style={{ animationDelay: `${i * 0.2}s` }}>
                    <circle cx="3" cy="3" r="3" fill="#202122" />
                  </svg>
                ))}
              </span>
            </div>
            <p>Waiting for the configured Search Book answer service.</p>
            <div className="wk-load-bar">
              <div className="wk-load-band" />
            </div>
            <div className="wk-load-skel">
              {['97%', '100%', '90%', '62%'].map((w) => (
                <div key={w} className="wk-skel-line" style={{ width: w }} />
              ))}
            </div>
          </div>
        </>
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
      />
    )

    if (result.serviceResponse) {
      const response = result.serviceResponse
      const isAnswered = response.status === 'answered'
      const title =
        page?.title || response.citations?.[0]?.pageTitle || (isAnswered ? 'Cited answer' : 'Answer unavailable')
      const refs = answerReferences(response.citations, page)
      const firstHref = response.citations?.find((c) => c.sourceHref)?.sourceHref
      return answerPanel(
        isAnswered
          ? `service answer / ${response.confidence || 'grounded'}`
          : `service refusal / ${response.refusalReason || response.status || 'not answered'}`,
        <>
          <h3 className="wk-answer-headline">{title}</h3>
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
          {sourceChipRow(response.citations?.[0]?.sourceKey)}
          {refs.length > 0 && <ol className="wk-cite-list">{refs}</ol>}
          {page ? (
            <div className="wk-open-exact">{pageLink(page, 'Open the exact page ↗')}</div>
          ) : (
            firstHref && (
              <div className="wk-open-exact">
                <a className="wk-external" href={firstHref} target="_blank" rel="noreferrer">
                  Open exact page ↗
                </a>
              </div>
            )
          )}
          {ratingRow}
        </>,
      )
    }

    if (!page) {
      return answerPanel(
        'No grounded route / recorded gap',
        <>
          <h3 className="wk-answer-headline">No exact page found yet</h3>
          <p>
            The current corpus did not produce a grounded match for &ldquo;{answer.query}&rdquo;.
            This question is now in the local gaps queue.
          </p>
          {ratingRow}
        </>,
      )
    }

    return answerPanel(
      <>
        {page.section || 'docs'} / routed answer / score {String(result.score)}
      </>,
      <>
        <h3 className="wk-answer-headline">{pageLink(page)}</h3>
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
          <div className="wk-chunk">
            <b>Matched chunk:</b>{' '}
            <i>
              &ldquo;{result.answerChunk.text.slice(0, 420)}
              {result.answerChunk.text.length > 420 ? '…' : ''}&rdquo;
            </i>
          </div>
        )}
        {page.gap && (
          <p>
            <strong>Gap:</strong> {page.gap}
          </p>
        )}
        {sourceChipRow(page.sourceKeys?.[0])}
        <ol className="wk-cite-list">{answerReferences(undefined, page)}</ol>
        <div className="wk-open-exact">{pageLink(page, 'Open the exact page ↗')}</div>
        {ratingRow}
      </>,
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

      {!answer && (
        <div className="wk-idle-box">
          No active question. Ask one in the search box above
          {app.examples.length > 0 ? (
            <>
              , or try:{' '}
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
            </>
          ) : (
            '.'
          )}
        </div>
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
