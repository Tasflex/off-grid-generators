// lib/calc/content/location.js
export const locationContent = {
  'solar-irradiance-by-city': {
    title: 'Peak Sun Hours & Solar Irradiance by City',
    description: 'Look up peak sun hours, annual solar irradiation, yield per kWp and best panel tilt for 37 cities across the US, Europe, Africa, Asia and Australia.',
    intro: 'Peak sun hours are the single most important number for sizing a solar system. Pick your city to see its average daily sun hours, annual irradiation, the energy each kW of panels can produce, and the best tilt angle.',
    formula: ['Annual irradiation (kWh/m²) = Peak sun hours × 365', 'Yield per kWp = Peak sun hours × 365 × 0.86'],
    how: [
      'Values are long-term annual averages on a panel tilted near the local latitude, rounded from NREL NSRDB and EU PVGIS data.',
      'Winter sun hours can be half the annual average at high latitudes, so size off-grid systems for the worst month.',
      'For a precise figure at your address, check NREL PVWatts (US) or PVGIS (worldwide).'
    ],
    faqs: [
      { q: 'How many peak sun hours does Nairobi get?', a: 'About 5.6 peak sun hours per day on average, which means each kW of panels can produce roughly 1,750 kWh per year.' },
      { q: 'What is a good number of peak sun hours for solar?', a: 'Five or more is excellent, 4–5 is good, and 3–4 is workable. Solar still pays off below 3.5 in places with high electricity prices, such as the UK and Germany.' },
      { q: 'What is the difference between irradiance and irradiation?', a: 'Irradiance is instantaneous power (W/m²). Irradiation is energy over time (kWh/m²). Peak sun hours are daily irradiation expressed in hours of 1,000 W/m² sunlight.' }
    ],
    related: ['solar-production-by-location', 'solar-irradiance-by-latitude', 'solar-panel-tilt-angle', 'solar-array-sizing']
  },
  'solar-irradiance-by-latitude': {
    title: 'Solar Irradiance by Latitude Calculator (Monthly)',
    description: 'Estimate average daily solar irradiation and peak sun hours for any latitude, month by month, using a solar geometry model and your typical sky.',
    intro: 'Not on the city list? Enter your latitude and how sunny your climate usually is. The calculator models the sun\'s path through every day of the year to estimate your peak sun hours and shows how they change month by month.',
    formula: ['H₀ = (24 × 3600 × 1367 ÷ π) × (1 + 0.033 cos(360n ÷ 365)) × (cos φ cos δ sin ωs + ωs sin φ sin δ)', 'Surface irradiation = H₀ × Clearness index'],
    how: [
      'H₀ is the daily solar energy arriving at the top of the atmosphere at your latitude (Duffie & Beckman).',
      'The clearness index is the share that reaches the ground: about 0.65–0.7 in deserts and 0.4–0.45 in cloudy climates.',
      'A panel tilted near your latitude collects more than a flat surface, especially in winter, which is reflected in the tilted figure.'
    ],
    faqs: [
      { q: 'How does latitude affect solar power?', a: 'Further from the equator the sun is lower and winter days are shorter, so annual sunlight falls and the summer–winter gap grows much larger.' },
      { q: 'Is solar worth it at high latitudes?', a: 'Often yes. Long summer days compensate partly, and cool temperatures improve panel efficiency, but winter output can be very low, so off-grid systems need careful sizing.' },
      { q: 'How accurate is a latitude-based estimate?', a: 'It captures the geometry exactly but treats cloud cover as an average, so expect ±10–15%. Local data from PVGIS or PVWatts is more precise.' }
    ],
    related: ['solar-irradiance-by-city', 'solar-panel-tilt-angle', 'cloud-cover-solar-loss', 'off-grid-system-sizing']
  }
}
