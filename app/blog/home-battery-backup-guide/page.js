'use client'

import Link from 'next/link'
import { Home, Battery, Zap, Check, X, ArrowRight, Calendar, Clock, Info, Shield } from 'lucide-react'

export default function HomeBatteryBackupGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Home Battery Backup</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Home Backup</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Home Battery Backup: Complete Guide to Whole Home Systems
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            November 2025
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            13 min read
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-600">
          Power outages are becoming more frequent and longer-lasting. A home battery backup system 
          keeps your essential appliances running when the grid goes down. This guide covers everything 
          from choosing the right system to installation.
        </p>
      </div>

      {/* Why You Need It */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why You Need Home Battery Backup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Keep Food Fresh', description: 'Refrigerator and freezer keep working', icon: Home },
            { title: 'Medical Equipment', description: 'CPAP, oxygen concentrator, etc', icon: Shield },
            { title: 'Stay Connected', description: 'Wi-Fi and phone charging', icon: Zap },
            { title: 'Comfort & Safety', description: 'Lights, fans, heating', icon: Battery }
          ].map(item => (
            <div key={item.title} className="bg-gray-50 rounded p-4">
              <item.icon className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Types */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Types of Home Backup Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: 'Portable Generator', capacity: '500-2000Wh', price: '$500-$2,000', description: 'Power a few essential appliances', href: '/products/solar-generators' },
            { type: 'Home Backup System', capacity: '2000-5000Wh', price: '$1,000-$3,000', description: 'Power most essential appliances', href: '/products/battery-backups' },
            { type: 'Whole Home System', capacity: '5000Wh+', price: '$3,000-$10,000+', description: 'Power your entire home', href: '/products/complete-kits' }
          ].map(option => (
            <div key={option.type} className="border rounded p-4">
              <h3 className="font-semibold text-gray-900">{option.type}</h3>
              <div className="text-sm text-blue-600 font-medium">{option.capacity}</div>
              <div className="text-sm text-gray-500">{option.price}</div>
              <p className="text-sm text-gray-600 mt-2">{option.description}</p>
              <Link href={option.href} className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
                Shop Now →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Appliances */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What Can You Power?</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Appliance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Watts</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Daily Wh</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody>
              {[
                { appliance: 'Refrigerator', watts: 150, dailyWh: 1800, priority: 'Critical' },
                { appliance: 'Freezer', watts: 100, dailyWh: 1200, priority: 'Critical' },
                { appliance: 'LED Lights (5)', watts: 30, dailyWh: 150, priority: 'Critical' },
                { appliance: 'Wi-Fi Router', watts: 20, dailyWh: 480, priority: 'Important' },
                { appliance: 'Phone Charger', watts: 10, dailyWh: 20, priority: 'Important' },
                { appliance: 'CPAP Machine', watts: 60, dailyWh: 480, priority: 'Critical' },
                { appliance: 'TV', watts: 100, dailyWh: 400, priority: 'Nice to Have' },
                { appliance: 'Microwave', watts: 1000, dailyWh: 500, priority: 'Nice to Have' }
              ].map(row => (
                <tr key={row.appliance} className="border-t">
                  <td className="px-4 py-3 text-sm">{row.appliance}</td>
                  <td className="px-4 py-3 text-sm">{row.watts}W</td>
                  <td className="px-4 py-3 text-sm">{row.dailyWh}Wh</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      row.priority === 'Important' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Home Backup Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'EcoFlow Delta Pro', price: '$1,999', capacity: '3,600Wh', href: '/products/ecoflow-delta-pro' },
            { name: 'Bluetti AC200MAX', price: '$1,099', capacity: '2,048Wh', href: '/products/bluetti-ac200max' },
            { name: 'Renogy 400W Kit', price: '$899', capacity: '2,000Wh', href: '/products/renogy-400w-kit' }
          ].map(product => (
            <div key={product.name} className="border rounded p-4 text-center">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="text-sm text-gray-500">{product.capacity}</div>
              <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
              <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Not Sure What Size Backup You Need?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to determine your exact requirements.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/calculators/solar-sizing" className="ebay-btn-primary">
            Calculate My Needs
          </Link>
          <Link href="/guides/home-backup-systems" className="ebay-btn-secondary">
            Read Home Backup Guide
          </Link>
        </div>
      </div>
    </div>
  )
}