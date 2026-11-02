import Link from 'next/link'
import { Calculator, Sun, Zap, ArrowRight } from 'lucide-react'
import { deviceCalculators, deviceCalculatorsByCategory } from '../../lib/calc'

const popular = new Set(['solar-sizing', 'battery-runtime', 'off-grid-budget', 'inverter-sizing', 'off-grid-system-sizing'])

export default function CalculatorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Calculators</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Free Solar, Battery & Inverter Calculators</h1>
        <p className="text-gray-600">
          {deviceCalculators.length} interactive tools to plan, size, wire, diagnose and budget your solar and off-grid power system.
        </p>
      </div>

      {/* Jump links */}
      <div className="flex flex-wrap gap-2 mb-10">
        {deviceCalculatorsByCategory.map(cat => (
          <a key={cat.id} href={`#${cat.id}`} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600">
            <span className="h-2 w-2 rounded-full" style={{ background: cat.accent }} />
            {cat.name}
            <span className="text-gray-400">{cat.calculators.length}</span>
          </a>
        ))}
      </div>

      {/* Calculators by category */}
      {deviceCalculatorsByCategory.map(cat => (
        <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-24">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="h-6 w-1 rounded mr-3" style={{ background: cat.accent }}></div>
              <h2 className="text-2xl font-bold text-gray-900">{cat.name}</h2>
              <span className="ml-3 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                {cat.calculators.length} tools
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-4">{cat.blurb}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.calculators.map(calc => (
              <Link
                key={calc.slug}
                href={calc.path}
                className="relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all group flex flex-col overflow-hidden"
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: cat.accent }} />
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold tracking-widest" style={{ color: cat.accent }}>{calc.code}</span>
                  {popular.has(calc.slug) && (
                    <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">Popular</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-2">{calc.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{calc.description}</p>
                <span className="mt-auto text-blue-600 group-hover:underline text-sm font-medium flex items-center">
                  Use Calculator <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* How to Use */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Our Calculators</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Input Your Data</h3>
            <p className="text-sm text-gray-600">
              Select appliances, battery specs, or energy needs. Our calculators handle the rest.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Get Instant Results</h3>
            <p className="text-sm text-gray-600">
              Get precise calculations with industry-standard efficiency factors.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Buy with Confidence</h3>
            <p className="text-sm text-gray-600">
              Get matched to recommended products based on your exact needs.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Need Help Choosing the Right Calculator?
        </h2>
        <p className="text-gray-600 mb-4">
          Read our comprehensive guide on how to calculate your solar power needs.
        </p>
        <Link href="/guides/how-to-choose" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-semibold inline-block">
          Read the Guide
        </Link>
      </div>
    </div>
  )
}
