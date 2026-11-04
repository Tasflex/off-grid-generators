// lib/wiring/specs.js
// Diagram layouts for the data-driven wiring diagrams, rendered by lib/wiring/render.js.

export const diagramSpecs = {
  'dc-dc-charger-wiring': {
    width: 900, height: 480, title: 'DC-DC Charger Wiring: Alternator to House Battery',
    nodes: [
      { id: 'alt', type: 'vehicle', x: 40, y: 90, w: 140, h: 70, label: 'Alternator', sub: 'Engine running' },
      { id: 'start', type: 'battery', x: 40, y: 260, w: 140, h: 80, label: 'Starter Battery', sub: '12V lead-acid / AGM' },
      { id: 'f1', type: 'fuse', x: 250, y: 176, w: 60, h: 28, label: '60A', sub: 'Near starter battery' },
      { id: 'dcdc', type: 'dcdc', x: 380, y: 160, w: 170, h: 90, label: 'DC-DC Charger', sub: '30A, 12V → 12V' },
      { id: 'f2', type: 'fuse', x: 610, y: 176, w: 60, h: 28, label: '50A', sub: 'Near house battery' },
      { id: 'house', type: 'battery', x: 720, y: 160, w: 150, h: 90, label: 'House Battery', sub: '12V LiFePO4' },
      { id: 'ign', type: 'monitor', x: 380, y: 60, w: 170, h: 40, label: 'Ignition / D+ signal' },
      { id: 'gnd', type: 'ground', x: 411, y: 380, w: 40, h: 30, label: 'Chassis / common negative' }
    ],
    wires: [
      { from: 'alt.b', to: 'start.t', kind: 'pos', label: 'Charging' },
      { from: 'start.r:0.3', to: 'f1.l', kind: 'pos' },
      { from: 'f1.r', to: 'dcdc.l:0.3333', kind: 'pos', label: '6 AWG' },
      { from: 'dcdc.r:0.3333', to: 'f2.l', kind: 'pos' },
      { from: 'f2.r', to: 'house.l:0.3333', kind: 'pos' },
      { from: 'dcdc.r:0.75', to: 'house.l:0.75', kind: 'neg' },
      { from: 'dcdc.b:0.3', to: 'gnd.t', kind: 'neg' },
      { from: 'start.b', to: 'gnd.t', kind: 'neg' },
      { from: 'ign.b', to: 'dcdc.t', kind: 'signal' }
    ]
  },

  'dual-battery-vehicle': {
    width: 900, height: 500, title: 'Dual Battery Setup with a Voltage-Sensitive Relay',
    nodes: [
      { id: 'alt', type: 'vehicle', x: 40, y: 80, w: 140, h: 60, label: 'Alternator' },
      { id: 'start', type: 'battery', x: 40, y: 210, w: 140, h: 80, label: 'Starter Battery', sub: '12V' },
      { id: 'fa', type: 'fuse', x: 230, y: 236, w: 56, h: 28, label: '100A' },
      { id: 'vsr', type: 'switch', x: 330, y: 220, w: 140, h: 60, label: 'VSR / Isolator', sub: 'Joins at 13.3V+' },
      { id: 'fb', type: 'fuse', x: 520, y: 236, w: 56, h: 28, label: '100A' },
      { id: 'aux', type: 'battery', x: 620, y: 210, w: 150, h: 80, label: 'Auxiliary Battery', sub: '12V AGM' },
      { id: 'fblock', type: 'busbar', x: 620, y: 340, w: 150, h: 34, label: 'Fuse Block' },
      { id: 'fridge', type: 'load', x: 560, y: 410, w: 100, h: 40, label: 'Fridge' },
      { id: 'lights', type: 'load', x: 690, y: 410, w: 100, h: 40, label: 'Lights' },
      { id: 'gnd', type: 'ground', x: 380, y: 340, w: 40, h: 30, label: 'Chassis negative' }
    ],
    wires: [
      { from: 'alt.b', to: 'start.t', kind: 'pos' },
      { from: 'start.r:0.5', to: 'fa.l', kind: 'pos' },
      { from: 'fa.r', to: 'vsr.l', kind: 'pos' },
      { from: 'vsr.r', to: 'fb.l', kind: 'pos' },
      { from: 'fb.r', to: 'aux.l:0.5', kind: 'pos' },
      { from: 'aux.b:0.3', to: 'fblock.t:0.3', kind: 'pos' },
      { from: 'fblock.b:0.2', to: 'fridge.t', kind: 'pos', label: '15A' },
      { from: 'fblock.b:0.8', to: 'lights.t', kind: 'pos', label: '10A' },
      { from: 'start.b', to: 'gnd.t', kind: 'neg' },
      { from: 'vsr.b', to: 'gnd.t', kind: 'neg' },
      { from: 'aux.b:0.15', to: 'gnd.t', kind: 'neg', via: [[642, 320], [400, 320]] }
    ]
  },

  'shore-power-rv': {
    width: 900, height: 480, title: 'RV Shore Power, Inverter-Charger and Solar',
    nodes: [
      { id: 'shore', type: 'grid', x: 30, y: 80, w: 130, h: 60, label: 'Shore Power', sub: '30A pedestal' },
      { id: 'brk', type: 'breaker', x: 200, y: 92, w: 100, h: 36, label: '30A Breaker' },
      { id: 'inv', type: 'inverter', x: 350, y: 70, w: 180, h: 100, label: 'Inverter-Charger', sub: '3,000W, 12V' },
      { id: 'panel', type: 'acpanel', x: 590, y: 70, w: 140, h: 100, label: 'AC Panel', sub: 'Outlets, microwave' },
      { id: 'loads', type: 'load', x: 770, y: 95, w: 110, h: 50, label: 'AC Loads' },
      { id: 'fuse', type: 'fuse', x: 384, y: 215, w: 40, h: 28, label: 'T', sub: '' },
      { id: 'bat', type: 'battery', x: 350, y: 300, w: 180, h: 80, label: 'Battery Bank', sub: '12V LiFePO4' },
      { id: 'pv', type: 'panel', x: 700, y: 230, w: 150, h: 55, label: 'Roof Solar', sub: '400W' },
      { id: 'mppt', type: 'controller', x: 700, y: 320, w: 150, h: 55, label: 'MPPT Controller' },
      { id: 'gnd', type: 'ground', x: 250, y: 330, w: 40, h: 30, label: 'Chassis ground' }
    ],
    wires: [
      { from: 'shore.r', to: 'brk.l', kind: 'ac' },
      { from: 'brk.r', to: 'inv.l:0.4', kind: 'ac', label: 'AC in' },
      { from: 'inv.r:0.4', to: 'panel.l:0.4', kind: 'ac', label: 'AC out' },
      { from: 'panel.r:0.4', to: 'loads.l', kind: 'ac' },
      { from: 'inv.b:0.3', to: 'fuse.t', kind: 'pos' },
      { from: 'fuse.b', to: 'bat.t:0.3', kind: 'pos', label: '4/0 AWG' },
      { from: 'inv.b:0.7', to: 'bat.t:0.7', kind: 'neg' },
      { from: 'pv.b', to: 'mppt.t', kind: 'pv' },
      { from: 'mppt.l:0.35', to: 'bat.r:0.35', kind: 'pos' },
      { from: 'mppt.l:0.7', to: 'bat.r:0.7', kind: 'neg', via: [[620, 358.5], [620, 356]] },
      { from: 'inv.l:0.8', to: 'gnd.t', kind: 'gnd' }
    ]
  },

  'battery-monitor-shunt': {
    width: 900, height: 460, title: 'Battery Monitor and Shunt Wiring',
    nodes: [
      { id: 'bat', type: 'battery', x: 40, y: 180, w: 150, h: 90, label: 'Battery Bank', sub: '12V / 24V / 48V' },
      { id: 'fuse', type: 'fuse', x: 250, y: 184, w: 56, h: 28, label: 'Main fuse' },
      { id: 'sw', type: 'switch', x: 350, y: 178, w: 100, h: 40, label: 'Battery Switch' },
      { id: 'pbus', type: 'busbar', x: 520, y: 183, w: 180, h: 30, label: 'Positive Bus Bar' },
      { id: 'shunt', type: 'shunt', x: 350, y: 232, w: 100, h: 40, label: 'Shunt', sub: '500A / 50mV' },
      { id: 'nbus', type: 'busbar', x: 520, y: 237, w: 180, h: 30, label: 'Negative Bus Bar' },
      { id: 'mon', type: 'monitor', x: 340, y: 330, w: 120, h: 50, label: 'Battery Monitor', sub: 'SOC display' },
      { id: 'loads', type: 'load', x: 760, y: 160, w: 120, h: 120, label: 'All Loads', sub: '& Chargers' }
    ],
    wires: [
      { from: 'bat.r:0.2', to: 'fuse.l', kind: 'pos' },
      { from: 'fuse.r', to: 'sw.l', kind: 'pos' },
      { from: 'sw.r', to: 'pbus.l', kind: 'pos' },
      { from: 'bat.r:0.8', to: 'shunt.l', kind: 'neg', label: 'Battery side' },
      { from: 'shunt.r', to: 'nbus.l', kind: 'neg', label: 'System side' },
      { from: 'shunt.b', to: 'mon.t', kind: 'signal', label: 'Data cable' },
      { from: 'pbus.r', to: 'loads.l:0.3', kind: 'pos' },
      { from: 'nbus.r', to: 'loads.l:0.7', kind: 'neg' }
    ],
    notes: [{ x: 450, y: 420, anchor: 'middle', text: 'Nothing may connect directly to the battery negative: every amp must pass through the shunt.' }]
  },

  'dc-fuse-block-busbar': {
    width: 900, height: 470, title: '12V DC Distribution: Fuse Block and Bus Bars',
    nodes: [
      { id: 'sw', type: 'switch', x: 60, y: 90, w: 100, h: 36, label: 'Battery Switch' },
      { id: 'mf', type: 'fuse', x: 82, y: 160, w: 56, h: 28, label: 'Main', sub: '' },
      { id: 'bat', type: 'battery', x: 40, y: 230, w: 140, h: 90, label: 'Battery', sub: '12V 200Ah' },
      { id: 'fb', type: 'busbar', x: 250, y: 93, w: 600, h: 30, label: 'Fuse Block (+)' },
      { id: 'l1', type: 'load', x: 270, y: 200, w: 120, h: 50, label: 'LED Lights', sub: '6A' },
      { id: 'l2', type: 'load', x: 420, y: 200, w: 120, h: 50, label: '12V Fridge', sub: '5A' },
      { id: 'l3', type: 'load', x: 570, y: 200, w: 120, h: 50, label: 'USB / 12V Sockets', sub: '4A' },
      { id: 'l4', type: 'load', x: 720, y: 200, w: 120, h: 50, label: 'Water Pump', sub: '7A' },
      { id: 'nb', type: 'busbar', x: 250, y: 330, w: 600, h: 30, label: 'Negative Bus Bar' }
    ],
    wires: [
      { from: 'bat.t', to: 'mf.b', kind: 'pos' },
      { from: 'mf.t', to: 'sw.b', kind: 'pos' },
      { from: 'sw.r', to: 'fb.l', kind: 'pos' },
      { from: 'fb.b:0.1333', to: 'l1.t', kind: 'pos', label: '10A' },
      { from: 'fb.b:0.3833', to: 'l2.t', kind: 'pos', label: '10A' },
      { from: 'fb.b:0.6333', to: 'l3.t', kind: 'pos', label: '7.5A' },
      { from: 'fb.b:0.8833', to: 'l4.t', kind: 'pos', label: '10A' },
      { from: 'l1.b', to: 'nb.t:0.1333', kind: 'neg' },
      { from: 'l2.b', to: 'nb.t:0.3833', kind: 'neg' },
      { from: 'l3.b', to: 'nb.t:0.6333', kind: 'neg' },
      { from: 'l4.b', to: 'nb.t:0.8833', kind: 'neg' },
      { from: 'bat.r:0.7', to: 'nb.l', kind: 'neg' }
    ],
    notes: [{ x: 550, y: 400, anchor: 'middle', text: 'Size each fuse to protect its wire, not the device: about 125% of the circuit current, never above the wire rating.' }]
  },

  'portable-panel-power-station': {
    width: 900, height: 470, title: 'Portable Solar Panels to a Power Station',
    nodes: [
      { id: 'p1', type: 'panel', x: 180, y: 70, w: 150, h: 60, label: 'Panel 1', sub: '100W, Voc 22V' },
      { id: 'p2', type: 'panel', x: 400, y: 70, w: 150, h: 60, label: 'Panel 2', sub: '100W, Voc 22V' },
      { id: 'ad', type: 'load', x: 270, y: 200, w: 170, h: 40, label: 'MC4 → XT60 Adapter' },
      { id: 'ps', type: 'station', x: 270, y: 290, w: 170, h: 90, label: 'Power Station', sub: 'Solar input 12-60V' },
      { id: 'ac', type: 'load', x: 560, y: 290, w: 150, h: 40, label: 'AC Loads' },
      { id: 'dc', type: 'load', x: 560, y: 345, w: 150, h: 40, label: '12V / USB Loads' }
    ],
    wires: [
      { from: 'p1.r', to: 'p2.l', kind: 'pv', label: 'Series' },
      { from: 'p1.b', to: 'ad.t:0.2', kind: 'pv', label: '−' },
      { from: 'p2.b', to: 'ad.t:0.8', kind: 'pv', label: '+' },
      { from: 'ad.b', to: 'ps.t', kind: 'pv', label: '44V, 5.5A' },
      { from: 'ps.r:0.222', to: 'ac.l', kind: 'ac' },
      { from: 'ps.r:0.833', to: 'dc.l', kind: 'pos' }
    ],
    notes: [{ x: 600, y: 150, text: 'Series: voltages add (22V + 22V = 44V).' }, { x: 600, y: 168, text: 'Keep string Voc below the station\'s max input.' }]
  },

  'multiple-charge-controllers': {
    width: 900, height: 470, title: 'Two Charge Controllers on One Battery Bank',
    nodes: [
      { id: 'pa', type: 'panel', x: 80, y: 60, w: 160, h: 55, label: 'Array A (Roof)', sub: '2 × 200W' },
      { id: 'ma', type: 'controller', x: 80, y: 160, w: 160, h: 60, label: 'MPPT A', sub: '40A' },
      { id: 'pb', type: 'panel', x: 660, y: 60, w: 160, h: 55, label: 'Array B (Portable)', sub: '200W' },
      { id: 'mb', type: 'controller', x: 660, y: 160, w: 160, h: 60, label: 'MPPT B', sub: '20A' },
      { id: 'fa', type: 'fuse', x: 180, y: 255, w: 40, h: 28, label: '50A' },
      { id: 'fbz', type: 'fuse', x: 680, y: 255, w: 40, h: 28, label: '25A' },
      { id: 'bat', type: 'battery', x: 340, y: 330, w: 220, h: 90, label: 'Battery Bank', sub: '12V 300Ah' }
    ],
    wires: [
      { from: 'pa.b', to: 'ma.t', kind: 'pv' },
      { from: 'pb.b', to: 'mb.t', kind: 'pv' },
      { from: 'ma.b:0.75', to: 'fa.t', kind: 'pos' },
      { from: 'fa.b', to: 'bat.l:0.3', kind: 'pos' },
      { from: 'ma.b:0.3', to: 'bat.l:0.7', kind: 'neg' },
      { from: 'mb.b:0.25', to: 'fbz.t', kind: 'pos' },
      { from: 'fbz.b', to: 'bat.r:0.3', kind: 'pos' },
      { from: 'mb.b:0.7', to: 'bat.r:0.7', kind: 'neg' }
    ],
    notes: [{ x: 450, y: 150, anchor: 'middle', text: 'Each controller charges independently.' }, { x: 450, y: 168, anchor: 'middle', text: 'Set both to the same charge voltages.' }]
  },

  'east-west-array': {
    width: 900, height: 470, title: 'East-West Split Array on a Dual-MPPT Inverter',
    nodes: [
      { id: 'e', type: 'panel', x: 40, y: 80, w: 180, h: 60, label: 'East String', sub: '5 × 400W' },
      { id: 'w', type: 'panel', x: 40, y: 290, w: 180, h: 60, label: 'West String', sub: '5 × 400W' },
      { id: 'de', type: 'switch', x: 260, y: 92, w: 110, h: 36, label: 'PV Disconnect' },
      { id: 'dw', type: 'switch', x: 260, y: 302, w: 110, h: 36, label: 'PV Disconnect' },
      { id: 'inv', type: 'inverter', x: 440, y: 140, w: 200, h: 150, label: 'Hybrid Inverter', sub: '2 MPPT inputs' },
      { id: 'ac', type: 'acpanel', x: 710, y: 180, w: 150, h: 70, label: 'AC Panel' },
      { id: 'bat', type: 'battery', x: 440, y: 340, w: 200, h: 60, label: 'Battery', sub: '48V' }
    ],
    wires: [
      { from: 'e.r', to: 'de.l', kind: 'pv' },
      { from: 'de.r', to: 'inv.l:0.25', kind: 'pv', label: 'MPPT 1' },
      { from: 'w.r', to: 'dw.l', kind: 'pv' },
      { from: 'dw.r', to: 'inv.l:0.75', kind: 'pv', label: 'MPPT 2' },
      { from: 'inv.r:0.5', to: 'ac.l', kind: 'ac' },
      { from: 'inv.b:0.35', to: 'bat.t:0.35', kind: 'pos' },
      { from: 'inv.b:0.65', to: 'bat.t:0.65', kind: 'neg' }
    ],
    notes: [{ x: 40, y: 200, text: 'Different roof faces peak at different times,' }, { x: 40, y: 216, text: 'so each string needs its own MPPT input.' }]
  },

  'parallel-battery-bank-balanced': {
    width: 900, height: 450, title: 'Balanced Parallel Battery Bank (Diagonal Wiring)',
    nodes: [
      { id: 'b1', type: 'battery', x: 80, y: 200, w: 140, h: 80, label: 'Battery 1', sub: '12V 100Ah' },
      { id: 'b2', type: 'battery', x: 260, y: 200, w: 140, h: 80, label: 'Battery 2', sub: '12V 100Ah' },
      { id: 'b3', type: 'battery', x: 440, y: 200, w: 140, h: 80, label: 'Battery 3', sub: '12V 100Ah' },
      { id: 'b4', type: 'battery', x: 620, y: 200, w: 140, h: 80, label: 'Battery 4', sub: '12V 100Ah' },
      { id: 'fuse', type: 'fuse', x: 500, y: 76, w: 56, h: 28, label: '300A' },
      { id: 'sys', type: 'inverter', x: 700, y: 60, w: 170, h: 60, label: 'To Loads / Inverter', sub: '12V 400Ah total' }
    ],
    wires: [
      { from: 'b1.t:0.25', to: 'b2.t:0.25', kind: 'pos', via: [[115, 170], [295, 170]] },
      { from: 'b2.t:0.25', to: 'b3.t:0.25', kind: 'pos', via: [[295, 170], [475, 170]] },
      { from: 'b3.t:0.25', to: 'b4.t:0.25', kind: 'pos', via: [[475, 170], [655, 170]] },
      { from: 'b1.b:0.75', to: 'b2.b:0.75', kind: 'neg', via: [[185, 310], [365, 310]] },
      { from: 'b2.b:0.75', to: 'b3.b:0.75', kind: 'neg', via: [[365, 310], [545, 310]] },
      { from: 'b3.b:0.75', to: 'b4.b:0.75', kind: 'neg', via: [[545, 310], [725, 310]] },
      { from: 'b1.t:0.25', to: 'fuse.l', kind: 'pos', via: [[115, 90]], label: 'Main +' },
      { from: 'fuse.r', to: 'sys.l', kind: 'pos' },
      { from: 'b4.b:0.75', to: 'sys.b:0.8', kind: 'neg', via: [[725, 350], [836, 350]], label: 'Main −' }
    ],
    notes: [{ x: 420, y: 395, anchor: 'middle', text: 'Use equal-length, equal-gauge links between batteries.' }]
  },

  'system-grounding': {
    width: 900, height: 480, title: 'Off-Grid Solar Grounding and Bonding',
    nodes: [
      { id: 'pv', type: 'panel', x: 40, y: 70, w: 150, h: 60, label: 'Array + Racking' },
      { id: 'cc', type: 'controller', x: 260, y: 70, w: 150, h: 60, label: 'Charge Controller' },
      { id: 'inv', type: 'inverter', x: 480, y: 70, w: 150, h: 60, label: 'Inverter' },
      { id: 'ac', type: 'acpanel', x: 700, y: 70, w: 150, h: 60, label: 'AC Panel', sub: 'N-G bond (one place)' },
      { id: 'bat', type: 'battery', x: 370, y: 190, w: 150, h: 60, label: 'Battery Bank' },
      { id: 'gb', type: 'busbar', x: 40, y: 330, w: 760, h: 26, label: 'Ground Bus Bar' },
      { id: 'rod', type: 'ground', x: 820, y: 360, w: 40, h: 30, label: 'Ground Rod' }
    ],
    wires: [
      { from: 'pv.r', to: 'cc.l', kind: 'pv' },
      { from: 'cc.b:0.3', to: 'bat.l:0.3', kind: 'pos' },
      { from: 'cc.b:0.7', to: 'bat.t:0.2', kind: 'neg' },
      { from: 'bat.t:0.8', to: 'inv.b:0.2', kind: 'pos' },
      { from: 'bat.r:0.3', to: 'inv.b:0.7', kind: 'neg' },
      { from: 'inv.r', to: 'ac.l', kind: 'ac' },
      { from: 'pv.b', to: 'gb.t:0.0987', kind: 'gnd' },
      { from: 'cc.b:0.05', to: 'gb.t:0.2993', kind: 'gnd' },
      { from: 'bat.b:0.3', to: 'gb.t:0.4934', kind: 'gnd', label: 'Single DC bond' },
      { from: 'inv.b:0.95', to: 'gb.t:0.7664', kind: 'gnd' },
      { from: 'ac.b', to: 'gb.t:0.9671', kind: 'gnd' },
      { from: 'gb.r', to: 'rod.t', kind: 'gnd' }
    ]
  },

  'ac-subpanel': {
    width: 900, height: 470, title: 'Inverter to Critical Loads Subpanel',
    nodes: [
      { id: 'bat', type: 'battery', x: 40, y: 200, w: 140, h: 80, label: 'Battery', sub: '48V' },
      { id: 'inv', type: 'inverter', x: 240, y: 190, w: 160, h: 100, label: 'Inverter', sub: 'Pure sine, 6kW' },
      { id: 'sp', type: 'acpanel', x: 470, y: 120, w: 160, h: 240, label: 'Critical Loads', sub: 'Subpanel' },
      { id: 'c1', type: 'load', x: 710, y: 140, w: 170, h: 44, label: 'Kitchen Outlets', sub: '20A' },
      { id: 'c2', type: 'load', x: 710, y: 200, w: 170, h: 44, label: 'Refrigerator', sub: '15A' },
      { id: 'c3', type: 'load', x: 710, y: 260, w: 170, h: 44, label: 'Lighting', sub: '15A' },
      { id: 'c4', type: 'load', x: 710, y: 320, w: 170, h: 44, label: 'Furnace Blower', sub: '15A' },
      { id: 'gnd', type: 'ground', x: 530, y: 390, w: 40, h: 30, label: 'Ground rod' }
    ],
    wires: [
      { from: 'bat.r:0.3', to: 'inv.l:0.34', kind: 'pos' },
      { from: 'bat.r:0.7', to: 'inv.l:0.66', kind: 'neg' },
      { from: 'inv.r', to: 'sp.l:0.5', kind: 'ac', label: 'Feeder' },
      { from: 'sp.r:0.175', to: 'c1.l', kind: 'ac' },
      { from: 'sp.r:0.425', to: 'c2.l', kind: 'ac' },
      { from: 'sp.r:0.675', to: 'c3.l', kind: 'ac' },
      { from: 'sp.r:0.925', to: 'c4.l', kind: 'ac' },
      { from: 'sp.b', to: 'gnd.t', kind: 'gnd' }
    ]
  },

  'generator-backup-off-grid': {
    width: 900, height: 470, title: 'Generator Backup for an Off-Grid Inverter-Charger',
    nodes: [
      { id: 'gen', type: 'generator', x: 40, y: 80, w: 150, h: 70, label: 'Generator', sub: '3,500W inverter gen' },
      { id: 'brk', type: 'breaker', x: 240, y: 97, w: 100, h: 36, label: 'Input Breaker' },
      { id: 'inv', type: 'inverter', x: 380, y: 80, w: 190, h: 120, label: 'Inverter-Charger', sub: '48V, 5kW' },
      { id: 'ac', type: 'acpanel', x: 640, y: 95, w: 140, h: 90, label: 'AC Loads Panel' },
      { id: 'bat', type: 'battery', x: 380, y: 300, w: 190, h: 80, label: 'Battery Bank', sub: '48V LiFePO4' },
      { id: 'pv', type: 'panel', x: 640, y: 240, w: 160, h: 55, label: 'Solar Array' },
      { id: 'mppt', type: 'controller', x: 640, y: 330, w: 160, h: 55, label: 'MPPT Controller' }
    ],
    wires: [
      { from: 'gen.r:0.5', to: 'brk.l', kind: 'ac' },
      { from: 'brk.r', to: 'inv.l:0.2917', kind: 'ac', label: 'AC in' },
      { from: 'inv.l:0.8', to: 'gen.b', kind: 'signal', label: 'Auto-start (2-wire)' },
      { from: 'inv.r:0.3', to: 'ac.l:0.2333', kind: 'ac', label: 'AC out' },
      { from: 'inv.b:0.3', to: 'bat.t:0.3', kind: 'pos' },
      { from: 'inv.b:0.7', to: 'bat.t:0.7', kind: 'neg' },
      { from: 'pv.b', to: 'mppt.t', kind: 'pv' },
      { from: 'mppt.l:0.35', to: 'bat.r:0.35', kind: 'pos' },
      { from: 'mppt.l:0.75', to: 'bat.r:0.75', kind: 'neg', via: [[620, 371.25], [620, 360]] }
    ]
  },

  'grid-tie-microinverter': {
    width: 900, height: 450, title: 'Grid-Tie Solar with Microinverters',
    nodes: [
      { id: 'p1', type: 'panel', x: 40, y: 70, w: 130, h: 55, label: 'Panel', sub: '400W' },
      { id: 'p2', type: 'panel', x: 190, y: 70, w: 130, h: 55, label: 'Panel', sub: '400W' },
      { id: 'p3', type: 'panel', x: 340, y: 70, w: 130, h: 55, label: 'Panel', sub: '400W' },
      { id: 'p4', type: 'panel', x: 490, y: 70, w: 130, h: 55, label: 'Panel', sub: '400W' },
      { id: 'm1', type: 'inverter', x: 65, y: 150, w: 80, h: 30, label: 'Micro' },
      { id: 'm2', type: 'inverter', x: 215, y: 150, w: 80, h: 30, label: 'Micro' },
      { id: 'm3', type: 'inverter', x: 365, y: 150, w: 80, h: 30, label: 'Micro' },
      { id: 'm4', type: 'inverter', x: 515, y: 150, w: 80, h: 30, label: 'Micro' },
      { id: 'trunk', type: 'busbar', x: 40, y: 220, w: 580, h: 22, label: 'AC Trunk Cable (240V)' },
      { id: 'jb', type: 'load', x: 690, y: 211, w: 130, h: 40, label: 'Junction Box' },
      { id: 'disc', type: 'switch', x: 690, y: 280, w: 130, h: 40, label: 'AC Disconnect' },
      { id: 'mp', type: 'acpanel', x: 690, y: 345, w: 130, h: 50, label: 'Main Panel', sub: '20A 2-pole breaker' },
      { id: 'meter', type: 'load', x: 500, y: 345, w: 120, h: 50, label: 'Utility Meter', sub: 'Net meter' },
      { id: 'grid', type: 'grid', x: 320, y: 345, w: 120, h: 50, label: 'Utility Grid' }
    ],
    wires: [
      { from: 'p1.b', to: 'm1.t', kind: 'pv' },
      { from: 'p2.b', to: 'm2.t', kind: 'pv' },
      { from: 'p3.b', to: 'm3.t', kind: 'pv' },
      { from: 'p4.b', to: 'm4.t', kind: 'pv' },
      { from: 'm1.b', to: 'trunk.t:0.1121', kind: 'ac' },
      { from: 'm2.b', to: 'trunk.t:0.3707', kind: 'ac' },
      { from: 'm3.b', to: 'trunk.t:0.6293', kind: 'ac' },
      { from: 'm4.b', to: 'trunk.t:0.8879', kind: 'ac' },
      { from: 'trunk.r', to: 'jb.l', kind: 'ac' },
      { from: 'jb.b', to: 'disc.t', kind: 'ac' },
      { from: 'disc.b', to: 'mp.t', kind: 'ac' },
      { from: 'mp.l', to: 'meter.r', kind: 'ac' },
      { from: 'meter.l', to: 'grid.r', kind: 'ac' }
    ]
  },

  'hybrid-inverter-battery': {
    width: 900, height: 520, title: 'Hybrid Inverter with Battery Backup',
    nodes: [
      { id: 'grid', type: 'grid', x: 40, y: 80, w: 120, h: 60, label: 'Utility Grid' },
      { id: 'meter', type: 'load', x: 200, y: 92, w: 100, h: 36, label: 'Meter' },
      { id: 'mp', type: 'acpanel', x: 340, y: 70, w: 140, h: 80, label: 'Main Panel', sub: 'Non-backed loads' },
      { id: 'pv', type: 'panel', x: 600, y: 60, w: 170, h: 55, label: 'Solar Array', sub: '6kW' },
      { id: 'inv', type: 'inverter', x: 340, y: 220, w: 170, h: 110, label: 'Hybrid Inverter', sub: '48V, 8kW' },
      { id: 'bp', type: 'acpanel', x: 600, y: 251, w: 170, h: 70, label: 'Backup Loads Panel' },
      { id: 'bat', type: 'battery', x: 340, y: 400, w: 170, h: 55, label: 'Battery', sub: '48V 15kWh' }
    ],
    wires: [
      { from: 'grid.r', to: 'meter.l', kind: 'ac' },
      { from: 'meter.r', to: 'mp.l:0.5', kind: 'ac' },
      { from: 'mp.b:0.3214', to: 'inv.t:0.2647', kind: 'ac', label: 'Grid port' },
      { from: 'mp.b:0.75', to: 'inv.t:0.6176', kind: 'signal', label: 'CT clamp' },
      { from: 'pv.l', to: 'inv.t:0.9', kind: 'pv' },
      { from: 'inv.r:0.6', to: 'bp.l', kind: 'ac', label: 'Backup port' },
      { from: 'inv.b:0.3', to: 'bat.t:0.3', kind: 'pos' },
      { from: 'inv.b:0.7', to: 'bat.t:0.7', kind: 'neg' }
    ]
  },

  'split-phase-240v-inverters': {
    width: 900, height: 470, title: 'Two Stacked Inverters for 120/240V Split-Phase',
    nodes: [
      { id: 'bat', type: 'battery', x: 30, y: 150, w: 120, h: 110, label: 'Battery', sub: '48V' },
      { id: 'i1', type: 'inverter', x: 200, y: 90, w: 170, h: 80, label: 'Inverter 1 (L1)', sub: '120V' },
      { id: 'i2', type: 'inverter', x: 200, y: 240, w: 170, h: 80, label: 'Inverter 2 (L2)', sub: '120V, 180° shifted' },
      { id: 'panel', type: 'acpanel', x: 470, y: 110, w: 170, h: 190, label: '120/240V Panel' },
      { id: 'l240', type: 'load', x: 700, y: 130, w: 170, h: 55, label: '240V Well Pump', sub: 'L1 + L2' },
      { id: 'l120', type: 'load', x: 700, y: 225, w: 170, h: 55, label: '120V Circuits', sub: 'L1 or L2 + N' },
      { id: 'gnd', type: 'ground', x: 535, y: 340, w: 40, h: 30, label: 'N-G bond / ground rod' }
    ],
    wires: [
      { from: 'bat.r:0.15', to: 'i1.l:0.5', kind: 'pos', via: [[165, 166.5], [165, 130]] },
      { from: 'bat.r:0.35', to: 'i1.l:0.8', kind: 'neg', via: [[185, 188.5], [185, 154]] },
      { from: 'bat.r:0.65', to: 'i2.l:0.3', kind: 'pos', via: [[165, 221.5], [165, 264]] },
      { from: 'bat.r:0.85', to: 'i2.l:0.6', kind: 'neg', via: [[185, 243.5], [185, 288]] },
      { from: 'i1.b', to: 'i2.t', kind: 'signal', label: 'Sync cable' },
      { from: 'i1.r:0.5', to: 'panel.l:0.1053', kind: 'ac', label: 'L1' },
      { from: 'i1.r:0.85', to: 'panel.l:0.2526', kind: 'ac', label: 'N' },
      { from: 'i2.r:0.25', to: 'panel.l:0.7895', kind: 'ac', label: 'N' },
      { from: 'i2.r:0.6', to: 'panel.l:0.9368', kind: 'ac', label: 'L2' },
      { from: 'panel.r:0.25', to: 'l240.l', kind: 'ac' },
      { from: 'panel.r:0.75', to: 'l120.l', kind: 'ac' },
      { from: 'panel.b', to: 'gnd.t', kind: 'gnd' }
    ]
  },

  'power-station-home-inlet': {
    width: 900, height: 470, title: 'Power Station to Home Panel via Inlet and Interlock',
    nodes: [
      { id: 'ps', type: 'station', x: 40, y: 170, w: 150, h: 90, label: 'Power Station', sub: '30A output' },
      { id: 'inlet', type: 'load', x: 260, y: 188, w: 130, h: 54, label: 'Power Inlet Box', sub: 'L14-30 / TT-30' },
      { id: 'mp', type: 'acpanel', x: 470, y: 120, w: 180, h: 190, label: 'Main Panel', sub: 'with Interlock Kit' },
      { id: 'meter', type: 'grid', x: 720, y: 50, w: 140, h: 55, label: 'Utility Meter' },
      { id: 'c1', type: 'load', x: 720, y: 200, w: 140, h: 45, label: 'Fridge Circuit' },
      { id: 'c2', type: 'load', x: 720, y: 262, w: 140, h: 45, label: 'Furnace Circuit' },
      { id: 'gnd', type: 'ground', x: 540, y: 350, w: 40, h: 30, label: 'Grounding electrode' }
    ],
    wires: [
      { from: 'ps.r', to: 'inlet.l', kind: 'ac', label: '30A cord' },
      { from: 'inlet.r', to: 'mp.l:0.5', kind: 'ac', label: 'Backfeed breaker' },
      { from: 'meter.b', to: 'mp.r:0.15', kind: 'ac', label: 'Main OFF in outage' },
      { from: 'mp.r:0.5395', to: 'c1.l', kind: 'ac' },
      { from: 'mp.r:0.8658', to: 'c2.l', kind: 'ac' },
      { from: 'mp.b', to: 'gnd.t', kind: 'gnd' }
    ],
    notes: [{ x: 40, y: 420, text: 'The interlock makes it impossible to turn on the main breaker and the backfeed breaker at the same time.' }]
  },

  'van-complete-system': {
    width: 900, height: 500, title: 'Complete Campervan Electrical System',
    nodes: [
      { id: 'pv', type: 'panel', x: 40, y: 60, w: 150, h: 50, label: 'Roof Solar', sub: '400W' },
      { id: 'mppt', type: 'controller', x: 40, y: 130, w: 150, h: 50, label: 'MPPT 40A' },
      { id: 'alt', type: 'vehicle', x: 40, y: 230, w: 150, h: 50, label: 'Alternator' },
      { id: 'dcdc', type: 'dcdc', x: 40, y: 310, w: 150, h: 50, label: 'DC-DC 30A' },
      { id: 'fb', type: 'busbar', x: 480, y: 50, w: 180, h: 40, label: 'Fuse Block → DC Loads' },
      { id: 'pbus', type: 'busbar', x: 300, y: 110, w: 300, h: 26, label: '+ Bus Bar' },
      { id: 'bat', type: 'battery', x: 380, y: 200, w: 200, h: 80, label: 'LiFePO4 Battery', sub: '12V 300Ah' },
      { id: 'shunt', type: 'shunt', x: 420, y: 330, w: 100, h: 36, label: 'Shunt' },
      { id: 'nbus', type: 'busbar', x: 300, y: 410, w: 300, h: 26, label: '− Bus Bar' },
      { id: 'shore', type: 'grid', x: 700, y: 40, w: 150, h: 50, label: 'Shore Power' },
      { id: 'inv', type: 'inverter', x: 700, y: 130, w: 150, h: 70, label: 'Inverter-Charger', sub: '2,000W' },
      { id: 'out', type: 'load', x: 700, y: 240, w: 150, h: 45, label: 'AC Outlets' }
    ],
    wires: [
      { from: 'pv.b', to: 'mppt.t', kind: 'pv' },
      { from: 'mppt.r', to: 'pbus.l', kind: 'pos' },
      { from: 'alt.b', to: 'dcdc.t', kind: 'pos' },
      { from: 'dcdc.r', to: 'pbus.b:0.1', kind: 'pos' },
      { from: 'pbus.b:0.5', to: 'bat.t:0.35', kind: 'pos', label: 'Class T fuse' },
      { from: 'pbus.t:0.9', to: 'fb.b:0.5', kind: 'pos' },
      { from: 'pbus.r', to: 'inv.l:0.3', kind: 'pos' },
      { from: 'bat.b:0.5', to: 'shunt.t:0.6', kind: 'neg' },
      { from: 'shunt.b:0.5', to: 'nbus.t:0.5667', kind: 'neg' },
      { from: 'nbus.r', to: 'inv.l:0.8', kind: 'neg' },
      { from: 'shore.b', to: 'inv.t', kind: 'ac' },
      { from: 'inv.b', to: 'out.t', kind: 'ac' }
    ],
    notes: [{ x: 40, y: 400, text: 'Source and load negatives also' }, { x: 40, y: 416, text: 'land on the − bus bar.' }]
  },

  'marine-dual-bank': {
    width: 900, height: 520, title: 'Boat Dual Battery Bank: Start + House',
    nodes: [
      { id: 'eng', type: 'vehicle', x: 40, y: 70, w: 150, h: 55, label: 'Engine', sub: 'Starter + alternator' },
      { id: 'sw', type: 'switch', x: 370, y: 160, w: 140, h: 50, label: 'Battery Switch', sub: '1 / 2 / Both / Off' },
      { id: 'dc', type: 'acpanel', x: 690, y: 80, w: 150, h: 70, label: 'DC Panel', sub: 'House circuits' },
      { id: 'start', type: 'battery', x: 60, y: 300, w: 150, h: 80, label: 'Start Battery', sub: 'Cranking' },
      { id: 'acr', type: 'switch', x: 370, y: 316, w: 140, h: 48, label: 'ACR / VSR' },
      { id: 'house', type: 'battery', x: 690, y: 300, w: 150, h: 80, label: 'House Bank', sub: 'Deep cycle' },
      { id: 'chg', type: 'station', x: 370, y: 420, w: 140, h: 40, label: 'Shore Charger' }
    ],
    wires: [
      { from: 'start.t', to: 'sw.l:0.5', kind: 'pos', label: '1' },
      { from: 'house.t:0.3', to: 'sw.r:0.5', kind: 'pos', label: '2' },
      { from: 'sw.t', to: 'eng.r', kind: 'pos', label: 'COM' },
      { from: 'start.r', to: 'acr.l', kind: 'pos' },
      { from: 'acr.r', to: 'house.l', kind: 'pos' },
      { from: 'house.t:0.8', to: 'dc.b:0.8', kind: 'pos' },
      { from: 'start.b', to: 'chg.l:0.3', kind: 'pos', label: 'Bank 1' },
      { from: 'house.b', to: 'chg.r:0.3', kind: 'pos', label: 'Bank 2' }
    ],
    notes: [{ x: 450, y: 290, anchor: 'middle', text: 'All negatives join at a common negative bus.' }]
  },

  'shed-solar-system': {
    width: 900, height: 470, title: 'Small Shed Solar System (12V)',
    nodes: [
      { id: 'pv', type: 'panel', x: 40, y: 70, w: 170, h: 60, label: 'Solar Panel', sub: '200W' },
      { id: 'cc', type: 'controller', x: 320, y: 70, w: 170, h: 70, label: 'Charge Controller', sub: '20A MPPT' },
      { id: 'lights', type: 'load', x: 600, y: 75, w: 150, h: 45, label: 'LED Lights', sub: 'Load output' },
      { id: 'f1', type: 'fuse', x: 385, y: 185, w: 40, h: 28, label: '30A' },
      { id: 'bat', type: 'battery', x: 320, y: 260, w: 170, h: 80, label: 'Battery', sub: '12V 100Ah LiFePO4' },
      { id: 'f2', type: 'fuse', x: 540, y: 270, w: 50, h: 28, label: '40A' },
      { id: 'inv', type: 'inverter', x: 640, y: 255, w: 140, h: 60, label: 'Inverter', sub: '300W pure sine' },
      { id: 'out', type: 'load', x: 640, y: 375, w: 140, h: 40, label: 'Outlet' },
      { id: 'gnd', type: 'ground', x: 105, y: 330, w: 40, h: 30, label: 'Ground rod' }
    ],
    wires: [
      { from: 'pv.r', to: 'cc.l:0.4286', kind: 'pv' },
      { from: 'cc.b:0.5', to: 'f1.t', kind: 'pos' },
      { from: 'f1.b', to: 'bat.t:0.5', kind: 'pos' },
      { from: 'cc.b:0.8', to: 'bat.t:0.8', kind: 'neg' },
      { from: 'cc.r:0.4', to: 'lights.l', kind: 'pos' },
      { from: 'bat.r:0.3', to: 'f2.l', kind: 'pos' },
      { from: 'f2.r', to: 'inv.l:0.4833', kind: 'pos' },
      { from: 'bat.r:0.75', to: 'inv.l:0.9', kind: 'neg' },
      { from: 'inv.b', to: 'out.t', kind: 'ac' },
      { from: 'pv.b', to: 'gnd.t', kind: 'gnd' }
    ]
  },

  'solar-water-pump': {
    width: 900, height: 470, title: 'Solar-Direct Water Pump System',
    nodes: [
      { id: 'pv', type: 'panel', x: 40, y: 70, w: 170, h: 60, label: 'Solar Array', sub: '4 × 300W' },
      { id: 'disc', type: 'switch', x: 290, y: 82, w: 110, h: 36, label: 'DC Disconnect' },
      { id: 'ctl', type: 'controller', x: 480, y: 70, w: 170, h: 70, label: 'Pump Controller', sub: 'MPPT, soft start' },
      { id: 'tank', type: 'load', x: 720, y: 70, w: 150, h: 70, label: 'Storage Tank' },
      { id: 'float', type: 'monitor', x: 720, y: 200, w: 150, h: 40, label: 'Float Switch (tank)' },
      { id: 'pump', type: 'pump', x: 480, y: 330, w: 170, h: 60, label: 'Submersible Pump', sub: 'DC brushless' },
      { id: 'gnd', type: 'ground', x: 400, y: 260, w: 40, h: 30, label: 'Ground' }
    ],
    wires: [
      { from: 'pv.r', to: 'disc.l', kind: 'pv' },
      { from: 'disc.r', to: 'ctl.l:0.4286', kind: 'pv' },
      { from: 'ctl.b', to: 'pump.t', kind: 'pos', label: 'Pump cable (+/−)' },
      { from: 'ctl.r:0.8', to: 'float.l', kind: 'signal', label: 'Float' },
      { from: 'ctl.l:0.9', to: 'gnd.t', kind: 'gnd' }
    ],
    notes: [{ x: 680, y: 365, text: 'Water pipe runs from the' }, { x: 680, y: 381, text: 'pump up to the tank.' }]
  }
}
