'use client'

import Link from 'next/link'
import { Battery, Zap, Check, X, ArrowRight, Calendar, Clock, Info, AlertTriangle } from 'lucide-react'

export default function SolarBatteryTechnology() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Battery Technology</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Education</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Solar Energy Storage: Battery Technology Explained
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            December 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            11 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-600">
          Batteries are the most important component of your off-grid system. They store energy for 
          when the sun isn't shining. This guide explains the different battery technologies and 
          helps you choose the right one.
        </p>
      </div>

      {/* Battery Types Comparison */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Battery Types Compared</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Technology</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">DoD</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Cycles</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Lifespan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Cost</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tech: 'LiFePO4 (LFP)', dod: '85%', cycles: '3,500+', lifespan: '10+ years', cost: '$$$' },
                { tech: 'Lithium-ion (NMC)', dod: '80%', cycles: '2,000', lifespan: '5-8 years', cost: '$$' },
                { tech: 'Lead Acid', dod: '50%', cycles: '500', lifespan: '3-5 years', cost: '$' },
                { tech: 'AGM', dod: '50%', cycles: '600', lifespan: '4-6 years', cost: '$$' }
              ].map(row => (
                <tr key={row.tech} className="border-t">
                  <td className="px-4 py-3 text-sm font-medium">{row.tech}</td>
                  <td className="px-4 py-3 text-sm">{row.dod}</td>
                  <td className="px-4 py-3 text-sm">{row.cycles}</td>
                  <td className="px-4 py-3 text-sm">{row.lifespan}</td>
                  <td className="px-4 py-3 text-sm">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LiFePO4 Deep Dive */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">LiFePO4: The Best Choice for Solar</h2>
        <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
          <h3 className="font-semibold text-green-800 mb-2">Why LiFePO4 Wins</h3>
          <ul className="space-y-2">
            {['Longest lifespan (3,500+ cycles)', 'Highest Depth of Discharge (85%)', 'Safest lithium chemistry', 'No thermal runaway risk', 'Works in extreme temperatures'].map(item => (
              <li key={item} className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/products/battleborn-100ah" className="border rounded p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-1">Battle Born 100Ah</h3>
            <p className="text-sm text-gray-500">$949 | 10-year warranty</p>
          </Link>
          <Link href="/products/renogy-battery" className="border rounded p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-1">Renogy 100Ah</h3>
            <p className="text-sm text-gray-500">$699 | 5-year warranty</p>
          </Link>
        </div>
      </div>

      {/* What to Consider */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What to Consider When Buying</h2>
        <div className="space-y-4">
          {[
            { title: 'Depth of Discharge (DoD)', description: 'How much of the battery can be safely used. LiFePO4: 85%, Lead Acid: 50%' },
            { title: 'Cycle Life', description: 'How many charge/discharge cycles before capacity drops to 80%' },
            { title: 'Voltage', description: 'Match to your system: 12V, 24V, or 48V' },
            { title: 'Capacity (Ah or Wh)', description: 'Calculate based on your daily energy needs' },
            { title: 'Warranty', description: 'Look for 5+ years. Battle Born offers 10 years.' }
          ].map(item => (
            <div key={item.title} className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Need Help Sizing Your Battery Bank?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to determine your exact requirements.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate Battery Needs
          </Link>
          <Link href="/products/battery-backups" className="ebay-btn-secondary">
            Shop Batteries
          </Link>
        </div>
      </div>
    </div>
  )
}