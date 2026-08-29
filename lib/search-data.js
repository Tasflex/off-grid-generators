// lib/search-data.js
// Central search index for ALL site content

// Import products data
import { products } from './products'

// Convert products to search entries - with fallback for missing properties
const productEntries = Object.values(products).map(product => ({
  title: product.name || product.title || 'Unnamed Product', // FIXED: fallback
  type: 'product',
  url: `/products/${product.id}`,
  keywords: `${product.brand || ''} ${product.category || ''} ${product.capacity ? product.capacity + 'Wh' : ''} ${product.output ? product.output + 'W' : ''} ${product.features ? product.features.join(' ') : ''}`,
  price: product.price,
  image: product.image
}))

// All Calculators
const calculators = [
  { title: 'Solar Sizing Calculator', type: 'calculator', url: '/calculators/solar-sizing', keywords: 'solar sizing generator battery power calculate calculator' },
  { title: 'Battery Runtime Calculator', type: 'calculator', url: '/calculators/battery-runtime', keywords: 'battery runtime hours device watts calculate calculator' },
  { title: 'Off-Grid Budget Calculator', type: 'calculator', url: '/calculators/off-grid-budget', keywords: 'budget cost off-grid price estimate calculate calculator money' },
  { title: 'Solar Panel Layout Calculator', type: 'calculator', url: '/calculators/solar-panel-layout', keywords: 'panel layout roof area installation calculate calculator' },
  { title: 'Charge Time Calculator', type: 'calculator', url: '/calculators/charge-time', keywords: 'charge time solar ac car hours calculate calculator' },
  { title: 'Inverter Sizing Calculator', type: 'calculator', url: '/calculators/inverter-sizing', keywords: 'inverter sizing watts calculate calculator power' },
  { title: 'Charge Controller Sizing Calculator', type: 'calculator', url: '/calculators/charge-controller-sizing', keywords: 'charge controller sizing mppt pwm calculate calculator' }
]

// All Guides
const guides = [
  { title: 'How to Choose a Solar Generator', type: 'guide', url: '/guides/how-to-choose', keywords: 'choose buying guide solar generator select best' },
  { title: 'How to Wire a Solar System', type: 'guide', url: '/guides/how-to-wire-solar-system', keywords: 'wire wiring install solar system diy connection' },
  { title: 'Calculate Battery Runtime Guide', type: 'guide', url: '/guides/calculate-battery-runtime', keywords: 'calculate battery runtime formula guide' },
  { title: 'Emergency Power Setup', type: 'guide', url: '/guides/emergency-power-setup', keywords: 'emergency power setup backup outage blackout prepare' },
  { title: 'Van Life Solar Sizing', type: 'guide', url: '/guides/van-life-solar-sizing', keywords: 'van life solar sizing rv camper conversion' },
  { title: 'Best Solar Generators 2026', type: 'guide', url: '/guides/best-solar-generators-2026', keywords: 'best solar generators 2026 top picks recommendations' },
  { title: 'Best Portable Power Stations', type: 'guide', url: '/guides/best-portable-power-stations', keywords: 'best portable power stations camping travel top' },
  { title: 'Best Battery Backup Systems', type: 'guide', url: '/guides/best-battery-backup-systems', keywords: 'best battery backup systems home storage top' },
  { title: 'Blackout Survival Guide', type: 'guide', url: '/guides/blackout-survival-guide', keywords: 'blackout survival guide power outage emergency' },
  { title: 'Complete Off-Grid Living Guide', type: 'guide', url: '/guides/complete-off-grid-living-guide', keywords: 'complete off-grid living guide self sufficient' },
  { title: 'Home Backup Systems', type: 'guide', url: '/guides/home-backup-systems', keywords: 'home backup systems power outage house' },
  { title: 'How Many Solar Panels Do I Need?', type: 'guide', url: '/guides/how-many-solar-panels-do-i-need', keywords: 'how many solar panels need calculate size' },
  { title: 'How to Install Solar Panels', type: 'guide', url: '/guides/how-to-install-solar-panels', keywords: 'how install solar panels mounting roof' },
  { title: 'Medical Device Power', type: 'guide', url: '/guides/medical-device-power', keywords: 'medical device power cpap oxygen backup' },
  { title: 'RV Power Systems', type: 'guide', url: '/guides/rv-power-systems', keywords: 'rv power systems solar motorhome camper' },
  { title: 'Whole Home Solar', type: 'guide', url: '/guides/whole-home-solar', keywords: 'whole home solar system backup power' },
  { title: 'Camping Power Solutions', type: 'guide', url: '/guides/camping-power-solutions', keywords: 'camping power solutions portable solar outdoor' }
]

