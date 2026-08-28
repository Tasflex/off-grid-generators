'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Info, AlertTriangle, ArrowRight, Calendar, Clock, Check, X } from 'lucide-react'

export default function PanelSeriesParallelDiagram() {
  const [panelCount, setPanelCount] = useState(2)
  const [panelVoltage, setPanelVoltage] = useState(12)
  const [panelCurrent, setPanelCurrent] = useState(10)

  const calculateSeries = () => {
    return {
      voltage: panelVoltage * panelCount,
      current: panelCurrent,
      power: panelVoltage * panelCurrent * panelCount
    }
  }

  const calculateParallel = () => {
    return {
      voltage: panelVoltage,
      current: panelCurrent * panelCount,
      power: panelVoltage * panelCurrent * panelCount
    }
  }

  const seriesResults = calculateSeries()
  const parallelResults = calculateParallel()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Panel Series & Parallel</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Wiring Diagram</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Solar Panel Series vs Parallel Wiring
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            6 min read
          </span>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Panel Configuration Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Series Connection */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-3">Series Connection</h3>
            <div className="bg-white rounded p-4 mb-3">
              <div className="text-sm text-gray-500">Output</div>
              <div className="text-2xl font-bold text-blue-600">
                {seriesResults.voltage}V / {seriesResults.current}A / {seriesResults.power}W
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>Increases voltage</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>Same current throughout</span>
              </li>
              <li className="flex items-start">
                <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                <span>Partial shading kills output</span>
              </li>
            </ul>
          </div>

          {/* Parallel Connection */}
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-3">Parallel Connection</h3>
            <div className="bg-white rounded p-4 mb-3">
              <div className="text-sm text-gray-500">Output</div>
              <div className="text-2xl font-bold text-green-600">
                {parallelResults.voltage}V / {parallelResults.current}A / {parallelResults.power}W
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>Increases current</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>Same voltage throughout</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span>Better with partial shading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Wiring Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Series Diagram */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Series Wiring Diagram</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg className="w-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Panel 1 */}
              <rect x="50" y="50" width="80" height="60" rx="5" fill="#3182ce" />
              <text x="90" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Panel 1</text>
              <text x="90" y="100" textAnchor="middle" fontSize="8" fill="white">12V/10A</text>
              
              {/* Panel 2 */}
              <rect x="160" y="50" width="80" height="60" rx="5" fill="#3182ce" />
              <text x="200" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Panel 2</text>
              <text x="200" y="100" textAnchor="middle" fontSize="8" fill="white">12V/10A</text>

              {/* Panel 3 */}
              <rect x="270" y="50" width="80" height="60" rx="5" fill="#3182ce" />
              <text x="310" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Panel 3</text>
              <text x="310" y="100" textAnchor="middle" fontSize="8" fill="white">12V/10A</text>

              {/* Wiring */}
              <line x1="130" y1="60" x2="160" y2="60" stroke="#f56565" strokeWidth="3" />
              <line x1="240" y1="60" x2="270" y2="60" stroke="#f56565" strokeWidth="3" />
              <line x1="130" y1="100" x2="160" y2="100" stroke="#4299e1" strokeWidth="3" />
              <line x1="240" y1="100" x2="270" y2="100" stroke="#4299e1" strokeWidth="3" />

              {/* Output */}
              <text x="200" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4a5568">Output: 36V / 10A</text>
              <line x1="50" y1="120" x2="50" y2="140" stroke="#f56565" strokeWidth="3" />
              <line x1="350" y1="120" x2="350" y2="140" stroke="#4299e1" strokeWidth="3" />
              <text x="50" y="135" textAnchor="middle" fontSize="10" fill="#f56565">+</text>
              <text x="350" y="135" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Connect positive to negative for each panel. Voltage adds up, current stays the same.
          </p>
        </div>

        {/* Parallel Diagram */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Parallel Wiring Diagram</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg className="w-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Panel 1 */}
              <rect x="50" y="50" width="80" height="60" rx="5" fill="#48bb78" />
              <text x="90" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Panel 1</text>
              <text x="90" y="100" textAnchor="middle" fontSize="8" fill="white">12V/10A</text>
              
              {/* Panel 2 */}
              <rect x="160" y="50" width="80" height="60" rx="5" fill="#48bb78" />
              <text x="200" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Panel 2</text>
              <text x="200" y="100" textAnchor="middle" fontSize="8" fill="white">12V/10A</text>

              {/* Panel 3 */}
              <rect x="270" y="50" width="80" height="60" rx="5" fill="#48bb78" />
              <text x="310" y="85" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Panel 3</text>
              <text x="310" y="100" textAnchor="middle" fontSize="8" fill="white">12V/10A</text>

              {/* Wiring */}
              <line x1="130" y1="60" x2="160" y2="60" stroke="#f56565" strokeWidth="3" />
              <line x1="240" y1="60" x2="270" y2="60" stroke="#f56565" strokeWidth="3" />
              <line x1="130" y1="100" x2="160" y2="100" stroke="#4299e1" strokeWidth="3" />
              <line x1="240" y1="100" x2="270" y2="100" stroke="#4299e1" strokeWidth="3" />

              {/* Bus bars */}
              <line x1="40" y1="60" x2="350" y2="60" stroke="#f56565" strokeWidth="2" />
              <line x1="40" y1="100" x2="350" y2="100" stroke="#4299e1" strokeWidth="2" />

              {/* Output */}
              <text x="200" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4a5568">Output: 12V / 30A</text>
              <line x1="40" y1="60" x2="40" y2="140" stroke="#f56565" strokeWidth="3" />
              <line x1="350" y1="100" x2="350" y2="140" stroke="#4299e1" strokeWidth="3" />
              <text x="40" y="135" textAnchor="middle" fontSize="10" fill="#f56565">+</text>
              <text x="350" y="135" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Connect all positives together and all negatives together. Current adds up, voltage stays the same.
          </p>
        </div>
      </div>

      {/* When to Use */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use Each Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Use Series When:</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Your charge controller needs higher voltage',
                'You have long wire runs (higher voltage = less loss)',
                'You want to use thinner wire',
                'No risk of partial shading'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-2">Use Parallel When:</h3>
            <ul className="space-y-2 text-sm">
              {[
                'You have a 12V system',
                'Partial shading is a concern',
                'Your panels are in different orientations',
                'You need maximum current output'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
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
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Important Safety Note</h2>
            <p className="text-sm text-red-700">
              Always check your charge controller's maximum voltage rating before connecting panels in series. 
              Exceeding this rating can damage your controller.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Build Your Solar System?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine your exact panel requirements.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-panel-layout" className="ebay-btn-primary">
            Calculate Panel Layout
          </Link>
          <Link href="/products/solar-panels" className="ebay-btn-secondary">
            Shop Solar Panels
          </Link>
        </div>
      </div>
    </div>
  )
}