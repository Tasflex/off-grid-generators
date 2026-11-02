// lib/calc/logic/index.js
// Inputs and formulas for every device calculator. Imported by the client device, so no page copy here.
import { solarCalcs } from './solar'
import { batteryCalcs } from './battery'
import { inverterCalcs } from './inverter'
import { wiringCalcs } from './wiring'
import { locationCalcs } from './location'
import { builderCalcs } from './builder'
import { planningCalcs } from './planning'
import { performanceCalcs } from './performance'

const all = [...builderCalcs, ...solarCalcs, ...batteryCalcs, ...inverterCalcs, ...wiringCalcs, ...performanceCalcs, ...locationCalcs, ...planningCalcs]

// Keep each category's calculators in model-code order (SB-01, SB-02 … SB-07)
export const calcLogic = all.sort((a, b) => a.code.localeCompare(b.code))

export const getCalcLogic = slug => calcLogic.find(c => c.slug === slug)
