'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, Tag, TrendingUp, BookOpen, Zap, Wrench, Home, Caravan, Shield, X } from 'lucide-react'

const blogCategories = [
  { name: 'All', slug: 'all', icon: BookOpen },
  { name: 'Emergency Preparedness', slug: 'emergency-preparedness', icon: Shield },
  { name: 'Van Life & RV', slug: 'van-life-rv', icon: Caravan },
  { name: 'Home Backup', slug: 'home-backup', icon: Home },
  { name: 'Product Reviews', slug: 'product-reviews', icon: Zap },
  { name: 'DIY & Installation', slug: 'diy-installation', icon: Wrench },
  { name: 'Solar News', slug: 'solar-news', icon: TrendingUp },
]

// Map category names to slugs for filtering
const categorySlugMap = {
  'Emergency Preparedness': 'emergency-preparedness',
  'Van Life & RV': 'van-life-rv',
  'Home Backup': 'home-backup',
  'Product Reviews': 'product-reviews',
  'DIY & Installation': 'diy-installation',
  'Solar News': 'solar-news'
}

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
  const [imageErrors, setImageErrors] = useState({})
  const postsPerPage = 6

  // Use useMemo to prevent infinite re-renders
  const filteredPosts = useMemo(() => {
    let posts = blogPosts

    // Apply category filter
    if (activeCategory !== 'all') {
      posts = posts.filter(post => {
        const postCategorySlug = categorySlugMap[post.category] || post.category.toLowerCase().replace(/\s+/g, '-')
        return postCategorySlug === activeCategory
      })
    }

    // Apply search with relevance scoring
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/)
      
      return posts
        .map(post => {
          let score = 0
          const title = post.title.toLowerCase()
          const excerpt = post.excerpt.toLowerCase()
          const category = post.category.toLowerCase()
          const tags = post.tags.map(t => t.toLowerCase())
          const author = post.author.toLowerCase()

          for (const term of searchTerms) {
            if (title.includes(term)) score += 10
            if (title.startsWith(term)) score += 5
            if (category.includes(term)) score += 7
            if (tags.some(t => t.includes(term))) score += 6
            if (author.includes(term)) score += 4
            if (excerpt.includes(term)) score += 3
          }

          return { ...post, score }
        })
        .filter(post => post.score > 0)
        .sort((a, b) => b.score - a.score)
    }

    return posts
  }, [activeCategory, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleImageError = (postId) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }))
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Product Reviews': 'from-blue-500 to-blue-700',
      'Emergency Preparedness': 'from-red-500 to-red-700',
      'Van Life & RV': 'from-green-500 to-green-700',
      'Home Backup': 'from-purple-500 to-purple-700',
      'DIY & Installation': 'from-orange-500 to-orange-700',
      'Solar News': 'from-yellow-500 to-yellow-700'
    }
    return colors[category] || 'from-gray-500 to-gray-700'
  }

  // Highlight matching text
  const highlightText = (text, query) => {
    if (!query || query.trim() === '') return text
    
    const terms = query.toLowerCase().trim().split(/\s+/)
    let result = text
    
    for (const term of terms) {
      const regex = new RegExp(`(${term})`, 'gi')
      result = result.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">$1</mark>')
    }
    
    return result
  }

  // Get category count
  const getCategoryCount = (slug) => {
    if (slug === 'all') return blogPosts.length
    return blogPosts.filter(p => {
      const postSlug = categorySlugMap[p.category] || p.category.toLowerCase().replace(/\s+/g, '-')
      return postSlug === slug
    }).length
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            placeholder="Search articles by title, category, author, or tags..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-500 mt-2">
            Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
            {activeCategory !== 'all' && ` in ${blogCategories.find(c => c.slug === activeCategory)?.name}`}
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blogCategories.map(category => {
          const Icon = category.icon
          const isActive = activeCategory === category.slug
          const count = getCategoryCount(category.slug)
          
          return (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.name}
              <span className={`ml-2 text-xs ${
                isActive ? 'text-blue-200' : 'text-gray-400'
              }`}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>

      {/* Featured Post - Only show when not searching and on first page */}
      {!searchQuery && activeCategory === 'all' && currentPage === 1 && (
        <div className="mb-12">
          {blogPosts.filter(post => post.featured).slice(0, 2).map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all group mb-6"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className={`bg-gradient-to-br ${getCategoryColor(post.category)} h-64 md:h-full flex items-center justify-center relative`}>
                  {!imageErrors[post.id] ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => handleImageError(post.id)}
                    />
                  ) : (
                    <div className="text-center text-white z-10">
                      <div className="text-6xl mb-2">⚡</div>
                      <div className="text-sm font-semibold">{post.category}</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="ml-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
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
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentPosts.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className={`bg-gradient-to-br ${getCategoryColor(post.category)} h-48 flex items-center justify-center relative`}>
                {!imageErrors[post.id] ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => handleImageError(post.id)}
                  />
                ) : (
                  <div className="text-center text-white z-10">
                    <div className="text-5xl mb-2">⚡</div>
                    <div className="text-xs font-semibold">{post.category}</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold z-10">
                  {post.category}
                </span>
                {searchQuery && post.score > 0 && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold z-10">
                    Match
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 
                  className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(post.title, searchQuery)
                  }}
                />
                <p 
                  className="text-sm text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(post.excerpt, searchQuery)
                  }}
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-3">{post.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  <span className="text-blue-600 group-hover:underline">Read More →</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try adjusting your search terms.`
              : 'No posts match the selected category.'}
          </p>
          <button
            onClick={() => {
              clearSearch()
              setActiveCategory('all')
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mb-12">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
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
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Author Bio Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12 bg-gradient-to-r from-blue-50 to-yellow-50">
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
      <div className="bg-white rounded-lg border border-gray-200 p-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Get the Latest Articles in Your Inbox
        </h2>
        <p className="text-gray-600 mb-4">
          Join our newsletter for exclusive deals, new product reviews, and expert tips from Jordan.
        </p>
        <form className="max-w-md mx-auto flex space-x-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}