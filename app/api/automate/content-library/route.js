import { NextResponse } from 'next/server'
import { isAdmin } from '../../../../lib/adminAuth'
import { contentLibrary } from '../../../../lib/contentLibrary'


// GET endpoint with authentication
export async function GET(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({
    success: true,
    content: contentLibrary
  })
}

// POST endpoint with authentication
export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const body = await request.json()
    // Add your POST logic here
    
    return NextResponse.json({
      success: true,
      message: 'Content created successfully'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create content',
      details: error.message 
    }, { status: 500 })
  }
}