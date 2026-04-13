'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ── helpers for artefact / decision screen images ── */
const DEC_EXT: Record<string, string> = { 'dec-location': 'jpg' }
function decImg(name: string) { return `/orangenxt/images/${name}.${DEC_EXT[name] ?? 'png'}` }
function sp(name: string) { return `/orangenxt/images/sprint/${encodeURIComponent(name)}.webp` }

/* ── BEFORE slides (single-image, uploaded separately) ── */
const B_SRCS = [
  'before-01','before-02','before-03','before-04','before-05','before-06','before-07',
  'before-08','before-09','before-10','before-11','before-12','before-13','before-14',
]
const B_LBLS = [
  'Walkthrough — Personal Finance','Walkthrough — Wealth Management',
  'Walkthrough — Utility Payments','Walkthrough — 100% Digital',
  'Splash screen','Terms & conditions','Phone — empty','Phone — entering',
  'Phone — valid','OTP — empty','OTP — entering','OTP — valid','Create PIN','Confirm PIN',
]

/* ── AFTER slides — folders = multi-frame prototype screens ── */
// autoAdvanceFrames: { frameIdx: delayMs } — frame auto-advances after delay
// frameAnims: { frameIdx: animClass } — overlay animation shown on that frame
// scrollable + stickyNavH: phone screen scrolls; stickyNavH = menu bar height in px
type Slide = {
  label: string
  frames: string[]
  autoAdvanceFrames?: Record<number, number>
  frameAnims?: Record<number, 'green-scan' | 'orange-curve'>
  scrollable?: boolean
  stickyNavH?: number
}

const B = '/orangenxt/images/'
const AFTER_SLIDES: Slide[] = [
  { label: 'Splash screen',              frames: [`${B}after-01.png`] },
  { label: 'Terms & conditions',         frames: [`${B}after-02/1.svg`,`${B}after-02/2.png`,`${B}after-02/3.png`,`${B}after-02/4.png`] },
  // after-03 (Location permission) — not yet uploaded
  // after-04 (Phone — empty) — not yet uploaded
  { label: 'Phone — entering',           frames: [`${B}after-05/2.png`,`${B}after-05/3.png`] },
  { label: 'Phone — valid',              frames: [`${B}after-06/1.png`,`${B}after-06/2.png`,`${B}after-06/3.png`] },
  { label: 'OTP',                        frames: [`${B}after-07/1.png`,`${B}after-07/2.png`,`${B}after-07/3.png`] },
  { label: 'Set passcode',               frames: [`${B}after-08/1.png`,`${B}after-08/4.png`] },
  { label: 'Confirm passcode',           frames: [`${B}after-09.png`] },
  { label: 'Biometrics setup',           frames: [`${B}after-10.jpg`] },
  { label: 'Before you start',           frames: [`${B}after-11.png`] },
  { label: 'Before you start — detail',  frames: [`${B}after-12.png`,`${B}after-12/1.png`] },
  {
    // frame 2 = "extracting info" state — green scan line, then auto-advance
    label: 'Scan document',
    frames: [`${B}after-13.png`,`${B}after-13/1.png`,`${B}after-13/2.png`,`${B}after-13/3.png`],
    frameAnims:         { 2: 'green-scan' },
    autoAdvanceFrames:  { 2: 3500 },
  },
  { label: 'Choose ID type',             frames: [`${B}after-14.png`] },
  { label: 'Citizenship selected',       frames: [`${B}after-15/1.png`,`${B}after-15/2.png`] },
  { label: 'Scan front',                 frames: [`${B}after-16.png`] },
  {
    // frame 1 = selfie processing state — orange curve, then auto-advance
    label: 'Extracting details',
    frames: [`${B}after-17/after-17.png`,`${B}after-17/1.png`,`${B}after-17/2.png`,`${B}after-17/3.png`],
    frameAnims:         { 1: 'orange-curve' },
    autoAdvanceFrames:  { 1: 3500 },
  },
  { label: 'Preview front',              frames: [`${B}after-18.png`] },
  { label: 'Final preview',              frames: [`${B}after-19.png`] },
  { label: 'Review application',         frames: [`${B}after-20.png`] },
  { label: 'Dashboard',                  frames: [`${B}after-21.png`] },
  // after-22: scrollable dashboard with sticky nav bar
  // stickyNavH: adjust to match the nav bar height in your design (px)
  {
    label: 'Dashboard — full',
    frames: [`${B}after-22.png`],
    scrollable: true,
    stickyNavH: 56,
  },
]

