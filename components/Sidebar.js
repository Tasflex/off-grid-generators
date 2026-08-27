'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Star, TrendingUp, Award } from 'lucide-react'

export default function Sidebar() {
  const [openSections, setOpenSections] = useState(['categories'])

  const toggleSection = (section) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="ebay-card overflow-hidden">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100"
        >
          <span className="font-semibold text-sm">Product Categories</span>
          {openSections.includes('categories') ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {openSections.includes('categories') && (
          <div className="p-3 space-y-2">
            <Link href="/products/solar-generators" className="block text-sm text-gray-700 hover:text-blue-600">
              Solar Generators
            </Link>
            <Link href="/products/portable-power-stations" className="block text-sm text-gray-700 hover:text-blue-600">
              Portable Power Stations
            </Link>
            <Link href="/products/battery-backups" className="block text-sm text-gray-700 hover:text-blue-600">
              Battery Backups
            </Link>
            <Link href="/products/solar-panels" className="block text-sm text-gray-700 hover:text-blue-600">
              Solar Panels
            </Link>
            <Link href="/products/accessories" className="block text-sm text-gray-700 hover:text-blue-600">
              Accessories
            </Link>
          </div>
        )}
      </div>

      {/* Top Rated */}
      <div className="ebay-card p-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          Top Rated Products
        </h3>
        <div className="space-y-3">
          <Link href="/products/ecoflow-delta-pro" className="block hover:bg-gray-50 rounded p-2">
            <div className="text-sm font-medium text-gray-900">EcoFlow Delta Pro</div>
            <div className="text-xs text-gray-500">4.8 ★ (1,243 reviews)</div>
            <div className="text-sm font-bold text-gray-900 mt-1">$1,999</div>
          </Link>
          <Link href="/products/bluetti-ac200max" className="block hover:bg-gray-50 rounded p-2">
            <div className="text-sm font-medium text-gray-900">Bluetti AC200MAX</div>
            <div className="text-xs text-gray-500">4.7 ★ (892 reviews)</div>
            <div className="text-sm font-bold text-gray-900 mt-1">$1,099</div>
          </Link>
          <Link href="/products/jackery-explorer-2000" className="block hover:bg-gray-50 rounded p-2">
            <div className="text-sm font-medium text-gray-900">Jackery Explorer 2000</div>
            <div className="text-xs text-gray-500">4.9 ★ (1,567 reviews)</div>
            <div className="text-sm font-bold text-gray-900 mt-1">$1,699</div>
          </Link>
        </div>
      </div>

      {/* Trending Comparisons */}
      <div className="ebay-card p-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
          Trending Comparisons
        </h3>
        <div className="space-y-2">
          <Link href="/comparisons/ecoflow-vs-bluetti" className="block text-sm text-gray-700 hover:text-blue-600">
            EcoFlow vs Bluetti
          </Link>
          <Link href="/comparisons/jackery-vs-ecoflow" className="block text-sm text-gray-700 hover:text-blue-600">
            Jackery vs EcoFlow
          </Link>
          <Link href="/comparisons/renogy-vs-goalzero" className="block text-sm text-gray-700 hover:text-blue-600">
            Renogy vs Goal Zero
          </Link>
          <Link href="/comparisons/portable-vs-home-backup" className="block text-sm text-gray-700 hover:text-blue-600">
            Portable vs Home Backup
          </Link>
        </div>
      </div>

      {/* Calculators */}
      <div className="ebay-card p-4 bg-blue-50">
        <h3 className="font-semibold text-sm mb-3">Free Calculators</h3>
        <div className="space-y-2">
          <Link href="/calculators/solar-sizing" className="block text-sm text-blue-600 hover:underline">
            Solar Sizing Calculator
          </Link>
          <Link href="/calculators/battery-runtime" className="block text-sm text-blue-600 hover:underline">
            Battery Runtime Calculator
          </Link>
          <Link href="/calculators/off-grid-budget" className="block text-sm text-blue-600 hover:underline">
            Off-Grid Budget Calculator
          </Link>
        </div>
      </div>

      {/* Expert Picks */}
      <div className="ebay-card p-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center">
          <Award className="h-4 w-4 text-green-500 mr-1" />
          Expert Picks 2026
        </h3>
        <div className="space-y-2">
          <Link href="/guides/best-solar-generators-2026" className="block text-sm text-gray-700 hover:text-blue-600">
            Best Solar Generators 2026
          </Link>
          <Link href="/guides/best-power-stations" className="block text-sm text-gray-700 hover:text-blue-600">
            Best Power Stations
          </Link>
          <Link href="/guides/best-battery-backup" className="block text-sm text-gray-700 hover:text-blue-600">
            Best Battery Backup Systems
          </Link>
        </div>
      </div>
    </div>
  )
}