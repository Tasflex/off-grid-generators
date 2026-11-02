// lib/calc/logic/builder.js
import { nextStandard, systemVoltageOptions } from '../data'

const inverterSizes = [300, 600, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000]
const controllerSizes = [10, 20, 30, 40, 50, 60, 80, 100, 150, 200]

export const builderCalcs = [
  {
    slug: 'solar-vs-grid-cost',
    code: 'SB-01',
    category: 'builder',
    name: 'Solar vs Grid Cost Calculator',
    inputs: [
      { id: 'kw', label: 'System size', type: 'number', unit: 'kW', default: 6, min: 0.5, max: 1000, step: 0.1 },
      { id: 'costW', label: 'Installed cost', type: 'number', unit: '$/W', default: 2.8, min: 0.3, max: 10, step: 0.05 },
      { id: 'incentive', label: 'Tax credit / rebate', type: 'range', unit: '%', default: 30, min: 0, max: 60, step: 1 },
      { id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 4.5, min: 2, max: 8, step: 0.1 },
      { id: 'price', label: 'Grid electricity price', type: 'number', unit: '$/kWh', default: 0.16, min: 0.01, max: 2, step: 0.01 },
      { id: 'esc', label: 'Grid price rise per year', type: 'range', unit: '%', default: 3, min: 0, max: 10, step: 0.5 },
      { id: 'om', label: 'Maintenance', type: 'number', unit: '$/yr', default: 100, min: 0, max: 100000, step: 10 }
    ],
    compute: ({ kw, costW, incentive, psh, price, esc, om }) => {
      const net = kw * 1000 * costW * (1 - incentive / 100)
      let cumulative = -net
      let payback = null
      let totalKwh = 0
      for (let y = 1; y <= 25; y++) {
        const kwh = kw * psh * 365 * 0.86 * Math.pow(0.995, y - 1)
        totalKwh += kwh
        const prev = cumulative
        cumulative += kwh * price * Math.pow(1 + esc / 100, y - 1) - om
        if (payback === null && cumulative >= 0) payback = y - 1 + -prev / (cumulative - prev)
      }
      const lcoe = (net + om * 25) / totalKwh
      return {
        primary: { label: 'Payback period', value: payback ?? '> 25', unit: 'years', digits: 1 },
        readouts: [
          { label: 'Net system cost', value: net, unit: '$', digits: 0 },
          { label: '25-year net savings', value: cumulative, unit: '$', digits: 0 },
          { label: 'Solar cost per kWh', value: lcoe, unit: '$', digits: 3 },
          { label: 'Grid price today', value: price, unit: '$/kWh', digits: 3 }
        ],
        status: lcoe < price ? { level: 'ok', text: 'Solar beats grid power over the system life' } : { level: 'bad', text: 'Grid power is cheaper at these numbers' }
      }
    }
  },
  {
    slug: 'daily-energy-use',
    code: 'SB-02',
    category: 'builder',
    name: 'Daily Energy Use (Load) Calculator',
    inputs: [
      {
        id: 'loads', label: 'Appliances', type: 'loads', default: [
          { name: 'Refrigerator', watts: 150, qty: 1, hours: 8 },
          { name: 'LED lights', watts: 10, qty: 6, hours: 5 },
          { name: 'Laptop', watts: 60, qty: 1, hours: 4 },
          { name: 'TV', watts: 100, qty: 1, hours: 3 },
          { name: 'Wi-Fi router', watts: 12, qty: 1, hours: 24 },
          { name: 'Phone charger', watts: 10, qty: 2, hours: 2 }
        ]
      }
    ],
    compute: ({ loads }) => {
      const daily = loads.reduce((s, l) => s + (l.watts || 0) * (l.qty || 0) * (l.hours || 0), 0)
      const peak = loads.reduce((s, l) => s + (l.watts || 0) * (l.qty || 0), 0)
      return {
        primary: { label: 'Daily energy', value: daily / 1000, unit: 'kWh', digits: 2 },
        readouts: [
          { label: 'Peak load (all on)', value: peak, unit: 'W', digits: 0 },
          { label: 'Monthly', value: (daily * 30.4) / 1000, unit: 'kWh', digits: 0 },
          { label: 'Yearly', value: (daily * 365) / 1000, unit: 'kWh', digits: 0 },
          { label: 'Average draw', value: daily / 24, unit: 'W', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'solar-array-sizing',
    code: 'SB-03',
    category: 'builder',
    name: 'Solar Array (Panel) Sizing Calculator',
    inputs: [
      { id: 'daily', label: 'Daily energy use', type: 'number', unit: 'kWh', default: 5, min: 0.05, max: 10000, step: 0.05 },
      { id: 'psh', label: 'Peak sun hours (worst month for off-grid)', type: 'range', unit: 'h/day', default: 4.5, min: 1, max: 8, step: 0.1 },
      { id: 'loss', label: 'System losses', type: 'range', unit: '%', default: 20, min: 5, max: 40, step: 1 },
      { id: 'panelW', label: 'Panel rating', type: 'number', unit: 'W', default: 400, min: 5, max: 1000, step: 5 }
    ],
    compute: ({ daily, psh, loss, panelW }) => {
      const watts = (daily * 1000) / (psh * (1 - loss / 100))
      const panels = Math.ceil(watts / panelW)
      return {
        primary: { label: 'Array size', value: watts / 1000, unit: 'kW', digits: 2 },
        readouts: [
          { label: 'Panels', value: panels, unit: 'pcs', digits: 0 },
          { label: 'Installed', value: (panels * panelW) / 1000, unit: 'kW', digits: 2 },
          { label: 'Roof / ground area', value: panels * 2, unit: 'm²', digits: 0 },
          { label: 'Yearly output', value: ((panels * panelW) / 1000) * psh * 365 * (1 - loss / 100), unit: 'kWh', digits: 0 }
        ]
      }
    }
  },
  {
    slug: 'off-grid-system-sizing',
    code: 'SB-04',
    category: 'builder',
    name: 'Off-Grid Solar System Sizing Calculator',
    inputs: [
      { id: 'daily', label: 'Daily energy use', type: 'number', unit: 'kWh', default: 6, min: 0.1, max: 1000, step: 0.1 },
      { id: 'peak', label: 'Peak load', type: 'number', unit: 'W', default: 3000, min: 50, max: 100000, step: 50 },
      { id: 'psh', label: 'Sun hours (worst month)', type: 'range', unit: 'h/day', default: 3.5, min: 1, max: 8, step: 0.1 },
      { id: 'days', label: 'Days of autonomy', type: 'range', unit: 'days', default: 2, min: 1, max: 7, step: 0.5 },
      { id: 'v', label: 'System voltage', type: 'select', default: 48, options: systemVoltageOptions },
      { id: 'panelW', label: 'Panel rating', type: 'number', unit: 'W', default: 400, min: 50, max: 1000, step: 5 }
    ],
    compute: ({ daily, peak, psh, days, v, panelW }) => {
      // Off-grid losses: wiring, charge controller, battery round trip, inverter (~25%)
      const arrayW = (daily * 1000) / (psh * 0.75)
      const panels = Math.ceil(arrayW / panelW)
      const installed = panels * panelW
      const batteryKwh = (daily * days) / 0.8 / 0.9
      const inverter = nextStandard(peak * 1.25, inverterSizes)
      const ctrlAmps = (installed / v) * 1.25
      const controller = nextStandard(ctrlAmps, controllerSizes)
      return {
        primary: { label: 'Solar array', value: installed / 1000, unit: 'kW', digits: 2 },
        readouts: [
          { label: 'Panels', value: panels, unit: `× ${panelW}W`, digits: 0 },
          { label: 'Battery bank', value: batteryKwh, unit: 'kWh', digits: 1 },
          { label: `Battery at ${v}V`, value: (batteryKwh * 1000) / v, unit: 'Ah', digits: 0 },
          { label: 'Inverter', value: inverter ?? peak * 1.25, unit: 'W', digits: 0 },
          { label: 'MPPT controller', value: controller ? `${controller} A` : `${Math.ceil(ctrlAmps)} A (split)` },
          { label: 'PV current at battery', value: installed / v, unit: 'A', digits: 0 }
        ],
        status: v === 12 && installed > 1500 ? { level: 'warn', text: 'High current at 12V: consider 24V or 48V' } : { level: 'ok', text: 'Sized for 80% depth of discharge (LiFePO4)' }
      }
    }
  },
  {
    slug: 'hybrid-solar-system-sizing',
    code: 'SB-05',
    category: 'builder',
    name: 'Hybrid Solar System Sizing Calculator',
    inputs: [
      { id: 'daily', label: 'Daily household use', type: 'number', unit: 'kWh', default: 20, min: 0.5, max: 1000, step: 0.5 },
      { id: 'offset', label: 'Share of use from solar', type: 'range', unit: '%', default: 70, min: 10, max: 100, step: 5 },
      { id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 4.5, min: 1, max: 8, step: 0.1 },
      { id: 'critical', label: 'Critical backup load', type: 'number', unit: 'W', default: 1500, min: 0, max: 100000, step: 50 },
      { id: 'backup', label: 'Backup duration', type: 'range', unit: 'h', default: 12, min: 1, max: 72, step: 1 },
      { id: 'price', label: 'Grid price', type: 'number', unit: '$/kWh', default: 0.16, min: 0, max: 2, step: 0.01 }
    ],
    compute: ({ daily, offset, psh, critical, backup, price }) => {
      const arrayKw = (daily * (offset / 100)) / (psh * 0.82)
      const batteryKwh = (critical * backup) / 1000 / 0.9 / 0.9
      const inverterW = nextStandard(Math.max(critical * 1.25, (arrayKw * 1000) / 1.3), inverterSizes)
      const gridKwh = daily * (1 - offset / 100) * 365
      return {
        primary: { label: 'Solar array', value: arrayKw, unit: 'kW', digits: 1 },
        readouts: [
          { label: 'Battery', value: batteryKwh, unit: 'kWh', digits: 1 },
          { label: 'Hybrid inverter', value: inverterW ? inverterW / 1000 : (arrayKw / 1.3), unit: 'kW', digits: 1 },
          { label: 'Grid import / year', value: gridKwh, unit: 'kWh', digits: 0 },
          { label: 'Bill savings / year', value: daily * (offset / 100) * 365 * price, unit: '$', digits: 0 }
        ]
      }
    }
  }
]
