'use client'

import { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import Link from 'next/link'
import { Battery, Home, Plug, Zap } from 'lucide-react'

export default function BatteryBackupsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const [capacityFilter, setCapacityFilter] = useState('all')

  const products = [
    {
      id: 'renogy-100ah-lithium',
      name: 'Renogy 100Ah Lithium Battery',
      brand: 'Renogy',
      capacity: 1280,
      output: 1000,
      price: 699,
      weight: 31.9,
      dimensions: '13.4 x 7.4 x 7.3 inches',
      warranty: '5 years',
      ports: ['DC', 'Terminal'],
      charging: ['Solar', 'AC'],
      features: ['Deep Cycle', 'Long Life', 'BMS Protection'],
      affiliateUrl: 'https://shareasale.com/r.cfm?b=123&u=YOUR_ID&m=789&afftrack=renogy-battery',
      image: '/images/products/renogy-battery.jpg',
      rating: 4.5,
      reviews: 234,
      badge: 'Best Value'
    },
    {
      id: 'battleborn-100ah',
      name: 'Battle Born 100Ah LiFePO4',
      brand: 'Battle Born',
      capacity: 1280,
      output: 1000,
      price: 949,
      weight: 31,
      dimensions: '12.8 x 6.7 x 8.7 inches',
      warranty: '10 years',
      ports: ['DC', 'Terminal'],
      charging: ['Solar', 'AC'],
      features: ['Premium Quality', 'Longest Warranty', 'Built for Off-Grid'],
      affiliateUrl: 'https://impact.com/battleborn?aff_id=YOUR_ID&offer=100ah',
      image: '/images/products/battleborn-100ah.jpg',
      rating: 4.9,
      reviews: 178,
      badge: 'Premium'
    },
    {
      id: 'ecoflow-smart-battery',
      name: 'EcoFlow Smart Battery',
      brand: 'EcoFlow',
      capacity: 3600,
      output: 3000,
      price: 1799,
      weight: 80,
      dimensions: '25 x 12 x 16 inches',
      warranty: '5 years',
      ports: ['DC', 'Terminal'],
      charging: ['Solar', 'AC'],
      features: ['Expandable', 'Smart App', 'High Capacity'],
      affiliateUrl: 'https://impact.com/ecoflow?aff_id=YOUR_ID&offer=smart-battery',
      image: '/images/products/ecoflow-smart-battery.jpg',
      rating: 4.7,
      reviews: 456,
      badge: 'High Capacity'
    }
  ]

  const filteredProducts = products.filter(product => {
    if (capacityFilter === 'under-2000' && product.capacity >= 2000) return false
    if (capacityFilter === '2000-3000' && (product.capacity < 2000 || product.capacity >= 3000)) return false
    if (capacityFilter === 'over-3000' && product.capacity < 3000) return false
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
        <h1 className="text-2xl font-bold text-gray-900">Battery Backup Systems</h1>
        <p className="text-gray-600 mt-1">
          Deep-cycle lithium batteries for permanent installations and home backup systems.
        </p>
      </div>

      {/* Comparison Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Battery className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm text-gray-700">
            <strong>System Planning:</strong> Use our solar sizing calculator to determine your battery requirements.
          </span>
        </div>
        <Link href="/calculators/solar-sizing" className="text-blue-600 hover:underline text-sm font-medium">
          Calculate Needs →
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
            onClick={() => setCapacityFilter('under-2000')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === 'under-2000' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Under 2000Wh
          </button>
          <button
            onClick={() => setCapacityFilter('2000-3000')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === '2000-3000' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            2000-3000Wh
          </button>
          <button
            onClick={() => setCapacityFilter('over-3000')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${capacityFilter === 'over-3000' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            3000Wh+
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

      {/* Battery Selection Guide */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">How to Choose a Battery Backup System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Battery className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Chemistry</h3>
            <p className="text-sm text-gray-600">LiFePO4 batteries are safer and last longer than standard lithium-ion.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Capacity</h3>
            <p className="text-sm text-gray-600">Match your battery bank size to your daily energy consumption.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Plug className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">Integration</h3>
            <p className="text-sm text-gray-600">Ensure compatibility with your inverter and charge controller.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 ebay-card p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Building a complete backup system?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our off-grid budget calculator to estimate your total system cost.
        </p>
        <Link href="/calculators/off-grid-budget" className="ebay-btn-primary inline-block">
          Calculate Budget
        </Link>
      </div>
    </div>
  )
}