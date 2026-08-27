'use client'

import Link from 'next/link'
import { useState } from 'react'
import {Calendar, Star, Check, X, Zap, Battery, Stethoscope, Info, AlertTriangle, Clock} from 'lucide-react'

export default function CPAPSolarGeneratorGuide() {
  const [cpapWatts, setCpapWatts] = useState(60)
  const [batteryCapacity, setBatteryCapacity] = useState(2000)
  const [withHumidifier, setWithHumidifier] = useState(false)

  const calculateRuntime = () => {
    const adjustedWatts = withHumidifier ? cpapWatts * 2 : cpapWatts
    const usableCapacity = batteryCapacity * 0.85
    const runtimeHours = usableCapacity / adjustedWatts
    return {
      runtimeHours: runtimeHours.toFixed(2),
      adjustedWatts
    }
  }

  const results = calculateRuntime()

  const cpapDevices = [
    { name: 'ResMed AirSense 10', watts: 60, price: 800 },
    { name: 'Philips DreamStation', watts: 55, price: 750 },
    { name: 'ResMed AirMini', watts: 25, price: 900 },
    { name: 'Fisher & Paykel ICON+', watts: 50, price: 700 }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">CPAP Machine Solar Generator Guide</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Medical</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Emergency Preparedness</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Can a Solar Generator Run a CPAP Machine?
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Sarah Johnson</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 10, 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            7 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-start mb-4">
          <Stethoscope className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
          <p className="text-gray-600">
            If you use a CPAP machine, having reliable backup power isn't just a convenience—it's a medical 
            necessity. This guide explains everything you need to know about running your CPAP on solar power, 
            including exact calculations and product recommendations.
          </p>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive CPAP Runtime Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CPAP Power Consumption (Watts)
            </label>
            <input
              type="number"
              value={cpapWatts}
              onChange={(e) => setCpapWatts(parseFloat(e.target.value))}
              className="ebay-input mb-4"
              min="10"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solar Generator Capacity (Wh)
            </label>
            <input
              type="number"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(parseFloat(e.target.value))}
              className="ebay-input mb-4"
              min="100"
            />

            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={withHumidifier}
                onChange={(e) => setWithHumidifier(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include Humidifier (doubles power draw)</span>
            </label>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
              <AlertTriangle className="h-4 w-4 text-yellow-600 inline mr-1" />
              Humidifiers can double your power consumption. Only include if you need them.
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-white rounded p-4 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {results.runtimeHours} hours
                </div>
                <div className="text-sm text-gray-600">Estimated CPAP Runtime</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-sm text-gray-500">Power Draw</div>
                  <div className="text-lg font-semibold">{results.adjustedWatts}W</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-sm text-gray-500">Nights Powered</div>
                  <div className="text-lg font-semibold">
                    {Math.floor(results.runtimeHours / 8)} nights
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CPAP Power Requirements */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding CPAP Power Requirements</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Common CPAP Machine Power Draws</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Machine</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Power Draw</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">With Humidifier</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cpapDevices.map((device) => (
                    <tr key={device.name} className="border-t">
                      <td className="px-4 py-3 text-sm">{device.name}</td>
                      <td className="px-4 py-3 text-sm">{device.watts}W</td>
                      <td className="px-4 py-3 text-sm">{device.watts * 2}W</td>
                      <td className="px-4 py-3 text-sm font-semibold">${device.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Solar Generators */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Solar Generators for CPAP</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Jackery Explorer 300',
              capacity: 293,
              cpapHours: '~35-40 hours',
              price: 299,
              rating: 4.7,
              best: 'Most Affordable'
            },
            {
              name: 'EcoFlow River 2',
              capacity: 256,
              cpapHours: '~30-35 hours',
              price: 199,
              rating: 4.6,
              best: 'Best Value'
            },
            {
              name: 'Bluetti EB3A',
              capacity: 268,
              cpapHours: '~32-38 hours',
              price: 249,
              rating: 4.5,
              best: 'Lightweight'
            },
            {
              name: 'Jackery Explorer 1000',
              capacity: 1002,
              cpapHours: '~120-140 hours',
              price: 999,
              rating: 4.9,
              best: 'For Extended Trips'
            },
            {
              name: 'EcoFlow Delta 2',
              capacity: 1024,
              cpapHours: '~120-135 hours',
              price: 899,
              rating: 4.8,
              best: 'Best Performance'
            },
            {
              name: 'Bluetti AC200MAX',
              capacity: 2048,
              cpapHours: '~240-270 hours',
              price: 1099,
              rating: 4.7,
              best: 'For Long-Term Off-Grid'
            }
          ].map(product => (
            <div key={product.name} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                  {product.best}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{product.capacity}Wh capacity</div>
              <div className="text-sm text-green-600 font-medium mb-2">
                <span className="flex items-center">
                  <Battery className="h-4 w-4 mr-1" />
                  {product.cpapHours} CPAP runtime
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">{product.rating}</span>
                </div>
                <span className="text-lg font-bold">${product.price}</span>
              </div>
              <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Deal
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Considerations */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Medical Considerations</h2>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Never Interrupt Your Therapy
            </h3>
            <p className="text-sm text-gray-600">
              CPAP therapy is critical for your health. Always ensure you have backup power available. 
              Test your setup regularly and keep your solar generator charged.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Battery Health Tips
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Keep your generator at 50%+ charge</li>
              <li>Store in a cool, dry place</li>
              <li>Exercise the battery monthly</li>
              <li>Check runtime regularly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* DIY CPAP Battery Solution */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">DIY CPAP Battery Solution</h2>
        <p className="text-gray-600 mb-4">
          For longer trips, you can build a simple battery pack:
        </p>
        
        <div className="bg-gray-50 rounded p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">What You Need</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>12V lithium battery (100Ah+)</li>
            <li>12V to 24V DC converter</li>
            <li>CPAP DC power cable</li>
            <li>Fuse and wiring</li>
            <li>Battery box/container</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Always use a DC-DC converter (not a simple voltage divider) to ensure 
            your CPAP gets clean, stable power. A 100Ah battery can power a CPAP for 5-7 nights without a humidifier.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-6 text-center bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Find the Perfect CPAP Backup Solution
        </h2>
        <p className="text-gray-600 mb-4">
          Use our battery runtime calculator to find the exact capacity you need for your specific CPAP machine.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/battery-runtime" className="ebay-btn-primary">
            Calculate CPAP Runtime
          </Link>
          <Link href="/products/portable-power-stations" className="ebay-btn-secondary">
            Browse Power Stations
          </Link>
        </div>
      </div>
    </div>
  )
}