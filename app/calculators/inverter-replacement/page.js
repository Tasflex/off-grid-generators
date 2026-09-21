'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Calculator, Info, AlertTriangle, Calendar, DollarSign } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function InverterReplacementPage() {
  const [inverterType, setInverterType] = useState('string')
  const [continuousLoad, setContinuousLoad] = useState(80)
  const [environment, setEnvironment] = useState('climate')
  const [inverterCost, setInverterCost] = useState(2000)
  const [results, setResults] = useState(null)

  const inverterTypes = [
    { id: 'string', label: 'String Inverter', baseLife: 12, desc: 'Central inverter, ~10-15 year lifespan' },
    { id: 'hybrid', label: 'Hybrid Inverter', baseLife: 10, desc: 'Battery + solar, ~8-12 years' },
    { id: 'microinverter', label: 'Microinverter', baseLife: 20, desc: 'Per-panel, ~20-25 years' },
    { id: 'optimizer', label: 'DC Optimizer', baseLife: 22, desc: 'Per-panel, ~22-25 years' }
  ]

  const environments = [
    { id: 'climate', label: 'Controlled (climate-controlled)', factor: 0.9, desc: 'Indoor, stable temp' },
    { id: 'garage', label: 'Garage / Outbuilding', factor: 1.0, desc: 'Protected, moderate temp swings' },
    { id: 'outdoor-shade', label: 'Outdoor (shaded)', factor: 1.15, desc: 'Exterior wall, no direct sun' },
    { id: 'outdoor-sun', label: 'Outdoor (direct sun)', factor: 1.35, desc: 'Exposed to elements' }
  ]

  const calculate = () => {
    if (continuousLoad <= 0 || continuousLoad > 150 || inverterCost <= 0) {
      toast.error('Please enter valid values')
      return
    }

    const type = inverterTypes.find(t => t.id === inverterType)
    const env = environments.find(e => e.id === environment)

    // Load factor: inverters run at high load degrade faster
    // 80% is nominal, 100%+ is stressed, 50% is underutilized but also ages
    const loadFactor = continuousLoad > 100
      ? 1.4
      : continuousLoad > 80
      ? 1.15
      : continuousLoad < 30
      ? 1.05 // underutilization slightly degrades capacitor aging too
      : 1.0

    // Base lifespan adjusted
    const expectedLife = type.baseLife * (1 / env.factor) * (1 / loadFactor)
    const remainingLife = Math.max(1, expectedLife)

    // Cost per year of ownership
    const costPerYear = inverterCost / remainingLife

    // If you replace at year 10 (typical warranty), how much more expensive?
    const warrantyYears = 10
    const replacementCostCycle = (inverterCost / remainingLife) * warrantyYears

    // Total 25-year cost (accounting for replacements)
    const replacementsIn25Years = Math.floor(25 / remainingLife)
    const total25YearCost = inverterCost * (replacementsIn25Years + 1)
    const effectiveCostPerYear25 = total25YearCost / 25

    // Warnings
    const warnings = []
    if (continuousLoad > 100) warnings.push('Running inverter above rated load shortens life by 40%+')
    if (environment === 'outdoor-sun') warnings.push('Direct sun exposure accelerates capacitor aging')
    if (continuousLoad < 30) warnings.push('Inverter oversized for load — consider a smaller unit')

    setResults({
      expectedLife: remainingLife.toFixed(1),
      costPerYear: costPerYear.toFixed(0),
      replacementCostCycle: replacementCostCycle.toFixed(0),
      replacementsIn25Years,
      total25YearCost: total25YearCost.toLocaleString(),
      effectiveCostPerYear25: effectiveCostPerYear25.toFixed(0),
      loadFactor,
      envFactor: env.factor,
      warnings
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Inverter Replacement</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Inverter Replacement Interval Calculator</h1>
        <p className="text-gray-600">
          Estimate how long your inverter will last and what its total cost of ownership looks like over 25 years.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Inverter Details</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Inverter Type</label>
              <div className="space-y-2">
                {inverterTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setInverterType(type.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      inverterType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typical Continuous Load (% of rated)
              </label>
              <input
                type="range"
                value={continuousLoad}
                onChange={(e) => setContinuousLoad(parseInt(e.target.value))}
                className="w-full"
                min="10"
                max="120"
                step="5"
              />
              <div className="text-center text-xl font-bold text-blue-600 mt-2">{continuousLoad}%</div>
              <p className="text-xs text-gray-500 text-center">
                {continuousLoad < 30 ? 'Oversized — inefficient use' :
                 continuousLoad <= 80 ? 'Optimal range' :
                 continuousLoad <= 100 ? 'Near max — shorter life' :
                 'Overload — will fail early'}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Environment</label>
              <div className="space-y-2">
                {environments.map(env => (
                  <button
                    key={env.id}
                    onClick={() => setEnvironment(env.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      environment === env.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{env.label}</div>
                    <div className="text-xs text-gray-500">{env.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inverter Cost ($)
              </label>
              <input
                type="number"
                value={inverterCost}
                onChange={(e) => setInverterCost(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Lifespan &amp; Cost
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Expected Lifespan</div>
                  <div className="text-5xl font-bold text-blue-600">{results.expectedLife}</div>
                  <div className="text-gray-600">years</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Cost Per Year</div>
                    <div className="text-lg font-semibold">${results.costPerYear}</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Replacements in 25 yrs</div>
                    <div className="text-lg font-semibold">{results.replacementsIn25Years}</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">25-Year Cost of Ownership</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total inverter spend</span>
                      <span className="font-medium">${results.total25YearCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective per year</span>
                      <span className="font-medium">${results.effectiveCostPerYear25}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Degradation Factors</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Load factor</span>
                      <span className="font-medium">{results.loadFactor.toFixed(2)}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Environment factor</span>
                      <span className="font-medium">{results.envFactor.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>

                {results.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        {results.warnings.map(w => (
                          <p key={w} className="text-xs text-yellow-800">{w}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Configure your inverter to estimate lifespan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">What Kills Inverters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Capacitor Aging</h3>
            <p className="text-sm text-gray-600">Electrolytic capacitors dry out faster at high temperatures. Every 10°C above 25°C halves their lifespan.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Thermal Cycling</h3>
            <p className="text-sm text-gray-600">Daily heating/cooling stresses solder joints and thermal interfaces, eventually causing failures.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Sustained Overload</h3>
            <p className="text-sm text-gray-600">Running above rated load causes IGBT and MOSFET degradation. Surge capacity is only for brief peaks.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Plan Your Replacement Budget</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/battery-lifetime-cost" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Battery Lifetime Cost
          </Link>
          <Link href="/calculators/inverter-sizing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Inverter Sizing
          </Link>
        </div>
      </div>
    </div>
  )
}