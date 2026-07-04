/** Structural types for the corpus data (ported from index.html L2406–2465). */

export interface Page {
  id: string
  title: string
  section?: string
  track?: string
  granularity?: string
  status?: string
  sourcePriority?: string
  summary?: string
  excerpt?: string
  sources?: string[]
  sourceKeys?: string[]
  sourceUrls?: string[]
  keywords?: string[]
  route?: string
  file?: string
  curated?: boolean
  authored?: boolean
  gap?: string
  bodyMarkdown?: string
  relatedPages?: string[]
  relatedGeneratedPages?: string[]
}

export interface QuestionRoute {
  question: string
  normalizedQuestion?: string
  pageId: string
  pageTitle?: string
  notes?: string
  pageSection?: string
  pageTrack?: string
  confidence?: string
  page?: Page
}

export interface GlossaryTerm {
  term: string
  aliases?: string[]
  category?: string
  definition: string
  sourceKeys?: string[]
  pageIds?: string[]
  primaryPageId?: string
  pages?: Page[]
  primaryPage?: Page
}

export interface AnswerChunk {
  pageId: string
  title?: string
  section?: string
  track?: string
  sourceKeys?: string[]
  text?: string
  routeSource?: string
  page?: Page
}

export interface FaqEntry {
  question: string
  category?: string
  type?: string
  confidence?: string
  shortAnswer?: string
  answerSummary?: string
  notes?: string
  pageId?: string
  pageTitle?: string
  pageSection?: string
  pageTrack?: string
  gapId?: string
  gapTitle?: string
  sourceKeys?: string[]
  page?: Page | null
}

export interface AnswerResult {
  page: Page | null
  score: string | number
  questionRoute?: QuestionRoute
  glossaryTerm?: GlossaryTerm
  answerChunk?: AnswerChunk
  serviceResponse?: ServiceAnswerResponse
}

export interface ServiceCitation {
  pageId?: string
  pageTitle?: string
  sourceKey?: string
  sourceHref?: string
  chunkIds?: string[]
}

export interface ServiceAnswerResponse {
  status?: string
  confidence?: string
  answer?: string
  message?: string
  refusalReason?: string
  primaryPageId?: string
  citations?: ServiceCitation[]
  degraded?: { reason?: string } | null
  gapEvent?: { reason?: string } | null
  persisted?: { id?: string } | null
  requestId?: string
}

export interface QuestionEvent {
  id: string
  query: string
  source?: string
  pageId: string | null
  page: string
  score: string | number
  status: string
  time: string
  requestId?: string
  refusalReason?: string
  gapId?: string
  operatorItemIds?: string[]
}

export interface RatingEvent {
  id?: string
  rating: string
  query: string
  page: string
  pageId: string | null
  eventId: string
  time: string
  note?: string
}

export interface GapEvent {
  id: string
  query: string
  reason: string
  page: string
  pageId?: string | null
  time: string
  eventId?: string
  gapId?: string
  operatorItemIds?: string[]
}

export interface EventLists {
  questions: QuestionEvent[]
  ratings: RatingEvent[]
  gaps: GapEvent[]
}
