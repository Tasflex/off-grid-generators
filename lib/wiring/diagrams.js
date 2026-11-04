// lib/wiring/diagrams.js
// Metadata for the data-driven wiring diagrams served by app/wiring-diagrams/[slug].
// Layouts live in lib/wiring/specs.js, article bodies in lib/wiring/content/*.
// The diagrams index, lib/seo.js, the sitemap, search and the social content library read from this list.
// `related` entries are site paths.

export const diagrams = [
  // Vehicle, RV & marine
  {
    slug: 'dc-dc-charger-wiring',
    title: 'DC-DC Charger Wiring Diagram: Alternator to House Battery',
    seoTitle: 'DC-DC Charger Wiring Diagram (Alternator Charging)',
    description: 'Wiring diagram for a DC-DC charger: starter battery to house battery with fuses, cable sizes, the ignition signal wire and a common chassis negative.',
    excerpt: 'Charge a lithium house battery safely from your alternator, with fuse locations, cable sizes and the ignition trigger.',
    category: 'Vehicle, RV & Marine',
    voltage: '12V',
    difficulty: 'Intermediate',
    related: ['/wiring-diagrams/dual-battery-vehicle', '/wiring-diagrams/van-complete-system', '/guides/rv-lithium-battery-upgrade', '/blog/charge-power-station-from-car']
  },
  {
    slug: 'dual-battery-vehicle',
    title: 'Dual Battery Wiring Diagram with a VSR / Isolator',
    seoTitle: 'Dual Battery Wiring Diagram (VSR / Isolator)',
    description: 'Wire a second battery in a truck, 4x4 or van with a voltage-sensitive relay: fuse placement, cable sizing, the fuse block for accessories and common mistakes.',
    excerpt: 'A simple auxiliary battery for a fridge and lights that charges while you drive and never flattens your starter battery.',
    category: 'Vehicle, RV & Marine',
    voltage: '12V',
    difficulty: 'Beginner',
    related: ['/wiring-diagrams/dc-dc-charger-wiring', '/wiring-diagrams/dc-fuse-block-busbar', '/blog/12v-fridge-off-grid-power', '/guides/rv-lithium-battery-upgrade', '/guides/boat-solar-power']
  },
  {
    slug: 'shore-power-rv',
    title: 'RV Shore Power and Inverter-Charger Wiring Diagram',
    seoTitle: 'RV Shore Power & Inverter-Charger Wiring Diagram',
    description: 'How shore power, an inverter-charger, the AC panel, the battery bank and roof solar connect in an RV, with breaker, fuse and cable sizes.',
    excerpt: 'Shore power, an inverter-charger, roof solar and the battery bank, all in one RV wiring diagram.',
    category: 'Vehicle, RV & Marine',
    voltage: '12V / 120V AC',
    difficulty: 'Advanced',
    related: ['/wiring-diagrams/van-complete-system', '/guides/rv-lithium-battery-upgrade', '/guides/rv-power-systems', '/wiring-diagrams/system-grounding']
  },
  {
    slug: 'van-complete-system',
    title: 'Complete Campervan Electrical Wiring Diagram',
    seoTitle: 'Campervan Electrical Wiring Diagram (Solar + DC-DC)',
    description: 'A complete campervan electrical diagram: roof solar, MPPT, DC-DC charger, LiFePO4 battery, bus bars, shunt, fuse block, inverter-charger and shore power.',
    excerpt: 'Solar, alternator and shore charging into one LiFePO4 battery, with bus bars, shunt, fuse block and inverter-charger.',
    category: 'Vehicle, RV & Marine',
    voltage: '12V',
    difficulty: 'Advanced',
    related: ['/wiring-diagrams/dc-dc-charger-wiring', '/wiring-diagrams/battery-monitor-shunt', '/blog/van-life-solar-setup-guide', '/guides/van-life-solar-sizing']
  },
  {
    slug: 'marine-dual-bank',
    title: 'Boat Dual Battery Wiring Diagram: Start and House Banks',
    seoTitle: 'Boat Dual Battery Wiring Diagram (Start + House)',
    description: 'Marine dual battery wiring: battery selector switch, automatic charging relay, house and start banks, shore charger connections and marine wiring practice.',
    excerpt: 'Keep the engine starting no matter how much the house bank is used, with a selector switch and an automatic charging relay.',
    category: 'Vehicle, RV & Marine',
    voltage: '12V',
    difficulty: 'Intermediate',
    related: ['/guides/boat-solar-power', '/wiring-diagrams/dual-battery-vehicle', '/wiring-diagrams/battery-monitor-shunt', '/guides/how-to-choose-solar-batteries']
  },

  // Component connections
  {
    slug: 'battery-monitor-shunt',
    title: 'Battery Monitor Shunt Wiring Diagram',
    seoTitle: 'Battery Monitor Shunt Wiring Diagram',
    description: 'How to wire a shunt-based battery monitor: battery negative to shunt to negative bus, the positive sense wire, and why nothing may bypass the shunt.',
    excerpt: 'Wire a shunt so every amp in and out of the battery is counted, and your state-of-charge reading stays accurate.',
    category: 'Component Connections',
    voltage: '12V / 24V / 48V',
    difficulty: 'Beginner',
    related: ['/guides/battery-monitor-setup', '/wiring-diagrams/van-complete-system', '/wiring-diagrams/dc-fuse-block-busbar', '/guides/how-to-choose-solar-batteries', '/wiring-diagrams/marine-dual-bank']
  },
  {
    slug: 'dc-fuse-block-busbar',
    title: '12V Fuse Block and Bus Bar Wiring Diagram',
    seoTitle: '12V Fuse Block & Bus Bar Wiring Diagram',
    description: 'Wire a 12V fuse block and negative bus bar: main fuse, battery switch, branch circuit fuses, wire gauges and how to size each fuse to protect its wire.',
    excerpt: 'Distribute 12V power to lights, fridge, pump and sockets, each on its own correctly sized fuse.',
    category: 'Component Connections',
    voltage: '12V',
    difficulty: 'Beginner',
    related: ['/guides/solar-fuse-and-breaker-sizing', '/guides/solar-cable-and-connector-guide', '/wiring-diagrams/battery-monitor-shunt', '/wiring-diagrams/12v-system']
  },
  {
    slug: 'parallel-battery-bank-balanced',
    title: 'Balanced Parallel Battery Bank Wiring Diagram',
    seoTitle: 'Parallel Battery Bank Wiring (Balanced Diagonal Method)',
    description: 'Wire four batteries in parallel so they share load evenly: diagonal (cross-corner) connections, equal-length links, bus bar alternatives and fusing.',
    excerpt: 'Why the first battery in a parallel bank works hardest, and the diagonal wiring that makes every battery share evenly.',
    category: 'Component Connections',
    voltage: '12V',
    difficulty: 'Intermediate',
    related: ['/wiring-diagrams/battery-bank', '/guides/how-to-choose-solar-batteries', '/blog/12v-vs-24v-vs-48v-solar-system', '/guides/solar-fuse-and-breaker-sizing']
  },
  {
    slug: 'system-grounding',
    title: 'Off-Grid Solar Grounding and Bonding Diagram',
    seoTitle: 'Off-Grid Solar Grounding & Bonding Diagram',
    description: 'How to ground an off-grid solar system: equipment grounding conductors, the single DC negative bond, neutral-ground bonding, ground bus and grounding electrode.',
    excerpt: 'Equipment grounds, the single DC bond and neutral-ground bonding explained in one diagram.',
    category: 'Component Connections',
    voltage: 'Any',
    difficulty: 'Advanced',
    related: ['/guides/solar-fuse-and-breaker-sizing', '/guides/ground-mount-solar-installation', '/wiring-diagrams/ac-subpanel', '/wiring-diagrams/basic-off-grid']
  },

  // Solar panel wiring
  {
    slug: 'multiple-charge-controllers',
    title: 'Two Charge Controllers on One Battery: Wiring Diagram',
    seoTitle: 'Wiring Two Charge Controllers to One Battery Bank',
    description: 'Connect two solar charge controllers to one battery bank: separate arrays, fusing each controller, matching charge settings and when to use two controllers.',
    excerpt: 'Two arrays, two controllers, one battery bank: how to wire it and keep the controllers from fighting.',
    category: 'Solar Panel Wiring',
    voltage: '12V / 24V / 48V',
    difficulty: 'Intermediate',
    related: ['/guides/how-to-choose-a-charge-controller', '/wiring-diagrams/charge-controller', '/wiring-diagrams/east-west-array', '/blog/mppt-vs-pwm-charge-controller']
  },
  {
    slug: 'east-west-array',
    title: 'East-West Split Array Wiring Diagram (Dual MPPT)',
    seoTitle: 'East-West Solar Array Wiring (Dual MPPT Inverter)',
    description: 'Wire east- and west-facing solar strings to a dual-MPPT inverter: why mixed orientations need separate inputs, string design and what to expect for output.',
    excerpt: 'Panels on two roof faces? Give each orientation its own MPPT input and a flatter, longer production curve.',
    category: 'Solar Panel Wiring',
    voltage: '48V battery / high-voltage PV',
    difficulty: 'Intermediate',
    related: ['/wiring-diagrams/multiple-charge-controllers', '/wiring-diagrams/panel-series', '/guides/grid-tie-vs-off-grid-vs-hybrid', '/blog/why-solar-panels-produce-less-than-rated']
  },
  {
    slug: 'portable-panel-power-station',
    title: 'Portable Solar Panels to Power Station Wiring Diagram',
    seoTitle: 'How to Connect Solar Panels to a Power Station',
    description: 'Connect portable solar panels to a power station in series or parallel: voltage and current limits, MC4 adapters, extension cables and a worked example.',
    excerpt: 'Series or parallel? How to connect two or more portable panels to a power station without exceeding its input limits.',
    category: 'Solar Panel Wiring',
    voltage: '12-60V input',
    difficulty: 'Beginner',
    related: ['/blog/portable-solar-panel-buying-guide', '/wiring-diagrams/panel-series', '/wiring-diagrams/panel-parallel', '/guides/apartment-solar-power']
  },

  // Off-grid systems
  {
    slug: 'shed-solar-system',
    title: 'Shed Solar System Wiring Diagram (12V)',
    seoTitle: 'Shed Solar Wiring Diagram (12V Panel, Battery, Inverter)',
    description: 'A complete 12V shed solar wiring diagram: 200W panel, MPPT controller, LiFePO4 battery, fuses, LED lighting on the load output and a small inverter.',
    excerpt: 'Panel, controller, battery, lights and a small inverter: everything a shed or small workshop needs, wired and fused.',
    category: 'Off-Grid System Diagrams',
    voltage: '12V',
    difficulty: 'Beginner',
    related: ['/guides/shed-solar-power', '/wiring-diagrams/basic-off-grid', '/wiring-diagrams/12v-system', '/guides/solar-fuse-and-breaker-sizing']
  },
  {
    slug: 'generator-backup-off-grid',
    title: 'Generator Backup Wiring for an Off-Grid Inverter-Charger',
    seoTitle: 'Off-Grid Generator Backup Wiring Diagram',
    description: 'Connect a backup generator to an off-grid inverter-charger: AC input breaker, auto-start wiring, charger settings and how solar and generator share charging.',
    excerpt: 'Add a generator to an off-grid system so it recharges the batteries automatically during long cloudy spells.',
    category: 'Off-Grid System Diagrams',
    voltage: '48V / 120-240V AC',
    difficulty: 'Advanced',
    related: ['/guides/off-grid-cabin-solar', '/guides/off-grid-solar-system-sizing', '/wiring-diagrams/split-phase-240v-inverters', '/wiring-diagrams/48v-system']
  },
  {
    slug: 'solar-water-pump',
    title: 'Solar-Direct Water Pump Wiring Diagram',
    seoTitle: 'Solar Water Pump Wiring Diagram (Solar-Direct)',
    description: 'Wire a solar-direct water pump: array, DC disconnect, MPPT pump controller, submersible pump, float switch in the storage tank and grounding.',
    excerpt: 'Array, controller, pump and float switch: a battery-free system that pumps whenever the sun shines and stops when the tank is full.',
    category: 'Off-Grid System Diagrams',
    voltage: 'PV direct',
    difficulty: 'Intermediate',
    related: ['/guides/solar-water-pumping', '/blog/well-pump-power-outage', '/wiring-diagrams/panel-series', '/guides/ground-mount-solar-installation']
  },
  {
    slug: 'split-phase-240v-inverters',
    title: 'Split-Phase 240V Wiring with Two Stacked Inverters',
    seoTitle: '120/240V Split-Phase Wiring with Two Inverters',
    description: 'Stack two 120V inverters for 120/240V split-phase output: L1, L2 and neutral, the sync cable, panel wiring, 240V loads and neutral-ground bonding.',
    excerpt: 'Two 120V inverters, synchronized 180° apart, give you 240V for well pumps and dryers. Here is how it is wired.',
    category: 'Off-Grid System Diagrams',
    voltage: '48V / 120-240V AC',
    difficulty: 'Advanced',
    related: ['/guides/how-to-choose-an-inverter', '/wiring-diagrams/generator-backup-off-grid', '/blog/well-pump-power-outage', '/wiring-diagrams/system-grounding']
  },

  // Home backup & grid-tie
  {
    slug: 'ac-subpanel',
    title: 'Inverter to Critical Loads Subpanel Wiring Diagram',
    seoTitle: 'Inverter Critical Loads Subpanel Wiring Diagram',
    description: 'Wire an inverter to a critical loads subpanel: the feeder breaker, choosing which circuits to move, neutral and ground separation, and sizing the feed.',
    excerpt: 'Move your essential circuits to a subpanel that the inverter keeps powered when the grid goes down.',
    category: 'Home Backup & Grid-Tie',
    voltage: '120/240V AC',
    difficulty: 'Advanced',
    related: ['/wiring-diagrams/hybrid-inverter-battery', '/guides/how-to-choose-an-inverter', '/wiring-diagrams/system-grounding', '/guides/hurricane-power-preparedness']
  },
  {
    slug: 'grid-tie-microinverter',
    title: 'Grid-Tie Microinverter Wiring Diagram',
    seoTitle: 'Grid-Tie Microinverter Wiring Diagram',
    description: 'How a microinverter solar system connects to the grid: panels, microinverters, AC trunk cable, junction box, AC disconnect, backfeed breaker and the net meter.',
    excerpt: 'Each panel gets its own inverter, and AC runs from the roof to your main panel. Every part of a microinverter system, in order.',
    category: 'Home Backup & Grid-Tie',
    voltage: '240V AC',
    difficulty: 'Intermediate',
    related: ['/guides/grid-tie-vs-off-grid-vs-hybrid', '/wiring-diagrams/hybrid-inverter-battery', '/guides/apartment-solar-power', '/guides/whole-home-solar']
  },
  {
    slug: 'hybrid-inverter-battery',
    title: 'Hybrid Inverter with Battery Backup Wiring Diagram',
    seoTitle: 'Hybrid Solar Inverter & Battery Wiring Diagram',
    description: 'Wire a hybrid inverter with battery backup: grid port, backup loads panel, PV input, battery connection and CT clamps for self-consumption.',
    excerpt: 'Solar that keeps working in a blackout: grid, PV, battery and a backup loads panel all meet at the hybrid inverter.',
    category: 'Home Backup & Grid-Tie',
    voltage: '48V / 240V AC',
    difficulty: 'Advanced',
    related: ['/wiring-diagrams/ac-subpanel', '/guides/grid-tie-vs-off-grid-vs-hybrid', '/guides/hurricane-power-preparedness', '/blog/home-battery-backup-guide']
  },
  {
    slug: 'power-station-home-inlet',
    title: 'Power Station to House Wiring: Inlet Box and Interlock',
    seoTitle: 'Connect a Power Station to Your House (Inlet + Interlock)',
    description: 'Wiring diagram for connecting a portable power station or generator to your home panel through a power inlet box and interlock kit, step by step.',
    excerpt: 'Feed selected home circuits from a power station safely, with an outdoor inlet and an interlocked backfeed breaker.',
    category: 'Home Backup & Grid-Tie',
    voltage: '120/240V AC',
    difficulty: 'Intermediate',
    related: ['/blog/transfer-switch-vs-interlock-kit', '/guides/hurricane-power-preparedness', '/blog/sump-pump-battery-backup', '/wiring-diagrams/ac-subpanel']
  }
].map(d => ({
  ...d,
  date: '2026-11-04',
  author: 'TheLoadCalc Team',
  path: `/wiring-diagrams/${d.slug}`,
  image: `/images/wiring/${d.slug}.png`
}))

export const getDiagramMeta = slug => diagrams.find(d => d.slug === slug)
