// lib/guides/guides.js
// Metadata for the data-driven guides served by app/guides/[slug]. Bodies live in lib/guides/content/*.
// The guides index, lib/seo.js, the sitemap, search and the social content library read from this list.
// `related` entries are site paths.

export const guides = [
  // Planning & sizing
  {
    slug: 'solar-power-for-beginners',
    title: 'Solar Power for Beginners: How an Off-Grid System Works',
    seoTitle: 'Solar Power for Beginners: How Solar Systems Work',
    description: 'A plain-English introduction to solar power: panels, charge controllers, batteries and inverters, how they fit together, and how to plan your first system.',
    excerpt: 'Panels, controllers, batteries and inverters explained in plain English, with the five numbers you need before you buy anything.',
    category: 'Planning & Sizing',
    readTime: '12 min read',
    image: '/images/guides/solar-power-for-beginners.jpg',
    imageCredit: { author: 'Unknown', source: 'https://www.rawpixel.com/image/3340822/free-photo-image-solar-panels-asphalt-automobile', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    related: ['/guides/off-grid-solar-system-sizing', '/guides/grid-tie-vs-off-grid-vs-hybrid', '/wiring-diagrams/basic-off-grid', '/blog/watts-vs-watt-hours-explained']
  },
  {
    slug: 'off-grid-solar-system-sizing',
    title: 'How to Size an Off-Grid Solar System: Step-by-Step',
    seoTitle: 'How to Size an Off-Grid Solar System (Step-by-Step)',
    description: 'Size an off-grid solar system in six steps: daily energy, battery bank, solar array, charge controller, inverter and backup charging, with a worked example.',
    excerpt: 'Six steps from your appliance list to a complete component list, with the formulas and a worked example you can copy.',
    category: 'Planning & Sizing',
    readTime: '14 min read',
    image: '/images/guides/off-grid-solar-system-sizing.jpg',
    imageCredit: { author: 'DFID - UK Department for International Development', source: 'https://www.flickr.com/photos/14214150@N02/20942710613', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/guides/how-to-choose-solar-batteries', '/guides/how-to-choose-an-inverter', '/wiring-diagrams/generator-backup-off-grid', '/blog/tiny-house-solar-system']
  },
  {
    slug: 'grid-tie-vs-off-grid-vs-hybrid',
    title: 'Grid-Tie vs Off-Grid vs Hybrid Solar: Which System Is Right for You?',
    seoTitle: 'Grid-Tie vs Off-Grid vs Hybrid Solar Systems',
    description: 'How grid-tie, off-grid and hybrid solar systems work, what each costs, whether they keep the lights on in an outage, and how to choose between them.',
    excerpt: 'The three ways to use solar at home, compared on cost, outage protection and complexity, so you can pick the right architecture.',
    category: 'Planning & Sizing',
    readTime: '11 min read',
    image: '/images/guides/grid-tie-vs-off-grid-vs-hybrid.jpg',
    imageCredit: { author: 'A Siegel', source: 'https://www.flickr.com/photos/66322003@N00/4810533075', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/grid-tie-microinverter', '/wiring-diagrams/hybrid-inverter-battery', '/guides/off-grid-solar-system-sizing', '/guides/whole-home-solar']
  },

  // Buying guides
  {
    slug: 'how-to-choose-an-inverter',
    title: 'How to Choose an Inverter for Solar and Battery Systems',
    seoTitle: 'How to Choose a Solar Inverter (Off-Grid & Hybrid)',
    description: 'Pure sine vs modified sine, inverter vs inverter-charger, continuous and surge ratings, idle draw and split-phase output: how to choose the right inverter.',
    excerpt: 'Continuous and surge ratings, inverter-chargers, idle draw and 240V output: everything that separates a good inverter choice from an expensive mistake.',
    category: 'Buying Guides',
    readTime: '12 min read',
    image: '/images/guides/how-to-choose-an-inverter.jpg',
    imageCredit: { author: 'Grand Canyon NPS', source: 'https://www.flickr.com/photos/50693818@N08/4690547217', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/ac-subpanel', '/wiring-diagrams/split-phase-240v-inverters', '/blog/surge-watts-vs-running-watts', '/guides/how-to-choose-solar-batteries']
  },
  {
    slug: 'how-to-choose-solar-batteries',
    title: 'How to Choose Solar Batteries: LiFePO4, AGM and Server-Rack Packs',
    seoTitle: 'How to Choose Solar Batteries (LiFePO4 vs AGM)',
    description: 'How to choose a solar battery: chemistry, usable capacity, cycle life, BMS features, voltage, cold-weather charging and cost per kWh over the battery\'s life.',
    excerpt: 'Chemistry, usable capacity, BMS features and lifetime cost per kWh: a practical framework for choosing the battery your system depends on.',
    category: 'Buying Guides',
    readTime: '12 min read',
    image: '/images/guides/how-to-choose-solar-batteries.jpg',
    imageCredit: { author: 'sridgway', source: 'https://www.flickr.com/photos/68132273@N00/14141342129', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/parallel-battery-bank-balanced', '/guides/battery-monitor-setup', '/blog/lifepo4-battery-cold-weather', '/guides/off-grid-solar-system-sizing']
  },
  {
    slug: 'how-to-choose-a-charge-controller',
    title: 'How to Choose a Solar Charge Controller',
    seoTitle: 'How to Choose a Solar Charge Controller (Sizing Guide)',
    description: 'Size and choose a solar charge controller: MPPT vs PWM, current rating, max PV voltage, cold-weather Voc, battery profiles and when to use two controllers.',
    excerpt: 'Current rating, maximum PV voltage, battery profiles and the cold-morning voltage check that protects your controller.',
    category: 'Buying Guides',
    readTime: '10 min read',
    image: '/images/guides/how-to-choose-a-charge-controller.jpg',
    imageCredit: { author: 'kasparsdambis', source: 'https://www.flickr.com/photos/87890875@N06/32131143464', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/multiple-charge-controllers', '/wiring-diagrams/charge-controller', '/blog/mppt-vs-pwm-charge-controller', '/guides/solar-fuse-and-breaker-sizing']
  },

  // Installation & safety
  {
    slug: 'solar-cable-and-connector-guide',
    title: 'Solar Cables and Connectors: Wire Gauge, MC4s and Lugs',
    seoTitle: 'Solar Wire Gauge, MC4 Connectors & Battery Lugs Guide',
    description: 'Choose the right solar cable and connectors: PV wire vs battery cable, gauge by current and voltage drop, MC4 crimping, lugs, heat shrink and routing.',
    excerpt: 'Picking wire gauge, PV cable and connectors, and crimping MC4s and battery lugs properly, so your system does not lose power or start a fire.',
    category: 'Installation & Safety',
    readTime: '11 min read',
    image: '/images/guides/solar-cable-and-connector-guide.jpg',
    imageCredit: { author: 'Beige Alert', source: 'https://www.flickr.com/photos/53332339@N00/49815430462', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/guides/solar-fuse-and-breaker-sizing', '/wiring-diagrams/dc-fuse-block-busbar', '/guides/how-to-wire-solar-system', '/guides/solar-system-troubleshooting']
  },
  {
    slug: 'solar-fuse-and-breaker-sizing',
    title: 'Solar Fuse and Breaker Sizing: Protecting Every Wire',
    seoTitle: 'Solar Fuse & Breaker Sizing Guide (DC Systems)',
    description: 'Where fuses and breakers go in a solar system and how to size them: battery main fuses, controller and inverter circuits, PV string fuses and DC distribution.',
    excerpt: 'Every positive wire leaving a battery needs protection. Where fuses and breakers go, how to size them, and which types handle DC safely.',
    category: 'Installation & Safety',
    readTime: '11 min read',
    image: '/images/guides/solar-fuse-and-breaker-sizing.jpg',
    imageCredit: { author: 'JJ', source: 'https://commons.wikimedia.org/w/index.php?curid=25730190', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/dc-fuse-block-busbar', '/wiring-diagrams/system-grounding', '/guides/solar-cable-and-connector-guide', '/guides/how-to-choose-a-charge-controller']
  },
  {
    slug: 'solar-panel-maintenance',
    title: 'Solar Panel Maintenance and Cleaning: A Seasonal Checklist',
    seoTitle: 'Solar Panel Maintenance & Cleaning Checklist',
    description: 'How and when to clean solar panels, what to inspect each season, battery and connection checks, and the maintenance that keeps an off-grid system producing.',
    excerpt: 'A seasonal checklist for panels, wiring, batteries and controllers, plus how to clean panels without damaging them.',
    category: 'Installation & Safety',
    readTime: '9 min read',
    image: '/images/guides/solar-panel-maintenance.jpg',
    imageCredit: { author: 'Avinash Kaushik', source: 'https://www.flickr.com/photos/7855449@N06/3669187008', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/guides/solar-system-troubleshooting', '/blog/why-solar-panels-produce-less-than-rated', '/blog/power-station-storage-maintenance', '/guides/battery-monitor-setup']
  },
  {
    slug: 'solar-system-troubleshooting',
    title: 'Solar System Troubleshooting: Diagnosing Common Problems',
    seoTitle: 'Solar System Troubleshooting Guide (Step-by-Step)',
    description: 'Diagnose low solar output, batteries that will not charge, inverter shutdowns and voltage drop with a multimeter and a step-by-step troubleshooting process.',
    excerpt: 'Low output, batteries that never fill, inverters that shut off: a step-by-step process with a multimeter to find the real fault.',
    category: 'Installation & Safety',
    readTime: '12 min read',
    image: '/images/guides/solar-system-troubleshooting.jpg',
    imageCredit: { author: 'tony_duell', source: 'https://www.flickr.com/photos/43851301@N02/9624987225', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/guides/solar-panel-maintenance', '/guides/battery-monitor-setup', '/guides/solar-cable-and-connector-guide', '/blog/surge-watts-vs-running-watts']
  },

  // How-to
  {
    slug: 'ground-mount-solar-installation',
    title: 'How to Install a Ground-Mount Solar Array',
    seoTitle: 'How to Install a Ground-Mount Solar Array (DIY Guide)',
    description: 'Plan and build a ground-mount solar array: siting, tilt and row spacing, foundations, racking, trenching, grounding and wiring the array to your system.',
    excerpt: 'Siting, foundations, racking, trenching and grounding: how to build a ground mount that survives wind, snow and decades of sun.',
    category: 'How-To Guides',
    readTime: '13 min read',
    image: '/images/guides/ground-mount-solar-installation.jpg',
    imageCredit: { author: 'radix.822', source: 'https://www.flickr.com/photos/201975712@N02/54210873950', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/system-grounding', '/guides/how-to-install-solar-panels', '/guides/off-grid-cabin-solar', '/guides/solar-cable-and-connector-guide']
  },
  {
    slug: 'battery-monitor-setup',
    title: 'How to Install and Set Up a Battery Monitor (Shunt)',
    seoTitle: 'How to Install a Battery Monitor & Shunt',
    description: 'Why voltage is a poor fuel gauge, how a shunt-based battery monitor works, how to wire one correctly, and the settings that make its state of charge accurate.',
    excerpt: 'A shunt-based monitor is the only accurate fuel gauge for a lithium battery. How to wire it so every amp is counted, and how to set it up.',
    category: 'How-To Guides',
    readTime: '9 min read',
    image: '/images/guides/battery-monitor-setup.jpg',
    imageCredit: { author: 'Siyavula Education', source: 'https://www.flickr.com/photos/121935927@N06/13690843774', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/battery-monitor-shunt', '/guides/how-to-choose-solar-batteries', '/guides/solar-system-troubleshooting', '/wiring-diagrams/van-complete-system']
  },
  {
    slug: 'diy-solar-generator-build',
    title: 'How to Build a DIY Solar Generator',
    seoTitle: 'How to Build a DIY Solar Generator (Parts & Wiring)',
    description: 'Build your own portable solar generator: choosing the battery, inverter, charge controller and enclosure, the wiring and fusing, and whether DIY beats buying.',
    excerpt: 'Battery, inverter, controller, box and fuses: how to build a portable solar generator yourself, and an honest look at when DIY is worth it.',
    category: 'How-To Guides',
    readTime: '12 min read',
    image: '/images/guides/diy-solar-generator-build.jpg',
    imageCredit: { author: 'SparkFunElectronics', source: 'https://www.flickr.com/photos/41898857@N04/13468983693', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/portable-panel-power-station', '/wiring-diagrams/dc-fuse-block-busbar', '/guides/solar-fuse-and-breaker-sizing', '/guides/best-portable-power-stations', '/guides/shed-solar-power']
  },

  // Home & off-grid
  {
    slug: 'shed-solar-power',
    title: 'Solar Power for a Shed or Workshop',
    seoTitle: 'Shed Solar Power: How to Size & Install a Small System',
    description: 'Size and install a small solar system for a shed, garage or workshop: lights, chargers and small tools, with a parts list for 12V and 24V setups.',
    excerpt: 'Lights, a radio, battery chargers and the occasional tool: how to plan a small shed solar system that just works.',
    category: 'Home & Off-Grid',
    readTime: '10 min read',
    image: '/images/guides/shed-solar-power.jpg',
    imageCredit: { author: 'Jeremy Levine Design', source: 'https://www.flickr.com/photos/25186605@N04/6153823505', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/shed-solar-system', '/blog/power-tools-solar-generator-jobsite', '/guides/how-to-choose-a-charge-controller', '/guides/solar-power-for-beginners']
  },
  {
    slug: 'off-grid-cabin-solar',
    title: 'Off-Grid Cabin Solar: Weekend and Full-Time Systems',
    seoTitle: 'Off-Grid Cabin Solar System Guide',
    description: 'Plan solar for an off-grid cabin, weekend or full-time: loads, winter sizing, unattended operation, generator backup and freeze protection.',
    excerpt: 'Weekend retreat or full-time home in the woods: how to size, protect and leave a cabin solar system unattended through the seasons.',
    category: 'Home & Off-Grid',
    readTime: '12 min read',
    image: '/images/guides/off-grid-cabin-solar.jpg',
    imageCredit: { author: 'Unknown', source: 'https://www.rawpixel.com/image/3296963/free-photo-image-blizzard-building-cabin', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
    related: ['/wiring-diagrams/generator-backup-off-grid', '/guides/ground-mount-solar-installation', '/wiring-diagrams/split-phase-240v-inverters', '/guides/off-grid-solar-system-sizing']
  },
  {
    slug: 'solar-water-pumping',
    title: 'Solar Water Pumping for Wells, Livestock and Irrigation',
    seoTitle: 'Solar Water Pump Guide: Wells, Livestock & Irrigation',
    description: 'How solar water pumps work, how to size one from head and daily water need, solar-direct vs battery systems, and why a storage tank is the best battery.',
    excerpt: 'Store water, not electricity. How to size a solar pump from head and daily demand, and build a system that runs itself.',
    category: 'Home & Off-Grid',
    readTime: '11 min read',
    image: '/images/guides/solar-water-pumping.jpg',
    imageCredit: { author: 'USDAgov', source: 'https://www.flickr.com/photos/41284017@N08/17371070249', license: 'Public Domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' },
    related: ['/wiring-diagrams/solar-water-pump', '/blog/well-pump-power-outage', '/guides/ground-mount-solar-installation', '/guides/off-grid-cabin-solar']
  },
  {
    slug: 'apartment-solar-power',
    title: 'Solar Power for Apartments and Renters',
    seoTitle: 'Apartment Solar: Options for Renters & Balconies',
    description: 'Solar options for apartments and renters: balcony panels with a power station, plug-in solar rules, community solar, and how much you can really generate.',
    excerpt: 'No roof, no problem: balcony panels, power stations and community solar options for renters, with realistic output numbers.',
    category: 'Home & Off-Grid',
    readTime: '9 min read',
    image: '/images/guides/apartment-solar-power.jpg',
    imageCredit: { author: 'ell brown', source: 'https://www.flickr.com/photos/39415781@N06/7530209566', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/portable-panel-power-station', '/blog/portable-solar-panel-buying-guide', '/wiring-diagrams/grid-tie-microinverter', '/blog/keep-internet-on-power-outage']
  },

  // Van life & RV
  {
    slug: 'boat-solar-power',
    title: 'Boat Solar Power: Panels, Batteries and Marine Wiring',
    seoTitle: 'Boat Solar Power Guide: Panels, Batteries & Wiring',
    description: 'Add solar to a sailboat or powerboat: mounting options, sizing for anchor days, house and start bank management, marine-grade wiring and corrosion protection.',
    excerpt: 'Arches, biminis and rails: how to add solar to a boat, size it for days at anchor, and wire it to survive salt and vibration.',
    category: 'Van Life & RV',
    readTime: '11 min read',
    image: '/images/guides/boat-solar-power.jpg',
    imageCredit: { author: 'dejablu916', source: 'https://www.flickr.com/photos/36494823@N03/3367861409', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/marine-dual-bank', '/guides/how-to-choose-solar-batteries', '/wiring-diagrams/battery-monitor-shunt', '/blog/12v-fridge-off-grid-power']
  },
  {
    slug: 'rv-lithium-battery-upgrade',
    title: 'Upgrading Your RV to Lithium Batteries: A Complete Guide',
    seoTitle: 'RV Lithium Battery Upgrade Guide (Lead-Acid to LiFePO4)',
    description: 'Convert an RV from lead-acid to LiFePO4: sizing, converter and charger settings, alternator protection with a DC-DC charger, monitoring and cold-weather care.',
    excerpt: 'Swapping lead-acid for LiFePO4 is more than a battery swap. Chargers, the alternator and monitoring all need attention.',
    category: 'Van Life & RV',
    readTime: '12 min read',
    image: '/images/guides/rv-lithium-battery-upgrade.jpg',
    imageCredit: { author: 'vastateparksstaff', source: 'https://www.flickr.com/photos/37922399@N05/25882970572', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/dc-dc-charger-wiring', '/wiring-diagrams/shore-power-rv', '/wiring-diagrams/dual-battery-vehicle', '/blog/lifepo4-battery-cold-weather']
  },

  // Emergency preparedness
  {
    slug: 'hurricane-power-preparedness',
    title: 'Hurricane Power Preparedness: Backup Power Before the Storm',
    seoTitle: 'Hurricane Power Preparedness: Backup Power Plan',
    description: 'Prepare backup power for hurricane season: what to run during a long outage, solar and battery vs generators, fuel planning, safety and a pre-storm checklist.',
    excerpt: 'Hurricane outages can last weeks. How to plan backup power, fuel and solar recharging before the storm, and stay safe after it.',
    category: 'Emergency Preparedness',
    readTime: '11 min read',
    image: '/images/guides/hurricane-power-preparedness.jpg',
    imageCredit: { author: 'NASA Goddard Photo and Video', source: 'https://www.flickr.com/photos/24662369@N07/9128829908', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
    related: ['/wiring-diagrams/power-station-home-inlet', '/wiring-diagrams/hybrid-inverter-battery', '/blog/transfer-switch-vs-interlock-kit', '/guides/emergency-power-setup']
  }
].map(g => ({ ...g, date: '2026-11-04', author: 'TheLoadCalc Team', path: `/guides/${g.slug}` }))

export const getGuideMeta = slug => guides.find(g => g.slug === slug)
