'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function BluettiAC200PPage() {
  const product = getProductById('bluetti-ac200p')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}