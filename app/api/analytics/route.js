import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get('range') || '30d'
  
  // Calculate date range
  const now = new Date()
  let startDate = new Date()
  
  switch (timeRange) {
    case '7d':
      startDate.setDate(now.getDate() - 7)
      break
    case '90d':
      startDate.setDate(now.getDate() - 90)
      break
    default:
      startDate.setDate(now.getDate() - 30)
  }

  try {
    // Fetch analytics data from Supabase
    const [visitors, pageviews, clicks, conversions] = await Promise.all([
      supabase
        .from('analytics_visitors')
        .select('*')
        .gte('timestamp', startDate.toISOString()),
      supabase
        .from('analytics_pageviews')
        .select('*')
        .gte('timestamp', startDate.toISOString()),
      supabase
        .from('analytics_affiliate_clicks')
        .select('*')
        .gte('timestamp', startDate.toISOString()),
      supabase
        .from('analytics_conversions')
        .select('*')
        .gte('timestamp', startDate.toISOString())
    ])

    // Process and aggregate data
    const analytics = {
      totalVisitors: visitors.data?.length || 0,
      totalPageviews: pageviews.data?.length || 0,
      totalAffiliateClicks: clicks.data?.length || 0,
      totalRevenue: conversions.data?.reduce((sum, c) => sum + c.revenue, 0) || 0,
      conversionRate: clicks.data?.length > 0 
        ? ((conversions.data?.length || 0) / clicks.data.length) * 100 
        : 0
    }

    // Get top pages
    const { data: topPages } = await supabase
      .from('analytics_pageviews')
      .select('url, title, count(*)')
      .gte('timestamp', startDate.toISOString())
      .group('url, title')
      .order('count', { ascending: false })
      .limit(5)

    return NextResponse.json({
      ...analytics,
      topPages: topPages || []
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// Track page view
export async function POST(request) {
  try {
    const { path, referrer, userAgent } = await request.json()

    const { data, error } = await supabase
      .from('analytics_pageviews')
      .insert([
        {
          path,
          referrer,
          user_agent: userAgent,
          timestamp: new Date().toISOString()
        }
      ])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track pageview error:', error)
    return NextResponse.json(
      { error: 'Failed to track pageview' },
      { status: 500 }
    )
  }
}