'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, Zap, Battery, Sun, Home, Caravan, Camp, ArrowRight, Info, Check, AlertTriangle } from 'lucide-react'
import { getProductsByCategory } from '../../../lib/products'
import ProductCard from '../../../components/ProductCard'
import { toast } from 'react-hot-toast'

export default function SolarSizingCalculatorPage() {
  const [activeTab, setActiveTab] = useState('appliances')
  const [selectedAppliances, setSelectedAppliances] = useState([])
  const [customDevices, setCustomDevices] = useState([])
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const applianceOptions = [
    { id: 'refrigerator', name: 'Refrigerator', watts: 150, hours: 24, icon: '❄️', category: 'essential' },
    { id: 'freezer', name: 'Freezer', watts: 100, hours: 24, icon: '🧊', category: 'essential' },
    { id: 'wellpump', name: 'Well Pump', watts: 750, hours: 2, icon: '🔵', category: 'essential' },
    { id: 'wifi', name: 'Wi-Fi Router', watts: 20, hours: 24, icon: '📡', category: 'essential' },
    { id: 'cpap', name: 'CPAP Machine', watts: 60, hours: 8, icon: '🌙', category: 'medical' },
    { id: 'lights', name: 'LED Lighting', watts: 30, hours: 5, icon: '💡', category: 'essential' },
    { id: 'tv', name: 'LED TV', watts: 100, hours: 4, icon: '📺', category: 'comfort' },
    { id: 'laptop', name: 'Laptop Charger', watts: 65, hours: 4, icon: '💻', category: 'essential' },
    { id: 'phone', name: 'Phone Charger', watts: 10, hours: 2, icon: '📱', category: 'essential' },
    { id: 'microwave', name: 'Microwave', watts: 1000, hours: 0.5, icon: '🍲', category: 'comfort' },
    { id: 'coffee', name: 'Coffee Maker', watts: 800, hours: 0.5, icon: '☕', category: 'comfort' },
    { id: 'ac', name: 'Portable AC', watts: 500, hours: 6, icon: '❄️', category: 'comfort' },
    { id: 'fans', name: 'Ceiling Fans', watts: 75, hours: 8, icon: '🌀', category: 'comfort' },
    { id: 'washing', name: 'Washing Machine', watts: 500, hours: 1, icon: '🫧', category: 'comfort' },
    { id: 'dishwasher', name: 'Dishwasher', watts: 1200, hours: 1, icon: '🍽️', category: 'comfort' },
    { id: 'heater', name: 'Space Heater', watts: 1500, hours: 3, icon: '🔥', category: 'comfort' }
  ]

  const presetScenarios = [
    { name: 'Camping Trip', icon: '⛺', appliances: ['lights', 'phone', 'wifi'] },
    { name: 'Van Life', icon: '🚐', appliances: ['refrigerator', 'lights', 'laptop', 'phone', 'wifi'] },
    { name: 'Home Emergency', icon: '🏠', appliances: ['refrigerator', 'freezer', 'lights', 'wifi', 'phone', 'tv'] },
    { name: 'Medical Backup', icon: '🏥', appliances: ['cpap', 'phone', 'wifi', 'lights'] },
    { name: 'Full Off-Grid', icon: '🌲', appliances: ['refrigerator', 'freezer', 'wellpump', 'lights', 'laptop', 'phone', 'wifi', 'tv'] }
  ]

  const toggleAppliance = (appliance) => {
    setSelectedAppliances(prev => {
      if (prev.find(a => a.id === appliance.id)) {
        return prev.filter(a => a.id !== appliance.id)
      } else {
        return [...prev, appliance]
      }
    })
  }

  const applyScenario = (scenario) => {
    const newSelection = scenario.appliances
      .map(id => applianceOptions.find(a => a.id === id))
      .filter(Boolean)
    setSelectedAppliances(newSelection)
    toast.success(`${scenario.name} scenario loaded`)
  }

  const calculate = () => {
    if (selectedAppliances.length === 0 && customDevices.length === 0) {
      toast.error('Please select at least one appliance')
      return
    }

    let totalWh = 0
    selectedAppliances.forEach(appliance => {
      totalWh += appliance.watts * appliance.hours
    })
    customDevices.forEach(device => {
      totalWh += device.watts * device.hours
    })

    const requiredBatteryWh = totalWh / (0.85 * 0.90)
    const recommendedProducts = getRecommendedProducts(requiredBatteryWh)

    setResults({
      totalWh: Math.round(totalWh),
      requiredBatteryWh: Math.round(requiredBatteryWh),
      recommendedProducts
    })
    setShowResults(true)
  }

  const getRecommendedProducts = (requiredWh) => {
    const allProducts = [
      ...getProductsByCategory('solarGenerators'),
      ...getProductsByCategory('portablePowerStations')
    ]

    if (requiredWh < 500) {
      return allProducts.filter(p => p.capacity < 500).slice(0, 3)
    } else if (requiredWh < 1500) {
      return allProducts.filter(p => p.capacity >= 500 && p.capacity < 1500).slice(0, 3)
    } else if (requiredWh < 3000) {
      return allProducts.filter(p => p.capacity >= 1500 && p.capacity < 3000).slice(0, 3)
    } else {
      return allProducts.filter(p => p.capacity >= 3000).slice(0, 3)
    }
  }

  const addCustomDevice = () => {
    const watts = parseFloat(document.getElementById('custom-watts')?.value)
    const hours = parseFloat(document.getElementById('custom-hours')?.value)
    
    if (isNaN(watts) || isNaN(hours) || watts <= 0 || hours <= 0 || hours > 24) {
      toast.error('Please enter valid wattage (1+) and hours (1-24)')
      return
    }

    const device = {
      id: `custom-${Date.now()}`,
      name: `Custom Device (${watts}W × ${hours}h)`,
      watts,
      hours
    }
    setCustomDevices([...customDevices, device])
    document.getElementById('custom-watts').value = ''
    document.getElementById('custom-hours').value = ''
    toast.success('Custom device added')
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Solar Sizing</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Solar Sizing Calculator</h1>
        <p className="text-gray-600">
          Find the perfect solar generator for your needs. Select your appliances or load a preset scenario.
        </p>
      </div>

      {/* Preset Scenarios */}
      <div className="ebay-card p-6 mb-6">
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
      <div className="ebay-card mb-8">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('appliances')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'appliances'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Common Appliances
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'custom'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Custom Load
          </button>
        </div>

        <div className="p-6">
          {/* Appliances Tab */}
          {activeTab === 'appliances' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {applianceOptions.map(appliance => (
                  <div
                    key={appliance.id}
                    onClick={() => toggleAppliance(appliance)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAppliances.find(a => a.id === appliance.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'hover:border-blue-400 hover:shadow'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{appliance.icon}</div>
                      <div className="font-medium text-sm text-gray-800">{appliance.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {appliance.watts}W - {appliance.hours}h/day
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Load Tab */}
          {activeTab === 'custom' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device Wattage (W)
                  </label>
                  <input
                    id="custom-watts"
                    type="number"
                    className="ebay-input"
                    placeholder="e.g. 500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours per Day
                  </label>
                  <input
                    id="custom-hours"
                    type="number"
                    className="ebay-input"
                    placeholder="e.g. 6"
                    min="1"
                    max="24"
                  />
                </div>
                <div className="flex items-end">
                  <button onClick={addCustomDevice} className="ebay-btn-primary w-full">
                    Add Device
                  </button>
                </div>
              </div>

              {customDevices.length > 0 && (
                <div className="space-y-2">
                  {customDevices.map(device => (
                    <div key={device.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <span className="font-medium text-sm">{device.name}</span>
                        <span className="text-gray-500 text-xs ml-2">
                          {device.watts}W × {device.hours}h = {device.watts * device.hours}Wh
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
          )}
        </div>

        {/* Calculate Button */}
        <div className="p-6 border-t">
          <button onClick={calculate} className="ebay-btn-primary w-full py-4 text-lg">
            <Calculator className="inline h-5 w-5 mr-2" />
            Calculate My System
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && results && (
        <div className="ebay-card p-6 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Total Daily Energy Consumption</div>
                <div className="text-3xl font-bold text-gray-900">{results.totalWh.toLocaleString()} Wh</div>
              </div>
              
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Required Battery Capacity</div>
                <div className="text-3xl font-bold text-blue-600">{results.requiredBatteryWh.toLocaleString()} Wh</div>
                <div className="text-xs text-gray-500 mt-1">
                  Includes 85% DoD and 90% inverter efficiency
                </div>
              </div>
              
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500 mb-2">Estimated Runtime</div>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {Math.floor(results.requiredBatteryWh / 150)} hours
                    </div>
                    <div className="text-xs text-gray-500">Refrigerator only</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {Math.floor(results.requiredBatteryWh / 60)} hours
                    </div>
                    <div className="text-xs text-gray-500">CPAP machine</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {Math.floor(results.requiredBatteryWh / 10)} hours
                    </div>
                    <div className="text-xs text-gray-500">Phone charging</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Recommended Products</h3>
              <div className="space-y-3">
                {results.recommendedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.capacity}Wh | {product.output}W
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">${product.price}</div>
                      <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline text-sm">
                        View Deal
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Section */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">How Our Calculator Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Calculate Total Load</h3>
            <p className="text-sm text-gray-600">
              We sum up the daily energy consumption of all selected appliances.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Battery className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Apply Efficiency Factors</h3>
            <p className="text-sm text-gray-600">
              We account for 85% max battery discharge and 90% inverter efficiency.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Recommend Products</h3>
            <p className="text-sm text-gray-600">
              We match your requirements to the best solar generators in our database.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Explore Other Calculators?
        </h2>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/battery-runtime" className="ebay-btn-primary">
            Battery Runtime Calculator
          </Link>
          <Link href="/calculators/off-grid-budget" className="ebay-btn-secondary">
            Budget Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}