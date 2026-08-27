'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoFlowXT60CablePage() {
  const product = getProductById('ecoflow-xt60-cable')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}