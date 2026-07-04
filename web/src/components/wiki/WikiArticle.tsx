/**
 * Symmiopedia article anatomy (SYN-369) — h1 → siteSub → lead with right-float
 * infobox → numbered TOC with working [hide] → body sections with dead [edit]
 * spans → See also (red links for unresolvable refs) → References (12.6px,
 * ^ backlinks) → categories bar. Every element maps from a real corpus field
 * per design-mapping.md and is omitted when its source is absent.
 */
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { CorpusData } from '@/data/loader'
import { directRouteFor, type ReaderModel } from '@/lib/reader'
import {
  categoriesFor,
  infoboxRowsFor,
  injectEditSpans,
  referencesFor,
  seeAlsoFor,
  SITE_SUB,
  splitLead,
  stripStructuralSections,
  updatedDateFor,
  wikiTocFor,
} from '@/lib/wiki'
import { tocFromHtml } from '@/lib/markdown'
import { PuzzleGlobe } from './PuzzleGlobe'

export interface WikiArticleProps {
  model: ReaderModel
  data: CorpusData
  hrefFor?: (pageId: string) => string
  onNavigatePage?: (pageId: string) => void
  /** Page-vote island (parity: /page-feedback); omit for the static prerender. */
  rating?: ReactNode
  /** Seed for the TOC state (tweakable prop, DESIGN.MD §7). */
  tocCollapsed?: boolean
}

const EDIT_SPAN = (
  <span className="wk-edit">
    [
    <a role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
      edit
    </a>
    ]
  </span>
)

export function WikiArticle({
  model,
  data,
  hrefFor = (pageId) => `?page=${pageId}`,
  onNavigatePage,
  rating,
  tocCollapsed = false,
}: WikiArticleProps) {
  const [tocHidden, setTocHidden] = useState(tocCollapsed)
  const { page, bodyHtml, previous, next } = model

  const infoboxRows = infoboxRowsFor(page, model)
  const references = referencesFor(page)
  const categories = categoriesFor(page)
  const seeAlso = seeAlsoFor(page, model, data)
  const strippedBody = stripStructuralSections(bodyHtml)
  const tocItems = tocFromHtml(strippedBody)
  const bodyWithEdits = injectEditSpans(strippedBody)
  const { lead, rest } = splitLead(bodyWithEdits)

  const tailSections: Array<{ id: string; label: string }> = []
  if (seeAlso.length) tailSections.push({ id: 'see-also', label: 'See also' })
  if (references.length) tailSections.push({ id: 'references', label: 'References' })
  const toc = wikiTocFor(tocItems, tailSections)
  const showToc = toc.length >= 3

  const pageLink = (pageId: string, label: ReactNode, red = false) => (
    <a
      href={hrefFor(pageId)}
      className={red ? 'wk-redlink' : undefined}
      onClick={
        onNavigatePage && !red
          ? (event) => {
              event.preventDefault()
              onNavigatePage(pageId)
            }
          : (event) => {
              if (red) event.preventDefault()
            }
      }
    >
      {label}
    </a>
  )

  return (
    <article>
      <h1>{page.title}</h1>
      <div className="wk-sitesub">{SITE_SUB}</div>

      {infoboxRows.length >= 3 && (
        <aside className="wk-infobox">
          <div className="wk-infobox-caption">{page.title}</div>
          <div className="wk-infobox-figure">
            <PuzzleGlobe size={234} alt="Symmiopedia puzzle globe" />
          </div>
          <table>
            <tbody>
              {infoboxRows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  <td>{row.href ? <a href={row.href}>{row.value}</a> : row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      )}

      <div className="wk-body" dangerouslySetInnerHTML={{ __html: lead }} />

      {showToc && (
        <div className="wk-toc">
          <div className="wk-toc-title">
            Contents{' '}
            <span className="wk-edit">
              [
              <button type="button" className="wk-toc-toggle" onClick={() => setTocHidden((h) => !h)}>
                {tocHidden ? 'show' : 'hide'}
              </button>
              ]
            </span>
          </div>
          {!tocHidden && (
            <ul>
              {toc.map((entry) => (
                <li key={entry.id} className={entry.level === '3' ? 'wk-toc-l3' : undefined}>
                  <span className="wk-toc-num">{entry.number}</span>
                  <a href={`#${entry.id}`}>{entry.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {rest && <div className="wk-body" dangerouslySetInnerHTML={{ __html: rest }} />}

      {seeAlso.length > 0 && (
        <section className="wk-seealso">
          <h2 id="see-also">See also{EDIT_SPAN}</h2>
          <ul>
            {seeAlso.map((link) => (
              <li key={link.id}>{pageLink(link.id, link.title, link.red)}</li>
            ))}
          </ul>
        </section>
      )}

      {references.length > 0 && (
        <section className="wk-references">
          <h2 id="references">References{EDIT_SPAN}</h2>
          <ol>
            {references.map((ref) => (
              <li key={ref.key}>
                <span className="wk-ref-backlink">
                  <a role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
                    ^
                  </a>
                </span>{' '}
                {ref.href ? (
                  <a className="wk-external" href={ref.href} target="_blank" rel="noreferrer">
                    {ref.label}
                  </a>
                ) : (
                  <span>{ref.label}</span>
                )}
                {ref.detail ? <span className="wk-muted"> — {ref.detail}</span> : null}
              </li>
            ))}
          </ol>
        </section>
      )}

      {(previous || next) && (
        <nav className="wk-sequence" aria-label="Sequence">
          <span>{previous && <>← {pageLink(previous.id, previous.title)}</>}</span>
          <span>{next && <>{pageLink(next.id, next.title)} →</>}</span>
        </nav>
      )}

      {rating}

      {categories.length > 0 && (
        <div className="wk-catbar">
          <span className="wk-muted">Categories:</span>
          {categories.map((category) => (
            <a
              key={category.label}
              role="button"
              tabIndex={0}
              onClick={(e) => e.preventDefault()}
            >
              {category.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

/** The page's real source link for the Tools box. */
export function wikiDirectHref(model: ReaderModel): string {
  return directRouteFor(model.page)
}

/** Footer date passthrough so views don't import lib/wiki directly. */
export function wikiUpdatedFor(model: ReaderModel): Date | null {
  return updatedDateFor(model.page)
}
