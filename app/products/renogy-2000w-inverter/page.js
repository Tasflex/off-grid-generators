'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function Renogy2000wInverterPage() {
  const product = getProductById('renogy-2000w-inverter')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}