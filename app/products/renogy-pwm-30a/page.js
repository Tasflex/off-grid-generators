'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyPwm30aPage() {
  const product = getProductById('renogy-pwm-30a')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}