'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Star, Battery, Zap, Weight, Check, X, TrendingUp, Calendar, Clock } from 'lucide-react'
import ProductCard from '../../../components/ProductCard'
import { getProductsByCategory } from '../../../lib/products'

export default function BestSolarGenerators2026() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [compareMode, setCompareMode] = useState(false)
  
  const products = getProductsByCategory('solarGenerators')

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'budget', label: 'Under $500' },
    { id: 'mid', label: '$500-$1500' },
    { id: 'premium', label: '$1500+' }
  ]

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'budget') return product.price < 500
    if (selectedCategory === 'mid') return product.price >= 500 && product.price <= 1500
    if (selectedCategory === 'premium') return product.price > 1500
    return true
  })

  const comparisonTable = [
    { feature: 'Battery Capacity', best: 'EcoFlow Delta Pro (3,600Wh)', value: '3,600Wh' },
    { feature: 'Power Output', best: 'EcoFlow Delta Pro (3,600W)', value: '3,600W' },
    { feature: 'Best Value', best: 'Bluetti AC200MAX ($1,099)', value: '$1,099' },
    { feature: 'Most Portable', best: 'Jackery Explorer 2000 (43.5 lbs)', value: '43.5 lbs' },
    { feature: 'Best Warranty', best: 'EcoFlow Delta Pro (5 years)', value: '5 years' },
    { feature: 'Fastest Charging', best: 'EcoFlow Delta Pro (1.8 hrs)', value: '1.8 hours' }
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Best Solar Generators 2026</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Product Reviews</span>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">2026 Guide</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Best Solar Generators 2026: Complete Buying Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Sarah Johnson</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 15, 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            12 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Solar Generators?</h2>
        <p className="text-gray-600 mb-4">
          Solar generators have become essential tools for emergency preparedness, camping, and off-grid living. 
          With the market expanding rapidly, choosing the right one can be overwhelming. We've tested 15 of the 
          most popular models to bring you this comprehensive guide.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            Market Growth
          </h3>
          <p className="text-sm text-gray-600">
            The portable power station market is expected to reach $5.3 billion by 2028, growing at 8.5% CAGR. 
            This growth is driven by increasing power outages, extreme weather events, and the rise of van life culture.
          </p>
        </div>

        <h3 className="font-semibold text-gray-900 mb-3">Solar generators are perfect for:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            'Emergency backup during power outages',
            'Camping and outdoor activities',
            'Van life and RV living',
            'Remote work locations',
            'Off-grid living',
            'Medical device backup (CPAP, oxygen)'
          ].map(item => (
            <div key={item} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Picks */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Top Picks for 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {index === 0 && (
                <span className="absolute -top-3 -left-3 z-10 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  #1 Best Overall
                </span>
              )}
              {index === 1 && (
                <span className="absolute -top-3 -left-3 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  #2 Best Value
                </span>
              )}
              {index === 2 && (
                <span className="absolute -top-3 -left-3 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  #3 Most Portable
                </span>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="ebay-card overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Quick Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Best Option</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, index) => (
                <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.best}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Reviews */}
      <div className="space-y-8 mb-12">
        {/* EcoFlow Delta Pro Review */}
        <div className="ebay-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">1. EcoFlow Delta Pro - Best Overall</h2>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-semibold">4.8/5</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-4 mb-4">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm text-gray-600">
              <strong>Key Specs:</strong> 3,600Wh capacity | 3,600W output | 5-year warranty | $1,999
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">Why We Love It</h3>
          <p className="text-gray-600 mb-4">
            The Delta Pro is the most powerful portable power station we've ever tested. With 3,600Wh base capacity 
            and expandability up to 25kWh, it can power an entire home during a multi-day outage. The 3,600W output 
            handles heavy appliances like refrigerators, sump pumps, and medical equipment with ease.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold text-green-800 mb-2">Pros</h4>
              <ul className="space-y-2">
                {['Huge 3.6kWh capacity', 'Powerful 3600W output', 'Fast charging (0-80% in 1.8hrs)', '5-year warranty', 'Expandable to 25kWh', 'Smart app controls'].map(pro => (
                  <li key={pro} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h4 className="font-semibold text-red-800 mb-2">Cons</h4>
              <ul className="space-y-2">
                {['Very heavy (99 lbs)', 'Expensive upfront', 'Requires extra battery for expansion'].map(con => (
                  <li key={con} className="flex items-start text-sm">
                    <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
            <strong>Best For:</strong> Home backup, emergency preparedness, off-grid living
          </div>
        </div>

        {/* Bluetti AC200MAX Review */}
        <div className="ebay-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">2. Bluetti AC200MAX - Best Value</h2>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-semibold">4.7/5</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-4 mb-4">
            <div className="text-3xl mb-2">🔋</div>
            <p className="text-sm text-gray-600">
              <strong>Key Specs:</strong> 2,048Wh capacity | 2,200W output | 2-year warranty | $1,099
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">Why We Love It</h3>
          <p className="text-gray-600 mb-4">
            The AC200MAX offers incredible value at $1,099. With 2,048Wh capacity and 2,200W output, it handles 
            most home backup needs at 45% less cost than the Delta Pro. The 62 lbs weight makes it more portable, 
            and the built-in wireless charging is a nice touch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold text-green-800 mb-2">Pros</h4>
              <ul className="space-y-2">
                {['Excellent value', 'Lighter at 62 lbs', 'Wireless charging', 'LCD display', 'Expandable with B230'].map(pro => (
                  <li key={pro} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h4 className="font-semibold text-red-800 mb-2">Cons</h4>
              <ul className="space-y-2">
                {['Lower capacity', 'Shorter warranty (2 years)', 'No smart app'].map(con => (
                  <li key={con} className="flex items-start text-sm">
                    <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
            <strong>Best For:</strong> Budget-conscious buyers, camping, van life, emergency backup
          </div>
        </div>

        {/* Jackery Explorer 2000 Review */}
        <div className="ebay-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">3. Jackery Explorer 2000 - Most Portable</h2>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-semibold">4.9/5</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-4 mb-4">
            <div className="text-3xl mb-2">🎒</div>
            <p className="text-sm text-gray-600">
              <strong>Key Specs:</strong> 2,160Wh capacity | 2,200W output | 3-year warranty | $1,699
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">Why We Love It</h3>
          <p className="text-gray-600 mb-4">
            The Explorer 2000 is the most trusted brand in the industry, known for reliability and ease of use. 
            Despite the high capacity, it weighs only 43.5 lbs and features a foldable handle, making it the best 
            option for those who need to move their power station frequently.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold text-green-800 mb-2">Pros</h4>
              <ul className="space-y-2">
                {['Lightweight for capacity', 'Excellent customer service', '3-year warranty', 'Proven reliability', 'Easy to use'].map(pro => (
                  <li key={pro} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <h4 className="font-semibold text-red-800 mb-2">Cons</h4>
              <ul className="space-y-2">
                {['Expensive per Wh', 'No expansion options', 'Fewer ports'].map(con => (
                  <li key={con} className="flex items-start text-sm">
                    <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
            <strong>Best For:</strong> Camping, RV travel, portable backup power
          </div>
        </div>
      </div>

      {/* Interactive Calculator CTA */}
      <div className="ebay-card p-6 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Find Your Perfect Solar Generator</h2>
        <p className="text-gray-600 mb-4">
          Not sure which generator is right for you? Use our calculator to determine your exact power needs.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Use Solar Sizing Calculator
          </Link>
          <Link href="/calculators/battery-runtime" className="ebay-btn-secondary">
            Check Battery Runtime
          </Link>
        </div>
      </div>

      {/* Buying Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Choose the Right Solar Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Battery className="h-5 w-5 text-blue-600 mr-2" />
              Capacity (Wh)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Calculate your daily energy needs. Add 20% buffer for safety. Use our calculator for precise sizing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Zap className="h-5 w-5 text-yellow-600 mr-2" />
              Power Output (W)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Check if it can power your most demanding device. Look for surge capacity for appliances with motors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Weight className="h-5 w-5 text-green-600 mr-2" />
              Weight
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Consider where you'll be using it. Under 10 lbs for backpacking, under 50 lbs for van life, 
              over 50 lbs for home backup.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Clock className="h-5 w-5 text-purple-600 mr-2" />
              Charging Speed
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Look for fast charging capabilities. Some units charge 0-80% in under 2 hours.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How long do solar generators last?</h3>
            <p className="text-sm text-gray-600">
              Quality solar generators last 5-10 years with proper maintenance. Lithium batteries typically 
              have 2,000-3,500 charge cycles. The EcoFlow Delta Pro's 5-year warranty is the longest in the industry.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I run my refrigerator on a solar generator?</h3>
            <p className="text-sm text-gray-600">
              Yes! Most 2,000Wh+ generators can run a refrigerator for 12-24 hours. A typical refrigerator 
              uses 150W running power but needs 800-1200W surge to start. Use our <Link href="/calculators/battery-runtime" className="text-blue-600 hover:underline">runtime calculator</Link> for exact estimates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can solar generators charge while in use?</h3>
            <p className="text-sm text-gray-600">
              Yes! Most modern units can pass-through charge, allowing you to use the generator while it's 
              charging from solar panels or AC power.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do solar generators work at night?</h3>
            <p className="text-sm text-gray-600">
              Absolutely. They store energy in batteries during the day and discharge at night. The capacity 
              determines how long they can provide power without sunlight.
            </p>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/blog/blackout-emergency-power-plan" className="ebay-card p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            How to Prepare for a Blackout
          </h3>
          <p className="text-sm text-gray-600">Complete emergency power plan for your home</p>
        </Link>
        <Link href="/blog/ecoflow-vs-bluetti-comparison" className="ebay-card p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            EcoFlow vs Bluetti: Full Comparison
          </h3>
          <p className="text-sm text-gray-600">Which brand offers better value?</p>
        </Link>
      </div>

      {/* Newsletter */}
      <div className="ebay-card p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Get More Expert Guides</h2>
        <p className="text-gray-600 mb-4">Subscribe to get the latest reviews and exclusive deals.</p>
        <form className="max-w-md mx-auto flex space-x-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="ebay-btn-primary whitespace-nowrap">Subscribe</button>
        </form>
      </div>
    </div>
  )
}