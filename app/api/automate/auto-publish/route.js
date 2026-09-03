import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { generatePlatformCaptions, publishToZernio, generateVisualPrompt } from '../../../../lib/contentGenerator'
import { generatePlatformSpecificImage } from '../../../../lib/imageGenerator'

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

// Content library
const contentLibrary = [
  { id: 'blog-best-solar-generators-2026', type: 'blog', title: 'Best Solar Generators 2026: Complete Buying Guide', slug: '/blog/best-solar-generators-2026', summary: 'We tested 15 solar generators to find the best options for every budget and use case.' },
  { id: 'blog-ecoflow-delta-pro-review', type: 'blog', title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?', slug: '/blog/ecoflow-delta-pro-review', summary: 'The Delta Pro is EcoFlows flagship portable power station.' },
  { id: 'blog-how-many-watts-refrigerator', type: 'blog', title: 'How Many Watts Does a Refrigerator Use?', slug: '/blog/how-many-watts-refrigerator', summary: 'Knowing your refrigerators power requirements is crucial.' },
  { id: 'blog-what-size-solar-generator-house', type: 'blog', title: 'What Size Solar Generator Do I Need for My House?', slug: '/blog/what-size-solar-generator-house', summary: 'Choosing the right solar generator for your home is critical for emergency preparedness.' },
  { id: 'blog-cpap-machine-solar-generator', type: 'blog', title: 'Can a Solar Generator Run a CPAP Machine?', slug: '/blog/cpap-machine-solar-generator', summary: 'CPAP users need reliable backup power.' },
  { id: 'blog-van-life-solar-setup-guide', type: 'blog', title: 'Van Life Solar Setup: Complete Guide for Beginners', slug: '/blog/van-life-solar-setup-guide', summary: 'This comprehensive guide covers everything you need to know about installing a solar system in your van.' },
  { id: 'blog-ecoflow-vs-bluetti-comparison', type: 'blog', title: 'EcoFlow Delta Pro vs Bluetti AC200MAX: Which Is Better?', slug: '/blog/ecoflow-vs-bluetti-comparison', summary: 'We compare the two most popular high-capacity portable power stations.' },
  { id: 'blog-how-many-solar-panels-needed', type: 'blog', title: 'How Many Solar Panels Do I Need?', slug: '/blog/how-many-solar-panels-needed', summary: 'Learn how to calculate the exact number of solar panels needed.' },
  { id: 'blog-solar-battery-technology-explained', type: 'blog', title: 'Solar Energy Storage: Battery Technology Explained', slug: '/blog/solar-battery-technology-explained', summary: 'From lithium-ion to LFP, understand battery technologies.' },
  { id: 'blog-solar-vs-traditional-generator', type: 'blog', title: 'Solar Generator vs Traditional Generator', slug: '/blog/solar-vs-traditional-generator', summary: 'Compare solar generators versus gas-powered generators.' },
  { id: 'blog-rv-solar-installation-guide', type: 'blog', title: 'RV Solar Installation: Step-by-Step Guide', slug: '/blog/rv-solar-installation-guide', summary: 'Complete tutorial on installing a solar system in your RV.' },
  { id: 'blog-solar-market-trends-2026', type: 'blog', title: '2026 Solar Market Trends: What to Expect', slug: '/blog/solar-market-trends-2026', summary: 'Prices are dropping and technology is improving.' },
  { id: 'blog-home-battery-backup-guide', type: 'blog', title: 'Home Battery Backup: Complete Guide', slug: '/blog/home-battery-backup-guide', summary: 'Learn about the best options for whole-home backup.' },
  { id: 'blog-camping-solar-essential-guide', type: 'blog', title: 'Camping with Solar: Essential Gear Guide', slug: '/blog/camping-solar-essential-guide', summary: 'Everything you need for a solar-powered camping trip.' },
  { id: 'blog-blackout-emergency-power-plan', type: 'blog', title: 'Blackout Emergency Power Plan', slug: '/blog/blackout-emergency-power-plan', summary: 'Power outages are becoming more frequent.' },
  
  // Guides
  { id: 'guide-how-to-choose', type: 'guide', title: 'How to Choose a Solar Generator', slug: '/guides/how-to-choose', summary: 'Step-by-step guide to choosing the perfect solar generator.' },
  { id: 'guide-how-to-wire-solar-system', type: 'guide', title: 'How to Wire a Solar System', slug: '/guides/how-to-wire-solar-system', summary: 'Complete wiring guide for off-grid solar systems.' },
  { id: 'guide-calculate-battery-runtime', type: 'guide', title: 'Calculate Battery Runtime', slug: '/guides/calculate-battery-runtime', summary: 'Learn how to calculate battery runtime for your devices.' },
  { id: 'guide-emergency-power-setup', type: 'guide', title: 'Emergency Power Setup', slug: '/guides/emergency-power-setup', summary: 'Step-by-step guide to setting up emergency backup power.' },
  { id: 'guide-van-life-solar-sizing', type: 'guide', title: 'Van Life Solar Sizing', slug: '/guides/van-life-solar-sizing', summary: 'How to size a solar system for van life.' },
  { id: 'guide-best-solar-generators-2026', type: 'guide', title: 'Best Solar Generators 2026', slug: '/guides/best-solar-generators-2026', summary: 'Our top picks for solar generators in 2026.' },
  { id: 'guide-best-portable-power-stations', type: 'guide', title: 'Best Portable Power Stations', slug: '/guides/best-portable-power-stations', summary: 'The best portable power stations for camping and travel.' },
  { id: 'guide-best-battery-backup-systems', type: 'guide', title: 'Best Battery Backup Systems', slug: '/guides/best-battery-backup-systems', summary: 'The best battery backup systems for home use.' },
  { id: 'guide-blackout-survival-guide', type: 'guide', title: 'Blackout Survival Guide', slug: '/guides/blackout-survival-guide', summary: 'How to survive a blackout with backup power.' },
  { id: 'guide-complete-off-grid-living-guide', type: 'guide', title: 'Complete Off-Grid Living Guide', slug: '/guides/complete-off-grid-living-guide', summary: 'Everything you need to know about living off-grid.' },
  { id: 'guide-home-backup-systems', type: 'guide', title: 'Home Backup Systems', slug: '/guides/home-backup-systems', summary: 'The best home backup power systems.' },
  { id: 'guide-how-many-solar-panels-do-i-need', type: 'guide', title: 'How Many Solar Panels Do I Need?', slug: '/guides/how-many-solar-panels-do-i-need', summary: 'Calculate how many solar panels you need.' },
  { id: 'guide-how-to-install-solar-panels', type: 'guide', title: 'How to Install Solar Panels', slug: '/guides/how-to-install-solar-panels', summary: 'Step-by-step guide to installing solar panels.' },
  { id: 'guide-medical-device-power', type: 'guide', title: 'Medical Device Power', slug: '/guides/medical-device-power', summary: 'How to power medical devices with solar.' },
  { id: 'guide-rv-power-systems', type: 'guide', title: 'RV Power Systems', slug: '/guides/rv-power-systems', summary: 'Complete guide to RV power systems.' },
  { id: 'guide-whole-home-solar', type: 'guide', title: 'Whole Home Solar', slug: '/guides/whole-home-solar', summary: 'How to power your entire home with solar.' },
  { id: 'guide-camping-power-solutions', type: 'guide', title: 'Camping Power Solutions', slug: '/guides/camping-power-solutions', summary: 'The best power solutions for camping.' },
  
  // Wiring Diagrams
  { id: 'wiring-basic-off-grid', type: 'wiring', title: 'Basic Off-Grid Wiring Diagram', slug: '/wiring-diagrams/basic-off-grid', summary: 'Complete wiring diagram for a basic off-grid solar system.' },
  { id: 'wiring-12v-system', type: 'wiring', title: '12V System Wiring', slug: '/wiring-diagrams/12v-system', summary: 'Wiring diagram for a 12V solar system.' },
  { id: 'wiring-battery-bank', type: 'wiring', title: 'Battery Bank Wiring', slug: '/wiring-diagrams/battery-bank', summary: 'How to wire your battery bank in series or parallel.' }
]

export async function POST(request) {
  // Check authentication using cookies
  if (!checkAuth()) {
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
    
    const availableContent = contentLibrary.filter(content => !postedTitles.includes(content.title))
    const contentPool = availableContent.length > 0 ? availableContent : contentLibrary
    
    const postsToMake = Math.min(automationSettings.posts_per_day || 1, contentPool.length)
    
    const selectedContent = []
    const shuffled = [...contentPool].sort(() => 0.5 - Math.random())
    for (let i = 0; i < postsToMake; i++) {
      selectedContent.push(shuffled[i])
    }
    
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
        
        const result = await publishToZernio({
          content: platformContentMap[platform] || content.summary,
          images: images,
          platforms: [platform],
          copyId: account.copy_id,
          boardId: account.board_id,
          scheduledFor: null,
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