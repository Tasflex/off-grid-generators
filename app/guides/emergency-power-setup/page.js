'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Check, X, AlertTriangle, Info, ArrowRight, Home, Zap, Battery, Clock, Calendar, Lightbulb, Phone, Refrigerator, Wifi, Heart } from 'lucide-react'

export default function EmergencyPowerSetupGuide() {
  const [activeStep, setActiveStep] = useState(1)
  const [showChecklist, setShowChecklist] = useState(false)

  const steps = [
    {
      number: 1,
      title: 'Assess Your Critical Needs',
      duration: '30 mins',
      icon: Home,
      description: 'Identify which appliances are essential during an outage'
    },
    {
      number: 2,
      title: 'Calculate Your Power Requirements',
      duration: '15 mins',
      icon: Zap,
      description: 'Use our calculator to determine your exact watt-hour needs'
    },
    {
      number: 3,
      title: 'Choose the Right Backup System',
      duration: '1-2 hours',
      icon: Battery,
      description: 'Select between portable, home backup, or whole-home systems'
    },
    {
      number: 4,
      title: 'Set Up Your System',
      duration: '2-4 hours',
      icon: Check,
      description: 'Position, charge, and test your backup power system'
    },
    {
      number: 5,
      title: 'Create Your Emergency Plan',
      duration: '1 hour',
      icon: Shield,
      description: 'Document procedures and train your family'
    }
  ]

  const criticalAppliances = [
    { name: 'Refrigerator', watts: 150, priority: 'Critical', icon: Refrigerator, dailyWh: 1800 },
    { name: 'Freezer', watts: 100, priority: 'Critical', icon: Refrigerator, dailyWh: 1200 },
    { name: 'Medical Equipment (CPAP)', watts: 60, priority: 'Critical', icon: Heart, dailyWh: 480 },
    { name: 'Wi-Fi Router', watts: 20, priority: 'Important', icon: Wifi, dailyWh: 480 },
    { name: 'Phone Charger', watts: 10, priority: 'Important', icon: Phone, dailyWh: 20 },
    { name: 'LED Lighting', watts: 30, priority: 'Important', icon: Lightbulb, dailyWh: 150 },
    { name: 'TV', watts: 100, priority: 'Nice to Have', icon: Zap, dailyWh: 400 },
    { name: 'Microwave', watts: 1000, priority: 'Nice to Have', icon: Zap, dailyWh: 500 }
  ]

  const emergencyChecklist = [
    'Check your battery level weekly',
    'Store generator in a cool, dry place',
    'Test your system monthly',
    'Keep solar panels clean and unobstructed',
    'Have backup cables and adapters',
    'Keep a manual charger for phones',
    'Document your setup with photos',
    'Inform family members of the plan',
    'Have flashlights and batteries ready',
    'Keep non-perishable food stocked'
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Emergency Power Setup</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Emergency Preparedness</span>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">Step-by-Step</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Set Up Emergency Power: Complete Guide
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            15 min read
          </span>
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Why Emergency Power Matters</h3>
            <p className="text-sm text-red-700">
              Power outages are becoming more frequent and longer-lasting. The average American experiences 
              approximately 6 hours of power interruption per year. Having backup power can protect your 
              food, medications, and keep your home safe during emergencies.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-6 mb-8">
        {/* Step 1 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
            <h2 className="text-xl font-bold text-gray-900">Assess Your Critical Needs</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            The first step is identifying which appliances are essential. Not everything needs to run during 
            an outage. Focus on what keeps your home safe and comfortable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalAppliances.map(appliance => (
              <div key={appliance.name} className="bg-gray-50 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <appliance.icon className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-gray-900">{appliance.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    appliance.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                    appliance.priority === 'Important' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {appliance.priority}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{appliance.watts}W</span>
                  <span>{appliance.dailyWh}Wh/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
            <h2 className="text-xl font-bold text-gray-900">Calculate Your Power Requirements</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            Once you know your critical appliances, calculate your total daily energy needs. Our calculator 
            does this automatically.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Sample Calculation:</h3>
            <div className="bg-white rounded p-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>Refrigerator: 1,800 Wh</div>
                <div>Freezer: 1,200 Wh</div>
                <div>Wi-Fi: 480 Wh</div>
                <div>Phone: 20 Wh</div>
                <div>Lights: 150 Wh</div>
                <div>CPAP: 480 Wh</div>
                <div className="font-bold border-t pt-2">Total: 4,130 Wh</div>
                <div className="font-bold border-t pt-2">With 20% buffer: 4,956 Wh</div>
              </div>
            </div>
          </div>

          <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
            Calculate My Power Needs
          </Link>
        </div>

        {/* Step 3 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
            <h2 className="text-xl font-bold text-gray-900">Choose the Right Backup System</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Portable Power Station',
                capacity: '500-2000 Wh',
                best: 'Small appliances, phones, CPAP',
                price: '$200 - $1,500',
                icon: Battery,
                examples: 'Jackery 1000, EcoFlow Delta 2'
              },
              {
                title: 'Home Backup System',
                capacity: '2000-5000 Wh',
                best: 'Refrigerator, freezer, essential appliances',
                price: '$1,000 - $3,000',
                icon: Home,
                examples: 'Bluetti AC200MAX, EcoFlow Delta Pro'
              },
              {
                title: 'Whole Home System',
                capacity: '5000+ Wh',
                best: 'All essential appliances + comfort items',
                price: '$3,000 - $10,000+',
                icon: Zap,
                examples: 'Multiple Delta Pros, Tesla Powerwall'
              }
            ].map(option => (
              <div key={option.title} className="border rounded p-4">
                <option.icon className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                <div className="text-sm text-blue-600 font-medium mb-2">{option.capacity}</div>
                <p className="text-sm text-gray-600 mb-2">{option.best}</p>
                <div className="text-sm font-semibold text-gray-900 mb-2">{option.price}</div>
                <div className="text-xs text-gray-500">{option.examples}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">4</div>
            <h2 className="text-xl font-bold text-gray-900">Set Up Your System</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Setup Checklist:</h3>
              <ul className="space-y-2">
                {[
                  'Position generator in a dry, ventilated area',
                  'Fully charge the battery (charge to 100% first)',
                  'Connect essential appliances one at a time',
                  'Test each appliance to verify operation',
                  'Label your connections for quick reference',
                  'Document your setup with photos',
                  'Practice switching to backup power'
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="ebay-card p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">5</div>
            <h2 className="text-xl font-bold text-gray-900">Create Your Emergency Plan</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            Having backup power is only half the battle. A documented plan ensures your family knows what to do.
          </p>

          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Emergency Checklist:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {emergencyChecklist.map(item => (
                <div key={item} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Pro Tip:</strong> Print this checklist and keep it with your backup power system. 
                Review it monthly with your family.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Checklist */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Emergency Power Checklist</h2>
          <button
            onClick={() => setShowChecklist(!showChecklist)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {showChecklist ? 'Hide' : 'Show'} Interactive Checklist
          </button>
        </div>
        
        {showChecklist && (
          <div className="bg-gray-50 rounded p-4">
            {emergencyChecklist.map(item => (
              <label key={item} className="flex items-center space-x-3 py-2 hover:bg-white rounded px-2">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Products for Emergency Backup</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow Delta 2', price: '$899', capacity: '1,024Wh', type: 'Home Backup', href: '/products/ecoflow-delta-2' },
            { name: 'Bluetti AC200MAX', price: '$1,099', capacity: '2,048Wh', type: 'Home Backup', href: '/products/bluetti-ac200max' },
            { name: 'Jackery Explorer 1000', price: '$799', capacity: '1,002Wh', type: 'Portable', href: '/products/jackery-explorer-1000' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.capacity} | {product.type}</div>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Get Your Exact Power Requirements
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine the perfect backup system for your home.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate My Needs
          </Link>
          <Link href="/calculators/battery-runtime" className="ebay-btn-secondary">
            Check Battery Runtime
          </Link>
        </div>
      </div>
    </div>
  )
}