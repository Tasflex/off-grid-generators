import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getArticleCard } from '../lib/articleIndex'

// "Related reading" cards for hand-built pages, linking to data-driven blog posts, guides and
// wiring diagrams. `slugs` takes site paths or bare blog slugs.
export default function RelatedPosts({ slugs, title = 'Related reading' }) {
  const posts = slugs.map(getArticleCard).filter(Boolean)
  if (!posts.length) return null

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map(p => (
          <Link key={p.path} href={p.path} className="ebay-card overflow-hidden hover:shadow-md transition flex flex-col">
            <img src={p.image} alt="" loading="lazy" className="w-full h-36 object-cover" />
            <div className="p-4 flex-1">
              <span className="text-xs font-semibold text-blue-600">{p.category}</span>
              <h3 className="font-semibold text-gray-900 mt-1 mb-1">{p.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
              <span className="inline-flex items-center text-sm text-blue-600 mt-2">Read more <ArrowRight className="h-4 w-4 ml-1" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
