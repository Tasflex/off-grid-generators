'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function Renogy3000wInverterPage() {
  const product = getProductById('renogy-3000w-inverter')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}