// All Wiring Diagrams
const wiringDiagrams = [
  { title: 'Basic Off-Grid Wiring Diagram', type: 'diagram', url: '/wiring-diagrams/basic-off-grid', keywords: 'basic off-grid wiring diagram solar system' },
  { title: '12V System Wiring', type: 'diagram', url: '/wiring-diagrams/12v-system', keywords: '12v system wiring diagram van camping' },
  { title: '24V System Wiring', type: 'diagram', url: '/wiring-diagrams/24v-system', keywords: '24v system wiring diagram home' },
  { title: '48V System Wiring', type: 'diagram', url: '/wiring-diagrams/48v-system', keywords: '48v system wiring diagram whole home' },
  { title: 'Battery Bank Wiring', type: 'diagram', url: '/wiring-diagrams/battery-bank', keywords: 'battery bank wiring series parallel' },
  { title: 'Charge Controller Wiring', type: 'diagram', url: '/wiring-diagrams/charge-controller', keywords: 'charge controller wiring mppt pwm' },
  { title: 'Inverter Connection Wiring', type: 'diagram', url: '/wiring-diagrams/inverter-connection', keywords: 'inverter connection wiring dc ac' },
  { title: 'Panel Series Wiring', type: 'diagram', url: '/wiring-diagrams/panel-series', keywords: 'panel series wiring solar voltage' },
  { title: 'Panel Parallel Wiring', type: 'diagram', url: '/wiring-diagrams/panel-parallel', keywords: 'panel parallel wiring solar current' },
  { title: 'Panel Series-Parallel Wiring', type: 'diagram', url: '/wiring-diagrams/panel-series-parallel', keywords: 'panel series-parallel wiring solar combo' }
]

// All Comparisons
const comparisons = [
  { title: 'EcoFlow vs Bluetti', type: 'comparison', url: '/comparisons/ecoflow-vs-bluetti', keywords: 'ecoflow bluetti comparison compare delta pro ac200max' },
  { title: 'Jackery vs EcoFlow', type: 'comparison', url: '/comparisons/jackery-vs-ecoflow', keywords: 'jackery ecoflow comparison compare explorer delta' },
  { title: 'Portable vs Home Backup', type: 'comparison', url: '/comparisons/portable-vs-home-backup', keywords: 'portable home backup comparison compare power' },
  { title: 'Renogy vs Goal Zero', type: 'comparison', url: '/comparisons/renogy-vs-goalzero', keywords: 'renogy goal zero comparison compare solar' },
  { title: 'Solar vs Gas Generator', type: 'comparison', url: '/comparisons/solar-vs-gas-generator', keywords: 'solar gas generator comparison compare traditional' }
]

