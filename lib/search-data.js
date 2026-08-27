// lib/search-data.js
// Central search index for all site content

import { products } from './products'

// All calculators
const calculators = [
  { title: 'Solar Sizing Calculator', type: 'calculator', url: '/calculators/solar-sizing', keywords: 'solar, sizing, generator, battery, power' },
  { title: 'Battery Runtime Calculator', type: 'calculator', url: '/calculators/battery-runtime', keywords: 'battery, runtime, hours, device, watts' },
  { title: 'Off-Grid Budget Calculator', type: 'calculator', url: '/calculators/off-grid-budget', keywords: 'budget, cost, off-grid, price, estimate' },
  { title: 'Solar Panel Layout Calculator', type: 'calculator', url: '/calculators/solar-panel-layout', keywords: 'panel, layout, roof, area, installation' },
  { title: 'Charge Time Calculator', type: 'calculator', url: '/calculators/charge-time', keywords: 'charge, time, solar, ac, car, hours' }
]

// All guides
const guides = [
  { title: 'How to Choose a Solar Generator', type: 'guide', url: '/guides/how-to-choose', keywords: 'choose, buying, guide, solar, generator, select' },
  { title: 'How to Wire a Solar System', type: 'guide', url: '/guides/how-to-wire-solar-system', keywords: 'wire, wiring, install, solar, system, diy' },
  { title: 'Calculate Battery Runtime Guide', type: 'guide', url: '/guides/calculate-battery-runtime', keywords: 'calculate, battery, runtime, formula, guide' }
]

