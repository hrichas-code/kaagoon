const items = [
  'PRODUCT DESIGN','UX RESEARCH','FINTECH','WELLNESS','EDTECH',
  'DESIGN SYSTEMS','DEV HANDOFF','7+ YEARS','BERLIN','AVAILABLE NOW',
  'PRODUCT DESIGN','UX RESEARCH','FINTECH','WELLNESS','EDTECH',
  'DESIGN SYSTEMS','DEV HANDOFF','7+ YEARS','BERLIN','AVAILABLE NOW',
]

export default function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item === '✦' ? <span>✦</span> : item}
          </span>
        )).flatMap((el, i) => [
          el,
          <span key={`sep-${i}`} className="marquee-item"><span>✦</span></span>
        ])}
      </div>
    </div>
  )
}
