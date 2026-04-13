'use client'
import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    if (!cur) return
    let mx = 0, my = 0, cx = 0, cy = 0
    let rafId: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    function tick() {
      cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12
      cur!.style.left = cx + 'px'; cur!.style.top = cy + 'px'
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const addBig = () => cur!.classList.add('big')
    const removeBig = () => cur!.classList.remove('big')
    const addLite = () => cur!.classList.add('lite')
    const removeLite = () => cur!.classList.remove('lite')
    const addClick = () => cur!.classList.add('clicking')
    const removeClick = () => cur!.classList.remove('clicking')
    document.addEventListener('mousedown', addClick)
    document.addEventListener('mouseup', removeClick)

    const hoverEls = document.querySelectorAll('a,button,.st,.bc,.case-item,.exp-row')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addBig)
      el.addEventListener('mouseleave', removeBig)
    })

    const darkSections = document.querySelectorAll('.process-sec,.contact-sec,.speaking-sec,footer')
    darkSections.forEach(s => {
      s.addEventListener('mouseenter', addLite)
      s.addEventListener('mouseleave', removeLite)
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', addClick)
      document.removeEventListener('mouseup', removeClick)
    }
  }, [])

  return <div id="cur" />
}
