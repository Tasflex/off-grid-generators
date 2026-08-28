'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Eye, MousePointerClick, DollarSign, TrendingUp, TrendingDown, BarChart3, Calendar, Download, RefreshCw, ExternalLink } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const [isLoading, setIsLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    totalPageviews: 0,
    totalAffiliateClicks: 0,
    totalRevenue: 0,
    conversionRate: 0,
    avgSessionDuration: 0,
    bounceRate: 0
  })

  const [trafficData, setTrafficData] = useState([])
  const [topPages, setTopPages] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [topSources, setTopSources] = useState([])
  const [deviceData, setDeviceData] = useState([])
  const [revenueData, setRevenueData] = useState([])

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)

    // In production, fetch from your analytics API or Supabase
    // For now, we'll show realistic demo data based on your site structure
    
    const visitorMultiplier = timeRange === '7d' ? 1 : timeRange === '30d' ? 4 : 12
    const revenueMultiplier = timeRange === '7d' ? 1 : timeRange === '30d' ? 4 : 12

    setAnalytics({
      totalVisitors: 12500 * visitorMultiplier,
      totalPageviews: 45000 * visitorMultiplier,
      totalAffiliateClicks: 850 * visitorMultiplier,
      totalRevenue: 12000 * revenueMultiplier,
      conversionRate: 3.2,
      avgSessionDuration: '4m 32s',
      bounceRate: 42
    })

    // Traffic over time
    setTrafficData([
      { date: 'Jan 1', visitors: 350, pageviews: 1200, revenue: 150 },
      { date: 'Jan 5', visitors: 420, pageviews: 1500, revenue: 180 },
      { date: 'Jan 10', visitors: 380, pageviews: 1350, revenue: 160 },
      { date: 'Jan 15', visitors: 500, pageviews: 1800, revenue: 220 },
      { date: 'Jan 20', visitors: 550, pageviews: 2000, revenue: 280 },
      { date: 'Jan 25', visitors: 600, pageviews: 2200, revenue: 310 },
      { date: 'Jan 30', visitors: 650, pageviews: 2400, revenue: 350 }
    ])

    // Top Pages
    setTopPages([
      { url: '/calculators/solar-sizing', title: 'Solar Sizing Calculator', views: 8500, conversion: 5.2 },
      { url: '/products/solar-generators', title: 'Solar Generators', views: 6200, conversion: 3.8 },
      { url: '/guides/how-to-choose', title: 'How to Choose', views: 4500, conversion: 4.1 },
      { url: '/blog/best-solar-generators-2026', title: 'Best Solar Generators 2026', views: 3800, conversion: 3.5 },
      { url: '/comparisons/ecoflow-vs-bluetti', title: 'EcoFlow vs Bluetti', views: 2900, conversion: 4.8 },
      { url: '/blog/how-many-watts-refrigerator', title: 'Refrigerator Watts', views: 2400, conversion: 3.2 },
      { url: '/wiring-diagrams/basic-off-grid', title: 'Basic Wiring Diagram', views: 2100, conversion: 2.8 },
      { url: '/calculators/battery-runtime', title: 'Battery Runtime Calculator', views: 1800, conversion: 4.5 }
    ])

    // Top Products by Revenue
    setTopProducts([
      { name: 'EcoFlow Delta Pro', clicks: 280, revenue: 4200, commission: 294, category: 'Solar Generators' },
      { name: 'Bluetti AC200MAX', clicks: 250, revenue: 2800, commission: 224, category: 'Solar Generators' },
      { name: 'Jackery Explorer 2000', clicks: 210, revenue: 3500, commission: 245, category: 'Solar Generators' },
      { name: 'EcoFlow River 2', clicks: 180, revenue: 800, commission: 64, category: 'Portable Power' },
      { name: 'Renogy 200W Panel', clicks: 150, revenue: 1000, commission: 80, category: 'Solar Panels' },
      { name: 'EcoFlow Delta 2', clicks: 120, revenue: 900, commission: 72, category: 'Solar Generators' },
      { name: 'Victron MPPT 100/50', clicks: 90, revenue: 700, commission: 56, category: 'Charge Controllers' },
      { name: 'Renogy 1000W Inverter', clicks: 75, revenue: 300, commission: 24, category: 'Inverters' }
    ])

    // Traffic Sources
    setTopSources([
      { name: 'Google Search', visitors: 4200, percentage: 38 },
      { name: 'Pinterest', visitors: 3000, percentage: 27 },
      { name: 'Direct', visitors: 2400, percentage: 22 },
      { name: 'Facebook', visitors: 750, percentage: 7 },
      { name: 'Twitter', visitors: 450, percentage: 6 }
    ])

    // Device Breakdown
    setDeviceData([
      { name: 'Desktop', value: 35 },
      { name: 'Mobile', value: 55 },
      { name: 'Tablet', value: 10 }
    ])

    // Revenue by Category
    setRevenueData([
      { name: 'Solar Generators', value: 7200 },
      { name: 'Portable Power', value: 1800 },
      { name: 'Solar Panels', value: 1200 },
      { name: 'Batteries', value: 900 },
      { name: 'Components', value: 600 },
      { name: 'Inverters', value: 300 }
    ])

    setIsLoading(false)
  }

  const COLORS = ['#3665f3', '#f5a623', '#48bb78', '#ed8936', '#9f7aea', '#f56565']

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
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your site performance and affiliate revenue</p>
        </div>
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
          <button
            onClick={loadAnalyticsData}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Visitors</div>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalVisitors.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12.5%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Pageviews</div>
            <Eye className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalPageviews.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8.2%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Affiliate Clicks</div>
            <MousePointerClick className="h-4 w-4 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.totalAffiliateClicks.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +18.7%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Revenue</div>
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${analytics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +25.3%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Conversion Rate</div>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.conversionRate}%
          </div>
          <div className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +2.1%
          </div>
        </div>

        <div className="ebay-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Avg. Session</div>
            <Calendar className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {analytics.avgSessionDuration}
          </div>
          <div className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +4.5%
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Traffic Overview</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#3665f3" strokeWidth={2} name="Visitors" />
              <Line type="monotone" dataKey="pageviews" stroke="#f5a623" strokeWidth={2} name="Pageviews" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Pages */}
        <div className="ebay-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Top Pages</h2>
            <Link href="/sitemap.xml" className="text-blue-600 hover:underline text-sm" target="_blank">
              View Sitemap <ExternalLink className="h-3 w-3 inline" />
            </Link>
          </div>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={page.url} className="flex items-center justify-between bg-gray-50 rounded p-3">
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-400 mr-3">{index + 1}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    <div className="text-xs text-gray-500">{page.url}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()} views</div>
                  <div className="text-xs text-green-600">{page.conversion}% conv</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="ebay-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Top Products by Revenue</h2>
            <Link href="/admin/social-scheduler" className="text-blue-600 hover:underline text-sm">
              Social Scheduler
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between bg-gray-50 rounded p-3">
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-400 mr-3">{index + 1}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.category} | {product.clicks} clicks</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">${product.revenue.toLocaleString()}</div>
                  <div className="text-xs text-green-600">${product.commission} commission</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue by Category */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3665f3" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="ebay-card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Device Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Traffic Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topSources.map(source => (
            <div key={source.name} className="text-center bg-gray-50 rounded p-4">
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

      {/* Export Button */}
      <div className="ebay-card p-6 text-center bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Export Your Data</h2>
        <p className="text-gray-600 mb-4">Download your analytics for custom reporting.</p>
        <div className="flex justify-center space-x-4">
          <button className="ebay-btn-primary">
            <Download className="h-4 w-4 inline mr-2" />
            Export CSV
          </button>
          <button className="ebay-btn-secondary">
            <Download className="h-4 w-4 inline mr-2" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  )
}