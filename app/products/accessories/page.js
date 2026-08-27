'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import Link from 'next/link'

export default function AccessoriesPage() {
  const [sortBy, setSortBy] = useState('featured')
  const products = getProductsByCategory('accessories')

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
        <h1 className="text-2xl font-bold text-gray-900">Accessories</h1>
        <p className="text-gray-600 mt-1">
          Essential add-ons to complete your solar system setup.
        </p>
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

      {/* Bottom CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Building a complete solar system?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to plan your full setup before buying accessories.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Calculate Your System
        </Link>
      </div>
    </div>
  )
}