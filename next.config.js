/** @type {import('next').NextConfig} */
const nextConfig = {
  // 301s for pages that moved, so old links and Google's index land on the new URL
  async redirects() {
    return [
      { source: '/about/contact', destination: '/contact', permanent: true },
      { source: '/about/privacy-policy', destination: '/privacy-policy', permanent: true },
      { source: '/about/affiliate-disclosure', destination: '/affiliate-disclosure', permanent: true },
      { source: '/calculators/battery-runtime/off-grid-budget', destination: '/calculators/off-grid-budget', permanent: true },
      { source: '/comparisons/Solar%20vs%20Gas%20Generator', destination: '/comparisons/solar-vs-gas-generator', permanent: true }
    ]
  }
}

module.exports = nextConfig
