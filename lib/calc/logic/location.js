// lib/calc/logic/location.js
import { cityOptions, getCity } from '../data'
import { optimalTilt } from './solar'

const rad = d => (d * Math.PI) / 180
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const monthStart = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]

// Daily extraterrestrial irradiation on a horizontal surface, kWh/m² (Duffie & Beckman)
const extraterrestrial = (latDeg, day) => {
  const phi = rad(latDeg)
  const decl = rad(23.45 * Math.sin(rad((360 * (284 + day)) / 365)))
  const ws = Math.acos(Math.min(1, Math.max(-1, -Math.tan(phi) * Math.tan(decl))))
  const h0 = ((24 * 3600 * 1367) / Math.PI) * (1 + 0.033 * Math.cos(rad((360 * day) / 365))) *
    (Math.cos(phi) * Math.cos(decl) * Math.sin(ws) + ws * Math.sin(phi) * Math.sin(decl))
  return Math.max(0, h0) / 3.6e6
}

export const locationCalcs = [
  {
    slug: 'solar-irradiance-by-city',
    code: 'LC-01',
    category: 'location',
    name: 'Solar Irradiance & Sun Hours by City',
    inputs: [
      { id: 'city', label: 'City', type: 'select', default: 'nairobi', options: cityOptions }
    ],
    compute: ({ city }) => {
      const c = getCity(city)
      return {
        primary: { label: 'Peak sun hours', value: c.psh, unit: 'h/day', digits: 1 },
        readouts: [
          { label: 'Annual irradiation', value: c.psh * 365, unit: 'kWh/m²', digits: 0 },
          { label: 'Yield per kWp', value: c.psh * 365 * 0.86, unit: 'kWh/yr', digits: 0 },
          { label: 'Best fixed tilt', value: optimalTilt(c.lat), unit: '°', digits: 0 },
          { label: 'Face panels', value: c.lat >= 0 ? 'SOUTH' : 'NORTH' }
        ],
        meter: { label: 'Solar resource', value: c.psh / 7, text: c.psh >= 5.5 ? 'EXCELLENT' : c.psh >= 4.5 ? 'GOOD' : c.psh >= 3.5 ? 'FAIR' : 'LOW' }
      }
    }
  },
  {
    slug: 'solar-irradiance-by-latitude',
    code: 'LC-02',
    category: 'location',
    name: 'Solar Irradiance by Latitude Calculator',
    inputs: [
      { id: 'lat', label: 'Latitude (negative = south)', type: 'number', unit: '°', default: 35, min: -66, max: 66, step: 0.5 },
      {
        id: 'sky', label: 'Typical sky', type: 'select', default: '0.52', options: [
          { value: '0.68', label: 'Desert / very clear' },
          { value: '0.6', label: 'Mostly sunny' },
          { value: '0.52', label: 'Mixed' },
          { value: '0.42', label: 'Often cloudy' }
        ]
      }
    ],
    compute: ({ lat, sky }) => {
      const kt = Number(sky)
      const monthly = months.map((m, i) => {
        let sum = 0
        for (let d = monthStart[i] + 1; d <= monthStart[i + 1]; d++) sum += extraterrestrial(lat, d)
        return (sum / (monthStart[i + 1] - monthStart[i])) * kt
      })
      const avg = monthly.reduce((a, b) => a + b, 0) / 12
      // Tilting to latitude captures more of the low winter sun
      const tilted = avg * Math.min(1 + 0.004 * Math.abs(lat), 1.25)
      const best = monthly.indexOf(Math.max(...monthly))
      const worst = monthly.indexOf(Math.min(...monthly))
      return {
        primary: { label: 'Sun hours on tilted panel', value: tilted, unit: 'h/day', digits: 2 },
        readouts: [
          { label: 'Horizontal average', value: avg, unit: 'kWh/m²/day', digits: 2 },
          { label: `Best month (${months[best]})`, value: monthly[best], unit: 'kWh/m²/day', digits: 1 },
          { label: `Worst month (${months[worst]})`, value: monthly[worst], unit: 'kWh/m²/day', digits: 1 },
          { label: 'Annual on tilt', value: tilted * 365, unit: 'kWh/m²', digits: 0 }
        ],
        bars: months.map((m, i) => ({ label: m, value: monthly[i] / 9 }))
      }
    }
  }
]
