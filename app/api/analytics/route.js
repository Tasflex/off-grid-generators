import { NextResponse } from 'next/server'

// Helper function to check if a path is an admin page
function isAdminPath(path) {
  if (!path) return false
  const adminPaths = [
    '/admin',
    '/admin/analytics',
    '/admin/social-scheduler',
    '/admin/products',
    '/admin/users',
    '/admin/settings',
    '/admin/affiliates',
    '/admin/reports',
    '/admin/blog',
    '/admin/comments',
  ]
  return adminPaths.some(adminPath => path.startsWith(adminPath))
}

// Helper function to check if a page should be tracked
function shouldTrackPage(path) {
  if (!path) return false
  if (isAdminPath(path)) return false
  if (path.startsWith('/api/')) return false
  if (path.startsWith('/_next/')) return false
  // Fixed regex to properly match file extensions
  if (/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|json|xml|txt|pdf)$/i.test(path)) return false
  return true
}

export async function POST(request) {
  try {
    // ============================================
    // DEBUG LOGGING - Enhanced
    // ============================================
    const body = await request.json()
    console.log('=== 🚀 Analytics POST received ===')
    console.log('📌 Type:', body.type)
    console.log('📌 Path:', body.path || body.page_path || 'N/A')
    console.log('📌 Timestamp:', body.timestamp || new Date().toISOString())
    console.log('📌 Full Body:', JSON.stringify(body, null, 2))
    
    // Log request headers for debugging
    console.log('📌 Headers:', {
      'user-agent': request.headers.get('user-agent') || 'N/A',
      'referer': request.headers.get('referer') || 'N/A',
      'x-forwarded-for': request.headers.get('x-forwarded-for') || 'N/A'
    })
    console.log('========================================\n')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables')
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
      console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing')
      return NextResponse.json(
        { error: 'Supabase client not configured' },
        { status: 500 }
      )
    }

    // Check if we should track this page
    if (body.type === 'pageview') {
      const path = body.path || body.page_path || '/'
      if (!shouldTrackPage(path)) {
        console.log(`⏭️ Skipping tracking for admin/internal page: ${path}`)
        return NextResponse.json({
          success: true,
          message: 'Page not tracked (admin/internal)',
          type: body.type,
          path: path
        })
      }
    }

    let tableName
    let insertData

    switch (body.type) {
      case 'pageview':
        tableName = 'analytics_pageviews'
        insertData = {
          path: body.path || body.page_path || '/',
          title: body.title || 'TheLoadCalc',
          referrer: body.referrer || request.headers.get('referer') || '',
          user_agent: body.user_agent || request.headers.get('user-agent') || '',
          visitor_id: body.visitor_id || body.visitorId || null,
          screen_resolution: body.screen_resolution || null,
          timestamp: body.timestamp || new Date().toISOString()
        }
        console.log(`📊 Tracking pageview: ${insertData.path}`)
        break
      
      case 'affiliate_click':
        tableName = 'analytics_affiliate_clicks'
        insertData = {
          product_id: body.product_id || body.productId || '',
          product_name: body.product_name || body.productName || '',
          brand: body.brand || '',
          affiliate_url: body.affiliate_url || body.url || '',
          page_path: body.page_path || body.page || '',
          visitor_id: body.visitor_id || body.visitorId || null,
          timestamp: body.timestamp || new Date().toISOString()
        }
        console.log(`🛒 Tracking affiliate click: ${insertData.product_name} (${insertData.product_id})`)
        break
      
      case 'conversion':
        tableName = 'analytics_conversions'
        insertData = {
          product_id: body.product_id || '',
          product_name: body.product_name || '',
          order_value: body.order_value || 0,
          commission: body.commission || 0,
          page_path: body.page_path || '',
          visitor_id: body.visitor_id || body.visitorId || null,
          timestamp: body.timestamp || new Date().toISOString()
        }
        console.log(`💰 Tracking conversion: ${insertData.product_name} - $${insertData.order_value}`)
        break
      
      case 'social_post':
        tableName = 'analytics_social_posts'
        insertData = {
          platform: body.platform || '',
          content: body.content || '',
          url: body.url || '',
          status: body.status || 'draft',
          scheduled_for: body.scheduled_for || null,
          posted_at: body.posted_at || null,
          engagement: body.engagement || 0,
          timestamp: body.timestamp || new Date().toISOString()
        }
        console.log(`📱 Tracking social post: ${insertData.platform} - ${insertData.status}`)
        break
      
      default:
        console.log(`⚠️ Unknown analytics type: ${body.type}`)
        return NextResponse.json({
          success: true,
          message: 'Unknown type, but logged',
          type: body.type
        })
    }

    // Log the insert data before sending to Supabase
    console.log(`📤 Sending to Supabase table: ${tableName}`)
    console.log('📤 Insert Data:', JSON.stringify(insertData, null, 2))

    const baseUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl
    const url = `${baseUrl}/rest/v1/${tableName}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(insertData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Supabase response error (${response.status}):`, errorText)
      console.error('❌ Failed request URL:', url)
      console.error('❌ Failed insert data:', JSON.stringify(insertData, null, 2))
      return NextResponse.json(
        { error: `Supabase error: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    const result = await response.json()
    console.log(`✅ Analytics tracked successfully: ${body.type}`)
    console.log('✅ Result:', JSON.stringify(result, null, 2))
    console.log('========================================\n')

    return NextResponse.json({
      success: true,
      message: 'Analytics tracked successfully',
      type: body.type,
      data: result
    })

  } catch (error) {
    console.error('❌ Analytics API error:', error)
    console.error('❌ Error stack:', error.stack)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Supabase client not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'
    const type = searchParams.get('type') || 'all'
    
    const startDate = new Date()
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
    startDate.setDate(startDate.getDate() - days)

    const baseUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl

    let results = {
      totalVisitors: 0,
      totalPageviews: 0,
      totalAffiliateClicks: 0,
      totalRevenue: 0,
      totalCommission: 0,
      conversionRate: 0,
      avgSessionDuration: '0m 0s',
      bounceRate: 0,
      trafficData: [],
      topPages: [],
      topProducts: [],
      topSources: [],
      deviceData: [],
      revenueData: [],
      affiliateClicks: []
    }

    // Fetch pageviews
    if (type === 'all' || type === 'pageviews') {
      try {
        const url = `${baseUrl}/rest/v1/analytics_pageviews?select=*&timestamp=gte.${startDate.toISOString()}&order=timestamp.desc`
        
        const response = await fetch(url, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        })

        if (response.ok) {
          const allPageviews = await response.json()
          const pageviews = allPageviews.filter(pv => !isAdminPath(pv.path))
          
          // Store pageviews array for generating traffic data
          results.pageviews = pageviews || []
          
          // Count TOTAL pageviews (all views, including multiple visits)
          results.totalPageviews = pageviews ? pageviews.length : 0
          
          // Count UNIQUE visitors using visitor_id
          const uniqueVisitors = new Set()
          pageviews.forEach(pv => {
            if (pv.visitor_id) {
              uniqueVisitors.add(pv.visitor_id)
            }
          })
          
          results.totalVisitors = uniqueVisitors.size
          
          console.log(`📊 Pageviews: ${results.totalPageviews} total, ${results.totalVisitors} unique visitors`)
        } else {
          console.error('Pageviews fetch error:', response.status)
          results.pageviews = []
          results.totalVisitors = 0
          results.totalPageviews = 0
        }
      } catch (error) {
        console.error('Error fetching pageviews:', error)
        results.pageviews = []
        results.totalVisitors = 0
        results.totalPageviews = 0
      }
    }

    // Fetch affiliate clicks - get ALL clicks
    if (type === 'all' || type === 'affiliate_clicks') {
      try {
        const url = `${baseUrl}/rest/v1/analytics_affiliate_clicks?select=*&timestamp=gte.${startDate.toISOString()}&order=timestamp.desc`
        
        const response = await fetch(url, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        })

        if (response.ok) {
          const clicks = await response.json()
          results.affiliateClicks = clicks || []
          results.totalAffiliateClicks = clicks ? clicks.length : 0
          
          console.log(`🛒 Affiliate clicks: ${results.totalAffiliateClicks} total`)
          
          // Aggregate clicks by product for top products
          const productMap = {}
          clicks.forEach(click => {
            const key = click.product_name || 'Unknown'
            if (!productMap[key]) {
              productMap[key] = {
                name: key,
                brand: click.brand || 'Other',
                clicks: 0,
                revenue: 0,
                commission: 0,
                category: click.brand || 'Other',
                page_path: click.page_path || ''
              }
            }
            productMap[key].clicks++
          })
          
          results.topProducts = Object.values(productMap)
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 10)
        } else {
          console.error('Affiliate clicks fetch error:', response.status)
          results.affiliateClicks = []
          results.topProducts = []
        }
      } catch (error) {
        console.error('Error fetching affiliate clicks:', error)
        results.affiliateClicks = []
        results.topProducts = []
      }
    }

    // Fetch conversions
    if (type === 'all' || type === 'conversions') {
      try {
        const url = `${baseUrl}/rest/v1/analytics_conversions?select=*&timestamp=gte.${startDate.toISOString()}&order=timestamp.desc`
        
        const response = await fetch(url, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        })

        if (response.ok) {
          const conversions = await response.json()
          results.conversions = conversions || []
          results.totalRevenue = conversions ? conversions.reduce((sum, c) => sum + (c.order_value || 0), 0) : 0
          results.totalCommission = conversions ? conversions.reduce((sum, c) => sum + (c.commission || 0), 0) : 0
          
          console.log(`💰 Conversions: ${conversions.length} total, $${results.totalRevenue} revenue`)
        } else {
          console.error('Conversions fetch error:', response.status)
          results.conversions = []
        }
      } catch (error) {
        console.error('Error fetching conversions:', error)
        results.conversions = []
      }
    }

    // Calculate conversion rate (clicks / unique visitors)
    if (results.totalVisitors > 0 && results.totalAffiliateClicks > 0) {
      results.conversionRate = parseFloat(((results.totalAffiliateClicks / results.totalVisitors) * 100).toFixed(1))
    } else {
      results.conversionRate = 0
    }
    
    console.log(`📈 Conversion rate: ${results.conversionRate}%`)

    // Generate data
    results.trafficData = generateTrafficDataFromPageviews(results.pageviews || [], days)
    results.topPages = generateTopPagesFromPageviews(results.pageviews || [])
    results.topSources = generateTopSourcesFromPageviews(results.pageviews || [])
    results.deviceData = generateDeviceDataFromPageviews(results.pageviews || [])
    results.revenueData = generateRevenueDataFromConversions(results.conversions || [])

    // Calculate average session duration
    if (results.pageviews && results.pageviews.length > 1) {
      const timestamps = results.pageviews.map(pv => new Date(pv.timestamp).getTime())
      timestamps.sort()
      if (timestamps.length > 1) {
        const totalDiff = timestamps[timestamps.length - 1] - timestamps[0]
        const avgDiff = totalDiff / (timestamps.length - 1)
        const minutes = Math.floor(avgDiff / 60000)
        const seconds = Math.floor((avgDiff % 60000) / 1000)
        results.avgSessionDuration = `${minutes}m ${seconds}s`
      }
    }

    // Calculate bounce rate (visitors with only 1 pageview)
    if (results.totalVisitors > 0 && results.pageviews) {
      const pageCounts = results.pageviews.reduce((acc, pv) => {
        const visitor = pv.visitor_id || 'unknown'
        if (!acc[visitor]) acc[visitor] = 0
        acc[visitor]++
        return acc
      }, {})
      
      const singleVisits = Object.values(pageCounts).filter(count => count === 1).length
      results.bounceRate = results.totalVisitors > 0 
        ? Math.round((singleVisits / results.totalVisitors) * 100) 
        : 0
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error('Analytics GET error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

// Helper functions for data aggregation
function generateTrafficDataFromPageviews(pageviews, days) {
  if (!pageviews || pageviews.length === 0) {
    return []
  }

  const grouped = pageviews.reduce((acc, pv) => {
    const date = new Date(pv.timestamp).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = { date, visitors: 0, pageviews: 0 }
    }
    acc[date].visitors++
    acc[date].pageviews++
    return acc
  }, {})

  return Object.values(grouped).slice(-days)
}

function generateTopPagesFromPageviews(pageviews) {
  if (!pageviews || pageviews.length === 0) {
    return []
  }

  const grouped = pageviews.reduce((acc, pv) => {
    const path = pv.path || '/'
    if (!acc[path]) {
      acc[path] = { url: path, title: pv.title || path, views: 0 }
    }
    acc[path].views++
    return acc
  }, {})

  return Object.values(grouped)
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
    .map((page) => ({
      ...page,
      conversion: 0
    }))
}

function generateTopSourcesFromPageviews(pageviews) {
  if (!pageviews || pageviews.length === 0) {
    return []
  }

  const sources = {}

  pageviews.forEach(pv => {
    const referrer = pv.referrer || ''
    let source = 'Direct'
    
    if (referrer.includes('google')) source = 'Google Search'
    else if (referrer.includes('pinterest')) source = 'Pinterest'
    else if (referrer.includes('facebook')) source = 'Facebook'
    else if (referrer.includes('twitter')) source = 'Twitter'
    else if (referrer.includes('linkedin')) source = 'LinkedIn'
    else if (referrer.includes('youtube')) source = 'YouTube'
    else if (referrer && !referrer.includes('localhost')) source = 'Referral'
    
    if (!sources[source]) sources[source] = 0
    sources[source]++
  })

  const total = Object.values(sources).reduce((sum, count) => sum + count, 0)
  
  return Object.entries(sources)
    .map(([name, visitors]) => ({
      name,
      visitors,
      percentage: total > 0 ? Math.round((visitors / total) * 100) : 0
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5)
}

function generateDeviceDataFromPageviews(pageviews) {
  if (!pageviews || pageviews.length === 0) {
    return []
  }

  const devices = {}

  pageviews.forEach(pv => {
    const ua = pv.user_agent || ''
    let device = 'Desktop'
    
    if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
      device = 'Mobile'
    } else if (ua.includes('Tablet') || ua.includes('iPad')) {
      device = 'Tablet'
    }
    
    if (!devices[device]) devices[device] = 0
    devices[device]++
  })

  const total = Object.values(devices).reduce((sum, count) => sum + count, 0)
  
  return Object.entries(devices)
    .map(([name, value]) => ({
      name,
      value: total > 0 ? Math.round((value / total) * 100) : 0
    }))
    .filter(d => d.value > 0)
}

function generateRevenueDataFromConversions(conversions) {
  if (!conversions || conversions.length === 0) {
    return []
  }

  const grouped = conversions.reduce((acc, conv) => {
    const name = conv.product_name || conv.product_id || 'Other'
    if (!acc[name]) {
      acc[name] = 0
    }
    acc[name] += conv.order_value || 0
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
}