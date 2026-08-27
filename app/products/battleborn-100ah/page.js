'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function BattleBorn100AhPage() {
  const product = getProductById('battleborn-100ah')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}