// lib/guides/content/places.js
// Article bodies for location- and use-specific guides. Inline links use [text](/path), bold uses **text**.

export const placesContent = {
  'shed-solar-power': {
    intro: 'A shed or workshop is the perfect first solar project: modest loads, a short cable run and no need to involve the grid. Whether you want lights and a radio in a garden shed or regular power tools in a workshop, the process is the same: list the loads, choose the battery, size the panel and wire it safely.',
    takeaways: [
      'Lights, chargers and a radio: 100-200W of solar and a 50-100Ah LiFePO4 battery.',
      'Regular power tool use: 400W+ of solar, 2kWh+ storage and a 2,000W+ inverter.',
      'A ready-made power station with a panel is the simplest option.',
      'Protect batteries from freezing in unheated sheds.'
    ],
    sections: [
      {
        h: 'Typical shed loads',
        blocks: [
          { table: { head: ['Load', 'Watts', 'Use per day', 'Wh/day'], rows: [['LED lights (3)', '30W', '3 hours', '90'], ['Radio / speaker', '15W', '4 hours', '60'], ['Tool battery charger', '150W', '1.5 hours', '225'], ['Phone and laptop', '60W', '2 hours', '120'], ['Small fan', '30W', '3 hours', '90'], ['**Total**', '', '', '**585**']] } },
          'Saws, compressors and grinders change the picture because of their high running and startup watts. See [power tools on a solar generator](/blog/power-tools-solar-generator-jobsite).'
        ]
      },
      {
        h: 'Option 1: power station + panel',
        blocks: [
          'A 1kWh power station with a 200W folding or fixed panel covers the light-use table above, with nothing to wire. Bring the station indoors in freezing weather. Connecting the panel is covered in the [panels to power station diagram](/wiring-diagrams/portable-panel-power-station).'
        ]
      },
      {
        h: 'Option 2: a fixed 12V system',
        blocks: [
          'A permanent system is cheaper per watt-hour and runs lights automatically. The [shed solar wiring diagram](/wiring-diagrams/shed-solar-system) shows a 200W panel, 20A MPPT controller, 100Ah LiFePO4 battery, LED lights on the controller\'s load output and a small inverter.',
          { ol: [
            'Mount the panel facing the equator at a tilt near your latitude, on the roof or a frame.',
            'Install the controller and battery inside, near each other.',
            'Fuse the controller-to-battery and battery-to-inverter cables near the battery.',
            'Run lights on the load output so the controller disconnects them before the battery is flat.'
          ] },
          'Controller choice: see [how to choose a charge controller](/guides/how-to-choose-a-charge-controller). Fusing: see [fuse and breaker sizing](/guides/solar-fuse-and-breaker-sizing).'
        ]
      },
      {
        h: 'Option 3: a workshop system',
        blocks: [
          'For a workshop running a table saw or compressor, plan a 24V or 48V system with 2-5kWh of battery, 800W-2kW of panels and a 3,000W+ inverter with good surge capacity. The [off-grid sizing guide](/guides/off-grid-solar-system-sizing) walks through it.'
        ]
      },
      {
        h: 'Cold, heat and security',
        blocks: [
          { ul: [
            'LiFePO4 must not charge below freezing. Use a battery with low-temperature charge protection or self-heating. See [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather).',
            'Ventilate in summer; sheds can exceed battery temperature limits.',
            'Lock up portable panels and power stations.'
          ] },
          'New to solar? Start with [solar power for beginners](/guides/solar-power-for-beginners).'
        ]
      }
    ],
    faqs: [
      { q: 'How much solar do I need to power a shed?', a: 'For lights and charging, 100-200W of panels and a 50-100Ah lithium battery. For power tools, 400W+ and a much larger battery and inverter.' },
      { q: 'Can I run power tools in my shed on solar?', a: 'Yes, with a 2,000W+ pure sine inverter, at least 2kWh of battery and enough solar to recharge it.' },
      { q: 'Do I need a permit for shed solar?', a: 'Small standalone systems often do not, but rules vary. Permanent electrical work may need a permit, so check locally.' }
    ],
    cta: { title: 'Size your shed system', text: 'Add your loads to get panel and battery sizes.', links: [{ href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }, { href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }] }
  },

  'off-grid-cabin-solar': {
    intro: 'Cabins are where solar shines: often far from the grid, used seasonally, and simple in their needs. But cabin systems have their own challenges: they sit unattended for weeks, face freezing winters and must cope with heavy weekend use followed by days of nothing. This guide covers both weekend and full-time cabins.',
    takeaways: [
      'Weekend cabins can use a modest array that refills a big battery during the week.',
      'Full-time cabins must be sized for the darkest month, with generator backup.',
      'Unattended systems need freeze protection, low-voltage protection and ideally remote monitoring.',
      'Propane or wood for heat, cooking and hot water keeps the electrical system affordable.'
    ],
    sections: [
      {
        h: 'Weekend vs full-time',
        blocks: [
          { table: { head: ['', 'Weekend cabin', 'Full-time cabin'], rows: [['Daily use', '1-3kWh on weekends, near zero midweek', '3-8kWh every day'], ['Battery', '5-10kWh', '10-30kWh'], ['Solar', '400W-1.5kW', '2-6kW'], ['Inverter', '2-3kW', '4-8kW, often split-phase'], ['Backup', 'Optional', 'Generator recommended'], ['Sizing basis', 'Battery refills over 5 days', 'Worst month + autonomy']] } },
          'A weekend cabin\'s panels have all week to refill the battery, so the array can be smaller than daily use would suggest. Full-time cabins follow the standard process in [how to size an off-grid system](/guides/off-grid-solar-system-sizing).'
        ]
      },
      {
        h: 'Leaving the system unattended',
        blocks: [
          { ul: [
            '**Turn off the inverter** when you leave to save its idle draw; let solar keep the battery at a healthy level.',
            '**Freeze protection:** batteries in an unheated cabin need low-temperature charge cutoff or self-heating. See [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather).',
            '**Remote monitoring:** many controllers and inverters offer cellular or Wi-Fi monitoring, so you see problems before you arrive.',
            '**Pests and theft:** protect cables in conduit, and lock ground-mounted equipment.'
          ] }
        ]
      },
      {
        h: 'Array placement',
        blocks: [
          'Cabins are often among trees. A ground mount in a clearing usually outperforms a shaded roof and makes snow clearing easy. See the [ground-mount installation guide](/guides/ground-mount-solar-installation) and estimate the shading cost with the [shading impact calculator](/calculators/shading-impact).'
        ]
      },
      {
        h: 'Backup power and 240V',
        blocks: [
          'Full-time cabins should plan for a week of storms: an inverter-charger with a generator on auto-start handles it. See the [generator backup wiring diagram](/wiring-diagrams/generator-backup-off-grid). If you have a 240V well pump, you need split-phase output. See [split-phase stacked inverters](/wiring-diagrams/split-phase-240v-inverters) and [running a well pump in an outage](/blog/well-pump-power-outage).'
        ]
      },
      {
        h: 'Keep heat off the electrical system',
        blocks: [
          'Electric heating and hot water would multiply the system size several times. Wood stoves, propane heaters and on-demand propane water heaters keep cabin loads manageable. See [can a solar generator run a space heater](/blog/space-heater-solar-generator) for the math. For full off-grid living, see the [complete off-grid living guide](/guides/complete-off-grid-living-guide).'
        ]
      }
    ],
    faqs: [
      { q: 'How much solar do I need for an off-grid cabin?', a: 'A weekend cabin often needs 400W-1.5kW with 5-10kWh of battery. A full-time cabin typically needs 2-6kW with 10-30kWh and a generator.' },
      { q: 'Can I leave a solar system unattended at a cabin all winter?', a: 'Yes, with freeze-protected batteries, the inverter off, a healthy state of charge and ideally remote monitoring.' },
      { q: 'Should a cabin system be 12V, 24V or 48V?', a: 'Small weekend systems can be 12V or 24V. Anything over about 2kW of inverter should be 48V.' }
    ],
    cta: { title: 'Size your cabin system', text: 'Plan battery autonomy and array size for your season.', links: [{ href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }, { href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }] }
  },

  'solar-water-pumping': {
    intro: 'Pumping water is one of solar\'s best applications. Water is needed most when the sun is strongest, and a storage tank is a cheaper, longer-lasting "battery" than any lithium pack. Solar pumps supply homesteads, livestock, gardens and irrigation around the world. Here is how they work and how to size one.',
    takeaways: [
      'Solar-direct systems pump during daylight and store water, not electricity.',
      'Size from total dynamic head and daily water requirement, using the pump maker\'s curves.',
      'Tank storage of 2-3 days covers cloudy weather.',
      'MPPT pump controllers, float switches and dry-run protection make systems automatic.'
    ],
    sections: [
      {
        h: 'How a solar pump system works',
        blocks: [
          'Panels feed a pump controller, which optimizes power (MPPT), soft-starts the pump and protects it. The pump lifts water to a storage tank, and gravity or a small pressure pump delivers it. A float switch stops pumping when the tank is full. The [solar water pump wiring diagram](/wiring-diagrams/solar-water-pump) shows each connection.'
        ]
      },
      {
        h: 'Step 1: daily water requirement',
        blocks: [
          { table: { head: ['Use', 'Typical daily need'], rows: [['Household (per person)', '50-100 gallons (190-380 L)'], ['Beef cattle (per head)', '10-20+ gallons (40-75+ L), more in heat'], ['Horse', '8-12 gallons (30-45 L)'], ['Sheep / goats', '1-3 gallons (4-11 L)'], ['Garden drip irrigation', 'Depends on area and climate']] } },
          'Plan for the hottest month, when needs peak.'
        ]
      },
      {
        h: 'Step 2: total dynamic head',
        blocks: [
          'Total dynamic head (TDH) is the vertical lift from the water level in the well to the top of the tank, plus pipe friction, plus any pressure needed at the outlet. A pump that moves plenty of water at 50 feet of head may move very little at 300 feet.',
          '**Hydraulic power (W) ≈ flow (L/s) × head (m) × 9.81**, then divide by pump efficiency (often 40-70% for small solar pumps).'
        ]
      },
      {
        h: 'Step 3: pump and array',
        blocks: [
          'Manufacturers publish curves showing daily flow at a given head for a given array size and sun level. Pick the pump whose curve meets your daily need at your head in the worst month, and use the recommended array, often 1.2-1.5× the pump\'s power so it starts earlier and runs later. Check sun hours with the [solar irradiance by city calculator](/calculators/solar-irradiance-by-city).',
          { tip: 'Low-yield wells need a pump sized to the well\'s recovery rate, with dry-run protection that pauses the pump when water runs low.' }
        ]
      },
      {
        h: 'Battery or solar-direct?',
        blocks: [
          { table: { head: ['', 'Solar-direct + tank', 'Battery system'], rows: [['Cost', 'Lower', 'Higher'], ['Maintenance', 'Minimal', 'Battery replacement over time'], ['Night pumping', 'No, use tank storage', 'Yes'], ['Best for', 'Livestock, irrigation, gravity-fed homes', 'Pressure on demand at night']] } },
          'For homes with a conventional 240V well pump on backup power, see [running a well pump during an outage](/blog/well-pump-power-outage). For mounting arrays at a remote well, see the [ground-mount installation guide](/guides/ground-mount-solar-installation), and for remote properties generally, the [off-grid cabin guide](/guides/off-grid-cabin-solar).'
        ]
      }
    ],
    faqs: [
      { q: 'How many solar panels do I need to run a water pump?', a: 'It depends on head and daily flow. Small homestead DC pumps run on 300-1,500W of panels; check the pump maker\'s sizing chart.' },
      { q: 'Can a solar pump work without batteries?', a: 'Yes. Most solar pumps are solar-direct, running in daylight and filling a storage tank.' },
      { q: 'How big should my water storage tank be?', a: 'Two to three days of water use is a common target to cover cloudy weather.' }
    ],
    cta: { title: 'Estimate solar output at your site', text: 'Find your sun hours and daily array production.', links: [{ href: '/calculators/solar-irradiance-by-city', label: 'Solar Irradiance by City' }, { href: '/calculators/solar-array-sizing', label: 'Solar Array Sizing' }] }
  },

  'apartment-solar-power': {
    intro: 'No roof of your own does not have to mean no solar. Renters and apartment dwellers can use balcony panels with a power station, plug-in "balcony solar" where it is allowed, or community solar subscriptions. The numbers are smaller than a rooftop system, but they are real, and a battery adds outage protection too.',
    takeaways: [
      'A 200-400W balcony panel can produce roughly 0.3-1.2kWh per day depending on orientation and season.',
      'A power station with a balcony panel needs no wiring or landlord approval for the electrical side.',
      'Plug-in grid-connected balcony solar is legal in some places; check local rules first.',
      'Community solar lets renters buy into a solar farm and receive bill credits.'
    ],
    sections: [
      {
        h: 'Option 1: balcony panel + power station',
        blocks: [
          'Mount one or two panels on a balcony railing or stand, and run a cable inside to a power station. Use it to charge devices, run a desk setup or keep the fridge and internet on in an outage. See [keeping the internet on during an outage](/blog/keep-internet-on-power-outage).',
          { table: { head: ['Panel setup', 'South-facing, good sun', 'East/west or partly shaded'], rows: [['200W, tilted', '~0.6-0.8kWh/day', '~0.3-0.5kWh/day'], ['200W, vertical on railing', '~0.4-0.6kWh/day', '~0.2-0.4kWh/day'], ['400W, tilted', '~1.2-1.5kWh/day', '~0.6-1.0kWh/day']] } },
          'Connection details are in the [panels to power station diagram](/wiring-diagrams/portable-panel-power-station), and panel choice in the [portable solar panel buying guide](/blog/portable-solar-panel-buying-guide).'
        ]
      },
      {
        h: 'Option 2: plug-in balcony solar',
        blocks: [
          'Plug-in systems use one or two panels with a small microinverter that plugs into an outlet and feeds power into your apartment\'s circuits, reducing what you draw from the grid. They are widespread in parts of Europe, and a growing number of US jurisdictions are allowing them, but rules vary widely, and some utilities require notification or prohibit them. Check local regulations and your lease first.',
          'They work like a miniature [microinverter grid-tie system](/wiring-diagrams/grid-tie-microinverter), and like any grid-tie system, they shut off in a power outage.'
        ]
      },
      {
        h: 'Option 3: community solar',
        blocks: [
          'In many US states, you can subscribe to a share of a local solar farm and receive credits on your electric bill, with nothing installed at home. It is often the biggest bill saving available to renters. Search your state\'s community solar programs or ask your utility.'
        ]
      },
      {
        h: 'Practical tips',
        blocks: [
          { ul: [
            'Secure panels against wind. Use proper railing mounts, never loose panels that could fall.',
            'Check your lease and building rules about balcony fixtures.',
            'Tilt panels when you can. Vertical mounting loses significant output in summer.',
            'Bring batteries indoors; avoid charging LiFePO4 below freezing.'
          ] },
          'Comparing all your options? See [grid-tie vs off-grid vs hybrid](/guides/grid-tie-vs-off-grid-vs-hybrid).'
        ]
      }
    ],
    faqs: [
      { q: 'Can I put solar panels on my apartment balcony?', a: 'Usually yes, with secure mounting and your landlord\'s permission for fixtures. A panel feeding a power station needs no electrical connection to the building.' },
      { q: 'Is plug-in balcony solar legal?', a: 'It depends on where you live. It is common in parts of Europe and allowed in some US jurisdictions. Check local rules and your utility before buying.' },
      { q: 'How much can a balcony solar panel save?', a: 'A 400W system might produce 300-450kWh a year in good conditions, which is a modest but real bill reduction.' }
    ],
    cta: { title: 'See what your balcony could produce', text: 'Estimate output for your location and orientation.', links: [{ href: '/calculators/solar-production-by-location', label: 'Solar Production by Location' }, { href: '/calculators/solar-panel-azimuth-loss', label: 'Azimuth Loss Calculator' }] }
  },

  'boat-solar-power': {
    intro: 'Solar can keep a boat\'s house bank topped up at anchor and on a mooring, running the fridge, electronics and lights without running the engine. Boats bring their own challenges: limited mounting space, shading from rigging, salt and vibration. Here is how to plan, mount and wire a marine solar system.',
    takeaways: [
      'Mount panels on an arch, bimini, dodger or rails, wherever they get least shade from the boom and rigging.',
      'Size for daily anchor loads; fridges and autopilots dominate.',
      'Use tinned wire, marine-grade connectors and fuses close to the battery.',
      'Charge the house bank and protect the start battery with an ACR or DC-DC charger.'
    ],
    sections: [
      {
        h: 'Typical daily loads at anchor (12V)',
        blocks: [
          { table: { head: ['Load', 'Ah/day'], rows: [['Refrigerator', '40-70'], ['Anchor light (LED)', '2-4'], ['Cabin lights (LED)', '5-10'], ['Electronics, phones, laptop', '10-25'], ['Water pump', '2-5'], ['Autopilot (sailing)', '30-100+'], ['Typical cruising total at anchor', '70-120']] } },
          'A 100Ah/day boat needs roughly 300-400W of panels in sunny cruising grounds. See the [12V fridge guide](/blog/12v-fridge-off-grid-power) for the biggest load.'
        ]
      },
      {
        h: 'Mounting options',
        blocks: [
          { table: { head: ['Location', 'Pros', 'Cons'], rows: [['Stern arch / gantry', 'Little shade, rigid panels, big area', 'Cost, windage'], ['Bimini top', 'Uses existing structure', 'Flexible panels run hot and degrade faster'], ['Rails', 'Adjustable angle', 'Shade from rigging, smaller panels'], ['Deck', 'Simple', 'Shading, foot traffic']] } },
          'Shade from the boom or rigging is unavoidable on sailboats. Wire panels in parallel or give each panel its own controller so one shaded panel does not drag down the others. See the [shading impact calculator](/calculators/shading-impact).'
        ]
      },
      {
        h: 'Marine wiring practice',
        blocks: [
          { ul: [
            'Tinned copper wire and adhesive-lined heat shrink on every connection.',
            'Deck glands for cable entries; drip loops before them.',
            'Overcurrent protection close to the battery, per ABYC guidance.',
            'Mount controllers in dry, ventilated spaces.'
          ] },
          'The [marine dual bank diagram](/wiring-diagrams/marine-dual-bank) shows how the house and start banks connect, and the [battery monitor diagram](/wiring-diagrams/battery-monitor-shunt) shows how to track house bank usage.'
        ]
      },
      {
        h: 'Batteries',
        blocks: [
          'AGM is still common, but LiFePO4 house banks offer double the usable capacity at half the weight. Lithium on boats needs attention to alternator charging and BMS disconnects. See [how to choose solar batteries](/guides/how-to-choose-solar-batteries) and size the bank with the [battery autonomy calculator](/calculators/battery-autonomy).'
        ]
      }
    ],
    faqs: [
      { q: 'How much solar do I need on a sailboat?', a: 'Many cruising sailboats use 300-600W to cover a 70-120Ah daily load, depending on climate and whether an autopilot runs often.' },
      { q: 'Are flexible solar panels good for boats?', a: 'They fit biminis and curved surfaces, but run hotter and usually degrade faster than rigid panels. Use rigid panels where you can.' },
      { q: 'Should solar charge the start battery too?', a: 'Connect solar to the house bank. An ACR or charger can share surplus with the start battery.' }
    ],
    cta: { title: 'Size your house bank', text: 'Work out battery and solar needs for days at anchor.', links: [{ href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }, { href: '/calculators/solar-array-sizing', label: 'Solar Array Sizing' }] }
  },

  'rv-lithium-battery-upgrade': {
    intro: 'Replacing an RV\'s lead-acid batteries with LiFePO4 doubles usable capacity, cuts weight dramatically and removes maintenance. But it is not just a battery swap. The converter, solar controller and alternator charging all need checking, or the new batteries will never charge properly, or the alternator may be overloaded.',
    takeaways: [
      'Two 100Ah lead-acid batteries (~100Ah usable) can be replaced by one 100Ah LiFePO4 for the same usable capacity, or two for double.',
      'The converter/charger needs a LiFePO4 profile (typically 14.2-14.6V absorption).',
      'Use a DC-DC charger between the vehicle alternator and the lithium bank.',
      'Add a shunt-based monitor; voltage no longer indicates state of charge.'
    ],
    sections: [
      {
        h: 'Step 1: size the new bank',
        blocks: [
          'Lead-acid should only be discharged to about 50%; LiFePO4 can use 80-100%. Calculate your real daily use (a battery monitor or the [daily energy use calculator](/calculators/daily-energy-use) helps), then choose capacity for your boondocking days. See [how to choose solar batteries](/guides/how-to-choose-solar-batteries).'
        ]
      },
      {
        h: 'Step 2: converter / charger',
        blocks: [
          'Many older RV converters charge at about 13.6V, which keeps a lithium battery partly charged but never full, and some lack proper charging stages. Replace the converter with a lithium-capable model, or upgrade to an inverter-charger, as shown in the [RV shore power diagram](/wiring-diagrams/shore-power-rv).'
        ]
      },
      {
        h: 'Step 3: alternator charging',
        blocks: [
          'A lithium bank\'s low internal resistance can pull more current than the alternator was designed to supply for long periods, especially through a simple isolator. Install a DC-DC charger to limit current and charge correctly. See the [DC-DC charger wiring diagram](/wiring-diagrams/dc-dc-charger-wiring). For simpler AGM auxiliary setups, a VSR works. See the [dual battery diagram](/wiring-diagrams/dual-battery-vehicle).'
        ]
      },
      {
        h: 'Step 4: solar and settings',
        blocks: [
          { ul: [
            'Set the solar controller to its LiFePO4 profile (or custom values from the battery maker).',
            'Disable temperature compensation, which is meant for lead-acid.',
            'Make sure all chargers stop charging below freezing, either via the BMS or controller settings.',
            'Install a shunt-based battery monitor. See [battery monitor setup](/guides/battery-monitor-setup).'
          ] }
        ]
      },
      {
        h: 'Step 5: cold weather and storage',
        blocks: [
          'Mount lithium batteries inside the heated envelope if you camp in winter, or choose self-heating batteries. See [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather). For winter storage, leave batteries at 50-60% with all loads disconnected; lithium self-discharges very slowly. More RV detail: [RV power systems](/guides/rv-power-systems) and [RV solar installation](/blog/rv-solar-installation-guide).'
        ]
      }
    ],
    faqs: [
      { q: 'Can I just swap my RV lead-acid batteries for lithium?', a: 'Physically yes, but check the converter, solar controller and alternator charging. Without LiFePO4-compatible charging, the batteries will not charge fully, and the alternator may be overloaded.' },
      { q: 'Will my RV converter charge lithium batteries?', a: 'Many older converters charge lithium only partially. A lithium-specific converter or inverter-charger is recommended.' },
      { q: 'Do I need a DC-DC charger for RV lithium batteries?', a: 'For alternator charging in motorhomes and tow vehicles, it is strongly recommended to protect the alternator and charge correctly.' }
    ],
    cta: { title: 'Plan your lithium upgrade', text: 'Compare lead-acid and lithium runtime for your loads.', links: [{ href: '/calculators/lead-acid-vs-lithium-runtime', label: 'Lead-Acid vs Lithium Runtime' }, { href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }] }
  },

  'hurricane-power-preparedness': {
    intro: 'Hurricane outages are different from ordinary blackouts. Damage can keep power off for one to three weeks, fuel becomes scarce, and heat and humidity make cooling a health issue. Planning backup power before the season starts, with a mix of batteries, solar and fuel, makes those weeks far safer and more bearable.',
    takeaways: [
      'Plan for at least 7-14 days without grid power after a major hurricane.',
      'Batteries plus solar keep essentials running without fuel, which may be unavailable.',
      'Never run generators indoors, in garages or near windows. Carbon monoxide kills after every major storm.',
      'Prioritize refrigeration, fans, phones, medical devices and water.'
    ],
    sections: [
      {
        h: 'Priority loads after a hurricane',
        blocks: [
          { table: { head: ['Load', 'Power', 'Daily energy'], rows: [['Refrigerator', '100-250W running', '1-2kWh'], ['Box or ceiling fans (2)', '50-100W each', '0.6-1.5kWh'], ['Phones, radio, lights', '20-60W', '0.2-0.4kWh'], ['Internet', '20-40W', '0.5-1kWh'], ['CPAP (no humidifier)', '30-60W', '0.25-0.5kWh'], ['Window AC (small, 8 hrs)', '450-600W', '3.5-5kWh'], ['Well pump (if applicable)', '1-2kW', '0.5-1kWh']] } },
          'Without air conditioning, essentials total about 3-5kWh per day. A small window AC in one room roughly doubles that. Size your plan with the [daily energy use calculator](/calculators/daily-energy-use).'
        ]
      },
      {
        h: 'Batteries + solar vs generators',
        blocks: [
          { table: { head: ['', 'Battery + solar', 'Gas generator', 'Propane generator'], rows: [['Fuel after storm', 'None needed', 'Often scarce', 'Stores long-term'], ['Indoor use', 'Safe', 'Never', 'Never'], ['Noise', 'Silent', 'Loud', 'Loud'], ['High loads (AC, well)', 'Limited by size', 'Good', 'Good'], ['Running cost', 'Free after purchase', 'Fuel + maintenance', 'Fuel + maintenance']] } },
          'Many households combine them: a power station or home battery with 400-800W of solar for daily essentials, and a generator for short runs of heavy loads. Larger home systems use a [hybrid inverter with battery](/wiring-diagrams/hybrid-inverter-battery).'
        ]
      },
      {
        h: 'Connecting backup power to the house',
        blocks: [
          'Running extension cords for two weeks is miserable. A power inlet and interlock let a generator or large power station feed selected circuits safely. See the [power station to home inlet diagram](/wiring-diagrams/power-station-home-inlet) and [transfer switch vs interlock kit](/blog/transfer-switch-vs-interlock-kit). Have it installed well before the season.'
        ]
      },
      {
        h: 'Pre-storm checklist',
        blocks: [
          { ol: [
            'Charge every power station, battery, phone and power bank to 100%.',
            'Store portable solar panels indoors until the storm passes; check roof-mounted arrays afterwards before use.',
            'Fill generator fuel safely with stabilizer, or confirm propane supply.',
            'Turn the fridge and freezer to their coldest settings; freeze water jugs.',
            'Test the generator and transfer setup.',
            'Raise batteries and power stations above potential flood levels.',
            'Install battery-powered CO alarms.'
          ] }
        ]
      },
      {
        h: 'After the storm',
        blocks: [
          { ul: [
            'Keep generators outside, at least 20 feet from doors and windows, pointing away from the house.',
            'Do not use equipment that has been submerged.',
            'Recharge batteries with solar during the day; run heavy loads while the sun is up.',
            'Watch the forecast for the next storm and keep batteries topped up.'
          ] },
          'Related reading: [emergency power setup](/guides/emergency-power-setup), [blackout survival guide](/guides/blackout-survival-guide), and [how long a power station runs a chest freezer](/blog/chest-freezer-power-station).'
        ]
      }
    ],
    faqs: [
      { q: 'How long does power stay out after a hurricane?', a: 'From hours to several weeks depending on damage. After major hurricanes, outages of 1-3 weeks are common in hard-hit areas.' },
      { q: 'Can a solar generator run an air conditioner during a hurricane outage?', a: 'A small window AC can run on a large power station (2kWh+, 1,500W+ inverter) for several hours, especially with solar recharging during the day. Central AC needs a much larger system.' },
      { q: 'Should I leave solar panels up during a hurricane?', a: 'Permanently installed, engineered arrays stay up. Store portable panels indoors before the storm.' }
    ],
    cta: { title: 'Build your hurricane power plan', text: 'Work out how much battery and solar your essentials need.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }] }
  }
}
