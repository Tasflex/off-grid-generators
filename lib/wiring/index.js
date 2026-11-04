// lib/wiring/index.js
// Server-side registry: diagram metadata + layout + article bodies. app/wiring-diagrams/[slug] reads from here.
import { diagrams } from './diagrams'
import { diagramSpecs } from './specs'
import { vehicleContent } from './content/vehicle'
import { componentsContent } from './content/components'
import { systemsContent } from './content/systems'

const content = { ...vehicleContent, ...componentsContent, ...systemsContent }

export const fullDiagrams = diagrams.map(d => {
  if (!content[d.slug]) throw new Error(`Missing article content for wiring diagram "${d.slug}"`)
  if (!diagramSpecs[d.slug]) throw new Error(`Missing diagram layout for wiring diagram "${d.slug}"`)
  return { ...d, ...content[d.slug], spec: diagramSpecs[d.slug] }
})

export const getDiagram = slug => fullDiagrams.find(d => d.slug === slug)

export { diagrams }
