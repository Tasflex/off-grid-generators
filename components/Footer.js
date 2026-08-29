import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-white font-semibold mb-3">TheLoadCalc</h4>
            <p className="text-sm">Calculate your perfect solar power system. Expert reviews, calculators, and guides.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
             
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products/solar-generators" className="hover:text-white">Solar Generators</Link></li>
              <li><Link href="/products/portable-power-stations" className="hover:text-white">Power Stations</Link></li>
              <li><Link href="/products/battery-backups" className="hover:text-white">Battery Systems</Link></li>
              <li><Link href="/products/solar-panels" className="hover:text-white">Solar Panels</Link></li>
              <li><Link href="/products/accessories" className="hover:text-white">Accessories</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/solar-sizing" className="hover:text-white">Sizing Calculator</Link></li>
              <li><Link href="/calculators/battery-runtime" className="hover:text-white">Runtime Calculator</Link></li>
              <li><Link href="/guides" className="hover:text-white">Buying Guides</Link></li>
              <li><Link href="/wiring-diagrams" className="hover:text-white">Wiring Diagrams</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/about/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link></li>
              <li><Link href="/about/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/about/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/about/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm">&copy; 2026 TheLoadCalc. All rights reserved.</p>
          <p className="text-xs mt-2">As an affiliate partner, we may earn commissions from qualifying purchases.</p>
        </div>
      </div>
    </footer>
  )
}