/** localStorage lists — index.html L2474–2543. Keys and 200-item cap are parity-critical. */

export const storageKeys = {
  questions: 'searchBookPrototype.questions',
  ratings: 'searchBookPrototype.ratings',
  gaps: 'searchBookPrototype.gaps',
  serviceUrl: 'searchBookPrototype.serviceUrl',
  serviceMode: 'searchBookPrototype.serviceMode',
} as const

export function loadList<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

export function saveList<T>(key: string, value: T[], limit = 200): void {
  localStorage.setItem(key, JSON.stringify(value.slice(0, limit)))
}
