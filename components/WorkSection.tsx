'use client'
import { useState, useEffect } from 'react'

function ArrowSvg() {
  return (
    <svg width="32" height="32" viewBox="0 0 44 36" fill="currentColor" shapeRendering="crispEdges">
      <rect x="0"  y="16" width="44" height="4"/>
      <rect x="26" y="1"  width="4"  height="4"/>
      <rect x="31" y="6"  width="4"  height="4"/>
      <rect x="36" y="11" width="4"  height="4"/>
      <rect x="36" y="21" width="4"  height="4"/>
      <rect x="31" y="26" width="4"  height="4"/>
      <rect x="26" y="31" width="4"  height="4"/>
    </svg>
  )
}

export default function WorkSection() {
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = moreOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMoreOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [moreOpen])

  return (
    <>
      <section id="work">
        <div className="work-header sr">
          <div className="work-title-block">
            <div className="work-sec-num">01</div>
            <h2 className="work-title">Selected<br /><em>Work</em></h2>
          </div>
          <span className="work-sub">2 CASE STUDIES</span>
        </div>
        <div className="case-list">

          {/* CS 1: mAI Food */}
          <div className="case-item sr">
            <div className="case-info">
              <div className="case-info-top">
                <div className="case-tags">
                  <span className="tag hot">UX Design</span>
                  <span className="tag">POS / Kiosk</span>
                  <span className="tag">B2C</span>
                </div>
                <div className="case-co">Resimator Oy · 2025</div>
                <h3 className="case-title">mAI Food — Self-service kiosk experience</h3>
                <p className="case-desc-line">Designed the full scan-to-checkout flow for a smart restaurant POS — from zero to shipped MVP.</p>
              </div>
              <div className="case-bottom">
                <div>
                  <div className="case-metric-val">MVP</div>
                  <div className="case-metric-lbl">Shipped</div>
                </div>
                <a className="case-link" href="/mai-food" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10 }}>
                  View case study <span className="arr"><ArrowSvg /></span>
                </a>
              </div>
            </div>
            <div className="case-vis">
              <div className="vbg vbg-light">
                <div className="ph-wrap">
                  <div className="ph-ico">🖥️</div>
                  <div className="ph-txt">Add your project screens here</div>
                </div>
              </div>
              <div className="case-n dk">01</div>
            </div>
          </div>

          {/* CS 2: OrangeNXT */}
          <div className="case-item sr">
            <div className="case-info">
              <div className="case-info-top">
                <div className="case-tags">
                  <span className="tag hot">UX Design</span>
                  <span className="tag">Fintech</span>
                  <span className="tag">Mobile</span>
                </div>
                <div className="case-co">FoneNXT / F1Soft Group · 2023–25</div>
                <h3 className="case-title">OrangeNXT</h3>
                <p className="case-desc-line">Users weren&apos;t confused — they were afraid. We found where trust broke down and redesigned the onboarding flow. Conversion went from 40% to 76%.</p>
              </div>
              <div className="case-bottom">
                <div>
                  <div className="case-metric-val">76%</div>
                  <div className="case-metric-lbl">Conversion rate</div>
                </div>
                <a className="case-link" href="/orangenxt" target="_blank" rel="noopener noreferrer" style={{ position: 'relative', zIndex: 10 }}>
                  View case study <span className="arr"><ArrowSvg /></span>
                </a>
              </div>
            </div>
            <div className="case-vis">
              <div className="vbg vbg-dark">
                <div className="ph">
                  <div className="ph-notch" />
                  <div className="ph-lbl">ORANGENXT</div>
                  <div className="ph-bal">
                    <div className="ph-bv">रू 24,580</div>
                    <div className="ph-bs">Available balance</div>
                  </div>
                  <div className="ph-div" />
                  <div className="ph-bar"><div className="ph-barf" /></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <span style={{ fontSize: 5, color: '#5a5650' }}>Spent</span>
                    <span style={{ fontSize: 5, color: '#5a5650' }}>68%</span>
                  </div>
                  <div className="ph-div" />
                  <div className="ph-row">
                    <div className="ph-dot" style={{ background: 'rgba(108,99,255,.15)' }} />
                    <div className="ph-lines"><div className="ph-line" style={{ width: '80%' }} /><div className="ph-line" style={{ width: '50%' }} /></div>
                    <span className="ph-amt" style={{ color: '#6c63ff' }}>−रू120</span>
                  </div>
                  <div className="ph-row">
                    <div className="ph-dot" />
                    <div className="ph-lines"><div className="ph-line" style={{ width: '70%' }} /><div className="ph-line" style={{ width: '45%' }} /></div>
                    <span className="ph-amt" style={{ color: '#4caf7d' }}>+रू500</span>
                  </div>
                  <div className="ph-cta"><span>Verify identity →</span></div>
                </div>
                <div className="fl-badge">
                  <div className="fl-bv">−36%</div>
                  <div className="fl-bl">Drop-off reduced</div>
                </div>
              </div>
              <div className="case-n">02</div>
            </div>
          </div>

        </div>

        <div className="work-more-row sr">
          <button className="btn-ghost" onClick={() => setMoreOpen(true)}>
            More Projects <span className="arr"><ArrowSvg /></span>
          </button>
        </div>
      </section>

      <div className={`mp-modal${moreOpen ? ' open' : ''}`}>
        <div className="overlay-panel">
          <button className="menu-close" onClick={() => setMoreOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <div className="mp-modal-header">
            <div className="mp-modal-eyebrow">MORE PROJECTS</div>
            <h2 className="mp-modal-title">More Work</h2>
            <p className="mp-modal-sub">A selection of additional projects across super apps, service platforms, and fintech.</p>
          </div>
          <div className="mp-modal-body">
            <div className="more-projects-grid">
              <div className="bc">
                <div className="bc-bgn">04</div>
                <div className="bc-thumb"><span className="bc-thumb-ph">Add project thumbnail</span></div>
                <div>
                  <div className="bc-top">
                    <div className="bc-tags"><span className="bc-tag hot">Digital Services</span><span className="bc-tag">Super App</span></div>
                    <span className="bc-year">2022</span>
                  </div>
                  <div className="bc-title">Geniee — Super App</div>
                  <p className="bc-desc">Led design and PM for a super app spanning food delivery, marketplace, and service providers. Managed a team of 3.</p>
                </div>
                <div className="bc-role">Lead Designer · Product Manager · Prototyping</div>
              </div>
              <div className="bc">
                <div className="bc-bgn">05</div>
                <div className="bc-thumb"><span className="bc-thumb-ph">Add project thumbnail</span></div>
                <div>
                  <div className="bc-top">
                    <div className="bc-tags"><span className="bc-tag hot">Service Platform</span></div>
                    <span className="bc-year">2021</span>
                  </div>
                  <div className="bc-title">True Professional</div>
                  <p className="bc-desc">Sole designer on a web &amp; mobile platform connecting users with skilled service providers.</p>
                </div>
                <div className="bc-role">End-to-end Design · Web &amp; Mobile</div>
              </div>
              <div className="bc">
                <div className="bc-bgn">06</div>
                <div className="bc-thumb"><span className="bc-thumb-ph">Add project thumbnail</span></div>
                <div>
                  <div className="bc-top">
                    <div className="bc-tags"><span className="bc-tag hot">Fintech</span><span className="bc-tag">E-wallet</span></div>
                    <span className="bc-year">2022</span>
                  </div>
                  <div className="bc-title">Sajilo Pay</div>
                  <p className="bc-desc">UX improvement and full UI redesign of a licensed Nepalese e-wallet. Heuristic eval → clean minimal interface with cultural illustration direction.</p>
                </div>
                <div className="bc-role">Freelance · UX Audit · UI Redesign</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
