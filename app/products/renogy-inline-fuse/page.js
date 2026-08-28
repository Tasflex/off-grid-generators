'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyInlineFusePage() {
  const product = getProductById('renogy-inline-fuse')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}