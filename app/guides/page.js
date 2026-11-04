'use client'

import Link from 'next/link'
import { BookOpen, Wrench, Calculator, Shield, ShieldCheck, Home, Caravan, Compass } from 'lucide-react'
import { guides as dataGuides } from '../../lib/guides/guides'

// Hand-built guides by category; data-driven guides from lib/guides join their matching category
const handBuiltCategories = [
  {
    title: 'Planning & Sizing',
    description: 'Understand solar and size a system that fits your needs',
    icon: Compass,
    guides: [
      { title: 'How Many Solar Panels Do I Need?', href: '/guides/how-many-solar-panels-do-i-need' },
      { title: 'How to Calculate Battery Runtime', href: '/guides/calculate-battery-runtime' }
    ]
  },
  {
    title: 'Buying Guides',
    description: 'Comprehensive guides to help you choose the right products',
    icon: BookOpen,
    guides: [
      { title: 'How to Choose a Solar Generator', href: '/guides/how-to-choose' },
      { title: 'Best Solar Generators 2026', href: '/guides/best-solar-generators-2026' },
      { title: 'Best Portable Power Stations', href: '/guides/best-portable-power-stations' },
      { title: 'Best Battery Backup Systems', href: '/guides/best-battery-backup-systems' }
    ]
  },
  {
    title: 'How-To Guides',
    description: 'Step-by-step tutorials for setup and installation',
    icon: Wrench,
    guides: [
      { title: 'How to Wire a Solar System', href: '/guides/how-to-wire-solar-system' },
      { title: 'How to Install Solar Panels', href: '/guides/how-to-install-solar-panels' }
    ]
  },
  {
    title: 'Installation & Safety',
    description: 'Cables, fuses, maintenance and troubleshooting',
    icon: ShieldCheck,
    guides: []
  },
  {
    title: 'Emergency Preparedness',
    description: 'Plan for power outages and emergencies',
    icon: Shield,
    guides: [
      { title: 'Emergency Power Setup', href: '/guides/emergency-power-setup' },
      { title: 'Blackout Survival Guide', href: '/guides/blackout-survival-guide' },
      { title: 'Medical Device Power', href: '/guides/medical-device-power' }
    ]
  },
  {
    title: 'Van Life & RV',
    description: 'Power solutions for mobile living',
    icon: Caravan,
    guides: [
      { title: 'Van Life Solar Sizing', href: '/guides/van-life-solar-sizing' },
      { title: 'RV Power Systems', href: '/guides/rv-power-systems' },
      { title: 'Camping Power Solutions', href: '/guides/camping-power-solutions' }
    ]
  },
  {
    title: 'Home & Off-Grid',
    description: 'Complete home power solutions',
    icon: Home,
    guides: [
      { title: 'Complete Off-Grid Living Guide', href: '/guides/complete-off-grid-living-guide' },
      { title: 'Home Backup Systems', href: '/guides/home-backup-systems' },
      { title: 'Whole Home Solar', href: '/guides/whole-home-solar' }
    ]
  },
  {
    title: 'Calculators & Tools',
    description: 'Interactive tools to help you plan your system',
    icon: Calculator,
    guides: [
      { title: 'Solar Sizing Calculator', href: '/calculators/solar-sizing' },
      { title: 'Battery Runtime Calculator', href: '/calculators/battery-runtime' },
      { title: 'Off-Grid Budget Calculator', href: '/calculators/off-grid-budget' },
      { title: 'All Calculators', href: '/calculators' }
    ]
  }
]

const guideCategories = handBuiltCategories.map(c => ({
  ...c,
  guides: [...dataGuides.filter(g => g.category === c.title).map(g => ({ title: g.title, href: g.path })), ...c.guides]
}))

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Guides</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Expert Guides</h1>
        <p className="text-gray-600">
          Comprehensive tutorials, buying guides, and expert advice for all your off-grid power needs.
        </p>
      </div>

      {/* Guide Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideCategories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.title} className="ebay-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.guides.map(guide => (
                  <li key={guide.href}>
                    <Link href={guide.href} className="text-sm text-blue-600 hover:underline">
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Featured Guide */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Get Started with Our Comprehensive Buying Guide
            </h2>
            <p className="text-gray-600">
              Everything you need to know before purchasing your first solar generator.
            </p>
          </div>
          <Link href="/guides/how-to-choose" className="ebay-btn-primary">
            Read the Guide
          </Link>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 ebay-card p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Stay Updated with New Guides</h2>
        <p className="text-gray-600 mb-4">Get the latest guides, deals, and product recommendations.</p>
        <form className="max-w-md mx-auto flex space-x-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="ebay-btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}