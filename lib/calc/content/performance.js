// lib/calc/content/performance.js
export const performanceContent = {
  'panel-degradation': {
    title: 'Solar Panel Degradation Calculator',
    description: 'See how much power your solar panels lose each year and what they will produce 10, 20 and 25 years from now.',
    intro: 'Solar panels slowly lose output every year. Enter your panel or array rating and its degradation rate to see how much power remains after any number of years, with a year-by-year chart.',
    formula: ['Output after N years = Initial W × (1 − Rate)^N'],
    how: [
      'Premium panels degrade about 0.25% per year, typical tier-1 panels about 0.5%, and budget panels 0.7–1%.',
      'Most panels lose 1–3% in the first year (light-induced degradation) before settling into the steady rate.',
      'Performance warranties usually guarantee 80–90% of rated output after 25 years.'
    ],
    faqs: [
      { q: 'How much do solar panels degrade per year?', a: 'About 0.5% per year for most modern panels. A 400W panel at that rate still produces around 380W after 10 years.' },
      { q: 'How long do solar panels last?', a: 'Typically 25–30 years of useful life, and many keep working well beyond that at reduced output.' },
      { q: 'What causes solar panel degradation?', a: 'UV exposure, heat cycling, moisture, micro-cracks and potential-induced degradation. Hot climates generally degrade panels faster.' }
    ],
    related: ['temperature-coefficient-loss', 'battery-capacity-fade', 'solar-panel-output', 'monocrystalline-vs-polycrystalline']
  },
  'temperature-coefficient-loss': {
    title: 'Solar Panel Temperature Loss Calculator',
    description: 'Solar panels lose output as they heat up. Calculate your temperature coefficient loss and what a better panel would gain.',
    intro: 'Panels are rated at 25°C, but on a sunny day their cells often run at 45–65°C. Enter your panel\'s temperature coefficient and cell temperature to see how much power heat is costing you, and what a lower-coefficient panel would recover.',
    formula: ['Loss % = Temperature coefficient × (Cell temp − 25°C)', 'Actual W = Rated W × (1 + Loss %)'],
    how: [
      'The Pmax temperature coefficient is on every panel datasheet, typically −0.29 to −0.40 %/°C.',
      'Cell temperature is usually 20–35°C above air temperature in full sun, more on flush roof mounts with little airflow.',
      'Cold weather works the other way: panels produce slightly more than their rating below 25°C.'
    ],
    faqs: [
      { q: 'How much power do solar panels lose in heat?', a: 'With a −0.35 %/°C coefficient, a panel at 45°C loses 7% of its output, so a 400W panel delivers about 372W.' },
      { q: 'What is a good temperature coefficient?', a: 'Anything better than −0.35 %/°C is good. Premium panels reach −0.26 to −0.30, which matters most in hot climates.' },
      { q: 'How can I keep solar panels cooler?', a: 'Leave a gap of at least 10–15 cm under roof-mounted panels for airflow, or use ground mounts, which run noticeably cooler.' }
    ],
    related: ['monocrystalline-vs-polycrystalline', 'panel-degradation', 'pv-string-voltage', 'ground-mount-vs-roof-solar']
  },
  'shading-impact': {
    title: 'Solar Panel Shading Impact Calculator',
    description: 'See how much power partial shading costs you, and how series vs parallel wiring changes the loss.',
    intro: 'A small shadow can cost far more than its size suggests, depending on how panels are wired. Enter how much of your array is shaded, what kind of shade it is and your wiring to estimate the real power and energy lost.',
    formula: ['Loss % = Shaded % × Shade factor × Wiring factor (max 95%)', 'Shade factor: soft 0.6, hard 1.0, intermittent 0.4', 'Wiring factor: series 1.5, parallel 1.0, optimizers 0.3'],
    how: [
      'In a series string, a shaded panel limits current for the whole string, so losses can exceed the shaded area.',
      'Parallel wiring isolates each panel, so losses stay roughly proportional to the shade.',
      'Optimizers and microinverters let each panel work independently and recover most shading losses.'
    ],
    faqs: [
      { q: 'How much does shading reduce solar output?', a: 'It varies widely with wiring. 15% soft shade on a series string costs about 13.5% of output; with optimizers the same shade costs under 3%.' },
      { q: 'Is it worth adding optimizers for shading?', a: 'Usually yes if part of your array is shaded for several hours a day by a chimney, tree or neighbouring building.' },
      { q: 'Do bypass diodes prevent shading losses?', a: 'They limit the damage by letting current skip a shaded section of the panel, but that section\'s power is still lost.' }
    ],
    related: ['panel-hotspot-risk', 'solar-panel-row-spacing', 'solar-panel-azimuth-loss', 'dust-soiling-loss']
  },
  'dust-soiling-loss': {
    title: 'Solar Panel Dust & Soiling Loss Calculator',
    description: 'Estimate the energy lost to dust, pollen and dirt on your solar panels and find a cleaning schedule that pays off.',
    intro: 'Dirt, dust, pollen and bird droppings block sunlight. Choose your surroundings, rainfall, tilt and cleaning routine to estimate how much energy soiling costs each year and whether cleaning more often would pay off.',
    formula: ['Soiling % = Base rate × Rain factor × Cleaning factor × Tilt factor (max 25%)', 'Tilt factor = 1 − min(0.6, Tilt ÷ 45 × 0.6)'],
    how: [
      'Base soiling ranges from about 3% in suburbs to 10% in deserts.',
      'Rain washes panels naturally, and steeper panels shed dust better than flat ones.',
      'Cleaning pays off most in dry, dusty places and on low-tilt arrays.'
    ],
    faqs: [
      { q: 'How much power do dirty solar panels lose?', a: 'Typically 2–7% a year in most climates, and 15–25% in deserts or near farms and construction without regular cleaning.' },
      { q: 'How often should I clean solar panels?', a: 'Once or twice a year is enough for most homes. In dry, dusty areas, monthly cleaning can be worthwhile.' },
      { q: 'What is the best way to clean solar panels?', a: 'Rinse with water and use a soft brush in the early morning or evening. Avoid pressure washers and abrasive cleaners.' }
    ],
    related: ['shading-impact', 'cloud-cover-solar-loss', 'temperature-coefficient-loss', 'solar-panel-tilt-angle']
  },
  'panel-hotspot-risk': {
    title: 'Solar Panel Hotspot Risk Calculator',
    description: 'Assess the risk of hotspots forming in your solar array, which reduce output and in the worst cases cause fires.',
    intro: 'Hotspots are cells that overheat when they cannot pass current, usually because of shading, damage or failed bypass diodes. Answer five questions about your panels to get a risk score and what to do about it.',
    formula: ['Risk score = Age points + Diode points + Damage points + Shading points + Cell type points', 'Risk % = Score ÷ 115'],
    how: [
      'Failed bypass diodes and visible cracks or delamination are the strongest warning signs.',
      'Persistent partial shading forces shaded cells to dissipate power from the rest of the string as heat.',
      'A thermal camera inspection is the most reliable way to find hotspots before they cause damage.'
    ],
    faqs: [
      { q: 'What causes hotspots on solar panels?', a: 'Shading, dirt, cracked cells, poor solder joints and failed bypass diodes. They cause a cell to resist current and heat up.' },
      { q: 'Are solar panel hotspots dangerous?', a: 'They can be. Severe hotspots can reach over 100°C, burn through the backsheet and, rarely, start a fire.' },
      { q: 'How do I check for hotspots?', a: 'Look for brown or burnt marks and bubbles, and use an infrared camera during strong sun to spot cells far hotter than their neighbours.' }
    ],
    related: ['shading-impact', 'panel-degradation', 'dust-soiling-loss', 'solar-fuse-size']
  },
  'battery-dod-degradation': {
    title: 'Battery Depth of Discharge (DoD) Lifespan Calculator',
    description: 'See how depth of discharge affects battery cycle life and your cost per kWh over the life of the battery.',
    intro: 'The deeper you discharge a battery each cycle, the fewer cycles it lasts. Enter your chemistry, rated cycle life and typical depth of discharge to see how many cycles and years you will get and the real cost per kWh.',
    formula: ['Stress factor = (DoD ÷ 50%)^k', 'Effective cycles = Rated cycles ÷ Stress factor', 'k ≈ 1.15 LiFePO4, 1.3 NMC, 1.7 AGM, 1.8 flooded'],
    how: [
      'Cycle ratings are referenced to 50% depth of discharge here; deeper cycles shorten life and shallower cycles extend it.',
      'Lead-acid is far more sensitive to deep discharge than LiFePO4, which is why it is usually kept above 50%.',
      'The cost per kWh shows whether using more capacity per cycle is worth the shorter life.'
    ],
    faqs: [
      { q: 'Does depth of discharge affect battery life?', a: 'Yes. A LiFePO4 battery rated 4,000 cycles at 50% DoD lasts about 2,300 cycles at 80% DoD.' },
      { q: 'What is the best depth of discharge for LiFePO4?', a: '80–90% is a good balance. LiFePO4 handles deep cycling well, so using more capacity usually costs little life.' },
      { q: 'Why should lead-acid batteries not go below 50%?', a: 'Deep discharges cause sulfation that permanently reduces capacity, roughly halving cycle life compared with 50% DoD.' }
    ],
    related: ['battery-lifetime-cost', 'battery-capacity-fade', 'lead-acid-vs-lithium-runtime', 'battery-bank-sizing']
  },
  'battery-lifetime-cost': {
    title: 'Battery Lifetime Cost per kWh Calculator',
    description: "Calculate the true cost per kWh delivered over a battery's lifespan and compare it with grid electricity.",
    intro: 'A battery\'s sticker price says little about its value. This calculator spreads the purchase cost over every kWh the battery will deliver in its life, so you can compare batteries and see whether storing energy beats buying it from the grid.',
    formula: ['Usable per cycle = Capacity × DoD × Round-trip efficiency', 'Lifetime kWh = Usable per cycle × Cycle life', 'Cost per kWh = Purchase cost ÷ Lifetime kWh'],
    how: [
      'Long cycle life matters more than low price: a LiFePO4 battery often costs less per kWh than cheaper lead-acid.',
      'Round-trip efficiency reduces the energy you get back from each cycle.',
      'This counts battery cost only. Solar or grid energy used to charge it is separate.'
    ],
    faqs: [
      { q: 'What does battery storage cost per kWh?', a: 'Lifetime cost is typically $0.10–0.35 per kWh for LiFePO4 and $0.50–1.00 for lead-acid, depending on price and cycle life.' },
      { q: 'Is a home battery cheaper than grid electricity?', a: 'Usually not on cost alone in areas with cheap grid power, but it can be with time-of-use rates, low export payments, or frequent outages.' },
      { q: 'How do I compare two batteries?', a: 'Enter both and compare cost per kWh delivered rather than purchase price.' }
    ],
    related: ['battery-dod-degradation', 'lead-acid-vs-lithium-runtime', 'battery-efficiency-loss', 'solar-vs-grid-cost']
  },
  'inverter-replacement': {
    title: 'Inverter Lifespan & Replacement Calculator',
    description: 'Estimate how long your inverter will last and its total cost of ownership over a 25-year solar system life.',
    intro: 'Panels last 25+ years but inverters usually do not. Choose your inverter type, how hard it works and where it is installed to estimate its lifespan, how many replacements a solar system needs over 25 years, and what that costs.',
    formula: ['Expected life = Base life ÷ Environment factor ÷ Load factor', 'Base life: string 12, hybrid 10, micro 20, optimizer 22 years'],
    how: [
      'Heat is the main enemy of inverter electronics, so installations in direct sun wear out fastest.',
      'Running constantly above rated load shortens life sharply; very light loads also age capacitors slightly faster.',
      'Microinverters and optimizers last longer but there are many of them, so total replacement cost can still be high.'
    ],
    faqs: [
      { q: 'How long do solar inverters last?', a: 'String inverters typically last 10–15 years, hybrid inverters 8–12 years, and microinverters 20–25 years.' },
      { q: 'How many times will I replace my inverter?', a: 'Usually once over a 25-year system life for a string inverter, and possibly twice for a hybrid inverter in a hot location.' },
      { q: 'How can I make my inverter last longer?', a: 'Install it in a shaded, ventilated or indoor location, keep it within its rated load, and keep its vents clear of dust.' }
    ],
    related: ['inverter-efficiency-loss', 'inverter-oversizing', 'battery-lifetime-cost', 'solar-vs-grid-cost']
  }
}
