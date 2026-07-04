/** Reader-page derivations shared by the client island and the SSG renderer. */
import type { CorpusData } from '@/data/loader'
import type { Page } from '@/data/types'
import { escapeHtml, markdownToHtml, tocFromHtml, type TocItem } from './markdown'

export interface ReaderModel {
  page: Page
  bodyHtml: string
  tocItems: TocItem[]
  related: Page[]
  previous: Page | null
  next: Page | null
  status: string
}

/** L3017 — crosslinks → explicit related → same section+track; max 8. */
export function relatedPagesFor(data: CorpusData, page: Page): Page[] {
  const crosslink = data.crosslinkByPageId[page.id]
  if (crosslink?.relatedPageIds?.length) {
    return crosslink.relatedPageIds
      .map((id: string) => data.pageById.get(id))
      .filter(Boolean)
      .slice(0, 8) as Page[]
  }
  const explicit = [...(page.relatedGeneratedPages || []), ...(page.relatedPages || [])]
    .map((id) => data.pageById.get(id))
    .filter(Boolean) as Page[]
  if (explicit.length) return explicit.slice(0, 8)
  return data.publicSearchablePages
    .filter(
      (candidate) => candidate.id !== page.id && candidate.section === page.section && candidate.track === page.track,
    )
    .slice(0, 8)
}

export function readerModelFor(data: CorpusData, pageId: string): ReaderModel | null {
  const page = data.pageById.get(pageId)
  if (!page) return null
  // L3911 — markdown body, or the generated-preview fallback.
  const bodyHtml = page.bodyMarkdown
    ? markdownToHtml(page.bodyMarkdown)
    : `<p>${escapeHtml(page.summary || page.excerpt || '')}</p><p>This is a generated corpus preview. The underlying draft file is indexed and source-mapped, but still needs editorial restructuring before final publication.</p>`
  const crosslink = data.crosslinkByPageId[page.id] || {}
  return {
    page,
    bodyHtml,
    tocItems: tocFromHtml(bodyHtml),
    related: relatedPagesFor(data, page),
    previous: crosslink.previousPageId ? data.pageById.get(crosslink.previousPageId) || null : null,
    next: crosslink.nextPageId ? data.pageById.get(crosslink.nextPageId) || null : null,
    status: page.status || (page.curated ? 'curated-route' : 'indexed-page'),
  }
}

/** L2867 — the "Indexed route" direct link. */
export function directRouteFor(page: Page): string {
  return page.route || page.file || (page.sourceUrls || [])[0] || '#'
}
