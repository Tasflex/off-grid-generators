'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Calculator, Info, AlertTriangle, Check, ArrowRight, Plug, Power, Home, Caravan, Tent } from 'lucide-react'
import { calculateACLoad, getRecommendedInverter } from '../../../lib/calculators'
import { toast } from 'react-hot-toast'

export default function InverterSizingPage() {
  const [selectedDevices, setSelectedDevices] = useState([])
  const [customDevices, setCustomDevices] = useState([])
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const deviceOptions = [
    { id: 'refrigerator', name: 'Refrigerator', watts: 150, surgeWatts: 600, hours: 24, icon: '❄️' },
    { id: 'freezer', name: 'Freezer', watts: 100, surgeWatts: 400, hours: 24, icon: '🧊' },
    { id: 'wellpump', name: 'Well Pump', watts: 750, surgeWatts: 2250, hours: 2, icon: '🔵' },
    { id: 'tv', name: 'LED TV', watts: 100, surgeWatts: 100, hours: 4, icon: '📺' },
    { id: 'laptop', name: 'Laptop Charger', watts: 65, surgeWatts: 65, hours: 4, icon: '💻' },
    { id: 'microwave', name: 'Microwave', watts: 1000, surgeWatts: 1500, hours: 0.5, icon: '🍲' },
    { id: 'coffee', name: 'Coffee Maker', watts: 800, surgeWatts: 800, hours: 0.5, icon: '☕' },
    { id: 'ac', name: 'Portable AC', watts: 500, surgeWatts: 1500, hours: 6, icon: '❄️' },
    { id: 'heater', name: 'Space Heater', watts: 1500, surgeWatts: 1500, hours: 3, icon: '🔥' },
    { id: 'washing', name: 'Washing Machine', watts: 500, surgeWatts: 1500, hours: 1, icon: '🫧' },
    { id: 'dishwasher', name: 'Dishwasher', watts: 1200, surgeWatts: 1800, hours: 1, icon: '🍽️' },
    { id: 'fans', name: 'Ceiling Fans', watts: 75, surgeWatts: 150, hours: 8, icon: '🌀' },
    { id: 'waterheater', name: 'Water Heater', watts: 3000, surgeWatts: 3000, hours: 2, icon: '🛁' },
    { id: 'garage', name: 'Garage Door Opener', watts: 500, surgeWatts: 1500, hours: 0.5, icon: '🚗' },
    { id: 'sump', name: 'Sump Pump', watts: 800, surgeWatts: 2400, hours: 1, icon: '💧' }
  ]

  const presetScenarios = [
    { name: 'Camping', icon: '⛺', devices: ['laptop', 'tv', 'coffee', 'fans'] },
    { name: 'Van Life', icon: '🚐', devices: ['refrigerator', 'laptop', 'tv', 'coffee', 'fans'] },
    { name: 'Small Home', icon: '🏠', devices: ['refrigerator', 'freezer', 'tv', 'laptop', 'microwave', 'coffee', 'fans'] },
    { name: 'Large Home', icon: '🏡', devices: ['refrigerator', 'freezer', 'tv', 'laptop', 'microwave', 'coffee', 'ac', 'washing', 'dishwasher'] },
    { name: 'Workshop', icon: '🔧', devices: ['garage', 'wellpump', 'sump', 'heater'] }
  ]

  const toggleDevice = (device) => {
    setSelectedDevices(prev => {
      if (prev.find(d => d.id === device.id)) {
        return prev.filter(d => d.id !== device.id)
      } else {
        return [...prev, device]
      }
    })
  }

  const applyScenario = (scenario) => {
    const newSelection = scenario.devices
      .map(id => deviceOptions.find(d => d.id === id))
      .filter(Boolean)
    setSelectedDevices(newSelection)
    toast.success(`${scenario.name} scenario loaded`)
  }

  const addCustomDevice = () => {
    const name = document.getElementById('custom-name')?.value
    const watts = parseFloat(document.getElementById('custom-watts')?.value)
    const surge = parseFloat(document.getElementById('custom-surge')?.value) || watts * 3
    const hours = parseFloat(document.getElementById('custom-hours')?.value) || 1

    if (!name || isNaN(watts) || watts <= 0) {
      toast.error('Please enter a device name and wattage')
      return
    }

    const device = {
      id: `custom-${Date.now()}`,
      name,
      watts,
      surgeWatts: surge,
      hours,
      icon: '🔌'
    }
    setCustomDevices([...customDevices, device])
    document.getElementById('custom-name').value = ''
    document.getElementById('custom-watts').value = ''
    document.getElementById('custom-surge').value = ''
    document.getElementById('custom-hours').value = ''
    toast.success('Custom device added')
  }

  const calculate = () => {
    const allDevices = [...selectedDevices, ...customDevices]
    
    if (allDevices.length === 0) {
      toast.error('Please select at least one device')
      return
    }

    const result = calculateACLoad(allDevices)
    const recommendations = getRecommendedInverter(result.totalRunningWatts, result.totalSurgeWatts)
    
    setResults({
      ...result,
      recommendations
    })
    setShowResults(true)
  }

  // Map product names to product IDs for linking
  const getProductIdFromName = (name) => {
    const productMap = {
      'Victron 800W Pure Sine Wave': 'victron-800w-inverter',
      'Renogy 1000W Pure Sine Wave': 'renogy-1000w-inverter',
      'Renogy 2000W Pure Sine Wave': 'renogy-2000w-inverter',
      'Renogy 3000W Pure Sine Wave': 'renogy-3000w-inverter',
      'EcoFlow Smart Inverter': 'ecoflow-smart-inverter'
    }
    return productMap[name] || null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Inverter Sizing</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Inverter Sizing Calculator</h1>
        <p className="text-gray-600">
          Find the right inverter size for your appliances. We calculate both running watts and surge watts.
        </p>
      </div>

      {/* Preset Scenarios */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Scenarios</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {presetScenarios.map(scenario => (
            <button
              key={scenario.name}
              onClick={() => applyScenario(scenario)}
              className="p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
            >
              <div className="text-3xl mb-2">{scenario.icon}</div>
              <div className="text-sm font-medium text-gray-900">{scenario.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Your Devices</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {deviceOptions.map(device => (
              <div
                key={device.id}
                onClick={() => toggleDevice(device)}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedDevices.find(d => d.id === device.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'hover:border-blue-400 hover:shadow'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{device.icon}</div>
                  <div className="font-medium text-sm text-gray-800">{device.name}</div>
                  <div className="text-xs text-gray-500">{device.watts}W</div>
                  {device.surgeWatts > device.watts && (
                    <div className="text-xs text-orange-500">Surge: {device.surgeWatts}W</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Device */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Add Custom Device</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
                <input
                  id="custom-name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Power Tool"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Running Watts (W)</label>
                <input
                  id="custom-watts"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surge Watts (W)</label>
                <input
                  id="custom-surge"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 1500"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank for 3× running watts</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Day</label>
                <input
                  id="custom-hours"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 2"
                  min="0"
                  max="24"
                />
              </div>
            </div>
            <button onClick={addCustomDevice} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Add Custom Device
            </button>

            {customDevices.length > 0 && (
              <div className="mt-4 space-y-2">
                {customDevices.map(device => (
                  <div key={device.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                      <span className="font-medium text-sm">{device.name}</span>
                      <span className="text-gray-500 text-xs ml-2">
                        {device.watts}W running, {device.surgeWatts}W surge, {device.hours}h/day
                      </span>
                    </div>
                    <button
                      onClick={() => setCustomDevices(customDevices.filter(d => d.id !== device.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="p-6 border-t bg-gray-50">
          <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition font-semibold text-lg">
            <Calculator className="inline h-5 w-5 mr-2" />
            Calculate Inverter Size
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && results && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm bg-gradient-to-r from-blue-50 to-yellow-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Total Running Watts</div>
                <div className="text-3xl font-bold text-blue-600">{results.totalRunningWatts} W</div>
              </div>
              
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Total Surge Watts</div>
                <div className="text-3xl font-bold text-orange-600">{results.totalSurgeWatts} W</div>
                <div className="text-xs text-gray-500 mt-1">
                  Peak power needed for motor startup
                </div>
              </div>
              
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Daily Energy Consumption</div>
                <div className="text-2xl font-bold text-gray-900">{results.totalDailyWh.toLocaleString()} Wh</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Recommended Inverters</h3>
              <div className="space-y-3">
                {results.recommendations.map((inv, index) => {
                  const productId = getProductIdFromName(inv.name)
                  return (
                    <div key={index} className={`bg-white rounded p-4 ${index === 0 ? 'border-2 border-blue-500' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{inv.name}</div>
                          <div className="text-sm text-gray-500">
                            {inv.watts}W Continuous | {inv.surge}W Surge
                          </div>
                          {inv.features && (
                            <div className="text-xs text-gray-500 mt-1">
                              {inv.features.join(' • ')}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">${inv.price}</div>
                          {inv.badge && (
                            <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full">
                              {inv.badge}
                            </span>
                          )}
                          {productId && (
                            <Link 
                              href={`/products/${productId}`}
                              className="block text-xs text-blue-600 hover:underline mt-1"
                            >
                              View Product →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {results.notes && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">{results.notes}</p>
                  </div>
                </div>
              )}

              <Link href="/products/inverters" className="block text-center mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Shop All Inverters →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Inverter Sizing Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Always add a 20% safety margin to your total running watts',
            'Surge watts are critical for motors (refrigerators, pumps, AC units)',
            'Pure sine wave inverters are best for sensitive electronics',
            'Consider future expansion when sizing your inverter',
            'Match your inverter to your battery voltage (12V, 24V, 48V)'
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
          Found Your Inverter Size?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products/inverters" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Shop Inverters
          </Link>
          <Link href="/calculators/solar-sizing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Solar Sizing Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}