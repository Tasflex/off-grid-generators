// lib/calc/content/solar.js
export const solarContent = {
  'solar-panel-output': {
    title: 'Solar Panel Output Calculator: kWh per Day, Month & Year',
    description: 'Calculate how many kWh your solar panels produce per day, month and year from panel wattage, peak sun hours and real-world system losses.',
    intro: 'A 400W panel almost never delivers 400W. Its real output depends on how many peak sun hours your location gets and how much is lost to heat, wiring, dust and inverter conversion. Enter your panel rating and sun hours to see realistic daily, monthly and yearly energy.',
    formula: ['Daily kWh = Panel W × Panels × Peak sun hours × (1 − Losses) ÷ 1000'],
    how: [
      'Peak sun hours convert a whole day of changing sunlight into the equivalent hours of full 1,000 W/m² sun. Most of the US gets 4–6.',
      'System losses of 10–20% cover temperature, wiring, mismatch, soiling and inverter efficiency. 14% is the NREL PVWatts default.',
      'Multiply daily output by 30.4 for a monthly average and by 365 for the year.'
    ],
    faqs: [
      { q: 'How many kWh does a 400W solar panel produce per day?', a: 'With 5 peak sun hours and 14% losses, a 400W panel produces about 1.7 kWh per day, roughly 50 kWh per month and 630 kWh per year.' },
      { q: 'Why is my panel producing less than its rated watts?', a: 'Panel ratings are measured at 25°C cell temperature and 1,000 W/m² of sunlight. Real panels run hotter, see less intense light most of the day, and lose energy in wiring and the inverter.' },
      { q: 'What are peak sun hours?', a: 'Peak sun hours are the number of hours per day that sunlight would need to shine at 1,000 W/m² to deliver the same total energy. They are not the same as daylight hours.' }
    ],
    related: ['solar-production-by-location', 'solar-array-sizing', 'solar-irradiance-by-city', 'temperature-coefficient-loss']
  },
  'solar-production-by-location': {
    title: 'Solar Production by Location Calculator (37 Cities)',
    description: 'Estimate annual solar production for your city. Pick from 37 cities worldwide, enter system size, and get yearly, monthly and daily kWh plus specific yield.',
    intro: 'The same solar system can produce twice as much energy in Phoenix as in London. This calculator uses long-term average sun hours for 37 cities to estimate what a system of your size will generate where you live.',
    formula: ['Annual kWh = System kW × Peak sun hours × 365 × (1 − Losses)', 'Specific yield = Annual kWh ÷ System kW'],
    how: [
      'Sun hours are annual averages for a fixed panel tilted near the local latitude, rounded from NREL and PVGIS long-term data.',
      'Specific yield (kWh per kWp) lets you compare locations independent of system size. 1,200+ is very good; under 900 is low.',
      'For a precise address-level estimate, confirm with NREL PVWatts (US) or PVGIS (worldwide).'
    ],
    faqs: [
      { q: 'How much does a 6kW solar system produce per year?', a: 'It depends heavily on location: about 12,000 kWh in Phoenix, 8,600 kWh in New York and around 5,500 kWh in London, assuming 14% system losses.' },
      { q: 'What is a good specific yield for solar?', a: 'In sunny regions 1,500–2,000 kWh/kWp per year is typical. Mid-latitude regions see 1,100–1,400, and cloudy northern Europe 850–1,000.' },
      { q: 'Does latitude or climate matter more?', a: 'Both. Latitude sets the maximum available sunlight, but cloud cover decides how much of it reaches the panels. Nairobi near the equator and Denver at 40°N get similar sun hours for different reasons.' }
    ],
    related: ['solar-irradiance-by-city', 'solar-panel-output', 'solar-irradiance-by-latitude', 'solar-vs-grid-cost']
  },
  'solar-panel-tilt-angle': {
    title: 'Solar Panel Tilt Angle Calculator by Latitude',
    description: 'Find the best solar panel tilt angle for your latitude: the optimal fixed year-round angle plus summer, spring/autumn and winter angles.',
    intro: 'Tilting panels toward the sun at the right angle can add 5–15% more energy than a poor angle. Enter your latitude to get the best fixed angle for the whole year and the ideal angles if you adjust seasonally.',
    formula: ['Year-round tilt ≈ 0.76 × Latitude + 3.1° (for 25–50°)', 'Summer ≈ 0.9 × Latitude − 23.5°', 'Winter ≈ 0.9 × Latitude + 29°'],
    how: [
      'Below 25° latitude the best year-round tilt is about 0.87 × latitude. Above 50° it is roughly equal to latitude.',
      'Steeper winter angles catch the low winter sun; flatter summer angles catch the high summer sun.',
      'Panels should face true south in the northern hemisphere and true north in the southern hemisphere, not magnetic south or north.'
    ],
    faqs: [
      { q: 'What is the best angle for solar panels?', a: 'For a fixed mount, roughly 0.76 × your latitude + 3°, which works out to about 30° at 35°N. Within ±10° of the optimum you lose only 1–3% of annual energy.' },
      { q: 'Should solar panels be tilted at latitude angle?', a: 'Latitude tilt is a reasonable rule of thumb, but slightly flatter angles usually produce more over a year because summer days are longer and sunnier.' },
      { q: 'What tilt works for flat roofs?', a: 'A minimum of about 10° is recommended so rain can clean the panels. Low tilts also reduce wind load and row spacing on flat roofs.' }
    ],
    related: ['seasonal-tilt-adjustment', 'solar-panel-azimuth-loss', 'solar-panel-row-spacing', 'solar-irradiance-by-latitude']
  },
  'seasonal-tilt-adjustment': {
    title: 'Seasonal Tilt Adjustment Calculator: Is It Worth It?',
    description: 'Calculate how much extra energy you gain by adjusting solar panel tilt twice a year, four times a year or monthly versus a fixed tilt.',
    intro: 'Adjustable racks let you steepen panels in winter and flatten them in summer. This calculator estimates the extra kWh you would gain so you can decide whether the effort pays off.',
    formula: ['Extra kWh = Fixed-tilt yearly kWh × Seasonal gain', 'Seasonal gain ≈ 4% (2×/yr), 5% (4×/yr), 6% (monthly), scaled by latitude'],
    how: [
      'Most of the benefit comes from the first adjustment: switching twice a year captures roughly two-thirds of what monthly adjustment would.',
      'The gain grows with latitude because the sun\'s height changes more between seasons the further you are from the equator.',
      'Adjust around the equinoxes (March and September) for a twice-yearly schedule.'
    ],
    faqs: [
      { q: 'How much more energy do adjustable solar panels produce?', a: 'Adjusting tilt twice a year typically adds about 4% over the best fixed angle; monthly adjustments add 5–7%. That is far less than a sun tracker, which adds 20–35%.' },
      { q: 'When should I change my solar panel angle?', a: 'For two positions, switch to the winter angle around the September equinox and back to the summer angle around the March equinox (reverse in the southern hemisphere).' },
      { q: 'Is seasonal adjustment worth it on a roof?', a: 'Usually not on a roof, because climbing up to adjust panels is risky and the gain is small. It is most practical for ground mounts and RV or portable panels.' }
    ],
    related: ['solar-panel-tilt-angle', 'solar-tracker-vs-fixed', 'ground-mount-vs-roof-solar']
  },
  'solar-panel-azimuth-loss': {
    title: 'Solar Panel Orientation (Azimuth) Loss Calculator',
    description: 'Calculate how much energy solar panels lose when they face east, west or away from due south. See loss %, relative yield and kWh lost per year.',
    intro: 'Not every roof faces due south. This calculator estimates how much energy you give up when panels point east, west or further away from the equator, and shows how a lower tilt can reduce that penalty.',
    formula: ['Relative yield ≈ 1 − k × (1 − cos Δazimuth)', 'k ≈ 0.36 × sin(tilt) × (0.7 + latitude ÷ 100)'],
    how: [
      'The azimuth deviation is the angle between where panels face and due south (northern hemisphere) or due north (southern hemisphere).',
      'Flat panels are not affected by azimuth at all, so steeper panels lose more when facing the wrong way.',
      'East- and west-facing arrays at a typical 20–30° tilt usually produce 80–87% of a south-facing array.'
    ],
    faqs: [
      { q: 'How much do east-west solar panels lose?', a: 'At a 30° tilt and mid-latitudes, east- or west-facing panels lose about 15–19% compared with due south. At a 10–15° tilt the loss drops to around 6–9%.' },
      { q: 'Are north-facing solar panels worth it in the northern hemisphere?', a: 'Steep north-facing panels lose 30–40% and are rarely worthwhile. Very low-tilt north-facing panels lose much less and can still pay back in sunny areas.' },
      { q: 'Is west-facing better than east-facing?', a: 'They produce similar totals, but west-facing panels generate more in the late afternoon when grid electricity is often more expensive under time-of-use rates.' }
    ],
    related: ['solar-panel-tilt-angle', 'ground-mount-vs-roof-solar', 'shading-impact', 'roof-solar-capacity']
  },
  'solar-tracker-vs-fixed': {
    title: 'Solar Tracker vs Fixed Tilt Calculator: Extra kWh',
    description: 'Compare single-axis and dual-axis solar trackers with fixed-tilt panels. See extra kWh per year, percentage gain and the value of the extra energy.',
    intro: 'Trackers follow the sun across the sky and squeeze more energy from each panel, but they cost more and add moving parts. Enter your system size and sky conditions to see what a tracker would really add.',
    formula: ['Fixed kWh = kW × Sun hours × 365 × 0.86', 'Tracker kWh = Fixed kWh × (1 + Tracker gain)'],
    how: [
      'Single-axis trackers rotate east to west and typically add 12–25%. Dual-axis trackers also adjust tilt and add 18–36%.',
      'Gains are highest under clear skies. On cloudy days light is diffuse and comes from the whole sky, so pointing at the sun helps less.',
      'Compare the value of the extra energy with the extra cost of simply adding more fixed panels.'
    ],
    faqs: [
      { q: 'How much more power does a solar tracker produce?', a: 'A single-axis tracker typically produces 20–25% more in sunny climates and around 12% more in cloudy ones. Dual-axis trackers add roughly 30–36% in sunny areas.' },
      { q: 'Are solar trackers worth it for homes?', a: 'Rarely. Panels have become cheap enough that adding 25% more fixed panels usually costs less than a tracker and has no moving parts to maintain.' },
      { q: 'Where do solar trackers make sense?', a: 'Utility-scale farms, sunny regions with expensive land, and off-grid sites where more morning and evening output reduces battery needs.' }
    ],
    related: ['seasonal-tilt-adjustment', 'solar-panel-output', 'ground-mount-vs-roof-solar']
  },
  'roof-solar-capacity': {
    title: 'Roof Area to Solar Capacity Calculator',
    description: 'Find out how many solar panels fit on your roof and how many kW they add up to. Enter roof area in m² or ft², usable share and panel size.',
    intro: 'Roof space is often the real limit on how big a solar system can be. Enter your roof area and panel size to see how many panels fit, the total kW, and how much energy they can produce each year.',
    formula: ['Panels = ⌊Roof area × Usable % ÷ Panel area⌋', 'Capacity (kW) = Panels × Panel W ÷ 1000'],
    how: [
      'Fire-code setbacks, vents, chimneys and skylights usually leave 60–80% of a roof face usable.',
      'A typical 400W residential panel measures about 1.7 × 1.13 m (1.95 m²); 430–450W panels are slightly larger.',
      'Each kW of modern panels needs roughly 5–6 m² (55–65 ft²) of usable roof.'
    ],
    faqs: [
      { q: 'How many solar panels fit on my roof?', a: 'Divide the usable roof area by the area of one panel. A 50 m² roof face with 70% usable fits about 17 standard 400W panels, or 6.8 kW.' },
      { q: 'How much roof space does a 6kW system need?', a: 'About 30–35 m² (320–380 ft²) of usable roof with 400W panels.' },
      { q: 'Do I need to count both sides of my roof?', a: 'Only count faces that get good sun. In the northern hemisphere, south, east and west faces are usable; north faces usually are not.' }
    ],
    related: ['solar-panel-layout', 'solar-panel-azimuth-loss', 'solar-array-sizing', 'monocrystalline-vs-polycrystalline']
  },
  'ground-mount-vs-roof-solar': {
    title: 'Ground Mount vs Rooftop Solar Efficiency Calculator',
    description: 'Compare ground-mounted and rooftop solar output. See how roof pitch and direction reduce yield versus an optimally angled, cooler ground mount.',
    intro: 'A ground mount can be set to the perfect angle and direction and stays cooler with air flowing underneath. A roof is cheaper but you get whatever pitch and direction it has. This calculator shows the difference in yearly energy.',
    formula: ['Ground kWh = Ideal kWh × 1.02 (cooler running)', 'Roof kWh = Ideal kWh × Tilt factor × Azimuth factor × 0.985'],
    how: [
      'The ground mount uses the optimal tilt for your latitude and faces due south (or north in the southern hemisphere).',
      'Roof output is reduced for pitch away from the optimum and for azimuth away from due south.',
      'Flush roof mounts run several degrees hotter than open ground mounts, costing roughly 1.5–3% in warm weather.'
    ],
    faqs: [
      { q: 'Is ground-mounted solar more efficient than rooftop?', a: 'Usually by 3–15%, because it can use the ideal angle and direction and runs cooler. The gap is small if your roof already faces south at a good pitch.' },
      { q: 'Does ground-mounted solar cost more?', a: 'Yes, typically 10–20% more per watt because of the racking, foundations and trenching for cables back to the house.' },
      { q: 'When is a ground mount the better choice?', a: 'When your roof is shaded, faces the wrong way, is too small, or needs replacing soon, and you have open, sunny land nearby.' }
    ],
    related: ['solar-panel-azimuth-loss', 'solar-panel-tilt-angle', 'solar-panel-row-spacing', 'solar-tracker-vs-fixed']
  },
  'solar-panel-row-spacing': {
    title: 'Solar Panel Row Spacing Calculator (Inter-Row Shading)',
    description: 'Calculate the minimum spacing between solar panel rows to avoid shading on the winter solstice, using panel length, tilt and latitude.',
    intro: 'On ground mounts and flat roofs, each row of panels casts a shadow on the row behind it, and the shadow is longest in winter. This calculator finds the row pitch that keeps panels shade-free during the hours you choose on the shortest day of the year.',
    formula: ['Panel height h = L × sin(tilt)', 'Gap = h ÷ tan(sun elevation) × cos(sun azimuth)', 'Row pitch = L × cos(tilt) + Gap'],
    how: [
      'Sun position is calculated for the winter solstice, when the sun is lowest and shadows are longest.',
      'A 9am–3pm window is the industry standard for shade-free design; designing for solar noon only gives tighter spacing but morning and afternoon shading.',
      'Ground coverage ratio (panel length ÷ pitch) is typically 0.35–0.5 for fixed-tilt arrays.'
    ],
    faqs: [
      { q: 'How far apart should solar panel rows be?', a: 'At 35° latitude with 2 m long panels tilted 30°, rows need about 4 m from front edge to front edge for no shading between 9am and 3pm in winter.' },
      { q: 'Why is row spacing based on the winter solstice?', a: 'The sun is lowest in the sky on the winter solstice, so shadows are longest. Spacing that works on that day works all year.' },
      { q: 'How can I fit more rows in the same space?', a: 'Lower the tilt angle. A flatter panel casts a much shorter shadow and loses only a few percent of annual energy.' }
    ],
    related: ['solar-panel-tilt-angle', 'ground-mount-vs-roof-solar', 'shading-impact', 'roof-solar-capacity']
  },
  'cloud-cover-solar-loss': {
    title: 'Cloud Cover Solar Loss Calculator: Output on Cloudy Days',
    description: 'Estimate how much solar output drops with cloud cover. Uses the Kasten–Czeplak cloud model to convert cloud cover % into expected kWh.',
    intro: 'Solar panels still work on cloudy days, but how much they produce depends on how much of the sky is covered. Enter the cloud cover from your weather forecast to estimate today\'s output.',
    formula: ['Output = Clear-sky output × (1 − 0.75 × N^3.4)', 'N = cloud cover fraction (0–1)'],
    how: [
      'The Kasten–Czeplak model is a widely used meteorological formula linking cloud cover to ground-level solar radiation.',
      'Light, scattered cloud costs surprisingly little: 50% cover reduces output by only about 7%.',
      'Full overcast cuts output to roughly 25% of a clear day. Thick storm clouds can push it down to 10%.'
    ],
    faqs: [
      { q: 'Do solar panels work on cloudy days?', a: 'Yes. They produce from diffuse light that passes through clouds, typically 10–25% of their clear-day output under full overcast and much more under broken cloud.' },
      { q: 'Can clouds increase solar output?', a: 'Briefly, yes. The edge of a cloud can reflect extra sunlight onto panels, causing short spikes above the clear-sky level known as cloud enhancement.' },
      { q: 'How do I size an off-grid system for cloudy weather?', a: 'Size panels for your worst month\'s sun hours and add 2–3 days of battery autonomy to ride through runs of overcast days.' }
    ],
    related: ['battery-autonomy', 'solar-irradiance-by-city', 'off-grid-system-sizing', 'dust-soiling-loss']
  },
  'monocrystalline-vs-polycrystalline': {
    title: 'Monocrystalline vs Polycrystalline Solar Panel Calculator',
    description: 'Compare monocrystalline and polycrystalline solar panels for the same area: capacity, yearly kWh and temperature losses side by side.',
    intro: 'Monocrystalline panels convert more sunlight per square meter and lose less output in the heat. This calculator shows how much more energy they produce from the same space, which matters most when roof area is limited.',
    formula: ['Capacity = Area × Efficiency', 'Yearly kWh = Capacity × Sun hours × 365 × 0.86 × (1 + Temp coef × (Cell temp − 25))'],
    how: [
      'Modern monocrystalline panels are 20–23% efficient; polycrystalline panels are typically 15–18%.',
      'Temperature coefficients of about −0.35%/°C (mono) and −0.40%/°C (poly) mean mono also loses less on hot days.',
      'Polycrystalline panels have largely disappeared from the residential market, but they remain common on older systems and in some budget kits.'
    ],
    faqs: [
      { q: 'Which is better, monocrystalline or polycrystalline?', a: 'Monocrystalline produces about 20–30% more power from the same area and handles heat better. Polycrystalline is only worth it if it is much cheaper and space is not a constraint.' },
      { q: 'Do monocrystalline panels work better in low light?', a: 'Slightly. Their higher efficiency carries over to cloudy conditions, though the difference in low light is smaller than at full sun.' },
      { q: 'How can I tell mono and poly panels apart?', a: 'Monocrystalline cells are uniformly black with rounded corners. Polycrystalline cells are blue with a speckled, flaky look and square corners.' }
    ],
    related: ['temperature-coefficient-loss', 'roof-solar-capacity', 'panel-degradation', 'solar-panel-output']
  }
}
