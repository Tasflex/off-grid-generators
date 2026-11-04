// lib/contentLibrary.js
// The social content queue: every page the auto-publisher and admin automation can promote.
// Shared by /api/automate/content-library, /select-content and /auto-publish.
// Titles are the keys posted_content is matched on, so don't rename existing entries;
// add the old spelling to `aliases` instead.

import fs from 'fs'
import path from 'path'
import { blogPosts } from './blog/posts'

const legacyBlogs = [
  { id: 'blog-best-solar-generators-2026', title: 'Best Solar Generators 2026: Complete Buying Guide', slug: '/blog/best-solar-generators-2026', summary: 'We tested 15 solar generators to find the best options for every budget and use case.', image: '/images/blog/solar-generators-2026.jpg' },
  { id: 'blog-ecoflow-delta-pro-review', title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?', slug: '/blog/ecoflow-delta-pro-review', summary: 'The Delta Pro is EcoFlow\'s flagship portable power station. We tested it for 3 months.', image: '/images/blog/ecoflow-delta-pro.jpg' },
  { id: 'blog-how-many-watts-refrigerator', title: 'How Many Watts Does a Refrigerator Use?', slug: '/blog/how-many-watts-refrigerator', summary: 'Knowing your refrigerator\'s power requirements is crucial when choosing a solar generator.', image: '/images/blog/refrigerator-watts.jpg' },
  { id: 'blog-what-size-solar-generator-house', title: 'What Size Solar Generator Do I Need for My House?', slug: '/blog/what-size-solar-generator-house', summary: 'Choosing the right solar generator for your home is critical for emergency preparedness.', image: '/images/blog/solar-generator-house.jpg' },
  { id: 'blog-cpap-machine-solar-generator', title: 'Can a Solar Generator Run a CPAP Machine?', slug: '/blog/cpap-machine-solar-generator', summary: 'CPAP users need reliable backup power. Here\'s everything you need to know.', image: '/images/blog/cpap-solar.jpg' },
  { id: 'blog-van-life-solar-setup-guide', title: 'Van Life Solar Setup: Complete Guide for Beginners', slug: '/blog/van-life-solar-setup-guide', summary: 'This comprehensive guide covers everything you need to know about installing a solar system in your van.', image: '/images/blog/van-life-solar.jpg' },
  { id: 'blog-ecoflow-vs-bluetti-comparison', title: 'EcoFlow Delta Pro vs Bluetti AC200MAX: Which Is Better?', slug: '/blog/ecoflow-vs-bluetti-comparison', summary: 'We compare the two most popular high-capacity portable power stations.', image: '/images/blog/ecoflow-vs-bluetti.jpg' },
  { id: 'blog-how-many-solar-panels-needed', title: 'How Many Solar Panels Do I Need?', aliases: ['How Many Solar Panels Do I Need? Complete Calculation Guide'], slug: '/blog/how-many-solar-panels-needed', summary: 'Learn how to calculate the exact number of solar panels needed for your home, RV, or off-grid setup.', image: '/images/blog/solar-panels-calculation.jpg' },
  { id: 'blog-solar-battery-technology-explained', title: 'Solar Energy Storage: Battery Technology Explained', slug: '/blog/solar-battery-technology-explained', summary: 'From lithium-ion to LFP, understand the different battery technologies.', image: '/images/blog/battery-technology.jpg' },
  { id: 'blog-solar-vs-traditional-generator', title: 'Solar Generator vs Traditional Generator', aliases: ['Solar Generator vs Traditional Generator: Which to Choose?'], slug: '/blog/solar-vs-traditional-generator', summary: 'Compare the pros and cons of solar generators versus gas-powered generators.', image: '/images/blog/solar-vs-gas.jpg' },
  { id: 'blog-rv-solar-installation-guide', title: 'RV Solar Installation: Step-by-Step Guide', slug: '/blog/rv-solar-installation-guide', summary: 'Complete tutorial on installing a solar system in your RV.', image: '/images/blog/rv-solar-install.jpg' },
  { id: 'blog-solar-market-trends-2026', title: '2026 Solar Market Trends: What to Expect', slug: '/blog/solar-market-trends-2026', summary: 'Prices are dropping and technology is improving. Here are the key trends.', image: '/images/blog/solar-trends.jpg' },
  { id: 'blog-home-battery-backup-guide', title: 'Home Battery Backup: Complete Guide', aliases: ['Home Battery Backup: Complete Guide to Whole Home Systems'], slug: '/blog/home-battery-backup-guide', summary: 'From Tesla Powerwall to EcoFlow Delta Pro, learn about the best options for whole-home backup.', image: '/images/blog/home-battery-backup.jpg' },
  { id: 'blog-camping-solar-essential-guide', title: 'Camping with Solar: Essential Gear Guide', slug: '/blog/camping-solar-essential-guide', summary: 'Everything you need for a solar-powered camping trip.', image: '/images/blog/camping-solar.jpg' },
  { id: 'blog-blackout-emergency-power-plan', title: 'Blackout Emergency Power Plan', aliases: ['How to Prepare for a Blackout: Complete Emergency Power Plan'], slug: '/blog/blackout-emergency-power-plan', summary: 'Power outages are becoming more frequent. Here is a step-by-step guide.', image: '/images/blog/blackout-prep.jpg' }
].map(c => ({ ...c, type: 'blog' }))

