/**
 * "Search results" special page (SYN-370, DESIGN.MD Part A): wiki list
 * register — blue title links, snippet lines, muted meta. A confident direct
 * hit never lands here (resolveWikiSearch opens the article); this page is the
 * ranked-list path plus the bridge to the Ask reference desk.
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { rankSearchResults, resolveWikiSearch, resultSnippet } from '@/lib/wiki-search'
import { humanize } from '@/lib/wiki'
import { WikiChrome } from '@/components/wiki/WikiChrome'
import { wikiChromePropsFor } from '../wikiChrome'
import type { SearchBookApp } from '../useSearchBook'

export function SearchResultsView({ app, query }: { app: SearchBookApp; query: string }) {
  const [draft, setDraft] = useState(query)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const q = draft.trim()
    if (!q || !app.data) return
    const destination = resolveWikiSearch(app.data, q, 'search')
    app.bumpInsights()
    if (destination.kind === 'page') app.setActivePage(destination.pageId)
    else app.setSpecial('search', q)
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

  const results = rankSearchResults(app.data, query)

  return (
    <WikiChrome {...wikiChromePropsFor(app)}>
      <h1>Search results</h1>
      <div className="wk-sitesub">From Symmiopedia, the open ecosystem encyclopedia</div>

      <form className="wk-results-search" role="search" onSubmit={submit}>
        <input
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-label="Search Symmiopedia"
          className="wk-r2"
        />
        <button type="submit">Search</button>
      </form>

      <p className="wk-ask-bridge">
        Looking for an answer instead?{' '}
        <a
          href={`?ask=${encodeURIComponent(query)}`}
          onClick={(event) => {
            event.preventDefault()
            app.setSpecial('ask', query)
          }}
        >
          Ask the wiki: &quot;{query}&quot;
        </a>
      </p>

      {results.length ? (
        <>
          <p className="wk-muted" style={{ fontSize: 12.6 }}>
            Results 1–{results.length} for <strong>{query}</strong>
          </p>
          <ul className="wk-results">
            {results.map(({ page }) => (
              <li key={page.id}>
                <a
                  className="wk-result-title"
                  href={`?page=${encodeURIComponent(page.id)}`}
                  onClick={(event) => {
                    event.preventDefault()
                    app.openPage(page.id, 'browse')
                  }}
                >
                  {page.title}
                </a>
                <div className="wk-result-snippet">{resultSnippet(page)}</div>
                <div className="wk-result-meta wk-muted">
                  {[humanize(page.section || ''), page.track].filter(Boolean).join(' · ')}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          There were no results matching <strong>{query}</strong>. The question is recorded in the
          gaps queue — or try the reference desk above.
        </p>
      )}
    </WikiChrome>
  )
}
