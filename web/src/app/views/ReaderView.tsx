import { useCallback, useEffect, useMemo } from 'react'
import { readerModelFor } from '@/lib/reader'
import { recordPageRating, type VoteValue } from '@/lib/voting'
import { WikiChrome } from '@/components/wiki/WikiChrome'
import { WikiArticle, wikiDirectHref, wikiUpdatedFor } from '@/components/wiki/WikiArticle'
import { WikiPageRating } from '@/components/wiki/WikiPageRating'
import type { SearchBookApp } from '../useSearchBook'
import { useVote } from '../useVote'
import { wikiChromePropsFor } from '../wikiChrome'

/**
 * Client reader island (SYN-369): full Symmiopedia article — wiki chrome +
 * anatomy — with crosslink nav and the one-shot page vote (/page-feedback
 * parity). Replaces the v2 shell on every public page route.
 */
export function ReaderView({ app, pageId }: { app: SearchBookApp; pageId: string }) {
  const model = useMemo(
    () => (app.data ? readerModelFor(app.data, pageId) : null),
    [app.data, pageId],
  )

  useEffect(() => {
    document.title = model
      ? `${model.page.title} - Symmiopedia`
      : 'Symmiopedia — The Open Ecosystem Encyclopedia'
  }, [model])

  const persist = useCallback(
    (value: VoteValue) => {
      if (!model) return Promise.reject(new Error('No page to rate.'))
      return recordPageRating({ page: model.page, rating: value }).then((outcome) => {
        app.bumpInsights()
        return outcome
      })
    },
    [model, app],
  )
  const voteState = useVote(persist)

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
  const chromeProps = wikiChromePropsFor(app)

  if (!model) {
    // Wiki-register not-found (parity: not-found panel with return routes).
    return (
      <WikiChrome {...chromeProps}>
          <h1>Page not found</h1>
          <div className="wk-sitesub">From Symmiopedia, the open ecosystem encyclopedia</div>
          <div className="wk-body">
            <p>
              The index has no page with id <code>{pageId}</code>. It may have been moved, or the
              link may be stale.
            </p>
            <ul>
              <li>
                <a
                  href="/"
                  onClick={(event) => {
                    event.preventDefault()
                    app.clearActivePage('classic')
                  }}
                >
                  Return to the main page
                </a>
              </li>
            </ul>
          </div>
        </WikiChrome>
    )
  }

  return (
    <WikiChrome {...chromeProps} updated={wikiUpdatedFor(model)} directHref={wikiDirectHref(model)}>
      <WikiArticle
        model={model}
        data={data}
        onNavigatePage={(id) => app.openPage(id, 'browse')}
        rating={<WikiPageRating state={voteState} />}
      />
    </WikiChrome>
  )
}
