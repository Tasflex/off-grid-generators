'use client'

import Link from 'next/link'
import RelatedPosts from '../../../components/RelatedPosts'
import { useState } from 'react'
import { Refrigerator, Zap, Battery, Info, AlertTriangle, Calendar, Clock, Check } from 'lucide-react'

export default function RefrigeratorWattsGuide() {
  const [runningWatts, setRunningWatts] = useState(150)
  const [dutyCycle, setDutyCycle] = useState(40)
  const [batteryCapacity, setBatteryCapacity] = useState(1024)

  const calculateRuntime = () => {
    const dailyWh = runningWatts * 24 * (dutyCycle / 100)
    const usableCapacity = batteryCapacity * 0.85
    const runtimeHours = usableCapacity / (dailyWh / 24)
    return {
      dailyWh: Math.round(dailyWh),
      runtimeHours: runtimeHours.toFixed(1),
      surgeWatts: runningWatts * 4
    }
  }

  const results = calculateRuntime()

  const fridgeTypes = [
    { type: 'Mini fridge (1.7-4.5 cu ft)', running: '50-100W', surge: '200-400W', daily: '0.3-0.6 kWh' },
    { type: '12V compressor fridge (camping)', running: '40-60W', surge: '80-150W', daily: '0.3-0.6 kWh' },
    { type: 'Top-freezer fridge (18-21 cu ft)', running: '100-200W', surge: '600-1,000W', daily: '1.0-1.5 kWh' },
    { type: 'Side-by-side / French door', running: '150-300W', surge: '800-1,200W', daily: '1.5-2.2 kWh' },
    { type: 'Chest freezer (7-15 cu ft)', running: '60-120W', surge: '300-600W', daily: '0.5-1.0 kWh' },
    { type: 'Older fridge (pre-2005)', running: '200-400W', surge: '1,000-1,600W', daily: '2.0-3.5 kWh' }
  ]

  const recommendations = [
    { name: 'EcoFlow Delta 2', id: 'ecoflow-delta-2', capacity: '1,024Wh', output: '1,800W', fridgeHours: '10-12 hours', best: 'Best Value' },
    { name: 'Jackery Explorer 1000', id: 'jackery-explorer-1000', capacity: '1,002Wh', output: '1,000W', fridgeHours: '10-12 hours', best: 'Most Portable' },
    { name: 'Bluetti AC200MAX', id: 'bluetti-ac200max', capacity: '2,048Wh', output: '2,200W', fridgeHours: '20-24 hours', best: 'Full Day of Backup' },
    { name: 'EcoFlow Delta Pro', id: 'ecoflow-delta-pro', capacity: '3,600Wh', output: '3,600W', fridgeHours: '30-36 hours', best: 'Multi-Day Outages' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How Many Watts Does a Refrigerator Use?</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Appliance Power</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Home Backup</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How Many Watts Does a Refrigerator Use?
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">TheLoadCalc Team</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            November 2, 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            6 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-start mb-4">
          <Refrigerator className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
          <p className="text-gray-600">
            A typical modern refrigerator uses 100-250 watts while the compressor is running and 1-2 kWh per day.
            But to size a solar generator or battery backup correctly, you need three numbers: running watts,
            startup (surge) watts, and daily energy use. This guide explains each one and how to find yours.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-gray-700">
          <strong>Quick answer:</strong> Most full-size refrigerators need a power station with at least
          1,000W continuous output (to handle the startup surge) and 1,000-2,000Wh of capacity to run for a full day.
        </div>
      </div>

      {/* Three numbers */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Three Numbers That Matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4">
            <Zap className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">Running Watts</h3>
            <p className="text-sm text-gray-600">
              The power drawn while the compressor runs, usually 100-250W for a full-size fridge. It's on the
              energy label or the sticker inside the door (volts × amps gives a rough upper bound).
            </p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">Startup Surge</h3>
            <p className="text-sm text-gray-600">
              Compressors draw 3-5× their running watts for a fraction of a second when they start. Your
              inverter must handle this peak or it will shut off every time the fridge kicks on.
            </p>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <Battery className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">Daily Energy (kWh)</h3>
            <p className="text-sm text-gray-600">
              The compressor cycles on and off, running roughly 30-50% of the time. So a 150W fridge uses about
              1.1-1.8 kWh per day, not the 3.6 kWh you'd get from running 150W around the clock.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Refrigerator Wattage by Type</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Running</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Startup Surge</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Per Day</th>
              </tr>
            </thead>
            <tbody>
              {fridgeTypes.map((fridge) => (
                <tr key={fridge.type} className="border-t">
                  <td className="px-4 py-3 text-sm">{fridge.type}</td>
                  <td className="px-4 py-3 text-sm">{fridge.running}</td>
                  <td className="px-4 py-3 text-sm">{fridge.surge}</td>
                  <td className="px-4 py-3 text-sm font-semibold">{fridge.daily}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Typical ranges. Your actual use depends on size, age, room temperature and how often the door is opened.
        </p>
      </div>

      {/* Interactive Calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Refrigerator Runtime Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Running Watts
            </label>
            <input
              type="number"
              value={runningWatts}
              onChange={(e) => setRunningWatts(parseFloat(e.target.value) || 0)}
              className="ebay-input mb-4"
              min="10"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compressor Duty Cycle: {dutyCycle}%
            </label>
            <input
              type="range"
              value={dutyCycle}
              onChange={(e) => setDutyCycle(parseFloat(e.target.value))}
              className="w-full mb-4"
              min="20"
              max="80"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery Capacity (Wh)
            </label>
            <input
              type="number"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(parseFloat(e.target.value) || 0)}
              className="ebay-input mb-4"
              min="100"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-white rounded p-4 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {results.runtimeHours} hours
                </div>
                <div className="text-sm text-gray-600">Estimated Fridge Runtime</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-sm text-gray-500">Daily Use</div>
                  <div className="text-lg font-semibold">{results.dailyWh} Wh</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-sm text-gray-500">Surge to Handle</div>
                  <div className="text-lg font-semibold">~{results.surgeWatts}W</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Assumes 85% usable capacity after inverter losses.
        </p>
      </div>

      {/* How to measure */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Measure Your Refrigerator's Actual Use</h2>
        <ol className="list-decimal pl-5 space-y-3 text-gray-600">
          <li>
            <strong>Check the EnergyGuide label.</strong> It lists estimated yearly kWh. Divide by 365 for daily
            use (e.g. 450 kWh/year ≈ 1.23 kWh/day).
          </li>
          <li>
            <strong>Use a plug-in watt meter.</strong> A $20-30 meter like a Kill A Watt measures real consumption.
            Leave it plugged in for 24-48 hours for an accurate daily figure.
          </li>
          <li>
            <strong>Use your power station's display.</strong> Most power stations show live input and output
            watts, so you can see both the running draw and the startup spike.
          </li>
        </ol>
      </div>

      {/* Recommendations */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Power Stations for Running a Refrigerator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map(product => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                  {product.best}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-1">{product.capacity} capacity · {product.output} output</div>
              <div className="text-sm text-green-600 font-medium mb-3 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                {product.fridgeHours} for a typical fridge
              </div>
              <Link href={`/products/${product.id}`} className="block text-center bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips to Stretch Your Backup Power</h2>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            During an Outage
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Keep the doors closed. An unopened fridge stays cold for about 4 hours without power.</li>
            <li>Run the fridge for 1-2 hours, then switch it off for 2-3 hours to cut daily use roughly in half.</li>
            <li>Set the thermostat to 37-40°F; colder settings make the compressor work harder.</li>
            <li>Fill empty space with water bottles. Thermal mass holds the cold longer.</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-6 text-center bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Size Your Whole Backup System
        </h2>
        <p className="text-gray-600 mb-4">
          Add your refrigerator alongside lights, phones and other essentials to find the right solar generator.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Solar Sizing Calculator
          </Link>
          <Link href="/calculators/battery-runtime" className="ebay-btn-secondary">
            Battery Runtime Calculator
          </Link>
        </div>
      </div>
      <RelatedPosts slugs={['surge-watts-vs-running-watts', 'chest-freezer-power-station', '12v-fridge-off-grid-power', 'watts-vs-watt-hours-explained']} />
    </div>
  )
}
