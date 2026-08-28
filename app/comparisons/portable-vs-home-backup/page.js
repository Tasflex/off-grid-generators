'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Zap, Battery, Home, Caravan, Shield, DollarSign, ArrowRight, ThumbsUp, ThumbsDown, Trophy, Info, Calendar, Clock, Wifi, Lightbulb, Fan, Snowflake } from 'lucide-react'

export default function PortableVsHomeBackupPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const comparisonData = [
    { category: 'Capacity', items: [
      { label: 'Typical Capacity', portable: '500 - 3,600 Wh', home: '5,000 - 25,000+ Wh', winner: 'home' },
      { label: 'Power Output', portable: '300 - 3,600 W', home: '5,000 - 20,000+ W', winner: 'home' },
      { label: 'Run Time', portable: '1-3 days (essentials)', home: '3-7+ days (whole home)', winner: 'home' }
    ]},
    { category: 'Portability', items: [
      { label: 'Weight', portable: '10 - 100 lbs', home: '200 - 1,000+ lbs', winner: 'portable' },
      { label: 'Wheeled', portable: 'Some models', home: 'Usually built-in', winner: 'home' },
      { label: 'Installation', portable: 'Plug & play', home: 'Professional required', winner: 'portable' }
    ]},
    { category: 'Features', items: [
      { label: 'Solar Compatible', portable: 'Yes', home: 'Yes', winner: 'tie' },
      { label: 'Smart App Control', portable: 'Some models', home: 'Advanced monitoring', winner: 'home' },
      { label: 'Expansion', portable: 'Limited', home: 'Modular & scalable', winner: 'home' },
      { label: 'Automatic Transfer', portable: 'Manual switch', home: 'Automatic (optional)', winner: 'home' }
    ]},
    { category: 'Cost', items: [
      { label: 'Upfront Cost', portable: '$200 - $3,500', home: '$5,000 - $25,000+', winner: 'portable' },
      { label: 'Installation Cost', portable: '$0 (DIY)', home: '$2,000 - $10,000', winner: 'portable' },
      { label: 'Maintenance', portable: 'Low', home: 'Moderate', winner: 'portable' },
      { label: 'Long-term Value', portable: 'Good for mobility', home: 'Better ROI for homes', winner: 'home' }
    ]},
    { category: 'Best For', items: [
      { label: 'Camping & RV', portable: '✅ Excellent', home: '❌ Too heavy', winner: 'portable' },
      { label: 'Apartment', portable: '✅ Ideal', home: '❌ Not suitable', winner: 'portable' },
      { label: 'Home Backup', portable: '⚠️ Limited', home: '✅ Best option', winner: 'home' },
      { label: 'Emergency Preparedness', portable: '✅ Good', home: '✅ Excellent', winner: 'home' },
      { label: 'Budget', portable: '✅ More affordable', home: '❌ Expensive', winner: 'portable' }
    ]}
  ]

  const portableScore = 14 // Wins in categories
  const homeScore = 16

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
        <span className="text-gray-900">Portable vs Home Backup</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Comparison</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Portable Power Station vs Home Backup System: Which Do You Need?
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Understand the difference between portable power stations and whole-home backup systems to make the right choice for your needs.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            10 min read
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
              <Caravan className="h-4 w-4 mr-1" />
              Best for Mobility & Budget: Portable Power Station
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for camping, RV travel, and apartment living. Easy to move, no installation required, and much more affordable.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {portableScore}/30</span>
              <Link href="/products/portable-power-stations" className="text-blue-600 hover:underline text-sm font-medium">
                Browse Portable →
              </Link>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-600 mb-2 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Best for Whole Home: Home Backup System
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Designed for whole-home protection. Powers your entire house, integrates with solar, and provides days of backup.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Score: {homeScore}/30</span>
              <Link href="/products/battery-backups" className="text-blue-600 hover:underline text-sm font-medium">
                Browse Home Systems →
              </Link>
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">Portable Power Stations</h2>
                <p className="text-gray-600 mb-3">
                  Portable power stations are all-in-one battery systems that you can carry anywhere. They're perfect for camping, 
                  RV travel, and emergency backup for essential devices.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Caravan className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Mobile</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Zap className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">300-3,600W</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <Battery className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">500-3,600Wh</div>
                  </div>
                  <div className="bg-blue-50 rounded p-3 text-center">
                    <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">$200-$3,500</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Home Backup Systems</h2>
                <p className="text-gray-600 mb-3">
                  Home backup systems are permanent installations that power your entire home during outages. They integrate with 
                  your electrical panel and can be paired with solar panels for renewable energy.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-green-50 rounded p-3 text-center">
                    <Home className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Whole Home</div>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <Zap className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">5,000-20,000W</div>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <Battery className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">5,000-25,000+Wh</div>
                  </div>
                  <div className="bg-green-50 rounded p-3 text-center">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold">$5,000-$25,000+</div>
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
                            <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">Portable Power Station</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-green-600">Home Backup System</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map(item => (
                            <tr key={item.label} className="border-t">
                              <td className="px-4 py-3 text-sm font-medium">{item.label}</td>
                              <td className="px-4 py-3 text-sm">{item.portable}</td>
                              <td className="px-4 py-3 text-sm">{item.home}</td>
                              <td className="px-4 py-3">
                                {item.winner === 'portable' ? (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                    Portable ✓
                                  </span>
                                ) : item.winner === 'home' ? (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                    Home ✓
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
                  <Caravan className="h-5 w-5 text-blue-600 mr-2" />
                  Choose a Portable Power Station if:
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You need backup power on the go (camping, RV, tailgating)',
                      'You live in an apartment or rental where installation isn\'t possible',
                      'You\'re on a tight budget ($200-$3,500)',
                      'You only need to power essential devices (phone, laptop, CPAP)',
                      'You want a simple plug-and-play solution',
                      'You need backup for occasional outages (1-3 days)'
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
                  <Home className="h-5 w-5 text-green-600 mr-2" />
                  Choose a Home Backup System if:
                </h2>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <ul className="space-y-2">
                    {[
                      'You own your home and want whole-house protection',
                      'You experience frequent or extended outages (3-7+ days)',
                      'You have solar panels and want to store energy',
                      'You need to power large appliances (AC, well pump, refrigerator)',
                      'You want automatic transfer during outages',
                      'You\'re planning long-term and want the best ROI'
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
                  <span className="font-semibold">For most people:</span> Start with a portable power station. It's affordable, 
                  versatile, and covers 80% of emergency needs. You can always upgrade to a home backup system later.
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">For homeowners:</span> A home backup system is a better investment if you 
                  experience frequent outages. It protects your entire home and increases property value.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Help Deciding?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your exact power needs and get personalized recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate Your Needs
          </Link>
          <Link href="/products/solar-generators" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Browse Products
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