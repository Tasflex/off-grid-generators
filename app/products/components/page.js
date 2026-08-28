'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import Link from 'next/link'
import { Wrench, Info, ArrowRight, Check } from 'lucide-react'

export default function ComponentsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const products = getProductsByCategory('components')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return b.reviews - a.reviews
    }
  })

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Components & Accessories</h1>
        <p className="text-gray-600 mt-1">
          Essential components for building and maintaining your solar power system.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Don't Forget These!</h3>
            <p className="text-sm text-gray-600">
              Every solar system needs proper cables, fuses, and connectors. These components ensure 
              safety and reliability. Always use the correct gauge wire for your current.
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
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Essential Components Checklist */}
      <div className="ebay-card p-6 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Essential Components Checklist</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { component: 'Battery Cables', why: 'Connect batteries to inverter and charge controller', size: '2-4 AWG' },
            { component: 'Inline Fuses', why: 'Protect system from overcurrent', size: 'Proper amp rating' },
            { component: 'MC4 Connectors', why: 'Connect solar panels safely', size: 'Standard' },
            { component: 'Solar Mounts', why: 'Secure panels to roof or ground', size: 'Panel size' },
            { component: 'Battery Monitor', why: 'Track battery health and charge levels', size: 'Bluetooth optional' },
            { component: 'Wire Lugs', why: 'Terminate battery cables', size: 'Match cable size' }
          ].map(item => (
            <div key={item.component} className="flex items-start bg-gray-50 rounded p-3">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{item.component}</h3>
                <p className="text-xs text-gray-500">{item.why}</p>
                <span className="text-xs text-blue-600 font-medium">{item.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Building a Complete System?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to plan your full setup before buying components.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Calculate Your System
        </Link>
      </div>
    </div>
  )
}