export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',        // All bots including Google
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://theloadcalc.com/sitemap.xml',
  }
}