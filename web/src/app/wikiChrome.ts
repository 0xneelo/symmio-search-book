/**
 * Shared WikiChrome wiring (SYN-369/SYN-370): one place for the sidebar boxes,
 * featured article, random article, and the header-search routing used by the
 * reader and both special pages. Callers guard app.data.
 */
import { ecosystemLinksFor, randomPageId } from '@/lib/wiki'
import { resolveWikiSearch } from '@/lib/wiki-search'
import type { WikiChromeProps } from '@/components/wiki/WikiChrome'
import type { SearchBookApp } from './useSearchBook'

/** Featured article shared with the portal hint (SYN-368). */
export const FEATURED_PAGE_ID = 'authored-ecosystem-synergy-map'

export function wikiChromePropsFor(app: SearchBookApp): Omit<WikiChromeProps, 'children'> {
  const data = app.data
  if (!data) return {}
  const featuredPage = data.pageById.get(FEATURED_PAGE_ID)
  return {
    ecosystem: ecosystemLinksFor(data),
    featured: featuredPage ? { id: featuredPage.id, title: featuredPage.title } : null,
    onNavigatePage: (id: string) => app.openPage(id, 'browse'),
    onMainPage: () => app.clearActivePage('classic'),
    onSearch: (query: string) => {
      const destination = resolveWikiSearch(data, query, 'reader-search')
      app.bumpInsights()
      if (destination.kind === 'page') app.setActivePage(destination.pageId)
      else app.setSpecial('search', query)
    },
    onRandom: () => {
      const id = randomPageId(data)
      if (id) app.openPage(id, 'nav')
    },
    onSitePage: (kind) => app.setSpecial(kind, ''),
  }
}
