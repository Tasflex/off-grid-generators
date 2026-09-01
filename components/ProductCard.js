'use client'

import Link from 'next/link'
import { Star, Battery, Zap, ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ProductCard({ product }) {
  const handleAffiliateClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // 1. Track in Supabase directly (no external function needed)
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
        console.log('✅ Affiliate click tracked successfully')
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
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Product Image - Links to internal page */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain h-40 w-auto"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = '<div class="text-6xl">⚡</div>'
            }}
          />
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
            {product.brand}
          </span>
          {product.badge && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Key Specs */}
        <div className="space-y-1 mb-3">
          {product.capacity && (
            <div className="flex items-center text-sm text-gray-600">
              <Battery className="h-4 w-4 mr-1 text-blue-600" />
              {product.capacity} Wh Capacity
            </div>
          )}
          {product.output && (
            <div className="flex items-center text-sm text-gray-600">
              <Zap className="h-4 w-4 mr-1 text-blue-600" />
              {product.output} W Output
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</div>
            {product.oldPrice && (
              <div className="text-sm text-gray-400 line-through">${product.oldPrice.toLocaleString()}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition text-center text-sm flex items-center justify-center"
          >
            View Details
          </Link>
          
          <button
            onClick={handleAffiliateClick}
            className="flex-1 bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition text-sm flex items-center justify-center"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            View Deal
          </button>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-2 text-xs text-gray-400 text-center">
          <span>We earn a commission if you make a purchase, at no additional cost to you.</span>
        </div>
      </div>
    </div>
  )
}