'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname) {
      const trackPageView = async () => {
        try {
          // Generate or get visitor ID
          let visitorId = localStorage.getItem('visitor_id')
          if (!visitorId) {
            visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
            localStorage.setItem('visitor_id', visitorId)
          }

          // Track via API
          await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'pageview',
              path: pathname,
              title: document.title || 'TheLoadCalc',
              referrer: document.referrer || '',
              user_agent: navigator.userAgent,
              visitor_id: visitorId,
              screen_resolution: `${window.screen.width}x${window.screen.height}`,
              timestamp: new Date().toISOString()
            })
          })

          // Also track in GA4
          if (window.gtag) {
            window.gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: pathname
            })
          }
        } catch (error) {
          console.error('Analytics error:', error)
        }
      }

      const timer = setTimeout(trackPageView, 100)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}