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

// GET - List all connected social accounts
export async function GET(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json({ accounts: data || [] })
  } catch (error) {
    console.error('Error fetching accounts:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - Add/Update a social account
export async function POST(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { platform, display_name, copy_id, board_id, is_active } = await request.json()
    
    const { data, error } = await supabase
      .from('social_accounts')
      .insert([{ platform, display_name, copy_id, board_id: board_id || null, is_active: is_active !== undefined ? is_active : true }])
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ account: data[0] })
  } catch (error) {
    console.error('Error adding account:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT - Update a social account
export async function PUT(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { id, platform, display_name, copy_id, board_id, is_active } = await request.json()
    
    const { data, error } = await supabase
      .from('social_accounts')
      .update({ platform, display_name, copy_id, board_id, is_active })
      .eq('id', id)
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ account: data[0] })
  } catch (error) {
    console.error('Error updating account:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Remove a social account
export async function DELETE(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const { error } = await supabase
      .from('social_accounts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting account:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}