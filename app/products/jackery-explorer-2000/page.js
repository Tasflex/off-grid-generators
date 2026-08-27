'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function JackeryExplorer500Page() {
  const product = getProductById('jackery-explorer-2000')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}