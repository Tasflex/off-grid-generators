'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Share2, Bookmark, ChevronRight, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react'

// Sample blog post content - in production this would come from a database
const blogPostContent = {
  'best-solar-generators-2026': {
    title: 'Best Solar Generators 2026: Complete Buying Guide',
    excerpt: 'We tested 15 solar generators to find the best options for every budget and use case.',
    category: 'Product Reviews',
    author: 'Sarah Johnson',
    date: '2026-01-15',
    readTime: '12 min read',
    content: `
      <p>Solar generators have become essential tools for emergency preparedness, camping, and off-grid living. With the market expanding rapidly, choosing the right one can be overwhelming. We've tested 15 of the most popular models to bring you this comprehensive guide.</p>
      
      <h2>Why Solar Generators?</h2>
      <p>Unlike traditional gas generators, solar generators produce zero emissions, operate quietly, and require minimal maintenance. They're perfect for:</p>
      <ul>
        <li>Emergency backup during power outages</li>
        <li>Camping and outdoor activities</li>
        <li>Van life and RV living</li>
        <li>Remote work locations</li>
        <li>Off-grid living</li>
      </ul>
      
      <h2>Top Picks for 2026</h2>
      <p>After weeks of testing, here are our top recommendations for every budget:</p>
      
      <h3>Best Overall: EcoFlow Delta Pro</h3>
      <p>With 3.6kWh capacity and 3600W output, the Delta Pro is our top pick for most users. It offers expandable capacity up to 25kWh, making it perfect for home backup.</p>
      <p><strong>Price:</strong> $1,999 | <a href="/products/ecoflow-delta-pro">View Deal</a></p>
      
      <h3>Best Value: Bluetti AC200MAX</h3>
      <p>At $1,099, the AC200MAX provides excellent value with 2,048Wh capacity and 2200W output. It's lighter and more portable than the Delta Pro.</p>
      <p><strong>Price:</strong> $1,099 | <a href="/products/bluetti-ac200max">View Deal</a></p>
      
      <h3>Best Portable: Jackery Explorer 2000</h3>
      <p>If portability is your priority, the Jackery Explorer 2000 offers 2,160Wh capacity in a much lighter package at 43.5 lbs.</p>
      <p><strong>Price:</strong> $1,699 | <a href="/products/jackery-explorer-2000">View Deal</a></p>
      
      <h2>How to Choose the Right Solar Generator</h2>
      <p>When selecting a solar generator, consider:</p>
      <ol>
        <li><strong>Capacity (Wh):</strong> Determine your daily energy needs</li>
        <li><strong>Output (W):</strong> Check if it can power your most demanding device</li>
        <li><strong>Weight:</strong> Consider where you'll be using it</li>
        <li><strong>Charging options:</strong> Look for solar + AC charging</li>
      </ol>
      
      <p>Use our <a href="/calculators/solar-sizing">solar sizing calculator</a> to find the perfect capacity for your needs.</p>
      
      <h2>FAQ</h2>
      <h3>How long do solar generators last?</h3>
      <p>Quality solar generators last 5-10 years with proper maintenance. Lithium batteries typically have 2,000-3,500 charge cycles.</p>
      
      <h3>Can I run my refrigerator on a solar generator?</h3>
      <p>Yes, most 2000Wh+ generators can run a refrigerator for 12-24 hours. Use our <a href="/calculators/battery-runtime">battery runtime calculator</a> to estimate exact times.</p>
    `,
    tags: ['Solar Generators', 'Buying Guide', '2026', 'Top Picks']
  }
}

export default function BlogPostPage({ params }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [shared, setShared] = useState(false)
  
  const post = blogPostContent[params.slug] || {
    title: 'Blog Post',
    excerpt: 'Content coming soon.',
    category: 'Blog',
    author: 'OffGrid Power',
    date: '2026-01-01',
    readTime: '5 min read',
    content: '<p>This content is being updated. Check back soon.</p>',
    tags: ['Coming Soon']
  }

  const handleShare = (platform) => {
    const url = window.location.href
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${post.title}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${post.title}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
        break
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="inline h-4 w-4 mx-1" />
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <ChevronRight className="inline h-4 w-4 mx-1" />
        <span className="text-gray-900">{post.title}</span>
      </nav>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{post.author}</span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="ebay-card p-8 mb-8">
        <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </article>

      {/* Share Actions */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-900">Share this article:</span>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              title="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800"
              title="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
              title="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              title="Copy link"
            >
              {shared ? <span className="text-xs">✓</span> : <Link2 className="h-4 w-4" />}
            </button>
          </div>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              bookmarked ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
            {bookmarked ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/products/solar-generators" className="ebay-card p-4 hover:shadow-lg transition group">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-3xl">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Solar Generators</h3>
                <p className="text-sm text-gray-600">Browse our top-rated solar generators</p>
              </div>
            </div>
          </Link>
          <Link href="/calculators/solar-sizing" className="ebay-card p-4 hover:shadow-lg transition group">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-3xl">🧮</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Sizing Calculator</h3>
                <p className="text-sm text-gray-600">Find your perfect solar solution</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Author Bio */}
      <div className="ebay-card p-6 mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mr-4">
            {post.author.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.author}</h3>
            <p className="text-sm text-gray-600">
              Solar energy expert at OffGrid Power. Testing and reviewing products since 2019.
            </p>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/blog/blackout-emergency-power-plan" className="ebay-card p-4 hover:shadow-lg transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
              How to Prepare for a Blackout
            </h3>
            <p className="text-sm text-gray-600">Complete emergency power plan</p>
          </Link>
          <Link href="/blog/van-life-solar-setup-guide" className="ebay-card p-4 hover:shadow-lg transition group">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
              Van Life Solar Setup Guide
            </h3>
            <p className="text-sm text-gray-600">Complete guide for beginners</p>
          </Link>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="ebay-card p-6 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Enjoyed this article?</h2>
        <p className="text-gray-600 mb-4">Subscribe to get more expert tips and exclusive deals.</p>
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