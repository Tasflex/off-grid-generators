'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function JackeryExplorer300Page() {
  const product = getProductById('jackery-explorer-300')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}