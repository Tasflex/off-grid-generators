// lib/wiring/render.js
// Turns a wiring diagram spec into an SVG string. Used by app/wiring-diagrams/[slug] and to export PNGs for social posts.
//
// spec = {
//   width, height, title,
//   nodes: [{ id, type, x, y, w, h, label, sub }],
//   wires: [{ from: 'node.side[:frac]', to: 'node.side[:frac]', kind, label, via: [[x, y], ...] }],
//   notes: [{ x, y, text, anchor }]
// }
// Sides are l, r, t, b; frac (0-1) positions the terminal along that side. Wires route orthogonally,
// through `via` points when given.

const NODE_STYLES = {
  panel: { fill: '#1e3a8a', text: '#ffffff', sub: '#bfdbfe' },
  battery: { fill: '#15803d', text: '#ffffff', sub: '#bbf7d0' },
  controller: { fill: '#c2410c', text: '#ffffff', sub: '#fed7aa' },
  inverter: { fill: '#6d28d9', text: '#ffffff', sub: '#ddd6fe' },
  dcdc: { fill: '#0e7490', text: '#ffffff', sub: '#a5f3fc' },
  station: { fill: '#334155', text: '#ffffff', sub: '#cbd5e1' },
  fuse: { fill: '#facc15', text: '#1f2937', sub: '#374151' },
  breaker: { fill: '#fde68a', text: '#1f2937', sub: '#374151', stroke: '#b45309' },
  switch: { fill: '#fecaca', text: '#7f1d1d', sub: '#991b1b', stroke: '#b91c1c' },
  busbar: { fill: '#9ca3af', text: '#111827', sub: '#374151' },
  shunt: { fill: '#64748b', text: '#ffffff', sub: '#e2e8f0' },
  load: { fill: '#e5e7eb', text: '#111827', sub: '#4b5563', stroke: '#6b7280' },
  acpanel: { fill: '#475569', text: '#ffffff', sub: '#e2e8f0' },
  grid: { fill: '#111827', text: '#ffffff', sub: '#d1d5db' },
  generator: { fill: '#92400e', text: '#ffffff', sub: '#fde68a' },
  vehicle: { fill: '#1f2937', text: '#ffffff', sub: '#d1d5db' },
  monitor: { fill: '#f1f5f9', text: '#0f172a', sub: '#475569', stroke: '#64748b' },
  pump: { fill: '#0369a1', text: '#ffffff', sub: '#bae6fd' },
  ground: { fill: 'none', text: '#166534', sub: '#166534' }
}

export const WIRE_STYLES = {
  pos: { color: '#dc2626', width: 3.5, label: 'DC positive (+)' },
  neg: { color: '#111827', width: 3.5, label: 'DC negative (−)' },
  pv: { color: '#ea580c', width: 3, label: 'Solar PV (+/−)' },
  ac: { color: '#2563eb', width: 3, label: 'AC (hot/neutral)' },
  gnd: { color: '#16a34a', width: 2.5, dash: '7 5', label: 'Equipment ground' },
  signal: { color: '#6b7280', width: 1.8, dash: '3 4', label: 'Data / sense' }
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function anchor(nodes, ref) {
  const dot = ref.indexOf('.')
  const id = dot === -1 ? ref : ref.slice(0, dot)
  const rest = dot === -1 ? 'r' : ref.slice(dot + 1)
  const [side, fracStr] = rest.split(':')
  const n = nodes[id]
  if (!n) throw new Error(`Wiring diagram: unknown node "${id}"`)
  const f = fracStr === undefined ? 0.5 : Number(fracStr)
  if (side === 'l') return { x: n.x, y: n.y + n.h * f, horiz: true }
  if (side === 'r') return { x: n.x + n.w, y: n.y + n.h * f, horiz: true }
  if (side === 't') return { x: n.x + n.w * f, y: n.y, horiz: false }
  return { x: n.x + n.w * f, y: n.y + n.h, horiz: false }
}

function route(a, b, via) {
  let pts = [[a.x, a.y], ...(via || []), [b.x, b.y]]
  if (!via || !via.length) {
    if (a.horiz && b.horiz && a.y !== b.y) {
      const mx = Math.round((a.x + b.x) / 2)
      pts = [[a.x, a.y], [mx, a.y], [mx, b.y], [b.x, b.y]]
    } else if (!a.horiz && !b.horiz && a.x !== b.x) {
      const my = Math.round((a.y + b.y) / 2)
      pts = [[a.x, a.y], [a.x, my], [b.x, my], [b.x, b.y]]
    }
  }
  // Insert elbows so every segment is horizontal or vertical. The first segment leaves along the
  // terminal's side; after that each elbow turns away from the previous segment's direction.
  const out = [pts[0]]
  let horiz = a.horiz
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = out[out.length - 1]
    const [x, y] = pts[i]
    if (px !== x && py !== y) {
      out.push(horiz ? [x, py] : [px, y])
      horiz = !horiz
    } else {
      horiz = py === y
    }
    out.push([x, y])
    horiz = !horiz
  }
  return out
}

