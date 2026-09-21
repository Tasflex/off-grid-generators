// lib/calculators.js


// ============================================
// SOLAR SIZING CALCULATOR
// ============================================
export function calculateSolarSystem(selectedAppliances, customDevices = []) {
  let totalWh = 0
  
  // Calculate from appliances
  selectedAppliances.forEach(appliance => {
    totalWh += appliance.watts * appliance.hours
  })
  
  // Calculate from custom devices
  customDevices.forEach(device => {
    totalWh += device.watts * device.hours
  })
  
  // Apply efficiency factors (85% DoD, 90% inverter efficiency)
  const requiredBatteryWh = totalWh / (0.85 * 0.90)
  
  // Determine recommendation tier
  let tier, recommendation
  let recommendedProducts = []
  
  if (requiredBatteryWh < 1200) {
    tier = 'compact'
    recommendation = 'Compact Weekend / Tailgate Setup'
    recommendedProducts = ['ecoflow-river-2', 'jackery-explorer-300', 'bluetti-eb3a']
  } else if (requiredBatteryWh < 3600) {
    tier = 'home'
    recommendation = 'Home Emergency Essentials Setup'
    recommendedProducts = ['bluetti-ac200max', 'ecoflow-delta-2', 'jackery-explorer-1000']
  } else {
    tier = 'offgrid'
    recommendation = 'Full Off-Grid / Heavy Duty Backup'
    recommendedProducts = ['ecoflow-delta-pro', 'jackery-explorer-2000', 'goal-zero-yeti-1500x']
  }
  
  return {
    totalWh: Math.round(totalWh),
    requiredBatteryWh: Math.round(requiredBatteryWh),
    tier,
    recommendation,
    recommendedProducts,
    recommendedCapacity: Math.round(requiredBatteryWh),
    safetyMargin: Math.round(requiredBatteryWh * 0.2) // 20% extra
  }
}

// ============================================
// BATTERY RUNTIME CALCULATOR
// ============================================
export function calculateBatteryRuntime(batteryCapacityWh, deviceWatts) {
  const usableCapacity = batteryCapacityWh * 0.85 // 85% DoD
  const runtimeHours = usableCapacity / deviceWatts
  
  return {
    runtimeHours: runtimeHours.toFixed(2),
    runtimeMinutes: Math.round(runtimeHours * 60),
    capacityAvailable: Math.round(usableCapacity),
    nightsOfSleep: Math.floor(runtimeHours / 8), // 8hrs sleep
    fullChargeCycles: Math.floor(batteryCapacityWh / deviceWatts)
  }
}

// ============================================
// OFF-GRID BUDGET CALCULATOR
// ============================================
export function calculateBudget(dailyLoadWh, backupDays, systemType = 'home') {
  const totalRequired = dailyLoadWh * backupDays
  
  // Cost estimates (per Wh)
  const batteryCost = totalRequired * 0.5 // $0.50 per Wh
  const solarCost = totalRequired * 0.3 // $0.30 per Wh
  const inverterCost = systemType === 'home' ? 800 : systemType === 'vanlife' ? 500 : 300
  const installationCost = systemType === 'home' ? totalRequired * 0.1 : 0
  
  const totalCost = batteryCost + solarCost + inverterCost + installationCost
  
  // Monthly savings estimate
  const savingsPerDay = systemType === 'home' ? 5 : systemType === 'vanlife' ? 8 : 3
  const monthlySavings = savingsPerDay * 30
  
  return {
    totalRequired: Math.round(totalRequired),
    batteryCost: Math.round(batteryCost),
    solarCost: Math.round(solarCost),
    inverterCost,
    installationCost: Math.round(installationCost),
    totalCost: Math.round(totalCost),
    monthlySavings,
    paybackMonths: monthlySavings > 0 ? Math.round(totalCost / monthlySavings) : 0,
    breakdown: {
      battery: Math.round(batteryCost),
      solar: Math.round(solarCost),
      inverter: inverterCost,
      installation: Math.round(installationCost)
    }
  }
}

