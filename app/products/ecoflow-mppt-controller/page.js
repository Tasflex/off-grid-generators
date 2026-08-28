'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoflowMpptControllerPage() {
  const product = getProductById('ecoflow-mppt-controller')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}