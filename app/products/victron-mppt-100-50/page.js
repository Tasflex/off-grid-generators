'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function VictronMppt10050Page() {
  const product = getProductById('victron-mppt-100-50')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}