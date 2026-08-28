'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function Renogy1000wInverterPage() {
  const product = getProductById('renogy-1000w-inverter')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}