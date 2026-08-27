'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, Tag, TrendingUp, BookOpen, Zap, Wrench, Home, Caravan, Shield } from 'lucide-react'

const blogCategories = [
  { name: 'All', slug: 'all', icon: BookOpen },
  { name: 'Emergency Preparedness', slug: 'emergency-preparedness', icon: Shield },
  { name: 'Van Life & RV', slug: 'van-life-rv', icon: Caravan },
  { name: 'Home Backup', slug: 'home-backup', icon: Home },
  { name: 'Product Reviews', slug: 'product-reviews', icon: Zap },
  { name: 'DIY & Installation', slug: 'diy-installation', icon: Wrench },
  { name: 'Solar News', slug: 'solar-news', icon: TrendingUp },
]

const blogPosts = [
  {
    id: 1,
    title: 'Best Solar Generators 2026: Complete Buying Guide',
    excerpt: 'We tested 15 solar generators to find the best options for every budget and use case. From emergency backup to full off-grid living, here are our top picks.',
    category: 'Product Reviews',
    slug: 'best-solar-generators-2026',
    image: '/images/blog/solar-generators-2026.jpg',
    date: '2026-01-15',
    readTime: '12 min read',
    author: 'Jordan Mitchell',
    featured: true,
    tags: ['Solar Generators', 'Buying Guide', '2026']
  },
  {
    id: 2,
    title: 'How to Prepare for a Blackout: Complete Emergency Power Plan',
    excerpt: 'Power outages are becoming more frequent. Here is a step-by-step guide to ensure your home stays powered during any emergency.',
    category: 'Emergency Preparedness',
    slug: 'blackout-emergency-power-plan',
    image: '/images/blog/blackout-prep.jpg',
    date: '2026-01-10',
    readTime: '8 min read',
    author: 'Jordan Mitchell',
    featured: true,
    tags: ['Emergency', 'Blackout', 'Backup Power']
  },
  {
    id: 3,
    title: 'Van Life Solar Setup: Complete Guide for Beginners',
    excerpt: 'Planning to live the van life? Here is everything you need to know about installing a solar system in your van, from sizing to installation.',
    category: 'Van Life & RV',
    slug: 'van-life-solar-setup-guide',
    image: '/images/blog/van-life-solar.jpg',
    date: '2026-01-05',
    readTime: '15 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Van Life', 'Solar Setup', 'Off-Grid']
  },
  {
    id: 4,
    title: 'EcoFlow Delta Pro vs Bluetti AC200MAX: Which Is Better?',
    excerpt: 'We compare the two most popular high-capacity portable power stations to help you decide which one fits your needs.',
    category: 'Product Reviews',
    slug: 'ecoflow-vs-bluetti-comparison',
    image: '/images/blog/ecoflow-vs-bluetti.jpg',
    date: '2025-12-28',
    readTime: '10 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Comparison', 'EcoFlow', 'Bluetti']
  },
  {
    id: 5,
    title: 'How Many Solar Panels Do I Need? Complete Calculation Guide',
    excerpt: 'Learn how to calculate the exact number of solar panels needed for your home, RV, or off-grid setup.',
    category: 'DIY & Installation',
    slug: 'how-many-solar-panels-needed',
    image: '/images/blog/solar-panels-calculation.jpg',
    date: '2025-12-20',
    readTime: '9 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Solar Panels', 'DIY', 'Calculation']
  },
  {
    id: 6,
    title: 'Solar Energy Storage: Battery Technology Explained',
    excerpt: 'From lithium-ion to LFP, understand the different battery technologies powering today\'s solar systems.',
    category: 'Solar News',
    slug: 'solar-battery-technology-explained',
    image: '/images/blog/battery-technology.jpg',
    date: '2025-12-15',
    readTime: '11 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Battery Technology', 'Storage', 'Education']
  },
  {
    id: 7,
    title: 'CPAP Battery Backup: How to Keep Your Machine Running',
    excerpt: 'CPAP users need reliable power. Here\'s how to calculate battery needs and choose the right backup solution.',
    category: 'Emergency Preparedness',
    slug: 'cpap-battery-backup-guide',
    image: '/images/blog/cpap-backup.jpg',
    date: '2025-12-10',
    readTime: '7 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['CPAP', 'Medical', 'Backup Power']
  },
  {
    id: 8,
    title: 'Solar Generator vs Traditional Generator: Which to Choose?',
    excerpt: 'Compare the pros and cons of solar generators versus gas-powered generators for backup power.',
    category: 'Home Backup',
    slug: 'solar-vs-traditional-generator',
    image: '/images/blog/solar-vs-gas.jpg',
    date: '2025-12-05',
    readTime: '10 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Comparison', 'Home Backup', 'Generator']
  },
  {
    id: 9,
    title: 'RV Solar Installation: Step-by-Step Guide',
    excerpt: 'Complete tutorial on installing a solar system in your RV, including wiring, mounting, and battery setup.',
    category: 'DIY & Installation',
    slug: 'rv-solar-installation-guide',
    image: '/images/blog/rv-solar-install.jpg',
    date: '2025-11-28',
    readTime: '14 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['RV', 'Installation', 'DIY']
  },
  {
    id: 10,
    title: '2026 Solar Market Trends: What to Expect',
    excerpt: 'Prices are dropping and technology is improving. Here are the key trends shaping the solar market this year.',
    category: 'Solar News',
    slug: 'solar-market-trends-2026',
    image: '/images/blog/solar-trends.jpg',
    date: '2025-11-20',
    readTime: '6 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Trends', 'Market', '2026']
  },
  {
    id: 11,
    title: 'Home Battery Backup: Complete Guide to Whole Home Systems',
    excerpt: 'From Tesla Powerwall to EcoFlow Delta Pro, learn about the best options for whole-home battery backup.',
    category: 'Home Backup',
    slug: 'home-battery-backup-guide',
    image: '/images/blog/home-battery-backup.jpg',
    date: '2025-11-15',
    readTime: '13 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Home Backup', 'Battery', 'Whole Home']
  },
  {
    id: 12,
    title: 'Camping with Solar: Essential Gear Guide',
    excerpt: 'Everything you need for a solar-powered camping trip, from portable panels to compact power stations.',
    category: 'Van Life & RV',
    slug: 'camping-solar-essential-guide',
    image: '/images/blog/camping-solar.jpg',
    date: '2025-11-10',
    readTime: '8 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Camping', 'Portable', 'Gear']
  },
  {
    id: 13,
    title: 'How Many Watts Does a Refrigerator Use? Complete Guide',
    excerpt: 'Knowing your refrigerator\'s power requirements is crucial when choosing a solar generator. Here\'s how to calculate your backup needs.',
    category: 'DIY & Installation',
    slug: 'how-many-watts-refrigerator',
    image: '/images/blog/refrigerator-watts.jpg',
    date: '2026-01-08',
    readTime: '8 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Refrigerator', 'Power', 'Calculation']
  },
  {
    id: 14,
    title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?',
    excerpt: 'The Delta Pro is EcoFlow\'s flagship portable power station. We tested it for 3 months to see if it\'s worth the premium price.',
    category: 'Product Reviews',
    slug: 'ecoflow-delta-pro-review',
    image: '/images/blog/ecoflow-delta-pro.jpg',
    date: '2025-12-25',
    readTime: '10 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['EcoFlow', 'Review', 'Delta Pro']
  },
  {
    id: 15,
    title: 'What Size Solar Generator Do I Need for My House?',
    excerpt: 'Choosing the right solar generator for your home is critical for emergency preparedness. This guide breaks down the exact calculations.',
    category: 'Home Backup',
    slug: 'what-size-solar-generator-house',
    image: '/images/blog/solar-generator-house.jpg',
    date: '2026-01-03',
    readTime: '9 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['Home Backup', 'Sizing', 'Solar Generator']
  },
  {
    id: 16,
    title: 'Can a Solar Generator Run a CPAP Machine?',
    excerpt: 'If you use a CPAP machine, having reliable backup power is a medical necessity. Here\'s everything you need to know.',
    category: 'Emergency Preparedness',
    slug: 'cpap-machine-solar-generator',
    image: '/images/blog/cpap-solar.jpg',
    date: '2025-12-30',
    readTime: '7 min read',
    author: 'Jordan Mitchell',
    featured: false,
    tags: ['CPAP', 'Medical', 'Solar Generator']
  }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    if (activeCategory !== 'all' && post.category !== activeCategory) return false
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // Reset pagination when filter changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Blog</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">OffGrid Power Blog</h1>
        <p className="text-gray-600">
          Expert advice, product reviews, and guides for all things off-grid power.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blogCategories.map(category => {
          const Icon = category.icon
          return (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          )
        })}
      </div>

      {/* Featured Post */}
      {activeCategory === 'all' && !searchQuery && currentPage === 1 && (
        <div className="mb-12">
          {blogPosts.filter(post => post.featured).slice(0, 2).map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block ebay-card overflow-hidden hover:shadow-xl transition-all group mb-6"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-blue-50 to-yellow-50 h-64 md:h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">⚡</div>
                    <div className="text-sm font-semibold text-gray-600">{post.category}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 mr-3">{post.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {currentPosts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="ebay-card overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 h-48 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-5xl mb-2">⚡</div>
                <div className="text-xs font-semibold text-gray-500">{post.category}</div>
              </div>
              <span className="absolute top-2 left-2 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                {post.category}
              </span>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-3">{post.author}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
                <span className="text-blue-600 group-hover:underline">Read More →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mb-12">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Author Bio Section */}
      <div className="ebay-card p-6 mb-12 bg-gradient-to-r from-blue-50 to-yellow-50">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4">
            JM
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">About the Author</h2>
            <p className="text-sm text-gray-600">
              Jordan Mitchell is a solar energy expert with 10+ years of experience in renewable energy. 
              He's tested over 200 solar generators and power stations, helping thousands of readers find 
              the perfect off-grid solution for their needs.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="ebay-card p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Get the Latest Articles in Your Inbox
        </h2>
        <p className="text-gray-600 mb-4">
          Join our newsletter for exclusive deals, new product reviews, and expert tips from Jordan.
        </p>
        <form className="max-w-md mx-auto flex space-x-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="ebay-btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}