// ============================================
// SOLAR PANEL LAYOUT CALCULATOR
// ============================================
export function calculateSolarPanelLayout(dailyEnergyWh, sunHours = 5, panelWattage = 400, roofArea = 20) {
  // System size calculation (80% efficiency)
  const systemSizeKW = dailyEnergyWh / (sunHours * 0.8) / 1000
  
  // Number of panels needed
  const numberOfPanels = Math.ceil((systemSizeKW * 1000) / panelWattage)
  const totalSystemWatts = numberOfPanels * panelWattage
  
  // Area calculation (approximate panel dimensions in sq ft)
  const panelArea = {
    100: 6.5,  // sq ft per panel
    200: 11.5,
    350: 20.9,
    400: 21.4,
    550: 27.2
  }[panelWattage] || 21.4
  
  const requiredArea = numberOfPanels * panelArea
  
  // Battery storage needed (20% margin)
  const batteryStorage = dailyEnergyWh * 1.2
  
  return {
    systemSizeKW: systemSizeKW.toFixed(2),
    numberOfPanels,
    totalSystemWatts,
    requiredArea: requiredArea.toFixed(1),
    batteryStorage: Math.round(batteryStorage),
    fitsOnRoof: requiredArea <= roofArea,
    panelDimensions: getPanelDimensions(panelWattage),
    arrayConfiguration: getArrayConfiguration(numberOfPanels)
  }
}

function getPanelDimensions(wattage) {
  const dimensions = {
    100: { length: 47, width: 21, weight: 16.5 },  // inches, lbs
    200: { length: 64, width: 26, weight: 26.5 },
    350: { length: 77, width: 39, weight: 41 },
    400: { length: 79, width: 39, weight: 48.5 },
    550: { length: 89, width: 44, weight: 61 }
  }
  return dimensions[wattage] || dimensions[400]
}

function getArrayConfiguration(panelCount) {
  // Suggest series/parallel configuration
  if (panelCount <= 2) return `1 Series x ${panelCount} Parallel (1S${panelCount}P)`
  if (panelCount <= 4) return `2 Series x ${Math.ceil(panelCount / 2)} Parallel (2S${Math.ceil(panelCount / 2)}P)`
  if (panelCount <= 8) return `4 Series x ${Math.ceil(panelCount / 4)} Parallel (4S${Math.ceil(panelCount / 4)}P)`
  return `8 Series x ${Math.ceil(panelCount / 8)} Parallel (8S${Math.ceil(panelCount / 8)}P)`
}

// ============================================
// CHARGE TIME CALCULATOR
// ============================================
export function calculateChargeTime(batteryCapacityWh, chargeMethod = 'solar', chargeWatts = 200) {
  // Charge controller efficiency
  const efficiency = 0.85
  
  let effectiveWatts = 0
  let chargeLabel = ''
  
  switch (chargeMethod) {
    case 'solar':
      effectiveWatts = chargeWatts * efficiency
      chargeLabel = `${chargeWatts}W solar`
      break
    case 'ac':
      effectiveWatts = chargeWatts * efficiency
      chargeLabel = `${chargeWatts}W AC`
      break
    case 'car':
      effectiveWatts = 100 * efficiency
      chargeLabel = '100W car'
      break
    default:
      effectiveWatts = chargeWatts * efficiency
      chargeLabel = `${chargeWatts}W`
  }
  
  const chargeTimeHours = batteryCapacityWh / effectiveWatts
  const hours = Math.floor(chargeTimeHours)
  const minutes = Math.round((chargeTimeHours - hours) * 60)
  
  return {
    chargeTime: chargeTimeHours.toFixed(1),
    chargeTimeHours: chargeTimeHours,
    hours,
    minutes,
    effectiveWatts: Math.round(effectiveWatts),
    chargeLabel,
    chargePercentagePerHour: Math.round((effectiveWatts / batteryCapacityWh) * 100)
  }
}

// ============================================
// COST SAVINGS CALCULATOR (vs Gas Generator)
// ============================================
export function calculateCostSavings(solarPrice, gasGeneratorPrice, monthlyUsageHours) {
  // Gas costs
  const gasUsagePerHour = 0.5 // gallons per hour
  const gasPrice = 3.5 // per gallon
  const monthlyGasCost = monthlyUsageHours * gasUsagePerHour * gasPrice
  
  // Solar costs (electricity)
  const solarElectricityCost = monthlyUsageHours * 0.15 // ~15 cents per hour
  
  // Annual savings
  const monthlySavings = monthlyGasCost - solarElectricityCost
  const annualSavings = monthlySavings * 12
  
  // Payback period
  const priceDifference = solarPrice - gasGeneratorPrice
  const paybackMonths = monthlySavings > 0 ? Math.round(priceDifference / monthlySavings) : 0
  
  return {
    monthlyGasCost: Math.round(monthlyGasCost),
    monthlySolarCost: Math.round(solarElectricityCost),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    paybackMonths,
    paybackYears: (paybackMonths / 12).toFixed(1),
    fiveYearSavings: Math.round(annualSavings * 5 - priceDifference)
  }
}

