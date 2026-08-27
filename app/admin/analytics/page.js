'use client'

import { useState, useEffect } from 'react'
import { Users, Eye, MousePointerClick, DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    totalPageviews: 0,
    totalAffiliateClicks: 0,
    totalRevenue: 0,
    conversionRate: 0
  })

  const [trafficData, setTrafficData] = useState([])
  const [topPages, setTopPages] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [topSources, setTopSources] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In production, fetch from your analytics API
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)

    // Mock data - in production fetch from Supabase/GA4
    setAnalytics({
      totalVisitors: timeRange === '30d' ? 12500 : timeRange === '7d' ? 3500 : 25000,
      totalPageviews: timeRange === '30d' ? 45000 : timeRange === '7d' ? 12000 : 90000,
      totalAffiliateClicks: timeRange === '30d' ? 850 : timeRange === '7d' ? 250 : 1800,
      totalRevenue: timeRange === '30d' ? 12000 : timeRange === '7d' ? 3500 : 25000,
      conversionRate: timeRange === '30d' ? 3.2 : timeRange === '7d' ? 3.5 : 3.0
    })

    setTrafficData([
      { date: 'Day 1', visitors: 350, pageviews: 1200 },
      { date: 'Day 2', visitors: 420, pageviews: 1500 },
      { date: 'Day 3', visitors: 380, pageviews: 1350 },
      { date: 'Day 4', visitors: 500, pageviews: 1800 },
      { date: 'Day 5', visitors: 450, pageviews: 1600 },
      { date: 'Day 6', visitors: 550, pageviews: 2000 },
      { date: 'Day 7', visitors: 600, pageviews: 2200 },
      { date: 'Day 8', visitors: 580, pageviews: 2100 },
      { date: 'Day 9', visitors: 620, pageviews: 2300 },
      { date: 'Day 10', visitors: 650, pageviews: 2400 },
    ])

    setTopPages([
      { url: '/calculators/solar-sizing', title: 'Solar Sizing Calculator', views: 8500, conversion: 5.2 },
      { url: '/products/solar-generators', title: 'Solar Generators', views: 6200, conversion: 3.8 },
      { url: '/guides/how-to-choose', title: 'How to Choose', views: 4500, conversion: 4.1 },
      { url: '/blog/best-solar-generators-2026', title: 'Best Solar Generators 2026', views: 3800, conversion: 3.5 },
      { url: '/comparisons/ecoflow-vs-bluetti', title: 'EcoFlow vs Bluetti', views: 2900, conversion: 4.8 },
    ])

    setTopProducts([
      { name: 'EcoFlow Delta Pro', clicks: 280, revenue: 4200, commission: 294 },
      { name: 'Bluetti AC200MAX', clicks: 250, revenue: 2800, commission: 224 },
      { name: 'Jackery Explorer 2000', clicks: 210, revenue: 3500, commission: 245 },
      { name: 'EcoFlow River 2', clicks: 180, revenue: 800, commission: 64 },
      { name: 'Renogy Battery', clicks: 150, revenue: 1000, commission: 80 },
    ])

    setTopSources([
      { name: 'Google Search', visitors: 4200, percentage: 38 },
      { name: 'Pinterest', visitors: 3000, percentage: 27 },
      { name: 'Direct', visitors: 2400, percentage: 22 },
      { name: 'Facebook', visitors: 750, percentage: 7 },
      { name: 'Twitter', visitors: 450, percentage: 6 },
    ])

    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500">Visitors</div>
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12.5%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500">Pageviews</div>
            <Eye className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalPageviews.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            +8.2%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500">Affiliate Clicks</div>
            <MousePointerClick className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalAffiliateClicks.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            +18.7%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500">Revenue</div>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${analytics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            +25.3%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500">Conversion Rate</div>
            <BarChart3 className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.conversionRate}%
          </div>
          <div className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            +2.1%
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Traffic Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#3665f3" strokeWidth={2} />
              <Line type="monotone" dataKey="pageviews" stroke="#f5a623" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Pages</h2>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.url} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-400 mr-3">{index + 1}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    <div className="text-xs text-gray-500">{page.views.toLocaleString()} views</div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-green-600">{page.conversion}% conv</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-400 mr-3">{index + 1}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {product.clicks} clicks | ${product.commission} commission
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  ${product.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Sources */}
      <div className="ebay-card p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Traffic Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topSources.map(source => (
            <div key={source.name} className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {source.percentage}%
              </div>
              <div className="text-sm text-gray-600">{source.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                {source.visitors.toLocaleString()} visitors
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}