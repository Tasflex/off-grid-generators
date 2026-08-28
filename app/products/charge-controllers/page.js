'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import Link from 'next/link'
import { Info, ArrowRight, Check, X } from 'lucide-react'

export default function ChargeControllersPage() {
  const [sortBy, setSortBy] = useState('featured')
  const products = getProductsByCategory('chargeControllers')

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
        <h1 className="text-2xl font-bold text-gray-900">Charge Controllers</h1>
        <p className="text-gray-600 mt-1">
          Regulate solar panel voltage to safely charge your batteries. MPPT for efficiency, PWM for budget.
        </p>
      </div>

      {/* MPPT vs PWM Comparison */}
      <div className="ebay-card p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">MPPT vs PWM: What's the Difference?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">MPPT Controllers</h3>
            <p className="text-sm text-gray-600 mb-3">
              Maximum Power Point Tracking. Up to 30% more efficient, works better in cold weather and partial shade.
            </p>
            <ul className="space-y-2">
              {['30% more efficient', 'Better in cold weather', 'Works with higher voltage panels', 'Best for systems over 200W'].map(item => (
                <li key={item} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-2">PWM Controllers</h3>
            <p className="text-sm text-gray-600 mb-3">
              Pulse Width Modulation. Simpler and cheaper, but less efficient. Good for small systems.
            </p>
            <ul className="space-y-2">
              {['More affordable', 'Simpler technology', 'Good for small systems (under 200W)', 'Less efficient'].map(item => (
                <li key={item} className="flex items-start text-sm">
                  <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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

      {/* CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Need Help Choosing a Charge Controller?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our solar panel layout calculator to determine your exact requirements.
        </p>
        <Link href="/calculators/solar-panel-layout" className="ebay-btn-primary inline-block">
          Calculate Panel Layout
        </Link>
      </div>
    </div>
  )
}