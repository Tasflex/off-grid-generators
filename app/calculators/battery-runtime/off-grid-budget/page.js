'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wallet, TrendingUp, Info, Calculator } from 'lucide-react'
import { calculateBudget } from '../../../lib/calculators'
import { toast } from 'react-hot-toast'

export default function OffGridBudgetCalculator() {
  const [dailyLoad, setDailyLoad] = useState(3000)
  const [backupDays, setBackupDays] = useState(3)
  const [results, setResults] = useState(null)

  const loadOptions = [
    { label: 'Minimal Setup (Phone + Laptop)', value: 500 },
    { label: 'Basic Camping (Lights + Fridge)', value: 1500 },
    { label: 'RV / Van Life (Standard)', value: 3000 },
    { label: 'Home Emergency Backup', value: 5000 },
    { label: 'Full Off-Grid Home', value: 10000 },
  ]

  const daysOptions = [1, 2, 3, 5, 7, 14]

  const handleCalculate = () => {
    if (dailyLoad <= 0 || backupDays <= 0) {
      toast.error('Please enter valid values')
      return
    }

    const result = calculateBudget(dailyLoad, 1, backupDays)
    setResults(result)
  }

  const selectLoad = (value) => {
    setDailyLoad(value)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Off-Grid Budget</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Off-Grid Budget Calculator</h1>
        <p className="text-gray-600">
          Estimate the total cost of your off-grid solar system based on your energy needs and backup requirements.
        </p>
      </div>

      {/* Calculator Section */}
      <div className="ebay-card p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">System Requirements</h2>
            
            {/* Daily Load */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Energy Consumption (Wh/day)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={dailyLoad}
                  onChange={(e) => setDailyLoad(parseFloat(e.target.value))}
                  className="ebay-input"
                  min="1"
                />
                <span className="text-gray-500">Wh</span>
              </div>
              
              {/* Quick select */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Common setups:</p>
                <div className="space-y-2">
                  {loadOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => selectLoad(option.value)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg border ${
                        dailyLoad === option.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-blue-600'
                      }`}
                    >
                      {option.label} - {option.value} Wh/day
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Backup Days */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days of Backup Needed
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOptions.map(days => (
                  <button
                    key={days}
                    onClick={() => setBackupDays(days)}
                    className={`px-4 py-2 text-sm rounded-lg border ${
                      backupDays === days
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-blue-600'
                    }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="ebay-btn-primary w-full"
            >
              Calculate Budget
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cost Estimate</h2>
            
            {results ? (
              <div className="space-y-6">
                {/* Total Cost */}
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${results.estimatedCost.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Estimated Total Cost</div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Cost Breakdown</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Battery System</span>
                        <span className="font-semibold">${Math.round(results.breakdown.battery).toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 rounded-full h-2" style={{ width: `${(results.breakdown.battery / results.estimatedCost) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Solar Panels</span>
                        <span className="font-semibold">${Math.round(results.breakdown.solar).toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 rounded-full h-2" style={{ width: `${(results.breakdown.solar / results.estimatedCost) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Inverter</span>
                        <span className="font-semibold">${results.breakdown.inverter.toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 rounded-full h-2" style={{ width: `${(results.breakdown.inverter / results.estimatedCost) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Installation & Accessories</span>
                        <span className="font-semibold">${Math.round(results.breakdown.installation).toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 rounded-full h-2" style={{ width: `${(results.breakdown.installation / results.estimatedCost) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Size */}
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Total System Size Required:
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(results.totalRequiredWh).toLocaleString()} Wh
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Battery bank capacity needed
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
                  <strong>Budget Tip:</strong> Start with a smaller system and expand later. 
                  You can begin with just the battery and inverter, then add solar panels as your budget allows.
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">
                  Enter your requirements and click Calculate to see cost estimates
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cost-Saving Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          Cost-Saving Strategies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Phase Your Purchase</h3>
            <p className="text-sm text-gray-600">
              Start with a smaller portable power station for emergency backup, then add a larger 
              battery bank and solar panels later. This spreads the cost over time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Buy Refurbished</h3>
            <p className="text-sm text-gray-600">
              Many brands like EcoFlow and Bluetti sell certified refurbished units at 20-30% off. 
              These come with warranty coverage and are perfect for budget-conscious buyers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Monitor Deals</h3>
            <p className="text-sm text-gray-600">
              Black Friday, Prime Day, and seasonal sales can save you 15-25% on major purchases. 
              Sign up for our newsletter to get notified of upcoming deals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">DIY Installation</h3>
            <p className="text-sm text-gray-600">
              For permanent installations, doing the wiring yourself can save $500-$2000 in labor costs. 
              Our guides walk you through the process step-by-step.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-lg p-6 text-center mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Ready to Start Your Off-Grid Project?</h2>
        <p className="text-gray-600 mb-4">Get personalized recommendations based on your budget and needs.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/guides/how-to-choose" className="ebay-btn-secondary">
            Read Buying Guide
          </Link>
        </div>
      </div>

      {/* Related Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/calculators/solar-sizing" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Solar Sizing Calculator</h3>
          <p className="text-sm text-gray-600">Find the perfect solar generator for your needs</p>
        </Link>
        <Link href="/calculators/battery-runtime" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Battery Runtime Calculator</h3>
          <p className="text-sm text-gray-600">How long will your battery last?</p>
        </Link>
        <Link href="/calculators/solar-panel-layout" className="ebay-card p-4 hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-900 mb-1">Panel Layout Calculator</h3>
          <p className="text-sm text-gray-600">Plan your solar panel installation</p>
        </Link>
      </div>
    </div>
  )
}