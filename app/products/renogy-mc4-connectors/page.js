'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function RenogyMc4ConnectorsPage() {
  const product = getProductById('renogy-mc4-connectors')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}