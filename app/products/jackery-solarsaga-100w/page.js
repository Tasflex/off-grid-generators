'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function JackerySolarSaga100WPage() {
  const product = getProductById('jackery-solarsaga-100w')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}