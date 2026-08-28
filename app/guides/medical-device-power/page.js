'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Lightbulb, Clock, Check, X, AlertTriangle, Info, ArrowRight, Heart, Battery, Zap, Plug, Sun, Car, Shield, Activity } from 'lucide-react'

export default function MedicalDevicePowerGuide() {
  const [selectedDevice, setSelectedDevice] = useState('cpap')

  const medicalDevices = [
    {
      id: 'cpap',
      name: 'CPAP Machine',
      icon: Heart,
      watts: 60,
      hours: 8,
      dailyWh: 480,
      description: 'Continuous Positive Airway Pressure for sleep apnea',
      tips: [
        'Use a DC adapter for 30-50% less power consumption',
        'Set your machine to a lower pressure if possible',
        'Turn off heated humidifier to save power',
        'Keep a spare mask and tubing in your emergency kit'
      ]
    },
    {
      id: 'oxygen',
      name: 'Oxygen Concentrator',
      icon: Activity,
      watts: 300,
      hours: 24,
      dailyWh: 7200,
      description: 'Provides supplemental oxygen for respiratory conditions',
      tips: [
        'Have multiple backup power options',
        'Check power requirements before choosing a generator',
        'Keep a portable oxygen tank as secondary backup',
        'Monitor power consumption regularly'
      ]
    },
    {
      id: 'feeding-pump',
      name: 'Feeding Pump',
      icon: Plug,
      watts: 100,
      hours: 24,
      dailyWh: 2400,
      description: 'Enteral feeding for patients with feeding tubes',
      tips: [
        'Use battery backup for short-term outages',
        'Keep extra feeding bags and supplies',
        'Test your backup system monthly',
        'Have a manual feeding plan ready'
      ]
    },
    {
      id: 'ventilator',
      name: 'Ventilator',
      icon: Shield,
      watts: 500,
      hours: 24,
      dailyWh: 12000,
      description: 'Mechanical ventilator for respiratory support',
      tips: [
        'Requires the most power - invest in a large capacity system',
        'Have multiple backup power sources',
        'Work with your medical provider on a plan',
        'Keep a portable ventilator as backup if possible'
      ]
    }
  ]

  const selectedDeviceData = medicalDevices.find(d => d.id === selectedDevice)

  const powerOptions = [
    { method: 'Solar Generator', icon: Sun, best: 'Long-term, renewable power' },
    { method: 'AC Wall Charging', icon: Plug, best: 'Fast charging during outages' },
    { method: 'Car Charging', icon: Car, best: 'Mobile backup power' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Medical Device Power</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Emergency Preparedness</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Medical</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Medical Device Power Guide: Keep Life-Saving Equipment Running
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          For patients who rely on medical devices, power outages can be life-threatening. This guide 
          helps you choose the right backup power solution for your specific medical equipment.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Jordan Mitchell</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            January 2026
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            10 min read
          </span>
        </div>
      </div>

      {/* Important Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h2 className="font-bold text-red-800 text-lg mb-1">⚠️ Critical Warning</h2>
            <p className="text-sm text-red-700">
              <strong>Medical devices are life-sustaining equipment.</strong> Always consult with your 
              healthcare provider before making any changes to your power backup plan. Test your backup 
              system regularly and have multiple redundancy options.
            </p>
          </div>
        </div>
      </div>

      {/* Device Selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Device</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {medicalDevices.map(device => {
            const Icon = device.icon
            const isSelected = selectedDevice === device.id
            return (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`p-4 border rounded-lg text-center transition ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                <div className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                  {device.name}
                </div>
                <div className="text-xs text-gray-500">{device.watts}W</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Device Details */}
      {selectedDeviceData && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <selectedDeviceData.icon className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{selectedDeviceData.name}</h2>
          </div>
          <p className="text-gray-600 mb-4">{selectedDeviceData.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 rounded p-3 text-center">
              <div className="text-xs text-gray-500">Power Consumption</div>
              <div className="font-bold text-blue-600">{selectedDeviceData.watts}W</div>
            </div>
            <div className="bg-green-50 rounded p-3 text-center">
              <div className="text-xs text-gray-500">Daily Usage</div>
              <div className="font-bold text-green-600">{selectedDeviceData.hours}h</div>
            </div>
            <div className="bg-yellow-50 rounded p-3 text-center">
              <div className="text-xs text-gray-500">Daily Energy</div>
              <div className="font-bold text-yellow-600">{selectedDeviceData.dailyWh}Wh</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Power Saving Tips</h3>
            <ul className="space-y-2">
              {selectedDeviceData.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Power Requirements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Backup Power</h2>
        
        {selectedDeviceData && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Minimum Requirements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-500">Minimum Capacity Needed</div>
                  <div className="text-xl font-bold text-blue-600">
                    {Math.ceil(selectedDeviceData.dailyWh * 1.2).toLocaleString()} Wh
                  </div>
                  <div className="text-xs text-gray-500">(20% buffer included)</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-500">Recommended Output</div>
                  <div className="text-xl font-bold text-green-600">
                    {Math.ceil(selectedDeviceData.watts * 1.5)} W
                  </div>
                  <div className="text-xs text-gray-500">(50% buffer for safety)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Recommended Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: selectedDeviceData.dailyWh < 1000 ? 'Jackery Explorer 500' : 'Jackery Explorer 1000',
                    capacity: selectedDeviceData.dailyWh < 1000 ? '518Wh' : '1002Wh',
                    price: selectedDeviceData.dailyWh < 1000 ? '$499' : '$799',
                    href: selectedDeviceData.dailyWh < 1000 ? '/products/jackery-explorer-500' : '/products/jackery-explorer-1000'
                  },
                  {
                    name: selectedDeviceData.dailyWh < 2000 ? 'EcoFlow Delta 2' : 'EcoFlow Delta Pro',
                    capacity: selectedDeviceData.dailyWh < 2000 ? '1024Wh' : '3600Wh',
                    price: selectedDeviceData.dailyWh < 2000 ? '$899' : '$1999',
                    href: selectedDeviceData.dailyWh < 2000 ? '/products/ecoflow-delta-2' : '/products/ecoflow-delta-pro'
                  },
                  {
                    name: selectedDeviceData.dailyWh < 3000 ? 'Bluetti AC200MAX' : 'Bluetti AC200P',
                    capacity: selectedDeviceData.dailyWh < 3000 ? '2048Wh' : '2000Wh',
                    price: selectedDeviceData.dailyWh < 3000 ? '$1099' : '$899',
                    href: selectedDeviceData.dailyWh < 3000 ? '/products/bluetti-ac200max' : '/products/bluetti-ac200p'
                  }
                ].map(product => (
                  <div key={product.name} className="border rounded p-4 text-center">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <div className="text-sm text-gray-500">{product.capacity}</div>
                    <div className="text-lg font-bold text-gray-900 mt-2">{product.price}</div>
                    <Link href={product.href} className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700">
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Charging Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Charging Your Medical Device</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {powerOptions.map(option => {
            const Icon = option.icon
            return (
              <div key={option.method} className="border rounded p-4 text-center">
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">{option.method}</h3>
                <p className="text-sm text-gray-600">{option.best}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Emergency Checklist */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Preparedness Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'List all medical devices and their power requirements',
            'Calculate total power needs (with 20-30% buffer)',
            'Purchase a backup power system that meets your needs',
            'Test your backup system monthly with all devices connected',
            'Keep backup batteries for portable devices',
            'Have a manual backup plan for each device',
            'Inform your power company that you have medical devices',
            'Keep a list of emergency contacts handy',
            'Store extra batteries and cables in your emergency kit',
            'Document your setup with photos for reference'
          ].map((item, index) => (
            <div key={index} className="flex items-start bg-gray-50 rounded p-3">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Protect Your Medical Devices?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculator to find the perfect backup power solution for your medical needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold">
            Calculate Your Needs
          </Link>
          <Link href="/products/solar-generators" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition font-semibold">
            Shop Backup Power
          </Link>
        </div>
      </div>
    </div>
  )
}