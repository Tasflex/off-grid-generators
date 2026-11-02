import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import AnalyticsTracker from '../components/AnalyticsTracker'
import { headers } from 'next/headers'
import { getPageSeo, SITE_URL, SITE_NAME } from '../lib/seo'

const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  title: 'TheLoadCalc - Solar Generator Sizing & Calculator',
  description: 'Calculate your exact solar and battery needs. Get personalized recommendations for off-grid power systems.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo.png', type: 'image/png' }
    ]
  },
  verification: {
    other: {
      'p:domain_verify': '3468fd036b13bb553ff6de998467feb1'
    }
  }
}

// Pages are client components and can't export metadata, so it's set here from lib/seo.js.
// The path comes from middleware.js.
export async function generateMetadata() {
  const pathname = headers().get('x-pathname') || '/'
  const page = getPageSeo(pathname)

  if (!page) {
    return {
      ...baseMetadata,
      robots: pathname.startsWith('/admin') ? { index: false, follow: false } : undefined
    }
  }

  return {
    ...baseMetadata,
    // The title template only applies to child segments, so the suffix is added here
    title: { absolute: page.absoluteTitle ? `${SITE_NAME} - ${page.title}` : `${page.title} | ${SITE_NAME}` },
    description: page.description,
    alternates: { canonical: page.canonical },
    robots: page.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [page.image]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [page.image]
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q3RR3WQL0R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q3RR3WQL0R', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
        
        {/* Analytics Tracker - Client Component */}
        <AnalyticsTracker />
        
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 