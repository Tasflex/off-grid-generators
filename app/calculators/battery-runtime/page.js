'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Battery, Zap, Timer, Calculator, Clock, AlertTriangle, Info, Check, ArrowRight } from 'lucide-react'
import { getProductsByCategory } from '../../../lib/products'
import { toast } from 'react-hot-toast'

export default function BatteryRuntimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState(2000)
  const [deviceWatts, setDeviceWatts] = useState(100)
  const [results, setResults] = useState(null)

  const popularBatteries = [
    { name: 'Jackery Explorer 300', capacity: 293, price: 299 },
    { name: 'EcoFlow River 2', capacity: 256, price: 199 },
    { name: 'Bluetti EB3A', capacity: 268, price: 249 },
    { name: 'Jackery Explorer 1000', capacity: 1002, price: 799 },
    { name: 'EcoFlow Delta 2', capacity: 1024, price: 899 },
    { name: 'Bluetti AC200MAX', capacity: 2048, price: 1099 },
    { name: 'Jackery Explorer 2000', capacity: 2160, price: 1699 },
    { name: 'EcoFlow Delta Pro', capacity: 3600, price: 1999 }
  ]

  const popularDevices = [
    { name: 'Smartphone', watts: 10 },
    { name: 'LED Light', watts: 10 },
    { name: 'Laptop', watts: 65 },
    { name: 'CPAP Machine', watts: 60 },
    { name: 'LED TV', watts: 100 },
    { name: 'Refrigerator', watts: 150 },
    { name: 'Space Heater', watts: 1500 },
    { name: 'Microwave', watts: 1000 },
    { name: 'Portable AC', watts: 500 },
    { name: 'Well Pump', watts: 750 }
  ]

  const calculate = () => {
    if (batteryCapacity <= 0 || deviceWatts <= 0) {
      toast.error('Please enter valid values')
      return
    }

    const usableCapacity = batteryCapacity * 0.85
    const runtimeHours = usableCapacity / deviceWatts
    const nightsOfSleep = Math.floor(runtimeHours / 8)

    // Find matching products
    const allProducts = [
      ...getProductsByCategory('solarGenerators'),
      ...getProductsByCategory('portablePowerStations')
    ]
    const matchingProducts = allProducts
      .filter(p => p.capacity >= batteryCapacity * 0.8)
      .sort((a, b) => a.capacity - b.capacity)

    setResults({
      usableCapacity: Math.round(usableCapacity),
      runtimeHours: runtimeHours.toFixed(2),
      nightsOfSleep,
      matchingProducts: matchingProducts.slice(0, 3)
    })
  }

  const selectBattery = (capacity) => {
    setBatteryCapacity(capacity)
  }

  const selectDevice = (watts) => {
    setDeviceWatts(watts)
  }

  return (
    <div className="max-w-7xl mx-auto">
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
          Calculate how long any battery will run your devices before needing a recharge.
        </p>
      </div>

      {/* Calculator */}
      <div className="ebay-card p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Input Your Specifications</h2>
            
            {/* Battery Capacity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Capacity (Wh)
              </label>
              <input
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(parseFloat(e.target.value))}
                className="ebay-input"
                min="100"
              />
              
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Popular batteries:</p>
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
              <input
                type="number"
                value={deviceWatts}
                onChange={(e) => setDeviceWatts(parseFloat(e.target.value))}
                className="ebay-input"
                min="1"
              />
              
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

            <button onClick={calculate} className="ebay-btn-primary w-full py-4">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Runtime
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {results.runtimeHours}
                  </div>
                  <div className="text-gray-600">hours of runtime</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Usable Capacity</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {results.usableCapacity} Wh
                    </div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Nights of CPAP</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {results.nightsOfSleep} nights
                    </div>
                  </div>
                </div>

                {/* Recommended Products */}
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommended Products</h3>
                  <div className="space-y-2">
                    {results.matchingProducts.map(product => (
                      <div key={product.id} className="flex items-center justify-between border rounded p-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.capacity}Wh</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">${product.price}</div>
                          <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline text-xs">
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Timer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Enter your battery and device specifications to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">How Runtime is Calculated</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded p-4">
            <div className="font-mono text-sm">
              Runtime = (Battery Capacity × 0.85) / Device Wattage
            </div>
          </div>
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              We use 85% Depth of Discharge (DoD) to protect battery lifespan and give you realistic estimates.
            </p>
          </div>
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Actual runtime varies based on temperature, battery age, and device efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Need More Help?
        </h2>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Solar Sizing Calculator
          </Link>
          <Link href="/guides/how-to-choose" className="ebay-btn-secondary">
            Read Buying Guide
          </Link>
        </div>
      </div>
    </div>
  )
}