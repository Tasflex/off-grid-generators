'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DollarSign, Calculator, Battery, TrendingUp, Info } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function BatteryLifetimeCostPage() {
  const [purchaseCost, setPurchaseCost] = useState(3000)
  const [capacity, setCapacity] = useState(3600)
  const [cycleLife, setCycleLife] = useState(3500)
  const [depthOfDischarge, setDepthOfDischarge] = useState(80)
  const [roundTripEfficiency, setRoundTripEfficiency] = useState(90)
  const [results, setResults] = useState(null)

  const presets = [
    { label: 'Budget Lead-Acid', cost: 400, cap: 1280, cycles: 500, dod: 50, eff: 80 },
    { label: 'LiFePO4 Budget', cost: 800, cap: 1280, cycles: 3000, dod: 80, eff: 92 },
    { label: 'LiFePO4 Premium', cost: 2500, cap: 3600, cycles: 6000, dod: 90, eff: 95 },
    { label: 'Tesla Powerwall 3', cost: 9500, cap: 13500, cycles: 5000, dod: 100, eff: 90 }
  ]

  const applyPreset = (preset) => {
    setPurchaseCost(preset.cost)
    setCapacity(preset.cap)
    setCycleLife(preset.cycles)
    setDepthOfDischarge(preset.dod)
    setRoundTripEfficiency(preset.eff)
  }

  const calculate = () => {
    if (purchaseCost <= 0 || capacity <= 0 || cycleLife <= 0) {
      toast.error('Please enter valid values')
      return
    }

    // Usable energy per cycle
    const usablePerCycle = capacity * (depthOfDischarge / 100) * (roundTripEfficiency / 100)

    // Total lifetime energy throughput
    const lifetimeThroughputKWh = (usablePerCycle * cycleLife) / 1000

    // Cost per kWh
    const costPerKWh = purchaseCost / lifetimeThroughputKWh

    // Compare to grid power
    const gridCostPerKWh = 0.15
    const savingsPerKWh = gridCostPerKWh - costPerKWh

    // Total lifetime cost assuming same throughput from grid
    const gridCostForSameEnergy = lifetimeThroughputKWh * gridCostPerKWh
    const lifetimeSavings = gridCostForSameEnergy - purchaseCost

    // Cost per day if used daily
    const costPerDay = purchaseCost / (cycleLife / 365)

    setResults({
      usablePerCycle: usablePerCycle.toFixed(0),
      lifetimeThroughputKWh: lifetimeThroughputKWh.toFixed(0),
      costPerKWh: costPerKWh.toFixed(3),
      gridCostPerKWh,
      savingsPerKWh: savingsPerKWh.toFixed(3),
      gridCostForSameEnergy: gridCostForSameEnergy.toFixed(0),
      lifetimeSavings: lifetimeSavings.toFixed(0),
      costPerDay: costPerDay.toFixed(2),
      isCheaper: costPerKWh < gridCostPerKWh
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Battery Lifetime Cost</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Battery Lifetime Cost Per kWh Calculator</h1>
        <p className="text-gray-600">
          Calculate the true cost per kilowatt-hour delivered over a battery's entire lifespan — and compare it to grid power.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Compare Batteries</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {presets.map(preset => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className="p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
            >
              <div className="font-medium text-sm text-gray-900">{preset.label}</div>
              <div className="text-xs text-gray-500 mt-1">${preset.cost}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Battery Specs</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Cost ($)</label>
              <input
                type="number"
                value={purchaseCost}
                onChange={(e) => setPurchaseCost(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (Wh)</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rated Cycle Life</label>
              <input
                type="number"
                value={cycleLife}
                onChange={(e) => setCycleLife(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Depth of Discharge ({depthOfDischarge}%)
              </label>
              <input
                type="range"
                value={depthOfDischarge}
                onChange={(e) => setDepthOfDischarge(parseInt(e.target.value))}
                className="w-full"
                min="20"
                max="100"
                step="5"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Round-Trip Efficiency ({roundTripEfficiency}%)
              </label>
              <input
                type="range"
                value={roundTripEfficiency}
                onChange={(e) => setRoundTripEfficiency(parseInt(e.target.value))}
                className="w-full"
                min="60"
                max="99"
                step="1"
              />
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Lifetime Cost
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className={`rounded-lg p-6 text-center ${
                  results.isCheaper ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
                }`}>
                  <div className="text-sm text-gray-600 mb-1">Cost Per kWh Delivered</div>
                  <div className={`text-5xl font-bold mb-1 ${results.isCheaper ? 'text-green-600' : 'text-red-600'}`}>
                    ${results.costPerKWh}
                  </div>
                  <div className="text-xs text-gray-500">
                    vs grid at ${results.gridCostPerKWh}/kWh
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Usable Per Cycle</div>
                    <div className="text-lg font-semibold">{results.usablePerCycle} Wh</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Lifetime Throughput</div>
                    <div className="text-lg font-semibold">{results.lifetimeThroughputKWh} kWh</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Lifetime Economics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery cost</span>
                      <span className="font-medium">${purchaseCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Same energy from grid</span>
                      <span className="font-medium">${parseInt(results.gridCostForSameEnergy).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-700 font-semibold">Lifetime savings</span>
                      <span className={`font-bold ${results.lifetimeSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${parseInt(results.lifetimeSavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective cost per day</span>
                      <span className="font-medium">${results.costPerDay}</span>
                    </div>
                  </div>
                </div>

                <div className={`border rounded p-3 ${results.isCheaper ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className="flex items-start">
                    <Info className={`h-4 w-4 mr-2 flex-shrink-0 mt-0.5 ${results.isCheaper ? 'text-green-600' : 'text-yellow-600'}`} />
                    <p className={`text-xs ${results.isCheaper ? 'text-green-800' : 'text-yellow-800'}`}>
                      {results.isCheaper
                        ? `This battery delivers power at $${results.savingsPerKWh}/kWh less than your local grid.`
                        : `This battery costs more per kWh than grid power — reasonable for backup, but not for daily cycling.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Enter battery specs to calculate lifetime cost</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">See How DoD Affects Cost</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/battery-dod-degradation" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Battery DoD Degradation
          </Link>
          <Link href="/calculators/battery-runtime" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Runtime Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}