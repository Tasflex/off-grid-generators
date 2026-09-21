'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, Calculator, Info, Flame, Shield, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function HotspotRiskPage() {
  const [panelAge, setPanelAge] = useState(5)
  const [bypassDiodesWorking, setBypassDiodesWorking] = useState(true)
  const [visibleDamage, setVisibleDamage] = useState(false)
  const [partialShading, setPartialShading] = useState('low')
  const [cellType, setCellType] = useState('mono')
  const [results, setResults] = useState(null)

  const shadingLevels = [
    { id: 'none', label: 'None', desc: 'Full sun all day' },
    { id: 'low', label: 'Low', desc: 'Occasional shadow from a wire or antenna' },
    { id: 'medium', label: 'Medium', desc: 'Regular shadow from chimney or tree branch' },
    { id: 'high', label: 'High', desc: 'Persistent shadow across part of array' }
  ]

  const calculate = () => {
    let riskScore = 0
    const factors = []

    // Age factor
    if (panelAge > 15) { riskScore += 25; factors.push({ name: 'Panel age >15 years', weight: 25 }) }
    else if (panelAge > 10) { riskScore += 15; factors.push({ name: 'Panel age 10-15 years', weight: 15 }) }
    else if (panelAge > 5) { riskScore += 5; factors.push({ name: 'Panel age 5-10 years', weight: 5 }) }

    // Bypass diode factor
    if (!bypassDiodesWorking) { riskScore += 30; factors.push({ name: 'Bypass diodes failing/failed', weight: 30 }) }

    // Visible damage
    if (visibleDamage) { riskScore += 25; factors.push({ name: 'Visible cracks/delamination', weight: 25 }) }

    // Shading factor
    const shadingWeights = { none: 0, low: 5, medium: 15, high: 30 }
    const shadingWeight = shadingWeights[partialShading]
    if (shadingWeight > 0) {
      riskScore += shadingWeight
      factors.push({ name: `${partialShading} partial shading`, weight: shadingWeight })
    }

    // Cell type (poly has slightly higher hotspot risk)
    if (cellType === 'poly') { riskScore += 5; factors.push({ name: 'Polycrystalline cells', weight: 5 }) }

    const maxScore = 115
    const riskPercent = Math.min(100, (riskScore / maxScore) * 100)

    let riskLevel = 'Low'
    let riskColor = 'green'
    if (riskPercent > 60) { riskLevel = 'High'; riskColor = 'red' }
    else if (riskPercent > 35) { riskLevel = 'Moderate'; riskColor = 'yellow' }

    const recommendations = []
    if (!bypassDiodesWorking) recommendations.push('Test and replace bypass diodes immediately')
    if (visibleDamage) recommendations.push('Inspect with thermal camera; replace damaged panel')
    if (partialShading !== 'none') recommendations.push('Install string optimizers or microinverters')
    if (panelAge > 10) recommendations.push('Annual thermal inspection recommended')
    if (recommendations.length === 0) recommendations.push('No urgent action needed — continue annual visual inspections')

    setResults({ riskScore, riskPercent: riskPercent.toFixed(0), riskLevel, riskColor, factors, recommendations })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Hotspot Risk</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Solar Panel Hotspot Risk Calculator</h1>
        <p className="text-gray-600">
          Assess the risk of hotspots forming in your solar array. Hotspots can reduce output and, in worst cases, cause fires.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Inspect Your Array</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Panel Age (years)</label>
              <input
                type="number"
                value={panelAge}
                onChange={(e) => setPanelAge(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="40"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Cell Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mono', label: 'Monocrystalline' },
                  { id: 'poly', label: 'Polycrystalline' },
                  { id: 'thin', label: 'Thin Film' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setCellType(type.id)}
                    className={`p-2 border rounded-md text-xs font-medium ${
                      cellType === type.id
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-gray-300 text-gray-600 hover:border-blue-400'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Partial Shading</label>
              <div className="space-y-2">
                {shadingLevels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setPartialShading(level.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      partialShading === level.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{level.label}</div>
                    <div className="text-xs text-gray-500">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bypassDiodesWorking}
                  onChange={(e) => setBypassDiodesWorking(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Bypass diodes are working (not shorted)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleDamage}
                  onChange={(e) => setVisibleDamage(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Visible cracks, delamination, or discoloration</span>
              </label>
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Assess Hotspot Risk
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Risk Assessment</h2>
            {results ? (
              <div className="space-y-4">
                <div className={`rounded-lg p-6 text-center ${
                  results.riskLevel === 'High' ? 'bg-red-50 border-2 border-red-300' :
                  results.riskLevel === 'Moderate' ? 'bg-yellow-50 border-2 border-yellow-300' :
                  'bg-green-50 border-2 border-green-300'
                }`}>
                  <div className="text-sm text-gray-600 mb-1">Risk Level</div>
                  <div className={`text-4xl font-bold mb-1 ${
                    results.riskLevel === 'High' ? 'text-red-600' :
                    results.riskLevel === 'Moderate' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {results.riskLevel}
                  </div>
                  <div className="text-xs text-gray-500">Score: {results.riskPercent}/100</div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Risk Factors</h3>
                  {results.factors.length > 0 ? (
                    <div className="space-y-1 text-xs">
                      {results.factors.map(f => (
                        <div key={f.name} className="flex justify-between">
                          <span className="text-gray-600">{f.name}</span>
                          <span className="font-medium text-gray-900">+{f.weight}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No significant risk factors detected.</p>
                  )}
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Recommendations</h3>
                  <ul className="space-y-2 text-xs">
                    {results.recommendations.map(rec => (
                      <li key={rec} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Flame className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Answer the questions to assess hotspot risk</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">What Causes Hotspots?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
              Partial Shading
            </h3>
            <p className="text-sm text-gray-600">A shaded cell becomes a resistor instead of a generator, dissipating power as heat.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Shield className="h-4 w-4 text-red-600 mr-2" />
              Failed Bypass Diodes
            </h3>
            <p className="text-sm text-gray-600">Without working diodes, current can't route around the shaded cell, creating extreme localized heat.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Flame className="h-4 w-4 text-orange-500 mr-2" />
              Cell Damage
            </h3>
            <p className="text-sm text-gray-600">Micro-cracks or delamination create high-resistance points that overheat under load.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Protect Your Investment</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/panel-degradation" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Panel Degradation Calculator
          </Link>
          <Link href="/guides/how-to-install-solar-panels" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Installation Guide
          </Link>
        </div>
      </div>
    </div>
  )
}