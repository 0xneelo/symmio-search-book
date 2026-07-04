import { useCallback, useMemo } from 'react'
import { ChapterHeading, RatingButtons } from '@/components/manual'
import { readerModelFor } from '@/lib/reader'
import { recordPageRating, type VoteValue } from '@/lib/voting'
import type { SearchBookApp } from '../useSearchBook'
import { ReaderArticle } from '../reader/ReaderArticle'
import { useVote } from '../useVote'
import { ChipRow } from '../chips'

/** Client reader island: crosslink nav, related pages, one-shot page rating. */
export function ReaderView({ app, pageId }: { app: SearchBookApp; pageId: string }) {
  const model = useMemo(
    () => (app.data ? readerModelFor(app.data, pageId) : null),
    [app.data, pageId],
  )

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

  if (!model) {
    // L3897 — not-found panel.
    return (
      <div data-page="reader-missing">
        <ChapterHeading title="Page not found" punctuation="." size={48} />
        <p style={{ margin: '0 0 20px', fontSize: 15.5, lineHeight: 1.75, color: '#d3dbff', maxWidth: 620 }}>
          The local index has no page with id{' '}
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              background: 'rgba(2,4,14,0.55)',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '1px 5px',
            }}
          >
            {pageId}
          </code>
          .
        </p>
        <ChipRow>
          <button
            type="button"
            className="chip"
            style={{
              background: 'transparent',
              border: '2px solid #2e6bff',
              color: '#cdd8ff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 12,
              padding: '8px 14px',
              cursor: 'pointer',
            }}
            onClick={() => app.clearActivePage('classic')}
          >
            ← Back to Ask
          </button>
          <button
            type="button"
            className="chip"
            style={{
              background: 'transparent',
              border: '2px solid #2e6bff',
              color: '#cdd8ff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 12,
              padding: '8px 14px',
              cursor: 'pointer',
            }}
            onClick={() => app.clearActivePage('browse')}
          >
            Browse docs
          </button>
        </ChipRow>
      </div>
    )
  }

  return (
    <ReaderArticle
      model={model}
      onReturn={(variant) => app.clearActivePage(variant)}
      onOpenPage={(id) => app.openPage(id, 'browse')}
      rating={
        <RatingButtons
          rating={voteState.rating}
          locked={voteState.locked}
          error={voteState.error}
          onRate={(dir) => void voteState.vote(dir)}
        />
      }
    />
  )
}
