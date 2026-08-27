'use client'

import Link from 'next/link'
import { Calculator, Battery, Wallet, Sun, Timer, Grid, Zap, ArrowRight } from 'lucide-react'

const calculators = [
  {
    title: 'Solar Sizing Calculator',
    description: 'Find the perfect solar generator for your specific appliances and usage patterns.',
    icon: Calculator,
    href: '/calculators/solar-sizing',
    color: 'bg-blue-100 text-blue-600',
    popular: true,
    features: ['12+ appliances', 'Quick scenarios', 'Product recommendations']
  },
  {
    title: 'Battery Runtime Calculator',
    description: 'Calculate how long any battery will run your devices before needing a recharge.',
    icon: Battery,
    href: '/calculators/battery-runtime',
    color: 'bg-green-100 text-green-600',
    popular: true,
    features: ['Popular batteries', 'Popular devices', 'Matching products']
  },
  {
    title: 'Off-Grid Budget Calculator',
    description: 'Estimate the total cost of your off-grid solar system based on your energy needs.',
    icon: Wallet,
    href: '/calculators/off-grid-budget',
    color: 'bg-yellow-100 text-yellow-600',
    popular: true,
    features: ['Cost breakdown', 'Monthly savings', 'Phased purchase']
  },
  {
    title: 'Solar Panel Layout Calculator',
    description: 'Calculate how many solar panels you need and plan your panel placement.',
    icon: Grid,
    href: '/calculators/solar-panel-layout',
    color: 'bg-orange-100 text-orange-600',
    popular: false,
    features: ['Panel count', 'Roof fit check', 'System size']
  },
  {
    title: 'Charge Time Calculator',
    description: 'Calculate how long it takes to charge your generator with solar, AC, or car charging.',
    icon: Timer,
    href: '/calculators/charge-time',
    color: 'bg-purple-100 text-purple-600',
    popular: false,
    features: ['3 charge methods', 'Efficiency factors', 'Quick estimates']
  }
]

export default function CalculatorsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Calculators</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Free Calculators</h1>
        <p className="text-gray-600">
          Interactive tools to help you plan, size, and budget your off-grid power system.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {calculators.map(calc => {
          const Icon = calc.icon
          return (
            <Link
              key={calc.href}
              href={calc.href}
              className="ebay-card p-6 hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${calc.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                      {calc.title}
                    </h2>
                    {calc.popular && (
                      <span className="ml-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-3">
                  {calc.features.map(feature => (
                    <span key={feature} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                <span className="text-blue-600 group-hover:underline text-sm font-medium flex items-center">
                  Use Calculator <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* How to Use */}
      <div className="ebay-card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Our Calculators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Input Your Data</h3>
            <p className="text-sm text-gray-600">
              Select appliances, battery specs, or energy needs. Our calculators handle the rest.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Get Instant Results</h3>
            <p className="text-sm text-gray-600">
              Get precise calculations with industry-standard efficiency factors.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Buy with Confidence</h3>
            <p className="text-sm text-gray-600">
              Get matched to recommended products based on your exact needs.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Need Help Choosing the Right Calculator?
        </h2>
        <p className="text-gray-600 mb-4">
          Read our comprehensive guide on how to calculate your solar power needs.
        </p>
        <Link href="/guides/how-to-choose" className="ebay-btn-primary inline-block">
          Read the Guide
        </Link>
      </div>
    </div>
  )
}