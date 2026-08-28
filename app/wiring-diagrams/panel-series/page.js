'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Zap, AlertTriangle, Check, X, ArrowRight, Calendar, Clock, Info, Battery } from 'lucide-react'

export default function PanelSeriesWiringDiagram() {
  const [panelCount, setPanelCount] = useState(2)
  const [panelVoltage, setPanelVoltage] = useState(12)
  const [panelCurrent, setPanelCurrent] = useState(10)
  const [panelWattage, setPanelWattage] = useState(120)

  const calculateSeries = () => {
    return {
      voltage: panelVoltage * panelCount,
      current: panelCurrent,
      power: panelWattage * panelCount,
      totalWatts: panelWattage * panelCount
    }
  }

  const results = calculateSeries()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Panel Series Wiring</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Solar Panel Wiring</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Solar Panel Series Wiring Diagram</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            5 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What is Series Wiring?</h2>
        <p className="text-gray-600 mb-4">
          In a series connection, solar panels are connected end-to-end, with the positive terminal of one panel 
          connected to the negative terminal of the next. This configuration increases the total voltage while 
          keeping the current the same.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">Key Formula</h3>
          </div>
          <p className="text-sm text-blue-700">
            <strong>Total Voltage</strong> = Panel Voltage × Number of Panels<br />
            <strong>Total Current</strong> = Panel Current (stays the same)<br />
            <strong>Total Power</strong> = Total Voltage × Total Current
          </p>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series Configuration Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Panels</label>
            <input
              type="number"
              value={panelCount}
              onChange={(e) => setPanelCount(parseInt(e.target.value))}
              className="ebay-input"
              min="1"
              max="12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panel Voltage (V)</label>
            <input
              type="number"
              value={panelVoltage}
              onChange={(e) => setPanelVoltage(parseFloat(e.target.value))}
              className="ebay-input"
              min="12"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panel Current (A)</label>
            <input
              type="number"
              value={panelCurrent}
              onChange={(e) => setPanelCurrent(parseFloat(e.target.value))}
              className="ebay-input"
              min="1"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panel Wattage (W)</label>
            <input
              type="number"
              value={panelWattage}
              onChange={(e) => setPanelWattage(parseFloat(e.target.value))}
              className="ebay-input"
              min="50"
              step="10"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Voltage</div>
              <div className="text-2xl font-bold text-blue-600">{results.voltage}V</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Current</div>
              <div className="text-2xl font-bold text-green-600">{results.current}A</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Power</div>
              <div className="text-2xl font-bold text-orange-600">{results.power}W</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Wattage</div>
              <div className="text-2xl font-bold text-purple-600">{results.totalWatts}W</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wiring Diagram */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series Wiring Diagram</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="w-full" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a1a1a">
              Series Connection Diagram
            </text>

            {/* Panel 1 */}
            <rect x="50" y="80" width="180" height="120" rx="10" fill="#3182ce" />
            <text x="140" y="130" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Panel 1</text>
            <text x="140" y="150" textAnchor="middle" fontSize="11" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            <text x="140" y="170" textAnchor="middle" fontSize="10" fill="#e2e8f0">{panelWattage}W</text>
            
            {/* Panel 1 Terminals */}
            <text x="80" y="90" textAnchor="middle" fontSize="10" fill="#f56565" fontWeight="bold">+</text>
            <text x="200" y="90" textAnchor="middle" fontSize="10" fill="#4299e1" fontWeight="bold">-</text>

            {/* Panel 2 */}
            <rect x="310" y="80" width="180" height="120" rx="10" fill="#3182ce" />
            <text x="400" y="130" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Panel 2</text>
            <text x="400" y="150" textAnchor="middle" fontSize="11" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            <text x="400" y="170" textAnchor="middle" fontSize="10" fill="#e2e8f0">{panelWattage}W</text>
            
            {/* Panel 2 Terminals */}
            <text x="340" y="90" textAnchor="middle" fontSize="10" fill="#f56565" fontWeight="bold">+</text>
            <text x="460" y="90" textAnchor="middle" fontSize="10" fill="#4299e1" fontWeight="bold">-</text>

            {/* Panel 3 */}
            <rect x="570" y="80" width="180" height="120" rx="10" fill="#3182ce" />
            <text x="660" y="130" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Panel 3</text>
            <text x="660" y="150" textAnchor="middle" fontSize="11" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            <text x="660" y="170" textAnchor="middle" fontSize="10" fill="#e2e8f0">{panelWattage}W</text>
            
            {/* Panel 3 Terminals */}
            <text x="600" y="90" textAnchor="middle" fontSize="10" fill="#f56565" fontWeight="bold">+</text>
            <text x="720" y="90" textAnchor="middle" fontSize="10" fill="#4299e1" fontWeight="bold">-</text>

            {/* Wiring Connections */}
            {/* Panel 1 negative to Panel 2 positive */}
            <line x1="230" y1="100" x2="310" y2="100" stroke="#f56565" strokeWidth="3" />
            <circle cx="270" cy="100" r="4" fill="#f56565" />
            
            {/* Panel 2 negative to Panel 3 positive */}
            <line x1="490" y1="100" x2="570" y2="100" stroke="#f56565" strokeWidth="3" />
            <circle cx="530" cy="100" r="4" fill="#f56565" />

            {/* Main Positive Output */}
            <line x1="140" y1="80" x2="140" y2="50" stroke="#f56565" strokeWidth="3" />
            <line x1="140" y1="50" x2="750" y2="50" stroke="#f56565" strokeWidth="3" />
            <text x="400" y="40" textAnchor="middle" fontSize="12" fill="#f56565" fontWeight="bold">+ Output</text>

            {/* Main Negative Output */}
            <line x1="660" y1="200" x2="660" y2="240" stroke="#4299e1" strokeWidth="3" />
            <text x="660" y="255" textAnchor="middle" fontSize="12" fill="#4299e1" fontWeight="bold">- Output</text>

            {/* Current Flow Arrows */}
            <text x="270" y="80" textAnchor="middle" fontSize="10" fill="#4a5568">→</text>
            <text x="530" y="80" textAnchor="middle" fontSize="10" fill="#4a5568">→</text>
          </svg>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Wire Panels in Series</h2>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Check Panel Specifications',
              description: 'Verify all panels have matching voltage, current, and wattage ratings.',
              details: ['Check VOC (Open Circuit Voltage)', 'Check ISC (Short Circuit Current)', 'Verify all panels are same brand/model']
            },
            {
              step: 2,
              title: 'Position Panels',
              description: 'Place panels in a location with optimal sun exposure and similar orientation.',
              details: ['Ensure all panels face same direction', 'Avoid partial shading', 'Maintain safe working clearance']
            },
            {
              step: 3,
              title: 'Connect First Panel Negative to Second Panel Positive',
              description: 'Use MC4 connectors to join panels in series.',
              details: ['Connect Panel 1 negative (-) to Panel 2 positive (+)', 'Use MC4 connectors for weatherproof connection', 'Ensure secure connection']
            },
            {
              step: 4,
              title: 'Continue Chain',
              description: 'Repeat connection for additional panels.',
              details: ['Connect Panel 2 negative to Panel 3 positive', 'Continue until all panels connected', 'Verify all connections are secure']
            },
            {
              step: 5,
              title: 'Connect Output Cables',
              description: 'The remaining positive from first panel and negative from last panel are your output.',
              details: ['First panel positive (+) is your main positive', 'Last panel negative (-) is your main negative', 'Connect to charge controller']
            }
          ].map(step => (
            <div key={step.step} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                {step.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {step.details.map(detail => (
                    <li key={detail} className="text-sm text-gray-600">{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages and Disadvantages */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pros and Cons of Series Wiring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-3">Advantages</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Higher voltage = lower current = less wire loss',
                'Can use thinner, cheaper wire',
                'Better for long cable runs',
                'Works well with MPPT charge controllers',
                'Easier to connect multiple panels',
                'More efficient for 24V+ systems'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-3">Disadvantages</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Partial shading reduces entire string output',
                'One panel failure affects whole string',
                'Higher voltage = more dangerous',
                'Must match panel specifications',
                'Cant use PWM controller efficiently',
                'Voltage may exceed controller limits',
              ].map(item => (
                <li key={item} className="flex items-start">
                  <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* When to Use Series */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use Series Wiring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Ideal Scenarios:</h3>
            <ul className="space-y-2 text-sm">
              {[
                'You need higher voltage for MPPT controller',
                'You have long wire runs (reduce loss)',
                'You have a 24V or 48V battery system',
                'You have no shading concerns',
                'You want to use thinner wire',
                'You have limited space for multiple strings'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 rounded p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Avoid When:</h3>
            <ul className="space-y-2 text-sm">
              {[
                'You have partial shading (trees, buildings)',
                'Panels are in different orientations',
                'You have mismatched panels',
                'Your charge controller has low voltage limit',
                'You need redundancy for panel failure'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Safety Warning</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Never exceed your charge controller's maximum voltage rating</li>
              <li>Series voltage can be lethal - always disconnect before working</li>
              <li>Use proper MC4 connectors for weatherproof connections</li>
              <li>Check voltage with multimeter before connecting to controller</li>
              <li>Ensure all panels have same specifications</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Topics */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Related Wiring Diagrams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/wiring-diagrams/panel-parallel" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Parallel Wiring</div>
            <div className="text-sm text-gray-500">Increase current output</div>
          </Link>
          <Link href="/wiring-diagrams/panel-series-parallel" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Series-Parallel Combo</div>
            <div className="text-sm text-gray-500">Balance voltage & current</div>
          </Link>
          <Link href="/wiring-diagrams/basic-off-grid" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Complete System</div>
            <div className="text-sm text-gray-500">Full off-grid diagram</div>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Solar Panels for Series Wiring?
        </h2>
        <p className="text-gray-600 mb-4">
          Browse our compatible solar panel options and calculate your exact needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/products/solar-panels" className="ebay-btn-primary">
            Shop Solar Panels
          </Link>
          <Link href="/calculators/solar-panel-layout" className="ebay-btn-secondary">
            Calculate Panel Layout
          </Link>
        </div>
      </div>
    </div>
  )
}