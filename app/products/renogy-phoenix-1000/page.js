'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyPhoenix1000Page() {
  const product = getProductById('renogy-phoenix-1000')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}