'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Battery, Zap, Timer, Info, Calculator } from 'lucide-react'
import { calculateBatteryRuntime } from '../../../lib/calculators'
import { toast } from 'react-hot-toast'

export default function BatteryRuntimeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState(2000)
  const [deviceWatts, setDeviceWatts] = useState(500)
  const [results, setResults] = useState(null)
  const [savedResults, setSavedResults] = useState([])

  const popularBatteries = [
    { name: 'Jackery Explorer 1000', capacity: 1002, price: 999 },
    { name: 'EcoFlow Delta 2', capacity: 1024, price: 899 },
    { name: 'Bluetti AC200MAX', capacity: 2048, price: 1099 },
    { name: 'EcoFlow Delta Pro', capacity: 3600, price: 1999 },
    { name: 'Jackery Explorer 2000', capacity: 2160, price: 1699 },
  ]

  const popularDevices = [
    { name: 'Smartphone', watts: 10 },
    { name: 'Laptop', watts: 65 },
    { name: 'CPAP Machine', watts: 60 },
    { name: 'LED TV', watts: 100 },
    { name: 'Refrigerator', watts: 150 },
    { name: 'Portable AC', watts: 500 },
    { name: 'Microwave', watts: 1000 },
    { name: 'Well Pump', watts: 750 },
  ]

  const handleCalculate = () => {
    if (batteryCapacity <= 0 || deviceWatts <= 0) {
      toast.error('Please enter valid values')
      return
    }

    const result = calculateBatteryRuntime(batteryCapacity, deviceWatts)
    setResults(result)
    
    // Save to history
    const historyItem = {
      id: Date.now(),
      capacity: batteryCapacity,
      watts: deviceWatts,
      runtime: result.runtimeHours,
      date: new Date().toISOString()
    }
    setSavedResults([...savedResults, historyItem])
  }

  const selectBattery = (capacity) => {
    setBatteryCapacity(capacity)
  }

  const selectDevice = (watts) => {
    setDeviceWatts(watts)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Battery Runtime</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Battery Runtime Calculator</h1>
        <p className="text-gray-600">
          Calculate how long your battery will run your devices. Select a common battery or enter custom specifications.
        </p>
      </div>

      {/* Calculator Section */}
      <div className="ebay-card p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Input Your Specifications</h2>
            
            {/* Battery Capacity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Capacity (Wh)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(parseFloat(e.target.value))}
                  className="ebay-input"
                  min="1"
                />
                <span className="text-gray-500">Wh</span>
              </div>
              
              {/* Popular battery quick select */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Quick select:</p>
                <div className="flex flex-wrap gap-2">
                  {popularBatteries.map(battery => (
                    <button
                      key={battery.name}
                      onClick={() => selectBattery(battery.capacity)}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        batteryCapacity === battery.capacity
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-blue-600'
                      }`}
                    >
                      {battery.capacity}Wh
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Device Wattage */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Power Consumption (Watts)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={deviceWatts}
                  onChange={(e) => setDeviceWatts(parseFloat(e.target.value))}
                  className="ebay-input"
                  min="1"
                />
                <span className="text-gray-500">W</span>
              </div>
              
              {/* Popular device quick select */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Popular devices:</p>
                <div className="flex flex-wrap gap-2">
                  {popularDevices.map(device => (
                    <button
                      key={device.name}
                      onClick={() => selectDevice(device.watts)}
                      className={`px-3 py-1 text-xs rounded-full border ${
                        deviceWatts === device.watts
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-blue-600'
                      }`}
                    >
                      {device.name} ({device.watts}W)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="ebay-btn-primary w-full"
            >
              Calculate Runtime
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {results.runtimeHours}
                  </div>
                  <div className="text-gray-600">hours of runtime</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Battery Capacity</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {batteryCapacity} Wh
                    </div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Device Load</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {deviceWatts} W
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Available capacity (after 85% DoD):
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 rounded-full h-4"
                        style={{ width: `${(batteryCapacity * 0.85 / batteryCapacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(batteryCapacity * 0.85)} Wh
                    </span>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
                  <strong>Recommendation:</strong> For {deviceWatts}W devices, a battery with at least 
                  {Math.ceil((deviceWatts * 10) / 0.85)} Wh capacity would give you 10+ hours of runtime.
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Timer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Enter your specifications and click Calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          How Battery Runtime is Calculated
        </h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">The Formula</h3>
            <div className="bg-gray-50 rounded p-4 font-mono">
              Runtime (hours) = (Battery Capacity × 0.85) / Device Wattage
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why 85% Factor?</h3>
            <p>
              Most lithium batteries should not be discharged below 20% to maintain battery health. 
              We use the 85% factor to account for this Depth of Discharge (DoD) limit, ensuring you 
              don't damage your battery and still have accurate runtime estimates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Important Considerations</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Actual runtime may vary based on battery age and temperature</li>
              <li>Devices with motors or compressors draw more power at startup</li>
              <li>Inverter efficiency losses reduce actual runtime by 10-15%</li>
              <li>Multiple devices running simultaneously add their wattages together</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Batteries */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Batteries Based on Runtime</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularBatteries.map(battery => {
            const runtime = calculateBatteryRuntime(battery.capacity, deviceWatts)
            return (
              <div key={battery.name} className="ebay-card p-4 hover:shadow-lg transition">
                <h3 className="font-semibold text-gray-900 mb-1">{battery.name}</h3>
                <div className="text-sm text-gray-500 mb-2">{battery.capacity} Wh</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${battery.price}</span>
                  <span className="text-sm text-blue-600 font-medium">
                    {runtime.runtimeHours} hrs runtime
                  </span>
                </div>
                <Link
                  href={`/products/${battery.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700"
                >
                  View Deal
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Related Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/calculators/solar-sizing" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Solar Sizing Calculator</h3>
          <p className="text-sm text-gray-600">Calculate your total solar system needs</p>
        </Link>
        <Link href="/calculators/off-grid-budget" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Off-Grid Budget</h3>
          <p className="text-sm text-gray-600">Estimate your total system cost</p>
        </Link>
        <Link href="/calculators/solar-panel-layout" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Panel Layout</h3>
          <p className="text-sm text-gray-600">Plan your solar panel installation</p>
        </Link>
      </div>
    </div>
  )
}