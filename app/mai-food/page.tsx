'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FlowDiagram from './FlowDiagram'

/* ── gallery data ── */
const IMAGE_PREFIX: Record<string, string[]> = {
  gStartingScreen:         ['Starting_Screen'],
  gScanning:               ['Scanning_Food', 'Scanning__Order_List1', 'Scanning'],
  gWeightedproductDetected:['Weighted_product__Detected', 'Weighted_product__Detected2', 'Weighted_product__Detected9'],
  gManualMode:             ['Manual_Mode', 'Manual_Mode1', 'Manual_Mode3'],
}
const CAPTIONS: Record<string, string> = {
  gStartingScreen:         'Clear instruction before any action — place food on tray, then press scan.',
  gScanning:               'Initial detection → order builds → orange items flagged for verification. Colour carries meaning at a glance.',
  gWeightedproductDetected:'Weighing required → modal guides one item at a time → completion confirmed. Sequential, never ambiguous.',
  gManualMode:             'Browse freely, exit cleanly. Manual mode is always one tap away — never forced, never abrupt.',
}

function Gallery({ id }: { id: string }) {
  const [idx, setIdx] = useState(0)
  const images = IMAGE_PREFIX[id]
  return (
    <div className="maif-gallery">
      <div className="maif-slides">
        {images.map((name, i) => (
          <div key={name} className={`maif-slide${i === idx ? ' active' : ''}`}>
            <img
              src={`/mai-food/images/${name}.png`}
              alt={name.replace(/_/g, ' ')}
              style={{ width: '100%', borderRadius: 8, display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="maif-slide-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`maif-dot${i === idx ? ' active' : ''}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
      <p className="maif-caption">{CAPTIONS[id]}</p>
    </div>
  )
}

export default function MaiFoodPage() {
  const [progWidth, setProgWidth] = useState(0)
  const [showBack, setShowBack]   = useState(false)
  const lastSecRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = {
      cursor:     document.body.style.cursor,
      background: document.body.style.background,
      overflow:   document.body.style.overflowX,
    }
    document.body.style.cursor     = 'auto'
    document.body.style.background = 'var(--dark-bg)'
    document.body.style.overflowX  = 'hidden'

    /* progress bar */
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgWidth(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* scroll reveal */
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.cs-page .sr').forEach(el => revealObs.observe(el))

    /* back button */
    const backObs = new IntersectionObserver(
      ([e]) => setShowBack(e.isIntersecting),
      { threshold: 0.15 }
    )
    if (lastSecRef.current) backObs.observe(lastSecRef.current)

    return () => {
      document.body.style.cursor     = prev.cursor
      document.body.style.background = prev.background
      document.body.style.overflowX  = prev.overflow
      window.removeEventListener('scroll', onScroll)
      revealObs.disconnect()
      backObs.disconnect()
    }
  }, [])

  return (
    <div className="cs-page">
      {/* progress bar */}
      <div className="onxt-prog" style={{ width: `${progWidth}%` }} />

      {/* back button */}
      <Link href="/#work" className={`onxt-back-btn${showBack ? ' visible' : ''}`}>
        <svg width="32" height="32" viewBox="0 0 44 36" fill="currentColor" shapeRendering="crispEdges" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}><rect x="0" y="16" width="44" height="4"/><rect x="14" y="1" width="4" height="4"/><rect x="9" y="6" width="4" height="4"/><rect x="4" y="11" width="4" height="4"/><rect x="4" y="21" width="4" height="4"/><rect x="9" y="26" width="4" height="4"/><rect x="14" y="31" width="4" height="4"/></svg>
        Back to work
      </Link>

      {/* HERO */}
      <div className="sec sec--hero" style={{ background: 'var(--dark-bg)' }}>
        <div className="inner" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="eyebrow eyebrow--ghost sr">Case Study · mAI Food · 2024</div>
          <h1 className="h-display sr d1">AI DOESN&apos;T NEED<br />TO BE <span style={{ color: 'var(--onxt-accent)' }}>PERFECT.</span></h1>
          <p className="hero-sub sr d2">When AI makes a mistake, the UX needs a plan. mAI Food didn&apos;t — and that was the real problem. This is how I redesigned a broken kiosk experience from the inside out.</p>
          <div className="stat-row sr d2">
            {[['3mo','Timeline'],['5','Systemic failures fixed'],['MVP','Shipped']].map(([val, lbl]) => (
              <div className="stat-pill" key={lbl}>
                <div className="stat-pill-val">{val}</div>
                <div className="stat-pill-lbl">{lbl}</div>
              </div>
            ))}
          </div>
          <div className="meta-row sr d3">
            {[['Role','Lead Designer (embedded)'],['Client','izy · via Resimator'],['Platform','Web · Kiosk POS'],['Status','MVP Shipped']].map(([k, v]) => (
              <div className="meta-item" key={k}>
                <div className="mlabel">{k}</div>
                <div className="mvalue">{v}</div>
              </div>
            ))}
          </div>
          <div className="hero-wm">mAI</div>
        </div>
      </div>

      {/* 01 OVERVIEW */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">01</div>
          <div className="eyebrow sr">What this was</div>
          <div className="two-col">
            <div>
              <h2 className="h-sec sr">AN AI PRODUCT WITH <span className="accent">NO PLAN FOR FAILURE.</span></h2>
              <p className="body sr d1">mAI Food is an AI-powered POS product built by izy for corporate cafeterias. It uses a camera to detect food items on a tray and generate a bill automatically — reducing manual input and speeding up checkout.</p>
              <p className="body sr d2">I was the lead designer, employed by Resimator and embedded within izy&apos;s product team. I owned the end-to-end redesign of a broken v1: the AI detection existed, but the UX around it — the feedback, the fallbacks, the edge cases — had no clear design thinking.</p>
              <div className="pull sr d3">&ldquo;The AI would always have moments of uncertainty. My job was to design those moments — not hide them.&rdquo;</div>
            </div>
            <div className="sr d2">
              <div className="card">
                <div className="card-eyebrow">SCOPE</div>
                <div className="role-list">
                  {[
                    ['01','End-to-end checkout UX','From first instruction to payment'],
                    ['02','AI feedback states','Confidence scoring, verification flows'],
                    ['03','Weighted product flow','Sequential modal replacing broken list'],
                    ['04','Design system patterns','New shared component library'],
                  ].map(([n, t, s]) => (
                    <div className="role-item" key={n as string}>
                      <div className="role-num">{n}</div>
                      <div><div className="role-title">{t}</div><div className="role-sub">{s}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 02 PROBLEM */}
      <div className="sec sec--light">
        <div className="inner">
          <div className="ch-wm">02</div>
          <div className="eyebrow sr">The problem</div>
          <h2 className="h-sec sr">EVERY AI FAILURE BECAME <span className="accent">A UX FAILURE.</span></h2>
          <p className="body sr d1">When I mapped the v1 screens for the first time, the problem wasn&apos;t hard to find. Every screen was solving the same problems differently. No shared language, no consistent feedback logic, no fallback thinking.</p>
          <div className="decisions sr d2">
            {[
              ['01','Inconsistent feedback states','Users had no way to tell what the AI was doing — scanning, processing, or stuck.','high'],
              ['02','No error states when AI failed','When detection went wrong, nothing communicated it. Users were left guessing.','high'],
              ['03','Visually inconsistent UI','No design system. Each screen handled patterns independently.','mid'],
              ['04','Weighted product flow was broken','Items needing weighing were dumped into a list with no sequence or guidance.','mid'],
              ['05','Manual mode was hard to find','No clear path when AI failed. Users and staff were stuck with no obvious next step.','mid'],
            ].map(([num, title, desc, sev]) => (
              <div className="decision" key={num as string}>
                <div className="d-header">
                  <div className="d-n">{num}</div>
                  <div className="d-head">
                    <div className="d-title">{title}</div>
                    <div className="d-tag">Severity: {sev === 'high' ? 'High' : 'Medium'}</div>
                  </div>
                </div>
                <div className="d-inner">
                  <p className="body">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pull sr">&ldquo;Users abandoned checkout. Staff intervened constantly. The system needed more help than it gave.&rdquo;</div>
        </div>
      </div>

      {/* 03 CONTEXT */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">03</div>
          <div className="eyebrow sr">Context &amp; constraints</div>
          <h2 className="h-sec sr">THE CONSTRAINTS <span className="accent">WERE THE BRIEF.</span></h2>
          <p className="body sr d1">Understanding what I couldn&apos;t change shaped every decision I could make.</p>
          <div className="two-col sr d2">
            <div className="card--soft">
              <div className="card-eyebrow">NO DIRECT USER ACCESS</div>
              <p className="body">Users were based in Norway. All insights came through written PO notes and tickets. The PO became my primary proxy — I designed from patterns in feedback, not direct observation.</p>
            </div>
            <div className="card--soft">
              <div className="card-eyebrow">AI / ML LOGIC WAS FIXED</div>
              <p className="body">I couldn&apos;t change how the AI detected items or its confidence thresholds. Failure states were not edge cases — they were core flows.</p>
            </div>
          </div>
          <div className="card--soft sr d3" style={{ marginTop: 16 }}>
            <div className="card-eyebrow">NO EXISTING DESIGN SYSTEM</div>
            <p className="body">v1 had no shared component library. Every screen had drifted independently. I had to establish new patterns while simultaneously redesigning the product.</p>
          </div>
          <div className="pull sr">&ldquo;With direct user access, I would have explored user-driven AI annotation — where users feed the system when it fails them, making it smarter over time. That became a north star for future iterations.&rdquo;</div>
        </div>
      </div>

      {/* 04 RESEARCH */}
      <div className="sec sec--light">
        <div className="inner">
          <div className="ch-wm">04</div>
          <div className="eyebrow sr">Research &amp; define</div>
          <h2 className="h-sec sr">THREE PATTERNS. <span className="accent">ALL POINTED THE SAME WAY.</span></h2>
          <p className="body sr d1">Without direct user access, I built my understanding from PO notes and support tickets, an audit of v1 screens, and a discovery workshop I ran with the cross-functional team.</p>
          <div className="sticky-wall sr d2">
            {[
              ['sticky--y','Confident but wrong','The AI detected items incorrectly with high confidence — and gave users no way out. No correction shortcut. No rescan.','PO notes'],
              ['sticky--p','Scanning sequence confusion','Users didn\'t know whether to place food first or press scan first. This filled the AI pool with unidentified images.','Support tickets'],
              ['sticky--b','No recovery path','When detection failed, no shortcut to correct it — no rescan, no quick edit, no clear route to manual mode.','PO notes · tickets'],
            ].map(([cls, tag, text, who], i) => (
              <div className={`sticky ${cls}`} key={i}>
                <div className="s-tag">{tag}</div>
                <div className="s-text">{text}</div>
                <div className="s-who">{who}</div>
              </div>
            ))}
          </div>
          <div className="two-col sr d3" style={{ marginTop: 32 }}>
            <div className="card">
              <div className="card-eyebrow">PRIMARY USER · EMIL</div>
              <p className="body">Busy office worker. Picks up food quickly between meetings. Low tolerance for friction or confusion. Drove the primary design decisions.</p>
            </div>
            <div className="card--soft">
              <div className="card-eyebrow">SECONDARY USER · INGRID</div>
              <p className="body">Canteen staff. Manages 100+ employees daily. Needs reliable tools. Steps in when the system fails users. Informed fallback and manual mode flows.</p>
            </div>
          </div>
          <div className="pull sr">&ldquo;Trust in AI isn&apos;t built by being right every time — it&apos;s built by handling mistakes well.&rdquo;</div>
        </div>
      </div>

      {/* 05 DECISIONS */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">05</div>
          <div className="eyebrow sr">The decisions</div>
          <h2 className="h-sec sr">FIVE DECISIONS. <span className="accent">ALL FROM THE SAME QUESTION.</span></h2>
          <p className="body sr d1">Every decision came back to one thing: <em>what does the system communicate when it isn&apos;t sure?</em></p>
          <div className="decisions sr d2">

            <div className="decision">
              <div className="d-header">
                <div className="d-n">01</div>
                <div className="d-head">
                  <div className="d-title">Tap to Verify</div>
                  <div className="d-tag">Confidence-based trust calibration · only surface correction when AI is uncertain</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">When the ML team flagged a low confidence score, the temptation was to auto-switch users to manual mode. I rejected this — an abrupt mode switch feels like a failure. Instead: an orange warning on the detected item with a &ldquo;Tap to verify&rdquo; prompt. High-confidence items confirm automatically with no interruption.</p>
                <div className="d-outcome">It preserved user agency. A system failure became a conscious decision moment.</div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">02</div>
                <div className="d-head">
                  <div className="d-title">Fallback states</div>
                  <div className="d-tag">Designing for failure first, not last · every AI state has an explicit UX response</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">In v1, AI failures produced silence. No message, no next step, no guidance. I mapped every possible AI state and designed an explicit response for each — not as afterthoughts, but as first-class flows built into the core interaction model.</p>
                <div className="d-outcome">This is the work users never notice when it&apos;s done well — and can&apos;t stop noticing when it isn&apos;t.</div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">03</div>
                <div className="d-head">
                  <div className="d-title">Weighted product modal</div>
                  <div className="d-tag">Sequential guided flow · one item at a time, connected to live pricing</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">v1 dumped all weighted items into a list with no sequence and no guidance. I replaced it with a modal-driven sequential flow: one item at a time, with a clear physical instruction and a live connection to the order list.</p>
                <div className="d-outcome">Abandonment of weighted products dropped after launch.</div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">04</div>
                <div className="d-head">
                  <div className="d-title">Manual mode</div>
                  <div className="d-tag">Always available — never forced</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">Both a contextual prompt and a persistent trigger — never forced, always available. Smooth to enter, smooth to exit. v1 comparison: hidden with no clear trigger. Redesign: always surfaced at the right moment.</p>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">05</div>
                <div className="d-head">
                  <div className="d-title">Design system</div>
                  <div className="d-tag">Three new patterns on an existing base</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">AI scanning interaction, manual mode flow with microinteraction, and the order list component — documented and adopted by the team in ongoing development.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 06 SOLUTION */}
      <div className="sec sec--process">
        <div className="inner">
          <div className="ch-wm">06</div>
          <div className="eyebrow eyebrow--ghost sr">The end-to-end flow</div>
          <h2 className="h-sec sr"><span className="accent">SIX MOMENTS.</span> ONE GOAL.</h2>
          <p className="body sr d1">The redesigned flow covers six key moments — from the first instruction a user sees to checkout. The system should always have something useful to say, whether the AI is working or not.</p>
        </div>
        <FlowDiagram />
        <div className="inner" style={{ paddingTop: 0 }}>
          <div className="two-col sr">
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Screen 01 · Starting screen</div>
              <p className="body">Clear instruction before any action. Removes scanning sequence confusion — users know to place food first, then press scan.</p>
              <Gallery id="gStartingScreen" />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Screen 02 · AI detection & verification</div>
              <p className="body">Green = high confidence, auto-confirmed. Orange = low confidence, prompts a tap to verify. Colour carries meaning — the user decides, the system doesn&apos;t decide for them.</p>
              <Gallery id="gScanning" />
            </div>
          </div>
          <div className="two-col sr" style={{ marginTop: 32 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Screen 03 · Weighted modal</div>
              <p className="body">One item at a time. A clear physical instruction, sequential guidance, and a live price update directly connected to the order list.</p>
              <Gallery id="gWeightedproductDetected" />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Screen 04 · Manual mode</div>
              <p className="body">Contextual prompt and persistent trigger. Never forced, always one tap away — smooth to enter, smooth to exit.</p>
              <Gallery id="gManualMode" />
            </div>
          </div>
        </div>
      </div>

      {/* 07 OUTCOMES */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">07</div>
          <div className="eyebrow sr">What happened next</div>
          <h2 className="h-sec sr">MVP SHIPPED. <span className="accent">DATA STILL EARLY.</span></h2>
          <p className="body sr d1">The MVP shipped. User data is still early — these outcomes are observational, based on PO feedback and team observation. I&apos;m not claiming metrics I don&apos;t have.</p>
          <p className="body sr d2">The design system built for this project became the foundation for the team&apos;s ongoing development.</p>
        </div>
      </div>
      <div className="sec sec--ink" style={{ marginTop: 0 }}>
        <div className="outcomes">
          {[['Faster','Checkout flow, less interrupted'],['Less','Staff intervention during checkout'],['Adopted','Design system, used in ongoing dev']].map(([val, lbl]) => (
            <div className="outcome" key={lbl as string}>
              <div className="outcome-val">{val}</div>
              <div className="outcome-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 08 REFLECTION */}
      <div className="sec sec--white" ref={lastSecRef}>
        <div className="inner">
          <div className="ch-wm">08</div>
          <div className="eyebrow sr">What I still think about</div>
          <h2 className="h-sec sr">THE WORK <span className="accent">I DIDN&apos;T FINISH.</span></h2>
          <div className="ref-box sr d1">
            <h3>LOOKING BACK</h3>
            <p>I&apos;d push for user-driven AI annotation from the start. The Tap to Verify pattern was good for communicating uncertainty — but it&apos;s still reactive. What I really wanted was a model where users actively feed the AI when it fails them — making the system smarter with every interaction.</p>
            <p>Designing for AI uncertainty taught me to treat every failure state as a design opportunity, not a fallback. Proxy research demands more rigour — working through a PO made me disciplined about finding patterns, not accepting observations at face value.</p>
            <div className="ref-hl">
              <p>&ldquo;Trust in AI is a UX problem. Users don&apos;t distrust AI because it&apos;s imperfect. They distrust it because it doesn&apos;t explain itself. That&apos;s entirely designable.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>

      {/* spacer */}
      <div style={{ height: 120 }} />
    </div>
  )
}
