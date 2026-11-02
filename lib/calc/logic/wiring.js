// lib/calc/logic/wiring.js
import { awgOptions, awgTable, getAwg, materialOptions, metricSizes, nextStandard, resistivity } from '../data'

const lengthUnitOptions = [{ value: 'm', label: 'Meters' }, { value: 'ft', label: 'Feet' }]
const toMeters = (len, unit) => (unit === 'ft' ? len * 0.3048 : len)

// Round-trip conductor resistance in ohms
const resistance = (lengthM, mm2, material) => (2 * lengthM * resistivity[material]) / mm2

export const wiringCalcs = [
  {
    slug: 'solar-wire-size',
    code: 'WR-01',
    category: 'wiring',
    name: 'Solar Wire Size Calculator (AWG / mm²)',
    inputs: [
      { id: 'amps', label: 'Current', type: 'number', unit: 'A', default: 30, min: 0.1, max: 400, step: 0.1 },
      { id: 'len', label: 'One-way cable length', type: 'number', unit: '', default: 5, min: 0.1, max: 1000, step: 0.1 },
      { id: 'unit', label: 'Length units', type: 'select', default: 'm', options: lengthUnitOptions },
      { id: 'volts', label: 'System voltage', type: 'number', unit: 'V', default: 12, min: 1, max: 1500, step: 1 },
      { id: 'drop', label: 'Max voltage drop', type: 'range', unit: '%', default: 3, min: 1, max: 10, step: 0.5 },
      { id: 'mat', label: 'Conductor', type: 'select', default: 'copper', options: materialOptions }
    ],
    compute: ({ amps, len, unit, volts, drop, mat }) => {
      const L = toMeters(len, unit)
      const minArea = (2 * L * amps * resistivity[mat]) / (volts * (drop / 100))
      // Aluminum carries ~78% of copper ampacity for the same gauge
      const ampFactor = mat === 'aluminum' ? 0.78 : 1
      const wire = awgTable.find(w => w.mm2 >= minArea && w.amps * ampFactor >= amps * 1.25)
      const metric = metricSizes.find(s => s >= minArea)
      if (!wire) {
        return {
          primary: { label: 'Wire size', value: 'OVER 4/0' },
          readouts: [{ label: 'Min. cross-section', value: minArea, unit: 'mm²', digits: 1 }],
          status: { level: 'bad', text: 'Use parallel conductors, a shorter run or a higher voltage' }
        }
      }
      const actualDrop = (amps * resistance(L, wire.mm2, mat) / volts) * 100
      return {
        primary: { label: 'Minimum wire size', value: `${wire.awg} AWG` },
        readouts: [
          { label: 'Metric equivalent', value: metric ? `${metric} mm²` : '>240 mm²' },
          { label: 'Required area', value: minArea, unit: 'mm²', digits: 2 },
          { label: 'Actual voltage drop', value: actualDrop, unit: '%', digits: 2 },
          { label: 'Wire ampacity (75°C)', value: wire.amps * ampFactor, unit: 'A', digits: 0 }
        ],
        status: { level: 'ok', text: 'Sized for both voltage drop and 125% continuous current' }
      }
    }
  },
  {
    slug: 'voltage-drop',
    code: 'WR-02',
    category: 'wiring',
    name: 'Voltage Drop Calculator (AC / DC)',
    inputs: [
      { id: 'volts', label: 'Source voltage', type: 'number', unit: 'V', default: 24, min: 1, max: 1500, step: 1 },
      { id: 'amps', label: 'Current', type: 'number', unit: 'A', default: 20, min: 0.1, max: 1000, step: 0.1 },
      { id: 'len', label: 'One-way length', type: 'number', unit: '', default: 10, min: 0.1, max: 2000, step: 0.1 },
      { id: 'unit', label: 'Length units', type: 'select', default: 'm', options: lengthUnitOptions },
      { id: 'awg', label: 'Wire gauge', type: 'select', default: '10', options: awgOptions },
      { id: 'mat', label: 'Conductor', type: 'select', default: 'copper', options: materialOptions },
      {
        id: 'sys', label: 'Circuit', type: 'select', default: 'dc', options: [
          { value: 'dc', label: 'DC / 1-phase AC' },
          { value: '3ph', label: '3-phase AC' }
        ]
      }
    ],
    compute: ({ volts, amps, len, unit, awg, mat, sys }) => {
      const L = toMeters(len, unit)
      const oneWay = (L * resistivity[mat]) / getAwg(awg).mm2
      // Single-phase/DC current flows out and back; 3-phase uses √3 × one-way resistance
      const vd = sys === '3ph' ? Math.sqrt(3) * amps * oneWay : 2 * amps * oneWay
      const pct = (vd / volts) * 100
      return {
        primary: { label: 'Voltage drop', value: pct, unit: '%', digits: 2 },
        readouts: [
          { label: 'Drop', value: vd, unit: 'V', digits: 2 },
          { label: 'Voltage at load', value: volts - vd, unit: 'V', digits: 2 },
          { label: 'Power lost in cable', value: vd * amps, unit: 'W', digits: 1 }
        ],
        status: pct <= 3 ? { level: 'ok', text: 'Within the 3% guideline' } : pct <= 5 ? { level: 'warn', text: 'Acceptable for feeders, high for branch circuits' } : { level: 'bad', text: 'Too much drop: use a thicker wire' },
        meter: { label: 'Drop vs 5% limit', value: Math.min(pct / 5, 1), text: `${pct.toFixed(1)}%` }
      }
    }
  },
  {
    slug: 'cable-length-power-loss',
    code: 'WR-03',
    category: 'wiring',
    name: 'Cable Length vs Efficiency Loss Calculator',
    inputs: [
      { id: 'watts', label: 'Power carried', type: 'number', unit: 'W', default: 2000, min: 1, max: 1000000, step: 10 },
      { id: 'volts', label: 'Voltage', type: 'number', unit: 'V', default: 24, min: 1, max: 1500, step: 1 },
      { id: 'len', label: 'One-way length', type: 'number', unit: 'm', default: 10, min: 0.1, max: 2000, step: 0.1 },
      { id: 'awg', label: 'Wire gauge', type: 'select', default: '6', options: awgOptions },
      { id: 'mat', label: 'Conductor', type: 'select', default: 'copper', options: materialOptions },
      { id: 'hours', label: 'Hours per day at this power', type: 'range', unit: 'h', default: 5, min: 0.5, max: 24, step: 0.5 }
    ],
    compute: ({ watts, volts, len, awg, mat, hours }) => {
      const amps = watts / volts
      const loss = amps * amps * resistance(len, getAwg(awg).mm2, mat)
      return {
        primary: { label: 'Efficiency loss', value: (loss / watts) * 100, unit: '%', digits: 2 },
        readouts: [
          { label: 'Power lost as heat', value: loss, unit: 'W', digits: 1 },
          { label: 'Current', value: amps, unit: 'A', digits: 1 },
          { label: 'Energy lost / year', value: (loss * hours * 365) / 1000, unit: 'kWh', digits: 0 },
          { label: 'Loss at 2× voltage', value: (loss / 4 / watts) * 100, unit: '%', digits: 2 }
        ]
      }
    }
  },
  {
    slug: 'solar-breaker-size',
    code: 'WR-04',
    category: 'wiring',
    name: 'Solar Breaker Size Calculator',
    inputs: [
      {
        id: 'mode', label: 'Circuit', type: 'select', default: 'pv', options: [
          { value: 'pv', label: 'PV array (Isc)' },
          { value: 'dc', label: 'Battery / inverter DC' },
          { value: 'ac', label: 'Inverter AC output' }
        ]
      },
      { id: 'amps', label: 'Isc (PV) or max continuous current', type: 'number', unit: 'A', default: 13.8, min: 0.1, max: 1000, step: 0.1 },
      { id: 'strings', label: 'Parallel strings (PV only)', type: 'number', unit: '', default: 2, min: 1, max: 50, step: 1 }
    ],
    compute: ({ mode, amps, strings }) => {
      // NEC 690.8: PV max current = Isc × 1.25, OCPD = max current × 1.25 (1.56 total). Other circuits: 125% of continuous.
      const current = mode === 'pv' ? amps * strings * 1.25 : amps
      const required = current * 1.25
      const breaker = nextStandard(required)
      const wire = awgTable.find(w => breaker && w.amps >= breaker)
      return {
        primary: { label: 'Breaker rating', value: breaker ?? 'OVER 400', unit: breaker ? 'A' : '', digits: 0 },
        readouts: [
          { label: 'Max circuit current', value: current, unit: 'A', digits: 1 },
          { label: 'Minimum OCPD', value: required, unit: 'A', digits: 1 },
          { label: 'Min. copper wire', value: wire ? `${wire.awg} AWG` : 'Consult tables' }
        ],
        status: { level: 'ok', text: mode === 'ac' ? 'Use an AC-rated breaker' : 'Use a DC-rated breaker at or above system voltage' }
      }
    }
  },
  {
    slug: 'solar-fuse-size',
    code: 'WR-05',
    category: 'wiring',
    name: 'Solar Fuse Size Calculator',
    inputs: [
      { id: 'isc', label: 'Panel / string Isc', type: 'number', unit: 'A', default: 13.8, min: 0.1, max: 100, step: 0.1 },
      { id: 'strings', label: 'Parallel strings', type: 'number', unit: '', default: 3, min: 1, max: 50, step: 1 },
      { id: 'maxFuse', label: 'Module max series fuse', type: 'number', unit: 'A', default: 25, min: 1, max: 100, step: 1 }
    ],
    compute: ({ isc, strings, maxFuse }) => {
      const min = isc * 1.56
      const fuse = nextStandard(min, [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 32, 35, 40, 45, 50])
      let status
      if (strings <= 2) status = { level: 'ok', text: 'String fuses are generally not required with 1–2 strings' }
      else if (!fuse || fuse > maxFuse) status = { level: 'bad', text: 'No standard fuse fits between 1.56 × Isc and the module limit' }
      else status = { level: 'ok', text: 'Fuse each string (both conductors if ungrounded)' }
      return {
        primary: { label: 'String fuse', value: fuse ?? '—', unit: fuse ? 'A' : '', digits: 0 },
        readouts: [
          { label: 'Minimum (1.56 × Isc)', value: min, unit: 'A', digits: 1 },
          { label: 'Module limit', value: maxFuse, unit: 'A', digits: 0 },
          { label: 'Combiner output current', value: isc * strings * 1.25, unit: 'A', digits: 1 },
          { label: 'Fuses needed', value: strings <= 2 ? 0 : strings, unit: 'pcs', digits: 0 }
        ],
        status
      }
    }
  },
  {
    slug: 'grounding-rod',
    code: 'WR-06',
    category: 'wiring',
    name: 'Grounding Rod Calculator',
    inputs: [
      {
        id: 'soil', label: 'Soil type', type: 'select', default: '100', options: [
          { value: '10', label: 'Wet organic / marsh' },
          { value: '30', label: 'Moist clay' },
          { value: '100', label: 'Sandy clay / loam' },
          { value: '300', label: 'Moist sand / gravel' },
          { value: '1000', label: 'Dry sand' },
          { value: '3000', label: 'Rocky ground' }
        ]
      },
      { id: 'len', label: 'Rod length', type: 'select', default: '8', options: [{ value: '8', label: '8 ft' }, { value: '10', label: '10 ft' }] },
      {
        id: 'dia', label: 'Rod diameter', type: 'select', default: '0.625', options: [
          { value: '0.5', label: '1/2"' },
          { value: '0.625', label: '5/8"' },
          { value: '0.75', label: '3/4"' }
        ]
      }
    ],
    compute: ({ soil, len, dia }) => {
      const rho = Number(soil)
      const L = Number(len) * 0.3048
      const a = (Number(dia) * 0.0254) / 2
      // Dwight's formula for a single driven rod
      const R = (rho / (2 * Math.PI * L)) * (Math.log((4 * L) / a) - 1)
      // Parallel rods spaced ≥ rod length interact; ~15% penalty
      let rods = 1
      while (rods < 20 && (rods === 1 ? R : (R / rods) * 1.15) > 25) rods++
      return {
        primary: { label: 'Single-rod resistance', value: R, unit: 'Ω', digits: 1 },
        readouts: [
          { label: 'Rods for ≤ 25 Ω', value: rods, unit: 'pcs', digits: 0 },
          { label: 'Two rods (NEC default)', value: (R / 2) * 1.15, unit: 'Ω', digits: 1 },
          { label: 'Min. rod spacing', value: Math.max(6, Number(len) * 2), unit: 'ft', digits: 0 }
        ],
        status: R <= 25 ? { level: 'ok', text: 'One rod meets 25 Ω (NEC 250.53)' } : { level: 'warn', text: 'Add a supplemental rod at least 6 ft away (NEC 250.53(A)(2))' }
      }
    }
  }
]
