'use client'

import Link from 'next/link'
import { TrendingUp, Zap, Battery, Check, ArrowRight, Calendar, Clock, Info, DollarSign } from 'lucide-react'

export default function SolarMarketTrends() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Solar Market Trends</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Industry News</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          2026 Solar Market Trends: What to Expect
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            November 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            6 min read
          </span>
        </div>
      </div>

      {/* Key Trends */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Trends for 2026</h2>
        <div className="space-y-6">
          {[
            {
              title: 'Prices Continue to Drop',
              icon: DollarSign,
              description: 'Solar panel costs have dropped 50% in the last 5 years. Expect further reductions as manufacturing scales up.',
              color: 'bg-green-100 text-green-600'
            },
            {
              title: 'Battery Technology Improves',
              icon: Battery,
              description: 'LiFePO4 batteries are becoming standard. Higher capacity, longer lifespan, better safety.',
              color: 'bg-blue-100 text-blue-600'
            },
            {
              title: 'Smart Integration',
              icon: Zap,
              description: 'More products include smart app control, Bluetooth monitoring, and automated energy management.',
              color: 'bg-yellow-100 text-yellow-600'
            },
            {
              title: 'Expandable Systems',
              icon: TrendingUp,
              description: 'Modular systems that can grow with your needs are becoming the norm.',
              color: 'bg-purple-100 text-purple-600'
            }
          ].map(trend => (
            <div key={trend.title} className="bg-gray-50 rounded p-4">
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${trend.color}`}>
                  <trend.icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-gray-900">{trend.title}</h3>
              </div>
              <p className="text-sm text-gray-600 ml-11">{trend.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Growth */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Market Growth Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { stat: '$5.3B', label: 'Market Size by 2028' },
            { stat: '8.5%', label: 'CAGR Growth' },
            { stat: '25%', label: 'Price Drop Since 2020' },
            { stat: '3,500+', label: 'LiFePO4 Battery Cycles' }
          ].map(item => (
            <div key={item.label} className="bg-gray-50 rounded p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{item.stat}</div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What It Means for You */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What This Means for You</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            If you've been waiting to buy a solar generator, 2026 is a great time. Prices are dropping, 
            technology is improving, and there are more options than ever before.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Our Recommendations:</h3>
            <ul className="space-y-2">
              {['Look for LiFePO4 batteries for longest lifespan', 'Choose expandable systems for future growth', 'Consider smart monitoring for peace of mind', 'Buy during sales events (Prime Day, Black Friday)'].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Upgrade Your Solar System?
        </h2>
        <p className="text-gray-600 mb-4">
          Browse our recommended products or use our calculators to find the perfect fit.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/products/solar-generators" className="ebay-btn-primary">
            Shop Solar Generators
          </Link>
          <Link href="/calculators/solar-sizing" className="ebay-btn-secondary">
            Calculate Your Needs
          </Link>
        </div>
      </div>
    </div>
  )
}