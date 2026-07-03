import { ChapterHeading, FigurePlate } from '@/components/manual'

/** Temporary pshell for views that land in M6 (reader) / M7 (remaining views). */
export function PlaceholderView({
  title,
  fig,
  note,
}: {
  title: string
  fig: string
  note: string
}) {
  return (
    <div data-page={fig}>
      <ChapterHeading title={title} />
      <FigurePlate fig={fig} tag="[ IN PREPARATION ]" maxWidth={880}>
        <p
          style={{
            margin: '20px 0 4px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: '#8fa0d8',
            textAlign: 'center',
            padding: '30px 0',
          }}
        >
          {note}
        </p>
      </FigurePlate>
    </div>
  )
}
