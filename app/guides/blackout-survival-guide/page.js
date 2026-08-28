'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Caravan, Check, X, Zap, Battery, Sun, Info, AlertTriangle, ArrowRight, Calendar, Clock, Wrench, Lightbulb, Refrigerator, Laptop, Phone, Fan } from 'lucide-react'

export default function VanLifeSolarSizingGuide() {
  const [vanSize, setVanSize] = useState('medium')
  const [hasFridge, setHasFridge] = useState(true)
  const [hasAC, setHasAC] = useState(false)

  const vanSizes = {
    small: { label: 'Small Van (Promaster City)', dailyUsage: 1500, appliances: 'Minimal setup' },
    medium: { label: 'Medium Van (Sprinter)', dailyUsage: 3000, appliances: 'Standard setup' },
    large: { label: 'Large Van (Transit)', dailyUsage: 5000, appliances: 'Full setup' }
  }

  const appliances = [
    { name: 'Refrigerator (12V)', watts: 45, hours: 24, dailyWh: 1080, icon: Refrigerator },
    { name: 'LED Lights (4x)', watts: 20, hours: 6, dailyWh: 120, icon: Lightbulb },
    { name: 'Laptop', watts: 65, hours: 4, dailyWh: 260, icon: Laptop },
    { name: 'Phone Charger', watts: 10, hours: 2, dailyWh: 20, icon: Phone },
    { name: 'Ceiling Fan', watts: 30, hours: 8, dailyWh: 240, icon: Fan },
    { name: 'Water Pump', watts: 60, hours: 1, dailyWh: 60, icon: Zap },
    { name: 'Wi-Fi Router', watts: 20, hours: 24, dailyWh: 480, icon: Zap },
    { name: 'Coffee Maker', watts: 800, hours: 0.5, dailyWh: 400, icon: Zap }
  ]

  const calculateSetup = () => {
    const selectedVan = vanSizes[vanSize]
    let totalDailyWh = selectedVan.dailyUsage
    if (hasAC) totalDailyWh += 3000
    if (hasFridge) totalDailyWh += 1080

    const systemSizeKW = totalDailyWh / (5 * 0.8) / 1000
    const batteryWh = totalDailyWh * 1.2 // 20% buffer
    const solarWatts = Math.ceil((totalDailyWh / 5) * 1.2) // 5 sun hours, 20% buffer
    
    return {
      totalDailyWh,
      systemSizeKW: systemSizeKW.toFixed(2),
      batteryWh: Math.round(batteryWh),
      solarWatts,
      recommendedBatteries: Math.ceil(batteryWh / 2048),
      recommendedPanels: Math.ceil(solarWatts / 200)
    }
  }

  const results = calculateSetup()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Van Life Solar Sizing</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">Van Life</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Size a Solar System for Van Life
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            12 min read
          </span>
        </div>
      </div>

      {/* Interactive Sizing Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Van Solar Sizing Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Van Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Van Size</label>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(vanSizes).map(([size, data]) => (
                  <button
                    key={size}
                    onClick={() => setVanSize(size)}
                    className={`p-3 border rounded-lg text-left ${
                      vanSize === size
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{data.label}</div>
                    <div className="text-sm text-gray-500">{data.appliances}</div>
                    <div className="text-sm text-blue-600 font-medium mt-1">{data.dailyUsage} Wh/day</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={hasFridge}
                  onChange={(e) => setHasFridge(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">12V Refrigerator</div>
                  <div className="text-xs text-gray-500">Adds 1,080 Wh/day</div>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={hasAC}
                  onChange={(e) => setHasAC(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">Portable AC</div>
                  <div className="text-xs text-gray-500">Adds 3,000 Wh/day</div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Requirements</h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded p-4 text-center">
                <div className="text-sm text-gray-500">Total Daily Usage</div>
                <div className="text-3xl font-bold text-blue-600">
                  {results.totalDailyWh.toLocaleString()} Wh
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-500">Battery Bank</div>
                  <div className="text-lg font-semibold">{results.batteryWh.toLocaleString()} Wh</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-500">Solar Panels</div>
                  <div className="text-lg font-semibold">{results.solarWatts} W</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-500">Batteries (2048Wh)</div>
                  <div className="text-lg font-semibold">{results.recommendedBatteries}</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-500">Panels (200W)</div>
                  <div className="text-lg font-semibold">{results.recommendedPanels}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appliance Power Guide */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Van Life Appliance Power Guide</h2>
        <p className="text-gray-600 mb-4">
          Here's what typical van life appliances use:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Appliance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Watts</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Hours/Day</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Daily Wh</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map(appliance => (
                <tr key={appliance.name} className="border-t">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      <appliance.icon className="h-4 w-4 text-blue-600 mr-2" />
                      {appliance.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{appliance.watts}W</td>
                  <td className="px-4 py-3 text-sm">{appliance.hours}h</td>
                  <td className="px-4 py-3 text-sm font-semibold">{appliance.dailyWh}Wh</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      appliance.dailyWh > 500 ? 'bg-red-100 text-red-800' :
                      appliance.dailyWh > 200 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {appliance.dailyWh > 500 ? 'High' : appliance.dailyWh > 200 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Setup */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Van Life Setup</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Complete System Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { component: 'Solar Panels', detail: `${results.recommendedPanels} × 200W panels = ${results.recommendedPanels * 200}W`, href: '/products/solar-panels' },
                { component: 'Battery Bank', detail: `${results.recommendedBatteries} × 2,048Wh batteries = ${results.recommendedBatteries * 2048}Wh`, href: '/products/battery-backups' },
                { component: 'Inverter', detail: '2,000W pure sine wave inverter', href: '/products/accessories' },
                { component: 'Charge Controller', detail: 'MPPT charge controller (30A+)', href: '/products/accessories' },
                { component: 'Battery Monitor', detail: 'Bluetooth battery monitor', href: '/products/accessories' },
                { component: 'Wiring & Fuses', detail: '10AWG solar cable, fuse holder', href: '/products/accessories' }
              ].map(item => (
                <Link key={item.component} href={item.href} className="bg-gray-50 rounded p-3 hover:bg-blue-50 transition group">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{item.component}</div>
                      <div className="text-sm text-gray-500">{item.detail}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Always oversize your system by 20-30%. Cloudy days, seasonal changes, 
                and battery degradation will reduce your available power.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Build Your Van Solar System?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to get exact product recommendations for your van build.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/products/solar-panels" className="ebay-btn-secondary">
            Shop Solar Panels
          </Link>
        </div>
      </div>
    </div>
  )
}