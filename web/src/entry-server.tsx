/**
 * SSG entry (SYN-353): renders one reader page to static HTML. Consumed by
 * scripts/prerender.mjs after the client build. No browser APIs here — the
 * prerender script shims `window` before importing (answer-corpus.js assigns a
 * window global).
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { loadCorpusData, type CorpusData } from '@/data/loader'
import { readerModelFor } from '@/lib/reader'
import { AnnouncementBar, RatingButtons, Sidebar, TopBar } from '@/components/manual'
import { READER_SECTION, SECTIONS } from '@/app/sections'
import { ReaderArticle } from '@/app/reader/ReaderArticle'

let dataPromise: Promise<CorpusData> | null = null

export function loadData(): Promise<CorpusData> {
  if (!dataPromise) dataPromise = loadCorpusData()
  return dataPromise
}

export async function listReaderPageIds(): Promise<string[]> {
  const data = await loadData()
  return [...data.pageById.keys()]
}

/** Static frame + article. The client bundle takes over on load. */
export async function renderPage(pageId: string): Promise<{ title: string; html: string } | null> {
  const data = await loadData()
  const model = readerModelFor(data, pageId)
  if (!model) return null
  const html = renderToStaticMarkup(
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative flex min-h-0 flex-1">
        <Sidebar
          items={SECTIONS.map((s) => ({ id: s.key, num: s.num, name: s.navLabel }))}
          activeId=""
          onNavigate={() => {}}
          backLink={{ label: 'Back to app', href: '../dashboard.html' }}
        />
        <div className="fm-content ml-16 flex min-w-0 flex-1 flex-col">
          <AnnouncementBar
            message="Referral Program is officially live — earn rewards by inviting friends."
            cta={{ label: 'JOIN NOW ↗', href: 'https://vibe.trading' }}
          />
          <TopBar breadcrumb="VIBE × SYMM · FIELD MANUAL" section={READER_SECTION} />
          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="fm-pane">
              <ReaderArticle model={model} rating={<RatingButtons rating={null} onRate={() => {}} />} />
            </div>
          </main>
        </div>
      </div>
    </div>,
  )
  return { title: model.page.title, html }
}
