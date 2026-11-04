// lib/blog/posts.js
// Metadata for the data-driven blog posts served by app/blog/[slug].
// Kept free of article bodies so client components (the /blog index, related-post links) can import it cheaply.
// Bodies live in lib/blog/content/*. The blog index, lib/seo.js, the sitemap, search and the
// social content library all read from this list, so a new post only needs an entry here plus its content.

const ccBy = { license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' }

export const blogPosts = [
  // Home backup cluster
  {
    slug: 'sump-pump-battery-backup',
    title: 'Can a Power Station Run a Sump Pump? Battery Backup Sizing Guide',
    seoTitle: 'Can a Power Station Run a Sump Pump? Sizing Guide',
    description: 'How many watts a sump pump needs, why startup surge matters more than capacity, and how to size a battery backup that keeps your basement dry in an outage.',
    excerpt: 'Storms and power cuts arrive together. Here is how to size a power station for a 1/3 or 1/2 HP sump pump, and when a dedicated DC backup pump is the better buy.',
    category: 'Home Backup',
    readTime: '9 min read',
    tags: ['Sump Pump', 'Home Backup', 'Surge Watts'],
    image: '/images/blog/sump-pump-battery-backup.jpg',
    imageCredit: { author: 'www.homejobsbymom.com', source: 'https://www.flickr.com/photos/76588981@N02/6900694541', ...ccBy },
    related: ['well-pump-power-outage', 'transfer-switch-vs-interlock-kit', 'surge-watts-vs-running-watts', 'winter-power-outage-checklist']
  },
  {
    slug: 'well-pump-power-outage',
    title: 'How to Run a Well Pump During a Power Outage',
    seoTitle: 'How to Run a Well Pump During a Power Outage',
    description: 'Well pump wattage, 240V and surge explained. Learn what size generator or power station runs a 1/2 or 1 HP well pump, and how soft starters change the math.',
    excerpt: 'No power means no water on a private well. A well pump uses little energy but a lot of startup current, and that changes what kind of backup you need.',
    category: 'Home Backup',
    readTime: '9 min read',
    tags: ['Well Pump', '240V', 'Home Backup'],
    image: '/images/blog/well-pump-power-outage.jpg',
    imageCredit: { author: 'USFWS/Southeast', source: 'https://www.flickr.com/photos/41464593@N02/6466592407', ...ccBy },
    related: ['sump-pump-battery-backup', 'surge-watts-vs-running-watts', 'transfer-switch-vs-interlock-kit', '12v-vs-24v-vs-48v-solar-system']
  },
  {
    slug: 'chest-freezer-power-station',
    title: 'How Long Will a Power Station Run a Chest Freezer?',
    seoTitle: 'How Long Will a Power Station Run a Chest Freezer?',
    description: 'Real chest freezer energy use, startup watts and runtimes on 500Wh to 3kWh power stations, plus a cycling trick that stretches one battery for days.',
    excerpt: 'A modern chest freezer uses less power than most people expect. We work out runtimes for common power station sizes and show how to make one battery last days.',
    category: 'Home Backup',
    readTime: '8 min read',
    tags: ['Freezer', 'Runtime', 'Power Outage'],
    image: '/images/blog/chest-freezer-power-station.jpg',
    imageCredit: { author: 'Wheeler Cowperthwaite', source: 'https://www.flickr.com/photos/60756254@N07/8569983561', ...ccBy },
    related: ['winter-power-outage-checklist', 'surge-watts-vs-running-watts', 'watts-vs-watt-hours-explained', 'keep-internet-on-power-outage']
  },
  {
    slug: 'keep-internet-on-power-outage',
    title: 'How to Keep Your Internet On During a Power Outage',
    seoTitle: 'How to Keep Your Internet On During a Power Outage',
    description: 'A modem and router need only 20-40W. How to keep Wi-Fi running for a day or more with a power station or DC UPS, and what to do if your ISP goes down.',
    excerpt: 'Wi-Fi is one of the cheapest things to keep running in a blackout. Here is how much battery it takes and the setup that wastes the least energy.',
    category: 'Home Backup',
    readTime: '7 min read',
    tags: ['Internet', 'Router', 'UPS'],
    image: '/images/blog/keep-internet-on-power-outage.jpg',
    imageCredit: { author: 'homethods.com', source: 'https://commons.wikimedia.org/w/index.php?curid=70406956', ...ccBy },
    related: ['pass-through-charging-ups-power-station', 'winter-power-outage-checklist', 'watts-vs-watt-hours-explained', 'chest-freezer-power-station']
  },
  {
    slug: 'transfer-switch-vs-interlock-kit',
    title: 'Transfer Switch vs Interlock Kit: Connecting Backup Power to Your House',
    seoTitle: 'Transfer Switch vs Interlock Kit: Which Do You Need?',
    description: 'Manual transfer switch, interlock kit or automatic transfer switch? How each connects a generator or power station to your panel safely, and what it costs.',
    excerpt: 'Extension cords get old fast in a long outage. Here is how transfer switches and interlock kits let a generator or power station feed your home circuits safely.',
    category: 'Home Backup',
    readTime: '10 min read',
    tags: ['Transfer Switch', 'Interlock', 'Home Wiring'],
    image: '/images/blog/transfer-switch-vs-interlock-kit.jpg',
    imageCredit: { author: 'MTA C&D - East Side Access', source: 'https://www.flickr.com/photos/59595815@N03/48146738962', ...ccBy },
    related: ['sump-pump-battery-backup', 'well-pump-power-outage', 'winter-power-outage-checklist', 'surge-watts-vs-running-watts']
  },

  // Emergency preparedness
  {
    slug: 'winter-power-outage-checklist',
    title: 'Winter Power Outage Checklist: Stay Warm, Fed and Connected',
    seoTitle: 'Winter Power Outage Checklist: Heat, Food & Power',
    description: 'A practical winter outage checklist: keeping heat on safely, protecting pipes and food, avoiding carbon monoxide, and how much battery power to have ready.',
    excerpt: 'Winter outages last longer and the cold makes them dangerous. Use this checklist to prepare heat, food, water and backup power before the next ice storm.',
    category: 'Emergency Preparedness',
    readTime: '10 min read',
    tags: ['Winter', 'Checklist', 'Emergency'],
    image: '/images/blog/winter-power-outage-checklist.jpg',
    imageCredit: { author: 'LadyDragonflyCC', source: 'https://www.flickr.com/photos/19646481@N06/11542081846', ...ccBy },
    related: ['space-heater-solar-generator', 'chest-freezer-power-station', 'keep-internet-on-power-outage', 'transfer-switch-vs-interlock-kit', 'lifepo4-battery-cold-weather']
  },
  {
    slug: 'space-heater-solar-generator',
    title: 'Can a Solar Generator Run a Space Heater? The Honest Math',
    seoTitle: 'Can a Solar Generator Run a Space Heater?',
    description: 'A 1,500W space heater empties most power stations in about an hour. See the runtime math and the low-watt ways to stay warm on battery power instead.',
    excerpt: 'Yes, technically. But a space heater is the fastest way to drain a battery. Here are the numbers, and the heating options that actually work off-grid.',
    category: 'Emergency Preparedness',
    readTime: '7 min read',
    tags: ['Heating', 'Space Heater', 'Winter'],
    image: '/images/blog/space-heater-solar-generator.jpg',
    imageCredit: { author: 'goblinbox (queen of ad hoc bento)', source: 'https://www.flickr.com/photos/25977089@N00/6502006829', ...ccBy },
    related: ['winter-power-outage-checklist', 'watts-vs-watt-hours-explained', 'lifepo4-battery-cold-weather', 'tiny-house-solar-system']
  },

  // Power basics cluster
  {
    slug: 'watts-vs-watt-hours-explained',
    title: 'Watts vs Watt-Hours: The Difference That Decides What You Can Run',
    seoTitle: 'Watts vs Watt-Hours Explained (With Examples)',
    description: 'Watts are how fast power is used; watt-hours are how much you have. Read power station specs, convert Ah and mAh, and estimate runtime in one line of math.',
    excerpt: 'Every power station lists two numbers that people mix up. Once you know the difference between watts and watt-hours, sizing a battery takes one line of math.',
    category: 'Power Basics',
    readTime: '7 min read',
    tags: ['Basics', 'Watt-Hours', 'Runtime'],
    image: '/images/blog/watts-vs-watt-hours-explained.jpg',
    imageCredit: { author: 'Kai Hendry', source: 'https://www.flickr.com/photos/16105436@N00/397510397', ...ccBy },
    related: ['surge-watts-vs-running-watts', 'why-solar-panels-produce-less-than-rated', 'power-station-storage-maintenance', 'chest-freezer-power-station']
  },
  {
    slug: 'surge-watts-vs-running-watts',
    title: 'Surge Watts vs Running Watts: Why Your Inverter Trips',
    seoTitle: 'Surge Watts vs Running Watts: Why Inverters Trip',
    description: 'Motors draw 2-7x their running watts for a split second at startup. Typical surge for fridges, pumps and tools, and how to size an inverter that copes.',
    excerpt: 'Your fridge uses 150 watts, so why does it trip a 600W inverter? Startup surge explained, with a table of real appliances and how to size around it.',
    category: 'Power Basics',
    readTime: '8 min read',
    tags: ['Surge', 'Inverter', 'Basics'],
    image: '/images/blog/surge-watts-vs-running-watts.jpg',
    imageCredit: { author: 'bartlec', source: 'https://www.flickr.com/photos/13963375@N00/3388455135', ...ccBy },
    related: ['watts-vs-watt-hours-explained', 'sump-pump-battery-backup', 'power-tools-solar-generator-jobsite', 'well-pump-power-outage']
  },
  {
    slug: 'pass-through-charging-ups-power-station',
    title: 'Pass-Through Charging and UPS Mode: Can a Power Station Replace a UPS?',
    seoTitle: 'Can a Power Station Work as a UPS? Pass-Through Explained',
    description: 'What pass-through charging and UPS mode really mean, switchover times compared with a true UPS, which devices care, and how to avoid wearing out the battery.',
    excerpt: 'Many power stations advertise UPS mode. Whether it protects a desktop PC, a NAS or a CPAP depends on switchover time and how the unit routes power.',
    category: 'Power Basics',
    readTime: '8 min read',
    tags: ['UPS', 'Pass-Through', 'Home Office'],
    image: '/images/blog/pass-through-charging-ups-power-station.jpg',
    imageCredit: { author: 'MattsMacintosh', source: 'https://www.flickr.com/photos/48126477@N05/8010674154', ...ccBy },
    related: ['keep-internet-on-power-outage', 'power-station-storage-maintenance', 'watts-vs-watt-hours-explained', 'surge-watts-vs-running-watts']
  },
  {
    slug: 'lifepo4-battery-cold-weather',
    title: 'LiFePO4 Batteries in Cold Weather: Charging Below Freezing',
    seoTitle: 'LiFePO4 in Cold Weather: Charging Below Freezing',
    description: 'Why LiFePO4 batteries must not charge below 32°F (0°C), how much capacity they lose in the cold, and how heated batteries and insulation keep systems working.',
    excerpt: 'Lithium iron phosphate is the best battery chemistry for solar, with one big caveat: cold charging. Here is what happens below freezing and how to work around it.',
    category: 'Power Basics',
    readTime: '8 min read',
    tags: ['LiFePO4', 'Winter', 'Batteries'],
    image: '/images/blog/lifepo4-battery-cold-weather.jpg',
    imageCredit: { author: 'hikingqueen', source: 'https://www.flickr.com/photos/25538843@N02/11802721455', ...ccBy },
    related: ['power-station-storage-maintenance', '12v-fridge-off-grid-power', 'winter-power-outage-checklist', 'charge-power-station-from-car']
  },
  {
    slug: '12v-vs-24v-vs-48v-solar-system',
    title: '12V vs 24V vs 48V: Choosing Your Solar System Voltage',
    seoTitle: '12V vs 24V vs 48V Solar System: Which Voltage?',
    description: 'Higher voltage means lower current, thinner cables and cheaper controllers. A simple rule for choosing 12V, 24V or 48V, with worked wiring examples.',
    excerpt: 'System voltage is the first decision in any off-grid build and the hardest to change later. Here is how current, cable size and controller cost decide it.',
    category: 'Power Basics',
    readTime: '9 min read',
    tags: ['System Voltage', 'Off-Grid', 'Wiring'],
    image: '/images/blog/12v-vs-24v-vs-48v-solar-system.jpg',
    imageCredit: { author: 'sridgway', source: 'https://www.flickr.com/photos/68132273@N00/11868865785', ...ccBy },
    related: ['mppt-vs-pwm-charge-controller', 'tiny-house-solar-system', 'well-pump-power-outage', 'why-solar-panels-produce-less-than-rated']
  },
  {
    slug: 'mppt-vs-pwm-charge-controller',
    title: 'MPPT vs PWM Charge Controllers: Is MPPT Worth the Money?',
    seoTitle: 'MPPT vs PWM Charge Controller: Is MPPT Worth It?',
    description: 'PWM controllers pull panel voltage down to battery voltage and waste the difference. How much power MPPT recovers, and when PWM is still good enough.',
    excerpt: 'A PWM controller can throw away a quarter of your panel output. We show the math for a 100W panel and explain when the cheaper controller is still the right call.',
    category: 'Power Basics',
    readTime: '8 min read',
    tags: ['Charge Controller', 'MPPT', 'PWM'],
    image: '/images/blog/mppt-vs-pwm-charge-controller.jpg',
    imageCredit: { author: 'kasparsdambis', source: 'https://www.flickr.com/photos/87890875@N06/32933991946', ...ccBy },
    related: ['12v-vs-24v-vs-48v-solar-system', 'why-solar-panels-produce-less-than-rated', 'portable-solar-panel-buying-guide', 'tiny-house-solar-system']
  },
  {
    slug: 'why-solar-panels-produce-less-than-rated',
    title: 'Why Your Solar Panel Produces Less Than Its Rated Watts',
    seoTitle: 'Why Solar Panels Produce Less Than Rated Watts',
    description: 'A 100W panel rarely shows 100W. Lab test conditions, heat, sun angle, dirt and wiring losses explained, plus a realistic factor to use when you size a system.',
    excerpt: 'Seeing 70W from a 100W panel is normal, not a fault. Here is where the missing watts go and the number to plan with instead of the label.',
    category: 'Power Basics',
    readTime: '8 min read',
    tags: ['Solar Panels', 'Output', 'Efficiency'],
    image: '/images/blog/why-solar-panels-produce-less-than-rated.jpg',
    imageCredit: { author: 'rawpixel.com', source: 'https://www.rawpixel.com/image/3339452/free-photo-image-solar-energy-photovoltaic-environmental', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    related: ['mppt-vs-pwm-charge-controller', 'portable-solar-panel-buying-guide', 'watts-vs-watt-hours-explained', 'tiny-house-solar-system']
  },
  {
    slug: 'power-station-storage-maintenance',
    title: 'How to Store and Maintain a Portable Power Station',
    seoTitle: 'How to Store a Portable Power Station (and Make It Last)',
    description: 'The best charge level for storage, how often to top up, safe temperatures and the habits that keep a power station or lithium battery healthy for 10 years.',
    excerpt: 'A power station that sits in a closet between storms needs a little care. Storage charge, temperature and top-up schedules that protect the battery.',
    category: 'Power Basics',
    readTime: '7 min read',
    tags: ['Maintenance', 'Storage', 'Batteries'],
    image: '/images/blog/power-station-storage-maintenance.jpg',
    imageCredit: { author: 'Wesley Fryer', source: 'https://www.flickr.com/photos/31442459@N00/8081550592', ...ccBy },
    related: ['lifepo4-battery-cold-weather', 'pass-through-charging-ups-power-station', 'watts-vs-watt-hours-explained', 'charge-power-station-from-car']
  },

  // Van life & mobile cluster
  {
    slug: 'portable-solar-panel-buying-guide',
    title: 'Portable Solar Panel Buying Guide: Folding vs Rigid and What Specs Matter',
    seoTitle: 'Portable Solar Panel Buying Guide (Folding vs Rigid)',
    description: 'How to choose a portable solar panel: wattage, voltage limits, connectors, durability, folding vs rigid, and how many watts refill a power station in a day.',
    excerpt: 'The wrong panel either cannot recharge your power station in a day or will not plug into it at all. The specs that matter, and the ones that are just marketing.',
    category: 'Van Life & RV',
    readTime: '9 min read',
    tags: ['Portable Solar', 'Buying Guide', 'Camping'],
    image: '/images/blog/portable-solar-panel-buying-guide.jpg',
    imageCredit: { author: 'docentjoyce', source: 'https://www.flickr.com/photos/99003655@N00/9697719740', ...ccBy },
    related: ['why-solar-panels-produce-less-than-rated', 'mppt-vs-pwm-charge-controller', 'charge-power-station-from-car', '12v-fridge-off-grid-power']
  },
  {
    slug: 'charge-power-station-from-car',
    title: 'Charging a Power Station From Your Car: 12V Socket vs Alternator Charger',
    seoTitle: 'How to Charge a Power Station From Your Car',
    description: 'A car 12V socket delivers only about 100-120W. How long car charging takes, the risk to your starter battery, and why alternator chargers are much faster.',
    excerpt: 'Charging while you drive sounds free. Through a cigarette-lighter socket it is painfully slow. Here is the math, and the faster wired alternative.',
    category: 'Van Life & RV',
    readTime: '8 min read',
    tags: ['Car Charging', 'Road Trip', 'DC-DC'],
    image: '/images/blog/charge-power-station-from-car.jpg',
    imageCredit: { author: 'Podknox', source: 'https://www.flickr.com/photos/91198056@N00/2640201676', ...ccBy },
    related: ['12v-fridge-off-grid-power', 'portable-solar-panel-buying-guide', 'lifepo4-battery-cold-weather', 'power-station-storage-maintenance']
  },
  {
    slug: '12v-fridge-off-grid-power',
    title: 'Powering a 12V Fridge Off-Grid: Battery and Solar Sizing',
    seoTitle: '12V Fridge Power Use: Battery & Solar Sizing',
    description: 'How much power a 12V compressor fridge uses, why thermoelectric coolers drain batteries, and the battery and solar size you need to run one for days.',
    excerpt: 'A compressor fridge is the biggest daily load in most camper and overland setups. Real consumption figures and a sizing method that keeps food cold.',
    category: 'Van Life & RV',
    readTime: '8 min read',
    tags: ['12V Fridge', 'Overlanding', 'Van Life'],
    image: '/images/blog/12v-fridge-off-grid-power.jpg',
    imageCredit: { author: 'Gareth1953 All Right Now', source: 'https://www.flickr.com/photos/40837632@N05/3795865226', ...ccBy },
    related: ['charge-power-station-from-car', 'portable-solar-panel-buying-guide', 'lifepo4-battery-cold-weather', 'chest-freezer-power-station', '/guides/boat-solar-power']
  },

  // DIY & installation
  {
    slug: 'tiny-house-solar-system',
    title: 'Tiny House Solar System Sizing: A Complete Worked Example',
    seoTitle: 'Tiny House Solar System Sizing: Worked Example',
    description: 'Size an off-grid solar system for a tiny house step by step: daily load, winter sun hours, panel array, LiFePO4 battery bank, inverter and backup charging.',
    excerpt: 'We size a full off-grid system for a typical tiny house, from the appliance list to the battery bank, so you can repeat the process with your own numbers.',
    category: 'DIY & Installation',
    readTime: '11 min read',
    tags: ['Tiny House', 'Off-Grid', 'System Sizing'],
    image: '/images/blog/tiny-house-solar-system.jpg',
    imageCredit: { author: 'nicolas.boullosa', source: 'https://www.flickr.com/photos/90802476@N00/4051899679', ...ccBy },
    related: ['12v-vs-24v-vs-48v-solar-system', 'mppt-vs-pwm-charge-controller', 'why-solar-panels-produce-less-than-rated', 'space-heater-solar-generator']
  },
  {
    slug: 'power-tools-solar-generator-jobsite',
    title: 'Running Power Tools on a Solar Generator: Saws, Drills and Compressors',
    seoTitle: 'Can a Solar Generator Run Power Tools? Jobsite Guide',
    description: 'Running and surge watts for saws, drills and compressors, how much battery a day of work takes, and which tools a portable power station struggles with.',
    excerpt: 'A quiet, fume-free power station is great on a jobsite or remote project, if it can handle the startup kick of a saw. Here is what works and what does not.',
    category: 'DIY & Installation',
    readTime: '8 min read',
    tags: ['Power Tools', 'Jobsite', 'Surge'],
    image: '/images/blog/power-tools-solar-generator-jobsite.jpg',
    imageCredit: { author: 'Russ TAH', source: 'https://www.flickr.com/photos/182829372@N05/48350787277', ...ccBy },
    related: ['surge-watts-vs-running-watts', 'watts-vs-watt-hours-explained', 'power-station-storage-maintenance', 'portable-solar-panel-buying-guide', '/guides/shed-solar-power']
  }
].map(p => ({ ...p, date: '2026-11-04', author: 'TheLoadCalc Team', path: `/blog/${p.slug}` }))

export const getBlogPostMeta = slug => blogPosts.find(p => p.slug === slug)
