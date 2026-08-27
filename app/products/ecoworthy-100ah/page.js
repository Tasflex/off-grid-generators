'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function ECOWORTHY100AhPage() {
  const product = getProductById('ecoworthy-100ah')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}