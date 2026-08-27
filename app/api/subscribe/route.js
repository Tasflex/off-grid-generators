import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { email, source = 'website', calculatorResults = null } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('leads')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      // Update existing lead
      const { error } = await supabase
        .from('leads')
        .update({
          last_subscribed: new Date().toISOString(),
          source: source,
          calculator_results: calculatorResults
        })
        .eq('email', email)

      if (error) throw error

      return NextResponse.json(
        { message: 'User already subscribed', status: 'existing' },
        { status: 200 }
      )
    }

    // Insert new lead
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          email,
          source,
          calculator_results: calculatorResults,
          subscribed_at: new Date().toISOString()
        }
      ])

    if (error) throw error

    // Here you would trigger your email automation (e.g., ConvertKit API)
    // await triggerEmailSequence(email)

    return NextResponse.json(
      { message: 'Successfully subscribed', status: 'success' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}