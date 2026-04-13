'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function TimePage() {
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
          <div className="eyebrow eyebrow--ghost sr">Case Study · TIME.com · 2024</div>
          <h1 className="h-display sr d1">AI THAT ACTUALLY<br /><span style={{ color: 'var(--onxt-accent)' }}>HELPS.</span></h1>
          <p className="hero-sub sr d2">TIME.com needed a way to surface relevant content without feeling intrusive or algorithmically cold. This is the story of designing a conversational AI assistant that felt like a knowledgeable colleague, not a search engine.</p>
          <div className="stat-row sr d2">
            {[['+40%','Content engagement'],['3.2×','Session depth'],['12','Patterns tested']].map(([val, lbl]) => (
              <div className="stat-pill" key={lbl}>
                <div className="stat-pill-val">{val}</div>
                <div className="stat-pill-lbl">{lbl}</div>
              </div>
            ))}
          </div>
          <div className="meta-row sr d3">
            {[['Role','Product Designer'],['Company','TIME · Fusemachines'],['Industry','Media · AI'],['Year','2024']].map(([k, v]) => (
              <div className="meta-item" key={k}>
                <div className="mlabel">{k}</div>
                <div className="mvalue">{v}</div>
              </div>
            ))}
          </div>
          <div className="hero-wm">TIME</div>
        </div>
      </div>

      {/* 01 CONTEXT */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">01</div>
          <div className="eyebrow sr">Context &amp; role</div>
          <div className="two-col">
            <div>
              <h2 className="h-sec sr">TIME IN THE <span className="accent">AGE OF AI.</span></h2>
              <p className="body sr d1">TIME is one of the world&apos;s most recognisable news brands — a century of journalism now navigating a media landscape transformed by artificial intelligence. The challenge wasn&apos;t whether to incorporate AI, but how to do it in a way that felt true to TIME&apos;s editorial voice.</p>
              <p className="body sr d2">I joined as <strong>Product Designer</strong> to own the UX of a new AI-powered content assistant — from initial concept through to shipped product.</p>
              <div className="pull sr d3">&ldquo;The question wasn&apos;t whether to use AI. It was how to make it feel like it belonged.&rdquo;</div>
            </div>
            <div className="sr d2">
              <div className="card">
                <div className="card-eyebrow">MY ROLE</div>
                <div className="role-list">
                  {[
                    ['01','End-to-end UX ownership','Concept → shipped product'],
                    ['02','Conversational AI design','Chat interface + content surfacing'],
                    ['03','Editorial alignment','Tone, voice, attribution patterns'],
                    ['04','Mobile-first','Context-aware, never intrusive'],
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
          <h2 className="h-sec sr">READERS WERE LEAVING BEFORE <span className="accent">THEY FOUND WHAT THEY NEEDED.</span></h2>
          <p className="body sr d1">TIME&apos;s archive spans decades. The depth is extraordinary — but discoverability was broken. Readers would land on an article, find it wasn&apos;t quite right, and leave. The recommendation engine surfaced popular, not relevant.</p>
          <div className="participants-card sr d2">
            <div className="participants-eyebrow">FOUR CHALLENGE AREAS IDENTIFIED</div>
            <div className="participants-grid">
              {[['Discovery','Finding the right article'],['Context','Understanding historical events'],['Depth','Going deeper on a topic'],['Trust','Knowing content is authoritative']].map(([t, s]) => (
                <div className="participant" key={t}>
                  <div className="p-name">{t}</div>
                  <div className="p-role">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 03 RESEARCH */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">03</div>
          <div className="eyebrow sr">What readers actually want from AI</div>
          <div className="two-col">
            <div>
              <h2 className="h-sec sr">THEY TRUSTED THE JOURNALISM. <span className="accent">NOT THE ALGORITHM.</span></h2>
              <p className="body sr d1">Through user interviews and session analysis, one pattern was clear: readers trusted TIME&apos;s journalism but didn&apos;t trust algorithmic recommendations. They wanted curation with editorial judgment, not popularity signals.</p>
              <div className="pull sr d2">&ldquo;You can&apos;t fix trust with a better recommendation model.&rdquo;</div>
            </div>
            <div className="sr d2">
              <div className="card--soft">
                <div className="card-eyebrow">NORTH STAR</div>
                <div className="ns-title">FEEL LIKE A KNOWLEDGEABLE COLLEAGUE, NOT A SEARCH ENGINE.</div>
                <div className="ns-body">The assistant needed to carry TIME&apos;s editorial voice — not the voice of an AI system trying to sound helpful.</div>
              </div>
            </div>
          </div>
          <div className="sticky-wall sr d3">
            {[
              ['sticky--y','Over-reliance on recency','Algorithm favoured new over pertinent. Older relevant content was invisible.','Session analysis'],
              ['sticky--p','AI skepticism','Users worried AI-generated content would dilute editorial standards.','User interviews'],
              ['sticky--b','Search as fallback','Internal search was a last resort, not a discovery tool.','Session data'],
              ['sticky--o','Mobile context loss','On mobile, context between articles was completely lost.','Session analysis'],
            ].map(([cls, tag, text, who], i) => (
              <div className={`sticky ${cls}`} key={i}>
                <div className="s-tag">{tag}</div>
                <div className="s-text">{text}</div>
                <div className="s-who">{who}</div>
              </div>
            ))}
          </div>
          <div className="two-col sr" style={{ marginTop: 32 }}>
            <div className="card--soft">
              <div className="card-eyebrow">✓ CONVERSATIONAL COMFORT</div>
              <p className="body">Users preferred asking questions over keyword search — felt more natural and lower stakes.</p>
            </div>
            <div className="card--soft">
              <div className="card-eyebrow">✓ SOURCE ATTRIBUTION</div>
              <p className="body">Showing the source article increased trust in AI-surfaced content significantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 04 DECISIONS */}
      <div className="sec sec--light">
        <div className="inner">
          <div className="ch-wm">04</div>
          <div className="eyebrow sr">The decisions</div>
          <h2 className="h-sec sr">FIVE DECISIONS. <span className="accent">ALL ABOUT TRUST.</span></h2>
          <p className="body sr d1">Every design decision traced back to the same problem: an AI assistant at a journalism institution needs to earn the user&apos;s trust before it earns their attention.</p>
          <div className="decisions sr d2">

            <div className="decision">
              <div className="d-header">
                <div className="d-n">01</div>
                <div className="d-head">
                  <div className="d-title">Conversational interface over search box</div>
                  <div className="d-tag">Research: users asked more nuanced questions in chat form</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">A chat-like input felt lower stakes and more exploratory — users asked more nuanced questions. Search boxes create pressure to be precise. Conversation doesn&apos;t.</p>
                <div className="d-outcome">Users asked more questions and found more content.</div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">02</div>
                <div className="d-head">
                  <div className="d-title">Always-visible source attribution</div>
                  <div className="d-tag">Research: attribution increased trust significantly</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">Every AI response links directly to the source article. No response exists without evidence. This wasn&apos;t a UX detail — it was the product&apos;s core trust mechanism.</p>
                <div className="d-outcome">Transparency is the feature. The AI is the delivery mechanism.</div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">03</div>
                <div className="d-head">
                  <div className="d-title">Contextual activation</div>
                  <div className="d-tag">Lower friction entry — assistant appears in-context on article pages</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">The assistant appears in-context on article pages, not as a separate tool. It already knows what you&apos;re reading. This dramatically reduced the activation cost — users didn&apos;t need to switch context.</p>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">04</div>
                <div className="d-head">
                  <div className="d-title">Editorial tone guidelines</div>
                  <div className="d-tag">AI responses written in TIME&apos;s voice — not corporate AI-speak</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">We wrote detailed tone guidelines for AI response generation — not just content quality guidelines, but voice and register. The assistant needed to sound like it belonged on TIME.com.</p>
                <div className="d-outcome">The best AI feature is one the user forgets is AI.</div>
              </div>
            </div>

            <div className="decision">
              <div className="d-header">
                <div className="d-n">05</div>
                <div className="d-head">
                  <div className="d-title">Progressive disclosure</div>
                  <div className="d-tag">Simple answers with expandable depth — readers choose how far to go</div>
                </div>
              </div>
              <div className="d-inner">
                <p className="body">Short answers first, detail on request. This matched how readers actually consume journalism — scanning before diving in. Depth as a choice, not a wall.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 05 FINAL DESIGNS */}
      <div className="sec sec--process">
        <div className="inner">
          <div className="ch-wm">05</div>
          <div className="eyebrow eyebrow--ghost sr">Final designs</div>
          <h2 className="h-sec sr">A READING COMPANION. <span className="accent">NOT A CHATBOT.</span></h2>
          <p className="body sr d1">The final design sits at the edge of every article — always available, never intrusive. It knows what you&apos;re reading and can answer questions about it, find related content, or provide historical context.</p>
        </div>
        <div className="artefacts">
          <div className="artefact artefact--wide">
            <div style={{ background: 'var(--dark-bg)', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 280 }}>
              <div style={{ fontSize: 32 }}>💬</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, fontFamily: 'var(--font-dm-sans)', letterSpacing: 1, textAlign: 'center' }}>Add your Figma screens or screenshots here</div>
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, fontFamily: 'var(--font-dm-sans)', textAlign: 'center' }}>Chat interface · article sidebar · mobile drawer · source cards</div>
            </div>
            <div className="art-overlay">
              <div className="art-tag">Final designs · Chat interface + source attribution</div>
              <div className="art-caption">Always available, never intrusive. Contextual, not generic.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 06 OUTCOMES */}
      <div className="sec sec--white">
        <div className="inner">
          <div className="ch-wm">06</div>
          <div className="eyebrow sr">What happened next</div>
          <h2 className="h-sec sr">READERS STAYED LONGER <span className="accent">AND WENT DEEPER.</span></h2>
          <p className="body sr d1">The design system built for this project established the patterns for how TIME surfaces AI-generated content across the platform.</p>
        </div>
      </div>
      <div className="sec sec--ink" style={{ marginTop: 0 }}>
        <div className="outcomes">
          {[['+40%','Content engagement'],['3.2×','Session depth increase'],['12','Interaction patterns tested']].map(([val, lbl]) => (
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
          <div className="eyebrow sr">AI design is trust design</div>
          <h2 className="h-sec sr">THE WORK <span className="accent">THAT ACTUALLY MATTERED.</span></h2>
          <div className="ref-box sr d1">
            <h3>LOOKING BACK</h3>
            <p>The most important lesson: AI features live or die by the trust you build around them. The underlying model could be excellent — but if users don&apos;t trust it, they won&apos;t use it.</p>
            <p>Every design decision we made — attribution, tone, contextual activation — was fundamentally about building trust with a skeptical audience. The technology was table stakes. The trust was the product.</p>
            <div className="ref-hl">
              <p>&ldquo;The best AI feature is one the user forgets is AI — they just think it&apos;s a really good product. That&apos;s the bar. Every pattern we designed either clears that bar or doesn&apos;t.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>

      {/* spacer */}
      <div style={{ height: 120 }} />
    </div>
  )
}