// ============================================
// AC LOAD CALCULATOR (For Inverter Sizing)
// ============================================
export function calculateACLoad(devices) {
  // Calculate total running watts and surge watts
  let totalRunningWatts = 0
  let totalSurgeWatts = 0
  let totalDailyWh = 0
  
  devices.forEach(device => {
    const watts = device.watts || 0
    const surge = device.surgeWatts || (watts * 3)
    const hours = device.hours || 0
    
    totalRunningWatts += watts
    totalSurgeWatts += surge
    totalDailyWh += watts * hours
  })
  
  // Inverter sizing (add 20% safety margin)
  const recommendedInverterWatts = Math.ceil(totalRunningWatts * 1.2)
  const recommendedSurgeWatts = Math.ceil(totalSurgeWatts * 1.2)
  
  // Determine if surge is significant
  const surgeSignificant = totalSurgeWatts > totalRunningWatts * 1.5
  
  return {
    totalRunningWatts,
    totalSurgeWatts,
    totalDailyWh: Math.round(totalDailyWh),
    recommendedInverterWatts,
    recommendedSurgeWatts,
    surgeSignificant,
    notes: surgeSignificant 
      ? 'Your system has significant surge requirements. Choose an inverter rated for these surge watts.'
      : 'Standard inverter sizing is sufficient for your needs.'
  }
}

// ============================================
// INVERTER SIZING CALCULATOR
// ============================================
export function getRecommendedInverter(runningWatts, surgeWatts) {
  const recommendations = []
  
  // Add safety margin (20%)
  const recommendedRunning = Math.ceil(runningWatts * 1.2)
  const recommendedSurge = Math.ceil(surgeWatts * 1.2)
  
  // Determine inverter size tier
  let tier
  if (recommendedRunning <= 800) tier = 'small'
  else if (recommendedRunning <= 1500) tier = 'medium'
  else if (recommendedRunning <= 2500) tier = 'large'
  else tier = 'xl'

  // Product recommendations based on tier
  const products = {
    small: [
      { name: 'Victron 800W Pure Sine Wave', watts: 800, surge: 1200, price: 199, features: ['Pure Sine Wave', 'Compact'], badge: 'Most Reliable' },
      { name: 'Renogy 1000W Pure Sine Wave', watts: 1000, surge: 2000, price: 129, features: ['Pure Sine Wave', 'USB Ports'], badge: 'Best Value' }
    ],
    medium: [
      { name: 'Renogy 2000W Pure Sine Wave', watts: 2000, surge: 4000, price: 279, features: ['Pure Sine Wave', 'Remote Control'], badge: 'High Output' },
      { name: 'Renogy 1000W Pure Sine Wave', watts: 1000, surge: 2000, price: 129, features: ['Pure Sine Wave', 'USB Ports'] }
    ],
    large: [
      { name: 'Renogy 3000W Pure Sine Wave', watts: 3000, surge: 6000, price: 399, features: ['Pure Sine Wave', 'Parallel Capable'], badge: 'Best Value' },
      { name: 'EcoFlow Smart Inverter', watts: 3000, surge: 6000, price: 599, features: ['Smart App', 'Solar Input'], badge: 'Premium' }
    ],
    xl: [
      { name: 'EcoFlow Smart Inverter', watts: 3000, surge: 6000, price: 599, features: ['Smart App', 'Solar Input'], badge: 'Premium' },
      { name: 'Renogy 3000W Pure Sine Wave', watts: 3000, surge: 6000, price: 399, features: ['Pure Sine Wave', 'Parallel Capable'] }
    ]
  }

  // Return products for the tier
  return products[tier] || products.small
}

