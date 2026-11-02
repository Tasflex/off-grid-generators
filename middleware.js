// middleware.js
import { NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from './lib/adminAuth'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const isLoggedIn = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

    // Protect all admin routes EXCEPT the login page
    if (!isLoggedIn && !pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // If on login page and already authenticated, redirect to automation
    if (isLoggedIn && pathname === '/admin/login') {
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
