'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Info, AlertTriangle, ArrowRight, Calendar, Clock, Check, X, Battery, Zap, Home } from 'lucide-react'

export default function TwentyFourVoltSystemDiagram() {
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
        <span className="text-gray-900">24V System Wiring</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Small Homes & RVs</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">24V System Wiring Diagram</h1>
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
          <svg className="w-full" viewBox="0 0 900 550" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="450" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">
              24V Off-Grid System - Small Home / RV Setup
            </text>

            {/* Solar Array */}
            <rect x="50" y="60" width="180" height="90" rx="10" fill="#3182ce" />
            <text x="140" y="95" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Solar Panel 1</text>
            <text x="140" y="115" textAnchor="middle" fontSize="11" fill="white">300W</text>
            {showLabels && (
              <text x="140" y="138" textAnchor="middle" fontSize="9" fill="#e2e8f0">37V VOC / 9A</text>
            )}

            <rect x="50" y="170" width="180" height="90" rx="10" fill="#3182ce" />
            <text x="140" y="205" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Solar Panel 2</text>
            <text x="140" y="225" textAnchor="middle" fontSize="11" fill="white">300W</text>
            {showLabels && (
              <text x="140" y="248" textAnchor="middle" fontSize="9" fill="#e2e8f0">37V VOC / 9A</text>
            )}

            {/* Series Connection */}
            <line x1="230" y1="105" x2="260" y2="105" stroke="#f56565" strokeWidth="3" />
            <line x1="260" y1="105" x2="260" y2="215" stroke="#f56565" strokeWidth="3" />
            <line x1="260" y1="215" x2="230" y2="215" stroke="#f56565" strokeWidth="3" />

            {/* Charge Controller */}
            <rect x="310" y="100" width="160" height="80" rx="10" fill="#f5a623" />
            <text x="390" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Charge</text>
            <text x="390" y="155" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Controller</text>
            {showLabels && (
              <text x="390" y="175" textAnchor="middle" fontSize="10" fill="#fff5e6">24V MPPT</text>
            )}

            {/* Battery Bank */}
            <rect x="310" y="230" width="160" height="100" rx="10" fill="#48bb78" />
            <text x="390" y="265" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Battery Bank</text>
            <text x="390" y="285" textAnchor="middle" fontSize="11" fill="white">2 × 12V</text>
            {showLabels && (
              <text x="390" y="305" textAnchor="middle" fontSize="9" fill="#c6f6d5">200-400Ah</text>
            )}

            {/* Inverter */}
            <rect x="550" y="100" width="160" height="80" rx="10" fill="#ed8936" />
            <text x="630" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Inverter</text>
            <text x="630" y="155" textAnchor="middle" fontSize="12" fill="white">2000-3000W</text>
            {showLabels && (
              <text x="630" y="175" textAnchor="middle" fontSize="10" fill="#fffaf0">24V → 120V</text>
            )}

            {/* AC Load */}
            <rect x="550" y="230" width="160" height="100" rx="10" fill="#9f7aea" />
            <text x="630" y="265" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">AC Load</text>
            <text x="630" y="285" textAnchor="middle" fontSize="11" fill="white">Appliances</text>
            {showLabels && (
              <text x="630" y="305" textAnchor="middle" fontSize="9" fill="#e9d8fd">120V</text>
            )}

            {/* Wiring */}
            <line x1="230" y1="105" x2="310" y2="105" stroke="#f56565" strokeWidth="3" />
            <line x1="230" y1="215" x2="270" y2="215" stroke="#4299e1" strokeWidth="3" />
            <line x1="270" y1="215" x2="270" y2="140" stroke="#4299e1" strokeWidth="3" />
            <line x1="270" y1="140" x2="310" y2="140" stroke="#4299e1" strokeWidth="3" />

            <line x1="390" y1="180" x2="390" y2="230" stroke="#48bb78" strokeWidth="4" />

            <line x1="470" y1="280" x2="550" y2="140" stroke="#ed8936" strokeWidth="4" />
            <line x1="630" y1="180" x2="630" y2="230" stroke="#9f7aea" strokeWidth="3" />

            {/* Labels */}
            {showLabels && (
              <>
                <text x="270" y="95" textAnchor="middle" fontSize="10" fill="#4a5568">Series Connection</text>
                <text x="390" y="210" textAnchor="middle" fontSize="10" fill="#4a5568">24V DC</text>
                <text x="510" y="210" textAnchor="middle" fontSize="10" fill="#4a5568">24V → Inverter</text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* 12V vs 24V Comparison */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">12V vs 24V System Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Feature</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">12V System</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">24V System</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Best For', v12: 'Small van/camper systems', v24: 'RVs, small homes, cabins' },
                { feature: 'Max Load', v12: '1000W inverter', v24: '3000W+ inverter' },
                { feature: 'Wire Gauge', v12: 'Thicker (4-6 AWG)', v24: 'Thinner (8-10 AWG)' },
                { feature: 'Efficiency', v12: 'Lower', v24: 'Higher' },
                { feature: 'Cost', v12: 'Cheaper', v24: 'Slightly more' },
                { feature: 'Complexity', v12: 'Simpler', v24: 'More complex' }
              ].map(row => (
                <tr key={row.feature} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-sm">{row.v12}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{row.v24}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Component Requirements */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Required Components for 24V System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Solar Panel Array',
              items: ['2-4 × 300W panels', 'Wire in series for 24V', '37V VOC per panel', 'Total power: 600-1200W']
            },
            {
              title: 'Charge Controller',
              items: ['24V MPPT controller', 'Rating: 40-60A', 'Input: up to 150V', 'Efficiency: 96%+']
            },
            {
              title: 'Battery Bank',
              items: ['2 × 12V batteries (series)', 'Or 24V LiFePO4', 'Capacity: 200-400Ah', 'BMS built-in']
            },
            {
              title: 'Inverter',
              items: ['2000-3000W pure sine', '24V input', '120V output', 'Surge: 2× rated']
            }
          ].map(component => (
            <div key={component.title} className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{component.title}</h3>
              <ul className="space-y-1">
                {component.items.map(item => (
                  <li key={item} className="flex items-start text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ 24V System Safety</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Never mix 12V and 24V components</li>
              <li>Use fuse on battery positive line</li>
              <li>Ensure charge controller is rated for 24V</li>
              <li>Check battery balance periodically</li>
              <li>Use proper gauge wire for all connections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Is 24V Right for You?
        </h2>
        <p className="text-gray-600 mb-4">
          Calculate your energy needs to determine the right system voltage.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/products/components" className="ebay-btn-secondary">
            Shop 24V Components
          </Link>
        </div>
      </div>
    </div>
  )
}