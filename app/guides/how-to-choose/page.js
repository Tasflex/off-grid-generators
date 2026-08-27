'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock, Star, Check, X, Zap, Battery, Weight, DollarSign, ArrowRight, Home, Caravan, Tent, Shield, Calculator, AlertTriangle, Info } from 'lucide-react'

export default function HowToChooseGuide() {
  const [activeStep, setActiveStep] = useState(1)
  const [showDecisionTree, setShowDecisionTree] = useState(false)

  const steps = [
    {
      number: 1,
      title: 'Determine Your Power Needs',
      description: 'Calculate the total watt-hours you need daily',
      icon: Calculator
    },
    {
      number: 2,
      title: 'Check Output Requirements',
      description: 'Ensure the generator can handle your largest appliance',
      icon: Zap
    },
    {
      number: 3,
      title: 'Consider Portability',
      description: 'Match weight to your use case',
      icon: Weight
    },
    {
      number: 4,
      title: 'Evaluate Charging Options',
      description: 'Check solar, AC, and car charging capabilities',
      icon: Battery
    },
    {
      number: 5,
      title: 'Compare Brands & Warranty',
      description: 'Look for reliable brands with good support',
      icon: Shield
    },
    {
      number: 6,
      title: 'Set Your Budget',
      description: 'Find the best value within your price range',
      icon: DollarSign
    }
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
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Buying Guide</span>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">Step-by-Step</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Choose a Solar Generator: Complete Guide
        </h1>
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

      {/* Decision Tree Visualization */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Decision Tree</h2>
          <button
            onClick={() => setShowDecisionTree(!showDecisionTree)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {showDecisionTree ? 'Hide' : 'Show'} Diagram
          </button>
        </div>
        
        {showDecisionTree && (
          <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <svg className="w-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Title */}
              <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">Solar Generator Selection Flowchart</text>
              
              {/* Start Node */}
              <rect x="300" y="50" width="200" height="50" rx="10" fill="#3665f3" />
              <text x="400" y="80" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Start Here</text>
              
              {/* Q1: Power Needs */}
              <rect x="250" y="130" width="300" height="60" rx="10" fill="#f5a623" stroke="#e69c00" strokeWidth="2" />
              <text x="400" y="155" textAnchor="middle" fontSize="12" fill="#1a1a1a" fontWeight="bold">Q1: What will you power?</text>
              <text x="400" y="175" textAnchor="middle" fontSize="10" fill="#4a5568">Devices, appliances, or whole home?</text>
              
              {/* Branch arrows */}
              <line x1="400" y1="100" x2="400" y2="130" stroke="#4a5568" strokeWidth="2" />
              
              {/* Branch 1: Small Devices */}
              <rect x="50" y="230" width="200" height="80" rx="10" fill="#48bb78" stroke="#38a169" strokeWidth="2" />
              <text x="150" y="255" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Small Devices</text>
              <text x="150" y="275" textAnchor="middle" fontSize="10" fill="white">Phones, Laptops, Lights</text>
              <text x="150" y="295" textAnchor="middle" fontSize="10" fill="white">200-500 Wh</text>
              
              {/* Branch 2: Medium Appliances */}
              <rect x="300" y="230" width="200" height="80" rx="10" fill="#4299e1" stroke="#3182ce" strokeWidth="2" />
              <text x="400" y="255" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Medium Appliances</text>
              <text x="400" y="275" textAnchor="middle" fontSize="10" fill="white">Fridge, TV, CPAP</text>
              <text x="400" y="295" textAnchor="middle" fontSize="10" fill="white">500-2000 Wh</text>
              
              {/* Branch 3: Whole Home */}
              <rect x="550" y="230" width="200" height="80" rx="10" fill="#ed8936" stroke="#dd6b20" strokeWidth="2" />
              <text x="650" y="255" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Whole Home</text>
              <text x="650" y="275" textAnchor="middle" fontSize="10" fill="white">AC, Well Pump, Full Home</text>
              <text x="650" y="295" textAnchor="middle" fontSize="10" fill="white">2000+ Wh</text>
              
              {/* Arrows from Q1 */}
              <line x1="250" y1="190" x2="150" y2="230" stroke="#4a5568" strokeWidth="2" />
              <line x1="400" y1="190" x2="400" y2="230" stroke="#4a5568" strokeWidth="2" />
              <line x1="550" y1="190" x2="650" y2="230" stroke="#4a5568" strokeWidth="2" />
              
              {/* Q2: Budget */}
              <rect x="250" y="340" width="300" height="60" rx="10" fill="#f5a623" stroke="#e69c00" strokeWidth="2" />
              <text x="400" y="365" textAnchor="middle" fontSize="12" fill="#1a1a1a" fontWeight="bold">Q2: What is your budget?</text>
              <text x="400" y="385" textAnchor="middle" fontSize="10" fill="#4a5568">Under $500, $500-$1500, or $1500+?</text>
              
              {/* Arrows */}
              <line x1="150" y1="310" x2="300" y2="340" stroke="#4a5568" strokeWidth="2" />
              <line x1="400" y1="310" x2="400" y2="340" stroke="#4a5568" strokeWidth="2" />
              <line x1="650" y1="310" x2="500" y2="340" stroke="#4a5568" strokeWidth="2" />
              
              {/* Budget Options */}
              <rect x="50" y="440" width="200" height="60" rx="10" fill="#e53e3e" stroke="#c53030" strokeWidth="2" />
              <text x="150" y="465" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Budget Options</text>
              <text x="150" y="485" textAnchor="middle" fontSize="10" fill="white">Jackery 300, River 2</text>
              
              <rect x="300" y="440" width="200" height="60" rx="10" fill="#48bb78" stroke="#38a169" strokeWidth="2" />
              <text x="400" y="465" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Mid-Range Options</text>
              <text x="400" y="485" textAnchor="middle" fontSize="10" fill="white">Bluetti AC200MAX, Delta 2</text>
              
              <rect x="550" y="440" width="200" height="60" rx="10" fill="#9f7aea" stroke="#805ad5" strokeWidth="2" />
              <text x="650" y="465" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Premium Options</text>
              <text x="650" y="485" textAnchor="middle" fontSize="10" fill="white">Delta Pro, Jackery 2000</text>
              
              {/* Arrows */}
              <line x1="300" y1="400" x2="150" y2="440" stroke="#4a5568" strokeWidth="2" />
              <line x1="400" y1="400" x2="400" y2="440" stroke="#4a5568" strokeWidth="2" />
              <line x1="500" y1="400" x2="650" y2="440" stroke="#4a5568" strokeWidth="2" />
              
              {/* Final Recommendation */}
              <rect x="250" y="530" width="300" height="50" rx="10" fill="#3182ce" />
              <text x="400" y="560" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Get Personalized Recommendations</text>
              
              {/* Arrows */}
              <line x1="150" y1="500" x2="300" y2="530" stroke="#4a5568" strokeWidth="2" />
              <line x1="400" y1="500" x2="400" y2="530" stroke="#4a5568" strokeWidth="2" />
              <line x1="650" y1="500" x2="500" y2="530" stroke="#4a5568" strokeWidth="2" />
            </svg>
          </div>
        )}
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-8 mb-12">
        {/* Step 1 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
            <h2 className="text-xl font-bold text-gray-900">Determine Your Power Needs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                The most critical step is calculating how much power you actually need. This determines 
                the battery capacity (measured in Watt-hours) required.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">The Formula</h3>
                <div className="font-mono bg-white rounded p-3 text-sm">
                  Daily Energy (Wh) = Watts × Hours Used
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-3">Example Calculation:</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">Device</th>
                    <th className="px-3 py-2 text-left">Watts</th>
                    <th className="px-3 py-2 text-left">Hours</th>
                    <th className="px-3 py-2 text-left">Daily Wh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2">Refrigerator</td>
                    <td className="px-3 py-2">150</td>
                    <td className="px-3 py-2">24</td>
                    <td className="px-3 py-2 font-semibold">3,600</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">LED Lights</td>
                    <td className="px-3 py-2">30</td>
                    <td className="px-3 py-2">5</td>
                    <td className="px-3 py-2 font-semibold">150</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Laptop</td>
                    <td className="px-3 py-2">65</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2 font-semibold">260</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-3 py-2 font-bold">Total</td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2"></td>
                    <td className="px-3 py-2 font-bold">4,010 Wh</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Visualization */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Visual Power Breakdown</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Refrigerator</span>
                    <span>90%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 rounded-full h-4" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>LED Lights</span>
                    <span>4%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-yellow-400 rounded-full h-4" style={{ width: '4%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Laptop</span>
                    <span>6%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 rounded-full h-4" style={{ width: '6%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded p-4 text-center">
                <div className="text-sm text-gray-500">Recommended Capacity</div>
                <div className="text-2xl font-bold text-blue-600">5,000 Wh</div>
                <div className="text-xs text-gray-500 mt-1">(4,010 Wh + 20% safety margin)</div>
              </div>
              
              <Link href="/calculators/solar-sizing" className="block text-center bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
                Use Our Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
            <h2 className="text-xl font-bold text-gray-900">Check Output Requirements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                The generator's output (Watts) must be higher than your most demanding device's 
                startup power draw. Some appliances need 3-4x their running power to start.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Important!</h4>
                    <p className="text-sm text-yellow-700">
                      Always check SURGE power, not just running power. Your generator needs to handle 
                      the startup spike for motor-driven appliances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Common Appliance Surge Requirements</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white">
                    <th className="px-3 py-2 text-left">Appliance</th>
                    <th className="px-3 py-2 text-left">Running W</th>
                    <th className="px-3 py-2 text-left">Surge W</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2">Refrigerator</td>
                    <td className="px-3 py-2">150</td>
                    <td className="px-3 py-2 font-semibold text-red-600">600</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Microwave</td>
                    <td className="px-3 py-2">1000</td>
                    <td className="px-3 py-2 font-semibold text-red-600">1500</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">AC Unit</td>
                    <td className="px-3 py-2">500</td>
                    <td className="px-3 py-2 font-semibold text-red-600">2000</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Well Pump</td>
                    <td className="px-3 py-2">750</td>
                    <td className="px-3 py-2 font-semibold text-red-600">2500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
            <h2 className="text-xl font-bold text-gray-900">Consider Portability</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Tent,
                title: 'Backpacking / Camping',
                weight: 'Under 10 lbs',
                capacity: '200-500 Wh',
                image: '🎒',
                examples: 'Jackery 300, River 2'
              },
              {
                icon: Caravan,
                title: 'Van Life / RV',
                weight: '10-50 lbs',
                capacity: '500-2000 Wh',
                image: '🚐',
                examples: 'Bluetti AC200MAX, Delta 2'
              },
              {
                icon: Home,
                title: 'Home Backup',
                weight: '50+ lbs',
                capacity: '2000+ Wh',
                image: '🏠',
                examples: 'Delta Pro, Jackery 2000'
              }
            ].map(option => (
              <div key={option.title} className="border rounded-lg p-4 text-center">
                <div className="text-4xl mb-3">{option.image}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><strong>Weight:</strong> {option.weight}</div>
                  <div><strong>Capacity:</strong> {option.capacity}</div>
                  <div><strong>Examples:</strong> {option.examples}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">4</div>
            <h2 className="text-xl font-bold text-gray-900">Evaluate Charging Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Solar Charging',
                time: '4-12 hours',
                icon: '☀️',
                description: 'Best for off-grid use. Look for MPPT controllers.'
              },
              {
                title: 'AC Wall Charging',
                time: '1-3 hours',
                icon: '🔌',
                description: 'Fastest method. Check for fast-charge support.'
              },
              {
                title: 'Car Charging',
                time: '4-8 hours',
                icon: '🚗',
                description: 'Convenient for road trips. Usually 100-200W.'
              }
            ].map(option => (
              <div key={option.title} className="border rounded-lg p-4 text-center">
                <div className="text-4xl mb-3">{option.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                <div className="text-sm text-blue-600 font-medium mb-2">{option.time}</div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 5 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">5</div>
            <h2 className="text-xl font-bold text-gray-900">Compare Brands & Warranty</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                brand: 'EcoFlow',
                rating: 4.8,
                warranty: '5 years',
                description: 'Premium brand with innovative features and expandable systems',
                best: 'High Capacity & Fast Charging'
              },
              {
                brand: 'Bluetti',
                rating: 4.7,
                warranty: '2-5 years',
                description: 'Excellent value with expandable options',
                best: 'Value & Portability'
              },
              {
                brand: 'Jackery',
                rating: 4.9,
                warranty: '2-3 years',
                description: 'Most trusted brand with excellent customer service',
                best: 'Reliability & Ease of Use'
              }
            ].map(brand => (
              <div key={brand.brand} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{brand.brand}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">{brand.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{brand.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{brand.best}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Warranty: {brand.warranty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 6 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">6</div>
            <h2 className="text-xl font-bold text-gray-900">Set Your Budget</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                range: 'Under $500',
                capacity: '200-500 Wh',
                best: 'Light camping, phone charging',
                products: 'Jackery 300, River 2',
                value: 'Good for emergency phone charging and small devices'
              },
              {
                range: '$500 - $1,500',
                capacity: '500-2000 Wh',
                best: 'CPAP, fridge, TV, weekend trips',
                products: 'Bluetti AC200MAX, Delta 2',
                value: 'Sweet spot for most users. Powers essential appliances.'
              },
              {
                range: '$1,500+',
                capacity: '2000+ Wh',
                best: 'Whole home backup, off-grid living',
                products: 'Delta Pro, Jackery 2000',
                value: 'Premium investment for serious backup needs'
              }
            ].map(tier => (
              <div key={tier.range} className={`border rounded-lg p-4 ${tier.range === '$500 - $1,500' ? 'border-blue-600 ring-2 ring-blue-600' : ''}`}>
                {tier.range === '$500 - $1,500' && (
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">Most Popular</span>
                )}
                <h3 className="font-bold text-gray-900 mb-2">{tier.range}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><strong>Capacity:</strong> {tier.capacity}</div>
                  <div><strong>Best for:</strong> {tier.best}</div>
                  <div><strong>Examples:</strong> {tier.products}</div>
                  <div className="text-xs text-gray-500 mt-2">{tier.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Calculator CTA */}
      <div className="ebay-card p-8 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Skip the Manual Calculation
          </h2>
          <p className="text-gray-600 mb-4">
            Use our interactive calculator to get personalized recommendations in seconds.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
              <Calculator className="inline h-4 w-4 mr-2" />
              Calculate My Needs
            </Link>
            <Link href="/products/solar-generators" className="ebay-btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
        
        <div className="space-y-4">
          {[
            {
              mistake: 'Buying too small',
              solution: 'Always add 20-30% capacity buffer. You\'ll likely add devices later.'
            },
            {
              mistake: 'Ignoring surge requirements',
              solution: 'Check startup watts for motor appliances. A fridge needs 600W surge even if running at 150W.'
            },
            {
              mistake: 'Not considering charging time',
              solution: 'Check how long it takes to recharge. A generator that takes 12 hours to charge may not be practical.'
            },
            {
              mistake: 'Buying without warranty',
              solution: 'Look for at least 2-year warranty. Premium brands offer 5-year coverage.'
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start bg-red-50 border border-red-200 rounded p-4">
              <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Mistake: {item.mistake}</h3>
                <p className="text-sm text-red-700">Solution: {item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              q: 'How long do solar generators last?',
              a: 'Quality solar generators last 5-10 years with proper maintenance. Lithium batteries typically have 2,000-3,500 charge cycles.'
            },
            {
              q: 'Can I run my whole house on a solar generator?',
              a: 'For essential appliances, yes. For whole-house backup, you\'ll need multiple units or a larger expandable system.'
            },
            {
              q: 'Do solar generators work at night?',
              a: 'Yes! They store energy in batteries during the day and discharge at night. The capacity determines how long they can provide power.'
            },
            {
              q: 'Are solar generators worth it?',
              a: 'For emergency preparedness and off-grid living, absolutely. They\'re quiet, clean, and require minimal maintenance compared to gas generators.'
            }
          ].map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/guides/best-solar-generators-2026" className="ebay-card p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            Best Solar Generators 2026
          </h3>
          <p className="text-sm text-gray-600">Complete buying guide with our top picks</p>
        </Link>
        <Link href="/calculators/solar-sizing" className="ebay-card p-4 hover:shadow-lg transition group">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
            Solar Sizing Calculator
          </h3>
          <p className="text-sm text-gray-600">Get instant personalized recommendations</p>
        </Link>
      </div>
    </div>
  )
}