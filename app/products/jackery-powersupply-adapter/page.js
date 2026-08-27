'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function JackeryPowerSupplyAdapterPage() {
  const product = getProductById('jackery-powersupply-adapter')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}