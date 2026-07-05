/**
 * SSG entry (SYN-353 → SYN-369): renders one reader page to static HTML as a
 * full Symmiopedia article (wiki chrome + anatomy). Consumed by
 * scripts/prerender.mjs after the client build. No browser APIs here — the
 * prerender script shims `window` before importing (answer-corpus.js assigns a
 * window global).
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { loadCorpusData, type CorpusData } from '@/data/loader'
import { readerModelFor } from '@/lib/reader'
import { ecosystemLinksFor } from '@/lib/wiki'
import { WikiChrome } from '@/components/wiki/WikiChrome'
import { WikiArticle, wikiUpdatedFor } from '@/components/wiki/WikiArticle'

/** Featured article shared with the portal hint (SYN-368). */
const FEATURED_PAGE_ID = 'authored-ecosystem-synergy-map'

let dataPromise: Promise<CorpusData> | null = null

export function loadData(): Promise<CorpusData> {
  if (!dataPromise) dataPromise = loadCorpusData()
  return dataPromise
}

export async function listReaderPageIds(): Promise<string[]> {
  const data = await loadData()
  return [...data.pageById.keys()]
}

/** Static article + chrome. The client bundle takes over on load. */
export async function renderPage(pageId: string): Promise<{ title: string; html: string } | null> {
  const data = await loadData()
  const model = readerModelFor(data, pageId)
  if (!model) return null
  // Static links use the prerendered routes; the client island re-renders
  // with SPA handlers on load.
  const hrefFor = (id: string) => `/page/${id}/`
  const featuredPage = data.pageById.get(FEATURED_PAGE_ID)
  const html = renderToStaticMarkup(
    <WikiChrome
      ecosystem={ecosystemLinksFor(data)}
      featured={featuredPage ? { id: featuredPage.id, title: featuredPage.title } : null}
      updated={wikiUpdatedFor(model)}
      sourceRoute={{ href: `/?source=${encodeURIComponent(pageId)}` }}
      hrefFor={hrefFor}
    >
      <WikiArticle model={model} data={data} hrefFor={hrefFor} />
    </WikiChrome>,
  )
  return { title: `${model.page.title} - Symmiopedia`, html }
}
