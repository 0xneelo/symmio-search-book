/**
 * The three renderAnswer branches (index.html L3039–3116) expressed as
 * AnswerCard content: service response (answered / refusal / degraded),
 * ungrounded gap, and local routed page.
 */
import { AnswerCard } from '@/components/manual'
import type { AnswerResult } from '@/data/types'
import type { ReactNode } from 'react'
import { ChipRow, SourceChip, citationChipsFor, sourceChipsFor, sourceUrlChipsFor } from './chips'

function Paragraphs({ text }: { text: string }) {
  const paragraphs = String(text || '')
    .split(/\n{2,}/u)
    .map((item) => item.trim())
    .filter(Boolean)
  if (!paragraphs.length) return <p style={{ margin: 0 }}>No answer text returned.</p>
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ margin: i ? '10px 0 0' : 0 }}>
          {p}
        </p>
      ))}
    </>
  )
}

/** DESIGN.MD §10 forbids emoji — the old "⚡ Limited mode" banner becomes a mono kicker row. */
function DegradedBanner({ reason }: { reason?: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: 1,
        color: 'var(--ink)',
        border: '1px dashed var(--ink)',
        padding: '7px 10px',
        marginBottom: 12,
      }}
    >
      LIMITED MODE —{' '}
      {reason === 'rate-limited'
        ? "you've reached your question limit. Only saved questions are answerable right now; try an example below."
        : 'the live answer engine is unavailable. Only saved questions are answerable right now; try an example below.'}
    </div>
  )
}

export interface AnswerBodyProps {
  result: AnswerResult
  query: string
  eventId: string
  /** Rating row (wired by the shell). */
  rating: ReactNode
  onOpenPage: (pageId: string) => void
}

export function AnswerBody({ result, query, rating, onOpenPage }: AnswerBodyProps) {
  const page = result.page

  if (result.serviceResponse) {
    const response = result.serviceResponse
    const isAnswered = response.status === 'answered'
    const title =
      page?.title || response.citations?.[0]?.pageTitle || (isAnswered ? 'Cited answer' : 'Answer unavailable')
    const meta = isAnswered
      ? `service answer / ${response.confidence || 'grounded'}`
      : `service refusal / ${response.refusalReason || response.status || 'not answered'}`
    return (
      <AnswerCard
        meta={meta}
        title={title}
        body={
          <>
            {response.degraded && <DegradedBanner reason={response.degraded.reason} />}
            {isAnswered ? (
              <Paragraphs text={response.answer || ''} />
            ) : (
              <p style={{ margin: 0 }}>
                {response.message ||
                  response.refusalReason ||
                  'The service could not produce a grounded answer for this question.'}
              </p>
            )}
            {response.gapEvent && (
              <p style={{ margin: '10px 0 0' }}>
                <strong>Gap:</strong> {response.gapEvent.reason || response.refusalReason || 'recorded'}
              </p>
            )}
            <ChipRow style={{ marginTop: 14 }}>
              {citationChipsFor(response.citations)}
              {page && sourceChipsFor(page)}
              {page && sourceUrlChipsFor(page)}
              {page && (
                <SourceChip href={`?page=${encodeURIComponent(page.id)}`} onClick={() => onOpenPage(page.id)}>
                  Open exact page
                </SourceChip>
              )}
            </ChipRow>
          </>
        }
        rating={rating}
      />
    )
  }

  if (!page) {
    return (
      <AnswerCard
        meta="No grounded route / recorded gap"
        title="No exact page found yet"
        body={
          <>
            <p style={{ margin: 0 }}>
              The current corpus did not produce a grounded match for &ldquo;{query}&rdquo;. This
              question is now in the local gaps queue.
            </p>
            <ChipRow style={{ marginTop: 14 }}>
              <SourceChip>questions</SourceChip>
              <SourceChip>gaps</SourceChip>
            </ChipRow>
          </>
        }
        rating={rating}
      />
    )
  }

  return (
    <AnswerCard
      meta={`${page.section || 'docs'} / routed answer / score ${result.score}`}
      title={page.title}
      body={
        <>
          <p style={{ margin: 0 }}>{page.summary || page.excerpt || ''}</p>
          {result.questionRoute && (
            <p style={{ margin: '10px 0 0' }}>
              <strong>Seeded route:</strong> {result.questionRoute.question}{' '}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8fa0d8' }}>
                / confidence {result.questionRoute.confidence}
              </span>
            </p>
          )}
          {result.glossaryTerm && (
            <p style={{ margin: '10px 0 0' }}>
              <strong>Glossary:</strong> {result.glossaryTerm.term} — {result.glossaryTerm.definition}
            </p>
          )}
          {result.answerChunk?.text && (
            <p style={{ margin: '10px 0 0' }}>
              <strong>Matched chunk:</strong> {result.answerChunk.text.slice(0, 420)}
              {result.answerChunk.text.length > 420 ? '…' : ''}
            </p>
          )}
          {page.gap && (
            <p style={{ margin: '10px 0 0' }}>
              <strong>Gap:</strong> {page.gap}
            </p>
          )}
          <ChipRow style={{ marginTop: 14 }}>
            {sourceChipsFor(page)}
            {sourceUrlChipsFor(page)}
            <SourceChip href={`?page=${encodeURIComponent(page.id)}`} onClick={() => onOpenPage(page.id)}>
              Open exact page
            </SourceChip>
          </ChipRow>
        </>
      }
      rating={rating}
    />
  )
}
