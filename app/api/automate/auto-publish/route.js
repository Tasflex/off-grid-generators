import { NextResponse } from 'next/server'
import { isAdmin, isCronRequest } from '../../../../lib/adminAuth'
import { pickContent, featuredImageUrl } from '../../../../lib/contentLibrary'
import { createClient } from '@supabase/supabase-js'
import { generatePlatformCaptions, publishToZernio, generateVisualPrompt } from '../../../../lib/contentGenerator'
import { generatePlatformSpecificImage } from '../../../../lib/imageGenerator'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Base URL for building destination links
const SITE_BASE_URL = 'https://theloadcalc.com'


export async function POST(request) {
  // Check authentication
  // Admin session, or the cron job (/root/auto-publish.sh) sending x-cron-secret
  if (!isCronRequest(request) && !(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const { data: settings } = await supabase
      .from('automation_settings')
      .select('*')
      .limit(1)
    
    const automationSettings = settings?.[0] || {
      posts_per_day: 1,
      default_platforms: ['instagram'],
      include_images: true,
      delay_minutes: 10
    }
    
    const { data: accounts } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('is_active', true)
    
    if (!accounts || accounts.length === 0) {
      return NextResponse.json({ error: 'No active social accounts found' }, { status: 400 })
    }
    
    const connectedPlatforms = accounts.map(a => a.platform)
    
    const { data: postedContent } = await supabase
      .from('posted_content')
      .select('content_title')
    
    const postedTitles = (postedContent || []).map(p => p.content_title)
    
    // Never-posted items first, then the least-posted
    const selectedContent = pickContent(postedTitles, automationSettings.posts_per_day || 1)
    
    const results = []
    for (let i = 0; i < selectedContent.length; i++) {
      const content = selectedContent[i]
      
      const captions = await generatePlatformCaptions(content.title, content.summary)
      
      let visualPrompt = null;
      if (automationSettings.include_images) {
        visualPrompt = await generateVisualPrompt(content.title, content.summary) || content.title;
      }
      
      let platformContentMap = captions || {}
      if (!captions) {
        connectedPlatforms.forEach(p => platformContentMap[p] = content.summary)
      }
      
      const publishResults = {}
      const generatedImagesCache = {} 
      
      for (const platform of connectedPlatforms) {
        const account = accounts.find(a => a.platform === platform)
        if (!account) continue
        
        let images = []
        
        if (automationSettings.include_images && visualPrompt) {
          let shapeCategory = 'landscape'
          if (platform === 'pinterest') shapeCategory = 'pin'
          else if (platform === 'instagram' || platform === 'threads') shapeCategory = 'portrait'
          
          if (!generatedImagesCache[shapeCategory]) {
            generatedImagesCache[shapeCategory] = await generatePlatformSpecificImage(visualPrompt, platform)
          }
          
          if (generatedImagesCache[shapeCategory]) {
            images.push(generatedImagesCache[shapeCategory])
          }
        }
        
        // Fall back to the page's featured image if generation failed (Instagram rejects posts without media)
        if (automationSettings.include_images && images.length === 0) {
          const fallbackImage = featuredImageUrl(content, SITE_BASE_URL)
          if (fallbackImage) images.push(fallbackImage)
        }
        
        // Build the full destination URL from the content slug
        const destinationLink = `${SITE_BASE_URL}${content.slug}`
        
        const result = await publishToZernio({
          content: platformContentMap[platform] || content.summary,
          images: images,
          platforms: [platform],
          copyId: account.copy_id,
          boardId: account.board_id,
          scheduledFor: null,
          destinationLink: destinationLink, // <-- Pass the link for Pinterest
          platformSpecificContent: {
            [platform]: platformContentMap[platform] || content.summary
          }
        })
        publishResults[platform] = result
      }
      
      // Store image URLs in database
      const imageStorage = {}
      if (generatedImagesCache['landscape']) imageStorage.landscape = generatedImagesCache['landscape']
      if (generatedImagesCache['pin']) imageStorage.pin = generatedImagesCache['pin']
      if (generatedImagesCache['portrait']) imageStorage.portrait = generatedImagesCache['portrait']
      
      await supabase.from('posted_content').insert({
        content_title: content.title,
        content_summary: JSON.stringify(platformContentMap),
        image_url: Object.values(generatedImagesCache)[0] || null,
        image_storage: imageStorage,
        platforms: connectedPlatforms,
        status: 'published'
      })
      
      results.push({ 
        content, 
        platformContent: platformContentMap, 
        imageStorage,
        publishResults 
      })
      
      // Add delay between posts (if more than 1 post)
      if (i < selectedContent.length - 1 && automationSettings.delay_minutes > 0) {
        const delayMs = automationSettings.delay_minutes * 60 * 1000
        console.log(`Waiting ${automationSettings.delay_minutes} minutes between posts...`)
        await new Promise(resolve => setTimeout(resolve, delayMs))
      }
    }
    
    return NextResponse.json({
      success: true,
      posts: results.length,
      delay_minutes: automationSettings.delay_minutes,
      platforms_used: connectedPlatforms,
      results
    })
  } catch (error) {
    console.error('Auto-publish error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}