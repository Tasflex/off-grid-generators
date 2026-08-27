export const products = {
  solarGenerators: [
    {
      id: 'ecoflow-delta-pro',
      name: 'EcoFlow Delta Pro',
      brand: 'EcoFlow',
      capacity: 3600,
      output: 3600,
      price: 1999,
      weight: 99,
      dimensions: '25 x 11.5 x 16.4 inches',
      warranty: '5 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC', 'Car'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Expandable', 'Smart App', 'High Capacity'],
      affiliateUrl: 'https://impact.com/ecoflow?aff_id=YOUR_ID&offer=delta-pro',
      image: '/images/products/ecoflow-delta-pro.jpg',
      rating: 4.8,
      reviews: 1243
    },
    {
      id: 'bluetti-ac200max',
      name: 'Bluetti AC200MAX',
      brand: 'Bluetti',
      capacity: 2048,
      output: 2200,
      price: 1099,
      weight: 62,
      dimensions: '16.5 x 11 x 15.2 inches',
      warranty: '2 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC', 'Car'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Expandable', 'LCD Display', 'Wireless Charging'],
      affiliateUrl: 'https://shareasale.com/r.cfm?b=123&u=YOUR_ID&m=456&afftrack=ac200max',
      image: '/images/products/bluetti-ac200max.jpg',
      rating: 4.7,
      reviews: 892
    },
    {
      id: 'jackery-explorer-2000',
      name: 'Jackery Explorer 2000',
      brand: 'Jackery',
      capacity: 2160,
      output: 2200,
      price: 1699,
      weight: 43.5,
      dimensions: '15.1 x 10.4 x 12.2 inches',
      warranty: '3 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC', 'Car'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Portable', 'Easy to Use', 'Solar Ready'],
      affiliateUrl: 'https://impact.com/jackery?aff_id=YOUR_ID&offer=explorer-2000',
      image: '/images/products/jackery-explorer-2000.jpg',
      rating: 4.9,
      reviews: 1567
    }
  ],
  portablePowerStations: [
    {
      id: 'ecoflow-river-2',
      name: 'EcoFlow River 2',
      brand: 'EcoFlow',
      capacity: 256,
      output: 300,
      price: 199,
      weight: 7.7,
      dimensions: '9.7 x 5.8 x 5.9 inches',
      warranty: '5 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Compact', 'Fast Charging', 'Lightweight'],
      affiliateUrl: 'https://impact.com/ecoflow?aff_id=YOUR_ID&offer=river-2',
      image: '/images/products/ecoflow-river-2.jpg',
      rating: 4.6,
      reviews: 456
    },
    {
      id: 'jackery-explorer-300',
      name: 'Jackery Explorer 300',
      brand: 'Jackery',
      capacity: 293,
      output: 300,
      price: 299,
      weight: 7.1,
      dimensions: '9.1 x 5.2 x 7.7 inches',
      warranty: '2 years',
      ports: ['AC', 'USB-C', 'USB-A', 'DC'],
      charging: ['Solar', 'AC', 'Car'],
      features: ['Portable', 'Reliable', 'Multiple Ports'],
      affiliateUrl: 'https://impact.com/jackery?aff_id=YOUR_ID&offer=explorer-300',
      image: '/images/products/jackery-explorer-300.jpg',
      rating: 4.7,
      reviews: 789
    }
  ],
  batteryBackups: [
    {
      id: 'renogy-battery',
      name: 'Renogy 100Ah Lithium Battery',
      brand: 'Renogy',
      capacity: 1280,
      output: 1000,
      price: 699,
      weight: 31.9,
      dimensions: '13.4 x 7.4 x 7.3 inches',
      warranty: '5 years',
      ports: ['DC', 'Terminal'],
      charging: ['Solar', 'AC'],
      features: ['Deep Cycle', 'Long Life', 'BMS Protection'],
      affiliateUrl: 'https://shareasale.com/r.cfm?b=123&u=YOUR_ID&m=789&afftrack=renogy-battery',
      image: '/images/products/renogy-battery.jpg',
      rating: 4.5,
      reviews: 234
    }
  ]
}

export function getProductsByCategory(category) {
  return products[category] || []
}

export function getProductById(id) {
  for (const category of Object.values(products)) {
    const product = category.find(p => p.id === id)
    if (product) return product
  }
  return null
}