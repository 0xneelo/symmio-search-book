import { useMemo, useState } from 'react'
import {
  answerEngineContract,
  answerValidationReport,
  discordEditorialQueue,
  discordRouting,
  gapQueue,
  llmRagContract,
  qualityAudit,
  requirementMap,
  sourceIngestion,
} from '@/data/loader'
import {
  clearEventLog,
  currentEventLists,
  exportEventLogPayload,
  localEventLists,
  serviceState,
  serviceStatusText,
} from '@/lib/service'
import type { SearchBookApp } from '../useSearchBook'
import { MonoList, OpsRow, PlateSection, StatTile, ViewIntro, type RowTone } from '../ops'
import { ChipRow, SourceChip } from '../chips'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

/** L3663 — requirement status → row tone. */
function requirementTone(status: string): RowTone {
  if (status === 'complete') return 'pass'
  if (status === 'parked') return 'blocked'
  if (status === 'missing') return 'local'
  return 'priority'
}

/** §05 Insights — the full ops console (renderInsights composite, L3600–3745). */
export function InsightsView({ app }: { app: SearchBookApp }) {
  const [logStatus, setLogStatus] = useState<string | null>(null)

  // insightsVersion invalidates after asks/votes/service refreshes.
  const events = useMemo(() => currentEventLists(), [app.insightsVersion])

  // L3600 — service-mode math merges service totals with local fallback counts.
  const serviceTotals = serviceState.insights?.totals || null
  const localEvents = useMemo(
    () => (serviceTotals ? localEventLists() : { questions: [], ratings: [], gaps: [] }),
    [serviceTotals, app.insightsVersion],
  )
  const serviceAnswered = serviceState.insights?.byQuestionStatus?.answered || 0
  const localAnswered = localEvents.questions.filter((item) => item.status === 'answered').length
  const answered = serviceTotals
    ? serviceAnswered + localAnswered
    : events.questions.filter((item) => item.status === 'answered').length
  const questionCount = serviceTotals ? serviceTotals.questions + localEvents.questions.length : events.questions.length
  const gapCount =
    (serviceTotals ? serviceTotals.gaps + localEvents.gaps.length : events.gaps.length) + (gapQueue.totalItems || 0)
  const ratingCount = serviceTotals ? serviceTotals.ratings + localEvents.ratings.length : events.ratings.length

  const gates: Any[] = qualityAudit.gates || []
  const gatesPassed = gates.filter((g: Any) => g.passed).length
  const totals: Any = qualityAudit.totals || {}
  const unresolved: Any = qualityAudit.unresolved || {}
  const answerEngineEval: Any = answerEngineContract.evaluation || {}
  const llmAdversarial: Any = llmRagContract.adversarialEvaluation || {}
  const validationCoverage: Any = answerValidationReport.coverage || {}

  const requirements: Any[] = requirementMap.requirements || []
  const reqByStatus: Any = requirementMap.byStatus || {}
  const srcRequirements: Any[] = sourceIngestion.requirements || []
  const srcByStatus: Any = sourceIngestion.byStatus || {}

  const summary: Any = discordRouting.summary || {}
  const plan: Any = discordRouting.reviewPlan || {}
  const routeCoverage: Any = plan.routeCoverage || {}
  const workflow: Any = discordEditorialQueue.reviewerWorkflow || {}
  const workflowCounts: Any = workflow.counts || {}
  const disposition: Any = discordEditorialQueue.disposition || {}

  const pageById = app.data?.pageById

  return (
    <div data-page="insights">
      <ViewIntro title="Insights" lead="Living-docs telemetry — questions, ratings, gaps, and the publication audit trail." />

      {/* Metrics (L3600) */}
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 12 }}>
        <StatTile label="Questions" value={questionCount} />
        <StatTile label="Answered" value={answered} />
        <StatTile label="Gaps" value={gapCount} />
        <StatTile label="Ratings" value={ratingCount} />
      </div>
      <p style={{ margin: '0 0 30px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8fa0d8' }}>
        {serviceStatusText()}
      </p>

      {/* Event log tools (L3790–3824) */}
      <PlateSection title="FIG_I01 — EVENT LOG" aside="[ LOCAL + SERVICE ]">
        <ChipRow style={{ marginBottom: 10 }}>
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
            onClick={() => {
              const text = exportEventLogPayload()
              if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(text).then(
                  () => setLogStatus('Copied.'),
                  () => setLogStatus(text),
                )
              } else {
                setLogStatus(text)
              }
            }}
          >
            Copy event log
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
            onClick={() => {
              setLogStatus(clearEventLog())
              app.bumpInsights()
            }}
          >
            Clear local log
          </button>
        </ChipRow>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: '#8fa0d8',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: 220,
            overflow: 'auto',
          }}
        >
          {logStatus ?? serviceStatusText()}
        </p>
      </PlateSection>

      {/* Quality audit (L3619) */}
      <PlateSection title="FIG_I02 — PUBLICATION AUDIT" aside={`[ ${gatesPassed}/${gates.length} GATES ]`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 30 }}>
          <div>
            {gates.length ? (
              gates.map((gate: Any) => (
                <OpsRow
                  key={gate.id}
                  tone={gate.passed ? 'pass' : 'blocked'}
                  meta={`${gate.passed ? 'passed' : 'open'} / ${gate.id}`}
                  title={gate.label}
                  detail={gate.detail}
                />
              ))
            ) : (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>No audit generated yet.</p>
            )}
          </div>
          <MonoList
            items={[
              { label: 'Gates', value: `${gatesPassed} of ${gates.length} passing.` },
              {
                label: 'Reader-routable pages',
                value: `${totals.readerRoutablePages || 0} routes: ${totals.manifestPages || 0} generated/indexed + ${totals.authoredPublicationCandidates || 0} authored.`,
              },
              {
                label: 'Guided journeys',
                value: `${totals.guidedJourneys || 0} journeys, ${totals.guidedJourneySteps || 0} routed steps.`,
              },
              {
                label: 'Seeded question routes',
                value: `${totals.seededQuestionRoutes || 0} answerable routes, ${totals.seededReconciliationQuestions || 0} reconciliation questions.`,
              },
              {
                label: 'Local FAQ seed',
                value: `${totals.localFaqEntries || 0} entries: ${totals.localFaqAnswerable || 0} answerable, ${totals.localFaqUnresolved || 0} unresolved across ${totals.localFaqCategories || 0} categories.`,
              },
              {
                label: 'Gap queue',
                value: `${totals.gapQueueItems || 0} prioritized items; ${totals.gapQueueQuestionSignals || 0} question signals, ${totals.gapQueueOperatorSignals || 0} operator signals, ${totals.gapQueueParkedPageSignals || 0} parked page signals.`,
              },
              {
                label: 'Glossary',
                value: `${totals.glossaryTerms || 0} routed terms across ${totals.glossaryCategories || 0} categories.`,
              },
              {
                label: 'Source catalog',
                value: `${totals.sourceCatalogEntries || 0} registered sources; ${totals.linkedSourceCatalogEntries || 0} carry direct links.`,
              },
              {
                label: 'Source ingestion',
                value: `${totals.sourceIngestionComplete || 0} of ${totals.sourceIngestionRequirements || 0} families complete; ${totals.sourceIngestionPartial || 0} partial, ${totals.sourceIngestionParked || 0} parked, ${totals.sourceIngestionMissing || 0} missing.`,
              },
              {
                label: 'Reader crosslinks',
                value: `${totals.crosslinkedReaderPages || 0} pages; ${totals.readerPagesWithPrevious || 0} previous links, ${totals.readerPagesWithNext || 0} next links.`,
              },
              {
                label: 'Answer chunks',
                value: `${totals.answerChunks || 0} retrieval chunks across ${totals.answerChunkPages || 0} pages and ${totals.answerChunkSourceKeys || 0} source keys.`,
              },
              {
                label: 'Deterministic answer engine',
                value: `${answerEngineContract.deterministicReady ? 'ready' : 'not ready'}; ${answerEngineEval.exactRouteTestsPassing || 0} of ${answerEngineEval.totalExactRouteTests || 0} exact routes and ${answerEngineEval.refusalTestsPassing || 0} of ${answerEngineEval.totalRefusalTests || 0} refusals passing.`,
              },
              {
                label: 'LLM RAG contract',
                value: `API ${llmRagContract.apiContractReady ? 'ready' : 'pending'}; eval ${llmRagContract.evalHarnessReady ? 'ready' : 'pending'}; runtime ${llmRagContract.runtimeImplemented ? 'implemented' : 'not implemented'}; ${llmAdversarial.passingCases || 0} of ${llmAdversarial.totalCases || 0} adversarial cases passing.`,
              },
              {
                label: 'Answer validation harness',
                value: `${answerValidationReport.reportReady ? 'ready' : 'not ready'}; ${validationCoverage.passingFixtures || 0} of ${validationCoverage.totalFixtures || 0} fixtures passing, ${validationCoverage.failingFixtures || 0} failing.`,
              },
              {
                label: 'Compendium volumes',
                value: `${totals.compendiumVolumes || 0} volumes, ${totals.compendiumChapters || 0} chapters, ${totals.compendiumVolumeOverviews || 0} overviews, ${totals.compendiumVolumeAssignedPages || 0} assigned reader pages.`,
              },
              {
                label: 'Completion requirements',
                value: `${totals.completionRequirementsComplete || 0} of ${totals.completionRequirements || 0} complete; ${totals.completionRequirementsPartial || 0} partial, ${totals.completionRequirementsParked || 0} parked, ${totals.completionRequirementsMissing || 0} missing.`,
              },
              {
                label: 'Source coverage',
                value: `${totals.usedSourceKeys || 0} used source keys; ${(qualityAudit.sourceCoverage?.unknownUsedSourceKeys || []).length} unknown.`,
              },
              {
                label: 'Open operator items',
                value: `${totals.openOperatorItems || 0} parked threads: ${(unresolved.operatorInbox || []).map((item: Any) => `#${item.id}`).join(', ') || 'none'}.`,
              },
              {
                label: 'Tracked gaps',
                value: `${totals.trackedGaps || 0} documented gaps; ${totals.reconciliationQuestions || 0} reconciliation questions.`,
              },
            ]}
          />
        </div>
      </PlateSection>

      {/* Requirements (L3670) */}
      <PlateSection title="FIG_I03 — COMPLETION REQUIREMENTS" aside={`[ ${requirementMap.completionReady ? 'READY' : 'IN PROGRESS'} ]`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 30 }}>
          <div>
            {requirements.length ? (
              requirements.map((requirement: Any) => (
                <OpsRow
                  key={requirement.id}
                  tone={requirementTone(requirement.status)}
                  meta={`${requirement.status} / ${requirement.category} / ${requirement.id}`}
                  title={requirement.label}
                  detail={
                    <>
                      {requirement.evidence || ''}
                      {requirement.nextAction ? ` — ${requirement.nextAction}` : ''}
                    </>
                  }
                >
                  <ChipRow style={{ marginTop: 8 }}>
                    {(requirement.sourceSpecs || []).map((spec: string) => (
                      <SourceChip key={`spec-${spec}`}>spec-{spec}</SourceChip>
                    ))}
                    {(requirement.blocks || []).map((block: string) => (
                      <SourceChip key={`block-${block}`}>{block}</SourceChip>
                    ))}
                  </ChipRow>
                </OpsRow>
              ))
            ) : (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
                No requirement map generated yet.
              </p>
            )}
          </div>
          <MonoList
            items={[
              { label: 'Ready', value: requirementMap.completionReady ? 'yes' : 'no' },
              {
                label: 'Complete',
                value: `${reqByStatus.complete || 0} of ${requirementMap.totalRequirements || 0} requirements.`,
              },
              { label: 'Partial', value: `${reqByStatus.partial || 0} requirements still need production/editorial work.` },
              { label: 'Parked', value: `${reqByStatus.parked || 0} requirements depend on operator inbox decisions.` },
              { label: 'Missing', value: `${reqByStatus.missing || 0} requirements have no final artifact yet.` },
            ]}
          />
        </div>
      </PlateSection>

      {/* Source ingestion (L3700) */}
      <PlateSection title="FIG_I04 — SOURCE INGESTION" aside={`[ ${sourceIngestion.sourceCompletionReady ? 'READY' : 'IN PROGRESS'} ]`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 30 }}>
          <div>
            {srcRequirements.length ? (
              srcRequirements.map((req: Any) => (
                <OpsRow
                  key={req.id}
                  tone={requirementTone(req.status)}
                  meta={`${req.status} / ${req.category} / ${req.id}`}
                  title={req.label}
                  detail={
                    <>
                      {req.evidence || ''}
                      {(req.missingKeys || []).length ? ` — Missing: ${(req.missingKeys || []).join(', ')}` : ''}
                      {req.nextAction ? ` — ${req.nextAction}` : ''}
                    </>
                  }
                >
                  <ChipRow style={{ marginTop: 8 }}>
                    {(req.sourceSpecs || []).map((spec: string) => (
                      <SourceChip key={`spec-${spec}`}>spec-{spec}</SourceChip>
                    ))}
                    {(req.presentKeys || []).slice(0, 8).map((key: string) => (
                      <SourceChip key={`pk-${key}`}>{key}</SourceChip>
                    ))}
                    {(req.blocks || []).map((block: string) => (
                      <SourceChip key={`block-${block}`}>{block}</SourceChip>
                    ))}
                  </ChipRow>
                </OpsRow>
              ))
            ) : (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
                No source-ingestion map generated yet.
              </p>
            )}
          </div>
          <MonoList
            items={[
              { label: 'Ready', value: sourceIngestion.sourceCompletionReady ? 'yes' : 'no' },
              {
                label: 'Complete',
                value: `${srcByStatus.complete || 0} of ${sourceIngestion.totalSourceRequirements || 0} source families.`,
              },
              { label: 'Partial', value: `${srcByStatus.partial || 0} source families need more mining or registration.` },
              { label: 'Parked', value: `${srcByStatus.parked || 0} source families depend on operator inbox items.` },
              { label: 'Missing', value: `${srcByStatus.missing || 0} source families have no registered source yet.` },
            ]}
          />
        </div>
      </PlateSection>

      {/* Discord routing (L3520) */}
      <PlateSection title="FIG_I05 — DISCORD DEMAND ROUTING" aside={`[ ${discordRouting.routingReady ? 'READY' : 'NOT READY'} ]`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 30 }}>
          <div>
            {discordRouting.routingReady ? (
              <>
                {(plan.pageFitReview || []).slice(0, 10).map((item: Any) => {
                  const page = pageById?.get(item.pageId)
                  const reviewTypes = Object.entries(item.byReviewType || {})
                    .map(([type, count]) => `${type}: ${count}`)
                    .join(' / ')
                  const routeLabel =
                    item.publicRouteCount === 1 ? '1 public route' : `${item.publicRouteCount || 0} public routes`
                  return (
                    <OpsRow
                      key={item.pageId}
                      tone={item.routedItems > 1 ? 'priority' : 'plain'}
                      meta={`page-fit review / ${item.routedItems} items / ${routeLabel}${reviewTypes ? ` / ${reviewTypes}` : ''}`}
                      title={page?.title || item.pageId}
                    >
                      <ChipRow style={{ marginTop: 8 }}>
                        <SourceChip
                          href={`?page=${encodeURIComponent(item.pageId)}`}
                          onClick={() => app.openPage(item.pageId, 'browse')}
                        >
                          {item.pageId}
                        </SourceChip>
                        <SourceChip>{item.coverageStatus || 'route-coverage-unknown'}</SourceChip>
                      </ChipRow>
                    </OpsRow>
                  )
                })}
                {(plan.refusalReview || []).slice(0, 8).map((item: Any) => (
                  <OpsRow
                    key={item.itemId}
                    tone="blocked"
                    meta={`${item.reviewType} / ${item.reviewAction}${item.routeStatus ? ` / ${item.routeStatus}` : ''}`}
                    title={item.refusalReason || item.itemId}
                  >
                    <ChipRow style={{ marginTop: 8 }}>
                      <SourceChip>{item.itemId}</SourceChip>
                    </ChipRow>
                  </OpsRow>
                ))}
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
                No sanitized Discord routing summary committed yet.
              </p>
            )}
          </div>
          <MonoList
            items={[
              { label: 'Routing status', value: discordRouting.routingReady ? 'ready' : 'not ready' },
              {
                label: 'Routed items',
                value: `${summary.routedItems || 0} review items; raw text included: ${discordRouting.rawDiscordTextIncluded ? 'yes' : 'no'}.`,
              },
              {
                label: 'Answered by existing pages',
                value: `${summary.byStatus?.answered || 0} answered; ${summary.byStatus?.refusal || 0} refusals kept review-bound.`,
              },
              {
                label: 'Editorial queue',
                value: `${plan.pageFitReviewReady || 0} page checks; ${plan.refusalReviewReady || 0} refusal checks.`,
              },
              {
                label: 'Reviewer workflow',
                value: `${workflow.status || 'missing'} / ${workflow.mode || 'unknown'}; ${workflowCounts.pageFitGroups || 0} page-fit groups, ${workflowCounts.refusalItems || 0} refusal items.`,
              },
              {
                label: 'Public promotion policy',
                value: `${disposition.publicCopyChangesProposed || 0} copy changes proposed; ${disposition.exactDiscordStatementsPromoted || 0} exact Discord/Lafa statements promoted.`,
              },
              {
                label: 'Route coverage',
                value: `${routeCoverage.pageFitCoveredByPublicRoutes || 0}/${routeCoverage.totalPageFitGroups || 0} page-fit groups have route aliases; ${routeCoverage.pageFitSingleRouteRemaining || 0} single-route groups remain.`,
              },
              {
                label: 'Review actions',
                value:
                  Object.entries(summary.byAction || {})
                    .map(([action, count]) => `${action}: ${count}`)
                    .join(' · ') || 'none',
              },
            ]}
          />
        </div>
      </PlateSection>

      {/* Gaps (L3474) */}
      <PlateSection title="FIG_I06 — WHERE DOCS FALL SHORT" aside={`[ ${gapQueue.totalItems || 0} QUEUED ]`}>
        {events.gaps.slice(0, 8).map((gap) => (
          <OpsRow
            key={gap.id}
            tone="local"
            meta={gap.reason || 'local-gap'}
            title={gap.query}
            detail={gap.page || ''}
          />
        ))}
        {(gapQueue.items || []).slice(0, 16).map((item: Any) => (
          <OpsRow
            key={item.id}
            tone={item.priority === 'P0' ? 'priority' : item.status === 'operator-parked' ? 'blocked' : 'plain'}
            meta={`${item.priority} / ${item.category} / ${item.status}`}
            title={item.title}
            detail={item.needed || item.summary || ''}
          >
            <ChipRow style={{ marginTop: 8 }}>
              <SourceChip>{(item.linkedQuestions || []).length} questions</SourceChip>
              <SourceChip>{(item.linkedOperatorItems || []).length} operator</SourceChip>
              <SourceChip>{(item.linkedParkedPages || []).length} parked pages</SourceChip>
              {(item.relatedPages || []).slice(0, 4).map((page: Any) => (
                <SourceChip
                  key={page.id}
                  href={`?page=${encodeURIComponent(page.id)}`}
                  onClick={() => app.openPage(page.id, 'browse')}
                >
                  {page.title}
                </SourceChip>
              ))}
            </ChipRow>
          </OpsRow>
        ))}
        {!events.gaps.length && !(gapQueue.items || []).length && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
            No local or generated gaps recorded yet.
          </p>
        )}
      </PlateSection>

      {/* Recent + ratings (L3581, L3590) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 34 }}>
        <PlateSection title="FIG_I07 — RECENT QUESTIONS" aside="[ 12 MAX ]" style={{ marginBottom: 0 }}>
          {events.questions.length ? (
            events.questions
              .slice(0, 12)
              .map((item) => (
                <OpsRow
                  key={item.id}
                  meta={`${item.status} / score ${String(item.score)}`}
                  title={`${item.query} → ${item.page}`}
                />
              ))
          ) : (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
              No questions recorded yet.
            </p>
          )}
        </PlateSection>
        <PlateSection title="FIG_I08 — ANSWER RATINGS" aside="[ 12 MAX ]" style={{ marginBottom: 0 }}>
          {events.ratings.length ? (
            events.ratings
              .slice(0, 12)
              .map((item, i) => (
                <OpsRow
                  key={item.id || item.eventId || i}
                  tone={item.rating === 'yes' || item.rating === 'useful' ? 'pass' : 'priority'}
                  meta={item.rating}
                  title={`${item.query} → ${item.page}`}
                />
              ))
          ) : (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>No ratings recorded yet.</p>
          )}
        </PlateSection>
      </div>
    </div>
  )
}
