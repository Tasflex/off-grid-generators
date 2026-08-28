'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Star, Check, X, Zap, Battery, Weight, DollarSign, ArrowRight, Shield, Award, TrendingUp, Info, AlertTriangle } from 'lucide-react'

export default function BestSolarGenerators2026() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'best-overall', label: 'Best Overall' },
    { id: 'best-value', label: 'Best Value' },
    { id: 'most-portable', label: 'Most Portable' },
    { id: 'best-capacity', label: 'Best Capacity' }
  ]

  const products = [
    {
      id: 'ecoflow-delta-pro',
      name: 'EcoFlow Delta Pro',
      brand: 'EcoFlow',
      category: 'best-overall',
      rating: 4.8,
      reviews: 1243,
      price: 1999,
      capacity: 3600,
      output: 3600,
      weight: 99,
      badge: 'Best Overall',
      pros: ['3,600Wh capacity', 'Powerful 3600W output', 'Fast charging', '5-year warranty', 'Expandable to 25kWh'],
      cons: ['Very heavy', 'Expensive', 'Requires extra battery for expansion'],
      description: 'The most powerful portable power station we\'ve ever tested. Can power an entire home during a multi-day outage.',
      bestFor: 'Home backup, emergency preparedness, off-grid living'
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
      pros: ['Excellent value', 'Lighter at 62 lbs', 'Wireless charging', 'LCD display', 'Expandable'],
      cons: ['Lower capacity', 'Shorter warranty (2 years)', 'No smart app'],
      description: 'Incredible value at $1,099. Handles most home backup needs at 45% less cost than the Delta Pro.',
      bestFor: 'Budget-conscious buyers, camping, van life, emergency backup'
    },
    {
      id: 'jackery-explorer-2000',
      name: 'Jackery Explorer 2000',
      brand: 'Jackery',
      category: 'most-portable',
      rating: 4.9,
      reviews: 1567,
      price: 1699,
      capacity: 2160,
      output: 2200,
      weight: 43.5,
      badge: 'Most Portable',
      pros: ['Lightweight for capacity', 'Excellent customer service', '3-year warranty', 'Proven reliability'],
      cons: ['Expensive per Wh', 'No expansion options', 'Fewer ports'],
      description: 'The most trusted brand in the industry, known for reliability and ease of use despite the high capacity.',
      bestFor: 'Camping, RV travel, portable backup power'
    },
    {
      id: 'ecoflow-delta-2',
      name: 'EcoFlow Delta 2',
      brand: 'EcoFlow',
      category: 'best-capacity',
      rating: 4.8,
      reviews: 756,
      price: 899,
      capacity: 1024,
      output: 1800,
      weight: 27,
      badge: 'Compact Power',
      pros: ['Compact size', 'High output', 'Expandable', '5-year warranty'],
      cons: ['Lower capacity than Delta Pro', 'Fans can be loud'],
      description: 'Packs 1,024Wh capacity and 1,800W output into a compact unit. Perfect for home backup without taking up too much space.',
      bestFor: 'Home backup, van life, CPAP backup'
    },
    {
      id: 'jackery-explorer-1000',
      name: 'Jackery Explorer 1000',
      brand: 'Jackery',
      category: 'best-value',
      rating: 4.8,
      reviews: 2345,
      price: 799,
      capacity: 1002,
      output: 1000,
      weight: 22,
      badge: 'Best Seller',
      pros: ['Lightweight for capacity', 'Best-selling model', 'Reliable performance', 'Easy to use'],
      cons: ['No expansion option', '2-year warranty'],
      description: 'One of the most popular portable power stations. Perfect for camping, van life, and emergency backup.',
      bestFor: 'Camping, van life, emergency backup'
    },
    {
      id: 'goal-zero-yeti-1500x',
      name: 'Goal Zero Yeti 1500X',
      brand: 'Goal Zero',
      category: 'best-overall',
      rating: 4.5,
      reviews: 456,
      price: 1799,
      capacity: 1516,
      output: 2000,
      weight: 45.6,
      badge: 'Premium Choice',
      pros: ['Rugged and durable', 'High output for its size', 'Expandable', 'User-friendly display'],
      cons: ['Expensive', 'Heavy at 45.6 lbs', 'Shorter warranty'],
      description: 'A rugged, high-output power station built for off-grid adventures and home backup.',
      bestFor: 'Off-grid living, camping, emergency backup'
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
        <span className="text-gray-900">Best Solar Generators 2026</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Buying Guide</span>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">2026</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Solar Generators 2026: Complete Buying Guide
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          We've tested and reviewed the top solar generators on the market to help you find the perfect 
          solution for your power needs, whether you're camping, preparing for emergencies, or living off-grid.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            15 min read
          </span>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Best Overall</h3>
            <p className="font-semibold text-blue-600">EcoFlow Delta Pro</p>
            <p className="text-sm text-gray-500">The most powerful and versatile option</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Best Value</h3>
            <p className="font-semibold text-blue-600">Bluetti AC200MAX</p>
            <p className="text-sm text-gray-500">Most features for the price</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <Weight className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Most Portable</h3>
            <p className="font-semibold text-blue-600">Jackery Explorer 2000</p>
            <p className="text-sm text-gray-500">High capacity in a lightweight design</p>
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
      <div className="space-y-8 mb-12">
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition">
            <div className={`p-6 ${index === 0 ? 'bg-gradient-to-r from-blue-50 to-yellow-50' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{product.brand}</span>
                    {product.badge && (
                      <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">{product.badge}</span>
                    )}
                    {index === 0 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">#1 Pick</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  
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
                        {product.pros.slice(0, 3).map(pro => (
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
                        {product.cons.slice(0, 3).map(con => (
                          <li key={con} className="flex items-center text-xs text-gray-600">
                            <X className="h-3 w-3 text-red-500 mr-1" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end min-w-[120px]">
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

      {/* Buying Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Choose the Right Solar Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Calculate Your Power Needs',
              description: 'Add up the wattage of all devices you want to power. Multiply by hours of use. Always add 20-30% buffer.'
            },
            {
              title: 'Check Surge Requirements',
              description: 'Some appliances need 3-4x their running power to start. Make sure your generator can handle the surge.'
            },
            {
              title: 'Consider Portability',
              description: 'If you need to move it often, look for lighter units with handles. For home backup, weight is less of a concern.'
            },
            {
              title: 'Think About Charging',
              description: 'Solar charging is free but slow. AC charging is fast. Car charging is convenient for road trips.'
            }
          ].map(tip => (
            <div key={tip.title} className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'How long do solar generators last?',
              a: 'Quality solar generators last 5-10 years with proper maintenance. Lithium batteries typically have 2,000-3,500 charge cycles, which is about 5-10 years of daily use.'
            },
            {
              q: 'Can a solar generator run a refrigerator?',
              a: 'Yes! Most mid-range solar generators (500Wh+) can run a refrigerator for 8-24 hours. Make sure to check the surge capacity.'
            },
            {
              q: 'Do solar generators work in winter?',
              a: 'Yes, but efficiency drops in cold weather. Keep batteries above freezing for best performance. Solar panel output also decreases in winter.'
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
          Ready to Find Your Perfect Solar Generator?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our sizing calculator to get instant personalized recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate My Needs
          </Link>
          <Link href="/products/solar-generators" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  )
}