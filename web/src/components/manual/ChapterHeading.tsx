import { DashedRule } from './DashedRule'

export interface ChapterHeadingProps {
  title: string
  /** Ink-colored terminal punctuation (DESIGN.MD §3): '.' or '?'. */
  punctuation?: '.' | '?'
  size?: number
}

/** Section H1 (48–54px/700/−2.2px) ending in an ink-colored mark, over the dashed rule. */
export function ChapterHeading({ title, punctuation = '.', size = 52 }: ChapterHeadingProps) {
  return (
    <>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: size,
          letterSpacing: -2.2,
          color: '#ffffff',
        }}
      >
        {title}
        <span style={{ color: 'var(--ink)' }}>{punctuation}</span>
      </h1>
      <DashedRule />
    </>
  )
}
