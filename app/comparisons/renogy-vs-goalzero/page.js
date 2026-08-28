'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap, Battery, Sun, DollarSign, ArrowRight, ThumbsUp, ThumbsDown, Trophy, Info, Calendar, Clock, Shield, Weight, Wrench, Home, Caravan } from 'lucide-react'

export default function RenogyVsGoalZeroPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const comparisonData = [
    { category: 'Performance', items: [
      { label: 'Typical Capacity', renogy: '500 - 1,000 Wh', goalzero: '500 - 1,500 Wh', winner: 'goalzero' },
      { label: 'Power Output', renogy: '500 - 1,000 W', goalzero: '300 - 2,000 W', winner: 'goalzero' },
      { label: 'Battery Type', renogy: 'LiFePO4', goalzero: 'Lithium (various)', winner: 'renogy' },
      { label: 'Solar Input', renogy: 'Up to 200W', goalzero: 'Up to 300W', winner: 'goalzero' }
    ]},
    { category: 'Portability', items: [
      { label: 'Weight', renogy: '23 - 35 lbs', goalzero: '20 - 45 lbs', winner: 'renogy' },
      { label: 'Dimensions', renogy: 'Compact', goalzero: 'Varies', winner: 'renogy' },
      { label: 'Handle', renogy: 'Built-in', goalzero: 'Some models', winner: 'renogy' }
    ]},
    { category: 'Features', items: [
      { label: 'MPPT Controller', renogy: 'Yes', goalzero: 'Yes', winner: 'tie' },
      { label: 'LCD Display', renogy: 'Yes', goalzero: 'Yes', winner: 'tie' },
      { label: 'App Control', renogy: 'Limited', goalzero: 'Yes', winner: 'goalzero' },
      { label: 'Warranty', renogy: '3-5 years', goalzero: '2 years', winner: 'renogy' },
      { label: 'Expandability', renogy: 'Yes', goalzero: 'Limited', winner: 'renogy' }
    ]},
    { category: 'Cost', items: [
      { label: 'Price Range', renogy: '$299 - $699', goalzero: '$399 - $1,799', winner: 'renogy' },
      { label: 'Value for Money', renogy: 'Excellent', goalzero: 'Good', winner: 'renogy' },
      { label: 'Price per Wh', renogy: '$0.60 - $0.80', goalzero: '$0.80 - $1.20', winner: 'renogy' }
    ]},
    { category: 'Best For', items: [
      { label: 'Budget-Conscious Buyers', renogy: '✅ Best', goalzero: '⚠️ Good', winner: 'renogy' },
      { label: 'Camping & RV', renogy: '✅ Good', goalzero: '✅ Good', winner: 'tie' },
      { label: 'Home Backup', renogy: '⚠️ Limited', goalzero: '✅ Good', winner: 'goalzero' },
      { label: 'DIY Solar Projects', renogy: '✅ Best', goalzero: '⚠️ Limited', winner: 'renogy' },
      { label: 'Professional Use', renogy: '⚠️ Good', goalzero: '✅ Best', winner: 'goalzero' }
    ]}
  ]

  const renogyScore = 14
  const goalzeroScore = 10

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
        <span className="text-gray-900">Renogy vs Goal Zero</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Comparison</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Renogy vs Goal Zero: Which Solar Generator is Right for You?
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Compare two popular brands in the solar generator market. Renogy offers budget-friendly solutions while Goal Zero focuses on premium, ready-to-use systems.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
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
            <h3 className="font-semibold text-blue-600 mb-2 flex items-center">
              <Wrench className="h-4 w-4 mr-1" />
              Best for Budget & DIY: Renogy
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Renogy offers excellent value for money with high-quality components at lower prices. Perfect for DIY solar projects, budget-conscious buyers, and those who want to build their own system.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {renogyScore}/25</span>
              <Link href="/products/solar-generators" className="text-blue-600 hover:underline text-sm font-medium">
                Browse Renogy →
              </Link>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-600 mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Best for Premium & Ready-to-Use: Goal Zero
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Goal Zero delivers premium, ready-to-use systems with excellent customer support and brand recognition. Ideal for those who want a complete solution that works out of the box.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {goalzeroScore}/25</span>
              <Link href="/products/solar-generators" className="text-blue-600 hover:underline text-sm font-medium">
                Browse Goal Zero →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Renogy</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Value Champion</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Best-in-class value</span>
                <p className="text-sm text-gray-600">More features for less money</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">LiFePO4 batteries</span>
                <p className="text-sm text-gray-600">Longer lifespan and safer chemistry</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">DIY-friendly</span>
                <p className="text-sm text-gray-600">Perfect for custom solar installations</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Better warranty</span>
                <p className="text-sm text-gray-600">3-5 year warranty on most products</p>
              </div>
            </div>
            <div className="flex items-start">
              <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Limited app functionality</span>
                <p className="text-sm text-gray-600">Basic monitoring compared to competitors</p>
              </div>
            </div>
          </div>
          <Link href="/products/solar-generators" className="block text-center bg-blue-600 text-white py-2 rounded mt-4 text-sm hover:bg-blue-700 transition">
            View Renogy Products
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Goal Zero</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Premium Choice</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Premium build quality</span>
                <p className="text-sm text-gray-600">High-quality materials and construction</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Excellent app experience</span>
                <p className="text-sm text-gray-600">Full monitoring and control from your phone</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Ready-to-use systems</span>
                <p className="text-sm text-gray-600">Complete solutions that work out of the box</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Trusted brand</span>
                <p className="text-sm text-gray-600">Established reputation and excellent support</p>
              </div>
            </div>
            <div className="flex items-start">
              <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Higher price point</span>
                <p className="text-sm text-gray-600">Premium quality comes at a premium cost</p>
              </div>
            </div>
          </div>
          <Link href="/products/solar-generators" className="block text-center bg-green-600 text-white py-2 rounded mt-4 text-sm hover:bg-green-700 transition">
            View Goal Zero Products
          </Link>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Renogy Overview</h2>
                <p className="text-gray-600">
                  Renogy specializes in affordable solar solutions for DIY enthusiasts and budget-conscious buyers. 
                  They offer high-quality components including LiFePO4 batteries, MPPT charge controllers, and solar panels 
                  at competitive prices. Their products are designed for those who want to build custom solar systems.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Budget-Friendly</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Battery className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">LiFePO4</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Wrench className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">DIY Focus</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">3-5 Year Warranty</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Goal Zero Overview</h2>
                <p className="text-gray-600">
                  Goal Zero is a premium brand that delivers ready-to-use solar solutions for campers, RV owners, and 
                  homeowners. Their products are known for their build quality, excellent app integration, and comprehensive 
                  customer support. They focus on complete, turnkey solutions that work right out of the box.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div className="bg-green-50 rounded p-3 text-center">
                    <Shield className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Premium Quality</div>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <Zap className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Ready-to-Use</div>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <Sun className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">App Control</div>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Premium Price</div>
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
                            <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">Renogy</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-green-600">Goal Zero</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map(item => (
                            <tr key={item.label} className="border-t">
                              <td className="px-4 py-3 text-sm font-medium">{item.label}</td>
                              <td className="px-4 py-3 text-sm">{item.renogy}</td>
                              <td className="px-4 py-3 text-sm">{item.goalzero}</td>
                              <td className="px-4 py-3">
                                {item.winner === 'renogy' ? (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                    Renogy ✓
                                  </span>
                                ) : item.winner === 'goalzero' ? (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                    Goal Zero ✓
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
                  <Wrench className="h-5 w-5 text-blue-600 mr-2" />
                  Choose Renogy if:
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You\'re on a tight budget but want quality components',
                      'You enjoy DIY projects and building your own system',
                      'You want the latest LiFePO4 battery technology',
                      'You need a longer warranty (3-5 years)',
                      'You\'re building a custom solar setup for home or RV',
                      'You value functionality over premium branding'
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
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Choose Goal Zero if:
                </h2>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You want a premium, ready-to-use solution',
                      'You prefer excellent customer support and brand reputation',
                      'You want advanced app control and monitoring',
                      'You need reliable power for camping or home backup',
                      'You don\'t want to DIY or build your own system',
                      'You value polished design and build quality'
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
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">For most users:</span> Renogy offers the best value for money. You get 
                  high-quality LiFePO4 batteries, solid components, and better warranties at a lower price point. The trade-off 
                  is less premium branding and limited app features.
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">For premium seekers:</span> Goal Zero is worth the extra cost if you value 
                  ready-to-use systems, excellent app integration, and premium build quality. Their products are perfect for 
                  those who want a complete solution that just works.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Still Not Sure Which Brand is Right for You?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your power needs and get personalized product recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate Your Needs
          </Link>
          <Link href="/products/solar-generators" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Browse All Products
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