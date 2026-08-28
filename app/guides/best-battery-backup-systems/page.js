'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Star, Check, X, Zap, Battery, Weight, DollarSign, ArrowRight, Award, Shield, Home, TrendingUp, Info } from 'lucide-react'

export default function BestBatteryBackupSystems() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'home-backup', label: 'Home Backup' },
    { id: 'off-grid', label: 'Off-Grid' },
    { id: 'best-value', label: 'Best Value' },
    { id: 'premium', label: 'Premium' }
  ]

  const products = [
    {
      id: 'ecoflow-delta-pro',
      name: 'EcoFlow Delta Pro',
      brand: 'EcoFlow',
      category: 'home-backup',
      rating: 4.8,
      reviews: 1243,
      price: 1999,
      capacity: 3600,
      output: 3600,
      weight: 99,
      badge: 'Best Overall',
      pros: ['3,600Wh capacity', 'Expandable to 25kWh', '5-year warranty', 'Smart app'],
      cons: ['Very heavy (99 lbs)', 'Expensive'],
      description: 'The most powerful portable battery backup system available. Can power an entire home.',
      bestFor: 'Whole home backup, emergency preparedness'
    },
    {
      id: 'bluetti-ac200max',
      name: 'Bluetti AC200MAX',
      brand: 'Bluetti',
      category: 'best-value',
      rating: 4.7,
      reviews: 892,
      price: 1099,
      capacity: 2048,
      output: 2200,
      weight: 62,
      badge: 'Best Value',
      pros: ['Excellent value', 'Wireless charging', 'Expandable', 'LCD display'],
      cons: ['Shorter warranty (2 years)', 'No smart app'],
      description: 'Incredible value at $1,099 with 2,048Wh capacity.',
      bestFor: 'Budget-conscious buyers, van life, emergency backup'
    },
    {
      id: 'battleborn-100ah',
      name: 'Battle Born 100Ah LiFePO4',
      brand: 'Battle Born',
      category: 'premium',
      rating: 4.9,
      reviews: 178,
      price: 949,
      capacity: 1280,
      output: 1000,
      weight: 31,
      badge: 'Premium',
      pros: ['10-year warranty', 'Premium quality', 'Built for off-grid', 'Excellent support'],
      cons: ['Premium price', 'Heavy'],
      description: 'Premium lithium battery with the longest warranty in the industry.',
      bestFor: 'Off-grid living, marine use, professional installations'
    },
    {
      id: 'renogy-battery',
      name: 'Renogy 100Ah Lithium Battery',
      brand: 'Renogy',
      category: 'best-value',
      rating: 4.5,
      reviews: 234,
      price: 699,
      capacity: 1280,
      output: 1000,
      weight: 31.9,
      badge: 'Best Battery',
      pros: ['Long lifespan', 'BMS protection', 'Deep cycle capable', '5-year warranty'],
      cons: ['Requires external inverter', 'Installation required'],
      description: 'Perfect for building your own solar system with deep cycle capability.',
      bestFor: 'DIY solar projects, off-grid living, home backup'
    },
    {
      id: 'lion-energy-100ah',
      name: 'Lion Energy 100Ah',
      brand: 'Lion Energy',
      category: 'off-grid',
      rating: 4.6,
      reviews: 123,
      price: 599,
      capacity: 1280,
      output: 1000,
      weight: 29.5,
      badge: 'Budget Pick',
      pros: ['Affordable price', 'Lightweight design', 'BMS protection', '5-year warranty'],
      cons: ['Less premium than Battle Born', 'Limited reviews'],
      description: 'Great value without compromising on quality for solar installations.',
      bestFor: 'Budget-conscious solar projects, RV upgrades, small cabins'
    },
    {
      id: 'ecoworthy-100ah',
      name: 'ECO-WORTHY 100Ah',
      brand: 'ECO-WORTHY',
      category: 'off-grid',
      rating: 4.3,
      reviews: 456,
      price: 299,
      capacity: 1280,
      output: 800,
      weight: 28.7,
      badge: 'Most Affordable',
      pros: ['Best price point', 'BMS protection', 'Deep cycle capable', 'Good for beginners'],
      cons: ['Lower quality cells', 'Shorter warranty (3 years)', 'Lower output'],
      description: 'The most affordable lithium battery on the market.',
      bestFor: 'DIY solar projects, budget builds, beginners'
    }
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Best Battery Backup Systems</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Buying Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Battery Backup Systems 2026
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Whether you need whole-home backup, off-grid power, or a DIY solar system, these battery 
          backup systems offer reliable power when you need it most.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            10 min read
          </span>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4 text-center">
            <Home className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Best for Home</h3>
            <p className="font-semibold text-blue-600">EcoFlow Delta Pro</p>
            <p className="text-sm text-gray-500">Most powerful home backup</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Best Value</h3>
            <p className="font-semibold text-blue-600">Bluetti AC200MAX</p>
            <p className="text-sm text-gray-500">Most features for the price</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <Shield className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Best Premium</h3>
            <p className="font-semibold text-blue-600">Battle Born 100Ah</p>
            <p className="text-sm text-gray-500">10-year warranty, premium quality</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="space-y-6 mb-12">
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{product.brand}</span>
                    {product.badge && (
                      <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">{product.badge}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-500">|</span>
                    <span className="text-sm font-semibold text-gray-900">${product.price}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-xs text-gray-500">Capacity</div>
                      <div className="font-semibold text-sm">{product.capacity}Wh</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-xs text-gray-500">Output</div>
                      <div className="font-semibold text-sm">{product.output}W</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-xs text-gray-500">Weight</div>
                      <div className="font-semibold text-sm">{product.weight} lbs</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-xs text-gray-500">Best For</div>
                      <div className="font-semibold text-sm truncate">{product.bestFor.split(',')[0]}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-green-600 mb-1">Pros</h4>
                      <ul className="space-y-1">
                        {product.pros.slice(0, 2).map(pro => (
                          <li key={pro} className="flex items-center text-xs text-gray-600">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 mb-1">Cons</h4>
                      <ul className="space-y-1">
                        {product.cons.slice(0, 2).map(con => (
                          <li key={con} className="flex items-center text-xs text-gray-600">
                            <X className="h-3 w-3 text-red-500 mr-1" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end min-w-[100px]">
                  <Link href={`/products/${product.id}`} className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition w-full text-center">
                    View Details
                  </Link>
                  <Link href={product.affiliateUrl || '#'} className="mt-2 text-blue-600 hover:underline text-sm">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Battery Types Explained */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Battery Types Explained</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'LiFePO4 (Lithium Iron Phosphate)',
              icon: Shield,
              description: 'The safest and longest-lasting battery chemistry. 2,000-5,000 charge cycles. Best for home backup.',
              pros: ['Long lifespan', 'Safe chemistry', 'High discharge rate'],
              cons: ['Heavier', 'More expensive']
            },
            {
              name: 'NMC (Lithium Nickel Manganese Cobalt)',
              icon: Zap,
              description: 'High energy density and lightweight. 500-2,000 charge cycles. Common in portable power stations.',
              pros: ['Lightweight', 'High capacity for size', 'Good performance'],
              cons: ['Shorter lifespan', 'More expensive']
            },
            {
              name: 'Lead Acid (AGM/Deep Cycle)',
              icon: Battery,
              description: 'The traditional battery technology. 300-500 charge cycles. Cheaper upfront but heavier.',
              pros: ['Lowest cost', 'Proven technology', 'Recyclable'],
              cons: ['Very heavy', 'Short lifespan', 'Low discharge rate']
            }
          ].map(type => {
            const Icon = type.icon
            return (
              <div key={type.name} className="border rounded p-4">
                <Icon className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                <div className="text-xs">
                  <div className="text-green-600 font-semibold">Pros: {type.pros.join(', ')}</div>
                  <div className="text-red-600 font-semibold">Cons: {type.cons.join(', ')}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Model</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Capacity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Output</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Weight</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">
                    <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.capacity}Wh</td>
                  <td className="px-4 py-3 text-sm">{product.output}W</td>
                  <td className="px-4 py-3 text-sm">{product.weight} lbs</td>
                  <td className="px-4 py-3 text-sm font-semibold">${product.price}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'What size battery backup do I need for my home?',
              a: 'Calculate your daily energy usage in Wh. A typical home uses 20-30kWh per day. For emergency backup, focus on essentials: refrigerator, lights, CPAP, and phone charging.'
            },
            {
              q: 'How long do battery backup systems last?',
              a: 'LiFePO4 batteries last 5-10 years (2,000-5,000 cycles). NMC lasts 3-5 years. Lead acid lasts 2-4 years.'
            },
            {
              q: 'Can battery backups power my whole house?',
              a: 'Yes, with the right system. Home backup systems like the EcoFlow Delta Pro or whole-home battery banks can power your entire home for 1-3 days.'
            }
          ].map((faq, index) => (
            <div key={index} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Power Your Home with a Battery Backup?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to find the perfect backup system for your home.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate My Needs
          </Link>
          <Link href="/products/battery-backups" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Browse All
          </Link>
        </div>
      </div>
    </div>
  )
}