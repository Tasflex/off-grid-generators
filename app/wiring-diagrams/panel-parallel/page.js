'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Zap, AlertTriangle, Check, X, ArrowRight, Calendar, Clock, Info, Battery } from 'lucide-react'

export default function PanelParallelWiringDiagram() {
  const [panelCount, setPanelCount] = useState(2)
  const [panelVoltage, setPanelVoltage] = useState(12)
  const [panelCurrent, setPanelCurrent] = useState(10)
  const [panelWattage, setPanelWattage] = useState(120)

  const calculateParallel = () => {
    return {
      voltage: panelVoltage,
      current: panelCurrent * panelCount,
      power: panelWattage * panelCount,
      totalWatts: panelWattage * panelCount
    }
  }

  const results = calculateParallel()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Panel Parallel Wiring</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Solar Panel Wiring</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Solar Panel Parallel Wiring Diagram</h1>
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">What is Parallel Wiring?</h2>
        <p className="text-gray-600 mb-4">
          In a parallel connection, all positive terminals are connected together, and all negative terminals 
          are connected together. This configuration increases the total current while keeping the voltage the same.
        </p>
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-800">Key Formula</h3>
          </div>
          <p className="text-sm text-green-700">
            <strong>Total Voltage</strong> = Panel Voltage (stays the same)<br />
            <strong>Total Current</strong> = Panel Current × Number of Panels<br />
            <strong>Total Power</strong> = Total Voltage × Total Current
          </p>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Parallel Configuration Calculator</h2>
        
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Parallel Wiring Diagram</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="w-full" viewBox="0 0 800 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a1a1a">
              Parallel Connection Diagram
            </text>

            {/* Positive Bus Bar */}
            <line x1="100" y1="60" x2="700" y2="60" stroke="#f56565" strokeWidth="4" />
            <text x="400" y="50" textAnchor="middle" fontSize="12" fill="#f56565" fontWeight="bold">Positive Bus Bar (+)</text>

            {/* Negative Bus Bar */}
            <line x1="100" y1="290" x2="700" y2="290" stroke="#4299e1" strokeWidth="4" />
            <text x="400" y="310" textAnchor="middle" fontSize="12" fill="#4299e1" fontWeight="bold">Negative Bus Bar (-)</text>

            {/* Panel 1 */}
            <rect x="150" y="100" width="150" height="120" rx="10" fill="#3182ce" />
            <text x="225" y="150" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Panel 1</text>
            <text x="225" y="170" textAnchor="middle" fontSize="11" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            <text x="225" y="190" textAnchor="middle" fontSize="10" fill="#e2e8f0">{panelWattage}W</text>
            
            {/* Panel 1 Connections */}
            <line x1="225" y1="100" x2="225" y2="60" stroke="#f56565" strokeWidth="3" />
            <line x1="225" y1="220" x2="225" y2="290" stroke="#4299e1" strokeWidth="3" />
            <text x="240" y="80" textAnchor="middle" fontSize="10" fill="#f56565">+</text>
            <text x="240" y="260" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>

            {/* Panel 2 */}
            <rect x="350" y="100" width="150" height="120" rx="10" fill="#3182ce" />
            <text x="425" y="150" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Panel 2</text>
            <text x="425" y="170" textAnchor="middle" fontSize="11" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            <text x="425" y="190" textAnchor="middle" fontSize="10" fill="#e2e8f0">{panelWattage}W</text>
            
            {/* Panel 2 Connections */}
            <line x1="425" y1="100" x2="425" y2="60" stroke="#f56565" strokeWidth="3" />
            <line x1="425" y1="220" x2="425" y2="290" stroke="#4299e1" strokeWidth="3" />
            <text x="440" y="80" textAnchor="middle" fontSize="10" fill="#f56565">+</text>
            <text x="440" y="260" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>

            {/* Panel 3 */}
            <rect x="550" y="100" width="150" height="120" rx="10" fill="#3182ce" />
            <text x="625" y="150" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Panel 3</text>
            <text x="625" y="170" textAnchor="middle" fontSize="11" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            <text x="625" y="190" textAnchor="middle" fontSize="10" fill="#e2e8f0">{panelWattage}W</text>
            
            {/* Panel 3 Connections */}
            <line x1="625" y1="100" x2="625" y2="60" stroke="#f56565" strokeWidth="3" />
            <line x1="625" y1="220" x2="625" y2="290" stroke="#4299e1" strokeWidth="3" />
            <text x="640" y="80" textAnchor="middle" fontSize="10" fill="#f56565">+</text>
            <text x="640" y="260" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>

            {/* Output Connection */}
            <line x1="700" y1="60" x2="750" y2="60" stroke="#f56565" strokeWidth="4" />
            <line x1="700" y1="290" x2="750" y2="290" stroke="#4299e1" strokeWidth="4" />
            <text x="775" y="60" textAnchor="middle" fontSize="12" fill="#f56565" fontWeight="bold">+</text>
            <text x="775" y="295" textAnchor="middle" fontSize="12" fill="#4299e1" fontWeight="bold">-</text>
            <text x="775" y="175" textAnchor="middle" fontSize="10" fill="#4a5568" transform="rotate(90, 775, 175)">Output</text>

            {/* Current Flow Arrows */}
            <text x="180" y="80" textAnchor="middle" fontSize="10" fill="#4a5568">↓</text>
            <text x="380" y="80" textAnchor="middle" fontSize="10" fill="#4a5568">↓</text>
            <text x="580" y="80" textAnchor="middle" fontSize="10" fill="#4a5568">↓</text>
          </svg>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Wire Panels in Parallel</h2>
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
              title: 'Prepare Bus Bars',
              description: 'Set up positive and negative bus bars for connections.',
              details: ['Use appropriate gauge wire for bus bars', 'Ensure bus bar can handle total current', 'Place bus bars in accessible location']
            },
            {
              step: 3,
              title: 'Connect All Positive Terminals',
              description: 'Connect all panel positive terminals to the positive bus bar.',
              details: ['Connect Panel 1 (+) to bus bar', 'Connect Panel 2 (+) to bus bar', 'Connect Panel 3 (+) to bus bar']
            },
            {
              step: 4,
              title: 'Connect All Negative Terminals',
              description: 'Connect all panel negative terminals to the negative bus bar.',
              details: ['Connect Panel 1 (-) to bus bar', 'Connect Panel 2 (-) to bus bar', 'Connect Panel 3 (-) to bus bar']
            },
            {
              step: 5,
              title: 'Connect Output Cables',
              description: 'The bus bars become your main output connection.',
              details: ['Positive bus bar → controller PV+', 'Negative bus bar → controller PV-', 'Ensure all connections are secure']
            }
          ].map(step => (
            <div key={step.step} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
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

      {/* Wire Sizing */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Wire Sizing for Parallel Connections</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Number of Panels</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Total Current</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Bus Bar Wire</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Branch Wire</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Max Run</th>
              </tr>
            </thead>
            <tbody>
              {[
                { panels: '2', current: `${panelCurrent * 2}A`, bus: '10 AWG', branch: '12 AWG', max: '20 ft' },
                { panels: '3', current: `${panelCurrent * 3}A`, bus: '8 AWG', branch: '12 AWG', max: '15 ft' },
                { panels: '4', current: `${panelCurrent * 4}A`, bus: '6 AWG', branch: '10 AWG', max: '12 ft' },
                { panels: '6', current: `${panelCurrent * 6}A`, bus: '4 AWG', branch: '10 AWG', max: '10 ft' },
                { panels: '8', current: `${panelCurrent * 8}A`, bus: '2 AWG', branch: '8 AWG', max: '8 ft' }
              ].map(row => (
                <tr key={row.panels} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.panels} panels</td>
                  <td className="px-4 py-3 text-sm">{row.current}</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600">{row.bus}</td>
                  <td className="px-4 py-3 text-sm">{row.branch}</td>
                  <td className="px-4 py-3 text-sm">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          <Info className="h-4 w-4 inline mr-1 text-blue-500" />
          Always consult wire gauge charts for your specific installation and local electrical codes.
        </p>
      </div>

      {/* Advantages and Disadvantages */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pros and Cons of Parallel Wiring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-3">Advantages</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Partial shading only affects shaded panel',
                'One panel failure doesnt stop entire system',
                'Can use PWM charge controllers',
                'Works well for 12V systems',
                'Easier to add panels later',
                'Lower voltage = safer to work with'
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
                'Higher current = more wire loss',
                'Need thicker, more expensive wire',
                'Not ideal for long cable runs',
                'Requires more complex wiring',
                'Can exceed charge controller current limit',
                'More connections = more failure points'
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

      {/* When to Use Parallel */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use Parallel Wiring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-2">Ideal Scenarios:</h3>
            <ul className="space-y-2 text-sm">
              {[
                'You have a 12V battery system',
                'Partial shading is a concern',
                'Panels are in different orientations',
                'You want to add panels incrementally',
                'You have a PWM charge controller',
                'You need redundancy for reliability'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 rounded p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Avoid When:</h3>
            <ul className="space-y-2 text-sm">
              {[
                'You have long wire runs',
                'Your charge controller has low current limit',
                'You need higher voltage for MPPT',
                'You have limited space for thick wire',
                'You want maximum efficiency'
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
              <li>Never exceed your charge controller's maximum current rating</li>
              <li>Use proper MC4 connectors or junction boxes for connections</li>
              <li>Ensure bus bars are sized for total current</li>
              <li>Check voltage with multimeter before connecting to controller</li>
              <li>Use proper fuse/breaker on main output</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Series vs Parallel Comparison */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series vs Parallel Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Feature</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Series</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Parallel</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Voltage', series: 'Adds up', parallel: 'Stays same' },
                { feature: 'Current', series: 'Stays same', parallel: 'Adds up' },
                { feature: 'Power', series: 'Same total', parallel: 'Same total' },
                { feature: 'Shading Effect', series: 'Severe', parallel: 'Minimal' },
                { feature: 'Wire Gauge', series: 'Thinner OK', parallel: 'Thicker needed' },
                { feature: 'Best Controller', series: 'MPPT', parallel: 'PWM or MPPT' },
                { feature: 'Best Voltage', series: '24V, 48V', parallel: '12V' }
              ].map(row => (
                <tr key={row.feature} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-semibold">{row.series}</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">{row.parallel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Topics */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Related Wiring Diagrams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/wiring-diagrams/panel-series" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Series Wiring</div>
            <div className="text-sm text-gray-500">Increase voltage output</div>
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
          Need Solar Panels for Parallel Wiring?
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