// Data-driven posts from lib/blog/posts.js
const dataBlogs = blogPosts.map(p => ({
  id: `blog-${p.slug}`,
  type: 'blog',
  title: p.title,
  slug: p.path,
  summary: p.excerpt,
  image: p.image
}))

const guides = [
  { id: 'guide-how-to-choose', title: 'How to Choose a Solar Generator', slug: '/guides/how-to-choose', summary: 'Step-by-step guide to choosing the perfect solar generator for your needs.' },
  { id: 'guide-how-to-wire-solar-system', title: 'How to Wire a Solar System', slug: '/guides/how-to-wire-solar-system', summary: 'Complete wiring guide for off-grid solar systems.' },
  { id: 'guide-calculate-battery-runtime', title: 'Calculate Battery Runtime', slug: '/guides/calculate-battery-runtime', summary: 'Learn how to calculate battery runtime for your devices.' },
  { id: 'guide-emergency-power-setup', title: 'Emergency Power Setup', slug: '/guides/emergency-power-setup', summary: 'Step-by-step guide to setting up emergency backup power.' },
  { id: 'guide-van-life-solar-sizing', title: 'Van Life Solar Sizing', slug: '/guides/van-life-solar-sizing', summary: 'How to size a solar system for van life.' },
  { id: 'guide-best-solar-generators-2026', title: 'Best Solar Generators 2026', slug: '/guides/best-solar-generators-2026', summary: 'Our top picks for solar generators in 2026.' },
  { id: 'guide-best-portable-power-stations', title: 'Best Portable Power Stations', slug: '/guides/best-portable-power-stations', summary: 'The best portable power stations for camping and travel.' },
  { id: 'guide-best-battery-backup-systems', title: 'Best Battery Backup Systems', slug: '/guides/best-battery-backup-systems', summary: 'The best battery backup systems for home use.' },
  { id: 'guide-blackout-survival-guide', title: 'Blackout Survival Guide', slug: '/guides/blackout-survival-guide', summary: 'How to survive a blackout with backup power.' },
  { id: 'guide-complete-off-grid-living-guide', title: 'Complete Off-Grid Living Guide', slug: '/guides/complete-off-grid-living-guide', summary: 'Everything you need to know about living off-grid.' },
  { id: 'guide-home-backup-systems', title: 'Home Backup Systems', slug: '/guides/home-backup-systems', summary: 'The best home backup power systems.' },
  { id: 'guide-how-many-solar-panels-do-i-need', title: 'How Many Solar Panels Do I Need?', slug: '/guides/how-many-solar-panels-do-i-need', summary: 'Calculate how many solar panels you need for your setup.' },
  { id: 'guide-how-to-install-solar-panels', title: 'How to Install Solar Panels', slug: '/guides/how-to-install-solar-panels', summary: 'Step-by-step guide to installing solar panels.' },
  { id: 'guide-medical-device-power', title: 'Medical Device Power', slug: '/guides/medical-device-power', summary: 'How to power medical devices with solar.' },
  { id: 'guide-rv-power-systems', title: 'RV Power Systems', slug: '/guides/rv-power-systems', summary: 'Complete guide to RV power systems.' },
  { id: 'guide-whole-home-solar', title: 'Whole Home Solar', slug: '/guides/whole-home-solar', summary: 'How to power your entire home with solar.' },
  { id: 'guide-camping-power-solutions', title: 'Camping Power Solutions', slug: '/guides/camping-power-solutions', summary: 'The best power solutions for camping.' }
].map(c => ({ ...c, type: 'guide' }))

const wiring = [
  { id: 'wiring-basic-off-grid', title: 'Basic Off-Grid Wiring Diagram', slug: '/wiring-diagrams/basic-off-grid', summary: 'Complete wiring diagram for a basic off-grid solar system.' },
  { id: 'wiring-12v-system', title: '12V System Wiring', slug: '/wiring-diagrams/12v-system', summary: 'Wiring diagram for a 12V solar system.' },
  { id: 'wiring-battery-bank', title: 'Battery Bank Wiring', slug: '/wiring-diagrams/battery-bank', summary: 'How to wire your battery bank in series or parallel.' }
].map(c => ({ ...c, type: 'wiring' }))

