'use client'

import { useState } from 'react'
import { calculateSolarSystem } from '../lib/calculators'
import { getProductsByCategory } from '../lib/products'
import ProductCard from './ProductCard'
import { toast } from 'react-hot-toast'

export default function Calculator() {
  const [selectedAppliances, setSelectedAppliances] = useState([])
  const [customDevices, setCustomDevices] = useState([])
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('appliances')

  const applianceOptions = [
    { id: 'refrigerator', name: 'Refrigerator', watts: 150, hours: 24, icon: '❄️' },
    { id: 'wellpump', name: 'Well Pump', watts: 750, hours: 2, icon: '🔵' },
    { id: 'wifi', name: 'Wi-Fi Router', watts: 20, hours: 24, icon: '📡' },
    { id: 'cpap', name: 'CPAP Machine', watts: 60, hours: 8, icon: '🌙' },
    { id: 'tv', name: 'LED TV', watts: 100, hours: 4, icon: '📺' },
    { id: 'lights', name: 'LED Lighting', watts: 30, hours: 5, icon: '💡' },
    { id: 'ac', name: 'Portable AC', watts: 500, hours: 6, icon: '❄️' },
    { id: 'laptop', name: 'Laptop Charger', watts: 65, hours: 4, icon: '💻' },
    { id: 'fans', name: 'Ceiling Fans', watts: 75, hours: 8, icon: '🌀' },
    { id: 'microwave', name: 'Microwave', watts: 1000, hours: 0.5, icon: '🍲' },
    { id: 'coffee', name: 'Coffee Maker', watts: 800, hours: 0.5, icon: '☕' },
    { id: 'phone', name: 'Phone Charger', watts: 10, hours: 2, icon: '📱' },
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

  const addCustomDevice = (watts, hours) => {
    const device = {
      id: `custom-${Date.now()}`,
      name: 'Custom Device',
      watts,
      hours
    }
    setCustomDevices([...customDevices, device])
    toast.success('Custom device added')
  }

  const calculate = () => {
    if (selectedAppliances.length === 0 && customDevices.length === 0) {
      toast.error('Please select at least one appliance or add a custom device')
      return
    }

    const calculated = calculateSolarSystem(selectedAppliances, customDevices)
    setResults(calculated)
    setActiveTab('results')
    
    // Scroll to results
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="ebay-card">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('appliances')}
          className={`px-6 py-3 text-sm font-medium ${activeTab === 'appliances' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Appliances
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-6 py-3 text-sm font-medium ${activeTab === 'custom' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Custom Load
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-6 py-3 text-sm font-medium ${activeTab === 'results' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Results
        </button>
      </div>

      <div className="p-6">
        {/* Appliances Tab */}
        {activeTab === 'appliances' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            
            <div className="mt-6 flex justify-end">
              <button onClick={calculate} className="ebay-btn-primary">
                Calculate System
              </button>
            </div>
          </div>
        )}

        {/* Custom Load Tab */}
        {activeTab === 'custom' && (
          <div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Wattage (W)</label>
                  <input type="number" id="custom-wattage" className="ebay-input" placeholder="e.g. 500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours per Day</label>
                  <input type="number" id="custom-hours" className="ebay-input" placeholder="e.g. 6" min="1" max="24" />
                </div>
                <div className="flex items-end">
                  <button onClick={addCustomDeviceFromInput} className="ebay-btn-primary w-full">
                    Add Device
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {customDevices.map((device, index) => (
                  <div key={device.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                      <span className="font-medium text-sm">{device.name}</span>
                      <span className="text-gray-500 text-xs ml-2">{device.watts}W x {device.hours}h/day</span>
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
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={calculate} className="ebay-btn-primary">
                Calculate System
              </button>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div id="results-section">
            {results ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Total Daily Load</div>
                      <div className="text-xl font-bold text-gray-900">{results.totalWh} Wh</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Required Battery Capacity</div>
                      <div className="text-xl font-bold text-blue-600">{results.requiredBatteryWh} Wh</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-medium">Recommended Tier:</span> {results.recommendation}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {getProductsByCategory('solarGenerators')
                    .filter(product => results.products.includes(product.id))
                    .map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                  <strong>Why these products?</strong> Based on your calculated needs of {results.requiredBatteryWh}Wh, these systems provide:
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    <li>Adequate capacity for your estimated load with safety margins</li>
                    <li>Industry-leading reliability and warranty coverage</li>
                    <li>Multiple output options for various device compatibility</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setActiveTab('appliances')} className="ebay-btn-secondary">
                    Recalculate
                  </button>
                  <button onClick={captureLead} className="ebay-btn-primary">
                    Email Me These Results
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-lg text-gray-600 mb-4">Run the calculator to see your results</p>
                <button onClick={() => setActiveTab('appliances')} className="ebay-btn-secondary">
                  Start Calculating
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function addCustomDeviceFromInput() {
  const wattage = parseFloat(document.getElementById('custom-wattage').value)
  const hours = parseFloat(document.getElementById('custom-hours').value)
  
  if (isNaN(wattage) || isNaN(hours) || wattage <= 0 || hours <= 0 || hours > 24) {
    toast.error('Please enter valid wattage and hours (1-24)')
    return
  }
  
  // This is a placeholder - in the real component, you'd pass these to the parent
  const event = new CustomEvent('add-custom-device', { detail: { watts: wattage, hours } })
  window.dispatchEvent(event)
}

function captureLead() {
  // Lead capture logic - connect to your email service
  toast.success('Enter your email to receive these results')
}