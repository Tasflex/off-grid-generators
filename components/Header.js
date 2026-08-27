'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import SearchModal from './SearchModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [productsDropdown, setProductsDropdown] = useState(false)
  const [calculatorsDropdown, setCalculatorsDropdown] = useState(false)

  const navItems = [
    {
      label: 'Products',
      dropdown: true,
      items: [
        { label: 'Solar Generators', href: '/products/solar-generators' },
        { label: 'Portable Power Stations', href: '/products/portable-power-stations' },
        { label: 'Battery Backups', href: '/products/battery-backups' },
        { label: 'Solar Panels', href: '/products/solar-panels' },
        { label: 'Accessories', href: '/products/accessories' },
      ]
    },
    {
      label: 'Calculators',
      dropdown: true,
      items: [
        { label: 'Solar Sizing Calculator', href: '/calculators/solar-sizing' },
        { label: 'Battery Runtime Calculator', href: '/calculators/battery-runtime' },
        { label: 'Off-Grid Budget Calculator', href: '/calculators/off-grid-budget' },
      ]
    },
    { label: 'Guides', href: '/guides' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top bar */}
        <div className="bg-blue-600 text-white text-xs py-1 px-4 text-center">
          <span>Free Shipping on Orders $500+ | Use Code: OFFGRID10 for 10% Off</span>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
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

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition"
              >
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-500">Search products, calculators, guides...</span>
              </button>
            </div>

            {/* Right side icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link href="/calculators/solar-sizing" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Sizing Calculator
              </Link>
              <Link href="/about/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Navigation bar */}
          <nav className="hidden md:flex justify-center space-x-8 pb-4">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center space-x-1 text-gray-700 font-medium hover:text-blue-600 py-2">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-gray-700 font-medium hover:text-blue-600 py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div className="py-2">
                      <span className="block text-gray-700 font-medium px-4 py-2">{item.label}</span>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}