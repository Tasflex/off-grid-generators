'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, Battery, Info, AlertTriangle, ArrowRight, Calendar, Clock, Lightbulb, Refrigerator, Phone, Wifi, Fan, Stethoscope, Droplets, Flame } from 'lucide-react'

export default function BlackoutSurvivalGuide() {
  const [selected, setSelected] = useState(['fridge', 'phones', 'lights', 'router'])
  const [hours, setHours] = useState(24)

  const devices = [
    { id: 'fridge', name: 'Refrigerator', icon: Refrigerator, avgWatts: 60, peakWatts: 1000, note: 'Cycles on and off' },
    { id: 'phones', name: 'Phones (x2)', icon: Phone, avgWatts: 10, peakWatts: 40, note: 'Charging' },
    { id: 'lights', name: 'LED Lights (x4)', icon: Lightbulb, avgWatts: 40, peakWatts: 40, note: '10W each' },
    { id: 'router', name: 'Wi-Fi Router + Modem', icon: Wifi, avgWatts: 20, peakWatts: 20, note: 'Runs continuously' },
    { id: 'cpap', name: 'CPAP Machine', icon: Stethoscope, avgWatts: 20, peakWatts: 60, note: '8 hrs/night, no humidifier' },
    { id: 'fan', name: 'Box Fan', icon: Fan, avgWatts: 50, peakWatts: 75, note: 'Medium speed' },
    { id: 'sump', name: 'Sump Pump (1/3 HP)', icon: Droplets, avgWatts: 80, peakWatts: 2000, note: 'Intermittent' }
  ]

  const toggleDevice = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }

  const chosen = devices.filter(d => selected.includes(d.id))
  const totalWh = chosen.reduce((sum, d) => sum + d.avgWatts * hours, 0)
  const peakWatts = chosen.reduce((max, d) => Math.max(max, d.peakWatts), 0) +
    chosen.reduce((sum, d) => sum + d.avgWatts, 0)
  const neededWh = Math.ceil(totalWh / 0.85 / 100) * 100

  const timeline = [
    {
      phase: 'Before: Prepare Now',
      color: 'blue',
      items: [
        'Write down which devices you truly need and their wattage',
        'Keep a charged power station or battery bank (top it up monthly)',
        'Store 1 gallon of water per person per day for at least 3 days',
        'Stock flashlights, headlamps and spare batteries in one known place',
        'Freeze water bottles to fill empty freezer space',
        'Install battery-powered smoke and carbon monoxide alarms'
      ]
    },
    {
      phase: 'During: The First 24 Hours',
      color: 'yellow',
      items: [
        'Keep fridge and freezer doors closed as much as possible',
        'Unplug sensitive electronics to protect them from surges when power returns',
        'Switch to LED lighting; never use candles near curtains or unattended',
        'Power only essentials from your battery and check its percentage every few hours',
        'Check on elderly neighbors and anyone who relies on medical devices'
      ]
    },
    {
      phase: 'Extended: Beyond 24 Hours',
      color: 'orange',
      items: [
        'Recharge your power station with solar panels during daylight',
        'Cycle the fridge: run it 1-2 hours, then off for 2-3 hours',
        'Move frozen food to a cooler if the freezer starts warming',
        'Follow local news on a battery or hand-crank radio'
      ]
    },
    {
      phase: 'After: When Power Returns',
      color: 'green',
      items: [
        'Wait a few minutes before plugging electronics back in',
        'Check fridge and freezer temperatures before eating stored food',
        'Recharge your power station and restock used supplies',
        'Note what ran out first and adjust your plan'
      ]
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    green: 'bg-green-50 border-green-200 text-green-800'
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Blackout Survival Guide</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Emergency Preparedness</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blackout Survival Guide: How to Get Through a Power Outage
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">TheLoadCalc Team</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            November 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            9 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-600 mb-4">
          Most blackouts last a few hours, but storms, heat waves and grid failures can leave homes without power
          for days. Getting through one safely comes down to three things: knowing what you need to keep running,
          having enough stored power to run it, and protecting your food, water and health while you wait.
        </p>
        <div className="bg-red-50 border border-red-200 rounded p-4 text-sm text-gray-700 flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
          <span>
            <strong>Safety first:</strong> Never run a gas generator, grill or camp stove indoors or in a garage.
            Carbon monoxide poisoning is one of the leading causes of death during outages.
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Do Before, During and After a Blackout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeline.map(stage => (
            <div key={stage.phase} className={`border rounded-lg p-4 ${colorClasses[stage.color]}`}>
              <h3 className="font-semibold mb-3">{stage.phase}</h3>
              <ul className="space-y-2">
                {stage.items.map(item => (
                  <li key={item} className="flex items-start text-sm text-gray-700">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Backup power calculator */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How Much Backup Power Do You Need?</h2>
        <p className="text-gray-600 mb-6">Pick the devices you'd keep running and how long the outage lasts.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {devices.map(device => {
                const Icon = device.icon
                const active = selected.includes(device.id)
                return (
                  <button
                    key={device.id}
                    onClick={() => toggleDevice(device.id)}
                    className={`flex items-center p-3 rounded border text-left text-sm transition ${active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <Icon className={`h-5 w-5 mr-2 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>
                      <span className="font-medium text-gray-900 block">{device.name}</span>
                      <span className="text-xs text-gray-500">~{device.avgWatts}W avg · {device.note}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outage Length: {hours} hours
            </label>
            <input
              type="range"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full"
              min="4"
              max="72"
              step="4"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">You'll Need About</h3>
            <div className="bg-white rounded p-4 text-center mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">{neededWh.toLocaleString()} Wh</div>
              <div className="text-sm text-gray-600">Battery capacity for {hours} hours</div>
            </div>
            <div className="bg-white rounded p-3 text-center mb-4">
              <div className="text-sm text-gray-500">Minimum Inverter Output</div>
              <div className="text-lg font-semibold">{peakWatts.toLocaleString()}W</div>
            </div>
            <p className="text-xs text-gray-500">
              Includes 15% for inverter losses. Inverter output covers the largest startup surge plus everything
              else running at once.
            </p>
          </div>
        </div>
      </div>

      {/* Power priorities */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prioritize What You Power</h2>
        <div className="space-y-3">
          <div className="flex items-start p-4 bg-red-50 rounded">
            <span className="font-bold text-red-700 mr-3">1</span>
            <div>
              <h3 className="font-semibold text-gray-900">Medical devices</h3>
              <p className="text-sm text-gray-600">CPAP machines, oxygen concentrators and refrigerated medication always come first. See our <Link href="/guides/medical-device-power" className="text-blue-600 hover:underline">medical device power guide</Link>.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-orange-50 rounded">
            <span className="font-bold text-orange-700 mr-3">2</span>
            <div>
              <h3 className="font-semibold text-gray-900">Communication and light</h3>
              <p className="text-sm text-gray-600">Phones, a radio, the Wi-Fi router and LED lighting use very little power but matter most for safety.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-yellow-50 rounded">
            <span className="font-bold text-yellow-700 mr-3">3</span>
            <div>
              <h3 className="font-semibold text-gray-900">Food storage</h3>
              <p className="text-sm text-gray-600">A closed fridge keeps food safe for about 4 hours; a full freezer holds for about 48 hours (24 if half full). See <Link href="/blog/how-many-watts-refrigerator" className="text-blue-600 hover:underline">how many watts a refrigerator uses</Link>.</p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-green-50 rounded">
            <span className="font-bold text-green-700 mr-3">4</span>
            <div>
              <h3 className="font-semibold text-gray-900">Comfort</h3>
              <p className="text-sm text-gray-600">Fans, electric blankets and entertainment come last. Space heaters and air conditioners drain most portable batteries within an hour or two.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Power options */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing a Backup Power Source</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Battery className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">Portable Power Station</h3>
            <p className="text-sm text-gray-600 mb-3">Silent and safe indoors. 1,000-2,000Wh covers essentials for a day; add solar panels to recharge.</p>
            <Link href="/products/portable-power-stations" className="text-blue-600 hover:underline text-sm font-medium">Browse power stations</Link>
          </div>
          <div className="border rounded-lg p-4">
            <Zap className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">Home Battery Backup</h3>
            <p className="text-sm text-gray-600 mb-3">Expandable systems of 3,600Wh and up for multi-day outages and larger loads like sump pumps.</p>
            <Link href="/guides/home-backup-systems" className="text-blue-600 hover:underline text-sm font-medium">Home backup guide</Link>
          </div>
          <div className="border rounded-lg p-4">
            <Flame className="h-6 w-6 text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-2">Gas Generator</h3>
            <p className="text-sm text-gray-600 mb-3">High output for long outages, but loud, needs fuel storage and must run outdoors, at least 20 feet from the house.</p>
            <Link href="/comparisons/solar-vs-gas-generator" className="text-blue-600 hover:underline text-sm font-medium">Solar vs gas compared</Link>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="ebay-card p-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Test Your Plan Before You Need It
          </h3>
          <p className="text-sm text-gray-600">
            Once a year, run your essentials from your backup power for an evening. You'll find out how long your
            battery really lasts and which cables or adapters are missing while it's still easy to fix.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="ebay-card p-6 text-center bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Build Your Emergency Power Plan</h2>
        <p className="text-gray-600 mb-4">
          Size a backup system around the exact devices in your home.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary inline-flex items-center">
            Solar Sizing Calculator <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
          <Link href="/blog/blackout-emergency-power-plan" className="ebay-btn-secondary">
            Emergency Power Plan
          </Link>
        </div>
      </div>
    </div>
  )
}
