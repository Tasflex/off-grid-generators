'use client'

import { useState } from 'react'
import Calculator from '../components/Calculator'
import ProductCard from '../components/ProductCard'
import SearchModal from '../components/SearchModal'
import { getProductsByCategory } from '../lib/products'
import Link from 'next/link'
import { ArrowRight, Calculator as CalculatorIcon, Zap, Battery, Sun, Search } from 'lucide-react'

export default function HomePage() {
  const featuredProducts = getProductsByCategory('solarGenerators').slice(0, 3)
  const portableStations = getProductsByCategory('portablePowerStations').slice(0, 3)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4">
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Interactive Calculator
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Off-Grid Solar Sizing Calculator
              </h1>
              <p className="text-lg mb-6 text-blue-100">
                Calculate your exact battery and solar requirements for any emergency backup, van conversion, or off-grid setup. Get instant product recommendations with your precise needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-blue-50 transition"
                >
                  Try the Calculator
                </button>
                <Link
                  href="/products/solar-generators"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Browse Products
                </Link>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-600 transition flex items-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Site
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-32 h-32 text-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="ebay-card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CalculatorIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Precise Sizing</h3>
            <p className="text-sm text-gray-600">Get exact battery and solar requirements based on your specific appliances and usage.</p>
          </div>
          <div className="ebay-card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Battery className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Top Brands</h3>
            <p className="text-sm text-gray-600">We compare and recommend products from EcoFlow, Bluetti, Jackery, and more.</p>
          </div>
          <div className="ebay-card p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert Guides</h3>
            <p className="text-sm text-gray-600">Comprehensive buying guides and tutorials for off-grid living and emergency preparedness.</p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">System Sizing Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your appliances or add custom devices to calculate your exact power requirements.
          </p>
        </div>
        <Calculator />
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Rated Solar Generators</h2>
              <p className="text-gray-600 mt-1">Based on our testing and user reviews</p>
            </div>
            <Link
              href="/products/solar-generators"
              className="flex items-center text-blue-600 hover:underline"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Portable Power Stations */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Portable Power Stations</h2>
            <p className="text-gray-600 mt-1">Lightweight options for camping, tailgating, and emergencies</p>
          </div>
          <Link
            href="/products/portable-power-stations"
            className="flex items-center text-blue-600 hover:underline"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {portableStations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Compare Top Brands</h2>
            <p className="text-gray-600 mt-1">Side-by-side comparison of the best solar generators</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/comparisons/ecoflow-vs-bluetti" className="ebay-card p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">EcoFlow vs Bluetti</h3>
              <p className="text-sm text-gray-600">Which brand offers better value? Compare specs, prices, and features.</p>
            </Link>
            <Link href="/comparisons/jackery-vs-ecoflow" className="ebay-card p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-3">🔋</div>
              <h3 className="font-semibold text-gray-900 mb-2">Jackery vs EcoFlow</h3>
              <p className="text-sm text-gray-600">Portable power showdown - discover which one fits your needs.</p>
            </Link>
            <Link href="/comparisons/renogy-vs-goalzero" className="ebay-card p-6 hover:shadow-lg transition">
              <div className="text-3xl mb-3">☀️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Renogy vs Goal Zero</h3>
              <p className="text-sm text-gray-600">Compare solar panel and battery systems for off-grid setups.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Get Your Custom Wiring Diagram
              </h3>
              <p className="text-gray-600 mb-4">
                Enter your email and we'll send you a detailed wiring schematic, load calculation spreadsheet, and optimized product list for your specific setup.
              </p>
            </div>
            <div>
              <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="ebay-btn-primary whitespace-nowrap">
                  Get Free Guide
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="ebay-card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">New to Off-Grid Power?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Start with our comprehensive buying guide that explains everything you need to know about solar generators, battery capacities, and inverter output.
            </p>
            <Link href="/guides/how-to-choose" className="text-blue-600 hover:underline font-medium">
              Read the Complete Guide →
            </Link>
          </div>
          <div className="ebay-card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Planning for Emergencies?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Learn how to calculate the right backup power for your home. Our step-by-step tutorial covers everything from refrigerator sizing to full-home backup systems.
            </p>
            <Link href="/guides/emergency-preparedness" className="text-blue-600 hover:underline font-medium">
              Start Your Emergency Plan →
            </Link>
          </div>
        </div>
      </section>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}