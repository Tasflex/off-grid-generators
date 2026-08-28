'use client'

import Link from 'next/link'
import { AlertTriangle, Check, X, Zap, Battery, Shield, ArrowRight, Calendar, Clock, Info, Home, Phone, Refrigerator, Heart } from 'lucide-react'

export default function BlackoutEmergencyPowerPlan() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Blackout Emergency Plan</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Emergency</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Prepare for a Blackout: Complete Emergency Power Plan
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            8 min read
          </span>
        </div>
      </div>

      {/* Why Blackouts Happen */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-start mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Why Blackouts Are Increasing</h2>
            <p className="text-gray-600">
              Extreme weather events, aging infrastructure, and increasing demand are making power outages 
              more frequent and longer. The average American experiences 6+ hours of power interruption 
              per year.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Appliances */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Critical Appliances to Power</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Refrigerator', watts: 150, dailyWh: 1800, icon: Refrigerator },
            { name: 'Freezer', watts: 100, dailyWh: 1200, icon: Refrigerator },
            { name: 'Medical Equipment (CPAP)', watts: 60, dailyWh: 480, icon: Heart },
            { name: 'Wi-Fi Router', watts: 20, dailyWh: 480, icon: Phone },
            { name: 'Phone Charger', watts: 10, dailyWh: 20, icon: Phone },
            { name: 'LED Lighting', watts: 30, dailyWh: 150, icon: Home }
          ].map(item => (
            <div key={item.name} className="bg-gray-50 rounded p-3">
              <div className="flex items-center mb-2">
                <item.icon className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">{item.name}</span>
              </div>
              <div className="text-sm text-gray-500">
                {item.watts}W | {item.dailyWh}Wh/day
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Power Requirements */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Calculate Your Power Needs</h2>
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Sample Calculation</div>
            <div className="text-2xl font-bold text-gray-900">4,130 Wh/day</div>
            <div className="text-sm text-gray-500">+ 20% buffer = 4,956 Wh</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary flex-1 text-center">
            Calculate My Needs
          </Link>
          <Link href="/guides/emergency-power-setup" className="ebay-btn-secondary flex-1 text-center">
            Emergency Setup Guide
          </Link>
        </div>
      </div>

      {/* Step-by-Step Plan */}
      <div className="space-y-6 mb-8">
        {[
          {
            step: 1,
            title: 'Identify Critical Appliances',
            description: 'List appliances you must keep running during an outage.',
            details: 'Refrigerator, freezer, medical equipment, Wi-Fi, phone chargers, lighting.'
          },
          {
            step: 2,
            title: 'Calculate Power Requirements',
            description: 'Determine your daily watt-hour consumption.',
            details: 'Use our calculator for precise calculations.'
          },
          {
            step: 3,
            title: 'Choose Backup Power',
            description: 'Select a solar generator, battery backup, or both.',
            details: 'Consider how many days of backup you need.'
          },
          {
            step: 4,
            title: 'Set Up Your System',
            description: 'Position and charge your backup power system.',
            details: 'Fully charge and test before you need it.'
          },
          {
            step: 5,
            title: 'Practice Your Plan',
            description: 'Test your setup and train your family.',
            details: 'Conduct a monthly drill to ensure everything works.'
          }
        ].map(step => (
          <div key={step.step} className="ebay-card p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
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

      {/* Recommended Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Backup Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow Delta 2', price: '$899', capacity: '1,024Wh', href: '/products/ecoflow-delta-2' },
            { name: 'Bluetti AC200MAX', price: '$1,099', capacity: '2,048Wh', href: '/products/bluetti-ac200max' },
            { name: 'EcoFlow Delta Pro', price: '$1,999', capacity: '3,600Wh', href: '/products/ecoflow-delta-pro' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.capacity}</div>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Checklist */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Checklist</h2>
        <div className="space-y-2">
          {[
            'Charge all devices before a storm hits',
            'Have flashlights and batteries ready',
            'Keep non-perishable food stocked',
            'Fill water containers',
            'Store important documents',
            'Keep backup power system charged',
            'Know how to manually open your garage door'
          ].map(item => (
            <div key={item} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Be Prepared for the Next Blackout
        </h2>
        <p className="text-gray-600 mb-4">
          Don't wait until you're in the dark. Set up your backup power today.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate My Needs
          </Link>
          <Link href="/guides/emergency-power-setup" className="ebay-btn-secondary">
            Read Setup Guide
          </Link>
        </div>
      </div>
    </div>
  )
}