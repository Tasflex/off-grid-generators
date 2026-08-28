'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Wrench, Battery, Zap, Home, Check, X, Info, AlertTriangle, ArrowRight, Calendar, Clock, Download, Printer } from 'lucide-react'

export default function BasicOffGridDiagram() {
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
        <span className="text-gray-900">Basic Off-Grid System</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">Wiring Diagram</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Basic Off-Grid Solar System Wiring Diagram</h1>
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
            <button className="px-3 py-1 rounded text-sm font-medium bg-gray-100 hover:bg-gray-200">
              <Printer className="h-4 w-4 inline mr-1" />
              Print
            </button>
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
          <svg className="w-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">
              Basic Off-Grid Solar System
            </text>

            {/* Solar Panel Array */}
            <rect x="50" y="80" width="200" height="100" rx="10" fill="#3182ce" />
            <text x="150" y="115" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Solar Panel</text>
            <text x="150" y="135" textAnchor="middle" fontSize="12" fill="white">Array</text>
            {showLabels && (
              <text x="150" y="160" textAnchor="middle" fontSize="10" fill="#e2e8f0">12V-48V DC</text>
            )}

            {/* Solar Panel 2 */}
            <rect x="50" y="200" width="200" height="100" rx="10" fill="#3182ce" />
            <text x="150" y="235" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Solar Panel</text>
            <text x="150" y="255" textAnchor="middle" fontSize="12" fill="white">Array</text>
            {showLabels && (
              <text x="150" y="280" textAnchor="middle" fontSize="10" fill="#e2e8f0">12V-48V DC</text>
            )}

            {/* Charge Controller */}
            <rect x="350" y="100" width="150" height="80" rx="10" fill="#f5a623" />
            <text x="425" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Charge</text>
            <text x="425" y="155" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Controller</text>
            {showLabels && (
              <text x="425" y="175" textAnchor="middle" fontSize="10" fill="#fff5e6">MPPT/PWM</text>
            )}

            {/* Battery Bank */}
            <rect x="350" y="240" width="150" height="100" rx="10" fill="#48bb78" />
            <text x="425" y="280" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Battery</text>
            <text x="425" y="300" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Bank</text>
            {showLabels && (
              <text x="425" y="320" textAnchor="middle" fontSize="10" fill="#c6f6d5">12V/24V/48V</text>
            )}

            {/* Inverter */}
            <rect x="580" y="100" width="150" height="80" rx="10" fill="#ed8936" />
            <text x="655" y="135" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">Inverter</text>
            <text x="655" y="155" textAnchor="middle" fontSize="12" fill="white">DC → AC</text>
            {showLabels && (
              <text x="655" y="175" textAnchor="middle" fontSize="10" fill="#fffaf0">Pure Sine</text>
            )}

            {/* AC Load */}
            <rect x="580" y="240" width="150" height="100" rx="10" fill="#9f7aea" />
            <text x="655" y="280" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">AC Load</text>
            <text x="655" y="300" textAnchor="middle" fontSize="12" fill="white">Outlets</text>
            {showLabels && (
              <text x="655" y="320" textAnchor="middle" fontSize="10" fill="#e9d8fd">120V/240V AC</text>
            )}

            {/* Wiring Lines */}
            {/* Solar to Controller */}
            <line x1="250" y1="130" x2="350" y2="130" stroke="#3182ce" strokeWidth="3" />
            <line x1="250" y1="250" x2="300" y2="250" stroke="#3182ce" strokeWidth="3" />
            <line x1="300" y1="250" x2="300" y2="130" stroke="#3182ce" strokeWidth="3" />
            <line x1="300" y1="130" x2="350" y2="130" stroke="#3182ce" strokeWidth="3" />
            
            {/* Positive line */}
            <line x1="350" y1="130" x2="350" y2="100" stroke="#f56565" strokeWidth="2" strokeDasharray="5,5" />
            {/* Negative line */}
            <line x1="350" y1="160" x2="350" y2="180" stroke="#4299e1" strokeWidth="2" strokeDasharray="5,5" />

            {/* Controller to Battery */}
            <line x1="425" y1="180" x2="425" y2="240" stroke="#48bb78" strokeWidth="3" />
            
            {/* Battery to Inverter */}
            <line x1="500" y1="290" x2="580" y2="290" stroke="#48bb78" strokeWidth="3" />
            <line x1="500" y1="290" x2="580" y2="140" stroke="#ed8936" strokeWidth="3" />
            
            {/* Inverter to AC Load */}
            <line x1="655" y1="180" x2="655" y2="240" stroke="#9f7aea" strokeWidth="3" />

            {/* Labels */}
            {showLabels && (
              <>
                <text x="300" y="120" textAnchor="middle" fontSize="10" fill="#4a5568">DC Cables</text>
                <text x="425" y="210" textAnchor="middle" fontSize="10" fill="#4a5568">DC Power</text>
                <text x="540" y="275" textAnchor="middle" fontSize="10" fill="#4a5568">DC → AC</text>
              </>
            )}

            {/* Annotations */}
            {showAnnotations && (
              <>
                {/* Solar Annotation */}
                <rect x="20" y="340" width="250" height="120" rx="10" fill="#ffffff" stroke="#3182ce" strokeWidth="1" />
                <text x="145" y="360" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3182ce">Solar Panels</text>
                <text x="145" y="380" textAnchor="middle" fontSize="11" fill="#4a5568">Convert sunlight to DC</text>
                <text x="145" y="400" textAnchor="middle" fontSize="11" fill="#4a5568">electricity</text>
                <text x="145" y="420" textAnchor="middle" fontSize="11" fill="#4a5568">12V-48V output</text>

                {/* Battery Annotation */}
                <rect x="320" y="360" width="250" height="120" rx="10" fill="#ffffff" stroke="#48bb78" strokeWidth="1" />
                <text x="445" y="380" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#48bb78">Battery Bank</text>
                <text x="445" y="400" textAnchor="middle" fontSize="11" fill="#4a5568">Stores energy for</text>
                <text x="445" y="420" textAnchor="middle" fontSize="11" fill="#4a5568">night or cloudy days</text>
                <text x="445" y="440" textAnchor="middle" fontSize="11" fill="#4a5568">12V/24V/48V options</text>

                {/* Inverter Annotation */}
                <rect x="580" y="360" width="200" height="120" rx="10" fill="#ffffff" stroke="#ed8936" strokeWidth="1" />
                <text x="680" y="380" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ed8936">Inverter</text>
                <text x="680" y="400" textAnchor="middle" fontSize="11" fill="#4a5568">Converts DC to AC</text>
                <text x="680" y="420" textAnchor="middle" fontSize="11" fill="#4a5568">for household appliances</text>
                <text x="680" y="440" textAnchor="middle" fontSize="11" fill="#4a5568">120V/240V output</text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Components</h3>
            <div className="space-y-2">
              {[
                { name: 'Solar Panel Array', color: '#3182ce', desc: 'Converts sunlight to DC' },
                { name: 'Charge Controller', color: '#f5a623', desc: 'Regulates charging voltage' },
                { name: 'Battery Bank', color: '#48bb78', desc: 'Stores energy' },
                { name: 'Inverter', color: '#ed8936', desc: 'DC to AC conversion' },
                { name: 'AC Load', color: '#9f7aea', desc: 'Your appliances' }
              ].map(component => (
                <div key={component.name} className="flex items-center">
                  <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: component.color }}></div>
                  <span className="text-sm font-medium">{component.name}</span>
                  <span className="text-sm text-gray-500 ml-2">- {component.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Wiring Types</h3>
            <div className="space-y-2">
              {[
                { type: 'DC Power Cables', color: '#f56565', desc: 'Solar to controller' },
                { type: 'Battery Cables', color: '#48bb78', desc: 'Battery to inverter' },
                { type: 'AC Wiring', color: '#9f7aea', desc: 'Inverter to appliances' }
              ].map(wire => (
                <div key={wire.type} className="flex items-center">
                  <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: wire.color }}></div>
                  <span className="text-sm font-medium">{wire.type}</span>
                  <span className="text-sm text-gray-500 ml-2">- {wire.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wiring Instructions */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Wiring Instructions</h2>
        
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Mount Solar Panels',
              description: 'Install panels on your roof or ground mount in a sunny location.',
              details: ['Secure panels with brackets', 'Ensure proper tilt angle', 'Leave wiring clearance']
            },
            {
              step: 2,
              title: 'Connect Solar Panels to Charge Controller',
              description: 'Run DC cables from panels to the charge controller.',
              details: ['Use MC4 connectors for panel connections', 'Run positive and negative cables', 'Connect to controller terminals']
            },
            {
              step: 3,
              title: 'Connect Charge Controller to Battery',
              description: 'Wire the controller to your battery bank.',
              details: ['Connect positive to positive', 'Connect negative to negative', 'Add fuse for protection']
            },
            {
              step: 4,
              title: 'Connect Battery to Inverter',
              description: 'Wire the battery to your inverter.',
              details: ['Use heavy gauge cables', 'Connect positive to positive', 'Connect negative to negative', 'Install inline fuse']
            },
            {
              step: 5,
              title: 'Connect Inverter to AC Loads',
              description: 'Wire the inverter output to your appliances or breaker panel.',
              details: ['Use appropriate AC wiring', 'Connect to outlets or panel', 'Ground properly']
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

      {/* Tools Needed */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tools You'll Need</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Wire strippers',
            'Crimping tool',
            'Multimeter',
            'Solar cable (10AWG+)',
            'MC4 connectors',
            'Battery cables',
            'Fuse holder & fuses',
            'Heat shrink tubing',
            'Electrical tape',
            'Safety gloves',
            'Safety glasses',
            'Drill & bits'
          ].map(tool => (
            <div key={tool} className="flex items-center bg-gray-50 rounded p-2">
              <Wrench className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm">{tool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Safety First!</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Always disconnect power before working on wiring</li>
              <li>Use proper gauge wire for current load</li>
              <li>Install fuses/breakers for protection</li>
              <li>Wear insulated gloves when handling batteries</li>
              <li>Ensure proper ventilation for battery bank</li>
              <li>If unsure, hire a licensed electrician</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow Delta Pro', price: '$1,999', type: 'Generator', href: '/products/ecoflow-delta-pro' },
            { name: 'Renogy 200W Panel', price: '$179', type: 'Solar Panel', href: '/products/renogy-200w-solar-panel' },
            { name: 'Renogy MPPT Controller', price: '$129', type: 'Controller', href: '/products/renogy-mppt-charge-controller' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.type}</div>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Help with Your Setup?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine the right components for your system.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Your System
          </Link>
          <Link href="/guides/how-to-wire-solar-system" className="ebay-btn-secondary">
            Read Wiring Guide
          </Link>
        </div>
      </div>
    </div>
  )
}