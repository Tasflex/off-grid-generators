'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import { SlidersHorizontal, X } from 'lucide-react'

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

  const hasActiveFilters = selectedBrands.length > 0 || selectedCapacity.length > 0 || selectedPrice.length > 0

  // Filter UI component for desktop
  const FilterSection = () => (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters} 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Brand Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Brand</h4>
            <div className="space-y-2">
              {filters.brands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Capacity Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Capacity</h4>
            <div className="space-y-2">
              {filters.capacity.map(cap => (
                <label key={cap.label} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCapacity.includes(cap)}
                    onChange={() => toggleCapacity(cap)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cap.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Price</h4>
            <div className="space-y-2">
              {filters.price.map(price => (
                <label key={price.label} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrice.includes(price)}
                    onChange={() => togglePrice(price)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{price.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile Filter Drawer
  const MobileFilterDrawer = () => (
    <div 
      className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)} />
      <div 
        className={`absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto transition-transform duration-300 ${
          mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            {sortedProducts.length} products found
          </span>
          {hasActiveFilters && (
            <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-800">
              Clear All
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Brand Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Brand</h4>
            <div className="space-y-2">
              {filters.brands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Capacity Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Capacity</h4>
            <div className="space-y-2">
              {filters.capacity.map(cap => (
                <label key={cap.label} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCapacity.includes(cap)}
                    onChange={() => toggleCapacity(cap)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cap.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Price</h4>
            <div className="space-y-2">
              {filters.price.map(price => (
                <label key={price.label} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrice.includes(price)}
                    onChange={() => togglePrice(price)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{price.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

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
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-2 border rounded-md bg-white text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedBrands.length + selectedCapacity.length + selectedPrice.length}
              </span>
            )}
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
            className="px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="capacity">Largest Capacity</option>
          </select>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-8">
        {/* Desktop Filters */}
        <FilterSection />

        {/* Products Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No products match your filters.</p>
              <button 
                onClick={clearAllFilters} 
                className="text-blue-600 hover:underline mt-2 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer />

      {/* Bottom CTA */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Still not sure which solar generator is right for you?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to find the exact capacity you need based on your appliances.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Calculate My Needs
          </Link>
          <Link href="/comparisons/ecoflow-vs-bluetti" className="inline-block border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition">
            Compare Top Brands
          </Link>
        </div>
      </div>
    </div>
  )
}