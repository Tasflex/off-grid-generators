'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X, TrendingUp, FileText, Calculator, Box, Zap, Home, ArrowRight, Layout, Compass, Info } from 'lucide-react'
import { searchContent, popularSearches } from '../lib/search-data'

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const inputRef = useRef(null)

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recent = JSON.parse(localStorage.getItem('recent_searches') || '[]')
      setRecentSearches(recent)
    }
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [isOpen])

  // Search functionality using central index
  useEffect(() => {
    if (!searchQuery) {
      setResults([])
      return
    }
    
    const searchResults = searchContent(searchQuery)
    setResults(searchResults)
  }, [searchQuery])

  // Save search to recent
  const saveSearch = (term) => {
    if (typeof window !== 'undefined') {
      const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
      setRecentSearches(newRecent)
      localStorage.setItem('recent_searches', JSON.stringify(newRecent))
    }
  }

  const handleSearch = (term) => {
    setSearchQuery(term)
    saveSearch(term)
  }

  // Handle form submission - navigate to search page
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim())
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      onClose()
    }
  }

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault()
      saveSearch(searchQuery.trim())
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      onClose()
    }
  }

  // Get icon for result type
  const getResultIcon = (type) => {
    switch (type) {
      case 'product':
        return <Box className="h-4 w-4 text-blue-600" />
      case 'calculator':
        return <Calculator className="h-4 w-4 text-green-600" />
      case 'guide':
        return <FileText className="h-4 w-4 text-yellow-600" />
      case 'blog':
        return <FileText className="h-4 w-4 text-purple-600" />
      case 'category':
        return <Zap className="h-4 w-4 text-orange-600" />
      case 'comparison':
        return <TrendingUp className="h-4 w-4 text-red-600" />
      case 'diagram':
        return <Layout className="h-4 w-4 text-blue-600" />
      case 'about':
        return <Info className="h-4 w-4 text-gray-600" />
      default:
        return <ArrowRight className="h-4 w-4 text-gray-600" />
    }
  }

  // Group results by type
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

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input - Updated with form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center p-4 border-b">
          <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products, calculators, guides, wiring diagrams..."
            className="flex-1 outline-none text-lg w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 mr-2"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Search
          </button>
        </form>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery ? (
            results.length > 0 ? (
              <div className="space-y-6">
                {/* Group by type */}
                {Object.entries(groupedResults).map(([type, items]) => (
                  <div key={type}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {typeLabels[type] || type} ({items.length})
                    </h3>
                    <div className="space-y-1">
                      {items.slice(0, 5).map((result, index) => (
                        <Link
                          key={`${type}-${index}`}
                          href={result.url}
                          onClick={() => {
                            onClose()
                            if (searchQuery) saveSearch(searchQuery)
                          }}
                          className="flex items-center px-3 py-2 rounded hover:bg-gray-50 group"
                        >
                          {getResultIcon(type)}
                          <div className="ml-3 flex-1">
                            <div className="text-sm text-gray-800 group-hover:text-blue-600 font-medium">
                              {result.title}
                            </div>
                            {result.price && (
                              <div className="text-xs text-gray-500">
                                ${result.price.toLocaleString()}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                      ))}
                      {items.length > 5 && (
                        <div className="text-xs text-gray-500 pl-3 pt-1">
                          +{items.length - 5} more results
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* View All Results Button */}
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  onClick={onClose}
                  className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  View All Results ({results.length})
                </Link>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 font-medium">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500 mt-2">Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {popularSearches.slice(0, 4).map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div>
              {/* Popular Searches */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 hover:text-blue-600"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Recent Searches
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(term)}
                        className="flex items-center text-sm text-gray-700 hover:text-blue-600 w-full text-left"
                      >
                        <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                        {term}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Quick Categories */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 mt-6">
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/products/solar-generators" onClick={onClose} className="flex items-center p-2 bg-gray-50 rounded hover:bg-blue-50">
                  <Zap className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="text-sm">Solar Generators</span>
                </Link>
                <Link href="/calculators" onClick={onClose} className="flex items-center p-2 bg-gray-50 rounded hover:bg-blue-50">
                  <Calculator className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Calculators</span>
                </Link>
                <Link href="/guides" onClick={onClose} className="flex items-center p-2 bg-gray-50 rounded hover:bg-blue-50">
                  <FileText className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm">Guides</span>
                </Link>
                <Link href="/blog" onClick={onClose} className="flex items-center p-2 bg-gray-50 rounded hover:bg-blue-50">
                  <FileText className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-sm">Blog</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1 bg-gray-200 rounded">ESC</kbd> to close
          </p>
          <div className="flex items-center space-x-4">
            {searchQuery && results.length > 0 && (
              <span className="text-xs text-gray-500">
                {results.length} results found
              </span>
            )}
            <Link
              href="/search"
              onClick={onClose}
              className="text-xs text-blue-600 hover:underline"
            >
              Advanced Search →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}