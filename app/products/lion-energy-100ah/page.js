'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function LionEnergy100AhPage() {
  const product = getProductById('lion-energy-100ah')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}