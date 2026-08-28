'use client'

import Link from 'next/link'
import { Zap, Battery, Sun, Home, Caravan, ArrowRight, Layout, Wrench, Info } from 'lucide-react'

const diagramCategories = [
  {
    title: 'Off-Grid System Diagrams',
    description: 'Complete solar power system wiring diagrams',
    icon: Sun,
    color: 'bg-yellow-100 text-yellow-600',
    diagrams: [
      { title: 'Basic Off-Grid System', href: '/wiring-diagrams/basic-off-grid', description: 'Solar + Battery + Inverter' },
      { title: '12V System Wiring', href: '/wiring-diagrams/12v-system', description: 'Van life & camping' },
      { title: '24V System Wiring', href: '/wiring-diagrams/24v-system', description: 'Small homes & RVs' },
      { title: '48V System Wiring', href: '/wiring-diagrams/48v-system', description: 'Whole home systems' }
    ]
  },
  {
    title: 'Solar Panel Wiring',
    description: 'How to connect your solar panels correctly',
    icon: Zap,
    color: 'bg-blue-100 text-blue-600',
    diagrams: [
      { title: 'Series Wiring', href: '/wiring-diagrams/panel-series', description: 'Increase voltage' },
      { title: 'Parallel Wiring', href: '/wiring-diagrams/panel-parallel', description: 'Increase current' },
      { title: 'Series-Parallel Combo', href: '/wiring-diagrams/panel-series-parallel', description: 'Balance voltage & current' }
    ]
  },
  {
    title: 'Component Connections',
    description: 'How to connect specific components',
    icon: Battery,
    color: 'bg-green-100 text-green-600',
    diagrams: [
      { title: 'Battery Bank Wiring', href: '/wiring-diagrams/battery-bank', description: 'Series vs parallel batteries' },
      { title: 'Inverter Connection', href: '/wiring-diagrams/inverter-connection', description: 'DC to AC conversion' },
      { title: 'Charge Controller Setup', href: '/wiring-diagrams/charge-controller', description: 'MPPT & PWM controllers' }
    ]
  }
]

export default function WiringDiagramsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Wiring Diagrams</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">DIY Resources</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Wiring Diagrams</h1>
        <p className="text-gray-600">
          Step-by-step wiring diagrams for all your solar power needs. From basic setups to whole-home systems.
        </p>
      </div>

      {/* Diagram Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {diagramCategories.map(category => {
          const Icon = category.icon
          return (
            <div key={category.title} className="ebay-card p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 ${category.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-3">
                {category.diagrams.map(diagram => (
                  <Link key={diagram.href} href={diagram.href} className="group block bg-gray-50 rounded p-3 hover:bg-blue-50 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">{diagram.title}</div>
                        <div className="text-xs text-gray-500">{diagram.description}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Safety Warning</h2>
            <p className="text-sm text-red-700">
              Always follow electrical codes and safety guidelines when working with electricity. 
              If you're unsure about any step, consult a licensed electrician. Never work on live circuits.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Help Sizing Your System?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine the exact components you need before wiring.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/calculators/solar-panel-layout" className="ebay-btn-secondary">
            Panel Layout Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}