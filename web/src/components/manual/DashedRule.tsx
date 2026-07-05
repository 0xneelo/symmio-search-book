import type { CSSProperties } from 'react'

/** 6px dashed blue rule under chapter titles (12px dash / 24px period). */
export function DashedRule({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        height: 6,
        backgroundImage:
          'repeating-linear-gradient(90deg,rgba(126,160,255,0.55) 0 12px,transparent 12px 24px)',
        margin: '22px 0 30px',
        ...style,
      }}
    />
  )
}
