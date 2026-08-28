'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function Renogy400wKitPage() {
  const product = getProductById('renogy-400w-kit')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}