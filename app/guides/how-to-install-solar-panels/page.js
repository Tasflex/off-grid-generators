'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, X, AlertTriangle, Info, ArrowRight, Wrench, Drill, Shield, Sun, Home, Battery, Zap, Clipboard, Gauge } from 'lucide-react'

export default function HowToInstallSolarPanels() {
  const [activeStep, setActiveStep] = useState(1)
  const [showTools, setShowTools] = useState(false)

  const steps = [
    {
      number: 1,
      title: 'Plan Your System',
      duration: '1-2 hours',
      icon: Clipboard,
      description: 'Calculate your needs and design your system layout'
    },
    {
      number: 2,
      title: 'Gather Materials & Tools',
      duration: '2-3 hours',
      icon: Wrench,
      description: 'Collect all equipment and safety gear'
    },
    {
      number: 3,
      title: 'Mount the Panels',
      duration: '2-4 hours',
      icon: Drill,
      description: 'Install roof brackets and secure panels'
    },
    {
      number: 4,
      title: 'Wire the Panels',
      duration: '1-2 hours',
      icon: Zap,
      description: 'Connect panels with MC4 connectors'
    },
    {
      number: 5,
      title: 'Connect to Charge Controller',
      duration: '1 hour',
      icon: Battery,
      description: 'Wire panels to MPPT charge controller'
    },
    {
      number: 6,
      title: 'Connect to Battery System',
      duration: '1-2 hours',
      icon: Shield,
      description: 'Connect battery bank with proper fusing'
    },
    {
      number: 7,
      title: 'Test & Verify',
      duration: '1 hour',
      icon: Gauge,
      description: 'Test the system and verify performance'
    }
  ]

  const tools = [
    'Solar panels with MC4 connectors',
    'Mounting brackets (roof or ground)',
    '10AWG solar cable',
    'MC4 connectors & crimping tool',
    'Wire strippers',
    'Multimeter',
    'Drill with appropriate bits',
    'Ladder (roof install)',
    'Safety harness (roof)',
    'Fuse holders & fuses',
    'Heat shrink tubing',
    'Electrical tape'
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How to Install Solar Panels</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">DIY Installation</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Step-by-Step</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Install Solar Panels: Complete DIY Guide
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          A comprehensive step-by-step guide to installing solar panels for your home, RV, or off-grid system. 
          Save thousands on installation costs with this DIY approach.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            February 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            20 min read
          </span>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-800 mb-1">⚠️ Important Safety Warning</h3>
            <p className="text-sm text-red-700">
              Working with electricity is dangerous. If you're not comfortable with electrical work, 
              hire a professional. Always turn off power before working on electrical connections. 
              Use a safety harness when working on roofs.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Tools & Materials Checklist</h2>
          <button
            onClick={() => setShowTools(!showTools)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {showTools ? 'Hide' : 'Show'} Full List
          </button>
        </div>
        {showTools && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tools.map((tool, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded p-3">
                <Wrench className="h-4 w-4 text-blue-600 mr-3" />
                <span className="text-sm text-gray-700">{tool}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step-by-Step Guide */}
      <div className="space-y-8 mb-12">
        {steps.map((step) => (
          <div key={step.number} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
                    <div className="text-sm text-gray-500">{step.duration}</div>
                  </div>
                </div>
                <step.icon className="h-6 w-6 text-blue-600" />
              </div>
              
              <p className="text-gray-600 mb-4">{step.description}</p>

              <div className="bg-gray-50 rounded p-4">
                {step.number === 1 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Planning Checklist:</h3>
                    <ul className="space-y-2">
                      {[
                        'Calculate your daily energy needs using our calculator',
                        'Determine how many panels you need',
                        'Measure your roof or ground space',
                        'Check local building codes and permits needed',
                        'Determine panel orientation (south-facing is best in Northern Hemisphere)',
                        'Calculate the correct tilt angle (latitude angle is optimal)'
                      ].map(item => (
                        <li key={item} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/calculators/solar-sizing" className="text-blue-600 hover:underline text-sm">
                      Use Our Solar Sizing Calculator →
                    </Link>
                  </div>
                )}

                {step.number === 3 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Mounting Steps:</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                      <li>Mark roof rafter locations</li>
                      <li>Attach mounting brackets with appropriate flashing</li>
                      <li>Install rail systems (if using rails)</li>
                      <li>Lift panels onto the roof (2+ people recommended)</li>
                      <li>Secure panels to rails or brackets</li>
                      <li>Check all connections are tight</li>
                    </ol>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-3">
                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                        <p className="text-sm text-yellow-800">
                          <strong>Pro Tip:</strong> Pre-assemble panels on the ground if possible, then lift them up with 2-3 people.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step.number === 4 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Wiring Instructions:</h3>
                    <ul className="space-y-2">
                      {[
                        'Connect panels in series to increase voltage, or in parallel to increase amps',
                        'Use MC4 connectors for waterproof connections',
                        'Connect positive to positive, negative to negative',
                        'Route cables through conduit for protection',
                        'Label all cables for easy identification'
                      ].map(item => (
                        <li key={item} className="flex items-start text-sm">
                          <Zap className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.number === 5 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Charge Controller Setup:</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                      <li>Mount charge controller in a dry, ventilated area</li>
                      <li>Connect battery to the controller FIRST</li>
                      <li>Set the controller for your battery type (LiFePO4, AGM, etc.)</li>
                      <li>Connect solar panels to the controller LAST</li>
                      <li>Verify the system is charging with a multimeter</li>
                    </ol>
                    <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                        <p className="text-sm text-red-700">
                          <strong>IMPORTANT:</strong> Always connect the battery first! Connecting panels without a battery can damage the controller.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step.number === 7 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Testing Checklist:</h3>
                    <ul className="space-y-2">
                      {[
                        'Check all connections are tight and secure',
                        'Verify voltage coming from panels (should match expected Vmp)',
                        'Check battery voltage is increasing',
                        'Test with a load (plug in a device)',
                        'Monitor system for 1-2 hours',
                        'Check for any error codes on the charge controller'
                      ].map(item => (
                        <li key={item} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* For other steps, show generic content */}
                {step.number === 2 && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                      Gather all your materials and tools before starting. Organize your workspace and ensure 
                      you have everything needed for the installation.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Solar panels (check they're undamaged)</li>
                      <li>Mounting hardware (brackets, rails, flashing)</li>
                      <li>All electrical components (controller, cables, fuses)</li>
                      <li>Safety equipment (gloves, glasses, harness)</li>
                    </ul>
                  </div>
                )}

                {step.number === 6 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-2">Battery Connection:</h3>
                    <ul className="space-y-2">
                      {[
                        'Connect batteries in series or parallel based on your voltage needs',
                        'Use proper gauge battery cables (minimum 2AWG for larger systems)',
                        'Install a fuse or breaker between battery and inverter',
                        'Connect charge controller to battery bank',
                        'Double-check polarity (red = positive, black = negative)'
                      ].map(item => (
                        <li key={item} className="flex items-start text-sm">
                          <Battery className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Troubleshooting */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Installation Issues & Solutions</h2>
        <div className="space-y-4">
          {[
            {
              issue: 'Panels not producing power',
              solution: 'Check MC4 connections, verify panel orientation, test with multimeter'
            },
            {
              issue: 'Charge controller error',
              solution: 'Check battery connection (must be connected first), verify voltage settings'
            },
            {
              issue: 'Low voltage',
              solution: 'Check shading, verify cable connections, test each panel individually'
            },
            {
              issue: 'System not charging',
              solution: 'Check charge controller settings, verify battery voltage is within range'
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start bg-gray-50 rounded p-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.issue}</h3>
                <p className="text-sm text-gray-600">Solution: {item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Install Your Solar System?
        </h2>
        <p className="text-gray-600 mb-4">
          Get started with the right equipment and tools for your installation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products/solar-panels" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Shop Solar Panels
          </Link>
          <Link href="/calculators/solar-sizing" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Calculate Your System
          </Link>
        </div>
      </div>
    </div>
  )
}