function renderNode(n) {
  const s = NODE_STYLES[n.type] || NODE_STYLES.load
  const cx = n.x + n.w / 2
  const parts = []
  if (n.type === 'ground') {
    const y = n.y
    parts.push(`<line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + 12}" stroke="#16a34a" stroke-width="2.5"/>`)
    ;[[22, 12], [14, 18], [6, 24]].forEach(([hw, dy]) =>
      parts.push(`<line x1="${cx - hw}" y1="${y + dy}" x2="${cx + hw}" y2="${y + dy}" stroke="#16a34a" stroke-width="2.5"/>`))
    if (n.label) parts.push(`<text x="${cx}" y="${y + 42}" text-anchor="middle" font-size="11" font-weight="600" fill="${s.text}">${esc(n.label)}</text>`)
    return parts.join('')
  }
  const rx = n.type === 'busbar' ? 3 : 8
  parts.push(`<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="${rx}" fill="${s.fill}"${s.stroke ? ` stroke="${s.stroke}" stroke-width="1.5"` : ''}/>`)
  if (n.type === 'panel') {
    for (let i = 1; i < 4; i++) parts.push(`<line x1="${n.x + (n.w * i) / 4}" y1="${n.y + 4}" x2="${n.x + (n.w * i) / 4}" y2="${n.y + n.h - 4}" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>`)
    parts.push(`<line x1="${n.x + 4}" y1="${n.y + n.h / 2}" x2="${n.x + n.w - 4}" y2="${n.y + n.h / 2}" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>`)
  }
  const small = n.h < 40
  const ly = n.sub && !small ? n.y + n.h / 2 - 2 : n.y + n.h / 2 + 4
  const fs = small ? 11 : n.w < 110 ? 12 : 13
  parts.push(`<text x="${cx}" y="${ly}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${s.text}">${esc(n.label)}</text>`)
  if (n.sub && !small) parts.push(`<text x="${cx}" y="${ly + 16}" text-anchor="middle" font-size="10.5" fill="${s.sub}">${esc(n.sub)}</text>`)
  if (n.sub && small) parts.push(`<text x="${cx}" y="${n.y + n.h + 13}" text-anchor="middle" font-size="10" fill="#4b5563">${esc(n.sub)}</text>`)
  return parts.join('')
}

function renderWire(w, nodes) {
  const st = WIRE_STYLES[w.kind] || WIRE_STYLES.pos
  const a = anchor(nodes, w.from)
  const b = anchor(nodes, w.to)
  const pts = route(a, b, w.via)
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  const parts = [`<path d="${d}" stroke="${st.color}" stroke-width="${st.width}" fill="none" stroke-linejoin="round"${st.dash ? ` stroke-dasharray="${st.dash}"` : ''}/>`]
  parts.push(`<circle cx="${a.x}" cy="${a.y}" r="3.5" fill="${st.color}"/><circle cx="${b.x}" cy="${b.y}" r="3.5" fill="${st.color}"/>`)
  if (w.label) {
    // Label the longest segment
    let best = 0, li = 1
    for (let i = 1; i < pts.length; i++) {
      const len = Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1])
      if (len > best) { best = len; li = i }
    }
    const mx = (pts[li][0] + pts[li - 1][0]) / 2
    const my = (pts[li][1] + pts[li - 1][1]) / 2
    const tw = w.label.length * 5.6 + 8
    // Skip labels that would spill over the boxes at either end; the article text covers them
    if (best >= tw + 14) parts.push(`<rect x="${mx - tw / 2}" y="${my - 9}" width="${tw}" height="16" rx="3" fill="#ffffff" stroke="${st.color}" stroke-width="0.8"/>`)
    if (best >= tw + 14) parts.push(`<text x="${mx}" y="${my + 3}" text-anchor="middle" font-size="10" fill="#111827">${esc(w.label)}</text>`)
  }
  return parts.join('')
}

export function renderDiagramSvg(spec) {
  const nodes = Object.fromEntries(spec.nodes.map(n => [n.id, n]))
  const kinds = [...new Set(spec.wires.map(w => w.kind || 'pos'))]
  const legendY = spec.height - 22
  const legend = kinds.map((k, i) => {
    const st = WIRE_STYLES[k]
    const x = 20 + i * 150
    return `<line x1="${x}" y1="${legendY}" x2="${x + 28}" y2="${legendY}" stroke="${st.color}" stroke-width="${st.width}"${st.dash ? ` stroke-dasharray="${st.dash}"` : ''}/><text x="${x + 34}" y="${legendY + 4}" font-size="11" fill="#374151">${esc(st.label)}</text>`
  }).join('')
  const notes = (spec.notes || []).map(n =>
    `<text x="${n.x}" y="${n.y}" text-anchor="${n.anchor || 'start'}" font-size="11" font-style="italic" fill="#4b5563">${esc(n.text)}</text>`).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${spec.width} ${spec.height}" font-family="Inter, Arial, sans-serif" role="img" aria-label="${esc(spec.title)}">` +
    `<rect width="${spec.width}" height="${spec.height}" fill="#f9fafb"/>` +
    `<text x="${spec.width / 2}" y="28" text-anchor="middle" font-size="16" font-weight="700" fill="#111827">${esc(spec.title)}</text>` +
    spec.wires.map(w => renderWire(w, nodes)).join('') +
    spec.nodes.map(renderNode).join('') +
    notes +
    `<line x1="10" y1="${legendY - 18}" x2="${spec.width - 10}" y2="${legendY - 18}" stroke="#e5e7eb"/>` + legend +
    `<text x="${spec.width - 12}" y="${legendY + 4}" text-anchor="end" font-size="10" fill="#9ca3af">theloadcalc.com</text>` +
    `</svg>`
}
