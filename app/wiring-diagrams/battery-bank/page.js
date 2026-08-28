'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Battery, Info, AlertTriangle, ArrowRight, Calendar, Clock, Check, X } from 'lucide-react'

export default function BatteryBankWiringDiagram() {
  const [batteryCount, setBatteryCount] = useState(2)
  const [configuration, setConfiguration] = useState('series')

  const batteryVoltage = 12
  const batteryCapacity = 100 // Ah

  const calculateOutput = () => {
    if (configuration === 'series') {
      return {
        voltage: batteryVoltage * batteryCount,
        capacity: batteryCapacity,
        totalWh: batteryVoltage * batteryCount * batteryCapacity
      }
    } else {
      return {
        voltage: batteryVoltage,
        capacity: batteryCapacity * batteryCount,
        totalWh: batteryVoltage * batteryCapacity * batteryCount
      }
    }
  }

  const results = calculateOutput()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Battery Bank Wiring</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Battery Bank Wiring Diagram</h1>
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

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Battery Configuration Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Batteries</label>
            <input
              type="number"
              value={batteryCount}
              onChange={(e) => setBatteryCount(parseInt(e.target.value))}
              className="ebay-input"
              min="1"
              max="8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Configuration</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setConfiguration('series')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  configuration === 'series' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
              >
                Series
              </button>
              <button
                onClick={() => setConfiguration('parallel')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  configuration === 'parallel' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
              >
                Parallel
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Voltage</div>
              <div className="text-lg font-bold">{results.voltage}V</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Capacity</div>
              <div className="text-lg font-bold">{results.capacity}Ah</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Energy</div>
              <div className="text-lg font-bold">{results.totalWh}Wh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wiring Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Series Diagram */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Series Wiring</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg className="w-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Battery 1 */}
              <rect x="50" y="50" width="80" height="100" rx="10" fill="#48bb78" />
              <text x="90" y="95" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">12V</text>
              <text x="90" y="115" textAnchor="middle" fontSize="10" fill="white">100Ah</text>
              <text x="90" y="135" textAnchor="middle" fontSize="8" fill="white">+</text>

              {/* Battery 2 */}
              <rect x="170" y="50" width="80" height="100" rx="10" fill="#48bb78" />
              <text x="210" y="95" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">12V</text>
              <text x="210" y="115" textAnchor="middle" fontSize="10" fill="white">100Ah</text>
              <text x="210" y="135" textAnchor="middle" fontSize="8" fill="white">+</text>

              {/* Wiring */}
              <line x1="130" y1="60" x2="170" y2="60" stroke="#f56565" strokeWidth="3" />
              <line x1="90" y1="50" x2="90" y2="20" stroke="#f56565" strokeWidth="3" />
              <line x1="210" y1="150" x2="210" y2="180" stroke="#4299e1" strokeWidth="3" />

              {/* Labels */}
              <text x="150" y="50" textAnchor="middle" fontSize="10" fill="#4a5568">+ to -</text>
              <text x="90" y="15" textAnchor="middle" fontSize="10" fill="#f56565">+ Output</text>
              <text x="210" y="190" textAnchor="middle" fontSize="10" fill="#4299e1">- Output</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Connect positive to negative. Voltage adds, capacity stays same.
          </p>
        </div>

        {/* Parallel Diagram */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Parallel Wiring</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg className="w-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Battery 1 */}
              <rect x="50" y="50" width="80" height="100" rx="10" fill="#48bb78" />
              <text x="90" y="95" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">12V</text>
              <text x="90" y="115" textAnchor="middle" fontSize="10" fill="white">100Ah</text>

              {/* Battery 2 */}
              <rect x="170" y="50" width="80" height="100" rx="10" fill="#48bb78" />
              <text x="210" y="95" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">12V</text>
              <text x="210" y="115" textAnchor="middle" fontSize="10" fill="white">100Ah</text>

              {/* Wiring - Bus bars */}
              <line x1="40" y1="60" x2="260" y2="60" stroke="#f56565" strokeWidth="3" />
              <line x1="40" y1="140" x2="260" y2="140" stroke="#4299e1" strokeWidth="3" />
              <line x1="40" y1="60" x2="40" y2="180" stroke="#f56565" strokeWidth="3" />
              <line x1="260" y1="140" x2="260" y2="180" stroke="#4299e1" strokeWidth="3" />

              {/* Labels */}
              <text x="40" y="190" textAnchor="middle" fontSize="10" fill="#f56565">+ Output</text>
              <text x="260" y="190" textAnchor="middle" fontSize="10" fill="#4299e1">- Output</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Connect all positives together, all negatives together. Voltage same, capacity adds.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series vs Parallel Comparison</h2>
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
                { feature: 'Voltage', series: 'Adds up (12V × N)', parallel: 'Stays same (12V)' },
                { feature: 'Capacity', series: 'Stays same (100Ah)', parallel: 'Adds up (100Ah × N)' },
                { feature: 'Total Energy', series: 'Same', parallel: 'Same' },
                { feature: 'Best For', series: '24V/48V systems', parallel: '12V systems' },
                { feature: 'Wire Gauge', series: 'Thinner wire OK', parallel: 'Need thicker wire' },
                { feature: 'Balance', series: 'Can be unbalanced', parallel: 'Naturally balanced' }
              ].map(row => (
                <tr key={row.feature} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-sm">{row.series}</td>
                  <td className="px-4 py-3 text-sm">{row.parallel}</td>
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
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Battery Safety</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Always use same type/brand/age batteries together</li>
              <li>Add fuses between batteries and rest of system</li>
              <li>Use proper gauge wire for high current</li>
              <li>Ensure proper ventilation</li>
              <li>Never short circuit batteries</li>
              <li>Wear safety equipment when handling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Batteries for Your System?
        </h2>
        <p className="text-gray-600 mb-4">
          Browse our recommended battery options or calculate your exact requirements.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/products/battery-backups" className="ebay-btn-primary">
            Shop Batteries
          </Link>
          <Link href="/calculators/solar-sizing" className="ebay-btn-secondary">
            Calculate Your Needs
          </Link>
        </div>
      </div>
    </div>
  )
}