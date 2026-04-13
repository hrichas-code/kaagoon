export default function BentoGrid() {
  return (
    <div className="bento-wrap">
      <div className="work-header sr" style={{marginBottom:48}}>
        <div className="work-title-block">
          <div className="work-sec-num">02</div>
          <h2 className="work-title">More<br /><em>Projects</em></h2>
        </div>
        <span className="work-sub">3 PROJECTS</span>
      </div>
      <div className="bento-grid">

        <div className="bc sr">
          <div className="bc-bgn">01</div>
          <div>
            <div className="bc-top">
              <div className="bc-tags">
                <span className="bc-tag hot">Digital Services</span>
                <span className="bc-tag">Super App</span>
              </div>
              <span className="bc-year">2022</span>
            </div>
            <div className="bc-title">Geniee — Super App</div>
            <p className="bc-desc">Led design and PM for a super app spanning food delivery, marketplace, and service providers. Managed a team of 3.</p>
          </div>
          <div className="bc-role">Lead Designer · Product Manager · Prototyping</div>
        </div>

        <div className="bc sr">
          <div className="bc-bgn">02</div>
          <div>
            <div className="bc-top">
              <div className="bc-tags"><span className="bc-tag hot">Service Platform</span></div>
              <span className="bc-year">2021</span>
            </div>
            <div className="bc-title">True Professional</div>
            <p className="bc-desc">Sole designer on a web &amp; mobile platform connecting users with skilled service providers.</p>
          </div>
          <div className="bc-role">End-to-end Design · Web &amp; Mobile</div>
        </div>

        <div className="bc dk sr">
          <div className="bc-bgn">03</div>
          <div>
            <div className="bc-top">
              <div className="bc-tags">
                <span className="bc-tag hot">Fintech</span>
                <span className="bc-tag">E-wallet</span>
              </div>
              <span className="bc-year">2022</span>
            </div>
            <div className="bc-title">Sajilo Pay</div>
            <p className="bc-desc">UX improvement and full UI redesign of a licensed Nepalese e-wallet. Heuristic eval → clean minimal interface with cultural illustration direction.</p>
          </div>
          <div className="bc-role">Freelance · UX Audit · UI Redesign</div>
        </div>

      </div>
    </div>
  )
}
