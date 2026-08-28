'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Home, Battery, Sun, Zap, Shield, DollarSign, Wrench, TrendingUp, Award, Thermometer, Refrigerator, Wifi, Lightbulb } from 'lucide-react'

export default function WholeHomeSolarGuide() {
  const [activeTab, setActiveTab] = useState('overview')
  const [homeSize, setHomeSize] = useState('medium')

  const homeSizes = {
    small: {
      label: 'Small Home (1-2 BR)',
      dailyUsage: 8000,
      panels: 12,
      cost: 15000,
      savings: 1200,
      description: 'Energy-efficient home with moderate usage'
    },
    medium: {
      label: 'Medium Home (3-4 BR)',
      dailyUsage: 15000,
      panels: 20,
      cost: 25000,
      savings: 2000,
      description: 'Typical family home with standard appliances'
    },
    large: {
      label: 'Large Home (5+ BR)',
      dailyUsage: 25000,
      panels: 32,
      cost: 35000,
      savings: 3000,
      description: 'Large home with electric heating and multiple AC units'
    }
  }

  const systemComponents = [
    {
      component: 'Solar Panels',
      description: 'Convert sunlight to DC electricity',
      details: '400W monocrystalline panels recommended'
    },
    {
      component: 'Inverter',
      description: 'Convert DC to AC for home use',
      details: 'Grid-tie or hybrid inverter'
    },
    {
      component: 'Battery Storage (Optional)',
      description: 'Store excess energy for nighttime and outages',
      details: '10-30kWh LiFePO4 battery bank'
    },
    {
      component: 'Monitoring System',
      description: 'Track production and usage in real-time',
      details: 'Smart monitoring with phone app'
    },
    {
      component: 'Mounting Hardware',
      description: 'Secure panels to roof or ground',
      details: 'Flashing, rails, and clamps'
    }
  ]

  const savingsBreakdown = [
    { label: 'Monthly Energy Bill', amount: 250 },
    { label: 'Monthly Solar Payment', amount: 150 },
    { label: 'Monthly Net Savings', amount: 100 },
    { label: 'Annual Savings', amount: 1200 },
    { label: '25-Year Savings', amount: 30000 },
    { label: 'ROI Period', amount: '8-12 years' }
  ]

  const selectedHome = homeSizes[homeSize]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Components' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'savings', label: 'Savings' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Whole Home Solar</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Solar</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Complete Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Whole Home Solar: Complete Guide to Solar Power
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Transform your home with solar power. From system sizing to installation, savings, and tax incentives, 
          this guide covers everything you need to know about going solar for your entire home.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            16 min read
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">30%</div>
          <div className="text-xs text-gray-600">Federal Tax Credit</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">8-12</div>
          <div className="text-xs text-gray-600">Years ROI</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">25+</div>
          <div className="text-xs text-gray-600">Year Panel Warranty</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">40%</div>
          <div className="text-xs text-gray-600">Energy Bill Reduction</div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Why Go Solar?</h2>
                <p className="text-gray-600 mb-4">
                  Whole-home solar systems generate clean, renewable energy for your entire house. 
                  With the 30% federal tax credit and falling equipment costs, solar is more affordable 
                  than ever.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: DollarSign,
                      title: 'Save Money',
                      description: 'Eliminate or dramatically reduce your electric bill'
                    },
                    {
                      icon: Sun,
                      title: 'Clean Energy',
                      description: 'Reduce your carbon footprint and help the environment'
                    },
                    {
                      icon: Shield,
                      title: 'Energy Security',
                      description: 'Protect yourself from rising utility costs and outages'
                    }
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="border rounded p-4 text-center">
                        <Icon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Did You Know?</h4>
                    <p className="text-sm text-green-700">
                      The average solar panel system increases home value by 4-6%. Solar is one of the 
                      best home improvements for ROI.
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
                {systemComponents.map((item, index) => (
                  <div key={index} className="border rounded p-4">
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.component}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="mt-2">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{item.details}</span>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Sizing</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Home Size
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(homeSizes).map(([size, data]) => (
                    <button
                      key={size}
                      onClick={() => setHomeSize(size)}
                      className={`p-4 border rounded-lg text-left ${
                        homeSize === size
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{data.label}</h3>
                      <p className="text-sm text-gray-500">{data.description}</p>
                      <div className="text-xs text-blue-600 font-medium mt-2">
                        {data.dailyUsage}Wh | {data.panels} panels
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">System Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Daily Usage</span>
                      <span className="font-semibold">{selectedHome.dailyUsage} Wh</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Panels Needed</span>
                      <span className="font-semibold">{selectedHome.panels} × 400W</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">System Size</span>
                      <span className="font-semibold">{selectedHome.panels * 0.4} kW</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Roof Space</span>
                      <span className="font-semibold">{selectedHome.panels * 18} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost</span>
                      <span className="font-semibold text-blue-600">${selectedHome.cost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Annual Production</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Annual Production</span>
                      <span className="font-semibold">
                        {(selectedHome.panels * 0.4 * 5 * 365).toFixed(0)} kWh
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">CO₂ Offset</span>
                      <span className="font-semibold">
                        {(selectedHome.panels * 0.4 * 5 * 365 * 0.85 / 1000).toFixed(1)} tons/year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Equivalent Trees</span>
                      <span className="font-semibold">
                        {Math.round(selectedHome.panels * 0.4 * 5 * 365 * 0.85 / 1000 * 1.5)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Savings Tab */}
          {activeTab === 'savings' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Savings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Savings Breakdown</h3>
                  <div className="space-y-3">
                    {savingsBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between border-b pb-2 last:border-0">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold">
                          {typeof item.amount === 'number' ? `$${item.amount.toLocaleString()}` : item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Your Savings</h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-4 text-center">
                      <div className="text-sm text-gray-500">Estimated Monthly Savings</div>
                      <div className="text-3xl font-bold text-green-600">
                        ${((selectedHome.savings || 200) / 12).toFixed(0)}
                      </div>
                    </div>
                    <div className="bg-white rounded p-4 text-center">
                      <div className="text-sm text-gray-500">Estimated Annual Savings</div>
                      <div className="text-3xl font-bold text-green-600">
                        ${(selectedHome.savings || 2000).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-xs text-yellow-700 text-center">
                        <strong>Federal Tax Credit:</strong> 30% of system cost = ${(selectedHome.cost * 0.3).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Installation Process */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Installation Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: '1. Consultation',
              description: 'Professional assesses your home and energy needs'
            },
            {
              step: '2. Design',
              description: 'Custom system design with permits and approvals'
            },
            {
              step: '3. Installation',
              description: 'Professional installation (1-3 days)'
            },
            {
              step: '4. Inspection',
              description: 'Local authority inspection and approval'
            },
            {
              step: '5. Activation',
              description: 'System activation and monitoring setup'
            },
            {
              step: '6. Enjoy',
              description: 'Start saving with clean, renewable energy'
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{item.step}</div>
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
              q: 'How long does solar installation take?',
              a: 'Typically 1-3 days for installation, plus 2-4 weeks for permits and inspections. Whole process takes 1-2 months from contract to activation.'
            },
            {
              q: 'Do solar panels work during a power outage?',
              a: 'Grid-tied systems shut down during outages for safety. Add battery storage for backup power during outages.'
            },
            {
              q: 'What maintenance do solar panels need?',
              a: 'Minimal! Just keep them clean and clear of debris. Most systems need annual checkups. Panels have a 25+ year warranty.'
            },
            {
              q: 'Is my roof suitable for solar?',
              a: 'Most roofs are suitable if they/ re in good condition, get 4+ hours of direct sunlight, and face south, east, or west.'
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
          Ready to Go Solar?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to design your whole-home solar system.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing Calculator
          </Link>
          <Link href="/products/solar-panels" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Shop Solar Panels
          </Link>
        </div>
      </div>
    </div>
  )
}