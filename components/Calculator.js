'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { calculateSolarSystem } from '../lib/calculators'
import { getProductsByCategory } from '../lib/products'
import ProductCard from './ProductCard'
import { toast } from 'react-hot-toast'

export default function Calculator() {
  const [selectedAppliances, setSelectedAppliances] = useState([])
  const [customDevices, setCustomDevices] = useState([])
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('appliances')
  const [recommendedProducts, setRecommendedProducts] = useState([])

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
    
    // Generate smart product recommendations
    const products = getSmartRecommendations(calculated)
    setRecommendedProducts(products)
    
    setActiveTab('results')
    
    // Scroll to results
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Smart product recommendation engine
  const getSmartRecommendations = (results) => {
    if (!results || !results.requiredBatteryWh) return []

    const requiredWh = results.requiredBatteryWh
    const allProducts = [
      ...getProductsByCategory('solarGenerators'),
      ...getProductsByCategory('portablePowerStations')
    ]

    // Score each product based on how well it matches the requirements
    const scoredProducts = allProducts.map(product => {
      let score = 0
      const capacity = product.capacity || 0
      
      // Capacity match (primary factor)
      const capacityRatio = capacity / requiredWh
      if (capacityRatio >= 1 && capacityRatio <= 1.5) {
        score += 50 // Perfect match
      } else if (capacityRatio >= 0.8 && capacityRatio < 1) {
        score += 40 // Slightly under - can work with good weather
      } else if (capacityRatio >= 1.5 && capacityRatio <= 2) {
        score += 30 // Overkill but will work
      } else if (capacityRatio >= 0.5 && capacityRatio < 0.8) {
        score += 15 // Underpowered
      } else if (capacityRatio > 2) {
        score += 10 // Too much capacity (waste of money)
      } else {
        score += 0 // Not suitable
      }

      // Output match (secondary factor)
      const output = product.output || 0
      const maxDeviceWattage = getMaxDeviceWattage()
      if (output >= maxDeviceWattage * 1.2) {
        score += 20 // Surge capacity
      } else if (output >= maxDeviceWattage) {
        score += 15 // Adequate
      } else if (output >= maxDeviceWattage * 0.8) {
        score += 10 // Close enough
      } else {
        score += 0 // Not enough power
      }

      // Portability bonus
      if (product.weight && product.weight < 30) {
        score += 10 // Lightweight bonus
      } else if (product.weight && product.weight < 50) {
        score += 5 // Moderate weight
      }

      // Brand reputation bonus (based on rating)
      if (product.rating) {
        score += (product.rating - 4) * 10 // 4.0 = 0, 4.5 = 5, 5.0 = 10
      }

      // Price efficiency bonus (price per Wh)
      if (product.price && product.capacity) {
        const pricePerWh = product.price / product.capacity
        if (pricePerWh < 0.5) {
          score += 15 // Great value
        } else if (pricePerWh < 0.8) {
          score += 10 // Good value
        } else if (pricePerWh < 1.0) {
          score += 5 // Fair value
        }
      }

      // Battery type preference (LiFePO4 bonus)
      if (product.batteryType === 'LiFePO4') {
        score += 5
      }

      return { ...product, score, match: score > 30 }
    })

    // Sort by score and return top matches
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  }

  const getMaxDeviceWattage = () => {
    let maxWattage = 0
    selectedAppliances.forEach(appliance => {
      if (appliance.watts > maxWattage) maxWattage = appliance.watts
    })
    customDevices.forEach(device => {
      if (device.watts > maxWattage) maxWattage = device.watts
    })
    return maxWattage || 100
  }

  const getRecommendationLabel = (product) => {
    if (!results) return ''
    const capacityRatio = product.capacity / results.requiredBatteryWh
    
    if (capacityRatio >= 1.2 && capacityRatio <= 1.8) {
      return 'Perfect Match'
    } else if (capacityRatio >= 1 && capacityRatio < 1.2) {
      return 'Great Match'
    } else if (capacityRatio >= 0.8 && capacityRatio < 1) {
      return 'Good Match (Add Solar)'
    } else if (capacityRatio > 1.8 && capacityRatio < 3) {
      return 'High Capacity (Future-Proof)'
    } else if (capacityRatio >= 3) {
      return 'Overkill (Consider Smaller)'
    } else if (capacityRatio < 0.5) {
      return 'Underpowered (Add Extra)'
    } else {
      return 'Consider This Option'
    }
  }

  const getRecommendationStyle = (product) => {
    if (!results) return 'bg-blue-100 text-blue-800'
    const capacityRatio = product.capacity / results.requiredBatteryWh
    
    if (capacityRatio >= 1 && capacityRatio <= 2) {
      return 'bg-green-100 text-green-800'
    } else if (capacityRatio >= 0.7 && capacityRatio < 1) {
      return 'bg-yellow-100 text-yellow-800'
    } else {
      return 'bg-gray-100 text-gray-800'
    }
  }

  // Helper function to add custom device from input
  const addCustomDeviceFromInput = () => {
    const wattageInput = document.getElementById('custom-wattage')
    const hoursInput = document.getElementById('custom-hours')
    
    if (!wattageInput || !hoursInput) return
    
    const wattage = parseFloat(wattageInput.value)
    const hours = parseFloat(hoursInput.value)
    
    if (isNaN(wattage) || isNaN(hours) || wattage <= 0 || hours <= 0 || hours > 24) {
      toast.error('Please enter valid wattage and hours (1-24)')
      return
    }
    
    addCustomDevice(wattage, hours)
    wattageInput.value = ''
    hoursInput.value = ''
  }

  // Preset scenarios for quick calculation
  const presetScenarios = [
    { 
      name: '🌙 CPAP User', 
      appliances: ['cpap', 'phone', 'wifi', 'lights'],
      description: 'Medical + essentials'
    },
    { 
      name: '🏕️ Weekend Camping', 
      appliances: ['lights', 'phone', 'wifi', 'laptop', 'fans'],
      description: 'Camping essentials'
    },
    { 
      name: '🏠 Home Emergency', 
      appliances: ['refrigerator', 'lights', 'wifi', 'phone', 'tv', 'cpap'],
      description: 'Emergency backup'
    },
    { 
      name: '🚐 Van Life', 
      appliances: ['refrigerator', 'lights', 'laptop', 'phone', 'wifi', 'fans', 'coffee'],
      description: 'Full van setup'
    },
    { 
      name: '⚡ Full Off-Grid', 
      appliances: ['refrigerator', 'wellpump', 'lights', 'laptop', 'phone', 'wifi', 'tv', 'microwave', 'coffee'],
      description: 'Complete off-grid'
    }
  ]

  const loadPreset = (scenario) => {
    const newSelection = scenario.appliances
      .map(id => applianceOptions.find(a => a.id === id))
      .filter(Boolean)
    setSelectedAppliances(newSelection)
    toast.success(`"${scenario.name}" preset loaded`)
  }

  return (
    <div className="ebay-card">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('appliances')}
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'appliances' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Appliances
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'custom' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Custom Load
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'results' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Results & Recommendations
        </button>
      </div>

      <div className="p-6">
        {/* Appliances Tab */}
        {activeTab === 'appliances' && (
          <div>
            {/* Preset Scenarios */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {presetScenarios.map(scenario => (
                  <button
                    key={scenario.name}
                    onClick={() => loadPreset(scenario)}
                    className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm transition"
                  >
                    {scenario.name}
                  </button>
                ))}
              </div>
            </div>

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

            <div className="mt-4 text-sm text-gray-500">
              {selectedAppliances.length > 0 ? (
                <span>{selectedAppliances.length} appliance{selectedAppliances.length > 1 ? 's' : ''} selected</span>
              ) : (
                <span>No appliances selected yet</span>
              )}
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
                  <input type="number" id="custom-wattage" className="ebay-input" placeholder="e.g. 500" min="1" />
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

              {customDevices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Custom Devices</h4>
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
              )}
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
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Total Daily Load</div>
                    <div className="text-2xl font-bold text-gray-900">{results.totalWh} Wh</div>
                    <div className="text-xs text-gray-500 mt-1">Total energy needed per day</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Required Battery Capacity</div>
                    <div className="text-2xl font-bold text-green-600">{results.requiredBatteryWh} Wh</div>
                    <div className="text-xs text-gray-500 mt-1">With 20% safety buffer</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Recommended Tier</div>
                    <div className="text-2xl font-bold text-yellow-600">{results.recommendation || 'Standard'}</div>
                    <div className="text-xs text-gray-500 mt-1">Based on your power needs</div>
                  </div>
                </div>

                {/* Device Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Your Load Breakdown</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {selectedAppliances.map(app => (
                      <div key={app.id} className="flex justify-between text-sm border-b border-gray-200 py-1">
                        <span>{app.icon} {app.name}</span>
                        <span>{app.watts}W × {app.hours}h = {app.watts * app.hours}Wh</span>
                      </div>
                    ))}
                    {customDevices.map(device => (
                      <div key={device.id} className="flex justify-between text-sm border-b border-gray-200 py-1">
                        <span>⚙️ {device.name}</span>
                        <span>{device.watts}W × {device.hours}h = {device.watts * device.hours}Wh</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-gray-300 pt-2 mt-2">
                    <span>Total</span>
                    <span>{results.totalWh} Wh</span>
                  </div>
                </div>

                {/* Smart Product Recommendations */}
                {recommendedProducts.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded mr-2">AI RECOMMENDED</span>
                      Top Product Matches
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Based on your {results.requiredBatteryWh}Wh requirement, these products are the best fit:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {recommendedProducts.map(product => {
                        const matchLabel = getRecommendationLabel(product)
                        const matchStyle = getRecommendationStyle(product)
                        return (
                          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition relative">
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${matchStyle}`}>
                              {matchLabel}
                            </div>
                            <div className="text-center">
                              <div className="text-4xl mb-2">⚡</div>
                              <h4 className="font-bold text-gray-900">{product.name}</h4>
                              <p className="text-sm text-gray-500">{product.brand}</p>
                              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                                <div className="bg-gray-50 rounded p-1">
                                  <div className="text-xs text-gray-500">Capacity</div>
                                  <div className="font-semibold">{product.capacity}Wh</div>
                                </div>
                                <div className="bg-gray-50 rounded p-1">
                                  <div className="text-xs text-gray-500">Output</div>
                                  <div className="font-semibold">{product.output}W</div>
                                </div>
                                <div className="bg-gray-50 rounded p-1">
                                  <div className="text-xs text-gray-500">Weight</div>
                                  <div className="font-semibold">{product.weight} lbs</div>
                                </div>
                                <div className="bg-gray-50 rounded p-1">
                                  <div className="text-xs text-gray-500">Price</div>
                                  <div className="font-semibold text-green-600">${product.price}</div>
                                </div>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                                {product.badge && (
                                  <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded text-xs font-bold">
                                    {product.badge}
                                  </span>
                                )}
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                  ⭐ {product.rating}
                                </span>
                                {product.capacity >= results.requiredBatteryWh && (
                                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                    ✅ Adequate Capacity
                                  </span>
                                )}
                              </div>
                              <Link 
                                href={`/products/${product.id}`} 
                                className="block mt-3 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Match Explanation */}
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                      <strong>Why these products?</strong> Based on your {results.requiredBatteryWh}Wh requirement:
                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>Products with <span className="text-green-600 font-medium">"Perfect Match"</span> or <span className="text-green-600 font-medium">"Great Match"</span> have capacity within 20-80% of your needs</li>
                        <li>Products with <span className="text-yellow-600 font-medium">"Good Match (Add Solar)"</span> can work with solar panels for extended runtime</li>
                        <li>Products with <span className="text-blue-600 font-medium">"High Capacity"</span> offer more power for future expansion</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                    <p className="text-yellow-800">No specific product recommendations found for your configuration.</p>
                    <p className="text-yellow-700 mt-1">Please browse our products section for more options.</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveTab('appliances')} className="ebay-btn-secondary">
                    Recalculate
                  </button>
                  <button onClick={() => toast.success('Enter your email to receive these results')} className="ebay-btn-primary">
                    Email Me These Results
                  </button>
                  <Link href="/products/solar-generators" className="ebay-btn-secondary">
                    Browse All Products
                  </Link>
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