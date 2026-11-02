// lib/calc/content/planning.js
export const planningContent = {
  'solar-sizing': {
    title: 'Solar Generator Sizing Calculator',
    description: 'Select your appliances or a preset scenario to find the solar generator and battery capacity you actually need.',
    intro: 'Pick the appliances you want to run, or load a preset like van life or home emergency, and the calculator works out the battery capacity your solar generator needs, how much solar it takes to recharge, and which power stations fit.',
    formula: ['Daily Wh = Σ (Watts × Quantity × Hours per day)', 'Battery capacity = Daily Wh ÷ (0.85 depth of discharge × 0.90 inverter efficiency)'],
    how: [
      'Fridges and freezers are counted at their rated watts for every hour you enter, which gives a safe upper estimate.',
      'Only about 85% of a power station\'s rated capacity is usable, and around 10% is lost converting battery power to AC.',
      'Add a 20% margin for battery ageing and for days when you use more than planned.'
    ],
    faqs: [
      { q: 'What size solar generator do I need?', a: 'Add up the watt-hours of everything you will run in a day and divide by about 0.77. Running a fridge, lights, Wi-Fi and phones for a day typically needs 2,000–4,000 Wh.' },
      { q: 'Can a solar generator run a refrigerator?', a: 'Yes. A full-size fridge needs a power station with at least 1,000W output for the startup surge and roughly 1,500–3,600 Wh for a full day.' },
      { q: 'How many solar panels does a solar generator need?', a: 'Enough to replace the day\'s energy in your sun hours. With 5 sun hours, each 1,000 Wh used needs about 250W of panels.' }
    ],
    related: ['daily-energy-use', 'battery-runtime', 'charge-time', 'off-grid-system-sizing']
  },
  'off-grid-budget': {
    title: 'Off-Grid Solar Budget Calculator',
    description: 'Estimate the total cost of an off-grid solar system based on your daily energy needs.',
    intro: 'Get a ballpark budget for an off-grid solar setup. Enter your daily energy use, how many days of backup you want and what the system is for, and the calculator breaks the cost into batteries, panels, inverter and installation.',
    formula: ['Storage (Wh) = Daily Wh × Backup days', 'Cost ≈ Storage × $0.50 (battery) + Storage × $0.30 (solar) + Inverter + Installation'],
    how: [
      'Battery storage is the biggest cost driver, which is why days of backup matter so much.',
      'Home systems include professional installation at about 10% of storage cost; camping and van builds assume DIY.',
      'Prices are typical 2026 retail estimates. Get quotes before buying, as local prices vary widely.'
    ],
    faqs: [
      { q: 'How much does an off-grid solar system cost?', a: 'A van or camping setup typically costs $1,000–5,000. A home system with several days of backup ranges from about $10,000 to $40,000.' },
      { q: 'What is the most expensive part of off-grid solar?', a: 'Batteries, usually 50–60% of the total. Reducing days of autonomy or adding a backup generator is the quickest way to cut cost.' },
      { q: 'Is off-grid solar cheaper than the grid?', a: 'Rarely where the grid is already connected, but it is often far cheaper than paying to extend power lines to a remote property.' }
    ],
    related: ['off-grid-system-sizing', 'solar-vs-grid-cost', 'battery-bank-sizing', 'battery-lifetime-cost']
  },
  'battery-runtime': {
    title: 'Battery Runtime Calculator',
    description: 'Calculate how long any battery or power station will run your devices before it needs a recharge.',
    intro: 'How long will your battery or power station run a device? Enter its capacity in watt-hours and the device\'s power draw, or tap a popular battery and device, to see the runtime in hours, minutes and nights.',
    formula: ['Runtime (h) = Capacity Wh × 0.85 ÷ Device watts'],
    how: [
      'About 85% of a battery\'s rated capacity is usable once inverter and conversion losses are counted.',
      'Devices that cycle on and off, like fridges, run longer than this estimate because they are not drawing power all the time.',
      'To convert amp-hours to watt-hours, multiply by battery voltage: 100Ah × 12V = 1,200 Wh.'
    ],
    faqs: [
      { q: 'How long will a 2,000Wh battery run a 100W device?', a: 'About 17 hours, since roughly 1,700 Wh of the 2,000 Wh is usable.' },
      { q: 'How long will a power station run a CPAP?', a: 'A 60W CPAP without humidifier runs about 14 hours on a 1,000 Wh power station, or nearly two nights.' },
      { q: 'Why does my battery run out sooner than calculated?', a: 'Cold temperatures, older batteries, inverter idle draw and devices that pull more than their label all shorten runtime.' }
    ],
    related: ['battery-capacity-for-runtime', 'charge-time', 'solar-sizing', 'lead-acid-vs-lithium-runtime']
  },
  'charge-time': {
    title: 'Solar Generator Charge Time Calculator',
    description: 'Calculate how long it takes to charge a solar generator from solar panels, a wall outlet or your car.',
    intro: 'See how long your solar generator takes to recharge from solar panels, a wall outlet or a car socket. Enter the battery capacity and charging input to get the full charge time and charge gained per hour.',
    formula: ['Charge time (h) = Battery Wh ÷ (Input W × 0.85)'],
    how: [
      'Around 15% of input power is lost to charging electronics and heat.',
      'Solar panels rarely deliver their full rating, so a 200W panel typically supplies 120–160W in good sun. Plan around peak sun hours, not daylight hours.',
      'Car sockets are limited to about 100–120W, so they are best for topping up while driving.'
    ],
    faqs: [
      { q: 'How long does it take to charge a 2,000Wh solar generator with 200W of solar?', a: 'About 12 hours of good sun, which is two to three days with 5 peak sun hours per day.' },
      { q: 'Can I charge a solar generator from solar and AC at the same time?', a: 'Many newer power stations support dual charging, which can cut charge time roughly in half. Check your model\'s maximum combined input.' },
      { q: 'How many solar panels do I need to charge a power station in one day?', a: 'Divide capacity by your sun hours and by 0.85. A 1,000 Wh unit with 5 sun hours needs about 240W of panels.' }
    ],
    related: ['battery-charging-current', 'battery-runtime', 'solar-panel-output', 'solar-sizing']
  },
  'charge-controller-sizing': {
    title: 'Charge Controller Sizing Calculator',
    description: 'Find the right MPPT or PWM charge controller size for your solar array and battery bank voltage.',
    intro: 'Find the charge controller rating your solar array needs. Enter the array watts, battery voltage, battery type and controller type to get the recommended amp rating with a safety margin, plus matching controllers.',
    formula: ['Array current = Solar W ÷ Battery V', 'Controller A = Array current ÷ Efficiency × 1.25, rounded up to a standard size'],
    how: [
      'MPPT controllers convert excess panel voltage into extra current and are about 95% efficient; PWM controllers are around 85%.',
      'The 25% margin covers bright, cold days when panels can exceed their rating.',
      'Higher battery voltage means lower current, so a 24V or 48V bank can use a much smaller controller for the same array.'
    ],
    faqs: [
      { q: 'What size charge controller do I need for 400W of solar?', a: 'On a 12V battery, a 50A MPPT controller after the 25% safety margin. On 24V, a 25A controller is enough.' },
      { q: 'MPPT or PWM: which should I choose?', a: 'MPPT for anything over about 200W, or when panel voltage is well above battery voltage. It harvests 15–30% more energy. PWM suits small, budget 12V setups.' },
      { q: 'Can I use a bigger charge controller than I need?', a: 'Yes. A larger controller is safe and leaves room to add panels later; it only costs more.' }
    ],
    related: ['battery-charging-current', 'solar-breaker-size', 'pv-string-voltage', 'off-grid-system-sizing']
  },
  'solar-panel-layout': {
    title: 'Solar Panel Layout Calculator',
    description: 'Calculate how many solar panels you need and plan how they fit on your roof or mounting area.',
    intro: 'Work out how many panels cover your daily energy use and whether they fit in the space you have. Choose a panel size and your sun hours to get the panel count, roof area needed, suggested wiring and battery storage.',
    formula: ['System kW = Daily Wh ÷ (Sun hours × 0.8) ÷ 1000', 'Panels = ⌈System W ÷ Panel W⌉'],
    how: [
      'The 0.8 factor allows for heat, wiring, dust and inverter losses.',
      'Footprints are typical: about 1.9 m² for a 400W panel and 2.5 m² for a 550W panel.',
      'Suggested series/parallel wiring keeps string voltage practical for common charge controllers.'
    ],
    faqs: [
      { q: 'How many solar panels do I need for 2 kWh per day?', a: 'With 5 sun hours, about 500W of panels, which is two 400W panels taking roughly 3.8 m² of roof.' },
      { q: 'Should I use fewer large panels or more small ones?', a: 'Large panels need fewer mounts and connections. Small panels fit awkward roof shapes, vans and RVs better.' },
      { q: 'How should I arrange panels on my roof?', a: 'Keep each string on the same roof face and orientation, avoid shaded areas, and leave fire-code setbacks at ridges and edges.' }
    ],
    related: ['roof-solar-capacity', 'solar-array-sizing', 'solar-panel-tilt-angle', 'solar-panel-row-spacing']
  },
  'inverter-sizing': {
    title: 'Inverter Sizing Calculator',
    description: 'Find the right inverter size for your appliances, accounting for both running watts and surge watts.',
    intro: 'List the devices you want to run at the same time, or load a preset, and the calculator totals running and startup surge watts to give you the inverter size to buy, with matching pure sine wave inverters.',
    formula: ['Inverter W = Σ Running watts × 1.2', 'Surge rating = Σ Surge watts × 1.2'],
    how: [
      'Motors and compressors (fridges, pumps, AC units) briefly draw 2–3× their running watts when they start.',
      'This total assumes everything starts together, which is the safe worst case. Staggering motor loads lets you use a smaller inverter.',
      'A 20% margin keeps the inverter out of its overload zone and running cooler.'
    ],
    faqs: [
      { q: 'What size inverter do I need to run a fridge?', a: 'A typical fridge runs at about 150W but needs around 600W to start. A 1,000W pure sine inverter handles it comfortably.' },
      { q: 'What is the difference between running and surge watts?', a: 'Running watts are what a device draws continuously. Surge watts are the brief spike when a motor starts, which the inverter must also supply.' },
      { q: 'What size inverter for a whole house?', a: 'Usually 5,000–12,000W for essentials and major appliances, which normally means a 48V hybrid inverter rather than a portable unit.' }
    ],
    related: ['inverter-oversizing', 'pure-sine-vs-modified-sine', 'inverter-battery-matching', 'hybrid-inverter-sizing']
  }
}
