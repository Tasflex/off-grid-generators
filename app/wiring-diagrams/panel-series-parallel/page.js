'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sun, Zap, AlertTriangle, Check, X, ArrowRight, Calendar, Clock, Info, Battery } from 'lucide-react'

export default function PanelSeriesParallelDiagram() {
  const [seriesPanels, setSeriesPanels] = useState(2)
  const [parallelStrings, setParallelStrings] = useState(2)
  const [panelVoltage, setPanelVoltage] = useState(12)
  const [panelCurrent, setPanelCurrent] = useState(10)
  const [panelWattage, setPanelWattage] = useState(120)

  const totalPanels = seriesPanels * parallelStrings

  const calculateSeriesParallel = () => {
    return {
      voltage: panelVoltage * seriesPanels,
      current: panelCurrent * parallelStrings,
      power: panelWattage * totalPanels,
      totalWatts: panelWattage * totalPanels
    }
  }

  const results = calculateSeriesParallel()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Series-Parallel Combo</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Advanced Wiring</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Series-Parallel Combination Wiring Diagram</h1>
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

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What is Series-Parallel Wiring?</h2>
        <p className="text-gray-600 mb-4">
          A series-parallel configuration combines both series and parallel connections to achieve 
          the desired voltage and current. Panels are first connected in series strings, then these 
          strings are connected in parallel. This allows you to customize your system for specific 
          voltage and current requirements.
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded p-4">
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-purple-800">Key Formula</h3>
          </div>
          <p className="text-sm text-purple-700">
            <strong>Total Voltage</strong> = Panel Voltage × Panels in Series<br />
            <strong>Total Current</strong> = Panel Current × Parallel Strings<br />
            <strong>Total Power</strong> = Panel Wattage × Total Panels
          </p>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series-Parallel Configuration Calculator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panels in Series</label>
            <input
              type="number"
              value={seriesPanels}
              onChange={(e) => setSeriesPanels(parseInt(e.target.value))}
              className="ebay-input"
              min="1"
              max="6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parallel Strings</label>
            <input
              type="number"
              value={parallelStrings}
              onChange={(e) => setParallelStrings(parseInt(e.target.value))}
              className="ebay-input"
              min="1"
              max="6"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panel Wattage (W)</label>
            <input
              type="number"
              value={panelWattage}
              onChange={(e) => setPanelWattage(parseFloat(e.target.value))}
              className="ebay-input"
              min="50"
              step="10"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold text-gray-900 mb-3">System Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Panels</div>
              <div className="text-2xl font-bold text-purple-600">{totalPanels}</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Voltage</div>
              <div className="text-2xl font-bold text-blue-600">{results.voltage}V</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Current</div>
              <div className="text-2xl font-bold text-green-600">{results.current}A</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Power</div>
              <div className="text-2xl font-bold text-orange-600">{results.power}W</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-xs text-gray-500">Total Wattage</div>
              <div className="text-2xl font-bold text-red-600">{results.totalWatts}W</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wiring Diagram */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Series-Parallel Wiring Diagram</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="w-full" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Title */}
            <text x="450" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1a1a1a">
              Series-Parallel Connection Diagram ({seriesPanels} Series × {parallelStrings} Parallel)
            </text>

            {/* Positive Bus Bar */}
            <line x1="100" y1="80" x2="800" y2="80" stroke="#f56565" strokeWidth="4" />
            <text x="450" y="70" textAnchor="middle" fontSize="12" fill="#f56565" fontWeight="bold">Positive Bus Bar (+)</text>

            {/* Negative Bus Bar */}
            <line x1="100" y1="350" x2="800" y2="350" stroke="#4299e1" strokeWidth="4" />
            <text x="450" y="370" textAnchor="middle" fontSize="12" fill="#4299e1" fontWeight="bold">Negative Bus Bar (-)</text>

            {/* String 1 */}
            {/* Panel 1-1 */}
            <rect x="150" y="120" width="130" height="70" rx="8" fill="#3182ce" />
            <text x="215" y="150" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Panel 1</text>
            <text x="215" y="170" textAnchor="middle" fontSize="9" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            
            {/* Panel 1-2 */}
            <rect x="150" y="210" width="130" height="70" rx="8" fill="#3182ce" />
            <text x="215" y="240" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Panel 2</text>
            <text x="215" y="260" textAnchor="middle" fontSize="9" fill="white">{panelVoltage}V / {panelCurrent}A</text>

            {/* String 1 Connections */}
            <line x1="215" y1="120" x2="215" y2="80" stroke="#f56565" strokeWidth="3" />
            <line x1="215" y1="210" x2="215" y2="280" stroke="#4299e1" strokeWidth="3" />
            <line x1="280" y1="155" x2="280" y2="210" stroke="#f56565" strokeWidth="3" />
            
            <text x="300" y="170" textAnchor="middle" fontSize="9" fill="#4a5568">Series</text>
            <text x="300" y="200" textAnchor="middle" fontSize="9" fill="#4a5568">String 1</text>

            {/* String 2 */}
            {/* Panel 2-1 */}
            <rect x="450" y="120" width="130" height="70" rx="8" fill="#3182ce" />
            <text x="515" y="150" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Panel 3</text>
            <text x="515" y="170" textAnchor="middle" fontSize="9" fill="white">{panelVoltage}V / {panelCurrent}A</text>
            
            {/* Panel 2-2 */}
            <rect x="450" y="210" width="130" height="70" rx="8" fill="#3182ce" />
            <text x="515" y="240" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Panel 4</text>
            <text x="515" y="260" textAnchor="middle" fontSize="9" fill="white">{panelVoltage}V / {panelCurrent}A</text>

            {/* String 2 Connections */}
            <line x1="515" y1="120" x2="515" y2="80" stroke="#f56565" strokeWidth="3" />
            <line x1="515" y1="210" x2="515" y2="280" stroke="#4299e1" strokeWidth="3" />
            <line x1="580" y1="155" x2="580" y2="210" stroke="#f56565" strokeWidth="3" />

            <text x="600" y="170" textAnchor="middle" fontSize="9" fill="#4a5568">Series</text>
            <text x="600" y="200" textAnchor="middle" fontSize="9" fill="#4a5568">String 2</text>

            {/* String 3 (if parallelStrings > 2) */}
            {parallelStrings >= 3 && (
              <>
                <rect x="750" y="120" width="130" height="70" rx="8" fill="#3182ce" />
                <text x="815" y="150" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Panel 5</text>
                <text x="815" y="170" textAnchor="middle" fontSize="9" fill="white">{panelVoltage}V / {panelCurrent}A</text>
                
                <rect x="750" y="210" width="130" height="70" rx="8" fill="#3182ce" />
                <text x="815" y="240" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">Panel 6</text>
                <text x="815" y="260" textAnchor="middle" fontSize="9" fill="white">{panelVoltage}V / {panelCurrent}A</text>

                <line x1="815" y1="120" x2="815" y2="80" stroke="#f56565" strokeWidth="3" />
                <line x1="815" y1="210" x2="815" y2="280" stroke="#4299e1" strokeWidth="3" />
                <line x1="880" y1="155" x2="880" y2="210" stroke="#f56565" strokeWidth="3" />
              </>
            )}

            {/* Output Connection */}
            <line x1="800" y1="80" x2="850" y2="80" stroke="#f56565" strokeWidth="4" />
            <line x1="800" y1="350" x2="850" y2="350" stroke="#4299e1" strokeWidth="4" />
            <text x="875" y="80" textAnchor="middle" fontSize="14" fill="#f56565" fontWeight="bold">+</text>
            <text x="875" y="355" textAnchor="middle" fontSize="14" fill="#4299e1" fontWeight="bold">-</text>
            <text x="875" y="210" textAnchor="middle" fontSize="10" fill="#4a5568" transform="rotate(90, 875, 210)">Output</text>

            {/* Current Flow */}
            <text x="215" y="100" textAnchor="middle" fontSize="10" fill="#4a5568">↓</text>
            <text x="515" y="100" textAnchor="middle" fontSize="10" fill="#4a5568">↓</text>
            {parallelStrings >= 3 && (
              <text x="815" y="100" textAnchor="middle" fontSize="10" fill="#4a5568">↓</text>
            )}
          </svg>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Visual Diagram</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Series Strings</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {Array.from({ length: seriesPanels }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-20 h-14 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      P{i + 1}
                    </div>
                    {i < seriesPanels - 1 && <span className="text-red-500 font-bold mx-1">→</span>}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                String 1: {seriesPanels} × {panelVoltage}V = {panelVoltage * seriesPanels}V
              </div>
            </div>
            {parallelStrings >= 2 && (
              <div className="space-y-3 mt-4">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: seriesPanels }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-20 h-14 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        P{i + 3}
                      </div>
                      {i < seriesPanels - 1 && <span className="text-red-500 font-bold mx-1">→</span>}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  String 2: {seriesPanels} × {panelVoltage}V = {panelVoltage * seriesPanels}V
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Parallel Strings</h3>
            <div className="space-y-3">
              {Array.from({ length: parallelStrings }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                    S{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-blue-300 rounded"></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">{results.voltage}V</span>
                </div>
              ))}
              <div className="text-sm text-gray-600 mt-2">
                Total: {parallelStrings} strings in parallel = {results.voltage}V / {results.current}A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Wire Series-Parallel</h2>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Plan Your Configuration',
              description: 'Determine the voltage and current you need for your charge controller.',
              details: ['Check controller max voltage', 'Check controller max current', 'Calculate panels needed']
            },
            {
              step: 2,
              title: 'Create Series Strings',
              description: 'Wire panels in series to achieve your target voltage.',
              details: ['Connect positive to negative within each string', 'Each string will have voltage = panels × panel voltage', 'Current stays same as panel current']
            },
            {
              step: 3,
              title: 'Connect Strings in Parallel',
              description: 'Connect the series strings in parallel to achieve your target current.',
              details: ['Connect all string positives to positive bus bar', 'Connect all string negatives to negative bus bar', 'Total current = string current × number of strings']
            },
            {
              step: 4,
              title: 'Verify Voltage',
              description: 'Measure the output voltage with a multimeter.',
              details: ['Check voltage matches expectations', 'Ensure voltage doesnt exceed controller limit', 'Verify all connections are secure']
            },
            {
              step: 5,
              title: 'Connect to Controller',
              description: 'Connect the output to your charge controller.',
              details: ['Connect positive to PV+', 'Connect negative to PV-', 'Monitor system to ensure proper operation']
            }
          ].map(step => (
            <div key={step.step} className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
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

      {/* Example Configurations */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Common Configuration Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: '2S2P (4 Panels)',
              panels: '4 × 200W = 800W',
              voltage: '24V',
              current: '20A',
              desc: 'Good for 24V systems, moderate size'
            },
            {
              title: '3S2P (6 Panels)',
              panels: '6 × 200W = 1200W',
              voltage: '36V',
              current: '20A',
              desc: 'Good for 24V/48V systems, larger setups'
            },
            {
              title: '4S2P (8 Panels)',
              panels: '8 × 200W = 1600W',
              voltage: '48V',
              current: '20A',
              desc: 'Ideal for 48V whole home systems'
            }
          ].map(example => (
            <div key={example.title} className="bg-gray-50 rounded p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-1">{example.title}</h3>
              <div className="text-sm text-gray-600 mb-2">{example.panels}</div>
              <div className="flex justify-center space-x-4 mb-2">
                <div className="bg-blue-100 rounded px-2 py-1 text-sm font-semibold text-blue-600">
                  {example.voltage}
                </div>
                <div className="bg-green-100 rounded px-2 py-1 text-sm font-semibold text-green-600">
                  {example.current}
                </div>
              </div>
              <div className="text-xs text-gray-500">{example.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages and Disadvantages */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pros and Cons of Series-Parallel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded p-4">
            <h3 className="font-semibold text-green-800 mb-3">Advantages</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Customizable voltage and current',
                'Best flexibility for system design',
                'Good balance of voltage and current',
                'Reduces wire size requirements',
                'Works with MPPT controllers',
                'Can handle large solar arrays',
                'Partial shading affects only one string'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-3">Disadvantages</h3>
            <ul className="space-y-2 text-sm">
              {[
                'More complex wiring',
                'More connections = more failure points',
                'Requires careful planning',
                'Need to match panel specifications',
                'More expensive connectors needed',
                'Harder to troubleshoot issues',
                'Requires fuse on each string'
              ].map(item => (
                <li key={item} className="flex items-start">
                  <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* When to Use Series-Parallel */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">When to Use Series-Parallel Wiring</h2>
        <div className="bg-blue-50 rounded p-4">
          <h3 className="font-semibold text-blue-800 mb-3">Ideal Scenarios:</h3>
          <ul className="space-y-2 text-sm">
            {[
              'You have more than 4 panels',
              'You need to match specific charge controller specs',
              'You have a mix of panel orientations',
              'You want to balance efficiency and simplicity',
              'You have a 24V or 48V system with 6+ panels',
              'You want to expand your system incrementally'
            ].map(item => (
              <li key={item} className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-semibold text-red-800 mb-2">⚠️ Safety Warning</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
              <li>Always add fuses/breakers on each series string</li>
              <li>Never exceed charge controller voltage rating</li>
              <li>Use appropriate wire gauge for total current</li>
              <li>Check all connections with multimeter before energizing</li>
              <li>Consider professional installation for complex systems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Topics */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Related Wiring Diagrams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/wiring-diagrams/panel-series" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Series Wiring</div>
            <div className="text-sm text-gray-500">Increase voltage output</div>
          </Link>
          <Link href="/wiring-diagrams/panel-parallel" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Parallel Wiring</div>
            <div className="text-sm text-gray-500">Increase current output</div>
          </Link>
          <Link href="/wiring-diagrams/battery-bank" className="group block bg-gray-50 rounded p-4 hover:bg-blue-50 transition">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">Battery Bank Wiring</div>
            <div className="text-sm text-gray-500">Series vs parallel batteries</div>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Help Choosing Your Configuration?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine the best configuration for your system.
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