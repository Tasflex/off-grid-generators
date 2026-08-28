'use client'

import Link from 'next/link'
import { Sun, Zap, Battery, Check, X, ArrowRight, Calendar, Clock, Info, Calculator } from 'lucide-react'

export default function HowManySolarPanelsNeeded() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How Many Solar Panels</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">DIY</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How Many Solar Panels Do I Need? Complete Calculation Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            December 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            9 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-600">
          Solar panels are the heart of any off-grid or backup power system. But how many do you actually need? 
          This guide breaks down the calculation so you can size your system with confidence.
        </p>
      </div>

      {/* The Basic Formula */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Basic Formula</h2>
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          <div className="font-mono text-sm text-center">
            Number of Panels = (Daily Energy Needs ÷ Sun Hours) ÷ Panel Wattage
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Daily Energy</h3>
            <p className="text-sm text-gray-500">How much power you need per day (Wh)</p>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-3xl mb-2">☀️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Sun Hours</h3>
            <p className="text-sm text-gray-500">Peak sun hours in your location</p>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-3xl mb-2">🔋</div>
            <h3 className="font-semibold text-gray-900 mb-1">Panel Wattage</h3>
            <p className="text-sm text-gray-500">Output per panel (W)</p>
          </div>
        </div>
      </div>

      {/* Example Calculation */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Example Calculation</h2>
        <div className="bg-gray-50 rounded p-4">
          <div className="space-y-3">
            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-500">Daily Energy Needs</div>
              <div className="text-2xl font-bold text-gray-900">3,000 Wh/day</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-500">Sun Hours (Average US)</div>
              <div className="text-2xl font-bold text-gray-900">5 hours</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-500">Panel Wattage</div>
              <div className="text-2xl font-bold text-gray-900">200W</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="text-sm text-gray-500">Calculation</div>
              <div className="font-mono text-sm">3,000 ÷ 5 ÷ 200 = 3 panels</div>
              <div className="text-sm font-semibold text-blue-800 mt-1">Add 20% buffer → 4 panels</div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Sun Hours */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sun Hours by Location</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Peak Sun Hours</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Panels for 3,000Wh</th>
              </tr>
            </thead>
            <tbody>
              {[
                { location: 'Arizona', hours: 6.5, panels: '4 panels (200W)' },
                { location: 'California', hours: 5.5, panels: '5 panels (200W)' },
                { location: 'Texas', hours: 5.0, panels: '5 panels (200W)' },
                { location: 'New York', hours: 3.5, panels: '8 panels (200W)' },
                { location: 'Seattle', hours: 2.5, panels: '10 panels (200W)' }
              ].map(row => (
                <tr key={row.location} className="border-t">
                  <td className="px-4 py-3 text-sm">{row.location}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{row.hours}</td>
                  <td className="px-4 py-3 text-sm">{row.panels}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel Sizes */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Panel Size Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { size: '100W', panels: '10 panels', description: 'Small systems, backpacking', href: '/products/jackery-solarsaga-100w' },
            { size: '200W', panels: '5 panels', description: 'Van life, small homes', href: '/products/renogy-200w-solar-panel' },
            { size: '400W', panels: '3 panels', description: 'Home backup, off-grid', href: '/products/ecoflow-400w-solar-panel' }
          ].map(option => (
            <div key={option.size} className="border rounded p-4 text-center">
              <div className="text-3xl mb-2">☀️</div>
              <div className="text-2xl font-bold text-gray-900">{option.size}</div>
              <div className="text-sm text-gray-500">{option.panels}</div>
              <p className="text-xs text-gray-600 mt-2">{option.description}</p>
              <Link href={option.href} className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Calculate Your Exact Panel Count
        </h2>
        <p className="text-gray-600 mb-4">
          Use our interactive panel layout calculator for precise recommendations.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-panel-layout" className="ebay-btn-primary">
            <Calculator className="inline h-4 w-4 mr-2" />
            Calculate Panel Layout
          </Link>
          <Link href="/guides/how-many-solar-panels-do-i-need" className="ebay-btn-secondary">
            Read Detailed Guide
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I mix different wattage panels?', a: 'Yes, but it\'s not ideal. Panels in series should have similar specs for best performance.' },
            { q: 'Do I need a battery with solar panels?', a: 'Yes, batteries store energy for night use and cloudy days.' },
            { q: 'How long do solar panels last?', a: 'Most panels last 25-30 years with only 10-20% efficiency loss.' }
          ].map(faq => (
            <div key={faq.q} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}