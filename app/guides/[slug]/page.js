import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { fullGuides, getGuide } from '../../../lib/guides'
import { resolveRelated } from '../../../lib/articles'
import { SITE_URL } from '../../../lib/seo'
import { Takeaways, Sections, Faqs, Cta, RelatedGrid, ImageCredit } from '../../../components/article/Article'

// Hand-built guides keep their own folders; this route serves the data-driven guides in lib/guides.
// The root layout renders dynamically, so unknown slugs still reach the page and need notFound().
export function generateStaticParams() {
  return fullGuides.map(g => ({ slug: g.slug }))
}

const formatDate = iso => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function GuidePage({ params }) {
  const guide = getGuide(params.slug)
  if (!guide) notFound()

  const url = `${SITE_URL}${guide.path}`
  const related = guide.related.map(resolveRelated).filter(Boolean)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      image: `${SITE_URL}${guide.image}`,
      datePublished: guide.date,
      dateModified: guide.date,
      author: { '@type': 'Organization', name: 'TheLoadCalc', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'TheLoadCalc', url: SITE_URL },
      mainEntityOfPage: url
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
        { '@type': 'ListItem', position: 3, name: guide.title, item: url }
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-blue-600">Guides</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{guide.title}</span>
      </nav>

      <header className="mb-6">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{guide.category}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">{guide.title}</h1>
        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{guide.author}</span>
          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{formatDate(guide.date)}</span>
          <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{guide.readTime}</span>
        </div>
      </header>

      <figure className="mb-8">
        <img src={guide.image} alt={guide.title} width={1200} height={675} className="w-full h-auto rounded-lg" />
        <ImageCredit credit={guide.imageCredit} />
      </figure>

      <Takeaways intro={guide.intro} takeaways={guide.takeaways} />
      <Sections sections={guide.sections} />
      <Faqs faqs={guide.faqs} />
      <Cta cta={guide.cta} />
      <RelatedGrid items={related} title="Related guides and diagrams" />
    </div>
  )
}
