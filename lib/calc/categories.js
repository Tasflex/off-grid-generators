// lib/calc/categories.js
// Calculator families. Each gets its own accent colour and model-code prefix on the device.

export const categories = {
  solar: {
    id: 'solar',
    name: 'Solar Panels',
    series: 'PV',
    accent: '#d97706',
    blurb: 'Panel output, tilt, orientation, spacing and panel technology.'
  },
  battery: {
    id: 'battery',
    name: 'Batteries',
    series: 'BT',
    accent: '#16a34a',
    blurb: 'Battery bank sizing, runtime, charging, efficiency and ageing.'
  },
  inverter: {
    id: 'inverter',
    name: 'Inverters',
    series: 'IN',
    accent: '#7c3aed',
    blurb: 'Inverter sizing, PV compatibility, efficiency and battery matching.'
  },
  wiring: {
    id: 'wiring',
    name: 'Wiring & Safety',
    series: 'WR',
    accent: '#ea580c',
    blurb: 'Wire gauge, voltage drop, breakers, fuses and grounding.'
  },
  performance: {
    id: 'performance',
    name: 'Performance & Loss',
    series: 'PF',
    accent: '#db2777',
    blurb: 'Degradation, heat, shading, soiling and lifetime cost.'
  },
  location: {
    id: 'location',
    name: 'Location & Climate',
    series: 'LC',
    accent: '#0284c7',
    blurb: 'Sun hours and solar irradiance by city and latitude.'
  },
  builder: {
    id: 'builder',
    name: 'System Builder',
    series: 'SB',
    accent: '#0d9488',
    blurb: 'Size a complete solar, off-grid or hybrid system step by step.'
  }
}

export const categoryOrder = ['builder', 'solar', 'battery', 'inverter', 'wiring', 'performance', 'location']
