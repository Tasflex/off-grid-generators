'use client'

import Link from 'next/link'
import { Zap, Battery, Home, Flame, ArrowRight, TrendingUp, Star } from 'lucide-react'

const comparisons = [
  {
    title: 'EcoFlow vs Bluetti',
    description: 'Which brand offers better value? Compare the Delta Pro vs AC200MAX.',
    href: '/comparisons/ecoflow-vs-bluetti',
    icon: Zap,
    color: 'bg-blue-100 text-blue-600',
    products: ['EcoFlow Delta Pro', 'Bluetti AC200MAX'],
    priceRange: '$1,099 - $1,999',
    popularity: 'High'
  },
  {
    title: 'Jackery vs EcoFlow',
    description: 'Portable power showdown. Jackery Explorer 2000 vs EcoFlow Delta 2.',
    href: '/comparisons/jackery-vs-ecoflow',
    icon: Battery,
    color: 'bg-green-100 text-green-600',
    products: ['Jackery Explorer 2000', 'EcoFlow Delta 2'],
    priceRange: '$899 - $1,699',
    popularity: 'High'
  },
  {
    title: 'Portable vs Home Backup',
    description: 'What type of generator do you need? Find the right size for your situation.',
    href: '/comparisons/portable-vs-home-backup',
    icon: Home,
    color: 'bg-yellow-100 text-yellow-600',
    products: ['Portable Power Stations', 'Home Backup Systems'],
    priceRange: '$200 - $5,000+',
    popularity: 'Medium'
  },
  {
    title: 'Solar vs Gas Generator',
    description: 'Which backup power option is better for you? Compare costs, emissions, and reliability.',
    href: '/comparisons/solar-vs-gas-generator',
    icon: Flame,
    color: 'bg-red-100 text-red-600',
    products: ['Solar Generators', 'Gas Generators'],
    priceRange: '$500 - $3,000',
    popularity: 'Medium'
  }
]

export default function ComparisonsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Comparisons</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Product Comparisons</h1>
        <p className="text-gray-600">
          Side-by-side comparisons of the best solar generators, power stations, and backup systems.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {comparisons.map(comparison => {
          const Icon = comparison.icon
          return (
            <Link
              key={comparison.href}
              href={comparison.href}
              className="ebay-card p-6 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${comparison.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                      {comparison.title}
                    </h2>
                    {comparison.popularity === 'High' && (
                      <span className="ml-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{comparison.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {comparison.products.map(product => (
                    <span key={product} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {product}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Price Range: {comparison.priceRange}</span>
                  <span className="text-blue-600 group-hover:underline font-medium flex items-center">
                    View Comparison <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Why Compare */}
      <div className="ebay-card p-8 mb-12 bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Compare Before Buying?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Make Informed Decisions</h3>
            <p className="text-sm text-gray-600">
              See exactly how products differ in specs, features, and value.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-sm text-gray-600">
              Find the best value by comparing price per Wh and features.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get the Right Product</h3>
            <p className="text-sm text-gray-600">
              Our comparisons help you choose based on your specific needs.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Not Sure Which Products to Compare?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to find the right products for your needs first.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Start with a Calculator
        </Link>
      </div>
    </div>
  )
}