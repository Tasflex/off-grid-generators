'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function JackeryExplorer1000Page() {
  const product = getProductById('jackery-explorer-1000')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}