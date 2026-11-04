// lib/wiring/content/components.js
// Article bodies for component-level and solar-array wiring diagrams. Inline links use [text](/path), bold uses **text**.

export const componentsContent = {
  'battery-monitor-shunt': {
    intro: 'A shunt is a precision resistor in the battery\'s negative cable. The battery monitor measures the tiny voltage across it to count every amp going in and out, which gives a far more accurate state of charge than voltage alone, especially with LiFePO4, whose voltage barely changes between 90% and 20%.',
    takeaways: [
      'The shunt goes between the battery negative and everything else.',
      'Only the shunt connects to the battery negative post. All loads and chargers go on the system side.',
      'The monitor needs a small fused positive wire for power and voltage sensing.',
      'Choose a shunt rated above your maximum current, usually set by the inverter.'
    ],
    components: [
      ['Shunt', '300-1,000A depending on system', 'Measures current'],
      ['Battery monitor', 'Display or Bluetooth unit', 'Shows state of charge and history'],
      ['Positive sense wire', '20-18 AWG with 1-2A fuse', 'Powers the monitor, measures voltage'],
      ['Negative bus bar', 'Rated for full current', 'Collects all system negatives'],
      ['Main fuse and switch', 'Per system size', 'Protect and isolate the battery']
    ],
    steps: [
      'Disconnect all charging sources and loads, then remove the battery negative cable.',
      'Mount the shunt close to the battery. Connect its battery-side terminal to the battery negative post with a cable equal in size to your main cable.',
      'Move every negative wire (inverter, chargers, fuse block, negative bus) to the shunt\'s system-side terminal or to a negative bus fed from it.',
      'Run the small positive sense wire from the battery positive (or positive bus) to the shunt or monitor, with an inline fuse close to the positive connection.',
      'Connect the data cable from the shunt to the display, or pair it by Bluetooth.',
      'Enter battery capacity, chemistry and charged-voltage settings, then charge the battery fully to synchronize the monitor.'
    ],
    sections: [
      {
        h: 'Settings that make it accurate',
        blocks: [
          { ul: [
            '**Battery capacity:** the usable Ah of the bank.',
            '**Charged voltage and tail current:** the point where the monitor resets to 100% (for 12V LiFePO4, often about 14.0-14.2V with a tail current around 2-4% of capacity).',
            '**Peukert exponent and charge efficiency:** LiFePO4 is close to ideal; many monitors suggest about 1.05 and 99%.'
          ] },
          'Full setup details, including how to choose a monitor, are in our [battery monitor setup guide](/guides/battery-monitor-setup).'
        ]
      }
    ],
    mistakes: [
      'Leaving one load or charger on the battery negative, so the monitor never sees that current.',
      'Installing the shunt in the positive line (unless it is a high-side model designed for it).',
      'Forgetting the fuse on the positive sense wire.',
      'Never fully charging, so the monitor drifts out of sync.'
    ],
    faqs: [
      { q: 'Why does my battery monitor show the wrong percentage?', a: 'Usually a load or charger bypasses the shunt, the capacity setting is wrong, or the monitor has not synchronized with a full charge recently.' },
      { q: 'What size shunt do I need?', a: 'Pick a rating above the maximum continuous current. A 3,000W 12V inverter can draw about 300A, so a 500A shunt is a common choice.' },
      { q: 'Can I use battery voltage instead of a shunt?', a: 'For lead-acid it is a rough guide. For LiFePO4 it is nearly useless in the middle of the range, which is why a shunt-based monitor is recommended.' }
    ],
    cta: { title: 'Know your real capacity', text: 'See how much of your battery you can actually use.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/calculators/battery-capacity-fade', label: 'Battery Capacity Fade' }] }
  },

  'dc-fuse-block-busbar': {
    intro: 'Once you have more than two or three DC loads, a fuse block and a negative bus bar make wiring safe and tidy. Each circuit gets its own fuse sized to protect its wire, and every negative returns to one bar instead of crowding the battery post.',
    takeaways: [
      'A main fuse and battery switch protect the cable from the battery to the fuse block.',
      'Each branch fuse protects its wire. Size it at or below the wire\'s ampacity.',
      'A good rule: fuse at about 125% of the circuit\'s expected current, never above the wire rating.',
      'Keep voltage drop under 3% on 12V circuits, which often means thicker wire than ampacity alone requires.'
    ],
    components: [
      ['Fuse block', '6-12 ATO/ATC blade circuits, 100A total', 'Branch circuit protection'],
      ['Negative bus bar', 'Matched to the fuse block rating', 'Common negative return'],
      ['Main fuse', 'MRBF, ANL or Class T, sized for the feed cable', 'Protects the feed cable'],
      ['Battery switch', 'Rated above the main fuse', 'Isolates the battery'],
      ['Branch wiring', '16-10 AWG depending on load and length', 'Feeds each device']
    ],
    steps: [
      'Choose a location for the fuse block and negative bar close to the battery and away from water.',
      'Wire battery positive → main fuse (close to the battery) → battery switch → fuse block positive stud.',
      'Wire battery negative (or the shunt\'s system side) → negative bus bar, using cable equal in size to the positive feed.',
      'Run each load\'s positive from its own fuse position, and its negative back to the negative bus.',
      'Fit fuses sized for each wire, label every circuit, and test each load.'
    ],
    sections: [
      {
        h: 'Wire and fuse sizes at a glance',
        blocks: [
          { table: { head: ['Wire gauge', 'Typical max fuse (short runs)', 'Example loads'], rows: [['16 AWG', '10A', 'LED lights, USB sockets'], ['14 AWG', '15A', 'Fridge, fans, water pump'], ['12 AWG', '20A', '12V sockets, diesel heater'], ['10 AWG', '30A', 'Small inverters, larger pumps'], ['8 AWG', '40-50A', 'Feeds to sub-fuse blocks']] } },
          'These are conservative starting points. Long runs need thicker wire to limit voltage drop. Check with the [voltage drop calculator](/calculators/voltage-drop) and [fuse size calculator](/calculators/solar-fuse-size). Our [fuse and breaker sizing guide](/guides/solar-fuse-and-breaker-sizing) explains the reasoning, and the [cable and connector guide](/guides/solar-cable-and-connector-guide) covers crimping.'
        ]
      }
    ],
    mistakes: [
      'Sizing the fuse to the device instead of the wire.',
      'Feeding the fuse block with thinner cable than its main fuse protects.',
      'Running negatives back to random chassis points instead of the negative bus.',
      'Skipping the main fuse because "each circuit is already fused".'
    ],
    faqs: [
      { q: 'What size fuse should I use for each circuit?', a: 'Choose a fuse no larger than the wire\'s ampacity, typically about 125% of the circuit\'s normal current. A 6A light on 16 AWG wire would use a 7.5A or 10A fuse.' },
      { q: 'Do I need a negative bus bar?', a: 'With more than a few circuits, yes. It gives every negative a solid connection and keeps the battery terminal clean, and with a shunt it ensures all current is measured.' },
      { q: 'What fuse protects the fuse block feed?', a: 'A main fuse near the battery sized for the feed cable, such as 60A on 6 AWG or 100A on 4 AWG, within the fuse block\'s own rating.' }
    ],
    cta: { title: 'Size your wires and fuses', text: 'Get wire gauge and fuse size for any circuit.', links: [{ href: '/calculators/solar-fuse-size', label: 'Fuse Size Calculator' }, { href: '/calculators/voltage-drop', label: 'Voltage Drop Calculator' }] }
  },

  'parallel-battery-bank-balanced': {
    intro: 'Wiring batteries in parallel adds capacity at the same voltage, but how you connect the main cables matters. If both main cables attach to the first battery, it does more work than the others, ages faster and drags the whole bank down. Taking the positive from one end and the negative from the other end balances the current.',
    takeaways: [
      'Parallel wiring adds amp-hours; voltage stays the same.',
      'Take the main positive from the first battery and the main negative from the last (diagonal wiring).',
      'Use equal-length, equal-gauge links between batteries.',
      'For more than about four batteries, use bus bars with equal-length cables to each battery.'
    ],
    components: [
      ['Batteries', 'Identical model, age and state of charge', 'Capacity'],
      ['Interconnect links', 'Same gauge as main cables, equal lengths', 'Join batteries'],
      ['Main fuse', 'Sized for total system current', 'Protects main cable'],
      ['Optional bus bars', 'Rated for total current', 'Better balance for larger banks'],
      ['Optional per-battery fuses', 'Sized per battery', 'Isolates a faulty battery']
    ],
    steps: [
      'Charge every battery fully and individually before connecting them.',
      'Place the batteries side by side and link all positives together and all negatives together with equal-length cables.',
      'Connect the main positive (through the main fuse) to the first battery\'s positive.',
      'Connect the main negative to the last battery\'s negative.',
      'Check the bank voltage, then connect the system.'
    ],
    sections: [
      {
        h: 'Why diagonal wiring works',
        blocks: [
          'Every link has a small resistance. When both main cables attach to battery 1, current from battery 4 must cross six links; current from battery 1 crosses none. Battery 1 ends up supplying a larger share, and it is charged harder too. With diagonal wiring, every battery\'s current path crosses the same number of links, so the load is shared evenly.',
          'Bus bars do the same job even better: run an equal-length positive and negative cable from each battery to a pair of bus bars, and take the system connections from the bars. See our general [battery bank wiring diagram](/wiring-diagrams/battery-bank) for series and series-parallel options.'
        ]
      },
      {
        h: 'Parallel or higher voltage?',
        blocks: [
          'Four 12V batteries in parallel give 12V 400Ah. The same four in series give 48V 100Ah, the same energy at a quarter of the current. For systems over about 2kW, a higher voltage is usually the better choice. See [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system) and [how to choose solar batteries](/guides/how-to-choose-solar-batteries).'
        ]
      }
    ],
    mistakes: [
      'Mixing old and new batteries, or different brands or capacities.',
      'Connecting batteries at different states of charge, causing large balancing currents.',
      'Using links of different lengths or gauges.',
      'Exceeding the manufacturer\'s maximum number of batteries in parallel.'
    ],
    faqs: [
      { q: 'How many batteries can I connect in parallel?', a: 'Check the manufacturer\'s limit. Many LiFePO4 makers allow 4 or more. Beyond about four, bus bars with equal cables give better balance.' },
      { q: 'Should each battery have its own fuse?', a: 'It is good practice, especially for lithium: a fuse per battery isolates a shorted battery so the others cannot dump current into it.' },
      { q: 'Do parallel LiFePO4 batteries balance each other?', a: 'Their voltages equalize at rest, and each internal BMS balances its own cells. Start with every battery fully charged and the bank stays well matched.' }
    ],
    cta: { title: 'Plan your battery bank', text: 'Find the right series/parallel layout and capacity.', links: [{ href: '/calculators/battery-series-parallel', label: 'Battery Series/Parallel' }, { href: '/calculators/how-many-batteries', label: 'How Many Batteries?' }] }
  },

  'system-grounding': {
    intro: 'Grounding and bonding are the most misunderstood parts of solar wiring. Equipment grounding connects metal frames and enclosures so a fault trips a breaker instead of energizing the metal. Bonding connects the system\'s current-carrying conductor (DC negative or AC neutral) to ground in exactly one place.',
    takeaways: [
      'Every metal frame and enclosure gets an equipment grounding conductor back to the ground bus.',
      'Bond DC negative to ground at one point only, if your system design calls for it.',
      'Bond AC neutral to ground at one place only, usually the main AC panel or the inverter.',
      'Connect the ground bus to a grounding electrode (ground rod) as local code requires.'
    ],
    components: [
      ['Ground bus bar', 'In or near the main panel', 'Collects equipment grounds'],
      ['Equipment grounding conductors', 'Sized per code to the circuit protection', 'Bond frames and enclosures'],
      ['Grounding electrode', 'Ground rod(s) or other approved electrode', 'Earth connection'],
      ['Grounding electrode conductor', 'Sized per code', 'Bus to rod'],
      ['Array bonding hardware', 'Listed lugs or bonding clips', 'Ground panel frames and racking']
    ],
    steps: [
      'Bond solar panel frames and racking with listed grounding lugs or bonding clips, and run an equipment ground from the array.',
      'Run equipment grounding conductors from the charge controller, inverter and battery enclosure to the ground bus.',
      'Make the single DC negative-to-ground bond where the manufacturer and code specify (some systems are left ungrounded).',
      'Make sure AC neutral is bonded to ground in one place only. Remove extra bonds in subpanels.',
      'Connect the ground bus to the grounding electrode with an appropriately sized conductor.'
    ],
    sections: [
      {
        h: 'Grounding is not a current path',
        blocks: [
          'In normal operation, no current flows on ground conductors. If neutral is bonded to ground in two places, normal current splits between neutral and ground wires, which can energize metal and confuse protective devices. That is why subpanels keep neutral and ground bars separate. See the [critical loads subpanel diagram](/wiring-diagrams/ac-subpanel).',
          { warn: 'Grounding requirements depend on your system type, equipment and local electrical code (in the US, NEC Article 690 and 250). Follow the equipment manuals, and have a licensed electrician or inspector review permanent installations.' }
        ]
      },
      {
        h: 'Ground mounts and lightning',
        blocks: [
          'Ground-mounted arrays need their racking bonded and connected to a grounding electrode. Long wire runs between an array and the house benefit from surge protection devices at both ends. Our [ground-mount installation guide](/guides/ground-mount-solar-installation) covers this, and the [fuse and breaker sizing guide](/guides/solar-fuse-and-breaker-sizing) covers overcurrent protection.'
        ]
      }
    ],
    mistakes: [
      'Bonding neutral to ground in both the inverter and the AC panel.',
      'Using the ground wire as a current-carrying conductor.',
      'Leaving panel frames and racking unbonded.',
      'Multiple DC negative-to-ground bonds.'
    ],
    faqs: [
      { q: 'Do off-grid solar systems need a ground rod?', a: 'Most permanent installations do, for equipment grounding and lightning protection. Mobile systems (vans, RVs) bond to the vehicle chassis instead.' },
      { q: 'Where should neutral be bonded to ground in an off-grid system?', a: 'In one place only, typically the main AC panel or inside the inverter, depending on the inverter design. Check the inverter manual.' },
      { q: 'Should DC negative be grounded?', a: 'Many off-grid systems bond DC negative to ground at a single point, but some equipment requires an ungrounded system. Follow the manufacturer\'s instructions and local code.' }
    ],
    cta: { title: 'Plan the protection too', text: 'Size breakers and grounding hardware for your system.', links: [{ href: '/calculators/grounding-rod', label: 'Grounding Rod Calculator' }, { href: '/calculators/solar-breaker-size', label: 'Solar Breaker Size Calculator' }] }
  },

  'multiple-charge-controllers': {
    intro: 'Adding a second solar array is a common upgrade, and often the easiest way is a second charge controller on the same battery. It is also the right approach when arrays face different directions, use different panels or sit far apart. The controllers do not need to talk to each other. Each simply charges the battery.',
    takeaways: [
      'Each array gets its own controller; controllers connect in parallel at the battery or bus bar.',
      'Fuse each controller\'s battery cable close to the battery or bus.',
      'Set both controllers to the same absorption and float voltages.',
      'Two controllers make sense for different orientations, panel types or locations.'
    ],
    components: [
      ['Controller A', 'Sized for array A', 'Charges from array A'],
      ['Controller B', 'Sized for array B', 'Charges from array B'],
      ['Fuses', 'One per controller output', 'Protect each controller cable'],
      ['Battery bank or bus bars', 'Common connection', 'Receives both outputs']
    ],
    steps: [
      'Size each controller for its own array\'s current and voltage. Use the [charge controller sizing calculator](/calculators/charge-controller-sizing).',
      'Connect each controller\'s battery terminals to the battery or bus bars, each through its own fuse.',
      'Program the same battery profile (absorption, float, temperature limits) on both controllers.',
      'Connect each array to its controller through a PV disconnect or breaker.',
      'Confirm both controllers report charging current in full sun.'
    ],
    sections: [
      {
        h: 'When two controllers beat one bigger controller',
        blocks: [
          { ul: [
            'Arrays facing different directions (roof and portable, or east and west).',
            'Different panel models with different voltages.',
            'Expanding a system without replacing the existing controller.',
            'Redundancy: if one controller fails, the other keeps charging.'
          ] },
          'For grid-tie or hybrid inverters with built-in MPPT inputs, the same principle applies. See the [east-west array diagram](/wiring-diagrams/east-west-array). For single controller wiring, see the [charge controller diagram](/wiring-diagrams/charge-controller), and for choosing a controller, see [how to choose a charge controller](/guides/how-to-choose-a-charge-controller).'
        ]
      }
    ],
    mistakes: [
      'Different charge voltages, so one controller stops early while the other keeps pushing.',
      'Sharing one fuse between two controllers.',
      'Connecting two arrays to one controller input when their voltages differ.',
      'Undersized cable from a controller far from the battery.'
    ],
    faqs: [
      { q: 'Can I connect two charge controllers to one battery?', a: 'Yes. Connect each controller to the battery bank with its own fuse and set both to the same charge voltages.' },
      { q: 'Do the controllers need to be the same brand?', a: 'No, although same-brand controllers can sometimes network for synchronized charging. Matching voltage settings is what matters.' },
      { q: 'Will two controllers overcharge the battery?', a: 'No. Each controller regulates to its set voltage, and both reduce current as the battery approaches full.' }
    ],
    cta: { title: 'Size each controller', text: 'Match each controller to its array.', links: [{ href: '/calculators/charge-controller-sizing', label: 'Charge Controller Sizing' }, { href: '/calculators/pv-string-voltage', label: 'PV String Voltage Calculator' }] }
  },

  'east-west-array': {
    intro: 'Many roofs do not have one big south face. Splitting panels between east and west roof faces is common and works well, as long as each orientation has its own MPPT input. East panels peak in the morning and west panels in the afternoon, so mixing them on one tracker would leave both operating below their best.',
    takeaways: [
      'Each orientation gets its own MPPT input (or its own controller).',
      'Panels within a string must share the same orientation and model.',
      'East-west arrays typically produce somewhat less annual energy than due south, but spread over more hours.',
      'Check each string\'s cold-weather voltage against the input limit.'
    ],
    components: [
      ['East string', 'Panels facing east, same model', 'Morning production'],
      ['West string', 'Panels facing west, same model', 'Afternoon production'],
      ['PV disconnects', 'Rated for string voltage and current', 'Isolation for service'],
      ['Dual-MPPT inverter or two controllers', 'Inputs sized per string', 'Independent tracking'],
      ['Battery and AC panel', 'Per system design', 'Storage and distribution']
    ],
    steps: [
      'Design each string from panels on one roof face only, within the MPPT voltage window.',
      'Run each string to its own disconnect, then to its own MPPT input.',
      'Label strings clearly at the disconnects and the inverter.',
      'Connect the battery and AC output per the inverter manual.',
      'Commission and confirm each MPPT reports its own string\'s voltage and power.'
    ],
    sections: [
      {
        h: 'What to expect from east-west',
        blocks: [
          'At typical mid-latitudes, an east-west split usually produces roughly 10-20% less annual energy than the same panels facing due south. The peak is lower but production starts earlier and runs later, which suits households that use power in the morning and evening, and reduces how much battery storage you need for those hours. Estimate the impact with the [azimuth loss calculator](/calculators/solar-panel-azimuth-loss).',
          'Series wiring for each string is covered in the [series panel wiring diagram](/wiring-diagrams/panel-series). For how real-world losses add up, see [why panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated).'
        ]
      }
    ],
    mistakes: [
      'Mixing east and west panels in one series string.',
      'Paralleling an east string and a west string into one MPPT input.',
      'Unequal string lengths on inputs that are paralleled internally.',
      'Ignoring cold-morning Voc on the higher-voltage string.'
    ],
    faqs: [
      { q: 'Can I put east and west panels on the same MPPT?', a: 'It is not recommended in series. Some installers parallel identical east and west strings on one MPPT with acceptable losses, but separate inputs are the clean solution.' },
      { q: 'Is an east-west solar array worth it?', a: 'Often yes. It fits more panels on many roofs and matches morning and evening use, at the cost of somewhat lower peak and annual output than due south.' },
      { q: 'How many MPPT inputs do I need?', a: 'One per distinct orientation or panel type. Many hybrid inverters have two or more.' }
    ],
    cta: { title: 'Estimate orientation losses', text: 'See how direction and tilt affect your output.', links: [{ href: '/calculators/solar-panel-azimuth-loss', label: 'Azimuth Loss Calculator' }, { href: '/calculators/solar-production-by-location', label: 'Solar Production by Location' }] }
  },

  'portable-panel-power-station': {
    intro: 'Connecting portable solar panels to a power station is simple, until you add a second panel. Series wiring adds voltage, parallel wiring adds current, and your power station has limits on both. This diagram shows two 100W panels in series feeding a typical 12-60V input.',
    takeaways: [
      'Series: voltages add, current stays the same. Parallel: current adds, voltage stays the same.',
      'Keep total open-circuit voltage (Voc) below the station\'s maximum input voltage, with margin for cold weather.',
      'Keep total current below the station\'s input current limit.',
      'Use MC4 extension cables of 10-12 AWG and a proper adapter for the station\'s input connector.'
    ],
    components: [
      ['Portable panels', 'Two 100W, Voc ~22V, Isc ~5.8A', 'Generate power'],
      ['MC4 series connection', 'Panel 1 + to Panel 2 −', 'Adds voltages'],
      ['MC4 extension cable', '10-12 AWG, as short as practical', 'Brings power to the station'],
      ['Input adapter', 'MC4 to XT60 / Anderson / DC8020', 'Matches the station\'s connector'],
      ['Power station', 'Example: 12-60V, 10A, 200W input', 'Stores and delivers energy']
    ],
    steps: [
      'Check the power station\'s solar input voltage range, current limit and maximum watts.',
      'Add up panel Voc for series (22V + 22V = 44V) or Isc for parallel (5.8A + 5.8A = 11.6A), and compare with the limits.',
      'For series: connect Panel 1 positive to Panel 2 negative. The remaining Panel 1 negative and Panel 2 positive are the string output.',
      'Connect the string output to the extension cable and adapter, observing polarity.',
      'Plug into the power station and confirm the input reading in sun.'
    ],
    sections: [
      {
        h: 'Series or parallel?',
        blocks: [
          { table: { head: ['', 'Series', 'Parallel'], rows: [['Voltage', 'Adds (44V)', 'Same (22V)'], ['Current', 'Same (5.5A)', 'Adds (11A)'], ['Cable losses', 'Lower', 'Higher'], ['Partial shade', 'One shaded panel drags the string', 'More tolerant'], ['Typical use', 'Wide-range inputs (12-60V+)', 'Low-voltage inputs or high current limits']] } },
          'More detail: [series panel wiring](/wiring-diagrams/panel-series) and [parallel panel wiring](/wiring-diagrams/panel-parallel). Choosing panels in the first place? See the [portable solar panel buying guide](/blog/portable-solar-panel-buying-guide).',
          { warn: 'Panel Voc rises in cold weather, roughly 10-15% on a freezing morning. Leave that margin below your station\'s maximum input voltage. Use the [PV string voltage calculator](/calculators/pv-string-voltage).' }
        ]
      }
    ],
    mistakes: [
      'Exceeding the maximum input voltage with too many panels in series.',
      'Using thin, long extension cables.',
      'Mixing panels with very different voltages or currents.',
      'Reversing polarity at the adapter.'
    ],
    faqs: [
      { q: 'Should I connect solar panels to a power station in series or parallel?', a: 'Series if the combined voltage stays within the input range, as it reduces cable losses. Parallel if the input voltage range is narrow, or panels will be shaded unevenly.' },
      { q: 'Can I connect different solar panels together?', a: 'It is best to use identical panels. Different panels in series are limited by the lowest current; in parallel, by the lowest voltage.' },
      { q: 'How long can my solar extension cable be?', a: 'As short as practical. For 10A at around 40V, 10 AWG keeps losses low up to about 30-50 feet. Check with the cable loss calculator.' }
    ],
    cta: { title: 'Check your string', text: 'Verify voltage and cable losses before you connect.', links: [{ href: '/calculators/pv-string-voltage', label: 'PV String Voltage Calculator' }, { href: '/calculators/cable-length-power-loss', label: 'Cable Length Power Loss' }] }
  }
}
