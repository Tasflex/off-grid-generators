'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Calculator, Info, AlertTriangle, Cloud } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ShadingImpactPage() {
  const [arrayWattage, setArrayWattage] = useState(2000)
  const [shadeCoverage, setShadeCoverage] = useState(15)
  const [shadeType, setShadeType] = useState('soft')
  const [stringConfig, setStringConfig] = useState('series')
  const [results, setResults] = useState(null)

  const shadeTypes = [
    { id: 'soft', label: 'Soft (diffuse)', desc: 'Tree canopy, fabric, light haze', factor: 0.6 },
    { id: 'hard', label: 'Hard (opaque)', desc: 'Chimney, wall, solid object', factor: 1.0 },
    { id: 'intermittent', label: 'Intermittent', desc: 'Moving clouds, birds, swaying branch', factor: 0.4 }
  ]

  const stringConfigs = [
    { id: 'series', label: 'Series String', desc: 'Panels wired in series (worst case)' },
    { id: 'parallel', label: 'Parallel', desc: 'Panels wired in parallel (better)' },
    { id: 'optimizers', label: 'With Optimizers', desc: 'DC optimizers or microinverters (best)' }
  ]

  const calculate = () => {
    if (arrayWattage <= 0 || shadeCoverage < 0 || shadeCoverage > 100) {
      toast.error('Please enter valid values')
      return
    }

    const shade = shadeTypes.find(s => s.id === shadeType)

    // Series strings: shading ANY panel kills the whole string (worst case)
    // Parallel: only the shaded panels lose output
    // Optimizers: per-panel MPPT mitigates most of the loss
    let lossMultiplier
    if (stringConfig === 'series') lossMultiplier = 1.5 * shade.factor  // disproportionately bad
    else if (stringConfig === 'parallel') lossMultiplier = 1.0 * shade.factor
    else lossMultiplier = 0.3 * shade.factor  // optimizers recover most

    // Real-world loss is non-linear — 10% shade often causes 30-60% output loss
    const effectiveLoss = Math.min(95, shadeCoverage * lossMultiplier)

    const lostWattage = (arrayWattage * effectiveLoss) / 100
    const remainingWattage = arrayWattage - lostWattage

    // Annual production estimate (5 sun hours/day)
    const annualLostKWh = (lostWattage * 5 * 365) / 1000
    const annualProducedKWh = (remainingWattage * 5 * 365) / 1000

    // Value of lost production at $0.15/kWh
    const annualValueLost = annualLostKWh * 0.15

    setResults({
      effectiveLoss: effectiveLoss.toFixed(1),
      lostWattage: lostWattage.toFixed(0),
      remainingWattage: remainingWattage.toFixed(0),
      annualLostKWh: annualLostKWh.toFixed(0),
      annualProducedKWh: annualProducedKWh.toFixed(0),
      annualValueLost: annualValueLost.toFixed(0)
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Shading Impact</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Shading Impact Calculator</h1>
        <p className="text-gray-600">
          See how much power you lose from partial shading — and how much wiring config matters.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Array</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Array Wattage (W)
              </label>
              <input
                type="number"
                value={arrayWattage}
                onChange={(e) => setArrayWattage(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % of Array Shaded ({shadeCoverage}%)
              </label>
              <input
                type="range"
                value={shadeCoverage}
                onChange={(e) => setShadeCoverage(parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="100"
                step="5"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Shade Type</label>
              <div className="space-y-2">
                {shadeTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setShadeType(type.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      shadeType === type.id
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
              <label className="block text-sm font-medium text-gray-700 mb-3">String Configuration</label>
              <div className="space-y-2">
                {stringConfigs.map(config => (
                  <button
                    key={config.id}
                    onClick={() => setStringConfig(config.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      stringConfig === config.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{config.label}</div>
                    <div className="text-xs text-gray-500">{config.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Shading Loss
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Effective Output Loss</div>
                  <div className="text-5xl font-bold text-red-500">{results.effectiveLoss}%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {shadeCoverage}% shade → {results.effectiveLoss}% output loss
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Remaining Power</div>
                    <div className="text-lg font-semibold text-green-600">{results.remainingWattage} W</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Lost Power</div>
                    <div className="text-lg font-semibold text-red-600">{results.lostWattage} W</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Annual Impact</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Production lost</span>
                      <span className="font-semibold text-red-600">{results.annualLostKWh} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value lost (@$0.15/kWh)</span>
                      <span className="font-semibold text-red-600">${results.annualValueLost}/yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Still produced</span>
                      <span className="font-semibold text-green-600">{results.annualProducedKWh} kWh</span>
                    </div>
                  </div>
                </div>

                {stringConfig === 'series' && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-800">
                        Series strings make shading disproportionately worse. A single shaded panel can cripple the whole string's output.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Cloud className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Configure your array to see shading impact</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Why Shading Is Worse Than It Looks</h2>
        <p className="text-sm text-gray-600 mb-4">
          Solar cells are wired in series. When one cell is shaded, it becomes a resistor in the current path. In the worst case:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded p-4">
            <div className="text-2xl font-bold text-red-600 mb-1">10%</div>
            <div className="text-sm text-gray-600">Physical shade coverage</div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <div className="text-2xl font-bold text-red-600 mb-1">30-50%</div>
            <div className="text-sm text-gray-600">Actual output loss in series strings</div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">Up to 70%</div>
            <div className="text-sm text-gray-600">Recovery with DC optimizers</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Reduce Shading Losses</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/panel-hotspot-risk" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Hotspot Risk Calculator
          </Link>
          <Link href="/guides/how-many-solar-panels-do-i-need" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Panel Sizing Guide
          </Link>
        </div>
      </div>
    </div>
  )
}