'use client'
import { useEffect } from 'react'
import Image from 'next/image'

interface Props { open: boolean; onClose: () => void }

export default function CaseStudyOrangeNXTOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const el = document.getElementById('cs1-panel')
    if (el) el.scrollTop = 0
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div id="cs1-overlay" className={`cs-ov${open ? ' open' : ''}`}>
      <div id="cs1-panel" className="cs-panel">
        <div className="cs-hero dark-h" style={{ background: '#0f0c1a' }}>
          <div className="cs-hero-wm" style={{ color: 'rgba(255,255,255,0.04)' }}>ORANGE</div>
          <button className="cs-close" onClick={onClose}>✕</button>
          <div className="cs-eyebrow">CASE_STUDY · 02</div>
          <h1 className="cs-ht">Onboarding that<br /><em>actually converts.</em></h1>
          <p className="cs-hook">OrangeNXT had a trust problem — not a usability one. After soft launch, testing revealed users weren&apos;t confused. They were afraid. We had 10 days to fix it before public launch. Now 76% of users make it all the way through.</p>
          <div className="cs-meta-row">
            <div className="cs-mi"><div className="cs-ml">Company</div><div className="cs-mv">FoneNXT / F1Soft Group</div></div>
            <div className="cs-mi"><div className="cs-ml">Role</div><div className="cs-mv">Lead Product Designer</div></div>
            <div className="cs-mi"><div className="cs-ml">Industry</div><div className="cs-mv">Fintech · Mobile</div></div>
            <div className="cs-mi"><div className="cs-ml">Year</div><div className="cs-mv">2023</div></div>
          </div>
        </div>
        <div className="cs-metrics">
          <div className="cs-m"><div className="cs-mv2">76%</div><div className="cs-ml2">Onboarding conversion</div></div>
          <div className="cs-m"><div className="cs-mv2">−36%</div><div className="cs-ml2">Drop-off reduced</div></div>
          <div className="cs-m"><div className="cs-mv2">10</div><div className="cs-ml2">Days to ship the redesign</div></div>
        </div>
        <div className="cs-body">
          <div className="cs-sec">
            <div className="cs-sn">01 · CONTEXT &amp; ROLE</div>
            <h2 className="cs-st">A fintech app in a trust-first market.</h2>
            <p className="cs-p">OrangeNXT is a mobile banking and digital wallet product by FoneNXT — part of F1Soft Group, one of Nepal&apos;s leading fintech companies. The product competes in a market where users are cautious about digital financial services, making first impressions critical.</p>
            <p className="cs-p">I owned the onboarding flow end-to-end — leading a design team of 4, including myself, from research through every screen to engineering handoff. Two years on this product, from a fragmented foundation to a public launch.</p>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">02 · THE PROBLEM</div>
            <h2 className="cs-st">60% of users never made it through the front door.</h2>
            <p className="cs-p">Analytics showed a steep drop-off cliff in the first few minutes of the app experience. Users were installing OrangeNXT, starting onboarding, and leaving — before they ever saw what the product could do for them.</p>
            <div className="cs-phases">
              {[
                ['ST.01', 'Install → Open', 'Users opened the app but abandoned before completing sign-up'],
                ['ST.02', 'KYC friction', 'Identity verification felt invasive without explanation of why'],
                ['ST.03', 'Form fatigue', 'Too many fields, too early, with no sense of progress'],
                ['ST.04', 'Trust gap', 'No reassurance that their data and money would be safe'],
              ].map(([n, t, s]) => (
                <div key={n} className="cs-phase">
                  <div className="cs-ph-n">{n}</div>
                  <div className="cs-ph-t">{t}</div>
                  <div className="cs-ph-s">{s}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 12 }}>BEFORE — Original screens</div>
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12, scrollSnapType: 'x mandatory' }}
                className="cs-screen-strip">
                {Array.from({ length: 28 }, (_, i) => {
                  const n = String(i + 1).padStart(2, '0')
                  return (
                    <div key={n} style={{ flexShrink: 0, scrollSnapAlign: 'start', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--paper-3)', background: 'var(--paper-2)', width: 140 }}>
                      <Image
                        src={`/orangenxt/images/before-${n}.png`}
                        alt={`Before screen ${n}`}
                        width={140}
                        height={280}
                        style={{ display: 'block', width: 140, height: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">03 · RESEARCH</div>
            <h2 className="cs-st">Where users said stop — and why.</h2>
            <p className="cs-p">We ran <strong>moderated usability tests</strong> with 7 participants post soft-launch, plus drop-off funnel analysis across 3 months of session data. The pattern was consistent: users didn&apos;t leave because the flow was confusing — they left because nothing made them feel safe.</p>
            <div className="cs-pain-grid">
              {[
                ['📋 Wall of permissions', 'The app asked for camera, contacts, and location access on launch — before establishing any trust.'],
                ['🆔 KYC with no context', 'Users were asked to upload their citizenship ID with no explanation of how it would be used or stored.'],
                ['⏳ No progress signal', 'A 23-step onboarding with no step counter felt endless. Users couldn\'t estimate how long it would take.'],
                ['🔒 Safety skepticism', 'First-time digital wallet users actively worried about fraud — and found no reassurance in the flow.'],
              ].map(([t, b]) => (
                <div key={t} className="cs-pc"><div className="cs-pc-t">{t}</div><div className="cs-pc-b">{b}</div></div>
              ))}
            </div>
            <div className="cs-2col" style={{ marginTop: 12 }}>
              <div className="cs-sc"><div className="cs-sc-t">✓ Value-first framing works</div><div className="cs-sc-b">Showing the app dashboard before asking for documents increased willingness to complete KYC by 2×.</div></div>
              <div className="cs-sc"><div className="cs-sc-t">✓ Progress visibility is non-negotiable</div><div className="cs-sc-b">A visible step indicator reduced perceived effort and drop-off on the KYC section significantly.</div></div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">04 · KEY DESIGN DECISIONS</div>
            <h2 className="cs-st">Five decisions that rebuilt trust.</h2>
            <div className="cs-decisions">
              {[
                ['1', 'Value before friction', 'Show users a preview of the app before asking for documents — earn the right to ask for sensitive information.'],
                ['2', 'Explain every permission', 'Each permission request includes a one-line plain-language reason. "We need your camera to scan your ID" — not a generic system prompt.'],
                ['3', 'Step counter on every screen', 'A persistent "Step 4 of 9" indicator across the KYC flow removed uncertainty about how long it would take.'],
                ['4', 'Chunked form architecture', 'Broke the original single long form into thematic groups with clear section headers — same information, far less cognitive load.'],
                ['5', 'Trust anchors at friction points', 'Added security badges, data usage explanations, and "Why we need this" tooltips at every high-friction step.'],
              ].map(([n, t, b]) => (
                <div key={n} className="cs-d">
                  <div className="cs-dn">{n}</div>
                  <div><div className="cs-dt">{t}</div><div className="cs-db">{b}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">05 · FINAL DESIGNS</div>
            <h2 className="cs-st">One coherent flow.</h2>
            <p className="cs-p">The redesigned onboarding guides users from curiosity to confidence — a progressive sequence that builds trust before asking for commitment. Every screen earns the next one.</p>
            <div className="cs-ph-block">
              <div style={{ fontSize: 26, marginBottom: 10 }}>📱</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 300 }}>Add your Figma screens or screenshots here</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, opacity: .5 }}>Welcome · value preview · permissions · KYC flow · identity verification · success state</div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">06 · OUTCOMES</div>
            <h2 className="cs-st">From 40% to 76% — in one redesign cycle.</h2>
            <div className="cs-outcomes">
              <div className="cs-oc"><div className="cs-ov3">3,084</div><div className="cs-ol">Users onboarded at launch</div></div>
              <div className="cs-oc"><div className="cs-ov3">960</div><div className="cs-ol">New users / month, growing</div></div>
              <div className="cs-oc"><div className="cs-ov3">1</div><div className="cs-ol">Design system — shipped and adopted</div></div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">07 · REFLECTION</div>
            <h2 className="cs-st">What I&apos;d do differently.</h2>
            <p className="cs-p">We improved the FATCA and PEP declarations but didn&apos;t go far enough — the right fix was replacing legal jargon with plain language entirely. I&apos;d also push harder for a progress indicator across the full flow, not just the post-signup dashboard. Users in testing often didn&apos;t know how close they were to finishing.</p>
            <p className="cs-p">The less obvious lesson: I spent months building the case for this work before getting a window to act. The advocacy — showing data, staying patient, making the argument without the authority to force it — mattered as much as the design itself.</p>
            <div className="cs-quote">&ldquo;The product still doesn&apos;t serve everyone — not users with accessibility needs, or people in remote Nepal who can&apos;t read. A banking app that claims to democratise finance but only works for the literate and able-bodied hasn&apos;t solved the real problem. That&apos;s the next version of this work.&rdquo;</div>
          </div>
        </div>
      </div>
    </div>
  )
}
