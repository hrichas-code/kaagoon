/* ─────────────────────────────────────────────────────────
   FlowDiagram.tsx — mAI Food end-to-end UX flow
   Embedded in Section 06 of the case study.
   All styles are inline / via global :root variables.
───────────────────────────────────────────────────────── */

const S = {
  /* colours (mirror :root) */
  accent:     'var(--accent)',      /* #7eb8d6 */
  accent2:    'var(--accent-2)',    /* #f0b429 */
  green:      'var(--green)',       /* #4caf7d */
  darkInk:    'var(--dark-ink)',    /* #f0f5f9 */
  darkInk2:   'var(--dark-ink-2)', /* #b3c4d0 */
  ink:        'var(--ink)',
  ink2:       'var(--ink-2)',

  /* typography */
  display: 'var(--display)',
  pixel:   'var(--pixel)',
  body:    'var(--body)',

  /* reused shape tokens */
  r: 10,
  border: (alpha = 1) => `1.5px solid rgba(126,184,214,${alpha})`,
}

/* ── small helpers ──────────────────────────────────── */

function ArrRight({ bright = false }: { bright?: boolean }) {
  const col = bright ? S.accent : 'rgba(126,184,214,.18)'
  return (
    <div style={{ width: 2, alignSelf: 'center', height: 36, background: col, flexShrink: 0, position: 'relative' }}>
      <div style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)',
        borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `6px solid ${col}` }} />
    </div>
  )
}

function ArrDown({ col = 'rgba(126,184,214,.2)', h = 24 }: { col?: string; h?: number }) {
  return (
    <div style={{ width: 2, height: h, background: col, margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)',
        borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `6px solid ${col}` }} />
    </div>
  )
}

