/**
 * Symmiopedia article anatomy (SYN-369) — h1 → siteSub → lead with right-float
 * infobox → numbered TOC with working [hide] → body sections with dead [edit]
 * spans → See also (red links for unresolvable refs) → References (12.6px,
 * ^ backlinks) → categories bar. Every element maps from a real corpus field
 * per design-mapping.md and is omitted when its source is absent.
 */
import { useEffect, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import type { CorpusData } from '@/data/loader'
import type { ReaderModel } from '@/lib/reader'
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
import { WikiMark } from './WikiMark'

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

function EditSpan({ onOpen }: { onOpen: () => void }) {
  return (
    <span className="wk-edit">
      [
      <a
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          onOpen()
        }}
      >
        edit
      </a>
      ]
    </span>
  )
}

/**
 * Wiki-register notice for the [edit] affordances: edits are part of the
 * Wikipedia anatomy but Symmiopedia has no user-proposed-edit flow yet, so
 * every [edit] opens this explainer instead of dead-clicking.
 */
function EditNotice({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="wk-modal-backdrop" onClick={onClose}>
      <div
        className="wk-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wk-edit-notice-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="wk-edit-notice-title">Editing is not available yet</h3>
        <p>
          Symmiopedia does not currently support user-submitted or user-proposed edits.
          Articles are maintained by the editorial pipeline; community editing is planned
          for a later release.
        </p>
        <p>
          Spotted a problem? Use “Was this page useful?” at the end of the article — a{' '}
          <i>No</i> vote flags the page for editorial review.
        </p>
        <div className="wk-modal-actions">
          <button type="button" className="wk-modal-primary" onClick={onClose} autoFocus>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export function WikiArticle({
  model,
  data,
  hrefFor = (pageId) => `?page=${pageId}`,
  onNavigatePage,
  rating,
  tocCollapsed = false,
}: WikiArticleProps) {
  const [tocHidden, setTocHidden] = useState(tocCollapsed)
  const [editNotice, setEditNotice] = useState(false)
  const { page, bodyHtml, previous, next } = model

  const editSpan = <EditSpan onOpen={() => setEditNotice(true)} />
  // The body [edit] spans arrive inside injected HTML (injectEditSpans), so
  // their clicks are caught here by delegation.
  const onBodyClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('.wk-edit')) {
      event.preventDefault()
      setEditNotice(true)
    }
  }

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
            <WikiMark slot="page" size={234} />
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

      <div className="wk-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: lead }} />

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

      {rest && <div className="wk-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: rest }} />}

      {seeAlso.length > 0 && (
        <section className="wk-seealso">
          <h2 id="see-also">See also{editSpan}</h2>
          <ul>
            {seeAlso.map((link) => (
              <li key={link.id}>{pageLink(link.id, link.title, link.red)}</li>
            ))}
          </ul>
        </section>
      )}

      {references.length > 0 && (
        <section className="wk-references">
          <h2 id="references">References{editSpan}</h2>
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

      {editNotice && <EditNotice onClose={() => setEditNotice(false)} />}

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

/** Footer date passthrough so views don't import lib/wiki directly. */
export function wikiUpdatedFor(model: ReaderModel): Date | null {
  return updatedDateFor(model.page)
}
