export const CLOUD_SHAPES = [
  [[0,0,1,1,1,0,0,0],[0,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0]],
  [[0,0,0,1,1,0,0,0],[0,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0]],
  [[0,1,1,0,0,1,0,0],[1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0]],
]

export const SKY_STOPS = [
  { p: 0,    top: '#c8dff0', bot: '#deeef8' }, // dawn — soft pale blue
  { p: 0.2,  top: '#5a9fd4', bot: '#8ec8e8' }, // midday — clear bright blue
  { p: 0.45, top: '#f0a050', bot: '#f8cc78' }, // golden hour — warm amber
  { p: 0.68, top: '#e0566a', bot: '#f08858' }, // sunset — coral
  { p: 0.85, top: '#a058a0', bot: '#d87898' }, // dusk — lavender rose
  { p: 1,    top: '#b87898', bot: '#e8a8b0' }, // evening — warm mauve, stays light
]

export const PROCESS_STEPS = [
  { num: '01', title: 'Understand & Frame', desc: "If I skip understanding,\nI'm solving the wrong problem.",           color: '#6c63ff' },
  { num: '02', title: 'Explore & Ideate',   desc: "The first idea is obvious.\nBetter ones show up when I explore more.", color: '#f0b429' },
  { num: '03', title: 'Structure & Flow',   desc: "I need to know how things work\nbefore deciding how they look.",       color: '#4caf7d' },
  { num: '04', title: 'Design & Validate',  desc: "If someone has to think too hard,\nit's not working yet.",             color: '#5b8dd9' },
  { num: '05', title: 'Deliver & Learn',    desc: "Design isn't done in files.\nIt holds up in reality.",                 color: '#e8533a' },
]

export const PROCESS_STEPS_L2 = [
  { num: '01', title: 'Frame Fast',         desc: "I don't over-document.\nI align quickly and move.",                    color: '#6c63ff' },
  { num: '02', title: 'Expand with AI',     desc: "I explore more directions, faster.\nI decide what's worth keeping.",   color: '#f0b429' },
  { num: '03', title: 'Design in Context',  desc: "I design for constraints from the start.\nNot ideal scenarios.",       color: '#4caf7d' },
  { num: '04', title: 'Validate Early',     desc: "I get feedback as soon as it works.\nNot when it's perfect.",           color: '#5b8dd9' },
  { num: '05', title: 'Iterate in Loops',   desc: "Nothing is final.\nI refine continuously.",                            color: '#e8533a' },
]
