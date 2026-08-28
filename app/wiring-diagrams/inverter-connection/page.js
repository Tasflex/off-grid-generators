'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Battery, Zap, AlertTriangle, Check, X, ArrowRight, Calendar, Clock, Info } from 'lucide-react'

export default function InverterConnectionDiagram() {
  const [inverterWattage, setInverterWattage] = useState(2000)
  const [systemVoltage, setSystemVoltage] = useState(12)

  const calculateCurrent = () => {
    return Math.ceil(inverterWattage / systemVoltage)
  }

  const calculateRecommendedWire = () => {
    const current = calculateCurrent()
    if (current < 100) return '4 AWG'
    if (current < 150) return '2 AWG'
    if (current < 200) return '1/0 AWG'
    return '2/0 AWG'
  }

  const calculateFuse = () => {
    return Math.ceil(calculateCurrent() * 1.25)
  }

  const current = calculateCurrent()
  const recommendedWire = calculateRecommendedWire()
  const fuseSize = calculateFuse()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Inverter Connection</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Inverter Connection Diagram</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            4 min read
          </span>
        </div>
      </div>

      {/* Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Inverter Wire Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inverter Wattage (W)</label>
            <input
              type="number"
              value={inverterWattage}
              onChange={(e) => setInverterWattage(parseInt(e.target.value))}
              className="ebay-input"
              min="100"
              step="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">System Voltage (V)</label>
            <select
              value={systemVoltage}
              onChange={(e) => setSystemVoltage(parseInt(e.target.value))}
              className="ebay-input"
            >
              <option value="12">12V</option>
              <option value="24">24V</option>
              <option value="48">48V</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Recommended Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Maximum Current</div>
              <div className="text-lg font-bold text-blue-600">{current}A</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Wire Gauge</div>
              <div className="text-lg font-bold text-green-600">{recommendedWire}</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Fuse Size</div>
              <div className="text-lg font-bold text-red-600">{fuseSize}A</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wiring Diagram */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connection Diagram</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="w-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Battery */}
            <rect x="50" y="150" width="150" height="100" rx="10" fill="#48bb78" />
            <text x="125" y="195" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Battery</text>
            <text x="125" y="215" textAnchor="middle" fontSize="10" fill="white">{systemVoltage}V</text>

            {/* Fuse */}
            <rect x="250" y="175" width="80" height="50" rx="5" fill="#f56565" />
            <text x="290" y="200" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Fuse</text>
            <text x="290" y="215" textAnchor="middle" fontSize="9" fill="white">{fuseSize}A</text>

            {/* Inverter */}
            <rect x="400" y="100" width="200" height="200" rx="10" fill="#ed8936" />
            <text x="500" y="185" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Inverter</text>
            <text x="500" y="205" textAnchor="middle" fontSize="11" fill="white">{inverterWattage}W</text>
            
            {/* DC Input */}
            <text x="500" y="240" textAnchor="middle" fontSize="10" fill="#fff5e6">DC Input</text>
            <text x="500" y="255" textAnchor="middle" fontSize="10" fill="#fff5e6">{systemVoltage}V</text>

            {/* AC Output */}
            <text x="500" y="270" textAnchor="middle" fontSize="10" fill="#fff5e6">AC Output</text>
            <text x="500" y="285" textAnchor="middle" fontSize="10" fill="#fff5e6">120/240V</text>

            {/* Wiring - Positive */}
            <line x1="200" y1="180" x2="250" y2="180" stroke="#f56565" strokeWidth="4" />
            <line x1="330" y1="180" x2="400" y2="180" stroke="#f56565" strokeWidth="4" />
            <text x="365" y="170" textAnchor="middle" fontSize="10" fill="#f56565">+</text>

            {/* Wiring - Negative */}
            <line x1="200" y1="230" x2="400" y2="230" stroke="#4299e1" strokeWidth="4" />
            <text x="300" y="220" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>

            {/* AC Output Wiring */}
            <line x1="600" y1="160" x2="700" y2="160" stroke="#9f7aea" strokeWidth="3" />
            <line x1="600" y1="190" x2="700" y2="190" stroke="#9f7aea" strokeWidth="3" />
            <text x="650" y="150" textAnchor="middle" fontSize="10" fill="#9f7aea">L</text>
            <text x="650" y="205" textAnchor="middle" fontSize="10" fill="#9f7aea">N</text>

            {/* Ground */}
            <line x1="500" y1="300" x2="500" y2="350" stroke="#718096" strokeWidth="3" />
            <text x="500" y="370" textAnchor="middle" fontSize="10" fill="#718096">Ground</text>
          </svg>
        </div>
      </div>

      {/* Connection Steps */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connection Steps</h2>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Disconnect Power',
              description: 'Ensure all power sources are disconnected before starting.',
              details: ['Turn off inverter', 'Disconnect battery negative first']
            },
            {
              step: 2,
              title: 'Install Fuse/Disconnect',
              description: 'Install a fuse or breaker between battery and inverter.',
              details: ['Mount fuse holder near battery', 'Use appropriate fuse size', 'Keep within 12 inches of battery']
            },
            {
              step: 3,
              title: 'Connect Positive Wire',
              description: 'Connect battery positive to inverter positive terminal.',
              details: ['Use proper gauge wire', 'Connect to fuse side first', 'Tighten connections securely']
            },
            {
              step: 4,
              title: 'Connect Negative Wire',
              description: 'Connect battery negative to inverter negative terminal.',
              details: ['Connect negative last', 'Ensure proper grounding', 'Check all connections']
            },
            {
              step: 5,
              title: 'Connect AC Output',
              description: 'Connect the inverter output to your AC loads.',
              details: ['Connect L (hot) and N (neutral)', 'Ground properly', 'Test with multimeter']
            }
          ].map(step => (
            <div key={step.step} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
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

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Inverter Safety</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Always use fuses/breakers for protection</li>
              <li>Never connect inverter to live AC grid</li>
              <li>Ensure proper ventilation for inverter</li>
              <li>Use appropriate wire gauge for current</li>
              <li>Check polarity before connecting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need an Inverter?
        </h2>
        <p className="text-gray-600 mb-4">
          Browse our recommended inverters for your system size.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/products/inverters" className="ebay-btn-primary">
            Shop Inverters
          </Link>
          <Link href="/calculators/inverter-sizing" className="ebay-btn-secondary">
            Calculate Inverter Size
          </Link>
        </div>
      </div>
    </div>
  )
}