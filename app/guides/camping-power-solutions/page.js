'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Tent, Battery, Sun, Zap, Plug, Shield, Wrench, DollarSign, Camp, Caravan, Home, Refrigerator, Laptop, Phone, Lightbulb } from 'lucide-react'

export default function CampingPowerSolutionsGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [tripDuration, setTripDuration] = useState('weekend')
  const [campingStyle, setCampingStyle] = useState('car')

  const tripOptions = {
    weekend: { label: 'Weekend Trip', days: 2, powerNeeds: 'Low to Medium', description: 'Phone, lights, small devices' },
    week: { label: '1 Week Trip', days: 7, powerNeeds: 'Medium', description: 'All devices, some appliances' },
    extended: { label: 'Extended Trip', days: 14, powerNeeds: 'High', description: 'Full off-grid living' }
  }

  const campingStyles = {
    car: { 
      label: 'Car Camping', 
      icon: Home,
      description: 'Camping near your vehicle with moderate power needs',
      weightLimit: 'Under 20 lbs'
    },
    backpacking: { 
      label: 'Backpacking', 
      icon: Tent,
      description: 'Carrying everything on your back',
      weightLimit: 'Under 5 lbs'
    },
    glamping: { 
      label: 'Glamping / RV', 
      icon: Caravan,
      description: 'Comfortable camping with full amenities',
      weightLimit: 'No limit'
    }
  }

  const powerSolutions = {
    weekend: {
      car: {
        title: 'Portable Power Station (500Wh)',
        description: 'Perfect for weekend car camping',
        products: ['EcoFlow River 2', 'Jackery Explorer 300'],
        capacity: '300-500Wh',
        weight: '7-15 lbs',
        features: ['Multiple outlets', 'USB-C', 'LED light']
      },
      backpacking: {
        title: 'Power Bank + Solar Panel',
        description: 'Lightweight solution for backpackers',
        products: ['Anker Power Bank', 'Goal Zero Nomad 7'],
        capacity: '20-100Wh',
        weight: '1-3 lbs',
        features: ['Compact', 'Solar charging', 'USB ports']
      },
      glamping: {
        title: 'Solar Generator (1000Wh)',
        description: 'Full comfort for glamping',
        products: ['EcoFlow Delta 2', 'Jackery Explorer 1000'],
        capacity: '1000-2000Wh',
        weight: '20-30 lbs',
        features: ['Multiple AC outlets', 'Fast charging', 'Expandable']
      }
    },
    week: {
      car: {
        title: 'Solar Generator (1000-2000Wh)',
        description: 'Reliable power for week-long trips',
        products: ['Bluetti AC200MAX', 'EcoFlow Delta 2'],
        capacity: '1000-2000Wh',
        weight: '20-30 lbs',
        features: ['Solar compatible', 'Multiple outlets', 'High capacity']
      },
      backpacking: {
        title: 'Solar Panel + Power Bank Combo',
        description: 'Extended power for long hikes',
        products: ['BigBlue Solar Panel', 'Nitecore Power Bank'],
        capacity: '50-150Wh',
        weight: '2-5 lbs',
        features: ['Solar charging', 'Weather resistant', 'Compact']
      },
      glamping: {
        title: 'Full Solar Setup (2000Wh+)',
        description: 'Complete off-grid comfort',
        products: ['EcoFlow Delta Pro', 'Bluetti AC200MAX'],
        capacity: '2000-3600Wh',
        weight: '30-60 lbs',
        features: ['High capacity', 'Solar ready', 'Multiple devices']
      }
    },
    extended: {
      car: {
        title: 'Full Off-Grid System (2000Wh+)',
        description: 'Complete power independence',
        products: ['EcoFlow Delta Pro', 'Bluetti AC200MAX'],
        capacity: '2000-3600Wh',
        weight: '30-60 lbs',
        features: ['High capacity', 'Expandable', 'Solar ready']
      },
      backpacking: {
        title: 'Solar + Power Bank + Inverter',
        description: 'Advanced system for long treks',
        products: ['Jackery Explorer 500', 'Portable Solar Panel'],
        capacity: '200-500Wh',
        weight: '10-20 lbs',
        features: ['Versatile', 'Solar capable', 'Multiple outputs']
      },
      glamping: {
        title: 'Whole-Home RV System (5000Wh+)',
        description: 'Full home comfort off-grid',
        products: ['Multiple Delta Pros', 'Full Solar Array'],
        capacity: '5000-10000Wh',
        weight: '100+ lbs',
        features: ['Whole home', 'Expandable', 'Professional grade']
      }
    }
  }

  const getRecommendation = () => {
    return powerSolutions[tripDuration]?.[campingStyle] || powerSolutions.weekend.car
  }

  const recommendation = getRecommendation()

  const devicePowerGuide = [
    { device: 'Phone', watts: 10, dailyWh: 20, charger: 'USB' },
    { device: 'Tablet', watts: 15, dailyWh: 30, charger: 'USB' },
    { device: 'Laptop', watts: 65, dailyWh: 260, charger: 'AC/USB-C' },
    { device: 'LED Lantern', watts: 10, dailyWh: 30, charger: 'USB/AA' },
    { device: 'Camp Fridge (12V)', watts: 45, dailyWh: 540, charger: '12V' },
    { device: 'CPAP Machine', watts: 60, dailyWh: 480, charger: 'AC/12V' },
    { device: 'Camera', watts: 20, dailyWh: 40, charger: 'USB' },
    { device: 'Portable Speaker', watts: 20, dailyWh: 40, charger: 'USB' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'solutions', label: 'Power Solutions' },
    { id: 'devices', label: 'Device Guide' },
    { id: 'tips', label: 'Camping Tips' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Camping Power Solutions</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Camping</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Portable Power</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Camping Power Solutions: Stay Charged Off-Grid
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          From backpacking to glamping, find the perfect power solution for your camping trip. 
          Choose the right combination of solar, batteries, and power stations for your adventure.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            12 min read
          </span>
        </div>
      </div>

      {/* Quick Selection */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Find Your Perfect Power Solution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(tripOptions).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setTripDuration(key)}
                  className={`p-3 border rounded-lg text-center ${
                    tripDuration === key
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="font-semibold text-sm">{value.label}</div>
                  <div className="text-xs text-gray-500">{value.powerNeeds}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Camping Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(campingStyles).map(([key, value]) => {
                const Icon = value.icon
                return (
                  <button
                    key={key}
                    onClick={() => setCampingStyle(key)}
                    className={`p-3 border rounded-lg text-center ${
                      campingStyle === key
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <Icon className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                    <div className="font-semibold text-sm">{value.label}</div>
                    <div className="text-xs text-gray-500">{value.weightLimit}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Recommended Solution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-blue-600 text-lg">{recommendation.title}</p>
              <p className="text-sm text-gray-600">{recommendation.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Capacity: {recommendation.capacity}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Weight: {recommendation.weight}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Recommended Products:</p>
              {recommendation.products.map((product, index) => (
                <p key={index} className="text-sm text-gray-600">• {product}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8 shadow-sm">
        <div className="flex border-b overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Power Options for Every Camper</h2>
                <p className="text-gray-600 mb-4">
                  The right power solution depends on how you camp. Here's a quick breakdown of what works best for different camping styles.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(campingStyles).map(([key, value]) => {
                    const Icon = value.icon
                    return (
                      <div key={key} className="border rounded p-4 text-center">
                        <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">{value.label}</h3>
                        <p className="text-sm text-gray-600 mb-2">{value.description}</p>
                        <div className="text-xs text-gray-500">Weight Limit: {value.weightLimit}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Quick Tips</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Always bring a backup power source (solar + battery)</li>
                      <li>• Check weather forecast - cloudy days reduce solar output</li>
                      <li>• Turn off devices when not in use to conserve power</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Solutions Tab */}
          {activeTab === 'solutions' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Power Solutions by Camping Style</h2>
              <div className="space-y-6">
                {Object.entries(campingStyles).map(([styleKey, styleValue]) => {
                  const Icon = styleValue.icon
                  return (
                    <div key={styleKey} className="border rounded p-4">
                      <div className="flex items-center mb-3">
                        <Icon className="h-6 w-6 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">{styleValue.label}</h3>
                        <span className="ml-2 text-xs text-gray-500">{styleValue.weightLimit}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(tripOptions).map(([tripKey, tripValue]) => {
                          const solution = powerSolutions[tripKey]?.[styleKey]
                          if (!solution) return null
                          return (
                            <div key={tripKey} className="bg-gray-50 rounded p-3">
                              <h4 className="font-medium text-sm text-gray-900 mb-1">{tripValue.label}</h4>
                              <p className="text-sm font-semibold text-blue-600">{solution.title}</p>
                              <p className="text-xs text-gray-500 mb-2">{solution.description}</p>
                              <div className="flex flex-wrap gap-1">
                                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">{solution.capacity}</span>
                                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">{solution.weight}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Features:</span> {solution.features}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Device Guide Tab */}
          {activeTab === 'devices' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Device Power Consumption Guide</h2>
              <p className="text-gray-600 mb-4">
                Know how much power your devices need to plan your camping power setup.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Device</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Watts</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Daily Wh</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Charging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devicePowerGuide.map((device, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-3 text-sm font-medium">{device.device}</td>
                        <td className="px-4 py-3 text-sm">{device.watts}W</td>
                        <td className="px-4 py-3 text-sm">{device.dailyWh}Wh</td>
                        <td className="px-4 py-3 text-sm">{device.charger}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Camping Power Tips</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Charge During Peak Sun',
                    description: 'Solar panels produce the most power between 10am and 2pm. Charge your devices during this window.'
                  },
                  {
                    title: 'Use Energy-Efficient Devices',
                    description: 'LED lights, 12V fridges, and energy-efficient laptops use significantly less power.'
                  },
                  {
                    title: 'Keep Batteries Warm',
                    description: 'Cold temperatures reduce battery capacity. Keep your power station inside your tent or vehicle at night.'
                  },
                  {
                    title: 'Monitor Your Usage',
                    description: 'Use a battery monitor to track your power consumption and avoid running out of power unexpectedly.'
                  },
                  {
                    title: 'Have a Backup Plan',
                    description: 'Bring a small power bank as backup for essential devices like your phone for emergencies.'
                  }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded p-4">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Camping Power Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow River 2', type: 'Portable Power', capacity: '256Wh', href: '/products/ecoflow-river-2' },
            { name: 'Jackery Explorer 300', type: 'Portable Power', capacity: '293Wh', href: '/products/jackery-explorer-300' },
            { name: 'Bluetti EB3A', type: 'Portable Power', capacity: '268Wh', href: '/products/bluetti-eb3a' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⛺</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.type}</div>
              <div className="text-sm font-medium text-blue-600 mt-1">{product.capacity}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready for Your Next Camping Adventure?
        </h2>
        <p className="text-gray-600 mb-4">
          Find the perfect power solution for your camping trip with our calculators.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/battery-runtime" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Battery Runtime Calculator
          </Link>
          <Link href="/products/portable-power-stations" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Shop Portable Power
          </Link>
        </div>
      </div>
    </div>
  )
}