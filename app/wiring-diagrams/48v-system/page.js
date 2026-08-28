'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Info, AlertTriangle, ArrowRight, Calendar, Clock, Check, X, Battery, Zap, Home } from 'lucide-react'

export default function FortyEightVoltSystemDiagram() {
  const [showLabels, setShowLabels] = useState(true)
  const [showAnnotations, setShowAnnotations] = useState(true)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">48V System Wiring</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Whole Home Systems</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">48V System Wiring Diagram</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            7 min read
          </span>
        </div>
      </div>

      {/* Interactive Diagram */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Interactive Diagram</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                showLabels ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                showAnnotations ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              Annotations
            </button>
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
          <svg className="w-full" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="500" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">
              48V Off-Grid System - Whole Home Setup
            </text>

            {/* Solar Array */}
            <rect x="50" y="60" width="180" height="80" rx="10" fill="#3182ce" />
            <text x="140" y="90" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Panel 1</text>
            <text x="140" y="110" textAnchor="middle" fontSize="10" fill="white">400W</text>

            <rect x="50" y="160" width="180" height="80" rx="10" fill="#3182ce" />
            <text x="140" y="190" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Panel 2</text>
            <text x="140" y="210" textAnchor="middle" fontSize="10" fill="white">400W</text>

            <rect x="50" y="260" width="180" height="80" rx="10" fill="#3182ce" />
            <text x="140" y="290" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Panel 3</text>
            <text x="140" y="310" textAnchor="middle" fontSize="10" fill="white">400W</text>

            <rect x="50" y="360" width="180" height="80" rx="10" fill="#3182ce" />
            <text x="140" y="390" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Panel 4</text>
            <text x="140" y="410" textAnchor="middle" fontSize="10" fill="white">400W</text>

            {/* Series Connections */}
            <line x1="230" y1="100" x2="260" y2="100" stroke="#f56565" strokeWidth="2" />
            <line x1="260" y1="100" x2="260" y2="200" stroke="#f56565" strokeWidth="2" />
            <line x1="260" y1="200" x2="230" y2="200" stroke="#f56565" strokeWidth="2" />
            <line x1="230" y1="200" x2="260" y2="200" stroke="#f56565" strokeWidth="2" />
            <line x1="260" y1="200" x2="260" y2="300" stroke="#f56565" strokeWidth="2" />
            <line x1="260" y1="300" x2="230" y2="300" stroke="#f56565" strokeWidth="2" />
            <line x1="230" y1="300" x2="260" y2="300" stroke="#f56565" strokeWidth="2" />
            <line x1="260" y1="300" x2="260" y2="400" stroke="#f56565" strokeWidth="2" />
            <line x1="260" y1="400" x2="230" y2="400" stroke="#f56565" strokeWidth="2" />

            {/* Charge Controller */}
            <rect x="330" y="140" width="160" height="90" rx="10" fill="#f5a623" />
            <text x="410" y="180" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Charge</text>
            <text x="410" y="200" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Controller</text>
            {showLabels && (
              <text x="410" y="220" textAnchor="middle" fontSize="10" fill="#fff5e6">48V MPPT</text>
            )}

            {/* Battery Bank */}
            <rect x="330" y="280" width="160" height="120" rx="10" fill="#48bb78" />
            <text x="410" y="320" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Battery Bank</text>
            <text x="410" y="340" textAnchor="middle" fontSize="11" fill="white">4 × 12V</text>
            <text x="410" y="360" textAnchor="middle" fontSize="10" fill="white">or 48V LFP</text>
            {showLabels && (
              <text x="410" y="385" textAnchor="middle" fontSize="9" fill="#c6f6d5">400-800Ah</text>
            )}

            {/* Inverter */}
            <rect x="560" y="140" width="180" height="90" rx="10" fill="#ed8936" />
            <text x="650" y="180" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Inverter</text>
            <text x="650" y="200" textAnchor="middle" fontSize="12" fill="white">5000-8000W</text>
            {showLabels && (
              <text x="650" y="220" textAnchor="middle" fontSize="10" fill="#fffaf0">48V → 240V</text>
            )}

            {/* AC Load */}
            <rect x="560" y="280" width="180" height="120" rx="10" fill="#9f7aea" />
            <text x="650" y="320" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">AC Load</text>
            <text x="650" y="340" textAnchor="middle" fontSize="11" fill="white">Whole Home</text>
            {showLabels && (
              <text x="650" y="365" textAnchor="middle" fontSize="9" fill="#e9d8fd">120/240V</text>
            )}

            {/* Wiring */}
            <line x1="230" y1="100" x2="330" y2="140" stroke="#f56565" strokeWidth="3" />
            <line x1="230" y1="400" x2="290" y2="400" stroke="#4299e1" strokeWidth="3" />
            <line x1="290" y1="400" x2="290" y2="185" stroke="#4299e1" strokeWidth="3" />
            <line x1="290" y1="185" x2="330" y2="185" stroke="#4299e1" strokeWidth="3" />

            <line x1="410" y1="230" x2="410" y2="280" stroke="#48bb78" strokeWidth="4" />

            <line x1="490" y1="330" x2="560" y2="185" stroke="#ed8936" strokeWidth="4" />
            <line x1="650" y1="230" x2="650" y2="280" stroke="#9f7aea" strokeWidth="3" />

            {/* Labels */}
            {showLabels && (
              <>
                <text x="280" y="90" textAnchor="middle" fontSize="10" fill="#4a5568">Series</text>
                <text x="410" y="260" textAnchor="middle" fontSize="10" fill="#4a5568">48V DC</text>
                <text x="530" y="260" textAnchor="middle" fontSize="10" fill="#4a5568">48V → Inverter</text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* 48V Advantages */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose a 48V System?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Key Advantages</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Less current = thinner wire = lower cost',
                'Higher efficiency (less heat loss)',
                'Supports larger inverters (5kW+)',
                'Better for whole home backup',
                'Scalable to 10kW+ systems',
                'Compatible with most grid-tie inverters'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Considerations</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Higher initial component cost',
                'More batteries needed (4 × 12V)',
                'More complex wiring',
                'May need professional installation',
                'Not suitable for small systems',
                'Requires careful balancing'
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

      {/* Wire Gauge Requirements */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Wire Gauge for 48V Systems</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Connection</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Current</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Recommended Wire</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Max Length</th>
              </tr>
            </thead>
            <tbody>
              {[
                { connection: 'Solar → Controller', current: '15-30A', wire: '6 AWG', length: '30 ft' },
                { connection: 'Controller → Battery', current: '30-50A', wire: '4 AWG', length: '10 ft' },
                { connection: 'Battery → Inverter', current: '100-150A', wire: '2/0 AWG', length: '5 ft' },
                { connection: 'Inverter → AC Panel', current: '30-40A', wire: '8 AWG', length: '20 ft' }
              ].map(row => (
                <tr key={row.connection} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.connection}</td>
                  <td className="px-4 py-3 text-sm">{row.current}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{row.wire}</td>
                  <td className="px-4 py-3 text-sm">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ 48V System Safety</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>48V can be dangerous - always follow safety protocols</li>
              <li>Use appropriate fuses/breakers on all circuits</li>
              <li>Ensure proper battery balancing</li>
              <li>Never work on live circuits</li>
              <li>Consider professional installation for whole home systems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Power Your Whole Home?
        </h2>
        <p className="text-gray-600 mb-4">
          Calculate your energy needs and get the right 48V components.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/products/components" className="ebay-btn-secondary">
            Shop 48V Components
          </Link>
        </div>
      </div>
    </div>
  )
}