'use client'

import Link from 'next/link'
import { Shield, Database, Cookie, Mail, Lock, User } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>Last updated: January 2026</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            Our Privacy Commitment
          </h2>
          <p className="text-gray-600 mb-4">
            At OffGrid Power, we take your privacy seriously. This policy explains what information 
            we collect, how we use it, and the choices you have. We follow strict data protection 
            principles and comply with GDPR and CCPA regulations.
          </p>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Database className="h-5 w-5 text-blue-600 mr-2" />
            Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Email address (when you subscribe to our newsletter)</li>
                <li>Name (if you provide it in forms)</li>
                <li>Any information you include in contact messages</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on site</li>
                <li>Device type and operating system</li>
                <li>Referral sources</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Cookie className="h-5 w-5 text-blue-600 mr-2" />
            Cookies and Tracking
          </h2>
          <p className="text-gray-600 mb-4">
            We use cookies to improve your experience and analyze site traffic. Cookies are small 
            text files stored on your device. We use:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Essential cookies:</strong> Required for site functionality</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Affiliate tracking cookies:</strong> Track purchases through our affiliate links</li>
            <li><strong>Preference cookies:</strong> Remember your settings</li>
          </ul>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-4">
            <p className="text-sm text-gray-600">
              You can control cookies through your browser settings. Disabling cookies may affect 
              your experience on our site.
            </p>
          </div>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Mail className="h-5 w-5 text-blue-600 mr-2" />
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>To send you our newsletter and marketing emails (with consent)</li>
            <li>To respond to your inquiries and provide support</li>
            <li>To improve our content and website experience</li>
            <li>To analyze site traffic and user behavior</li>
            <li>To comply with legal obligations</li>
            <li>To track affiliate conversions</li>
          </ul>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Lock className="h-5 w-5 text-blue-600 mr-2" />
            Data Security
          </h2>
          <p className="text-gray-600">
            We implement industry-standard security measures to protect your information. Your data 
            is stored on secure servers with encrypted connections. We never sell or share your 
            personal information with third parties for marketing purposes.
          </p>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            Your Rights
          </h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data in a portable format</li>
            <li>File a complaint with a supervisory authority</li>
          </ul>
        </div>

        <div className="ebay-card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have questions about this privacy policy, contact us at:
          </p>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> privacy@offgridpower.com<br />
              <strong>Address:</strong> 123 Solar Street, Austin, TX 78701
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}