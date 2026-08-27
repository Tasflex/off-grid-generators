'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, X, AlertTriangle, Info, Calculator, Star } from 'lucide-react'

export default function HowToChooseSolarGenerator() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'capacity', label: 'Battery Capacity' },
    { id: 'output', label: 'Power Output' },
    { id: 'ports', label: 'Ports & Connectivity' },
    { id: 'weight', label: 'Portability' },
    { id: 'charging', label: 'Charging Options' },
    { id: 'brands', label: 'Top Brands' },
    { id: 'budget', label: 'Budget Considerations' },
    { id: 'faq', label: 'FAQ' },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How to Choose a Solar Generator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          How to Choose a Solar Generator: Complete Guide 2026
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Updated: January 2026</span>
          <span>•</span>
          <span>12 min read</span>
          <span>•</span>
          <span className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            4.9/5 Rating
          </span>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-left text-sm text-gray-600 hover:text-blue-600 py-1"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Overview */}
        <div id="overview" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            A solar generator is a portable power station that stores energy from solar panels or 
            wall outlets and provides electricity through multiple outlets. They're essential for:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
            <li>Emergency backup during power outages</li>
            <li>Camping and outdoor activities</li>
            <li>Van life and RV living</li>
            <li>Remote work locations</li>
            <li>Off-grid living</li>
          </ul>
          <p className="text-gray-600">
            Choosing the right solar generator depends on understanding your power needs, 
            which is where our <Link href="/calculators/solar-sizing" className="text-blue-600 hover:underline">sizing calculator</Link> comes in handy.
          </p>
        </div>

        {/* Battery Capacity */}
        <div id="capacity" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Battery Capacity (Wh)</h2>
          <p className="text-gray-600 mb-4">
            Battery capacity is measured in Watt-hours (Wh) and determines how long your 
            generator can run devices. Here's a quick guide:
          </p>
          
          <div className="overflow-x-auto mb-4">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Capacity Range</th>
                  <th>Best For</th>
                  <th>Example Devices</th>
                  <th>Runtime</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200-500 Wh</td>
                  <td>Light camping</td>
                  <td>Phone, laptop, lights</td>
                  <td>4-8 hours</td>
                </tr>
                <tr>
                  <td>500-1000 Wh</td>
                  <td>Weekend trips</td>
                  <td>CPAP, small fridge</td>
                  <td>8-12 hours</td>
                </tr>
                <tr>
                  <td>1000-2000 Wh</td>
                  <td>RV & van life</td>
                  <td>Fridge, TV, tools</td>
                  <td>12-24 hours</td>
                </tr>
                <tr>
                  <td>2000-5000 Wh</td>
                  <td>Home backup</td>
                  <td>Multiple appliances</td>
                  <td>1-3 days</td>
                </tr>
                <tr>
                  <td>5000+ Wh</td>
                  <td>Off-grid living</td>
                  <td>Whole home essentials</td>
                  <td>3+ days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
              <div>
                <strong>Pro Tip:</strong> Always choose a generator with at least 20% more 
                capacity than you think you need. Battery capacity decreases over time and 
                in cold temperatures.
              </div>
            </div>
          </div>
        </div>

        {/* Power Output */}
        <div id="output" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Power Output (W)</h2>
          <p className="text-gray-600 mb-4">
            Power output is measured in Watts (W) and determines what devices you can run 
            simultaneously. Some devices require high surge power to start:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Standard Power</h3>
              <ul className="space-y-2 text-sm">
                <li>Phone charger: 10W</li>
                <li>LED TV: 100W</li>
                <li>Laptop: 65W</li>
                <li>Ceiling fan: 75W</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Surge Power (Startup)</h3>
              <ul className="space-y-2 text-sm">
                <li>Refrigerator: 800-1200W startup</li>
                <li>Microwave: 1000-1500W startup</li>
                <li>AC unit: 1500-2000W startup</li>
                <li>Well pump: 1500-2500W startup</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ports */}
        <div id="ports" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ports & Connectivity</h2>
          <p className="text-gray-600 mb-4">
            Modern solar generators offer various ports for different devices:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Essential Ports</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span><strong>AC Outlets:</strong> For standard appliances (120V/240V)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span><strong>USB-A & USB-C:</strong> For phones, tablets, laptops</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span><strong>DC Ports:</strong> For car accessories and DC-powered devices</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Nice to Have</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span><strong>Wireless Charging:</strong> For phones and earbuds</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span><strong>USB-C PD:</strong> Fast charging for laptops</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span><strong>App Connectivity:</strong> Monitor and control via smartphone</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weight & Portability */}
        <div id="weight" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Weight & Portability</h2>
          <p className="text-gray-600 mb-4">
            Consider where you'll be using your solar generator:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎒</div>
              <h3 className="font-semibold mb-2">Under 10 lbs</h3>
              <p className="text-sm text-gray-600">
                Great for backpacking and short trips. Typically 200-500Wh capacity.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🚗</div>
              <h3 className="font-semibold mb-2">10-50 lbs</h3>
              <p className="text-sm text-gray-600">
                Ideal for car camping and van life. Typically 500-2000Wh capacity.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-semibold mb-2">50+ lbs</h3>
              <p className="text-sm text-gray-600">
                Best for home backup and stationary use. 2000Wh+ capacity.
              </p>
            </div>
          </div>
        </div>

        {/* Charging Options */}
        <div id="charging" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Charging Options</h2>
          <p className="text-gray-600 mb-4">
            How quickly you can recharge your generator is crucial:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Solar Charging</h3>
                <p className="text-sm text-gray-600">
                  Most generators support solar panels. Charging time varies from 4-12 hours 
                  depending on panel wattage and sunlight conditions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">AC Wall Charging</h3>
                <p className="text-sm text-gray-600">
                  Fastest method - typically 1-3 hours for a full charge. Look for units 
                  with fast charging capabilities.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">Car Charging</h3>
                <p className="text-sm text-gray-600">
                  Slow but convenient for road trips. Most units include a car adapter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Brands */}
        <div id="brands" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Brands Compared</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'EcoFlow',
                rating: 4.8,
                best: 'High Capacity & Fast Charging',
                price: '$$$',
                description: 'Premium brand with innovative features and expandable systems.'
              },
              {
                name: 'Bluetti',
                rating: 4.7,
                best: 'Value & Portability',
                price: '$$',
                description: 'Excellent balance of price and performance with expandable options.'
              },
              {
                name: 'Jackery',
                rating: 4.9,
                best: 'Reliability & Ease of Use',
                price: '$$$',
                description: 'Most trusted brand with excellent customer service.'
              },
              {
                name: 'Renogy',
                rating: 4.5,
                best: 'Solar Panel Integration',
                price: '$$',
                description: 'Great for solar panel bundles and DIY installations.'
              },
              {
                name: 'Goal Zero',
                rating: 4.4,
                best: 'Rugged & Outdoor Focused',
                price: '$$$',
                description: 'Durable products designed for extreme conditions.'
              },
              {
                name: 'Anker',
                rating: 4.6,
                best: 'Compact & Portable',
                price: '$',
                description: 'Budget-friendly options with solid build quality.'
              }
            ].map(brand => (
              <div key={brand.name} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{brand.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{brand.rating}</span>
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-medium mb-2">{brand.best}</div>
                <div className="text-sm text-gray-600 mb-2">Price: {brand.price}</div>
                <p className="text-sm text-gray-600">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div id="budget" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Considerations</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Under $500</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>500Wh or less capacity</li>
                <li>Best for light camping and phone charging</li>
                <li>Popular: Anker PowerHouse, Jackery 300</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">$500 - $1,000</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>500-1000Wh capacity</li>
                <li>Best for weekend trips and CPAP machines</li>
                <li>Popular: Bluetti AC200MAX, EcoFlow Delta 2</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">$1,000 - $2,000</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>1000-2000Wh capacity</li>
                <li>Best for home backup and full van setups</li>
                <li>Popular: EcoFlow Delta Pro, Jackery 2000</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">$2,000+</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>2000Wh+ capacity</li>
                <li>Best for whole-home backup and off-grid living</li>
                <li>Popular: Expandable EcoFlow & Bluetti systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="ebay-card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long do solar generators last?</h3>
              <p className="text-sm text-gray-600">
                Quality solar generators last 5-10 years with proper maintenance. The lithium 
                batteries typically have a lifespan of 2,000-3,500 charge cycles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I run my entire house on a solar generator?</h3>
              <p className="text-sm text-gray-600">
                For essential appliances, yes. For whole-house backup, you'll need multiple 
                units or a larger expandable system. Our <Link href="/calculators/solar-sizing" className="text-blue-600 hover:underline">sizing calculator</Link> can help you determine exact requirements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do solar generators work at night?</h3>
              <p className="text-sm text-gray-600">
                Yes! Solar generators store energy in their internal batteries. During the day, 
                they charge from solar panels; at night, they discharge to power your devices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Find Your Perfect Solar Generator?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to get personalized recommendations based on your exact power needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            <Calculator className="inline h-4 w-4 mr-2" />
            Calculate My Needs
          </Link>
          <Link href="/products/solar-generators" className="ebay-btn-secondary">
            Browse Solar Generators
          </Link>
        </div>
      </div>
    </div>
  )
}