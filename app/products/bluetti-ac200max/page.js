'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoFlowDelta2Page() {
  const product = getProductById('bluetti-ac200max')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}