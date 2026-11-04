// lib/blog/index.js
// Server-side registry: post metadata + article bodies. app/blog/[slug] reads from here.
import { blogPosts } from './posts'
import { homeBackupContent } from './content/home-backup'
import { basicsContent } from './content/basics'
import { mobileContent } from './content/mobile'

const content = { ...homeBackupContent, ...basicsContent, ...mobileContent }

export const fullBlogPosts = blogPosts.map(post => {
  if (!content[post.slug]) throw new Error(`Missing article content for blog post "${post.slug}"`)
  return { ...post, ...content[post.slug] }
})

export const getBlogPost = slug => fullBlogPosts.find(p => p.slug === slug)

export { blogPosts }
