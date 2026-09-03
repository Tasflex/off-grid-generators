import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'
import { generateContent, summarizeForSocial, publishToZernio } from '../../../../lib/contentGenerator'
import { generateBlogPostImage, generateProductImage } from '../../../../lib/imageGenerator'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Helper to check authentication using cookies
function checkAuth() {
  const cookieStore = cookies()
  const adminCookie = cookieStore.get('admin_authenticated')
  return adminCookie && adminCookie.value === 'true'
}

export async function POST(request) {
  // Check authentication using cookies
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { 
      type = 'blog',
      content,
      title,
      platforms,
      includeImage = true,
      scheduledFor = null
    } = await request.json()

    if (!content || !title) {
      return NextResponse.json({ error: 'Content and title are required' }, { status: 400 })
    }

    // Step 1: Fetch active social accounts from database
    const accountsResponse = await axios.get(
      `${SUPABASE_URL}/rest/v1/social_accounts?is_active=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    )
    
    const activeAccounts = accountsResponse.data
    const availablePlatforms = activeAccounts.map(a => a.platform)
    
    // Determine which platforms to post to
    const targetPlatforms = platforms || availablePlatforms
    
    // Step 2: Summarize content for each platform
    const summaries = {}
    for (const platform of targetPlatforms) {
      summaries[platform] = await summarizeForSocial({ content, title }, platform)
    }

    // Step 3: Generate images (if requested)
    let images = []
    if (includeImage) {
      const image = await generateBlogPostImage(title)
      if (image) images.push(image)
    }

    // Step 4: Publish via Zernio using stored credentials
    const publishResults = {}
    for (const platform of targetPlatforms) {
      // Find the account for this platform
      const account = activeAccounts.find(a => a.platform === platform)
      
      if (!account) {
        publishResults[platform] = { error: `No active account for ${platform}` }
        continue
      }
      
      // For Pinterest, include board_id
      const zernioData = {
        text: summaries[platform],
        images: images,
        platforms: [platform]
      }
      
      // Add Pinterest board ID if applicable
      if (platform === 'pinterest' && account.board_id) {
        zernioData.board_id = account.board_id
      }
      
      // Add copy_id for Zernio
      zernioData.copy_id = account.copy_id
      
      const result = await publishToZernio(zernioData)
      publishResults[platform] = result
    }

    // Step 5: Track in posted_content database
    await axios.post(
      `${SUPABASE_URL}/rest/v1/posted_content`,
      {
        content_title: title,
        content_summary: JSON.stringify(summaries),
        image_url: images[0] || null,
        platforms: targetPlatforms,
        status: 'published'
      },
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    )

    return NextResponse.json({
      success: true,
      summaries,
      images,
      publishResults
    })
  } catch (error) {
    console.error('Automation error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}