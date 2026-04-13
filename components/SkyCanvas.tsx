'use client'
import { useEffect, useRef } from 'react'
import { CLOUD_SHAPES, SKY_STOPS } from '@/lib/data'

function lerp(a: string, b: string, t: number) {
  const h = (s: string) => parseInt(s.slice(1), 16)
  const [ar, ag, ab] = [h(a) >> 16, (h(a) >> 8) & 255, h(a) & 255]
  const [br, bg, bb] = [h(b) >> 16, (h(b) >> 8) & 255, h(b) & 255]
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`
}

function getSky(p: number) {
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    const a = SKY_STOPS[i], b = SKY_STOPS[i + 1]
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p)
      return { top: lerp(a.top, b.top, t), bot: lerp(a.bot, b.bot, t) }
    }
  }
  return SKY_STOPS[SKY_STOPS.length - 1]
}

export default function SkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let rafId: number

    const clouds = Array.from({ length: 16 }, () => ({
      x: Math.random(),
      y: 0.04 + Math.random() * 0.5,
      speed: 0.00003 + Math.random() * 0.00005,
      scale: 2 + Math.random() * 4,
      shape: CLOUD_SHAPES[Math.floor(Math.random() * 3)],
      alpha: 0.05 + Math.random() * 0.09,
      layer: Math.floor(Math.random() * 3),
    }))

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawCloud(c: typeof clouds[0], sp: number, ts: number) {
      const SW = canvas!.width, SH = canvas!.height
      const x = ((c.x + c.speed * ts) % 1.1 - 0.05) * SW
      const y = c.y * SH
      const s = c.scale
      // Clouds shift warm during golden hour / dusk, stay visible always
      let r = 255, g = 255, b = 255, a = c.alpha
      if (sp > 0.38 && sp < 0.65) {
        const d = (sp - 0.38) / 0.27
        g = Math.round(255 - d * 55); b = Math.round(255 - d * 110) // cream → peach
      } else if (sp >= 0.65) {
        const d = Math.min(1, (sp - 0.65) / 0.35)
        r = Math.round(255 - d * 20); g = Math.round(200 - d * 50); b = Math.round(145 + d * 60) // peach → soft lavender
      }
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`
      c.shape.forEach((row, ri) => row.forEach((px, ci) => {
        if (px) ctx.fillRect(Math.round(x + ci * s), Math.round(y + ri * s), s, s)
      }))
    }

    function draw(ts: number) {
      const SW = canvas!.width, SH = canvas!.height
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
      const sky = getSky(p)
      const g = ctx.createLinearGradient(0, 0, 0, SH)
      g.addColorStop(0, sky.top); g.addColorStop(1, sky.bot)
      ctx.fillStyle = g; ctx.fillRect(0, 0, SW, SH)
      ;[0, 1, 2].forEach(l => clouds.filter(c => c.layer === l).forEach(c => drawCloud(c, p, ts)))
      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    // Nav night mode
    function updateNav() {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
      const n = document.getElementById('main-nav')
      if (!n) return
      n.classList.remove('dusk', 'night')
      n.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', updateNav, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateNav)
    }
  }, [])

  return <canvas ref={canvasRef} id="sky" />
}
