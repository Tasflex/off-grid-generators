'use client'

import Link from 'next/link'
import { FileText, Shield, AlertTriangle, Info, Check, X, ExternalLink } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Terms of Service</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Terms of Service</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>Last updated: August 2026</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 mb-4">
          By accessing and using TheLoadCalc (the "Website"), you accept and agree to be bound by these 
          Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Website.
        </p>
        <p className="text-gray-600">
          These Terms apply to all visitors, users, and others who access the Website. By using the Website, 
          you agree to comply with these Terms and all applicable laws and regulations.
        </p>
      </div>

      {/* Use of Website */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Check className="h-5 w-5 text-green-600 mr-2" />
          2. Use of the Website
        </h2>
        <p className="text-gray-600 mb-4">
          The Website provides information, calculators, product reviews, and affiliate links related to 
          solar generators, portable power stations, and off-grid energy systems. You agree to use the 
          Website for lawful purposes only.
        </p>
        
        <h3 className="font-semibold text-gray-900 mb-2">You agree NOT to:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Use the Website in any way that violates applicable laws</li>
          <li>Attempt to gain unauthorized access to the Website or its systems</li>
          <li>Interfere with the normal operation of the Website</li>
          <li>Scrape, crawl, or harvest data from the Website without permission</li>
          <li>Use the Website to distribute malware or harmful content</li>
          <li>Impersonate any person or entity</li>
        </ul>
      </div>

      {/* Affiliate Disclosure */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-yellow-600 mr-2" />
          3. Affiliate Disclosure
        </h2>
        <p className="text-gray-600 mb-4">
          TheLoadCalc participates in various affiliate advertising programs. This means that some links on 
          our Website are affiliate links. If you click on these links and make a purchase, we may earn a 
          commission at no additional cost to you.
        </p>
        <p className="text-gray-600 mb-4">
          Our affiliate relationships do not influence our reviews or recommendations. We only recommend 
          products we genuinely believe provide value to our users.
        </p>
        <p className="text-gray-600">
          We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program 
          designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
      </div>

      {/* Product Information */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          4. Product Information
        </h2>
        <p className="text-gray-600 mb-4">
          We strive to provide accurate and up-to-date information about products, including specifications, 
          prices, and availability. However, we cannot guarantee that all information is error-free or current.
        </p>
        <p className="text-gray-600">
          Product prices and availability are subject to change without notice. We are not responsible for 
          any discrepancies between information on our Website and actual product listings on third-party sites.
        </p>
      </div>

      {/* Calculators and Tools */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-green-600 mr-2" />
          5. Calculators and Tools
        </h2>
        <p className="text-gray-600 mb-4">
          Our calculators and tools are provided for informational and educational purposes only. They are 
          intended to help you estimate your power requirements and make informed decisions.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Important Disclaimer</h3>
              <p className="text-sm text-yellow-700">
                Calculator results are estimates based on typical usage patterns and may not reflect your 
                specific situation. Always consult with a qualified professional before making decisions 
                about electrical systems or purchases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 text-purple-600 mr-2" />
          6. Intellectual Property
        </h2>
        <p className="text-gray-600 mb-4">
          All content on the Website, including but not limited to text, graphics, logos, images, and 
          software, is the property of TheLoadCalc or its content suppliers and is protected by copyright 
          and intellectual property laws.
        </p>
        <p className="text-gray-600">
          You may not reproduce, distribute, modify, or create derivative works from any content on the 
          Website without our prior written consent.
        </p>
      </div>

      {/* User Content */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          7. User Content
        </h2>
        <p className="text-gray-600 mb-4">
          If you submit any content to the Website (such as comments, reviews, or feedback), you grant us 
          a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and 
          distribute that content.
        </p>
        <p className="text-gray-600">
          You represent and warrant that any content you submit is your own and does not violate the rights 
          of any third party.
        </p>
      </div>

      {/* Third-Party Links - FIXED */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <ExternalLink className="h-5 w-5 text-blue-600 mr-2" />
          8. Third-Party Links
        </h2>
        <p className="text-gray-600 mb-4">
          The Website may contain links to third-party websites, including affiliate partner sites. We are 
          not responsible for the content, policies, or practices of third-party websites.
        </p>
        <p className="text-gray-600">
          We encourage you to review the terms and privacy policies of any third-party websites you visit.
        </p>
      </div>

      {/* Disclaimers */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          9. Disclaimers
        </h2>
        <p className="text-gray-600 mb-4">
          THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES, EXPRESS 
          OR IMPLIED, REGARDING THE OPERATION OR AVAILABILITY OF THE WEBSITE.
        </p>
        <p className="text-gray-600 mb-4">
          WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, 
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p className="text-gray-600">
          WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
        </p>
      </div>

      {/* Limitation of Liability */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 text-red-600 mr-2" />
          10. Limitation of Liability
        </h2>
        <p className="text-gray-600 mb-4">
          IN NO EVENT SHALL THELOADCALC BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR 
          PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER 
          INTANGIBLE LOSSES, ARISING FROM YOUR USE OF THE WEBSITE.
        </p>
        <p className="text-gray-600">
          OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING FROM YOUR USE OF THE WEBSITE SHALL NOT EXCEED THE 
          AMOUNT YOU PAID TO ACCESS THE WEBSITE, IF ANY.
        </p>
      </div>

      {/* Changes to Terms */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          11. Changes to These Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page 
          with a revised "Last updated" date.
        </p>
        <p className="text-gray-600">
          Your continued use of the Website after any changes to these Terms constitutes your acceptance 
          of the revised Terms.
        </p>
      </div>

      {/* Governing Law */}
      <div className="ebay-card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 text-blue-600 mr-2" />
          12. Governing Law
        </h2>
        <p className="text-gray-600">
          These Terms shall be governed by and construed in accordance with the laws of the State of Texas, 
          without regard to its conflict of law provisions. Any disputes arising from these Terms or your 
          use of the Website shall be resolved in the courts located in Austin, Texas.
        </p>
      </div>

      {/* Contact */}
      <div className="ebay-card p-6 mb-8 bg-gradient-to-r from-blue-50 to-yellow-50">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          13. Contact Us
        </h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-gray-900">Email:</span>
            <span className="text-gray-600"> legal@theloadcalc.com</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Website:</span>
            <Link href="/about/contact" className="text-blue-600 hover:underline"> Contact Form</Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center pb-8">
        <p className="text-sm text-gray-500">
          © 2026 TheLoadCalc. All rights reserved. | <Link href="/about/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> | <Link href="/about/affiliate-disclosure" className="text-blue-600 hover:underline">Affiliate Disclosure</Link>
        </p>
      </div>
    </div>
  )
}