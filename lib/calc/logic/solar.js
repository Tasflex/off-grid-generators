// lib/calc/logic/solar.js
import { cityOptions, getCity } from '../data'

const rad = d => (d * Math.PI) / 180
const deg = r => (r * 180) / Math.PI
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x))

// Rule-of-thumb optimal fixed tilt for annual yield
export const optimalTilt = lat => {
  const a = Math.abs(lat)
  if (a < 25) return a * 0.87
  if (a <= 50) return a * 0.76 + 3.1
  return a
}

// Fraction of yield kept when a panel points `dev` degrees away from the equator
const azimuthFactor = (dev, tilt, lat) => {
  const k = 0.36 * Math.sin(rad(tilt)) * (0.7 + Math.abs(lat) / 100)
  return clamp(1 - k * (1 - Math.cos(rad(dev))), 0.3, 1)
}

const hemisphereOptions = [
  { value: 'north', label: 'Northern' },
  { value: 'south', label: 'Southern' }
]

export const solarCalcs = [
  {
    slug: 'solar-panel-output',
    code: 'PV-01',
    category: 'solar',
    name: 'Solar Panel Output Calculator',
    inputs: [
      { id: 'watts', label: 'Panel rating', type: 'number', unit: 'W', default: 400, min: 5, max: 1000, step: 5 },
      { id: 'qty', label: 'Number of panels', type: 'number', unit: 'pcs', default: 1, min: 1, max: 500, step: 1 },
      { id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 5, min: 1, max: 8, step: 0.1 },
      { id: 'loss', label: 'System losses', type: 'range', unit: '%', default: 14, min: 0, max: 40, step: 1 }
    ],
    compute: ({ watts, qty, psh, loss }) => {
      const daily = (watts * qty * psh * (1 - loss / 100)) / 1000
      return {
        primary: { label: 'Daily energy', value: daily, unit: 'kWh', digits: 2 },
        readouts: [
          { label: 'Monthly', value: daily * 30.4, unit: 'kWh', digits: 0 },
          { label: 'Yearly', value: daily * 365, unit: 'kWh', digits: 0 },
          { label: 'Per panel / day', value: (daily * 1000) / qty, unit: 'Wh', digits: 0 },
          { label: 'Array size', value: (watts * qty) / 1000, unit: 'kW', digits: 2 }
        ]
      }
    }
  },
  {
    slug: 'solar-production-by-location',
    code: 'PV-02',
    category: 'solar',
    name: 'Solar Production by Location Calculator',
    inputs: [
      { id: 'city', label: 'Location', type: 'select', default: 'phoenix', options: cityOptions },
      { id: 'kw', label: 'System size', type: 'number', unit: 'kW', default: 6, min: 0.1, max: 1000, step: 0.1 },
      { id: 'loss', label: 'System losses', type: 'range', unit: '%', default: 14, min: 0, max: 40, step: 1 }
    ],
    compute: ({ city, kw, loss }) => {
      const c = getCity(city)
      const annual = kw * c.psh * 365 * (1 - loss / 100)
      return {
        primary: { label: 'Annual production', value: annual, unit: 'kWh', digits: 0 },
        readouts: [
          { label: 'Daily average', value: annual / 365, unit: 'kWh', digits: 1 },
          { label: 'Monthly average', value: annual / 12, unit: 'kWh', digits: 0 },
          { label: 'Specific yield', value: annual / kw, unit: 'kWh/kWp', digits: 0 },
          { label: 'Peak sun hours', value: c.psh, unit: 'h/day', digits: 1 }
        ],
        meter: { label: 'Solar resource', value: c.psh / 7, text: c.psh >= 5.5 ? 'EXCELLENT' : c.psh >= 4.5 ? 'GOOD' : c.psh >= 3.5 ? 'FAIR' : 'LOW' }
      }
    }
  },
  {
    slug: 'solar-panel-tilt-angle',
    code: 'PV-03',
    category: 'solar',
    name: 'Solar Panel Tilt Angle Calculator',
    inputs: [
      { id: 'lat', label: 'Latitude', type: 'number', unit: '°', default: 35, min: 0, max: 66, step: 0.1 },
      { id: 'hemi', label: 'Hemisphere', type: 'select', default: 'north', options: hemisphereOptions }
    ],
    compute: ({ lat, hemi }) => {
      const t = v => clamp(v, 0, 90)
      return {
        primary: { label: 'Best year-round tilt', value: t(optimalTilt(lat)), unit: '°', digits: 1 },
        readouts: [
          { label: 'Summer', value: t(lat * 0.9 - 23.5), unit: '°', digits: 1 },
          { label: 'Spring / autumn', value: t(lat - 2.5), unit: '°', digits: 1 },
          { label: 'Winter', value: t(lat * 0.9 + 29), unit: '°', digits: 1 },
          { label: 'Face panels', value: hemi === 'north' ? 'TRUE SOUTH' : 'TRUE NORTH' }
        ]
      }
    }
  },
  {
    slug: 'seasonal-tilt-adjustment',
    code: 'PV-04',
    category: 'solar',
    name: 'Seasonal Tilt Adjustment Calculator',
    inputs: [
      { id: 'lat', label: 'Latitude', type: 'number', unit: '°', default: 40, min: 0, max: 66, step: 0.1 },
      { id: 'kwh', label: 'Yearly output at fixed tilt', type: 'number', unit: 'kWh', default: 8000, min: 10, max: 1000000, step: 10 },
      {
        id: 'mode', label: 'Adjustment schedule', type: 'select', default: '2', options: [
          { value: '2', label: '2× / year' },
          { value: '4', label: '4× / year' },
          { value: '12', label: 'Monthly' }
        ]
      }
    ],
    compute: ({ lat, kwh, mode }) => {
      // Seasonal adjustment gains grow with latitude (sun path changes more)
      const base = { 2: 0.04, 4: 0.05, 12: 0.06 }[mode]
      const gain = base * clamp(0.5 + Math.abs(lat) / 60, 0.5, 1.4)
      return {
        primary: { label: 'Extra energy per year', value: kwh * gain, unit: 'kWh', digits: 0 },
        readouts: [
          { label: 'Gain vs fixed', value: gain * 100, unit: '%', digits: 1 },
          { label: 'Adjusted yearly total', value: kwh * (1 + gain), unit: 'kWh', digits: 0 },
          { label: 'Summer angle', value: clamp(lat * 0.9 - 23.5, 0, 90), unit: '°', digits: 0 },
          { label: 'Winter angle', value: clamp(lat * 0.9 + 29, 0, 90), unit: '°', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'solar-panel-azimuth-loss',
    code: 'PV-05',
    category: 'solar',
    name: 'Solar Panel Orientation (Azimuth) Loss Calculator',
    inputs: [
      { id: 'dev', label: 'Angle away from due south (N. hemisphere) / north (S.)', type: 'range', unit: '°', default: 45, min: 0, max: 180, step: 5 },
      { id: 'tilt', label: 'Panel tilt', type: 'range', unit: '°', default: 30, min: 0, max: 90, step: 1 },
      { id: 'lat', label: 'Latitude', type: 'number', unit: '°', default: 35, min: 0, max: 66, step: 0.1 },
      { id: 'kwh', label: 'Yearly output if ideally oriented', type: 'number', unit: 'kWh', default: 8000, min: 10, max: 1000000, step: 10 }
    ],
    compute: ({ dev, tilt, lat, kwh }) => {
      const f = azimuthFactor(dev, tilt, lat)
      const dir = dev <= 22.5 ? 'EQUATOR-FACING' : dev <= 67.5 ? 'DIAGONAL' : dev <= 112.5 ? 'EAST / WEST' : dev <= 157.5 ? 'MOSTLY POLE-FACING' : 'POLE-FACING'
      return {
        primary: { label: 'Orientation loss', value: (1 - f) * 100, unit: '%', digits: 1 },
        readouts: [
          { label: 'Relative yield', value: f * 100, unit: '%', digits: 1 },
          { label: 'Energy lost / year', value: kwh * (1 - f), unit: 'kWh', digits: 0 },
          { label: 'Expected output', value: kwh * f, unit: 'kWh', digits: 0 },
          { label: 'Orientation', value: dir }
        ],
        status: f >= 0.95 ? { level: 'ok', text: 'Negligible loss' } : f >= 0.85 ? { level: 'warn', text: 'Moderate loss: still worthwhile' } : { level: 'bad', text: 'Heavy loss: consider a lower tilt or another roof face' }
      }
    }
  },
  {
    slug: 'solar-tracker-vs-fixed',
    code: 'PV-06',
    category: 'solar',
    name: 'Solar Tracker vs Fixed Tilt Calculator',
    inputs: [
      { id: 'kw', label: 'System size', type: 'number', unit: 'kW', default: 10, min: 0.1, max: 10000, step: 0.1 },
      { id: 'psh', label: 'Peak sun hours (fixed tilt)', type: 'range', unit: 'h/day', default: 5, min: 2, max: 8, step: 0.1 },
      {
        id: 'climate', label: 'Sky conditions', type: 'select', default: 'sunny', options: [
          { value: 'sunny', label: 'Mostly clear' },
          { value: 'mixed', label: 'Mixed' },
          { value: 'cloudy', label: 'Often cloudy' }
        ]
      },
      {
        id: 'type', label: 'Tracker', type: 'select', default: 'single', options: [
          { value: 'single', label: 'Single-axis' },
          { value: 'dual', label: 'Dual-axis' }
        ]
      },
      { id: 'price', label: 'Electricity value', type: 'number', unit: '$/kWh', default: 0.16, min: 0, max: 2, step: 0.01 }
    ],
    compute: ({ kw, psh, climate, type, price }) => {
      // Trackers gain less under diffuse (cloudy) light
      const gain = { single: { sunny: 0.25, mixed: 0.19, cloudy: 0.12 }, dual: { sunny: 0.36, mixed: 0.28, cloudy: 0.18 } }[type][climate]
      const fixed = kw * psh * 365 * 0.86
      return {
        primary: { label: 'Extra energy per year', value: fixed * gain, unit: 'kWh', digits: 0 },
        readouts: [
          { label: 'Fixed tilt', value: fixed, unit: 'kWh/yr', digits: 0 },
          { label: 'With tracker', value: fixed * (1 + gain), unit: 'kWh/yr', digits: 0 },
          { label: 'Gain', value: gain * 100, unit: '%', digits: 0 },
          { label: 'Value of gain', value: fixed * gain * price, unit: '$/yr', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'roof-solar-capacity',
    code: 'PV-07',
    category: 'solar',
    name: 'Roof Area to Solar Capacity Calculator',
    inputs: [
      { id: 'area', label: 'Roof area', type: 'number', unit: '', default: 50, min: 1, max: 100000, step: 1 },
      { id: 'units', label: 'Area units', type: 'select', default: 'm2', options: [{ value: 'm2', label: 'm²' }, { value: 'ft2', label: 'ft²' }] },
      { id: 'usable', label: 'Usable share (setbacks, vents)', type: 'range', unit: '%', default: 70, min: 30, max: 100, step: 1 },
      { id: 'watts', label: 'Panel rating', type: 'number', unit: 'W', default: 400, min: 50, max: 800, step: 5 },
      { id: 'panelArea', label: 'Panel size', type: 'number', unit: 'm²', default: 1.95, min: 0.3, max: 3.5, step: 0.01 },
      { id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 4.5, min: 2, max: 8, step: 0.1 }
    ],
    compute: ({ area, units, usable, watts, panelArea, psh }) => {
      const m2 = units === 'ft2' ? area * 0.092903 : area
      const panels = Math.floor((m2 * usable) / 100 / panelArea)
      const kw = (panels * watts) / 1000
      return {
        primary: { label: 'System capacity', value: kw, unit: 'kW', digits: 2 },
        readouts: [
          { label: 'Panels that fit', value: panels, unit: 'pcs', digits: 0 },
          { label: 'Usable area', value: (m2 * usable) / 100, unit: 'm²', digits: 1 },
          { label: 'Yearly output', value: kw * psh * 365 * 0.86, unit: 'kWh', digits: 0 },
          { label: 'Power density', value: m2 ? (kw * 1000) / m2 : 0, unit: 'W/m² roof', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'ground-mount-vs-roof-solar',
    code: 'PV-08',
    category: 'solar',
    name: 'Ground Mount vs Rooftop Solar Calculator',
    inputs: [
      { id: 'kw', label: 'System size', type: 'number', unit: 'kW', default: 8, min: 0.1, max: 10000, step: 0.1 },
      { id: 'psh', label: 'Peak sun hours (optimal tilt)', type: 'range', unit: 'h/day', default: 5, min: 2, max: 8, step: 0.1 },
      { id: 'lat', label: 'Latitude', type: 'number', unit: '°', default: 35, min: 0, max: 66, step: 0.1 },
      { id: 'roofTilt', label: 'Roof pitch', type: 'range', unit: '°', default: 22, min: 0, max: 60, step: 1 },
      { id: 'roofDev', label: 'Roof angle away from due south/north', type: 'range', unit: '°', default: 30, min: 0, max: 180, step: 5 }
    ],
    compute: ({ kw, psh, lat, roofTilt, roofDev }) => {
      const opt = optimalTilt(lat)
      const ideal = kw * psh * 365 * 0.86
      // Ground mount: optimal angle, better airflow keeps cells ~2% cooler-running
      const ground = ideal * 1.02
      const tiltFactor = clamp(1 - 0.00015 * (roofTilt - opt) ** 2, 0.6, 1)
      const roof = ideal * tiltFactor * azimuthFactor(roofDev, roofTilt, lat) * 0.985
      return {
        primary: { label: 'Ground mount advantage', value: ((ground - roof) / roof) * 100, unit: '%', digits: 1 },
        readouts: [
          { label: 'Ground mount', value: ground, unit: 'kWh/yr', digits: 0 },
          { label: 'Rooftop', value: roof, unit: 'kWh/yr', digits: 0 },
          { label: 'Difference', value: ground - roof, unit: 'kWh/yr', digits: 0 },
          { label: 'Ground tilt used', value: opt, unit: '°', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'solar-panel-row-spacing',
    code: 'PV-09',
    category: 'solar',
    name: 'Solar Panel Row Spacing Calculator',
    inputs: [
      { id: 'len', label: 'Panel length (slope)', type: 'number', unit: 'm', default: 2.0, min: 0.3, max: 10, step: 0.01 },
      { id: 'tilt', label: 'Tilt angle', type: 'range', unit: '°', default: 30, min: 0, max: 75, step: 1 },
      { id: 'lat', label: 'Latitude', type: 'number', unit: '°', default: 35, min: 0, max: 66, step: 0.1 },
      {
        id: 'window', label: 'Shade-free window on winter solstice', type: 'select', default: '3', options: [
          { value: '0', label: 'Solar noon' },
          { value: '2', label: '10am–2pm' },
          { value: '3', label: '9am–3pm' }
        ]
      }
    ],
    compute: ({ len, tilt, lat, window }) => {
      const phi = rad(Math.abs(lat))
      const decl = rad(-23.45)
      const h = rad(Number(window) * 15)
      const sinAlt = Math.sin(phi) * Math.sin(decl) + Math.cos(phi) * Math.cos(decl) * Math.cos(h)
      const alt = Math.asin(clamp(sinAlt, -1, 1))
      if (alt <= rad(1)) {
        return {
          primary: { label: 'Row pitch', value: '—' },
          readouts: [],
          status: { level: 'bad', text: 'Sun is below the horizon at this hour on the winter solstice' }
        }
      }
      const az = Math.asin(clamp((Math.cos(decl) * Math.sin(h)) / Math.cos(alt), -1, 1))
      const height = len * Math.sin(rad(tilt))
      const footprint = len * Math.cos(rad(tilt))
      const gap = (height / Math.tan(alt)) * Math.cos(az)
      const pitch = footprint + gap
      return {
        primary: { label: 'Row pitch (front to front)', value: pitch, unit: 'm', digits: 2 },
        readouts: [
          { label: 'Clear gap between rows', value: gap, unit: 'm', digits: 2 },
          { label: 'Panel top height', value: height, unit: 'm', digits: 2 },
          { label: 'Min. sun elevation', value: deg(alt), unit: '°', digits: 1 },
          { label: 'Ground coverage ratio', value: len / pitch, unit: '', digits: 2 }
        ]
      }
    }
  },
  {
    slug: 'cloud-cover-solar-loss',
    code: 'PV-10',
    category: 'solar',
    name: 'Cloud Cover Solar Loss Calculator',
    inputs: [
      { id: 'cloud', label: 'Cloud cover', type: 'range', unit: '%', default: 50, min: 0, max: 100, step: 5 },
      { id: 'clear', label: 'Output on a clear day', type: 'number', unit: 'kWh', default: 30, min: 0.1, max: 100000, step: 0.1 }
    ],
    compute: ({ cloud, clear }) => {
      // Kasten–Czeplak cloud model: G = G_clear × (1 − 0.75 N^3.4)
      const f = 1 - 0.75 * Math.pow(cloud / 100, 3.4)
      return {
        primary: { label: 'Expected output', value: clear * f, unit: 'kWh', digits: 1 },
        readouts: [
          { label: 'Share of clear-sky', value: f * 100, unit: '%', digits: 0 },
          { label: 'Energy lost', value: clear * (1 - f), unit: 'kWh', digits: 1 },
          { label: 'Sky cover', value: (cloud / 100) * 8, unit: 'oktas', digits: 1 }
        ],
        meter: { label: 'Clear-sky output', value: f, text: `${Math.round(f * 100)}%` }
      }
    }
  },
  {
    slug: 'monocrystalline-vs-polycrystalline',
    code: 'PV-11',
    category: 'solar',
    name: 'Monocrystalline vs Polycrystalline Output Calculator',
    inputs: [
      { id: 'area', label: 'Available panel area', type: 'number', unit: 'm²', default: 20, min: 1, max: 100000, step: 0.5 },
      { id: 'monoEff', label: 'Mono efficiency', type: 'range', unit: '%', default: 21.5, min: 17, max: 25, step: 0.1 },
      { id: 'polyEff', label: 'Poly efficiency', type: 'range', unit: '%', default: 17, min: 13, max: 20, step: 0.1 },
      { id: 'temp', label: 'Average cell temperature', type: 'number', unit: '°C', default: 45, min: -10, max: 85, step: 1 },
      { id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 4.5, min: 2, max: 8, step: 0.1 }
    ],
    compute: ({ area, monoEff, polyEff, temp, psh }) => {
      const monoKw = (area * monoEff) / 100
      const polyKw = (area * polyEff) / 100
      // Typical temperature coefficients: mono −0.35 %/°C, poly −0.40 %/°C
      const mono = monoKw * psh * 365 * 0.86 * (1 - 0.0035 * (temp - 25))
      const poly = polyKw * psh * 365 * 0.86 * (1 - 0.004 * (temp - 25))
      return {
        primary: { label: 'Mono advantage', value: mono - poly, unit: 'kWh/yr', digits: 0 },
        readouts: [
          { label: 'Mono capacity', value: monoKw, unit: 'kW', digits: 2 },
          { label: 'Poly capacity', value: polyKw, unit: 'kW', digits: 2 },
          { label: 'Mono yearly', value: mono, unit: 'kWh', digits: 0 },
          { label: 'Poly yearly', value: poly, unit: 'kWh', digits: 0 }
        ]
      }
    }
  }
]
