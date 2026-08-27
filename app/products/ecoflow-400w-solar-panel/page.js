'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoFlow400WSolarPanelPage() {
  const product = getProductById('ecoflow-400w-solar-panel')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}