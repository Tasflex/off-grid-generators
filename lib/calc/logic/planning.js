// lib/calc/logic/planning.js
// The original hand-built calculators, rebuilt on the device engine. Formulas and product matching
// are unchanged from the previous pages so results stay the same at the same URLs.
import { calculateACLoad, calculateChargeControllerSize, calculateSolarPanelLayout } from '../../calculators'
import { getProductById, getProductsByCategory } from '../../products'
import { systemVoltageOptions } from '../data'

const powerStations = () => [...getProductsByCategory('solarGenerators'), ...getProductsByCategory('portablePowerStations')]
const byIds = ids => ids.map(getProductById).filter(Boolean)

const applianceLibrary = [
  { name: 'Refrigerator', watts: 150, surge: 600, hours: 24 },
  { name: 'Freezer', watts: 100, surge: 400, hours: 24 },
  { name: 'Well pump', watts: 750, surge: 2250, hours: 2 },
  { name: 'Wi-Fi router', watts: 20, surge: 20, hours: 24 },
  { name: 'CPAP machine', watts: 60, surge: 60, hours: 8 },
  { name: 'LED lighting', watts: 30, surge: 30, hours: 5 },
  { name: 'LED TV', watts: 100, surge: 100, hours: 4 },
  { name: 'Laptop charger', watts: 65, surge: 65, hours: 4 },
  { name: 'Phone charger', watts: 10, surge: 10, hours: 2 },
  { name: 'Microwave', watts: 1000, surge: 1500, hours: 0.5 },
  { name: 'Coffee maker', watts: 800, surge: 800, hours: 0.5 },
  { name: 'Portable AC', watts: 500, surge: 1500, hours: 6 },
  { name: 'Ceiling fans', watts: 75, surge: 150, hours: 8 },
  { name: 'Washing machine', watts: 500, surge: 1500, hours: 1 },
  { name: 'Dishwasher', watts: 1200, surge: 1800, hours: 1 },
  { name: 'Space heater', watts: 1500, surge: 1500, hours: 3 },
  { name: 'Water heater', watts: 3000, surge: 3000, hours: 2 },
  { name: 'Garage door opener', watts: 500, surge: 1500, hours: 0.5 },
  { name: 'Sump pump', watts: 800, surge: 2400, hours: 1 }
]

const rows = names => names.map(n => {
  const a = applianceLibrary.find(x => x.name === n)
  return { name: a.name, watts: a.watts, surge: a.surge, qty: 1, hours: a.hours }
})