// All blog posts
const blogPosts = [
  { title: 'Best Solar Generators 2026: Complete Buying Guide', type: 'blog', url: '/blog/best-solar-generators-2026', keywords: 'best, solar, generators, 2026, top, picks' },
  { title: 'How to Prepare for a Blackout: Complete Emergency Power Plan', type: 'blog', url: '/blog/blackout-emergency-power-plan', keywords: 'blackout, emergency, prepare, power, outage' },
  { title: 'Van Life Solar Setup: Complete Guide for Beginners', type: 'blog', url: '/blog/van-life-solar-setup-guide', keywords: 'van life, solar, setup, guide, beginners' },
  { title: 'EcoFlow Delta Pro vs Bluetti AC200MAX: Which Is Better?', type: 'blog', url: '/blog/ecoflow-vs-bluetti-comparison', keywords: 'ecoflow, bluetti, comparison, delta, ac200max, compare' },
  { title: 'How Many Solar Panels Do I Need? Complete Calculation Guide', type: 'blog', url: '/blog/how-many-solar-panels-needed', keywords: 'how many, solar panels, calculate, needed' },
  { title: 'Solar Energy Storage: Battery Technology Explained', type: 'blog', url: '/blog/solar-battery-technology-explained', keywords: 'solar, battery, technology, storage, explained' },
  { title: 'CPAP Battery Backup: How to Keep Your Machine Running', type: 'blog', url: '/blog/cpap-battery-backup-guide', keywords: 'cpap, battery, backup, machine, running' },
  { title: 'Solar Generator vs Traditional Generator: Which to Choose?', type: 'blog', url: '/blog/solar-vs-traditional-generator', keywords: 'solar, traditional, generator, compare, choose' },
  { title: 'RV Solar Installation: Step-by-Step Guide', type: 'blog', url: '/blog/rv-solar-installation-guide', keywords: 'rv, solar, installation, step-by-step' },
  { title: '2026 Solar Market Trends: What to Expect', type: 'blog', url: '/blog/solar-market-trends-2026', keywords: '2026, solar, market, trends, expect' },
  { title: 'Home Battery Backup: Complete Guide to Whole Home Systems', type: 'blog', url: '/blog/home-battery-backup-guide', keywords: 'home, battery, backup, whole, systems' },
  { title: 'Camping with Solar: Essential Gear Guide', type: 'blog', url: '/blog/camping-solar-essential-guide', keywords: 'camping, solar, gear, essential' },
  { title: 'How Many Watts Does a Refrigerator Use?', type: 'blog', url: '/blog/how-many-watts-refrigerator', keywords: 'watts, refrigerator, use, power' },
  { title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?', type: 'blog', url: '/blog/ecoflow-delta-pro-review', keywords: 'ecoflow, delta pro, review, worth' },
  { title: 'What Size Solar Generator Do I Need for My House?', type: 'blog', url: '/blog/what-size-solar-generator-house', keywords: 'size, solar, generator, house, home' },
  { title: 'Can a Solar Generator Run a CPAP Machine?', type: 'blog', url: '/blog/cpap-machine-solar-generator', keywords: 'cpap, solar, generator, run, machine' }
]

// All product categories
const productCategories = [
  { title: 'Solar Generators', type: 'category', url: '/products/solar-generators', keywords: 'solar, generators, power, stations' },
  { title: 'Portable Power Stations', type: 'category', url: '/products/portable-power-stations', keywords: 'portable, power, stations, camping' },
  { title: 'Battery Backups', type: 'category', url: '/products/battery-backups', keywords: 'battery, backups, lithium, storage' },
  { title: 'Solar Panels', type: 'category', url: '/products/solar-panels', keywords: 'solar, panels, mono, poly' },
  { title: 'Accessories', type: 'category', url: '/products/accessories', keywords: 'accessories, cables, controllers, mounts' }
]

// All comparison pages
const comparisons = [
  { title: 'EcoFlow vs Bluetti: Which Solar Generator is Better?', type: 'comparison', url: '/comparisons/ecoflow-vs-bluetti', keywords: 'ecoflow, bluetti, compare, comparison' },
  { title: 'Jackery vs EcoFlow: Portable Power Showdown', type: 'comparison', url: '/comparisons/jackery-vs-ecoflow', keywords: 'jackery, ecoflow, compare, portable' },
  { title: 'Renogy vs Goal Zero: Solar System Comparison', type: 'comparison', url: '/comparisons/renogy-vs-goalzero', keywords: 'renogy, goal zero, compare, solar' }
]

// Convert products to search entries - FIXED to handle the nested structure
const productEntries = []
for (const category of Object.values(products)) {
  for (const product of category) {
    productEntries.push({
      title: product.name || '',
      type: 'product',
      url: `/products/${product.id}`,
      keywords: `${product.brand || ''} ${product.category || ''} ${product.capacity || ''}Wh ${product.output || ''}W ${product.features ? product.features.join(' ') : ''}`,
      price: product.price,
      rating: product.rating,
      description: product.description || ''
    })
  }
}

// Combine everything
export const searchIndex = [
  ...productEntries,
  ...calculators,
  ...guides,
  ...blogPosts,
  ...productCategories,
  ...comparisons
]

// Search function - FIXED with proper null checks
export function searchContent(query) {
  if (!query || query.trim() === '') return []
  
  const q = query.toLowerCase().trim()
  
  const results = searchIndex.filter(item => {
    // Safely get title and keywords with fallbacks
    const title = item.title || ''
    const keywords = item.keywords || ''
    const description = item.description || ''
    
    const titleMatch = title.toLowerCase().includes(q)
    const keywordMatch = keywords.toLowerCase().includes(q)
    const descriptionMatch = description.toLowerCase().includes(q)
    
    return titleMatch || keywordMatch || descriptionMatch
  })
  
  // Sort results by relevance (exact matches first)
  return results.sort((a, b) => {
    const aTitle = (a.title || '').toLowerCase()
    const bTitle = (b.title || '').toLowerCase()
    const aKeywords = (a.keywords || '').toLowerCase()
    const bKeywords = (b.keywords || '').toLowerCase()
    
    // Exact title match gets highest priority
    if (aTitle === q && bTitle !== q) return -1
    if (bTitle === q && aTitle !== q) return 1
    
    // Title starts with query gets priority
    if (aTitle.startsWith(q) && !bTitle.startsWith(q)) return -1
    if (bTitle.startsWith(q) && !aTitle.startsWith(q)) return 1
    
    // Title includes query
    if (aTitle.includes(q) && !bTitle.includes(q)) return -1
    if (bTitle.includes(q) && !aTitle.includes(q)) return 1
    
    // Keyword matches
    if (aKeywords.includes(q) && !bKeywords.includes(q)) return -1
    if (bKeywords.includes(q) && !aKeywords.includes(q)) return 1
    
    return 0
  })
}

// Get popular searches
export const popularSearches = [
  'Solar Generator',
  'Battery Backup',
  'EcoFlow Delta Pro',
  'Portable Power',
  'CPAP Backup',
  'Bluetti AC200MAX',
  'Solar Panels',
  'Budget Calculator'
]

// Get featured products for search suggestions
export function getFeaturedProducts(limit = 4) {
  const allProducts = []
  for (const category of Object.values(products)) {
    allProducts.push(...category)
  }
  return allProducts
    .sort((a, b) => (b.rating || 0) * (b.reviews || 0) - (a.rating || 0) * (a.reviews || 0))
    .slice(0, limit)
    .map(p => ({
      title: p.name,
      url: `/products/${p.id}`,
      price: p.price,
      rating: p.rating,
      badge: p.badge
    }))
}

// Get product categories with counts
export function getProductCategories() {
  return Object.entries(products).map(([key, items]) => ({
    id: key,
    name: key.replace(/([A-Z])/g, ' $1').trim(),
    count: items.length,
    url: `/products/${key.toLowerCase().replace(/\s+/g, '-')}`
  }))
}