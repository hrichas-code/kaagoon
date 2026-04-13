'use client'
import { useState, useEffect } from 'react'

const YT_ID = 'ei2kDsNDgmc'

export default function SpeakingSection() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <section className="speaking-sec">
        <div className="speak-sec-num">04</div>
        <div className="speaking-inner sr">
          <div>
            <span className="speak-tag">SPEAKING</span>
            <h2 className="speak-title">
              Design Disco<br />Vol.3 — <em>Kathmandu,<br />2023</em>
            </h2>
            <button className="speak-btn" onClick={() => setOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch on YouTube
            </button>
          </div>
          <div>
            <button className="speak-thumb" onClick={() => setOpen(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                alt="Hricha Sharma at Design Disco Vol.3"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg` }}
              />
              <div className="speak-play">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="speak-badge">LIVE TALK</div>
            </button>
          </div>
        </div>
      </section>

      <div className={`mp-modal yt-modal${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        <div className="overlay-panel" onClick={e => e.stopPropagation()}>
          <button className="menu-close" onClick={() => setOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="yt-panel-frame">
            {open && (
              <iframe
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`}
                title="Hricha Sharma at Design Disco Vol.3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
