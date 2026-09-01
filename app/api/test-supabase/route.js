import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      error: 'Missing environment variables',
      url: supabaseUrl ? 'Set' : 'Missing',
      key: supabaseKey ? 'Set' : 'Missing'
    }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test the connection
    const { data, error } = await supabase
      .from('analytics_pageviews')
      .select('count', { count: 'exact' })
      .limit(1)

    if (error) {
      return NextResponse.json({
        error: error.message,
        code: error.code,
        url: supabaseUrl
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      url: supabaseUrl
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      url: supabaseUrl
    }, { status: 500 })
  }
}