import type { ReactNode } from 'react'
import { ChapterHeading, Kicker } from '@/components/manual'
import { directRouteFor, type ReaderModel } from '@/lib/reader'
import { ChipRow, SourceChip, sourceChipsFor, sourceUrlChipsFor } from '../chips'

/**
 * Page-reader chapter template (DESIGN.MD §4 via design-mapping): kicker chips →
 * H1 + dashed rule → body → right rail (On this page / Sources / Related /
 * Rate). Pure and SSR-safe — interactivity arrives via the handler props the
 * client island passes in.
 */
export interface ReaderArticleProps {
  model: ReaderModel
  /** Client-side actions; omit for the static prerender. */
  onReturn?: (variant: string) => void
  onOpenPage?: (pageId: string) => void
  /** Rating row island (RatingButtons wired to /page-feedback). */
  rating?: ReactNode
}

const actionBtn: React.CSSProperties = {
  background: 'transparent',
  border: '2px solid #2e6bff',
  color: '#cdd8ff',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: 12,
  padding: '8px 14px',
  cursor: 'pointer',
  transition: 'all .12s',
}

function RailPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      style={{
        border: '1.5px dashed rgba(255,255,255,0.3)',
        padding: '16px 16px 18px',
        marginBottom: 18,
        backgroundImage:
          'linear-gradient(var(--gridc) 1px,transparent 1px),linear-gradient(90deg,var(--gridc) 1px,transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <Kicker size={10.5} tracking={2.5} style={{ marginBottom: 12 }}>
        {title}
      </Kicker>
      {children}
    </section>
  )
}

export function ReaderArticle({ model, onReturn, onOpenPage, rating }: ReaderArticleProps) {
  const { page, bodyHtml, tocItems, related, previous, next, status } = model
  return (
    <div data-page="reader" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 40 }}>
      <article style={{ minWidth: 0 }}>
        <ChipRow style={{ marginBottom: 18 }}>
          <SourceChip>{page.section || 'docs'}</SourceChip>
          <SourceChip>{page.track || page.granularity || 'route'}</SourceChip>
          <SourceChip>{status}</SourceChip>
        </ChipRow>
        <ChapterHeading title={page.title} size={48} />
        {(page.summary || page.excerpt) && (
          <p
            className="dropcap"
            style={{
              margin: '0 0 26px',
              fontSize: 16,
              lineHeight: 1.7,
              color: '#c9d4ff',
              maxWidth: 880,
            }}
          >
            {page.summary || page.excerpt}
          </p>
        )}
        <ChipRow style={{ marginBottom: 26 }}>
          <button type="button" className="chip" style={actionBtn} onClick={() => onReturn?.('classic')}>
            ← Back to Ask
          </button>
          <button type="button" className="chip" style={actionBtn} onClick={() => onReturn?.('browse')}>
            Browse docs
          </button>
          {previous && (
            <button type="button" className="chip" style={actionBtn} onClick={() => onOpenPage?.(previous.id)}>
              Previous: {previous.title}
            </button>
          )}
          {next && (
            <button type="button" className="chip" style={actionBtn} onClick={() => onOpenPage?.(next.id)}>
              Next: {next.title}
            </button>
          )}
          <SourceChip href={directRouteFor(page)}>Indexed route</SourceChip>
        </ChipRow>
        <div
          className="reader-body"
          style={{ maxWidth: 880 }}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </article>

      <aside style={{ minWidth: 0 }}>
        {tocItems.length > 0 && (
          <RailPanel title="ON THIS PAGE">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#aebaf0',
                    textDecoration: 'none',
                    paddingLeft: item.level === '3' ? 14 : 0,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </RailPanel>
        )}
        <RailPanel title="SOURCES">
          <ChipRow>
            {sourceChipsFor(page).length ? sourceChipsFor(page) : <SourceChip>source pending</SourceChip>}
          </ChipRow>
          <ChipRow style={{ marginTop: 8 }}>{sourceUrlChipsFor(page)}</ChipRow>
        </RailPanel>
        <RailPanel title="RELATED PAGES">
          {related.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {related.map((relatedPage) => (
                <button
                  key={relatedPage.id}
                  type="button"
                  className="chip"
                  style={{ ...actionBtn, textAlign: 'left' }}
                  onClick={() => onOpenPage?.(relatedPage.id)}
                >
                  {relatedPage.title}
                </button>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8fa0d8' }}>
              No related pages indexed yet.
            </p>
          )}
        </RailPanel>
        <RailPanel title="RATE THIS PAGE">
          {rating}
          <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8fa0d8' }}>
            Feedback routes into the living-docs gaps loop.
          </p>
        </RailPanel>
      </aside>
    </div>
  )
}
