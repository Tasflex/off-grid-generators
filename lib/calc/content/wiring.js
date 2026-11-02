// lib/calc/content/wiring.js
export const wiringContent = {
  'solar-wire-size': {
    title: 'Solar Wire Size Calculator: AWG & mm² for DC Systems',
    description: 'Find the right solar cable size in AWG and mm² from current, cable length, system voltage and allowed voltage drop. Checks ampacity too.',
    intro: 'Undersized cables waste energy as heat and can be a fire risk, especially at the high currents of 12V and 24V systems. Enter your current, cable run and voltage to get the minimum wire gauge that meets both voltage drop and ampacity limits.',
    formula: ['Min area (mm²) = 2 × Length × Current × ρ ÷ (Voltage × Max drop)', 'ρ = 0.0172 Ω·mm²/m (copper), 0.0282 (aluminum)'],
    how: [
      'Length is the one-way distance; the formula doubles it because current flows out and back.',
      'The chosen wire must also carry 125% of the current continuously, using 75°C copper ampacity from NEC Table 310.16.',
      'Aim for 3% drop or less on most DC circuits, and 1–2% on battery-to-inverter cables.'
    ],
    faqs: [
      { q: 'What size wire do I need for 30 amps at 12V over 5 meters?', a: 'For 3% voltage drop you need at least 14.3 mm², so 4 AWG copper (or 16 mm² metric).' },
      { q: 'Why do low-voltage systems need thick cables?', a: 'For the same power, 12V carries four times the current of 48V. Voltage drop and heat rise with current, so low-voltage cables must be much thicker.' },
      { q: 'What wire is best for solar panels?', a: 'Use UV-resistant, sunlight-rated PV wire or USE-2 for exposed array wiring, typically 10 or 12 AWG for panel strings.' }
    ],
    related: ['voltage-drop', 'cable-length-power-loss', 'solar-breaker-size', 'inverter-battery-matching']
  },
  'voltage-drop': {
    title: 'Voltage Drop Calculator for Solar (AC & DC)',
    description: 'Calculate voltage drop in volts and percent for DC, single-phase and three-phase circuits from wire gauge, length, current and voltage.',
    intro: 'Long cable runs lose voltage, which means lost power and appliances that may not work properly. Enter your circuit to see how many volts and what percentage you lose, and whether the wire gauge is adequate.',
    formula: ['DC / 1-phase: Vdrop = 2 × L × I × ρ ÷ A', '3-phase: Vdrop = √3 × L × I × ρ ÷ A', 'Drop % = Vdrop ÷ Source V × 100'],
    how: [
      'The NEC recommends no more than 3% drop on branch circuits and 5% total from source to load.',
      'Voltage drop doubles if you double either the cable length or the current, and halves if you double the wire cross-section.',
      'Lost voltage becomes heat in the cable: power lost = voltage drop × current.'
    ],
    faqs: [
      { q: 'What is an acceptable voltage drop for solar?', a: 'Keep DC array and battery circuits under 3%, and ideally under 2% between batteries and inverter, where currents are highest.' },
      { q: 'How do I reduce voltage drop?', a: 'Use thicker wire, shorten the run, or raise the system voltage. Going from 12V to 24V cuts the percentage drop by four times for the same power.' },
      { q: 'Does voltage drop matter for AC circuits?', a: 'Yes, though at 120V or 230V the same power means far less current, so drop is usually much smaller than on low-voltage DC.' }
    ],
    related: ['solar-wire-size', 'cable-length-power-loss', 'battery-series-parallel']
  },
  'cable-length-power-loss': {
    title: 'Cable Length vs Efficiency Loss Calculator',
    description: 'Calculate how much power and energy is lost as heat in a cable run, as a percentage of the power carried and in kWh per year.',
    intro: 'Every meter of cable costs a little energy. This calculator shows the power lost as heat in your cable, the efficiency loss as a percentage, and how much energy that adds up to over a year, plus how much a higher voltage would save.',
    formula: ['Current I = Power ÷ Voltage', 'Loss W = I² × R, where R = 2 × L × ρ ÷ A', 'Loss % = Loss W ÷ Power'],
    how: [
      'Cable loss grows with the square of current, so halving the current cuts loss to a quarter.',
      'That is why doubling system voltage for the same power reduces cable loss by 75%.',
      'Losses above 2–3% are usually worth fixing with thicker cable or a shorter run.'
    ],
    faqs: [
      { q: 'How much power is lost in a long DC cable?', a: 'Carrying 2,000W at 24V over 10 m of 6 AWG copper loses about 180W, or 9%. At 48V the loss drops to about 2.2%.' },
      { q: 'Is it better to put the inverter near the batteries?', a: 'Yes. Keep the high-current DC run between batteries and inverter as short as possible, and run the lower-current AC output the longer distance.' },
      { q: 'Does cable loss affect solar panel wiring?', a: 'Less so, because panel strings run at high voltage and low current. Loss matters most on low-voltage battery cables.' }
    ],
    related: ['voltage-drop', 'solar-wire-size', 'inverter-efficiency-loss']
  },
  'solar-breaker-size': {
    title: 'Solar Breaker Size Calculator (PV, DC & AC)',
    description: 'Calculate the right breaker size for solar PV strings, battery and inverter DC circuits, and inverter AC output using NEC 125% rules.',
    intro: 'Breakers protect your wiring from overcurrent. Choose the circuit type and enter its current to get the minimum breaker rating, rounded up to a standard size, along with the smallest copper wire that rating can protect.',
    formula: ['PV circuit: Breaker ≥ Isc × Strings × 1.25 × 1.25 (= 1.56)', 'DC / AC circuits: Breaker ≥ Continuous current × 1.25'],
    how: [
      'NEC 690.8 treats PV current as continuous and allows for sunlight above standard test conditions, giving the 1.56 factor.',
      'Breakers are rounded up to the next standard rating from NEC 240.6.',
      'Use DC-rated breakers on DC circuits. AC breakers cannot reliably interrupt DC arcs.'
    ],
    faqs: [
      { q: 'What size breaker do I need between solar panels and charge controller?', a: 'For two parallel strings with 13.8A Isc, the minimum is 43A, so a 45A DC breaker, with wire rated at least 45A (8 AWG copper).' },
      { q: 'Why multiply by 1.25 twice for solar?', a: 'Once because panels can exceed their rated current in bright sun, and once because the circuit carries current continuously for 3+ hours.' },
      { q: 'Can a breaker be bigger than the wire rating?', a: 'No. The breaker protects the wire, so the wire\'s ampacity must be at least the breaker rating.' }
    ],
    related: ['solar-fuse-size', 'solar-wire-size', 'grounding-rod', 'charge-controller-sizing']
  },
  'solar-fuse-size': {
    title: 'Solar Fuse Size Calculator (String Fusing)',
    description: 'Calculate solar string fuse size from panel Isc and number of parallel strings, and check it against the module\'s max series fuse rating.',
    intro: 'When three or more solar strings are wired in parallel, a fault in one string can draw current from all the others. String fuses prevent that. Enter your panel Isc and string count to get the correct fuse size.',
    formula: ['Minimum fuse = Isc × 1.56', 'Fuse ≤ Module maximum series fuse rating', 'Fuses required when parallel strings ≥ 3'],
    how: [
      'With one or two strings, the reverse current from the other string cannot exceed what a panel is rated to withstand, so fuses are usually not required.',
      'With three or more strings, each string needs a fuse sized between 1.56 × Isc and the module\'s maximum series fuse rating.',
      'Use gPV-rated fuses designed for DC solar circuits, in a combiner box.'
    ],
    faqs: [
      { q: 'Do I need fuses for my solar panels?', a: 'Only when three or more strings are connected in parallel. With one or two strings, fusing is generally not required by NEC 690.9.' },
      { q: 'What fuse size for a 13.8A Isc panel?', a: 'At least 21.5A, so a 25A fuse, provided the panel\'s maximum series fuse rating is 25A or higher.' },
      { q: 'What is the maximum series fuse rating?', a: 'The largest fuse the panel manufacturer allows in series with the module, printed on the datasheet. It protects the panel from reverse current.' }
    ],
    related: ['solar-breaker-size', 'pv-string-voltage', 'solar-wire-size']
  },
  'grounding-rod': {
    title: 'Grounding Rod Calculator: Resistance & Number of Rods',
    description: 'Estimate ground rod resistance from soil type, rod length and diameter, and how many rods you need to reach 25 ohms per NEC 250.53.',
    intro: 'A solar system\'s grounding electrode needs low resistance to earth. Soil type matters far more than the rod itself. Choose your soil and rod to estimate resistance and how many rods it takes to meet the NEC 25-ohm benchmark.',
    formula: ['Dwight: R = ρ ÷ (2πL) × (ln(4L ÷ a) − 1)', 'ρ = soil resistivity (Ω·m), L = rod length (m), a = rod radius (m)'],
    how: [
      'Soil resistivity ranges from about 10 Ω·m in wet organic soil to over 1,000 Ω·m in dry sand or rock.',
      'NEC 250.53 requires a single rod to measure 25 Ω or less; otherwise, add a supplemental rod at least 6 ft away. Most installers simply drive two rods.',
      'Rods spaced at least twice their length apart interact least. Spacing closer than that reduces the benefit of the second rod.'
    ],
    faqs: [
      { q: 'How many ground rods do I need for solar?', a: 'Typically two, spaced at least 6 ft apart, unless a single rod is tested at 25 Ω or less. In poor soil you may need more, or a ground ring.' },
      { q: 'Does a thicker ground rod lower resistance?', a: 'Only slightly. Going from 5/8" to 3/4" changes resistance by just a few percent. A longer rod helps much more.' },
      { q: 'What is the resistance of an 8 ft ground rod?', a: 'In loamy soil of about 100 Ω·m, roughly 40 Ω, which is why a second rod is usually needed.' }
    ],
    related: ['solar-breaker-size', 'solar-fuse-size', '/guides/how-to-wire-solar-system']
  }
}
