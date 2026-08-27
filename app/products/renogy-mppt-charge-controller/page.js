'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyMPPTChargeControllerPage() {
  const product = getProductById('renogy-mppt-charge-controller')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}