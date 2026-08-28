'use client'

import Link from 'next/link'
import { Caravan, Zap, Battery, Sun, Check, X, ArrowRight, Calendar, Clock, Info, Wrench, AlertTriangle } from 'lucide-react'

export default function RVSolarInstallationGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">RV Solar Installation</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">RV</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RV Solar Installation: Step-by-Step Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            November 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            14 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-600">
          Installing solar panels on your RV is one of the best upgrades you can make. It gives you 
          freedom to camp anywhere without worrying about battery power. This guide covers everything 
          from choosing components to final installation.
        </p>
      </div>

      {/* What You Need */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Components You'll Need</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Solar panels (200-400W)',
            'Charge controller (MPPT 30A+)',
            'Battery bank (200Ah+)',
            'Inverter (1000W+)',
            'Solar cable (10AWG)',
            'MC4 connectors',
            'Mounting brackets',
            'Fuse holder',
            'Breaker',
            'Heat shrink tubing',
            'Cable lugs',
            'Zip ties'
          ].map(item => (
            <div key={item} className="bg-gray-50 rounded p-2 text-sm">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step */}
      <div className="space-y-6 mb-8">
        {[
          {
            step: 1,
            title: 'Plan Your Layout',
            description: 'Determine where to mount panels on your RV roof. Avoid AC units, vents, and other obstructions.',
            details: 'Measure available roof space and plan panel placement for maximum sun exposure.'
          },
          {
            step: 2,
            title: 'Mount Solar Panels',
            description: 'Attach mounting brackets and secure panels to your RV roof.',
            details: 'Use appropriate sealant to prevent leaks. Leave space for airflow under panels.'
          },
          {
            step: 3,
            title: 'Run Cables Inside',
            description: 'Route solar cables from the roof to your battery compartment.',
            details: 'Use entry gland or existing wire runs. Seal all entry points.'
          },
          {
            step: 4,
            title: 'Install Charge Controller',
            description: 'Mount the charge controller near your batteries.',
            details: 'Connect battery first, then solar panels.'
          },
          {
            step: 5,
            title: 'Connect Batteries',
            description: 'Wire your battery bank based on your voltage requirements.',
            details: 'Use proper gauge wire and add fuses for protection.'
          },
          {
            step: 6,
            title: 'Install Inverter',
            description: 'Mount the inverter near your battery bank.',
            details: 'Connect to battery using heavy gauge cable.'
          },
          {
            step: 7,
            title: 'Test Everything',
            description: 'Verify all connections and test the system.',
            details: 'Check voltage, current, and make sure everything charges properly.'
          }
        ].map(step => (
          <div key={step.step} className="ebay-card p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                {step.step}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{step.title}</h2>
            </div>
            <p className="text-gray-600 mb-2">{step.description}</p>
            <div className="bg-gray-50 rounded p-3 text-sm">
              <span className="font-medium text-gray-700">Details: </span>
              <span className="text-gray-600">{step.details}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Wiring Diagram Link */}
      <div className="ebay-card p-6 mb-8 bg-blue-50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Need Wiring Help?</h2>
        <p className="text-gray-600 mb-3">Check our detailed wiring diagrams for RV systems.</p>
        <div className="flex gap-3">
          <Link href="/wiring-diagrams/12v-system" className="ebay-btn-primary flex-1 text-center">
            View 12V Wiring Diagram
          </Link>
          <Link href="/guides/how-to-wire-solar-system" className="ebay-btn-secondary flex-1 text-center">
            Read Wiring Guide
          </Link>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended RV Solar Kit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Renogy 200W Panel', price: '$179', href: '/products/renogy-200w-solar-panel' },
            { name: 'Bluetti AC200MAX', price: '$1,099', href: '/products/bluetti-ac200max' },
            { name: 'Renogy MPPT 30A', price: '$129', href: '/products/renogy-mppt-30a' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Safety Warning</h2>
            <p className="text-sm text-red-700">
              Working with electricity carries risks. Always disconnect power before working on your system. 
              If you're unsure about any step, consult a professional electrician.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}