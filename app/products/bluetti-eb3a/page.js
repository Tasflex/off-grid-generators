'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function BluettiEB3APage() {
  const product = getProductById('bluetti-eb3a')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}