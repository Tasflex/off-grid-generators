// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Protect all admin routes EXCEPT the login page
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check if authenticated via cookie
    const adminCookie = request.cookies.get('admin_authenticated')
    
    if (!adminCookie || adminCookie.value !== 'true') {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  // If on login page and already authenticated, redirect to automation
  if (pathname === '/admin/login') {
    const adminCookie = request.cookies.get('admin_authenticated')
    
    if (adminCookie && adminCookie.value === 'true') {
      return NextResponse.redirect(new URL('/admin/automation', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}