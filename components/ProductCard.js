'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Star, Battery, Zap } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    // Track affiliate click
    window.open(product.affiliateUrl, '_blank')
    toast.success('Redirecting to best price...')
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
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

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Key Specs */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Battery className="h-4 w-4 mr-1 text-blue-600" />
            {product.capacity} Wh Capacity
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="h-4 w-4 mr-1 text-blue-600" />
            {product.output} W Output
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</div>
            {product.oldPrice && (
              <div className="text-sm text-gray-400 line-through">${product.oldPrice.toLocaleString()}</div>
            )}
          </div>
        </div>

        <button
          onClick={handleClick}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
        >
          View Deal
        </button>
      </div>
    </div>
  )
}