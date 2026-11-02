// lib/calc/content/builder.js
export const builderContent = {
  'solar-vs-grid-cost': {
    title: 'Solar vs Grid Cost Calculator: Payback & 25-Year Savings',
    description: 'Compare the cost of solar with grid electricity. Calculate payback period, 25-year net savings and solar cost per kWh with incentives and price rises.',
    intro: 'Is solar cheaper than staying on grid power? Enter your system size, installed cost, incentives and electricity price to see how many years until solar pays for itself and how much you save over 25 years.',
    formula: ['Net cost = kW × 1000 × $/W × (1 − Incentive)', 'Yearly savings = kWh × Grid price × (1 + Price rise)^year − Maintenance', 'Solar $/kWh = (Net cost + Maintenance) ÷ Lifetime kWh'],
    how: [
      'Production falls 0.5% per year to reflect typical panel degradation.',
      'Grid prices are assumed to rise at the rate you set; the US long-run average is roughly 2–3% per year.',
      'Solar cost per kWh (levelized cost) below your grid price means solar is the cheaper source over the system\'s life.'
    ],
    faqs: [
      { q: 'How long does it take for solar panels to pay for themselves?', a: 'A 6 kW system at $2.80/W with a 30% tax credit, 4.5 sun hours and $0.16/kWh electricity pays back in about 8–9 years.' },
      { q: 'Is solar cheaper than grid electricity?', a: 'In most sunny regions, yes. Residential solar typically costs $0.06–0.12 per kWh over its life, below average US grid prices.' },
      { q: 'Does this include net metering?', a: 'It assumes every kWh produced offsets a kWh at the full grid price. If your utility pays less for exported energy, savings will be lower.' }
    ],
    related: ['off-grid-budget', 'solar-production-by-location', 'grid-tie-inverter-sizing', 'battery-lifetime-cost']
  },
  'daily-energy-use': {
    title: 'Daily Energy Use Calculator: kWh per Day from Appliances',
    description: 'Add your appliances, watts, quantities and hours of use to calculate daily kWh, peak load, and monthly and yearly energy consumption.',
    intro: 'Every solar and battery design starts with one number: how many kWh you use per day. List your appliances with their wattage and daily hours, and the calculator totals your daily energy, peak load and monthly use.',
    formula: ['Daily Wh = Σ (Watts × Quantity × Hours per day)', 'Peak load = Σ (Watts × Quantity)'],
    how: [
      'Find watts on each appliance\'s label, or measure with a plug-in watt meter for the most accurate figure.',
      'Fridges and freezers cycle on and off, so 8–10 hours of compressor time per day is a realistic estimate.',
      'Peak load assumes everything runs at once. Use it to size your inverter, and daily kWh to size panels and batteries.'
    ],
    faqs: [
      { q: 'How do I calculate my daily energy use?', a: 'Multiply each appliance\'s watts by its daily hours of use, add them up, and divide by 1,000 for kWh. Your utility bill\'s monthly kWh ÷ 30 is a good cross-check.' },
      { q: 'How many kWh does an average home use per day?', a: 'About 29 kWh in the US, 8–10 kWh in the UK, and 2–5 kWh for a small efficient off-grid cabin.' },
      { q: 'What uses the most electricity at home?', a: 'Heating and cooling, water heaters, electric cooking and clothes dryers. In off-grid homes these are usually switched to gas, wood or solar thermal.' }
    ],
    related: ['solar-array-sizing', 'battery-bank-sizing', 'off-grid-system-sizing', 'solar-sizing']
  },
  'solar-array-sizing': {
    title: 'Solar Array Sizing Calculator: How Many Panels Do I Need?',
    description: 'Calculate the solar array size in kW and the number of panels needed to cover your daily energy use, from peak sun hours and system losses.',
    intro: 'Turn your daily energy use into a panel count. Enter your kWh per day and your location\'s peak sun hours, and the calculator returns the array size, number of panels, space needed and expected yearly output.',
    formula: ['Array W = Daily Wh ÷ (Peak sun hours × (1 − Losses))', 'Panels = ⌈Array W ÷ Panel W⌉'],
    how: [
      'For grid-tied systems use annual average sun hours. For off-grid systems use your worst month so you are covered in winter.',
      'Losses of 15–25% cover temperature, wiring, inverter and, for off-grid, battery charging losses.',
      'Allow about 2 m² (21 ft²) of roof or ground per 400W panel including gaps.'
    ],
    faqs: [
      { q: 'How many solar panels do I need for 5 kWh per day?', a: 'With 4.5 peak sun hours and 20% losses you need about 1.4 kW, or four 400W panels.' },
      { q: 'How many panels to power a house?', a: 'An average US home using 29 kWh per day needs roughly 7–9 kW, or 18–23 panels of 400W, depending on location.' },
      { q: 'Should I add extra panels?', a: 'For off-grid, 10–25% extra panels help recharge batteries faster after cloudy days. Panels are cheap compared with batteries.' }
    ],
    related: ['daily-energy-use', 'roof-solar-capacity', 'solar-panel-output', 'off-grid-system-sizing']
  },
  'off-grid-system-sizing': {
    title: 'Off-Grid Solar System Sizing Calculator (Complete System)',
    description: 'Size a complete off-grid solar system: panel array, battery bank, inverter and MPPT charge controller from your daily use, peak load and sun hours.',
    intro: 'Size every major component of an off-grid solar system in one go. Enter your daily energy use, peak load, worst-month sun hours and days of autonomy to get the panel array, battery bank, inverter and charge controller.',
    formula: ['Array W = Daily Wh ÷ (Worst-month sun hours × 0.75)', 'Battery kWh = Daily kWh × Days ÷ 0.8 ÷ 0.9', 'Inverter ≥ Peak load × 1.25', 'Controller A ≥ Array W ÷ Battery V × 1.25'],
    how: [
      'Off-grid systems lose about 25% between panels and appliances: wiring, charge controller, battery round trip and inverter.',
      'Battery sizing assumes LiFePO4 at 80% depth of discharge. For lead-acid, roughly double the battery.',
      'Controller size is the array\'s current at battery voltage with a 25% safety margin. Very large arrays can be split across two controllers.'
    ],
    faqs: [
      { q: 'What size off-grid system do I need for 6 kWh per day?', a: 'With 3.5 worst-month sun hours and 2 days of autonomy: about 2.4 kW of panels, a 17 kWh battery bank, a 4 kW inverter for a 3 kW peak load, and an 80A MPPT controller at 48V.' },
      { q: 'How much does an off-grid solar system cost?', a: 'A small cabin system starts around $3,000–5,000. A full-time home system typically costs $15,000–40,000, with batteries the largest share.' },
      { q: 'Do I need a generator with off-grid solar?', a: 'Most full-time off-grid homes keep a generator for long cloudy spells. It lets you use a smaller, cheaper battery bank.' }
    ],
    related: ['daily-energy-use', 'battery-bank-sizing', 'solar-array-sizing', 'charge-controller-sizing']
  },
  'hybrid-solar-system-sizing': {
    title: 'Hybrid Solar System Sizing Calculator (Solar + Battery + Grid)',
    description: 'Size a hybrid solar system with battery backup: array kW, battery kWh, hybrid inverter, remaining grid use and yearly bill savings.',
    intro: 'A hybrid system uses solar first, stores the surplus in a battery, and keeps the grid as backup. Enter your household use, how much you want solar to cover, and what must stay on during outages to size the array, battery and inverter.',
    formula: ['Array kW = Daily kWh × Solar share ÷ (Sun hours × 0.82)', 'Battery kWh = Critical W × Backup hours ÷ 1000 ÷ 0.81', 'Inverter ≥ max(Critical × 1.25, Array ÷ 1.3)'],
    how: [
      'Solar share is the percentage of your yearly use you want solar to supply. 60–80% is typical without oversizing.',
      'Battery size is driven by critical loads during an outage (fridge, lights, internet, medical devices), not by your whole house.',
      'Grid import covers whatever solar does not, so a hybrid system never runs out of power while the grid is up.'
    ],
    faqs: [
      { q: 'What size battery do I need for a hybrid system?', a: 'Enough to run critical loads through a typical outage. 1.5 kW of critical load for 12 hours needs about 22 kWh.' },
      { q: 'Is a hybrid system better than grid-tied?', a: 'It costs more, but keeps your essentials running during outages and lets you use more of your own solar where export rates are low.' },
      { q: 'How much solar does a 20 kWh/day home need?', a: 'To cover 70% with 4.5 sun hours, about 3.8 kW of panels.' }
    ],
    related: ['hybrid-inverter-sizing', 'battery-bank-sizing', 'solar-vs-grid-cost', 'daily-energy-use']
  }
}
