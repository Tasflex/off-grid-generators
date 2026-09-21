'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingDown, Calculator, Info, AlertTriangle, Sun, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function PanelDegradationPage() {
  const [initialWattage, setInitialWattage] = useState(400)
  const [degradationRate, setDegradationRate] = useState(0.5)
  const [years, setYears] = useState(10)
  const [results, setResults] = useState(null)

  const ratePresets = [
    { label: 'Premium (0.25%)', value: 0.25, desc: 'SunPower, Panasonic' },
    { label: 'Standard (0.5%)', value: 0.5, desc: 'Most Tier-1 panels' },
    { label: 'Budget (0.7%)', value: 0.7, desc: 'Economy panels' },
    { label: 'Poor (1.0%)', value: 1.0, desc: 'Low-quality panels' }
  ]

  const calculate = () => {
    if (initialWattage <= 0 || degradationRate < 0 || years <= 0) {
      toast.error('Please enter valid values')
      return
    }

    // Year-by-year calculation for chart
    const yearlyData = []
    for (let y = 0; y <= years; y++) {
      const remainingWattage = initialWattage * Math.pow(1 - degradationRate / 100, y)
      yearlyData.push({
        year: y,
        wattage: remainingWattage,
        lossPercent: ((initialWattage - remainingWattage) / initialWattage) * 100
      })
    }

    const finalWattage = yearlyData[yearlyData.length - 1].wattage
    const totalLoss = initialWattage - finalWattage
    const totalLossPercent = (totalLoss / initialWattage) * 100

    // Energy production estimate (assume 5 sun hours/day)
    const dailyLossWh = totalLoss * 5
    const yearlyLossKWh = (dailyLossWh * 365) / 1000

    setResults({
      finalWattage: finalWattage.toFixed(1),
      totalLoss: totalLoss.toFixed(1),
      totalLossPercent: totalLossPercent.toFixed(2),
      yearlyLossKWh: yearlyLossKWh.toFixed(1),
      yearlyData
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Panel Degradation</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Panel Degradation Loss Per Year Calculator</h1>
        <p className="text-gray-600">
          See how much power your solar panels lose each year and what they'll produce in the future.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Input Your Specs</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Panel Wattage (W)
              </label>
              <input
                type="number"
                value={initialWattage}
                onChange={(e) => setInitialWattage(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Degradation Rate (%)
              </label>
              <input
                type="number"
                value={degradationRate}
                onChange={(e) => setDegradationRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="5"
                step="0.05"
              />
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Typical rates:</p>
                <div className="flex flex-wrap gap-2">
                  {ratePresets.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => setDegradationRate(preset.value)}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        degradationRate === preset.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-blue-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years to Project
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="40"
              />
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Degradation
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-500">Wattage After {years} Years</div>
                  <div className="text-3xl font-bold text-blue-600">{results.finalWattage} W</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Down from {initialWattage}W ({results.totalLossPercent}% loss)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Total Loss</div>
                    <div className="text-lg font-semibold text-red-600">{results.totalLoss} W</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Yearly Energy Loss</div>
                    <div className="text-lg font-semibold text-orange-600">{results.yearlyLossKWh} kWh</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Projection</h3>
                  <div className="space-y-1 text-xs">
                    {[0, 5, 10, 15, 20, 25].filter(y => y <= years).map(y => {
                      const data = results.yearlyData[y]
                      return (
                        <div key={y} className="flex justify-between">
                          <span className="text-gray-600">Year {y}</span>
                          <span className="font-medium">{data.wattage.toFixed(1)}W</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingDown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Enter your specs to project panel degradation</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Why Panels Degrade</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">UV Exposure</h3>
            <p className="text-sm text-gray-600">Continuous UV light slowly breaks down the semiconductor material, reducing power output over time.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Thermal Cycling</h3>
            <p className="text-sm text-gray-600">Daily heating and cooling causes micro-cracks in cells and solder joints, decreasing efficiency.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Potential-Induced Degradation</h3>
            <p className="text-sm text-gray-600">Voltage stress between cells and frame can cause leakage currents that reduce output.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Plan for the Long Haul</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing Calculator
          </Link>
          <Link href="/guides/how-to-choose" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Panel Buying Guide
          </Link>
        </div>
      </div>
    </div>
  )
}