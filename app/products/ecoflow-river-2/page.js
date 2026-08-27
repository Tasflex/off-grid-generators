'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoFlowRiver2Page() {
  const product = getProductById('ecoflow-river-2')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}