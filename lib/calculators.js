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
    totalRunningWatts += device.watts || 0
    totalSurgeWatts += device.surgeWatts || (device.watts * 3) || 0
    totalDailyWh += (device.watts || 0) * (device.hours || 0)
  })
  
  // Inverter sizing (add 20% safety margin)
  const recommendedInverterWatts = Math.ceil(totalRunningWatts * 1.2)
  const recommendedSurgeWatts = Math.ceil(totalSurgeWatts * 1.2)
  
  return {
    totalRunningWatts,
    totalSurgeWatts,
    totalDailyWh: Math.round(totalDailyWh),
    recommendedInverterWatts,
    recommendedSurgeWatts,
    notes: totalSurgeWatts > totalRunningWatts 
      ? 'Your inverter must handle surge watts for motor-driven appliances'
      : 'Inverter sizing is adequate for running watts'
  }
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