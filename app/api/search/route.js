import { NextResponse } from 'next/server'

// Mock data - in production this would come from your database
const searchData = {
  products: [
    { id: 'ecoflow-delta-pro', title: 'EcoFlow Delta Pro', category: 'Solar Generators', price: 1999 },
    { id: 'bluetti-ac200max', title: 'Bluetti AC200MAX', category: 'Solar Generators', price: 1099 },
    { id: 'jackery-explorer-2000', title: 'Jackery Explorer 2000', category: 'Solar Generators', price: 1699 },
    { id: 'ecoflow-river-2', title: 'EcoFlow River 2', category: 'Portable Power', price: 199 },
    { id: 'bluetti-eb3a', title: 'Bluetti EB3A', category: 'Portable Power', price: 249 },
    { id: 'renogy-battery', title: 'Renogy 100Ah Battery', category: 'Batteries', price: 699 },
  ],
  calculators: [
    { id: 'solar-sizing', title: 'Solar Sizing Calculator', category: 'Calculators' },
    { id: 'battery-runtime', title: 'Battery Runtime Calculator', category: 'Calculators' },
    { id: 'off-grid-budget', title: 'Off-Grid Budget Calculator', category: 'Calculators' },
  ],
  guides: [
    { id: 'how-to-choose', title: 'How to Choose a Solar Generator', category: 'Guides' },
    { id: 'best-2026', title: 'Best Solar Generators 2026', category: 'Guides' },
    { id: 'blackout-guide', title: 'Blackout Emergency Guide', category: 'Guides' },
  ]
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const q = query.toLowerCase()

  // Search across all categories
  const results = []

  for (const [type, items] of Object.entries(searchData)) {
    const matches = items.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
    
    matches.forEach(item => {
      results.push({
        ...item,
        type: type.slice(0, -1), // Remove 's' from end
        url: `/${type.slice(0, -1)}/${item.id}`
      })
    })
  }

  return NextResponse.json({ results })
}