import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Helper to check authentication using cookies
function checkAuth() {
  const cookieStore = cookies()
  const adminCookie = cookieStore.get('admin_authenticated')
  return adminCookie && adminCookie.value === 'true'
}

export async function GET(request) {
  // Check authentication using cookies
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { data, error } = await supabase
      .from('posted_content')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (error) throw error
    
    return NextResponse.json({ posts: data || [] })
  } catch (error) {
    console.error('Error fetching posted content:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}