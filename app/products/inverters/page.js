'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import Link from 'next/link'
import { Zap, ArrowRight, Info, Check } from 'lucide-react'

export default function InvertersPage() {
  const [sortBy, setSortBy] = useState('featured')
  const products = getProductsByCategory('inverters')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'output': return b.output - a.output
      default: return b.reviews - a.reviews
    }
  })

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inverters</h1>
        <p className="text-gray-600 mt-1">
          Convert DC battery power to AC for your appliances. Pure sine wave for clean, reliable power.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What Size Inverter Do I Need?</h3>
            <p className="text-sm text-gray-600">
              Add up the wattage of all devices you want to run simultaneously. Add 20% safety margin. 
              Use our <Link href="/calculators/ac-load" className="text-blue-600 hover:underline">AC Load Calculator</Link> for exact sizing.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <span className="text-sm text-gray-600">
          {sortedProducts.length} products found
        </span>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="output">Largest Output</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Buying Guide */}
      <div className="ebay-card p-6 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Inverter Buying Guide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Pure Sine vs Modified Sine</h3>
            <p className="text-sm text-gray-600 mb-2">
              Pure sine wave is best for sensitive electronics, medical equipment, and motors. 
              Modified sine is cheaper but may cause issues with some devices.
            </p>
            <div className="bg-green-50 border border-green-200 rounded p-2 text-sm">
              <span className="font-semibold text-green-800">Recommendation:</span>
              <span className="text-green-700">Always choose pure sine wave</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Sizing Your Inverter</h3>
            <p className="text-sm text-gray-600 mb-2">
              Add up the running watts of all devices you need to power at once. 
              Don't forget startup surge (3-4x for motors).
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-sm">
              <span className="font-semibold text-blue-800">Tip:</span>
              <span className="text-blue-700">Add 20% buffer for safety</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Battery Compatibility</h3>
            <p className="text-sm text-gray-600 mb-2">
              Match your inverter input voltage to your battery bank (12V, 24V, or 48V).
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
              <span className="font-semibold text-yellow-800">Important:</span>
              <span className="text-yellow-700">Check your battery voltage first</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Not Sure What Size Inverter You Need?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your exact requirements.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Calculate Your System
        </Link>
      </div>
    </div>
  )
}