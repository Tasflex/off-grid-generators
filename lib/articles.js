// lib/articles.js
// Resolves "related" references (site paths, or bare blog slugs) to card data: data-driven
// articles via lib/articleIndex.js, hand-built pages via lib/seo.js. Server-side only.
import { getArticleCard } from './articleIndex'
import { getPageSeo } from './seo'

export function resolveRelated(ref) {
  const card = getArticleCard(ref)
  if (card) return card
  const path = ref.startsWith('/') ? ref : `/blog/${ref}`
  const page = getPageSeo(path)
  return page ? { path, title: page.title, excerpt: page.description } : null
}
