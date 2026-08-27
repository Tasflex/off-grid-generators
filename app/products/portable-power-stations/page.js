'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'
import Link from 'next/link'
import { Zap, Battery, Weight, Timer } from 'lucide-react'

export default function PortablePowerStationsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const [capacityFilter, setCapacityFilter] = useState('all')
  
  const products = [
    {
      id: 'ecoflow-river-2',
      name: 'EcoFlow River 2',
      brand: 'EcoFlow',
      capacity: 256,
      output: 300,
      price: 199,
      weight: 7.7,
      dimensions: '9.7 x 5.8 x 5.9 inches',
      warranty: '5 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Compact', 'Fast Charging', 'Lightweight'],
      affiliateUrl: 'https://impact.com/ecoflow?aff_id=YOUR_ID&offer=river-2',
      image: '/images/products/ecoflow-river-2.jpg',
      rating: 4.6,
      reviews: 456,
      badge: 'Best Value'
    },
    {
      id: 'jackery-explorer-300',
      name: 'Jackery Explorer 300',
      brand: 'Jackery',
      capacity: 293,
      output: 300,
      price: 299,
      weight: 7.1,
      dimensions: '9.1 x 5.2 x 7.7 inches',
      warranty: '2 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Portable', 'Reliable', 'Multiple Ports'],
      affiliateUrl: 'https://impact.com/jackery?aff_id=YOUR_ID&offer=explorer-300',
      image: '/images/products/jackery-explorer-300.jpg',
      rating: 4.7,
      reviews: 789,
      badge: 'Top Rated'
    },
    {
      id: 'bluetti-eb3a',
      name: 'Bluetti EB3A',
      brand: 'Bluetti',
      capacity: 268,
      output: 600,
      price: 249,
      weight: 10.1,
      dimensions: '10 x 7.5 x 7.4 inches',
      warranty: '2 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Fast Charging', 'Compact', 'LCD Display'],
      affiliateUrl: 'https://shareasale.com/r.cfm?b=123&u=YOUR_ID&m=456&afftrack=eb3a',
      image: '/images/products/bluetti-eb3a.jpg',
      rating: 4.5,
      reviews: 345,
      badge: null
    }
  ]

  const filteredProducts = products.filter(product => {
    if (capacityFilter === 'under-300' && product.capacity >= 300) return false
    if (capacityFilter === '300-500' && (product.capacity < 300 || product.capacity >= 500)) return false
    if (capacityFilter === 'over-500' && product.capacity < 500) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Portable Power Stations</h1>
        <p className="text-gray-600 mt-1">
          Lightweight, compact power solutions for camping, travel, and emergency backup.
        </p>
      </div>

      {/* Comparison Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm text-gray-700">
            <strong>Quick Compare:</strong> Use our calculator to find the perfect size for your needs.
          </span>
        </div>
        <Link href="/calculators/battery-runtime" className="text-blue-600 hover:underline text-sm font-medium">
          Calculate Runtime →
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCapacityFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            All
          </button>
          <button
            onClick={() => setCapacityFilter('under-300')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === 'under-300' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Under 300Wh
          </button>
          <button
            onClick={() => setCapacityFilter('300-500')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === '300-500' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            300-500Wh
          </button>
          <button
            onClick={() => setCapacityFilter('over-500')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === 'over-500' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            500Wh+
          </button>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Buying Tips */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Portable Power Station Buying Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Battery className="h-4 w-4 text-blue-600 mr-2" />
              Capacity Matters
            </h3>
            <p className="text-sm text-gray-600">
              Choose a capacity that's 20-30% more than your estimated needs. This gives you 
              buffer for unexpected usage and accounts for battery degradation over time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Weight className="h-4 w-4 text-blue-600 mr-2" />
              Consider Weight
            </h3>
            <p className="text-sm text-gray-600">
              If you're carrying your power station, look for models under 10 lbs. 
              For car camping, up to 20 lbs is manageable.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 ebay-card p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Not sure which size you need?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our battery runtime calculator to see how long each model will run your devices.
        </p>
        <Link href="/calculators/battery-runtime" className="ebay-btn-primary inline-block">
          Try the Calculator
        </Link>
      </div>
    </div>
  )
}