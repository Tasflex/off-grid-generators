'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogySolarMountPage() {
  const product = getProductById('renogy-solar-mount')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}