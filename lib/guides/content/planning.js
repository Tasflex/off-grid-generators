// lib/guides/content/planning.js
// Article bodies for the planning and buying guides. Inline links use [text](/path), bold uses **text**.

export const planningContent = {
  'solar-power-for-beginners': {
    intro: 'Solar power can feel like a wall of jargon: Voc, MPPT, LiFePO4, pure sine. Underneath, every solar system does the same four things: collect energy, control charging, store energy and convert it into the kind of power your devices use. This guide explains each part in plain English and shows how they fit together, so you can plan a first system with confidence.',
    takeaways: [
      'Panels make DC power, a charge controller regulates it, batteries store it, and an inverter turns it into AC.',
      'Watts measure power right now; watt-hours measure energy over time. Size systems in watt-hours.',
      'Real panels produce about 75% of their label rating in good sun.',
      'Start with your daily energy use. Every other number follows from it.'
    ],
    sections: [
      {
        h: 'The four building blocks',
        blocks: [
          { table: { head: ['Component', 'What it does', 'Key spec'], rows: [['Solar panels', 'Turn sunlight into DC electricity', 'Watts (W), voltage (Vmp, Voc)'], ['Charge controller', 'Regulates charging so the battery is not damaged', 'Amps, max PV voltage, MPPT or PWM'], ['Battery', 'Stores energy for night and cloudy days', 'Watt-hours or amp-hours, chemistry'], ['Inverter', 'Converts battery DC into household AC', 'Continuous and surge watts']] } },
          'In a portable power station, the controller, battery and inverter are built into one box, so you only add panels. In a DIY system, you choose and wire each part, as shown in our [basic off-grid wiring diagram](/wiring-diagrams/basic-off-grid).'
        ]
      },
      {
        h: 'Watts vs watt-hours: the one concept to master',
        blocks: [
          'Watts (W) describe how fast power is used: a 60W laptop draws 60 watts while running. Watt-hours (Wh) describe how much energy is used over time: that laptop running 5 hours uses 300Wh. Batteries are rated in Wh (or Ah), and solar production is measured in Wh per day. Read [watts vs watt-hours explained](/blog/watts-vs-watt-hours-explained) if this is new.',
          '**Daily energy (Wh) = device watts × hours used per day**, added up for everything you want to run.'
        ]
      },
      {
        h: 'The three types of solar system',
        blocks: [
          { ul: [
            '**Grid-tie:** panels feed your home and export surplus to the grid. Lowest cost per watt, but no power in an outage.',
            '**Off-grid:** panels and batteries supply everything. Full independence, but you must size for winter.',
            '**Hybrid:** grid-tied with batteries for backup and self-consumption.'
          ] },
          'Compare them in detail in [grid-tie vs off-grid vs hybrid](/guides/grid-tie-vs-off-grid-vs-hybrid).'
        ]
      },
      {
        h: 'The five numbers to know before you buy',
        blocks: [
          { ol: [
            '**Daily energy use (Wh/day).** Use the [daily energy use calculator](/calculators/daily-energy-use).',
            '**Peak load (W).** The most power running at once, including motor startup. See [surge vs running watts](/blog/surge-watts-vs-running-watts).',
            '**Days of autonomy.** How long the battery must last without sun.',
            '**Peak sun hours** for your location and worst season. Try the [solar irradiance by city calculator](/calculators/solar-irradiance-by-city).',
            '**System voltage:** 12V, 24V or 48V, chosen by system size. See [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system).'
          ] },
          'With those five numbers, sizing is straightforward. Our [step-by-step sizing guide](/guides/off-grid-solar-system-sizing) walks through it.'
        ]
      },
      {
        h: 'Why panels make less than their rating',
        blocks: [
          'A 100W panel is rated in a lab at 25°C cell temperature and perfect sunlight. Outdoors, heat, sun angle, dust and wiring losses mean you typically see 70-85W at midday. For sizing, multiply panel watts × peak sun hours × 0.75. Details in [why solar panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated).'
        ]
      },
      {
        h: 'Where to go next',
        blocks: [
          'Not sure whether to build or buy? A portable power station with folding panels is the easiest start. See [best portable power stations](/guides/best-portable-power-stations). Ready to build? Choose your [battery](/guides/how-to-choose-solar-batteries), [inverter](/guides/how-to-choose-an-inverter) and [charge controller](/guides/how-to-choose-a-charge-controller), then plan the wiring with our [cable](/guides/solar-cable-and-connector-guide) and [fuse](/guides/solar-fuse-and-breaker-sizing) guides.'
        ]
      }
    ],
    faqs: [
      { q: 'Can solar panels charge a battery directly?', a: 'Not safely for long. A charge controller is needed to prevent overcharging and, with MPPT, to get the most power from the panel.' },
      { q: 'Do solar panels work on cloudy days?', a: 'Yes, at reduced output, often 10-25% of their clear-day production depending on cloud thickness.' },
      { q: 'What is the easiest way to start with solar?', a: 'A portable power station with one or two folding panels. Everything is built in, and you learn your real energy use before investing in a larger system.' }
    ],
    cta: { title: 'Start with your numbers', text: 'Find your daily energy use and the system that fits it.', links: [{ href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }, { href: '/calculators/solar-sizing', label: 'Solar Sizing Calculator' }] }
  },

  'off-grid-solar-system-sizing': {
    intro: 'Sizing an off-grid solar system comes down to six steps, each building on the last: work out daily energy, size the battery, size the array, choose the charge controller, choose the inverter, and plan backup charging. This guide gives the formula for each step and works through a complete example.',
    takeaways: [
      'Size everything from daily energy use, including inverter losses and idle draw.',
      'Battery: daily Wh × days of autonomy ÷ usable fraction.',
      'Array: daily Wh ÷ (worst-month sun hours × 0.75).',
      'Inverter: covers peak simultaneous load and the largest startup surge.'
    ],
    sections: [
      {
        h: 'Step 1: daily energy',
        blocks: [
          'List each device, its watts and hours per day, and add the watt-hours. Add about 10% for inverter losses on AC loads, plus the inverter\'s idle draw × 24 hours. The [daily energy use calculator](/calculators/daily-energy-use) does the math.',
          { table: { head: ['Example load', 'Wh/day'], rows: [['Fridge', '900'], ['Lights', '300'], ['Laptops and phones', '500'], ['Internet', '480'], ['Water pump', '100'], ['TV', '240'], ['Losses + inverter idle', '650'], ['**Total**', '**3,170**']] } }
        ]
      },
      {
        h: 'Step 2: battery bank',
        blocks: [
          '**Battery Wh = daily Wh × days of autonomy ÷ usable fraction**',
          'With 2 days of autonomy and LiFePO4 (90% usable): 3,170 × 2 ÷ 0.9 ≈ **7,000Wh**, for example one 48V 150Ah bank. Lead-acid at 50% usable would need nearly twice the rated capacity. Choosing a battery is covered in [how to choose solar batteries](/guides/how-to-choose-solar-batteries), and the [battery autonomy calculator](/calculators/battery-autonomy) handles other scenarios.'
        ]
      },
      {
        h: 'Step 3: solar array',
        blocks: [
          '**Array watts = daily Wh ÷ (worst-month peak sun hours × 0.75)**',
          'At 3 winter sun hours: 3,170 ÷ (3 × 0.75) ≈ **1,410W**, so about 1,500W of panels. Check your site with the [solar irradiance by city calculator](/calculators/solar-irradiance-by-city), set the angle with the [tilt angle calculator](/calculators/solar-panel-tilt-angle), and see [why panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated) for the 0.75 factor.'
        ]
      },
      {
        h: 'Step 4: charge controller',
        blocks: [
          '**Controller amps = array watts ÷ battery voltage × 1.25**',
          '1,500W ÷ 51.2V × 1.25 ≈ **37A**, so a 40A or larger MPPT. Confirm that the array\'s cold-weather Voc stays below the controller\'s maximum input voltage. Full detail in [how to choose a charge controller](/guides/how-to-choose-a-charge-controller).'
        ]
      },
      {
        h: 'Step 5: inverter',
        blocks: [
          'Add up everything that might run at once, replace the biggest motor\'s running watts with its startup watts, and choose an inverter whose surge rating exceeds that and whose continuous rating exceeds the running total by about 25%. For this example a 3,000W 48V inverter-charger fits. See [how to choose an inverter](/guides/how-to-choose-an-inverter) and the [inverter sizing calculator](/calculators/inverter-sizing).'
        ]
      },
      {
        h: 'Step 6: backup charging',
        blocks: [
          'Plan for the week of storms that exceeds your autonomy. Most off-grid homes add a generator connected to the inverter-charger, as shown in the [generator backup wiring diagram](/wiring-diagrams/generator-backup-off-grid). Grid-adjacent homes might use grid charging instead.',
          { table: { head: ['Component', 'Example result'], rows: [['Daily use', '3,170Wh'], ['Battery', '~7kWh, 48V LiFePO4'], ['Array', '~1,500W'], ['Controller', '40-60A MPPT'], ['Inverter', '3,000W 48V inverter-charger'], ['Backup', '3-4kW inverter generator']] } },
          'For a fully worked tiny house example, see [tiny house solar system sizing](/blog/tiny-house-solar-system), and for budget estimates, the [off-grid budget calculator](/calculators/off-grid-budget).'
        ]
      }
    ],
    faqs: [
      { q: 'How do I calculate the size of an off-grid solar system?', a: 'Find daily watt-hours, divide by worst-month sun hours × 0.75 for array watts, and multiply daily watt-hours by days of autonomy ÷ usable battery fraction for battery size.' },
      { q: 'How many days of battery autonomy do I need?', a: 'Two to three days is typical for homes with a backup generator. Without backup, three to five days.' },
      { q: 'Should I size for summer or winter?', a: 'Winter (or your worst month) if you live off-grid full time. Weekend or summer-only cabins can size for their season of use.' }
    ],
    cta: { title: 'Run the numbers automatically', text: 'Our system sizing calculator performs all six steps.', links: [{ href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }, { href: '/calculators/off-grid-budget', label: 'Off-Grid Budget Calculator' }] }
  },

  'grid-tie-vs-off-grid-vs-hybrid': {
    intro: 'Before choosing panels or batteries, decide how your system will relate to the grid. Grid-tie, off-grid and hybrid systems use similar parts but behave very differently in an outage, cost very different amounts, and suit different goals.',
    takeaways: [
      'Grid-tie is cheapest per watt and best for lowering bills, but shuts down in an outage.',
      'Off-grid gives full independence but must be sized for winter and needs backup charging.',
      'Hybrid adds batteries to a grid-tied system for backup and self-consumption.',
      'Your goal (savings, backup or independence) decides the architecture.'
    ],
    sections: [
      {
        h: 'Side-by-side comparison',
        blocks: [
          { table: { head: ['', 'Grid-tie', 'Off-grid', 'Hybrid'], rows: [['Batteries', 'None', 'Required', 'Yes'], ['Works in outages', 'No', 'Yes', 'Yes (backup loads)'], ['Cost per kW', 'Lowest', 'Highest', 'Middle-high'], ['Sizing', 'To offset annual use', 'To worst month + autonomy', 'Panels for savings, battery for backup'], ['Main benefit', 'Lower bills', 'Independence', 'Backup + savings'], ['Typical inverter', 'String or microinverters', 'Off-grid inverter-charger', 'Hybrid inverter']] } }
        ]
      },
      {
        h: 'Grid-tie: the money saver',
        blocks: [
          'Panels feed a string inverter or [microinverters](/wiring-diagrams/grid-tie-microinverter) that synchronize with the grid. Surplus is exported through a net meter. Because the grid acts as an unlimited battery, there is no storage cost. The catch: anti-islanding rules require the system to shut down when the grid fails, to protect line workers.'
        ]
      },
      {
        h: 'Off-grid: complete independence',
        blocks: [
          'Off-grid systems must cover every hour of every day from panels and batteries, so they are sized for the darkest month with days of autonomy, and usually include a generator for long storms. They make sense where grid connection is expensive or unavailable: cabins, ranches, remote homes. Start with [how to size an off-grid system](/guides/off-grid-solar-system-sizing) and the [complete off-grid living guide](/guides/complete-off-grid-living-guide).'
        ]
      },
      {
        h: 'Hybrid: the best of both',
        blocks: [
          'A [hybrid inverter with battery](/wiring-diagrams/hybrid-inverter-battery) powers a backup loads panel during outages and uses the battery daily to store solar for the evening or shift usage away from peak rates. It suits homeowners in storm-prone areas or on time-of-use tariffs. See [home battery backup](/blog/home-battery-backup-guide) for battery choices.'
        ]
      },
      {
        h: 'Which should you choose?',
        blocks: [
          { ul: [
            '**Mainly want lower bills, rare outages:** grid-tie. Add a portable power station for outages.',
            '**Frequent or long outages:** hybrid with a critical loads panel.',
            '**No grid, or very expensive connection:** off-grid.',
            '**Renting or no roof:** see [apartment solar options](/guides/apartment-solar-power).'
          ] },
          'Multi-orientation roofs work with any type. See the [east-west array diagram](/wiring-diagrams/east-west-array). For whole-house planning, see the [whole home solar guide](/guides/whole-home-solar).'
        ]
      }
    ],
    faqs: [
      { q: 'Does grid-tied solar work during a power outage?', a: 'No. Grid-tied inverters must shut down when the grid fails. You need batteries and a hybrid or backup-capable system to keep power on.' },
      { q: 'Is off-grid solar cheaper than being on the grid?', a: 'Rarely, if a grid connection is already available. Off-grid makes financial sense mainly where connecting to the grid is costly.' },
      { q: 'Can I add batteries to my grid-tie system later?', a: 'Usually yes, either by adding an AC-coupled battery system or replacing the inverter with a hybrid unit.' }
    ],
    cta: { title: 'Estimate your system size', text: 'Find out how much solar you need for your goal.', links: [{ href: '/calculators/solar-vs-grid-cost', label: 'Solar vs Grid Cost' }, { href: '/calculators/hybrid-solar-system-sizing', label: 'Hybrid System Sizing' }] }
  },

  'how-to-choose-an-inverter': {
    intro: 'The inverter is the bridge between your battery and your appliances, and the component most often chosen wrong. Too small and it trips every time the fridge starts; too large and it wastes energy all day. Here is how to choose the type, size and features that fit your system.',
    takeaways: [
      'Choose pure sine wave. Modified sine causes problems with motors and electronics.',
      'Continuous rating covers your running load; surge rating covers motor startup.',
      'An inverter-charger adds grid or generator charging and an automatic transfer switch.',
      'Idle draw can use 0.5-1kWh a day. It matters in off-grid systems.'
    ],
    sections: [
      {
        h: 'Inverter types',
        blocks: [
          { table: { head: ['Type', 'What it does', 'Best for'], rows: [['Standalone inverter', 'Battery DC to AC only', 'Vans, sheds, simple systems'], ['Inverter-charger', 'Inverts, charges from AC input, auto-transfers', 'RVs, off-grid homes with generator'], ['Hybrid inverter', 'Inverter-charger + solar MPPT + grid interaction', 'Grid-tied homes with batteries'], ['All-in-one off-grid', 'Inverter-charger + MPPT in one box', 'Cabins and off-grid homes'], ['Grid-tie inverter', 'Solar to grid only, no battery', 'Grid-tie systems']] } }
        ]
      },
      {
        h: 'Pure sine vs modified sine',
        blocks: [
          'Pure sine wave inverters produce power equivalent to the grid. Modified sine inverters are cheaper but make motors run hot and noisy, can damage some chargers and medical devices, and cause buzzing in audio equipment. For anything beyond a work light, choose pure sine. Compare with the [pure sine vs modified sine calculator](/calculators/pure-sine-vs-modified-sine).'
        ]
      },
      {
        h: 'Sizing: continuous and surge',
        blocks: [
          { ol: [
            'Add the running watts of everything that may run at the same time.',
            'Replace the largest motor\'s running watts with its startup watts. See [surge vs running watts](/blog/surge-watts-vs-running-watts).',
            'Choose a surge rating above that peak, and a continuous rating about 25% above the running total.'
          ] },
          'Oversizing has costs: bigger inverters draw more idle power and need heavier battery cables. The [inverter oversizing calculator](/calculators/inverter-oversizing) shows the trade-off, and the [inverter sizing calculator](/calculators/inverter-sizing) does the arithmetic.'
        ]
      },
      {
        h: 'Specs worth comparing',
        blocks: [
          { ul: [
            '**Battery voltage:** must match your bank (12V, 24V or 48V). See [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system).',
            '**Idle (no-load) draw:** 10-50W is common; search or eco modes cut it when nothing is running.',
            '**Efficiency:** 90-95% at typical loads. Check with the [inverter efficiency loss calculator](/calculators/inverter-efficiency-loss).',
            '**Output voltage:** 120V only, or 120/240V split-phase for well pumps and dryers. See [split-phase stacked inverters](/wiring-diagrams/split-phase-240v-inverters).',
            '**Charger current and AC input limit** for inverter-chargers.',
            '**Transfer time** if you need UPS-like behavior. See [pass-through charging and UPS mode](/blog/pass-through-charging-ups-power-station).',
            '**Low-frequency vs high-frequency:** transformer-based low-frequency units handle long motor surges better; high-frequency units are lighter and cheaper.'
          ] }
        ]
      },
      {
        h: 'Installation essentials',
        blocks: [
          'Keep battery cables short and heavy, fuse them at the battery, and give the inverter ventilation. Match the inverter to your battery\'s discharge limits with the [inverter-battery matching calculator](/calculators/inverter-battery-matching). For home backup, a [critical loads subpanel](/wiring-diagrams/ac-subpanel) keeps the inverter\'s load manageable, and the [inverter connection diagram](/wiring-diagrams/inverter-connection) shows the DC side.'
        ]
      }
    ],
    faqs: [
      { q: 'What size inverter do I need?', a: 'One whose continuous rating exceeds your running load by about 25% and whose surge rating exceeds your highest startup moment.' },
      { q: 'Is a bigger inverter always better?', a: 'No. Larger inverters have higher idle draw, cost more and need thicker cables. Size for your real peak load.' },
      { q: 'Do I need an inverter-charger?', a: 'If you will ever charge from shore power, the grid or a generator, yes. It also provides automatic transfer between sources.' }
    ],
    cta: { title: 'Size your inverter', text: 'Find the continuous and surge rating you need.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/inverter-battery-matching', label: 'Inverter-Battery Matching' }] }
  },

  'how-to-choose-solar-batteries': {
    intro: 'The battery is the most expensive component in most off-grid systems and the one that determines how long it lasts. LiFePO4 has become the default for good reasons, but within it there are big differences in BMS quality, cold-weather protection, voltage options and warranty. Here is how to choose.',
    takeaways: [
      'LiFePO4 offers the best lifetime value: 3,000+ cycles, 80-100% usable capacity and strong safety.',
      'Compare usable capacity and cost per kWh delivered over the battery\'s life, not sticker price per Ah.',
      'Check BMS current limits, low-temperature charge protection and communications.',
      'Choose battery voltage to match your system size: 12V small, 48V for homes.'
    ],
    sections: [
      {
        h: 'Battery chemistries compared',
        blocks: [
          { table: { head: ['Chemistry', 'Usable capacity', 'Cycle life', 'Maintenance', 'Best for'], rows: [['LiFePO4', '80-100%', '3,000-6,000+', 'None', 'Almost all new systems'], ['NMC lithium-ion', '80-90%', '1,000-2,000', 'None', 'Compact portable units'], ['AGM', '50%', '400-800', 'None', 'Low-cost, occasional use'], ['Flooded lead-acid', '50%', '500-1,200', 'Watering, equalizing', 'Budget off-grid with maintenance'], ['Gel', '50-60%', '500-1,000', 'None', 'Niche: deep discharges, heat']] } },
          'See the [battery technology explainer](/blog/solar-battery-technology-explained) for more on each chemistry.'
        ]
      },
      {
        h: 'Lifetime cost, not purchase price',
        blocks: [
          '**Cost per kWh delivered = price ÷ (capacity kWh × usable fraction × cycle life)**',
          'A $600 100Ah 12V AGM battery delivers about 0.64kWh per cycle for perhaps 600 cycles. A $500 100Ah 12V LiFePO4 delivers about 1.15kWh for 4,000 cycles. Per kWh delivered, lithium is many times cheaper. Run your own numbers with the [battery lifetime cost calculator](/calculators/battery-lifetime-cost) and [battery DoD degradation calculator](/calculators/battery-dod-degradation).'
        ]
      },
      {
        h: 'BMS features to check',
        blocks: [
          { ul: [
            '**Continuous and peak discharge current:** must cover your inverter. A 3,000W 12V inverter can draw 300A, beyond most single 100Ah batteries.',
            '**Low-temperature charge cutoff or self-heating:** essential for cold climates. See [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather).',
            '**Communications (CAN/RS485/Bluetooth):** lets inverters follow the battery\'s charge limits and shows cell data.',
            '**Series and parallel limits:** how many units you can combine.',
            '**Certifications** such as UL 9540A/UL 1973 for home installations, where required.'
          ] }
        ]
      },
      {
        h: 'Form factors and voltage',
        blocks: [
          { table: { head: ['Form factor', 'Typical voltage', 'Use'], rows: [['12V drop-in (Group 24/27/31)', '12.8V', 'Vans, RVs, boats'], ['Server-rack modules', '48V (51.2V)', 'Home and cabin systems'], ['Wall-mount home batteries', '48V or high voltage', 'Grid-tied backup'], ['DIY cell kits', 'Any', 'Experienced builders']] } },
          'Choosing voltage: see [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system). Combining batteries: see the [balanced parallel bank diagram](/wiring-diagrams/parallel-battery-bank-balanced) and [battery bank wiring](/wiring-diagrams/battery-bank).'
        ]
      },
      {
        h: 'Sizing and monitoring',
        blocks: [
          'Battery size comes from daily energy and days of autonomy, covered step by step in [how to size an off-grid system](/guides/off-grid-solar-system-sizing). Once installed, a shunt-based monitor is the only accurate fuel gauge for lithium. See [battery monitor setup](/guides/battery-monitor-setup). Shop [battery backups](/products/battery-backups) when you are ready.'
        ]
      }
    ],
    faqs: [
      { q: 'Is LiFePO4 worth the extra cost over AGM?', a: 'Usually yes. Higher usable capacity and many times the cycle life make LiFePO4 far cheaper per kWh delivered over its life.' },
      { q: 'How many batteries do I need for solar?', a: 'Divide your required battery watt-hours (daily use × days of autonomy ÷ usable fraction) by each battery\'s watt-hours.' },
      { q: 'Can I mix old and new batteries?', a: 'It is not recommended. Mismatched batteries share load unevenly and the bank ages to the weakest unit.' }
    ],
    cta: { title: 'Size your battery bank', text: 'Find capacity, count and layout for your system.', links: [{ href: '/calculators/battery-bank-sizing', label: 'Battery Bank Sizing' }, { href: '/calculators/battery-lifetime-cost', label: 'Battery Lifetime Cost' }] }
  },

  'how-to-choose-a-charge-controller': {
    intro: 'The charge controller decides how much of your panels\' power reaches the battery, and protects the battery from overcharging. Choosing one means picking MPPT or PWM, sizing the current rating, and making sure the maximum PV input voltage can handle your array on the coldest morning.',
    takeaways: [
      'MPPT is the right choice for nearly every system above about 200W.',
      'Current rating ≈ array watts ÷ battery voltage × 1.25.',
      'Cold-weather array Voc must stay below the controller\'s maximum input voltage.',
      'Program the correct battery profile, especially for LiFePO4.'
    ],
    sections: [
      {
        h: 'MPPT or PWM?',
        blocks: [
          'PWM controllers connect the panel directly to the battery, forcing the panel to operate at battery voltage and wasting the difference. MPPT controllers convert surplus voltage into extra current, typically recovering 10-30% more energy, and allow high-voltage strings. The full comparison is in [MPPT vs PWM](/blog/mppt-vs-pwm-charge-controller).'
        ]
      },
      {
        h: 'Sizing the current rating',
        blocks: [
          '**Controller amps = array watts ÷ nominal battery voltage × 1.25 (safety margin)**',
          { table: { head: ['Array', '12V battery', '24V battery', '48V battery'], rows: [['400W', '~40A', '~20A', '~10A'], ['800W', '~80A', '~40A', '~20A'], ['1,600W', 'Use 24V/48V', '~80A', '~40A'], ['3,000W', 'Use 48V', 'Use 48V', '~80A']] } },
          'Some MPPT controllers allow modest array oversizing and simply cap their output, which is useful in winter. Check the manual. The [charge controller sizing calculator](/calculators/charge-controller-sizing) does the math.'
        ]
      },
      {
        h: 'The cold-morning voltage check',
        blocks: [
          'Panel Voc rises as temperature falls, typically 10-20% above the rated Voc on a sub-freezing morning. Exceeding the controller\'s maximum PV voltage, even briefly, can destroy it.',
          '**String Voc (cold) ≈ panel Voc × panels in series × temperature correction (about 1.1-1.2)**',
          'Use the [PV string voltage calculator](/calculators/pv-string-voltage) with your coldest local temperature.',
          { warn: 'Overvoltage damage is usually not covered by warranty. Leave margin below the maximum input voltage.' }
        ]
      },
      {
        h: 'Features worth paying for',
        blocks: [
          { ul: [
            'Programmable LiFePO4 profile with adjustable absorption and float.',
            'Battery temperature sensor or BMS communication to stop charging in freezing conditions.',
            'Bluetooth or networking for monitoring and synchronizing multiple controllers.',
            'Load output with low-voltage disconnect for small systems.'
          ] }
        ]
      },
      {
        h: 'More than one array?',
        blocks: [
          'Arrays with different orientations or panel types each deserve their own controller, connected in parallel at the battery. See [two charge controllers on one battery](/wiring-diagrams/multiple-charge-controllers). Single-controller wiring is shown in the [charge controller diagram](/wiring-diagrams/charge-controller). Fuse the controller output close to the battery, as explained in [fuse and breaker sizing](/guides/solar-fuse-and-breaker-sizing). Shop [charge controllers](/products/charge-controllers).'
        ]
      }
    ],
    faqs: [
      { q: 'What size charge controller do I need for 400 watts of solar?', a: 'About 40A on a 12V battery, 20A on 24V or 10A on 48V, all with MPPT.' },
      { q: 'Can a charge controller handle more solar than its rating?', a: 'Many MPPT controllers allow some oversizing and limit output to their rated current. Never exceed the maximum input voltage.' },
      { q: 'Do I need a charge controller with a power station?', a: 'No. Power stations include an MPPT controller. Just stay within their solar input limits.' }
    ],
    cta: { title: 'Size your controller', text: 'Get the current rating and check string voltage.', links: [{ href: '/calculators/charge-controller-sizing', label: 'Charge Controller Sizing' }, { href: '/calculators/pv-string-voltage', label: 'PV String Voltage Calculator' }] }
  }
}
