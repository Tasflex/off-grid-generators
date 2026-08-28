'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Home, Calendar, Clock, Zap, Battery, Calculator, Info, AlertTriangle, Check } from 'lucide-react'

export default function WhatSizeSolarGeneratorHouse() {
  const [houseSize, setHouseSize] = useState('medium')
  const [backupDays, setBackupDays] = useState(3)
  const [includeHVAC, setIncludeHVAC] = useState(false)

  const houseData = {
    small: {
      label: 'Small House (1,000 sq ft)',
      dailyEnergy: 5000,
      description: 'Small home, minimal appliances'
    },
    medium: {
      label: 'Medium House (2,000 sq ft)',
      dailyEnergy: 10000,
      description: 'Average home with standard appliances'
    },
    large: {
      label: 'Large House (3,000+ sq ft)',
      dailyEnergy: 18000,
      description: 'Large home with many appliances'
    }
  }

  const calculateRequirements = () => {
    const baseLoad = houseData[houseSize].dailyEnergy
    const hvacLoad = includeHVAC ? baseLoad * 0.5 : 0
    const totalDailyEnergy = baseLoad + hvacLoad
    const totalRequired = totalDailyEnergy * backupDays
    
    return {
      baseLoad: baseLoad,
      hvacLoad: hvacLoad,
      totalDailyEnergy: totalDailyEnergy,
      totalRequired: totalRequired,
      recommendedBatteries: Math.ceil(totalRequired / 3600),
      recommendedGenerators: Math.ceil(totalRequired / 3600)
    }
  }

  const requirements = calculateRequirements()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Solar Generator Sizing for Homes</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Home Backup</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          What Size Solar Generator Do I Need for My House?
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Mike Chen</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 5, 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            8 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-start mb-4">
          <Home className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
          <p className="text-gray-600">
            Choosing the right solar generator for your home is critical for emergency preparedness. 
            The wrong size could leave you powerless during a critical outage. This guide breaks down 
            the exact calculations you need to make the right choice.
          </p>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Sizing Calculator</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">House Size</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(houseData).map(([size, data]) => (
                <button
                  key={size}
                  onClick={() => setHouseSize(size)}
                  className={`p-4 rounded-lg border text-left transition ${
                    houseSize === size
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="font-semibold">{data.label}</div>
                  <div className="text-sm opacity-75">{data.description}</div>
                  <div className="text-sm font-medium mt-2">{data.dailyEnergy.toLocaleString()} Wh/day</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Days of Backup Needed</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 5, 7].map(days => (
                <button
                  key={days}
                  onClick={() => setBackupDays(days)}
                  className={`px-4 py-2 rounded-lg border ${
                    backupDays === days
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {days} {days === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeHVAC}
                onChange={(e) => setIncludeHVAC(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">Include HVAC (Heating/Cooling)</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              HVAC systems can double your energy consumption. Only check if you need to run AC or heating.
            </p>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded p-3">
                <div className="text-sm text-gray-500">Base Load</div>
                <div className="text-xl font-bold text-gray-900">{requirements.baseLoad.toLocaleString()} Wh/day</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="text-sm text-gray-500">HVAC Load (if included)</div>
                <div className="text-xl font-bold text-gray-900">{requirements.hvacLoad.toLocaleString()} Wh/day</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="text-sm text-gray-500">Total Daily Energy</div>
                <div className="text-xl font-bold text-blue-600">{requirements.totalDailyEnergy.toLocaleString()} Wh/day</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="text-sm text-gray-500">Total for {backupDays} Days</div>
                <div className="text-xl font-bold text-blue-600">{requirements.totalRequired.toLocaleString()} Wh</div>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Recommended Setup</h4>
              <p className="text-sm text-gray-600 mb-2">
                You need approximately <strong>{requirements.recommendedGenerators}</strong> EcoFlow Delta Pro 
                units (3,600Wh each) to meet your {backupDays}-day backup requirement.
              </p>
              <Link href="/products/solar-generators" className="text-blue-600 hover:underline text-sm font-medium">
                Shop Solar Generators →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Essential Appliances Guide */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Appliances & Their Power Needs</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Appliance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Running Watts</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Daily Energy</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {[
                { appliance: 'Refrigerator', watts: 150, energy: '1,800 Wh', priority: 'Essential' },
                { appliance: 'Freezer', watts: 100, energy: '1,200 Wh', priority: 'Essential' },
                { appliance: 'LED Lighting (5 bulbs)', watts: 30, energy: '150 Wh', priority: 'Essential' },
                { appliance: 'Wi-Fi Router', watts: 20, energy: '480 Wh', priority: 'High' },
                { appliance: 'Phone Charger', watts: 10, energy: '20 Wh', priority: 'High' },
                { appliance: 'Laptop', watts: 65, energy: '260 Wh', priority: 'High' },
                { appliance: 'Microwave', watts: 1000, energy: '500 Wh', priority: 'Medium' },
                { appliance: 'TV', watts: 100, energy: '400 Wh', priority: 'Medium' },
                { appliance: 'Coffee Maker', watts: 800, energy: '400 Wh', priority: 'Medium' },
                { appliance: 'Well Pump', watts: 750, energy: '1,500 Wh', priority: 'If applicable' },
                { appliance: 'CPAP Machine', watts: 60, energy: '480 Wh', priority: 'If applicable' },
                { appliance: 'Portable AC', watts: 500, energy: '3,000 Wh', priority: 'Optional' }
              ].map((row, index) => (
                <tr key={row.appliance} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm">{row.appliance}</td>
                  <td className="px-4 py-3 text-sm">{row.watts}W</td>
                  <td className="px-4 py-3 text-sm">{row.energy}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.priority === 'Essential' ? 'bg-red-100 text-red-800' :
                      row.priority === 'High' ? 'bg-yellow-100 text-yellow-800' :
                      row.priority === 'Medium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sizing Guide */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Determine Your Requirements</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Step 1: Calculate Your Daily Energy</h3>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600 mb-3">
                Add up the daily energy consumption of all appliances you need to power:
              </p>
              <div className="font-mono bg-white rounded p-3 text-sm">
                Daily Energy = (Watts × Hours Used) + (Watts × Hours Used) + ...
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Step 2: Add Safety Margin</h3>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600 mb-2">
                Add 20-30% buffer for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Surge power at startup</li>
                <li>Battery degradation over time</li>
                <li>Unexpected extended usage</li>
                <li>Cold weather performance reduction</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Step 3: Multiply by Backup Days</h3>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600 mb-3">
                Total Required = Daily Energy × Backup Days
              </p>
              <div className="bg-white rounded p-3 text-sm font-medium">
                Example: 5,000 Wh/day × 3 days = 15,000 Wh needed
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Step 4: Choose Your System</h3>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600 mb-3">
                Divide total by generator capacity to determine how many units you need:
              </p>
              <div className="bg-white rounded p-3 text-sm font-medium">
                15,000 Wh ÷ 3,600 Wh (Delta Pro) = 4.2 → 5 units (with margin)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Systems */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Systems by House Size</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              size: 'Small House',
              system: '1-2 EcoFlow Delta Pro',
              cost: '$2,000 - $4,000',
              description: 'Essential appliances only'
            },
            {
              size: 'Medium House',
              system: '3-4 EcoFlow Delta Pro',
              cost: '$6,000 - $8,000',
              description: 'Essential + comfort appliances'
            },
            {
              size: 'Large House',
              system: '5+ EcoFlow Delta Pro',
              cost: '$10,000+',
              description: 'Full home backup'
            }
          ].map(recommendation => (
            <div key={recommendation.size} className="border rounded-lg p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">{recommendation.size}</h3>
              <div className="text-blue-600 font-medium mb-2">{recommendation.system}</div>
              <div className="text-lg font-bold text-gray-900 mb-2">{recommendation.cost}</div>
              <p className="text-sm text-gray-600">{recommendation.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-6 text-center bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Get Your Exact Solar Generator Size
        </h2>
        <p className="text-gray-600 mb-4">
          Use our free solar sizing calculator for personalized recommendations.
        </p>
        <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-block">
          Use Solar Sizing Calculator
        </Link>
      </div>
    </div>
  )
}