// lib/wiring/content/systems.js
// Article bodies for complete-system and home backup wiring diagrams. Inline links use [text](/path), bold uses **text**.

export const systemsContent = {
  'shed-solar-system': {
    intro: 'A shed, small workshop or garden office rarely needs much power: some LED lights, a radio, battery chargers and the occasional small tool. A single 200W panel, a 20A MPPT controller and a 100Ah LiFePO4 battery cover that comfortably. This diagram shows the whole system, fused and grounded.',
    takeaways: [
      'Panel → controller → battery is the core; everything else hangs off the battery.',
      'Lights can run from the controller\'s load output, which disconnects them before the battery is flattened.',
      'Fuse the controller-to-battery and battery-to-inverter cables close to the battery.',
      'A 300W pure sine inverter handles chargers and small electronics; tools need a much larger one.'
    ],
    components: [
      ['Solar panel', '200W, ~18-22V Vmp', 'Daily charging'],
      ['MPPT charge controller', '20A with load output', 'Charges battery, switches lights'],
      ['LiFePO4 battery', '12V 100Ah (1.28kWh)', 'Storage'],
      ['Fuses', '30A (controller), 40A (inverter)', 'Cable protection'],
      ['Pure sine inverter', '300W', 'AC outlet for chargers'],
      ['LED lighting', '12V, 10-30W total', 'Lights'],
      ['Ground rod', 'Per local code', 'Frame and equipment grounding']
    ],
    steps: [
      'Mount the panel on the roof or a south-facing frame (north-facing in the southern hemisphere), and bond its frame to ground.',
      'Connect the battery to the controller first (with the 30A fuse near the battery), so the controller detects 12V.',
      'Connect the panel to the controller\'s PV input.',
      'Wire the LED lights to the controller\'s load terminals and set the load disconnect voltage.',
      'Connect the inverter to the battery with the 40A fuse and 8 AWG cable, then plug in the outlet or use the inverter\'s sockets.'
    ],
    sections: [
      {
        h: 'Will it be enough?',
        blocks: [
          'A 200W panel produces about 600-750Wh on a good summer day and 300-450Wh in winter, after real-world losses. That covers several hours of lights, charging tool batteries and a radio. For saws or compressors, see [running power tools on a solar generator](/blog/power-tools-solar-generator-jobsite). The full planning process is in our [shed solar power guide](/guides/shed-solar-power).',
          'For larger systems, compare the [basic off-grid diagram](/wiring-diagrams/basic-off-grid) and [12V system diagram](/wiring-diagrams/12v-system).'
        ]
      }
    ],
    mistakes: [
      'Connecting the panel before the battery, which can confuse or damage some controllers.',
      'Running an inverter from the controller\'s load output instead of the battery.',
      'Leaving the battery in a shed that drops below freezing while solar keeps charging it. Choose a battery with low-temperature charge protection.',
      'No fuses because "it\'s only 12V".'
    ],
    faqs: [
      { q: 'How big a solar system do I need for a shed?', a: 'For lights and charging, 100-200W of panels with a 50-100Ah LiFePO4 battery. For regular tool use, 400W+ and a 2kWh+ battery or power station.' },
      { q: 'Can I run the inverter from the controller\'s load output?', a: 'No. Load outputs are usually rated 10-20A. Connect inverters directly to the battery with a fuse.' },
      { q: 'Does a shed solar system need grounding?', a: 'Bonding the panel frame and metal enclosures to a grounding electrode is good practice and often required. Check local code.' }
    ],
    cta: { title: 'Size your shed system', text: 'Add your loads to find panel and battery sizes.', links: [{ href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }, { href: '/calculators/charge-controller-sizing', label: 'Charge Controller Sizing' }] }
  },

  'generator-backup-off-grid': {
    intro: 'Even a well-designed off-grid system meets a week of storms. A backup generator connected to the AC input of an inverter-charger solves that: the inverter-charger passes generator power to your loads while charging the batteries, and with an auto-start connection it can start the generator automatically when the batteries run low.',
    takeaways: [
      'The generator feeds the inverter-charger\'s AC input through a breaker, never the AC loads panel directly.',
      'Set the charger\'s input current limit below the generator\'s continuous rating.',
      'A two-wire auto-start connects a relay in the inverter to the generator\'s remote start terminals.',
      'Inverter generators produce clean power that inverter-chargers accept more reliably.'
    ],
    components: [
      ['Generator', 'Inverter type, sized to charger + loads', 'Backup charging'],
      ['AC input breaker', 'Sized to generator output and input wiring', 'Protects the input circuit'],
      ['Inverter-charger', 'Off-grid, with AC input and auto-start relay', 'Inverts, charges, transfers'],
      ['Auto-start wiring', 'Two-wire to generator remote start', 'Automatic operation'],
      ['Battery bank', '48V LiFePO4 typical', 'Storage'],
      ['Solar array + MPPT', 'Per system sizing', 'Primary charging']
    ],
    steps: [
      'Install a generator inlet or hard-wired connection and run it through a breaker to the inverter-charger\'s AC input.',
      'Connect the inverter-charger\'s AC output to the AC loads panel.',
      'Wire the inverter\'s auto-start relay to the generator\'s two-wire remote start terminals (if supported).',
      'Program the charger profile, AC input current limit and generator start/stop conditions (for example start at 30% state of charge, stop at 85%).',
      'Address neutral-ground bonding per the inverter and generator manuals.',
      'Test a full start, transfer, charge and stop cycle.'
    ],
    sections: [
      {
        h: 'Sizing the generator',
        blocks: [
          'Add the charger\'s maximum AC draw to the loads you expect to pass through while it runs. A 48V charger delivering 60A (about 3.4kW) plus 1kW of loads needs a generator of around 4.5-5kW continuous, or you can lower the charger\'s current limit to fit a smaller generator. Charging only to about 85% before stopping avoids running the generator through the slow final stage.',
          'For the whole design process, see [how to size an off-grid solar system](/guides/off-grid-solar-system-sizing) and the [off-grid cabin guide](/guides/off-grid-cabin-solar). Need 240V output? Combine this with [split-phase stacked inverters](/wiring-diagrams/split-phase-240v-inverters).'
        ]
      }
    ],
    mistakes: [
      'Feeding generator power straight into the AC panel, bypassing the inverter.',
      'Charger current limit set higher than the generator can supply, causing stalls.',
      'Two neutral-ground bonds when the generator and inverter both bond.',
      'Running the generator to 100% state of charge every time, wasting fuel.'
    ],
    faqs: [
      { q: 'Can I connect a generator to an off-grid inverter?', a: 'Yes, to an inverter-charger\'s AC input. A plain inverter without a charger cannot use generator power.' },
      { q: 'What size generator do I need for battery charging?', a: 'Enough to cover the charger\'s AC draw plus any loads running at the same time, with margin. Many 48V systems pair with 4-7kW generators.' },
      { q: 'How does generator auto-start work?', a: 'The inverter closes a relay at a set battery level, signaling the generator\'s remote start terminals. It opens the relay when the stop condition is reached.' }
    ],
    cta: { title: 'Plan for cloudy weeks', text: 'Work out how many days your battery covers without sun.', links: [{ href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }, { href: '/calculators/hybrid-solar-system-sizing', label: 'Hybrid System Sizing' }] }
  },

  'solar-water-pump': {
    intro: 'Solar water pumping is one of the most cost-effective uses of solar power. Instead of storing electricity in batteries, a solar-direct system pumps whenever the sun shines and stores the water in a tank. A pump controller with MPPT gets the most from the array, soft-starts the pump and stops it when the tank is full or the well runs low.',
    takeaways: [
      'Store water, not electricity: a tank is cheaper and longer-lasting than batteries.',
      'The pump controller provides MPPT, soft start and dry-run protection.',
      'A float switch in the tank tells the controller to stop when full.',
      'Size the array at roughly 1.2-1.5× the pump\'s rated power to pump through more of the day.'
    ],
    components: [
      ['Solar array', 'Sized to pump power and voltage', 'Power source'],
      ['DC disconnect', 'Rated for array voltage and current', 'Isolation for service'],
      ['Pump controller', 'Matched to the pump, with MPPT', 'Drives the pump efficiently'],
      ['Submersible pump', 'DC brushless or AC with VFD', 'Lifts water'],
      ['Float switch', 'Low-voltage signal type', 'Stops pumping when the tank is full'],
      ['Storage tank', '2-3 days of water use', 'Water storage']
    ],
    steps: [
      'Determine total dynamic head (lift + pipe friction) and daily water need, then choose a pump.',
      'Mount the array; run its output through the DC disconnect to the controller\'s PV input.',
      'Install the pump in the well with a safety rope and run the drop cable to the controller\'s pump terminals.',
      'Install the float switch in the tank and run its signal cable to the controller.',
      'Ground the array, controller and pump per the manuals and local code.',
      'Commission: check flow in full sun and confirm the pump stops when the float rises.'
    ],
    sections: [
      {
        h: 'Sizing at a glance',
        blocks: [
          'Hydraulic power (W) ≈ flow (liters per second) × head (meters) × 9.81 ÷ pump efficiency. Pump manufacturers publish curves showing flow per day for a given head and array size, and those curves are the best sizing tool. As a rule of thumb, DC submersible pumps for homestead wells run on 300-1,500W of solar.',
          'The full process, including tank sizing and livestock needs, is in our [solar water pumping guide](/guides/solar-water-pumping). For conventional grid-style well pumps in an outage, see [running a well pump during a power outage](/blog/well-pump-power-outage).'
        ]
      }
    ],
    mistakes: [
      'Undersizing the tank, so cloudy days mean no water.',
      'Skipping the float switch, so the tank overflows and the pump wears.',
      'Running the pump without dry-run protection in a low-yield well.',
      'Long, thin drop cables that starve the pump of voltage.'
    ],
    faqs: [
      { q: 'Does a solar water pump need a battery?', a: 'Usually not. Solar-direct systems pump during the day and store water in a tank, which is simpler and cheaper than batteries.' },
      { q: 'How much solar do I need for a well pump?', a: 'It depends on head and daily water need. Many homestead DC pumps run on 300-1,500W of panels. Use the manufacturer\'s pump curves.' },
      { q: 'Can a solar pump run on cloudy days?', a: 'At reduced flow. MPPT controllers keep the pump turning in lower light, and a 2-3 day tank covers poor weather.' }
    ],
    cta: { title: 'Estimate your solar output', text: 'See how much energy your array will produce for pumping.', links: [{ href: '/calculators/solar-production-by-location', label: 'Solar Production by Location' }, { href: '/calculators/solar-array-sizing', label: 'Solar Array Sizing' }] }
  },

  'split-phase-240v-inverters': {
    intro: 'North American homes use 120/240V split-phase power: two 120V legs (L1 and L2) 180° apart, giving 240V between them for well pumps, dryers and ranges. Many off-grid inverters are 120V units designed to stack: two of them, linked by a sync cable, produce L1 and L2 with a shared neutral.',
    takeaways: [
      'Two identical stack-capable inverters, linked by a sync cable, produce L1 and L2.',
      '120V circuits use one leg and neutral; 240V circuits use both legs.',
      'The neutral carries only the imbalance between L1 and L2.',
      'Bond neutral to ground in one place only.'
    ],
    components: [
      ['Inverters (2)', 'Identical model, stack-capable, 120V', 'L1 and L2 outputs'],
      ['Sync cable', 'Manufacturer-supplied', 'Keeps outputs 180° apart'],
      ['Battery bank', '48V typical', 'Shared DC source'],
      ['DC fusing', 'Per inverter, sized to its draw', 'Protects each inverter cable'],
      ['120/240V panel', 'Split-phase load center', 'Distributes circuits'],
      ['Double-pole breakers', 'For 240V circuits', 'Protect 240V loads']
    ],
    steps: [
      'Mount both inverters and connect each to the battery bus with its own fuse and equal-length cables.',
      'Connect the sync/stacking cable and set one unit as master per the manual.',
      'Wire inverter 1\'s hot to L1 and inverter 2\'s hot to L2 of the panel; join both neutrals at the panel neutral bar.',
      'Wire 240V loads on double-pole breakers across L1 and L2, and balance 120V circuits between the legs.',
      'Make a single neutral-ground bond and connect the grounding electrode.',
      'Power up, verify 120V L1-N, 120V L2-N and 240V L1-L2 with a meter before connecting loads.'
    ],
    sections: [
      {
        h: 'Balancing the legs',
        blocks: [
          'Each inverter can only supply its own leg. If the 120V loads all sit on L1, inverter 1 can overload while inverter 2 idles. Spread big 120V loads across both legs. 240V loads draw equally from both inverters.',
          'Many newer all-in-one inverters output split-phase from a single unit, which simplifies this. Compare options in [how to choose an inverter](/guides/how-to-choose-an-inverter). If you need 240V mainly for a pump, see [running a well pump in an outage](/blog/well-pump-power-outage).'
        ]
      }
    ],
    mistakes: [
      'Mixing inverter models or firmware versions in a stack.',
      'Unequal DC cable lengths, causing uneven sharing.',
      'Putting all large 120V loads on one leg.',
      'Bonding neutral to ground in the inverters and the panel.'
    ],
    faqs: [
      { q: 'Can two 120V inverters make 240V?', a: 'Only stack-capable models designed for split-phase, linked with the manufacturer\'s sync cable. Two unrelated inverters cannot be combined safely.' },
      { q: 'What happens if the legs are unbalanced?', a: 'The neutral carries the difference, and the more heavily loaded inverter may overload. Spread 120V loads evenly.' },
      { q: 'Do I need split-phase for an off-grid home?', a: 'Only if you have 240V loads such as a well pump, dryer or range. Many smaller off-grid homes run fine on 120V only.' }
    ],
    cta: { title: 'Size your inverters', text: 'Add your 120V and 240V loads.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/inverters-in-parallel', label: 'Inverters in Parallel' }] }
  },

  'ac-subpanel': {
    intro: 'Most home battery inverters cannot run an entire house, so the usual approach is a critical loads subpanel. The circuits that matter in an outage, such as the fridge, furnace, lights and a few outlets, move from the main panel into a subpanel fed by the inverter. When the grid fails, those circuits stay on.',
    takeaways: [
      'The inverter output feeds the subpanel through a feeder breaker sized to the inverter\'s output current.',
      'Choose circuits whose combined running load fits the inverter\'s continuous rating.',
      'In a subpanel, neutral and ground bars stay separate. Bond only at the service or source.',
      'A licensed electrician and a permit are required in most places.'
    ],
    components: [
      ['Inverter or hybrid inverter', 'Continuous rating covers the critical loads', 'Powers the subpanel'],
      ['Feeder breaker and wire', 'Sized to inverter output × 125%', 'Protects the feeder'],
      ['Critical loads subpanel', '8-16 spaces, separate neutral and ground bars', 'Distributes backed-up circuits'],
      ['Branch breakers', 'Moved from the main panel', 'Protect each circuit'],
      ['Battery bank', 'Sized for outage duration', 'Energy storage']
    ],
    steps: [
      'List the circuits you need in an outage and add up their running and startup loads.',
      'Install the subpanel beside the main panel.',
      'Run the feeder from the inverter\'s backup/AC output to the subpanel main lugs or breaker.',
      'Move each critical circuit\'s breaker and conductors from the main panel to the subpanel.',
      'Keep neutrals on the isolated neutral bar and grounds on the ground bar.',
      'Test transfer by switching off grid power and confirming every critical circuit stays on.'
    ],
    sections: [
      {
        h: 'Choosing what goes in the subpanel',
        blocks: [
          { table: { head: ['Good candidates', 'Usually leave out'], rows: [['Refrigerator and freezer', 'Central air conditioning'], ['Furnace blower / boiler controls', 'Electric water heater'], ['Lighting circuits', 'Electric range and dryer'], ['Internet, a few outlets', 'EV charger'], ['Well or sump pump (if inverter allows)', 'Space heaters']] } },
          'Size the feeder breaker to the inverter\'s continuous output current × 1.25. For example, a 6kW inverter at 240V outputs 25A, so a 30-35A feeder. Use the [inverter sizing calculator](/calculators/inverter-sizing) for startup loads, and see the [hybrid inverter diagram](/wiring-diagrams/hybrid-inverter-battery) for how the subpanel fits a grid-tied battery system.'
        ]
      }
    ],
    mistakes: [
      'Moving more circuits than the inverter can run at once.',
      'Bonding neutral and ground in the subpanel.',
      'Forgetting that motors (pumps, furnace) need startup surge capacity.',
      'Splitting a multi-wire branch circuit between panels.'
    ],
    faqs: [
      { q: 'What is a critical loads panel?', a: 'A subpanel containing only the circuits you want powered during an outage, fed by a battery inverter so it stays on when the grid fails.' },
      { q: 'How many circuits can go on a critical loads panel?', a: 'As many as the inverter can run simultaneously. Add up running watts and the largest startup surge, and compare with the inverter\'s ratings.' },
      { q: 'Why are neutral and ground separate in a subpanel?', a: 'So normal return current flows only on neutral conductors. Bonding them in more than one place puts current on ground wires and metal parts.' }
    ],
    cta: { title: 'Check your critical loads', text: 'Make sure your inverter can start and run them.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }] }
  },

  'grid-tie-microinverter': {
    intro: 'In a microinverter system, every panel has its own small inverter mounted underneath it. Each converts DC to grid-synchronized AC right at the panel, so only AC runs from the roof, through a junction box and disconnect, to a backfeed breaker in your main panel. The utility\'s net meter records what you export.',
    takeaways: [
      'Each panel connects to its own microinverter; the micros link via an AC trunk cable.',
      'Branch circuits are limited to a set number of micros per breaker (see the manufacturer\'s table).',
      'The backfeed breaker must satisfy the panel busbar rule (often the "120% rule" in the US).',
      'Grid-tie systems shut down during outages unless paired with batteries and a backup gateway.'
    ],
    components: [
      ['Solar panels', 'Matched to microinverter input rating', 'Generate DC'],
      ['Microinverters', 'One per panel (or per two panels)', 'Convert DC to AC at the panel'],
      ['AC trunk cable', 'Manufacturer system cable', 'Links micros on a branch'],
      ['Junction box', 'Rooftop transition to building wire', 'Connects trunk to home run'],
      ['AC disconnect', 'Lockable, if required by the utility', 'Service isolation'],
      ['Backfeed breaker', '2-pole, sized to branch output', 'Connects to the main panel']
    ],
    steps: [
      'Get the permit and utility interconnection approval before installing.',
      'Mount racking and attach microinverters, then mount panels and plug each into its micro.',
      'Connect the micros together with the trunk cable, observing the per-branch limit, and cap the open end.',
      'Run from the rooftop junction box to the AC disconnect and then to the main panel.',
      'Install the 2-pole backfeed breaker, typically at the opposite end of the busbar from the main breaker.',
      'Pass inspection; the utility installs or programs the net meter before you energize.'
    ],
    sections: [
      {
        h: 'The 120% rule',
        blocks: [
          'In the US, a common rule for load-side connections allows the main breaker plus the solar breaker to total up to 120% of the panel busbar rating. A 200A busbar with a 200A main allows up to 40A of solar backfeed (200 × 1.2 − 200), which is about 7.6kW of AC output at 240V after applying the 125% continuous factor. Larger systems need a supply-side connection or a main breaker downsize. Your installer and inspector will confirm what applies.',
          'Microinverters also simplify rapid shutdown requirements and keep shading on one panel from affecting the rest. Compare architectures in [grid-tie vs off-grid vs hybrid](/guides/grid-tie-vs-off-grid-vs-hybrid). For backup power, see the [hybrid inverter diagram](/wiring-diagrams/hybrid-inverter-battery).'
        ]
      }
    ],
    mistakes: [
      'Exceeding the number of microinverters allowed per branch circuit.',
      'Energizing before utility permission to operate.',
      'Placing the backfeed breaker next to the main breaker where the 120% rule requires the opposite end.',
      'Expecting power during a grid outage without batteries.'
    ],
    faqs: [
      { q: 'Do microinverters work during a power outage?', a: 'No. Grid-tie inverters must shut down when the grid fails (anti-islanding). Backup requires batteries and a system designed to island safely.' },
      { q: 'How many microinverters can be on one circuit?', a: 'It depends on the model\'s output current and breaker size. Manufacturers publish the maximum per 20A branch, often in the range of 7-16 units.' },
      { q: 'Microinverters or string inverter?', a: 'Microinverters handle shading and complex roofs better and allow panel-level monitoring. String inverters are usually cheaper for large unshaded arrays.' }
    ],
    cta: { title: 'Estimate production', text: 'See how much your array could produce where you live.', links: [{ href: '/calculators/solar-production-by-location', label: 'Solar Production by Location' }, { href: '/calculators/grid-tie-inverter-sizing', label: 'Grid-Tie Inverter Sizing' }] }
  },

  'hybrid-inverter-battery': {
    intro: 'A hybrid inverter combines a solar inverter, a battery inverter-charger and a transfer switch. Day to day, it powers your home from solar, charges the battery and exports any surplus. When the grid fails, it disconnects from the grid and keeps the backup loads panel running from solar and battery.',
    takeaways: [
      'Grid, PV, battery and backup loads all connect to the hybrid inverter.',
      'The backup port feeds a separate backup loads panel. Non-backed loads stay in the main panel.',
      'CT clamps on the grid conductors let the inverter measure import and export.',
      'Battery communication (CAN or RS485) lets the inverter follow the battery\'s charge limits.'
    ],
    components: [
      ['Hybrid inverter', '48V battery, 5-12kW', 'Solar, battery and transfer'],
      ['Solar array', 'Within the inverter\'s MPPT voltage/current limits', 'Generation'],
      ['Battery', '48V LiFePO4, 10-30kWh typical', 'Storage'],
      ['Backup loads panel', 'Critical circuits', 'Stays on in outages'],
      ['CT clamps', 'On grid service conductors', 'Measure grid power'],
      ['Grid breaker', 'Sized per inverter and panel rules', 'Grid connection']
    ],
    steps: [
      'Plan which circuits move to the backup loads panel, as in the [critical loads subpanel diagram](/wiring-diagrams/ac-subpanel).',
      'Connect the inverter\'s grid port to a breaker in the main panel.',
      'Connect the backup port to the backup loads panel.',
      'Connect PV strings to the MPPT inputs through disconnects, and the battery through its breaker or fuse.',
      'Install CT clamps on the grid conductors with the arrow pointing as specified, and connect battery communications.',
      'Configure operating mode (self-consumption, backup reserve, time-of-use) and test grid-loss transfer.'
    ],
    sections: [
      {
        h: 'Operating modes',
        blocks: [
          { table: { head: ['Mode', 'What it does', 'Good for'], rows: [['Self-consumption', 'Uses solar and battery first, grid last', 'Lower bills'], ['Backup reserve', 'Keeps a set % for outages', 'Storm-prone areas'], ['Time-of-use', 'Charges cheap, discharges at peak', 'TOU tariffs'], ['Zero export', 'Limits export using CT readings', 'Where export is not allowed']] } },
          'For storm planning, see [hurricane power preparedness](/guides/hurricane-power-preparedness). To compare system types, see [grid-tie vs off-grid vs hybrid](/guides/grid-tie-vs-off-grid-vs-hybrid), and for whole-home battery choices, the [home battery backup guide](/blog/home-battery-backup-guide).'
        ]
      }
    ],
    mistakes: [
      'CT clamps installed backwards, so the inverter thinks you are importing when exporting.',
      'Putting more on the backup panel than the inverter\'s backup rating.',
      'Skipping battery communications, so the inverter cannot respect the battery\'s limits.',
      'Expecting the main panel loads to stay on during outages.'
    ],
    faqs: [
      { q: 'What is the difference between a hybrid inverter and a grid-tie inverter?', a: 'A grid-tie inverter only converts solar to grid power and shuts down in outages. A hybrid inverter also manages a battery and can power backup loads when the grid is down.' },
      { q: 'Does a hybrid inverter power the whole house in an outage?', a: 'Only the circuits on its backup port, unless it is sized and wired for whole-home backup.' },
      { q: 'What do CT clamps do?', a: 'They measure current flowing to and from the grid, so the inverter can maximize self-consumption or limit export.' }
    ],
    cta: { title: 'Size your battery backup', text: 'See how long your battery will carry your backup loads.', links: [{ href: '/calculators/hybrid-inverter-sizing', label: 'Hybrid Inverter Sizing' }, { href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }] }
  },

  'power-station-home-inlet': {
    intro: 'A large portable power station or generator can power selected home circuits during an outage, without extension cords, if it connects through a power inlet box and an interlock kit on your main panel. The interlock physically prevents the main breaker and the backfeed breaker from being on at the same time, so power can never flow back onto utility lines.',
    takeaways: [
      'The power station plugs into an outdoor inlet box with a matching cord (often TT-30 or L14-30).',
      'The inlet feeds a dedicated backfeed breaker in the main panel.',
      'An interlock kit blocks the backfeed breaker unless the main breaker is off.',
      'Turn on circuits one at a time to stay within the power station\'s output and surge rating.'
    ],
    components: [
      ['Power station or generator', '30A output, pure sine', 'Backup source'],
      ['Generator cord', 'Matches outlet and inlet (TT-30 or L14-30)', 'Connects source to inlet'],
      ['Power inlet box', 'Outdoor rated, matching receptacle type', 'Connection point'],
      ['Backfeed breaker', 'Sized to inlet and wiring (e.g. 30A)', 'Feeds the panel'],
      ['Interlock kit', 'Listed for your specific panel', 'Prevents backfeeding the grid']
    ],
    steps: [
      'Have an electrician install the inlet box, wiring and backfeed breaker, and fit the interlock kit (permit required in most areas).',
      'During an outage: switch off the main breaker, then slide the interlock and switch on the backfeed breaker.',
      'Switch off all branch breakers, connect the cord, and power on the power station.',
      'Turn on essential circuits one at a time, watching the power station\'s output reading.',
      'When grid power returns: switch off the backfeed breaker, slide the interlock, switch the main breaker back on, then disconnect the cord.'
    ],
    sections: [
      {
        h: 'Matching the power station to the inlet',
        blocks: [
          'A 120V-only power station with a TT-30 outlet can feed one leg of the panel; 240V circuits will not work. Units with an L14-30 outlet and split-phase output can run 240V loads such as a [well pump](/blog/well-pump-power-outage). Check whether your unit has a floating or bonded neutral, since with an interlock the neutral stays bonded at the main panel.',
          'Comparing options? Read [transfer switch vs interlock kit](/blog/transfer-switch-vs-interlock-kit), and see our [hurricane power preparedness guide](/guides/hurricane-power-preparedness) for planning loads during long outages. For a permanently installed alternative, see the [critical loads subpanel](/wiring-diagrams/ac-subpanel).'
        ]
      }
    ],
    mistakes: [
      'Using a double-ended "suicide cord" instead of an inlet. It is dangerous and illegal.',
      'Installing an interlock not listed for your panel model.',
      'Turning on every breaker at once and overloading the power station.',
      'Placing a fuel generator near doors or windows. Keep it at least 20 feet away and outside.'
    ],
    faqs: [
      { q: 'Can I connect a power station to my house?', a: 'Yes, through a properly installed inlet box and an interlock kit or transfer switch. Never plug into a wall outlet with a double-ended cord.' },
      { q: 'What size inlet do I need?', a: 'Match your power station\'s largest outlet, commonly TT-30 (120V 30A) or L14-30 (120/240V 30A).' },
      { q: 'Will a 120V power station power my whole panel?', a: 'It can power circuits on one leg of the panel only, and only up to its rated output. 240V circuits need a split-phase source.' }
    ],
    cta: { title: 'Check your backup load', text: 'Make sure your power station can start and run the circuits you choose.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }] }
  }
}
