import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Check, Info, AlertTriangle, ArrowRight, ChevronRight } from 'lucide-react'
import { fullBlogPosts, getBlogPost } from '../../../lib/blog'
import { getBlogPostMeta } from '../../../lib/blog/posts'
import { getPageSeo, SITE_URL } from '../../../lib/seo'

// Hand-built posts keep their own folders; this route serves the data-driven posts in lib/blog.
// The root layout renders dynamically, so unknown slugs still reach the page and need notFound().
export function generateStaticParams() {
  return fullBlogPosts.map(p => ({ slug: p.slug }))
}

// Renders [text](/path) links and **bold** inside a paragraph string
function Inline({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <Link key={i} href={link[2]} className="text-blue-600 hover:underline font-medium">{link[1]}</Link>
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) return <strong key={i} className="text-gray-900">{bold[1]}</strong>
    return part
  })
}

function Block({ block }) {
  if (typeof block === 'string') {
    return <p className="text-gray-700 leading-relaxed mb-4"><Inline text={block} /></p>
  }
  if (block.ul) {
    return (
      <ul className="space-y-2 mb-4">
        {block.ul.map((item, i) => (
          <li key={i} className="flex items-start text-gray-700">
            <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span><Inline text={item} /></span>
          </li>
        ))}
      </ul>
    )
  }
  if (block.ol) {
    return (
      <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
        {block.ol.map((item, i) => <li key={i}><Inline text={item} /></li>)}
      </ol>
    )
  }
  if (block.table) {
    return (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {block.table.head.map((h, i) => <th key={i} className="px-4 py-3 text-left font-semibold text-gray-900">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, i) => (
              <tr key={i} className="border-t">
                {row.map((cell, j) => <td key={j} className="px-4 py-3 text-gray-700"><Inline text={cell} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (block.tip) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4 flex items-start">
        <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-900"><Inline text={block.tip} /></p>
      </div>
    )
  }
  if (block.warn) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-900"><Inline text={block.warn} /></p>
      </div>
    )
  }
  return null
}

// Related entries are blog slugs or full site paths
function resolveRelated(ref) {
  const post = getBlogPostMeta(ref)
  if (post) return { path: post.path, title: post.title, excerpt: post.excerpt, image: post.image, category: post.category }
  const page = getPageSeo(ref)
  return page ? { path: ref, title: page.title, excerpt: page.description } : null
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
        <figcaption className="text-xs text-gray-500 mt-2">
          Photo: <a href={post.imageCredit.source} rel="nofollow noopener" target="_blank" className="hover:underline">{post.imageCredit.author}</a>
          {' / '}
          <a href={post.imageCredit.licenseUrl} rel="nofollow noopener" target="_blank" className="hover:underline">{post.imageCredit.license}</a>
          {post.imageCredit.license !== 'CC0' && ', cropped'}
        </figcaption>
      </figure>

      <div className="ebay-card p-6 mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">{post.intro}</p>
        <div className="bg-gray-50 rounded p-4">
          <h2 className="font-semibold text-gray-900 mb-2">Key takeaways</h2>
          <ul className="space-y-2">
            {post.takeaways.map((t, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {post.sections.map((section, i) => (
        <section key={i} className="ebay-card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{section.h}</h2>
          {section.blocks.map((block, j) => <Block key={j} block={block} />)}
        </section>
      ))}

      <section className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {post.faqs.map((f, i) => (
            <div key={i} className="bg-gray-50 rounded p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{f.q}</h3>
              <p className="text-sm text-gray-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {post.cta && (
        <div className="ebay-card p-8 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.cta.title}</h2>
          <p className="text-gray-600 mb-4">{post.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {post.cta.links.map((l, i) => (
              <Link key={l.href} href={l.href} className={i === 0 ? 'ebay-btn-primary' : 'ebay-btn-secondary'}>{l.label}</Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Keep reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(r => (
              <Link key={r.path} href={r.path} className="ebay-card overflow-hidden hover:shadow-md transition flex flex-col">
                {r.image && <img src={r.image} alt="" loading="lazy" className="w-full h-36 object-cover" />}
                <div className="p-4 flex-1">
                  {r.category && <span className="text-xs font-semibold text-blue-600">{r.category}</span>}
                  <h3 className="font-semibold text-gray-900 mt-1 mb-1">{r.title}</h3>
                  {r.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{r.excerpt}</p>}
                  <span className="inline-flex items-center text-sm text-blue-600 mt-2">Read more <ArrowRight className="h-4 w-4 ml-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
