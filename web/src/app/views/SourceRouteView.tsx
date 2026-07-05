import { useEffect, useState, type FormEvent } from 'react'
import { clearAdminToken, getAdminToken, setAdminToken, verifyAdmin } from '@/lib/admin'
import { readerModelFor, directRouteFor } from '@/lib/reader'
import { WikiChrome } from '@/components/wiki/WikiChrome'
import type { SearchBookApp } from '../useSearchBook'
import { wikiChromePropsFor } from '../wikiChrome'

type GateState = 'checking' | 'locked' | 'open'

/**
 * Indexed-route viewer (favorites QA round): the Tools → “Indexed route” link
 * used to dead-link straight at raw corpus paths (404 for readers). It now
 * lands here — an operator-only page reusing the SYN-362 server-verified
 * token — and shows the page's source mapping instead of navigating blind.
 */
export function SourceRouteView({ app, pageId }: { app: SearchBookApp; pageId: string }) {
  const [gate, setGate] = useState<GateState>('checking')
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.title = 'Indexed route - Symmiopedia'
    let alive = true
    verifyAdmin(getAdminToken()).then((result) => {
      if (!alive) return
      if (result.ok) {
        setGate('open')
      } else {
        clearAdminToken()
        setGate('locked')
      }
    })
    return () => {
      alive = false
    }
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const candidate = input.trim()
    if (!candidate || busy) return
    setBusy(true)
    setError(null)
    const result = await verifyAdmin(candidate)
    setBusy(false)
    if (result.ok) {
      setAdminToken(candidate)
      setInput('')
      setGate('open')
    } else {
      setError('That is not the operator password.')
    }
  }

  const data = app.data
  const model = data ? readerModelFor(data, pageId) : null
  const page = model?.page

  const backLink = page && (
    <p>
      <a
        href={`?page=${page.id}`}
        onClick={(event) => {
          event.preventDefault()
          app.openPage(page.id, 'nav')
        }}
      >
        ← Back to {page.title}
      </a>
    </p>
  )

  return (
    <WikiChrome {...wikiChromePropsFor(app)}>
      <h1>Indexed route{page ? `: ${page.title}` : ''}</h1>
      <div className="wk-sitesub">Operator tool — the raw source mapping behind an article</div>
      <div className="wk-body">
        {!page ? (
          <p>
            The index has no page with id <code>{pageId}</code>.
          </p>
        ) : gate === 'checking' ? (
          <p className="wk-muted">Checking access…</p>
        ) : gate === 'locked' ? (
          <>
            <p>
              This tool exposes the raw indexed source behind an article — internal
              routes and file paths from the corpus pipeline. It is restricted to
              Symmiopedia operators.
            </p>
            <p>You have to be an operator: enter the operator password to continue.</p>
            <form className="wk-source-gate" onSubmit={submit}>
              <input
                type="password"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Operator password"
                aria-label="Operator password"
                autoComplete="current-password"
              />
              <button type="submit" disabled={busy}>
                Unlock
              </button>
            </form>
            {error && (
              <p role="alert" className="wk-source-gate-error">
                {error}
              </p>
            )}
            {backLink}
          </>
        ) : (
          <>
            <p>
              Source mapping for <b>{page.title}</b> as recorded in the corpus index. The
              route and file are pipeline-internal paths (not served on this site); the
              source URLs are the original external references.
            </p>
            <table className="wk-source-table">
              <tbody>
                <tr>
                  <th>Page id</th>
                  <td>
                    <code>{page.id}</code>
                  </td>
                </tr>
                <tr>
                  <th>Direct route</th>
                  <td>
                    <code>{directRouteFor(page)}</code>
                  </td>
                </tr>
                {page.file && (
                  <tr>
                    <th>Corpus file</th>
                    <td>
                      <code>{page.file}</code>
                    </td>
                  </tr>
                )}
                {page.status && (
                  <tr>
                    <th>Status</th>
                    <td>{page.status}</td>
                  </tr>
                )}
                {page.section && (
                  <tr>
                    <th>Section</th>
                    <td>
                      {page.section}
                      {page.track ? ` · ${page.track}` : ''}
                    </td>
                  </tr>
                )}
                {(page.sourceUrls || []).length > 0 && (
                  <tr>
                    <th>Source URLs</th>
                    <td>
                      <ul>
                        {(page.sourceUrls || []).map((url) => (
                          <li key={url}>
                            <a className="wk-external" href={url} target="_blank" rel="noreferrer">
                              {url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {backLink}
          </>
        )}
      </div>
    </WikiChrome>
  )
}
