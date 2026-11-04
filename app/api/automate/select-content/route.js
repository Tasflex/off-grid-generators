import { NextResponse } from 'next/server'
import { isAdmin } from '../../../../lib/adminAuth'
import { contentLibrary, pickContent, postCounts } from '../../../../lib/contentLibrary'
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
    // Get already posted content
    const { data: postedContent, error } = await supabase
      .from('posted_content')
      .select('content_title')
    
    if (error) throw error
    
    const postedTitles = (postedContent || []).map(p => p.content_title)
    
    // Never-posted items first, then the least-posted
    const [selectedContent] = pickContent(postedTitles, 1)
    const remaining = Object.values(postCounts(postedTitles)).filter(n => n === 0).length
    
    return NextResponse.json({
      success: true,
      content: selectedContent,
      remaining,
      total: contentLibrary.length
    })
  } catch (error) {
    console.error('Error selecting content:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}