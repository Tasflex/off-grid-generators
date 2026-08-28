'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Check, X, Zap, Battery, Weight, Shield, DollarSign, ArrowRight, ThumbsUp, ThumbsDown, Trophy, Info, Calendar, Clock } from 'lucide-react'
import { getProductById } from '../../../lib/products'  // Fixed import path

export default function JackeryVsEcoFlowPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const jackery2000 = getProductById('jackery-explorer-2000')
  const ecoFlowDelta2 = getProductById('ecoflow-delta-2')

  const comparisonData = [
    { category: 'Performance', items: [
      { label: 'Battery Capacity', jackery: '2,160 Wh', ecoflow: '1,024 Wh', winner: 'jackery', jackeryScore: 5, ecoflowScore: 3 },
      { label: 'AC Output', jackery: '2,200 W', ecoflow: '1,800 W', winner: 'jackery', jackeryScore: 5, ecoflowScore: 4 },
      { label: 'Charging Time', jackery: '4 hrs', ecoflow: '1 hr (fast)', winner: 'ecoflow', jackeryScore: 3, ecoflowScore: 5 },
      { label: 'Expansion', jackery: 'No', ecoflow: 'Yes (up to 2,048Wh)', winner: 'ecoflow', jackeryScore: 0, ecoflowScore: 5 }
    ]},
    { category: 'Portability', items: [
      { label: 'Weight', jackery: '43.5 lbs', ecoflow: '27 lbs', winner: 'ecoflow', jackeryScore: 3, ecoflowScore: 5 },
      { label: 'Dimensions', jackery: '15.1" x 10.4" x 12.2"', ecoflow: '15.7" x 8.3" x 11.1"', winner: 'ecoflow', jackeryScore: 3, ecoflowScore: 5 },
      { label: 'Handle', jackery: 'Foldable handle', ecoflow: 'Side handles', winner: 'jackery', jackeryScore: 5, ecoflowScore: 4 }
    ]},
    { category: 'Features', items: [
      { label: 'Smart App', jackery: 'No', ecoflow: 'Yes', winner: 'ecoflow', jackeryScore: 0, ecoflowScore: 5 },
      { label: 'Warranty', jackery: '3 years', ecoflow: '5 years', winner: 'ecoflow', jackeryScore: 3, ecoflowScore: 5 },
      { label: 'Customer Service', jackery: 'Excellent', ecoflow: 'Good', winner: 'jackery', jackeryScore: 5, ecoflowScore: 4 }
    ]},
    { category: 'Value', items: [
      { label: 'Price', jackery: '$1,699', ecoflow: '$899', winner: 'ecoflow', jackeryScore: 2, ecoflowScore: 5 },
      { label: 'Price per Wh', jackery: '$0.79/Wh', ecoflow: '$0.88/Wh', winner: 'jackery', jackeryScore: 5, ecoflowScore: 3 },
      { label: 'Overall Value', jackery: 'Good', ecoflow: 'Excellent', winner: 'ecoflow', jackeryScore: 3, ecoflowScore: 5 }
    ]}
  ]

  const jackeryTotal = comparisonData.flatMap(cat => cat.items).reduce((sum, item) => sum + item.jackeryScore, 0)
  const ecoFlowTotal = comparisonData.flatMap(cat => cat.items).reduce((sum, item) => sum + item.ecoflowScore, 0)

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
        <span className="text-gray-900">Jackery vs EcoFlow</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Comparison</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Jackery Explorer 2000 vs EcoFlow Delta 2: Which is Better?
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            8 min read
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
            <h3 className="font-semibold text-blue-600 mb-2">Best for Capacity: Jackery Explorer 2000</h3>
            <p className="text-sm text-gray-600 mb-3">
              More capacity and power for heavy-duty applications. Better for home backup and larger appliances.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {jackeryTotal}/35</span>
              <Link href="/products/jackery-explorer-2000" className="text-blue-600 hover:underline text-sm font-medium">
                View Product →
              </Link>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-600 mb-2">Best for Value: EcoFlow Delta 2</h3>
            <p className="text-sm text-gray-600 mb-3">
              Half the price, better warranty, expandable, and faster charging. Perfect for most users.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {ecoFlowTotal}/35</span>
              <Link href="/products/ecoflow-delta-2" className="text-blue-600 hover:underline text-sm font-medium">
                View Product →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8 shadow-sm">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium ${
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">Jackery Explorer 2000</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">Best Capacity</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-semibold">2,160 Wh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Output</span>
                      <span className="font-semibold">2,200 W</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-semibold">43.5 lbs</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Warranty</span>
                      <span className="font-semibold">3 years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price</span>
                      <span className="font-semibold">$1,699</span>
                    </div>
                  </div>
                  <Link href="/products/jackery-explorer-2000" className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                    View Details
                  </Link>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">EcoFlow Delta 2</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Best Value</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-semibold">1,024 Wh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Output</span>
                      <span className="font-semibold">1,800 W</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-semibold">27 lbs</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Warranty</span>
                      <span className="font-semibold">5 years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price</span>
                      <span className="font-semibold">$899</span>
                    </div>
                  </div>
                  <Link href="/products/ecoflow-delta-2" className="block text-center bg-green-600 text-white py-2 rounded mt-3 text-sm hover:bg-green-700">
                    View Details
                  </Link>
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
                            <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">Jackery Explorer 2000</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-green-600">EcoFlow Delta 2</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Winner</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map(item => (
                            <tr key={item.label} className="border-t">
                              <td className="px-4 py-3 text-sm font-medium">{item.label}</td>
                              <td className="px-4 py-3 text-sm">{item.jackery}</td>
                              <td className="px-4 py-3 text-sm">{item.ecoflow}</td>
                              <td className="px-4 py-3">
                                {item.winner === 'jackery' ? (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                    Jackery ✓
                                  </span>
                                ) : item.winner === 'ecoflow' ? (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                    EcoFlow ✓
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Choose the Jackery Explorer 2000 if:</h2>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You need maximum capacity for large appliances',
                      'You prioritize brand trust and reliability',
                      'You don\'t need expansion options',
                      'You want a foldable handle for easier transport'
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Choose the EcoFlow Delta 2 if:</h2>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You want the best value for your money',
                      'You need expandable capacity',
                      'You want fast charging (1 hour)',
                      'You prefer a lighter unit (27 lbs)',
                      'You want a longer 5-year warranty'
                    ].map(item => (
                      <li key={item} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Our Verdict</h3>
                <p className="text-sm text-gray-600">
                  For most users, the EcoFlow Delta 2 is the better choice. It costs $800 less, has a 5-year warranty, 
                  fast charging, and can be expanded. However, if you need maximum capacity for heavy appliances, the 
                  Jackery Explorer 2000 is worth the extra investment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calculator CTA */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Not Sure Which One Fits Your Needs?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your exact power requirements.
        </p>
        <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold inline-block">
          Calculate My Needs
        </Link>
      </div>

      {/* Related Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/comparisons/ecoflow-vs-bluetti" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            EcoFlow vs Bluetti
          </h3>
          <p className="text-sm text-gray-600">Which brand offers better value?</p>
        </Link>
        <Link href="/comparisons/solar-vs-gas-generator" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            Solar vs Gas Generator
          </h3>
          <p className="text-sm text-gray-600">Which backup power option is right for you?</p>
        </Link>
      </div>
    </div>
  )
}