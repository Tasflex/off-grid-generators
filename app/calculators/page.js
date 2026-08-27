'use client'

import Link from 'next/link'
import { Calculator, Battery, Wallet, Sun, Zap, Info } from 'lucide-react'

const calculators = [
  {
    title: 'Solar Sizing Calculator',
    description: 'Find the perfect solar generator for your specific appliances and usage patterns.',
    icon: Calculator,
    href: '/calculators/solar-sizing',
    color: 'bg-blue-100 text-blue-600',
    popular: true
  },
  {
    title: 'Battery Runtime Calculator',
    description: 'Calculate how long any battery will run your devices before needing a recharge.',
    icon: Battery,
    href: '/calculators/battery-runtime',
    color: 'bg-green-100 text-green-600',
    popular: true
  },
  {
    title: 'Off-Grid Budget Calculator',
    description: 'Estimate the total cost of your off-grid solar system based on your energy needs.',
    icon: Wallet,
    href: '/calculators/off-grid-budget',
    color: 'bg-yellow-100 text-yellow-600',
    popular: true
  },
  {
    title: 'Solar Panel Layout Calculator',
    description: 'Calculate how many solar panels you need and plan your panel placement.',
    icon: Sun,
    href: '/calculators/solar-panel-layout',
    color: 'bg-orange-100 text-orange-600',
    popular: false
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map(calc => {
          const Icon = calc.icon
          return (
            <Link
              key={calc.href}
              href={calc.href}
              className="ebay-card p-6 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${calc.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
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
            </Link>
          )
        })}
      </div>

      {/* How to Use Section */}
      <div className="mt-12 ebay-card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-6 w-6 text-blue-600 mr-2" />
          How to Use Our Calculators
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
            <h3 className="font-semibold text-gray-900 mb-2">Input Your Data</h3>
            <p className="text-sm text-gray-600">
              Select your appliances or enter custom specifications. The more accurate your inputs, 
              the better your recommendations.
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Instant Results</h3>
            <p className="text-sm text-gray-600">
              Our calculators process your data instantly and provide exact requirements, 
              cost estimates, and product matches.
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <h3 className="font-semibold text-gray-900 mb-2">Buy with Confidence</h3>
            <p className="text-sm text-gray-600">
              Get connected to top-rated products that match your calculated needs, 
              with affiliate links to the best prices.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
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