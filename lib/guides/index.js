// lib/guides/index.js
// Server-side registry: guide metadata + article bodies. app/guides/[slug] reads from here.
import { guides } from './guides'
import { planningContent } from './content/planning'
import { installContent } from './content/install'
import { placesContent } from './content/places'

const content = { ...planningContent, ...installContent, ...placesContent }

export const fullGuides = guides.map(g => {
  if (!content[g.slug]) throw new Error(`Missing article content for guide "${g.slug}"`)
  return { ...g, ...content[g.slug] }
})

export const getGuide = slug => fullGuides.find(g => g.slug === slug)

export { guides }
