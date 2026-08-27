'use client'

import { useState } from 'react'
import { Mail, CheckCircle, X, Loader2 } from 'lucide-react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [showPopup, setShowPopup] = useState(false)
  const [showButton, setShowButton] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      // In production, this would send to your email service provider
      // Example: ConvertKit, Mailchimp, or Supabase
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          setShowPopup(false)
          setShowButton(true)
          setStatus('idle')
          setEmail('')
        }, 3000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const handlePopupOpen = () => {
    setShowPopup(true)
    setShowButton(false)
  }

  if (!showPopup) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={() => {
            setShowPopup(false)
            setShowButton(true)
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success State */}
        {status === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600">
              Check your inbox for your custom off-grid plan and exclusive deals.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Your Free Off-Grid Guide
              </h2>
              <p className="text-gray-600 text-sm">
                Join 10,000+ subscribers getting expert tips, product reviews, and exclusive deals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              
              {status === 'error' && (
                <p className="text-red-600 text-sm">Please enter a valid email address.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  'Get My Free Guide'
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  )
}