// lib/affiliates.js
export function trackAffiliateClick(productData) {
  if (typeof window === 'undefined') return

  // 1. Track in Google Analytics
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      product_id: productData.id,
      product_name: productData.name,
      brand: productData.brand,
      affiliate_url: productData.affiliateUrl,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    })
  }

  // 2. Track in Supabase via your API
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'affiliate_click',
        product_id: productData.id,
        product_name: productData.name,
        brand: productData.brand,
        affiliate_url: productData.affiliateUrl,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    }).catch(err => console.error('Supabase tracking failed:', err))
  } catch (error) {
    console.error('Analytics API error:', error)
  }

  // 3. Store in localStorage as backup
  try {
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]')
    clicks.push({
      productId: productData.id,
      productName: productData.name,
      brand: productData.brand,
      url: productData.affiliateUrl,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks))
  } catch (error) {
    console.error('localStorage error:', error)
  }

  // 4. Open link with rel="sponsored"
  const link = document.createElement('a')
  link.href = productData.affiliateUrl
  link.target = '_blank'
  link.rel = 'sponsored noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}