import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { fullBlogPosts, getBlogPost } from '../../../lib/blog'
import { resolveRelated } from '../../../lib/articles'
import { SITE_URL } from '../../../lib/seo'
import { Takeaways, Sections, Faqs, Cta, RelatedGrid, ImageCredit } from '../../../components/article/Article'

// Hand-built posts keep their own folders; this route serves the data-driven posts in lib/blog.
// The root layout renders dynamically, so unknown slugs still reach the page and need notFound().
export function generateStaticParams() {
  return fullBlogPosts.map(p => ({ slug: p.slug }))
}

const formatDate = iso => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const url = `${SITE_URL}${post.path}`
  const related = post.related.map(resolveRelated).filter(Boolean)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: `${SITE_URL}${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'TheLoadCalc', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'TheLoadCalc', url: SITE_URL },
      mainEntityOfPage: url
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url }
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{post.title}</span>
      </nav>

      <header className="mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{post.category}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">{post.title}</h1>
        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{post.author}</span>
          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{formatDate(post.date)}</span>
          <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{post.readTime}</span>
        </div>
      </header>

      <figure className="mb-8">
        <img src={post.image} alt={post.title} width={1200} height={675} className="w-full h-auto rounded-lg" />
        <ImageCredit credit={post.imageCredit} />
      </figure>

      <Takeaways intro={post.intro} takeaways={post.takeaways} />
      <Sections sections={post.sections} />
      <Faqs faqs={post.faqs} />
      <Cta cta={post.cta} />
      <RelatedGrid items={related} />
    </div>
  )
}
