'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Battery, Calculator, Info, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function BatteryDoDDegradationPage() {
  const [batteryChemistry, setBatteryChemistry] = useState('lifepo4')
  const [ratedCycles, setRatedCycles] = useState(4000)
  const [depthOfDischarge, setDepthOfDischarge] = useState(80)
  const [cycleFrequency, setCycleFrequency] = useState(1)
  const [batteryCost, setBatteryCost] = useState(1200)
  const [results, setResults] = useState(null)

  const chemistryPresets = [
    { id: 'flooded', label: 'Flooded Lead-Acid', ratedAt50: 1200, dodSensitivity: 1.8 },
    { id: 'agm', label: 'AGM / Gel', ratedAt50: 700, dodSensitivity: 1.7 },
    { id: 'lifepo4', label: 'LiFePO4 (LFP)', ratedAt50: 5000, dodSensitivity: 1.15 },
    { id: 'nmc', label: 'NMC / Li-Ion', ratedAt50: 2000, dodSensitivity: 1.3 }
  ]

  const calculate = () => {
    if (ratedCycles <= 0 || depthOfDischarge <= 0 || depthOfDischarge > 100) {
      toast.error('Please enter valid values')
      return
    }

    const chem = chemistryPresets.find(c => c.id === batteryChemistry)

    // DoD stress factor — deeper discharge accelerates degradation non-linearly
    // Reference point is 50% DoD (industry standard cycle life rating)
    const stressFactor = Math.pow(depthOfDischarge / 50, chem.dodSensitivity)

    // Effective cycles at this DoD
    const effectiveCycles = Math.round(ratedCycles / stressFactor)

    // Years of life based on cycle frequency
    const yearsOfLife = effectiveCycles / (cycleFrequency * 365)

    // Total lifetime energy throughput
    // Assume rated cycles at 50% DoD of a typical 100Ah 12V (1280 Wh) battery
    const nominalWh = 1280
    const usableWhPerCycle = (nominalWh * depthOfDischarge) / 100
    const lifetimeThroughput = (usableWhPerCycle * effectiveCycles) / 1000 // kWh

    // Cost per kWh
    const costPerKWh = lifetimeThroughput > 0 ? batteryCost / lifetimeThroughput : 0
    const costPerYear = yearsOfLife > 0 ? batteryCost / yearsOfLife : 0

    setResults({
      effectiveCycles,
      yearsOfLife: yearsOfLife.toFixed(1),
      lifetimeThroughput: lifetimeThroughput.toFixed(0),
      costPerKWh: costPerKWh.toFixed(3),
      costPerYear: costPerYear.toFixed(0),
      stressFactor: stressFactor.toFixed(2)
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Battery DoD Degradation</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Battery Cycle Degradation Per DoD Calculator</h1>
        <p className="text-gray-600">
          See how your depth of discharge affects battery lifespan and cost per kWh over time.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Battery Specs</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Battery Chemistry</label>
              <div className="space-y-2">
                {chemistryPresets.map(chem => (
                  <button
                    key={chem.id}
                    onClick={() => {
                      setBatteryChemistry(chem.id)
                      setRatedCycles(chem.ratedAt50)
                    }}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      batteryChemistry === chem.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{chem.label}</div>
                    <div className="text-xs text-gray-500">~{chem.ratedAt50} cycles at 50% DoD</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rated Cycles at 50% DoD
              </label>
              <input
                type="number"
                value={ratedCycles}
                onChange={(e) => setRatedCycles(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Depth of Discharge (%)
              </label>
              <input
                type="range"
                value={depthOfDischarge}
                onChange={(e) => setDepthOfDischarge(parseInt(e.target.value))}
                className="w-full"
                min="10"
                max="100"
                step="5"
              />
              <div className="text-center text-2xl font-bold text-blue-600 mt-2">{depthOfDischarge}%</div>
              <p className="text-xs text-gray-500 text-center">
                {depthOfDischarge <= 30 ? 'Very shallow — great for lifespan' :
                 depthOfDischarge <= 50 ? 'Shallow — optimal for lead-acid' :
                 depthOfDischarge <= 80 ? 'Moderate — good for lithium' :
                 'Deep — reduces lifespan significantly'}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cycles Per Day
              </label>
              <input
                type="number"
                value={cycleFrequency}
                onChange={(e) => setCycleFrequency(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0.1"
                max="3"
                step="0.1"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Cost ($)
              </label>
              <input
                type="number"
                value={batteryCost}
                onChange={(e) => setBatteryCost(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Lifespan
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">Effective Cycles at {depthOfDischarge}% DoD</div>
                  <div className="text-4xl font-bold text-blue-600">{results.effectiveCycles.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Stress factor: {results.stressFactor}x</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Expected Life</div>
                    <div className="text-lg font-semibold text-green-600">{results.yearsOfLife} yrs</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Lifetime Throughput</div>
                    <div className="text-lg font-semibold">{results.lifetimeThroughput} kWh</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-500 mb-1">Cost Per kWh Delivered</div>
                  <div className="text-2xl font-bold text-gray-900">${results.costPerKWh}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ${results.costPerYear}/year amortized
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800">
                      Shallow discharges (≤50%) dramatically extend cycle life. Doubling DoD can cut lifespan by 40-60%.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Battery className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Configure your battery to see cycle lifespan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Ready to Compare Batteries?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/battery-runtime" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Battery Runtime Calculator
          </Link>
          <Link href="/guides/best-battery-backup-systems" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Battery Buying Guide
          </Link>
        </div>
      </div>
    </div>
  )
}