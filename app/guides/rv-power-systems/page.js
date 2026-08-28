'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Caravan, Battery, Zap, Sun, Plug, Shield, Wrench, DollarSign, Home, Thermometer, Fan, Refrigerator, Laptop, Phone } from 'lucide-react'

export default function RVPowerSystemsGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [rvSize, setRvSize] = useState('medium')
  const [hasSolar, setHasSolar] = useState(true)
  const [hasInverter, setHasInverter] = useState(true)

  const rvSizes = {
    small: { 
      label: 'Small RV / Camper Van', 
      batteryCapacity: 200, 
      solarWattage: 200, 
      inverterWattage: 1000,
      dailyUsage: 1500,
      description: 'Weekend trips, minimal appliances'
    },
    medium: { 
      label: 'Medium RV (Class C)', 
      batteryCapacity: 400, 
      solarWattage: 400, 
      inverterWattage: 2000,
      dailyUsage: 3000,
      description: 'Extended trips, standard appliances'
    },
    large: { 
      label: 'Large RV (Class A / 5th Wheel)', 
      batteryCapacity: 800, 
      solarWattage: 800, 
      inverterWattage: 3000,
      dailyUsage: 5000,
      description: 'Full-time living, all appliances'
    }
  }

  const appliances = [
    { name: 'LED Lights (10x)', watts: 50, hours: 5, dailyWh: 250, icon: Home },
    { name: '12V Refrigerator', watts: 45, hours: 24, dailyWh: 1080, icon: Refrigerator },
    { name: 'Water Pump', watts: 60, hours: 1, dailyWh: 60, icon: Zap },
    { name: 'Vent Fan', watts: 30, hours: 8, dailyWh: 240, icon: Fan },
    { name: 'Laptop', watts: 65, hours: 4, dailyWh: 260, icon: Laptop },
    { name: 'Phone Charger', watts: 10, hours: 2, dailyWh: 20, icon: Phone },
    { name: 'TV (32")', watts: 50, hours: 3, dailyWh: 150, icon: Zap },
    { name: 'Microwave', watts: 1000, hours: 0.5, dailyWh: 500, icon: Zap }
  ]

  const selectedRv = rvSizes[rvSize]

  const powerComponents = [
    {
      component: 'Battery Bank',
      description: 'Stores energy for use when not plugged in',
      options: 'AGM, LiFePO4, Lithium',
      recommendation: 'LiFePO4 recommended for longevity and safety'
    },
    {
      component: 'Solar Panels',
      description: 'Recharges batteries using sunlight',
      options: '100W, 200W, 400W panels',
      recommendation: '200W+ for medium RVs, 400W+ for large'
    },
    {
      component: 'Charge Controller',
      description: 'Regulates solar charging to protect batteries',
      options: 'PWM (budget) or MPPT (efficient)',
      recommendation: 'MPPT for best efficiency'
    },
    {
      component: 'Inverter',
      description: 'Converts DC battery power to AC for standard outlets',
      options: 'Modified sine wave or Pure sine wave',
      recommendation: 'Pure sine wave for sensitive electronics'
    },
    {
      component: 'Battery Monitor',
      description: 'Shows battery level and power consumption',
      options: 'Basic voltmeter or Bluetooth smart monitor',
      recommendation: 'Bluetooth monitor for real-time tracking'
    },
    {
      component: 'Transfer Switch',
      description: 'Switches between shore power and inverter power',
      options: 'Manual or automatic',
      recommendation: 'Automatic for convenience'
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Components' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'installation', label: 'Installation Tips' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">RV Power Systems</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">RV Life</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Complete Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RV Power Systems: Complete Guide to Off-Grid Living
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Everything you need to know about powering your RV, from solar panels and batteries to inverters and generators. 
          Learn how to build the perfect system for your mobile lifestyle.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            15 min read
          </span>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4 text-center">
            <Battery className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Battery Bank</h3>
            <p className="text-sm text-gray-600">Stores energy for when you need it</p>
            <p className="text-xs text-blue-600 font-medium mt-1">200-800+ Ah</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Solar Panels</h3>
            <p className="text-sm text-gray-600">Free energy from the sun</p>
            <p className="text-xs text-blue-600 font-medium mt-1">200-800+ Watts</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Inverter</h3>
            <p className="text-sm text-gray-600">Power for AC appliances</p>
            <p className="text-xs text-blue-600 font-medium mt-1">1000-3000+ Watts</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding RV Power Systems</h2>
                <p className="text-gray-600 mb-4">
                  An RV power system consists of several key components working together to provide electricity 
                  when you're not connected to shore power. The main goal is to have reliable, sustainable power 
                  for all your appliances and devices.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">12V DC System</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        Powers: Lights, water pump, vent fans, USB ports
                      </li>
                      <li className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        Runs directly from batteries
                      </li>
                      <li className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        Most efficient for RV appliances
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">120V AC System</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        Powers: Outlets, microwave, TV, laptops
                      </li>
                      <li className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        Requires an inverter to convert DC to AC
                      </li>
                      <li className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        Used when shore power or generator is available
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Pro Tip</h4>
                    <p className="text-sm text-blue-700">
                      For the best RV power system, invest in a quality battery bank (LiFePO4), MPPT charge controller, 
                      and pure sine wave inverter. This combination provides the most reliable and efficient power.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Components Tab */}
          {activeTab === 'components' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Components</h2>
              <div className="space-y-4">
                {powerComponents.map((item, index) => (
                  <div key={index} className="border rounded p-4">
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.component}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Options: {item.options}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Best: {item.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizing Tab */}
          {activeTab === 'sizing' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">RV Power System Sizing</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your RV Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(rvSizes).map(([size, data]) => (
                    <button
                      key={size}
                      onClick={() => setRvSize(size)}
                      className={`p-4 border rounded-lg text-left ${
                        rvSize === size
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{data.label}</h3>
                      <p className="text-sm text-gray-500">{data.description}</p>
                      <div className="text-xs text-blue-600 font-medium mt-2">
                        {data.batteryCapacity}Ah | {data.solarWattage}W | {data.inverterWattage}W
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommended System for Your RV</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Battery Bank</span>
                      <span className="font-semibold">{selectedRv.batteryCapacity} Ah LiFePO4</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Solar Panels</span>
                      <span className="font-semibold">{selectedRv.solarWattage} W</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Inverter</span>
                      <span className="font-semibold">{selectedRv.inverterWattage} W Pure Sine Wave</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Daily Usage</span>
                      <span className="font-semibold">{selectedRv.dailyUsage} Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Runtime</span>
                      <span className="font-semibold text-blue-600">
                        {(selectedRv.batteryCapacity * 12 / selectedRv.dailyUsage * 0.85).toFixed(1)} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Appliance Power Consumption</h3>
                  <div className="space-y-2">
                    {appliances.map((appliance, index) => {
                      const Icon = appliance.icon
                      return (
                        <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                          <div className="flex items-center">
                            <Icon className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm text-gray-600">{appliance.name}</span>
                          </div>
                          <span className="text-sm font-medium">{appliance.dailyWh} Wh/day</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Installation Tab */}
          {activeTab === 'installation' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Installation Tips</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Mount Solar Panels First',
                    description: 'Mount panels on the roof before installing other components. Use proper sealant to prevent leaks.'
                  },
                  {
                    title: 'Keep Cables Short',
                    description: 'Minimize cable runs between batteries, charge controller, and inverter to reduce voltage drop.'
                  },
                  {
                    title: 'Use Proper Gauge Wire',
                    description: '10 AWG for solar cables, 2 AWG for battery cables. Undersized wires cause voltage drop and heat.'
                  },
                  {
                    title: 'Install Fuses & Breakers',
                    description: 'Always use fuses between battery and inverter, and between solar panels and charge controller.'
                  },
                  {
                    title: 'Vent Your Batteries',
                    description: 'LiFePO4 batteries don\'t off-gas, but still need ventilation to prevent overheating.'
                  },
                  {
                    title: 'Label Everything',
                    description: 'Label all cables and connections for easy troubleshooting and future upgrades.'
                  }
                ].map((tip, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded p-4">
                    <Wrench className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> If you're not comfortable with electrical work, hire a professional RV technician. 
                    Improper installation can damage your system or cause safety hazards.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended RV Power Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Bluetti AC200MAX', type: 'Power Station', capacity: '2048Wh', href: '/products/bluetti-ac200max' },
            { name: 'EcoFlow Delta Pro', type: 'Power Station', capacity: '3600Wh', href: '/products/ecoflow-delta-pro' },
            { name: 'Renogy 200W Solar Panel', type: 'Solar Panel', capacity: '200W', href: '/products/renogy-200w-solar-panel' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
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
          Ready to Build Your RV Power System?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to design the perfect system for your RV.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing Calculator
          </Link>
          <Link href="/guides/van-life-solar-sizing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Van Life Solar Guide
          </Link>
        </div>
      </div>
    </div>
  )
}