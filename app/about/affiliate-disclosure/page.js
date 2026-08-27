'use client'

import Link from 'next/link'
import { Info, Shield, AlertTriangle, Heart, FileText } from 'lucide-react'

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Affiliate Disclosure</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Affiliate Disclosure</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>Last updated: January 2026</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Info className="h-5 w-5 text-blue-600 mr-2" />
            Introduction
          </h2>
          <p className="text-gray-600 mb-4">
            OffGrid Power is a participant in various affiliate advertising programs. This means 
            that some links on our website are affiliate links. If you click on these links and make 
            a purchase, we may earn a commission at no additional cost to you.
          </p>
          <p className="text-gray-600">
            We want to be completely transparent about our affiliate relationships. This disclosure 
            explains how we make money and ensures you can make informed decisions when using our site.
          </p>
        </div>

        {/* How We Make Money */}
        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            How We Make Money
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Affiliate Commissions</h3>
              <p className="text-sm text-gray-600">
                When you purchase a product through our affiliate links, we receive a small commission 
                from the retailer. This commission is typically 5-10% of the product price and is paid 
                by the retailer, not you.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sponsored Content</h3>
              <p className="text-sm text-gray-600">
                Occasionally, we may publish sponsored content. In these cases, we will clearly 
                label the content as "Sponsored" and maintain editorial independence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Display Advertising</h3>
              <p className="text-sm text-gray-600">
                We may display contextual advertisements that generate revenue. These are clearly 
                marked and separate from our editorial content.
              </p>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            Our Commitment
          </h2>
          <p className="text-gray-600 mb-4">
            Our affiliate relationships never influence our reviews or recommendations. Here's our commitment:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>We only recommend products we genuinely believe provide value</li>
            <li>Our reviews are based on real testing and research</li>
            <li>We prioritize accuracy and honesty over commissions</li>
            <li>We clearly disclose all affiliate relationships</li>
            <li>We maintain editorial independence from our partners</li>
          </ul>
        </div>

        {/* Amazon Disclosure */}
        <div className="ebay-card p-6 bg-yellow-50 border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            Amazon Associates Disclosure
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            OffGrid Power is a participant in the Amazon Services LLC Associates Program, an affiliate 
            advertising program designed to provide a means for sites to earn advertising fees by 
            advertising and linking to Amazon.com.
          </p>
          <p className="text-sm text-gray-600">
            As an Amazon Associate, we earn from qualifying purchases. This does not affect the price 
            you pay for products on Amazon.
          </p>
        </div>

        {/* Questions */}
        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our affiliate relationships or how we make money, 
            please don't hesitate to contact us.
          </p>
          <Link href="/about/contact" className="ebay-btn-primary inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}