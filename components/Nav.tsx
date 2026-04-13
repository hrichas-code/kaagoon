'use client'
import { useState, useEffect } from 'react'
import { CLOUD_SHAPES } from '@/lib/data'
import NavLogo from './NavLogo'

const GREETINGS = ['Hi!', 'Namaste!', 'Halo!', 'Ola!', 'Ciao!', 'Salut!', 'Hej!']

export default function Nav() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [darkBg, setDarkBg]         = useState(false)
  const [greetIdx, setGreetIdx]     = useState(0)
  const [greetVisible, setGreetVisible] = useState(true)

  // Cycle greetings with a fade-out → swap → fade-in
  useEffect(() => {
    const cycle = setInterval(() => {
      setGreetVisible(false)
      setTimeout(() => {
        setGreetIdx(i => (i + 1) % GREETINGS.length)
        setGreetVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(cycle)
  }, [])

  // Collapse on slightest scroll
  useEffect(() => {
    const onScroll = () => setHeroVisible(window.scrollY < 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Watch dark sections
  useEffect(() => {
    const darkSections = [
      document.querySelector('.process-sec'),
      document.querySelector('.contact-sec'),
    ].filter(Boolean) as Element[]
    if (!darkSections.length) return
    const visible = new Set<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target) })
        setDarkBg(visible.size > 0)
      },
      { threshold: 0.1 }
    )
    darkSections.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Body overflow + staggered link entrance
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) {
      const links = document.querySelectorAll<HTMLElement>('.menu-link')
      links.forEach((l, i) => {
        l.style.opacity = '0'; l.style.transform = 'translateY(20px)'
        setTimeout(() => {
          l.style.transition = 'opacity .4s ease, transform .4s ease'
          l.style.opacity = ''; l.style.transform = ''
        }, 80 + i * 60)
      })
    }
  }, [menuOpen])

  // Menu canvas clouds
  useEffect(() => {
    const mCanvas = document.getElementById('menu-canvas') as HTMLCanvasElement
    if (!mCanvas) return
    const mCtx = mCanvas.getContext('2d')!
    let rafId: number
    function resize() { mCanvas.width = window.innerWidth; mCanvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const mClouds = Array.from({ length: 14 }, () => ({
      x: Math.random(), y: 0.05 + Math.random() * 0.85,
      speed: 0.000015 + Math.random() * 0.000035,
      scale: 8 + Math.random() * 18,
      shape: CLOUD_SHAPES[Math.floor(Math.random() * 3)],
      alpha: 0.04 + Math.random() * 0.06,
    }))
    function drawMenuClouds(ts: number) {
      mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height)
      mClouds.forEach(c => {
        const x = ((c.x + c.speed * ts) % 1.1 - 0.05) * mCanvas.width
        const y = c.y * mCanvas.height
        mCtx.fillStyle = `rgba(147,197,230,${c.alpha})`
        c.shape.forEach((row, ri) => row.forEach((px, ci) => {
          if (px) mCtx.fillRect(Math.round(x + ci * c.scale), Math.round(y + ri * c.scale), c.scale, c.scale)
        }))
      })
      rafId = requestAnimationFrame(drawMenuClouds)
    }
    rafId = requestAnimationFrame(drawMenuClouds)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  const close = () => setMenuOpen(false)

  const navClass = [
    !heroVisible ? 'scrolled' : '',
    darkBg ? 'dark-bg' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <nav id="main-nav" className={navClass}>
        {/* Left: logo + greeting */}
        <div className="nav-left">
          <NavLogo small={!heroVisible} />

          <div
            className="nav-hi-block"
            aria-hidden={!heroVisible}
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(-6px)',
              pointerEvents: heroVisible ? 'auto' : 'none',
            }}
          >
            {/* Line 1: cycling greeting word + static "I am" */}
            <span className="nav-hi-greet">
              <span
                className="nav-hi-word"
                style={{
                  opacity: greetVisible ? 1 : 0,
                  transform: greetVisible ? 'translateY(0)' : 'translateY(-4px)',
                }}
              >
                {GREETINGS[greetIdx]}
              </span>
              {' '}I am
            </span>
            {/* Line 2: name */}
            <span className="nav-hi-name">Hricha Sharma</span>
          </div>
        </div>

        {/* Right: hamburger */}
        <button
          className={`ham-btn${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div id="menu-overlay" className={menuOpen ? 'open' : ''}>
        <div className="overlay-panel">
          <canvas id="menu-canvas" />
          <button className="menu-close" onClick={close} aria-label="Close menu">✕</button>
          <nav className="menu-links">
            <a href="#work"    className="menu-link" onClick={close}>Work</a>
            <a href="#process" className="menu-link" onClick={close}>Process</a>
            <a href="#about"   className="menu-link" onClick={close}>About</a>
            <a href="#contact" className="menu-link active" onClick={close}>Hire me</a>
          </nav>
          <div className="menu-bottom">
            <a href="mailto:hrichasharma@email.com" className="menu-social">hrichasharma@email.com</a>
            <span className="menu-tag">BERLIN · AVAILABLE_NOW</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="menu-social">LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </>
  )
}
