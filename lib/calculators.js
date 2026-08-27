// Solar sizing calculator logic
export function calculateSolarSystem(selectedAppliances, customDevices) {
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
  if (requiredBatteryWh < 1200) {
    tier = 'compact'
    recommendation = 'Compact Weekend / Tailgate Setup'
    products = ['jackery-explorer-1000-pro', 'ecoflow-river-2-max']
  } else if (requiredBatteryWh < 3600) {
    tier = 'home'
    recommendation = 'Home Emergency Essentials Setup'
    products = ['bluetti-ac200max', 'ecoflow-delta-2-max']
  } else {
    tier = 'offgrid'
    recommendation = 'Full Off-Grid / Heavy Duty Backup'
    products = ['ecoflow-delta-pro', 'bluetti-ac200max-b230']
  }
  
  return {
    totalWh: Math.round(totalWh),
    requiredBatteryWh: Math.round(requiredBatteryWh),
    tier,
    recommendation,
    products
  }
}

// Battery runtime calculator
export function calculateBatteryRuntime(batteryCapacityWh, deviceWatts) {
  const runtimeHours = (batteryCapacityWh * 0.85) / deviceWatts
  return {
    runtimeHours: runtimeHours.toFixed(2),
    capacityAvailable: Math.round(batteryCapacityWh * 0.85)
  }
}

// Off-grid budget calculator
export function calculateBudget(totalWh, dailyHours, daysBackup) {
  const totalDailyWh = totalWh * dailyHours
  const totalRequiredWh = totalDailyWh * daysBackup
  
  const systemCosts = {
    battery: totalRequiredWh * 0.5, // $0.50 per Wh for batteries
    solar: totalRequiredWh * 0.3, // $0.30 per Wh for solar panels
    inverter: 500, // Average inverter cost
    installation: totalRequiredWh * 0.1 // $0.10 per Wh for installation
  }
  
  return {
    totalRequiredWh: Math.round(totalRequiredWh),
    estimatedCost: Math.round(Object.values(systemCosts).reduce((a, b) => a + b, 0)),
    breakdown: systemCosts
  }
}