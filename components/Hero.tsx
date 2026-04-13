'use client'
import { useEffect } from 'react'

export default function Hero() {
  useEffect(() => {
    const initMagnetic = () => {
      document.querySelectorAll<HTMLElement>('.btn-mag').forEach(btn => {
        btn.addEventListener('mousemove', (e: MouseEvent) => {
          const r = btn.getBoundingClientRect()
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`
        })
        btn.addEventListener('mouseleave', () => { btn.style.transform = '' })
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.fromTo('.hero-title .wi', { translateY: '110%' }, {
            translateY: '0%', duration: 0.85, ease: 'power4.out', stagger: 0.08, delay: 0.2,
            onStart() { document.querySelectorAll<HTMLElement>('.hero-title .line').forEach(l => l.style.overflow = 'hidden') }
          })
          gsap.fromTo('.hero-caption', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.75 })
          gsap.fromTo('#hero-actions',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out', delay: 0.9 })
          gsap.fromTo('.hero-card',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1, delay: 1.0 })

          gsap.utils.toArray<HTMLElement>('.sr').forEach(el => {
            gsap.fromTo(el,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
            )
          })
        })

        initMagnetic()
      })
    })

    return () => { ctx?.revert() }
  }, [])

  return (
    <section className="hero hero-v2" id="hero">
      <div className="hero-main">
        {/* Title — single line */}
        <h1 className="hero-title" id="hero-title">
          <span className="line"><span className="wi">Solving Problems.</span></span>
            <span className="line"><span className="wi">Building Impact.</span></span>
        </h1>

        {/* Caption + buttons on same row */}
        <div className="hero-sub-row" id="hero-bottom">
          <p className="hero-caption">
            I like solving problems and building something useful for people
          </p>
          <div className="hero-actions" id="hero-actions">
            <a href="#work" className="btn-primary btn-mag">
              See my work
              <svg width="32" height="32" viewBox="0 0 44 36" fill="currentColor" shapeRendering="crispEdges"><rect x="0" y="16" width="44" height="4"/><rect x="26" y="1" width="4" height="4"/><rect x="31" y="6" width="4" height="4"/><rect x="36" y="11" width="4" height="4"/><rect x="36" y="21" width="4" height="4"/><rect x="31" y="26" width="4" height="4"/><rect x="26" y="31" width="4" height="4"/></svg>
            </a>
            <a href="#contact" className="btn-ghost">Get in touch <span className="arr"><svg width="32" height="32" viewBox="0 0 44 36" fill="currentColor" shapeRendering="crispEdges"><rect x="0" y="16" width="44" height="4"/><rect x="26" y="1" width="4" height="4"/><rect x="31" y="6" width="4" height="4"/><rect x="36" y="11" width="4" height="4"/><rect x="36" y="21" width="4" height="4"/><rect x="31" y="26" width="4" height="4"/><rect x="26" y="31" width="4" height="4"/></svg></span></a>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="hero-cards" id="hero-cards">
        <div className="hero-card">
          <div className="hero-card-num">7<span>+</span></div>
          <div className="hero-card-label">Years experience</div>
        </div>
        <div className="hero-card-divider" />
        <div className="hero-card">
          <div className="hero-card-num">76<span>%</span></div>
          <div className="hero-card-label">Onboarding conversion · OrangeNXT</div>
        </div>
        <div className="hero-card-divider" />
        <div className="hero-card">
          <div className="hero-card-num">3</div>
          <div className="hero-card-label">Industries — fintech, wellness, edtech</div>
        </div>
      </div>
    </section>
  )
}