const calculators = [
  { id: 'calc-solar-sizing', title: 'Solar Sizing Calculator: Find Your Perfect System', slug: '/calculators/solar-sizing', summary: 'Use our free solar sizing calculator to match your appliances and usage to the right solar generator.' },
  { id: 'calc-battery-runtime', title: 'Battery Runtime Calculator: Hours of Power', slug: '/calculators/battery-runtime', summary: 'Calculate exactly how long any battery will run your devices before it needs recharging.' },
  { id: 'calc-off-grid-budget', title: 'Off-Grid Budget Calculator: Real Cost Estimates', slug: '/calculators/off-grid-budget', summary: 'Estimate the total cost of an off-grid solar system based on your daily energy needs and backup days.' },
  { id: 'calc-inverter-sizing', title: 'Inverter Sizing Calculator: Running & Surge Watts', slug: '/calculators/inverter-sizing', summary: 'Find the right inverter size for your appliances with running and surge watt calculations.' },
  { id: 'calc-charge-controller-sizing', title: 'Charge Controller Sizing Calculator', slug: '/calculators/charge-controller-sizing', summary: 'Calculate the right MPPT or PWM charge controller for your solar array and battery bank.' },
  { id: 'calc-solar-panel-layout', title: 'Solar Panel Layout Calculator: Panels & Roof Fit', slug: '/calculators/solar-panel-layout', summary: 'Calculate how many solar panels you need and whether they will fit on your roof.' },
  { id: 'calc-charge-time', title: 'Charge Time Calculator: Solar, AC, or Car', slug: '/calculators/charge-time', summary: 'Calculate how long it takes to charge your generator with solar panels, AC, or car charging.' },
  { id: 'calc-panel-degradation', title: 'Panel Degradation Calculator: Year-by-Year Loss', slug: '/calculators/panel-degradation', summary: 'Project how much power your solar panels lose each year and what they will produce in the future.' },
  { id: 'calc-temperature-coefficient-loss', title: 'Temperature Coefficient Loss Calculator', slug: '/calculators/temperature-coefficient-loss', summary: 'See how much solar output you lose to heat and how much a premium panel would recover.' },
  { id: 'calc-shading-impact', title: 'Shading Impact Calculator: Real Output Loss', slug: '/calculators/shading-impact', summary: 'See how partial shading affects output — and how series, parallel, or optimizers change the outcome.' },
  { id: 'calc-dust-soiling-loss', title: 'Dust & Soiling Loss Estimator', slug: '/calculators/dust-soiling-loss', summary: 'Estimate energy lost to dust, pollen, and buildup — with cleaning frequency recommendations.' },
  { id: 'calc-panel-hotspot-risk', title: 'Solar Panel Hotspot Risk Calculator', slug: '/calculators/panel-hotspot-risk', summary: 'Assess the risk of hotspots forming in your solar array — a potential fire hazard.' },
  { id: 'calc-battery-lifetime-cost', title: 'Battery Lifetime Cost Calculator: $/kWh Over Time', slug: '/calculators/battery-lifetime-cost', summary: 'Calculate the true cost per kilowatt-hour delivered over a battery\'s full lifespan and compare to grid power.' },
  { id: 'calc-battery-dod-degradation', title: 'Battery DoD Degradation Calculator', slug: '/calculators/battery-dod-degradation', summary: 'See how depth of discharge affects battery cycle life and cost per kWh across chemistries.' },
  { id: 'calc-inverter-replacement', title: 'Inverter Replacement Interval Calculator', slug: '/calculators/inverter-replacement', summary: 'Estimate your inverter\'s expected lifespan and 25-year cost of ownership based on load and environment.' }
].map(c => ({ ...c, type: 'calculator' }))

export const contentLibrary = [...dataBlogs, ...legacyBlogs, ...guides, ...wiring, ...calculators]

// How many times each item has been posted, matching its title or any alias
export function postCounts(postedTitles) {
  const tally = {}
  for (const t of postedTitles) tally[t] = (tally[t] || 0) + 1
  return Object.fromEntries(contentLibrary.map(c => [
    c.id,
    [c.title, ...(c.aliases || [])].reduce((n, t) => n + (tally[t] || 0), 0)
  ]))
}

// Picks `count` items, least-posted first (never-posted items before repeats), random within a tier
export function pickContent(postedTitles, count = 1) {
  const counts = postCounts(postedTitles)
  return [...contentLibrary]
    .map(c => ({ c, n: counts[c.id], r: Math.random() }))
    .sort((a, b) => a.n - b.n || a.r - b.r)
    .slice(0, count)
    .map(x => x.c)
}

// Absolute URL of the item's featured image if the file ships with the site, for use when AI image generation fails
export function featuredImageUrl(content, baseUrl) {
  if (!content.image) return null
  return fs.existsSync(path.join(process.cwd(), 'public', content.image)) ? `${baseUrl}${content.image}` : null
}
