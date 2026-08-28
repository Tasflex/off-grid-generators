'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Sun, Calculator, Home, Zap, Battery, TrendingUp, Lightbulb, Refrigerator, Laptop } from 'lucide-react'

export default function HowManySolarPanelsGuide() {
  const [dailyUsage, setDailyUsage] = useState(5000)
  const [panelWattage, setPanelWattage] = useState(200)
  const [peakSunHours, setPeakSunHours] = useState(5)
  const [showResults, setShowResults] = useState(false)

  const commonSetups = [
    { name: 'Small RV / Van Life', wh: 3000, panel: 200, sunHours: 5 },
    { name: 'Home Emergency Backup', wh: 5000, panel: 200, sunHours: 5 },
    { name: 'Full Off-Grid Home', wh: 15000, panel: 400, sunHours: 6 },
    { name: 'Large Home Backup', wh: 10000, panel: 400, sunHours: 5 }
  ]

  const calculatePanels = () => {
    if (dailyUsage <= 0 || panelWattage <= 0 || peakSunHours <= 0) return null
    
    // Calculate daily energy needed from panels
    const dailyEnergyNeeded = dailyUsage * 1.2 // Add 20% buffer for inefficiency
    const dailyProductionPerPanel = panelWattage * peakSunHours * 0.85 // 85% efficiency
    const numberOfPanels = Math.ceil(dailyEnergyNeeded / dailyProductionPerPanel)
    const totalPower = numberOfPanels * panelWattage
    const annualProduction = totalPower * peakSunHours * 365 / 1000 // kWh/year
    
    return {
      numberOfPanels,
      totalPower,
      annualProduction: annualProduction.toFixed(0),
      dailyEnergyNeeded: dailyEnergyNeeded.toFixed(0),
      dailyProductionPerPanel: dailyProductionPerPanel.toFixed(0)
    }
  }

  const results = calculatePanels()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How Many Solar Panels Do I Need</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Educational</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Calculator</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How Many Solar Panels Do I Need?
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Calculate the exact number of solar panels needed for your home, RV, or off-grid system. 
          Use our interactive calculator to get instant results.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            10 min read
          </span>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Panel Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Energy Usage (Wh/day)
              </label>
              <input
                type="number"
                value={dailyUsage}
                onChange={(e) => setDailyUsage(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Estimate your daily energy consumption in Watt-hours</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Wattage
              </label>
              <select
                value={panelWattage}
                onChange={(e) => setPanelWattage(parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={100}>100W (Small)</option>
                <option value={200}>200W (Standard)</option>
                <option value={300}>300W (Large)</option>
                <option value={400}>400W (Premium)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peak Sun Hours Per Day
              </label>
              <select
                value={peakSunHours}
                onChange={(e) => setPeakSunHours(parseFloat(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={3}>3 hours (Cloudy / Winter)</option>
                <option value={4}>4 hours (Average)</option>
                <option value={5}>5 hours (Sunny)</option>
                <option value={6}>6 hours (Very Sunny)</option>
              </select>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Or use a common setup:</p>
              <div className="space-y-2">
                {commonSetups.map((setup, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDailyUsage(setup.wh)
                      setPanelWattage(setup.panel)
                      setPeakSunHours(setup.sunHours)
                    }}
                    className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-blue-100 transition text-sm"
                  >
                    <span className="font-medium">{setup.name}</span>
                    <span className="text-gray-500 ml-2">
                      {setup.wh}Wh/day, {setup.panel}W panels
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
            
            {results && dailyUsage > 0 && panelWattage > 0 && peakSunHours > 0 ? (
              <div className="space-y-6">
                <div className="bg-white rounded p-6 text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {results.numberOfPanels}
                  </div>
                  <div className="text-gray-600">solar panels needed</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {results.totalPower}W total capacity
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Energy Needed</span>
                      <span className="font-semibold">{results.dailyEnergyNeeded} Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Per Panel Daily Production</span>
                      <span className="font-semibold">{results.dailyProductionPerPanel} Wh</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-gray-600">Annual Production</span>
                      <span className="font-bold text-blue-600">{results.annualProduction} kWh/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Panels Needed</span>
                      <span className="font-bold text-blue-600">{results.numberOfPanels}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <div className="flex items-start">
                    <Info className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                    <p className="text-xs text-yellow-700">
                      Includes 20% buffer for cloudy days and system inefficiencies. 
                      For winter months, consider adding 25-30% more panels.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Sun className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Enter values above to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* The Formula */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        <div className="bg-gray-50 rounded p-6 mb-4">
          <div className="text-center font-mono text-lg">
            <div className="text-gray-500 text-sm mb-2">Number of Panels =</div>
            <div className="font-bold text-blue-600 text-2xl">
              Daily Energy (Wh) × 1.2
            </div>
            <div className="text-2xl font-bold text-blue-600">÷</div>
            <div className="font-bold text-blue-600 text-2xl">
              Panel Wattage (W) × Sun Hours × 0.85
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Daily Energy',
              description: 'Your total daily consumption in Wh',
              example: '5,000 Wh'
            },
            {
              label: 'Panel Wattage',
              description: 'Each panel\'s power output',
              example: '200W'
            },
            {
              label: 'Peak Sun Hours',
              description: 'Average hours of usable sunlight',
              example: '5 hours'
            },
            {
              label: 'Efficiency Factor',
              description: '85% for system losses',
              example: '0.85'
            }
          ].map(item => (
            <div key={item.label} className="border rounded p-3 text-center">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
              <p className="text-xs text-gray-600 mb-2">{item.description}</p>
              <div className="text-xs text-gray-500">{item.example}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Factors That Affect Solar Production */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors That Affect Solar Production</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              factor: 'Location & Sun Hours',
              description: 'Southern states get 5-6 hours, northern states get 3-4 hours',
              impact: 'High'
            },
            {
              factor: 'Panel Orientation',
              description: 'South-facing (north in Southern Hemisphere) is optimal',
              impact: 'High'
            },
            {
              factor: 'Tilt Angle',
              description: 'Latitude angle is optimal. Adjust 15° for winter/summer',
              impact: 'Medium'
            },
            {
              factor: 'Shading',
              description: 'Even partial shade can significantly reduce output',
              impact: 'High'
            },
            {
              factor: 'Panel Efficiency',
              description: 'Monocrystalline (20-22%) vs Polycrystalline (15-17%)',
              impact: 'Medium'
            },
            {
              factor: 'Temperature',
              description: 'Panels produce less in extreme heat (above 95°F)',
              impact: 'Low'
            }
          ].map(item => (
            <div key={item.factor} className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.factor}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.impact === 'High' ? 'bg-red-100 text-red-800' :
                  item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.impact} Impact
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Calculations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Calculations</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Scenario</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Daily Usage</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Panel Size</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Sun Hours</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Panels Needed</th>
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: 'Small RV/Van Life', usage: 3000, panel: 200, sunHours: 5, panels: 5 },
                { scenario: 'Home Emergency Backup', usage: 5000, panel: 200, sunHours: 5, panels: 8 },
                { scenario: 'Full Off-Grid Home', usage: 15000, panel: 400, sunHours: 6, panels: 9 },
                { scenario: 'Large Home Backup', usage: 10000, panel: 400, sunHours: 5, panels: 8 }
              ].map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{item.scenario}</td>
                  <td className="px-4 py-3 text-sm">{item.usage} Wh</td>
                  <td className="px-4 py-3 text-sm">{item.panel} W</td>
                  <td className="px-4 py-3 text-sm">{item.sunHours} h</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{item.panels}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I install solar panels myself?',
              a: 'Yes! DIY solar panel installation is possible for RV and small home systems. Follow our installation guide for step-by-step instructions.'
            },
            {
              q: 'How much roof space do I need?',
              a: 'Each 200W panel is about 15-18 sq ft. For 8 panels, you need 120-144 sq ft of suitable roof space.'
            },
            {
              q: 'Do I need a battery with solar panels?',
              a: 'For off-grid use, yes. For grid-tied systems, you can use net metering. For backup power, a battery is essential.'
            }
          ].map((faq, index) => (
            <div key={index} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Size Your Solar System?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our full solar sizing calculator for personalized recommendations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Solar Sizing Calculator
          </Link>
          <Link href="/products/solar-panels" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Shop Solar Panels
          </Link>
        </div>
      </div>
    </div>
  )
}