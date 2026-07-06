/**
 * Symmiopedia article derivations (SYN-369) — maps existing corpus fields onto
 * the wiki anatomy per design-mapping.md §"Article anatomy ← corpus fields".
 * Degrade by omission, never invention: an element without a real corpus
 * source is dropped for that page.
 */
import { sourceByKey, volumeMap, type CorpusData } from '@/data/loader'
import type { Page } from '@/data/types'
import type { ReaderModel } from './reader'
import { escapeHtml, stripHtml, type TocItem } from './markdown'
import pageDates from '@/data/page-dates.json'

export const SITE_SUB = 'From Symmiopedia, the open ecosystem encyclopedia'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

const volumeById = new Map<string, Any>(((volumeMap.volumes || []) as Any[]).map((v) => [v.id, v]))

/** Humanize corpus slugs for display rows ("authored-page" → "Authored page"). */
export function humanize(value: string): string {
  const text = String(value || '').replace(/[-_]+/g, ' ').trim()
  return text ? text[0].toUpperCase() + text.slice(1) : ''
}

export function volumeTitleFor(page: Page): string | null {
  const volume = volumeById.get((page as Any).volumeId || '')
  return volume ? `Volume ${volume.number}: ${volume.title}` : null
}

/** Footer "last edited" — real git commit date of the page's content file. */
export function updatedDateFor(page: Page): Date | null {
  const iso = (pageDates as Record<string, string>)[page.id]
  if (!iso) return null
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatWikiDate(date: Date): string {
  const utc = new Date(date.getTime())
  const day = utc.getUTCDate()
  const month = utc.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })
  const year = utc.getUTCFullYear()
  const hh = String(utc.getUTCHours()).padStart(2, '0')
  const mm = String(utc.getUTCMinutes()).padStart(2, '0')
  return `${day} ${month} ${year}, at ${hh}:${mm} (UTC)`
}

export interface InfoboxRow {
  label: string
  value: string
  href?: string
}

/** Infobox rows from page metadata; caller omits the box below 3 real rows. */
export function infoboxRowsFor(page: Page, model: ReaderModel): InfoboxRow[] {
  const rows: InfoboxRow[] = []
  if (page.granularity) rows.push({ label: 'Type', value: humanize(page.granularity) })
  if (page.section) rows.push({ label: 'Section', value: humanize(page.section) })
  if (page.track) rows.push({ label: 'Track', value: page.track })
  const volume = volumeTitleFor(page)
  if (volume) rows.push({ label: 'Volume', value: volume })
  if (page.status) rows.push({ label: 'Status', value: humanize(page.status) })
  const sourceCount = (page.sourceKeys || []).length
  if (sourceCount) rows.push({ label: 'Sources', value: String(sourceCount) })
  const updated = updatedDateFor(page)
  if (updated) {
    rows.push({
      label: 'Updated',
      value: updated.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
    })
  }
  if (model.related.length) {
    rows.push({ label: 'Related', value: `${model.related.length} pages`, href: '#see-also' })
  }
  return rows
}

export interface WikiReference {
  key: string
  label: string
  detail: string
  href?: string
}

