// Affiliate network configuration
export const affiliateNetworks = {
  impact: {
    name: 'Impact',
    commission: '5-8%',
    trackingId: 'YOUR_IMPACT_TRACKING_ID',
    baseUrl: 'https://impact.com',
    products: {
      ecoflow: {
        url: 'https://impact.com/affiliate/ecoflow',
        offers: {
          'delta-pro': '?offer_id=123&product=delta-pro',
          'delta-2': '?offer_id=124&product=delta-2',
          'river-2': '?offer_id=125&product=river-2'
        }
      },
      jackery: {
        url: 'https://impact.com/affiliate/jackery',
        offers: {
          'explorer-2000': '?offer_id=234&product=explorer-2000',
          'explorer-1000': '?offer_id=235&product=explorer-1000'
        }
      }
    }
  },
  shareasale: {
    name: 'ShareASale',
    commission: '6-10%',
    trackingId: 'YOUR_SHAREASALE_TRACKING_ID',
    baseUrl: 'https://shareasale.com',
    products: {
      bluetti: {
        url: 'https://shareasale.com/r.cfm',
        params: 'b=123&u=YOUR_ID&m=456',
        offers: {
          'ac200max': '&afftrack=ac200max',
          'eb3a': '&afftrack=eb3a'
        }
      },
      renogy: {
        url: 'https://shareasale.com/r.cfm',
        params: 'b=456&u=YOUR_ID&m=789',
        offers: {
          'battery': '&afftrack=battery-100ah'
        }
      }
    }
  }
}

// Build affiliate URL
export function buildAffiliateUrl(network, brand, productId, extraParams = {}) {
  const config = affiliateNetworks[network]
  if (!config) return null

  const brandConfig = config.products[brand]
  if (!brandConfig) return null

  const offer = brandConfig.offers[productId]
  if (!offer) return null

  if (network === 'shareasale') {
    const params = new URLSearchParams({
      b: brandConfig.params.split('b=')[1]?.split('&')[0],
      u: brandConfig.params.split('u=')[1]?.split('&')[0],
      m: brandConfig.params.split('m=')[1]?.split('&')[0],
    })
    
    // Add offer tracking
    if (offer) {
      params.set('afftrack', offer.replace('&afftrack=', ''))
    }
    
    // Add extra params
    Object.entries(extraParams).forEach(([key, value]) => {
      params.set(key, value)
    })
    
    return `${brandConfig.url}?${params.toString()}`
  }

  return `${brandConfig.url}${offer}${Object.entries(extraParams).map(([k, v]) => `&${k}=${v}`).join('')}`
}

// Track affiliate click
export function trackAffiliateClick(productId, source = 'website') {
  if (typeof window !== 'undefined') {
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'affiliate_click', {
        product_id: productId,
        source: source,
        timestamp: new Date().toISOString()
      })
    }
    
    // Store in local storage for retargeting
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]')
    clicks.push({
      productId,
      source,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks))
  }
}

// Get conversion rate tracking
export function trackAffiliateConversion(productId, orderValue) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      product_id: productId,
      value: orderValue,
      currency: 'USD',
      timestamp: new Date().toISOString()
    })
  }
}

// Cookie management for affiliate tracking
export function setAffiliateCookie(brand, duration = 30) {
  const expires = new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
  document.cookie = `affiliate_${brand}=${brand.toLowerCase()}; expires=${expires.toUTCString()}; path=/`
}

export function getAffiliateCookie(brand) {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === `affiliate_${brand}`) return value
  }
  return null
}