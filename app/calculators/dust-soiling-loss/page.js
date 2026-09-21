'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wind, Calculator, Info, MapPin, Droplets, Sun } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function DustSoilingPage() {
  const [location, setLocation] = useState('suburban')
  const [tiltAngle, setTiltAngle] = useState(30)
  const [rainfall, setRainfall] = useState('moderate')
  const [cleaningFrequency, setCleaningFrequency] = useState('rarely')
  const [arraySize, setArraySize] = useState(3000)
  const [results, setResults] = useState(null)

  const locations = [
    { id: 'urban', label: 'Urban / City', baseSoiling: 4, desc: 'Higher pollution, more particulates' },
    { id: 'suburban', label: 'Suburban', baseSoiling: 3, desc: 'Moderate dust and pollen' },
    { id: 'rural', label: 'Rural / Farmland', baseSoiling: 5, desc: 'Dust, pollen, agricultural particles' },
    { id: 'desert', label: 'Desert / Arid', baseSoiling: 10, desc: 'Very high dust, sand, low rain' },
    { id: 'coastal', label: 'Coastal', baseSoiling: 4, desc: 'Salt spray, sand, humidity' }
  ]

  const rainfallLevels = [
    { id: 'low', label: 'Low (<20 in/yr)', factor: 0.5, desc: 'Rarely cleans panels naturally' },
    { id: 'moderate', label: 'Moderate (20-40 in/yr)', factor: 1.0, desc: 'Periodic natural cleaning' },
    { id: 'high', label: 'High (>40 in/yr)', factor: 0.6, desc: 'Frequent rain keeps panels cleaner' }
  ]

  const cleaningFrequencies = [
    { id: 'never', label: 'Never', factor: 1.8 },
    { id: 'rarely', label: 'Once per year', factor: 1.3 },
    { id: 'sometimes', label: '2-4 times per year', factor: 0.9 },
    { id: 'regularly', label: 'Monthly', factor: 0.5 }
  ]

  const calculate = () => {
    const loc = locations.find(l => l.id === location)
    const rain = rainfallLevels.find(r => r.id === rainfall)
    const clean = cleaningFrequencies.find(c => c.id === cleaningFrequency)

    // Tilt effect: steeper tilt sheds dust better
    // 0° = max soiling, 45° = best self-cleaning
    const tiltFactor = 1 - Math.min(0.6, (tiltAngle / 45) * 0.6)

    // Compute annual average soiling loss percentage
    const soilingLoss = loc.baseSoiling * rain.factor * clean.factor * tiltFactor

    // Cap at 25% (realistic max for most systems)
    const cappedLoss = Math.min(25, soilingLoss)

    // Energy production impact
    const annualProduction = (arraySize * 5 * 365) / 1000 // kWh, assuming 5 sun hrs
    const annualLoss = (annualProduction * cappedLoss) / 100
    const valueLost = annualLoss * 0.15

    // Recommendations
    const recommendations = []
    if (cappedLoss > 8) recommendations.push('Increase cleaning frequency to monthly')
    if (tiltAngle < 15) recommendations.push('Increase tilt angle to at least 20° for better self-cleaning')
    if (location === 'desert') recommendations.push('Consider automated panel cleaning system')
    if (rainfall === 'low') recommendations.push('Manual cleaning is essential in low-rainfall areas')
    if (recommendations.length === 0) recommendations.push('Current setup is efficient — maintain cleaning schedule')

    setResults({
      soilingLoss: cappedLoss.toFixed(1),
      annualLoss: annualLoss.toFixed(0),
      annualProduction: annualProduction.toFixed(0),
      valueLost: valueLost.toFixed(0),
      recommendations
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-blue-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Dust & Soiling Loss</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Dust &amp; Soiling Loss Estimator</h1>
        <p className="text-gray-600">
          Estimate how much energy you're losing to dust, pollen, and other buildup — and what cleaning schedule fixes it.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Environment</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Location Type</label>
              <div className="space-y-2">
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      location === loc.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{loc.label}</div>
                    <div className="text-xs text-gray-500">{loc.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Panel Tilt Angle ({tiltAngle}°)
              </label>
              <input
                type="range"
                value={tiltAngle}
                onChange={(e) => setTiltAngle(parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="60"
                step="5"
              />
              <p className="text-xs text-gray-500 mt-1">
                Steeper tilt = better self-cleaning from rain
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Annual Rainfall</label>
              <div className="space-y-2">
                {rainfallLevels.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRainfall(r.id)}
                    className={`w-full text-left p-3 border rounded-lg transition ${
                      rainfall === r.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{r.label}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Cleaning Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {cleaningFrequencies.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCleaningFrequency(c.id)}
                    className={`p-2 border rounded-md text-xs font-medium ${
                      cleaningFrequency === c.id
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-gray-300 text-gray-600 hover:border-blue-400'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Array Size (W)
              </label>
              <input
                type="number"
                value={arraySize}
                onChange={(e) => setArraySize(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
              />
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
              <Calculator className="inline h-5 w-5 mr-2" />
              Estimate Soiling Loss
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Results</h2>
            {results ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Annual Soiling Loss</div>
                  <div className="text-5xl font-bold text-orange-500">{results.soilingLoss}%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Average reduction in output
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Energy Lost</div>
                    <div className="text-lg font-semibold text-red-600">{results.annualLoss} kWh</div>
                  </div>
                  <div className="bg-white rounded p-3 text-center">
                    <div className="text-sm text-gray-500">Value Lost</div>
                    <div className="text-lg font-semibold text-red-600">${results.valueLost}</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <div className="text-sm text-gray-500 mb-1">Annual Production (with soiling)</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(results.annualProduction - results.annualLoss).toFixed(0)} kWh
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Would be {results.annualProduction} kWh if perfectly clean
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Recommendations</h3>
                  <ul className="space-y-1 text-xs">
                    {results.recommendations.map(r => (
                      <li key={r} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Wind className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Configure your environment to estimate soiling loss</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Real-World Soiling Loss Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-600">Region Type</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">Typical Annual Loss</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-600">Cleaning ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3">Temperate / coastal</td>
                <td className="py-2 px-3">2-4%</td>
                <td className="py-2 px-3 text-gray-500">Low priority</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3">Urban / suburban</td>
                <td className="py-2 px-3">3-6%</td>
                <td className="py-2 px-3 text-gray-500">Clean annually</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3">Agricultural</td>
                <td className="py-2 px-3">5-10%</td>
                <td className="py-2 px-3 text-yellow-700">Worth cleaning 2-3x/year</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Desert / arid</td>
                <td className="py-2 px-3">10-25%</td>
                <td className="py-2 px-3 text-red-700">High ROI — clean monthly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Maximize Your Solar Output</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/shading-impact" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Shading Impact Calculator
          </Link>
          <Link href="/guides/how-to-install-solar-panels" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Panel Installation Guide
          </Link>
        </div>
      </div>
    </div>
  )
}