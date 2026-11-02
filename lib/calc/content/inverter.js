// lib/calc/content/inverter.js
export const inverterContent = {
  'inverter-pv-compatibility': {
    title: 'Inverter vs Solar Panel Wattage Compatibility Checker',
    description: 'Check whether your solar array is compatible with your inverter. Get the DC/AC ratio, headroom to max PV input, max panels and estimated clipping.',
    intro: 'Can your inverter handle the panels you want to connect? Enter the inverter\'s AC rating and maximum PV input from its datasheet, plus your panels, to check the DC/AC ratio and see whether you are over the limit or leaving power on the table.',
    formula: ['DC/AC ratio = (Panel W × Panels) ÷ Inverter AC W', 'Max panels = ⌊Max PV input ÷ Panel W⌋'],
    how: [
      'A DC/AC ratio of 1.1–1.3 is normal and recommended. Panels rarely reach their full rating, so a slightly smaller inverter runs closer to its efficient range.',
      'Above about 1.3, the inverter caps (clips) output on the sunniest hours of the day.',
      'Never exceed the datasheet\'s maximum PV input power. Also check voltage and current limits with the string voltage calculator.'
    ],
    faqs: [
      { q: 'Can I connect 6,000W of panels to a 5,000W inverter?', a: 'Usually yes. That is a DC/AC ratio of 1.2, which is ideal, provided the inverter\'s maximum PV input is at least 6,000W and the string voltages are within range.' },
      { q: 'What is inverter clipping?', a: 'When panels produce more DC power than the inverter can convert, the inverter limits output to its rating. The excess is lost, but at ratios below about 1.3 the annual loss is usually under 1–2%.' },
      { q: 'Is it bad to undersize an array for an inverter?', a: 'It is safe, but the inverter will spend most of its time at low load where it is less efficient, and you have paid for capacity you do not use.' }
    ],
    related: ['pv-string-voltage', 'grid-tie-inverter-sizing', 'inverter-sizing', 'hybrid-inverter-sizing']
  },
  'pv-string-voltage': {
    title: 'Solar String Voltage Calculator: Inverter DC Input Check',
    description: 'Calculate cold-weather string Voc and hot-weather Vmp to check your solar strings stay within your inverter\'s max voltage and MPPT range.',
    intro: 'Solar panel voltage rises in the cold and falls in the heat. This calculator checks that a string of panels never exceeds your inverter\'s maximum voltage on a freezing morning and never drops below the MPPT range on a hot afternoon.',
    formula: ['Cold Voc = Panel Voc × (1 + Coef × (T min − 25)) × Panels', 'Hot Vmp ≈ Panel Vmp × (1 + 1.3 × Coef × (70 − 25)) × Panels'],
    how: [
      'Use the record low temperature for your location. Over-voltage on a cold, bright morning can permanently damage an inverter.',
      'Voc and Vmp come from the panel datasheet, along with the Voc temperature coefficient (usually −0.25 to −0.30 %/°C).',
      'Hot cells around 70°C pull operating voltage down, so make sure the string stays above the MPPT minimum.'
    ],
    faqs: [
      { q: 'How many solar panels can I put in a string?', a: 'Divide the inverter\'s maximum DC voltage by the panel\'s cold-temperature Voc. For a 500V inverter and 37.5V Voc panels at −10°C, that is 12 panels.' },
      { q: 'Why does solar panel voltage go up in cold weather?', a: 'Silicon cell voltage rises as temperature falls. At −10°C, a panel\'s open-circuit voltage is about 9–10% higher than its rated value at 25°C.' },
      { q: 'What happens if string voltage is below the MPPT range?', a: 'The inverter cannot track the maximum power point and output drops, or the inverter may not start at all until voltage rises.' }
    ],
    related: ['inverter-pv-compatibility', 'solar-fuse-size', 'temperature-coefficient-loss', '/wiring-diagrams/panel-series']
  },
  'pure-sine-vs-modified-sine': {
    title: 'Pure Sine vs Modified Sine Inverter Compatibility Checker',
    description: 'Check whether your appliance needs a pure sine wave inverter or can run on a modified sine inverter, and how much power is wasted if it can.',
    intro: 'Modified sine wave inverters are cheaper but their stepped waveform makes some devices run hot, buzz or fail. Pick your appliance to see whether it needs a pure sine inverter and how much extra power a modified sine inverter would waste.',
    formula: ['Wasted W = Device W × Modified-sine penalty', 'Pure sine size ≥ Device W × 1.25'],
    how: [
      'Pure sine inverters output a smooth wave identical to (or cleaner than) grid power, so everything runs as designed.',
      'Modified sine inverters approximate the wave with steps. Motors, compressors, medical devices and electronics with timing circuits suffer most.',
      'Simple resistive loads like kettles and heaters do not care about waveform.'
    ],
    faqs: [
      { q: 'Do I need a pure sine wave inverter?', a: 'For fridges, CPAP machines, microwaves, variable-speed tools and most modern electronics, yes. The price gap has narrowed enough that pure sine is the safe default.' },
      { q: 'Can a modified sine inverter damage appliances?', a: 'It can. Motors run hotter and may wear out sooner, and some chargers, printers and medical devices can be damaged.' },
      { q: 'Can I run a CPAP on a modified sine inverter?', a: 'Manufacturers recommend against it. Use a pure sine inverter or the CPAP\'s DC power adapter.' }
    ],
    related: ['inverter-sizing', 'inverter-oversizing', 'inverter-efficiency-loss', '/blog/cpap-machine-solar-generator']
  },
  'inverter-efficiency-loss': {
    title: 'Inverter Efficiency Loss Calculator: kWh & Cost per Year',
    description: 'Calculate the energy and money an inverter wastes each year from conversion losses and no-load idle draw.',
    intro: 'Inverters lose energy two ways: a few percent while converting power, and a constant idle draw whenever they are switched on. This calculator adds both up so you can see what your inverter costs to run and whether a more efficient model pays off.',
    formula: ['Conversion loss = Load W × Hours × (1 ÷ Efficiency − 1)', 'Idle loss = Idle W × (24 − Hours)'],
    how: [
      'Efficiency ratings are measured near the inverter\'s sweet spot. At light loads, real efficiency is often 5–10 points lower.',
      'Idle (no-load) draw ranges from under 10W for efficient models to 50W+ for large or older inverters.',
      'On small off-grid systems, idle draw can be the single biggest loss, so use the inverter\'s power-save mode where available.'
    ],
    faqs: [
      { q: 'How much power does an inverter use with no load?', a: 'Typically 10–50W. A 25W idle draw left on all day uses 600 Wh, which is more than many small fridges.' },
      { q: 'What is a good inverter efficiency?', a: 'Modern pure sine inverters reach 90–95% peak efficiency. Grid-tie string inverters reach 97–98%.' },
      { q: 'Should I turn off my inverter at night?', a: 'If nothing needs AC power overnight, yes, or use a search/eco mode that sleeps until a load is detected.' }
    ],
    related: ['inverter-oversizing', 'battery-efficiency-loss', 'cable-length-power-loss', 'inverter-replacement']
  },
  'inverters-in-parallel': {
    title: 'Inverter Parallel Operation Calculator',
    description: 'Calculate the combined continuous and surge capacity of inverters running in parallel, with load-sharing derating and N+1 redundancy.',
    intro: 'Stacking inverters in parallel raises capacity and adds redundancy. Enter the rating and number of units to see the real usable power once you allow for uneven load sharing, and what you keep if one unit fails.',
    formula: ['Usable W = Rating × Active units × (1 − Derate)', 'N+1: Active units = Units − 1'],
    how: [
      'Parallel inverters rarely share load perfectly, so a 5–10% derate gives a realistic capacity.',
      'N+1 redundancy means the system can still carry the full load with one unit offline.',
      'Only parallel inverters that are designed for it, using identical models, firmware and a sync cable.'
    ],
    faqs: [
      { q: 'Can I connect two inverters in parallel?', a: 'Only models with a built-in parallel or stacking function. Connecting the outputs of ordinary inverters together will damage them.' },
      { q: 'Does paralleling inverters double surge capacity?', a: 'Roughly, yes. Surge capacity adds up like continuous capacity, which helps start large motors.' },
      { q: 'What is N+1 redundancy?', a: 'Installing one more inverter than the load needs, so the system keeps running at full capacity if any single unit fails.' }
    ],
    related: ['hybrid-inverter-sizing', 'inverter-sizing', 'inverter-oversizing']
  },
  'grid-tie-inverter-sizing': {
    title: 'Grid-Tied Inverter Sizing Calculator (DC/AC Ratio)',
    description: 'Size a grid-tied inverter for your solar array. Choose a DC/AC ratio and climate to get the inverter kW, nearest standard size and clipping estimate.',
    intro: 'Grid-tie inverters are normally sized a little smaller than the solar array. Enter your array size and target DC/AC ratio to find the right inverter and see how much energy clipping would cost in your climate.',
    formula: ['Inverter kW = Array kWp ÷ DC/AC ratio', 'Rounded up to the next standard inverter size'],
    how: [
      'Ratios of 1.15–1.3 are standard. In cool, cloudy climates panels rarely reach full output, so higher ratios lose almost nothing.',
      'In hot, sunny climates panels hit peak power more often, so clipping starts at lower ratios.',
      'Standard residential sizes include 3.8, 5, 6, 7.6, 10 and 11.4 kW.'
    ],
    faqs: [
      { q: 'What size inverter do I need for an 8kW solar system?', a: 'At a 1.2 DC/AC ratio, about 6.7 kW, so a 7.6 kW inverter is the nearest standard size.' },
      { q: 'What is the best DC/AC ratio?', a: 'Usually 1.15–1.3. It lowers cost per kWh by keeping the inverter busy, with only small clipping losses.' },
      { q: 'Should I oversize my inverter for future panels?', a: 'Only if you definitely plan to add panels soon. Otherwise a slightly undersized inverter is cheaper and more efficient.' }
    ],
    related: ['inverter-pv-compatibility', 'pv-string-voltage', 'solar-production-by-location', 'solar-vs-grid-cost']
  },
  'hybrid-inverter-sizing': {
    title: 'Hybrid Inverter Size Calculator (Solar + Battery)',
    description: 'Size a hybrid inverter from your continuous load, motor surge, solar array and battery. Checks surge rating, DC current and battery C-rate.',
    intro: 'A hybrid inverter has to handle your household load, your solar array and your battery at the same time. Enter all three to find the right inverter size and check that your battery can deliver the current it demands.',
    formula: ['Inverter W ≥ max(Continuous × 1.25, PV W ÷ 1.3)', 'Battery current = Inverter W ÷ Battery V ÷ 0.92', 'C-rate = Battery kW ÷ Battery kWh'],
    how: [
      'Size for continuous load with 25% headroom, and check the surge rating covers motor starting (about 3× running watts).',
      'The battery must be able to supply the inverter\'s full DC current. Below about 0.5C is comfortable for LiFePO4.',
      'Confirm the inverter\'s maximum PV input and MPPT voltage window with the compatibility and string voltage calculators.'
    ],
    faqs: [
      { q: 'What size hybrid inverter do I need?', a: 'For a home with 3.5 kW of continuous load and a 6 kW array, a 5 kW hybrid inverter is a typical match.' },
      { q: 'Can a small battery limit a hybrid inverter?', a: 'Yes. If the battery\'s maximum discharge current is lower than the inverter draws, the battery BMS will cut out under heavy loads.' },
      { q: 'Do hybrid inverters work without batteries?', a: 'Most do, acting as a grid-tie inverter, but many will not supply power during an outage without a battery.' }
    ],
    related: ['hybrid-solar-system-sizing', 'inverter-battery-matching', 'inverters-in-parallel', 'battery-bank-sizing']
  },
  'inverter-battery-matching': {
    title: 'Inverter to Battery Matching Calculator',
    description: 'Match a battery bank to your inverter: battery Ah for your runtime, max DC current, fuse size, minimum cable gauge and BMS rating.',
    intro: 'An inverter is only as good as the battery feeding it. Enter your inverter rating, typical load and runtime to get the battery capacity, the peak DC current, and the fuse, cable and BMS ratings needed to handle it safely.',
    formula: ['Max DC A = Inverter W ÷ Battery V ÷ 0.9', 'Battery Ah = Load W × Hours ÷ (V × 0.9 × DoD)', 'Fuse ≥ 1.25 × Max DC A'],
    how: [
      'At full output a 3,000W inverter on 12V draws over 270A, which is why larger inverters belong on 24V or 48V batteries.',
      'The battery\'s BMS must allow at least the inverter\'s maximum DC current, or it will shut down under heavy loads.',
      'Cable gauge here uses 75°C copper ampacity; keep battery-to-inverter runs as short as possible.'
    ],
    faqs: [
      { q: 'What battery do I need for a 3000W inverter?', a: 'On 24V, the battery must supply about 140A at full load. For 1,200W for 5 hours you need roughly 310Ah of LiFePO4 at 24V.' },
      { q: 'What size fuse do I need between battery and inverter?', a: 'At least 125% of the maximum DC current, rounded up to a standard size: a 175A fuse for a 3,000W, 24V inverter.' },
      { q: 'Can I run a 3000W inverter on a 100Ah battery?', a: 'Only briefly. At full power a 12V 100Ah battery would last under 20 minutes and most 100Ah BMSs cannot supply 270A.' }
    ],
    related: ['battery-capacity-for-runtime', 'solar-wire-size', 'solar-breaker-size', 'hybrid-inverter-sizing']
  },
  'inverter-oversizing': {
    title: 'Inverter Oversizing vs Undersizing Calculator',
    description: 'Check whether your inverter is oversized or undersized for your load. See utilisation, headroom, surge capacity and idle energy wasted per year.',
    intro: 'An undersized inverter trips under load or cannot start motors. An oversized one wastes energy idling and runs inefficiently at light loads. Enter your load and inverter to see where yours sits.',
    formula: ['Utilisation = Continuous load ÷ Inverter rating', 'Surge OK if Startup surge ≤ Rating × Surge multiplier'],
    how: [
      'Running between 30% and 80% of rating gives the best balance of efficiency and headroom.',
      'Motors and compressors briefly draw 2–3× their running power when they start; the inverter\'s surge rating must cover this.',
      'Every inverter has an idle draw, and bigger inverters generally idle higher.'
    ],
    faqs: [
      { q: 'Is it bad to oversize an inverter?', a: 'A little oversizing is fine and gives room to grow. A lot of oversizing wastes energy through higher idle draw and lower efficiency at light load.' },
      { q: 'What happens if an inverter is too small?', a: 'It shuts down on overload, or fails to start motors and compressors. Repeated overloading shortens its life.' },
      { q: 'How much bigger than my load should my inverter be?', a: 'Aim for continuous load at about 70% of rating, with a surge rating that covers your largest motor starting.' }
    ],
    related: ['inverter-sizing', 'inverter-efficiency-loss', 'pure-sine-vs-modified-sine', 'inverters-in-parallel']
  }
}
