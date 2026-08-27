'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import { SlidersHorizontal, X, Check } from 'lucide-react'

const filters = {
  brands: ['EcoFlow', 'Bluetti', 'Jackery', 'Renogy', 'Goal Zero'],
  capacity: [
    { label: 'Under 500Wh', min: 0, max: 500 },
    { label: '500Wh - 1000Wh', min: 500, max: 1000 },
    { label: '1000Wh - 2000Wh', min: 1000, max: 2000 },
    { label: '2000Wh - 5000Wh', min: 2000, max: 5000 },
    { label: '5000Wh+', min: 5000, max: Infinity },
  ],
  price: [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $2000', min: 1000, max: 2000 },
    { label: '$2000 - $5000', min: 2000, max: 5000 },
    { label: '$5000+', min: 5000, max: Infinity },
  ]
}

export default function SolarGeneratorsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCapacity, setSelectedCapacity] = useState([])
  const [selectedPrice, setSelectedPrice] = useState([])
  const [sortBy, setSortBy] = useState('featured')

  const products = getProductsByCategory('solarGenerators')

  // Filter logic
  const filteredProducts = products.filter(product => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false
    if (selectedCapacity.length > 0) {
      const capacityMatch = selectedCapacity.some(cap => 
        product.capacity >= cap.min && product.capacity < cap.max
      )
      if (!capacityMatch) return false
    }
    if (selectedPrice.length > 0) {
      const priceMatch = selectedPrice.some(price => 
        product.price >= price.min && product.price < price.max
      )
      if (!priceMatch) return false
    }
    return true
  })

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'capacity': return b.capacity - a.capacity
      default: return b.reviews - a.reviews // featured by reviews
    }
  })

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const toggleCapacity = (cap) => {
    setSelectedCapacity(prev =>
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    )
  }

  const togglePrice = (price) => {
    setSelectedPrice(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    )
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCapacity([])
    setSelectedPrice([])
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Solar Generators</h1>
        <p className="text-gray-600 mt-1">
          Complete portable power stations with built-in inverters. From 300W to 3600W+ output.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center px-4 py-2 bg-white border rounded-md"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
          <span className="text-sm text-gray-600">
            {sortedProducts.length} products found
          </span>
        </div>
        
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

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Filter content would go here */}
            <button onClick={clearAllFilters} className="text-blue-600 mb-4">Clear All</button>
            <div className="space-y-6">
              {/* Brand Filter */}
              <div>
                <h4 className="font-medium mb-2">Brand</h4>
                {filters.brands.map(brand => (
                  <label key={brand} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
              
              {/* Capacity Filter */}
              <div>
                <h4 className="font-medium mb-2">Capacity</h4>
                {filters.capacity.map(cap => (
                  <label key={cap.label} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCapacity.includes(cap)}
                      onChange={() => toggleCapacity(cap)}
                      className="rounded"
                    />
                    <span className="text-sm">{cap.label}</span>
                  </label>
                ))}
              </div>
              
              {/* Price Filter */}
              <div>
                <h4 className="font-medium mb-2">Price</h4>
                {filters.price.map(price => (
                  <label key={price.label} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedPrice.includes(price)}
                      onChange={() => togglePrice(price)}
                      className="rounded"
                    />
                    <span className="text-sm">{price.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products match your filters.</p>
          <button onClick={clearAllFilters} className="text-blue-600 hover:underline mt-2">
            Clear all filters
          </button>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Still not sure which solar generator is right for you?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to find the exact capacity you need based on your appliances.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate My Needs
          </Link>
          <Link href="/comparisons/ecoflow-vs-bluetti" className="ebay-btn-secondary">
            Compare Top Brands
          </Link>
        </div>
      </div>
    </div>
  )
}