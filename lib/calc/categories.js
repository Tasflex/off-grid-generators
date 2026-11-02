// lib/calc/categories.js
// Calculator families. Each gets its own accent colour and model-code prefix on the device.

export const categories = {
  solar: {
    id: 'solar',
    name: 'Solar Panels',
    series: 'PV',
    accent: '#ffb020',
    blurb: 'Panel output, tilt, orientation, spacing and panel technology.'
  },
  battery: {
    id: 'battery',
    name: 'Batteries',
    series: 'BT',
    accent: '#39ff88',
    blurb: 'Battery bank sizing, runtime, charging, efficiency and ageing.'
  },
  inverter: {
    id: 'inverter',
    name: 'Inverters',
    series: 'IN',
    accent: '#b48cff',
    blurb: 'Inverter sizing, PV compatibility, efficiency and battery matching.'
  },
  wiring: {
    id: 'wiring',
    name: 'Wiring & Safety',
    series: 'WR',
    accent: '#ff6b4a',
    blurb: 'Wire gauge, voltage drop, breakers, fuses and grounding.'
  },
  location: {
    id: 'location',
    name: 'Location & Climate',
    series: 'LC',
    accent: '#4cc9ff',
    blurb: 'Sun hours and solar irradiance by city and latitude.'
  },
  builder: {
    id: 'builder',
    name: 'System Builder',
    series: 'SB',
    accent: '#00f0d0',
    blurb: 'Size a complete solar, off-grid or hybrid system step by step.'
  }
}

export const categoryOrder = ['builder', 'solar', 'battery', 'inverter', 'wiring', 'location']
