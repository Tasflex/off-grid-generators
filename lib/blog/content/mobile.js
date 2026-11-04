// lib/blog/content/mobile.js
// Article bodies for the van life, mobile and DIY posts. Inline links use [text](/path), bold uses **text**.

export const mobileContent = {
  'portable-solar-panel-buying-guide': {
    intro: 'A portable solar panel turns a power station from a battery that runs down into a system that keeps going. But panels vary hugely in weight, durability and, critically, whether they will even plug into your power station. Here is how to choose one, and how many watts you actually need.',
    takeaways: [
      'Size panels so they can refill your power station in one day: panel watts ≈ station Wh ÷ (sun hours × 0.7).',
      'Check your power station\'s solar input voltage and current limits before buying.',
      'Folding panels are lighter and easier to carry; rigid panels are cheaper per watt and more durable.',
      'MC4 connectors are the most universal. Adapters handle the rest.'
    ],
    sections: [
      {
        h: 'How many watts do you need?',
        blocks: [
          'Work backward from the battery. To refill a power station in a single day of good sun:',
          '**Panel watts ≈ battery Wh ÷ (peak sun hours × 0.7)**',
          'The 0.7 covers the real-world losses we explain in [why solar panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated), plus imperfect aiming.',
          { table: { head: ['Power station', '5 sun hours (summer)', '3 sun hours (winter/cloudy)'], rows: [['300Wh', '~100W', '~150W'], ['500Wh', '~150W', '~250W'], ['1,000Wh', '~300W', '~500W'], ['2,000Wh', '~600W', '~1,000W']] } },
          'You do not always need a full refill. If you use 400Wh a day, size the panel for 400Wh. The [solar array sizing calculator](/calculators/solar-array-sizing) and [charge time calculator](/calculators/charge-time) work it out for your setup.'
        ]
      },
      {
        h: 'Match the panel to your power station',
        blocks: [
          'This is where most buying mistakes happen. Every power station lists a solar input range, such as "12-60V, 10A, 200W max". Check three things:',
          { ol: [
            '**Voltage:** the panel\'s open-circuit voltage (Voc), or the combined Voc of panels in series, must stay inside the input range, including on cold mornings when Voc rises.',
            '**Current:** panels in parallel add their current. Exceed the input current and the station simply caps it, which is safe but wasted.',
            '**Watts:** extra panel wattage beyond the input limit is clipped. A little oversizing helps on cloudy days; a lot is wasted money.'
          ] },
          'Example: two 100W panels with a Voc of 22V each. In series: 44V at about 5.5A, fine for a 12-60V input. In parallel: 22V at about 11A, which may exceed a 10A limit. Check yours with the [PV string voltage calculator](/calculators/pv-string-voltage).',
          { warn: 'Exceeding a power station\'s maximum input voltage can permanently damage it, and is usually not covered by warranty.' }
        ]
      },
      {
        h: 'Folding vs rigid panels',
        blocks: [
          { table: { head: ['', 'Folding (briefcase/blanket)', 'Rigid (framed glass)'], rows: [['Weight per 100W', '~4-5 kg (9-11 lb)', '~6-8 kg (13-17 lb)'], ['Cost per watt', 'Higher', 'Lower'], ['Durability', 'Good; fabric and laminate wear over years', 'Excellent; 25-year rated'], ['Setup', 'Kickstands, fast', 'Needs a stand or mount'], ['Best for', 'Camping, hiking, quick deployment', 'Semi-permanent setups, RV roofs, home backup']] } },
          'Many home-backup users buy rigid residential panels for value and lay them on a simple ground frame during outages. Campers and van owners usually pay more for folding panels they can move to chase the sun. For roof-mounted systems, see our [RV solar installation guide](/blog/rv-solar-installation-guide).'
        ]
      },
      {
        h: 'Specs that matter (and some that do not)',
        blocks: [
          { ul: [
            '**Cell type:** monocrystalline is standard now, typically 21-24% efficient. Higher efficiency means smaller and lighter for the same watts, not more energy per rated watt. See [monocrystalline vs polycrystalline](/calculators/monocrystalline-vs-polycrystalline).',
            '**Surface laminate:** ETFE coatings handle heat and UV better than cheaper PET.',
            '**Weather rating:** IP65 or better for the panel and junction box. Most panels are water resistant, not designed to sit in puddles.',
            '**Connectors:** MC4 is the universal standard. Power stations use XT60, Anderson, DC7909, DC8020 and others. Good panels include adapters; otherwise buy a quality adapter cable.',
            '**Cable length:** a long, thin extension costs watts. Use 10-12 AWG for runs over 15 feet. The [cable length power loss calculator](/calculators/cable-length-power-loss) shows the loss.',
            '**Built-in USB ports:** handy for phones, but they share the panel\'s output.'
          ] }
        ]
      },
      {
        h: 'Getting the most from a portable panel',
        blocks: [
          { ul: [
            'Aim directly at the sun and re-aim every 2-3 hours. That alone can add 20-30% per day.',
            'Keep the panel off hot ground. Air circulation keeps cells cooler and more efficient.',
            'Avoid even partial shade. One shaded section can cut output dramatically. Try the [shading impact calculator](/calculators/shading-impact).',
            'Leave the power station in the shade while the panel sits in the sun.'
          ] },
          'Your power station already has an MPPT controller built in. If you build a DIY battery system instead, read [MPPT vs PWM](/blog/mppt-vs-pwm-charge-controller). For days on the road, combine solar with [charging from your car](/blog/charge-power-station-from-car) to keep a [12V fridge](/blog/12v-fridge-off-grid-power) running. Browse [solar panels](/products/solar-panels) when you are ready.'
        ]
      }
    ],
    faqs: [
      { q: 'What size solar panel do I need for a 1000Wh power station?', a: 'About 300W to refill it in a day of good summer sun (5 peak sun hours), or 400-500W for winter and cloudy conditions.' },
      { q: 'Can I use any solar panel with my power station?', a: 'Only if the panel\'s voltage and current fall within the station\'s solar input limits and you have the right connector or adapter.' },
      { q: 'Are folding solar panels worth it?', a: 'For camping and frequent moving, yes: they are lighter and quicker to set up. For semi-permanent home backup, rigid panels give more watts per dollar and last longer.' }
    ],
    cta: { title: 'How long will your panels take?', text: 'Enter your panel watts and battery size to see charge time.', links: [{ href: '/calculators/charge-time', label: 'Charge Time Calculator' }, { href: '/calculators/solar-array-sizing', label: 'Solar Array Sizing' }] }
  },

  'charge-power-station-from-car': {
    intro: 'Your car makes electricity whenever the engine runs, so charging a power station while you drive seems like an obvious win. Through the 12V accessory socket, though, it is much slower than most people expect. Here is the real math, the risk to your starter battery, and the faster wired option that serious road-trippers use.',
    takeaways: [
      'A car 12V socket typically delivers 100-120W, so a 1,000Wh station takes 9-11 hours of driving.',
      'Never charge from the socket for long with the engine off. You can drain the starter battery.',
      'A DC-DC alternator charger wired to the battery can deliver 300-800W, 3-6× faster.',
      'Vehicles with smart alternators or start-stop need a charger designed for them.'
    ],
    sections: [
      {
        h: 'Why the 12V socket is slow',
        blocks: [
          'The accessory socket (the old cigarette lighter) is usually on a 10-15A fuse, and many power stations limit car input to about 8-10A to stay safe. At around 12-14V that works out to:',
          '**~8-10A × ~12.5V ≈ 100-120W**',
          { table: { head: ['Power station', 'From empty via 12V socket (~110W)'], rows: [['300Wh', '~3 hours'], ['500Wh', '~5 hours'], ['1,000Wh', '~9-10 hours'], ['2,000Wh', '~18-20 hours']] } },
          'That is fine for topping up a small station on a long drive, but not for refilling a big one. Check exact numbers for your setup with the [charge time calculator](/calculators/charge-time).'
        ]
      },
      {
        h: 'Engine off? Be careful',
        blocks: [
          'A typical starter battery holds 40-70Ah, and lead-acid starter batteries do not like being drained deeply. Pulling 8A for three hours removes about 24Ah, which can leave too little to start the engine on a cold morning. Many vehicles cut power to the socket when the ignition is off; some do not.',
          { warn: 'Only charge from the car with the engine running, or use a charger with a low-voltage cutoff that stops before the starter battery gets too low.' },
          'Idling just to charge is a poor deal too: an idling engine burns fuel for very little electrical output. A [portable solar panel](/blog/portable-solar-panel-buying-guide) is a much better way to charge while parked.'
        ]
      },
      {
        h: 'The faster option: a DC-DC alternator charger',
        blocks: [
          'An alternator or DC-DC charger connects directly to the vehicle battery with heavy cables and a fuse, bypassing the accessory socket. It draws a controlled current from the alternator while the engine runs and charges the power station or a house battery at a proper lithium charging profile.',
          { table: { head: ['Method', 'Typical power', '1,000Wh station from empty'], rows: [['12V accessory socket', '100-120W', '~9-10 hours'], ['DC-DC charger, 25A at 12V', '~300W', '~3.5 hours'], ['DC-DC charger, 50A at 12V', '~600W', '~2 hours'], ['High-output alternator charger (~800W)', '~800W', '~1.5 hours']] } },
          'Several power station brands sell dedicated alternator chargers for their units; for DIY house batteries, a standalone DC-DC charger does the same job. Expect to run heavy-gauge cable (often 6-4 AWG) from the starter battery. Check the [solar wire size calculator](/calculators/solar-wire-size) and [fuse size calculator](/calculators/solar-fuse-size) for your run.'
        ]
      },
      {
        h: 'Smart alternators and start-stop vehicles',
        blocks: [
          'Many newer vehicles use "smart" alternators that drop their output voltage once the starter battery is full, to save fuel. A basic charger sees the low voltage and stops charging. Choose a DC-DC charger with an ignition-trigger or smart-alternator mode, which charges whenever the engine is running regardless of voltage.',
          'Hybrids and EVs charge their 12V system from the traction battery through a DC-DC converter of limited output. Socket charging works, but check the owner\'s manual before adding a high-current alternator charger.'
        ]
      },
      {
        h: 'Building a complete road-trip setup',
        blocks: [
          'The most reliable mobile systems combine three sources: alternator charging while driving, solar while parked, and shore power at campgrounds. Together they keep a [12V fridge](/blog/12v-fridge-off-grid-power) and devices running indefinitely.',
          'Remember that LiFePO4 batteries must not charge below freezing. On winter trips, keep the power station in the heated cabin, as covered in [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather). Between trips, follow our [storage and maintenance tips](/blog/power-station-storage-maintenance). For full van builds, see the [van life solar setup guide](/blog/van-life-solar-setup-guide) and the [van life solar sizing guide](/guides/van-life-solar-sizing).'
        ]
      }
    ],
    faqs: [
      { q: 'How long does it take to charge a power station in a car?', a: 'Through a 12V socket at about 100-120W, roughly 1 hour per 100-120Wh. A 1,000Wh station takes 9-10 hours of driving from empty.' },
      { q: 'Will charging a power station drain my car battery?', a: 'Not while the engine is running. With the engine off, a power station can drain a starter battery in a few hours, so avoid it unless the charger has a low-voltage cutoff.' },
      { q: 'What is the fastest way to charge a power station on the road?', a: 'A DC-DC alternator charger wired directly to the vehicle battery, which can deliver 300-800W, followed by solar panels when parked.' }
    ],
    cta: { title: 'Plan your charging time', text: 'Compare car, solar and AC charging for your battery.', links: [{ href: '/calculators/charge-time', label: 'Charge Time Calculator' }, { href: '/calculators/battery-charging-current', label: 'Battery Charging Current' }] }
  },

  '12v-fridge-off-grid-power': {
    intro: 'For van lifers, overlanders and campers, a 12V fridge is usually the biggest daily power draw, and the one that cannot be switched off. Get the sizing right and your food stays cold for weeks off-grid. Get it wrong and you wake up to a dead battery and warm milk. Here is how much power these fridges really use and how to size the battery and solar around one.',
    takeaways: [
      'A 12V compressor fridge typically uses 250-500Wh per day, depending on size and heat.',
      'Thermoelectric coolers draw 50-60W continuously, using 1.2-1.4 kWh per day. Avoid them off-grid.',
      'A 100Ah LiFePO4 battery (1,280Wh) runs a typical fridge for 2-4 days without charging.',
      '150-200W of solar keeps up with a fridge in most summer conditions.'
    ],
    sections: [
      {
        h: 'Fridge types compared',
        blocks: [
          { table: { head: ['Type', 'How it cools', 'Power on 12V', 'Off-grid verdict'], rows: [['Compressor fridge', 'Like a home fridge', '45-60W when running, cycles on/off', 'Best by far'], ['Thermoelectric cooler', 'Peltier element', '50-60W constantly; cools only ~35°F below ambient', 'Poor: drains batteries, weak cooling'], ['3-way absorption', 'Heat-driven (propane/12V/AC)', '120-180W on 12V heating', 'Use on propane; 12V only while driving']] } },
          'Everything below assumes a compressor fridge. If you own a thermoelectric cooler, it will use 3-4 times more power and still struggle on a hot day.'
        ]
      },
      {
        h: 'How much power does a 12V fridge use?',
        blocks: [
          'A compressor fridge\'s running draw (around 4-5A at 12V) only matters for wiring. What matters for the battery is its **duty cycle**, the fraction of time the compressor runs, which rises with heat, fridge size and how often you open it.',
          { table: { head: ['Conditions', 'Duty cycle', 'Daily energy (50L fridge)', 'At 12V'], rows: [['Cool (65°F / 18°C)', '20-30%', '~250Wh', '~20Ah'], ['Warm (80°F / 27°C)', '30-40%', '~350Wh', '~28Ah'], ['Hot (95°F / 35°C)', '45-60%', '~500Wh', '~40Ah']] } },
          { tip: 'Most compressor fridges have an app or display showing consumption. A week of real data from your own trips beats any table. Feed it into the [daily energy use calculator](/calculators/daily-energy-use) along with your other loads.' }
        ]
      },
      {
        h: 'Sizing the battery',
        blocks: [
          'Decide how many days you want to go without any charging, called autonomy, then:',
          '**Battery Wh = daily fridge Wh × days of autonomy ÷ usable fraction**',
          'Example: 350Wh/day × 3 days ÷ 0.9 (LiFePO4) ≈ 1,170Wh → a 100Ah 12V LiFePO4 battery or a 1,000-1,200Wh power station.',
          'Lead-acid needs about twice the rated capacity for the same usable energy because it should only be discharged to 50%. Compare with the [lead-acid vs lithium runtime calculator](/calculators/lead-acid-vs-lithium-runtime), and size precisely with the [battery autonomy calculator](/calculators/battery-autonomy).',
          'If your battery or power station spends nights in the cold, read [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather). Discharging is fine; charging below freezing is not.'
        ]
      },
      {
        h: 'Keeping it charged: solar and driving',
        blocks: [
          '**Solar watts ≈ daily Wh ÷ (sun hours × 0.7)**. For 350Wh/day in 5 sun hours, that is about 100W, so 150-200W gives headroom for cloudy days and partial shade at camp. Our [portable solar panel buying guide](/blog/portable-solar-panel-buying-guide) covers choosing one.',
          'If you drive most days, an alternator charger can replace a day\'s fridge use in under an hour. A 12V socket does it in about 3-4 hours. See [charging a power station from your car](/blog/charge-power-station-from-car).'
        ]
      },
      {
        h: 'Tips to cut fridge power use',
        blocks: [
          { ul: [
            'Pre-cool the fridge and food on shore power before you leave.',
            'Give the compressor ventilation. Fridges crammed into tight cabinets run much longer.',
            'Park in shade and keep the fridge out of direct sun.',
            'Set it to 37-39°F (3-4°C) for a fridge, not colder than you need. Use eco mode if available.',
            'Open it less, and use an insulated cover in hot weather.',
            'Set the fridge\'s battery protection (low-voltage cutoff) to suit your battery type.'
          ] },
          'Running a chest freezer at home instead? See [how long a power station runs a chest freezer](/blog/chest-freezer-power-station). For a full camper build, see the [van life solar setup guide](/blog/van-life-solar-setup-guide) and [camping power solutions](/guides/camping-power-solutions).'
        ]
      }
    ],
    faqs: [
      { q: 'How long will a 100Ah battery run a 12V fridge?', a: 'A 100Ah LiFePO4 battery (about 1,150Wh usable) runs a typical 50L compressor fridge for 2-4 days, depending on temperature and use.' },
      { q: 'How many watts does a 12V fridge use per day?', a: 'Typically 250-500Wh, which is about 20-40Ah at 12V. Hot weather and larger fridges are at the top of the range.' },
      { q: 'Can a portable power station run a 12V fridge?', a: 'Yes. Plug it into the station\'s 12V car socket to avoid inverter losses. A 1,000Wh station runs one for about 2-3 days without charging.' }
    ],
    cta: { title: 'Size your camper battery', text: 'Add the fridge, lights and devices to get battery and solar sizes.', links: [{ href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }, { href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }] }
  },

  'tiny-house-solar-system': {
    intro: 'Sizing an off-grid solar system is easier to learn from a real example than from formulas. Below we size a complete system for a typical off-grid tiny house: list the loads, account for losses, design for winter, then pick the array, battery bank and inverter. Swap in your own numbers at each step.',
    takeaways: [
      'Our example tiny house uses about 4.4 kWh per day, including inverter losses and idle draw.',
      'Size the solar array for the worst month: here, about 2,000W of panels.',
      'Two days of autonomy needs about 10 kWh of 48V LiFePO4 storage.',
      'Cooking, water heating and space heating run on propane or wood. Electric heat is not practical off-grid.'
    ],
    sections: [
      {
        h: 'Step 1: list the loads',
        blocks: [
          'Our example: two people, full-time, with propane for cooking, hot water and heat, and a diesel or propane furnace whose fan runs on electricity.',
          { table: { head: ['Load', 'Watts', 'Hours/day', 'Wh/day'], rows: [['LED lighting', '60W', '5', '300'], ['Efficient fridge (10 cu ft)', '—', '24 (cycling)', '800'], ['Two laptops', '60W each', '6', '720'], ['Phones and small devices', '—', '—', '50'], ['Internet (router + modem)', '20W', '24', '480'], ['TV / streaming', '80W', '3', '240'], ['12V water pump', '100W', '0.5', '50'], ['Microwave', '1,500W', '0.25', '375'], ['Compact washer (3×/week)', '500W', 'avg 0.4', '200'], ['Ceiling / vent fan', '30W', '8', '240'], ['Furnace blower (winter)', '40W', '10', '400'], ['**Subtotal**', '', '', '**3,855**']] } },
          'Build your own list with the [daily energy use calculator](/calculators/daily-energy-use). The fridge, internet and laptops dominate, which is typical of modern off-grid living.'
        ]
      },
      {
        h: 'Step 2: add losses',
        blocks: [
          'Two hidden loads catch many first-time builders:',
          { ul: [
            '**Inverter efficiency:** most loads run on AC, so add about 10% for conversion: about 385Wh.',
            '**Inverter idle draw:** a 4,000W inverter-charger can use 20-40W just switched on, 24 hours a day. At 25W that is 600Wh, more than the microwave and lights combined.'
          ] },
          '**Total: 3,855 + 385 + 600 ≈ 4,840Wh**. Trim it: running the router and fridge on DC, or using an inverter with a low-power search mode, can save 0.4-0.6 kWh. We will plan for **4.4 kWh/day**, assuming a few of those savings.',
          'The [inverter efficiency loss calculator](/calculators/inverter-efficiency-loss) shows how much these losses cost over a year.'
        ]
      },
      {
        h: 'Step 3: size the solar array for winter',
        blocks: [
          'Size for the worst month, not the average. Our example site gets about 3 peak sun hours in December and 5.5 in June. Look yours up with the [solar irradiance by city calculator](/calculators/solar-irradiance-by-city).',
          '**Array watts = daily Wh ÷ (winter sun hours × 0.75)** = 4,400 ÷ (3 × 0.75) ≈ **1,960W**',
          'Round to **2,000W**, for example five 400W panels. In summer the same array produces about 8 kWh/day, a surplus you can use for an electric water heater element or an e-bike. The 0.75 derate is explained in [why solar panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated).',
          { tip: 'Ground mounts let you set a steep winter tilt and clear snow easily, and roofs on tiny houses are small. Compare with the [ground mount vs roof calculator](/calculators/ground-mount-vs-roof-solar) and set the angle with [seasonal tilt adjustment](/calculators/seasonal-tilt-adjustment).' }
        ]
      },
      {
        h: 'Step 4: choose system voltage and battery bank',
        blocks: [
          'At about 4kW of inverter power, **48V** is the clear choice, as explained in [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system).',
          '**Battery kWh = daily kWh × days of autonomy ÷ usable fraction** = 4.4 × 2 ÷ 0.9 ≈ **9.8 kWh**',
          'Two 48V 100Ah LiFePO4 rack batteries (about 5.1 kWh each) give 10.2 kWh. Two days carries you through a cloudy spell; for longer storms, a generator fills the gap (step 6). The [battery bank sizing](/calculators/battery-bank-sizing) and [battery autonomy](/calculators/battery-autonomy) calculators handle other scenarios.',
          { warn: 'Keep batteries in a space that stays above freezing, or use self-heating batteries. See [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather).' }
        ]
      },
      {
        h: 'Step 5: inverter and charge controller',
        blocks: [
          '**Inverter:** the biggest simultaneous load might be microwave (1,500W) + fridge startup (~1,000W) + everything else (~300W) = 2,800W. A **4,000W** 48V inverter-charger leaves headroom for the washer. Read [surge vs running watts](/blog/surge-watts-vs-running-watts) and check with the [inverter sizing calculator](/calculators/inverter-sizing).',
          '**Charge controller:** 2,000W ÷ 51.2V ≈ 39A, plus 25% headroom ≈ 49A, so a **60A MPPT** controller (many all-in-one inverters include one). Make sure your panel strings stay under its maximum input voltage on cold mornings with the [PV string voltage calculator](/calculators/pv-string-voltage). [MPPT vs PWM](/blog/mppt-vs-pwm-charge-controller) explains why MPPT is essential here.'
        ]
      },
      {
        h: 'Step 6: backup charging and heat',
        blocks: [
          'Even a well-sized system meets a week of storms. A 2,000-3,500W inverter generator connected to the inverter-charger\'s AC input recharges the bank in a few hours. Many all-in-one units start a generator automatically at a set battery level.',
          'Heat is the one load solar cannot carry. A 1,500W space heater would use a full day\'s production in under three hours. See [can a solar generator run a space heater](/blog/space-heater-solar-generator). That is why off-grid tiny houses heat with propane, wood or diesel, using electricity only for fans.',
          { table: { head: ['Component', 'Our example'], rows: [['Daily use', '~4.4 kWh'], ['Solar array', '2,000W (5 × 400W)'], ['Battery bank', '~10 kWh, 48V LiFePO4'], ['Inverter-charger', '4,000W, 48V, pure sine'], ['Charge controller', '60A MPPT'], ['Backup', '2,000-3,500W inverter generator']] } },
          'Want to go further? Our [complete off-grid living guide](/guides/complete-off-grid-living-guide) and [whole home solar guide](/guides/whole-home-solar) cover larger homes, and the [off-grid system sizing calculator](/calculators/off-grid-system-sizing) runs these steps automatically.'
        ]
      }
    ],
    faqs: [
      { q: 'How much solar do I need for a tiny house?', a: 'Most off-grid tiny houses use 2-5 kWh per day, needing roughly 1,500-3,000W of panels depending on winter sun hours, with propane or wood handling heat and cooking.' },
      { q: 'How big a battery does a tiny house need?', a: 'Typically 10-20 kWh of LiFePO4 storage for 2-3 days of autonomy at 4-6 kWh per day.' },
      { q: 'Can a tiny house run entirely on solar?', a: 'Electric loads, yes, with a properly sized system and a backup generator for long storms. Space and water heating are far more practical with propane, wood or diesel.' }
    ],
    cta: { title: 'Run these steps with your numbers', text: 'Get array, battery and inverter sizes for your own home.', links: [{ href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }, { href: '/calculators/off-grid-budget', label: 'Off-Grid Budget Calculator' }] }
  },

  'power-tools-solar-generator-jobsite': {
    intro: 'A battery power station is silent, fume-free and can sit right next to you indoors, which makes it attractive for remote projects, cabins, renovation work in occupied homes and jobsites with noise rules. The question is whether it can handle the startup kick of a saw or compressor. Here is what works, what struggles, and how much battery a working day takes.',
    takeaways: [
      'Most corded saws draw 1,200-1,800W running and roughly double that at startup.',
      'Look for 2,000W+ continuous and 4,000W+ surge to run full-size saws reliably.',
      'Tools run in short bursts, so energy use is modest: often 1-3 kWh per working day.',
      'Charging cordless tool batteries is the most efficient use of a power station.'
    ],
    sections: [
      {
        h: 'Power tool wattage and surge',
        blocks: [
          { table: { head: ['Tool', 'Running watts', 'Startup watts (typical)', 'Power station friendly?'], rows: [['Cordless battery charger', '100-300W', 'None', 'Excellent'], ['Corded drill', '500-900W', '800-1,500W', 'Yes'], ['Jigsaw / reciprocating saw', '700-1,200W', '1,200-2,000W', 'Yes'], ['Angle grinder', '800-1,500W', '1,500-2,500W', 'Mostly'], ['Circular saw (7-1/4")', '1,200-1,800W', '2,300-3,500W', 'Large units only'], ['Miter saw (10-12")', '1,500-1,800W', '2,500-4,000W', 'Large units only'], ['Table saw', '1,600-1,800W', '3,000-4,500W', 'Borderline'], ['Pancake compressor', '900-1,600W', '2,500-4,000W', 'Borderline (restarts under pressure)'], ['Shop vac', '800-1,400W', '1,200-2,000W', 'Yes']] } },
          'Motors surge at startup, as explained in [surge watts vs running watts](/blog/surge-watts-vs-running-watts). Saws are also loaded by the cut: a dull blade in thick hardwood can push running draw past the label.',
          { tip: 'Soft-start tools, common on newer miter and table saws, draw far less at startup and make a big difference on battery power.' }
        ]
      },
      {
        h: 'How much battery does a day of work take?',
        blocks: [
          'Tools run in short bursts, so the energy numbers are smaller than the wattage suggests. Use [watts vs watt-hours](/blog/watts-vs-watt-hours-explained) thinking:',
          { ul: [
            '**100 cuts with a circular saw:** about 10 seconds each ≈ 17 minutes × 1.5kW ≈ **0.4 kWh**.',
            '**Charging eight 18V 5Ah tool batteries:** 8 × 90Wh ÷ 0.85 charger efficiency ≈ **0.85 kWh**.',
            '**Shop vac, 30 minutes:** ≈ **0.5 kWh**.',
            '**Work lights, 6 hours at 100W:** ≈ **0.6 kWh**.'
          ] },
          'A trim or renovation day often lands at 1-2 kWh, and heavier framing days with a compressor at 2-4 kWh. A 2-3 kWh power station covers most single-trade days. Bring a [portable solar panel](/blog/portable-solar-panel-buying-guide) or recharge overnight on site power for multi-day jobs.'
        ]
      },
      {
        h: 'What to look for in a jobsite power station',
        blocks: [
          { ul: [
            '**Continuous output 2,000W+, surge 4,000W+** for full-size saws. Check the [inverter sizing calculator](/calculators/inverter-sizing).',
            '**Pure sine wave output.** Variable-speed tools and chargers can misbehave on modified sine. See [pure sine vs modified sine](/calculators/pure-sine-vs-modified-sine).',
            '**LiFePO4 battery** for thousands of cycles of daily use.',
            '**20A outlets or a 30A outlet** if you run a table saw or compressor.',
            '**Wheels and a handle.** A 2kWh+ unit can weigh 50-80 lb.',
            '**Fast AC charging** so it refills overnight or over lunch on site power.'
          ] },
          'Compare options in our [portable power stations](/products/portable-power-stations) roundup.'
        ]
      },
      {
        h: 'Cords and safety',
        blocks: [
          'Long, thin extension cords cause voltage drop, which makes motors draw more current and run hotter, and can trip the inverter. For 15A tools use **12 AWG for up to 50 feet** and **10 AWG for 100 feet**. The [voltage drop calculator](/calculators/voltage-drop) shows the effect.',
          { warn: 'Use GFCI protection for tools on construction sites; temporary jobsite power is typically required to have it. Keep the power station dry and off wet ground.' }
        ]
      },
      {
        h: 'Power station or gas generator?',
        blocks: [
          'For loud, all-day framing crews running multiple saws and compressors, a gas inverter generator is still more practical. For one or two trades, indoor work, remote cabins and noise-restricted sites, a power station wins: no fuel runs, no fumes indoors, no starting problems. Many contractors run both, using the generator to recharge the battery away from the work area. We compare the two in [solar vs traditional generators](/blog/solar-vs-traditional-generator).',
          'Keep your station healthy between jobs with our [storage and maintenance guide](/blog/power-station-storage-maintenance).'
        ]
      }
    ],
    faqs: [
      { q: 'Can a solar generator run a circular saw?', a: 'Yes, if it has around 1,800-2,000W continuous output and a surge rating above about 3,000W. Smaller units often trip when the saw starts.' },
      { q: 'Can a portable power station run an air compressor?', a: 'Small compressors, sometimes. Pancake compressors restarting against tank pressure can surge to 2,500-4,000W, so you need a large inverter. Soft-start or low-amp compressors are much easier.' },
      { q: 'How long will a power station run power tools?', a: 'Longer than you might expect, because tools run in short bursts. A 2kWh station typically covers a day of light carpentry or renovation work.' }
    ],
    cta: { title: 'Check your tool loads', text: 'Enter your tools to find the inverter and battery size you need.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }] }
  }
}