// ============================================
// CHARGE CONTROLLER SIZING CALCULATOR
// ============================================
export function calculateChargeControllerSize(solarWatts, batteryVoltage, batteryType = 'lithium', controllerType = 'mppt') {
  // Calculate current (Amps = Watts / Volts)
  const amps = solarWatts / batteryVoltage
  
  // Efficiency factors
  const efficiency = controllerType === 'mppt' ? 0.95 : 0.85
  const actualAmps = amps / efficiency
  
  // Safety margin (25%)
  const safeAmps = actualAmps * 1.25
  
  // Max solar input (with safety)
  const maxSolarInput = safeAmps * batteryVoltage
  
  // Charge efficiency based on battery type
  const chargeEfficiency = {
    lithium: 0.95,
    leadacid: 0.85,
    flooded: 0.80
  }[batteryType] || 0.85

  // Round up to common sizes
  const commonSizes = [10, 15, 20, 25, 30, 40, 50, 60, 80, 100]
  const minAmps = Math.ceil(actualAmps)
  let recommendedAmps = Math.ceil(safeAmps)
  
  // Round up to nearest common size
  for (const size of commonSizes) {
    if (size >= recommendedAmps) {
      recommendedAmps = size
      break
    }
  }
  
  return {
    amps: amps.toFixed(1),
    actualAmps: actualAmps.toFixed(1),
    minAmps,
    recommendedAmps,
    maxSolarInput: Math.round(maxSolarInput),
    systemType: controllerType,
    batteryType,
    chargeEfficiency: chargeEfficiency * 100
  }
}

