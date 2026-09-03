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
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { data, error } = await supabase
      .from('automation_settings')
      .select('*')
      .limit(1)
    
    if (error) throw error
    
    return NextResponse.json({ settings: data[0] || null })
  } catch (error) {
    console.error('Error fetching settings:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { posts_per_day, default_platforms, include_images, delay_minutes } = await request.json()
    
    const { data: existing } = await supabase
      .from('automation_settings')
      .select('id')
      .limit(1)
    
    let result
    
    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from('automation_settings')
        .update({ 
          posts_per_day, 
          default_platforms, 
          include_images,
          delay_minutes: delay_minutes || 10
        })
        .eq('id', existing[0].id)
        .select()
      
      if (error) throw error
      result = data[0]
    } else {
      const { data, error } = await supabase
        .from('automation_settings')
        .insert([{ 
          posts_per_day, 
          default_platforms, 
          include_images,
          delay_minutes: delay_minutes || 10
        }])
        .select()
      
      if (error) throw error
      result = data[0]
    }
    
    return NextResponse.json({ settings: result })
  } catch (error) {
    console.error('Error saving settings:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}