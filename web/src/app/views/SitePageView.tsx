import { useEffect } from 'react'
import { WikiChrome, type SitePageKind } from '@/components/wiki/WikiChrome'
import type { SearchBookApp } from '../useSearchBook'
import { wikiChromePropsFor } from '../wikiChrome'

/**
 * Footer site pages (favorites QA round): Privacy policy, About Symmiopedia,
 * Disclaimers — hand-written project pages rendered as plain wiki articles.
 * Reached from the chrome footer on every page (?special=<kind>).
 */

const TITLES: Record<SitePageKind, string> = {
  privacy: 'Symmiopedia:Privacy policy',
  about: 'Symmiopedia:About',
  disclaimers: 'Symmiopedia:General disclaimer',
}

function PrivacyBody() {
  return (
    <>
      <p>
        Symmiopedia is designed to be usable without an account and without handing over
        personal information. There is no sign-up, no profile, and no advertising or
        third-party analytics on any page.
      </p>
      <h2>What we collect</h2>
      <p>
        To improve the encyclopedia, the site records a small amount of anonymous usage
        data:
      </p>
      <ul>
        <li>
          <b>Questions and searches</b> — the text of questions asked through the search
          box and reference desk, so editorial can find gaps in the corpus.
        </li>
        <li>
          <b>Page feedback</b> — anonymous “Was this page useful?” votes and page stars,
          stored as per-page counters.
        </li>
      </ul>
      <p>
        None of this is linked to your identity: no names, e-mail addresses, wallet
        addresses, or IP-address profiles are stored with these events.
      </p>
      <h2>Where it lives</h2>
      <p>
        Usage events are stored in a private datastore operated by the Symmiopedia team
        and are pruned on a rolling retention window. Your browser additionally keeps a
        small amount of local data (your starred pages, your own recent questions and
        votes) in <code>localStorage</code>; it never leaves your device unless the
        answer service is reachable, and you can clear it at any time through your
        browser settings.
      </p>
      <h2>Third parties</h2>
      <p>
        Articles link out to external sites (protocol documentation, block explorers,
        social channels). Those sites have their own privacy practices; this policy stops
        at the edge of Symmiopedia.
      </p>
      <p>
        Questions about this policy can be raised through the official SYMMIO and Vibe
        community channels.
      </p>
    </>
  )
}

function AboutBody() {
  return (
    <>
      <p>
        <b>Symmiopedia</b> is the open ecosystem encyclopedia: a searchable reference for
        the SYMMIO protocol and the ecosystem built on top of it, including Vibe and
        partner front-ends. It grows out of the Search Book corpus — a curated,
        source-mapped collection of authored articles and generated reference pages.
      </p>
      <h2>How it works</h2>
      <ul>
        <li>
          <b>Articles</b> are built from the corpus: every page maps to indexed source
          material, and curated pages are reviewed by the editorial pipeline.
        </li>
        <li>
          <b>Ask a question</b> — the search box doubles as a reference desk. Questions
          are answered by an answer engine grounded in the same corpus; answers cite the
          pages they draw from.
        </li>
        <li>
          <b>Feedback loops</b> — page stars and “Was this page useful?” votes feed the
          editorial queue, so weak pages get rewritten and missing topics get added.
        </li>
      </ul>
      <h2>Editing</h2>
      <p>
        Symmiopedia does not yet accept user-submitted edits; articles are maintained by
        the editorial pipeline. Community editing is planned for a later release — until
        then, the feedback controls on every page are the fastest way to flag a problem.
      </p>
      <h2>Affiliation</h2>
      <p>
        The visual register is a homage to classic wiki encyclopedias. Symmiopedia is an
        independent reference work for the SYMMIO ecosystem and is not affiliated with or
        endorsed by the Wikimedia Foundation or Wikipedia.
      </p>
    </>
  )
}

function DisclaimersBody() {
  return (
    <>
      <p>
        Symmiopedia is provided on a best-effort, <i>as-is</i> basis. Please read the
        following before relying on anything you find here.
      </p>
      <h2>Not financial advice</h2>
      <p>
        Nothing on Symmiopedia constitutes financial, investment, legal, or tax advice.
        Articles describe how protocols and products are designed to work; they are not a
        recommendation to trade. Derivatives trading carries a significant risk of loss —
        do your own research and never risk funds you cannot afford to lose.
      </p>
      <h2>Accuracy</h2>
      <p>
        The ecosystem moves quickly and pages can lag behind protocol changes,
        parameter updates, or new releases. Parts of the corpus are machine-generated
        from indexed sources and, despite editorial review, may contain errors or
        omissions. Always verify load-bearing details against the official documentation
        of the protocol in question before acting on them.
      </p>
      <h2>External links</h2>
      <p>
        Links to external sites are provided for reference. Symmiopedia does not control
        and is not responsible for their content.
      </p>
      <h2>No affiliation</h2>
      <p>
        Symmiopedia is not affiliated with or endorsed by the Wikimedia Foundation.
        Protocol and product names belong to their respective projects.
      </p>
    </>
  )
}

export function SitePageView({ app, kind }: { app: SearchBookApp; kind: SitePageKind }) {
  useEffect(() => {
    document.title = `${TITLES[kind]} - Symmiopedia`
  }, [kind])

  return (
    <WikiChrome {...wikiChromePropsFor(app)}>
      <h1>{TITLES[kind]}</h1>
      <div className="wk-sitesub">From Symmiopedia, the open ecosystem encyclopedia</div>
      <div className="wk-body">
        {kind === 'privacy' ? <PrivacyBody /> : kind === 'about' ? <AboutBody /> : <DisclaimersBody />}
      </div>
    </WikiChrome>
  )
}
