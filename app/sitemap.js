export default function sitemap() {
  const baseUrl = 'https://offgridpower.com'
  
  const routes = [
    '',
    '/products',
    '/products/solar-generators',
    '/products/portable-power-stations',
    '/products/battery-backups',
    '/products/solar-panels',
    '/products/accessories',
    '/calculators',
    '/calculators/solar-sizing',
    '/calculators/battery-runtime',
    '/calculators/off-grid-budget',
    '/calculators/solar-panel-layout',
    '/guides',
    '/guides/how-to-choose',
    '/guides/best-solar-generators-2026',
    '/guides/best-portable-power-stations',
    '/guides/best-battery-backup-systems',
    '/blog',
    '/blog/best-solar-generators-2026',
    '/blog/blackout-emergency-power-plan',
    '/blog/van-life-solar-setup-guide',
    '/blog/ecoflow-vs-bluetti-comparison',
    '/blog/how-many-solar-panels-needed',
    '/blog/solar-battery-technology-explained',
    '/blog/cpap-battery-backup-guide',
    '/blog/solar-vs-traditional-generator',
    '/blog/rv-solar-installation-guide',
    '/blog/solar-market-trends-2026',
    '/blog/home-battery-backup-guide',
    '/blog/camping-solar-essential-guide',
    '/comparisons',
    '/comparisons/ecoflow-vs-bluetti',
    '/comparisons/jackery-vs-ecoflow',
    '/comparisons/renogy-vs-goalzero',
    '/about',
    '/about/contact',
    '/about/affiliate-disclosure',
    '/about/privacy-policy',
    '/about/terms'
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/blog/') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('/calculators/') ? 0.9 : 0.8,
  }))
}