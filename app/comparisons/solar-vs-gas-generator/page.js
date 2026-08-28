'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap, Battery, Sun, Droplet, DollarSign, ArrowRight, ThumbsUp, ThumbsDown, Trophy, Info, Calendar, Clock, AlertTriangle, Shield, Caravan, Home } from 'lucide-react'

export default function SolarVsGasGeneratorPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const comparisonData = [
    { category: 'Power Source', items: [
      { label: 'Fuel Type', solar: 'Solar + Battery', gas: 'Gasoline/Propane/Diesel', winner: 'solar' },
      { label: 'Cost Per kWh', solar: '$0.00 (free after install)', gas: '$0.50 - $1.00', winner: 'solar' },
      { label: 'Runtime (per charge/tank)', solar: '1-7 days (capacity dependent)', gas: '8-24 hours', winner: 'solar' },
      { label: 'Refueling', solar: 'Sunlight (free)', gas: 'Gas station (ongoing cost)', winner: 'solar' }
    ]},
    { category: 'Operation', items: [
      { label: 'Noise Level', solar: 'Silent (0 dB)', gas: '60-80 dB (loud)', winner: 'solar' },
      { label: 'Emissions', solar: 'Zero emissions', gas: 'CO2 emissions', winner: 'solar' },
      { label: 'Maintenance', solar: 'Low (battery only)', gas: 'High (oil, spark plugs, filters)', winner: 'solar' },
      { label: 'Setup', solar: 'Plug and play', gas: 'Fuel + start', winner: 'solar' }
    ]},
    { category: 'Performance', items: [
      { label: 'Power Output', solar: '300 - 3,600+ W', gas: '1,000 - 10,000+ W', winner: 'gas' },
      { label: 'Capacity', solar: '500 - 25,000+ Wh', gas: 'Continuous (as long as fuel lasts)', winner: 'gas' },
      { label: 'Peak Power', solar: 'Surge capacity', gas: 'Can handle heavy loads', winner: 'gas' },
      { label: 'Scalability', solar: 'Add more batteries/panels', gas: 'Buy larger unit', winner: 'solar' }
    ]},
    { category: 'Cost', items: [
      { label: 'Upfront Cost', solar: '$200 - $25,000+', gas: '$500 - $10,000', winner: 'gas' },
      { label: 'Long-term Cost', solar: 'Low (free fuel)', gas: 'High (fuel + maintenance)', winner: 'solar' },
      { label: 'Fuel Cost (10 yrs)', solar: '$0', gas: '$5,000 - $20,000+', winner: 'solar' },
      { label: 'Total Cost of Ownership', solar: 'Lower over time', gas: 'Higher over time', winner: 'solar' }
    ]},
    { category: 'Best For', items: [
      { label: 'Emergency Backup', solar: '✅ Excellent (silent, clean)', gas: '✅ Good (reliable)', winner: 'solar' },
      { label: 'Camping & RV', solar: '✅ Best (silent, portable)', gas: '⚠️ Loud, smelly', winner: 'solar' },
      { label: 'Home Backup', solar: '✅ Excellent', gas: '✅ Good', winner: 'solar' },
      { label: 'Construction Site', solar: '⚠️ Limited', gas: '✅ Best (high power)', winner: 'gas' },
      { label: 'Environment', solar: '✅ Zero emissions', gas: '❌ High emissions', winner: 'solar' }
    ]}
  ]

  const solarScore = 16
  const gasScore = 8

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'recommendation', label: 'Recommendation' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/comparisons" className="hover:text-blue-600">Comparisons</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Solar vs Gas Generator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Comparison</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Solar Generator vs Gas Generator: Which Is Right for You?
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Compare solar generators with traditional gas generators to find the best backup power solution for your needs.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            9 min read
          </span>
        </div>
      </div>

      {/* Quick Verdict */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
          Quick Verdict
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-blue-600 mb-2 flex items-center">
              <Sun className="h-4 w-4 mr-1" />
              Best Overall: Solar Generator
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Silent, zero emissions, free fuel, low maintenance. Perfect for home backup, camping, and everyday use. Higher upfront cost but pays for itself over time.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {solarScore}/25</span>
              <Link href="/products/solar-generators" className="text-blue-600 hover:underline text-sm font-medium">
                Browse Solar →
              </Link>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-orange-600 mb-2 flex items-center">
              <Droplet className="h-4 w-4 mr-1" />
              Best for Power: Gas Generator
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Higher power output and longer continuous runtime. Good for construction sites and high-power needs. Cheaper upfront but expensive to run long-term.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {gasScore}/25</span>
              <span className="text-gray-400 text-sm">No affiliate products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 text-sm">Important Safety Note</h3>
            <p className="text-sm text-red-700">
              Gas generators produce carbon monoxide (CO) - a deadly gas. Never run them indoors, in garages, or near windows. 
              Solar generators produce zero emissions and can be used safely indoors.
            </p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Sun className="h-6 w-6 text-yellow-500 mr-2" />
                  Solar Generators
                </h2>
                <p className="text-gray-600 mb-3">
                  Solar generators combine batteries with solar panels to store clean, renewable energy. They're silent, 
                  produce zero emissions, and can be used indoors. While the upfront cost is higher, the fuel is completely free.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Safe Indoors</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Zap className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">0 dB Silent</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Sun className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Free Fuel</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">$200-$25,000</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Droplet className="h-6 w-6 text-orange-500 mr-2" />
                  Gas Generators
                </h2>
                <p className="text-gray-600 mb-3">
                  Gas generators use gasoline, propane, or diesel to produce power. They offer high output and continuous 
                  runtime as long as you have fuel. They're cheaper to buy but expensive to run and maintain.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-orange-50 rounded p-3 text-center">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Outdoor Only</div>
                  </div>
                  <div className="bg-orange-50 rounded p-3 text-center">
                    <Zap className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">60-80 dB Loud</div>
                  </div>
                  <div className="bg-orange-50 rounded p-3 text-center">
                    <Droplet className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Fuel Costs</div>
                  </div>
                  <div className="bg-orange-50 rounded p-3 text-center">
                    <DollarSign className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">$500-$10,000</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Comparison</h2>
              <div className="space-y-6">
                {comparisonData.map(category => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.category}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold">Specification</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">Solar Generator</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-orange-600">Gas Generator</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map(item => (
                            <tr key={item.label} className="border-t">
                              <td className="px-4 py-3 text-sm font-medium">{item.label}</td>
                              <td className="px-4 py-3 text-sm">{item.solar}</td>
                              <td className="px-4 py-3 text-sm">{item.gas}</td>
                              <td className="px-4 py-3">
                                {item.winner === 'solar' ? (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                    Solar ✓
                                  </span>
                                ) : item.winner === 'gas' ? (
                                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-semibold">
                                    Gas ✓
                                  </span>
                                ) : (
                                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                                    Tie
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation Tab */}
          {activeTab === 'recommendation' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                  Choose a Solar Generator if:
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You want silent, emission-free power',
                      'You need indoor-safe backup power',
                      'You value low maintenance and long-term savings',
                      'You have access to sunlight (even partial)',
                      'You want power for camping, RV, or home backup',
                      'You\'re environmentally conscious'
                    ].map(item => (
                      <li key={item} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Droplet className="h-5 w-5 text-orange-500 mr-2" />
                  Choose a Gas Generator if:
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You need very high power output (10,000+ W)',
                      'You have a tight upfront budget',
                      'You need power for construction or industrial use',
                      'You have unlimited fuel access',
                      'You don\'t mind noise and maintenance',
                      'You need continuous runtime (not intermittent)'
                    ].map(item => (
                      <li key={item} className="flex items-start">
                        <Check className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Our Verdict</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">For 90% of users:</span> A solar generator is the better choice. It's safer, 
                  cleaner, quieter, and cheaper to run. The higher upfront cost is offset by zero fuel costs and minimal maintenance.
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">For power-intensive needs:</span> A gas generator is still useful for 
                  construction sites, large workshops, and remote locations where solar isn't practical. Just be prepared for 
                  ongoing fuel and maintenance costs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Go Solar?
        </h2>
        <p className="text-gray-600 mb-4">
          Find the perfect solar generator for your needs with our sizing calculator.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate Your Needs
          </Link>
          <Link href="/products/solar-generators" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Browse Solar Generators
          </Link>
        </div>
      </div>

      {/* Related Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/comparisons/ecoflow-vs-bluetti" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            EcoFlow vs Bluetti
          </h3>
          <p className="text-sm text-gray-600">Which brand offers better value?</p>
        </Link>
        <Link href="/comparisons/portable-vs-home-backup" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            Portable vs Home Backup
          </h3>
          <p className="text-sm text-gray-600">Which solution fits your lifestyle?</p>
        </Link>
      </div>
    </div>
  )
}