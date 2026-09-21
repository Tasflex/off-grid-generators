'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Thermometer, Calculator, Sun, Info, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function TemperatureCoefficientPage() {
  const [panelWattage, setPanelWattage] = useState(400)
  const [tempCoefficient, setTempCoefficient] = useState(-0.35)
  const [cellTemp, setCellTemp] = useState(45)
  const [arraySize, setArraySize] = useState(4000)
  const [results, setResults] = useState(null)

  const coefficientPresets = [
    { label: 'Premium Mono (-0.29%)', value: -0.29, desc: 'SunPower, Panasonic' },
    { label: 'Standard Mono (-0.35%)', value: -0.35, desc: 'Most Tier-1 panels' },
    { label: 'Budget Poly (-0.40%)', value: -0.40, desc: 'Economy panels' },
    { label: 'Thin Film (-0.25%)', value: -0.25, desc: 'CdTe, CIGS' }
  ]

  const cellTempPresets = [
    { label: 'Cool (25°C)', value: 25, desc: 'STC reference' },
    { label: 'Mild (35°C)', value: 35, desc: 'Spring / fall, good airflow' },
    { label: 'Warm (45°C)', value: 45, desc: 'Summer, moderate airflow' },
    { label: 'Hot (60°C)', value: 60, desc: 'Summer, poor airflow' },
    { label: 'Extreme (75°C)', value: 75, desc: 'Desert, no airflow' }
  ]

  const calculate = () => {
    if (panelWattage <= 0 || cellTemp < 0) {
      toast.error('Please enter valid values')
      return
    }

    // Reference temp is 25°C (STC)
    const tempDelta = cellTemp - 25

    // Temperature coefficient is typically negative (per °C)
    const lossPercent = tempCoefficient * tempDelta
    const actualLossPercent = lossPercent  // negative means loss

    // Actual output at this temperature
    const actualWattage = panelWattage * (1 + actualLossPercent / 100)

    // Total array output
    const totalArrayOutput = (actualWattage / panelWattage) * arraySize
    const arrayLoss = arraySize - totalArrayOutput

    // Annual estimate: assume this temp for half the year, milder for other half
    const avgLoss = actualLossPercent / 2  // rough annual average
    const annualProduction = (arraySize * (1 + avgLoss / 100) * 5 * 365) / 1000

    // If coefficient were -0.29 (premium) instead of current
    const betterWattage = panelWattage * (1 + (-0.29 * tempDelta) / 100)
    const yearlyGain = ((betterWattage - actualWattage) / panelWattage) * arraySize * 5 * 365 / 1000

    setResults({
      tempDelta: tempDelta.toFixed(1),
      lossPercent: Math.abs(actualLossPercent).toFixed(2),
      actualWattage: actualWattage.toFixed(1),
      totalArrayOutput: totalArrayOutput.toFixed(0),
      arrayLoss: Math.abs(arrayLoss).toFixed(0),
      annualProduction: annualProduction.toFixed(0),
      yearlyGain: yearlyGain.toFixed(0),
      isHeating: tempDelta > 0
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Temperature Coefficient Loss</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Temperature Coefficient Loss Calculator</h1>
        <p className="text-gray-600">
          Solar panels lose efficiency as they heat up. See exactly how much power you lose — and how much a better panel would gain.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Panel &amp; Climate</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Rated Wattage (W)
              </label>
              <input
                type="number"
                value={panelWattage}
                onChange={(e) => setPanelWattage(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Temperature Coefficient (per °C)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {coefficientPresets.map(preset => (
                  <button
                    key={preset.value}
                    onClick={() => setTempCoefficient(preset.value)}
                    className={`p-2 border rounded-md text-xs text-left ${
                      tempCoefficient === preset.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium">{preset.label}</div>
                    <div className="text-gray-500">{preset.desc}</div>
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={tempCoefficient}
                onChange={(e) => setTempCoefficient(parseFloat(e.target.value))}
                className="w-full mt-2 px-3 py-1 text-sm border border-gray-300 rounded-md"
                step="0.01"
                max="0"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cell Temperature (°C)
              </label>
              <div className="grid grid-cols-5 gap-1 mb-2">
                {cellTempPresets.map(preset => (
                  <button
                    key={preset.value}
                    onClick={() => setCellTemp(preset.value)}
                    className={`p-2 border rounded-md text-xs ${
                      cellTemp === preset.value
                        ? 'border-blue-600 bg-blue-50 text-blue-800 font-medium'
                        : 'border-gray-300 text-gray-600 hover:border-blue-400'
                    }`}
                    title={preset.desc}
                  >
                    {preset.value}°
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={cellTemp}
                onChange={(e) => setCellTemp(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="-20"
                max="100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Array Size (W)
              </label>
              <input
                type="number"
                value={arraySize}
                onChange={(e) => setArraySize(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Temperature Loss
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className={`bg-white rounded-lg p-6 text-center ${results.isHeating ? '' : 'bg-blue-50'}`}>
                  <div className="text-sm text-gray-500 mb-1">
                    {results.isHeating ? 'Output Loss' : 'Output Gain'}
                  </div>
                  <div className={`text-5xl font-bold ${results.isHeating ? 'text-red-500' : 'text-green-500'}`}>
                    {results.lossPercent}%
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    ΔT = {results.tempDelta}°C from STC (25°C)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Actual Panel Output</div>
                    <div className="text-lg font-semibold">{results.actualWattage} W</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Total Array Output</div>
                    <div className="text-lg font-semibold">{results.totalArrayOutput} W</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-500 mb-1">Power Lost to Heat</div>
                  <div className="text-2xl font-bold text-red-600">{results.arrayLoss} W</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Estimated {results.annualProduction} kWh/year at this temperature
                  </div>
                </div>

                {results.isHeating && tempCoefficient !== -0.29 && (
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-green-800">
                        Switching to premium panels (-0.29%/°C) would recover ~{results.yearlyGain} kWh/year.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Thermometer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Enter your specs to estimate temperature loss</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Why Heat Hurts Solar Panels</h2>
        <p className="text-sm text-gray-600 mb-4">
          Solar cells are semiconductors. As temperature rises, the bandgap narrows and open-circuit voltage drops — cutting power output. Standard test conditions (STC) are at 25°C cell temperature, but real cells often run 25-40°C hotter than ambient air.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded p-4">
            <div className="text-2xl font-bold text-blue-600 mb-1">25°C</div>
            <div className="text-sm text-gray-600">STC reference — panel produces rated wattage</div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">45°C</div>
            <div className="text-sm text-gray-600">Typical summer cell temp — 7% loss on standard panel</div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <div className="text-2xl font-bold text-red-600 mb-1">65°C</div>
            <div className="text-sm text-gray-600">Rooftop on hot day — 14% loss on standard panel</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Keep Your Panels Cool</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/panel-degradation" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Degradation Calculator
          </Link>
          <Link href="/guides/how-to-install-solar-panels" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Installation Best Practices
          </Link>
        </div>
      </div>
    </div>
  )
}