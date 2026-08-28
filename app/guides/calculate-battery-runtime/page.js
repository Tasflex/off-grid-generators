'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Calculator, Battery, Zap, Clock as ClockIcon, TrendingUp, Lightbulb, Refrigerator, Laptop, Phone } from 'lucide-react'

export default function CalculateBatteryRuntimeGuide() {
  const [batteryCapacity, setBatteryCapacity] = useState(2000)
  const [deviceWattage, setDeviceWattage] = useState(150)
  const [showResults, setShowResults] = useState(false)

  const commonDevices = [
    { name: 'Refrigerator', watts: 150, icon: Refrigerator },
    { name: 'LED Lights (4x)', watts: 30, icon: Lightbulb },
    { name: 'Laptop', watts: 65, icon: Laptop },
    { name: 'Phone Charger', watts: 10, icon: Phone },
    { name: 'CPAP Machine', watts: 60, icon: ClockIcon },
    { name: 'LED TV (50")', watts: 100, icon: Zap },
    { name: 'Wi-Fi Router', watts: 20, icon: Zap }
  ]

  const calculateRuntime = () => {
    if (batteryCapacity <= 0 || deviceWattage <= 0) return null
    
    // Calculate runtime with 85% efficiency (typical for inverters)
    const usableCapacity = batteryCapacity * 0.85
    const runtimeHours = usableCapacity / deviceWattage
    const hours = Math.floor(runtimeHours)
    const minutes = Math.round((runtimeHours - hours) * 60)
    
    return {
      runtimeHours: runtimeHours.toFixed(1),
      hours,
      minutes,
      usableCapacity: usableCapacity.toFixed(0),
      efficiency: 85
    }
  }

  const results = calculateRuntime()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How to Calculate Battery Runtime</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Educational</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Calculator</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Calculate Battery Runtime
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Learn how to calculate how long your battery or solar generator will last. 
          Use our interactive calculator to get instant results.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            8 min read
          </span>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Battery Runtime Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Capacity (Wh)
              </label>
              <input
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your battery's capacity in Watt-hours (Wh)</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Power Draw (Watts)
              </label>
              <input
                type="number"
                value={deviceWattage}
                onChange={(e) => setDeviceWattage(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your device's power consumption in Watts</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Or select a common device:</p>
              <div className="flex flex-wrap gap-2">
                {commonDevices.map(device => {
                  const Icon = device.icon
                  return (
                    <button
                      key={device.name}
                      onClick={() => setDeviceWattage(device.watts)}
                      className="flex items-center px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition text-sm"
                    >
                      <Icon className="h-4 w-4 mr-1 text-blue-600" />
                      {device.name} ({device.watts}W)
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
            
            {results && batteryCapacity > 0 && deviceWattage > 0 ? (
              <div className="space-y-6">
                <div className="bg-white rounded p-6 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {results.runtimeHours}
                  </div>
                  <div className="text-gray-600">hours</div>
                  <div className="text-sm text-gray-500 mt-1">
                    ({results.hours}h {results.minutes}m)
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery Capacity</span>
                      <span className="font-semibold">{batteryCapacity} Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Device Draw</span>
                      <span className="font-semibold">{deviceWattage} W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usable Capacity (85%)</span>
                      <span className="font-semibold">{results.usableCapacity} Wh</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-gray-600">Estimated Runtime</span>
                      <span className="font-bold text-blue-600">{results.runtimeHours} hours</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <p className="text-xs text-blue-700">
                      Runtime assumes 85% efficiency and full battery charge. Actual results vary based on temperature, battery age, and device usage patterns.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Enter values above to calculate runtime</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* The Formula */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        <div className="bg-gray-50 rounded p-6 mb-4">
          <div className="text-center font-mono text-lg">
            <div className="text-gray-500 text-sm mb-2">Runtime (hours) =</div>
            <div className="font-bold text-blue-600 text-2xl">
              Battery Capacity (Wh) × Inverter Efficiency
            </div>
            <div className="text-2xl font-bold text-blue-600">÷</div>
            <div className="font-bold text-blue-600 text-2xl">
              Device Power Draw (W)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Battery Capacity',
              description: 'Measured in Watt-hours (Wh). Check your battery label.',
              example: 'Example: 2000 Wh'
            },
            {
              label: 'Inverter Efficiency',
              description: 'Usually 85% (0.85). Higher for pure sine wave inverters.',
              example: 'Example: 0.85'
            },
            {
              label: 'Device Power Draw',
              description: 'Check your device\'s label or use our common device guide.',
              example: 'Example: 150 W (refrigerator)'
            }
          ].map(item => (
            <div key={item.label} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="text-xs text-gray-500">{item.example}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Device Power Guide */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Device Power Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Device</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Average Watts</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Daily Hours</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Daily Wh</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">2000Wh Runtime</th>
              </tr>
            </thead>
            <tbody>
              {[
                { device: 'Refrigerator', watts: 150, hours: 24, dailyWh: 3600, runtime: 11.3 },
                { device: 'LED TV (50")', watts: 100, hours: 4, dailyWh: 400, runtime: 17 },
                { device: 'Laptop', watts: 65, hours: 6, dailyWh: 390, runtime: 26 },
                { device: 'Phone Charger', watts: 10, hours: 2, dailyWh: 20, runtime: 170 },
                { device: 'CPAP Machine', watts: 60, hours: 8, dailyWh: 480, runtime: 28 },
                { device: 'Wi-Fi Router', watts: 20, hours: 24, dailyWh: 480, runtime: 85 },
                { device: 'LED Lights (4x)', watts: 30, hours: 6, dailyWh: 180, runtime: 56 }
              ].map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{item.device}</td>
                  <td className="px-4 py-3 text-sm">{item.watts}W</td>
                  <td className="px-4 py-3 text-sm">{item.hours}h</td>
                  <td className="px-4 py-3 text-sm">{item.dailyWh}Wh</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{item.runtime}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          * Runtime calculated with 85% efficiency on a 2000Wh battery
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips to Extend Battery Runtime</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              tip: 'Use DC power directly',
              description: 'Many devices can run on 12V DC, bypassing the inverter and saving 15% efficiency loss.'
            },
            {
              tip: 'Turn off unused devices',
              description: 'Even in standby mode, devices draw power. Unplug or turn off when not needed.'
            },
            {
              tip: 'Use energy-efficient appliances',
              description: 'LED lights and Energy Star appliances use significantly less power.'
            },
            {
              tip: 'Keep batteries warm',
              description: 'Batteries lose capacity in cold weather. Keep them above 50°F for best performance.'
            }
          ].map(item => (
            <div key={item.tip} className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.tip}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Why do I get less runtime than expected?',
              a: 'Batteries have a usable capacity (usually 80-85% of rated capacity) due to inverter inefficiency, temperature, and depth of discharge limits.'
            },
            {
              q: 'How do I check my device power draw?',
              a: 'Check the device label or user manual. You can also use a Kill-A-Watt meter for real-time measurements.'
            },
            {
              q: 'Can I run multiple devices at once?',
              a: 'Yes, but total wattage must be under the inverter\'s rated output. Runtime = Capacity ÷ Total Watts.'
            }
          ].map((faq, index) => (
            <div key={index} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Calculate Your Runtime?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our full battery runtime calculator for more detailed results.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/battery-runtime" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Full Runtime Calculator
          </Link>
          <Link href="/calculators/solar-sizing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Solar Sizing Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}