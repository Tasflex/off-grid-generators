'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function Renogy200WSolarPanelPage() {
  const product = getProductById('renogy-200w-solar-panel')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}