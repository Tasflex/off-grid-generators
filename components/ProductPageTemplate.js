'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Check, X, Zap, Battery, Weight, Shield, Timer, ShoppingCart, ChevronRight, ThumbsUp, ThumbsDown, Info, ArrowRight, Box, Plug, Sun, Car } from 'lucide-react'
import { getRelatedProducts } from '../lib/products'
import { toast } from 'react-hot-toast'

export default function ProductPageTemplate({ product }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)

  // Safely get related products
  const relatedProducts = product?.id ? getRelatedProducts(product.id) : []

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specifications' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'compare', label: 'Compare' }
  ]

  const handleAffiliateClick = async () => {
    // 1. Track in Supabase
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'affiliate_click',
          product_id: product.id,
          product_name: product.name,
          brand: product.brand,
          affiliate_url: product.affiliateUrl,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      })
      
      if (!response.ok) {
        console.error('Tracking failed:', response.status, await response.text())
      } else {
        console.log('✅ Affiliate click tracked successfully (Product Page)')
      }
    } catch (error) {
      console.error('Tracking error:', error)
    }
    
    // 2. Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        product_id: product.id,
        product_name: product.name,
        brand: product.brand,
        page_path: window.location.pathname
      })
    }
    
    // 3. Show toast
    toast.success('Redirecting to best price...')
    
    // 4. Open link with rel="sponsored"
    const link = document.createElement('a')
    link.href = product.affiliateUrl
    link.target = '_blank'
    link.rel = 'sponsored noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Calculate runtime estimates for common devices
  const runtimeEstimates = [
    { device: 'Smartphone (10W)', hours: product?.capacity ? Math.floor((product.capacity * 0.85) / 10) : 0 },
    { device: 'Laptop (65W)', hours: product?.capacity ? Math.floor((product.capacity * 0.85) / 65) : 0 },
    { device: 'CPAP (60W)', hours: product?.capacity ? Math.floor((product.capacity * 0.85) / 60) : 0 },
    { device: 'LED TV (100W)', hours: product?.capacity ? Math.floor((product.capacity * 0.85) / 100) : 0 },
    { device: 'Refrigerator (150W)', hours: product?.capacity ? Math.floor((product.capacity * 0.85) / 150) : 0 },
    { device: 'Microwave (1000W)', hours: product?.capacity ? Math.floor((product.capacity * 0.85) / 1000) : 0 }
  ]

  // Get brand color for gradient
  const getBrandGradient = (brand) => {
    const gradients = {
      'EcoFlow': 'from-blue-500 to-blue-700',
      'Bluetti': 'from-green-500 to-teal-600',
      'Jackery': 'from-orange-400 to-orange-600',
      'Renogy': 'from-red-500 to-red-700',
      'Goal Zero': 'from-purple-500 to-purple-700',
      'Battle Born': 'from-yellow-500 to-yellow-700',
      'Lion Energy': 'from-indigo-500 to-indigo-700',
      'ECO-WORTHY': 'from-emerald-500 to-emerald-700'
    }
    return gradients[brand] || 'from-blue-500 to-blue-700'
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the product you're looking for doesn't exist.</p>
        <Link href="/products" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Browse All Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/products/${product.category?.toLowerCase().replace(/\s+/g, '-') || ''}`} className="hover:text-blue-600">
          {product.category || 'Products'}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className={`bg-gradient-to-br ${getBrandGradient(product.brand)} rounded-lg h-96 flex items-center justify-center mb-4 relative overflow-hidden`}>
            {product.image && !imageError ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-4"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-center text-white">
                <div className="text-8xl mb-4">⚡</div>
                <div className="text-2xl font-bold">{product.brand || 'Brand'}</div>
                <div className="text-sm opacity-80">{product.capacity ? `${product.capacity}Wh` : ''} | {product.output ? `${product.output}W` : ''}</div>
              </div>
            )}
            
            {/* Badge overlay */}
            {product.badge && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {product.badge}
              </div>
            )}
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center bg-green-50 rounded p-2">
              <Shield className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">{product.warranty || 'Warranty'}</span>
            </div>
            <div className="text-center bg-blue-50 rounded p-2">
              <Timer className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">Fast Charging</span>
            </div>
            <div className="text-center bg-yellow-50 rounded p-2">
              <Star className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
              <span className="text-xs text-gray-600">{product.rating || 0}/5 Rated</span>
            </div>
          </div>
          
          {/* Shipping Info */}
          <div className="bg-gray-50 rounded p-3 text-center">
            <p className="text-xs text-gray-600">
              <Check className="h-4 w-4 text-green-500 inline mr-1" />
              Free Shipping | <Check className="h-4 w-4 text-green-500 inline mr-1" />
              30-Day Returns | <Check className="h-4 w-4 text-green-500 inline mr-1" />
              Secure Payment
            </p>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`bg-gradient-to-r ${getBrandGradient(product.brand)} text-white px-3 py-1 rounded text-xs font-bold`}>
                {product.brand || 'Brand'}
              </span>
              {product.badge && (
                <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                  {product.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating || 0}</span>
              <span className="text-sm text-gray-500">({product.reviews || 0} ratings)</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline space-x-3">
              <div className="text-3xl font-bold text-gray-900">${(product.price || 0).toLocaleString()}</div>
              {product.oldPrice && (
                <>
                  <div className="text-lg text-gray-400 line-through">${product.oldPrice.toLocaleString()}</div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                    Save ${(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Key Specs */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {[
              { icon: Battery, label: 'Capacity', value: product.capacity ? `${product.capacity} Wh` : 'N/A' },
              { icon: Zap, label: 'Output', value: product.output ? `${product.output} W` : 'N/A' },
              { icon: Weight, label: 'Weight', value: product.weight ? `${product.weight} lbs` : 'N/A' },
              { icon: Shield, label: 'Warranty', value: product.warranty || 'N/A' }
            ].map(spec => (
              <div key={spec.label} className="flex items-center">
                <spec.icon className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm text-gray-600">{spec.label}:</span>
                <span className="text-sm font-semibold text-gray-900 ml-2">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Description</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
          )}

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map(feature => (
                  <span key={feature} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ports */}
          {product.ports && product.ports.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Ports & Connectivity</h3>
              <div className="flex flex-wrap gap-2">
                {product.ports.map(port => (
                  <span key={port} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {port}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Charging Methods */}
          {product.charging && product.charging.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Charging Methods</h3>
              <div className="flex flex-wrap gap-2">
                {product.charging.map(method => (
                  <span key={method} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {method === 'Solar' && <Sun className="h-3 w-3 mr-1" />}
                    {method === 'AC' && <Plug className="h-3 w-3 mr-1" />}
                    {method === 'Car' && <Car className="h-3 w-3 mr-1" />}
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleAffiliateClick}
              className="w-full py-4 text-lg flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Buy at Best Price
            </button>
            <Link
              href="/calculators/solar-sizing"
              className="w-full py-3 text-center border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Check if This Fits Your Needs
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="flex border-b overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Product Overview</h2>
                <p className="text-gray-600">{product.description || 'No description available.'}</p>
              </div>
              
              {product.bestFor && (
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Best For</h3>
                  <p className="text-sm text-gray-700">{product.bestFor}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.pros && product.pros.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <ThumbsUp className="h-5 w-5 mr-2" />
                      Pros
                    </h3>
                    <ul className="space-y-2">
                      {product.pros.map(pro => (
                        <li key={pro} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.cons && product.cons.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded p-4">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                      <ThumbsDown className="h-5 w-5 mr-2" />
                      Cons
                    </h3>
                    <ul className="space-y-2">
                      {product.cons.map(con => (
                        <li key={con} className="flex items-start text-sm">
                          <X className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Full Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Battery Capacity', value: product.capacity ? `${product.capacity} Wh` : 'N/A' },
                  { label: 'Power Output', value: product.output ? `${product.output} W` : 'N/A' },
                  { label: 'Weight', value: product.weight ? `${product.weight} lbs` : 'N/A' },
                  { label: 'Dimensions', value: product.dimensions || 'N/A' },
                  { label: 'Warranty', value: product.warranty || 'N/A' },
                  { label: 'Charging Methods', value: product.charging ? product.charging.join(', ') : 'N/A' },
                  { label: 'Ports', value: product.ports ? product.ports.join(', ') : 'N/A' },
                  { label: 'Brand', value: product.brand || 'N/A' }
                ].map(spec => (
                  <div key={spec.label} className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-500 uppercase">{spec.label}</div>
                    <div className="font-semibold text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compatibility Tab */}
          {activeTab === 'compatibility' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Device Compatibility & Runtime</h2>
              <p className="text-gray-600 mb-4">
                Estimated runtime for common devices using this power station:
              </p>
              
              <div className="space-y-3">
                {runtimeEstimates.map(item => (
                  <div key={item.device} className="bg-gray-50 rounded p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{item.device}</div>
                        <div className="text-xs text-gray-500">
                          {item.hours >= 24 ? `${Math.floor(item.hours / 24)} days ${item.hours % 24} hours` : `${item.hours} hours`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{item.hours} hrs</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Runtime estimates based on 85% battery discharge and typical device power draw. 
                    Actual results may vary based on temperature and battery age.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Compare Tab */}
          {activeTab === 'compare' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Compare with Alternatives</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Specification</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-600">{product.name}</th>
                      {relatedProducts.slice(0, 2).map(alt => (
                        <th key={alt.id} className="px-4 py-3 text-left text-sm font-semibold">{alt.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Capacity', getValue: p => p.capacity ? `${p.capacity}Wh` : 'N/A' },
                      { label: 'Output', getValue: p => p.output ? `${p.output}W` : 'N/A' },
                      { label: 'Price', getValue: p => p.price ? `$${p.price}` : 'N/A' },
                      { label: 'Weight', getValue: p => p.weight ? `${p.weight}lbs` : 'N/A' },
                      { label: 'Warranty', getValue: p => p.warranty || 'N/A' }
                    ].map(row => (
                      <tr key={row.label} className="border-t">
                        <td className="px-4 py-3 text-sm font-medium">{row.label}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-blue-600">{row.getValue(product)}</td>
                        {relatedProducts.slice(0, 2).map(alt => (
                          <td key={alt.id} className="px-4 py-3 text-sm">{row.getValue(alt)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {relatedProducts.length > 0 && (
                <div className="mt-6 flex gap-3">
                  {relatedProducts.slice(0, 2).map(alt => (
                    <Link
                      key={alt.id}
                      href={`/products/${alt.id}`}
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 text-sm"
                    >
                      View {alt.brand}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(related => (
              <Link
                key={related.id}
                href={`/products/${related.id}`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition group"
              >
                <div className={`bg-gradient-to-br ${getBrandGradient(related.brand)} h-32 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden`}>
                  {related.image ? (
                    <img
                      src={related.image}
                      alt={related.name}
                      className="h-full w-full object-contain p-2"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  ) : (
                    <div className="text-4xl text-white">⚡</div>
                  )}
                  {related.badge && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded text-xs font-bold">
                      {related.badge}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1 line-clamp-1">{related.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">{related.rating || 0}</span>
                  </div>
                  <span className="font-bold">${related.price || 0}</span>
                </div>
                <span className="block text-center bg-blue-600 text-white py-2 rounded mt-3 text-sm hover:bg-blue-700 transition">
                  View Details
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Calculator CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200 p-8 text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Is This the Right Size for You?
        </h2>
        <p className="text-gray-600 mb-4">
          Use our calculators to verify if this product meets your power needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/calculators/solar-sizing" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Calculate Your Needs
          </Link>
          <Link href="/calculators/battery-runtime" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition">
            Check Runtime
          </Link>
        </div>
      </div>
    </div>
  )
}