'use client'
import { useEffect, useRef } from 'react'
import { PROCESS_STEPS, PROCESS_STEPS_L2, CLOUD_SHAPES } from '@/lib/data'

const SHIP_PIX = [
  [0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0,0],[0,0,1,1,1,1,1,1,1,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,0],[0,0,1,1,0,1,1,0,1,1,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],[0,1,0,0,0,0,0,0,0,0,1,0],
]

export default function ProcessSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const unlockedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gc = canvasRef.current
    if (!gc) return
    const gx = gc.getContext('2d')!
    gc.width = gc.parentElement?.clientWidth ?? window.innerWidth
    gc.height = 520
    const GW = gc.width, GH = gc.height
    const PX = 'Press Start 2P'

    type StepData = typeof PROCESS_STEPS[0]
    type Target = StepData & {
      i: number; sx: number; sy: number; tx: number; ty: number
      x: number; y: number; w: number; h: number; hit: boolean
    }
    type Bullet = { x: number; y: number; speed: number }
    type Particle = { x: number; y: number; vx: number; vy: number; life: number; decay: number; size: number; col: string }

    type GameState = 'idle' | 'playing' | 'won' | 'transition' | 'l2-idle' | 'l2-playing' | 'l2-won' | 'final'

    let gameState: GameState = 'idle'
    let currentSteps = PROCESS_STEPS
    const ship = { x: GW / 2, y: GH - 52 }
    let bullets: Bullet[] = [], targets: Target[] = [], particles: Particle[] = [], hitCount = 0
    let shipTargetX = GW / 2, lastFire = 0, lastT2 = 0, rafId: number
    let transitionAlpha = 0, transitionStart = 0, canAdvanceTransition = false
    let transitionTimer: ReturnType<typeof setTimeout> | null = null
    let wonAutoTimer: ReturnType<typeof setTimeout> | null = null
    let transitionAutoTimer: ReturnType<typeof setTimeout> | null = null
    let l2WonAutoTimer: ReturnType<typeof setTimeout> | null = null
    let finalAlpha = 0

    // ── AUDIO ────────────────────────────────────────────────────
    let audioCtx: AudioContext | null = null
    let musicSeqId: ReturnType<typeof setInterval> | null = null
    let noteIndex = 0

    const NF: Record<string, number> = {
      _:0,
      C3:130.81,D3:146.83,E3:164.81,G3:196.00,A3:220.00,
      C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392.00,A4:440.00,B4:493.88,
      C5:523.25,D5:587.33,E5:659.25,G5:783.99,A5:880.00,
    }
    // L1: bright upbeat chiptune
    const MELODY_L1 = ['E4','_','E4','_','E4','C4','E4','_','G4','_','_','G3','_','_','_','_']
    // L2: faster, edgier
    const MELODY_L2 = ['A4','A4','_','A4','_','F4','C5','_','G4','_','F4','E4','_','C4','D4','_']

    function initAudio() {
      if (audioCtx) return
      audioCtx = new (window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext)()
    }

    function playNote(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.07) {
      if (!audioCtx || freq === 0) return
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = type
      osc.frequency.value = freq
      gain.gain.setValueAtTime(vol, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur)
      osc.connect(gain); gain.connect(audioCtx.destination)
      osc.start(); osc.stop(audioCtx.currentTime + dur)
    }

    function playShoot() {
      if (!audioCtx) return
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(900, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.07)
      gain.gain.setValueAtTime(0.09, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.07)
      osc.connect(gain); gain.connect(audioCtx.destination)
      osc.start(); osc.stop(audioCtx.currentTime + 0.07)
    }

    function playHit(col: string) {
      if (!audioCtx) return
      // noise burst
      const len = Math.floor(audioCtx.sampleRate * 0.12)
      const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
      const src = audioCtx.createBufferSource()
      src.buffer = buf
      const gain = audioCtx.createGain()
      gain.gain.setValueAtTime(0.22, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12)
      // slight pitch bend flavour via biquad
      const filt = audioCtx.createBiquadFilter()
      filt.type = 'bandpass'
      filt.frequency.value = col === '#4caf7d' ? 600 : 400
      src.connect(filt); filt.connect(gain); gain.connect(audioCtx.destination)
      src.start()
    }

    function playWin() {
      if (!audioCtx) return
      const seq = [523, 659, 784, 1047, 1319]
      seq.forEach((f, i) => setTimeout(() => playNote(f, 0.18, 'square', 0.1), i * 90))
    }

    function startMusic(melody: string[]) {
      if (musicSeqId) clearInterval(musicSeqId)
      noteIndex = 0
      const bpm = 200
      const ms = (60 / bpm / 2) * 1000
      musicSeqId = setInterval(() => {
        const key = melody[noteIndex % melody.length]
        const freq = NF[key] ?? 0
        if (freq > 0) playNote(freq, (ms / 1000) * 1.05, 'square', 0.055)
        noteIndex++
      }, ms)
    }

    function stopMusic() {
      if (musicSeqId) { clearInterval(musicSeqId); musicSeqId = null }
    }

    // Transition melody — cinematic bridge between L1 and L2
    // Descends from L1's bright register, then builds tension toward L2
    const MELODY_TRANS = [
      'G4','_','E4','_','C4','_','D4','_',
      'E4','_','G4','_','A4','_','_','_',
      'A4','_','G4','_','F4','_','E4','_',
      'D4','E4','F4','_','G4','_','A4','_',
    ]

    function startTransitionMusic() {
      stopMusic()
      noteIndex = 0
      const bpm = 140
      const ms = (60 / bpm / 2) * 1000
      musicSeqId = setInterval(() => {
        const key = MELODY_TRANS[noteIndex % MELODY_TRANS.length]
        const freq = NF[key] ?? 0
        if (freq > 0) {
          // triangle wave — softer, more cinematic than square
          playNote(freq, (ms / 1000) * 1.2, 'triangle', 0.08)
          // sub-octave bass note every 8 steps
          if (noteIndex % 8 === 0 && freq > 0) playNote(freq / 2, (ms / 1000) * 1.8, 'sine', 0.05)
        }
        noteIndex++
      }, ms)
    }

    const GCLOUDS = Array.from({ length: 10 }, () => ({
      x: Math.random(),
      y: 0.05 + Math.random() * 0.8,
      speed: 0.000018 + Math.random() * 0.000028,
      scale: 6 + Math.random() * 14,
      shape: CLOUD_SHAPES[Math.floor(Math.random() * 3)],
      alpha: 0.18 + Math.random() * 0.22,
    }))

    function drawShip(x: number, y: number, col: string) {
      const S = 2
      SHIP_PIX.forEach((row, ri) => row.forEach((px, ci) => {
        if (px) {
          gx.fillStyle = ci === 5 && ri <= 2 ? '#fff' : col
          gx.fillRect(Math.round(x + ci * S - SHIP_PIX[0].length * S / 2), Math.round(y + ri * S), S, S)
        }
      }))
    }

    function spawnParts(x: number, y: number, col: string) {
      for (let i = 0; i < 16; i++) {
        const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 4
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.025 + Math.random() * 0.02, size: 2 + Math.random() * 4, col })
      }
    }

    function scatterTargets(steps: typeof PROCESS_STEPS) {
      const N = steps.length
      const cardW = Math.floor(GW / N) - 24
      targets = steps.map((step, i) => {
        const a = (i / N) * Math.PI * 1.6 + 0.3, r = GH * 0.28
        const t: Target = {
          ...step, i,
          sx: GW / 2 + Math.cos(a) * r * (0.6 + Math.random() * 0.8) - cardW / 2,
          sy: 60 + Math.random() * (GH - 220),
          tx: 12 + i * (GW / N),
          ty: GH * 0.08 + 16,
          x: 0, y: 0, w: cardW, h: 210, hit: false
        }
        t.x = t.sx; t.y = t.sy
        return t
      })
      targets.sort(() => Math.random() - 0.5)
    }

    function resetToL1() {
      stopMusic()
      bullets = []; particles = []; hitCount = 0; ship.x = GW / 2
      currentSteps = PROCESS_STEPS
      scatterTargets(currentSteps)
      gameState = 'idle'
      transitionAlpha = 0; finalAlpha = 0; canAdvanceTransition = false
      if (unlockedRef.current) unlockedRef.current.style.display = 'none'
    }

    function startL1() {
      bullets = []; particles = []; hitCount = 0; ship.x = GW / 2
      currentSteps = PROCESS_STEPS
      scatterTargets(currentSteps)
      gameState = 'playing'
      startMusic(MELODY_L1)
      if (unlockedRef.current) unlockedRef.current.style.display = 'none'
    }

    function startL2() {
      bullets = []; particles = []; hitCount = 0; ship.x = GW / 2
      currentSteps = PROCESS_STEPS_L2
      scatterTargets(currentSteps)
      gameState = 'l2-playing'
      startMusic(MELODY_L2)
      if (unlockedRef.current) unlockedRef.current.style.display = 'none'
    }

    function enterTransition() {
      startTransitionMusic()
      if (wonAutoTimer) { clearTimeout(wonAutoTimer); wonAutoTimer = null }
      gameState = 'transition'
      transitionStart = lastT2
      transitionAlpha = 0
      canAdvanceTransition = false
      if (unlockedRef.current) unlockedRef.current.style.display = 'none'
      if (transitionTimer) clearTimeout(transitionTimer)
      transitionTimer = setTimeout(() => { canAdvanceTransition = true }, 700)
      // auto-advance to L2 idle once typewriter is done (~4.5s total)
      const LINE1 = 'The fundamentals stayed.', LINE2 = 'The way I work evolved.'
      const totalMs = 300 + (LINE1.length + LINE2.length) * 40 + 400 + 1600
      if (transitionAutoTimer) clearTimeout(transitionAutoTimer)
      transitionAutoTimer = setTimeout(() => {
        if (gameState === 'transition') {
          currentSteps = PROCESS_STEPS_L2
          scatterTargets(currentSteps)
          bullets = []; particles = []; hitCount = 0; ship.x = GW / 2
          gameState = 'l2-idle'
        }
      }, totalMs)
    }

    function hexAlpha(hex: string, a: number) {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
      return `rgba(${r},${g},${b},${a})`
    }

    function drawStep(t: Target, alpha: number, dark = false) {
      gx.save()
      const R = 16
      const x = Math.round(t.x), y = Math.round(t.y)

      // shadow — 5px/5px solid accent, no blur (btn-primary style)
      gx.globalAlpha = alpha
      gx.fillStyle = t.color
      gx.beginPath(); gx.roundRect(x + 5, y + 5, t.w, t.h, R); gx.fill()

      // card background — fully solid
      const cardBg = dark
        ? (t.hit ? hexAlpha(t.color, 0.25) : '#12161f')
        : (t.hit ? hexAlpha(t.color, 0.1) : '#ffffff')
      gx.fillStyle = cardBg
      gx.beginPath(); gx.roundRect(x, y, t.w, t.h, R); gx.fill()

      // border — 1.5px solid accent
      gx.strokeStyle = t.color; gx.lineWidth = 1.5
      gx.beginPath(); gx.roundRect(x, y, t.w, t.h, R); gx.stroke()

      gx.globalAlpha = 1
      gx.font = `11px "${PX}"`; gx.fillStyle = t.color
      gx.fillText(t.num, x + 12, y + 28)
      gx.font = `bold 14px Bebas Neue, sans-serif`
      gx.fillStyle = t.hit ? '#ffffff' : (dark ? 'rgba(255,255,255,.9)' : '#141210')
      const ws = t.title.split(' '); let line = '', ly = y + 52
      ws.forEach(w => {
        const test = line + w + ' '
        if (gx.measureText(test).width > t.w - 24) { gx.fillText(line.trim(), x + 12, Math.round(ly)); line = w + ' '; ly += 20 } else line = test
      }); gx.fillText(line.trim(), x + 12, Math.round(ly))
      gx.font = `13px system-ui, sans-serif`
      gx.fillStyle = t.hit ? 'rgba(255,255,255,.8)' : (dark ? 'rgba(200,210,230,.65)' : 'rgba(30,28,26,.75)')
      let dy = ly + 24
      const segments = t.desc.split('\n')
      segments.forEach(seg => {
        const ds = seg.split(' '); let dl = ''
        ds.forEach(w => {
          const test = dl + w + ' '
          if (gx.measureText(test).width > t.w - 24) { gx.fillText(dl.trim(), x + 12, Math.round(dy)); dl = w + ' '; dy += 18 } else dl = test
        })
        gx.fillText(dl.trim(), x + 12, Math.round(dy))
        dy += 22
      })
      if (t.hit) { gx.fillStyle = t.color; gx.fillRect(x + t.w - 14, y + 8, 7, 7) }
      gx.restore()
    }

    function drawGClouds(ts: number) {
      GCLOUDS.forEach(c => {
        const x = ((c.x + c.speed * ts) % 1.1 - 0.05) * GW
        const y = c.y * GH
        gx.fillStyle = `rgba(255,255,255,${c.alpha})`
        c.shape.forEach((row, ri) => row.forEach((px, ci) => {
          if (px) gx.fillRect(Math.round(x + ci * c.scale), Math.round(y + ri * c.scale), c.scale, c.scale)
        }))
      })
    }

    function drawBackground() {
      const bg = gx.createLinearGradient(0, 0, 0, GH)
      const isL2 = gameState === 'l2-idle' || gameState === 'l2-playing' || gameState === 'l2-won'
      if (isL2) {
        bg.addColorStop(0, '#0f1a12'); bg.addColorStop(1, '#050d08')
      } else {
        bg.addColorStop(0, '#1a1f2e'); bg.addColorStop(1, '#0d1118')
      }
      gx.fillStyle = bg; gx.fillRect(0, 0, GW, GH)
    }

    function drawParticles() {
      particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life -= p.decay; if (p.life > 0) { gx.globalAlpha = p.life; gx.fillStyle = p.col; gx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size); gx.globalAlpha = 1 } })
      particles = particles.filter(p => p.life > 0)
    }

    function drawLevelTitle(title: string) {
      gx.save()
      gx.textAlign = 'center'
      gx.font = `14px "${PX}"`; gx.fillStyle = 'rgba(255,255,255,.5)'
      gx.fillText(title.toUpperCase(), GW / 2, 38)
      gx.textAlign = 'left'
      gx.restore()
    }

    function drawHUD(label: string, count: number, total: number) {
      gx.font = `12px "${PX}"`; gx.fillStyle = 'rgba(255,255,255,.6)'
      gx.fillText(`${label}: ${count}/${total}`, 16, GH - 14)
      if (count < total) { gx.textAlign = 'right'; gx.fillText('SPACE / TAP = FIRE', GW - 16, GH - 14); gx.textAlign = 'left' }
    }

    function gameLoop(ts: number) {
      lastT2 = ts
      gx.clearRect(0, 0, GW, GH)
      drawBackground()
      drawGClouds(ts)

      // ── IDLE ──────────────────────────────────────────────────
      if (gameState === 'idle') {
        targets.forEach(t => drawStep(t, 1))
        drawShip(ship.x, ship.y, '#e8e4df')
        drawLevelTitle('LEVEL 1 — THE FOUNDATION')
        gx.font = `12px "${PX}"`; gx.fillStyle = 'rgba(255,255,255,.7)'; gx.textAlign = 'center'
        gx.fillText('THE FOUNDATION', GW / 2, GH / 2 - 10)
        gx.font = `9px "${PX}"`; gx.fillStyle = 'rgba(255,255,255,.45)'
        gx.fillText('PRESS SPACE OR TAP TO START', GW / 2, GH / 2 + 14)
        gx.textAlign = 'left'
        rafId = requestAnimationFrame(gameLoop); return
      }

      // ── WON (L1 complete) ─────────────────────────────────────
      if (gameState === 'won') {
        targets.forEach(t => { t.x += (t.tx - t.x) * 0.08; t.y += (t.ty - t.y) * 0.08; drawStep(t, 1) })
        drawParticles()
        drawLevelTitle('LEVEL 1 — THE FOUNDATION')
        rafId = requestAnimationFrame(gameLoop); return
      }

      // ── TRANSITION ────────────────────────────────────────────
      if (gameState === 'transition') {
        const elapsed = ts - transitionStart
        transitionAlpha = Math.min(1, elapsed / 500)

        // scanlines overlay
        gx.save()
        for (let sy = 0; sy < GH; sy += 4) {
          gx.fillStyle = 'rgba(0,0,0,0.18)'; gx.fillRect(0, sy, GW, 2)
        }

        // "STAGE CLEAR" flash — big pixel font, colour-cycles through accent colours
        const flashColors = ['#f0b429','#4caf7d','#5b8dd9','#e8533a','#ffffff']
        const fc = flashColors[Math.floor(ts / 120) % flashColors.length]
        gx.textAlign = 'center'
        gx.globalAlpha = Math.min(1, elapsed / 200)
        gx.font = `22px "${PX}"`
        // subtle shadow
        gx.fillStyle = 'rgba(0,0,0,0.6)'; gx.fillText('STAGE CLEAR', GW / 2 + 2, GH / 2 - 72)
        gx.fillStyle = fc; gx.fillText('STAGE CLEAR', GW / 2, GH / 2 - 74)

        // typewriter lines — reveal one char per 40ms
        const LINE1 = 'The fundamentals stayed.'
        const LINE2 = 'The way I work evolved.'
        const charsPerMs = 1 / 40
        const revealed1 = Math.min(LINE1.length, Math.floor(Math.max(0, elapsed - 300) * charsPerMs))
        const revealed2 = Math.min(LINE2.length, Math.floor(Math.max(0, elapsed - 300 - LINE1.length * 40) * charsPerMs))
        gx.globalAlpha = 1
        gx.font = `bold 28px Bebas Neue, sans-serif`; gx.fillStyle = '#ffffff'
        gx.fillText(LINE1.slice(0, revealed1), GW / 2, GH / 2 - 6)
        gx.fillText(LINE2.slice(0, revealed2), GW / 2, GH / 2 + 28)

        // blinking cursor after active line
        const showCursor = Math.floor(ts / 300) % 2 === 0
        if (revealed2 < LINE2.length && revealed1 === LINE1.length && showCursor) {
          const cur1w = gx.measureText(LINE1.slice(0, revealed1)).width
          gx.fillStyle = '#fff'; gx.fillRect(Math.round(GW / 2 - cur1w / 2 + gx.measureText(LINE1.slice(0, revealed1)).width), Math.round(GH / 2 - 22), 2, 20)
        }
        if (revealed2 === LINE2.length && showCursor) {
          const cur2w = gx.measureText(LINE2).width
          gx.fillStyle = '#fff'; gx.fillRect(Math.round(GW / 2 + cur2w / 2 + 4), Math.round(GH / 2 + 12), 2, 20)
        }

        // sub-copy fades in after both lines done
        if (revealed2 === LINE2.length) {
          const subAlpha = Math.min(1, (elapsed - 300 - (LINE1.length + LINE2.length) * 40) / 400)
          gx.globalAlpha = Math.max(0, subAlpha)
          gx.font = `16px system-ui, sans-serif`; gx.fillStyle = 'rgba(255,255,255,.55)'
          gx.fillText('Same principles. Different pace.', GW / 2, GH / 2 + 64)
        }

        // blink prompt
        if (canAdvanceTransition) {
          gx.globalAlpha = 0.4 + 0.35 * Math.sin(ts / 350)
          gx.font = `13px "${PX}"`; gx.fillStyle = '#ffffff'
          gx.fillText('PRESS SPACE TO CONTINUE', GW / 2, GH / 2 + 104)
        }

        gx.textAlign = 'left'
        gx.restore()
        rafId = requestAnimationFrame(gameLoop); return
      }

      // ── L2 IDLE ───────────────────────────────────────────────
      if (gameState === 'l2-idle') {
        targets.forEach(t => drawStep(t, 1, true))
        drawShip(ship.x, ship.y, '#a8f0c8')
        drawLevelTitle('LEVEL 2 — THE EVOLUTION')
        gx.font = `12px "${PX}"`; gx.fillStyle = 'rgba(255,255,255,.7)'; gx.textAlign = 'center'
        gx.fillText('THE EVOLUTION', GW / 2, GH / 2 - 10)
        gx.font = `9px "${PX}"`; gx.fillStyle = 'rgba(255,255,255,.45)'
        gx.fillText('PRESS SPACE OR TAP TO START', GW / 2, GH / 2 + 14)
        gx.textAlign = 'left'
        rafId = requestAnimationFrame(gameLoop); return
      }

      // ── L2 WON ────────────────────────────────────────────────
      if (gameState === 'l2-won') {
        targets.forEach(t => { t.x += (t.tx - t.x) * 0.08; t.y += (t.ty - t.y) * 0.08; drawStep(t, 1, true) })
        drawParticles()
        drawLevelTitle('LEVEL 2 — THE EVOLUTION')
        rafId = requestAnimationFrame(gameLoop); return
      }

      // ── FINAL ─────────────────────────────────────────────────
      if (gameState === 'final') {
        finalAlpha = Math.min(1, finalAlpha + 0.015)
        gx.save()
        gx.globalAlpha = finalAlpha
        gx.textAlign = 'center'
        gx.font = `bold 24px Bebas Neue, sans-serif`; gx.fillStyle = '#ffffff'
        gx.fillText('The tools changed.', GW / 2, GH / 2 - 22)
        gx.fillText('The thinking didn\'t.', GW / 2, GH / 2 + 12)
        gx.font = `13px system-ui, sans-serif`; gx.fillStyle = 'rgba(255,255,255,.5)'
        gx.fillText('That\'s the whole process.', GW / 2, GH / 2 + 46)
        gx.font = `13px "${PX}"`; gx.fillStyle = `rgba(255,255,255,${0.35 + 0.25 * Math.sin(ts / 400)})`
        gx.fillText('PRESS SPACE TO RESTART', GW / 2, GH / 2 + 90)
        gx.textAlign = 'left'
        gx.restore()
        rafId = requestAnimationFrame(gameLoop); return
      }

      // ── PLAYING (L1 or L2) ────────────────────────────────────
      ship.x += (shipTargetX - ship.x) * 0.1
      ship.x = Math.max(12, Math.min(GW - 12, ship.x))
      bullets.forEach(b => b.y -= b.speed)
      bullets = bullets.filter(b => b.y > -10)
      bullets.forEach((b, bi) => {
        targets.forEach(t => {
          if (!t.hit && b.x > t.x && b.x < t.x + t.w && b.y > t.y && b.y < t.y + t.h) {
            t.hit = true; bullets.splice(bi, 1); spawnParts(b.x, b.y, t.color); playHit(t.color); hitCount++
            if (hitCount >= currentSteps.length) {
              if (gameState === 'playing') {
                gameState = 'won'
                stopMusic(); playWin()
                for (let i = 0; i < 6; i++) setTimeout(() => targets.forEach(t2 => spawnParts(t2.tx + t2.w / 2, t2.ty + t2.h / 2, t2.color)), i * 200)
                // auto-enter transition after 1.5s
                if (wonAutoTimer) clearTimeout(wonAutoTimer)
                wonAutoTimer = setTimeout(() => { if (gameState === 'won') enterTransition() }, 1500)
              } else if (gameState === 'l2-playing') {
                gameState = 'l2-won'
                stopMusic(); playWin()
                if (unlockedRef.current) {
                  unlockedRef.current.textContent = '★ LEVEL 2 COMPLETE ★'
                  unlockedRef.current.style.display = 'block'
                }
                for (let i = 0; i < 6; i++) setTimeout(() => targets.forEach(t2 => spawnParts(t2.tx + t2.w / 2, t2.ty + t2.h / 2, t2.color)), i * 200)
                if (l2WonAutoTimer) clearTimeout(l2WonAutoTimer)
                l2WonAutoTimer = setTimeout(() => {
                  if (gameState === 'l2-won') {
                    gameState = 'final'; finalAlpha = 0
                    if (unlockedRef.current) unlockedRef.current.style.display = 'none'
                  }
                }, 1500)
              }
            }
          }
        })
      })
      const dark = gameState === 'l2-playing'
      targets.forEach(t => { if (t.hit) { t.x += (t.tx - t.x) * 0.09; t.y += (t.ty - t.y) * 0.09 } })
      targets.filter(t => !t.hit).forEach(t => drawStep(t, 1, dark))
      targets.filter(t => t.hit).forEach(t => drawStep(t, 1, dark))
      const bulletCol = dark ? '#4cffb0' : '#f0b429'
      bullets.forEach(b => {
        gx.fillStyle = bulletCol; gx.fillRect(Math.round(b.x - 1), Math.round(b.y - 6), 3, 10)
        gx.fillStyle = '#fff'; gx.fillRect(Math.round(b.x), Math.round(b.y - 6), 1, 4)
      })
      drawParticles()
      drawShip(ship.x, ship.y, dark ? '#a8f0c8' : '#e8e4df')
      const isL2 = gameState === 'l2-playing'
      drawLevelTitle(isL2 ? 'LEVEL 2 — THE EVOLUTION' : 'LEVEL 1 — THE FOUNDATION')
      drawHUD(isL2 ? 'L2 STEPS' : 'STEPS', hitCount, currentSteps.length)
      rafId = requestAnimationFrame(gameLoop)
    }

    function handleFire() {
      const now = Date.now(); if (now - lastFire < 180) return; lastFire = now
      initAudio()

      if (gameState === 'idle') {
        startL1(); rafId = requestAnimationFrame(gameLoop); return
      }
      if (gameState === 'playing') {
        bullets.push({ x: ship.x, y: ship.y - 10, speed: 8 }); playShoot(); return
      }
      if (gameState === 'won') {
        // SPACE skips the wait and enters transition immediately
        enterTransition(); return
      }
      if (gameState === 'transition') {
        if (!canAdvanceTransition) return
        // SPACE skips ahead to L2 idle immediately
        if (transitionAutoTimer) { clearTimeout(transitionAutoTimer); transitionAutoTimer = null }
        currentSteps = PROCESS_STEPS_L2
        scatterTargets(currentSteps)
        bullets = []; particles = []; hitCount = 0; ship.x = GW / 2
        gameState = 'l2-idle'; return
      }
      if (gameState === 'l2-idle') {
        gameState = 'l2-playing'; return
      }
      if (gameState === 'l2-playing') {
        bullets.push({ x: ship.x, y: ship.y - 10, speed: 8 }); playShoot(); return
      }
      if (gameState === 'l2-won') {
        if (l2WonAutoTimer) { clearTimeout(l2WonAutoTimer); l2WonAutoTimer = null }
        gameState = 'final'; finalAlpha = 0
        if (unlockedRef.current) unlockedRef.current.style.display = 'none'
        return
      }
      if (gameState === 'final') {
        resetToL1(); return
      }
    }

    const onMouseMove = (e: MouseEvent) => { const r = gc.getBoundingClientRect(); shipTargetX = (e.clientX - r.left) * (GW / r.width) }
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); const r = gc.getBoundingClientRect(); shipTargetX = (e.touches[0].clientX - r.left) * (GW / r.width) }
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); handleFire() }
    gc.addEventListener('mousemove', onMouseMove)
    gc.addEventListener('touchmove', onTouchMove, { passive: false })
    gc.addEventListener('click', handleFire)
    gc.addEventListener('touchstart', onTouchStart, { passive: false })
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); handleFire() }
      if (e.code === 'ArrowLeft') shipTargetX = Math.max(0, shipTargetX - 30)
      if (e.code === 'ArrowRight') shipTargetX = Math.min(GW, shipTargetX + 30)
    }
    document.addEventListener('keydown', keyHandler)

    currentSteps = PROCESS_STEPS
    scatterTargets(currentSteps)
    rafId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(rafId)
      stopMusic()
      if (audioCtx) { audioCtx.close(); audioCtx = null }
      gc.removeEventListener('mousemove', onMouseMove)
      gc.removeEventListener('touchmove', onTouchMove)
      gc.removeEventListener('click', handleFire)
      gc.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('keydown', keyHandler)
      if (transitionTimer) clearTimeout(transitionTimer)
      if (wonAutoTimer) clearTimeout(wonAutoTimer)
      if (transitionAutoTimer) clearTimeout(transitionAutoTimer)
      if (l2WonAutoTimer) clearTimeout(l2WonAutoTimer)
    }
  }, [])

  return (
    <section className="process-sec" id="process">
      <div className="process-header sr">
        <div className="process-title-block">
          <div className="process-sec-num">02</div>
          <h2 className="process-title">My<br />Process</h2>
          <div className="process-hint">[ PRESS SPACE OR TAP TO SHOOT · ALIGN ALL 5 STEPS ]</div>
        </div>
      </div>

      <canvas ref={canvasRef} id="game-canvas" width={900} height={520} />
      <div ref={unlockedRef} className="process-unlocked" style={{ display: 'none' }}>★ LEVEL 2 COMPLETE ★</div>
    </section>
  )
}
