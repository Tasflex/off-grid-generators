// lib/wiring/content/vehicle.js
// Article bodies for the vehicle, RV and marine wiring diagrams. Inline links use [text](/path), bold uses **text**.

export const vehicleContent = {
  'dc-dc-charger-wiring': {
    intro: 'A DC-DC charger takes power from your vehicle\'s starter battery while the engine runs and charges a separate house battery with the correct voltage and current. It protects the alternator from the huge current a lithium battery would otherwise pull, works with modern "smart" alternators, and keeps the starter battery isolated when the engine is off.',
    takeaways: [
      'Fuse the input cable near the starter battery and the output cable near the house battery.',
      'Size input cables for the input current, which is higher than the rated output.',
      'Connect the ignition (D+) wire if your vehicle has a smart or variable-voltage alternator.',
      'Use a solid negative return: a dedicated cable to the starter battery, or a verified chassis bond.'
    ],
    components: [
      ['DC-DC charger', '20-50A, 12V in / 12V out', 'Regulates charging from the alternator'],
      ['Input fuse', 'Per manual, typically 50-60A for a 30A charger', 'Protects the cable from the starter battery'],
      ['Output fuse', 'Per manual, typically 40-50A', 'Protects the cable at the house battery'],
      ['Cable', '6 AWG for runs up to ~15 ft at 30A; 4 AWG for longer', 'Keeps voltage drop under 3%'],
      ['Ignition / D+ wire', '18-16 AWG, small inline fuse', 'Tells the charger the engine is running']
    ],
    steps: [
      'Mount the charger close to the house battery, on a non-flammable surface with airflow around it.',
      'Run the positive input cable from the starter battery, through a fuse within about 7 inches (18 cm) of the battery post, to the charger input.',
      'Connect the charger output to the house battery positive through a fuse placed close to that battery.',
      'Connect the charger negative to the house battery negative (or the negative bus), and make sure the house negative is bonded back to the starter battery negative or chassis with an equal-size cable.',
      'Connect the ignition or D+ signal wire to a switched-ignition source if the charger needs it.',
      'Set the charge profile to match your house battery (LiFePO4, AGM or flooded), then test with the engine running.'
    ],
    sections: [
      {
        h: 'Why input current is higher than output',
        blocks: [
          'A 30A charger delivering 14.4V to a lithium battery outputs about 430W. If the input voltage sags to 12.5V and the charger is 95% efficient, input current is about **430 ÷ 12.5 ÷ 0.95 ≈ 36A**. Size the input cable and fuse for that, not for the 30A label. Check your run with the [voltage drop calculator](/calculators/voltage-drop) and [solar wire size calculator](/calculators/solar-wire-size).',
          { tip: 'Long runs from an engine bay to the rear of a van often need one size thicker cable than you expect. A charger starved of voltage throttles back or shuts down.' }
        ]
      },
      {
        h: 'Smart alternators and the ignition wire',
        blocks: [
          'Many vehicles built since the mid-2010s lower alternator voltage once the starter battery is full. A basic charger that waits for 13.2V+ never switches on. Chargers with a smart-alternator mode use the ignition or D+ signal instead of voltage to decide when to charge. If your vehicle has start-stop or a variable-voltage alternator, use this mode.',
          'For the bigger picture of charging on the road, see [charging a power station from your car](/blog/charge-power-station-from-car), and for a complete van layout, see the [campervan electrical diagram](/wiring-diagrams/van-complete-system).'
        ]
      }
    ],
    mistakes: [
      'Fusing only one end. Both ends connect to a battery, so both ends need a fuse.',
      'Relying on a thin factory chassis ground. Add a dedicated negative cable for high currents.',
      'Using the wrong charge profile. LiFePO4 needs its own settings.',
      'Mounting the charger in the engine bay where heat derates it.'
    ],
    faqs: [
      { q: 'Do I need a DC-DC charger for a lithium house battery?', a: 'Yes, in most vehicles. LiFePO4 can draw more current than an alternator can safely supply for long periods, and smart alternators may not supply enough voltage. A DC-DC charger limits current and provides the right charge profile.' },
      { q: 'Where should the DC-DC charger be mounted?', a: 'Close to the house battery, so the output cable is short. The longer input cable then carries current at a higher tolerance for voltage drop.' },
      { q: 'What size fuse do I need for a DC-DC charger?', a: 'Follow the manufacturer\'s table. For a 30A charger, the input fuse is commonly 50-60A and the output fuse 40-50A.' }
    ],
    cta: { title: 'Size the cables for your run', text: 'Check voltage drop and wire gauge before you buy cable.', links: [{ href: '/calculators/voltage-drop', label: 'Voltage Drop Calculator' }, { href: '/calculators/solar-fuse-size', label: 'Fuse Size Calculator' }] }
  },

  'dual-battery-vehicle': {
    intro: 'A dual battery setup adds a second battery to a truck, 4x4 or van for a fridge, lights and accessories. A voltage-sensitive relay (VSR) joins the two batteries when the engine is charging and separates them when it is not, so you can never flatten the starter battery by running the fridge overnight.',
    takeaways: [
      'The VSR connects the batteries above about 13.3V and disconnects them below about 12.8V.',
      'Fuse both sides of the VSR, because current can flow in either direction.',
      'A VSR suits lead-acid or AGM auxiliary batteries. For lithium, use a DC-DC charger.',
      'Run accessories from a fuse block on the auxiliary battery, never straight off the battery post.'
    ],
    components: [
      ['Voltage-sensitive relay', '100-140A continuous', 'Joins and separates the batteries automatically'],
      ['Fuses (2)', '80-100A, MRBF or ANL', 'Protect the cable at each battery'],
      ['Interconnect cable', '6-4 AWG depending on length', 'Carries charging current between batteries'],
      ['Auxiliary battery', '12V AGM or flooded deep-cycle', 'Powers accessories'],
      ['Fuse block', '6-12 circuits with a negative bus', 'Distributes power to the fridge, lights and sockets']
    ],
    steps: [
      'Mount the auxiliary battery securely in a vented box or tray rated for vehicle use.',
      'Fit a fuse within about 7 inches of the starter battery positive and run the interconnect cable to the VSR.',
      'Connect the other side of the VSR to the auxiliary battery through a second fuse near that battery.',
      'Connect the VSR negative (for its electronics) to chassis ground.',
      'Bond the auxiliary battery negative to the chassis or back to the starter battery with cable equal in size to the positive.',
      'Feed a fuse block from the auxiliary battery and connect accessories to individual fused circuits. See the [fuse block diagram](/wiring-diagrams/dc-fuse-block-busbar).'
    ],
    sections: [
      {
        h: 'VSR or DC-DC charger?',
        blocks: [
          { table: { head: ['', 'VSR / isolator', 'DC-DC charger'], rows: [['Best with', 'AGM or flooded aux battery', 'LiFePO4, or any battery with a smart alternator'], ['Charge control', 'None, just alternator voltage', 'Full multi-stage profile'], ['Cost', 'Low', 'Higher'], ['Smart alternators', 'Often charges poorly', 'Works with ignition trigger']] } },
          'If you plan to run a [12V fridge](/blog/12v-fridge-off-grid-power) off a lithium battery, skip the VSR and follow the [DC-DC charger diagram](/wiring-diagrams/dc-dc-charger-wiring) instead.'
        ]
      }
    ],
    mistakes: [
      'Pairing a VSR with a lithium auxiliary battery, which can overload the alternator.',
      'Fusing only at the starter battery end.',
      'Using undersized cable, so the auxiliary battery never fully charges.',
      'Mounting a flooded battery inside the cabin without venting.'
    ],
    faqs: [
      { q: 'How does a voltage-sensitive relay work?', a: 'It monitors voltage. When the engine runs and voltage rises above a set point (typically around 13.3V), it closes and links the batteries. When voltage falls (typically around 12.8V), it opens and isolates them.' },
      { q: 'Can I use a VSR with a lithium battery?', a: 'It is not recommended. Lithium batteries can pull very high current from the alternator. Use a DC-DC charger.' },
      { q: 'Do I need to fuse both ends of the cable between batteries?', a: 'Yes. Both ends connect to a battery that can deliver fault current, so each end needs a fuse close to the battery.' }
    ],
    cta: { title: 'Size your auxiliary battery', text: 'Work out how many amp-hours your fridge and accessories need.', links: [{ href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }, { href: '/calculators/daily-energy-use', label: 'Daily Energy Use Calculator' }] }
  },

  'shore-power-rv': {
    intro: 'Most RV electrical systems revolve around an inverter-charger. Plugged into shore power, it passes AC through to the RV\'s panel and charges the batteries. Unplugged, it inverts battery power to run the same outlets. Add roof solar with its own charge controller and you have a system that works at campgrounds and off-grid alike.',
    takeaways: [
      'Shore power enters through a breaker, then the inverter-charger\'s AC input.',
      'The inverter-charger\'s AC output feeds the RV\'s AC panel, whether on shore power or battery.',
      'The battery cable to a 3,000W 12V inverter carries up to about 300A. It needs 4/0 AWG and a Class T fuse.',
      'Solar charges the battery through a separate MPPT controller.'
    ],
    components: [
      ['Shore power inlet', '30A (TT-30) or 50A (14-50)', 'Brings campground power in'],
      ['Input breaker', '30A or 50A', 'Protects the inverter-charger input'],
      ['Inverter-charger', '2,000-3,000W, pure sine, with transfer switch', 'Inverts, charges and transfers'],
      ['Class T fuse', '300-400A for 3,000W at 12V', 'Protects the main battery cable'],
      ['Battery bank', '12V LiFePO4, 200-600Ah', 'Stores energy'],
      ['MPPT controller', 'Sized to the roof array', 'Charges from solar']
    ],
    steps: [
      'Wire the shore inlet through the input breaker to the inverter-charger AC input terminals.',
      'Run the inverter-charger AC output to the RV\'s main AC panel. Outlets you want powered off-grid must be on this panel.',
      'Connect the battery to the inverter-charger with short, heavy cables and a Class T fuse within inches of the battery.',
      'Connect the MPPT controller to the battery bus with its own fuse, then connect the roof array.',
      'Bond the inverter-charger chassis to the RV chassis ground.',
      'Set the charger profile, shore input current limit and low-battery cutoff in the inverter settings.'
    ],
    sections: [
      {
        h: 'Shore input current limit',
        blocks: [
          'Set the inverter-charger\'s input current limit to match the pedestal (30A or a 15A household outlet). It then reduces charging when the RV\'s loads rise, so you do not trip the campground breaker. Some units can even add battery power on top of shore power when a load exceeds the limit.',
          'Converting from lead-acid to lithium? The charger settings and converter are covered in our [RV lithium upgrade guide](/guides/rv-lithium-battery-upgrade).'
        ]
      },
      {
        h: 'Neutral-ground bonding in an RV',
        blocks: [
          'On shore power, the neutral-ground bond is at the campground. When inverting, the inverter-charger must create its own bond, and most RV-rated units switch this automatically. Use a unit designed for RV use, and do not add a separate bond in the RV panel. For the general principles see the [grounding diagram](/wiring-diagrams/system-grounding).'
        ]
      }
    ],
    mistakes: [
      'Leaving the old converter connected so it fights the new charger.',
      'Undersizing the inverter battery cable or skipping the Class T fuse.',
      'Putting outlets you need off-grid on a circuit the inverter does not feed.',
      'Using a non-RV inverter that does not manage neutral-ground bonding.'
    ],
    faqs: [
      { q: 'Does an inverter-charger replace the RV converter?', a: 'Usually, yes. Its charger replaces the converter\'s charging role. If you keep the converter for DC loads, disable its charging so the two do not conflict.' },
      { q: 'What size cable for a 3,000W 12V inverter?', a: 'Up to about 300A, so 4/0 AWG for short runs, with a Class T fuse of around 350-400A per the inverter manual.' },
      { q: 'Can solar and shore power charge at the same time?', a: 'Yes. Both chargers feed the battery, and each regulates its own output.' }
    ],
    cta: { title: 'Size your RV inverter', text: 'Add your AC loads to find the right inverter and battery size.', links: [{ href: '/calculators/inverter-sizing', label: 'Inverter Sizing Calculator' }, { href: '/calculators/inverter-battery-matching', label: 'Inverter-Battery Matching' }] }
  },

  'van-complete-system': {
    intro: 'This diagram brings a typical campervan system together: roof solar through an MPPT controller, alternator charging through a DC-DC charger, shore power through an inverter-charger, and one LiFePO4 battery at the center. Bus bars keep connections tidy, and a shunt counts every amp in and out.',
    takeaways: [
      'All charge sources and loads connect to positive and negative bus bars, not the battery posts.',
      'The battery main fuse (Class T) sits between the battery and the positive bus.',
      'The shunt sits between the battery negative and the negative bus.',
      'Size the main cable and fuse for the inverter, the largest load in the system.'
    ],
    components: [
      ['Roof solar + MPPT', '200-600W, 30-50A controller', 'Primary charging off-grid'],
      ['DC-DC charger', '20-50A', 'Charges while driving'],
      ['Inverter-charger', '1,500-3,000W', 'AC outlets and shore charging'],
      ['LiFePO4 battery', '12V, 200-400Ah', 'Energy storage'],
      ['Bus bars', '250A+ rated', 'Common connection points'],
      ['Shunt + monitor', 'Rated above max current', 'Accurate state of charge'],
      ['Fuse block', '8-12 circuits', 'DC loads: lights, fridge, fans, pump']
    ],
    steps: [
      'Plan the layout: battery, bus bars and inverter close together to keep heavy cables short.',
      'Connect the battery positive to the Class T fuse, then to a battery switch, then to the positive bus.',
      'Connect the battery negative to the shunt battery side, and the shunt system side to the negative bus.',
      'Connect each charger (MPPT, DC-DC) and the inverter-charger to the bus bars, each with its own fuse at the positive bus.',
      'Feed the fuse block from the positive bus with an appropriately sized fuse, and return its negative to the negative bus.',
      'Connect shore power to the inverter-charger AC input, and AC outlets to its output.',
      'Program every charger with the same LiFePO4 voltages and set up the battery monitor.'
    ],
    sections: [
      {
        h: 'Sizing the system',
        blocks: [
          'Start from daily energy use: fridge, lights, fans, laptop and phone often total 600-1,200Wh per day. A 200-300Ah LiFePO4 battery with 400W of solar and a 30A DC-DC charger covers most full-time setups. Our [van life solar setup guide](/blog/van-life-solar-setup-guide) and [van life solar sizing guide](/guides/van-life-solar-sizing) work through the numbers, and the [12V fridge guide](/blog/12v-fridge-off-grid-power) covers the biggest load.',
          'Each sub-system has its own diagram: [DC-DC charger](/wiring-diagrams/dc-dc-charger-wiring), [battery monitor shunt](/wiring-diagrams/battery-monitor-shunt) and [fuse block](/wiring-diagrams/dc-fuse-block-busbar).'
        ]
      }
    ],
    mistakes: [
      'Connecting a load directly to the battery negative, bypassing the shunt.',
      'Different charge voltages on different chargers.',
      'Long, thin cables between the battery and inverter.',
      'No battery switch, so you cannot isolate the system for work or storage.'
    ],
    faqs: [
      { q: 'Do I need bus bars in a campervan?', a: 'They are strongly recommended. Battery posts quickly become stacked with lugs, which loosen and overheat. Bus bars give each cable a solid connection.' },
      { q: 'What fuse goes between the battery and bus bar?', a: 'A Class T fuse (or another high-interrupt-rated fuse) sized for the total current, usually driven by the inverter. Many 2,000W van systems use 250-300A.' },
      { q: 'Can the solar controller and DC-DC charger work at the same time?', a: 'Yes. Both charge the battery through the bus bars; each regulates its own output.' }
    ],
    cta: { title: 'Size your van system', text: 'Work out battery, solar and inverter sizes for your loads.', links: [{ href: '/calculators/off-grid-system-sizing', label: 'Off-Grid System Sizing' }, { href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }] }
  },

  'marine-dual-bank': {
    intro: 'Boats separate a start battery for the engine from a house bank for everything else. A battery selector switch lets you choose which bank feeds the engine, and an automatic charging relay (ACR) links the banks when the alternator or a charger is running, so both stay charged while the start battery stays protected.',
    takeaways: [
      'The selector switch (1 / 2 / Both / Off) sets which bank feeds the engine and main loads.',
      'The ACR combines the banks automatically while charging and separates them at rest.',
      'Marine practice calls for tinned copper wire and overcurrent protection close to the battery.',
      'A multi-bank shore charger keeps both banks topped up at the dock.'
    ],
    components: [
      ['Battery selector switch', '1 / 2 / Both / Off, 300A+', 'Selects banks; isolates in an emergency'],
      ['ACR / VSR', '120A+', 'Combines banks while charging'],
      ['Start battery', 'Marine cranking battery', 'Engine starting'],
      ['House bank', 'Deep-cycle AGM or LiFePO4', 'Lights, electronics, fridge'],
      ['Shore charger', '2-3 bank, marine rated', 'Charges at the dock'],
      ['Tinned cable', 'Sized for current and length', 'Resists corrosion']
    ],
    steps: [
      'Connect the start battery positive to switch terminal 1 and the house bank positive to terminal 2.',
      'Connect the switch common terminal to the engine starter and the main DC panel feed.',
      'Install the ACR between the two battery positives, with fuses near each battery.',
      'Feed the house DC panel from the house bank through a fuse, so house loads never drain the start battery.',
      'Connect each output of the shore charger to one bank, with its own fuse.',
      'Join all negatives at a common negative bus connected to the engine block.'
    ],
    sections: [
      {
        h: 'Lithium house banks on boats',
        blocks: [
          'LiFePO4 house banks are increasingly common, but they need care: an alternator can be overloaded by lithium\'s low resistance, and a BMS disconnect can cause a damaging voltage spike at the alternator. Use a DC-DC charger or an alternator regulator designed for lithium, and follow the battery maker\'s marine guidance. Our [boat solar guide](/guides/boat-solar-power) covers solar on boats, and [how to choose solar batteries](/guides/how-to-choose-solar-batteries) compares chemistries.'
        ]
      },
      {
        h: 'Overcurrent protection on boats',
        blocks: [
          'ABYC standards call for overcurrent protection within 7 inches of the battery for most conductors (with limited exceptions for sheathed cables and the starter cable). Use marine-rated fuses and breakers, and keep connections dry and protected. A [battery monitor](/wiring-diagrams/battery-monitor-shunt) on the house bank makes energy use visible at anchor.'
        ]
      }
    ],
    mistakes: [
      'Leaving the switch on "Both" at anchor, which drains the start battery with the house bank.',
      'Using untinned automotive wire that corrodes in salt air.',
      'Turning the selector switch to "Off" with the engine running, which can damage the alternator.',
      'Feeding house loads from the switch common without protection.'
    ],
    faqs: [
      { q: 'Do I need an ACR if I have a selector switch?', a: 'Not strictly, but an ACR charges both banks automatically, so you do not have to remember to switch to "Both" while motoring and back afterwards.' },
      { q: 'Which battery should start the engine?', a: 'Normally the start battery (position 1). Use "Both" only to start with a weak start battery.' },
      { q: 'Can I add solar to this setup?', a: 'Yes. Connect a solar charge controller to the house bank. The ACR will share surplus charge with the start battery.' }
    ],
    cta: { title: 'Size your house bank', text: 'Work out how much battery you need for days at anchor.', links: [{ href: '/calculators/battery-autonomy', label: 'Battery Autonomy Calculator' }, { href: '/calculators/battery-bank-sizing', label: 'Battery Bank Sizing' }] }
  }
}