// All Blog Posts
const blogPosts = [
  { title: 'Best Solar Generators 2026: Complete Buying Guide', type: 'blog', url: '/blog/best-solar-generators-2026', keywords: 'best solar generators 2026 buying guide' },
  { title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?', type: 'blog', url: '/blog/ecoflow-delta-pro-review', keywords: 'ecoflow delta pro review worth price' },
  { title: 'How Many Watts Does a Refrigerator Use?', type: 'blog', url: '/blog/how-many-watts-refrigerator', keywords: 'how many watts refrigerator use power' },
  { title: 'What Size Solar Generator Do I Need for My House?', type: 'blog', url: '/blog/what-size-solar-generator-house', keywords: 'what size solar generator house home need' },
  { title: 'Can a Solar Generator Run a CPAP Machine?', type: 'blog', url: '/blog/cpap-machine-solar-generator', keywords: 'solar generator cpap machine run medical' },
  { title: 'Van Life Solar Setup Guide', type: 'blog', url: '/blog/van-life-solar-setup-guide', keywords: 'van life solar setup guide' },
  { title: 'EcoFlow vs Bluetti Comparison', type: 'blog', url: '/blog/ecoflow-vs-bluetti-comparison', keywords: 'ecoflow bluetti comparison compare' },
  { title: 'How Many Solar Panels Do I Need?', type: 'blog', url: '/blog/how-many-solar-panels-needed', keywords: 'how many solar panels need' },
  { title: 'Solar Battery Technology Explained', type: 'blog', url: '/blog/solar-battery-technology-explained', keywords: 'solar battery technology explained lifepo4 lithium' },
  { title: 'Solar vs Traditional Generator', type: 'blog', url: '/blog/solar-vs-traditional-generator', keywords: 'solar traditional generator compare gas' },
  { title: 'RV Solar Installation Guide', type: 'blog', url: '/blog/rv-solar-installation-guide', keywords: 'rv solar installation guide' },
  { title: '2026 Solar Market Trends', type: 'blog', url: '/blog/solar-market-trends-2026', keywords: '2026 solar market trends' },
  { title: 'Home Battery Backup Guide', type: 'blog', url: '/blog/home-battery-backup-guide', keywords: 'home battery backup guide whole home' },
  { title: 'Camping with Solar: Essential Gear', type: 'blog', url: '/blog/camping-solar-essential-guide', keywords: 'camping solar essential gear' },
  { title: 'Blackout Emergency Power Plan', type: 'blog', url: '/blog/blackout-emergency-power-plan', keywords: 'blackout emergency power plan' }
]

// Product Categories
const productCategories = [
  { title: 'Solar Generators', type: 'category', url: '/products/solar-generators', keywords: 'solar generators power stations' },
  { title: 'Portable Power Stations', type: 'category', url: '/products/portable-power-stations', keywords: 'portable power stations camping' },
  { title: 'Battery Backups', type: 'category', url: '/products/battery-backups', keywords: 'battery backups lithium storage' },
  { title: 'Solar Panels', type: 'category', url: '/products/solar-panels', keywords: 'solar panels mono poly' },
  { title: 'Inverters', type: 'category', url: '/products/inverters', keywords: 'inverters dc ac power conversion' },
  { title: 'Charge Controllers', type: 'category', url: '/products/charge-controllers', keywords: 'charge controllers mppt pwm' },
  { title: 'Components', type: 'category', url: '/products/components', keywords: 'components cables fuses connectors' },
  { title: 'Complete Kits', type: 'category', url: '/products/complete-kits', keywords: 'complete kits solar bundle' }
]

// About Pages
const aboutPages = [
  { title: 'About Us', type: 'about', url: '/about', keywords: 'about us our mission team' },
  { title: 'Contact Us', type: 'about', url: '/about/contact', keywords: 'contact us support help email' },
  { title: 'Affiliate Disclosure', type: 'about', url: '/about/affiliate-disclosure', keywords: 'affiliate disclosure' },
  { title: 'Privacy Policy', type: 'about', url: '/about/privacy-policy', keywords: 'privacy policy' }
]

// Combine everything
export const searchIndex = [
  ...productEntries,
  ...calculators,
  ...guides,
  ...wiringDiagrams,
  ...comparisons,
  ...blogPosts,
  ...productCategories,
  ...aboutPages
]

// Search function - FIXED with safety checks
export function searchContent(query) {
  if (!query || query.trim() === '') return []
  
  const q = query.toLowerCase().trim()
  
  // If query is very short (1-2 chars), only match title starts
  if (q.length <= 2) {
    return searchIndex.filter(item => {
      const title = item.title || ''
      return title.toLowerCase().startsWith(q)
    }).slice(0, 10)
  }
  
  // Full search with safety checks
  const results = searchIndex.filter(item => {
    const title = item.title || ''
    const keywords = item.keywords || ''
    const titleMatch = title.toLowerCase().includes(q)
    const keywordMatch = keywords.toLowerCase().includes(q)
    return titleMatch || keywordMatch
  })
  
  // Sort by relevance:
  // 1. Title starts with query
  // 2. Title includes query
  // 3. Keywords include query
  const sortedResults = results.sort((a, b) => {
    const aTitle = a.title || ''
    const bTitle = b.title || ''
    const aStarts = aTitle.toLowerCase().startsWith(q)
    const bStarts = bTitle.toLowerCase().startsWith(q)
    if (aStarts && !bStarts) return -1
    if (!aStarts && bStarts) return 1
    
    const aInTitle = aTitle.toLowerCase().includes(q)
    const bInTitle = bTitle.toLowerCase().includes(q)
    if (aInTitle && !bInTitle) return -1
    if (!aInTitle && bInTitle) return 1
    
    return 0
  })
  
  return sortedResults
}

// Get popular searches
export const popularSearches = [
  'Solar Generator',
  'Battery Backup',
  'EcoFlow Delta Pro',
  'Bluetti AC200MAX',
  'CPAP Backup',
  'Solar Panels',
  'Wiring Diagram',
  'Budget Calculator',
  'Camping Power',
  'Home Backup',
  'Battery Runtime',
  'Inverter'
]