#!/usr/bin/env node

import { answerQuery, defaults, loadRuntime } from "./run-llm-rag-answer.mjs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const request = {
  ...defaults,
  requestId: "check-undocumented-fact-gap",
  query: "What is the SYMM token contract address on Ethereum mainnet?",
  source: "check-undocumented-fact-gap",
  mode: "extractive",
};

const runtime = loadRuntime(defaults);
let reuseCalls = 0;
const result = await answerQuery(request, runtime, {
  findReusableAnswer: async (_args, _runtime, context) => {
    reuseCalls += 1;
    const chunk = context.chunks[0];
    return {
      meta: { source: "deterministic-undocumented-fact-check" },
      response: {
        requestId: request.requestId,
        status: "answered",
        factCoverage: "absent",
        answer:
          "The retrieved Search Book context does not provide the SYMM token contract address on Ethereum mainnet. It only provides related SYMM and Vibe context.",
        primaryPageId: chunk.pageId,
        citations: [
          {
            pageId: chunk.pageId,
            pageTitle: chunk.pageTitle,
            sourceKey: chunk.sourceKeys[0],
            sourceHref: chunk.sourceUrls[0],
            chunkIds: [chunk.id],
          },
        ],
        events: [
          {
            type: "question-answered",
            pageId: chunk.pageId,
            query: request.query,
            source: request.source,
            gapId: "",
            operatorItemIds: [],
            reason: "",
          },
        ],
        refusalReason: "",
        message: "",
        suggestedQueries: [],
        relatedPageIds: [],
      },
    };
  },
});

const response = result.response;
assert(reuseCalls === 1, "deterministic reusable answer path was not exercised.");
assert(response.status === "answered", "missing-fact response must preserve answered status.");
assert(response.factCoverage === "absent", "missing-fact response must preserve factCoverage=absent.");
assert(response.gapEvent?.reason === "asked-fact-not-in-corpus", "gapEvent reason must be asked-fact-not-in-corpus.");
assert(response.gapEvent?.query === request.query, "gapEvent must preserve the user query.");
assert(response.gapEvent?.id === `gap-${request.requestId}`, "gapEvent must use the request-scoped id.");
assert(
  (response.events || []).some(
    (event) =>
      event.type === "gap-created" &&
      event.reason === "asked-fact-not-in-corpus" &&
      event.pageId === response.primaryPageId,
  ),
  "events must include a gap-created asked-fact-not-in-corpus event.",
);

console.log(JSON.stringify({
  status: "passed",
  service: "search-book-undocumented-fact-gap-check",
  valuesPrinted: false,
  evidence: {
    reusedAnswerPath: true,
    annotatedStatus: response.status,
    factCoverage: response.factCoverage,
    gapReason: response.gapEvent.reason,
    eventTypes: response.events.map((event) => event.type),
  },
}, null, 2));