function Tag({ children, col = S.accent, bg = 'rgba(126,184,214,.1)' }:
  { children: React.ReactNode; col?: string; bg?: string }) {
  return (
    <span style={{ fontFamily: S.pixel, fontSize: 8, letterSpacing: '.06em', color: col,
      background: bg, borderRadius: 3, padding: '2px 7px', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: S.pixel, fontSize: 9, color: S.accent, letterSpacing: '2px',
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <span style={{ width: 14, height: 1, background: S.accent, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </div>
  )
}

function NodeBox({
  children, variant = 'screen', style = {}
}: { children: React.ReactNode; variant?: 'entry'|'screen'|'state'|'decision'|'modal'|'success'|'cta'; style?: React.CSSProperties }) {
  const vars: Record<string, React.CSSProperties> = {
    entry:    { background: 'rgba(126,184,214,.07)', border: `2px solid ${S.accent}`, boxShadow: `4px 4px 0 ${S.accent}` },
    screen:   { background: 'rgba(255,255,255,.03)', border: S.border(.2) },
    state:    { background: 'rgba(126,184,214,.05)', border: S.border(.28) },
    decision: { background: 'rgba(240,180,41,.05)', border: '1.5px dashed rgba(240,180,41,.35)' },
    modal:    { background: 'rgba(126,184,214,.04)', border: S.border(.3) },
    success:  { background: 'rgba(76,175,125,.06)', border: '1.5px solid rgba(76,175,125,.35)' },
    cta:      { background: S.accent, border: `1.5px solid ${S.accent}`, boxShadow: '4px 4px 0 rgba(126,184,214,.28)' },
  }
  return (
    <div style={{ borderRadius: S.r, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 5, ...vars[variant], ...style }}>
      {children}
    </div>
  )
}

function NodeLabel({ children, dark = false, size = 20, style = {} }: { children: React.ReactNode; dark?: boolean; size?: number; style?: React.CSSProperties }) {
  return <div style={{ fontFamily: S.display, fontSize: size, letterSpacing: 1, lineHeight: 1, color: dark ? S.ink : S.darkInk, ...style }}>{children}</div>
}

function NodeSub({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div style={{ fontSize: 11, fontWeight: 300, lineHeight: 1.55, color: dark ? S.ink2 : S.darkInk2 }}>{children}</div>
}

function BigNum({ n, dark = false }: { n: string; dark?: boolean }) {
  return <div style={{ fontFamily: S.display, fontSize: 40, lineHeight: 1, letterSpacing: 1, color: dark ? 'rgba(25,31,36,.22)' : 'rgba(126,184,214,.14)' }}>{n}</div>
}

/* ── Main component ──────────────────────────────────── */

export default function FlowDiagram() {
  const pad = { padding: '0 64px 56px' } as React.CSSProperties

  return (
    <div style={{ fontFamily: S.body }}>

      {/* ══ 1 · SIX-STEP STRIP ══════════════════════════ */}
      <div style={{ ...pad, paddingBottom: 0 }}>
        <Eyebrow>End-to-end flow</Eyebrow>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4, marginBottom: 40 }}>

          {/* 01 */}
          <NodeBox variant="entry" style={{ flex: 1, minWidth: 130 }}>
            <BigNum n="01" />
            <NodeLabel>Starting Screen</NodeLabel>
            <NodeSub>Place food on tray — clear first instruction</NodeSub>
            <Tag>Entry</Tag>
          </NodeBox>
          <ArrRight />

          {/* 02 */}
          <NodeBox variant="screen" style={{ flex: 1, minWidth: 130 }}>
            <BigNum n="02" />
            <NodeLabel>AI Detection</NodeLabel>
            <NodeSub>Camera scans tray · order builds live</NodeSub>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 2 }}>
              <Tag col={S.green} bg="rgba(76,175,125,.1)">High confidence</Tag>
              <Tag col={S.accent2} bg="rgba(240,180,41,.1)">Tap to verify</Tag>
            </div>
          </NodeBox>
          <ArrRight />

          {/* 03 */}
          <NodeBox variant="modal" style={{ flex: 1, minWidth: 130 }}>
            <BigNum n="03" />
            <NodeLabel>Weigh Modal</NodeLabel>
            <NodeSub>One weighted item at a time · live price</NodeSub>
            <Tag>If weighted</Tag>
          </NodeBox>
          <ArrRight />

          {/* 04 */}
          <NodeBox variant="success" style={{ flex: 1, minWidth: 130 }}>
            <BigNum n="04" />
            <NodeLabel style={{ color: S.green }}>Scan Complete</NodeLabel>
            <NodeSub>Scan again · or switch to manual</NodeSub>
            <Tag col={S.green} bg="rgba(76,175,125,.1)">State</Tag>
          </NodeBox>
          <ArrRight />

          {/* 05 */}
          <NodeBox variant="decision" style={{ flex: 1, minWidth: 130 }}>
            <BigNum n="05" />
            <NodeLabel style={{ color: S.accent2 }}>Review Order</NodeLabel>
            <NodeSub>Verify flagged items · adjust quantities</NodeSub>
            <Tag col={S.accent2} bg="rgba(240,180,41,.1)">Decision</Tag>
          </NodeBox>
          <ArrRight bright />

          {/* 06 */}
          <NodeBox variant="cta" style={{ flex: 1, minWidth: 130 }}>
            <BigNum n="06" dark />
            <NodeLabel dark>Continue to Pay</NodeLabel>
            <NodeSub dark>Eat In / Take Away · total</NodeSub>
            <Tag col={S.ink} bg="rgba(25,31,36,.15)">Checkout</Tag>
          </NodeBox>

        </div>
      </div>

      {/* ══ 2 · TWO PATHS ═══════════════════════════════ */}
      <div style={{ ...pad, paddingBottom: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>

          {/* ── Scanning path ── */}
          <div>
            <div style={{ fontFamily: S.pixel, fontSize: 9, color: S.accent, letterSpacing: '2px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 14, height: 1, background: S.accent, display: 'inline-block' }} />
              Scanning path — AI detection
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <NodeBox variant="entry" style={{ width: '100%' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 4 }}>SCREEN 01 · ENTRY</div>
                <NodeLabel>Starting Screen</NodeLabel>
                <NodeSub>"Place your food on the tray to begin" · Start Scanning CTA</NodeSub>
              </NodeBox>

              <ArrDown col={S.accent} h={24} />

              <NodeBox variant="state" style={{ width: '100%' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 4 }}>SCREEN 02 · AI STATE</div>
                <NodeLabel>Detecting Food Items…</NodeLabel>
                <NodeSub>Camera reads tray inside bounding box. Order list populates in real time.</NodeSub>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  <Tag col={S.green} bg="rgba(76,175,125,.1)">Auto-added (high confidence)</Tag>
                  <Tag col={S.accent2} bg="rgba(240,180,41,.1)">Tap to verify (low confidence)</Tag>
                </div>
              </NodeBox>

              {/* Branch: normal vs weighted */}
              <div style={{ width: '100%', margin: '20px 0 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>

                {/* Normal */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ height: 2, width: '100%', background: 'rgba(126,184,214,.15)' }} />
                  <ArrDown h={16} />
                  <NodeBox variant="screen" style={{ width: '100%', padding: '10px 14px' }}>
                    <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 2 }}>NORMAL ITEM</div>
                    <NodeLabel size={16}>Added to Order</NodeLabel>
                    <NodeSub>Qty +/− · Price shown · Delete option</NodeSub>
                  </NodeBox>
                </div>

                {/* Weighted */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ height: 2, width: '100%', background: 'rgba(240,180,41,.25)' }} />
                  <ArrDown col="rgba(240,180,41,.3)" h={16} />
                  <NodeBox variant="modal" style={{ width: '100%', padding: '10px 14px', borderColor: 'rgba(240,180,41,.3)' }}>
                    <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent2, letterSpacing: '.1em', marginBottom: 2 }}>WEIGHTED ITEM</div>
                    <NodeLabel size={16}>"Weigh the Item"</NodeLabel>
                    <NodeSub>Modal appears · place item on scale</NodeSub>
                  </NodeBox>
                  <ArrDown col="rgba(240,180,41,.25)" h={14} />
                  <NodeBox variant="state" style={{ width: '100%', padding: '10px 14px' }}>
                    <NodeLabel size={14}>Weight detected</NodeLabel>
                    <NodeSub>e.g. 0.1 kg · price calculated live</NodeSub>
                  </NodeBox>
                  <ArrDown col={S.green} h={14} />
                  <NodeBox variant="success" style={{ width: '100%', padding: '10px 14px' }}>
                    <NodeLabel size={14} style={{ color: S.green }}>✓ Weighing Complete</NodeLabel>
                    <NodeSub>Item resolved · order updated</NodeSub>
                  </NodeBox>
                </div>

              </div>
              {/* end branch */}

              <ArrDown col={S.accent} h={24} />

              <NodeBox variant="success" style={{ width: '100%' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.green, letterSpacing: '.1em', marginBottom: 4 }}>SCREEN 04</div>
                <NodeLabel style={{ color: S.green }}>Scan Complete</NodeLabel>
                <NodeSub>"You can scan more items to order."</NodeSub>
              </NodeBox>

              <div style={{ display: 'flex', width: '100%', gap: 10, marginTop: 16 }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,.03)', border: S.border(.15), borderRadius: S.r, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.06em', marginBottom: 4 }}>OPTION A</div>
                  <div style={{ fontFamily: S.display, fontSize: 15, letterSpacing: 1, color: S.darkInk, lineHeight: 1 }}>Scan Again</div>
                  <div style={{ fontSize: 10, fontWeight: 300, color: S.darkInk2, marginTop: 3 }}>Re-trigger AI detection</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(126,184,214,.05)', border: S.border(.25), borderRadius: S.r, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.06em', marginBottom: 4 }}>OPTION B</div>
                  <div style={{ fontFamily: S.display, fontSize: 15, letterSpacing: 1, color: S.darkInk, lineHeight: 1 }}>Enter Manual Mode</div>
                  <div style={{ fontSize: 10, fontWeight: 300, color: S.darkInk2, marginTop: 3 }}>Browse menu to add items</div>
                </div>
              </div>

            </div>
          </div>
          {/* end scanning */}

          {/* ── Manual path ── */}
          <div>
            <div style={{ fontFamily: S.pixel, fontSize: 9, color: S.accent, letterSpacing: '2px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 14, height: 1, background: S.accent, display: 'inline-block' }} />
              Manual path — always available
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Entry points */}
              <div style={{ width: '100%', background: 'rgba(126,184,214,.04)', border: S.border(.18), borderRadius: S.r, padding: '12px 16px', marginBottom: 16 }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 8 }}>TWO ENTRY POINTS</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Tag>From starting screen (Chef Mode)</Tag>
                  <Tag>Via "Enter Manual Mode" after scan</Tag>
                </div>
              </div>

              <ArrDown h={18} />

              <NodeBox variant="screen" style={{ width: '100%' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 4 }}>SCREEN 05 · MENU</div>
                <NodeLabel>Menu Grid</NodeLabel>
                <NodeSub>Highlights · Recommended · Salad · Bakery · Drinks · Tasty Starters · Sandwich · Wraps</NodeSub>
              </NodeBox>

              <ArrDown h={18} />

              <NodeBox variant="screen" style={{ width: '100%' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 4 }}>INTERACTION</div>
                <NodeLabel size={18}>Search + Browse</NodeLabel>
                <NodeSub>Filter by name or category · tap item card to add to order</NodeSub>
              </NodeBox>

              <ArrDown h={18} />

              <NodeBox variant="state" style={{ width: '100%' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em', marginBottom: 4 }}>ORDER UPDATES</div>
                <NodeLabel size={18}>Item Added</NodeLabel>
                <NodeSub>Qty defaults to 1 · +/− to adjust · delete to remove</NodeSub>
              </NodeBox>

              <ArrDown h={18} />

              <div style={{ width: '100%', background: 'rgba(255,255,255,.03)', border: S.border(.18), borderRadius: S.r, padding: '10px 14px', textAlign: 'center' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.06em', marginBottom: 4 }}>EXIT OPTION</div>
                <div style={{ fontFamily: S.display, fontSize: 16, letterSpacing: 1, color: S.darkInk, lineHeight: 1 }}>Exit Manual Mode</div>
                <div style={{ fontSize: 10, fontWeight: 300, color: S.darkInk2, marginTop: 3 }}>Returns to scan view · order preserved</div>
              </div>

              {/* Employee ID callout */}
              <div style={{ width: '100%', marginTop: 16, padding: '12px 16px',
                borderLeft: `3px solid ${S.accent2}`, background: 'rgba(240,180,41,.04)', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent2, letterSpacing: '.06em', marginBottom: 6 }}>CONTEXTUAL</div>
                <div style={{ fontSize: 11, fontWeight: 300, color: S.darkInk2, lineHeight: 1.6 }}>
                  Banner changes to <em style={{ fontStyle: 'italic' }}>&ldquo;Scan your Employee ID&rdquo;</em> — applies discount / subsidy before checkout.
                </div>
              </div>

            </div>
          </div>
          {/* end manual */}

        </div>
      </div>

      {/* ══ 3 · ORDER PANEL ════════════════════════════ */}
      <div style={{ ...pad, paddingTop: 0 }}>
        <div style={{ height: 1, background: 'rgba(126,184,214,.08)', marginBottom: 32 }} />
        <Eyebrow>Persistent throughout session</Eyebrow>
        <div style={{ fontFamily: S.display, fontSize: 28, letterSpacing: 2, color: S.darkInk, marginBottom: 6, lineHeight: 1 }}>
          ORDER PANEL — <span style={{ color: S.accent }}>ALWAYS VISIBLE.</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 300, color: S.darkInk2, marginBottom: 24, maxWidth: 480 }}>
          Right-side panel active in every state. Scanned and manually-added items coexist in the same order.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

          {/* Dining pref */}
          <div style={{ background: 'rgba(255,255,255,.03)', border: S.border(.2), borderRadius: S.r, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em' }}>DINING PREFERENCE</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: 'rgba(126,184,214,.08)', border: S.border(.2), borderRadius: 6, padding: '8px', textAlign: 'center' }}>
                <div style={{ fontFamily: S.display, fontSize: 14, color: S.darkInk, letterSpacing: 1 }}>Eat In</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(126,184,214,.08)', border: S.border(.2), borderRadius: 6, padding: '8px', textAlign: 'center' }}>
                <div style={{ fontFamily: S.display, fontSize: 14, color: S.darkInk, letterSpacing: 1 }}>Take Away</div>
              </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 300, color: S.darkInk2 }}>Toggle before paying</div>
          </div>

          {/* Item states */}
          <div style={{ background: 'rgba(126,184,214,.04)', border: S.border(.18), borderRadius: S.r, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em' }}>ITEM STATES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ background: 'rgba(255,255,255,.03)', border: S.border(.15), borderRadius: 6, padding: '8px 10px', fontSize: 11, fontWeight: 300, color: S.darkInk2 }}>Normal item — price shown</div>
              <div style={{ background: 'rgba(240,180,41,.04)', border: '1.5px dashed rgba(240,180,41,.3)', borderRadius: 6, padding: '8px 10px', fontSize: 11, fontWeight: 300, color: S.accent2 }}>⚠ Tap to verify — pending</div>
              <div style={{ background: 'rgba(126,184,214,.05)', border: S.border(.2), borderRadius: 6, padding: '8px 10px', fontSize: 11, fontWeight: 300, color: S.darkInk2 }}>⚖ Weighted — 0.1 kg · NOK X</div>
            </div>
          </div>

          {/* Summary + CTA */}
          <div style={{ background: 'rgba(126,184,214,.04)', border: S.border(.18), borderRadius: S.r, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: S.pixel, fontSize: 8, color: S.accent, letterSpacing: '.1em' }}>SUMMARY + CTA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11, color: S.darkInk2, fontWeight: 300 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Discount</span><span>—</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subsidy</span><span>—</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: S.darkInk, fontWeight: 500, paddingTop: 6, borderTop: '1px solid rgba(126,184,214,.1)' }}><span>Sub-Total</span><span>NOK —</span></div>
            </div>
            <div style={{ background: S.accent, borderRadius: 8, padding: '12px', textAlign: 'center', marginTop: 4, boxShadow: '3px 3px 0 rgba(126,184,214,.28)' }}>
              <div style={{ fontFamily: S.display, fontSize: 16, letterSpacing: 1, color: S.ink, lineHeight: 1 }}>Continue to Pay →</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
