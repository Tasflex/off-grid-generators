// lib/blog/content/basics.js
// Article bodies for the "Power Basics" explainer posts. Inline links use [text](/path), bold uses **text**.

export const basicsContent = {
  'watts-vs-watt-hours-explained': {
    intro: 'Every power station spec sheet lists two headline numbers, something like "1,800W" and "1,024Wh", and mixing them up is the single most common reason people buy the wrong size. One tells you what you can run. The other tells you for how long. Once the difference clicks, sizing a battery takes one line of math.',
    takeaways: [
      'Watts (W) measure the rate of power: how much a device draws right now.',
      'Watt-hours (Wh) measure energy: how much is stored in the battery.',
      'Runtime ≈ battery Wh × 0.85 ÷ device watts.',
      'Amp-hours × volts = watt-hours. Always convert to Wh to compare batteries.'
    ],
    sections: [
      {
        h: 'The car analogy',
        blocks: [
          'Think of a car. **Horsepower** is how hard the engine can push right now. **Fuel tank size** is how far you can go. A power station\'s watt rating is its horsepower: the most it can deliver at once. Its watt-hour rating is the fuel tank.',
          { table: { head: ['Spec', 'Unit', 'Answers the question', 'Power station example'], rows: [['Output / inverter rating', 'Watts (W)', 'Can it run my device at all?', '1,800W continuous, 3,600W surge'], ['Capacity', 'Watt-hours (Wh)', 'For how long?', '1,024Wh'], ['Your electric bill', 'Kilowatt-hours (kWh)', 'How much energy did I use?', '1 kWh = 1,000Wh']] } },
          'A big inverter with a small battery runs a microwave, but only for a few minutes. A big battery with a small inverter runs a laptop for days but cannot start a kettle. You need both numbers to be big enough.'
        ]
      },
      {
        h: 'The one-line runtime formula',
        blocks: [
          '**Runtime (hours) = battery Wh × 0.85 ÷ load in watts**',
          'The 0.85 accounts for inverter and conversion losses when you run AC devices. For DC loads such as USB-C or 12V outputs, use about 0.9.',
          { table: { head: ['Device', 'Watts', 'On a 1,000Wh station'], rows: [['Phone charging', '15W', '~57 hours of charging (≈ 50+ full charges)'], ['Laptop', '60W', '~14 hours'], ['CPAP (no humidifier)', '40W', '~21 hours'], ['Refrigerator (average)', '60W avg', '~14 hours'], ['TV', '100W', '~8.5 hours'], ['Microwave', '1,500W input', '~34 minutes'], ['Space heater', '1,500W', '~34 minutes']] } },
          'Notice the fridge uses an **average** figure: it cycles on and off, so its 150W running draw averages closer to 50-80W over a day. That is why measuring daily energy (Wh per day) beats reading the nameplate. The [daily energy use calculator](/calculators/daily-energy-use) does this for a whole list of appliances, and [how long a power station runs a chest freezer](/blog/chest-freezer-power-station) shows a worked example.'
        ]
      },
      {
        h: 'Converting amp-hours and mAh to watt-hours',
        blocks: [
          'Batteries are often rated in amp-hours (Ah) or milliamp-hours (mAh). Those numbers are meaningless without the voltage.',
          '**Wh = Ah × volts** and **Wh = mAh × volts ÷ 1,000**',
          { ul: [
            'A 100Ah 12V LiFePO4 battery (12.8V nominal) = 1,280Wh.',
            'A 100Ah 24V battery = 2,560Wh, twice the energy for the same Ah.',
            'A 20,000mAh power bank (3.7V cells) = 74Wh.'
          ] },
          { tip: 'Airline rules use watt-hours: batteries up to 100Wh are generally allowed in carry-on bags, 100-160Wh need airline approval, and larger batteries are not allowed. Most power stations are well over 160Wh.' },
          'Comparing a lead-acid battery with lithium? Usable capacity differs too. Lead-acid should only be discharged to about 50%, while LiFePO4 can safely use 80-100%. The [lead-acid vs lithium runtime calculator](/calculators/lead-acid-vs-lithium-runtime) shows the difference.'
        ]
      },
      {
        h: 'Where watts and watt-hours show up in solar',
        blocks: [
          'Solar panels are rated in watts, which is their power output under lab conditions. What you actually care about is watt-hours per day, which depends on sun hours and losses:',
          '**Daily solar energy ≈ panel watts × peak sun hours × 0.75**',
          'A 200W panel in 5 peak sun hours gives roughly 750Wh per day, not 1,000Wh. We explain the 0.75 in [why solar panels produce less than their rated watts](/blog/why-solar-panels-produce-less-than-rated).'
        ]
      },
      {
        h: 'Watch for startup surge',
        blocks: [
          'One complication: motors briefly draw several times their running watts when they start. A fridge that runs at 150W can need 1,000W+ for a split second. That is a watts problem, not a watt-hours problem, so a large battery does not help if the inverter is too small. See [surge watts vs running watts](/blog/surge-watts-vs-running-watts).',
          'Keeping a power station healthy so it delivers its full rated Wh for years is covered in [how to store and maintain a power station](/blog/power-station-storage-maintenance).'
        ]
      }
    ],
    faqs: [
      { q: 'Is 1000Wh the same as 1000W?', a: 'No. 1,000Wh is how much energy the battery stores; 1,000W is how fast power is being used or delivered. A 1,000Wh battery can supply 1,000W for about one hour, or 100W for about ten hours, minus losses.' },
      { q: 'How many watt-hours do I need?', a: 'Add up each device\'s watts × hours used per day, then divide by 0.85 for losses. That is the minimum battery size for one day without recharging.' },
      { q: 'How do I convert amp-hours to watt-hours?', a: 'Multiply amp-hours by the battery voltage. A 50Ah battery at 12.8V holds 640Wh.' }
    ],
    cta: { title: 'Do the math for your devices', text: 'Enter your appliances and get daily watt-hours and battery size.', links: [{ href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }, { href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }] }
  },

  'surge-watts-vs-running-watts': {
    intro: 'Your refrigerator\'s label says 150W, your power station is rated 600W, and yet the moment the compressor kicks in, the inverter beeps and shuts off. The culprit is startup surge: the brief burst of current a motor needs to get moving. Understanding it is the key to choosing an inverter that will not trip.',
    takeaways: [
      'Running (rated) watts is the steady draw once a device is going.',
      'Surge (starting) watts is the momentary spike at startup, often 2-7× running watts for motors.',
      'Heaters, kettles and incandescent bulbs have little or no surge.',
      'Size the inverter so its surge rating exceeds the largest startup load plus everything else running.'
    ],
    sections: [
      {
        h: 'Why motors surge',
        blocks: [
          'A stationary electric motor has no back-EMF, the voltage a spinning motor generates that opposes the supply. Until it spins up, the motor looks almost like a short circuit and draws its "locked rotor" current, often several times normal. That lasts from a fraction of a second up to a couple of seconds for a compressor starting against pressure.',
          'Resistive loads such as heaters, toasters and hair dryers have no motor to start, so their surge is negligible. Electronics with switching power supplies have a tiny inrush spike that inverters usually ignore.'
        ]
      },
      {
        h: 'Running and surge watts for common appliances',
        blocks: [
          { table: { head: ['Appliance', 'Running watts', 'Startup watts (typical)'], rows: [['Refrigerator', '100-250W', '600-1,200W'], ['Chest freezer', '60-100W', '300-600W'], ['Window AC (5,000-8,000 BTU)', '450-800W', '1,200-2,200W'], ['Sump pump (1/3 HP)', '750-850W', '1,300-2,000W'], ['Well pump (1 HP, 240V)', '1,600-2,000W', '5,000-7,000W'], ['Circular saw', '1,200-1,800W', '2,300-3,500W'], ['Air compressor (pancake)', '900-1,600W', '2,500-4,000W'], ['Furnace blower (1/2 HP)', '500-800W', '1,200-2,000W'], ['Microwave (1,000W cooking)', '1,400-1,600W', 'Little surge'], ['Space heater', '1,500W', 'No surge'], ['CPAP', '30-60W', 'No meaningful surge']] } },
          'These are typical ranges. Your appliance may differ, so check the label for "LRA" (locked rotor amps) on compressors, or measure with a clamp meter that records inrush.',
          { tip: 'Microwaves are rated by cooking output, not by what they draw. A "1,000W" microwave pulls about 1,500W from the outlet.' }
        ]
      },
      {
        h: 'How inverter surge ratings work',
        blocks: [
          'Inverters list a continuous rating and a surge or peak rating, often twice the continuous rating, but that peak may only last milliseconds. Low-frequency inverters with heavy transformers handle long motor starts better than lightweight high-frequency designs with the same numbers on paper.',
          'Some power stations offer a voltage-reduction mode that lets them run resistive loads above the rated output by lowering the voltage. It works for kettles and heaters, but not for motors, which need full voltage to start.',
          { warn: 'Add up everything running when the motor starts. If your fridge starts while the microwave is on, the inverter sees microwave running watts plus fridge startup watts at the same moment.' }
        ]
      },
      {
        h: 'Sizing an inverter around surge',
        blocks: [
          { ol: [
            'List every device you might run at the same time and add their running watts.',
            'Find the single largest surge (startup watts) and replace that device\'s running watts with its startup watts.',
            'Your inverter\'s surge rating should exceed that total. Its continuous rating should exceed the running total by 20-25%.'
          ] },
          'Example: fridge (150W running, 1,000W start) + TV (100W) + lights (60W) + laptop (60W). Running total: 370W. Peak moment: 1,000 + 100 + 60 + 60 = 1,220W. A 1,000W continuous / 2,000W surge inverter handles it comfortably.',
          'The [inverter sizing calculator](/calculators/inverter-sizing) does this for you, and the [inverter oversizing calculator](/calculators/inverter-oversizing) shows the cost of going too big.'
        ]
      },
      {
        h: 'Reducing surge',
        blocks: [
          { ul: [
            '**Soft starters** for air conditioners and pumps ramp the motor up and often cut starting current by half or more.',
            '**Inverter-driven (variable speed) appliances**, such as inverter mini-splits and inverter fridges, ramp up gently and barely surge.',
            '**Stagger starts.** Turn loads on one at a time after an outage instead of all at once.'
          ] },
          'Surge is the deciding factor in several of our guides: [sump pumps](/blog/sump-pump-battery-backup), [well pumps](/blog/well-pump-power-outage) and [power tools on a solar generator](/blog/power-tools-solar-generator-jobsite). If watts versus watt-hours is still fuzzy, start with [watts vs watt-hours](/blog/watts-vs-watt-hours-explained).'
        ]
      }
    ],
    faqs: [
      { q: 'What is the difference between surge watts and running watts?', a: 'Running watts is what a device draws continuously. Surge watts is the short spike it needs to start, which for motors can be 2-7 times higher.' },
      { q: 'How many surge watts does a refrigerator need?', a: 'Typically 600-1,200W for a full-size fridge, though some older models need more. Inverter-compressor fridges need much less.' },
      { q: 'Does a bigger battery help with surge?', a: 'Not directly. Surge is limited by the inverter. A larger battery only helps if it comes with a larger inverter.' }
    ],
    cta: { title: 'Size your inverter correctly', text: 'Enter your appliances and get both the continuous and the surge rating you need.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/pure-sine-vs-modified-sine', label: 'Pure Sine vs Modified Sine' }] }
  },

  'pass-through-charging-ups-power-station': {
    intro: 'Most new power stations advertise pass-through charging, and many add "UPS mode" with a switchover time measured in milliseconds. It is tempting to replace a desktop UPS with one: bigger battery, more outlets, solar charging. Whether that works depends on how fast the unit switches and how it handles power while plugged in.',
    takeaways: [
      'Pass-through charging means devices are powered while the power station charges.',
      'UPS mode means the station switches to battery automatically when the grid drops.',
      'Power station switchover is typically 10-30ms; a dedicated online UPS is 0ms.',
      'Routers, lamps, fridges and most laptops do not care. Some desktop PCs and NAS units might.'
    ],
    sections: [
      {
        h: 'Pass-through vs UPS mode',
        blocks: [
          '**Pass-through charging** just means you can use the outputs while the station is plugged in. Older units sometimes powered loads from the battery while charging it, cycling the battery constantly.',
          '**UPS (or EPS) mode** means that while grid power is present, the station passes it straight to the outlets, bypassing the inverter, and switches to battery the moment the grid drops. That bypass reduces battery wear and heat.',
          'Check the manual for the words "bypass" or "grid priority". If loads are always powered through the inverter, the battery and fan work harder all day.'
        ]
      },
      {
        h: 'Switchover time: who cares about milliseconds?',
        blocks: [
          { table: { head: ['Backup type', 'Typical transfer time'], rows: [['Online (double-conversion) UPS', '0ms'], ['Line-interactive UPS', '2-10ms'], ['Standby UPS', '5-12ms'], ['Power station with UPS/EPS mode', '<10ms to 30ms (varies by model)'], ['Power station without UPS mode', 'Power cuts until you replug']] } },
          'Desktop computer power supplies are designed to ride through brief interruptions. The ATX design guidance calls for roughly 16ms of hold-up at full load, but cheaper supplies often manage less, and heavy loads shorten it. A 20-30ms gap can reboot some PCs.',
          { table: { head: ['Device', 'Sensitive to a 20-30ms gap?'], rows: [['Wi-Fi router and modem', 'Usually not, many reboot gracefully'], ['Laptop', 'No, it has its own battery'], ['Fridge, freezer, sump pump', 'No'], ['CPAP', 'Usually not; may restart therapy'], ['Desktop PC', 'Sometimes'], ['NAS or home server', 'Sometimes, and a reboot risks data'], ['Aquarium pumps, lights', 'No']] } },
          { tip: 'Test it. Plug your device into the power station, plug the station into the wall, then flip the wall outlet\'s breaker. If the device stays on several times in a row, you are fine.' }
        ]
      },
      {
        h: 'Battery wear and keeping it plugged in',
        blocks: [
          'Lithium iron phosphate cells are tolerant, but no lithium battery likes sitting at 100% charge in a warm spot for months. If your station lets you set a charge limit, 80-90% for everyday UPS duty is a good balance, then charge to 100% when a storm is forecast.',
          { ul: [
            'Give it airflow. Fans run more in UPS mode.',
            'Keep it out of hot closets and direct sun.',
            'Do a real discharge every few months to confirm the backup works and keep the battery gauge accurate.'
          ] },
          'More on long-term care in [how to store and maintain a power station](/blog/power-station-storage-maintenance).'
        ]
      },
      {
        h: 'Good uses for a power station as a UPS',
        blocks: [
          { ul: [
            '**Home network:** keep Wi-Fi running for a day or more. See [keeping the internet on during an outage](/blog/keep-internet-on-power-outage).',
            '**Medical devices:** CPAP backup is a classic use. See [can a solar generator run a CPAP](/blog/cpap-machine-solar-generator).',
            '**Fridge or freezer:** automatic protection while you are away.',
            '**Sump pump:** if the station\'s surge rating suits the pump. See the [sump pump backup guide](/blog/sump-pump-battery-backup).'
          ] },
          'For a gaming PC or workstation where a reboot loses work, a small line-interactive or online UPS in front of the computer, fed by the power station, gives you both instant switchover and long runtime.'
        ]
      },
      {
        h: 'Sizing it',
        blocks: [
          'Add up the watts of everything plugged in, then use the runtime formula from [watts vs watt-hours](/blog/watts-vs-watt-hours-explained). Make sure the inverter covers any motor startup too. Our [surge watts guide](/blog/surge-watts-vs-running-watts) explains how.'
        ]
      }
    ],
    faqs: [
      { q: 'Can a portable power station be used as a UPS?', a: 'Yes, if it has a UPS or EPS mode. Switchover times of 10-30ms are fine for most home devices, but some desktop PCs and servers may reboot.' },
      { q: 'Is pass-through charging bad for the battery?', a: 'On units that bypass the battery while on grid power, wear is minimal. On units that run everything through the battery constantly, it adds cycles and heat. A charge limit helps either way.' },
      { q: 'How long will a power station UPS run my computer?', a: 'Divide usable watt-hours by the computer\'s draw. A 1,000Wh station running a 200W desktop and monitor lasts roughly 4 hours.' }
    ],
    cta: { title: 'Find your backup runtime', text: 'Plug in your device watts and battery size.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/products/portable-power-stations', label: 'Portable Power Stations' }] }
  },

  'lifepo4-battery-cold-weather': {
    intro: 'Lithium iron phosphate (LiFePO4) is the go-to chemistry for solar storage and power stations: thousands of cycles, stable, safe. Its one real weakness is cold charging. Charge it below freezing and you can permanently damage it, even though it will happily discharge in the cold. Here is what to know before winter.',
    takeaways: [
      'Do not charge LiFePO4 below 32°F (0°C). It causes lithium plating and permanent damage.',
      'Discharging is fine down to about -4°F (-20°C), with reduced capacity.',
      'Expect roughly 70-80% of rated capacity at 14°F (-10°C).',
      'Use a battery with low-temperature charge protection or built-in heating, and keep it insulated or indoors.'
    ],
    sections: [
      {
        h: 'Why cold charging is harmful',
        blocks: [
          'When a lithium battery charges, lithium ions move into the graphite anode. In the cold, that process slows down. Push current in anyway and the ions build up on the anode\'s surface as metallic lithium, called plating, instead of slotting in. Plating permanently reduces capacity and, in severe cases, can grow into internal shorts.',
          'It is invisible: the battery seems fine, but capacity drops a little more after every cold charge.'
        ]
      },
      {
        h: 'Temperature limits at a glance',
        blocks: [
          { table: { head: ['Temperature', 'Charging', 'Discharging'], rows: [['Above 50°F (10°C)', 'Normal', 'Normal'], ['32-50°F (0-10°C)', 'Reduced current recommended', 'Normal, slightly reduced capacity'], ['14-32°F (-10-0°C)', 'Do not charge', 'OK, about 70-85% capacity'], ['-4-14°F (-20 to -10°C)', 'Do not charge', 'OK on most batteries, reduced capacity and power'], ['Below -4°F (-20°C)', 'Do not charge', 'Check manufacturer limits']] } },
          'Always check your battery\'s datasheet. Limits differ slightly by manufacturer, and many cap charge current between 0°C and 10°C.'
        ]
      },
      {
        h: 'How batteries protect themselves',
        blocks: [
          { ul: [
            '**Low-temperature charge cutoff:** a battery management system (BMS) with a temperature sensor blocks charging below about 32°F. Most quality LiFePO4 batteries and power stations have this, but budget batteries may not.',
            '**Self-heating batteries:** incoming charge current first powers internal heating pads, and charging begins only once the cells are above freezing.',
            '**External heating pads:** silicone pads controlled by a thermostat, powered by the solar charger, for DIY battery boxes.'
          ] },
          { warn: 'If your battery has no low-temperature cutoff, your solar charge controller may have one. Many MPPT controllers accept a battery temperature sensor. Without either, the battery will charge in the cold and degrade.' }
        ]
      },
      {
        h: 'Practical winter setups',
        blocks: [
          { ul: [
            '**Power stations at home:** keep them in the heated part of the house. If solar panels are outside, run the cable in, but keep the station inside.',
            '**Vans and RVs:** install batteries inside the living space, not in exterior compartments. They stay warm with the cabin. The [van life solar setup guide](/blog/van-life-solar-setup-guide) covers placement.',
            '**Cabins left unheated:** use self-heating batteries, or an insulated battery box with a thermostat-controlled heating pad.',
            '**Winter camping:** keep a small power station in the tent or vehicle and wrapped in a sleeping bag overnight.'
          ] },
          'A 12V fridge or diesel heater running overnight draws from the battery, which is fine. It is only charging that is the problem. For fridge sizing see [powering a 12V fridge off-grid](/blog/12v-fridge-off-grid-power), and if you charge from your vehicle, read [charging a power station from your car](/blog/charge-power-station-from-car).'
        ]
      },
      {
        h: 'Cold also means less solar and lower capacity',
        blocks: [
          'Winter brings fewer sun hours and a lower sun angle at the same time as reduced battery capacity. Size winter systems on the worst month, not the annual average. Use the [seasonal tilt adjustment calculator](/calculators/seasonal-tilt-adjustment) and the [battery autonomy calculator](/calculators/battery-autonomy) to plan for it.',
          'One upside: solar panels are more efficient in the cold, and panel voltage rises. Make sure your string voltage stays under your charge controller\'s limit on the coldest morning. The [PV string voltage calculator](/calculators/pv-string-voltage) checks this.',
          'For long-term care beyond winter, see [how to store and maintain a power station](/blog/power-station-storage-maintenance), and our [winter power outage checklist](/blog/winter-power-outage-checklist) for preparing the house.'
        ]
      }
    ],
    faqs: [
      { q: 'What happens if you charge a LiFePO4 battery below freezing?', a: 'Lithium plates onto the anode instead of being absorbed, permanently reducing capacity and in severe cases creating internal shorts. Most good batteries block charging below 32°F to prevent it.' },
      { q: 'Can LiFePO4 batteries be stored in the cold?', a: 'Yes. Storage and discharge are fine well below freezing. Just let the battery warm above 32°F (0°C) before charging.' },
      { q: 'Are self-heating LiFePO4 batteries worth it?', a: 'For batteries in unheated spaces that charge from solar in winter, yes. If the battery lives indoors or in a heated vehicle, a standard battery with low-temperature cutoff is enough.' }
    ],
    cta: { title: 'Plan for winter capacity', text: 'Size your battery bank for the coldest, darkest stretch of the year.', links: [{ href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }, { href: '/calculators/battery-bank-sizing', label: 'Battery Bank Sizing' }] }
  },

  '12v-vs-24v-vs-48v-solar-system': {
    intro: 'The nominal voltage of your battery bank, 12V, 24V or 48V, shapes every other part of an off-grid build: cable sizes, fuses, charge controller choice, inverter options and cost. It is also the hardest decision to change later. The good news is that one simple rule covers most systems.',
    takeaways: [
      'Power = volts × amps. Doubling voltage halves the current for the same power.',
      'Lower current means thinner, cheaper cables and less energy lost as heat.',
      'Rule of thumb: under 1,500W → 12V; 1,500-3,000W → 24V; over 3,000W or whole-home → 48V.',
      'Vehicles and small campers usually stay 12V to match the vehicle electrical system.'
    ],
    sections: [
      {
        h: 'It all comes down to current',
        blocks: [
          'For a given amount of power, current falls as voltage rises: **amps = watts ÷ volts**. Here is a 3,000W inverter at full load, assuming 90% efficiency (3,333W drawn from the battery):',
          { table: { head: ['System voltage', 'Battery current', 'Typical cable (short run)', 'Main fuse'], rows: [['12V (12.8V)', '~260A', '4/0 AWG', '300-400A'], ['24V (25.6V)', '~130A', '1/0-2/0 AWG', '150-200A'], ['48V (51.2V)', '~65A', '4-6 AWG', '80-100A']] } },
          'At 12V you are dealing with welding-cable sizes, expensive lugs and crimpers, and noticeable voltage drop. At 48V, the same power runs through cable you could bend by hand. Check your own runs with the [voltage drop calculator](/calculators/voltage-drop) and [solar wire size calculator](/calculators/solar-wire-size).'
        ]
      },
      {
        h: 'Charge controllers get more capable at higher voltage',
        blocks: [
          'A charge controller is rated in amps on the battery side, so the solar power it can handle scales with battery voltage:',
          { table: { head: ['MPPT controller', 'At 12V', 'At 24V', 'At 48V'], rows: [['30A', '~390W', '~780W', '~1,560W'], ['40A', '~520W', '~1,040W', '~2,080W'], ['60A', '~780W', '~1,560W', '~3,120W']] } },
          'Going from 12V to 48V lets one controller handle four times the array. See [MPPT vs PWM charge controllers](/blog/mppt-vs-pwm-charge-controller) for why MPPT is essential at these sizes, and use the [charge controller sizing calculator](/calculators/charge-controller-sizing).'
        ]
      },
      {
        h: 'When each voltage makes sense',
        blocks: [
          { table: { head: ['', '12V', '24V', '48V'], rows: [['Inverter size', 'Up to ~1,500W', '1,500-3,000W', '3,000W and up'], ['Typical use', 'Vans, small RVs, boats, sheds', 'Large RVs, cabins, workshops', 'Tiny homes, off-grid houses, whole-home backup'], ['Pros', 'Matches vehicle systems; huge range of 12V appliances', 'Good middle ground; moderate cable sizes', 'Lowest current; most efficient; widest inverter choice'], ['Cons', 'Heavy cables at high power', 'Fewer 24V appliances; needs a converter for 12V loads', 'Needs a DC-DC converter for 12V loads; more care with voltage safety']] } },
          { tip: 'Need 12V loads like lights or a fridge on a 24V or 48V system? A DC-DC step-down converter (typically 90-95% efficient) feeds them easily.' }
        ]
      },
      {
        h: 'Building the bank',
        blocks: [
          'You reach higher voltages by wiring batteries in series: two 12V batteries make 24V, four make 48V. Many manufacturers also sell native 24V and 48V LiFePO4 batteries and server-rack modules, which avoid series balancing issues. The [battery series/parallel calculator](/calculators/battery-series-parallel) shows the combinations, and our wiring diagrams cover [12V](/wiring-diagrams/12v-system), [24V](/wiring-diagrams/24v-system) and [48V](/wiring-diagrams/48v-system) systems.',
          { warn: 'Only connect identical batteries (same model, age and state of charge) in series, and check the manufacturer allows series connection and the maximum number in series.' }
        ]
      },
      {
        h: 'Putting it into practice',
        blocks: [
          'A 48V system is the default for anything house-sized. Our [tiny house solar sizing example](/blog/tiny-house-solar-system) walks through one. If you need 240V for a [well pump](/blog/well-pump-power-outage), split-phase inverter-chargers are almost always 48V. For vans and campers, 12V keeps things simple. Pair it with an alternator charger as in [charging from your car](/blog/charge-power-station-from-car).',
          'Whatever voltage you choose, size the array for real output, not label watts. See [why solar panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated).'
        ]
      }
    ],
    faqs: [
      { q: 'Is 24V better than 12V for solar?', a: 'For systems above about 1,500W, yes. Current is halved, so cables are thinner, losses lower and the same charge controller handles twice the solar power.' },
      { q: 'Can I run 12V appliances on a 48V system?', a: 'Yes, with a DC-DC step-down converter sized for the 12V loads, or by running them from the inverter\'s AC output with their own adapters.' },
      { q: 'Can I change my system from 12V to 24V later?', a: 'Usually only by replacing the inverter, often the charge controller and DC loads, and rewiring the batteries. That is why it pays to choose the voltage for where the system will end up.' }
    ],
    cta: { title: 'Size your off-grid system', text: 'Get panel, battery and inverter sizes for 12V, 24V or 48V.', links: [{ href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }, { href: '/calculators/battery-series-parallel', label: 'Battery Series/Parallel' }] }
  },

  'mppt-vs-pwm-charge-controller': {
    intro: 'A charge controller sits between your solar panels and your battery, and there are two kinds: cheap PWM and pricier MPPT. Marketing aside, the difference comes down to one thing: what happens to the gap between panel voltage and battery voltage. With PWM, it is thrown away. With MPPT, it is converted into extra charging current.',
    takeaways: [
      'PWM connects the panel directly to the battery, pulling panel voltage down to battery voltage.',
      'MPPT converts excess voltage into extra current, recovering typically 10-30% more energy.',
      'With high-voltage residential panels on a 12V battery, PWM can waste more than half the power.',
      'PWM is fine for small 12V systems using matched "12V" panels, roughly under 200W.'
    ],
    sections: [
      {
        h: 'How PWM works',
        blocks: [
          'A PWM (pulse width modulation) controller is essentially a fast switch. During bulk charging it connects the panel straight to the battery, so the panel is forced to operate at the battery\'s voltage, around 13-14V for a 12V bank. Near full charge it switches on and off rapidly to hold the voltage steady.',
          'The problem: solar panels produce their maximum power at their own voltage, called Vmp. A "12V" panel has a Vmp around 18V. Forced down to 13.5V, it delivers the same current, but at lower voltage, so less power.'
        ]
      },
      {
        h: 'How MPPT works',
        blocks: [
          'An MPPT (maximum power point tracking) controller is a DC-DC converter. It continuously finds the voltage where the panel produces the most power, then converts that down to battery voltage, and the excess voltage becomes extra current. Good MPPT controllers are 95-98% efficient.'
        ]
      },
      {
        h: 'The math: one 100W panel',
        blocks: [
          'Take a typical 100W panel: Vmp 18V, Imp 5.56A, charging a 12V LiFePO4 battery at 13.5V.',
          { table: { head: ['', 'PWM', 'MPPT'], rows: [['Panel operates at', '13.5V (battery voltage)', '18V (max power point)'], ['Current to battery', '~5.6A', '~7.1A'], ['Power to battery', '~75W', '~96W'], ['Energy over 5 sun hours', '~375Wh', '~480Wh']] } },
          'That is about 28% more energy from the same panel. In cold weather, when panel voltage rises, the gap grows. On very hot days it shrinks, because heat lowers panel voltage. Our [temperature coefficient calculator](/calculators/temperature-coefficient-loss) shows the effect.',
          { warn: 'With a 60-cell residential panel (Vmp around 32V) on a 12V battery, a PWM controller would hold it at about 13.5V and deliver roughly 125W from a 300W panel. Never pair high-voltage panels with PWM.' }
        ]
      },
      {
        h: 'When PWM is still fine',
        blocks: [
          { ul: [
            'Small 12V systems under about 200W: a shed light, a trickle-charger for a boat or RV battery.',
            'Panels sold as "12V" (36-cell, Vmp around 18V) matched to a 12V battery.',
            'Hot climates, where panel voltage sags closer to battery voltage anyway.',
            'Tight budgets, where the extra $80-150 for MPPT would buy another panel instead.'
          ] },
          'For everything else, especially systems over 400W, 24V/48V banks, or series-wired panels, MPPT pays for itself quickly. It also lets you wire panels in series at higher voltage, using thinner cables. See [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system).'
        ]
      },
      {
        h: 'Buying tips',
        blocks: [
          { ul: [
            '**Check the max PV input voltage (Voc)**, such as 100V or 150V, and make sure your string\'s cold-weather Voc stays below it. Use the [PV string voltage calculator](/calculators/pv-string-voltage).',
            '**Size the current rating** with the [charge controller sizing calculator](/calculators/charge-controller-sizing).',
            '**Beware fake MPPT.** Very cheap, light controllers labeled MPPT are sometimes PWM inside. A real MPPT unit has a substantial heatsink and inductors, and lists tracking efficiency.',
            '**Power stations already have MPPT built in.** You only choose a controller for DIY battery systems.'
          ] },
          'Getting less than expected even with MPPT? That is normal. See [why solar panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated). Browse [charge controllers](/products/charge-controllers), or see how controllers fit into a full system in our [tiny house sizing example](/blog/tiny-house-solar-system) and [portable solar panel buying guide](/blog/portable-solar-panel-buying-guide).'
        ]
      }
    ],
    faqs: [
      { q: 'Is MPPT really better than PWM?', a: 'Yes, typically 10-30% more energy with matched 12V panels, and far more with higher-voltage panels. PWM only makes sense for small, budget 12V systems.' },
      { q: 'Can I use a 24V panel with a 12V PWM controller?', a: 'It will work, but wastes roughly half of the panel\'s power because the panel is pulled down to battery voltage. Use MPPT instead.' },
      { q: 'What size MPPT controller do I need?', a: 'Divide total array watts by battery voltage, then add about 25% headroom. A 400W array on 12V needs roughly a 40A controller.' }
    ],
    cta: { title: 'Pick the right controller', text: 'Get amps and voltage limits for your array and battery.', links: [{ href: '/calculators/charge-controller-sizing', label: 'Charge Controller Sizing' }, { href: '/calculators/pv-string-voltage', label: 'PV String Voltage Calculator' }] }
  },

  'why-solar-panels-produce-less-than-rated': {
    intro: 'You unbox a new 100W panel, point it at the sun, and your power station shows 68W. Is it faulty? Almost certainly not. Panel ratings come from a lab test that real rooftops and campsites rarely match. Knowing where the missing watts go helps you size systems correctly, and spot real problems when they happen.',
    takeaways: [
      'Panels are rated at Standard Test Conditions (STC): 1,000 W/m² sunlight with cells at 77°F (25°C).',
      'In real sun, cells run 35-55°F hotter than the air, costing 8-15% of output.',
      'Expect 70-85% of rated watts at midday in good sun.',
      'For sizing, use: daily Wh ≈ panel watts × peak sun hours × 0.75.'
    ],
    sections: [
      {
        h: 'What the label actually means',
        blocks: [
          'A panel\'s watt rating is measured at **Standard Test Conditions**: 1,000 watts of sunlight per square meter, a cell temperature of 25°C (77°F) and a specific light spectrum. In a lab, the panel is flashed with light for a fraction of a second, so the cells stay cool.',
          'Outdoors, 1,000 W/m² only happens around noon on clear days with the panel aimed squarely at the sun. And cells in full sun are never at 25°C. Many datasheets also list an **NOCT** or **NMOT** rating under more realistic conditions, usually 72-76% of the STC figure. That number is a far better guide.'
        ]
      },
      {
        h: 'Where the watts go',
        blocks: [
          { table: { head: ['Loss', 'Typical impact', 'What you can do'], rows: [['Heat (temperature coefficient)', '5-15%', 'Leave airflow behind panels; choose a lower temperature coefficient'], ['Sunlight below 1,000 W/m²', 'Varies through the day', 'Nothing. It is physics, so plan with peak sun hours'], ['Angle and orientation', '0-30%+', 'Tilt and aim correctly; adjust portable panels'], ['Dirt, dust, pollen', '2-7% (more in dry areas)', 'Clean periodically'], ['Partial shading', 'Can exceed 50%', 'Avoid shade; check bypass diodes and wiring'], ['Wiring and connectors', '1-3%', 'Use the right gauge and short runs'], ['Charge controller / conversion', '2-5% (MPPT), more with PWM', 'Use MPPT'], ['Age', '~0.5% per year', 'Expected; covered by warranty']] } },
          'Calculate the individual losses with our [temperature coefficient](/calculators/temperature-coefficient-loss), [dust and soiling](/calculators/dust-soiling-loss), [shading impact](/calculators/shading-impact) and [panel degradation](/calculators/panel-degradation) calculators.'
        ]
      },
      {
        h: 'Heat: the biggest everyday loss',
        blocks: [
          'Every panel has a temperature coefficient of power, typically -0.30% to -0.40% per °C. On an 86°F (30°C) day, cells can reach 140°F (60°C), 35°C above the test temperature:',
          '**35°C × -0.35%/°C ≈ 12% less power**',
          'Portable panels lying flat on hot ground or on a van roof without an air gap run even hotter. Ironically, panels perform best on cold, clear days.'
        ]
      },
      {
        h: 'Angle and the sun\'s path',
        blocks: [
          'Output drops as the sun moves away from perpendicular. Fixed panels pointed the wrong way can lose a lot: a panel facing east instead of south loses roughly 15-20% annually at typical US latitudes. Find the best angle with the [solar panel tilt angle calculator](/calculators/solar-panel-tilt-angle) and [azimuth loss calculator](/calculators/solar-panel-azimuth-loss). For portable panels, re-aiming two or three times a day recovers much of the loss.'
        ]
      },
      {
        h: 'The number to plan with',
        blocks: [
          'Rather than fighting each loss separately, use a combined derate factor of about 0.75 for well-installed systems (0.65-0.70 for portable panels that are not re-aimed):',
          '**Daily energy (Wh) ≈ panel watts × peak sun hours × 0.75**',
          { table: { head: ['Array', '3 sun hours (winter)', '5 sun hours (summer)'], rows: [['100W', '~225Wh', '~375Wh'], ['200W', '~450Wh', '~750Wh'], ['400W', '~900Wh', '~1,500Wh'], ['1,000W', '~2,250Wh', '~3,750Wh']] } },
          'Find your location\'s sun hours with the [solar irradiance by city calculator](/calculators/solar-irradiance-by-city), and turn panel watts into expected output with the [solar panel output calculator](/calculators/solar-panel-output).',
          { tip: 'When is low output a real problem? If a panel in full midday sun, correctly aimed and cool, gives under 60% of its rating, check connectors, cable gauge, shading on any cell, and whether the battery is already full. A full battery limits how much power the charger accepts.' }
        ]
      },
      {
        h: 'Related reading',
        blocks: [
          'Controller choice makes a big difference to how much reaches the battery: see [MPPT vs PWM](/blog/mppt-vs-pwm-charge-controller). Buying portable panels? Our [portable solar panel buying guide](/blog/portable-solar-panel-buying-guide) covers what to look for. For sizing a full system, see the [tiny house worked example](/blog/tiny-house-solar-system), and if the units are confusing, start with [watts vs watt-hours](/blog/watts-vs-watt-hours-explained).'
        ]
      }
    ],
    faqs: [
      { q: 'How much power does a 100W solar panel really produce?', a: 'Typically 70-85W at midday in good sun, and about 300-400Wh per day in 4-5 peak sun hours.' },
      { q: 'Why is my solar panel producing low wattage?', a: 'Usually heat, sun angle, haze or partial shade. It can also be that the battery is nearly full, so the controller is limiting charge. Very low output in full sun points to a connector, cable or shading issue.' },
      { q: 'Do solar panels work better in cold weather?', a: 'Yes. Cooler cells produce higher voltage and more power, though shorter winter days and a lower sun reduce total daily energy.' }
    ],
    cta: { title: 'Estimate your real solar output', text: 'Use your location, tilt and panel specs instead of the label.', links: [{ href: '/calculators/solar-panel-output', label: 'Solar Panel Output Calculator' }, { href: '/calculators/solar-production-by-location', label: 'Solar Production by Location' }] }
  },

  'power-station-storage-maintenance': {
    intro: 'Most home backup power stations spend months in a closet between storms. A modern LiFePO4 power station can last a decade or more, but only if it is stored at the right charge, kept at sensible temperatures and checked occasionally. These are the habits that protect your investment, and make sure it works when you need it.',
    takeaways: [
      'For long-term storage, keep the charge around 50-60%, unless your manual says otherwise.',
      'Check and top up every 3 months. Never let it sit empty.',
      'Store between 59-77°F (15-25°C), and never leave it in a hot car.',
      'Charge to 100% before storm season or a forecast outage.'
    ],
    sections: [
      {
        h: 'The right storage charge',
        blocks: [
          'Lithium batteries age fastest when they sit at full charge in heat, and they can be damaged if they drain to zero and stay there. The middle is the comfortable spot. Most manufacturers recommend storing at roughly 50-60%.',
          'That conflicts with being ready for an outage, so there are two sensible approaches:',
          { ul: [
            '**Seasonal:** store at about 60% in the off-season, and charge to 100% at the start of storm or winter season.',
            '**Always ready:** keep it plugged in with a charge limit of 80-90% if the unit supports it, and raise it to 100% when an outage is forecast.'
          ] },
          'If you use the station as an always-on UPS, see [pass-through charging and UPS mode](/blog/pass-through-charging-ups-power-station) for how to keep battery wear low.'
        ]
      },
      {
        h: 'Self-discharge and top-ups',
        blocks: [
          'LiFePO4 cells themselves lose only a few percent per month, but a power station\'s electronics, such as the BMS, display standby and wireless modules, draw a little extra. Real-world loss is typically 1-5% per month when the unit is switched fully off.',
          { ol: [
            'Turn the unit fully off, including Wi-Fi/Bluetooth, before storing.',
            'Set a reminder every 3 months to check the charge.',
            'Top up to your storage level if it has dropped below about 30%.'
          ] },
          { warn: 'Do not store a power station fully discharged. If the battery drains below the BMS cutoff, some units refuse to charge again without service.' }
        ]
      },
      {
        h: 'Temperature',
        blocks: [
          { table: { head: ['Condition', 'Range', 'Notes'], rows: [['Ideal storage', '59-77°F (15-25°C)', 'A closet in the living space is perfect'], ['Acceptable storage', '14-113°F (-10-45°C)', 'Check your manual\'s limits'], ['Charging', '32-104°F (0-40°C)', 'No charging below freezing'], ['Avoid', 'Hot cars, attics, direct sun', 'Car interiors can exceed 140°F (60°C)']] } },
          'Garages are the most common mistake: hot in summer, freezing in winter. If yours lives in a garage, bring it inside for charging in winter. Our [LiFePO4 cold weather guide](/blog/lifepo4-battery-cold-weather) explains why.'
        ]
      },
      {
        h: 'Exercise it a few times a year',
        blocks: [
          'Every 3-6 months, use the station: run a lamp or a fridge down to about 30%, then recharge fully. This confirms everything works, calibrates the battery gauge, and gets you familiar with it before an emergency. It is also a good moment to:',
          { ul: [
            'Install firmware updates through the app, as they often improve charging and BMS behavior.',
            'Blow dust out of vents and check fans spin freely.',
            'Inspect cables, solar connectors and the AC charging cord for damage.',
            'Test solar charging so you know your panels and cables still work. See [portable solar panel buying guide](/blog/portable-solar-panel-buying-guide) for connector types.'
          ] }
        ]
      },
      {
        h: 'How long will it last?',
        blocks: [
          'LiFePO4 power stations are commonly rated for 3,000+ cycles to 80% capacity. Even with a full cycle every week, that is over 50 years of cycles, so in practice calendar aging, from time, heat and storage charge, sets the lifespan, typically 10-15 years with good care. Older NMC lithium-ion units (often rated 500-1,000 cycles) are more sensitive to heat and full-charge storage.',
          'See how depth of discharge and cycles affect cost per kWh with the [battery DoD degradation calculator](/calculators/battery-dod-degradation) and [battery lifetime cost calculator](/calculators/battery-lifetime-cost), and the [battery capacity fade calculator](/calculators/battery-capacity-fade) for expected capacity over time.'
        ]
      },
      {
        h: 'Safety and end of life',
        blocks: [
          { ul: [
            'Store on a hard, non-flammable surface away from heat sources and clutter.',
            'Stop using any unit that is swollen, smells unusual, hisses or has been dropped hard or soaked.',
            'Recycle through a battery recycling program or the manufacturer. Do not put lithium batteries in household trash.'
          ] },
          'Charging on the road between uses? See [charging a power station from your car](/blog/charge-power-station-from-car). New to the specs? Start with [watts vs watt-hours](/blog/watts-vs-watt-hours-explained) and our [battery technology explainer](/blog/solar-battery-technology-explained).'
        ]
      }
    ],
    faqs: [
      { q: 'Should I keep my power station plugged in all the time?', a: 'It is fine if it has a bypass/UPS mode and ideally a charge limit around 80-90%. Otherwise, store it at about 60% and top it up every few months.' },
      { q: 'How often should I charge a power station in storage?', a: 'Check it every 3 months and top it up if it has dropped below about 30%. Charge to 100% before storm season.' },
      { q: 'Can I store a power station in the garage?', a: 'Only if the garage stays roughly between 14°F and 104°F, and never charge it below freezing. A closet inside the house is better.' }
    ],
    cta: { title: 'Understand your battery\'s lifespan', text: 'See how cycles, depth of discharge and age affect capacity and cost.', links: [{ href: '/calculators/battery-capacity-fade', label: 'Battery Capacity Fade' }, { href: '/calculators/battery-lifetime-cost', label: 'Battery Lifetime Cost' }] }
  }
}
