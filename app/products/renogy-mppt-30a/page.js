'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyMppt30aPage() {
  const product = getProductById('renogy-mppt-30a')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}