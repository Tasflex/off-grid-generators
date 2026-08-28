'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Cpu, Calculator, Info, AlertTriangle, Check, ArrowRight, Sun, Battery, Zap } from 'lucide-react'
import { calculateChargeControllerSize, getRecommendedController } from '../../../lib/calculators'
import { toast } from 'react-hot-toast'

export default function ChargeControllerSizingPage() {
  const [solarArrayWatts, setSolarArrayWatts] = useState(400)
  const [batteryVoltage, setBatteryVoltage] = useState(12)
  const [batteryType, setBatteryType] = useState('lithium')
  const [systemType, setSystemType] = useState('pwm')
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const voltageOptions = [12, 24, 48]
  
  const batteryTypes = [
    { id: 'lithium', label: 'Lithium (LiFePO4)', description: 'Best for efficiency, 95%+ charge efficiency' },
    { id: 'leadacid', label: 'Lead Acid (AGM/Gel)', description: 'Traditional, 75-85% charge efficiency' },
    { id: 'flooded', label: 'Flooded Lead Acid', description: 'Budget option, requires maintenance' }
  ]

  const systemTypes = [
    { id: 'mppt', label: 'MPPT', description: 'Best efficiency (95-98%), handles higher voltage' },
    { id: 'pwm', label: 'PWM', description: 'Budget option (75-85%), less efficient' }
  ]

  const panelConfigs = [
    { label: '100W × 4', value: 400 },
    { label: '200W × 2', value: 400 },
    { label: '400W Panel', value: 400 },
    { label: '200W × 4', value: 800 },
    { label: '400W × 2', value: 800 },
    { label: '400W × 4', value: 1600 },
    { label: 'Custom', value: 0 }
  ]

  const calculate = () => {
    if (solarArrayWatts <= 0) {
      toast.error('Please enter a valid solar array wattage')
      return
    }

    const result = calculateChargeControllerSize(
      solarArrayWatts,
      batteryVoltage,
      batteryType,
      systemType
    )
    
    const recommendations = getRecommendedController(
      result.minAmps,
      result.recommendedAmps,
      result.systemType === 'mppt' ? 'mppt' : 'pwm',
      batteryVoltage
    )

    setResults({
      ...result,
      recommendations
    })
    setShowResults(true)
  }

  const applySolarConfig = (watts) => {
    if (watts > 0) {
      setSolarArrayWatts(watts)
    }
  }

  // Map product names to product IDs for linking
  const getProductIdFromName = (name) => {
    const productMap = {
      'Renogy 30A MPPT Charge Controller': 'renogy-mppt-30a',
      'Renogy 40A MPPT Charge Controller': 'renogy-mppt-40a',
      'Victron SmartSolar MPPT 100/50': 'victron-mppt-100-50',
      'EcoFlow MPPT Charge Controller': 'ecoflow-mppt-controller',
      'Renogy 30A PWM Charge Controller': 'renogy-pwm-30a'
    }
    return productMap[name] || null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Charge Controller Sizing</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Charge Controller Sizing Calculator</h1>
        <p className="text-gray-600">
          Find the right charge controller size for your solar panel array and battery bank.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Input Your System Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Solar Array Wattage */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solar Array Wattage (W)
                </label>
                <input
                  type="number"
                  value={solarArrayWatts}
                  onChange={(e) => setSolarArrayWatts(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="50"
                />
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Common configurations:</p>
                  <div className="flex flex-wrap gap-2">
                    {panelConfigs.map(config => (
                      <button
                        key={config.label}
                        onClick={() => applySolarConfig(config.value)}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          solarArrayWatts === config.value && config.value > 0
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-600 hover:border-blue-600'
                        }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Battery Voltage */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Battery Bank Voltage
                </label>
                <div className="flex gap-3">
                  {voltageOptions.map(voltage => (
                    <button
                      key={voltage}
                      onClick={() => setBatteryVoltage(voltage)}
                      className={`px-6 py-2 rounded-lg border ${
                        batteryVoltage === voltage
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-600 hover:border-blue-600'
                      }`}
                    >
                      {voltage}V
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Higher voltage = lower current = smaller cables
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Battery Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Battery Type
                </label>
                <div className="space-y-2">
                  {batteryTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setBatteryType(type.id)}
                      className={`w-full text-left p-3 border rounded-lg transition ${
                        batteryType === type.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                        {batteryType === type.id && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Charge Controller Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {systemTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSystemType(type.id)}
                      className={`p-3 border rounded-lg text-center ${
                        systemType === type.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{type.label}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="p-6 border-t bg-gray-50">
          <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition font-semibold text-lg">
            <Calculator className="inline h-5 w-5 mr-2" />
            Calculate Charge Controller
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && results && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm bg-gradient-to-r from-blue-50 to-yellow-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Minimum Charge Controller Amps</div>
                <div className="text-3xl font-bold text-blue-600">{results.minAmps} A</div>
                <div className="text-xs text-gray-500 mt-1">
                  Based on {solarArrayWatts}W at {batteryVoltage}V
                </div>
              </div>
              
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Recommended Charge Controller</div>
                <div className="text-3xl font-bold text-orange-600">{results.recommendedAmps} A</div>
                <div className="text-xs text-gray-500 mt-1">
                  Includes 25% safety margin for future expansion
                </div>
              </div>
              
              <div className="bg-white rounded p-4">
                <div className="text-sm text-gray-500">Maximum Solar Input</div>
                <div className="text-2xl font-bold text-gray-900">{results.maxSolarInput} W</div>
                <div className="text-xs text-gray-500 mt-1">
                  For {batteryVoltage}V system with {systemType.toUpperCase()} controller
                </div>
              </div>

              {results.systemType === 'mppt' && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      MPPT controllers are 20-30% more efficient than PWM controllers
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Recommended Products</h3>
              <div className="space-y-3">
                {results.recommendations.map((controller, index) => {
                  const productId = getProductIdFromName(controller.name)
                  return (
                    <div key={index} className={`bg-white rounded p-4 ${index === 0 ? 'border-2 border-blue-500' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{controller.name}</div>
                          <div className="text-sm text-gray-500">
                            {controller.amps}A | {controller.voltage}V | {controller.type.toUpperCase()}
                          </div>
                          {controller.features && (
                            <div className="text-xs text-gray-500 mt-1">
                              {controller.features.join(' • ')}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">${controller.price}</div>
                          {controller.badge && (
                            <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full">
                              {controller.badge}
                            </span>
                          )}
                          {productId && (
                            <Link 
                              href={`/products/${productId}`}
                              className="block text-xs text-blue-600 hover:underline mt-1"
                            >
                              View Product →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link href="/products/charge-controllers" className="block text-center mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Shop All Charge Controllers →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Understanding Charge Controllers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Cpu className="h-5 w-5 text-blue-600 mr-2" />
              MPPT vs PWM
            </h3>
            <p className="text-sm text-gray-600">
              <strong>MPPT</strong> controllers are more efficient (95-98%) and can handle higher solar array voltages. 
              <strong>PWM</strong> controllers are cheaper but less efficient (75-85%) and require matching panel voltage to battery voltage.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Battery className="h-5 w-5 text-green-600 mr-2" />
              Battery Compatibility
            </h3>
            <p className="text-sm text-gray-600">
              Ensure your charge controller supports your battery type. 
              <strong>Lithium</strong> batteries require specific charging profiles. 
              <strong>Lead acid</strong> batteries need temperature compensation for best performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Sun className="h-5 w-5 text-yellow-600 mr-2" />
              Sizing Rules
            </h3>
            <p className="text-sm text-gray-600">
              Always oversize your charge controller by at least 25% for safety and expansion.
              Consider future solar panel additions. Higher battery voltage reduces current and allows smaller cables.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Need a Complete System?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products/charge-controllers" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Shop Charge Controllers
          </Link>
          <Link href="/products/complete-kits" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            View Complete Kits
          </Link>
          <Link href="/calculators/solar-sizing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Solar Sizing Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}