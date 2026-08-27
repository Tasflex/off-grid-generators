import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: {
    default: 'OffGrid Power - Solar Generator & Battery Sizing',
    template: '%s | OffGrid Power'
  },
  description: 'Calculate your exact solar and battery needs. Get personalized recommendations for off-grid power systems, portable generators, and emergency backup solutions.',
  keywords: ['solar generator', 'off-grid power', 'battery backup', 'portable power station', 'solar calculator'],
  openGraph: {
    title: 'OffGrid Power - Solar Generator Sizing & Recommendations',
    description: 'Use our interactive calculator to find the perfect solar generator for your needs. Compare top brands like EcoFlow, Bluetti, and Jackery.',
    type: 'website',
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
