// lib/calc/data.js
// Reference tables shared by the calculators.

// Typical annual-average peak sun hours on a latitude-tilted panel (kWh/m²/day).
// Rounded from NREL NSRDB / PVGIS long-term averages; local sites vary by ±10%.
export const cities = [
  { id: 'phoenix', name: 'Phoenix, USA', lat: 33.4, psh: 6.6 },
  { id: 'las-vegas', name: 'Las Vegas, USA', lat: 36.2, psh: 6.4 },
  { id: 'los-angeles', name: 'Los Angeles, USA', lat: 34.1, psh: 5.8 },
  { id: 'denver', name: 'Denver, USA', lat: 39.7, psh: 5.6 },
  { id: 'dallas', name: 'Dallas, USA', lat: 32.8, psh: 5.3 },
  { id: 'miami', name: 'Miami, USA', lat: 25.8, psh: 5.3 },
  { id: 'atlanta', name: 'Atlanta, USA', lat: 33.7, psh: 5.0 },
  { id: 'new-york', name: 'New York, USA', lat: 40.7, psh: 4.6 },
  { id: 'chicago', name: 'Chicago, USA', lat: 41.9, psh: 4.5 },
  { id: 'boston', name: 'Boston, USA', lat: 42.4, psh: 4.6 },
  { id: 'seattle', name: 'Seattle, USA', lat: 47.6, psh: 3.9 },
  { id: 'anchorage', name: 'Anchorage, USA', lat: 61.2, psh: 2.9 },
  { id: 'toronto', name: 'Toronto, Canada', lat: 43.7, psh: 4.3 },
  { id: 'vancouver', name: 'Vancouver, Canada', lat: 49.3, psh: 3.8 },
  { id: 'mexico-city', name: 'Mexico City, Mexico', lat: 19.4, psh: 5.6 },
  { id: 'london', name: 'London, UK', lat: 51.5, psh: 2.9 },
  { id: 'berlin', name: 'Berlin, Germany', lat: 52.5, psh: 3.0 },
  { id: 'paris', name: 'Paris, France', lat: 48.9, psh: 3.4 },
  { id: 'madrid', name: 'Madrid, Spain', lat: 40.4, psh: 5.2 },
  { id: 'rome', name: 'Rome, Italy', lat: 41.9, psh: 4.8 },
  { id: 'athens', name: 'Athens, Greece', lat: 38.0, psh: 5.1 },
  { id: 'dubai', name: 'Dubai, UAE', lat: 25.2, psh: 6.1 },
  { id: 'cairo', name: 'Cairo, Egypt', lat: 30.0, psh: 6.0 },
  { id: 'nairobi', name: 'Nairobi, Kenya', lat: -1.3, psh: 5.6 },
  { id: 'mombasa', name: 'Mombasa, Kenya', lat: -4.0, psh: 5.5 },
  { id: 'lagos', name: 'Lagos, Nigeria', lat: 6.5, psh: 4.6 },
  { id: 'accra', name: 'Accra, Ghana', lat: 5.6, psh: 4.8 },
  { id: 'johannesburg', name: 'Johannesburg, South Africa', lat: -26.2, psh: 6.0 },
  { id: 'cape-town', name: 'Cape Town, South Africa', lat: -33.9, psh: 5.6 },
  { id: 'mumbai', name: 'Mumbai, India', lat: 19.1, psh: 5.2 },
  { id: 'delhi', name: 'New Delhi, India', lat: 28.6, psh: 5.4 },
  { id: 'singapore', name: 'Singapore', lat: 1.4, psh: 4.4 },
  { id: 'tokyo', name: 'Tokyo, Japan', lat: 35.7, psh: 4.0 },
  { id: 'sydney', name: 'Sydney, Australia', lat: -33.9, psh: 5.0 },
  { id: 'perth', name: 'Perth, Australia', lat: -32.0, psh: 5.9 },
  { id: 'sao-paulo', name: 'São Paulo, Brazil', lat: -23.6, psh: 4.8 },
  { id: 'santiago', name: 'Santiago, Chile', lat: -33.4, psh: 5.7 }
]

export const cityOptions = cities.map(c => ({ value: c.id, label: c.name }))
export const getCity = id => cities.find(c => c.id === id) || cities[0]

// Copper wire by AWG: cross-section (mm²) and 75°C ampacity (NEC Table 310.16)
export const awgTable = [
  { awg: '14', mm2: 2.08, amps: 20 },
  { awg: '12', mm2: 3.31, amps: 25 },
  { awg: '10', mm2: 5.26, amps: 35 },
  { awg: '8', mm2: 8.37, amps: 50 },
  { awg: '6', mm2: 13.3, amps: 65 },
  { awg: '4', mm2: 21.2, amps: 85 },
  { awg: '3', mm2: 26.7, amps: 100 },
  { awg: '2', mm2: 33.6, amps: 115 },
  { awg: '1', mm2: 42.4, amps: 130 },
  { awg: '1/0', mm2: 53.5, amps: 150 },
  { awg: '2/0', mm2: 67.4, amps: 175 },
  { awg: '3/0', mm2: 85.0, amps: 200 },
  { awg: '4/0', mm2: 107.2, amps: 230 }
]

export const awgOptions = awgTable.map(w => ({ value: w.awg, label: `${w.awg} AWG` }))
export const getAwg = awg => awgTable.find(w => w.awg === awg) || awgTable[0]

export const metricSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]

// Resistivity in Ω·mm²/m at ~20°C
export const resistivity = { copper: 0.0172, aluminum: 0.0282 }
export const materialOptions = [
  { value: 'copper', label: 'Copper' },
  { value: 'aluminum', label: 'Aluminum' }
]

// Standard overcurrent device ratings (A), NEC 240.6
export const standardBreakers = [1, 2, 3, 5, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200, 225, 250, 300, 350, 400]

export const nextStandard = (amps, sizes = standardBreakers) => sizes.find(s => s >= amps) ?? null

export const systemVoltageOptions = [
  { value: 12, label: '12V' },
  { value: 24, label: '24V' },
  { value: 48, label: '48V' }
]

export const chemistries = {
  lifepo4: { label: 'LiFePO4', dod: 0.9, rte: 0.95 },
  nmc: { label: 'Li-ion NMC', dod: 0.85, rte: 0.92 },
  agm: { label: 'AGM', dod: 0.5, rte: 0.82 },
  flooded: { label: 'Flooded lead-acid', dod: 0.5, rte: 0.8 }
}

export const chemistryOptions = Object.entries(chemistries).map(([value, c]) => ({ value, label: c.label }))
