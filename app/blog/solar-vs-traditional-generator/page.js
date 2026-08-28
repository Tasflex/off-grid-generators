'use client'

import Link from 'next/link'
import { Sun, Flame, Check, X, ArrowRight, Calendar, Clock, Info, TrendingUp } from 'lucide-react'

export default function SolarVsTraditionalGenerator() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Solar vs Traditional Generator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Comparison</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Solar Generator vs Traditional Generator: Which to Choose?
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            December 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            10 min read
          </span>
        </div>
      </div>

      {/* Quick Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="ebay-card p-6 bg-gradient-to-r from-blue-50 to-yellow-50">
          <div className="text-center mb-3">
            <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900">Solar Generator</h2>
          </div>
          <ul className="space-y-2">
            {['Silent operation', 'Zero emissions', 'No fuel needed', 'Low maintenance', 'Free energy from sun'].map(item => (
              <li key={item} className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="ebay-card p-6">
          <div className="text-center mb-3">
            <Flame className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900">Traditional Generator</h2>
          </div>
          <ul className="space-y-2">
            {['Loud operation', 'Produces emissions', 'Requires fuel', 'High maintenance', 'Fuel costs add up'].map(item => (
              <li key={item} className="flex items-start">
                <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">5-Year Cost Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Cost Factor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Solar Generator</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Gas Generator</th>
              </tr>
            </thead>
            <tbody>
              {[
                { factor: 'Initial Cost', solar: '$1,000 - $3,000', gas: '$500 - $1,500' },
                { factor: 'Fuel (5 years)', solar: '$0', gas: '$2,500 - $5,000' },
                { factor: 'Maintenance', solar: '$50/year', gas: '$150/year' },
                { factor: 'Total (5 years)', solar: '$1,250 - $3,750', gas: '$3,750 - $7,250' },
                { factor: 'Break-even', solar: '2-3 years', gas: 'N/A' }
              ].map(row => (
                <tr key={row.factor} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.factor}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">{row.solar}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">{row.gas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-2">Solar Generator</h3>
            <ul className="space-y-1 text-sm">
              <li>✓ Zero emissions</li>
              <li>✓ Quiet operation</li>
              <li>✓ Uses renewable energy</li>
              <li>✓ No fuel storage needed</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">Gas Generator</h3>
            <ul className="space-y-1 text-sm">
              <li>✗ Produces CO2</li>
              <li>✗ Loud noise pollution</li>
              <li>✗ Requires fuel storage</li>
              <li>✗ Produces carbon monoxide</li>
            </ul>
          </div>
        </div>
      </div>

      {/* When to Choose Which */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">When to Choose Which</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">Choose Solar When:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You need quiet, clean power</li>
              <li>You're in a sunny area</li>
              <li>You want long-term savings</li>
              <li>You're doing van life or camping</li>
              <li>You need emergency backup</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">Choose Gas When:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You need power for days without sun</li>
              <li>You have high power demands (AC, heaters)</li>
              <li>You're on a tight budget</li>
              <li>You don't mind noise and maintenance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Go Solar?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to find the perfect solar system for your needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/products/solar-generators" className="ebay-btn-secondary">
            Shop Solar Generators
          </Link>
        </div>
      </div>
    </div>
  )
}