// lib/calc/logic/index.js
// Inputs and formulas for every device calculator. Imported by the client device, so no page copy here.
import { solarCalcs } from './solar'
import { batteryCalcs } from './battery'
import { inverterCalcs } from './inverter'
import { wiringCalcs } from './wiring'
import { locationCalcs } from './location'
import { builderCalcs } from './builder'

export const calcLogic = [...builderCalcs, ...solarCalcs, ...batteryCalcs, ...inverterCalcs, ...wiringCalcs, ...locationCalcs]

export const getCalcLogic = slug => calcLogic.find(c => c.slug === slug)
