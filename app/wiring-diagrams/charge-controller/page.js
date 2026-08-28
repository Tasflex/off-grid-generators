'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Battery, Zap, AlertTriangle, Check, X, ArrowRight, Calendar, Clock, Info } from 'lucide-react'

export default function ChargeControllerSetupDiagram() {
  const [panelWatts, setPanelWatts] = useState(400)
  const [systemVoltage, setSystemVoltage] = useState(12)
  const [controllerType, setControllerType] = useState('mppt')

  const calculatePWMCurrent = () => {
    return Math.ceil(panelWatts / systemVoltage)
  }

  const calculateMPPTCurrent = () => {
    return Math.ceil(panelWatts / systemVoltage * 0.9)
  }

  const current = controllerType === 'mppt' ? calculateMPPTCurrent() : calculatePWMCurrent()

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Charge Controller Setup</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Charge Controller Setup Diagram</h1>
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

      {/* Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Charge Controller Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panel Wattage (W)</label>
            <input
              type="number"
              value={panelWatts}
              onChange={(e) => setPanelWatts(parseInt(e.target.value))}
              className="ebay-input"
              min="100"
              step="50"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Controller Type</label>
            <select
              value={controllerType}
              onChange={(e) => setControllerType(e.target.value)}
              className="ebay-input"
            >
              <option value="mppt">MPPT</option>
              <option value="pwm">PWM</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Recommended Controller</h3>
          <div className="bg-white rounded p-4 text-center">
            <div className="text-sm text-gray-500">Minimum Controller Rating</div>
            <div className="text-2xl font-bold text-blue-600">{current}A</div>
            <div className="text-xs text-gray-500 mt-1">Recommended: {Math.ceil(current * 1.25)}A</div>
          </div>
        </div>
      </div>

      {/* Wiring Diagram */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connection Diagram</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="w-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Solar Panel */}
            <rect x="50" y="100" width="150" height="100" rx="10" fill="#3182ce" />
            <text x="125" y="145" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Solar</text>
            <text x="125" y="165" textAnchor="middle" fontSize="12" fill="white">Panel</text>

            {/* Charge Controller */}
            <rect x="300" y="80" width="200" height="140" rx="10" fill="#f5a623" />
            <text x="400" y="130" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Charge</text>
            <text x="400" y="150" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Controller</text>
            <text x="400" y="175" textAnchor="middle" fontSize="10" fill="#fff5e6">{controllerType.toUpperCase()}</text>
            
            {/* Terminals */}
            <text x="350" y="200" textAnchor="middle" fontSize="9" fill="#fff5e6">PV+</text>
            <text x="350" y="215" textAnchor="middle" fontSize="9" fill="#fff5e6">PV-</text>
            <text x="450" y="200" textAnchor="middle" fontSize="9" fill="#fff5e6">BAT+</text>
            <text x="450" y="215" textAnchor="middle" fontSize="9" fill="#fff5e6">BAT-</text>

            {/* Battery */}
            <rect x="580" y="100" width="150" height="100" rx="10" fill="#48bb78" />
            <text x="655" y="145" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Battery</text>
            <text x="655" y="165" textAnchor="middle" fontSize="10" fill="white">{systemVoltage}V</text>

            {/* Wiring */}
            <line x1="200" y1="120" x2="300" y2="120" stroke="#f56565" strokeWidth="3" />
            <line x1="200" y1="170" x2="300" y2="170" stroke="#4299e1" strokeWidth="3" />
            <line x1="500" y1="120" x2="580" y2="120" stroke="#48bb78" strokeWidth="4" />
            <line x1="500" y1="170" x2="580" y2="170" stroke="#48bb78" strokeWidth="4" />

            {/* Labels */}
            <text x="250" y="110" textAnchor="middle" fontSize="10" fill="#f56565">+</text>
            <text x="250" y="185" textAnchor="middle" fontSize="10" fill="#4299e1">-</text>
            <text x="540" y="110" textAnchor="middle" fontSize="10" fill="#48bb78">+</text>
            <text x="540" y="185" textAnchor="middle" fontSize="10" fill="#48bb78">-</text>

            {/* Temperature Sensor */}
            <rect x="450" y="280" width="120" height="40" rx="5" fill="#718096" />
            <text x="510" y="300" textAnchor="middle" fontSize="10" fill="white">Temp Sensor</text>
            <line x1="450" y1="300" x2="400" y2="300" stroke="#718096" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* MPPT vs PWM */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">MPPT vs PWM Controller</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Feature</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">MPPT</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">PWM</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Efficiency', mppt: '95-98%', pwm: '75-85%' },
                { feature: 'Best For', mppt: 'Large systems, cold weather', pwm: 'Small systems, warm weather' },
                { feature: 'Cost', mppt: '$100-300', pwm: '$30-80' },
                { feature: 'Voltage Flexibility', mppt: 'Very flexible', pwm: 'Limited' },
                { feature: 'Panel Sizing', mppt: 'Can oversize panels', pwm: 'Must match voltage' },
                { feature: 'Warranty', mppt: '5-10 years', pwm: '2-5 years' }
              ].map(row => (
                <tr key={row.feature} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.feature}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{row.mppt}</td>
                  <td className="px-4 py-3 text-sm">{row.pwm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Setup Steps</h2>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Mount Controller',
              description: 'Mount charge controller in a dry, well-ventilated location.',
              details: ['Near battery bank', 'Allow air circulation', 'Protect from weather']
            },
            {
              step: 2,
              title: 'Connect Battery First',
              description: 'Always connect battery to controller before solar panels.',
              details: ['Connect BAT+ and BAT-', 'Controller will initialize', 'Never reverse polarity']
            },
            {
              step: 3,
              title: 'Connect Solar Panels',
              description: 'Connect solar panels to PV terminals.',
              details: ['Check voltage with multimeter', 'Connect PV+ and PV-', 'Controller begins charging']
            },
            {
              step: 4,
              title: 'Configure Settings',
              description: 'Set battery type and charging parameters.',
              details: ['Set battery chemistry', 'Configure charge voltage', 'Set load settings']
            },
            {
              step: 5,
              title: 'Verify Operation',
              description: 'Monitor system to ensure proper operation.',
              details: ['Check display indicators', 'Verify charging voltage', 'Monitor battery level']
            }
          ].map(step => (
            <div key={step.step} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
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
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Charge Controller Safety</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Always connect battery BEFORE solar panels</li>
              <li>Check maximum PV voltage rating</li>
              <li>Never exceed controller current rating</li>
              <li>Ensure proper polarity on all connections</li>
              <li>Keep controller away from water</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need a Charge Controller?
        </h2>
        <p className="text-gray-600 mb-4">
          Browse our recommended charge controllers for your system.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/products/charge-controllers" className="ebay-btn-primary">
            Shop Controllers
          </Link>
          <Link href="/calculators/charge-controller-sizing" className="ebay-btn-secondary">
            Size Your Controller
          </Link>
        </div>
      </div>
    </div>
  )
}