// lib/adminAuth.js
// Signed admin session cookie. Uses Web Crypto so it works in both middleware (Edge) and API routes (Node).

export const SESSION_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hours, in seconds

const encoder = new TextEncoder()

async function hmac(value) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set')
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Token is "<expiry ms>.<hmac of expiry>"
export async function createSessionToken() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000)
  return `${expires}.${await hmac(expires)}`
}

export async function verifySessionToken(token) {
  if (!token) return false
  const [expires, signature] = token.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  try {
    return safeEqual(signature, await hmac(expires))
  } catch {
    return false
  }
}

// Compares HMACs rather than raw strings so timing doesn't leak the password
export async function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof password !== 'string') return false
  return safeEqual(await hmac(`pw:${password}`), await hmac(`pw:${expected}`))
}

// For API route handlers
export async function isAdmin() {
  const { cookies } = await import('next/headers')
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value)
}

// For the cron job, which sends the secret in the x-cron-secret header
export function isCronRequest(request) {
  const secret = process.env.CRON_SECRET
  return Boolean(secret) && safeEqual(request.headers.get('x-cron-secret') || '', secret)
}
