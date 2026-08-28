'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Star, Check, X, Zap, Battery, Weight, DollarSign, ArrowRight, Award, TrendingUp, Info, Camp, Caravan, Home } from 'lucide-react'

export default function BestPortablePowerStations() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'best-overall', label: 'Best Overall' },
    { id: 'best-value', label: 'Best Value' },
    { id: 'lightweight', label: 'Lightweight' },
    { id: 'high-capacity', label: 'High Capacity' }
  ]

  const products = [
    {
      id: 'ecoflow-river-2-pro',
      name: 'EcoFlow River 2 Pro',
      brand: 'EcoFlow',
      category: 'best-overall',
      rating: 4.8,
      reviews: 654,
      price: 499,
      capacity: 768,
      output: 800,
      weight: 17.2,
      badge: 'Best Overall',
      pros: ['Fast charging (0-80% in 1hr)', 'High output for size', '5-year warranty', 'Expandable'],
      cons: ['Higher price than River 2', 'Heavier than other portables'],
      description: 'The upgraded version of the popular River 2 offers more power while staying portable.',
      bestFor: 'Camping, van life, small appliance backup'
    },
    {
      id: 'jackery-explorer-500',
      name: 'Jackery Explorer 500',
      brand: 'Jackery',
      category: 'best-value',
      rating: 4.7,
      reviews: 1892,
      price: 499,
      capacity: 518,
      output: 500,
      weight: 13.3,
      badge: 'Best Value',
      pros: ['Lightweight design', 'Reliable performance', 'Multiple charging options', 'Trusted brand'],
      cons: ['Limited output for large appliances', '2-year warranty'],
      description: 'One of the best-selling portable power stations perfect for camping and road trips.',
      bestFor: 'Camping, road trips, emergency backup'
    },
    {
      id: 'ecoflow-river-2',
      name: 'EcoFlow River 2',
      brand: 'EcoFlow',
      category: 'lightweight',
      rating: 4.6,
      reviews: 456,
      price: 199,
      capacity: 256,
      output: 300,
      weight: 7.7,
      badge: 'Lightweight Champion',
      pros: ['Very lightweight (7.7 lbs)', 'Fast charging', '5-year warranty', 'Affordable price'],
      cons: ['Limited capacity', 'Not for large appliances'],
      description: 'The perfect entry-level power station. Small enough for backpacking.',
      bestFor: 'Light camping, phone charging, small electronics'
    },
    {
      id: 'bluetti-eb3a',
      name: 'Bluetti EB3A',
      brand: 'Bluetti',
      category: 'best-value',
      rating: 4.5,
      reviews: 345,
      price: 249,
      capacity: 268,
      output: 600,
      weight: 10.1,
      badge: 'High Output',
      pros: ['600W high output for size', 'Fast charging', 'LCD display', 'Multiple USB ports'],
      cons: ['Limited capacity', 'Not for home backup'],
      description: 'Compact power station that punches above its weight with 600W output.',
      bestFor: 'Camping, tailgating, small electronics'
    },
    {
      id: 'jackery-explorer-300',
      name: 'Jackery Explorer 300',
      brand: 'Jackery',
      category: 'lightweight',
      rating: 4.7,
      reviews: 789,
      price: 299,
      capacity: 293,
      output: 300,
      weight: 7.1,
      badge: 'Top Rated',
      pros: ['Lightweight', 'Reliable brand', 'Multiple ports', 'Easy to use'],
      cons: ['Limited output', '2-year warranty', 'No fast charging'],
      description: 'A compact, reliable power station perfect for short camping trips.',
      bestFor: 'Short camping trips, small electronics, outdoor activities'
    },
    {
      id: 'goal-zero-yeti-500x',
      name: 'Goal Zero Yeti 500X',
      brand: 'Goal Zero',
      category: 'high-capacity',
      rating: 4.4,
      reviews: 234,
      price: 399,
      capacity: 505,
      output: 300,
      weight: 11.5,
      badge: 'Premium Choice',
      pros: ['Compact and portable', 'Rugged design', 'User-friendly interface', 'Solar compatible'],
      cons: ['Low output for size', '2-year warranty', 'Pricier than competitors'],
      description: 'A compact, rugged power station built for outdoor adventures.',
      bestFor: 'Camping, fishing, outdoor activities'
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
        <span className="text-gray-900">Best Portable Power Stations</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Buying Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Portable Power Stations 2026
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Whether you're camping, road-tripping, or preparing for emergencies, portable power stations 
          provide reliable power wherever you go. Here are our top picks for every use case.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            12 min read
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
            <p className="font-semibold text-blue-600">EcoFlow River 2 Pro</p>
            <p className="text-sm text-gray-500">Best balance of power and portability</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Best Value</h3>
            <p className="font-semibold text-blue-600">Jackery Explorer 500</p>
            <p className="text-sm text-gray-500">Most features for the price</p>
          </div>
          <div className="bg-white rounded p-4 text-center">
            <Weight className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-bold text-gray-900">Lightest</h3>
            <p className="font-semibold text-blue-600">EcoFlow River 2</p>
            <p className="text-sm text-gray-500">Under 8 lbs for maximum portability</p>
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
                    {index === 0 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">#1 Pick</span>
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

      {/* Buying Guide */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Choose a Portable Power Station</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Battery,
              title: 'Capacity (Wh)',
              description: 'Higher capacity = longer runtime. For weekend camping, 200-500Wh is enough. For longer trips, look for 500Wh+.'
            },
            {
              icon: Zap,
              title: 'Output (W)',
              description: 'Make sure it can power your devices. Check surge power for motor-driven appliances like mini-fridges.'
            },
            {
              icon: Weight,
              title: 'Portability',
              description: 'Under 10 lbs for backpacking, 10-20 lbs for camping, 20+ lbs for car camping or home backup.'
            },
            {
              icon: DollarSign,
              title: 'Value',
              description: 'Consider price per Wh. The sweet spot is usually $0.50-$1.00 per Wh for quality units.'
            }
          ].map(tip => {
            const Icon = tip.icon
            return (
              <div key={tip.title} className="bg-gray-50 rounded p-4">
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{tip.description}</p>
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
              q: 'What can a portable power station run?',
              a: 'Small to medium devices: phones, laptops, CPAP machines, mini-fridges, LED lights, TVs, and fans. Check the wattage of your devices against the station\'s output.'
            },
            {
              q: 'How long do portable power stations last?',
              a: 'Quality units last 5-10 years with proper care. Battery lifespan is measured in charge cycles (2,000-3,500 cycles for LiFePO4).'
            },
            {
              q: 'Can I fly with a portable power station?',
              a: 'Usually not. Most airlines restrict batteries over 100Wh. For camping, check airline policies first.'
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
          Ready to Find Your Perfect Portable Power Station?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our sizing calculator to get instant personalized recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate My Needs
          </Link>
          <Link href="/products/portable-power-stations" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Browse All
          </Link>
        </div>
      </div>
    </div>
  )
}