'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, Search, Zap, Battery, Sun, Calculator, BookOpen, ArrowRight, Compass, MapPin, LifeBuoy, TrendingUp, Menu, X } from 'lucide-react'

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const popularPages = [
    { title: 'Solar Generators', description: 'Browse our top-rated solar generators', href: '/products/solar-generators', icon: Zap },
    { title: 'Portable Power Stations', description: 'Compact power for camping and emergencies', href: '/products/portable-power-stations', icon: Battery },
    { title: 'Solar Sizing Calculator', description: 'Find your perfect solar solution', href: '/calculators/solar-sizing', icon: Calculator },
    { title: 'Buying Guides', description: 'Learn how to choose the right products', href: '/guides/how-to-choose', icon: BookOpen },
    { title: 'Blog', description: 'Expert advice and product reviews', href: '/blog', icon: TrendingUp },
    { title: 'Comparisons', description: 'Side-by-side product comparisons', href: '/comparisons', icon: Compass }
  ]

  const searchSuggestions = [
    'Solar Generator',
    'Battery Backup',
    'EcoFlow Delta Pro',
    'Camping Power',
    'CPAP Backup',
    'Solar Panels'
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to search results - this would be your search page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">OffGrid</span>
                <span className="text-xl font-bold text-blue-600">Power</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, calculators, guides..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button type="submit" className="absolute right-2 top-1.5 bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-blue-700">
                  Search
                </button>
              </form>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">Products</Link>
              <Link href="/calculators" className="text-sm font-medium text-gray-700 hover:text-blue-600">Calculators</Link>
              <Link href="/guides" className="text-sm font-medium text-gray-700 hover:text-blue-600">Guides</Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero 404 */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <div className="text-white">
                  <div className="text-5xl font-bold">404</div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-gray-900" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Looks like you're <span className="text-blue-600">off-grid</span>!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We couldn't find the page you're looking for. But don't worry, we have plenty of 
            power solutions to help you find your way back.
          </p>

          {/* Search Suggestions */}
          {isClient && (
            <div className="max-w-xl mx-auto mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {searchSuggestions.map(suggestion => (
                  <Link
                    key={suggestion}
                    href={`/search?q=${encodeURIComponent(suggestion)}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600 transition"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Main Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="ebay-btn-primary flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Back to Homepage
            </Link>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="ebay-btn-secondary flex items-center"
            >
              <Compass className="h-5 w-5 mr-2" />
              Browse Popular Pages
            </button>
          </div>
        </div>

        {/* Popular Pages Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Popular Pages You Might Be Looking For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map(page => {
              const Icon = page.icon
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 transition">
                      <Icon className="h-6 w-6 text-blue-600 group-hover:text-white transition" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-600">{page.description}</p>
                      <span className="text-blue-600 group-hover:underline text-sm font-medium flex items-center mt-2">
                        Explore <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Interactive Help Section */}
        <div className="max-w-3xl mx-auto">
          <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 mb-8">
            <div className="text-center mb-6">
              <LifeBuoy className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Still Can't Find What You Need?
              </h2>
              <p className="text-gray-600">
                Try one of our helpful tools or contact our team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/calculators/solar-sizing" className="group bg-white rounded-lg p-4 text-center hover:shadow-md transition">
                <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <div className="font-semibold text-gray-900 mb-1">Solar Calculator</div>
                <div className="text-xs text-gray-500">Find your perfect system</div>
              </Link>
              <Link href="/guides" className="group bg-white rounded-lg p-4 text-center hover:shadow-md transition">
                <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <div className="font-semibold text-gray-900 mb-1">Read Guides</div>
                <div className="text-xs text-gray-500">Expert buying advice</div>
              </Link>
              <Link href="/about/contact" className="group bg-white rounded-lg p-4 text-center hover:shadow-md transition">
                <MapPin className="h-8 w-8 text-yellow-600 mx-auto mb-2 group-hover:scale-110 transition" />
                <div className="font-semibold text-gray-900 mb-1">Contact Us</div>
                <div className="text-xs text-gray-500">We're here to help</div>
              </Link>
            </div>
          </div>

          {/* Fun Message */}
          <div className="text-center">
            <div className="inline-block bg-gray-100 rounded-full px-6 py-2">
              <span className="text-sm text-gray-600">
                🔧 Even solar systems have dark days. Let's get you back to the light!
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-3">OffGrid Power</h4>
              <p className="text-sm">Your trusted source for off-grid power solutions.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products/solar-generators" className="hover:text-white">Solar Generators</Link></li>
                <li><Link href="/products/portable-power-stations" className="hover:text-white">Power Stations</Link></li>
                <li><Link href="/products/battery-backups" className="hover:text-white">Battery Systems</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/calculators" className="hover:text-white">Calculators</Link></li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/about/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link></li>
                <li><Link href="/about/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}