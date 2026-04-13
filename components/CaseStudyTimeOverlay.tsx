'use client'
import { useEffect } from 'react'

interface Props { open: boolean; onClose: () => void }

export default function CaseStudyTimeOverlay({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const el = document.getElementById('cs2-panel')
    if (el) el.scrollTop = 0
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div id="cs2-overlay" className={`cs-ov${open ? ' open' : ''}`}>
      <div id="cs2-panel" className="cs-panel">
        <div className="cs-hero dark-h" style={{background:'#1a1a2e'}}>
          <div className="cs-hero-wm" style={{color:'rgba(255,255,255,0.04)'}}>TIME</div>
          <button className="cs-close" onClick={onClose}>✕</button>
          <div className="cs-eyebrow">CASE_STUDY · 03</div>
          <h1 className="cs-ht">AI-powered content<br /><em>that actually helps.</em></h1>
          <p className="cs-hook">TIME.com needed a way to surface relevant content to readers without feeling intrusive or algorithmically cold. This is the story of designing a conversational AI assistant that felt like a knowledgeable colleague, not a search engine.</p>
          <div className="cs-meta-row">
            <div className="cs-mi"><div className="cs-ml">Company</div><div className="cs-mv">TIME</div></div>
            <div className="cs-mi"><div className="cs-ml">Role</div><div className="cs-mv">Product Designer</div></div>
            <div className="cs-mi"><div className="cs-ml">Industry</div><div className="cs-mv">Media · AI</div></div>
            <div className="cs-mi"><div className="cs-ml">Year</div><div className="cs-mv">2024</div></div>
          </div>
        </div>
        <div className="cs-metrics">
          <div className="cs-m"><div className="cs-mv2">+40%</div><div className="cs-ml2">Content engagement</div></div>
          <div className="cs-m"><div className="cs-mv2">3.2×</div><div className="cs-ml2">Session depth increase</div></div>
          <div className="cs-m"><div className="cs-mv2">12</div><div className="cs-ml2">Interaction patterns tested</div></div>
        </div>
        <div className="cs-body">
          <div className="cs-sec">
            <div className="cs-sn">01 · CONTEXT &amp; ROLE</div>
            <h2 className="cs-st">TIME in the age of AI.</h2>
            <p className="cs-p">TIME is one of the world&apos;s most recognisable news brands — a century of journalism now navigating a media landscape transformed by artificial intelligence. The challenge wasn&apos;t whether to incorporate AI, but how to do it in a way that felt true to TIME&apos;s editorial voice.</p>
            <p className="cs-p">I joined as <strong>Product Designer</strong> to own the UX of a new AI-powered content assistant — from initial concept through to shipped product.</p>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">02 · THE PROBLEM</div>
            <h2 className="cs-st">Readers were leaving before they found what they needed.</h2>
            <p className="cs-p">TIME&apos;s archive spans decades. The depth is extraordinary — but discoverability was broken. Readers would land on an article, find it wasn&apos;t quite what they were looking for, and leave. The recommendation engine surfaced popular, not relevant.</p>
            <div className="cs-phases">
              {[['CH.01','Discovery','Finding the right article'],['CH.02','Context','Understanding historical events'],['CH.03','Depth','Going deeper on a topic'],['CH.04','Trust','Knowing content is authoritative']].map(([n,t,s]) => (
                <div key={n} className="cs-phase">
                  <div className="cs-ph-n">{n}</div>
                  <div className="cs-ph-t">{t}</div>
                  <div className="cs-ph-s">{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">03 · RESEARCH</div>
            <h2 className="cs-st">What readers actually want from AI.</h2>
            <p className="cs-p">Through <strong>user interviews and session analysis</strong>, we identified a clear pattern: readers trusted TIME&apos;s journalism but didn&apos;t trust algorithmic recommendations. They wanted curation with editorial judgment, not popularity signals.</p>
            <div className="cs-pain-grid">
              {[['📰 Over-reliance on recency','Readers missed relevant older content — algorithm favoured new over pertinent.'],
                ['🤖 AI skepticism','Users worried AI-generated content would dilute editorial standards.'],
                ['🔍 Search as fallback','Internal search was a last resort, not a discovery tool.'],
                ['📱 Mobile context loss','On mobile, context between articles was completely lost.']].map(([t,b]) => (
                <div key={t} className="cs-pc"><div className="cs-pc-t">{t}</div><div className="cs-pc-b">{b}</div></div>
              ))}
            </div>
            <div className="cs-2col" style={{marginTop:12}}>
              <div className="cs-sc"><div className="cs-sc-t">✓ Conversational comfort</div><div className="cs-sc-b">Users preferred asking questions over keyword search — felt more natural.</div></div>
              <div className="cs-sc"><div className="cs-sc-t">✓ Source attribution</div><div className="cs-sc-b">Showing the source article increased trust in AI-surfaced content significantly.</div></div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">04 · KEY DESIGN DECISIONS</div>
            <h2 className="cs-st">Five decisions that shaped the assistant.</h2>
            <div className="cs-decisions">
              {[['1','Conversational interface over search box','A chat-like input felt lower stakes and more exploratory — users asked more nuanced questions.'],
                ['2','Always-visible source attribution','Every AI response links directly to the source article — transparency builds trust.'],
                ['3','Contextual activation','The assistant appears in-context on article pages, not as a separate tool — lower friction entry.'],
                ['4','Editorial tone guidelines','AI responses written in TIME&apos;s editorial voice — no corporate AI-speak.'],
                ['5','Progressive disclosure','Simple answers with expandable depth — readers choose how far to go.']].map(([n,t,b]) => (
                <div key={n} className="cs-d">
                  <div className="cs-dn">{n}</div>
                  <div><div className="cs-dt">{t}</div><div className="cs-db">{b}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">05 · FINAL DESIGNS</div>
            <h2 className="cs-st">A reading companion, not a chatbot.</h2>
            <p className="cs-p">The final design sits at the edge of every article — always available, never intrusive. It knows what you&apos;re reading and can answer questions about it, find related content, or provide historical context.</p>
            <div className="cs-ph-block">
              <div style={{fontSize:26,marginBottom:10}}>💬</div>
              <div style={{fontSize:13,color:'var(--ink-3)',fontWeight:300}}>Add your Figma screens or screenshots here</div>
              <div style={{fontSize:11,color:'var(--ink-3)',marginTop:6,opacity:.5}}>Chat interface · article sidebar · mobile drawer · source cards</div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">06 · OUTCOMES</div>
            <h2 className="cs-st">Readers stayed longer and went deeper.</h2>
            <div className="cs-outcomes">
              <div className="cs-oc"><div className="cs-ov3">+40%</div><div className="cs-ol">Content engagement</div></div>
              <div className="cs-oc"><div className="cs-ov3">3.2×</div><div className="cs-ol">Session depth</div></div>
              <div className="cs-oc"><div className="cs-ov3">12</div><div className="cs-ol">Patterns tested</div></div>
            </div>
          </div>
          <div className="cs-sec">
            <div className="cs-sn">07 · REFLECTION</div>
            <h2 className="cs-st">AI design is trust design.</h2>
            <p className="cs-p">The most important lesson from this project: <strong>AI features live or die by the trust you build around them</strong>. The underlying model could be excellent, but if users don&apos;t trust it, they won&apos;t use it.</p>
            <p className="cs-p">Every design decision we made — attribution, tone, contextual activation — was fundamentally about building trust with a skeptical audience. The technology was table stakes. The trust was the product.</p>
            <div className="cs-quote">&ldquo;The best AI feature is one the user forgets is AI — they just think it&apos;s a really good product.&rdquo;</div>
          </div>
        </div>
      </div>
    </div>
  )
}
