import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

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
  }
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Removed duplicate top Toaster */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* Kept single Toaster component here */}
        <Toaster position="top-right" /> 
      </body>
    </html>
  )
}
