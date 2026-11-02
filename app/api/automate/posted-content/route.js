import { NextResponse } from 'next/server'
import { isAdmin } from '../../../../lib/adminAuth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  // Check authentication
  if (!(await isAdmin())) {
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