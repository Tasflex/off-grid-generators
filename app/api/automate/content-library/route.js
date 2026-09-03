import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Helper to check authentication using cookies
function checkAuth() {
  const cookieStore = cookies()
  const adminCookie = cookieStore.get('admin_authenticated')
  return adminCookie && adminCookie.value === 'true'
}

// Your content library
const contentLibrary = [
  // Blog Posts
  {
    id: 'blog-best-solar-generators-2026',
    type: 'blog',
    title: 'Best Solar Generators 2026: Complete Buying Guide',
    slug: '/blog/best-solar-generators-2026',
    summary: 'We tested 15 solar generators to find the best options for every budget and use case.',
    image: '/images/blog/solar-generators-2026.jpg'
  },
  {
    id: 'blog-ecoflow-delta-pro-review',
    type: 'blog',
    title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?',
    slug: '/blog/ecoflow-delta-pro-review',
    summary: 'The Delta Pro is EcoFlow\'s flagship portable power station. We tested it for 3 months.',
    image: '/images/blog/ecoflow-delta-pro.jpg'
  },
  {
    id: 'blog-how-many-watts-refrigerator',
    type: 'blog',
    title: 'How Many Watts Does a Refrigerator Use?',
    slug: '/blog/how-many-watts-refrigerator',
    summary: 'Knowing your refrigerator\'s power requirements is crucial when choosing a solar generator.',
    image: '/images/blog/refrigerator-watts.jpg'
  },
  {
    id: 'blog-what-size-solar-generator-house',
    type: 'blog',
    title: 'What Size Solar Generator Do I Need for My House?',
    slug: '/blog/what-size-solar-generator-house',
    summary: 'Choosing the right solar generator for your home is critical for emergency preparedness.',
    image: '/images/blog/solar-generator-house.jpg'
  },
  {
    id: 'blog-cpap-machine-solar-generator',
    type: 'blog',
    title: 'Can a Solar Generator Run a CPAP Machine?',
    slug: '/blog/cpap-machine-solar-generator',
    summary: 'CPAP users need reliable backup power. Here\'s everything you need to know.',
    image: '/images/blog/cpap-solar.jpg'
  },
  {
    id: 'blog-van-life-solar-setup-guide',
    type: 'blog',
    title: 'Van Life Solar Setup: Complete Guide for Beginners',
    slug: '/blog/van-life-solar-setup-guide',
    summary: 'This comprehensive guide covers everything you need to know about installing a solar system in your van.',
    image: '/images/blog/van-life-solar.jpg'
  },
  {
    id: 'blog-ecoflow-vs-bluetti-comparison',
    type: 'blog',
    title: 'EcoFlow Delta Pro vs Bluetti AC200MAX: Which Is Better?',
    slug: '/blog/ecoflow-vs-bluetti-comparison',
    summary: 'We compare the two most popular high-capacity portable power stations.',
    image: '/images/blog/ecoflow-vs-bluetti.jpg'
  },
  {
    id: 'blog-how-many-solar-panels-needed',
    type: 'blog',
    title: 'How Many Solar Panels Do I Need? Complete Calculation Guide',
    slug: '/blog/how-many-solar-panels-needed',
    summary: 'Learn how to calculate the exact number of solar panels needed for your home, RV, or off-grid setup.',
    image: '/images/blog/solar-panels-calculation.jpg'
  },
  {
    id: 'blog-solar-battery-technology-explained',
    type: 'blog',
    title: 'Solar Energy Storage: Battery Technology Explained',
    slug: '/blog/solar-battery-technology-explained',
    summary: 'From lithium-ion to LFP, understand the different battery technologies.',
    image: '/images/blog/battery-technology.jpg'
  },
  {
    id: 'blog-solar-vs-traditional-generator',
    type: 'blog',
    title: 'Solar Generator vs Traditional Generator: Which to Choose?',
    slug: '/blog/solar-vs-traditional-generator',
    summary: 'Compare the pros and cons of solar generators versus gas-powered generators.',
    image: '/images/blog/solar-vs-gas.jpg'
  },
  {
    id: 'blog-rv-solar-installation-guide',
    type: 'blog',
    title: 'RV Solar Installation: Step-by-Step Guide',
    slug: '/blog/rv-solar-installation-guide',
    summary: 'Complete tutorial on installing a solar system in your RV.',
    image: '/images/blog/rv-solar-install.jpg'
  },
  {
    id: 'blog-solar-market-trends-2026',
    type: 'blog',
    title: '2026 Solar Market Trends: What to Expect',
    slug: '/blog/solar-market-trends-2026',
    summary: 'Prices are dropping and technology is improving. Here are the key trends.',
    image: '/images/blog/solar-trends.jpg'
  },
  {
    id: 'blog-home-battery-backup-guide',
    type: 'blog',
    title: 'Home Battery Backup: Complete Guide to Whole Home Systems',
    slug: '/blog/home-battery-backup-guide',
    summary: 'From Tesla Powerwall to EcoFlow Delta Pro, learn about the best options for whole-home backup.',
    image: '/images/blog/home-battery-backup.jpg'
  },
  {
    id: 'blog-camping-solar-essential-guide',
    type: 'blog',
    title: 'Camping with Solar: Essential Gear Guide',
    slug: '/blog/camping-solar-essential-guide',
    summary: 'Everything you need for a solar-powered camping trip.',
    image: '/images/blog/camping-solar.jpg'
  },
  {
    id: 'blog-blackout-emergency-power-plan',
    type: 'blog',
    title: 'How to Prepare for a Blackout: Complete Emergency Power Plan',
    slug: '/blog/blackout-emergency-power-plan',
    summary: 'Power outages are becoming more frequent. Here is a step-by-step guide.',
    image: '/images/blog/blackout-prep.jpg'
  },

  // Guides
  {
    id: 'guide-how-to-choose',
    type: 'guide',
    title: 'How to Choose a Solar Generator',
    slug: '/guides/how-to-choose',
    summary: 'Step-by-step guide to choosing the perfect solar generator for your needs.',
    image: '/images/guides/how-to-choose.jpg'
  },
  {
    id: 'guide-how-to-wire-solar-system',
    type: 'guide',
    title: 'How to Wire a Solar System',
    slug: '/guides/how-to-wire-solar-system',
    summary: 'Complete wiring guide for off-grid solar systems.',
    image: '/images/guides/how-to-wire.jpg'
  },
  {
    id: 'guide-calculate-battery-runtime',
    type: 'guide',
    title: 'Calculate Battery Runtime',
    slug: '/guides/calculate-battery-runtime',
    summary: 'Learn how to calculate battery runtime for your devices.',
    image: '/images/guides/battery-runtime.jpg'
  },
  {
    id: 'guide-emergency-power-setup',
    type: 'guide',
    title: 'Emergency Power Setup',
    slug: '/guides/emergency-power-setup',
    summary: 'Step-by-step guide to setting up emergency backup power.',
    image: '/images/guides/emergency-power.jpg'
  },
  {
    id: 'guide-van-life-solar-sizing',
    type: 'guide',
    title: 'Van Life Solar Sizing',
    slug: '/guides/van-life-solar-sizing',
    summary: 'How to size a solar system for van life.',
    image: '/images/guides/van-life-solar.jpg'
  },
  {
    id: 'guide-best-solar-generators-2026',
    type: 'guide',
    title: 'Best Solar Generators 2026',
    slug: '/guides/best-solar-generators-2026',
    summary: 'Our top picks for solar generators in 2026.',
    image: '/images/guides/best-solar.jpg'
  },
  {
    id: 'guide-best-portable-power-stations',
    type: 'guide',
    title: 'Best Portable Power Stations',
    slug: '/guides/best-portable-power-stations',
    summary: 'The best portable power stations for camping and travel.',
    image: '/images/guides/portable-power.jpg'
  },
  {
    id: 'guide-best-battery-backup-systems',
    type: 'guide',
    title: 'Best Battery Backup Systems',
    slug: '/guides/best-battery-backup-systems',
    summary: 'The best battery backup systems for home use.',
    image: '/images/guides/battery-backup.jpg'
  },
  {
    id: 'guide-blackout-survival-guide',
    type: 'guide',
    title: 'Blackout Survival Guide',
    slug: '/guides/blackout-survival-guide',
    summary: 'How to survive a blackout with backup power.',
    image: '/images/guides/blackout.jpg'
  },
  {
    id: 'guide-complete-off-grid-living-guide',
    type: 'guide',
    title: 'Complete Off-Grid Living Guide',
    slug: '/guides/complete-off-grid-living-guide',
    summary: 'Everything you need to know about living off-grid.',
    image: '/images/guides/off-grid.jpg'
  },
  {
    id: 'guide-home-backup-systems',
    type: 'guide',
    title: 'Home Backup Systems',
    slug: '/guides/home-backup-systems',
    summary: 'The best home backup power systems.',
    image: '/images/guides/home-backup.jpg'
  },
  {
    id: 'guide-how-many-solar-panels-do-i-need',
    type: 'guide',
    title: 'How Many Solar Panels Do I Need?',
    slug: '/guides/how-many-solar-panels-do-i-need',
    summary: 'Calculate how many solar panels you need for your setup.',
    image: '/images/guides/solar-panels.jpg'
  },
  {
    id: 'guide-how-to-install-solar-panels',
    type: 'guide',
    title: 'How to Install Solar Panels',
    slug: '/guides/how-to-install-solar-panels',
    summary: 'Step-by-step guide to installing solar panels.',
    image: '/images/guides/install-solar.jpg'
  },
  {
    id: 'guide-medical-device-power',
    type: 'guide',
    title: 'Medical Device Power',
    slug: '/guides/medical-device-power',
    summary: 'How to power medical devices with solar.',
    image: '/images/guides/medical-power.jpg'
  },
  {
    id: 'guide-rv-power-systems',
    type: 'guide',
    title: 'RV Power Systems',
    slug: '/guides/rv-power-systems',
    summary: 'Complete guide to RV power systems.',
    image: '/images/guides/rv-power.jpg'
  },
  {
    id: 'guide-whole-home-solar',
    type: 'guide',
    title: 'Whole Home Solar',
    slug: '/guides/whole-home-solar',
    summary: 'How to power your entire home with solar.',
    image: '/images/guides/whole-home.jpg'
  },
  {
    id: 'guide-camping-power-solutions',
    type: 'guide',
    title: 'Camping Power Solutions',
    slug: '/guides/camping-power-solutions',
    summary: 'The best power solutions for camping.',
    image: '/images/guides/camping-power.jpg'
  },

  // Wiring Diagrams
  {
    id: 'wiring-basic-off-grid',
    type: 'wiring',
    title: 'Basic Off-Grid Wiring Diagram',
    slug: '/wiring-diagrams/basic-off-grid',
    summary: 'Complete wiring diagram for a basic off-grid solar system.',
    image: '/images/wiring/basic-off-grid.jpg'
  },
  {
    id: 'wiring-12v-system',
    type: 'wiring',
    title: '12V System Wiring',
    slug: '/wiring-diagrams/12v-system',
    summary: 'Wiring diagram for a 12V solar system.',
    image: '/images/wiring/12v-system.jpg'
  },
  {
    id: 'wiring-battery-bank',
    type: 'wiring',
    title: 'Battery Bank Wiring',
    slug: '/wiring-diagrams/battery-bank',
    summary: 'How to wire your battery bank in series or parallel.',
    image: '/images/wiring/battery-bank.jpg'
  }
]

// GET endpoint with authentication using cookies
export async function GET(request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({
    success: true,
    content: contentLibrary
  })
}

// POST endpoint with authentication using cookies
export async function POST(request) {
  if (!checkAuth()) {
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