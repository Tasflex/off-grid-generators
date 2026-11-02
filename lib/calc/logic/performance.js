// lib/calc/logic/performance.js
// Performance, degradation and economics calculators, using the formulas in lib/calculators.js.
import {
  calculateBatteryDoDDegradation,
  calculateBatteryLifetimeCost,
  calculateHotspotRisk,
  calculateInverterReplacement,
  calculatePanelDegradation,
  calculateShadingImpact,
  calculateSoilingLoss,
  calculateTemperatureLoss
} from '../../calculators'

const yesNo = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]

export const performanceCalcs = [
  {
    slug: 'panel-degradation',
    code: 'PF-01',
    category: 'performance',
    name: 'Solar Panel Degradation Calculator',
    inputs: [
      { id: 'watts', label: 'Array or panel rating (new)', type: 'number', unit: 'W', default: 400, min: 1, max: 1000000, step: 10 },
      {
        id: 'rate', label: 'Degradation rate', type: 'number', unit: '%/yr', default: 0.5, min: 0, max: 3, step: 0.05,
        presets: [{ label: 'Premium', value: 0.25 }, { label: 'Standard', value: 0.5 }, { label: 'Budget', value: 0.7 }, { label: 'Poor', value: 1 }]
      },
      { id: 'years', label: 'After', type: 'range', unit: 'years', default: 10, min: 1, max: 30, step: 1 },
      { id: 'psh', label: 'Peak sun hours', type: 'range', unit: 'h/day', default: 5, min: 2, max: 8, step: 0.1 }
    ],
    compute: ({ watts, rate, years, psh }) => {
      const r = calculatePanelDegradation(watts, rate, years, psh)
      if (!r) return { primary: { label: 'Output', value: '—' }, readouts: [], status: { level: 'bad', text: 'Enter a rating above zero' } }
      const step = Math.max(1, Math.ceil(years / 12))
      return {
        primary: { label: `Output after ${years} yr`, value: r.finalWattage, unit: 'W', digits: 1 },
        readouts: [
          { label: 'Power lost', value: r.totalLoss, unit: 'W', digits: 1 },
          { label: 'Total loss', value: r.totalLossPercent, unit: '%', digits: 1 },
          { label: 'Energy lost that year', value: r.yearlyLossKWh, unit: 'kWh', digits: 0 },
          { label: 'Output retained', value: 100 - r.totalLossPercent, unit: '%', digits: 1 }
        ],
        bars: r.yearlyData.filter(d => d.year % step === 0 && d.year > 0).slice(-12).map(d => ({ label: `Y${d.year}`, value: d.wattage / watts })),
        status: 100 - r.totalLossPercent >= 80 ? { level: 'ok', text: 'Within typical 25-year warranty limits' } : { level: 'warn', text: 'Below the 80% most warranties guarantee' }
      }
    }
  },
  {
    slug: 'temperature-coefficient-loss',
    code: 'PF-02',
    category: 'performance',
    name: 'Temperature Coefficient Loss Calculator',
    inputs: [
      { id: 'panelW', label: 'Panel rating', type: 'number', unit: 'W', default: 400, min: 1, max: 1000, step: 5 },
      {
        id: 'coef', label: 'Temperature coefficient (Pmax)', type: 'number', unit: '%/°C', default: -0.35, min: -1, max: 0, step: 0.01,
        presets: [{ label: 'Premium', value: -0.29 }, { label: 'Standard', value: -0.35 }, { label: 'Budget poly', value: -0.4 }, { label: 'Thin film', value: -0.25 }]
      },
      {
        id: 'temp', label: 'Cell temperature', type: 'range', unit: '°C', default: 45, min: 0, max: 85, step: 1,
        presets: [{ label: 'Cool', value: 25 }, { label: 'Mild', value: 35 }, { label: 'Warm', value: 45 }, { label: 'Hot', value: 60 }, { label: 'Extreme', value: 75 }]
      },
      { id: 'array', label: 'Array size', type: 'number', unit: 'W', default: 4000, min: 1, max: 1000000, step: 100 }
    ],
    compute: ({ panelW, coef, temp, array }) => {
      const r = calculateTemperatureLoss({ panelWattage: panelW, tempCoefficient: coef, cellTemp: temp, arraySize: array })
      if (!r) return { primary: { label: 'Loss', value: '—' }, readouts: [] }
      return {
        primary: { label: r.isHeating ? 'Power lost to heat' : 'Power gained (cold)', value: r.lossPercent, unit: '%', digits: 2 },
        readouts: [
          { label: 'Panel output now', value: r.actualWattage, unit: 'W', digits: 1 },
          { label: 'Array output now', value: r.totalArrayOutput, unit: 'W', digits: 0 },
          { label: 'Array loss', value: r.arrayLoss, unit: 'W', digits: 0 },
          { label: 'Gain with −0.29% panel', value: r.yearlyGain, unit: 'kWh/yr', digits: 0 }
        ],
        meter: { label: 'Cell temperature above 25°C STC', value: Math.max(0, temp - 25) / 60, text: `${r.tempDelta > 0 ? '+' : ''}${r.tempDelta}°C` }
      }
    }
  },
  {
    slug: 'shading-impact',
    code: 'PF-03',
    category: 'performance',
    name: 'Solar Panel Shading Impact Calculator',
    inputs: [
      { id: 'array', label: 'Array size', type: 'number', unit: 'W', default: 2000, min: 1, max: 1000000, step: 100 },
      { id: 'coverage', label: 'Shaded area', type: 'range', unit: '%', default: 15, min: 0, max: 100, step: 1 },
      {
        id: 'shade', label: 'Shade type', type: 'select', default: 'soft', options: [
          { value: 'soft', label: 'Soft (trees)' },
          { value: 'hard', label: 'Hard (chimney)' },
          { value: 'intermittent', label: 'Intermittent' }
        ]
      },
      {
        id: 'config', label: 'Wiring', type: 'select', default: 'series', options: [
          { value: 'series', label: 'Series' },
          { value: 'parallel', label: 'Parallel' },
          { value: 'optimizers', label: 'Optimizers' }
        ]
      },
      { id: 'rate', label: 'Electricity value', type: 'number', unit: '$/kWh', default: 0.15, min: 0, max: 2, step: 0.01 }
    ],
    compute: ({ array, coverage, shade, config, rate }) => {
      const r = calculateShadingImpact({ arrayWattage: array, shadeCoverage: coverage, shadeType: shade, stringConfig: config, gridRate: rate })
      if (!r) return { primary: { label: 'Loss', value: '—' }, readouts: [] }
      return {
        primary: { label: 'Output loss', value: r.effectiveLoss, unit: '%', digits: 1 },
        readouts: [
          { label: 'Power lost', value: r.lostWattage, unit: 'W', digits: 0 },
          { label: 'Remaining output', value: r.remainingWattage, unit: 'W', digits: 0 },
          { label: 'Energy lost / year', value: r.annualLostKWh, unit: 'kWh', digits: 0 },
          { label: 'Value lost / year', value: r.annualValueLost, unit: '$', digits: 0 }
        ],
        status: config === 'series' && r.effectiveLoss > coverage ? { level: 'warn', text: 'Series strings lose more than the shaded share: optimizers would recover most of it' } : { level: 'ok', text: 'Shade impact is proportionate' },
        meter: { label: 'Output retained', value: 1 - r.effectiveLoss / 100, text: `${(100 - r.effectiveLoss).toFixed(0)}%` }
      }
    }
  },
  {
    slug: 'dust-soiling-loss',
    code: 'PF-04',
    category: 'performance',
    name: 'Dust & Soiling Loss Estimator',
    inputs: [
      {
        id: 'location', label: 'Surroundings', type: 'select', default: 'suburban', options: [
          { value: 'urban', label: 'Urban / city' },
          { value: 'suburban', label: 'Suburban' },
          { value: 'rural', label: 'Rural / farmland' },
          { value: 'desert', label: 'Desert / arid' },
          { value: 'coastal', label: 'Coastal' }
        ]
      },
      { id: 'tilt', label: 'Panel tilt', type: 'range', unit: '°', default: 30, min: 0, max: 60, step: 1 },
      {
        id: 'rain', label: 'Rainfall', type: 'select', default: 'moderate', options: [
          { value: 'low', label: 'Low' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'high', label: 'High' }
        ]
      },
      {
        id: 'cleaning', label: 'Cleaning', type: 'select', default: 'rarely', options: [
          { value: 'never', label: 'Never' },
          { value: 'rarely', label: 'Yearly' },
          { value: 'sometimes', label: '2–4×/yr' },
          { value: 'regularly', label: 'Monthly' }
        ]
      },
      { id: 'array', label: 'Array size', type: 'number', unit: 'W', default: 3000, min: 1, max: 1000000, step: 100 }
    ],
    compute: ({ location, tilt, rain, cleaning, array }) => {
      const r = calculateSoilingLoss({ location, tiltAngle: tilt, rainfall: rain, cleaningFrequency: cleaning, arraySize: array })
      if (!r) return { primary: { label: 'Loss', value: '—' }, readouts: [] }
      return {
        primary: { label: 'Soiling loss', value: r.soilingLoss, unit: '%', digits: 1 },
        readouts: [
          { label: 'Energy lost / year', value: r.annualLoss, unit: 'kWh', digits: 0 },
          { label: 'Clean-panel output', value: r.annualProduction, unit: 'kWh/yr', digits: 0 },
          { label: 'Net output', value: r.annualNetProduction, unit: 'kWh/yr', digits: 0 },
          { label: 'Value lost / year', value: r.valueLost, unit: '$', digits: 0 }
        ],
        status: { level: r.soilingLoss > 8 ? 'bad' : r.soilingLoss > 4 ? 'warn' : 'ok', text: r.recommendations[0] }
      }
    }
  },
  {
    slug: 'panel-hotspot-risk',
    code: 'PF-05',
    category: 'performance',
    name: 'Solar Panel Hotspot Risk Calculator',
    inputs: [
      { id: 'age', label: 'Panel age', type: 'range', unit: 'years', default: 5, min: 0, max: 30, step: 1 },
      { id: 'diodes', label: 'Bypass diodes working', type: 'select', default: 'yes', options: yesNo },
      { id: 'damage', label: 'Visible cracks or delamination', type: 'select', default: 'no', options: yesNo },
      {
        id: 'shading', label: 'Partial shading', type: 'select', default: 'low', options: [
          { value: 'none', label: 'None' },
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]
      },
      { id: 'cells', label: 'Cell type', type: 'select', default: 'mono', options: [{ value: 'mono', label: 'Mono' }, { value: 'poly', label: 'Poly' }] }
    ],
    compute: ({ age, diodes, damage, shading, cells }) => {
      const r = calculateHotspotRisk({ panelAge: age, bypassDiodesWorking: diodes === 'yes', visibleDamage: damage === 'yes', partialShading: shading, cellType: cells })
      return {
        primary: { label: 'Hotspot risk', value: r.riskLevel.toUpperCase() },
        readouts: [
          { label: 'Risk score', value: r.riskPercent, unit: '/ 100', digits: 0 },
          ...r.factors.slice(0, 3).map(f => ({ label: f.name, value: f.weight, unit: 'pts', digits: 0 }))
        ],
        meter: { label: 'Risk', value: r.riskPercent / 100, text: `${r.riskPercent}%` },
        status: { level: r.riskLevel === 'High' ? 'bad' : r.riskLevel === 'Moderate' ? 'warn' : 'ok', text: r.recommendations[0] }
      }
    }
  },
  {
    slug: 'battery-dod-degradation',
    code: 'PF-06',
    category: 'performance',
    name: 'Battery Depth of Discharge (DoD) Degradation Calculator',
    inputs: [
      {
        id: 'chem', label: 'Chemistry', type: 'select', default: 'lifepo4', options: [
          { value: 'lifepo4', label: 'LiFePO4' },
          { value: 'nmc', label: 'NMC' },
          { value: 'agm', label: 'AGM / Gel' },
          { value: 'flooded', label: 'Flooded' }
        ]
      },
      { id: 'cycles', label: 'Rated cycles at 50% DoD', type: 'number', unit: 'cycles', default: 4000, min: 50, max: 20000, step: 50 },
      { id: 'dod', label: 'Your depth of discharge', type: 'range', unit: '%', default: 80, min: 10, max: 100, step: 5 },
      { id: 'freq', label: 'Cycles per day', type: 'number', unit: '', default: 1, min: 0.1, max: 4, step: 0.1 },
      { id: 'cost', label: 'Battery cost', type: 'number', unit: '$', default: 1200, min: 1, max: 100000, step: 50 },
      { id: 'wh', label: 'Battery capacity', type: 'number', unit: 'Wh', default: 1280, min: 10, max: 100000, step: 10 }
    ],
    compute: ({ chem, cycles, dod, freq, cost, wh }) => {
      const r = calculateBatteryDoDDegradation({ batteryChemistry: chem, ratedCycles: cycles, depthOfDischarge: dod, cycleFrequency: freq, batteryCost: cost, nominalCapacityWh: wh })
      if (!r) return { primary: { label: 'Cycles', value: '—' }, readouts: [] }
      return {
        primary: { label: `Cycle life at ${dod}% DoD`, value: r.effectiveCycles, unit: 'cycles', digits: 0 },
        readouts: [
          { label: 'Years of life', value: r.yearsOfLife, unit: 'years', digits: 1 },
          { label: 'Lifetime energy', value: r.lifetimeThroughput, unit: 'kWh', digits: 0 },
          { label: 'Cost per kWh', value: r.costPerKWh, unit: '$', digits: 3 },
          { label: 'Stress vs 50% DoD', value: r.stressFactor, unit: '×', digits: 2 }
        ]
      }
    }
  },
  {
    slug: 'battery-lifetime-cost',
    code: 'PF-07',
    category: 'performance',
    name: 'Battery Lifetime Cost per kWh Calculator',
    inputs: [
      { id: 'cost', label: 'Purchase cost', type: 'number', unit: '$', default: 3000, min: 1, max: 100000, step: 50 },
      { id: 'wh', label: 'Capacity', type: 'number', unit: 'Wh', default: 3600, min: 10, max: 200000, step: 10 },
      { id: 'cycles', label: 'Cycle life', type: 'number', unit: 'cycles', default: 3500, min: 50, max: 20000, step: 50 },
      { id: 'dod', label: 'Depth of discharge', type: 'range', unit: '%', default: 80, min: 10, max: 100, step: 5 },
      { id: 'rte', label: 'Round-trip efficiency', type: 'range', unit: '%', default: 90, min: 60, max: 100, step: 1 },
      { id: 'grid', label: 'Grid price', type: 'number', unit: '$/kWh', default: 0.15, min: 0, max: 2, step: 0.01 }
    ],
    compute: ({ cost, wh, cycles, dod, rte, grid }) => {
      const r = calculateBatteryLifetimeCost({ purchaseCost: cost, capacity: wh, cycleLife: cycles, depthOfDischarge: dod, roundTripEfficiency: rte, gridCostPerKWh: grid })
      if (!r) return { primary: { label: 'Cost', value: '—' }, readouts: [] }
      return {
        primary: { label: 'Cost per kWh delivered', value: r.costPerKWh, unit: '$', digits: 3 },
        readouts: [
          { label: 'Lifetime energy', value: r.lifetimeThroughputKWh, unit: 'kWh', digits: 0 },
          { label: 'Usable per cycle', value: r.usablePerCycle, unit: 'Wh', digits: 0 },
          { label: 'Same energy from grid', value: r.gridCostForSameEnergy, unit: '$', digits: 0 },
          { label: 'Lifetime savings', value: r.lifetimeSavings, unit: '$', digits: 0 }
        ],
        status: r.isCheaper ? { level: 'ok', text: 'Cheaper than grid power per kWh' } : { level: 'bad', text: 'More expensive than grid power per kWh' }
      }
    }
  },
  {
    slug: 'inverter-replacement',
    code: 'PF-08',
    category: 'performance',
    name: 'Inverter Replacement Interval Calculator',
    inputs: [
      {
        id: 'type', label: 'Inverter type', type: 'select', default: 'string', options: [
          { value: 'string', label: 'String' },
          { value: 'hybrid', label: 'Hybrid' },
          { value: 'microinverter', label: 'Micro' },
          { value: 'optimizer', label: 'Optimizer' }
        ]
      },
      { id: 'load', label: 'Typical load vs rating', type: 'range', unit: '%', default: 80, min: 10, max: 150, step: 5 },
      {
        id: 'env', label: 'Installed', type: 'select', default: 'climate', options: [
          { value: 'climate', label: 'Indoors' },
          { value: 'garage', label: 'Garage' },
          { value: 'outdoor-shade', label: 'Outside, shade' },
          { value: 'outdoor-sun', label: 'Outside, sun' }
        ]
      },
      { id: 'cost', label: 'Replacement cost', type: 'number', unit: '$', default: 2000, min: 1, max: 100000, step: 50 }
    ],
    compute: ({ type, load, env, cost }) => {
      const r = calculateInverterReplacement({ inverterType: type, continuousLoad: load, environment: env, inverterCost: cost })
      if (!r) return { primary: { label: 'Life', value: '—' }, readouts: [] }
      return {
        primary: { label: 'Expected lifespan', value: r.expectedLife, unit: 'years', digits: 1 },
        readouts: [
          { label: 'Replacements in 25 yr', value: r.replacementsIn25Years, unit: '', digits: 0 },
          { label: '25-year cost', value: r.total25YearCost, unit: '$', digits: 0 },
          { label: 'Cost per year', value: r.costPerYear, unit: '$', digits: 0 },
          { label: '25-yr average / year', value: r.effectiveCostPerYear25, unit: '$', digits: 0 }
        ],
        status: r.warnings.length ? { level: 'warn', text: r.warnings[0] } : { level: 'ok', text: 'Good operating conditions' }
      }
    }
  }
]
