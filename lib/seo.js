// lib/seo.js
// Per-page titles, descriptions and canonicals. Read by generateMetadata in app/layout.js.
// Pages are client components, so they can't export metadata themselves.

import { products } from './products'
import { deviceCalculators } from './calc'
import { blogPosts } from './blog/posts'

export const SITE_URL = 'https://theloadcalc.com'
export const SITE_NAME = 'TheLoadCalc'

const DEFAULT_IMAGE = '/images/hero-solar-bg.webp'

const staticPages = {
  '/': {
    title: 'Solar Generator Sizing Calculator & Off-Grid Power Guides',
    absoluteTitle: true,
    description: 'Calculate your exact battery and solar requirements for emergency backup, van conversions or off-grid living, and get product recommendations that fit.'
  },
  '/about': { title: 'About Us', description: 'TheLoadCalc helps you size solar generators, batteries and off-grid power systems with free calculators, honest reviews and practical guides.' },
  '/contact': { title: 'Contact Us', description: 'Questions, feedback or need help sizing your solar or battery backup system? Get in touch with the TheLoadCalc team.' },
  '/affiliate-disclosure': { title: 'Affiliate Disclosure', description: 'How TheLoadCalc earns commissions through affiliate links, and how we keep our product reviews and recommendations independent.' },
  '/privacy-policy': { title: 'Privacy Policy', description: 'What information TheLoadCalc collects, how it is used, and the choices you have about your data.' },
  '/terms': { title: 'Terms of Service', description: 'The terms and conditions for using TheLoadCalc, its calculators, guides and product recommendations.' },
  '/search': { title: 'Search', description: 'Search TheLoadCalc for products, calculators, guides and wiring diagrams.', noindex: true },

  // Blog
  '/blog': { title: 'Solar & Off-Grid Power Blog', description: 'Expert advice, product reviews and how-to guides on solar generators, home battery backup and off-grid power systems.' },
  '/blog/best-solar-generators-2026': { title: 'Best Solar Generators 2026: Complete Buying Guide', description: 'We tested 15 popular solar generators to find the best options for emergency backup, camping and off-grid living at every budget.' },
  '/blog/blackout-emergency-power-plan': { title: 'Blackout Emergency Power Plan: How to Prepare', description: 'Build a complete emergency power plan for blackouts: what to keep running, how much battery you need and which backup options work best.' },
  '/blog/camping-solar-essential-guide': { title: 'Camping with Solar: Essential Gear Guide', description: 'Keep phones, lights and even a small fridge running at camp. The solar panels, power stations and accessories worth packing.' },
  '/blog/cpap-machine-solar-generator': { title: 'Can a Solar Generator Run a CPAP Machine?', description: 'Exact calculations for running a CPAP on solar or battery power, how many nights you get, and the best power stations for CPAP users.' },
  '/blog/ecoflow-delta-pro-review': { title: 'EcoFlow Delta Pro Review: Is It Worth $1,999?', description: 'Our hands-on EcoFlow Delta Pro review: 3,600Wh capacity, real runtime tests, charging speed, pros, cons and who should buy it.' },
  '/blog/ecoflow-vs-bluetti-comparison': { title: 'EcoFlow Delta Pro vs Bluetti AC200MAX Compared', description: 'EcoFlow Delta Pro or Bluetti AC200MAX? Capacity, output, charging speed, expandability and price compared to help you choose.' },
  '/blog/home-battery-backup-guide': { title: 'Home Battery Backup: Guide to Whole-Home Systems', description: 'How home battery backup works, how to size a system for your essential appliances, and the best whole-home options available.' },
  '/blog/how-many-solar-panels-needed': { title: 'How Many Solar Panels Do I Need? Calculation Guide', description: 'A step-by-step calculation to work out how many solar panels your home, RV or off-grid system needs, with worked examples.' },
  '/blog/how-many-watts-refrigerator': { title: 'How Many Watts Does a Refrigerator Use?', description: 'How many watts a refrigerator uses, how to measure it and what size solar generator or battery you need to keep it running.' },
  '/blog/rv-solar-installation-guide': { title: 'RV Solar Installation: Step-by-Step Guide', description: 'Install solar on your RV from start to finish: choosing panels, batteries and charge controllers, mounting, wiring and testing.' },
  '/blog/solar-battery-technology-explained': { title: 'Solar Battery Technology Explained: LiFePO4 vs Lithium-Ion', description: 'LiFePO4, lithium-ion, AGM and lead-acid batteries compared for solar storage: lifespan, depth of discharge, cost and safety.' },
  '/blog/solar-market-trends-2026': { title: '2026 Solar Market Trends: What to Expect', description: 'Solar generator prices are dropping and technology is improving. The key 2026 trends and what they mean for buyers.' },
  '/blog/solar-vs-traditional-generator': { title: 'Solar Generator vs Traditional Generator: Which to Choose?', description: 'Solar and gas generators compared on cost, runtime, noise, maintenance and safety so you can pick the right backup power.' },
  '/blog/van-life-solar-setup-guide': { title: 'Van Life Solar Setup: Complete Beginner Guide', description: 'Everything you need to install solar in your van: sizing, choosing components, wiring and installation for reliable off-grid power.' },
  '/blog/what-size-solar-generator-house': { title: 'What Size Solar Generator Do I Need for My House?', description: 'Calculate the right solar generator size for your home so essential appliances stay powered through an outage.' },

  // Guides
  '/guides': { title: 'Off-Grid Power Guides', description: 'Step-by-step tutorials, buying guides and expert advice for solar generators, battery backup and off-grid power systems.' },
  '/guides/best-battery-backup-systems': { title: 'Best Battery Backup Systems 2026', description: 'The best battery backup systems for whole-home backup, off-grid power and DIY solar builds, compared by capacity and price.' },
  '/guides/best-portable-power-stations': { title: 'Best Portable Power Stations 2026', description: 'Our top portable power station picks for camping, road trips and emergencies, with capacity, weight and price compared.' },
  '/guides/best-solar-generators-2026': { title: 'Best Solar Generators 2026: Top Picks by Use Case', description: 'The best solar generators of 2026 for camping, emergency preparedness and off-grid living, picked by use case and budget.' },
  '/guides/blackout-survival-guide': { title: 'Blackout Survival Guide: Getting Through a Power Outage', description: 'How to get through a blackout safely: what to do before, during and after, how much backup power you need and what to power first.' },
  '/guides/calculate-battery-runtime': { title: 'How to Calculate Battery Runtime', description: 'Work out how long a battery or solar generator will run your devices, with the formula, worked examples and a free calculator.' },
  '/guides/camping-power-solutions': { title: 'Camping Power Solutions: Stay Charged Off-Grid', description: 'From backpacking to glamping, choose the right mix of solar panels, batteries and power stations for your camping trip.' },
  '/guides/complete-off-grid-living-guide': { title: 'Complete Off-Grid Living Guide', description: 'Everything you need to live off-grid: solar power, battery storage, water systems, waste management and energy independence.' },
  '/guides/emergency-power-setup': { title: 'How to Set Up Emergency Power at Home', description: 'Set up emergency backup power to protect your food, medications and home during outages, step by step.' },
  '/guides/home-backup-systems': { title: 'Home Backup Power Systems: Complete Guide', description: 'Compare home backup options from portable power stations to whole-home battery banks and find the right one for your house.' },
  '/guides/how-many-solar-panels-do-i-need': { title: 'Solar Panel Calculator: How Many Panels Do I Need?', description: 'Calculate the exact number of solar panels for your home, RV or off-grid system with our interactive calculator.' },
  '/guides/how-to-choose': { title: 'How to Choose a Solar Generator', description: 'How to choose a solar generator: calculate your power needs, then compare capacity, output, charging and battery chemistry.' },
  '/guides/how-to-install-solar-panels': { title: 'How to Install Solar Panels: DIY Guide', description: 'A step-by-step DIY guide to installing solar panels on your home, RV or off-grid cabin and saving on installation costs.' },
  '/guides/how-to-wire-solar-system': { title: 'How to Wire a Solar System: Complete Guide', description: 'How to wire solar panels, charge controller, batteries and inverter safely, with wire sizing, fusing and step-by-step instructions.' },
  '/guides/medical-device-power': { title: 'Backup Power for Medical Devices', description: 'Choose the right backup power for CPAP, oxygen concentrators and other medical equipment so they keep running during outages.' },
  '/guides/rv-power-systems': { title: 'RV Power Systems: Complete Guide', description: 'How to power your RV with solar panels, batteries, inverters and generators, and build the right system for life on the road.' },
  '/guides/van-life-solar-sizing': { title: 'How to Size a Solar System for Van Life', description: 'Size the solar panels, battery bank and inverter for your camper van based on what you actually run each day.' },
  '/guides/whole-home-solar': { title: 'Whole Home Solar: Complete Guide', description: 'Going solar for your whole home: system sizing, installation, real savings and the tax incentives available.' },

  // Comparisons
  '/comparisons': { title: 'Solar Generator & Power Station Comparisons', description: 'Side-by-side comparisons of the best solar generators, portable power stations and home backup systems.' },
  '/comparisons/ecoflow-vs-bluetti': { title: 'EcoFlow vs Bluetti: Delta Pro vs AC200MAX Side by Side', description: 'EcoFlow Delta Pro and Bluetti AC200MAX compared spec by spec: capacity, output, charging, weight, warranty and value.' },
  '/comparisons/jackery-vs-ecoflow': { title: 'Jackery Explorer 2000 vs EcoFlow Delta 2', description: 'Jackery Explorer 2000 vs EcoFlow Delta 2 compared on capacity, output, charging speed, portability and price.' },
  '/comparisons/portable-vs-home-backup': { title: 'Portable Power Station vs Home Backup System', description: 'The difference between portable power stations and whole-home backup systems, and which one fits your needs.' },
  '/comparisons/renogy-vs-goalzero': { title: 'Renogy vs Goal Zero: Which Is Right for You?', description: 'Renogy offers budget-friendly modular solar while Goal Zero sells premium ready-to-use systems. How the two brands compare.' },
  '/comparisons/solar-vs-gas-generator': { title: 'Solar Generator vs Gas Generator: Side-by-Side Comparison', description: 'Solar and gas generators compared side by side on upfront cost, fuel, noise, runtime and maintenance.' },

  // Calculators
  '/calculators': { title: '58 Free Solar, Battery & Inverter Calculators', description: 'Free solar calculators for panel output, tilt, battery bank sizing, inverter sizing, wire gauge, voltage drop, sun hours and complete off-grid system design.' },

  // Wiring diagrams
  '/wiring-diagrams': { title: 'Solar Wiring Diagrams', description: 'Step-by-step solar wiring diagrams for 12V, 24V and 48V systems, battery banks, charge controllers and inverters.' },
  '/wiring-diagrams/basic-off-grid': { title: 'Basic Off-Grid Solar Wiring Diagram', description: 'A complete wiring diagram for a basic off-grid solar system: panels, charge controller, battery, inverter and fuses.' },
  '/wiring-diagrams/12v-system': { title: '12V Solar System Wiring Diagram', description: 'How to wire a 12V solar system for vans, RVs and cabins, with component list, wire sizes and fuse ratings.' },
  '/wiring-diagrams/24v-system': { title: '24V Solar System Wiring Diagram', description: 'How to wire a 24V solar system, when to choose 24V over 12V, and the wire and fuse sizes to use.' },
  '/wiring-diagrams/48v-system': { title: '48V Solar System Wiring Diagram', description: 'How to wire a 48V solar system for larger off-grid homes, with component choices, wire sizing and safety.' },
  '/wiring-diagrams/battery-bank': { title: 'Battery Bank Wiring Diagram: Series & Parallel', description: 'How to wire a battery bank in series, parallel or series-parallel to get the voltage and capacity you need.' },
  '/wiring-diagrams/charge-controller': { title: 'Charge Controller Wiring Diagram', description: 'How to connect a solar charge controller to your panels and battery bank in the right order, with fusing.' },
  '/wiring-diagrams/inverter-connection': { title: 'Inverter Wiring Diagram: Connecting to a Battery', description: 'How to connect an inverter to your battery bank safely, including cable size, fuse rating and grounding.' },
  '/wiring-diagrams/panel-series': { title: 'Solar Panels in Series Wiring Diagram', description: 'How to wire solar panels in series to increase voltage, with a diagram and when series wiring is the right choice.' },
  '/wiring-diagrams/panel-parallel': { title: 'Solar Panels in Parallel Wiring Diagram', description: 'How to wire solar panels in parallel to increase current, with a diagram and when parallel wiring is the right choice.' },
  '/wiring-diagrams/panel-series-parallel': { title: 'Series-Parallel Solar Panel Wiring Diagram', description: 'How to combine series strings in parallel to reach the voltage and current your charge controller needs.' },

  // Product categories
  '/products': { title: 'Shop Solar Generators, Batteries & Panels', description: 'Browse tested and rated solar generators, portable power stations, batteries, solar panels, inverters and components.' },
  '/products/solar-generators': { title: 'Best Solar Generators', description: 'Compare solar generators with built-in inverters from 300W to 3,600W+ output for home backup, camping and off-grid use.' },
  '/products/portable-power-stations': { title: 'Best Portable Power Stations', description: 'Lightweight, compact portable power stations for camping, travel and emergency backup, compared by capacity and price.' },
  '/products/battery-backups': { title: 'Lithium Battery Backup Systems', description: 'Deep-cycle LiFePO4 batteries for permanent installations, RVs and home backup systems.' },
  '/products/solar-panels': { title: 'Solar Panels for Off-Grid & Portable Use', description: 'Rigid and portable monocrystalline solar panels for every budget, from 100W foldable panels to 400W arrays.' },
  '/products/inverters': { title: 'Pure Sine Wave Inverters', description: 'Pure sine wave inverters that convert DC battery power to clean AC power for your appliances, from 1,000W to 3,000W.' },
  '/products/charge-controllers': { title: 'MPPT & PWM Solar Charge Controllers', description: 'Solar charge controllers that safely charge your batteries: MPPT for efficiency, PWM for tight budgets.' },
  '/products/components': { title: 'Solar Components: Cables, Fuses & Mounts', description: 'Essential components for building a solar power system: battery cables, inline fuses, MC4 connectors, mounts and monitors.' },
  '/products/accessories': { title: 'Solar Generator Accessories', description: 'Cables, adapters and charge controllers to get more out of your solar generator or power station.' },
  '/products/complete-kits': { title: 'Complete Solar Kits', description: 'All-in-one solar kits with panels, batteries, inverter and accessories included, ready to install.' }
}

function trimDescription(text, max = 158) {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…'
}

const productPages = Object.fromEntries(
  Object.values(products).flat().map(p => [
    `/products/${p.id}`,
    {
      title: `${p.name} Review: Specs, Price & Pros/Cons`,
      description: trimDescription(p.description),
      image: p.image
    }
  ])
)

const devicePages = Object.fromEntries(
  deviceCalculators.map(c => [c.path, { title: c.title, description: c.description }])
)

const blogPostPages = Object.fromEntries(
  blogPosts.map(p => [p.path, { title: p.seoTitle, description: p.description, image: p.image }])
)

const pages = { ...productPages, ...devicePages, ...blogPostPages, ...staticPages }

// Returns the SEO entry for a path, or null for paths we don't know (404s, admin).
export function getPageSeo(pathname) {
  const path = pathname && pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
  const page = pages[path]
  if (!page) return null
  return {
    ...page,
    path,
    canonical: `${SITE_URL}${page.canonical || path}`,
    image: page.image || DEFAULT_IMAGE
  }
}
