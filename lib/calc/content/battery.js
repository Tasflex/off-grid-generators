// lib/calc/content/battery.js
export const batteryContent = {
  'battery-capacity-for-runtime': {
    title: 'Battery Capacity Calculator: Ah Needed for X Hours',
    description: 'Calculate the battery capacity in amp-hours and kWh you need to run a load for a set number of hours, accounting for chemistry and inverter losses.',
    intro: 'Work backwards from what you need to power. Enter the load in watts and how many hours it must run, and this calculator returns the battery size in amp-hours for your voltage, allowing for usable depth of discharge and inverter losses.',
    formula: ['Energy drawn (Wh) = Load W × Hours ÷ Inverter efficiency', 'Battery Ah = Energy drawn ÷ Depth of discharge ÷ Battery V'],
    how: [
      'LiFePO4 batteries can safely use about 90% of their capacity; lead-acid batteries should stay above 50% to protect their lifespan.',
      'If you run AC appliances through an inverter, about 10% of the energy is lost in conversion. Set efficiency to 100% for DC loads.',
      'Higher battery voltages need fewer amp-hours for the same energy and carry lower currents.'
    ],
    faqs: [
      { q: 'What size battery do I need to run 300W for 8 hours?', a: 'About 2.96 kWh of LiFePO4 capacity with a 90% efficient inverter, which is roughly 250Ah at 12V or 125Ah at 24V.' },
      { q: 'Why do lead-acid batteries need to be twice as big?', a: 'Discharging lead-acid below 50% sharply shortens its life, so only half the rated capacity is usable. Lithium can use 80–90%.' },
      { q: 'How do I convert amp-hours to watt-hours?', a: 'Multiply amp-hours by battery voltage. A 12V 100Ah battery stores 1,200 Wh (1.2 kWh).' }
    ],
    related: ['battery-runtime', 'battery-bank-sizing', 'how-many-batteries', 'inverter-battery-matching']
  },
  'how-many-batteries': {
    title: 'How Many Batteries Do I Need? Battery Count Calculator',
    description: 'Calculate how many batteries you need for a load and backup time, and how to wire them in series and parallel for a 12V, 24V or 48V system.',
    intro: 'Find out exactly how many batteries your system needs and how to connect them. Enter your load, backup hours and the batteries you plan to buy, and the calculator works out the series and parallel layout for your system voltage.',
    formula: ['Required Wh = Load W × Hours ÷ DoD ÷ 0.95', 'Batteries in series = System V ÷ Battery V', 'Parallel strings = ⌈Required Wh ÷ (System V × Battery Ah)⌉'],
    how: [
      'Batteries are first wired in series to reach the system voltage, for example two 12V batteries for 24V.',
      'Identical series strings are then wired in parallel to add capacity.',
      'Keep parallel strings to four or fewer so current shares evenly; beyond that, use bigger batteries or a higher voltage.'
    ],
    faqs: [
      { q: 'How many batteries do I need for 500W for 10 hours?', a: 'About 6.6 kWh of capacity at 80% depth of discharge. On a 24V system with 12V 100Ah batteries, that is six batteries wired as 2 in series × 3 in parallel.' },
      { q: 'Can I mix different batteries?', a: 'No. Use the same model, capacity, chemistry and age throughout the bank. Mismatched batteries charge and discharge unevenly and wear out faster.' },
      { q: 'Is it better to use fewer large batteries?', a: 'Generally yes. Fewer, larger batteries mean fewer connections, simpler wiring and more even current sharing.' }
    ],
    related: ['battery-series-parallel', 'battery-bank-sizing', 'battery-capacity-for-runtime', 'battery-runtime']
  },
  'battery-series-parallel': {
    title: 'Battery Series vs Parallel Calculator: Bank Voltage & Ah',
    description: 'Calculate battery bank voltage, amp-hours and kWh for any series and parallel configuration such as 2S2P or 4S1P.',
    intro: 'Wiring batteries in series adds voltage; wiring them in parallel adds amp-hours. Enter your battery and the number in series and parallel to see the bank voltage, capacity and stored energy.',
    formula: ['Bank V = Battery V × Series count', 'Bank Ah = Battery Ah × Parallel strings', 'Energy (kWh) = Bank V × Bank Ah ÷ 1000'],
    how: [
      'Series: connect the positive of one battery to the negative of the next. Voltage adds, capacity stays the same.',
      'Parallel: connect positive to positive and negative to negative. Capacity adds, voltage stays the same.',
      'Total stored energy is the same either way; the configuration only changes how voltage and current are split.'
    ],
    faqs: [
      { q: 'What does 2S2P mean?', a: 'Two batteries in series, and two of those series strings in parallel: four batteries in total. With 12V 100Ah batteries, 2S2P gives a 24V 200Ah bank.' },
      { q: 'Is series or parallel better for solar?', a: 'Series wiring to a higher voltage (24V or 48V) is better for larger systems because current is lower, so cables can be thinner and losses smaller.' },
      { q: 'Can I wire lithium batteries in series?', a: 'Only if the manufacturer allows it. Many 12V LiFePO4 batteries support up to 4 in series; check the limit and use batteries with matched state of charge.' }
    ],
    related: ['how-many-batteries', 'battery-bank-sizing', 'solar-fuse-size', 'voltage-drop']
  },
  'lead-acid-vs-lithium-runtime': {
    title: 'Lead-Acid vs Lithium Battery Runtime Calculator',
    description: 'Compare runtime of a lead-acid and a LiFePO4 battery of the same rated capacity, including Peukert losses, usable depth and weight.',
    intro: 'A 100Ah lead-acid battery and a 100Ah lithium battery are not equal. Lead-acid loses capacity at high currents and should only be half discharged. Enter your load to see how long each one actually lasts.',
    formula: ['Peukert runtime t = 20 × (Ah ÷ (I × 20))^k', 'Lead-acid: k ≈ 1.25, 50% usable', 'LiFePO4: k ≈ 1.05, 90% usable'],
    how: [
      'Battery ratings are measured over 20 hours. Draw current faster and lead-acid delivers noticeably less, which Peukert\'s law describes.',
      'Lithium iron phosphate has a flat discharge curve and is barely affected by discharge rate.',
      'Weights are typical: about 25 kg per kWh for lead-acid and under 10 kg per kWh for LiFePO4.'
    ],
    faqs: [
      { q: 'How much longer does a lithium battery last than lead-acid?', a: 'For the same rated amp-hours, LiFePO4 usually runs a load about 2–2.5× longer, because it can use 90% of its capacity and loses little at high currents.' },
      { q: 'What is Peukert\'s law?', a: 'It describes how a battery\'s effective capacity drops as discharge current rises. Lead-acid has a Peukert exponent around 1.2–1.3; lithium is close to 1.0.' },
      { q: 'Is lithium worth the extra cost?', a: 'Usually. LiFePO4 lasts 3,000–6,000 cycles versus 500–1,000 for lead-acid, so its cost per kWh delivered over its life is typically lower.' }
    ],
    related: ['battery-lifetime-cost', 'battery-runtime', 'battery-dod-degradation', 'battery-capacity-for-runtime']
  },
  'battery-efficiency-loss': {
    title: 'Battery Efficiency Loss Calculator: kWh & Cost Lost',
    description: 'Calculate how much energy and money is lost to battery round-trip inefficiency each year for LiFePO4, NMC, AGM and flooded batteries.',
    intro: 'Every kWh you store comes back a little smaller. This calculator shows how much energy your battery loses to round-trip inefficiency each year and what that costs, so you can compare chemistries on running cost.',
    formula: ['Charge needed = Energy out ÷ Round-trip efficiency', 'Loss per day = Charge needed − Energy out'],
    how: [
      'Round-trip efficiency is the share of energy put into a battery that you get back: about 95% for LiFePO4 and 80–85% for lead-acid.',
      'Losses become heat in the cells, the BMS and the charge controller.',
      'Over a 10-year life, the efficiency gap between chemistries can add up to hundreds of dollars.'
    ],
    faqs: [
      { q: 'How efficient are lithium batteries?', a: 'LiFePO4 batteries typically have 92–98% round-trip efficiency. Lead-acid is 75–85%, and worse when it is regularly held at partial charge.' },
      { q: 'How much energy does a 10 kWh battery waste?', a: 'Cycling 10 kWh a day, a LiFePO4 battery loses about 190 kWh per year. An AGM battery loses around 800 kWh per year.' },
      { q: 'Does charging speed affect efficiency?', a: 'Yes. Very fast charging and discharging increases internal resistance losses, so moderate rates are slightly more efficient.' }
    ],
    related: ['battery-round-trip-efficiency', 'battery-lifetime-cost', 'inverter-efficiency-loss']
  },
  'battery-round-trip-efficiency': {
    title: 'Battery Round-Trip Efficiency Calculator',
    description: 'Calculate a battery\'s round-trip efficiency from measured energy in and energy out, plus energy lost and estimated one-way efficiency.',
    intro: 'Measured how much energy went into your battery and how much came back out? Enter both numbers to get its round-trip efficiency and see whether it is in a healthy range for its chemistry.',
    formula: ['Round-trip efficiency = Energy out ÷ Energy in', 'One-way efficiency ≈ √(Round-trip efficiency)'],
    how: [
      'Measure from the same state of charge, for example full to 20% and back to full, so the battery ends where it started.',
      'Most inverters and battery monitors log energy in and out; a shunt-based monitor gives the most accurate figures.',
      'Efficiency falling over time can be a sign of ageing cells or rising internal resistance.'
    ],
    faqs: [
      { q: 'What is a good round-trip efficiency?', a: 'Above 90% is normal for lithium batteries. 80–85% is typical for lead-acid. Below 75% suggests a problem such as heat, ageing or a parasitic load.' },
      { q: 'Does round-trip efficiency include the inverter?', a: 'It depends where you measure. Measured at the battery terminals it is battery-only; measured at the AC side it includes inverter and charger losses, typically 85–90% overall.' },
      { q: 'Why is one-way efficiency the square root?', a: 'Losses happen on both the way in and the way out. If they are roughly equal, each direction has an efficiency equal to the square root of the round trip.' }
    ],
    related: ['battery-efficiency-loss', 'battery-capacity-fade', 'battery-lifetime-cost']
  },
  'battery-capacity-fade': {
    title: 'Battery Degradation Over Years Calculator',
    description: 'Estimate how much capacity a solar battery loses over time from calendar ageing and cycling, and when it reaches 80% and 70% health.',
    intro: 'Batteries lose capacity both with age and with every cycle. Enter your battery size, chemistry and how often you cycle it to see how much capacity remains after a given number of years.',
    formula: ['Fade per year = Calendar fade + Cycle fade × Cycles per year', 'Capacity after N years = Starting kWh × (1 − Fade per year × N)'],
    how: [
      'Calendar fade happens even when a battery sits unused: roughly 1%/yr for LiFePO4, 2%/yr for NMC and 2.5–3%/yr for lead-acid.',
      'Cycle fade assumes each chemistry reaches 80% capacity at its typical rated cycle life.',
      'Heat speeds up both kinds of fade. Keeping batteries near 20–25°C extends their life.'
    ],
    faqs: [
      { q: 'How long do solar batteries last?', a: 'LiFePO4 batteries typically last 10–15 years and 3,000–6,000 cycles before dropping to 80% capacity. Lead-acid batteries usually last 3–7 years.' },
      { q: 'What does 80% state of health mean?', a: 'The battery can hold 80% of its original capacity. Most warranties define end of life at 60–80%, though the battery still works beyond that.' },
      { q: 'How can I slow battery degradation?', a: 'Avoid high temperatures, avoid sitting at 100% charge for long periods, and use moderate depths of discharge where possible.' }
    ],
    related: ['battery-dod-degradation', 'battery-lifetime-cost', 'battery-round-trip-efficiency', 'battery-bank-sizing']
  },
  'battery-bank-sizing': {
    title: 'Battery Bank Sizing Calculator (kWh/Day & Days of Autonomy)',
    description: 'Size an off-grid or backup battery bank from daily kWh use, days of autonomy, depth of discharge, system voltage and cold-weather derating.',
    intro: 'Size a battery bank that covers your daily use through several days without sun. Enter how much energy you use per day and how many days of reserve you want; the calculator returns the bank size in kWh and amp-hours.',
    formula: ['Bank kWh = Daily kWh × Days ÷ DoD ÷ 0.9 × Temperature factor', 'Bank Ah = Bank kWh × 1000 ÷ System V'],
    how: [
      'Days of autonomy is how long the bank must last with no solar input: 1–2 days for grid backup, 3–5 days for off-grid homes.',
      'The 0.9 factor covers inverter and wiring losses between the battery and your appliances.',
      'Cold batteries deliver less capacity, so the bank is enlarged when the coldest battery temperature is below 25°C.'
    ],
    faqs: [
      { q: 'How big a battery bank do I need for off-grid?', a: 'Using 5 kWh per day with 2 days of autonomy and 80% depth of discharge needs about 14 kWh of batteries, or roughly 290Ah at 48V.' },
      { q: 'How many days of autonomy should I plan for?', a: 'Two to three days is typical for off-grid homes with a backup generator. Plan for five or more without a generator in cloudy climates.' },
      { q: 'Should I use 12V, 24V or 48V?', a: 'Use 12V for small systems under about 1.5 kW, 24V up to around 3 kW, and 48V for anything larger. Higher voltage means lower current and thinner cables.' }
    ],
    related: ['battery-autonomy', 'off-grid-system-sizing', 'how-many-batteries', 'daily-energy-use']
  },
  'battery-charging-current': {
    title: 'Battery Charging Current Calculator (C-Rate)',
    description: 'Find the recommended and maximum charging current for LiFePO4, AGM, gel and flooded batteries, plus charger size and solar watts needed.',
    intro: 'Charging too slowly wastes sun; charging too fast shortens battery life. Enter your battery size and chemistry to get the recommended and maximum charge current, the charger size and the solar array that can supply it.',
    formula: ['Charge current = Battery Ah × C-rate', 'Charger W = Current × Charging voltage (≈ 1.2 × nominal)'],
    how: [
      'C-rate expresses current relative to capacity: 0.2C on a 200Ah battery is 40A.',
      'LiFePO4 is happy at 0.2–0.5C. Lead-acid prefers 0.1–0.2C and needs a slower absorption stage to finish charging.',
      'Always check the battery datasheet, which sets the actual limits for your model.'
    ],
    faqs: [
      { q: 'What charging current should I use for a 200Ah lithium battery?', a: 'Around 40–60A (0.2–0.3C) is ideal for longevity, and most 200Ah LiFePO4 batteries accept up to 100A (0.5C).' },
      { q: 'What happens if I charge a battery too fast?', a: 'High current causes heat and, for lead-acid, gassing. Over time this reduces capacity. Lithium batteries rely on the BMS to cut off excessive current.' },
      { q: 'How big a charge controller do I need?', a: 'At least the recommended charge current. For example, a 60A MPPT controller suits a 200Ah LiFePO4 bank at 0.3C.' }
    ],
    related: ['charge-controller-sizing', 'charge-time', 'battery-bank-sizing', 'solar-breaker-size']
  },
  'battery-autonomy': {
    title: 'Battery Autonomy Calculator: Days Without Sun',
    description: 'Calculate how many days and hours your battery bank can power your home with little or no solar input.',
    intro: 'How long can your batteries keep things running through a cloudy stretch or a power outage? Enter your bank size and daily load to see how many days of autonomy you have.',
    formula: ['Usable kWh = Bank kWh × DoD × 0.9', 'Days = Usable kWh ÷ (Daily load × (1 − Solar share))'],
    how: [
      'Even heavily overcast days usually produce 10–20% of normal solar output, which stretches your reserve.',
      'The 0.9 factor accounts for inverter and wiring losses.',
      'Reducing your load during long outages extends autonomy proportionally.'
    ],
    faqs: [
      { q: 'How many days can a 10 kWh battery power a house?', a: 'At 4 kWh of essential use per day with 10% solar on dark days, a 10 kWh battery at 80% depth of discharge lasts about 2 days.' },
      { q: 'What is battery autonomy?', a: 'The number of days a battery bank can supply your loads without being recharged by solar or the grid.' },
      { q: 'How can I increase autonomy without more batteries?', a: 'Cut non-essential loads, run large appliances only when the sun is out, and keep a generator as a backup charging source.' }
    ],
    related: ['battery-bank-sizing', 'cloud-cover-solar-loss', 'battery-runtime', 'off-grid-system-sizing']
  }
}
