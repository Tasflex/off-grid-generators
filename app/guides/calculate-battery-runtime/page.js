'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock, Battery, Zap, Timer, Info, ArrowRight, Check, AlertTriangle } from 'lucide-react'

export default function CalculateBatteryRuntime() {
  const [batteryCapacity, setBatteryCapacity] = useState(2000)
  const [deviceWattage, setDeviceWattage] = useState(150)
  const [inverterEfficiency, setInverterEfficiency] = useState(90)

  const calculateRuntime = () => {
    const usableCapacity = batteryCapacity * 0.85 // 85% DoD
    const adjustedWattage = deviceWattage * (inverterEfficiency / 100)
    const runtime = usableCapacity / adjustedWattage
    return {
      runtimeHours: runtime.toFixed(2),
      usableCapacity: Math.round(usableCapacity),
      adjustedWattage: Math.round(adjustedWattage)
    }
  }

  const results = calculateRuntime()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Calculate Battery Runtime</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Calculator Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Calculate Battery Runtime
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            6 min read
          </span>
        </div>
      </div>

      {/* Formula Visualization */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <div className="text-center">
            <div className="inline-block bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Runtime (hours) =</div>
              <div className="text-2xl font-bold text-gray-900">
                (Battery Capacity × 0.85) / Device Wattage
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">🔋</div>
            <h3 className="font-semibold text-gray-900">Battery Capacity</h3>
            <p className="text-sm text-gray-600">Measured in Watt-hours (Wh)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Device Wattage</h3>
            <p className="text-sm text-gray-600">Power draw in Watts (W)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">0.85 Factor</h3>
            <p className="text-sm text-gray-600">85% max discharge</p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Wattage (W)
              </label>
              <input
                type="number"
                value={deviceWattage}
                onChange={(e) => setDeviceWattage(parseFloat(e.target.value))}
                className="ebay-input"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inverter Efficiency (%)
              </label>
              <select
                value={inverterEfficiency}
                onChange={(e) => setInverterEfficiency(parseFloat(e.target.value))}
                className="ebay-input"
              >
                <option value="85">85% (Low quality)</option>
                <option value="90">90% (Standard)</option>
                <option value="95">95% (High quality)</option>
              </select>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-white rounded p-4 text-center">
                <div className="text-sm text-gray-500">Estimated Runtime</div>
                <div className="text-4xl font-bold text-blue-600">
                  {results.runtimeHours} hours
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3">
                  <div className="text-xs text-gray-500">Usable Capacity</div>
                  <div className="text-lg font-semibold">{results.usableCapacity} Wh</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-xs text-gray-500">Effective Load</div>
                  <div className="text-lg font-semibold">{results.adjustedWattage} W</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding DoD */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Depth of Discharge (DoD)</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Depth of Discharge (DoD) refers to how much of your battery's capacity you use before recharging. 
            Most lithium batteries should not be discharged below 15-20% to maintain longevity.
          </p>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Battery DoD Comparison:</h3>
            <div className="space-y-3">
              {[
                { battery: 'Lithium (LiFePO4)', dod: 85, cycles: 3500, icon: '🔋' },
                { battery: 'Lithium-ion (NMC)', dod: 80, cycles: 2000, icon: '⚡' },
                { battery: 'Lead Acid', dod: 50, cycles: 500, icon: '🔌' }
              ].map(battery => (
                <div key={battery.battery} className="bg-white rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{battery.icon} {battery.battery}</span>
                    <span className="text-sm text-gray-500">{battery.cycles} cycles</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 rounded-full h-3"
                      style={{ width: `${battery.dod}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-medium text-blue-600">{battery.dod}% DoD</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Scenarios */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Runtime Scenarios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              device: 'Smartphone',
              watts: 10,
              capacity: '2000Wh battery',
              runtime: '170 hours'
            },
            {
              device: 'Laptop',
              watts: 65,
              capacity: '2000Wh battery',
              runtime: '26 hours'
            },
            {
              device: 'CPAP Machine',
              watts: 60,
              capacity: '2000Wh battery',
              runtime: '28 hours'
            },
            {
              device: 'Refrigerator',
              watts: 150,
              capacity: '2000Wh battery',
              runtime: '11 hours'
            },
            {
              device: 'LED TV',
              watts: 100,
              capacity: '2000Wh battery',
              runtime: '17 hours'
            },
            {
              device: 'Microwave',
              watts: 1000,
              capacity: '2000Wh battery',
              runtime: '1.7 hours'
            }
          ].map(scenario => (
            <div key={scenario.device} className="border rounded p-3">
              <h3 className="font-semibold text-gray-900 mb-1">{scenario.device}</h3>
              <div className="text-sm text-gray-600">
                <div>Power: {scenario.watts}W</div>
                <div>Capacity: {scenario.capacity}</div>
                <div className="font-semibold text-blue-600">Runtime: {scenario.runtime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips to Extend Runtime</h2>
        
        <div className="space-y-3">
          {[
            'Use DC-powered devices instead of AC (saves inverter loss)',
            'Turn off devices when not in use',
            'Keep your battery in optimal temperature range (60-80°F)',
            'Avoid running high-wattage devices simultaneously',
            'Use power-saving modes on your devices',
            'Regularly exercise and charge your battery'
          ].map(tip => (
            <div key={tip} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Use Our Battery Runtime Calculator
        </h2>
        <p className="text-gray-600 mb-4">
          Get instant results for your specific battery and devices.
        </p>
        <Link href="/calculators/battery-runtime" className="ebay-btn-primary inline-block">
          Open Calculator
        </Link>
      </div>
    </div>
  )
}