'use client'
import { useState, useEffect } from 'react'

const TOOLS = [
  {
    id: 'figma',
    name: 'Figma',
    desc: 'Design tool for UI screens.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z"/>
        <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z"/>
        <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z"/>
        <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z"/>
        <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/>
      </svg>
    ),
  },
  {
    id: 'figjam',
    name: 'FigJam',
    desc: 'Craft ideas, plan architecture.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="8" cy="10" r="2" fill="currentColor"/>
        <circle cx="12" cy="8" r="2" fill="currentColor"/>
        <circle cx="16" cy="11" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'jira',
    name: 'Jira',
    desc: 'Manage tasks and sprints.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.53 2.11L2.12 11.53a.75.75 0 000 1.06l4.24 4.24 5.17-5.17 5.17 5.17 4.24-4.24a.75.75 0 000-1.06L12 2.11a.33.33 0 00-.47 0z"/>
        <path d="M11.53 10.7l-5.17 5.17 5.17 5.17a.33.33 0 00.47 0l5.17-5.17-5.17-5.17a.33.33 0 00-.47 0z"/>
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    desc: 'Brainstorm, ideate, build.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.8 5.5H20l-4.7 3.4 1.8 5.5L12 13l-5.1 3.4 1.8-5.5L4 7.5h6.2L12 2z"/>
        <path d="M5 19l1 3M19 19l-1 3M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
]

export default function AboutSection() {
  const [expOpen, setExpOpen] = useState(false)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = expOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [expOpen])

  return (
    <>
    <section className="about-sec" id="about">
      <div className="about-inner">

        {/* Left: photo */}
        <div className="about-photo-col sr">
          <div className="about-photo-ph">
            <img src="/About.jpg" alt="Hricha Sharma" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 20 }} />
          </div>
        </div>

        {/* Right: text content */}
        <div className="about-content">
          <div className="about-sec-num">03</div>

          <p className="about-para sr">
            I&rsquo;m a Product Designer based in Berlin, with a background in Computer Engineering. I started out writing code — which means I know exactly what it takes to build what I design, and I stay close to the team until it ships.
          </p>

          <blockquote className="about-quote sr">
            Design isn&rsquo;t decoration. It&rsquo;s the first conversation you have with your user.
          </blockquote>

          <p className="about-para sr">
            I&rsquo;ve worked across fintech, wellness, and edtech — three very different worlds, but the same core challenge: make something genuinely useful for a real person. I bring that same rigour whether I&rsquo;m shaping a 0-to-1 product or untangling an existing experience.
          </p>

          <p className="about-para sr">
            Outside of work I speak at design events, obsess over type, and believe that the best feedback always comes from watching someone use your product for the very first time.
          </p>

          <blockquote className="about-quote sr">
            I don&rsquo;t hand off and disappear. Handoff is the middle of the story, not the end.
          </blockquote>
        </div>
      </div>

      {/* Full-width bottom bar: tools left, experience button right */}
      <div className="about-photo-bottom">
        <div className="about-tools">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              className={`tool-chip${hoveredTool === tool.id ? ' expanded' : ''}`}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <span className="tool-chip-icon">{tool.icon}</span>
              <span className="tool-chip-text">
                <span className="tool-chip-name">{tool.name}</span>
                <span className="tool-chip-desc">{tool.desc}</span>
              </span>
            </button>
          ))}
        </div>
        <button className="btn-ghost" onClick={() => setExpOpen(true)}>
          My Experience <span className="arr"><svg width="32" height="32" viewBox="0 0 44 36" fill="currentColor" shapeRendering="crispEdges"><rect x="0" y="16" width="44" height="4"/><rect x="26" y="1" width="4" height="4"/><rect x="31" y="6" width="4" height="4"/><rect x="36" y="11" width="4" height="4"/><rect x="36" y="21" width="4" height="4"/><rect x="31" y="26" width="4" height="4"/><rect x="26" y="31" width="4" height="4"/></svg></span>
        </button>
      </div>

    </section>

      {/* Experience modal — menu-overlay style, outside section to escape overflow:hidden */}
      <div className={`exp-overlay${expOpen ? ' open' : ''}`}>
        <div className="overlay-panel">
        <button className="menu-close" onClick={() => setExpOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="exp-overlay-inner">
          <div className="mp-modal-eyebrow">EXPERIENCE</div>
          <h2 className="mp-modal-title">Where I&rsquo;ve worked</h2>
          <p className="mp-modal-sub">Three industries, three different problems — all centred on making something useful for real people.</p>
          <div className="exp-list" style={{ marginTop: 40 }}>
            <div className="exp-row">
              <div className="exp-co">Resimator Oy</div>
              <div className="exp-right">
                <div className="exp-role">UI/UX Designer · Mar 2025 – Present</div>
                <span className="exp-ind">Finland / Remote</span>
              </div>
            </div>
            <div className="exp-row">
              <div className="exp-co">FoneNXT / F1Soft Group</div>
              <div className="exp-right">
                <div className="exp-role">Product Design Lead → Senior Product Designer · Feb 2023 – Mar 2025</div>
                <span className="exp-ind">Fintech</span>
              </div>
            </div>
            <div className="exp-row">
              <div className="exp-co">Blys</div>
              <div className="exp-right">
                <div className="exp-role">Product Designer · Mar 2022 – Dec 2022</div>
                <span className="exp-ind">Wellness</span>
              </div>
            </div>
            <div className="exp-row">
              <div className="exp-co">FuseMachines</div>
              <div className="exp-right">
                <div className="exp-role">UI/UX Designer & Interface Developer · Apr 2019 – Mar 2022</div>
                <span className="exp-ind">SaaS / AI</span>
              </div>
            </div>
            <div className="exp-row">
              <div className="exp-co">Vzeal Technologies</div>
              <div className="exp-right">
                <div className="exp-role">UI/UX Developer · Dec 2018 – Mar 2019</div>
                <span className="exp-ind">Web</span>
              </div>
            </div>
            <div className="exp-row">
              <div className="exp-co">Hochschule OWL, Germany</div>
              <div className="exp-right">
                <div className="exp-role">Intern – DAAD / IAESTE · Jun – Aug 2018</div>
                <span className="exp-ind">Urban Planning</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
