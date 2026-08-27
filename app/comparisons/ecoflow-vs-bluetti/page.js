'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Minus, Star, ThumbsUp, ThumbsDown, Zap } from 'lucide-react'
import ProductCard from '../../../components/ProductCard'
import { getProductById } from '../../../lib/products'

export default function EcoFlowVsBluettiPage() {
  const [selectedCategory, setSelectedCategory] = useState('overall')
  
  const ecoflowDeltaPro = getProductById('ecoflow-delta-pro') || {
    name: 'EcoFlow Delta Pro',
    brand: 'EcoFlow',
    capacity: 3600,
    output: 3600,
    price: 1999,
    weight: 99,
    warranty: '5 years',
    charging: ['Solar', 'AC', 'Car'],
    features: ['Expandable', 'Smart App', 'High Capacity'],
    ports: ['AC', 'USB-C', 'USB-A', 'DC', 'Car'],
    rating: 4.8,
    reviews: 1243
  }

  const bluettiAC200Max = getProductById('bluetti-ac200max') || {
    name: 'Bluetti AC200MAX',
    brand: 'Bluetti',
    capacity: 2048,
    output: 2200,
    price: 1099,
    weight: 62,
    warranty: '2 years',
    charging: ['Solar', 'AC', 'Car'],
    features: ['Expandable', 'LCD Display', 'Wireless Charging'],
    ports: ['AC', 'USB-C', 'USB-A', 'DC', 'Car'],
    rating: 4.7,
    reviews: 892
  }

  const comparisonData = [
    {
      category: 'Specifications',
      items: [
        { label: 'Battery Capacity', ecoflow: '3,600 Wh', bluetti: '2,048 Wh', winner: 'ecoflow' },
        { label: 'AC Output', ecoflow: '3,600 W', bluetti: '2,200 W', winner: 'ecoflow' },
        { label: 'Weight', ecoflow: '99 lbs', bluetti: '62 lbs', winner: 'bluetti' },
        { label: 'Dimensions', ecoflow: '25 x 11.5 x 16.4"', bluetti: '16.5 x 11 x 15.2"', winner: 'bluetti' },
        { label: 'Warranty', ecoflow: '5 years', bluetti: '2 years', winner: 'ecoflow' },
      ]
    },
    {
      category: 'Performance',
      items: [
        { label: 'Max Solar Input', ecoflow: '1,600 W', bluetti: '900 W', winner: 'ecoflow' },
        { label: 'Charge Time (AC)', ecoflow: '1.8 hours', bluetti: '3 hours', winner: 'ecoflow' },
        { label: 'Expandable', ecoflow: 'Yes (up to 25 kWh)', bluetti: 'Yes (up to 8,192 Wh)', winner: 'ecoflow' },
        { label: 'Output Ports', ecoflow: '6 AC + 2 USB-C', bluetti: '4 AC + 2 USB-C', winner: 'ecoflow' },
      ]
    },
    {
      category: 'Value',
      items: [
        { label: 'Price', ecoflow: '$1,999', bluetti: '$1,099', winner: 'bluetti' },
        { label: 'Value per Wh', ecoflow: '$0.56/Wh', bluetti: '$0.54/Wh', winner: 'bluetti' },
        { label: 'Customer Rating', ecoflow: '4.8/5', bluetti: '4.7/5', winner: 'ecoflow' },
        { label: 'Review Count', ecoflow: '1,243', bluetti: '892', winner: 'ecoflow' },
      ]
    }
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/comparisons" className="hover:text-blue-600">Comparisons</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">EcoFlow vs Bluetti</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          EcoFlow Delta Pro vs Bluetti AC200MAX: Which is Better?
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Updated: January 2026</span>
          <span>•</span>
          <span>8 min read</span>
          <span>•</span>
          <span className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            4.8/5 Rating
          </span>
        </div>
      </div>

      {/* Quick Summary Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Verdict</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">Choose EcoFlow Delta Pro if:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>You need maximum capacity and output</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>You want to expand to a whole-home backup system</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>You need faster charging times</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>You want a longer 5-year warranty</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">Choose Bluetti AC200MAX if:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                <span>You want a more portable option</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                <span>You're on a budget (save $900)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                <span>You need wireless charging capabilities</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                <span>You want a lighter unit for transport</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Cards Side by Side */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="ebay-card p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">⚡</div>
            <h2 className="text-xl font-bold text-gray-900">EcoFlow Delta Pro</h2>
            <div className="text-sm text-gray-500">EcoFlow</div>
          </div>
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900">$1,999</div>
            <div className="text-sm text-gray-500">$0.56/Wh</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Capacity</span>
              <span className="font-medium">3,600 Wh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Output</span>
              <span className="font-medium">3,600 W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium">99 lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Warranty</span>
              <span className="font-medium">5 years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating</span>
              <span className="font-medium">4.8/5 (1,243 reviews)</span>
            </div>
          </div>
          <a href="#" className="ebay-btn-primary block text-center mt-4">
            Buy on Amazon
          </a>
        </div>

        <div className="ebay-card p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🔋</div>
            <h2 className="text-xl font-bold text-gray-900">Bluetti AC200MAX</h2>
            <div className="text-sm text-gray-500">Bluetti</div>
          </div>
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900">$1,099</div>
            <div className="text-sm text-gray-500">$0.54/Wh</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Capacity</span>
              <span className="font-medium">2,048 Wh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Output</span>
              <span className="font-medium">2,200 W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium">62 lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Warranty</span>
              <span className="font-medium">2 years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating</span>
              <span className="font-medium">4.7/5 (892 reviews)</span>
            </div>
          </div>
          <a href="#" className="ebay-btn-primary block text-center mt-4">
            Buy on Amazon
          </a>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="ebay-card overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Detailed Comparison</h2>
        </div>
        
        {/* Category Tabs */}
        <div className="flex border-b">
          {['overall', 'Specifications', 'Performance', 'Value'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                selectedCategory === category.toLowerCase()
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Specification</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">EcoFlow Delta Pro</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bluetti AC200MAX</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Winner</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData
                .filter(data => selectedCategory === 'overall' || data.category.toLowerCase() === selectedCategory)
                .flatMap(data => data.items)
                .map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.label}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.ecoflow}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.bluetti}</td>
                    <td className="px-6 py-4">
                      {item.winner === 'ecoflow' ? (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          EcoFlow <Check className="ml-1 h-3 w-3" />
                        </span>
                      ) : item.winner === 'bluetti' ? (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          Bluetti <Check className="ml-1 h-3 w-3" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                          Tie <Minus className="ml-1 h-3 w-3" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            <ThumbsUp className="h-5 w-5 text-green-500 inline mr-2" />
            EcoFlow Delta Pro Pros & Cons
          </h2>
          
          <h3 className="font-semibold text-green-600 mb-2">Pros</h3>
          <ul className="space-y-2 mb-4">
            {[
              'Huge 3.6kWh capacity that can expand to 25kWh',
              'Powerful 3600W output can run heavy appliances',
              'Fast charging from 0 to 80% in just 1.8 hours',
              '5-year warranty for peace of mind',
              'Smart app controls and monitoring',
              'Multiple expansion options for whole-home backup'
            ].map(pro => (
              <li key={pro} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-red-600 mb-2">Cons</h3>
          <ul className="space-y-2">
            {[
              'Heavy at 99 lbs - not very portable',
              'Expensive upfront investment',
              'Requires extra batteries for expansion (costs more)'
            ].map(con => (
              <li key={con} className="flex items-start text-sm">
                <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            <ThumbsUp className="h-5 w-5 text-green-500 inline mr-2" />
            Bluetti AC200MAX Pros & Cons
          </h2>
          
          <h3 className="font-semibold text-green-600 mb-2">Pros</h3>
          <ul className="space-y-2 mb-4">
            {[
              'More affordable at $1,099',
              'Lighter at 62 lbs - easier to transport',
              'Wireless charging for convenience',
              'Includes LCD display for monitoring',
              'Expandable with B230 batteries'
            ].map(pro => (
              <li key={pro} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-red-600 mb-2">Cons</h3>
          <ul className="space-y-2">
            {[
              'Lower capacity at 2,048Wh',
              'Only 2,200W output',
              '2-year warranty is shorter',
              'No smart app integration'
            ].map(con => (
              <li key={con} className="flex items-start text-sm">
                <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Use Case Scenarios */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Which Should You Buy?</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
            <div>
              <h3 className="font-semibold text-gray-900">For Home Backup</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Choose EcoFlow Delta Pro.</strong> With 3.6kWh base capacity and expandability to 25kWh, it can power essential appliances during a multi-day outage. The 3600W output can handle your refrigerator, sump pump, and important medical equipment simultaneously.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
            <div>
              <h3 className="font-semibold text-gray-900">For Camping & Van Life</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Choose Bluetti AC200MAX.</strong> At 62 lbs, it's significantly easier to carry. The 2,048Wh capacity is perfect for running a CPAP machine, charging laptops, powering lights, and small appliances during a weekend trip.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
            <div>
              <h3 className="font-semibold text-gray-900">For Budget Buyers</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Choose Bluetti AC200MAX.</strong> At $1,099, you're saving $900 compared to the EcoFlow Delta Pro. While the capacity is lower, it still provides enough power for most emergency backup scenarios.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
            <div>
              <h3 className="font-semibold text-gray-900">For Future Expansion</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Choose EcoFlow Delta Pro.</strong> The modular design allows you to start with one unit and add more batteries and smart generators as your needs grow. This makes it a more future-proof investment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-lg p-6 text-center mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Not sure which one fits your needs?</h2>
        <p className="text-gray-600 mb-4">Calculate your exact power requirements and get personalized recommendations.</p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Use Our Sizing Calculator
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can the EcoFlow Delta Pro run a refrigerator?</h3>
            <p className="text-sm text-gray-600">
              Yes. The Delta Pro's 3,600W output can easily run a standard refrigerator (typically 150-800W startup). With 3.6kWh capacity, it can run a refrigerator for approximately 12-24 hours depending on the model and usage.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can the Bluetti AC200MAX power a CPAP machine?</h3>
            <p className="text-sm text-gray-600">
              Absolutely. A CPAP machine typically draws 30-60W. With 2,048Wh capacity, the AC200MAX can run a CPAP for approximately 34-68 hours, making it excellent for camping trips or emergency backup.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How long does it take to charge each unit?</h3>
            <p className="text-sm text-gray-600">
              The EcoFlow Delta Pro charges from 0-80% in approximately 1.8 hours using a standard AC outlet. The Bluetti AC200MAX takes about 3 hours for a full charge with AC input. Both support solar charging, which will take longer depending on panel wattage and sunlight.
            </p>
          </div>
        </div>
      </div>

      {/* Related Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/comparisons/jackery-vs-ecoflow" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Jackery vs EcoFlow</h3>
          <p className="text-sm text-gray-600">Which brand offers better portability?</p>
        </Link>
        <Link href="/comparisons/bluetti-vs-jackery" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Bluetti vs Jackery</h3>
          <p className="text-sm text-gray-600">Comparing reliability and value</p>
        </Link>
        <Link href="/comparisons/renogy-vs-goalzero" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Renogy vs Goal Zero</h3>
          <p className="text-sm text-gray-600">Complete solar system comparison</p>
        </Link>
      </div>
    </div>
  )
}