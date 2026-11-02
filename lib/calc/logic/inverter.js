// lib/calc/logic/inverter.js
import { awgTable, chemistries, chemistryOptions, nextStandard, systemVoltageOptions } from '../data'

const inverterSizes = [300, 600, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000]
const gridTieSizes = [3, 3.8, 5, 6, 7.6, 8, 10, 11.4, 12, 15, 20, 25, 30, 36, 50, 60, 100]

export const inverterCalcs = [
  {
    slug: 'inverter-pv-compatibility',
    code: 'IN-01',
    category: 'inverter',
    name: 'Inverter vs Solar Panel Wattage Compatibility Checker',
    inputs: [
      { id: 'ac', label: 'Inverter AC rating', type: 'number', unit: 'W', default: 5000, min: 100, max: 1000000, step: 100 },
      { id: 'maxDc', label: 'Max PV input (datasheet)', type: 'number', unit: 'W', default: 6500, min: 100, max: 1500000, step: 100 },
      { id: 'panelW', label: 'Panel rating', type: 'number', unit: 'W', default: 400, min: 5, max: 1000, step: 5 },
      { id: 'panels', label: 'Number of panels', type: 'number', unit: 'pcs', default: 15, min: 1, max: 5000, step: 1 }
    ],
    compute: ({ ac, maxDc, panelW, panels }) => {
      const dc = panelW * panels
      const ratio = dc / ac
      let status
      if (dc > maxDc) status = { level: 'bad', text: `Array exceeds the ${maxDc}W max PV input` }
      else if (ratio < 0.9) status = { level: 'warn', text: 'Array is small for this inverter: it will run below its sweet spot' }
      else if (ratio <= 1.3) status = { level: 'ok', text: 'Compatible: ideal DC/AC ratio' }
      else status = { level: 'warn', text: 'Compatible, but expect some midday clipping' }
      return {
        primary: { label: 'DC/AC ratio', value: ratio, unit: '', digits: 2 },
        readouts: [
          { label: 'Array size', value: dc, unit: 'W', digits: 0 },
          { label: 'Headroom to max PV', value: maxDc - dc, unit: 'W', digits: 0 },
          { label: 'Max panels allowed', value: Math.floor(maxDc / panelW), unit: 'pcs', digits: 0 },
          { label: 'Est. clipping loss', value: Math.max(0, (ratio - 1.25) * 12), unit: '%', digits: 1 }
        ],
        status,
        meter: { label: 'DC/AC ratio (ideal 1.1–1.3)', value: Math.min(ratio / 1.6, 1), text: ratio.toFixed(2) }
      }
    }
  },
  {
    slug: 'pv-string-voltage',
    code: 'IN-02',
    category: 'inverter',
    name: 'Solar String Voltage Calculator (Inverter DC Input)',
    inputs: [
      { id: 'voc', label: 'Panel Voc', type: 'number', unit: 'V', default: 37.5, min: 1, max: 100, step: 0.1 },
      { id: 'vmp', label: 'Panel Vmp', type: 'number', unit: 'V', default: 31.2, min: 1, max: 100, step: 0.1 },
      { id: 'coef', label: 'Voc temp. coefficient', type: 'number', unit: '%/°C', default: -0.27, min: -1, max: 0, step: 0.01 },
      { id: 'n', label: 'Panels per string', type: 'number', unit: 'pcs', default: 10, min: 1, max: 40, step: 1 },
      { id: 'tmin', label: 'Record low temperature', type: 'number', unit: '°C', default: -10, min: -50, max: 30, step: 1 },
      { id: 'maxV', label: 'Inverter max DC voltage', type: 'number', unit: 'V', default: 500, min: 50, max: 1500, step: 10 },
      { id: 'mpptMin', label: 'MPPT range min', type: 'number', unit: 'V', default: 120, min: 10, max: 1000, step: 5 },
      { id: 'mpptMax', label: 'MPPT range max', type: 'number', unit: 'V', default: 450, min: 20, max: 1500, step: 5 }
    ],
    compute: ({ voc, vmp, coef, n, tmin, maxV, mpptMin, mpptMax }) => {
      const vocCold = voc * (1 + (coef / 100) * (tmin - 25))
      // Hot cells (~70°C) pull Vmp down; Vmp coefficient is usually ~1.3× the Voc one
      const vmpHot = vmp * (1 + ((coef * 1.3) / 100) * (70 - 25))
      const stringCold = vocCold * n
      const stringHot = vmpHot * n
      let status
      if (stringCold > maxV) status = { level: 'bad', text: 'Cold-morning voltage exceeds the inverter limit: remove panels' }
      else if (stringHot < mpptMin) status = { level: 'bad', text: 'Hot-day voltage falls below the MPPT range: add panels' }
      else if (vmp * n > mpptMax) status = { level: 'warn', text: 'Operating voltage is above the MPPT window' }
      else status = { level: 'ok', text: 'String voltage is within inverter limits' }
      return {
        primary: { label: 'Max string Voc (cold)', value: stringCold, unit: 'V', digits: 0 },
        readouts: [
          { label: 'Min string Vmp (hot)', value: stringHot, unit: 'V', digits: 0 },
          { label: 'Max panels per string', value: Math.floor(maxV / vocCold), unit: 'pcs', digits: 0 },
          { label: 'Min panels per string', value: Math.ceil(mpptMin / vmpHot), unit: 'pcs', digits: 0 },
          { label: 'Panel Voc at low temp', value: vocCold, unit: 'V', digits: 1 }
        ],
        status
      }
    }
  },
  {
    slug: 'pure-sine-vs-modified-sine',
    code: 'IN-03',
    category: 'inverter',
    name: 'Pure Sine vs Modified Sine Inverter Compatibility Checker',
    inputs: [
      {
        id: 'device', label: 'Device', type: 'select', default: 'fridge', options: [
          { value: 'cpap', label: 'CPAP / medical' },
          { value: 'fridge', label: 'Fridge / freezer' },
          { value: 'microwave', label: 'Microwave' },
          { value: 'vsd', label: 'Variable-speed tool / induction hob' },
          { value: 'audio', label: 'Audio / hi-fi' },
          { value: 'printer', label: 'Laser printer' },
          { value: 'toolcharger', label: 'Cordless tool charger' },
          { value: 'clock', label: 'Clocks / timers' },
          { value: 'fan', label: 'Fan / pump' },
          { value: 'tv', label: 'TV / monitor' },
          { value: 'laptop', label: 'Laptop / phone charger' },
          { value: 'heater', label: 'Kettle / heater / incandescent' }
        ]
      },
      { id: 'watts', label: 'Device power', type: 'number', unit: 'W', default: 150, min: 1, max: 5000, step: 1 }
    ],
    compute: ({ device, watts }) => {
      // [verdict level, verdict, extra losses on modified sine, issue]
      const table = {
        cpap: ['bad', 'PURE SINE REQUIRED', 0.2, 'Humidifiers and power supplies may fault or fail'],
        fridge: ['bad', 'PURE SINE REQUIRED', 0.2, 'Compressor runs hotter, louder and less efficiently'],
        microwave: ['warn', 'PURE SINE STRONGLY ADVISED', 0.3, 'Reduced cooking power and loud buzzing'],
        vsd: ['bad', 'PURE SINE REQUIRED', 0.25, 'Speed controls may not work or may be damaged'],
        audio: ['warn', 'PURE SINE ADVISED', 0.1, 'Audible hum and buzz in speakers'],
        printer: ['bad', 'PURE SINE REQUIRED', 0.15, 'Fuser heaters and controllers can be damaged'],
        toolcharger: ['warn', 'PURE SINE ADVISED', 0.15, 'Some chargers overheat or refuse to charge'],
        clock: ['warn', 'PURE SINE ADVISED', 0.05, 'Clocks can run fast or slow'],
        fan: ['warn', 'PURE SINE ADVISED', 0.2, 'Motor runs ~20% hotter and noisier'],
        tv: ['ok', 'MODIFIED SINE USUALLY OK', 0.1, 'Some sets show lines or buzz faintly'],
        laptop: ['ok', 'MODIFIED SINE OK', 0.05, 'Charger may run slightly warmer'],
        heater: ['ok', 'MODIFIED SINE OK', 0, 'Resistive loads are not waveform-sensitive']
      }
      const [level, verdict, penalty, issue] = table[device]
      return {
        primary: { label: 'Verdict', value: verdict },
        readouts: [
          { label: 'Extra losses on modified sine', value: penalty * 100, unit: '%', digits: 0 },
          { label: 'Wasted power', value: watts * penalty, unit: 'W', digits: 0 },
          { label: 'Pure sine size needed', value: nextStandard(watts * 1.25, inverterSizes) ?? watts * 1.25, unit: 'W', digits: 0 }
        ],
        status: { level, text: issue }
      }
    }
  },
  {
    slug: 'inverter-efficiency-loss',
    code: 'IN-04',
    category: 'inverter',
    name: 'Inverter Efficiency Loss Calculator',
    inputs: [
      { id: 'load', label: 'Average AC load', type: 'number', unit: 'W', default: 500, min: 1, max: 100000, step: 1 },
      { id: 'hours', label: 'Hours powering loads', type: 'range', unit: 'h/day', default: 8, min: 0, max: 24, step: 0.5 },
      { id: 'eff', label: 'Inverter efficiency', type: 'range', unit: '%', default: 92, min: 75, max: 99, step: 0.5 },
      { id: 'idle', label: 'No-load (idle) draw', type: 'number', unit: 'W', default: 25, min: 0, max: 500, step: 1 },
      { id: 'price', label: 'Energy cost', type: 'number', unit: '$/kWh', default: 0.16, min: 0, max: 2, step: 0.01 }
    ],
    compute: ({ load, hours, eff, idle, price }) => {
      const conversion = load * hours * (100 / eff - 1)
      const standby = idle * (24 - hours)
      const dailyWh = conversion + standby
      return {
        primary: { label: 'Energy lost per year', value: (dailyWh * 365) / 1000, unit: 'kWh', digits: 0 },
        readouts: [
          { label: 'Conversion loss / day', value: conversion, unit: 'Wh', digits: 0 },
          { label: 'Idle loss / day', value: standby, unit: 'Wh', digits: 0 },
          { label: 'Cost per year', value: ((dailyWh * 365) / 1000) * price, unit: '$', digits: 0 },
          { label: 'Share of energy used', value: (dailyWh / (load * hours + dailyWh || 1)) * 100, unit: '%', digits: 1 }
        ]
      }
    }
  },
  {
    slug: 'inverters-in-parallel',
    code: 'IN-05',
    category: 'inverter',
    name: 'Inverter Parallel Operation Calculator',
    inputs: [
      { id: 'rating', label: 'Rating per inverter', type: 'number', unit: 'W', default: 5000, min: 100, max: 100000, step: 100 },
      { id: 'units', label: 'Number of inverters', type: 'number', unit: 'pcs', default: 3, min: 1, max: 12, step: 1 },
      { id: 'derate', label: 'Load-sharing derate', type: 'range', unit: '%', default: 5, min: 0, max: 15, step: 1 },
      { id: 'surge', label: 'Surge multiplier', type: 'range', unit: '×', default: 2, min: 1, max: 3, step: 0.1 },
      { id: 'redundant', label: 'Redundancy', type: 'select', default: 'none', options: [{ value: 'none', label: 'None' }, { value: 'n1', label: 'N+1' }] }
    ],
    compute: ({ rating, units, derate, surge, redundant }) => {
      const active = redundant === 'n1' ? units - 1 : units
      const usable = rating * Math.max(active, 0) * (1 - derate / 100)
      return {
        primary: { label: 'Usable continuous power', value: usable / 1000, unit: 'kW', digits: 1 },
        readouts: [
          { label: 'Nameplate total', value: (rating * units) / 1000, unit: 'kW', digits: 1 },
          { label: 'Combined surge', value: (usable * surge) / 1000, unit: 'kW', digits: 1 },
          { label: 'Units carrying load', value: Math.max(active, 0), unit: 'pcs', digits: 0 }
        ],
        status: redundant === 'n1' && units < 2 ? { level: 'bad', text: 'N+1 needs at least 2 inverters' } : { level: 'ok', text: 'Use identical models and firmware for parallel operation' }
      }
    }
  },
  {
    slug: 'grid-tie-inverter-sizing',
    code: 'IN-06',
    category: 'inverter',
    name: 'Grid-Tied Inverter Sizing Calculator',
    inputs: [
      { id: 'kwp', label: 'Solar array size', type: 'number', unit: 'kWp', default: 8, min: 0.1, max: 10000, step: 0.1 },
      { id: 'ratio', label: 'Target DC/AC ratio', type: 'range', unit: '', default: 1.2, min: 1, max: 1.5, step: 0.05 },
      {
        id: 'climate', label: 'Climate', type: 'select', default: 'mixed', options: [
          { value: 'sunny', label: 'Hot & sunny' },
          { value: 'mixed', label: 'Mixed' },
          { value: 'cloudy', label: 'Cool & cloudy' }
        ]
      }
    ],
    compute: ({ kwp, ratio, climate }) => {
      const target = kwp / ratio
      const size = nextStandard(target, gridTieSizes) ?? Math.ceil(target)
      const actual = kwp / size
      // Clipping starts at lower ratios in sunny climates, where panels hit full power more often
      const threshold = { sunny: 1.15, mixed: 1.25, cloudy: 1.35 }[climate]
      const clip = Math.max(0, (actual - threshold) * 12)
      return {
        primary: { label: 'Inverter size', value: size, unit: 'kW AC', digits: 1 },
        readouts: [
          { label: 'Exact target', value: target, unit: 'kW', digits: 2 },
          { label: 'Actual DC/AC ratio', value: actual, unit: '', digits: 2 },
          { label: 'Est. clipping loss', value: clip, unit: '%', digits: 1 }
        ],
        status: clip > 3 ? { level: 'warn', text: 'Noticeable clipping: consider the next size up' } : { level: 'ok', text: 'Good match for this climate' }
      }
    }
  },
  {
    slug: 'hybrid-inverter-sizing',
    code: 'IN-07',
    category: 'inverter',
    name: 'Hybrid Inverter Capacity Calculator',
    inputs: [
      { id: 'cont', label: 'Continuous load', type: 'number', unit: 'W', default: 3500, min: 10, max: 100000, step: 10 },
      { id: 'peak', label: 'Largest motor / startup load', type: 'number', unit: 'W', default: 1500, min: 0, max: 100000, step: 10 },
      { id: 'pv', label: 'Solar array', type: 'number', unit: 'W', default: 6000, min: 0, max: 200000, step: 100 },
      { id: 'v', label: 'Battery voltage', type: 'select', default: 48, options: systemVoltageOptions },
      { id: 'kwh', label: 'Battery capacity', type: 'number', unit: 'kWh', default: 10, min: 0.5, max: 10000, step: 0.5 }
    ],
    compute: ({ cont, peak, pv, v, kwh }) => {
      const needed = Math.max(cont * 1.25, pv / 1.3)
      const size = nextStandard(needed, inverterSizes) ?? Math.ceil(needed)
      const surge = cont + peak * 3
      const dcAmps = size / v / 0.92
      const cRate = (dcAmps * v) / 1000 / kwh
      return {
        primary: { label: 'Hybrid inverter', value: size / 1000, unit: 'kW', digits: 1 },
        readouts: [
          { label: 'Surge rating needed', value: surge, unit: 'W', digits: 0 },
          { label: 'Min. PV input', value: pv, unit: 'W', digits: 0 },
          { label: 'Battery current at full load', value: dcAmps, unit: 'A', digits: 0 },
          { label: 'Battery C-rate', value: cRate, unit: 'C', digits: 2 }
        ],
        status: cRate > 0.5 ? { level: 'warn', text: 'Battery is small for this inverter: add capacity or check its max discharge current' } : { level: 'ok', text: 'Battery can deliver full inverter power' }
      }
    }
  },
  {
    slug: 'inverter-battery-matching',
    code: 'IN-08',
    category: 'inverter',
    name: 'Inverter to Battery Matching Calculator',
    inputs: [
      { id: 'w', label: 'Inverter rating', type: 'number', unit: 'W', default: 3000, min: 100, max: 50000, step: 100 },
      { id: 'load', label: 'Typical load', type: 'number', unit: 'W', default: 1200, min: 1, max: 50000, step: 10 },
      { id: 'hours', label: 'Runtime wanted', type: 'number', unit: 'h', default: 5, min: 0.5, max: 200, step: 0.5 },
      { id: 'v', label: 'Battery voltage', type: 'select', default: 24, options: systemVoltageOptions },
      { id: 'chem', label: 'Chemistry', type: 'select', default: 'lifepo4', options: chemistryOptions }
    ],
    compute: ({ w, load, hours, v, chem }) => {
      const maxAmps = w / v / 0.9
      const fuse = nextStandard(maxAmps * 1.25)
      const cable = awgTable.find(c => c.amps >= maxAmps * 1.25)
      const ah = (load * hours) / (v * 0.9 * chemistries[chem].dod)
      return {
        primary: { label: 'Battery capacity needed', value: ah, unit: 'Ah', digits: 0 },
        readouts: [
          { label: 'Max DC current', value: maxAmps, unit: 'A', digits: 0 },
          { label: 'Fuse / breaker', value: fuse ?? '>400', unit: 'A', digits: 0 },
          { label: 'Min. cable', value: cable ? `${cable.awg} AWG` : 'Parallel runs' },
          { label: 'Min. BMS rating', value: maxAmps, unit: 'A', digits: 0 }
        ],
        status: maxAmps > 200 ? { level: 'warn', text: 'Very high DC current: a higher battery voltage would be safer' } : { level: 'ok', text: 'Keep battery cables short to limit voltage drop' }
      }
    }
  },
  {
    slug: 'inverter-oversizing',
    code: 'IN-09',
    category: 'inverter',
    name: 'Inverter Oversizing vs Undersizing Calculator',
    inputs: [
      { id: 'load', label: 'Continuous load', type: 'number', unit: 'W', default: 1200, min: 1, max: 100000, step: 10 },
      { id: 'surgeLoad', label: 'Startup surge', type: 'number', unit: 'W', default: 2400, min: 0, max: 200000, step: 10 },
      { id: 'rating', label: 'Inverter rating', type: 'number', unit: 'W', default: 3000, min: 100, max: 100000, step: 100 },
      { id: 'mult', label: 'Inverter surge multiplier', type: 'range', unit: '×', default: 2, min: 1, max: 3, step: 0.1 },
      { id: 'idle', label: 'Idle draw', type: 'number', unit: 'W', default: 30, min: 0, max: 500, step: 1 }
    ],
    compute: ({ load, surgeLoad, rating, mult, idle }) => {
      const util = load / rating
      let status
      if (load > rating) status = { level: 'bad', text: 'Undersized: the inverter will overload' }
      else if (surgeLoad > rating * mult) status = { level: 'bad', text: 'Surge exceeds inverter capability: motors may not start' }
      else if (util < 0.3) status = { level: 'warn', text: 'Oversized: higher idle losses and lower efficiency at light load' }
      else if (util > 0.8) status = { level: 'warn', text: 'Tight: little headroom for added loads' }
      else status = { level: 'ok', text: 'Well sized' }
      return {
        primary: { label: 'Utilisation', value: util * 100, unit: '%', digits: 0 },
        readouts: [
          { label: 'Headroom', value: rating - load, unit: 'W', digits: 0 },
          { label: 'Surge capacity', value: rating * mult, unit: 'W', digits: 0 },
          { label: 'Idle energy / year', value: (idle * 24 * 365) / 1000, unit: 'kWh', digits: 0 },
          { label: 'Ideal rating', value: nextStandard(Math.max(load / 0.7, surgeLoad / mult), inverterSizes) ?? load / 0.7, unit: 'W', digits: 0 }
        ],
        status,
        meter: { label: 'Load vs rating', value: Math.min(util, 1), text: `${Math.round(util * 100)}%` }
      }
    }
  }
]
