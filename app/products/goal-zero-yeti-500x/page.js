'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function GoalZeroYeti500XPage() {
  const product = getProductById('goal-zero-yeti-500x')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}