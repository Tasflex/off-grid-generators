'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Home, Battery, Sun, Zap, Shield, Wrench, DollarSign, Droplet, Flame, Activity, Heart, Caravan, Tent, Trees, Sprout } from 'lucide-react'

export default function CompleteOffGridLivingGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [systemSize, setSystemSize] = useState('medium')

  const systemSizes = {
    small: { 
      label: 'Small Cabin / Tiny Home', 
      dailyUsage: 3000, 
      batteryCapacity: 5000, 
      solarWattage: 1000,
      inverterWattage: 2000,
      description: 'Weekend getaway, minimalist living'
    },
    medium: { 
      label: 'Medium Home (2-3 people)', 
      dailyUsage: 8000, 
      batteryCapacity: 15000, 
      solarWattage: 3000,
      inverterWattage: 5000,
      description: 'Full-time living with modern amenities'
    },
    large: { 
      label: 'Large Home (4+ people)', 
      dailyUsage: 15000, 
      batteryCapacity: 30000, 
      solarWattage: 6000,
      inverterWattage: 8000,
      description: 'Full off-grid homestead with all appliances'
    }
  }

  const offGridComponents = [
    {
      category: 'Power Generation',
      items: [
        { name: 'Solar Panels', description: 'Primary power source', importance: 'Essential' },
        { name: 'Wind Turbine', description: 'Secondary power for cloudy/windy days', importance: 'Optional' },
        { name: 'Backup Generator', description: 'Propane or diesel for extended bad weather', importance: 'Recommended' }
      ]
    },
    {
      category: 'Power Storage',
      items: [
        { name: 'Battery Bank', description: 'LiFePO4 recommended for longevity', importance: 'Essential' },
        { name: 'Battery Management System', description: 'Monitor and protect your batteries', importance: 'Essential' },
        { name: 'Inverter/Charger', description: 'Convert DC to AC and charge from generator', importance: 'Essential' }
      ]
    },
    {
      category: 'Life Support Systems',
      items: [
        { name: 'Water System', description: 'Wells, pumps, filtration, and storage', importance: 'Essential' },
        { name: 'Waste Management', description: 'Septic, composting toilet, greywater', importance: 'Essential' },
        { name: 'Heating/Cooling', description: 'Wood stove, mini-split, propane heat', importance: 'Essential' }
      ]
    },
    {
      category: 'Additional Systems',
      items: [
        { name: 'Internet/Communication', description: 'Starlink, cellular boosters', importance: 'Recommended' },
        { name: 'Food Storage', description: 'Root cellar, canning, food preservation', importance: 'Recommended' },
        { name: 'Security System', description: 'Camera system, alarms, lighting', importance: 'Optional' }
      ]
    }
  ]

  const essentialSkills = [
    'Basic electrical wiring and troubleshooting',
    'Solar panel maintenance and cleaning',
    'Battery bank maintenance (watering, cleaning, monitoring)',
    'Generator maintenance and repair',
    'Water system management (well, pump, filtration)',
    'Waste management (composting, septic)',
    'Food preservation (canning, dehydrating, storing)',
    'Basic carpentry and home maintenance',
    'Fire safety and prevention',
    'First aid and emergency response'
  ]

  const selectedSystem = systemSizes[systemSize]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'systems', label: 'Systems' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'skills', label: 'Skills & Tips' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Complete Off-Grid Living Guide</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Off-Grid Living</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Complete Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Complete Off-Grid Living Guide
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Everything you need to know about living off-grid, from solar power and water systems to 
          waste management and sustainable living. Your comprehensive guide to energy independence.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            20 min read
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">10-20</div>
          <div className="text-xs text-gray-600">Years for ROI</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">$20k-80k</div>
          <div className="text-xs text-gray-600">System Cost Range</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-xs text-gray-600">Energy Independence</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">5-10</div>
          <div className="text-xs text-gray-600">Years Battery Lifespan</div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">What is Off-Grid Living?</h2>
                <p className="text-gray-600 mb-4">
                  Off-grid living means being completely independent from public utilities. You generate your own 
                  electricity, manage your own water supply, and handle your own waste disposal. It's a lifestyle 
                  choice that offers freedom, sustainability, and self-sufficiency.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Sun,
                      title: 'Energy Independence',
                      description: 'Generate your own power from solar, wind, or hydro sources'
                    },
                    {
                      icon: Droplet,
                      title: 'Water Self-Sufficiency',
                      description: 'Collect rainwater, drill wells, and purify your own water'
                    },
                    {
                      icon: Trees,
                      title: 'Sustainable Living',
                      description: 'Reduce your carbon footprint and live in harmony with nature'
                    }
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="border rounded p-4 text-center">
                        <Icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Important Considerations</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Initial investment is significant ($20,000 - $80,000+)</li>
                      <li>• Requires regular maintenance and monitoring</li>
                      <li>• Need backup plans for extended bad weather</li>
                      <li>• May require lifestyle adjustments and energy conservation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Systems Tab */}
          {activeTab === 'systems' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Essential Off-Grid Systems</h2>
              {offGridComponents.map((category, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-gray-900 mb-3">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="border rounded p-4">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.importance === 'Essential' ? 'bg-red-100 text-red-800' :
                          item.importance === 'Recommended' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.importance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sizing Tab */}
          {activeTab === 'sizing' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Sizing Guide</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Home Size
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(systemSizes).map(([size, data]) => (
                    <button
                      key={size}
                      onClick={() => setSystemSize(size)}
                      className={`p-4 border rounded-lg text-left ${
                        systemSize === size
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{data.label}</h3>
                      <p className="text-sm text-gray-500">{data.description}</p>
                      <div className="text-xs text-blue-600 font-medium mt-2">
                        {data.solarWattage}W | {data.batteryCapacity}Wh
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommended System</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Daily Usage</span>
                      <span className="font-semibold">{selectedSystem.dailyUsage} Wh</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Battery Capacity</span>
                      <span className="font-semibold">{selectedSystem.batteryCapacity} Wh</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Solar Array</span>
                      <span className="font-semibold">{selectedSystem.solarWattage} W</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Inverter</span>
                      <span className="font-semibold">{selectedSystem.inverterWattage} W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost</span>
                      <span className="font-semibold text-blue-600">
                        ${(selectedSystem.solarWattage * 3 + selectedSystem.batteryCapacity * 0.8).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Estimated Component List</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Solar Panels</span>
                      <span className="font-medium">{Math.ceil(selectedSystem.solarWattage / 400)} × 400W panels</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Batteries</span>
                      <span className="font-medium">{Math.ceil(selectedSystem.batteryCapacity / 5000)} × 5kWh batteries</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Inverter</span>
                      <span className="font-medium">{selectedSystem.inverterWattage}W pure sine wave</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Charge Controller</span>
                      <span className="font-medium">MPPT {Math.ceil(selectedSystem.solarWattage / 1000)}0A</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-xs text-blue-700">
                      <strong>Pro Tip:</strong> Add 20-30% extra capacity for cloudy days and system inefficiencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Essential Off-Grid Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {essentialSkills.map((skill, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded p-3">
                    <Wrench className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Start Small, Think Big</h4>
                    <p className="text-sm text-green-700">
                      You don't have to go fully off-grid overnight. Start with a small solar system for emergency 
                      backup, then gradually expand. Learn one skill at a time and build your confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Off-Grid Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow Delta Pro', type: 'Power Station', capacity: '3600Wh', href: '/products/ecoflow-delta-pro' },
            { name: 'Bluetti AC200MAX', type: 'Power Station', capacity: '2048Wh', href: '/products/bluetti-ac200max' },
            { name: 'Battle Born 100Ah', type: 'Battery', capacity: '1280Wh', href: '/products/battleborn-100ah' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">🌿</div>
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
          Ready to Start Your Off-Grid Journey?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to design your perfect off-grid system.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing Calculator
          </Link>
          <Link href="/calculators/off-grid-budget" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Budget Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}