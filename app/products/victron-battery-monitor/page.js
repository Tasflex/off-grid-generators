'use client'

import ProductPageTemplate from '../../../components/ProductPageTemplate'
import { getProductById } from '../../../lib/products'

export default function VictronBatteryMonitorPage() {
  const product = getProductById('victron-battery-monitor')
  
  if (!product) return null
  
  return <ProductPageTemplate product={product} />
}