/** References from the page's source citations (catalog + URLs); empty → omit. */
export function referencesFor(page: Page): WikiReference[] {
  const refs: WikiReference[] = []
  const seenHrefs = new Set<string>()
  for (const key of page.sourceKeys || []) {
    const entry: Any = sourceByKey[key]
    if (entry) {
      const detail = [entry.group, entry.use].filter(Boolean).join(' — ')
      const href = entry.href || undefined
      if (href) seenHrefs.add(href)
      refs.push({ key, label: key, detail, href })
    } else {
      refs.push({ key, label: key, detail: 'unregistered source key' })
    }
  }
  for (const url of page.sourceUrls || []) {
    if (seenHrefs.has(url)) continue
    seenHrefs.add(url)
    refs.push({ key: url, label: url.replace(/^https?:\/\//, ''), detail: '', href: url })
  }
  return refs
}

export interface WikiCategory {
  label: string
}

/** Categories bar from real groupings (section / track / volume); empty → omit. */
export function categoriesFor(page: Page): WikiCategory[] {
  const categories: WikiCategory[] = []
  if (page.section) categories.push({ label: humanize(page.section) })
  if (page.track) categories.push({ label: page.track })
  const volume = volumeTitleFor(page)
  if (volume) categories.push({ label: volume })
  return categories
}

export interface SeeAlsoLink {
  id: string
  title: string
  /** True when the target id does not resolve publicly — renders #ba0000. */
  red: boolean
}

/**
 * See-also: the page's resolved related articles — navigable links only.
 * Wikipedia-style red links for unresolvable ids (from relatedGeneratedPages)
 * were removed: this is a read-only encyclopedia with no page-creation flow, so
 * a link to a non-existent page only ever read as broken.
 */
export function seeAlsoFor(model: ReaderModel): SeeAlsoLink[] {
  return model.related.slice(0, 10).map((p) => ({ id: p.id, title: p.title, red: false }))
}

/**
 * The authored bodies close with their own "## Sources" / "## Related Pages"
 * sections — structured duplicates of the References / See-also anatomy
 * (same corpus fields, worse register). Strip them from the body; the wiki
 * anatomy presents that data instead.
 */
export function stripStructuralSections(bodyHtml: string): string {
  return bodyHtml.replace(
    /<h2 id="(?:sources|related-pages)(?:-\d+)?">(?:Sources|Related Pages)[\s\S]*?(?=<h2 id=|$)/g,
    '',
  )
}

/** Inject dead [edit] spans after every body h2/h3 label (showEditLinks). */
export function injectEditSpans(bodyHtml: string): string {
  return bodyHtml.replace(
    /<(h[23]) id="([^"]+)">([\s\S]*?)<\/\1>/g,
    (_m, tag, id, label) =>
      `<${tag} id="${id}">${label}<span class="wk-edit">[<a role="button" tabindex="0">edit</a>]</span></${tag}>`,
  )
}

/** Split the body into lead (before the first h2/h3) and the rest. */
export function splitLead(bodyHtml: string): { lead: string; rest: string } {
  const match = bodyHtml.match(/<h[23] id=/)
  if (!match || match.index === undefined) return { lead: bodyHtml, rest: '' }
  return { lead: bodyHtml.slice(0, match.index), rest: bodyHtml.slice(match.index) }
}

export interface WikiTocEntry extends TocItem {
  number: string
}

/** Wikipedia-style numbered TOC: body sections plus the generated tail sections. */
export function wikiTocFor(
  tocItems: TocItem[],
  extras: Array<{ id: string; label: string }>,
): WikiTocEntry[] {
  const entries: WikiTocEntry[] = []
  let major = 0
  let minor = 0
  for (const item of tocItems) {
    if (item.level === '2') {
      major += 1
      minor = 0
      entries.push({ ...item, number: String(major) })
    } else {
      // an h3 before any h2 still needs a stable number
      if (major === 0) major = 1
      minor += 1
      entries.push({ ...item, number: `${major}.${minor}` })
    }
  }
  for (const extra of extras) {
    major += 1
    entries.push({ level: '2', id: extra.id, label: extra.label, number: String(major) })
  }
  return entries
}

/** Ecosystem sidebar box: protocols that resolve to real corpus pages only. */
export function ecosystemLinksFor(data: CorpusData): Array<{ label: string; pageId: string }> {
  const candidates: Array<{ label: string; ids: string[] }> = [
    { label: 'Vibe', ids: ['authored-vibe-product-overview', 'authored-vibe-platform-overview'] },
    { label: 'Symmio', ids: ['authored-symmio-clearing-house-layer', 'authored-symmio-account-layer-virtual-accounts'] },
    { label: 'Carbon', ids: ['authored-carbon-overview'] },
    { label: 'Pear', ids: ['authored-pear-overview'] },
    { label: 'Privex', ids: ['authored-privex-overview'] },
    { label: 'Ivy', ids: ['authored-ivy-overview'] },
  ]
  const links: Array<{ label: string; pageId: string }> = []
  for (const candidate of candidates) {
    const id = candidate.ids.find((candidateId) => data.pageById.has(candidateId))
    if (id) links.push({ label: candidate.label, pageId: id })
  }
  return links
}

/** Deterministic "random article" that still differs per invocation. */
export function randomPageId(data: CorpusData): string | null {
  const pages = data.publicSearchablePages
  if (!pages.length) return null
  const index = Math.floor(Math.random() * pages.length)
  return pages[index].id
}

/** Escape helper re-export for templates. */
export { escapeHtml, stripHtml }
