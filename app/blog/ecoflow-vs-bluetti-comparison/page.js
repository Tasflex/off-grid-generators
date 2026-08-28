'use client'

import Link from 'next/link'
import { Star, Check, X, Zap, Battery, Weight, Shield, Trophy, ArrowRight, Calendar, Clock, Info } from 'lucide-react'

export default function EcoFlowVsBluettiBlog() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">EcoFlow vs Bluetti</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Comparison</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          EcoFlow Delta Pro vs Bluetti AC200MAX: Which Is Better?
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

      {/* Quick Verdict */}
      <div className="ebay-card p-6 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
          Quick Verdict
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-blue-600 mb-2">Best Overall: EcoFlow Delta Pro</h3>
            <p className="text-sm text-gray-600">
              More capacity, faster charging, longer warranty. Best for whole-home backup.
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-600 mb-2">Best Value: Bluetti AC200MAX</h3>
            <p className="text-sm text-gray-600">
              $900 cheaper, lighter, wireless charging. Great for van life and budget buyers.
            </p>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="ebay-card p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">⚡</div>
            <h2 className="text-xl font-bold text-gray-900">EcoFlow Delta Pro</h2>
            <div className="text-sm text-gray-500">EcoFlow</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Capacity</span>
              <span className="font-semibold">3,600 Wh</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Output</span>
              <span className="font-semibold">3,600 W</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Weight</span>
              <span className="font-semibold">99 lbs</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Warranty</span>
              <span className="font-semibold">5 years</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span className="font-semibold">$1,999</span>
            </div>
          </div>
          <Link href="/products/ecoflow-delta-pro" className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
            View Details
          </Link>
        </div>
        
        <div className="ebay-card p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🔋</div>
            <h2 className="text-xl font-bold text-gray-900">Bluetti AC200MAX</h2>
            <div className="text-sm text-gray-500">Bluetti</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Capacity</span>
              <span className="font-semibold">2,048 Wh</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Output</span>
              <span className="font-semibold">2,200 W</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Weight</span>
              <span className="font-semibold">62 lbs</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Warranty</span>
              <span className="font-semibold">2 years</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span className="font-semibold">$1,099</span>
            </div>
          </div>
          <Link href="/products/bluetti-ac200max" className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
            View Details
          </Link>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Specification</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">EcoFlow Delta Pro</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-green-600">Bluetti AC200MAX</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Winner</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Capacity', ecoflow: '3,600 Wh', bluetti: '2,048 Wh', winner: 'EcoFlow' },
                { label: 'Output', ecoflow: '3,600 W', bluetti: '2,200 W', winner: 'EcoFlow' },
                { label: 'Charging Time', ecoflow: '1.8 hrs', bluetti: '3 hrs', winner: 'EcoFlow' },
                { label: 'Weight', ecoflow: '99 lbs', bluetti: '62 lbs', winner: 'Bluetti' },
                { label: 'Warranty', ecoflow: '5 years', bluetti: '2 years', winner: 'EcoFlow' },
                { label: 'Price', ecoflow: '$1,999', bluetti: '$1,099', winner: 'Bluetti' },
                { label: 'Wireless Charging', ecoflow: 'No', bluetti: 'Yes', winner: 'Bluetti' },
                { label: 'Smart App', ecoflow: 'Yes', bluetti: 'No', winner: 'EcoFlow' },
                { label: 'Expandable', ecoflow: 'Yes (25 kWh)', bluetti: 'Yes (8 kWh)', winner: 'EcoFlow' }
              ].map(row => (
                <tr key={row.label} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.label}</td>
                  <td className="px-4 py-3 text-sm">{row.ecoflow}</td>
                  <td className="px-4 py-3 text-sm">{row.bluetti}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.winner === 'EcoFlow' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {row.winner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">EcoFlow Delta Pro Pros & Cons</h2>
          <h3 className="font-semibold text-green-600 mb-2">Pros</h3>
          <ul className="space-y-2 mb-4">
            {['Huge 3.6kWh capacity', 'Powerful 3600W output', 'Fast charging (1.8 hrs)', '5-year warranty', 'Expandable to 25kWh'].map(pro => (
              <li key={pro} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-semibold text-red-600 mb-2">Cons</h3>
          <ul className="space-y-2">
            {['Heavy (99 lbs)', 'Expensive upfront'].map(con => (
              <li key={con} className="flex items-start text-sm">
                <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Bluetti AC200MAX Pros & Cons</h2>
          <h3 className="font-semibold text-green-600 mb-2">Pros</h3>
          <ul className="space-y-2 mb-4">
            {['$900 cheaper', 'Lighter (62 lbs)', 'Wireless charging', 'Good value per Wh'].map(pro => (
              <li key={pro} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-semibold text-red-600 mb-2">Cons</h3>
          <ul className="space-y-2">
            {['Lower capacity', '2-year warranty', 'No smart app'].map(con => (
              <li key={con} className="flex items-start text-sm">
                <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Which to Choose */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Which Should You Buy?</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">Choose EcoFlow Delta Pro if:</h3>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>You need whole-home backup</li>
              <li>You want the longest warranty</li>
              <li>You need fast charging</li>
              <li>You want expandable capacity</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Choose Bluetti AC200MAX if:</h3>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>You're on a budget</li>
              <li>You need portability</li>
              <li>You want wireless charging</li>
              <li>You're doing van life or camping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Not Sure Which One Fits Your Needs?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your exact power requirements.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate My Needs
          </Link>
          <Link href="/comparisons/ecoflow-vs-bluetti" className="ebay-btn-secondary">
            Full Comparison
          </Link>
        </div>
      </div>
    </div>
  )
}