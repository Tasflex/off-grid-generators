'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Home, Battery, Zap, Shield, DollarSign, Wrench, Lightbulb, Refrigerator, Wifi, Phone, Heart, Thermometer, Fan } from 'lucide-react'

export default function HomeBackupSystemsGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [backupType, setBackupType] = useState('partial')

  const backupTypes = {
    partial: {
      label: 'Partial Home Backup',
      description: 'Power essential appliances only',
      capacity: '1000-3000Wh',
      cost: '$500 - $2,500',
      components: ['Portable power station', 'Solar panels (optional)'],
      appliances: ['Refrigerator', 'Lights', 'Phone/Tablet', 'Wi-Fi Router', 'CPAP Machine']
    },
    whole: {
      label: 'Whole Home Backup',
      description: 'Power all essential + comfort appliances',
      capacity: '5000-15000Wh',
      cost: '$3,000 - $10,000',
      components: ['Large battery bank', 'Inverter', 'Transfer switch', 'Solar panels'],
      appliances: ['Refrigerator', 'Lights', 'TV', 'Wi-Fi', 'CPAP', 'Fans', 'Microwave']
    },
    complete: {
      label: 'Complete Home Backup',
      description: 'Power everything, including AC and heating',
      capacity: '15000-30000+Wh',
      cost: '$10,000 - $30,000+',
      components: ['Large battery bank', 'High-capacity inverter', 'Automatic transfer switch', 'Full solar array'],
      appliances: ['All of the above', 'HVAC', 'Well pump', 'Electric stove', 'Washing machine']
    }
  }

  const appliancesGuide = [
    { 
      category: 'Critical (Must Have)',
      items: [
        { name: 'Refrigerator', watts: 150, surge: 600 },
        { name: 'Freezer', watts: 100, surge: 400 },
        { name: 'Medical Equipment (CPAP)', watts: 60, surge: 60 },
        { name: 'Wi-Fi Router', watts: 20, surge: 20 },
        { name: 'Phone Charger', watts: 10, surge: 10 },
        { name: 'LED Lighting (10 bulbs)', watts: 100, surge: 100 }
      ]
    },
    {
      category: 'Important (Nice to Have)',
      items: [
        { name: 'LED TV (50")', watts: 100, surge: 100 },
        { name: 'Laptop Charger', watts: 65, surge: 65 },
        { name: 'Ceiling Fans', watts: 75, surge: 150 },
        { name: 'Microwave', watts: 1000, surge: 1500 },
        { name: 'Coffee Maker', watts: 800, surge: 800 }
      ]
    },
    {
      category: 'Comfort (Luxury)',
      items: [
        { name: 'Portable AC', watts: 500, surge: 2000 },
        { name: 'Space Heater', watts: 1500, surge: 1500 },
        { name: 'Washing Machine', watts: 500, surge: 1500 },
        { name: 'Dishwasher', watts: 1200, surge: 1800 },
        { name: 'Electric Oven', watts: 3000, surge: 3000 }
      ]
    }
  ]

  const selectedBackup = backupTypes[backupType]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'types', label: 'Backup Types' },
    { id: 'appliances', label: 'Appliance Guide' },
    { id: 'installation', label: 'Installation' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Home Backup Systems</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Home Backup</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Complete Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Home Backup Systems: Complete Guide
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Protect your home from power outages with the right backup system. From portable power stations 
          to whole-home battery banks, find the perfect solution for your needs.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            14 min read
          </span>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">$500+</div>
          <div className="text-xs text-gray-600">Starting Price</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">1-3</div>
          <div className="text-xs text-gray-600">Days of Backup</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-xs text-gray-600">Peace of Mind</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">30%</div>
          <div className="text-xs text-gray-600">Energy Cost Savings</div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Why You Need Home Backup</h2>
                <p className="text-gray-600 mb-4">
                  Power outages are becoming more frequent and longer-lasting. Having a home backup system 
                  protects your food, medications, and keeps your family safe and comfortable during emergencies.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Shield,
                      title: 'Protection',
                      description: 'Keep essential appliances running during outages'
                    },
                    {
                      icon: DollarSign,
                      title: 'Savings',
                      description: 'Reduce energy costs with solar integration'
                    },
                    {
                      icon: Home,
                      title: 'Security',
                      description: 'Maintain security systems and communication'
                    }
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="border rounded p-4 text-center">
                        <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
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
                    <h4 className="font-semibold text-yellow-800 mb-1">Did You Know?</h4>
                    <p className="text-sm text-yellow-700">
                      The average American experiences approximately 6 hours of power interruption per year. 
                      With climate change, extreme weather events are making outages more common.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Backup Types Tab */}
          {activeTab === 'types' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Backup Type</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Backup Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(backupTypes).map(([key, data]) => (
                    <button
                      key={key}
                      onClick={() => setBackupType(key)}
                      className={`p-4 border rounded-lg text-left ${
                        backupType === key
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{data.label}</h3>
                      <p className="text-sm text-gray-500">{data.description}</p>
                      <div className="text-xs text-blue-600 font-medium mt-2">
                        {data.capacity} | {data.cost}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">System Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-semibold">{selectedBackup.capacity}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Estimated Cost</span>
                      <span className="font-semibold">{selectedBackup.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Components</span>
                      <span className="font-semibold text-right">{selectedBackup.components.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Appliances Covered</h3>
                  <ul className="space-y-1">
                    {selectedBackup.appliances.map((appliance, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {appliance}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Appliances Tab */}
          {activeTab === 'appliances' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Appliance Power Guide</h2>
              <p className="text-gray-600 mb-4">
                Know how much power your appliances use to choose the right backup system.
              </p>
              
              {appliancesGuide.map((category, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className={`font-semibold mb-3 ${
                    category.category === 'Critical (Must Have)' ? 'text-red-600' :
                    category.category === 'Important (Nice to Have)' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                    {category.category}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold">Appliance</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Running Watts</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Surge Watts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-4 py-3 text-sm">{item.name}</td>
                            <td className="px-4 py-3 text-sm">{item.watts}W</td>
                            <td className="px-4 py-3 text-sm">{item.surge}W</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    <strong>Important:</strong> Always check surge watts (startup power) - motor-driven appliances 
                    can draw 2-4x their running power to start.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Installation Tab */}
          {activeTab === 'installation' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Installation Guide</h2>
              <div className="space-y-4">
                {[
                  {
                    title: '1. Plan Your System',
                    description: 'Calculate your power needs and choose the right components.'
                  },
                  {
                    title: '2. Position Your Equipment',
                    description: 'Place battery and inverter in a dry, ventilated area away from heat and moisture.'
                  },
                  {
                    title: '3. Install Transfer Switch',
                    description: 'For whole-home systems, install a transfer switch to safely connect to your electrical panel.'
                  },
                  {
                    title: '4. Connect the Battery',
                    description: 'Connect your battery bank to the inverter with proper gauge cables and fuses.'
                  },
                  {
                    title: '5. Add Solar Panels (Optional)',
                    description: 'Mount panels on your roof or ground to recharge your batteries during outages.'
                  },
                  {
                    title: '6. Test Your System',
                    description: 'Simulate an outage to ensure everything works correctly.'
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded p-4">
                    <Wrench className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-red-50 border border-red-200 rounded p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Safety Warning</h4>
                    <p className="text-sm text-red-700">
                      Electrical work can be dangerous. If you're not comfortable with electrical systems, 
                      hire a licensed electrician for installation, especially for whole-home systems.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Home Backup Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow Delta Pro', type: 'Home Backup', capacity: '3600Wh', href: '/products/ecoflow-delta-pro' },
            { name: 'Bluetti AC200MAX', type: 'Home Backup', capacity: '2048Wh', href: '/products/bluetti-ac200max' },
            { name: 'Jackery Explorer 1000', type: 'Home Backup', capacity: '1002Wh', href: '/products/jackery-explorer-1000' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">🏠</div>
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
          Ready to Protect Your Home?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to find the perfect backup system for your home.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing Calculator
          </Link>
          <Link href="/products/solar-generators" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Shop Backup Systems
          </Link>
        </div>
      </div>
    </div>
  )
}