import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://theloadcalc.com'),
  title: {
    default: 'TheLoadCalc - Solar Generator Sizing & Calculator',
    template: '%s | TheLoadCalc'
  },
  description: 'Calculate your exact solar and battery needs. Get personalized recommendations for off-grid power systems.',
  openGraph: {
    title: 'TheLoadCalc - Solar Generator Sizing & Calculator',
    description: 'Use our interactive calculator to find the perfect solar generator for your needs.',
    url: 'https://theloadcalc.com',
    siteName: 'TheLoadCalc',
    type: 'website'
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo.png', type: 'image/png' }
    ]
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
            gtag('config', 'G-Q3RR3WQL0R');
          `}
        </Script>


 <Script
  src="https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=148880a3354dc12096dbd27c86af507790fd8d27"
  strategy="afterInteractive"
/>
        
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