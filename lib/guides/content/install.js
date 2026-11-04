// lib/guides/content/install.js
// Article bodies for installation, safety and how-to guides. Inline links use [text](/path), bold uses **text**.

export const installContent = {
  'solar-cable-and-connector-guide': {
    intro: 'Most solar system failures and fires start at a connection, not a component: an undersized cable, a poorly crimped lug, a loose terminal. Getting cables and connectors right is cheap insurance. This guide covers choosing cable types and gauges, and making connections that last.',
    takeaways: [
      'Use PV wire (or USE-2) outdoors and fine-stranded, high-temperature battery cable indoors.',
      'Size wire for both ampacity and voltage drop, aiming for under 3% on 12V and 24V circuits.',
      'Crimp, do not just twist or solder, and use the correct die for the connector.',
      'Protect every connection from strain, vibration and moisture.'
    ],
    sections: [
      {
        h: 'Cable types',
        blocks: [
          { table: { head: ['Cable', 'Where it goes', 'Why'], rows: [['PV wire / USE-2', 'Panel strings, outdoors', 'UV and moisture resistant, rated for PV voltages'], ['Welding / battery cable', 'Battery, inverter, bus bars', 'Fine strands, flexible, handles high current'], ['Tinned marine wire', 'Boats and humid environments', 'Resists corrosion'], ['THHN/THWN in conduit', 'Building wiring, long runs', 'Code-approved building wire'], ['MC4 extension leads', 'Portable panels', 'Pre-terminated, weatherproof']] } }
        ]
      },
      {
        h: 'Choosing wire gauge',
        blocks: [
          'Two checks decide the gauge: **ampacity** (the wire must carry the current without overheating) and **voltage drop** (the wire must not waste too much voltage over its length). On low-voltage DC systems, voltage drop usually wins.',
          '**Voltage drop (V) = current × round-trip length × resistance per foot**',
          'A 20A load 15 feet from a 12V battery needs 10 AWG to stay near 3% drop, even though 12 AWG could carry 20A safely. Use the [voltage drop calculator](/calculators/voltage-drop), [solar wire size calculator](/calculators/solar-wire-size) and [cable length power loss calculator](/calculators/cable-length-power-loss). Higher system voltages make this much easier, as explained in [12V vs 24V vs 48V](/blog/12v-vs-24v-vs-48v-solar-system).'
        ]
      },
      {
        h: 'MC4 connectors',
        blocks: [
          { ol: [
            'Strip about 1/4-3/8 inch (6-10 mm) of insulation, per the connector instructions.',
            'Crimp the metal pin with an MC4 crimper and the correct die, then tug-test it.',
            'Push the pin into the housing until it clicks; tighten the gland with MC4 spanners.',
            'Never mix connector brands that are not certified as compatible. Mismatched MC4-style connectors are a known fire risk.'
          ] }
        ]
      },
      {
        h: 'Battery lugs and terminals',
        blocks: [
          { ul: [
            'Use tinned copper lugs sized for both the cable gauge and the stud size.',
            'Crimp with a hydraulic or ratcheting lug crimper. A hammer crimper is a last resort.',
            'Seal with adhesive-lined heat shrink.',
            'Torque terminal bolts to the battery or device specification and recheck after a few weeks.',
            'Stack no more than about four lugs on a stud. Use bus bars instead. See the [fuse block and bus bar diagram](/wiring-diagrams/dc-fuse-block-busbar).'
          ] }
        ]
      },
      {
        h: 'Routing and protection',
        blocks: [
          'Support cables every 18 inches or so, use grommets or glands through panels and walls, keep positive and negative runs together to reduce interference, and keep DC away from sharp edges and hot surfaces. Every positive cable from a battery needs a fuse sized to protect it. See [fuse and breaker sizing](/guides/solar-fuse-and-breaker-sizing). For overall system wiring, see [how to wire a solar system](/guides/how-to-wire-solar-system). If something is already getting warm, our [troubleshooting guide](/guides/solar-system-troubleshooting) covers voltage-drop testing.'
        ]
      }
    ],
    faqs: [
      { q: 'What gauge wire do I need from solar panels to the charge controller?', a: 'It depends on current and distance. For a 10A string at 40V over 30 feet, 10 AWG keeps losses low. Use a voltage drop calculator for your numbers.' },
      { q: 'Can I solder battery lugs instead of crimping?', a: 'A good crimp is preferred. Solder wicks into strands, creating a stiff point that can crack under vibration. Some installers crimp and then solder for sealing.' },
      { q: 'Are all MC4 connectors compatible?', a: 'Not necessarily. Use matching connectors from the same manufacturer, or ones certified as intermateable.' }
    ],
    cta: { title: 'Size every cable', text: 'Check gauge and voltage drop before you buy wire.', links: [{ href: '/calculators/solar-wire-size', label: 'Solar Wire Size Calculator' }, { href: '/calculators/voltage-drop', label: 'Voltage Drop Calculator' }] }
  },

  'solar-fuse-and-breaker-sizing': {
    intro: 'Fuses and breakers exist to protect wires. Batteries can deliver thousands of amps into a short circuit, enough to turn an unprotected cable into a heating element in seconds. Every positive conductor leaving a battery needs overcurrent protection sized for that conductor and installed close to the battery.',
    takeaways: [
      'Size fuses to protect the wire: at or below its ampacity, typically 125% of normal current.',
      'Place battery fuses as close to the battery as practical.',
      'Use DC-rated devices with enough interrupt rating. Lithium banks need Class T or similar main fuses.',
      'PV strings need fuses when three or more strings are paralleled.'
    ],
    sections: [
      {
        h: 'Where protection goes',
        blocks: [
          { table: { head: ['Location', 'Device', 'Sized for'], rows: [['Battery main', 'Class T, MRBF or ANL fuse', 'Main cable and total load'], ['Inverter cable', 'Class T / ANL fuse or DC breaker', 'Inverter max DC current × 1.25'], ['Charge controller to battery', 'Fuse or DC breaker', 'Controller max output × 1.25'], ['DC distribution', 'Blade fuse block', 'Each branch wire'], ['PV strings (3+ in parallel)', 'PV string fuses in combiner', 'Panel series fuse rating'], ['PV to controller', 'DC disconnect / breaker', 'Array current, isolation']] } },
          'The [fuse block and bus bar diagram](/wiring-diagrams/dc-fuse-block-busbar) shows a typical DC layout.'
        ]
      },
      {
        h: 'Sizing method',
        blocks: [
          { ol: [
            'Find the maximum continuous current in the circuit (for an inverter: rated watts ÷ low battery voltage ÷ efficiency).',
            'Multiply by 1.25 for continuous loads.',
            'Choose the next standard fuse size up, provided it does not exceed the wire\'s ampacity.',
            'If it does exceed the wire rating, use thicker wire.'
          ] },
          'Example: a 2,000W 12V inverter at 10.5V and 90% efficiency draws about 212A. × 1.25 = 265A, so a 300A fuse on 4/0 cable. The [fuse size calculator](/calculators/solar-fuse-size) and [breaker size calculator](/calculators/solar-breaker-size) help.'
        ]
      },
      {
        h: 'Interrupt rating: why Class T',
        blocks: [
          'A large LiFePO4 bank can deliver a short-circuit current of 10,000-20,000A or more. A fuse must be able to interrupt that without arcing across. Class T fuses are rated around 20,000A at DC system voltages; small ANL fuses may be rated far lower. For lithium banks, a Class T (or equivalently rated) main fuse is the standard recommendation.',
          { warn: 'Use only DC-rated breakers and fuses on DC circuits. AC breakers can fail to interrupt DC arcs.' }
        ]
      },
      {
        h: 'PV string fusing',
        blocks: [
          'With one or two strings in parallel, a fault cannot push more reverse current than a panel can tolerate, so string fuses are generally not required. With three or more parallel strings, fuse each string at or below the panel\'s maximum series fuse rating, usually in a combiner box. See [series-parallel panel wiring](/wiring-diagrams/panel-series-parallel).'
        ]
      },
      {
        h: 'Grounding and disconnects',
        blocks: [
          'Overcurrent protection works with grounding: equipment grounds give fault current a path so the device can trip. See the [grounding and bonding diagram](/wiring-diagrams/system-grounding). Include disconnects so every source can be isolated for maintenance. Choosing cable is covered in our [cable and connector guide](/guides/solar-cable-and-connector-guide), and controller-specific sizing in [how to choose a charge controller](/guides/how-to-choose-a-charge-controller).'
        ]
      }
    ],
    faqs: [
      { q: 'What size fuse do I need between my battery and inverter?', a: 'Inverter watts ÷ low battery voltage ÷ efficiency × 1.25, rounded up to a standard size within the cable\'s rating. Most inverter manuals specify it.' },
      { q: 'Do I need a fuse between the solar panel and charge controller?', a: 'For one or two strings, usually not, but a DC disconnect or breaker is recommended for isolation. Three or more parallel strings need string fuses.' },
      { q: 'Can I use a car fuse for my battery bank?', a: 'Not for main battery protection. Use a fuse with an adequate DC interrupt rating, such as Class T for lithium banks.' }
    ],
    cta: { title: 'Size your fuses and breakers', text: 'Get the right protection for every circuit.', links: [{ href: '/calculators/solar-fuse-size', label: 'Fuse Size Calculator' }, { href: '/calculators/solar-breaker-size', label: 'Breaker Size Calculator' }] }
  },

  'solar-panel-maintenance': {
    intro: 'Solar systems are famously low-maintenance, but not no-maintenance. A few checks each season catch loose connections, dirty panels and battery issues before they cost you energy or equipment. Here is a practical checklist for panels, wiring, batteries and electronics.',
    takeaways: [
      'Clean panels when output drops noticeably or dirt is visible, typically 1-4 times a year.',
      'Use water and a soft brush. No pressure washers, abrasives or harsh chemicals.',
      'Check connections for heat, corrosion and looseness every season.',
      'Keep batteries within temperature limits and firmware up to date.'
    ],
    sections: [
      {
        h: 'Seasonal checklist',
        blocks: [
          { table: { head: ['Season', 'Tasks'], rows: [['Spring', 'Clean pollen; inspect for winter damage; check mounting bolts; trim new growth causing shade'], ['Summer', 'Check ventilation around inverters and batteries; clean dust in dry climates'], ['Fall', 'Clear leaves; adjust tilt for winter if adjustable; test the generator; check battery heaters'], ['Winter', 'Clear snow safely from accessible panels; monitor battery temperature; watch state of charge']] } }
        ]
      },
      {
        h: 'Cleaning panels safely',
        blocks: [
          { ol: [
            'Clean early morning or evening, when panels are cool. Cold water on hot glass can stress it.',
            'Rinse with low-pressure water, then use a soft brush or sponge on a pole.',
            'Use plain water or a mild, non-abrasive soap; rinse thoroughly.',
            'Stay off the roof where possible. Use a long-handled brush from the ground or a ladder with proper fall protection.'
          ] },
          'How much does dirt cost you? It varies from 2-7% in typical climates to much more in dusty or agricultural areas. Estimate it with the [dust and soiling loss calculator](/calculators/dust-soiling-loss). Bird droppings and leaves that shade a few cells are worse than an even film of dust. See the [shading impact calculator](/calculators/shading-impact).'
        ]
      },
      {
        h: 'Wiring and mounting checks',
        blocks: [
          { ul: [
            'Look for discolored, melted or brittle insulation and connectors.',
            'Check MC4 connectors are fully latched and cables are supported, not hanging.',
            'Feel (carefully) or use an infrared thermometer on battery and inverter terminals under load. Warm terminals mean loose or corroded connections.',
            'Check racking bolts and roof penetrations for leaks or movement.'
          ] }
        ]
      },
      {
        h: 'Batteries and electronics',
        blocks: [
          { ul: [
            'Review battery monitor history for unusual drops in capacity. See [battery monitor setup](/guides/battery-monitor-setup).',
            'Keep LiFePO4 above freezing for charging. See [LiFePO4 in cold weather](/blog/lifepo4-battery-cold-weather).',
            'Flooded lead-acid: check water levels monthly and equalize per the manufacturer.',
            'Clear dust from inverter and controller heat sinks and fans; install firmware updates.',
            'Portable systems: follow [power station storage tips](/blog/power-station-storage-maintenance).'
          ] }
        ]
      },
      {
        h: 'When output is lower than expected',
        blocks: [
          'Compare today\'s production with the same conditions last year, not with the panel label. Panels lose about 0.5% per year (see the [panel degradation calculator](/calculators/panel-degradation)), and real output is always below rating, as explained in [why panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated). If output has dropped suddenly, work through our [troubleshooting guide](/guides/solar-system-troubleshooting).'
        ]
      }
    ],
    faqs: [
      { q: 'How often should I clean solar panels?', a: 'When you see visible dirt or a noticeable drop in output. In many climates rain keeps them reasonably clean; dusty areas may need monthly cleaning.' },
      { q: 'Can I use a pressure washer on solar panels?', a: 'No. High pressure can damage seals and the anti-reflective coating and may void the warranty.' },
      { q: 'Should I remove snow from solar panels?', a: 'Only if you can do it safely from the ground with a soft roof rake. Snow often slides off on its own once the sun warms the panels.' }
    ],
    cta: { title: 'Measure your losses', text: 'See how much dust, heat and age cost your system.', links: [{ href: '/calculators/dust-soiling-loss', label: 'Dust & Soiling Loss' }, { href: '/calculators/panel-degradation', label: 'Panel Degradation Calculator' }] }
  },

  'solar-system-troubleshooting': {
    intro: 'When a solar system underperforms, the cause is usually simple: a loose connection, a setting, shade or a full battery. A methodical approach with a multimeter finds it quickly. Work from the panels to the battery to the loads, measuring as you go.',
    takeaways: [
      'Start with the obvious: shade, dirt, tripped breakers, blown fuses and settings.',
      'Measure voltage at each stage (panels, controller input, controller output, battery) and compare.',
      'Low output on a full battery is normal. The controller is limiting charge.',
      'Voltage drop under load reveals bad connections and undersized cables.'
    ],
    sections: [
      {
        h: 'Tools you need',
        blocks: [
          { ul: [
            'Digital multimeter with DC voltage and, ideally, a DC clamp meter for current.',
            'Infrared thermometer (or careful touch) for hot connections.',
            'The controller and inverter apps or displays, with their logs.',
            'MC4 disconnect tool and insulated hand tools.'
          ] },
          { warn: 'Solar strings can carry high DC voltage. Never disconnect connectors under load, and work with the array covered or disconnected when possible.' }
        ]
      },
      {
        h: 'Problem: low solar output',
        blocks: [
          { ol: [
            'Check the battery state of charge. If it is nearly full, the controller is reducing current on purpose.',
            'Look for shade, even on a few cells, and dirt.',
            'Measure each string\'s open-circuit voltage (Voc). It should be close to panels × panel Voc. A low reading suggests a failed panel, bypass diode or connector.',
            'Compare controller input voltage to string voltage under load. A big difference means wiring loss or a bad connection.',
            'Check controller settings and whether it is temperature-limiting.'
          ] },
          'Remember panels make 70-85% of label rating in good sun. See [why panels produce less than rated](/blog/why-solar-panels-produce-less-than-rated).'
        ]
      },
      {
        h: 'Problem: battery will not charge fully',
        blocks: [
          { ul: [
            'Wrong charge profile. LiFePO4 needs its own absorption and float voltages.',
            'Voltage drop between controller and battery makes the controller think the battery is fuller than it is. Measure at both ends while charging.',
            'Battery too cold. Many BMSs block charging below freezing.',
            'Monitor out of sync. A shunt monitor needs periodic full charges. See [battery monitor setup](/guides/battery-monitor-setup).',
            'Undersized array for the season.'
          ] }
        ]
      },
      {
        h: 'Problem: inverter shuts down',
        blocks: [
          { table: { head: ['Symptom', 'Likely cause', 'Fix'], rows: [['Shuts off when a motor starts', 'Startup surge exceeds inverter rating', 'Larger inverter or soft starter. See [surge vs running watts](/blog/surge-watts-vs-running-watts)'], ['Low-voltage alarm under load, battery shows charge', 'Voltage drop in cables or connections', 'Thicker cables, re-crimp, tighten'], ['Shuts off when warm', 'Overheating', 'Improve ventilation, clean fans'], ['Shuts off at random', 'BMS current limit reached', 'Check battery discharge limit vs inverter']] } }
        ]
      },
      {
        h: 'Finding bad connections',
        blocks: [
          'Under a heavy load, measure voltage across each connection: from one side of a lug to the other, or across a fuse holder. A good connection shows a few millivolts; tenths of a volt means resistance and heat. The [voltage drop calculator](/calculators/voltage-drop) tells you what the cable itself should lose, and our [cable and connector guide](/guides/solar-cable-and-connector-guide) explains how to remake connections properly. Preventive checks are listed in the [maintenance checklist](/guides/solar-panel-maintenance).'
        ]
      }
    ],
    faqs: [
      { q: 'Why is my solar charge controller not charging?', a: 'Common causes are a full battery, panel voltage too low (shade or wiring fault), a tripped breaker, a cold battery blocked by its BMS, or wrong settings.' },
      { q: 'How do I test a solar panel with a multimeter?', a: 'In sun, measure open-circuit voltage (Voc) across the panel\'s connectors and compare with the label. Measuring short-circuit current needs a meter rated for it. Follow the meter instructions.' },
      { q: 'Why does my inverter beep when the fridge starts?', a: 'The startup surge momentarily exceeds the inverter\'s capacity or pulls battery voltage down through undersized cables.' }
    ],
    cta: { title: 'Check your wiring losses', text: 'Calculate what your cables should lose and compare with what you measure.', links: [{ href: '/calculators/voltage-drop', label: 'Voltage Drop Calculator' }, { href: '/calculators/solar-panel-output', label: 'Solar Panel Output Calculator' }] }
  },

  'ground-mount-solar-installation': {
    intro: 'A ground-mount array frees you from roof size, orientation and shading limits, and makes cleaning and snow removal easy. It is also a construction project: foundations, racking, trenching and grounding all matter. This guide walks through planning and building one.',
    takeaways: [
      'Site for full sun from about 9am to 3pm in winter, and as close to the equipment as practical.',
      'Tilt near your latitude for year-round production, steeper for winter-heavy use.',
      'Foundations (concrete piers, driven piles or ground screws) must suit soil, wind and snow loads.',
      'Bond the racking and use buried conduit or direct-burial cable at the required depth.'
    ],
    sections: [
      {
        h: 'Siting',
        blocks: [
          { ul: [
            'Check winter shading from trees and buildings, since shadows are longest then.',
            'Keep the array close to the batteries or inverter to limit cable cost and voltage drop. High-voltage strings make longer runs practical.',
            'Check setbacks, permits and HOA rules.',
            'Call your utility-locate service before digging.'
          ] },
          'Estimate production at your site with the [solar production by location calculator](/calculators/solar-production-by-location), and compare roof vs ground with the [ground mount vs roof calculator](/calculators/ground-mount-vs-roof-solar).'
        ]
      },
      {
        h: 'Tilt and row spacing',
        blocks: [
          'A tilt close to your latitude balances the year; latitude + 10-15° favors winter. Multiple rows need spacing so the front row does not shade the back row on winter mornings. Use the [tilt angle calculator](/calculators/solar-panel-tilt-angle), [seasonal tilt adjustment](/calculators/seasonal-tilt-adjustment) and [row spacing calculator](/calculators/solar-panel-row-spacing). Adjustable-tilt racks or [trackers](/calculators/solar-tracker-vs-fixed) can add production.'
        ]
      },
      {
        h: 'Foundations and racking',
        blocks: [
          { table: { head: ['Foundation', 'Pros', 'Cons'], rows: [['Concrete piers', 'Strong, works in most soils', 'Labor, curing time'], ['Ground screws', 'Fast, no concrete', 'Needs suitable soil; specialized install'], ['Driven piles', 'Fast for large arrays', 'Equipment needed'], ['Ballasted', 'No digging', 'Heavy, only on suitable sites']] } },
          'Use racking engineered for your wind and snow loads, and follow its foundation spacing. Most kits are aluminum or galvanized steel with listed bonding hardware.'
        ]
      },
      {
        h: 'Wiring and trenching',
        blocks: [
          { ol: [
            'Wire panels into strings at the array, using PV wire and MC4 connectors.',
            'Bring strings to a combiner or junction box with a disconnect at the array if required.',
            'Trench to the required depth (varies by code and cable type; conduit often 18 inches or more for many residential applications).',
            'Run conduit or direct-burial cable to the equipment, with pull boxes for long runs.',
            'Install surge protection at both ends of long runs.'
          ] },
          'Cable selection and voltage-drop checks are in the [cable and connector guide](/guides/solar-cable-and-connector-guide).'
        ]
      },
      {
        h: 'Grounding',
        blocks: [
          'Bond all racking sections and panel frames, run an equipment grounding conductor with the circuit, and connect to a grounding electrode at the array as code requires. The [grounding and bonding diagram](/wiring-diagrams/system-grounding) shows how the pieces connect. For roof installs instead, see [how to install solar panels](/guides/how-to-install-solar-panels), and for remote properties, the [off-grid cabin guide](/guides/off-grid-cabin-solar).'
        ]
      }
    ],
    faqs: [
      { q: 'How far can a ground-mount array be from the house?', a: 'Hundreds of feet is common with high-voltage strings and properly sized cable. Low-voltage arrays need to be much closer to avoid large losses.' },
      { q: 'What angle should ground-mounted solar panels be?', a: 'About equal to your latitude for year-round output, steeper for winter-focused use.' },
      { q: 'Do ground mounts need permits?', a: 'In most areas, yes, for the structure and electrical work. Check with your local building department.' }
    ],
    cta: { title: 'Plan your array layout', text: 'Find the best tilt and row spacing for your site.', links: [{ href: '/calculators/solar-panel-row-spacing', label: 'Row Spacing Calculator' }, { href: '/calculators/solar-panel-tilt-angle', label: 'Tilt Angle Calculator' }] }
  },

  'battery-monitor-setup': {
    intro: 'If you rely on battery voltage to judge how full a LiFePO4 battery is, you are guessing. Lithium voltage stays almost flat from about 90% down to 20%. A shunt-based battery monitor counts every amp in and out, like a fuel gauge, and is the single most useful upgrade for any off-grid or mobile system.',
    takeaways: [
      'Voltage is a poor state-of-charge indicator for LiFePO4; a shunt measures current directly.',
      'All negative connections except the shunt must be on the shunt\'s system side.',
      'Enter the correct capacity and charged parameters, then let it synchronize on a full charge.',
      'Use the history to spot capacity loss and parasitic loads.'
    ],
    sections: [
      {
        h: 'Why voltage misleads',
        blocks: [
          { table: { head: ['State of charge', '12V LiFePO4 at rest (approx.)'], rows: [['100%', '13.4-13.6V'], ['90%', '13.3V'], ['50%', '13.2V'], ['20%', '13.0V'], ['10%', '12.9V'], ['0%', '10-12V (falls quickly)']] } },
          'From 90% to 20% the voltage changes only about 0.3V, less than the drop caused by a moderate load. A shunt sidesteps this by integrating current over time.'
        ]
      },
      {
        h: 'Choosing a monitor',
        blocks: [
          { ul: [
            '**Shunt rating** above your maximum current (inverter draw usually sets it).',
            '**Display or app:** Bluetooth apps are convenient; a wall display helps everyone in the household.',
            '**Voltage range** covering your system (many support 9-90V).',
            '**Extras:** a temperature sensor, midpoint monitoring for series banks, relay outputs for alarms or generator start.'
          ] }
        ]
      },
      {
        h: 'Wiring it correctly',
        blocks: [
          'The [battery monitor shunt wiring diagram](/wiring-diagrams/battery-monitor-shunt) shows the layout: battery negative → shunt → negative bus → everything else. A small fused wire connects the monitor to battery positive. The rule that matters: **nothing but the shunt touches the battery negative post**, or that current goes uncounted. In a full system it sits as shown in the [campervan electrical diagram](/wiring-diagrams/van-complete-system).'
        ]
      },
      {
        h: 'Settings',
        blocks: [
          { table: { head: ['Setting', 'Typical LiFePO4 value', 'Why'], rows: [['Capacity', 'Rated Ah of the bank', 'Basis for %'], ['Charged voltage', 'About 0.2V below absorption voltage', 'Detects full'], ['Tail current', '2-4% of capacity', 'Detects full'], ['Charged detection time', '1-3 minutes', 'Avoids false sync'], ['Peukert exponent', '~1.05', 'Lithium is nearly ideal'], ['Charge efficiency', '~99%', 'Lithium is very efficient']] } },
          'Always check the battery and monitor manuals. After setup, charge to full so the monitor synchronizes to 100%.'
        ]
      },
      {
        h: 'Using the data',
        blocks: [
          { ul: [
            'Note the overnight Ah used, which is your real baseline load.',
            'Watch for a slowly rising "consumed Ah" with nothing on, which indicates a parasitic load.',
            'Track the capacity the bank actually delivers each year. See the [capacity fade calculator](/calculators/battery-capacity-fade).',
            'Feed real numbers into the [battery runtime calculator](/calculators/battery-runtime) to plan trips and outages.'
          ] },
          'If the monitor and reality disagree, the [troubleshooting guide](/guides/solar-system-troubleshooting) helps. Picking a battery? See [how to choose solar batteries](/guides/how-to-choose-solar-batteries).'
        ]
      }
    ],
    faqs: [
      { q: 'Do I need a battery monitor with a LiFePO4 battery?', a: 'Strongly recommended. Voltage tells you little about LiFePO4 state of charge; a shunt-based monitor is accurate to within a few percent.' },
      { q: 'Does the BMS app replace a battery monitor?', a: 'Some BMS apps estimate state of charge reasonably well. A dedicated shunt is usually more accurate and covers the whole bank in one reading.' },
      { q: 'Why does my monitor show 100% when the battery is not full?', a: 'The charged voltage or tail current settings are too loose, so it synchronizes early. Tighten them per the battery manufacturer.' }
    ],
    cta: { title: 'Plan with real numbers', text: 'Use your monitor data to plan runtime and capacity.', links: [{ href: '/calculators/battery-runtime', label: 'Battery Runtime Calculator' }, { href: '/calculators/battery-capacity-fade', label: 'Battery Capacity Fade' }] }
  },

  'diy-solar-generator-build': {
    intro: 'A DIY solar generator is a battery, inverter, charge controller and outlets in a box. Built well, it can cost less than a commercial power station of similar capacity, be repaired part by part and be expanded later. Built badly, it is a fire risk. Here is how to plan the parts, wire and fuse them, and decide whether DIY is right for you.',
    takeaways: [
      'Core parts: LiFePO4 battery, pure sine inverter, MPPT controller, fuses, bus bars, outlets and a sturdy enclosure.',
      'Fuse every positive cable from the battery, and use a main Class T or MRBF fuse.',
      'Keep heavy cables short; give the inverter airflow.',
      'Commercial power stations win on convenience, warranty and certification; DIY wins on repairability and cost per Wh at larger sizes.'
    ],
    sections: [
      {
        h: 'Parts list (1.2kWh example)',
        blocks: [
          { table: { head: ['Part', 'Example spec', 'Notes'], rows: [['Battery', '12V 100Ah LiFePO4 with BMS', 'Check BMS continuous current ≥ inverter draw'], ['Inverter', '1,000W pure sine, 12V', 'Draws ~95A at full load'], ['MPPT controller', '30A, 100V max PV', 'Handles ~400W of panels'], ['Main fuse', '125-150A MRBF or Class T', 'At battery positive'], ['Branch fuses', 'Fuse block for USB/12V sockets', 'Per wire size'], ['Battery monitor', 'Shunt-based', 'Accurate state of charge'], ['Panel input', 'Anderson or MC4 panel-mount', 'With a breaker or fuse'], ['Enclosure', 'Ventilated case with handles', 'Secure the battery'], ['Cable', '2-4 AWG main, 10-16 AWG branches', 'Short runs']] } }
        ]
      },
      {
        h: 'Wiring layout',
        blocks: [
          'Battery positive → main fuse → master switch → positive bus. Battery negative → shunt → negative bus. From the buses: inverter (heavy cables, own fuse), charge controller (fused), fuse block for DC outlets, and the monitor. The [fuse block and bus bar diagram](/wiring-diagrams/dc-fuse-block-busbar) shows the DC distribution, and the [battery monitor diagram](/wiring-diagrams/battery-monitor-shunt) shows the shunt. Size every fuse with our [fuse and breaker guide](/guides/solar-fuse-and-breaker-sizing).',
          { warn: 'Mount the battery so it cannot move, keep terminals covered, and never work on a live battery with uninsulated tools. A dropped wrench across terminals can weld itself in place.' }
        ]
      },
      {
        h: 'Charging inputs',
        blocks: [
          { ul: [
            '**Solar:** panels to the MPPT controller via a panel-mount connector and breaker. Connecting portable panels is covered in the [panels to power station diagram](/wiring-diagrams/portable-panel-power-station).',
            '**AC charging:** a LiFePO4 charger (10-20A) from a wall outlet, or an inverter-charger instead of a plain inverter.',
            '**Vehicle:** a DC-DC charger for charging while driving.'
          ] }
        ]
      },
      {
        h: 'DIY or buy?',
        blocks: [
          { table: { head: ['', 'DIY', 'Commercial power station'], rows: [['Cost per Wh (1-2kWh)', 'Often lower', 'Higher, falling'], ['Weight and size', 'Heavier, bulkier', 'Compact, integrated'], ['Repair', 'Swap individual parts', 'Send to manufacturer'], ['Certification', 'None', 'UL/CE-tested'], ['UPS mode, apps', 'Depends on parts', 'Usually built in'], ['Skill needed', 'Moderate', 'None']] } },
          'If you want plug-and-play, compare options in [best portable power stations](/guides/best-portable-power-stations) and [best solar generators](/guides/best-solar-generators-2026).'
        ]
      }
    ],
    faqs: [
      { q: 'Is it cheaper to build your own solar generator?', a: 'Often, especially at 1-2kWh and above, but the gap has narrowed. Factor in tools, fuses, cables and your time.' },
      { q: 'What battery should I use for a DIY solar generator?', a: 'A LiFePO4 battery with a built-in BMS whose continuous discharge rating covers your inverter\'s maximum draw.' },
      { q: 'Is a DIY solar generator safe?', a: 'It can be, with correct fusing, cable sizing, secure mounting and ventilation. Most failures come from missing fuses and poor connections.' }
    ],
    cta: { title: 'Size your build', text: 'Match battery, inverter and panels for your needs.', links: [{ href: '/calculators/inverter-battery-matching', label: 'Inverter-Battery Matching' }, { href: '/calculators/charge-controller-sizing', label: 'Charge Controller Sizing' }] }
  }
}
