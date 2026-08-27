'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Clock, Wrench, Check, X, AlertTriangle, Info, ArrowRight, Battery, Zap, Sun } from 'lucide-react'

export default function HowToWireSolarSystem() {
  const [activeStep, setActiveStep] = useState(1)
  const [showWiringDiagram, setShowWiringDiagram] = useState(true)

  const steps = [
    { number: 1, title: 'Plan Your Layout', duration: '30 mins' },
    { number: 2, title: 'Mount Solar Panels', duration: '2-3 hours' },
    { number: 3, title: 'Install Charge Controller', duration: '30 mins' },
    { number: 4, title: 'Connect Batteries', duration: '30 mins' },
    { number: 5, title: 'Install Inverter', duration: '1 hour' },
    { number: 6, title: 'Wire Everything Together', duration: '1-2 hours' },
    { number: 7, title: 'Test & Verify', duration: '30 mins' }
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How to Wire a Solar System</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">DIY</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Wire a Solar System: Complete Guide
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

      {/* Wiring Diagram Visualization */}
      {showWiringDiagram && (
        <div className="ebay-card p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Complete Wiring Diagram</h2>
            <button
              onClick={() => setShowWiringDiagram(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Hide Diagram
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
            <svg className="w-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Title */}
              <text x="400" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a1a1a">Off-Grid Solar System Wiring Diagram</text>
              
              {/* Solar Panels */}
              <rect x="50" y="60" width="100" height="80" rx="10" fill="#3182ce" />
              <text x="100" y="95" textAnchor="middle" fontSize="12" fill="white">Solar Panel</text>
              <text x="100" y="115" textAnchor="middle" fontSize="10" fill="white">100W-400W</text>
              
              {/* Solar Panel 2 */}
              <rect x="200" y="60" width="100" height="80" rx="10" fill="#3182ce" />
              <text x="250" y="95" textAnchor="middle" fontSize="12" fill="white">Solar Panel</text>
              <text x="250" y="115" textAnchor="middle" fontSize="10" fill="white">100W-400W</text>
              
              {/* Charge Controller */}
              <rect x="300" y="200" width="120" height="80" rx="10" fill="#f5a623" />
              <text x="360" y="235" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Charge</text>
              <text x="360" y="255" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Controller</text>
              
              {/* Battery */}
              <rect x="300" y="320" width="120" height="80" rx="10" fill="#48bb78" />
              <text x="360" y="355" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Battery</text>
              <text x="360" y="375" textAnchor="middle" fontSize="10" fill="white">12V/24V/48V</text>
              
              {/* Inverter */}
              <rect x="500" y="200" width="120" height="80" rx="10" fill="#ed8936" />
              <text x="560" y="235" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Inverter</text>
              <text x="560" y="255" textAnchor="middle" fontSize="10" fill="white">DC → AC</text>
              
              {/* AC Outlets */}
              <rect x="650" y="200" width="100" height="80" rx="10" fill="#9f7aea" />
              <text x="700" y="235" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">AC Outlets</text>
              <text x="700" y="255" textAnchor="middle" fontSize="10" fill="white">Home Devices</text>
              
              {/* Wiring lines */}
              {/* Solar to Controller */}
              <line x1="150" y1="100" x2="300" y2="100" stroke="#4a5568" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="300" y1="100" x2="300" y2="200" stroke="#4a5568" strokeWidth="2" strokeDasharray="5,5" />
              
              {/* Solar 2 to Controller */}
              <line x1="250" y1="140" x2="250" y2="220" stroke="#4a5568" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="250" y1="220" x2="300" y2="220" stroke="#4a5568" strokeWidth="2" strokeDasharray="5,5" />
              
              {/* Controller to Battery */}
              <line x1="360" y1="280" x2="360" y2="320" stroke="#4a5568" strokeWidth="3" />
              
              {/* Battery to Inverter */}
              <line x1="420" y1="360" x2="500" y2="260" stroke="#4a5568" strokeWidth="3" />
              <line x1="500" y1="260" x2="500" y2="240" stroke="#4a5568" strokeWidth="3" />
              
              {/* Inverter to AC */}
              <line x1="620" y1="240" x2="650" y2="240" stroke="#4a5568" strokeWidth="3" />
              
              {/* Labels */}
              <text x="225" y="90" textAnchor="middle" fontSize="10" fill="#4a5568">12V DC</text>
              <text x="330" y="190" textAnchor="middle" fontSize="10" fill="#4a5568">MPPT</text>
              <text x="460" y="300" textAnchor="middle" fontSize="10" fill="#4a5568">12V/24V</text>
              <text x="560" y="310" textAnchor="middle" fontSize="10" fill="#4a5568">DC to AC</text>
              
              {/* Warnings */}
              <rect x="450" y="400" width="300" height="60" rx="10" fill="#fef3c7" stroke="#f59e0b" />
              <text x="600" y="425" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">⚠️ Safety Warning</text>
              <text x="600" y="445" textAnchor="middle" fontSize="10" fill="#92400e">Always disconnect power before wiring</text>
            </svg>
          </div>
        </div>
      )}

      {/* Tools Needed */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools You'll Need</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Wire strippers',
            'Crimping tool',
            'Multimeter',
            'Solar cable (10AWG+)',
            'MC4 connectors',
            'Battery cables',
            'Fuse holder & fuses',
            'Heat shrink tubing',
            'Electrical tape',
            'Drill & bits',
            'Safety gloves',
            'Safety glasses'
          ].map(tool => (
            <div key={tool} className="flex items-center bg-gray-50 rounded p-2">
              <Wrench className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm">{tool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-6 mb-8">
        {steps.map((step) => (
          <div key={step.number} className="ebay-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  {step.number}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{step.title}</h2>
              </div>
              <span className="text-sm text-gray-500">{step.duration}</span>
            </div>
            
            <div className="space-y-4">
              {step.number === 1 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Before you start, plan your system layout and gather all materials.</p>
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Checklist:</h3>
                    <ul className="space-y-2">
                      {[
                        'Determine your power needs',
                        'Calculate solar panel requirements',
                        'Choose battery capacity',
                        'Select inverter size',
                        'Measure cable runs',
                        'Check local regulations'
                      ].map(item => (
                        <li key={item} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {step.number === 2 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Mount your solar panels in a location with maximum sunlight exposure.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Mounting Options:</h4>
                      <ul className="space-y-2">
                        <li>• Roof mounts (with brackets)</li>
                        <li>• Ground mounts (with rack)</li>
                        <li>• Portable/foldable (for RV)</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                        <Sun className="h-4 w-4 mr-1" />
                        Best Practices:
                      </h4>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li>• Tilt at latitude angle for best output</li>
                        <li>• Avoid shade at all costs</li>
                        <li>• Secure panels from wind damage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {step.number === 3 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Mount the charge controller near the battery bank for shorter cable runs.</p>
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Charge Controller Setup:</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Mount controller on a non-flammable surface</li>
                      <li>Connect battery first (positive and negative)</li>
                      <li>Set voltage based on your battery system</li>
                      <li>Connect solar panels through MC4 connectors</li>
                      <li>Verify with multimeter</li>
                    </ol>
                  </div>
                </div>
              )}
              
              {step.number === 4 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Connect your batteries in series or parallel based on your voltage needs.</p>
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Battery Wiring Configuration:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Series (12V → 24V):</h4>
                        <p className="text-gray-600">Positive to negative. Doubles voltage, same capacity.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Parallel (12V → 12V):</h4>
                        <p className="text-gray-600">Positive to positive, negative to negative. Doubles capacity, same voltage.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-red-700">
                        <strong>Important!</strong> Always use fuses between batteries and the rest of the system. 
                        This protects your equipment from short circuits and overcurrent.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {step.number === 5 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Install your inverter in a dry, well-ventilated location.</p>
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Inverter Installation:</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Mount inverter near battery bank</li>
                      <li>Connect battery cables (red positive, black negative)</li>
                      <li>Add DC fuse for protection</li>
                      <li>Ground the inverter properly</li>
                      <li>Test with a small appliance</li>
                    </ol>
                  </div>
                </div>
              )}
              
              {step.number === 6 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Now connect everything together in the correct order.</p>
                  
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Wiring Sequence:</h3>
                    <div className="space-y-3">
                      {[
                        { step: '1. Battery → Charge Controller', detail: 'Connect battery to controller first (this powers the controller)' },
                        { step: '2. Solar Panels → Charge Controller', detail: 'Connect panels through MC4 connectors' },
                        { step: '3. Battery → Inverter', detail: 'Connect battery to inverter through fuse' },
                        { step: '4. Inverter → AC Output', detail: 'Connect to home devices or breaker panel' }
                      ].map((wiring, index) => (
                        <div key={index} className="bg-white rounded p-3 flex items-center">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                          <div>
                            <span className="font-semibold text-gray-900 text-sm">{wiring.step}</span>
                            <span className="text-gray-600 text-sm ml-2">{wiring.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {step.number === 7 && (
                <div className="space-y-4">
                  <p className="text-gray-600">Test your system thoroughly to ensure everything works correctly.</p>
                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Testing Checklist:</h3>
                    <ul className="space-y-2">
                      {[
                        'Check all connections with multimeter',
                        'Verify charge controller is receiving solar input',
                        'Test battery voltage under load',
                        'Power on inverter and test AC outlets',
                        'Monitor system for 1 hour',
                        'Check for loose connections or overheating'
                      ].map(item => (
                        <li key={item} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Section */}
      <div className="ebay-card p-6 mb-8 bg-red-50 border-red-200">
        <h2 className="text-2xl font-bold text-red-800 mb-4">⚠️ Safety Warnings</h2>
        
        <div className="space-y-3">
          {[
            'Never work on live electrical systems',
            'Disconnect all power sources before wiring',
            'Use proper gauge wire to prevent overheating',
            'Install fuses/breakers for protection',
            'Wear insulated gloves when handling batteries',
            'Ensure proper ventilation for battery bank',
            'Follow local electrical codes',
            'If unsure, hire a licensed electrician'
          ].map(warning => (
            <div key={warning} className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-red-800">{warning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Start Your Solar Project?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine your exact system requirements.
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