export const planningCalcs = [
  {
    slug: 'solar-sizing',
    code: 'SB-06',
    category: 'builder',
    name: 'Solar Generator Sizing Calculator',
    inputs: [
      {
        id: 'loads', label: 'Appliances', type: 'loads', library: applianceLibrary,
        default: rows(['Refrigerator', 'Freezer', 'LED lighting', 'Wi-Fi router', 'Phone charger', 'LED TV']),
        presets: [
          { label: 'Camping', rows: rows(['LED lighting', 'Phone charger', 'Wi-Fi router']) },
          { label: 'Van life', rows: rows(['Refrigerator', 'LED lighting', 'Laptop charger', 'Phone charger', 'Wi-Fi router']) },
          { label: 'Home emergency', rows: rows(['Refrigerator', 'Freezer', 'LED lighting', 'Wi-Fi router', 'Phone charger', 'LED TV']) },
          { label: 'Medical', rows: rows(['CPAP machine', 'Phone charger', 'Wi-Fi router', 'LED lighting']) },
          { label: 'Full off-grid', rows: rows(['Refrigerator', 'Freezer', 'Well pump', 'LED lighting', 'Laptop charger', 'Phone charger', 'Wi-Fi router', 'LED TV']) }
        ]
      }
    ],
    compute: ({ loads }) => {
      const totalWh = loads.reduce((s, l) => s + (l.watts || 0) * (l.qty || 0) * (l.hours || 0), 0)
      // 85% depth of discharge, 90% inverter efficiency
      const required = totalWh / (0.85 * 0.9)
      const peak = loads.reduce((s, l) => s + (l.watts || 0) * (l.qty || 0), 0)
      const all = powerStations()
      const products = required < 500 ? all.filter(p => p.capacity < 500)
        : required < 1500 ? all.filter(p => p.capacity >= 500 && p.capacity < 1500)
        : required < 3000 ? all.filter(p => p.capacity >= 1500 && p.capacity < 3000)
        : all.filter(p => p.capacity >= 3000)
      return {
        primary: { label: 'Battery capacity needed', value: required, unit: 'Wh', digits: 0 },
        readouts: [
          { label: 'Daily energy use', value: totalWh, unit: 'Wh', digits: 0 },
          { label: 'With 20% margin', value: required * 1.2, unit: 'Wh', digits: 0 },
          { label: 'Peak load (all on)', value: peak, unit: 'W', digits: 0 },
          { label: 'Solar to recharge in 5 h', value: required / (5 * 0.8), unit: 'W', digits: 0 }
        ],
        status: required > 3600 ? { level: 'warn', text: 'Above most single power stations: consider an expandable system' } : { level: 'ok', text: 'A single power station can cover this' },
        products: products.slice(0, 3)
      }
    }
  },
  {
    slug: 'off-grid-budget',
    code: 'SB-07',
    category: 'builder',
    name: 'Off-Grid Budget Calculator',
    inputs: [
      {
        id: 'daily', label: 'Daily energy use', type: 'number', unit: 'Wh', default: 3000, min: 100, max: 100000, step: 100,
        presets: [
          { label: 'Minimal', value: 500 },
          { label: 'Camping', value: 1500 },
          { label: 'Van life', value: 3000 },
          { label: 'Home backup', value: 5000 },
          { label: 'Off-grid home', value: 10000 }
        ]
      },
      { id: 'days', label: 'Days of backup', type: 'range', unit: 'days', default: 3, min: 1, max: 14, step: 1 },
      {
        id: 'type', label: 'System type', type: 'select', default: 'home', options: [
          { value: 'camping', label: 'Camping' },
          { value: 'vanlife', label: 'Van life' },
          { value: 'home', label: 'Home backup' }
        ]
      }
    ],
    compute: ({ daily, days, type }) => {
      const total = daily * days
      const battery = total * 0.5
      const solar = total * 0.3
      const inverter = type === 'home' ? 800 : type === 'vanlife' ? 500 : 300
      const install = type === 'home' ? total * 0.1 : 0
      const cost = battery + solar + inverter + install
      const all = powerStations()
      const fits = type === 'camping' ? all.filter(p => p.capacity < 1000 && p.weight < 20)
        : type === 'vanlife' ? all.filter(p => p.capacity >= 500 && p.capacity < 3000 && p.weight < 50)
        : all.filter(p => p.capacity >= 1000)
      return {
        primary: { label: 'Estimated system cost', value: cost, unit: 'USD', digits: 0 },
        readouts: [
          { label: 'Storage needed', value: total, unit: 'Wh', digits: 0 },
          { label: 'Batteries', value: battery, unit: '$', digits: 0 },
          { label: 'Solar panels', value: solar, unit: '$', digits: 0 },
          { label: 'Inverter', value: inverter, unit: '$', digits: 0 },
          { label: 'Installation', value: install, unit: '$', digits: 0 },
          { label: 'Est. monthly savings', value: (type === 'home' ? 5 : type === 'vanlife' ? 8 : 3) * 30, unit: '$', digits: 0 }
        ],
        bars: [
          { label: 'BATTERY', value: battery / cost },
          { label: 'SOLAR', value: solar / cost },
          { label: 'INVERTER', value: inverter / cost },
          { label: 'INSTALL', value: install / cost }
        ],
        products: [...fits].sort((a, b) => Math.abs(a.capacity - total) - Math.abs(b.capacity - total)).slice(0, 3)
      }
    }
  },
  {
    slug: 'battery-runtime',
    code: 'BT-11',
    category: 'battery',
    name: 'Battery Runtime Calculator',
    inputs: [
      {
        id: 'wh', label: 'Battery capacity', type: 'number', unit: 'Wh', default: 2000, min: 10, max: 100000, step: 10,
        presets: [
          { label: 'Explorer 300', value: 293 },
          { label: 'River 2', value: 256 },
          { label: 'Explorer 1000', value: 1002 },
          { label: 'Delta 2', value: 1024 },
          { label: 'AC200MAX', value: 2048 },
          { label: 'Delta Pro', value: 3600 }
        ]
      },
      {
        id: 'watts', label: 'Device power', type: 'number', unit: 'W', default: 100, min: 1, max: 20000, step: 1,
        presets: [
          { label: 'Phone', value: 10 },
          { label: 'CPAP', value: 60 },
          { label: 'Laptop', value: 65 },
          { label: 'TV', value: 100 },
          { label: 'Fridge', value: 150 },
          { label: 'Microwave', value: 1000 }
        ]
      }
    ],
    compute: ({ wh, watts }) => {
      const usable = wh * 0.85
      const hours = usable / watts
      return {
        primary: { label: 'Runtime', value: hours, unit: 'hours', digits: 1 },
        readouts: [
          { label: 'In minutes', value: hours * 60, unit: 'min', digits: 0 },
          { label: 'Usable capacity', value: usable, unit: 'Wh', digits: 0 },
          { label: 'Nights (8 h)', value: Math.floor(hours / 8), unit: '', digits: 0 },
          { label: 'In days', value: hours / 24, unit: 'days', digits: 1 }
        ],
        products: powerStations().filter(p => p.capacity >= wh * 0.8).sort((a, b) => a.capacity - b.capacity).slice(0, 3)
      }
    }
  },
  {
    slug: 'charge-time',
    code: 'BT-12',
    category: 'battery',
    name: 'Solar Generator Charge Time Calculator',
    inputs: [
      {
        id: 'wh', label: 'Battery capacity', type: 'number', unit: 'Wh', default: 2000, min: 10, max: 100000, step: 10,
        presets: [{ label: '300 Wh', value: 300 }, { label: '1 kWh', value: 1000 }, { label: '2 kWh', value: 2000 }, { label: '3.6 kWh', value: 3600 }]
      },
      {
        id: 'method', label: 'Charging from', type: 'select', default: 'solar', options: [
          { value: 'solar', label: 'Solar' },
          { value: 'ac', label: 'Wall outlet' },
          { value: 'car', label: 'Car (100W)' }
        ]
      },
      {
        id: 'watts', label: 'Solar panels or AC charger input', type: 'number', unit: 'W', default: 200, min: 10, max: 10000, step: 10,
        presets: [{ label: '100W', value: 100 }, { label: '200W', value: 200 }, { label: '400W', value: 400 }, { label: '800W', value: 800 }, { label: '1500W AC', value: 1500 }]
      }
    ],
    compute: ({ wh, method, watts }) => {
      // 85% charging efficiency; car outlets are limited to ~100W
      const effective = (method === 'car' ? 100 : watts) * 0.85
      const hours = wh / effective
      return {
        primary: { label: 'Full charge time', value: hours, unit: 'hours', digits: 1 },
        readouts: [
          { label: 'Effective input', value: effective, unit: 'W', digits: 0 },
          { label: 'Charge per hour', value: (effective / wh) * 100, unit: '%', digits: 0 },
          { label: method === 'solar' ? 'Sunny days (5 sun-h)' : 'In minutes', value: method === 'solar' ? hours / 5 : hours * 60, unit: method === 'solar' ? 'days' : 'min', digits: method === 'solar' ? 1 : 0 }
        ],
        status: method === 'car' ? { level: 'warn', text: 'Car outlets are slow: best for topping up while driving' } : null,
        products: [...powerStations()].sort((a, b) => Math.abs(a.capacity - wh) - Math.abs(b.capacity - wh)).slice(0, 3)
      }
    }
  },
  {
    slug: 'charge-controller-sizing',
    code: 'BT-13',
    category: 'battery',
    name: 'Charge Controller Sizing Calculator',
    inputs: [
      {
        id: 'watts', label: 'Solar array', type: 'number', unit: 'W', default: 400, min: 10, max: 20000, step: 10,
        presets: [{ label: '200W', value: 200 }, { label: '400W', value: 400 }, { label: '800W', value: 800 }, { label: '1600W', value: 1600 }]
      },
      { id: 'volts', label: 'Battery voltage', type: 'select', default: 12, options: systemVoltageOptions },
      {
        id: 'battery', label: 'Battery type', type: 'select', default: 'lithium', options: [
          { value: 'lithium', label: 'LiFePO4' },
          { value: 'leadacid', label: 'AGM / Gel' },
          { value: 'flooded', label: 'Flooded' }
        ]
      },
      { id: 'type', label: 'Controller type', type: 'select', default: 'mppt', options: [{ value: 'mppt', label: 'MPPT' }, { value: 'pwm', label: 'PWM' }] }
    ],
    compute: ({ watts, volts, battery, type }) => {
      const r = calculateChargeControllerSize(watts, volts, battery, type)
      // Match products to the recommended size (with its 25% margin), not the bare minimum
      const size = r.recommendedAmps
      let ids
      if (type === 'mppt') ids = size <= 30 ? ['renogy-mppt-30a', 'renogy-mppt-40a'] : size <= 40 ? ['renogy-mppt-40a', 'victron-mppt-100-50'] : size <= 50 ? ['victron-mppt-100-50'] : []
      else ids = size <= 30 ? ['renogy-pwm-30a'] : []
      return {
        primary: { label: 'Controller size', value: r.recommendedAmps, unit: `A ${type.toUpperCase()}`, digits: 0 },
        readouts: [
          { label: 'Array current', value: Number(r.amps), unit: 'A', digits: 1 },
          { label: 'Minimum rating', value: r.minAmps, unit: 'A', digits: 0 },
          { label: 'Max solar for this size', value: r.recommendedAmps * volts, unit: 'W', digits: 0 },
          { label: 'Charge efficiency', value: r.chargeEfficiency, unit: '%', digits: 0 }
        ],
        status: type === 'pwm' && watts / volts > 30 ? { level: 'warn', text: 'Large array on PWM: MPPT would harvest 15–30% more' } : r.recommendedAmps > 100 ? { level: 'warn', text: 'Over 100A: split the array across two controllers' } : { level: 'ok', text: 'Includes a 25% safety margin' },
        products: byIds(ids)
      }
    }
  },
  {
    slug: 'solar-panel-layout',
    code: 'PV-12',
    category: 'solar',
    name: 'Solar Panel Layout Calculator',
    inputs: [
      { id: 'daily', label: 'Daily energy use', type: 'number', unit: 'Wh', default: 2000, min: 50, max: 200000, step: 50 },
      {
        id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 5, min: 2, max: 7, step: 0.5,
        presets: [{ label: 'Arizona', value: 6.5 }, { label: 'California', value: 5.5 }, { label: 'Texas', value: 5 }, { label: 'New York', value: 3.5 }, { label: 'Seattle', value: 2.5 }]
      },
      {
        id: 'panel', label: 'Panel size', type: 'select', default: 400, options: [
          { value: 100, label: '100W' },
          { value: 200, label: '200W' },
          { value: 350, label: '350W' },
          { value: 400, label: '400W' },
          { value: 550, label: '550W' }
        ]
      },
      { id: 'roof', label: 'Available roof area', type: 'number', unit: 'm²', default: 20, min: 1, max: 10000, step: 1 }
    ],
    compute: ({ daily, psh, panel, roof }) => {
      const r = calculateSolarPanelLayout(daily, psh, panel, roof)
      // Panel footprint in m², as on the previous page
      const area = r.numberOfPanels * ({ 100: 0.6, 200: 1.1, 350: 1.7, 400: 1.9 }[panel] ?? 2.5)
      return {
        primary: { label: 'Panels needed', value: r.numberOfPanels, unit: `× ${panel}W`, digits: 0 },
        readouts: [
          { label: 'System size', value: Number(r.systemSizeKW), unit: 'kW', digits: 2 },
          { label: 'Installed', value: r.totalSystemWatts, unit: 'W', digits: 0 },
          { label: 'Roof area needed', value: area, unit: 'm²', digits: 1 },
          { label: 'Battery storage', value: r.batteryStorage, unit: 'Wh', digits: 0 },
          { label: 'Suggested wiring', value: r.arrayConfiguration.match(/\(([^)]+)\)/)[1] }
        ],
        status: area <= roof ? { level: 'ok', text: 'Fits on your roof' } : { level: 'bad', text: `Needs ${(area - roof).toFixed(1)} m² more than you have: use larger panels` },
        meter: { label: 'Roof used', value: area / roof, text: `${Math.round((area / roof) * 100)}%` }
      }
    }
  },
  {
    slug: 'inverter-sizing',
    code: 'IN-10',
    category: 'inverter',
    name: 'Inverter Sizing Calculator',
    inputs: [
      {
        id: 'loads', label: 'Devices', type: 'loads', library: applianceLibrary, columns: ['watts', 'surge', 'qty'],
        default: rows(['Refrigerator', 'Freezer', 'LED TV', 'Laptop charger', 'Microwave', 'Coffee maker', 'Ceiling fans']),
        presets: [
          { label: 'Camping', rows: rows(['Laptop charger', 'LED TV', 'Coffee maker', 'Ceiling fans']) },
          { label: 'Van life', rows: rows(['Refrigerator', 'Laptop charger', 'LED TV', 'Coffee maker', 'Ceiling fans']) },
          { label: 'Small home', rows: rows(['Refrigerator', 'Freezer', 'LED TV', 'Laptop charger', 'Microwave', 'Coffee maker', 'Ceiling fans']) },
          { label: 'Large home', rows: rows(['Refrigerator', 'Freezer', 'LED TV', 'Laptop charger', 'Microwave', 'Coffee maker', 'Portable AC', 'Washing machine', 'Dishwasher']) },
          { label: 'Workshop', rows: rows(['Garage door opener', 'Well pump', 'Sump pump', 'Space heater']) }
        ]
      }
    ],
    compute: ({ loads }) => {
      const r = calculateACLoad(loads.map(l => ({ watts: (l.watts || 0) * (l.qty || 0), surgeWatts: (l.surge || 0) * (l.qty || 0), hours: l.hours || 0 })))
      const ids = r.recommendedInverterWatts <= 800 ? ['renogy-1000w-inverter']
        : r.recommendedInverterWatts <= 1500 ? ['renogy-2000w-inverter', 'renogy-1000w-inverter']
        : ['renogy-3000w-inverter', 'ecoflow-smart-inverter']
      return {
        primary: { label: 'Inverter size', value: r.recommendedInverterWatts, unit: 'W', digits: 0 },
        readouts: [
          { label: 'Running watts', value: r.totalRunningWatts, unit: 'W', digits: 0 },
          { label: 'Surge watts', value: r.totalSurgeWatts, unit: 'W', digits: 0 },
          { label: 'Surge rating needed', value: r.recommendedSurgeWatts, unit: 'W', digits: 0 }
        ],
        status: r.recommendedInverterWatts > 3000 ? { level: 'warn', text: 'Over 3,000W: use a 24V/48V inverter or run inverters in parallel' } : { level: r.surgeSignificant ? 'warn' : 'ok', text: r.notes },
        products: byIds(ids)
      }
    }
  }
]
