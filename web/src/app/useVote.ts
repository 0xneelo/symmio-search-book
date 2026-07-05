import { useCallback, useRef, useState } from 'react'
import type { Rating } from '@/components/manual'
import type { VoteOutcome, VoteValue } from '@/lib/voting'

export interface VoteState {
  rating: Rating
  locked: boolean
  error: string | null
}

/**
 * Optimistic one-shot vote state machine (DESIGN.MD §5): highlight immediately,
 * lock after the vote persists, revert + inline error on failure.
 */
export function useVote(persist: (value: VoteValue) => Promise<VoteOutcome>) {
  const [state, setState] = useState<VoteState>({ rating: null, locked: false, error: null })
  const inFlight = useRef(false)

  const vote = useCallback(
    async (dir: 'up' | 'down'): Promise<boolean> => {
      if (inFlight.current || state.locked) return false
      inFlight.current = true
      const value: VoteValue = dir === 'up' ? 'yes' : 'no'
      setState({ rating: dir, locked: false, error: null })
      try {
        await persist(value)
        setState({ rating: dir, locked: true, error: null })
        return true
      } catch (error) {
        setState({
          rating: null,
          locked: false,
          error: (error as Error)?.message || 'Rating failed — try again.',
        })
        return false
      } finally {
        inFlight.current = false
      }
    },
    [persist, state.locked],
  )

  const reset = useCallback(() => setState({ rating: null, locked: false, error: null }), [])

  return { ...state, vote, reset }
}
