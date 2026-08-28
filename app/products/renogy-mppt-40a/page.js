'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyMppt40aPage() {
  const product = getProductById('renogy-mppt-40a')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}