'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoflowDeltaProKitPage() {
  const product = getProductById('ecoflow-delta-pro-kit')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}