'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoFlowDelta2Page() {
  const product = getProductById('ecoflow-delta-2')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}