// ============================================
// CHARGE CONTROLLER RECOMMENDATIONS
// ============================================
export function getRecommendedController(requiredAmps, recommendedAmps, type = 'mppt', voltage = 12) {
  const recommendations = []
  
  // MPPT Controllers
  if (type === 'mppt') {
    if (requiredAmps <= 30) {
      recommendations.push(
        { name: 'Renogy 30A MPPT Charge Controller', amps: 30, voltage: 12, type: 'mppt', price: 129, features: ['LCD Display', 'Multiple Protection'], badge: 'Best Seller' },
        { name: 'Renogy 40A MPPT Charge Controller', amps: 40, voltage: 12, type: 'mppt', price: 199, features: ['Bluetooth', 'High Efficiency'] }
      )
    } else if (requiredAmps <= 40) {
      recommendations.push(
        { name: 'Renogy 40A MPPT Charge Controller', amps: 40, voltage: 12, type: 'mppt', price: 199, features: ['Bluetooth', 'High Efficiency'] },
        { name: 'Victron SmartSolar MPPT 100/50', amps: 50, voltage: 12, type: 'mppt', price: 299, features: ['Bluetooth', 'Smart Monitoring'], badge: 'Premium' }
      )
    } else {
      recommendations.push(
        { name: 'Victron SmartSolar MPPT 100/50', amps: 50, voltage: 12, type: 'mppt', price: 299, features: ['Bluetooth', 'Smart Monitoring'], badge: 'Premium' }
      )
    }
  } else {
    // PWM Controllers
    if (requiredAmps <= 30) {
      recommendations.push(
        { name: 'Renogy 30A PWM Charge Controller', amps: 30, voltage: 12, type: 'pwm', price: 49, features: ['Basic Display', 'Budget Friendly'], badge: 'Budget Pick' }
      )
    }
  }
  
  return recommendations
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Format runtime in human readable format
export function formatRuntime(hours) {
  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    const remainingHours = Math.round(hours % 24)
    return `${days} days ${remainingHours} hours`
  }
  if (hours >= 1) {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m}m`
  }
  return `${Math.round(hours * 60)} minutes`
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Calculate recommended battery for specific appliances
export function getRecommendedBattery(appliances) {
  const { totalWh } = calculateSolarSystem(appliances)
  
  if (totalWh < 500) return 500
  if (totalWh < 1000) return 1000
  if (totalWh < 2000) return 2000
  if (totalWh < 3000) return 3000
  return 3600
}

// Calculate solar panel requirements for battery charging
export function calculatePanelRequirements(batteryCapacityWh, chargeHours = 6) {
  const systemSizeKW = batteryCapacityWh / (chargeHours * 0.8) / 1000
  const panels400W = Math.ceil((systemSizeKW * 1000) / 400)
  const panels200W = Math.ceil((systemSizeKW * 1000) / 200)
  const panels100W = Math.ceil((systemSizeKW * 1000) / 100)
  
  return {
    systemSizeKW: systemSizeKW.toFixed(2),
    panels400W,
    panels200W,
    panels100W,
    recommendedSetup: panels400W <= 2 ? `400W x ${panels400W}` : `200W x ${panels200W}`
  }
}

// Calculate backup time for home appliances
export function calculateHomeBackup(homeAppliances, batteryCapacityWh) {
  const { totalDailyWh } = calculateACLoad(homeAppliances)
  const { runtimeHours } = calculateBatteryRuntime(batteryCapacityWh, totalDailyWh / 24)
  
  return {
    totalDailyWh: Math.round(totalDailyWh),
    backupHours: runtimeHours,
    backupDays: Math.floor(runtimeHours / 24),
    recommendedBattery: getRecommendedBattery(homeAppliances)
  }
}

// Compare two solar generators
export function compareGenerators(productA, productB) {
  const pricePerWhA = productA.price / productA.capacity
  const pricePerWhB = productB.price / productB.capacity
  
  return {
    productA: {
      ...productA,
      pricePerWh: pricePerWhA.toFixed(2)
    },
    productB: {
      ...productB,
      pricePerWh: pricePerWhB.toFixed(2)
    },
    recommendations: {
      bestValue: pricePerWhA < pricePerWhB ? productA.name : productB.name,
      bestCapacity: productA.capacity > productB.capacity ? productA.name : productB.name,
      bestPortability: productA.weight < productB.weight ? productA.name : productB.name,
      bestWarranty: productA.warranty > productB.warranty ? productA.name : productB.name
    }
  }
}

// Calculate total cost of ownership over 5 years
export function calculateFiveYearCost(product, monthlyUsageHours = 10) {
  const monthlyChargeCost = monthlyUsageHours * 0.15 // ~15 cents per hour
  const yearlyChargeCost = monthlyChargeCost * 12
  const fiveYearChargeCost = yearlyChargeCost * 5
  
  return {
    productCost: product.price,
    fiveYearChargeCost: Math.round(fiveYearChargeCost),
    fiveYearTotal: Math.round(product.price + fiveYearChargeCost),
    yearlyRunningCost: Math.round(yearlyChargeCost)
  }
}

// Calculate if a system can run specific appliances
export function canRunAppliances(batteryCapacityWh, appliances) {
  const { totalRunningWatts, totalSurgeWatts } = calculateACLoad(appliances)
  const { runtimeHours } = calculateBatteryRuntime(batteryCapacityWh, totalRunningWatts)
  
  return {
    canRun: batteryCapacityWh >= totalRunningWatts,
    canHandleSurge: batteryCapacityWh >= totalSurgeWatts,
    estimatedRuntime: runtimeHours,
    totalRunningWatts,
    totalSurgeWatts
  }
}


// ============================================
// ============================================
// NEW CALCULATORS — Performance, Degradation & Economics
// ============================================
// ============================================


// ============================================
// PANEL DEGRADATION LOSS PER YEAR
// ============================================
export function calculatePanelDegradation(initialWattage, degradationRate, years, sunHours = 5) {
  // Validate
  if (initialWattage <= 0 || years <= 0 || degradationRate < 0) {
    return null
  }

  const yearlyData = []
  for (let y = 0; y <= years; y++) {
    const remainingWattage = initialWattage * Math.pow(1 - degradationRate / 100, y)
    yearlyData.push({
      year: y,
      wattage: remainingWattage,
      lossPercent: ((initialWattage - remainingWattage) / initialWattage) * 100
    })
  }

  const finalWattage = yearlyData[yearlyData.length - 1].wattage
  const totalLoss = initialWattage - finalWattage
  const totalLossPercent = (totalLoss / initialWattage) * 100

  // Energy production impact
  const dailyLossWh = totalLoss * sunHours
  const yearlyLossKWh = (dailyLossWh * 365) / 1000

  return {
    finalWattage: parseFloat(finalWattage.toFixed(1)),
    totalLoss: parseFloat(totalLoss.toFixed(1)),
    totalLossPercent: parseFloat(totalLossPercent.toFixed(2)),
    yearlyLossKWh: parseFloat(yearlyLossKWh.toFixed(1)),
    yearlyData
  }
}

// ============================================
// BATTERY CYCLE DEGRADATION PER DoD
// ============================================
export function calculateBatteryDoDDegradation({
  batteryChemistry = 'lifepo4',
  ratedCycles,
  depthOfDischarge,
  cycleFrequency = 1,
  batteryCost = 1200,
  nominalCapacityWh = 1280
}) {
  // Validate
  if (ratedCycles <= 0 || depthOfDischarge <= 0 || depthOfDischarge > 100) {
    return null
  }

  // DoD sensitivity exponent per chemistry — deeper discharge hits harder
  const dodSensitivity = {
    flooded: 1.8,
    agm: 1.7,
    lifepo4: 1.15,
    nmc: 1.3
  }[batteryChemistry] || 1.5

  // DoD stress factor relative to 50% DoD (industry standard)
  const stressFactor = Math.pow(depthOfDischarge / 50, dodSensitivity)

  // Effective cycles at this DoD
  const effectiveCycles = Math.round(ratedCycles / stressFactor)

  // Lifespan in years
  const yearsOfLife = effectiveCycles / (cycleFrequency * 365)

  // Lifetime energy throughput
  const usableWhPerCycle = (nominalCapacityWh * depthOfDischarge) / 100
  const lifetimeThroughputKWh = (usableWhPerCycle * effectiveCycles) / 1000

  // Cost economics
  const costPerKWh = lifetimeThroughputKWh > 0 ? batteryCost / lifetimeThroughputKWh : 0
  const costPerYear = yearsOfLife > 0 ? batteryCost / yearsOfLife : 0

  return {
    effectiveCycles,
    yearsOfLife: parseFloat(yearsOfLife.toFixed(1)),
    lifetimeThroughput: Math.round(lifetimeThroughputKWh),
    costPerKWh: parseFloat(costPerKWh.toFixed(3)),
    costPerYear: Math.round(costPerYear),
    stressFactor: parseFloat(stressFactor.toFixed(2))
  }
}

// ============================================
// SOLAR PANEL HOTSPOT RISK
// ============================================
export function calculateHotspotRisk({
  panelAge,
  bypassDiodesWorking = true,
  visibleDamage = false,
  partialShading = 'low',
  cellType = 'mono'
}) {
  let riskScore = 0
  const factors = []

  // Age factor
  if (panelAge > 15) { riskScore += 25; factors.push({ name: 'Panel age >15 years', weight: 25 }) }
  else if (panelAge > 10) { riskScore += 15; factors.push({ name: 'Panel age 10-15 years', weight: 15 }) }
  else if (panelAge > 5) { riskScore += 5; factors.push({ name: 'Panel age 5-10 years', weight: 5 }) }

  // Bypass diode factor
  if (!bypassDiodesWorking) {
    riskScore += 30
    factors.push({ name: 'Bypass diodes failing/failed', weight: 30 })
  }

  // Visible damage
  if (visibleDamage) {
    riskScore += 25
    factors.push({ name: 'Visible cracks/delamination', weight: 25 })
  }

  // Shading factor
  const shadingWeights = { none: 0, low: 5, medium: 15, high: 30 }
  const shadingWeight = shadingWeights[partialShading] || 0
  if (shadingWeight > 0) {
    riskScore += shadingWeight
    factors.push({ name: `${partialShading} partial shading`, weight: shadingWeight })
  }

  // Cell type
  if (cellType === 'poly') {
    riskScore += 5
    factors.push({ name: 'Polycrystalline cells', weight: 5 })
  }

  const maxScore = 115
  const riskPercent = Math.min(100, (riskScore / maxScore) * 100)

  let riskLevel = 'Low'
  if (riskPercent > 60) riskLevel = 'High'
  else if (riskPercent > 35) riskLevel = 'Moderate'

  // Recommendations
  const recommendations = []
  if (!bypassDiodesWorking) recommendations.push('Test and replace bypass diodes immediately')
  if (visibleDamage) recommendations.push('Inspect with thermal camera; replace damaged panel')
  if (partialShading !== 'none') recommendations.push('Install string optimizers or microinverters')
  if (panelAge > 10) recommendations.push('Annual thermal inspection recommended')
  if (recommendations.length === 0) recommendations.push('No urgent action needed — continue annual visual inspections')

  return {
    riskScore,
    riskPercent: Math.round(riskPercent),
    riskLevel,
    factors,
    recommendations
  }
}

// ============================================
// SHADING IMPACT BY % COVERAGE
// ============================================
export function calculateShadingImpact({
  arrayWattage,
  shadeCoverage,
  shadeType = 'soft',
  stringConfig = 'series',
  sunHours = 5,
  gridRate = 0.15
}) {
  if (arrayWattage <= 0 || shadeCoverage < 0 || shadeCoverage > 100) {
    return null
  }

  // Shade type factor
  const shadeFactor = {
    soft: 0.6,
    hard: 1.0,
    intermittent: 0.4
  }[shadeType] || 1.0

  // Config multiplier — series is worst case
  let configMultiplier
  if (stringConfig === 'series') configMultiplier = 1.5
  else if (stringConfig === 'parallel') configMultiplier = 1.0
  else configMultiplier = 0.3  // optimizers

  // Real-world loss (non-linear, capped at 95%)
  const effectiveLoss = Math.min(95, shadeCoverage * shadeFactor * configMultiplier)

  const lostWattage = (arrayWattage * effectiveLoss) / 100
  const remainingWattage = arrayWattage - lostWattage

  // Annual estimates
  const annualLostKWh = (lostWattage * sunHours * 365) / 1000
  const annualProducedKWh = (remainingWattage * sunHours * 365) / 1000
  const annualValueLost = annualLostKWh * gridRate

  return {
    effectiveLoss: parseFloat(effectiveLoss.toFixed(1)),
    lostWattage: Math.round(lostWattage),
    remainingWattage: Math.round(remainingWattage),
    annualLostKWh: Math.round(annualLostKWh),
    annualProducedKWh: Math.round(annualProducedKWh),
    annualValueLost: Math.round(annualValueLost)
  }
}

// ============================================
// DUST & SOILING LOSS ESTIMATOR
// ============================================
export function calculateSoilingLoss({
  location = 'suburban',
  tiltAngle = 30,
  rainfall = 'moderate',
  cleaningFrequency = 'rarely',
  arraySize,
  sunHours = 5,
  gridRate = 0.15
}) {
  if (arraySize <= 0) return null

  // Base soiling rate by location
  const baseSoiling = {
    urban: 4,
    suburban: 3,
    rural: 5,
    desert: 10,
    coastal: 4
  }[location] || 4

  // Rainfall factor (more rain = naturally cleaner)
  const rainFactor = {
    low: 0.5,
    moderate: 1.0,
    high: 0.6
  }[rainfall] || 1.0

  // Cleaning frequency factor
  const cleaningFactor = {
    never: 1.8,
    rarely: 1.3,
    sometimes: 0.9,
    regularly: 0.5
  }[cleaningFrequency] || 1.3

  // Tilt factor — steeper tilt sheds dust better
  const tiltFactor = 1 - Math.min(0.6, (tiltAngle / 45) * 0.6)

  // Compute annual average soiling loss
  const rawSoilingLoss = baseSoiling * rainFactor * cleaningFactor * tiltFactor
  const soilingLoss = Math.min(25, rawSoilingLoss)

  // Energy impact
  const annualProduction = (arraySize * sunHours * 365) / 1000
  const annualLoss = (annualProduction * soilingLoss) / 100
  const valueLost = annualLoss * gridRate

  // Recommendations
  const recommendations = []
  if (soilingLoss > 8) recommendations.push('Increase cleaning frequency to monthly')
  if (tiltAngle < 15) recommendations.push('Increase tilt angle to at least 20° for better self-cleaning')
  if (location === 'desert') recommendations.push('Consider automated panel cleaning system')
  if (rainfall === 'low') recommendations.push('Manual cleaning is essential in low-rainfall areas')
  if (recommendations.length === 0) recommendations.push('Current setup is efficient — maintain cleaning schedule')

  return {
    soilingLoss: parseFloat(soilingLoss.toFixed(1)),
    annualLoss: Math.round(annualLoss),
    annualProduction: Math.round(annualProduction),
    annualNetProduction: Math.round(annualProduction - annualLoss),
    valueLost: Math.round(valueLost),
    recommendations
  }
}

// ============================================
// TEMPERATURE COEFFICIENT LOSS
// ============================================
export function calculateTemperatureLoss({
  panelWattage,
  tempCoefficient,
  cellTemp,
  arraySize,
  sunHours = 5
}) {
  if (panelWattage <= 0 || arraySize <= 0) return null

  // Reference is STC (25°C)
  const tempDelta = cellTemp - 25

  // Coefficient is negative (per °C). Compute output loss %
  const lossPercent = tempCoefficient * tempDelta  // negative when hot

  // Actual per-panel output at this temperature
  const actualWattage = panelWattage * (1 + lossPercent / 100)

  // Total array output
  const totalArrayOutput = (actualWattage / panelWattage) * arraySize
  const arrayLoss = arraySize - totalArrayOutput

  // Rough annual average (assume this temp for half the year)
  const avgLoss = lossPercent / 2
  const annualProduction = (arraySize * (1 + avgLoss / 100) * sunHours * 365) / 1000

  // What a premium panel (-0.29%/°C) would deliver
  const premiumCoefficient = -0.29
  const premiumWattage = panelWattage * (1 + (premiumCoefficient * tempDelta) / 100)
  const yearlyGainKWh = ((premiumWattage - actualWattage) / panelWattage) * arraySize * sunHours * 365 / 1000

  return {
    tempDelta: parseFloat(tempDelta.toFixed(1)),
    lossPercent: parseFloat(Math.abs(lossPercent).toFixed(2)),
    actualWattage: parseFloat(actualWattage.toFixed(1)),
    totalArrayOutput: Math.round(totalArrayOutput),
    arrayLoss: Math.round(Math.abs(arrayLoss)),
    annualProduction: Math.round(annualProduction),
    yearlyGain: parseFloat(yearlyGainKWh.toFixed(0)),
    isHeating: tempDelta > 0
  }
}

// ============================================
// BATTERY LIFETIME COST PER kWh
// ============================================
export function calculateBatteryLifetimeCost({
  purchaseCost,
  capacity,
  cycleLife,
  depthOfDischarge,
  roundTripEfficiency,
  gridCostPerKWh = 0.15
}) {
  if (purchaseCost <= 0 || capacity <= 0 || cycleLife <= 0) return null

  // Usable energy per cycle (after DoD + efficiency losses)
  const usablePerCycle = capacity * (depthOfDischarge / 100) * (roundTripEfficiency / 100)

  // Lifetime throughput
  const lifetimeThroughputKWh = (usablePerCycle * cycleLife) / 1000

  // Cost per kWh delivered
  const costPerKWh = purchaseCost / lifetimeThroughputKWh

  // Comparison to grid
  const savingsPerKWh = gridCostPerKWh - costPerKWh

  // Full lifetime economics
  const gridCostForSameEnergy = lifetimeThroughputKWh * gridCostPerKWh
  const lifetimeSavings = gridCostForSameEnergy - purchaseCost
  const costPerDay = purchaseCost / (cycleLife / 365)

  return {
    usablePerCycle: Math.round(usablePerCycle),
    lifetimeThroughputKWh: Math.round(lifetimeThroughputKWh),
    costPerKWh: parseFloat(costPerKWh.toFixed(3)),
    gridCostPerKWh,
    savingsPerKWh: parseFloat(savingsPerKWh.toFixed(3)),
    gridCostForSameEnergy: Math.round(gridCostForSameEnergy),
    lifetimeSavings: Math.round(lifetimeSavings),
    costPerDay: parseFloat(costPerDay.toFixed(2)),
    isCheaper: costPerKWh < gridCostPerKWh
  }
}

// ============================================
// INVERTER REPLACEMENT INTERVAL
// ============================================
export function calculateInverterReplacement({
  inverterType = 'string',
  continuousLoad,
  environment = 'climate',
  inverterCost
}) {
  if (continuousLoad <= 0 || inverterCost <= 0) return null

  // Base lifespan by type (years)
  const baseLife = {
    string: 12,
    hybrid: 10,
    microinverter: 20,
    optimizer: 22
  }[inverterType] || 12

  // Environment factor (higher = shorter life)
  const envFactor = {
    climate: 0.9,
    garage: 1.0,
    'outdoor-shade': 1.15,
    'outdoor-sun': 1.35
  }[environment] || 1.0

  // Load factor — running high or extremely low both stress components
  let loadFactor
  if (continuousLoad > 100) loadFactor = 1.4
  else if (continuousLoad > 80) loadFactor = 1.15
  else if (continuousLoad < 30) loadFactor = 1.05
  else loadFactor = 1.0

  // Adjusted lifespan
  const expectedLife = baseLife * (1 / envFactor) * (1 / loadFactor)

  const costPerYear = inverterCost / expectedLife

  // Replacements in 25-year horizon
  const replacementsIn25Years = Math.floor(25 / expectedLife)
  const total25YearCost = inverterCost * (replacementsIn25Years + 1)
  const effectiveCostPerYear25 = total25YearCost / 25

  // Warnings
  const warnings = []
  if (continuousLoad > 100) warnings.push('Running inverter above rated load shortens life by 40%+')
  if (environment === 'outdoor-sun') warnings.push('Direct sun exposure accelerates capacitor aging')
  if (continuousLoad < 30) warnings.push('Inverter oversized for load — consider a smaller unit')

  return {
    expectedLife: parseFloat(expectedLife.toFixed(1)),
    costPerYear: Math.round(costPerYear),
    replacementsIn25Years,
    total25YearCost: Math.round(total25YearCost),
    effectiveCostPerYear25: Math.round(effectiveCostPerYear25),
    loadFactor: parseFloat(loadFactor.toFixed(2)),
    envFactor: parseFloat(envFactor.toFixed(2)),
    warnings
  }
}