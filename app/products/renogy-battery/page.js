'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyBatteryPage() {
  const product = getProductById('renogy-battery')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}