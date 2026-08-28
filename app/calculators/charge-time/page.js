'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Timer, Calculator, Zap, Sun, Plug, Car, Info, AlertTriangle, ArrowRight, Check } from 'lucide-react'
import { getProductsByCategory } from '../../../lib/products'
import { toast } from 'react-hot-toast'

export default function ChargeTimeCalculatorPage() {
  const [batteryCapacity, setBatteryCapacity] = useState(2000)
  const [chargeMethod, setChargeMethod] = useState('solar')
  const [solarWatts, setSolarWatts] = useState(200)
  const [acWatts, setAcWatts] = useState(1500)
  const [results, setResults] = useState(null)

  const chargeMethods = [
    { id: 'solar', label: 'Solar Panels', icon: Sun, description: 'Charge from solar panels' },
    { id: 'ac', label: 'AC Wall Outlet', icon: Plug, description: 'Charge from standard wall outlet' },
    { id: 'car', label: 'Car Charging', icon: Car, description: 'Charge from vehicle outlet' }
  ]

  const solarPanelOptions = [
    { label: '100W Panel', value: 100 },
    { label: '200W Panel', value: 200 },
    { label: '400W Panel', value: 400 },
    { label: '800W Panel Array', value: 800 }
  ]

  const getRecommendedProducts = (capacity) => {
    const allProducts = [
      ...getProductsByCategory('solarGenerators'),
      ...getProductsByCategory('portablePowerStations')
    ]

    // Find products with similar capacity
    return allProducts
      .sort((a, b) => Math.abs(a.capacity - capacity) - Math.abs(b.capacity - capacity))
      .slice(0, 3)
  }

  const calculate = () => {
    if (batteryCapacity <= 0) {
      toast.error('Please enter a valid battery capacity')
      return
    }

    let chargeWatts = 0
    let efficiency = 0.85 // Charge controller efficiency
    let chargeLabel = ''

    if (chargeMethod === 'solar') {
      chargeWatts = solarWatts * efficiency
      chargeLabel = `${solarWatts}W solar`
    } else if (chargeMethod === 'ac') {
      chargeWatts = acWatts * efficiency
      chargeLabel = `${acWatts}W AC`
    } else {
      chargeWatts = 100 * efficiency
      chargeLabel = '100W car'
    }

    const chargeTime = batteryCapacity / chargeWatts
    const hours = Math.floor(chargeTime)
    const minutes = Math.round((chargeTime - hours) * 60)

    // Get product recommendations
    const recommendedProducts = getRecommendedProducts(batteryCapacity)

    setResults({
      chargeTime: chargeTime.toFixed(1),
      hours,
      minutes,
      chargeWatts: Math.round(chargeWatts),
      chargeLabel,
      fullChargeTime: chargeTime > 0 ? chargeTime.toFixed(1) : 'N/A',
      recommendedProducts
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Charge Time</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Charge Time Calculator</h1>
        <p className="text-gray-600">
          Calculate how long it takes to charge your solar generator using different methods.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Input Your Specifications</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Capacity (Wh)
              </label>
              <input
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Charge Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {chargeMethods.map(method => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setChargeMethod(method.id)}
                      className={`p-3 border rounded-lg text-center ${
                        chargeMethod === method.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <Icon className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-xs font-medium">{method.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {chargeMethod === 'solar' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solar Panel Wattage
                </label>
                <select
                  value={solarWatts}
                  onChange={(e) => setSolarWatts(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {solarPanelOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {chargeMethod === 'ac' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AC Input Wattage
                </label>
                <input
                  type="number"
                  value={acWatts}
                  onChange={(e) => setAcWatts(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Standard wall outlet: 1500W, Fast charger: 3000W
                </p>
              </div>
            )}

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Charge Time
            </button>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <Timer className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {results.chargeTime}
                  </div>
                  <div className="text-gray-600">hours to full charge</div>
                  <div className="text-sm text-gray-500 mt-1">
                    ({results.hours}h {results.minutes}m)
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-600 mb-2">Charging Details:</div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Charge Power</span>
                      <span className="font-semibold">{results.chargeWatts}W</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method</span>
                      <span className="font-semibold">{results.chargeLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Battery Capacity</span>
                      <span className="font-semibold">{batteryCapacity}Wh</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Actual charge times may vary based on temperature, battery age, and charger efficiency.
                    </p>
                  </div>
                </div>

                {/* Product Recommendations */}
                {results.recommendedProducts && results.recommendedProducts.length > 0 && (
                  <div className="bg-white rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Similar Products</h3>
                    <div className="space-y-2">
                      {results.recommendedProducts.map(product => (
                        <div key={product.id} className="border rounded p-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">
                              {product.capacity}Wh | {product.output}W
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">${product.price}</div>
                            <Link href={`/products/${product.id}`} className="text-xs text-blue-600 hover:underline">
                              View Deal
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Timer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Enter your battery and charging specifications to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Charging Tips</h2>
        <div className="space-y-3">
          {[
            'Solar charging is slowest but free. AC charging is fastest but costs electricity.',
            'Use MPPT charge controllers for best solar efficiency.',
            'Avoid charging in extreme temperatures. Cold slows charging, heat damages batteries.',
            'Partial charges are fine for lithium batteries. You don\'t need to fully discharge first.',
            'Keep your generator plugged in during outages to ensure it\'s ready when needed.'
          ].map(tip => (
            <div key={tip} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Explore More Calculators
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing
          </Link>
          <Link href="/calculators/battery-runtime" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Battery Runtime
          </Link>
          <Link href="/calculators/off-grid-budget" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Budget Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}