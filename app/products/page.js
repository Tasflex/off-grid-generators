'use client'

import Link from 'next/link'
import { Sun, BatteryCharging, Zap, Plug, Wrench, Package, Cpu, AlertTriangle, Box } from 'lucide-react'

const categories = [
  {
    name: 'Solar Generators',
    description: 'Complete portable power stations with built-in inverters',
    href: '/products/solar-generators',
    icon: Zap,
    count: 8,
    image: '/images/categories/solar-generators.jpg'
  },
  {
    name: 'Portable Power Stations',
    description: 'Compact battery systems for camping and emergencies',
    href: '/products/portable-power-stations',
    icon: BatteryCharging,
    count: 6,
    image: '/images/categories/portable-power.jpg'
  },
  {
    name: 'Battery Backups',
    description: 'Deep-cycle lithium batteries for permanent installs',
    href: '/products/battery-backups',
    icon: BatteryCharging,
    count: 4,
    image: '/images/categories/battery-backups.jpg'
  },
  {
    name: 'Solar Panels',
    description: 'Monocrystalline and polycrystalline panels for all budgets',
    href: '/products/solar-panels',
    icon: Sun,
    count: 3,
    image: '/images/categories/solar-panels.jpg'
  },
  {
    name: 'Inverters',
    description: 'Convert DC battery power to AC for your appliances',
    href: '/products/inverters',
    icon: Zap,
    count: 5,
    image: '/images/categories/inverters.jpg'
  },
  {
    name: 'Charge Controllers',
    description: 'Regulate solar charging for safe, efficient battery charging',
    href: '/products/charge-controllers',
    icon: Cpu,
    count: 5,
    image: '/images/categories/charge-controllers.jpg'
  },
  {
    name: 'Components',
    description: 'Cables, fuses, connectors, and mounting hardware',
    href: '/products/components',
    icon: Wrench,
    count: 6,
    image: '/images/categories/components.jpg'
  },
  {
    name: 'Complete Kits',
    description: 'Everything you need in one package',
    href: '/products/complete-kits',
    icon: Package,
    count: 3,
    image: '/images/categories/complete-kits.jpg'
  },
  {
    name: 'Accessories',
    description: 'Cables, adapters, mounts, and essential add-ons',
    href: '/products/accessories',
    icon: Plug,
    count: 3,
    image: '/images/categories/accessories.jpg'
  }
]

export default function ProductsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
        <p className="text-gray-600">
          Browse our curated selection of off-grid power solutions. Every product is tested and rated by our team.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.name}
              href={category.href}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="bg-gray-100 h-48 flex items-center justify-center relative">
                <Icon className="w-16 h-16 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {category.count} Products
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Featured Comparison CTA */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Not sure which product fits your needs?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our solar sizing calculator to get personalized recommendations.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Calculate Your Needs
        </Link>
      </div>
    </div>
  )
}