/* ── Before phone (single-image per slide) ── */
function BeforePhone() {
  const [idx, setIdx] = useState(0)
  function nav(dir: number) { setIdx(i => Math.max(0, Math.min(B_SRCS.length - 1, i + dir))) }
  return (
    <div className="ba-col ba-col--b">
      <div className="ba-col-hd"><div className="ba-col-title">BEFORE</div></div>
      <div className="ba-phone">
        <div className="ba-notch" />
        <div className="ba-screen">
          {B_SRCS.map((name, i) => (
            <img key={name} src={`${B}${name}.png`} alt={B_LBLS[i]}
              className={i === idx ? 'active' : ''} loading="lazy" />
          ))}
        </div>
      </div>
      <div className="ba-lbl">{B_LBLS[idx]}</div>
      <div className="ba-ctr">{idx + 1} / {B_SRCS.length}</div>
      <div className="ba-controls">
        <button className="ba-btn ba-btn--nb" onClick={() => nav(-1)} disabled={idx === 0}>← Prev</button>
        <div className="ba-dots">
          {B_SRCS.map((_, i) => (
            <div key={i} className={`ba-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
        <button className="ba-btn ba-btn--nb" onClick={() => nav(1)} disabled={idx === B_SRCS.length - 1}>Next →</button>
      </div>
    </div>
  )
}

/* ── After phone — tap to advance; auto-advances on timed frames ── */
function AfterPhone() {
  const [sIdx, setSIdx] = useState(0)
  const [fIdx, setFIdx] = useState(0)

  const slide = AFTER_SLIDES[sIdx]
  const frames = slide.frames

  /* auto-advance for timed frames (extraction, selfie processing) */
  useEffect(() => {
    const delay = slide.autoAdvanceFrames?.[fIdx]
    if (!delay) return
    const t = setTimeout(() => {
      if (fIdx < frames.length - 1) {
        setFIdx(f => f + 1)
      } else if (sIdx < AFTER_SLIDES.length - 1) {
        setSIdx(s => s + 1)
        setFIdx(0)
      }
    }, delay)
    return () => clearTimeout(t)
  }, [sIdx, fIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  function tapPhone() {
    // don't let manual tap interrupt an auto-advance frame
    if (slide.autoAdvanceFrames?.[fIdx]) return
    if (fIdx < frames.length - 1) {
      setFIdx(f => f + 1)
    } else if (sIdx < AFTER_SLIDES.length - 1) {
      setSIdx(s => s + 1)
      setFIdx(0)
    }
  }

  function goSlide(i: number) { setSIdx(i); setFIdx(0) }

  const anim = slide.frameAnims?.[fIdx]

  /* scrollable phone (after-22 style) */
  const navH = slide.stickyNavH ?? 56
  const screenContent = slide.scrollable ? (
    <div className="ba-screen ba-screen--scroll">
      <div
        className="ba-sticky-nav"
        style={{ backgroundImage: `url(${frames[fIdx]})`, height: navH }}
      />
      <img
        src={frames[fIdx]}
        alt={slide.label}
        className="ba-scroll-img"
        style={{ marginTop: -navH }}
        loading="lazy"
      />
    </div>
  ) : (
    <div className="ba-screen">
      {frames.map((src, i) => (
        <img
          key={`${sIdx}-${i}`}
          src={src}
          alt={`${slide.label} — frame ${i + 1}`}
          className={i === fIdx ? 'active' : ''}
          loading="lazy"
        />
      ))}
      {anim === 'green-scan'    && <div className="anim-green-scan" />}
      {anim === 'orange-curve'  && <div className="anim-orange-curve" />}
    </div>
  )

  return (
    <div className="ba-col ba-col--a">
      <div className="ba-col-hd"><div className="ba-col-title">AFTER</div></div>

      <div className={`ba-phone${slide.scrollable ? '' : ' proto'}`} onClick={slide.scrollable ? undefined : tapPhone}>
        <div className="ba-notch" />
        {screenContent}
      </div>

      <div className="ba-lbl">{slide.label}</div>
      <div className="ba-ctr">{sIdx + 1} / {AFTER_SLIDES.length}</div>

      <div className="ba-controls">
        <button className="ba-btn ba-btn--na" onClick={() => goSlide(Math.max(0, sIdx - 1))} disabled={sIdx === 0}>← Prev</button>
        <div className="ba-dots">
          {AFTER_SLIDES.map((_, i) => (
            <div key={i} className={`ba-dot${i === sIdx ? ' active' : ''}`} onClick={() => goSlide(i)} />
          ))}
        </div>
        <button className="ba-btn ba-btn--na" onClick={() => goSlide(Math.min(AFTER_SLIDES.length - 1, sIdx + 1))} disabled={sIdx === AFTER_SLIDES.length - 1}>Next →</button>
      </div>
    </div>
  )
}

/* ── BeforeAfter wrapper ── */
function BeforeAfter() {
  return (
    <div className="ba-cols">
      <BeforePhone />
      <div className="ba-divider"><div className="ba-vs">VS</div></div>
      <AfterPhone />
    </div>
  )
}

export default function OrangeNXTPage() {
  const [progWidth, setProgWidth] = useState(0)
  const [showBack, setShowBack]   = useState(false)
  const lastSecRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* override body */
    const prev = {
      cursor:     document.body.style.cursor,
      background: document.body.style.background,
      overflow:   document.body.style.overflowX,
    }
    document.body.style.cursor     = 'auto'
    document.body.style.background = '#cee5f5'
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
      <div className="sec sec--hero">
        <div className="inner" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="eyebrow eyebrow--ghost sr">Case Study · OrangeNXT · 2023–2024</div>
          <h1 className="h-display sr d1">FROM CHAOS<br />TO <span style={{ color: 'var(--accent)' }}>CLARITY</span></h1>
          <p className="hero-sub sr d2">Two design systems. No source of truth. A soft launch that exposed everything. This is how a banking app for Nepal&apos;s next generation went from internal chaos to something users could actually trust.</p>
          <div className="stat-row sr d2">
            {[['10','Days to redesign'],['7','Users tested pre-launch'],['2','Years on this product']].map(([val, lbl]) => (
              <div className="stat-pill" key={lbl}>
                <div className="stat-pill-val">{val}</div>
                <div className="stat-pill-lbl">{lbl}</div>
              </div>
            ))}
          </div>
          <div className="meta-row sr d3">
            {[['Role','Lead Product Designer'],['Scope','Onboarding redesign'],['Company','FoneNXT / F1Soft'],['Launch','24 Jan 2024']].map(([k, v]) => (
              <div className="meta-item" key={k}>
                <div className="mlabel">{k}</div>
                <div className="mvalue">{v}</div>
              </div>
            ))}
          </div>
          <div className="hero-wm">NXT</div>
        </div>
      </div>

      {/* 01 SITUATION */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">01</div>
          <div className="eyebrow sr">The situation I walked into</div>
          <div className="two-col">
            <div>
              <h2 className="h-sec sr">I JOINED AFTER THE PRODUCT WAS ALREADY <span className="accent">BUILT.</span></h2>
              <p className="body sr d1">OrangeNXT is a next-gen mobile banking app for Millennials and Gen Z in Nepal — bank from your phone, no branch visit. When I joined Fonenxt as Lead Product Designer, two incomplete design systems ran in parallel. Every screen felt like a different product.</p>
              <p className="body sr d2">I raised the design overhaul multiple times over months — never a flat no, never a yes. Always one feature away from being prioritised. So I kept building. And I kept watching.</p>
              <div className="pull sr d3">&ldquo;I could see what needed to happen. The whole thing needed to be rebuilt from a single foundation.&rdquo;</div>
            </div>
            <div className="sr d2">
              <div className="card">
                <div className="card-eyebrow">MY ROLE</div>
                <div className="role-list">
                  {[
                    ['01','Direct access to CEO & PO','No middle management — decisions at the table'],
                    ['02','Design team of 3','Structured by strength: interaction · illustration · animation'],
                    ['03','End-to-end ownership','Research · system · screens · handoff'],
                    ['04','2 years on this product','From chaos to public launch'],
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

      {/* 02 THE MOMENT */}
      <div className="sec sec--light">
        <div className="inner">
          <div className="ch-wm">02</div>
          <div className="eyebrow sr">The moment everything changed</div>
          <h2 className="h-sec sr">SOFT LAUNCH. REAL USERS. <span className="accent">UNCOMFORTABLE TRUTHS.</span></h2>
          <p className="body sr d1">We soft-launched 15th October. I ran usability testing — 7 participants, structured scenarios. What they showed us was uncomfortable. I brought the data to the CEO and PO. The testing gave us the language to finally act.</p>
          <div className="participants-card sr d1">
            <div className="participants-eyebrow">RESEARCH PARTICIPANTS · 7 USERS · MODERATED SESSIONS</div>
            <div className="participants-grid">
              {['Soniya','Shikha','Reshma','Sandeep','Bigyen','Saugat'].map(name => (
                <div className="participant" key={name}><div className="p-name">{name}</div><div className="p-role">— Add profession —</div></div>
              ))}
              <div className="participant"><div className="p-name">Mahima Suvedi</div><div className="p-role">— Add profession —</div></div>
            </div>
          </div>
          <div className="sticky-wall sr d2">
            {[
              ['sticky--y','Drop-off risk','Multiple users retook their selfie 2+ times. The camera frame was unclear — nobody knew if they were doing it right.','Soniya · Shikha · Reshma'],
              ['sticky--p','Confusion','FATCA and PEP declarations were skipped by almost everyone. Nobody knew what those words meant.','Soniya · Sandeep · Reshma'],
              ['sticky--b','Trust gap','One user photographed the wrong document. Camera guidance wasn\'t clear about what it needed.','Reshma'],
              ['sticky--g','Silent decline','Location permission routinely declined. No one knew why a banking app needed their location.','Shikha · multiple'],
              ['sticky--o','Form aversion','"I don\'t like filling forms." Cards felt less intimidating — familiar, less like paperwork.','Bigyen · multiple'],
              ['sticky--y','OCR win','Auto-extraction positively received. "Felt like a real banking system" — trustworthy.','Saugat'],
            ].map(([cls, tag, text, who], i) => (
              <div className={`sticky ${cls}`} key={i} style={i === 4 ? { transform: 'rotate(1.5deg)' } : i === 5 ? { transform: 'rotate(-2deg)' } : undefined}>
                <div className="s-tag">{tag}</div>
                <div className="s-text">{text}</div>
                <div className="s-who">{who}</div>
              </div>
            ))}
          </div>
          <div className="pull sr">&ldquo;Information was not disseminated properly — I didn&apos;t know what was expected of me.&rdquo;</div>
        </div>
      </div>

      {/* 03 THE INSIGHT */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">03</div>
          <div className="eyebrow sr">What we assumed vs what we found</div>
          <div className="two-col">
            <div>
              <h2 className="h-sec sr">WE THOUGHT IT WAS A VISUAL PROBLEM. <span className="accent">IT WAS A TRUST PROBLEM.</span></h2>
              <p className="body sr d1">Before testing, the assumption was inconsistent UI — fix the design system, fix the app. The testing reframed everything. What was killing users was silence. Every sensitive request arrived without explanation. For a banking app, silence reads as suspicious.</p>
              <div className="pull sr d2">&ldquo;You can&apos;t fix trust with components.&rdquo;</div>
            </div>
            <div className="sr d2">
              <div className="card--soft">
                <div className="card-eyebrow">NORTH STAR</div>
                <div className="ns-title">ANSWER THE QUESTION BEFORE YOU ASK ONE.</div>
                <div className="ns-body">Every screen had to answer the question the user was already asking — before asking anything of them.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 04 THE SPRINT */}
      <div className="sec sec--process">
        <div className="inner">
          <div className="ch-wm">04</div>
          <div className="eyebrow eyebrow--ghost sr">The sprint</div>
          <h2 className="h-sec sr"><span className="accent">TEN DAYS.</span> EVERY DECISION COUNTED.</h2>
          <p className="body sr d1">My window for onboarding was roughly 10 days before handoff to development. We started with the design system, not screens — one system, one source of truth, one tone of voice. I structured the team around strengths: interaction, illustration &amp; microanimations, sequential phases.</p>
          <p className="body sr d2">The moment we nearly lost the most time was the dashboard. All four of us had ideas and started building simultaneously. Divergence has a time limit in a sprint.</p>
        </div>
        <div className="artefacts">

          <div className="artefact artefact--wide">
            <img src={sp('Sprint Workshop - User Story Mapping with the Team')} alt="Sprint Workshop" />
            <div className="art-overlay">
              <div className="art-tag">Sprint Workshop · User story mapping</div>
              <div className="art-caption">The team mapped out user stories together — where users got confused, what assumptions we were carrying, what needed to change.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Sprint Planning - Onboarding UX Calls (MPIN, Biometrics, Permissions)')} alt="Sprint Planning — Onboarding UX Calls" />
            <div className="art-overlay">
              <div className="art-tag">Sprint Planning · Onboarding UX calls</div>
              <div className="art-caption">MPIN, biometrics, permissions — every sensitive request mapped before a single screen was drawn.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Sprint Planning - KYC Screen Breakdown with Fallback States')} alt="Sprint Planning — KYC Breakdown" />
            <div className="art-overlay">
              <div className="art-tag">Sprint Planning · KYC screen breakdown</div>
              <div className="art-caption">Fallback states, error messages, edge cases. Not just the happy path — every exception had to be designed for.</div>
            </div>
          </div>

          <div className="artefact artefact--wide">
            <img src={sp('Sprint Planning - Mapping the Full UX Flow (Onboarding to Products)')} alt="Sprint Planning — Full UX Flow" />
            <div className="art-overlay">
              <div className="art-tag">Sprint Planning · Full UX flow</div>
              <div className="art-caption">Onboarding to Products — the full user journey charted in one session. This is where the scope became real.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Team Board - Shipped, WIP and Review Tracker')} alt="Team Board — Kanban" />
            <div className="art-overlay">
              <div className="art-tag">Team Board · Kanban snapshot</div>
              <div className="art-caption">Shipped, WIP, In Review. Every screen tracked as a card. No ambiguity about what was done.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Team Board - Updated with Moodboard and Prototype Link')} alt="Team Board — Updated" />
            <div className="art-overlay">
              <div className="art-tag">Team Board · Moodboard + prototype added</div>
              <div className="art-caption">Visual direction and prototype link added so engineering could reference the interaction model directly from the board.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Problem Statement - Why Users Get Lost in the KYC Flow')} alt="Problem Statement" />
            <div className="art-overlay">
              <div className="art-tag">Problem framing · Why users got lost</div>
              <div className="art-caption">The root cause wasn&apos;t visual — it was a trust and communication problem. This framing changed everything.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Paper Sketch - KYC Document Selection and Overview Screen')} alt="Paper Sketch" />
            <div className="art-overlay">
              <div className="art-tag">Paper sketch · KYC document step</div>
              <div className="art-caption">Quick wireframes for document selection and overview. Cheap enough to throw away, clear enough to align the team.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Whiteboard Sketch - OCR Form Design (Personal and Document Info)')} alt="Whiteboard — OCR Form" />
            <div className="art-overlay">
              <div className="art-tag">Whiteboard · OCR form layout</div>
              <div className="art-caption">Personal info and document info as separate cards. The layout engineering pushed back on — evidence won.</div>
            </div>
          </div>

          <div className="artefact">
            <img src={sp('Whiteboard Sketch - OCR Fallback Flow and Bottom Sheet')} alt="Whiteboard — OCR Fallback" />
            <div className="art-overlay">
              <div className="art-tag">Whiteboard · OCR fallback flow</div>
              <div className="art-caption">What happens when OCR fails? Bottom sheet, manual entry, fallback states — all mapped before a pixel was pushed.</div>
            </div>
          </div>

          <div className="artefact artefact--wide">
            <img src={sp('Whiteboard Sketch - Home Dashboard Layout and Navigation')} alt="Whiteboard — Home Dashboard" />
            <div className="art-overlay">
              <div className="art-tag">Whiteboard · Home dashboard navigation</div>
              <div className="art-caption">The dashboard navigation sketch — where all four of us started building simultaneously and nearly lost the most time diverging.</div>
            </div>
          </div>

        </div>
      </div>

      {/* 05 DECISIONS */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">05</div>
          <div className="eyebrow sr">The decisions — and the fights</div>
          <h2 className="h-sec sr">FIVE DECISIONS. <span className="accent">NONE OF THEM EASY.</span></h2>
          <p className="body sr d1">Each traces back to something a user showed us — and each involved real friction with engineering or the product team.</p>
          <div className="decisions sr d2">

            <div className="decision">
              <div className="d-header"><div className="d-n">01</div><div className="d-head"><div className="d-title">The overlay vs the full screen</div><div className="d-tag">Research: highest drop-off · users arrived unprepared</div></div></div>
              <div className="d-inner">
                <div className="d-layout">
                  <div className="d-text">
                    <p className="body">The product team wanted an overlay on the camera screen. My argument: an overlay competes with the camera UI, gets dismissed quickly, and doesn&apos;t give the message space to land.</p>
                    <p className="body">We pushed for a dedicated full screen — &ldquo;Before you start&rdquo; with three clear requirements. Simple, scannable, impossible to miss.</p>
                    <div className="d-outcome">It added one screen. It removed the single biggest drop-off point.</div>
                  </div>
                  <div className="d-screens">
                    <div className="d-phone"><img src={`${B}after-11.png`} alt="Before you start" /></div>
                    <div className="d-ann">Full screen — not an overlay. User confirms before the camera opens.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header"><div className="d-n">02</div><div className="d-head"><div className="d-title">The permission nobody had questioned</div><div className="d-tag">Research: location routinely declined · selfie anxiety</div></div></div>
              <div className="d-inner">
                <div className="d-layout">
                  <div className="d-text">
                    <p className="body">Location permission was declined by almost everyone — no one explained why the app needed it. We added an explainer before every sensitive request: location, selfie, document. Same principle, applied consistently.</p>
                    <div className="d-outcome">Never ask for something sensitive without earning the right to ask.</div>
                  </div>
                  <div className="d-screens">
                    <div className="d-pair">
                      <div className="d-phone-sm"><img src={`${B}after-10.jpg`} alt="Location explainer" /></div>
                      <div className="d-phone-sm"><img src={`${B}after-16.png`} alt="Selfie explainer" /></div>
                    </div>
                    <div className="d-labels"><div className="d-label">Location — why</div><div className="d-label">Selfie — why</div></div>
                    <div className="d-ann">Explain before you ask. Applied to every sensitive request.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header"><div className="d-n">03</div><div className="d-head"><div className="d-title">The form nobody wanted to fill</div><div className="d-tag">Research: form aversion · engineering pushed back hard</div></div></div>
              <div className="d-inner">
                <div className="d-layout">
                  <div className="d-text">
                    <p className="body">Engineering pushed back on card layout — API dependencies made it complex. We tested with new interns who had zero prior exposure. Majority preferred cards — not because they looked better, because they felt less like paperwork.</p>
                    <p className="body">Evidence ended the argument.</p>
                    <div className="d-outcome">Evidence ends arguments that opinions never can.</div>
                  </div>
                  <div className="d-screens">
                    <div className="d-phone"><img src={`${B}after-15/2.png`} alt="Review application" /></div>
                    <div className="d-ann">Card sections — personal + document info, each independently editable. OCR auto-fills.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header"><div className="d-n">04</div><div className="d-head"><div className="d-title">The forced step that was already there</div><div className="d-tag">Inherited: mandatory biometrics · no skip option</div></div></div>
              <div className="d-inner">
                <div className="d-layout">
                  <div className="d-text">
                    <p className="body">Inherited mandatory FaceID with no skip. Three changes: added &ldquo;I&apos;ll do it later&rdquo;, reframed as a benefit not a requirement, added a microanimation to make it feel human rather than clinical.</p>
                    <div className="d-outcome">Sometimes the most important design skill is letting evidence do the talking.</div>
                  </div>
                  <div className="d-screens">
                    <div className="d-phone"><img src={`${B}after-08/1.png`} alt="Biometrics setup" /></div>
                    <div className="d-ann">&ldquo;Easy login&rdquo; framing. Microanimation. &ldquo;I&apos;ll do it later&rdquo; — the skip that didn&apos;t exist.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header"><div className="d-n">05</div><div className="d-head"><div className="d-title">The compliance constraint we designed around</div><div className="d-tag">Research: users felt deceived discovering limits after signup</div></div></div>
              <div className="d-inner">
                <div className="d-layout">
                  <div className="d-text">
                    <p className="body">NPR 5,000 temporary limit until verification. The previous design hid this — users discovered it after finishing onboarding. A constraint discovered by accident is a betrayal.</p>
                    <p className="body">We showed the limit immediately after account creation, then added a &ldquo;60% completed&rdquo; dashboard nudge to keep momentum. Borrowed from gaming, applied to banking.</p>
                    <div className="d-outcome">Transparency at the right moment builds more trust than silence ever could.</div>
                  </div>
                  <div className="d-screens">
                    <div className="d-pair">
                      <div className="d-phone-sm"><img src={`${B}after-21.png`} alt="Profile completed — limit shown" /></div>
                      <div className="d-phone-sm"><img src={`${B}after-22.png`} alt="Dashboard — you are almost done nudge" style={{ objectPosition: 'top' }} /></div>
                    </div>
                    <div className="d-labels"><div className="d-label">Limit shown</div><div className="d-label">You&apos;re almost done</div></div>
                    <div className="d-ann">Onboarding doesn&apos;t end at signup. It continues on the dashboard.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <div className="sec sec--light">
        <div className="inner inner--sm" style={{ paddingBottom: 8 }}>
          <div className="ch-wm">05b</div>
          <div className="eyebrow sr">Before &amp; after — explore both flows</div>
          <h2 className="h-sec sr">TWO FLOWS. <span className="accent">NAVIGATE EACH INDEPENDENTLY.</span></h2>
          <p className="body sr d1">The old flow had 14 screens including 4 generic walkthrough slides before signup. The redesign has 30 screens, each earning its place.</p>
        </div>
        <BeforeAfter />
        <div className="ba-insights">
          <div className="ba-insight ba-insight--b">
            <div className="ba-insight-lbl">WHAT WAS WRONG</div>
            <p>4 generic walkthrough slides before signup. No brand, no trust. Users arrived at every sensitive step cold — no context, no explanation.</p>
          </div>
          <div className="ba-insight ba-insight--a">
            <div className="ba-insight-lbl">WHAT CHANGED</div>
            <p>Every sensitive request explained before asking. &ldquo;Before you start&rdquo; eliminates the biggest drop-off. Trust built screen by screen, not assumed.</p>
          </div>
        </div>
      </div>

      {/* 06 OUTCOMES */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">06</div>
          <div className="eyebrow sr">What happened next</div>
          <h2 className="h-sec sr">ONBOARDING <span className="accent">DONE RIGHT.</span></h2>
          <p className="body sr d1">We didn&apos;t have clean before metrics — the soft launch was the first time real users touched the product at scale. Our baseline was observation: users abandoning mid-flow, photographing wrong documents, hesitating at every sensitive request.</p>
          <p className="body sr d2">The NPR 2 crore transaction target wasn&apos;t hit in the first month — onboarding conversion alone doesn&apos;t guarantee transaction behaviour. But 960 monthly users was cited by the CEO at a company town hall. The redesign did what it was scoped to do.</p>
          <p className="body sr d3">The design system built for this project became the foundation for the entire OrangeNXT product.</p>
        </div>
      </div>
      <div className="sec sec--ink" style={{ marginTop: 0 }}>
        <div className="outcomes">
          {[['3,084','Users onboarded soft → public launch'],['76%','Monthly conversion rate'],['960','New users / month, growing']].map(([val, lbl]) => (
            <div className="outcome" key={lbl as string}>
              <div className="outcome-val">{val}</div>
              <div className="outcome-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 07 REFLECTION */}
      <div className="sec sec--white" ref={lastSecRef}>
        <div className="inner">
          <div className="ch-wm">07</div>
          <div className="eyebrow sr">What I still think about</div>
          <h2 className="h-sec sr">THE WORK <span className="accent">I DIDN&apos;T FINISH.</span></h2>
          <div className="ref-box sr d1">
            <h3>LOOKING BACK</h3>
            <p>This project taught me that the hardest design problems in fintech aren&apos;t the UI ones — they&apos;re the trust ones. Every screen where a user hesitated wasn&apos;t a layout problem. It was a communication problem.</p>
            <p>If I were starting over, I&apos;d push harder on the FATCA and PEP declarations. We improved the framing but didn&apos;t go far enough. The right solution was to replace legal jargon with plain language entirely.</p>
            <p>I&apos;d also advocate for a progress indicator across the full onboarding flow — not just the post-signup dashboard. Users in testing often didn&apos;t know how far they were from completion.</p>
            <div className="ref-hl">
              <p>&ldquo;The design still isn&apos;t accessible to everyone — not for users with visual or hearing impairments, or people in remote Nepal who can&apos;t read or write. A banking app that claims to democratise finance but only works for the literate and able-bodied hasn&apos;t fully solved the problem. That&apos;s the next version of this work.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>

      {/* spacer so back button doesn't overlap */}
      <div style={{ height: 120 }} />
    </div>
  )
}
