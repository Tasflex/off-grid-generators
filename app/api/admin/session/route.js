import { NextResponse } from 'next/server'
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, checkPassword } from '../../../../lib/adminAuth'

// POST - log in
export async function POST(request) {
  const { password } = await request.json().catch(() => ({}))

  if (!(await checkPassword(password))) {
    // Slow down password guessing
    await new Promise(resolve => setTimeout(resolve, 1000))
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE
  })
  return response
}

// DELETE - log out
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
