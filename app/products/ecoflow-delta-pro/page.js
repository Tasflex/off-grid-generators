'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoFlowDeltaProPage() {
  const product = getProductById('ecoflow-delta-pro')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}