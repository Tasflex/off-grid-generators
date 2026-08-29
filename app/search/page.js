'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Box, Calculator, FileText, TrendingUp, Zap, X, ArrowRight, Home, Layout, Info } from 'lucide-react'
import { searchContent } from '../../lib/search-data'

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const searchResults = searchContent(searchQuery)
        setResults(searchResults)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [searchQuery])

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = []
    acc[result.type].push(result)
    return acc
  }, {})

  const typeLabels = {
    product: 'Products',
    calculator: 'Calculators',
    guide: 'Guides',
    blog: 'Blog Posts',
    category: 'Categories',
    comparison: 'Comparisons',
    diagram: 'Wiring Diagrams',
    about: 'About Us'
  }

  const getResultIcon = (type) => {
    switch (type) {
      case 'product': return <Box className="h-4 w-4 text-blue-600" />
      case 'calculator': return <Calculator className="h-4 w-4 text-green-600" />
      case 'guide': return <FileText className="h-4 w-4 text-yellow-600" />
      case 'blog': return <FileText className="h-4 w-4 text-purple-600" />
      case 'category': return <Zap className="h-4 w-4 text-orange-600" />
      case 'comparison': return <TrendingUp className="h-4 w-4 text-red-600" />
      case 'diagram': return <Layout className="h-4 w-4 text-blue-600" />
      case 'about': return <Info className="h-4 w-4 text-gray-600" />
      default: return <ArrowRight className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Search</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, calculators, guides, wiring diagrams..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Searching...</p>
        </div>
      ) : searchQuery ? (
        results.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  {typeLabels[type] || type} ({items.length})
                </h2>
                <div className="space-y-2">
                  {items.map((result, index) => (
                    <Link
                      key={`${type}-${index}`}
                      href={result.url}
                      className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition group"
                    >
                      {getResultIcon(type)}
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">
                          {result.title}
                        </div>
                        {result.price && (
                          <div className="text-sm text-gray-500">${result.price.toLocaleString()}</div>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No results found for "{searchQuery}"
            </h2>
            <p className="text-gray-600 mb-6">
              Try different keywords or browse our popular pages.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/products" className="ebay-btn-primary">
                Browse Products
              </Link>
              <Link href="/guides" className="ebay-btn-secondary">
                Read Guides
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Start Searching</h2>
          <p className="text-gray-600">
            Enter your search term above to find products, calculators, guides, and more.
          </p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}