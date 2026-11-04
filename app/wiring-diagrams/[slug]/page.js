import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, AlertTriangle, X } from 'lucide-react'
import { fullDiagrams, getDiagram } from '../../../lib/wiring'
import { renderDiagramSvg } from '../../../lib/wiring/render'
import { resolveRelated } from '../../../lib/articles'
import { SITE_URL } from '../../../lib/seo'
import { Inline, Takeaways, Sections, Faqs, Cta, RelatedGrid } from '../../../components/article/Article'

// Hand-built diagrams keep their own folders; this route serves the data-driven diagrams in lib/wiring.
// The root layout renders dynamically, so unknown slugs still reach the page and need notFound().
export function generateStaticParams() {
  return fullDiagrams.map(d => ({ slug: d.slug }))
}

export default function WiringDiagramPage({ params }) {
  const diagram = getDiagram(params.slug)
  if (!diagram) notFound()

  const url = `${SITE_URL}${diagram.path}`
  const related = diagram.related.map(resolveRelated).filter(Boolean)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: diagram.title,
      description: diagram.description,
      image: `${SITE_URL}${diagram.image}`,
      tool: diagram.components.map(([name]) => ({ '@type': 'HowToTool', name })),
      step: diagram.steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text: text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: diagram.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Wiring Diagrams', item: `${SITE_URL}/wiring-diagrams` },
        { '@type': 'ListItem', position: 3, name: diagram.title, item: url }
      ]
    }
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/wiring-diagrams" className="hover:text-blue-600">Wiring Diagrams</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{diagram.title}</span>
      </nav>

      <header className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">{diagram.category}</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{diagram.voltage}</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{diagram.difficulty}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{diagram.title}</h1>
        <p className="text-gray-600">{diagram.excerpt}</p>
      </header>

      <figure className="ebay-card p-3 md:p-4 mb-8 overflow-x-auto">
        <div className="min-w-[640px]" dangerouslySetInnerHTML={{ __html: renderDiagramSvg(diagram.spec) }} />
        <figcaption className="text-xs text-gray-500 mt-2 flex flex-wrap justify-between gap-2">
          <span>Simplified diagram. Ratings shown are examples; size components for your own system.</span>
          <a href={diagram.image} download className="text-blue-600 hover:underline">Download PNG</a>
        </figcaption>
      </figure>

      <Takeaways intro={diagram.intro} takeaways={diagram.takeaways} />

      <section className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Components</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Component</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Typical spec</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Role</th>
              </tr>
            </thead>
            <tbody>
              {diagram.components.map(([name, spec, role]) => (
                <tr key={name} className="border-t">
                  <td className="px-4 py-3 font-medium text-gray-900">{name}</td>
                  <td className="px-4 py-3 text-gray-700">{spec}</td>
                  <td className="px-4 py-3 text-gray-700">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Step-by-step wiring</h2>
        <ol className="space-y-3">
          {diagram.steps.map((step, i) => (
            <li key={i} className="flex items-start">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mr-3">{i + 1}</span>
              <span className="text-gray-700 pt-0.5"><Inline text={step} /></span>
            </li>
          ))}
        </ol>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-6 flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-900">Disconnect all sources before working, follow the equipment manuals and local electrical codes, and use a licensed electrician for work on home wiring and panels.</p>
        </div>
      </section>

      <Sections sections={diagram.sections} />

      <section className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Common mistakes</h2>
        <ul className="space-y-2">
          {diagram.mistakes.map((m, i) => (
            <li key={i} className="flex items-start text-gray-700">
              <X className="h-4 w-4 text-red-500 mt-1 mr-2 flex-shrink-0" />
              <span><Inline text={m} /></span>
            </li>
          ))}
        </ul>
      </section>

      <Faqs faqs={diagram.faqs} />
      <Cta cta={diagram.cta} />
      <RelatedGrid items={related} title="Related diagrams and guides" />
    </div>
  )
}
