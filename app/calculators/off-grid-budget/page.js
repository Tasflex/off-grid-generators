'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wallet, TrendingUp, Calculator, Info, AlertTriangle, Check, ArrowRight, Home, Caravan, Camp } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function OffGridBudgetCalculatorPage() {
  const [dailyLoad, setDailyLoad] = useState(3000)
  const [backupDays, setBackupDays] = useState(3)
  const [systemType, setSystemType] = useState('home')
  const [results, setResults] = useState(null)

  const loadOptions = [
    { label: 'Minimal Setup (Phone + Laptop)', value: 500 },
    { label: 'Basic Camping (Lights + Fridge)', value: 1500 },
    { label: 'RV / Van Life (Standard)', value: 3000 },
    { label: 'Home Emergency Backup', value: 5000 },
    { label: 'Full Off-Grid Home', value: 10000 }
  ]

  const daysOptions = [1, 2, 3, 5, 7, 14]

  const systemTypes = [
    { id: 'camping', label: 'Camping', icon: Camp, description: 'Weekend trips, 1-2 devices' },
    { id: 'vanlife', label: 'Van Life', icon: Caravan, description: 'Full-time mobile living' },
    { id: 'home', label: 'Home Backup', icon: Home, description: 'Emergency power for your house' }
  ]

  const calculate = () => {
    if (dailyLoad <= 0 || backupDays <= 0) {
      toast.error('Please enter valid values')
      return
    }

    const totalRequired = dailyLoad * backupDays
    const batteryCost = totalRequired * 0.5
    const solarCost = totalRequired * 0.3
    const inverterCost = systemType === 'home' ? 800 : systemType === 'vanlife' ? 500 : 300
    const installationCost = systemType === 'home' ? totalRequired * 0.1 : 0
    const totalCost = batteryCost + solarCost + inverterCost + installationCost

    setResults({
      totalRequired: Math.round(totalRequired),
      batteryCost: Math.round(batteryCost),
      solarCost: Math.round(solarCost),
      inverterCost,
      installationCost: Math.round(installationCost),
      totalCost: Math.round(totalCost),
      monthlySavings: calculateMonthlySavings(totalRequired, systemType)
    })
  }

  const calculateMonthlySavings = (totalWh, type) => {
    // Estimated savings from using solar vs traditional power
    const savingsPerDay = type === 'home' ? 5 : type === 'vanlife' ? 8 : 3
    return Math.round(savingsPerDay * 30)
  }

  return (
    <div className="max-w-7xl mx-auto">
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
          Estimate the total cost of your off-grid solar system based on your energy needs.
        </p>
      </div>

      {/* System Type Selection */}
      <div className="ebay-card p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Select Your Use Case</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {systemTypes.map(type => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => setSystemType(type.id)}
                className={`p-4 border rounded-lg text-left transition ${
                  systemType === type.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <Icon className="h-6 w-6 text-blue-600 mb-2" />
                <div className="font-semibold text-gray-900">{type.label}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Calculator */}
      <div className="ebay-card p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">System Requirements</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Energy Consumption (Wh/day)
              </label>
              <input
                type="number"
                value={dailyLoad}
                onChange={(e) => setDailyLoad(parseFloat(e.target.value))}
                className="ebay-input"
                min="100"
              />
              
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Common setups:</p>
                <div className="space-y-2">
                  {loadOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setDailyLoad(option.value)}
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
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculate} className="ebay-btn-primary w-full py-4">
              <Calculator className="inline h-5 w-5 mr-2" />
              Calculate Budget
            </button>
          </div>

          {/* Results */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cost Estimate</h2>
            
            {results ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${results.totalCost.toLocaleString()}
                  </div>
                  <div className="text-gray-600">Estimated Total Cost</div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Cost Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Battery System', amount: results.batteryCost, color: 'bg-blue-600' },
                      { label: 'Solar Panels', amount: results.solarCost, color: 'bg-yellow-500' },
                      { label: 'Inverter', amount: results.inverterCost, color: 'bg-green-600' },
                      { label: 'Installation', amount: results.installationCost, color: 'bg-purple-600' }
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-semibold">${item.amount.toLocaleString()}</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} rounded-full h-2`}
                            style={{ width: `${(item.amount / results.totalCost) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Total System Size Required:</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {results.totalRequired.toLocaleString()} Wh
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Battery bank capacity needed
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm font-semibold text-green-800">
                        Estimated Monthly Savings
                      </div>
                      <div className="text-lg font-bold text-green-700">
                        ${results.monthlySavings}/month
                      </div>
                    </div>
                  </div>
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

      {/* Cost Saving Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Cost-Saving Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Phase Your Purchase</h3>
            <p className="text-sm text-gray-600">
              Start with a smaller portable power station for emergency backup, then add a larger battery bank 
              and solar panels later. This spreads the cost over time.
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

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Ready to Start Your Off-Grid Project?
        </h2>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/guides/how-to-choose" className="ebay-btn-secondary">
            Read Buying Guide
          </Link>
        </div>
      </div>
    </div>
  )
}