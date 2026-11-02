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

  // Pass the path to app/layout.js so generateMetadata can set per-page title and canonical
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  // Everything except API routes, Next.js assets and static files
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)']
}
