// lib/calc/index.js
// Server-side registry: calculator logic + page copy. Pages, sitemap, SEO and the index read from here.
import { calcLogic } from './logic'
import { categories, categoryOrder } from './categories'
import { solarContent } from './content/solar'
import { batteryContent } from './content/battery'
import { inverterContent } from './content/inverter'
import { wiringContent } from './content/wiring'
import { locationContent } from './content/location'
import { builderContent } from './content/builder'
import { planningContent } from './content/planning'
import { performanceContent } from './content/performance'

const content = { ...solarContent, ...batteryContent, ...inverterContent, ...wiringContent, ...locationContent, ...builderContent, ...planningContent, ...performanceContent }

export const deviceCalculators = calcLogic.map(({ slug, code, category, name }) => {
  if (!content[slug]) throw new Error(`Missing page content for calculator "${slug}"`)
  return { slug, code, category, name, path: `/calculators/${slug}`, ...content[slug] }
})

export const getDeviceCalculator = slug => deviceCalculators.find(c => c.slug === slug)

export const deviceCalculatorsByCategory = categoryOrder.map(id => ({
  ...categories[id],
  calculators: deviceCalculators.filter(c => c.category === id)
}))

export { categories }
