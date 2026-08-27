'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setStatus('loading')

    try {
      // In production, this would send to your backend/email service
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setStatus('success')
        toast.success('Message sent successfully!')
      } else {
        setStatus('error')
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      toast.error('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Contact</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600">
          Have a question, feedback, or need help? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="ebay-card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">support@offgridpower.com</div>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Phone</div>
                  <div className="text-sm text-gray-600">1-800-555-0123</div>
                  <div className="text-xs text-gray-500">Mon-Fri, 9am-5pm EST</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Address</div>
                  <div className="text-sm text-gray-600">
                    123 Solar Street<br />
                    Austin, TX 78701
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ebay-card p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Response Time</h2>
            <p className="text-sm text-gray-600">
              We typically respond within 24-48 hours. For urgent inquiries, 
              please call us during business hours.
            </p>
          </div>

          <div className="ebay-card p-6 bg-blue-50">
            <h2 className="font-semibold text-gray-900 mb-3">Quick Help</h2>
            <p className="text-sm text-gray-600 mb-4">
              Looking for answers? Check out our FAQ section first.
            </p>
            <Link href="/guides" className="text-blue-600 hover:underline text-sm font-medium">
              Browse Our Guides →
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-span-2">
          <div className="ebay-card p-6">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="ebay-btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="ebay-input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="ebay-input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="ebay-input"
                  >
                    <option value="">Select a subject...</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Support</option>
                    <option value="guide">Guide Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="ebay-input h-32 resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="mb-4 flex items-center text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Failed to send message. Please try again.
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    We respect your privacy. Your information will never be shared.
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="ebay-btn-primary flex items-center"
                  >
                    {status === 'loading' ? (
                      <span className="animate-spin">...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}