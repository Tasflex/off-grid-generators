'use client'

import Link from 'next/link'
import { Caravan, Zap, Battery, Sun, Check, X, ArrowRight, Calendar, Clock, Info, AlertTriangle } from 'lucide-react'

export default function VanLifeSolarSetupGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Van Life Solar Setup</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">Van Life</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Van Life Solar Setup: Complete Guide for Beginners
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

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-start mb-4">
          <Caravan className="h-8 w-8 text-orange-600 mr-4 flex-shrink-0" />
          <p className="text-gray-600">
            Living the van life means having reliable power for your laptop, fridge, lights, and comfort. 
            This comprehensive guide covers everything you need to know about installing a solar system 
            in your van, from sizing to installation.
          </p>
        </div>
      </div>

      {/* Why Solar for Van Life */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why Solar Power for Van Life?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Freedom', description: 'No need to hook up at campgrounds', icon: Zap },
            { title: 'Silent Operation', description: 'No noisy generators', icon: Battery },
            { title: 'Free Energy', description: 'Sunlight is free and unlimited', icon: Sun },
            { title: 'Environmentally Friendly', description: 'Zero emissions, clean power', icon: Check }
          ].map(item => (
            <div key={item.title} className="bg-gray-50 rounded p-4">
              <item.icon className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Calculate Your Power Needs */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">1</div>
          <h2 className="text-xl font-bold text-gray-900">Calculate Your Power Needs</h2>
        </div>
        <p className="text-gray-600 mb-4">
          The first step is understanding your daily energy consumption. List all devices you'll run and 
          calculate their daily watt-hour consumption.
        </p>
        
        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Common Van Life Devices:</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white">
                <th className="px-3 py-2 text-left">Device</th>
                <th className="px-3 py-2 text-left">Watts</th>
                <th className="px-3 py-2 text-left">Hours/Day</th>
                <th className="px-3 py-2 text-left">Daily Wh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">12V Refrigerator</td>
                <td className="px-3 py-2">45</td>
                <td className="px-3 py-2">24</td>
                <td className="px-3 py-2 font-semibold">1,080</td>
              </tr>
              <tr>
                <td className="px-3 py-2">LED Lights (4)</td>
                <td className="px-3 py-2">20</td>
                <td className="px-3 py-2">6</td>
                <td className="px-3 py-2 font-semibold">120</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Laptop</td>
                <td className="px-3 py-2">65</td>
                <td className="px-3 py-2">4</td>
                <td className="px-3 py-2 font-semibold">260</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Phone Charger</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2 font-semibold">20</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Ceiling Fan</td>
                <td className="px-3 py-2">30</td>
                <td className="px-3 py-2">8</td>
                <td className="px-3 py-2 font-semibold">240</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-3 py-2 font-bold">Total</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2 font-bold">1,720 Wh</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex gap-3">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary flex-1 text-center">
            Use Solar Sizing Calculator
          </Link>
          <Link href="/guides/van-life-solar-sizing" className="ebay-btn-secondary flex-1 text-center">
            Read Van Life Sizing Guide
          </Link>
        </div>
      </div>

      {/* Step 2: Choose Your Components */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">2</div>
          <h2 className="text-xl font-bold text-gray-900">Choose Your Components</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Solar Panels</h3>
            <p className="text-sm text-gray-600 mb-2">For a 1,720 Wh/day system, you need approximately:</p>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-blue-600">400W</div>
              <div className="text-sm text-gray-500">2 × 200W panels</div>
            </div>
            <Link href="/products/solar-panels" className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
              Shop Solar Panels →
            </Link>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Battery Bank</h3>
            <p className="text-sm text-gray-600 mb-2">For 2 days of backup:</p>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-green-600">2,048 Wh</div>
              <div className="text-sm text-gray-500">1 × Bluetti AC200MAX or 2 × 100Ah batteries</div>
            </div>
            <Link href="/products/battery-backups" className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
              Shop Batteries →
            </Link>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Charge Controller</h3>
            <p className="text-sm text-gray-600 mb-2">MPPT recommended for efficiency:</p>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-yellow-600">30A</div>
              <div className="text-sm text-gray-500">Renogy MPPT 30A</div>
            </div>
            <Link href="/products/charge-controllers" className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
              Shop Controllers →
            </Link>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Inverter</h3>
            <p className="text-sm text-gray-600 mb-2">Pure sine wave for sensitive electronics:</p>
            <div className="bg-white rounded p-3">
              <div className="text-2xl font-bold text-purple-600">1,000W</div>
              <div className="text-sm text-gray-500">Renogy 1000W Pure Sine</div>
            </div>
            <Link href="/products/inverters" className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
              Shop Inverters →
            </Link>
          </div>
        </div>

        {/* Wiring Diagram Link */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Need Wiring Help?</h3>
          <p className="text-sm text-gray-600 mb-2">Check our detailed wiring diagrams for your setup.</p>
          <Link href="/wiring-diagrams/12v-system" className="text-blue-600 hover:underline text-sm font-medium">
            View 12V System Wiring Diagram →
          </Link>
        </div>
      </div>

      {/* Step 3: Installation */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">3</div>
          <h2 className="text-xl font-bold text-gray-900">Installation</h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Mount Solar Panels</h3>
            <p className="text-sm text-gray-600">
              Mount panels on your van's roof. Use a roof rack or adhesive mounting brackets. Ensure panels 
              face south for maximum sun exposure.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Install Charge Controller</h3>
            <p className="text-sm text-gray-600">
              Mount the charge controller in a dry, ventilated location near the battery bank.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Connect Batteries</h3>
            <p className="text-sm text-gray-600">
              Connect your battery bank. For a 12V system, connect batteries in parallel.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Step 4: Install Inverter</h3>
            <p className="text-sm text-gray-600">
              Mount the inverter near your battery bank for shorter cable runs.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Step 5: Wire Everything</h3>
            <p className="text-sm text-gray-600">
              Follow our <Link href="/guides/how-to-wire-solar-system" className="text-blue-600 hover:underline">wiring guide</Link> 
              for detailed instructions.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Van Life Solar Kit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Jackery Explorer 1000', price: '$799', description: 'Battery + Inverter', href: '/products/jackery-explorer-1000' },
            { name: 'Renogy 200W Panel', price: '$179', description: 'Solar Panel', href: '/products/renogy-200w-solar-panel' },
            { name: 'Renogy MPPT 30A', price: '$129', description: 'Charge Controller', href: '/products/renogy-mppt-30a' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.description}</div>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pro Tips for Van Life Solar</h2>
        <div className="space-y-3">
          {[
            'Oversize your system by 20-30% for cloudy days',
            'Use flexible panels for curved roofs',
            'Install a battery monitor to track usage',
            'Keep your system clean and well-maintained',
            'Consider a generator backup for long cloudy periods'
          ].map(tip => (
            <div key={tip} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Start Your Van Solar Project?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to get exact product recommendations for your build.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/guides/van-life-solar-sizing" className="ebay-btn-secondary">
            Read Van Life Guide
          </Link>
        </div>
      </div>
    </div>
  )
}