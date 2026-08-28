'use client'

import Link from 'next/link'
import { Camp, Sun, Battery, Zap, Check, ArrowRight, Calendar, Clock, Info, Flashlight } from 'lucide-react'

export default function CampingSolarGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Camping with Solar</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Camping</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Camping with Solar: Essential Gear Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            November 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            8 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-600">
          Going camping doesn't mean giving up modern comforts. With the right solar setup, you can 
          keep your phone charged, run lights, and even power a small fridge. Here's everything you need.
        </p>
      </div>

      {/* Essential Gear */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Essential Solar Gear for Camping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Portable Power Station', description: 'Battery with AC/DC outputs', href: '/products/portable-power-stations', price: '$200-$500' },
            { name: 'Foldable Solar Panel', description: 'Charge your power station in the sun', href: '/products/solar-panels', price: '$150-$300' },
            { name: 'LED Camping Lights', description: 'Energy-efficient lighting', href: '/products/accessories', price: '$20-$50' },
            { name: 'Power Bank', description: 'Backup battery for small devices', href: '/products/components', price: '$30-$60' }
          ].map(item => (
            <div key={item.name} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="text-sm font-semibold text-blue-600 mt-1">{item.price}</div>
              <Link href={item.href} className="text-blue-600 hover:underline text-sm font-medium">
                Shop Now →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Power Needs Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What Size Power Station Do You Need?</h2>
        <div className="bg-gray-50 rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white">
                <th className="px-3 py-2 text-left">Device</th>
                <th className="px-3 py-2 text-left">Watts</th>
                <th className="px-3 py-2 text-left">Hours</th>
                <th className="px-3 py-2 text-left">Daily Wh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">Phone</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">20</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Laptop</td>
                <td className="px-3 py-2">65</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">195</td>
              </tr>
              <tr>
                <td className="px-3 py-2">LED Lights</td>
                <td className="px-3 py-2">20</td>
                <td className="px-3 py-2">5</td>
                <td className="px-3 py-2">100</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Mini Fridge</td>
                <td className="px-3 py-2">45</td>
                <td className="px-3 py-2">12</td>
                <td className="px-3 py-2">540</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-3 py-2 font-bold">Total</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2 font-bold">855 Wh</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          For a weekend trip, a 500Wh power station should suffice. For longer trips, consider 1000Wh+.
        </p>
      </div>

      {/* Recommended Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Camping Gear</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Jackery Explorer 300', price: '$299', description: 'Lightweight & portable', href: '/products/jackery-explorer-300' },
            { name: 'EcoFlow River 2', price: '$199', description: 'Best value', href: '/products/ecoflow-river-2' },
            { name: 'Jackery SolarSaga 100W', price: '$299', description: 'Foldable panel', href: '/products/jackery-solarsaga-100w' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⛺</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.description}</div>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Camping Solar Tips</h2>
        <div className="space-y-3">
          {[
            'Place panels in direct sunlight for best charging',
            'Charge your power station during the day',
            'Use power-saving modes on your devices',
            'Bring backup power bank for small devices',
            'Keep your power station in a cool, shaded spot'
          ].map(tip => (
            <div key={tip} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready for Your Next Camping Trip?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to find the perfect power solution.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/battery-runtime" className="ebay-btn-primary">
            Check Battery Runtime
          </Link>
          <Link href="/products/portable-power-stations" className="ebay-btn-secondary">
            Shop Power Stations
          </Link>
        </div>
      </div>
    </div>
  )
}