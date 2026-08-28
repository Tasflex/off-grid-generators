'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import Link from 'next/link'
import { Package, Info, ArrowRight, Check, Zap } from 'lucide-react'

export default function CompleteKitsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const products = getProductsByCategory('completeKits')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'capacity': return b.capacity - a.capacity
      default: return b.reviews - a.reviews
    }
  })

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Complete Solar Kits</h1>
        <p className="text-gray-600 mt-1">
          Everything you need in one package. Panels, batteries, inverter, and accessories included.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Package className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Why Buy a Complete Kit?</h3>
            <p className="text-sm text-gray-600">
              Kits include everything you need for a working system. No guesswork about compatibility. 
              Save 10-20% compared to buying components separately.
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
            <option value="capacity">Largest Capacity</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* What's Included */}
      <div className="ebay-card p-6 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What's Usually Included in a Complete Kit?</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { item: 'Solar Panels', icon: Zap },
            { item: 'Battery Bank', icon: Package },
            { item: 'Inverter', icon: Zap },
            { item: 'Charge Controller', icon: Package },
            { item: 'Cables & Wires', icon: Package },
            { item: 'Mounting Hardware', icon: Package }
          ].map(component => (
            <div key={component.item} className="bg-gray-50 rounded p-3 text-center">
              <component.icon className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium">{component.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Not Sure Which Kit Is Right for You?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your exact power needs before buying.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Calculate Your Needs
        </Link>
      </div>
    </div>
  )
}