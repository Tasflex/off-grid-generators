'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X, TrendingUp, FileText, Calculator, Box } from 'lucide-react'

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const inputRef = useRef(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recent_searches') || '[]')
    setRecentSearches(recent)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search functionality
  useEffect(() => {
    if (!searchQuery) {
      setResults([])
      return
    }

    // In production, this would be an API call
    const searchData = {
      products: [
        { title: 'EcoFlow Delta Pro', type: 'product', url: '/products/ecoflow-delta-pro' },
        { title: 'Bluetti AC200MAX', type: 'product', url: '/products/bluetti-ac200max' },
        { title: 'Jackery Explorer 2000', type: 'product', url: '/products/jackery-explorer-2000' },
      ],
      calculators: [
        { title: 'Solar Sizing Calculator', type: 'calculator', url: '/calculators/solar-sizing' },
        { title: 'Battery Runtime Calculator', type: 'calculator', url: '/calculators/battery-runtime' },
        { title: 'Off-Grid Budget Calculator', type: 'calculator', url: '/calculators/off-grid-budget' },
      ],
      guides: [
        { title: 'How to Choose a Solar Generator', type: 'guide', url: '/guides/how-to-choose' },
        { title: 'Best Solar Generators 2026', type: 'guide', url: '/guides/best-solar-generators-2026' },
        { title: 'Blackout Emergency Power Plan', type: 'guide', url: '/blog/blackout-emergency-power-plan' },
      ]
    }

    const query = searchQuery.toLowerCase()
    const allResults = [
      ...searchData.products.map(item => ({ ...item, category: 'Products' })),
      ...searchData.calculators.map(item => ({ ...item, category: 'Calculators' })),
      ...searchData.guides.map(item => ({ ...item, category: 'Guides' })),
    ].filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    )

    setResults(allResults)
  }, [searchQuery])

  // Save search to recent
  const saveSearch = (term) => {
    const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem('recent_searches', JSON.stringify(newRecent))
  }

  const handleSearch = (term) => {
    setSearchQuery(term)
    saveSearch(term)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-4 pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, calculators, guides..."
            className="flex-1 outline-none text-lg"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery ? (
            results.length > 0 ? (
              <div className="space-y-4">
                {/* Group by category */}
                {['Products', 'Calculators', 'Guides'].map(category => {
                  const categoryResults = results.filter(r => r.category === category)
                  if (categoryResults.length === 0) return null
                  
                  return (
                    <div key={category}>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        {category}
                      </h3>
                      <div className="space-y-1">
                        {categoryResults.map((result, index) => (
                          <Link
                            key={`${category}-${index}`}
                            href={result.url}
                            onClick={onClose}
                            className="flex items-center px-3 py-2 rounded hover:bg-gray-50"
                          >
                            {result.type === 'product' && <Box className="h-4 w-4 text-blue-600 mr-3" />}
                            {result.type === 'calculator' && <Calculator className="h-4 w-4 text-green-600 mr-3" />}
                            {result.type === 'guide' && <FileText className="h-4 w-4 text-yellow-600 mr-3" />}
                            <span className="text-sm text-gray-800">{result.title}</span>
                            {result.url.includes('/products/') && (
                              <span className="ml-auto text-xs text-gray-500">${Math.floor(Math.random() * 2000) + 200}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500 mt-2">Try searching for "solar generator" or "battery"</p>
              </div>
            )
          ) : (
            <div>
              {/* Quick Links */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Solar Generator', 'Battery Backup', 'EcoFlow', 'Portable Power', 'CPAP Backup'].map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
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
                        className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                      >
                        <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                        {term}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1 bg-gray-200 rounded">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}