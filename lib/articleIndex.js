// lib/articleIndex.js
// Card data for every data-driven blog post, guide and wiring diagram, keyed by path.
// Client-safe (metadata only), so 'use client' pages can link to these articles.
import { blogPosts } from './blog/posts'
import { guides } from './guides/guides'
import { diagrams } from './wiring/diagrams'

const byPath = Object.fromEntries([...blogPosts, ...guides, ...diagrams].map(a => [a.path, a]))

// Accepts a site path or a bare blog slug
export function getArticleCard(ref) {
  const path = ref.startsWith('/') ? ref : `/blog/${ref}`
  const a = byPath[path]
  return a ? { path, title: a.title, excerpt: a.excerpt, image: a.image, category: a.category } : null
}
