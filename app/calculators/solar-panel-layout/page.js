'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Calculator, Grid, Zap, Info, AlertTriangle, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SolarPanelLayoutCalculatorPage() {
  const [dailyEnergy, setDailyEnergy] = useState(2000)
  const [sunHours, setSunHours] = useState(5)
  const [panelWattage, setPanelWattage] = useState(400)
  const [roofArea, setRoofArea] = useState(20)
  const [results, setResults] = useState(null)

  const sunHourOptions = [
    { label: 'Arizona (Excellent)', value: 6.5 },
    { label: 'California (Good)', value: 5.5 },
    { label: 'Texas (Good)', value: 5.0 },
    { label: 'New York (Average)', value: 3.5 },
    { label: 'Seattle (Low)', value: 2.5 }
  ]

  const panelOptions = [
    { label: '100W Panels', value: 100 },
    { label: '200W Panels', value: 200 },
    { label: '350W Panels', value: 350 },
    { label: '400W Panels', value: 400 },
    { label: '550W Panels', value: 550 }
  ]

  const calculate = () => {
    if (dailyEnergy <= 0 || sunHours <= 0 || panelWattage <= 0) {
      toast.error('Please enter valid values')
      return
    }

    // Solar production calculation
    const systemSizeKW = dailyEnergy / (sunHours * 0.8) / 1000 // 80% system efficiency
    const numberOfPanels = Math.ceil((systemSizeKW * 1000) / panelWattage)
    const totalSystemWatts = numberOfPanels * panelWattage
    const requiredArea = numberOfPanels * (panelWattage === 100 ? 0.6 : panelWattage === 200 ? 1.1 : panelWattage === 350 ? 1.7 : panelWattage === 400 ? 1.9 : 2.5)
    
    // Battery storage needed
    const batteryStorage = dailyEnergy * 1.2 // 20% margin

    setResults({
      systemSizeKW: systemSizeKW.toFixed(2),
      numberOfPanels,
      totalSystemWatts,
      requiredArea: requiredArea.toFixed(1),
      batteryStorage: Math.round(batteryStorage),
      fitsOnRoof: requiredArea <= roofArea
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Solar Panel Layout</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Solar Panel Layout Calculator</h1>
        <p className="text-gray-600">
          Calculate how many solar panels you need and plan your installation.
        </p>
      </div>

      {/* Calculator */}
      <div className="ebay-card p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Input Your Specifications</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Energy Consumption (Wh/day)
              </label>
              <input
                type="number"
                value={dailyEnergy}
                onChange={(e) => setDailyEnergy(parseFloat(e.target.value))}
                className="ebay-input"
                min="100"
                placeholder="e.g. 2000"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peak Sun Hours (per day)
              </label>
              <input
                type="number"
                value={sunHours}
                onChange={(e) => setSunHours(parseFloat(e.target.value))}
                className="ebay-input"
                min="1"
                max="8"
                step="0.5"
              />
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Select location:</p>
                <div className="flex flex-wrap gap-2">
                  {sunHourOptions.map(option => (
                    <button
                      key={option.label}
                      onClick={() => setSunHours(option.value)}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        sunHours === option.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-blue-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Wattage
              </label>
              <select
                value={panelWattage}
                onChange={(e) => setPanelWattage(parseFloat(e.target.value))}
                className="ebay-input"
              >
                {panelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Roof Area (sq ft)
              </label>
              <input
                type="number"
                value={roofArea}
                onChange={(e) => setRoofArea(parseFloat(e.target.value))}
                className="ebay-input"
                min="1"
                placeholder="e.g. 20"
              />
            </div>

            <button onClick={calculate} className="ebay-btn-primary w-full py-4">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Layout
            </button>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            
            {results ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {results.numberOfPanels}
                  </div>
                  <div className="text-gray-600">Solar Panels Needed</div>
                  <div className="text-sm text-gray-500 mt-2">
                    {results.totalSystemWatts}W total system
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">System Size</div>
                    <div className="text-lg font-semibold">{results.systemSizeKW} kW</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Area Required</div>
                    <div className="text-lg font-semibold">{results.requiredArea} sq ft</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Battery Storage</div>
                    <div className="text-lg font-semibold">{results.batteryStorage.toLocaleString()} Wh</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Roof Fit</div>
                    <div className={`text-lg font-semibold ${results.fitsOnRoof ? 'text-green-600' : 'text-red-600'}`}>
                      {results.fitsOnRoof ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>

                {!results.fitsOnRoof && (
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-red-700">
                        Your roof area ({roofArea} sq ft) is not enough for {results.numberOfPanels} panels. 
                        Consider higher wattage panels or ground mounting.
                      </p>
                    </div>
                  </div>
                )}

                <Link href="/products/solar-panels" className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Shop Solar Panels
                </Link>
              </div>
            ) : (
              <div className="text-center py-12">
                <Grid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Enter your specifications to calculate your solar panel layout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">How We Calculate</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">The Formula</h3>
            <div className="font-mono text-sm">
              System Size (kW) = Daily Energy / (Sun Hours × 0.8)
            </div>
          </div>
          
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              We use 80% system efficiency to account for inverter losses, panel degradation, 
              and temperature effects on solar panel output.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Found Your Panel Count?
        </h2>
        <div className="flex justify-center space-x-4">
          <Link href="/products/solar-panels" className="ebay-btn-primary">
            Shop Solar Panels
          </Link>
          <Link href="/calculators/solar-sizing" className="ebay-btn-secondary">
            Solar Sizing Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}