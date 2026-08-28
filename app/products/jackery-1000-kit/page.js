'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function Jackery1000KitPage() {
  const product = getProductById('jackery-1000-kit')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}