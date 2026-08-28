'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyBatteryCablesPage() {
  const product = getProductById('renogy-battery-cables')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}