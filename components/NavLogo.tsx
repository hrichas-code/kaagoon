'use client'
import { useState, useEffect, useCallback } from 'react'
import LogoSVG from './LogoSVG'

export default function NavLogo({ small = false }: { small?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [blinking, setBlinking] = useState(false)

  const scheduleBlink = useCallback(() => {
    const delay = 1500 + Math.random() * 1000
    return setTimeout(() => {
      setBlinking(true)
      setTimeout(() => {
        setBlinking(false)
        scheduleBlink()
      }, 150 + Math.random() * 100)
    }, delay)
  }, [])

  useEffect(() => {
    const t = scheduleBlink()
    return () => clearTimeout(t)
  }, [scheduleBlink])

  const cls = [
    'nav-logo-mark',
    blinking ? 'blinking' : '',
    hovered ? 'logo-hovered' : '',
    small ? 'logo-small' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <LogoSVG />
    </div>
  )
}
