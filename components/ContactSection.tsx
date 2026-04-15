'use client'
import LogoSVG from './LogoSVG'

export default function ContactSection() {
  return (
    <section className="contact-sec" id="contact">
      <div className="contact-wm">INSERT COIN</div>
      <div className="contact-inner">
        <span className="contact-pixel-tag sr">BERLIN · AVAILABLE_NOW</span>

        {/* Open to Work badge */}
        <div className="otw-wrap sr">
          <div className="otw-badge">
            {/* Rotating ring text */}
            <svg className="otw-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path
                  id="otw-circle"
                  d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                />
              </defs>
              <text className="otw-text">
                <textPath href="#otw-circle" startOffset="0%">
                  OPEN TO WORK · OPEN TO WORK · OPEN TO WORK ·
                </textPath>
              </text>
            </svg>

            {/* Center: white logo */}
            <div className="otw-center">
              <LogoSVG className="otw-logo" />
            </div>
          </div>
        </div>

        <h2 className="contact-title sr">
          Let&apos;s<br />make<br />something<br /><em>great.</em>
        </h2>
        <div className="contact-actions sr">
          <a href="mailto:hrichas@gmail.com" className="btn-light btn-mag">Say hello ✉</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-outline btn-mag">
            LinkedIn
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{display:'inline-block',verticalAlign:'middle'}}>
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="contact-links sr">
          <a href="#" className="contact-link">Resume</a>
          <a href="#" className="contact-link">Dribbble</a>
          <a href="#" className="contact-link">Read.cv</a>
        </div>
      </div>
    </section>
  )
}
