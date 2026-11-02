// lib/calc/logic/battery.js
import { chemistries, chemistryOptions, systemVoltageOptions } from '../data'

export const batteryCalcs = [
  {
    slug: 'battery-capacity-for-runtime',
    code: 'BT-01',
    category: 'battery',
    name: 'Battery Capacity for Runtime Calculator',
    inputs: [
      { id: 'load', label: 'Load', type: 'number', unit: 'W', default: 300, min: 1, max: 100000, step: 1 },
      { id: 'hours', label: 'Runtime needed', type: 'number', unit: 'h', default: 8, min: 0.1, max: 500, step: 0.5 },
      { id: 'volts', label: 'Battery voltage', type: 'select', default: 12, options: systemVoltageOptions },
      { id: 'chem', label: 'Chemistry', type: 'select', default: 'lifepo4', options: chemistryOptions },
      { id: 'eff', label: 'Inverter efficiency (100 for DC loads)', type: 'range', unit: '%', default: 90, min: 70, max: 100, step: 1 }
    ],
    compute: ({ load, hours, volts, chem, eff }) => {
      const energy = (load * hours) / (eff / 100)
      const nameplate = energy / chemistries[chem].dod
      return {
        primary: { label: `Capacity at ${volts}V`, value: nameplate / volts, unit: 'Ah', digits: 0 },
        readouts: [
          { label: 'Battery energy', value: nameplate / 1000, unit: 'kWh', digits: 2 },
          { label: 'Energy drawn', value: energy / 1000, unit: 'kWh', digits: 2 },
          { label: 'Usable depth', value: chemistries[chem].dod * 100, unit: '%', digits: 0 },
          { label: 'Battery current', value: load / (eff / 100) / volts, unit: 'A', digits: 1 }
        ]
      }
    }
  },
  {
    slug: 'how-many-batteries',
    code: 'BT-02',
    category: 'battery',
    name: 'How Many Batteries Do I Need Calculator',
    inputs: [
      { id: 'load', label: 'Average load', type: 'number', unit: 'W', default: 500, min: 1, max: 100000, step: 1 },
      { id: 'hours', label: 'Hours of backup', type: 'number', unit: 'h', default: 10, min: 0.5, max: 500, step: 0.5 },
      { id: 'sysV', label: 'System voltage', type: 'select', default: 24, options: systemVoltageOptions },
      { id: 'batV', label: 'Battery voltage', type: 'select', default: 12, options: [{ value: 6, label: '6V' }, ...systemVoltageOptions] },
      { id: 'batAh', label: 'Battery capacity', type: 'number', unit: 'Ah', default: 100, min: 5, max: 1000, step: 5 },
      { id: 'dod', label: 'Depth of discharge', type: 'range', unit: '%', default: 80, min: 30, max: 100, step: 5 }
    ],
    compute: ({ load, hours, sysV, batV, batAh, dod }) => {
      if (batV > sysV || sysV % batV !== 0) {
        return {
          primary: { label: 'Total batteries', value: '—' },
          readouts: [],
          status: { level: 'bad', text: `${batV}V batteries can't be combined into a ${sysV}V bank` }
        }
      }
      const required = (load * hours) / (dod / 100) / 0.95
      const series = sysV / batV
      const strings = Math.max(1, Math.ceil(required / (sysV * batAh)))
      const bankWh = sysV * batAh * strings
      return {
        primary: { label: 'Total batteries', value: series * strings, unit: 'pcs', digits: 0 },
        readouts: [
          { label: 'In series per string', value: series, unit: 'pcs', digits: 0 },
          { label: 'Parallel strings', value: strings, unit: '', digits: 0 },
          { label: 'Bank capacity', value: bankWh / 1000, unit: 'kWh', digits: 2 },
          { label: 'Usable energy', value: (bankWh * dod) / 100 / 1000, unit: 'kWh', digits: 2 }
        ],
        status: strings > 4 ? { level: 'warn', text: 'More than 4 parallel strings: consider larger batteries or a higher voltage' } : { level: 'ok', text: `Wire as ${series}S${strings}P` }
      }
    }
  },
  {
    slug: 'battery-series-parallel',
    code: 'BT-03',
    category: 'battery',
    name: 'Battery Series vs Parallel Calculator',
    inputs: [
      { id: 'v', label: 'Battery voltage', type: 'number', unit: 'V', default: 12, min: 1, max: 100, step: 0.1 },
      { id: 'ah', label: 'Battery capacity', type: 'number', unit: 'Ah', default: 100, min: 1, max: 2000, step: 1 },
      { id: 's', label: 'Batteries in series', type: 'number', unit: 'pcs', default: 2, min: 1, max: 16, step: 1 },
      { id: 'p', label: 'Parallel strings', type: 'number', unit: '', default: 2, min: 1, max: 16, step: 1 }
    ],
    compute: ({ v, ah, s, p }) => ({
      primary: { label: `Bank (${s}S${p}P)`, value: `${+(v * s).toFixed(1)}V · ${+(ah * p).toFixed(0)}Ah` },
      readouts: [
        { label: 'Bank voltage', value: v * s, unit: 'V', digits: 1 },
        { label: 'Bank capacity', value: ah * p, unit: 'Ah', digits: 0 },
        { label: 'Stored energy', value: (v * s * ah * p) / 1000, unit: 'kWh', digits: 2 },
        { label: 'Total batteries', value: s * p, unit: 'pcs', digits: 0 }
      ],
      status: p > 4 ? { level: 'warn', text: 'Over 4 parallel strings can cause uneven current sharing' } : { level: 'ok', text: 'Use equal-length cables to each string' }
    })
  },
  {
    slug: 'lead-acid-vs-lithium-runtime',
    code: 'BT-04',
    category: 'battery',
    name: 'Lead-Acid vs Lithium Battery Runtime Calculator',
    inputs: [
      { id: 'ah', label: 'Rated capacity (20-hour)', type: 'number', unit: 'Ah', default: 100, min: 5, max: 2000, step: 5 },
      { id: 'v', label: 'Voltage', type: 'select', default: 12, options: systemVoltageOptions },
      { id: 'load', label: 'Load', type: 'number', unit: 'W', default: 150, min: 1, max: 20000, step: 1 }
    ],
    compute: ({ ah, v, load }) => {
      const amps = load / v
      // Peukert's law for lead-acid (k ≈ 1.25), discharged to 50%
      const leadHours = 20 * Math.pow(ah / (amps * 20), 1.25) * 0.5
      // LiFePO4: flat discharge curve (k ≈ 1.05), discharged to 90%
      const lithHours = 20 * Math.pow(ah / (amps * 20), 1.05) * 0.9
      return {
        primary: { label: 'Lithium runtime', value: lithHours, unit: 'h', digits: 1 },
        readouts: [
          { label: 'Lead-acid runtime', value: leadHours, unit: 'h', digits: 1 },
          { label: 'Lithium advantage', value: lithHours / leadHours, unit: '×', digits: 1 },
          { label: 'Lead-acid weight', value: ah * v * 0.025, unit: 'kg', digits: 0 },
          { label: 'Lithium weight', value: ah * v * 0.0095, unit: 'kg', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'battery-efficiency-loss',
    code: 'BT-05',
    category: 'battery',
    name: 'Battery Efficiency Loss Calculator',
    inputs: [
      { id: 'kwh', label: 'Energy taken from battery per day', type: 'number', unit: 'kWh', default: 10, min: 0.1, max: 10000, step: 0.1 },
      { id: 'chem', label: 'Chemistry', type: 'select', default: 'lifepo4', options: chemistryOptions },
      { id: 'price', label: 'Electricity cost', type: 'number', unit: '$/kWh', default: 0.16, min: 0, max: 2, step: 0.01 }
    ],
    compute: ({ kwh, chem, price }) => {
      const rte = chemistries[chem].rte
      const lossDay = kwh / rte - kwh
      return {
        primary: { label: 'Energy lost per year', value: lossDay * 365, unit: 'kWh', digits: 0 },
        readouts: [
          { label: 'Round-trip efficiency', value: rte * 100, unit: '%', digits: 0 },
          { label: 'Charge needed / day', value: kwh / rte, unit: 'kWh', digits: 2 },
          { label: 'Cost per year', value: lossDay * 365 * price, unit: '$', digits: 0 },
          { label: 'Cost over 10 years', value: lossDay * 3650 * price, unit: '$', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'battery-round-trip-efficiency',
    code: 'BT-06',
    category: 'battery',
    name: 'Battery Round-Trip Efficiency Calculator',
    inputs: [
      { id: 'in', label: 'Energy charged in', type: 'number', unit: 'kWh', default: 12, min: 0.01, max: 100000, step: 0.01 },
      { id: 'out', label: 'Energy discharged out', type: 'number', unit: 'kWh', default: 10.9, min: 0, max: 100000, step: 0.01 }
    ],
    compute: ({ in: eIn, out }) => {
      const rte = out / eIn
      return {
        primary: { label: 'Round-trip efficiency', value: rte * 100, unit: '%', digits: 1 },
        readouts: [
          { label: 'Energy lost', value: eIn - out, unit: 'kWh', digits: 2 },
          { label: 'Loss share', value: (1 - rte) * 100, unit: '%', digits: 1 },
          { label: 'One-way efficiency', value: Math.sqrt(Math.max(rte, 0)) * 100, unit: '%', digits: 1 }
        ],
        status: rte > 1 ? { level: 'bad', text: 'Out exceeds in: check your measurements' } : rte >= 0.9 ? { level: 'ok', text: 'Typical of healthy lithium' } : rte >= 0.78 ? { level: 'warn', text: 'Typical of lead-acid or aged lithium' } : { level: 'bad', text: 'Poor: check for heat, ageing or parasitic loads' },
        meter: { label: 'Efficiency', value: Math.min(rte, 1), text: `${(rte * 100).toFixed(0)}%` }
      }
    }
  },
  {
    slug: 'battery-capacity-fade',
    code: 'BT-07',
    category: 'battery',
    name: 'Battery Degradation Over Years Calculator',
    inputs: [
      { id: 'kwh', label: 'Starting capacity', type: 'number', unit: 'kWh', default: 10, min: 0.1, max: 100000, step: 0.1 },
      { id: 'chem', label: 'Chemistry', type: 'select', default: 'lifepo4', options: chemistryOptions },
      { id: 'cycles', label: 'Cycles per year', type: 'number', unit: '', default: 300, min: 0, max: 1000, step: 10 },
      { id: 'years', label: 'After', type: 'range', unit: 'years', default: 10, min: 1, max: 25, step: 1 }
    ],
    compute: ({ kwh, chem, cycles, years }) => {
      // Calendar fade per year + cycle fade per cycle (to 80% at rated cycle life)
      const model = { lifepo4: [0.01, 0.2 / 4000], nmc: [0.02, 0.2 / 1500], agm: [0.03, 0.2 / 600], flooded: [0.025, 0.2 / 1000] }[chem]
      const fadePerYear = model[0] + model[1] * cycles
      const remaining = Math.max(0, 1 - fadePerYear * years)
      return {
        primary: { label: `Capacity after ${years} yr`, value: kwh * remaining, unit: 'kWh', digits: 2 },
        readouts: [
          { label: 'Remaining', value: remaining * 100, unit: '%', digits: 0 },
          { label: 'Fade per year', value: fadePerYear * 100, unit: '%', digits: 1 },
          { label: 'Reaches 80% in', value: 0.2 / fadePerYear, unit: 'years', digits: 1 },
          { label: 'Reaches 70% in', value: 0.3 / fadePerYear, unit: 'years', digits: 1 }
        ],
        meter: { label: 'State of health', value: remaining, text: `${Math.round(remaining * 100)}% SOH` }
      }
    }
  },
  {
    slug: 'battery-bank-sizing',
    code: 'BT-08',
    category: 'battery',
    name: 'Battery Bank Sizing Calculator',
    inputs: [
      { id: 'daily', label: 'Daily energy use', type: 'number', unit: 'kWh', default: 5, min: 0.1, max: 10000, step: 0.1 },
      { id: 'days', label: 'Days of autonomy', type: 'range', unit: 'days', default: 2, min: 0.5, max: 7, step: 0.5 },
      { id: 'sysV', label: 'Bank voltage', type: 'select', default: 48, options: systemVoltageOptions },
      { id: 'dod', label: 'Depth of discharge', type: 'range', unit: '%', default: 80, min: 30, max: 100, step: 5 },
      {
        id: 'temp', label: 'Coldest battery temperature', type: 'select', default: '25', options: [
          { value: '25', label: '25°C+' },
          { value: '10', label: '10°C' },
          { value: '0', label: '0°C' },
          { value: '-10', label: '−10°C' }
        ]
      }
    ],
    compute: ({ daily, days, sysV, dod, temp }) => {
      const tempFactor = { 25: 1, 10: 1.1, 0: 1.2, '-10': 1.4 }[temp]
      const kwh = ((daily * days) / (dod / 100) / 0.9) * tempFactor
      return {
        primary: { label: 'Bank size', value: kwh, unit: 'kWh', digits: 1 },
        readouts: [
          { label: `Capacity at ${sysV}V`, value: (kwh * 1000) / sysV, unit: 'Ah', digits: 0 },
          { label: 'Usable energy', value: (kwh * dod) / 100, unit: 'kWh', digits: 1 },
          { label: '12V 100Ah equivalents', value: Math.ceil((kwh * 1000) / 1200), unit: 'pcs', digits: 0 },
          { label: 'Cold derating', value: (tempFactor - 1) * 100, unit: '%', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'battery-charging-current',
    code: 'BT-09',
    category: 'battery',
    name: 'Battery Charging Current Calculator',
    inputs: [
      { id: 'ah', label: 'Battery capacity', type: 'number', unit: 'Ah', default: 200, min: 5, max: 5000, step: 5 },
      { id: 'v', label: 'Battery voltage', type: 'select', default: 12, options: systemVoltageOptions },
      {
        id: 'chem', label: 'Chemistry', type: 'select', default: 'lifepo4', options: [
          { value: 'lifepo4', label: 'LiFePO4' },
          { value: 'agm', label: 'AGM' },
          { value: 'gel', label: 'Gel' },
          { value: 'flooded', label: 'Flooded' }
        ]
      }
    ],
    compute: ({ ah, v, chem }) => {
      // [recommended C-rate, maximum C-rate, charge time overhead for absorption]
      const [rec, max, overhead] = { lifepo4: [0.3, 0.5, 1.05], agm: [0.2, 0.3, 1.3], gel: [0.15, 0.2, 1.35], flooded: [0.1, 0.2, 1.4] }[chem]
      const amps = ah * rec
      const chargeV = v * 1.2
      return {
        primary: { label: 'Recommended current', value: amps, unit: 'A', digits: 0 },
        readouts: [
          { label: 'Maximum current', value: ah * max, unit: 'A', digits: 0 },
          { label: 'Charger size', value: amps * chargeV, unit: 'W', digits: 0 },
          { label: '20→100% time', value: ((ah * 0.8) / amps) * overhead, unit: 'h', digits: 1 },
          { label: 'Solar to supply it', value: (amps * chargeV) / 0.8, unit: 'W', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'battery-autonomy',
    code: 'BT-10',
    category: 'battery',
    name: 'Battery Autonomy Calculator (Days Without Sun)',
    inputs: [
      { id: 'kwh', label: 'Battery bank', type: 'number', unit: 'kWh', default: 10, min: 0.1, max: 100000, step: 0.1 },
      { id: 'dod', label: 'Depth of discharge', type: 'range', unit: '%', default: 80, min: 30, max: 100, step: 5 },
      { id: 'daily', label: 'Daily load', type: 'number', unit: 'kWh', default: 4, min: 0.05, max: 10000, step: 0.05 },
      { id: 'solar', label: 'Solar still produced on dark days', type: 'range', unit: '%', default: 10, min: 0, max: 50, step: 5 }
    ],
    compute: ({ kwh, dod, daily, solar }) => {
      const usable = ((kwh * dod) / 100) * 0.9
      const net = daily * (1 - solar / 100)
      const days = usable / net
      return {
        primary: { label: 'Autonomy', value: days, unit: 'days', digits: 1 },
        readouts: [
          { label: 'In hours', value: days * 24, unit: 'h', digits: 0 },
          { label: 'Usable energy', value: usable, unit: 'kWh', digits: 1 },
          { label: 'Net daily draw', value: net, unit: 'kWh', digits: 2 }
        ],
        status: days >= 3 ? { level: 'ok', text: 'Good off-grid reserve' } : days >= 1.5 ? { level: 'warn', text: 'Fine for backup; tight for off-grid' } : { level: 'bad', text: 'Less than 1.5 days of reserve' }
      }
    }
  }
]
