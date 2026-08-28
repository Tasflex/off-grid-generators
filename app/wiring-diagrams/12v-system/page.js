'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Info, AlertTriangle, ArrowRight, Calendar, Clock, Check, X, Battery, Zap, Home, Caravan } from 'lucide-react'

export default function TwelveVoltSystemDiagram() {
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
        <span className="text-gray-900">12V System Wiring</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Van Life & Camping</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">12V System Wiring Diagram</h1>
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
          <svg className="w-full" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="450" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">
              12V Off-Grid System - Van Life Setup
            </text>

            {/* Solar Panel */}
            <rect x="50" y="80" width="180" height="90" rx="10" fill="#3182ce" />
            <text x="140" y="115" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Solar Panel</text>
            <text x="140" y="135" textAnchor="middle" fontSize="12" fill="white">200W Max</text>
            {showLabels && (
              <text x="140" y="158" textAnchor="middle" fontSize="10" fill="#e2e8f0">18V VOC / 10A</text>
            )}

            {/* Solar Panel 2 */}
            <rect x="50" y="190" width="180" height="90" rx="10" fill="#3182ce" />
            <text x="140" y="225" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Solar Panel</text>
            <text x="140" y="245" textAnchor="middle" fontSize="12" fill="white">200W Max</text>
            {showLabels && (
              <text x="140" y="268" textAnchor="middle" fontSize="10" fill="#e2e8f0">18V VOC / 10A</text>
            )}

            {/* Charge Controller */}
            <rect x="310" y="100" width="160" height="80" rx="10" fill="#f5a623" />
            <text x="390" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Charge</text>
            <text x="390" y="155" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Controller</text>
            {showLabels && (
              <text x="390" y="175" textAnchor="middle" fontSize="10" fill="#fff5e6">12V MPPT</text>
            )}

            {/* Battery */}
            <rect x="310" y="220" width="160" height="90" rx="10" fill="#48bb78" />
            <text x="390" y="260" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Battery</text>
            <text x="390" y="280" textAnchor="middle" fontSize="12" fill="white">100-200Ah</text>
            {showLabels && (
              <text x="390" y="300" textAnchor="middle" fontSize="10" fill="#c6f6d5">12V LiFePO4</text>
            )}

            {/* 12V Loads */}
            <rect x="550" y="100" width="150" height="80" rx="10" fill="#9f7aea" />
            <text x="625" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">12V Loads</text>
            <text x="625" y="155" textAnchor="middle" fontSize="12" fill="white">Lights & USB</text>
            {showLabels && (
              <text x="625" y="175" textAnchor="middle" fontSize="10" fill="#e9d8fd">12V DC</text>
            )}

            {/* Inverter */}
            <rect x="550" y="220" width="150" height="80" rx="10" fill="#ed8936" />
            <text x="625" y="255" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Inverter</text>
            <text x="625" y="275" textAnchor="middle" fontSize="12" fill="white">600-1000W</text>
            {showLabels && (
              <text x="625" y="295" textAnchor="middle" fontSize="10" fill="#fffaf0">12V → 120V</text>
            )}

            {/* Fuse Box */}
            <rect x="550" y="340" width="150" height="70" rx="10" fill="#718096" />
            <text x="625" y="375" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Fuse Box</text>
            {showLabels && (
              <text x="625" y="395" textAnchor="middle" fontSize="10" fill="#e2e8f0">Distribution</text>
            )}

            {/* Wiring Lines */}
            {/* Solar to Controller */}
            <line x1="230" y1="125" x2="310" y2="125" stroke="#f56565" strokeWidth="3" />
            <line x1="230" y1="235" x2="270" y2="235" stroke="#f56565" strokeWidth="3" />
            <line x1="270" y1="235" x2="270" y2="125" stroke="#f56565" strokeWidth="3" />
            <line x1="270" y1="125" x2="310" y2="125" stroke="#f56565" strokeWidth="3" />

            {/* Controller to Battery */}
            <line x1="390" y1="180" x2="390" y2="220" stroke="#48bb78" strokeWidth="4" />

            {/* Battery to 12V Loads */}
            <line x1="470" y1="260" x2="520" y2="260" stroke="#48bb78" strokeWidth="3" />
            <line x1="520" y1="260" x2="520" y2="140" stroke="#48bb78" strokeWidth="3" />
            <line x1="520" y1="140" x2="550" y2="140" stroke="#48bb78" strokeWidth="3" />

            {/* Battery to Inverter */}
            <line x1="470" y1="260" x2="550" y2="260" stroke="#ed8936" strokeWidth="4" />

            {/* Inverter to AC Loads */}
            <line x1="625" y1="300" x2="625" y2="340" stroke="#9f7aea" strokeWidth="3" />

            {/* Labels */}
            {showLabels && (
              <>
                <text x="270" y="115" textAnchor="middle" fontSize="10" fill="#4a5568">DC Cables</text>
                <text x="390" y="205" textAnchor="middle" fontSize="10" fill="#4a5568">DC Power</text>
                <text x="500" y="130" textAnchor="middle" fontSize="10" fill="#4a5568">12V Distribution</text>
                <text x="500" y="250" textAnchor="middle" fontSize="10" fill="#4a5568">12V → Inverter</text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Component Details */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Required Components for 12V System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: Sun,
              title: 'Solar Panel Array',
              items: [
                '1-2 × 200W panels (12V nominal)',
                'Panel voltage: 18-22V VOC',
                'Panel current: 10-12A each',
                'Total power: 200-400W'
              ]
            },
            {
              icon: Zap,
              title: 'Charge Controller',
              items: [
                '12V MPPT controller',
                'Rating: 30-40A',
                'Efficiency: 95%+',
                'Max PV input: 50V'
              ]
            },
            {
              icon: Battery,
              title: 'Battery Bank',
              items: [
                '12V LiFePO4 or AGM',
                'Capacity: 100-200Ah',
                'Discharge rate: 0.5C max',
                'BMS protection built-in'
              ]
            },
            {
              icon: Home,
              title: 'Inverter',
              items: [
                '600-1000W pure sine',
                '12V input',
                '120V output',
                'Surge: 2× continuous'
              ]
            }
          ].map(component => {
            const Icon = component.icon
            return (
              <div key={component.title} className="bg-gray-50 rounded p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{component.title}</h3>
                </div>
                <ul className="space-y-1">
                  {component.items.map(item => (
                    <li key={item} className="flex items-start text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Wire Gauge Table */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Wire Sizes</h2>
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
                { connection: 'Solar Panel → Controller', current: '10-20A', wire: '10 AWG', length: '20 ft' },
                { connection: 'Controller → Battery', current: '20-30A', wire: '8 AWG', length: '5 ft' },
                { connection: 'Battery → Inverter', current: '80-100A', wire: '4 AWG', length: '3 ft' },
                { connection: 'Battery → 12V Loads', current: '10-20A', wire: '12 AWG', length: '15 ft' },
                { connection: 'Inverter → AC', current: '8-10A', wire: '14 AWG', length: '10 ft' }
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
            <h2 className="font-semibold text-red-800 mb-2">⚠️ 12V System Safety Notes</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Use proper fuses - a 12V system can still cause fires</li>
              <li>Always fuse the battery positive line within 12 inches of the battery</li>
              <li>Use the correct gauge wire for your current draw</li>
              <li>Never connect 12V appliances directly to panels without a controller</li>
              <li>Check all connections periodically for signs of corrosion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Build Your Van System?
        </h2>
        <p className="text-gray-600 mb-4">
          Check out our recommended 12V components or use our calculators.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/products/components" className="ebay-btn-secondary">
            Shop 12V Components
          </Link>
        </div>
      </div>
    </div>
  )
}