'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function EcoflowSmartInverterPage() {
  const product = getProductById('ecoflow-smart-inverter')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}