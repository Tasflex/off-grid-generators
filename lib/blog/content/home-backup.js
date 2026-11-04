// lib/blog/content/home-backup.js
// Article bodies for the home backup and emergency posts. Inline links use [text](/path), bold uses **text**.

export const homeBackupContent = {
  'sump-pump-battery-backup': {
    intro: 'The storms that knock out power are the same storms that fill your sump pit. A pump that stops during a downpour can put inches of water in a basement within hours, which is why a sump pump is one of the first loads people want on backup power. The good news: a sump pump uses surprisingly little energy. The catch: it needs a big kick of power every time it starts.',
    takeaways: [
      'A 1/3 HP sump pump draws roughly 800W running and 1,300-2,000W for a split second at startup.',
      'Surge capacity decides whether a power station can start the pump; battery capacity decides how long it lasts.',
      'In a heavy storm, expect 2-5 kWh per day. In light rain, often under 1 kWh.',
      'A power station only helps if it switches over automatically, or someone is home to plug the pump in.'
    ],
    sections: [
      {
        h: 'How many watts does a sump pump use?',
        blocks: [
          'Sump pumps use induction motors, and induction motors draw several times their running current for the first fraction of a second. That startup draw is called surge or inrush, and it is the number that trips undersized inverters. We cover the general principle in [surge watts vs running watts](/blog/surge-watts-vs-running-watts), but here are typical figures for sump pumps:',
          { table: { head: ['Pump size', 'Running watts', 'Startup (surge) watts'], rows: [['1/4 HP', '600-700W', '1,000-1,500W'], ['1/3 HP', '750-850W', '1,300-2,000W'], ['1/2 HP', '950-1,100W', '2,000-2,500W'], ['3/4 HP', '1,300-1,500W', '2,500-3,500W']] } },
          'Check the label on your own pump: it lists running amps. Multiply amps by 120 to get running watts, then plan for at least two to three times that for surge.'
        ]
      },
      {
        h: 'How much battery does a sump pump need?',
        blocks: [
          'A sump pump does not run continuously. It switches on when the float rises, empties the pit in 10-30 seconds and stops. How much energy it uses depends almost entirely on how much water is coming in. To see the difference between power and energy, read [watts vs watt-hours](/blog/watts-vs-watt-hours-explained). In short, energy = watts × hours of actual running time.',
          { table: { head: ['Conditions', 'Pump runs', 'Energy per day (1/3 HP, 800W)'], rows: [['Dry weather', 'A few cycles', 'Under 0.1 kWh'], ['Steady rain', '5-10% of the time', '1.0-1.9 kWh'], ['Heavy storm, high water table', '15-25% of the time', '2.9-4.8 kWh']] } },
          'So a 2 kWh power station can cover a day of moderate rain, while a multi-day storm calls for 3-5 kWh of storage, solar recharging, or a gas generator to top the battery up.',
          { tip: 'Time a few pump cycles during the next rain: note how many seconds it runs and how often it starts. That gives you your real duty cycle instead of a guess. Then use the [battery runtime calculator](/calculators/battery-runtime) with your numbers.' }
        ]
      },
      {
        h: 'Choosing a power station for a sump pump',
        blocks: [
          { ul: [
            '**Continuous output** of at least 1.5× the pump\'s running watts (1,200W+ for a 1/3 HP pump).',
            '**Surge rating** above the pump\'s startup draw. Most units list a surge or peak figure, often 2× continuous.',
            '**Pure sine wave output.** Motors run hotter and noisier on modified sine. Every mainstream LiFePO4 power station is pure sine.',
            '**UPS or automatic switchover.** Without it, the pump only gets backup power once someone notices the outage and swaps the plug. See [pass-through charging and UPS mode](/blog/pass-through-charging-ups-power-station).',
            '**LiFePO4 chemistry** for thousands of cycles and safe indoor storage in a basement.'
          ] },
          'Browse [battery backup systems](/products/battery-backups) and [portable power stations](/products/portable-power-stations) that meet these specs, or run your numbers through the [inverter sizing calculator](/calculators/inverter-sizing) first.'
        ]
      },
      {
        h: 'Power station vs dedicated sump pump backup',
        blocks: [
          'There are two other common ways to protect a basement, and each makes sense for different homes:',
          { table: { head: ['Option', 'Pros', 'Cons'], rows: [['Power station on UPS mode', 'Also powers fridge, lights and phones; no extra plumbing', 'Higher cost; must handle surge'], ['12V battery backup pump', 'Purpose-built, installs beside the main pump, automatic', 'Lower flow; only powers the pump; battery needs replacing'], ['Water-powered backup pump', 'No battery at all, runs on city water pressure', 'Needs municipal water; uses a lot of water; check local code']] } },
          'Many homeowners combine them: a 12V backup pump for unattended protection, and a power station that also handles the [refrigerator](/blog/how-many-watts-refrigerator) and other essentials during long outages.'
        ]
      },
      {
        h: 'Connecting it to the house',
        blocks: [
          'Most sump pumps simply plug into a receptacle near the pit, so a heavy-gauge extension cord to the power station works. If the pump is hard-wired, or you want to back up several circuits at once, the clean solution is a transfer switch or interlock kit. We compare them in [transfer switch vs interlock kit](/blog/transfer-switch-vs-interlock-kit).',
          { warn: 'Never connect a generator or power station to your house with a double-ended (male-to-male) cord. It can send power back down the utility line and electrocute line workers.' },
          'Planning for the whole house? Pair this with our [well pump guide](/blog/well-pump-power-outage) and the [winter power outage checklist](/blog/winter-power-outage-checklist), and see the [emergency power setup guide](/guides/emergency-power-setup) for a full plan.'
        ]
      }
    ],
    faqs: [
      { q: 'Can a 1,000W power station run a sump pump?', a: 'Only a small pump. A 1/4 HP pump may start on a 1,000W unit with a 2,000W surge rating, but a 1/3 HP or larger pump usually needs 1,500W+ continuous and a surge rating above 2,000W.' },
      { q: 'How long will a sump pump run on battery?', a: 'Divide usable battery watt-hours by the pump\'s daily energy use. A 2,000Wh station delivers about 1,700Wh usable, which is roughly a day of steady rain for a 1/3 HP pump, or several days in light rain.' },
      { q: 'Do I need a pure sine wave inverter for a sump pump?', a: 'Yes. Induction motors run hotter, louder and less efficiently on modified sine wave power, and some will not start at all.' }
    ],
    cta: { title: 'Size your backup for the whole basement', text: 'Add the sump pump, freezer and furnace blower to get one number for your outage battery.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }] }
  },

  'well-pump-power-outage': {
    intro: 'If your water comes from a private well, a power outage also means no running water: no flushing, no washing, no drinking water once the pressure tank empties. Keeping a well pump running is a little different from other backup loads. The energy it needs is small, but the current it pulls at startup is huge, and many pumps run on 240 volts.',
    takeaways: [
      'Most well pumps use under 1 kWh per day for a typical household.',
      'Startup surge is the real challenge: 3-6× running watts on many submersible pumps.',
      'Many deep-well pumps are 240V, which rules out most single 120V power stations.',
      'Soft starters and variable-speed pumps can cut the surge enough for smaller backup systems.'
    ],
    sections: [
      {
        h: 'Well pump wattage and voltage',
        blocks: [
          'Shallow-well jet pumps are often 120V, while deep submersible pumps are commonly 240V. Look at the pump\'s control box or breaker: a double-pole breaker (two linked handles) means 240V.',
          { table: { head: ['Pump', 'Typical voltage', 'Running watts', 'Startup watts'], rows: [['1/2 HP jet pump', '120V or 240V', '900-1,100W', '2,000-3,000W'], ['1/2 HP submersible', '240V', '1,000-1,200W', '3,000-4,500W'], ['3/4 HP submersible', '240V', '1,300-1,600W', '4,000-5,500W'], ['1 HP submersible', '240V', '1,600-2,000W', '5,000-7,000W']] } },
          'Surge on 2-wire submersible pumps (no separate control box) is usually at the high end because the start components sit down the well with the motor. Our explainer on [surge vs running watts](/blog/surge-watts-vs-running-watts) covers why motors behave this way.'
        ]
      },
      {
        h: 'Energy use: smaller than you think',
        blocks: [
          'A pump that moves 10 gallons per minute fills 300 gallons, a typical family\'s daily use, in 30 minutes. At 1,100W that is about 0.55 kWh per day. Even with garden watering it rarely exceeds 1-2 kWh. In an outage, when nobody runs the dishwasher or laundry, it is often under 0.5 kWh.',
          'The pressure tank helps too: the pump only starts when pressure falls to the cut-in point (often 30 or 40 psi), then runs for a minute or two to refill it.',
          { tip: 'In an outage, conserve water and you conserve battery. Each pump start costs a surge, so a bigger pressure tank (fewer starts) is easier on a battery system.' }
        ]
      },
      {
        h: 'What backup power can run a well pump?',
        blocks: [
          { ul: [
            '**Gas or dual-fuel generator (5,000W+ with 240V output).** The traditional solution, easily handles the surge.',
            '**Large 240V battery system.** Whole-home batteries and expandable power stations with split-phase 240V output, either built in or by linking two units. See our [home battery backup guide](/blog/home-battery-backup-guide).',
            '**120V power station** only for a 120V jet pump with surge within the unit\'s rating.',
            '**Hybrid:** run the pump from a generator for 20 minutes twice a day to fill the pressure tank and some containers, while a power station handles quiet loads overnight.'
          ] },
          'Whichever route you pick, size the inverter for the surge, not the running watts. The [inverter sizing calculator](/calculators/inverter-sizing) and [hybrid inverter sizing](/calculators/hybrid-inverter-sizing) tools help here, and if you are designing a whole system, start with [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system), because 240V inverters are almost always 48V.'
        ]
      },
      {
        h: 'Cutting the surge: soft starters and VFD pumps',
        blocks: [
          'A soft starter ramps the motor up over a second or two instead of slamming it with full voltage, which can cut startup current by half or more. Variable frequency drive (VFD) constant-pressure pumps go further: they ramp up gently every time and draw only what they need.',
          'For a battery system, adding a soft starter can be the difference between needing an 8kW inverter and getting by with a 5kW one. Have a licensed pump installer fit it, since it goes in the pump\'s control circuit.'
        ]
      },
      {
        h: 'Connecting the pump safely',
        blocks: [
          'A well pump is hard-wired, so you cannot just unplug it and plug it into a power station. The safe options are a manual transfer switch or a panel interlock kit, both explained in [transfer switch vs interlock kit](/blog/transfer-switch-vs-interlock-kit).',
          { warn: 'Well pump circuits carry 240V and high startup current. Wiring a transfer switch or interlock is a job for a licensed electrician, and most areas require a permit.' },
          'Also on a well and a slab? Read our [sump pump backup guide](/blog/sump-pump-battery-backup) and the [blackout survival guide](/guides/blackout-survival-guide) for the rest of the house.'
        ]
      }
    ],
    faqs: [
      { q: 'Can a portable power station run a well pump?', a: 'A large one can run a 120V jet pump. Most deep-well submersible pumps are 240V with startup surges of 3,000-7,000W, which needs a 240V-capable battery system or a generator.' },
      { q: 'What size generator do I need for a 1 HP well pump?', a: 'Plan on at least 5,000-7,500W of starting capacity with a 240V outlet. Add your other loads on top if they share the generator.' },
      { q: 'How much water is left in my pressure tank during an outage?', a: 'Usually only a few gallons. The drawdown of a typical 20-40 gallon pressure tank is 5-15 gallons, so store drinking water separately.' }
    ],
    cta: { title: 'Check the startup load', text: 'Enter the pump\'s running watts and surge multiplier to see what inverter size you need.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/hybrid-inverter-sizing', label: 'Hybrid Inverter Sizing' }] }
  },

  'chest-freezer-power-station': {
    intro: 'A full chest freezer can hold hundreds of dollars of food, and it is one of the easiest appliances to protect in an outage. Modern chest freezers are well insulated and efficient, and they hold their temperature for a long time with the lid shut. Here is how long common power station sizes will run one, and how to make a single battery last several days.',
    takeaways: [
      'A modern 5-7 cu ft chest freezer uses about 0.5-0.8 kWh per day.',
      'Running draw is only 60-100W, but startup surge is 300-600W.',
      'A full freezer stays frozen about 48 hours unpowered, so you do not need to run it constantly.',
      'Cycling power a few hours on, several hours off can make a 1 kWh station last 3+ days.'
    ],
    sections: [
      {
        h: 'How much power does a chest freezer use?',
        blocks: [
          'Look at the yellow EnergyGuide label: it lists estimated kWh per year. Divide by 365 to get daily use. Typical figures:',
          { table: { head: ['Freezer size', 'Annual energy (typical)', 'Per day', 'Running watts', 'Startup watts'], rows: [['3.5 cu ft', '190-220 kWh', '0.5-0.6 kWh', '50-70W', '250-400W'], ['5 cu ft', '200-240 kWh', '0.55-0.65 kWh', '60-80W', '300-500W'], ['7 cu ft', '220-260 kWh', '0.6-0.7 kWh', '70-90W', '350-550W'], ['15 cu ft', '330-400 kWh', '0.9-1.1 kWh', '90-120W', '450-700W']] } },
          'Freezers in hot garages use more, sometimes 30-50% above the label. If you want precise numbers, plug the freezer into an inexpensive plug-in energy meter for 24 hours. That reading is worth more than any table.'
        ]
      },
      {
        h: 'Runtime on common power station sizes',
        blocks: [
          'Runtime = usable watt-hours ÷ daily energy. Usable capacity is about 85% of the rated capacity after inverter losses (see [watts vs watt-hours](/blog/watts-vs-watt-hours-explained) for why).',
          { table: { head: ['Power station', 'Usable energy', '7 cu ft freezer (0.65 kWh/day)'], rows: [['500Wh', '~425Wh', '~15 hours'], ['1,000Wh', '~850Wh', '~31 hours'], ['2,000Wh', '~1,700Wh', '~2.6 days'], ['3,600Wh', '~3,060Wh', '~4.7 days']] } },
          'One detail matters: the power station must handle the compressor\'s startup surge. Almost any 500W+ unit does, but very small units can trip. Our [surge watts guide](/blog/surge-watts-vs-running-watts) explains why.'
        ]
      },
      {
        h: 'The cycling strategy: make one battery last days',
        blocks: [
          'Food safety guidance from the USDA says a full freezer holds its temperature for about 48 hours unopened, and a half-full freezer about 24 hours. That means the freezer does not need power around the clock. It needs enough power to pull back down to temperature now and then.',
          { ol: [
            'Keep the lid closed and pack empty space with jugs of water. Thermal mass is free storage.',
            'Run the freezer on the power station for 3-4 hours, twice a day.',
            'Use a freezer thermometer and keep it at or below 0°F (-18°C).',
            'Recharge the station between sessions from solar, a car or a generator.'
          ] },
          'With cycling, a freezer uses about the same energy per day, but the battery can be recharged in between, and you are no longer paying inverter idle losses 24 hours a day. A 1 kWh station plus a 200W solar panel can keep a chest freezer going indefinitely in reasonable sun.',
          { tip: 'The same approach works for your fridge, which is warmer and safe for only about 4 hours unpowered. See [how many watts a refrigerator uses](/blog/how-many-watts-refrigerator).' }
        ]
      },
      {
        h: 'Chest vs upright freezers',
        blocks: [
          'Chest freezers win for backup power. Cold air sinks, so less escapes when you open the lid, and they typically use 10-25% less energy than an upright of the same size. Uprights with auto-defrost also run a heater periodically, which adds a few hundred watts in short bursts.',
          'If you are buying a freezer partly for emergency storage, a manual-defrost chest model is the most battery-friendly choice.'
        ]
      },
      {
        h: 'Putting it into your outage plan',
        blocks: [
          'A freezer, a fridge, internet and lights together typically need 2-3 kWh per day. That is a realistic target for a mid-size power station plus solar. Our [winter power outage checklist](/blog/winter-power-outage-checklist) lists the other priorities, and [how to keep the internet on](/blog/keep-internet-on-power-outage) covers the cheapest load to keep running.',
          'For whole-home planning, see [what size solar generator you need for a house](/blog/what-size-solar-generator-house) and use the [daily energy use calculator](/calculators/daily-energy-use) to add everything up.'
        ]
      }
    ],
    faqs: [
      { q: 'Can a 500W power station run a chest freezer?', a: 'Yes, most can start and run a small chest freezer. A 500Wh battery lasts roughly 12-18 hours, or much longer if you cycle the freezer on and off.' },
      { q: 'How long can a chest freezer stay off?', a: 'About 48 hours if full and unopened, and about 24 hours if half full, according to USDA guidance. Keep a thermometer inside and keep food at or below 0°F.' },
      { q: 'Should I run a freezer through an extension cord to a power station?', a: 'Yes, that is fine for short distances. Use a heavy-duty cord (14 AWG or thicker) and keep it as short as practical.' }
    ],
    cta: { title: 'Work out your own freezer runtime', text: 'Enter your freezer\'s watts and your battery size.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }] }
  },

  'keep-internet-on-power-outage': {
    intro: 'In a long outage, internet access stops being a convenience. It is how you get updates, contact family, work remotely and report problems. Fortunately, a modem and router are among the lowest-power devices in your home. With a small battery and the right setup, Wi-Fi can outlast the outage.',
    takeaways: [
      'A modem plus router typically draws 20-40W combined.',
      'A 1,000Wh power station can run them for roughly 20-30 hours, more on DC outputs.',
      'Running from DC instead of the AC inverter can nearly double runtime.',
      'Your ISP\'s equipment needs power too. Have a phone hotspot as a fallback.'
    ],
    sections: [
      {
        h: 'How much power does home internet use?',
        blocks: [
          { table: { head: ['Device', 'Typical draw'], rows: [['Cable or DSL modem', '7-15W'], ['Fiber ONT', '5-12W'], ['Wi-Fi router', '6-20W'], ['Mesh node (each)', '6-12W'], ['Modem/router combo', '12-25W']] } },
          'Most homes land between 20 and 40W total. Over 24 hours that is 0.5-1 kWh, about the same as a chest freezer and far less than a space heater. Check the power adapters: they list output volts and amps, and volts × amps gives the maximum draw.'
        ]
      },
      {
        h: 'Option 1: a power station',
        blocks: [
          'Plug both devices into a power station and you are done. The one hidden cost is the inverter: converting battery DC to 120V AC uses 10-30W just to stay on, which can be as much as the router itself.',
          { table: { head: ['Power station', 'Via AC outlet (35W load + inverter)', 'Via DC outputs (30W)'], rows: [['300Wh', '~5-6 hours', '~8 hours'], ['1,000Wh', '~17-20 hours', '~28 hours'], ['2,000Wh', '~35-40 hours', '~55 hours']] } },
          { tip: 'Most routers and modems run on 12V DC from their wall adapters. A 12V DC barrel cable from the power station\'s car socket or DC5521 port skips the inverter entirely. Match the voltage and the plug polarity exactly.' },
          'If you want the network to stay up without anyone touching it, the power station needs a UPS mode. We explain switchover times and which devices care in [pass-through charging and UPS mode](/blog/pass-through-charging-ups-power-station).'
        ]
      },
      {
        h: 'Option 2: a DC mini UPS',
        blocks: [
          'Small DC UPS units, essentially a 12V lithium battery pack with automatic switchover, are made specifically for routers. Typical sizes hold 50-100Wh, which keeps a 15-25W router-and-modem pair online for 3-6 hours. They are inexpensive and permanently installed, so they cover the short outages that happen most often.',
          'Combine the two: a mini UPS bridges the first few hours automatically, then you move the network to a power station for a longer outage.'
        ]
      },
      {
        h: 'When the internet goes down anyway',
        blocks: [
          'Your equipment is only half of the connection. Cable networks have neighborhood nodes with backup batteries that may last only a few hours. Fiber and DSL central offices usually have generators, but the cabinets along the street may not. If your modem is powered but shows no connection, the outage is upstream.',
          { ul: [
            'Keep a phone hotspot plan as backup, and keep the phone charged from the power station\'s USB-C ports.',
            'Cell towers also have limited battery backup, so text messages often get through when calls and data do not.',
            'Download offline maps and key documents before storm season.'
          ] }
        ]
      },
      {
        h: 'Fit it into your outage plan',
        blocks: [
          'Internet is the cheapest high-value load in an outage, so put it near the top of the list alongside the fridge and freezer. See the [winter power outage checklist](/blog/winter-power-outage-checklist), [how long a power station runs a chest freezer](/blog/chest-freezer-power-station), and our [blackout emergency power plan](/blog/blackout-emergency-power-plan) for the rest.',
          'New to battery specs? Start with [watts vs watt-hours](/blog/watts-vs-watt-hours-explained), then try the [battery runtime calculator](/calculators/battery-runtime).'
        ]
      }
    ],
    faqs: [
      { q: 'How long will a power bank run a router?', a: 'A 20,000mAh USB power bank holds about 74Wh. With a 12V step-up cable it can run a 12W router for roughly 4-5 hours, less with the modem too.' },
      { q: 'Will a UPS keep my internet on during a power outage?', a: 'Yes, as long as your ISP\'s network still has power. A standard computer UPS runs a modem and router for 1-3 hours. A power station with UPS mode lasts much longer.' },
      { q: 'Why does my internet stop working when the power goes out even with a battery?', a: 'The outage has likely reached your ISP\'s neighborhood equipment, which has limited backup power. Use a mobile hotspot until service returns.' }
    ],
    cta: { title: 'How long will your battery last?', text: 'Enter your router and modem watts to see runtime on any battery.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/products/portable-power-stations', label: 'Portable Power Stations' }] }
  },

  'transfer-switch-vs-interlock-kit': {
    intro: 'Running extension cords from a generator through a window works for a night. In a multi-day outage it gets old fast, and it cannot power hard-wired loads like a furnace, well pump or ceiling lights. The proper fix is to feed your home\'s circuits directly, safely isolated from the utility. There are three ways to do it: an interlock kit, a manual transfer switch, or an automatic transfer switch.',
    takeaways: [
      'All three methods prevent backfeeding, where your generator sends power onto the utility lines.',
      'An interlock kit is the cheapest and lets you power any circuit in the panel, one breaker at a time.',
      'A manual transfer switch pre-selects 6-10 circuits and is the simplest to use.',
      'Automatic transfer switches are for permanently installed standby systems.'
    ],
    sections: [
      {
        h: 'Why you can\'t just plug into an outlet',
        blocks: [
          'Connecting a generator to a wall outlet with a double-ended cord, sometimes called a "suicide cord," energizes your whole panel, and if the main breaker is on, it also pushes power back through the utility transformer. That transformer steps your 240V up to thousands of volts on lines that crews believe are dead. It is illegal, it can kill line workers, and it can start a fire when grid power returns.',
          { warn: 'Every legal home connection method physically prevents the main breaker and the generator from being connected at the same time.' }
        ]
      },
      {
        h: 'Interlock kit',
        blocks: [
          'An interlock is a sliding metal plate fitted to your main panel cover. It blocks the main breaker from being on while a dedicated generator backfeed breaker is on, and vice versa. A power inlet box outside connects to that breaker, and you plug the generator or power station into the inlet.',
          { ul: [
            '**Cost:** typically $50-200 for the kit, plus the inlet, breaker and installation.',
            '**Coverage:** any circuit in the panel. You manage the load by switching breakers on and off.',
            '**Trade-off:** easy to overload if you leave everything on. You need to know which breakers to switch off.'
          ] }
        ]
      },
      {
        h: 'Manual transfer switch',
        blocks: [
          'A manual transfer switch is a small sub-panel mounted beside your main panel. A handful of essential circuits, such as fridge, furnace, well pump and a few lights, are moved into it, and each has a switch: LINE or GEN.',
          { ul: [
            '**Cost:** typically $300-700 for the switch, plus installation.',
            '**Coverage:** only the 6-10 circuits pre-wired into it.',
            '**Trade-off:** harder to overload and easier for anyone in the family to operate, but less flexible.'
          ] }
        ]
      },
      {
        h: 'Automatic transfer switch',
        blocks: [
          'An automatic transfer switch (ATS) senses the outage, signals a standby generator or battery system to start, and transfers the load within seconds. It is standard with permanently installed standby generators and most whole-home battery systems. Expect $1,000 or more installed for the switch alone.',
          'If you are considering a whole-home battery, compare options in our [home battery backup guide](/blog/home-battery-backup-guide) and [home backup systems guide](/guides/home-backup-systems).'
        ]
      },
      {
        h: 'Side-by-side comparison',
        blocks: [
          { table: { head: ['', 'Interlock kit', 'Manual transfer switch', 'Automatic transfer switch'], rows: [['Typical cost (equipment)', '$50-200', '$300-700', '$1,000+'], ['Circuits covered', 'Any', '6-10 pre-selected', 'Selected or whole home'], ['Operation', 'Flip main off, gen breaker on', 'Flip circuit switches', 'Automatic'], ['Overload protection', 'You manage it', 'Limited by design', 'Load management built in'], ['Best for', 'Budget, flexibility', 'Simplicity', 'Standby systems']] } }
        ]
      },
      {
        h: 'Using a power station instead of a generator',
        blocks: [
          'Larger power stations can feed an interlock or transfer switch through a 30A outlet (TT-30 or L14-30, depending on the unit). A few things to check first:',
          { ul: [
            '**Voltage.** A 120V-only unit can power just one leg of a split-phase panel. 240V loads such as a [well pump](/blog/well-pump-power-outage) need a unit with split-phase output.',
            '**Neutral bonding.** With an interlock kit, the neutral stays bonded at your main panel, so the source generally needs a floating neutral. Many power stations are floating-neutral by default, but check the manual.',
            '**Surge.** Starting a furnace blower, [sump pump](/blog/sump-pump-battery-backup) or fridge at the same moment can exceed the inverter\'s surge rating. Turn breakers on one at a time. See [surge vs running watts](/blog/surge-watts-vs-running-watts).'
          ] },
          { warn: 'Panel work requires a licensed electrician and usually a permit. Codes vary by location and utility.' },
          'Planning your winter backup? Pair this with the [winter power outage checklist](/blog/winter-power-outage-checklist) and the [emergency power setup guide](/guides/emergency-power-setup).'
        ]
      }
    ],
    faqs: [
      { q: 'Is an interlock kit legal?', a: 'In most US jurisdictions, yes, when it is listed for your specific panel and installed with a permit. Some utilities and local codes have extra requirements, so check before buying.' },
      { q: 'Can I connect a portable power station to a transfer switch?', a: 'Yes, if it has a compatible outlet (often a TT-30 or L14-30) and enough output for the circuits you switch on. A 120V-only unit cannot run 240V circuits.' },
      { q: 'Do I need a transfer switch for a generator?', a: 'Only if you want to power hard-wired circuits or the home panel. For a few appliances, heavy-duty extension cords from a generator placed safely outdoors are fine.' }
    ],
    cta: { title: 'Know your load before you wire it', text: 'Add up the circuits you plan to back up and size the generator or inverter to match.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/solar-breaker-size', label: 'Solar Breaker Size Calculator' }] }
  },

  'winter-power-outage-checklist': {
    intro: 'Summer outages are uncomfortable. Winter outages can be dangerous. Ice storms bring down lines across whole regions, repairs take longer in the cold, and without power most homes lose their heat, even gas furnaces, which need electricity for the blower and controls. Work through this checklist before the first storm of the season.',
    takeaways: [
      'Most gas furnaces need 300-800W of electricity to run. Without it, they will not heat.',
      'Never run a generator, grill or camp stove indoors or in a garage. Carbon monoxide kills every winter.',
      'A full freezer keeps food frozen about 48 hours; the fridge only about 4 hours.',
      'A 1-2 kWh power station covers phones, lights, internet and a furnace blower for a meaningful time.'
    ],
    sections: [
      {
        h: '1. Heat: plan for the furnace to stop',
        blocks: [
          { ul: [
            '**Find out what your furnace needs.** Gas and oil furnaces use a blower motor (often 400-800W) plus an inducer fan and controls. A hard-wired furnace needs a [transfer switch or interlock kit](/blog/transfer-switch-vs-interlock-kit) to run from backup power.',
            '**Heat pumps and electric baseboard are not practical on portable batteries.** They draw several kilowatts. Plan to heat one room instead.',
            '**Choose a warm room.** Pick a small, interior room with few windows, close doors, and hang blankets over windows at night.',
            '**Low-watt heat is efficient heat.** A heated blanket at 50-100W uses a fraction of the power of a space heater. See [can a solar generator run a space heater](/blog/space-heater-solar-generator) for the math.'
          ] }
        ]
      },
      {
        h: '2. Carbon monoxide safety',
        blocks: [
          { warn: 'Run gas generators outdoors only, at least 20 feet from doors, windows and vents, pointed away from the house. Never in a garage, even with the door open.' },
          { ul: [
            'Install battery-powered CO alarms on every level and near sleeping areas. Test them now.',
            'Do not use gas ovens, grills or camp stoves for heat.',
            'Only use fuel-burning heaters rated for indoor use, with an oxygen depletion sensor, and still keep a CO alarm nearby.',
            'Battery power stations produce no fumes, which is why they can sit safely in the living room.'
          ] }
        ]
      },
      {
        h: '3. Food and water',
        blocks: [
          { ul: [
            'Keep the fridge and freezer closed. The fridge stays safe about 4 hours; a full freezer about 48 hours.',
            'Freeze jugs of water now to fill empty freezer space. They extend hold time and become drinking water.',
            'Store at least 1 gallon of water per person per day, for several days.',
            'On a private well, you have no water without power. See [running a well pump in an outage](/blog/well-pump-power-outage).',
            'A power station can cycle the freezer to keep it frozen for days. We show how in [how long a power station runs a chest freezer](/blog/chest-freezer-power-station).'
          ] }
        ]
      },
      {
        h: '4. Pipes and the house',
        blocks: [
          { ul: [
            'Know where your main water shut-off is, and how to drain the system if the house will go cold for days.',
            'Let faucets on exterior walls drip slowly during hard freezes.',
            'Open cabinet doors under sinks to let room heat reach the pipes.',
            'If you have a [sump pump](/blog/sump-pump-battery-backup), snowmelt during a thaw can fill the pit fast.'
          ] }
        ]
      },
      {
        h: '5. Backup power: what to have ready',
        blocks: [
          'For most households, these are the priority loads and their approximate daily energy:',
          { table: { head: ['Load', 'Power', 'Daily energy'], rows: [['Phones and laptops', '10-60W while charging', '0.1-0.3 kWh'], ['LED lights (4 bulbs, 6 hours)', '40W', '0.25 kWh'], ['Internet (modem + router)', '20-40W', '0.5-1.0 kWh'], ['Chest freezer', '60-100W running', '0.6-0.7 kWh'], ['Furnace blower (cycling)', '400-800W', '2-5 kWh'], ['CPAP (8 hours, no humidifier)', '30-60W', '0.25-0.5 kWh']] } },
          'Without the furnace, a 2 kWh power station covers about a day of essentials. With the furnace you need a larger system or a generator to recharge it. Keep the [internet running](/blog/keep-internet-on-power-outage), and if you rely on a CPAP, read [can a solar generator run a CPAP](/blog/cpap-machine-solar-generator).',
          { tip: 'Charge everything to 100% when a storm is forecast. Lithium power stations hold their charge for months, but you want them full when the lines come down.' }
        ]
      },
      {
        h: '6. Look after the batteries in the cold',
        blocks: [
          'Lithium iron phosphate batteries must not be charged below freezing. Keep power stations in the heated part of the house, and if you charge from solar panels outside, keep the battery inside. Details in [LiFePO4 batteries in cold weather](/blog/lifepo4-battery-cold-weather).',
          'For the complete plan, see our [blackout survival guide](/guides/blackout-survival-guide) and [emergency power setup guide](/guides/emergency-power-setup).'
        ]
      }
    ],
    faqs: [
      { q: 'Will my gas furnace work during a power outage?', a: 'Almost certainly not. Modern gas furnaces need electricity for the igniter, inducer fan, blower and controls. With a properly connected generator or battery, they can run normally.' },
      { q: 'How can I heat my house without power safely?', a: 'Close off one small room, use layers and heated blankets on battery power, and only use fuel-burning heaters rated for indoor use, with a working carbon monoxide alarm.' },
      { q: 'What size power station do I need for a winter outage?', a: 'For phones, lights, internet and a freezer, 1-2 kWh covers about a day. To run a furnace blower as well, plan for 3-5 kWh per day, or a generator to recharge the battery.' }
    ],
    cta: { title: 'Build your outage power budget', text: 'Add each essential load and see how many hours your battery lasts.', links: [{ href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }, { href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }] }
  },

  'space-heater-solar-generator': {
    intro: 'It is one of the most common questions we get every winter: can my solar generator run a space heater? The short answer is yes, briefly. The longer answer is that resistive heating is the most power-hungry thing you can plug into a battery, and there are far better ways to stay warm when the grid is down.',
    takeaways: [
      'A typical space heater draws 1,500W on high and 750W on low.',
      'A 1,000Wh power station runs it for about 30-35 minutes on high.',
      'Recharging that hour of heat takes a 400W solar array most of a winter day.',
      'Heated blankets, insulation and one warm room deliver far more comfort per watt-hour.'
    ],
    sections: [
      {
        h: 'The runtime math',
        blocks: [
          'Space heaters turn electricity directly into heat, so they draw their full rating whenever the element is on. Most plug-in heaters in the US are capped at 1,500W, the practical maximum for a standard 15A outlet.',
          { table: { head: ['Power station (usable)', 'High (1,500W)', 'Low (750W)', 'Thermostat cycling ~50% on low'], rows: [['500Wh (~425Wh)', 'May not start*', '~34 min', '~1.1 hours'], ['1,000Wh (~850Wh)', '~34 min', '~1.1 hours', '~2.3 hours'], ['2,000Wh (~1,700Wh)', '~1.1 hours', '~2.3 hours', '~4.5 hours'], ['3,600Wh (~3,060Wh)', '~2 hours', '~4 hours', '~8 hours']] } },
          '*Many smaller units have inverters rated below 1,500W and will shut off. If watt-hours versus watts is unclear, read [watts vs watt-hours](/blog/watts-vs-watt-hours-explained).'
        ]
      },
      {
        h: 'Why solar can\'t keep up',
        blocks: [
          'In winter, many US locations get only 2-3 peak sun hours. A 400W portable array, after real-world losses, produces roughly 0.6-1.0 kWh on a clear December day. That is less than one hour of a space heater on high. See [why solar panels produce less than their rating](/blog/why-solar-panels-produce-less-than-rated) for where the losses come from, and check your location with the [solar production by location calculator](/calculators/solar-production-by-location).'
        ]
      },
      {
        h: 'Better ways to stay warm on battery power',
        blocks: [
          { table: { head: ['Option', 'Power draw', 'Runtime on 1,000Wh'], rows: [['Electric blanket', '50-100W', '8-17 hours'], ['Heated mattress pad', '50-150W', '6-17 hours'], ['Heated vest or jacket (USB)', '10-20W', '40+ hours'], ['12V heated seat pad', '30-50W', '17-28 hours'], ['Space heater (high)', '1,500W', '~34 minutes']] } },
          'Heating your body instead of the air is 15-30 times more efficient on a battery. Combine it with one small, closed-off room and blankets over windows, and an outage night becomes manageable.',
          { tip: 'Vans and tiny homes often use diesel air heaters: they burn fuel for heat and draw only about 10-40W of 12V power once running. Install them with an exhaust vented outside and a CO alarm.' }
        ]
      },
      {
        h: 'When a space heater on battery does make sense',
        blocks: [
          { ul: [
            'Taking the chill off a room for 15-20 minutes before bed.',
            'Short bursts in a bathroom while getting ready.',
            'Large whole-home battery systems (10 kWh+) that have the capacity to spare.',
            'Grid-tied solar homes in daylight, when panels produce more than the house uses.'
          ] },
          { warn: 'Never leave a space heater running unattended or while sleeping, keep it 3 feet from anything that can burn, and plug it directly into the power station, not into a power strip.' }
        ]
      },
      {
        h: 'Plan heat into your winter preparation',
        blocks: [
          'Heat is the hardest winter load to cover. Our [winter power outage checklist](/blog/winter-power-outage-checklist) explains how to run a gas furnace blower from backup power, the most effective way to keep a whole house warm. If your battery lives in a cold space, read [LiFePO4 batteries in cold weather](/blog/lifepo4-battery-cold-weather) too.',
          'Building off-grid? Our [tiny house solar sizing example](/blog/tiny-house-solar-system) shows why off-grid homes heat with propane, wood or diesel rather than electricity.'
        ]
      }
    ],
    faqs: [
      { q: 'How long will a 2000W solar generator run a space heater?', a: 'An inverter rated at 2,000W can start a 1,500W heater, but runtime depends on battery capacity. A 2,000Wh unit gives roughly 1 hour on high or 2 hours on low.' },
      { q: 'Can I run a space heater on a solar panel directly?', a: 'No. A space heater needs steady 120V AC at up to 1,500W. You would need an inverter, a battery and several kilowatts of panels to run it from solar.' },
      { q: 'What is the most efficient way to heat with a battery?', a: 'Heat your body, not the room: electric blankets, heated mattress pads and heated clothing use 10-150W instead of 1,500W.' }
    ],
    cta: { title: 'See exactly how long your battery lasts', text: 'Enter the heater\'s wattage and your battery capacity.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/calculators/solar-production-by-location', label: 'Solar Production by Location' }] }
  }
}
