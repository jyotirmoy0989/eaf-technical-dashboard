import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  Thermometer,
  Clock,
  Shield,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Layers,
  Activity,
  Award,
  BarChart3,
  Sparkles,
  Droplets,
  Wind,
  Cpu,
  Scale,
  Check,
  X,
  ArrowRight
} from 'lucide-react';

// ==========================================
// NAVIGATION & MODULE METADATA
// ==========================================

const NAVIGATION_SECTIONS = [
  {
    id: 'anatomy',
    number: '01',
    shortTitle: '1. EAF Anatomy',
    fullTitle: 'Anatomy & Structural Architecture of the EAF',
    subtitle: 'Interactive 2D cross-section schematic, 7 core subsystems & refractory/thermal specs',
    icon: Zap,
    accent: 'from-sky-500 to-blue-600',
    badge: '7 Interactive Hotspots'
  },
  {
    id: 'cycle',
    number: '02',
    shortTitle: '2. Tap-to-Tap Cycle',
    fullTitle: 'The 60–90 Minute Tap-to-Tap Production Cycle',
    subtitle: 'Chronological 6-stage batch simulator with dynamic vessel animation & live telemetry',
    icon: Clock,
    accent: 'from-orange-500 to-amber-500',
    badge: '6-Stage Live Simulator'
  },
  {
    id: 'auditing',
    number: '03',
    shortTitle: '3. Energy Auditing',
    fullTitle: 'Energy Auditing: Material Balances, Heat Sinks & SEC',
    subtitle: '85–92% yield material calculator, 100% thermal balance explorer & SEC driver simulator',
    icon: Scale,
    accent: 'from-emerald-500 to-teal-600',
    badge: 'Material + SEC Calculators'
  },
  {
    id: 'practices',
    number: '04',
    shortTitle: '4. Best Practices',
    fullTitle: 'Operational Best Practices for Peak Furnace Efficiency',
    subtitle: 'Foaming slag lab (4" to 12"), 600°C Hot DRI slider, coherent O₂ jets & electrode care',
    icon: Sliders,
    accent: 'from-amber-500 to-yellow-500',
    badge: '5-Practice Interactive Lab'
  },
  {
    id: 'technologies',
    number: '05',
    shortTitle: '5. Advanced Tech',
    fullTitle: 'Advanced Energy-Efficient Hardware & AI Retrofits',
    subtitle: 'UHP high-impedance reactors, AI neural control, EBT, shaft pre-heating & >1 kHz Q-ONE',
    icon: Cpu,
    accent: 'from-purple-500 to-indigo-600',
    badge: '350–400 kWh/t Configurator'
  },
  {
    id: 'summary',
    number: '06',
    shortTitle: '6. Summary & Comparison',
    fullTitle: 'Technology Benchmarking, Carbon Abatement & Knowledge Check',
    subtitle: 'EAF vs. BF-BOF vs. Induction Furnace matrix, CO₂ calculator & executive synthesis',
    icon: BarChart3,
    accent: 'from-cyan-500 to-sky-600',
    badge: '3-Way Matrix + Quiz'
  }
];

// ==========================================
// SECTION 1 DATA: 7 ANATOMY SUBSYSTEMS
// ==========================================

const ANATOMY_COMPONENTS = [
  {
    id: 'roof',
    name: 'Water-Cooled Roof & 4th-Hole Off-Gas Elbow',
    category: 'Thermal Containment & Exhaust',
    tempRange: 'Off-Gas ~1,100°C | Roof Panels < 85°C',
    icon: Shield,
    color: '#60a5fa',
    badge: '11.8% Heat Loss Stream',
    description:
      'Suspended above the vessel shell on a hydraulic gantry, the dome-shaped roof uses pressurized tubular water-cooled steel panels to absorb intense radiant heat. The central refractory "delta" insulates the three graphite electrodes and houses the "4th hole" exhaust elbow that extracts ~1,100°C off-gases and dust.',
    specs: [
      { label: 'Center Section', value: 'High-Alumina (85% Al₂O₃) Pre-Cast Refractory Delta' },
      { label: 'Off-Gas Extraction', value: '4th Hole Water-Cooled Elbow → Post-Combustion & Baghouse' },
      { label: 'Energy Impact', value: 'Cooling water absorbs 10.3% & exhaust gases carry 11.8% of total energy' },
      { label: 'Primary Wear Mechanism', value: 'Arc flare thermal shock, slag splashing & thermal cycling' }
    ],
    hotspotPos: { x: 265, y: 175 }
  },
  {
    id: 'electrodes',
    name: '3-Phase AC Graphite Electrodes (UHP Grade)',
    category: 'Electrical Power Delivery',
    tempRange: 'Up to 3,500°C (Arc Plasma Core)',
    icon: Zap,
    color: '#38bdf8',
    badge: '50.2% Energy Input',
    description:
      'Three vertical columns of Ultra-High Power (UHP) needle-coke artificial graphite suspended through the roof delta. Carrying 50,000 to 120,000 Amps of 3-phase alternating current, they strike high-intensity electrical arcs that liquefy scrap, DRI, and pig iron.',
    specs: [
      { label: 'Dimensions & Current', value: '600 mm – 750 mm diameter | 50 – 120 kA per phase' },
      { label: 'Specific Consumption', value: '1.2 kg/t steel (Best Practice) to 2.8 kg/t (Legacy)' },
      { label: 'Energy Impact', value: 'Delivers 50.2% of total furnace energy + 3.3% from carbon oxidation' },
      { label: 'Primary Wear Mechanism', value: 'Tip sublimation, sidewall oxidation & scrap cave-in breakage' }
    ],
    hotspotPos: { x: 400, y: 115 }
  },
  {
    id: 'lance',
    name: 'Coherent Jet Oxygen Lance & Oxy-Fuel Burners',
    category: 'Chemical Energy & Slag Foaming',
    tempRange: '2,500°C Flame Envelope',
    icon: Wind,
    color: '#22d3ee',
    badge: '32.7% Chemical + 6.8% Fuel',
    description:
      'Dual-mode water-cooled sidewall injectors. During bore-down, they operate as oxy-fuel burners (6.8% energy input) to melt peripheral scrap cold spots. Once a molten bath forms, they transition into supersonic Mach 2.0 coherent oxygen jets alongside carbon injectors to oxidize impurities and foam the slag.',
    specs: [
      { label: 'Supersonic Jet Velocity', value: 'Mach 1.8 – 2.2 coherent O₂ beam (penetrates slag into bath)' },
      { label: 'Exothermic Reactions', value: 'Oxidation of Si, Mn, C, P & Fe supplies 32.7% of total energy' },
      { label: 'Foaming Slag Injection', value: 'Granular coal + O₂ → FeO + C → Fe + CO↑ (4" to 12" foam)' },
      { label: 'Cycle Impact', value: 'Shortens tap-to-tap time by 3–6 minutes & boosts metallic yield' }
    ],
    hotspotPos: { x: 565, y: 245 }
  },
  {
    id: 'charge',
    name: 'Layered Metallic Charge & Molten Bath',
    category: 'Process Metallurgy & Yield',
    tempRange: '1,600°C – 1,650°C Tapping Bath',
    icon: Flame,
    color: '#f97316',
    badge: '56.7% Useful Energy Sink',
    description:
      'The stratified raw material burden inside the furnace. Heavy and light steel scrap, Direct Reduced Iron (DRI at ambient or 600°C), and pig iron are charged with calcitic lime (CaO) and dolomite (MgO) fluxes. The molten steel retains 56.7% of total energy input.',
    specs: [
      { label: 'Metallic Yield Efficiency', value: '85% – 92% liquid steel output vs. total metallic charge' },
      { label: 'Floating Basic Slag', value: '100–150 kg/t steel (absorbs 8.6% of total energy at ~1,600°C)' },
      { label: 'Hot DRI Advantage', value: '50% Hot DRI at 600°C saves up to 150 kWh/t electrical energy' },
      { label: 'Superheat Penalty', value: '+60°C overshoot wastes +12.5 kWh/t of electrical power' }
    ],
    hotspotPos: { x: 400, y: 330 }
  },
  {
    id: 'vessel',
    name: 'Refractory-Lined Vessel & Water-Cooled Sidewalls',
    category: 'Structural & Thermal Shell',
    tempRange: 'Hearth > 1,700°C Rating',
    icon: Layers,
    color: '#f59e0b',
    badge: 'MgO-C Brick Hearth',
    description:
      'Split-shell steel barrel consisting of water-cooled copper/steel cage panels on the upper sidewalls (forming a frozen slag skull) and a deep lower hearth lined with resin-bonded Magnesia-Carbon (MgO-C) bricks and monolithic magnesia ramming mass.',
    specs: [
      { label: 'Lower Hearth Lining', value: 'Resin-bonded Magnesia-Carbon (MgO-C) bricks + dry hearth mix' },
      { label: 'Upper Sidewalls', value: 'Water-cooled tubular panels with slag-retention ribs' },
      { label: 'Scale Efficiency', value: 'Larger vessels have lower surface-area-to-volume heat loss' },
      { label: 'Turnaround Care', value: 'Laser profiling & magnesia fettling between every heat' }
    ],
    hotspotPos: { x: 280, y: 405 }
  },
  {
    id: 'tapping',
    name: 'Slag Door & Eccentric Bottom Tapping (EBT)',
    category: 'Mechanical Discharge & Slag Control',
    tempRange: '1,600°C – 1,650°C Tap Stream',
    icon: Droplets,
    color: '#fbbf24',
    badge: 'Saves 7–25 kWh/t',
    description:
      'Mounted on hydraulic toothed rockers, the furnace tilts backward (-5° to -7°) to flush phosphorus-rich slag out the rear slag door, and tilts forward (+12° to +15°) to open the off-center Eccentric Bottom Tap (EBT) flapper valve—retaining a 10–15% liquid "hot heel" inside.',
    specs: [
      { label: 'EBT Energy Savings', value: 'Saves 7–25 kWh/t & cuts tapping duration by up to 7 minutes' },
      { label: 'Hot Heel Practice', value: 'Retains 10–15% molten steel to prevent vortex slag carryover' },
      { label: 'Tap Hole Turnaround', value: 'Plugged and refilled with refractory olivine sand each cycle' },
      { label: 'Ladle Additions', value: 'FeSi, FeMn, and Al deoxidizers added with high recovery yield' }
    ],
    hotspotPos: { x: 585, y: 430 }
  },
  {
    id: 'stirring',
    name: 'Bottom Porous Plugs (DPP / EMS Stirring)',
    category: 'Bath Homogenization System',
    tempRange: 'Sub-Hearth Inert Gas Injection',
    icon: Activity,
    color: '#a855f7',
    badge: 'Saves 5–30 kWh/t',
    description:
      'Directional Porous Plugs (DPP) embedded in the bottom refractory hearth inject inert Argon (Ar) or Nitrogen (N₂) gas plumes directly into the liquid steel bath (or work alongside Electromagnetic Stirring coils) to eliminate thermal stratification and accelerate scrap melting.',
    specs: [
      { label: 'Stirring Gas', value: 'Argon (Ar) or Nitrogen (N₂) at 50 – 250 NL/min per plug' },
      { label: 'Energy Savings', value: 'Saves 5 – 30 kWh/t by eliminating bottom thermal dead zones' },
      { label: 'Metallurgical Benefit', value: 'Accelerates slag-metal equilibrium & prevents temperature gradients' },
      { label: 'Safety Monitoring', value: 'Embedded thermocouples monitor residual refractory brick thickness' }
    ],
    hotspotPos: { x: 410, y: 445 }
  }
];

// ==========================================
// SECTION 2 DATA: 6-STEP TAP-TO-TAP CYCLE
// ==========================================

const CYCLE_STEPS = [
  {
    step: 1,
    title: 'Charge Mix Preparation & Charging',
    duration: '0 – 12 mins',
    timeProgress: 14,
    temp: 520,
    powerMW: 0,
    voltageTap: 'OFF (Roof Interlocked)',
    furnaceTilt: 0,
    status: 'Roof Swung Open • Clamshell Bucket Drop',
    accent: '#f59e0b',
    summary:
      'Heavy scrap, light scrap, DRI, pig iron, and fluxes (limestone and dolomite) are loaded into the furnace using large clamshell charging buckets.',
    details: [
      'Water-cooled roof and graphite electrodes lift and swing aside on the hydraulic gantry.',
      'Stratified bucket drop: Light shredded scrap on the bottom cushions the refractory hearth; heavy dense scrap and pig iron sit in the high-intensity center zone; light scrap on top facilitates rapid electrode bore-down.',
      'Calcitic lime (CaO) and dolomite (MgO) fluxes are blended into the charge for early slag formation.'
    ],
    metallurgy: 'Solid-state stratified burden: Fe scrap + DRI + Pig Iron + CaCO₃ / MgCO₃ fluxes.'
  },
  {
    step: 2,
    title: 'Melting (Bore-Down & Main Melt)',
    duration: '12 – 48 mins',
    timeProgress: 52,
    temp: 1545,
    powerMW: 92,
    voltageTap: 'Intermediate Tap → UHP High-Voltage Long Arc',
    furnaceTilt: 0,
    status: '3-Phase AC Arcs Active + Sidewall Burners',
    accent: '#38bdf8',
    summary:
      'Lowering the electrodes to strike arcs. Intermediate voltage taps penetrate the top layer of light scrap, followed by high-voltage long arcs once a molten pool forms.',
    details: [
      'Phase 2A (Bore-Down): Electrodes lower and strike intermediate-voltage short arcs to bore down into the top layer of light scrap, shielding the roof and sidewalls from radiant arc flare.',
      'Sidewall oxy-fuel burners fire into peripheral cold spots between electrodes to accelerate uniform scrap cave-in.',
      'Phase 2B (Main Melt): Once a molten pool forms at the bottom, the UHP transformer switches to high-voltage long arcs for maximum power transfer.'
    ],
    metallurgy: 'Rapid phase liquefaction; calcination of limestone into reactive CaO-MgO liquid slag.'
  },
  {
    step: 3,
    title: 'Oxidation & Chemical Refining',
    duration: '48 – 64 mins',
    timeProgress: 74,
    temp: 1615,
    powerMW: 68,
    voltageTap: 'Submerged Arc in 12" Foaming Slag',
    furnaceTilt: 0,
    status: 'Supersonic O₂ Injection • Exothermic Boil',
    accent: '#22d3ee',
    summary:
      'Injecting oxygen into the molten bath to burn off impurities like silicon, manganese, carbon, and phosphorus. These exothermic reactions release substantial heat directly into the bath.',
    details: [
      'Coherent oxygen lance injects supersonic O₂ jets directly into the bath, supplying 32.7% of total furnace energy via exothermic oxidation of Si, Mn, C, and Fe.',
      'Phosphorus oxidizes (2P + 5FeO + 3CaO → 3CaO·P₂O₅ + 5Fe) and is locked into the basic CaO-rich slag.',
      'Granular coal is co-injected into the slag (FeO + C → Fe + CO↑), expanding the slag from 4 inches to 12 inches to shroud the electric arc and save 2%–3% energy.'
    ],
    metallurgy: 'Exothermic refining: Dephosphorization, decarburization & foamy slag arc shrouding.'
  },
  {
    step: 4,
    title: 'De-Slagging',
    duration: '64 – 70 mins',
    timeProgress: 82,
    temp: 1625,
    powerMW: 18,
    voltageTap: 'Low Holding Power / Arcs Raised',
    furnaceTilt: -6,
    status: 'Backward Tilt (-6°) • Slag Flushing',
    accent: '#fb923c',
    summary:
      'Tilting the furnace backward to pour off the dirty, impurity-laden floating slag layer through the rear slag door.',
    details: [
      'Hydraulic rockers tilt the furnace vessel backward (-5° to -7°) toward the rear slag door.',
      'Floating foamy slag—carrying oxidized P₂O₅, SiO₂, MnO, and non-metallic inclusions—overflows out into the slag pot below (accounting for 8.6% of thermal output).',
      'Flushing out phosphorus-laden slag prior to tapping prevents phosphorus reversion back into the steel when deoxidizers are added.'
    ],
    metallurgy: 'Gravity separation of low-density basic slag (ρ ≈ 3.2 g/cm³) from liquid steel (ρ ≈ 7.0 g/cm³).'
  },
  {
    step: 5,
    title: 'Tapping (Eccentric Bottom Tapping)',
    duration: '70 – 76 mins',
    timeProgress: 91,
    temp: 1635,
    powerMW: 0,
    voltageTap: 'OFF (Electrodes Raised)',
    furnaceTilt: 12,
    status: 'Forward Tilt (+12°) • EBT Slag-Free Pour',
    accent: '#fbbf24',
    summary:
      'Tilting forward and opening the Eccentric Bottom Tap (EBT) hole to pour refined liquid steel into a pre-heated ladle at roughly 1600°C–1650°C while adding deoxidizers and ferro-alloys.',
    details: [
      'Furnace tilts forward (+12° to +15°) and opens the off-center EBT flapper gate for fast, vertical pouring into a pre-heated ladle.',
      'Strict temperature discipline avoids +60°C superheating (which would waste +12.5 kWh/t).',
      '10%–15% of liquid steel is retained inside the hearth ("hot heel" practice) so zero furnace slag enters the ladle, while FeSi, FeMn, and Al deoxidizers are added into the stream.'
    ],
    metallurgy: 'Slag-free EBT transfer (saves 7–25 kWh/t) + ladle deoxidation & alloy trimming.'
  },
  {
    step: 6,
    title: 'Furnace Turnaround & Fettling',
    duration: '76 – 85 mins',
    timeProgress: 100,
    temp: 1240,
    powerMW: 0,
    voltageTap: 'OFF (Turnaround Inspection)',
    furnaceTilt: 0,
    status: 'Refractory Fettling • EBT Sand Packing',
    accent: '#a855f7',
    summary:
      'Inspecting the refractory lining, repairing damaged areas ("fettling"), and preparing the hearth and bottom tap hole for the next batch.',
    details: [
      'Laser scanners or operators inspect the MgO-C refractory slag line and hearth banks for erosion.',
      'Robotic gunning shooters spray dolomitic/magnesia refractory mass ("fettling") onto worn hot spots.',
      'The EBT bottom tap hole is cleared, closed, and refilled with refractory olivine sand—keeping total turnaround under 8–10 minutes to minimize standing radiation losses.'
    ],
    metallurgy: 'Refractory sintering & olivine sand tap-hole packing for the next heat.'
  }
];

// ==========================================
// SECTION 3 DATA: ENERGY BALANCE STREAMS
// ==========================================

const ENERGY_INPUT_STREAMS = [
  {
    id: 'elec',
    name: 'Electrical Energy (Transformer Arc Power)',
    pct: 50.2,
    color: '#38bdf8',
    zone: 'electrodes',
    auditNote:
      'Primary metered AC power supplied via the UHP step-down transformer to the 3 graphite electrodes. Target benchmark: 350–415 kWh/t.'
  },
  {
    id: 'chem',
    name: 'Exothermic Chemical Reactions (Si, C, Mn, Fe Oxidation)',
    pct: 32.7,
    color: '#f97316',
    zone: 'lance',
    auditNote:
      'Substantial chemical heat generated directly inside the molten bath by injecting supersonic O₂ to oxidize Silicon, Carbon, Manganese, Phosphorus, and Iron.'
  },
  {
    id: 'fuel',
    name: 'Fuel Combustion (Sidewall Oxy-Fuel Burners)',
    pct: 6.8,
    color: '#fbbf24',
    zone: 'lance',
    auditNote:
      'Natural gas / oxy-fuel burners firing into cold scrap zones between electrodes during initial bore-down.'
  },
  {
    id: 'elec_ox',
    name: 'Graphite Electrode Oxidation',
    pct: 3.3,
    color: '#a855f7',
    zone: 'electrodes',
    auditNote:
      'Exothermic combustion of the incandescent graphite electrode sidewalls and tips reacting with furnace oxygen.'
  },
  {
    id: 'slag_form',
    name: 'Exothermic Slag Formation Reactions',
    pct: 2.0,
    color: '#10b981',
    zone: 'charge',
    auditNote:
      'Heat of formation released when acidic oxides (SiO₂, P₂O₅) react with basic fluxes (CaO, MgO) to form stable calcium silicates and phosphates.'
  },
  {
    id: 'sensible_misc',
    name: 'Hot Heel / Raw Material Sensible Heat & Audit Balance',
    pct: 5.0,
    color: '#64748b',
    zone: 'charge',
    auditNote:
      'Remaining 5.0% thermal balance closure from retained liquid hot heel enthalpy, post-combustion heat transfer, and charge sensible heat.'
  }
];

const ENERGY_OUTPUT_STREAMS = [
  {
    id: 'steel_heat',
    name: 'Heat Absorbed by Molten Steel (Useful Output)',
    pct: 56.7,
    isUseful: true,
    color: '#10b981',
    zone: 'charge',
    auditNote:
      'Useful enthalpy stored in the 1,600°C–1,650°C tapped liquid steel (~385–400 kWh/t theoretical thermodynamic minimum to melt and heat Fe).'
  },
  {
    id: 'offgas_loss',
    name: 'Exhaust / Off-Gases (~1,100°C Fume System)',
    pct: 11.8,
    isUseful: false,
    color: '#ef4444',
    zone: 'roof',
    auditNote:
      'Largest single heat loss driver! Hot CO/CO₂/N₂ gases leaving the 4th hole at ~1,100°C. Recoverable via ECOARC/Consteel scrap shaft pre-heating.'
  },
  {
    id: 'water_loss',
    name: 'Cooling Water (Roof & Sidewall Cage Panels)',
    pct: 10.3,
    isUseful: false,
    color: '#3b82f6',
    zone: 'vessel',
    auditNote:
      'Heat absorbed by pressurized cooling water circulating through sidewall panels and roof. Minimized by maintaining a 12-inch foaming slag blanket and short tap-to-tap times.'
  },
  {
    id: 'rad_loss',
    name: 'Radiation, Convection & Surface Losses',
    pct: 8.9,
    isUseful: false,
    color: '#f59e0b',
    zone: 'roof',
    auditNote:
      'Thermal radiation escaping when the roof swings open for bucket charging and during prolonged turnaround times. Directly slashed by keeping TTT < 60 min.'
  },
  {
    id: 'slag_loss',
    name: 'Slag Heat Content (Tapped at ~1,600°C)',
    pct: 8.6,
    isUseful: false,
    color: '#f97316',
    zone: 'tapping',
    auditNote:
      'Sensible heat carried out of the furnace by the 100–150 kg/t of liquid slag (~550 kWh per tonne of slag). Controlled by avoiding excessive flux additions.'
  },
  {
    id: 'elec_loss',
    name: 'Electrical Transformer & Secondary Circuit Losses',
    pct: 3.7,
    isUseful: false,
    color: '#a855f7',
    zone: 'electrodes',
    auditNote:
      'Resistive I²R and inductive losses in the transformer windings, flexible cables, bus tubes, and electrode clamps. Reduced via high-impedance UHP operation and Q-ONE inverters.'
  }
];

// ==========================================
// SECTION 5 DATA: ADVANCED TECHNOLOGIES
// ==========================================

const ADVANCED_TECH_MODULES = [
  {
    id: 'uhp_impedance',
    title: 'UHP Transformers (>700 kVA/t) & High-Impedance Series Reactors',
    category: 'Power Delivery & Arc Stability',
    secSavingKwh: 18,
    electrodeSavingPct: 15,
    stressReductionPct: 50,
    shortCircuitCutPct: 33,
    badge: '-15% Tip Wear • -33% Peak Isc',
    color: '#38bdf8',
    summary:
      'Replacing legacy transformers with Ultra-High Power (UHP) units rated above 700 kVA/t accelerates melting, while adding primary-side series reactors enables stable high-voltage long-arc operation.',
    engineeringMechanics: [
      'Long-arc high-voltage operation lowers current for a given MW input, reducing I²R losses and graphite consumption.',
      'Adding a series reactor on the primary transformer side increases circuit reactance (High-Impedance EAF), maintaining a continuous, stable arc even during erratic scrap cave-ins.',
      'Cuts peak short-circuit currents by a third (33%), lowers mechanical stress on the electrode tip by 50%, and cuts electrode tip consumption by 15%.'
    ]
  },
  {
    id: 'ai_servo',
    title: 'Digital Electrode Regulation & AI Process Control (Level 1 & 2)',
    category: 'Cyber-Physical Automation',
    secSavingKwh: 20, // ~3-5% of ~450 kWh/t
    badge: '3%–5% Total SEC Reduction',
    color: '#a855f7',
    summary:
      'Fast-acting digital electro-hydraulic servo valves replace legacy electromechanical tap-changers, paired with Level 2 neural network algorithms that dynamically optimize power and chemical inputs.',
    engineeringMechanics: [
      'Millisecond-response hydraulic servo regulators adjust electrode height instantaneously to prevent short-circuits against collapsing scrap.',
      'AI neural networks integrate real-time off-gas laser analysis (CO/CO₂/H₂O), acoustic foaming slag sensors, and harmonic current feedback.',
      'Automatically transitions voltage taps and oxygen/carbon injection profiles across the melt, shaving 3% to 5% off total SEC.'
    ]
  },
  {
    id: 'ebt_system',
    title: 'Eccentric Bottom Tapping (EBT) with Hot Heel Practice',
    category: 'Thermal & Metallurgical Discharge',
    secSavingKwh: 16, // 7-25 kWh/t
    tapTimeSavedMin: 6, // up to 7 min
    badge: 'Saves 7–25 kWh/t • -7 Min Tap',
    color: '#fbbf24',
    summary:
      'Replaces conventional long pouring spouts with a vertical refractory tap hole located off-center in the furnace nose bottom, enabling rapid, low-tilt, slag-free steel tapping.',
    engineeringMechanics: [
      'Conventional spout tapping requires tilting to ~40° with a long, thin stream that loses heat and entrains oxidized slag.',
      'EBT requires only a 12°–15° tilt, producing a compact, high-velocity vertical stream that cuts tapping time by up to 7 minutes and reduces temperature drop.',
      'Retaining a 10%–15% liquid "hot heel" stops the drain before slag vortexing occurs—saving 7–25 kWh/t and boosting ferro-alloy yield in the ladle.'
    ]
  },
  {
    id: 'shaft_preheat',
    title: 'Scrap Pre-Heating & Waste Heat Recovery (ECOARC / Consteel)',
    category: 'Off-Gas Enthalpy Recovery',
    secSavingKwh: 65,
    badge: 'Captures 1,100°C Off-Gas Heat',
    color: '#10b981',
    summary:
      'Because furnace off-gases exit at ~1,100°C carrying away 15%–20% of total energy (11.8% direct exhaust loss), shaft and continuous conveyor systems route hot exhaust directly through incoming scrap.',
    engineeringMechanics: [
      'In shaft furnaces (e.g., ECOARC) or continuous horizontal conveyors (Consteel), incoming scrap is pre-heated to 400°C–600°C by counter-current ~1,100°C off-gases before entering the molten bath.',
      'Maintains a continuous flat-bath melting condition that eliminates roof-open radiation losses and reduces dust emissions.',
      'Slashes electrical melting requirement by 60 to 100 kWh/t while filtering scrap acts as a thermal regenerator.'
    ]
  },
  {
    id: 'stirring_inverter',
    title: 'Bottom Stirring (DPP/EMS) & >1 kHz Inverter-Fed AC (Q-ONE)',
    category: 'Bath Mixing & Solid-State Power Electronics',
    secSavingKwh: 38, // 5-30 kWh/t stirring + up to 10% inverter savings
    badge: 'Unity Power Factor • Up to -10% Energy',
    color: '#22d3ee',
    summary:
      'Combines sub-hearth Argon/Nitrogen porous plug stirring (or EMS) to eliminate thermal stratification with frontier >1 kHz secondary-side solid-state inverter power supplies.',
    engineeringMechanics: [
      'Bottom Stirring (5–30 kWh/t saved): Inert Argon or Nitrogen injected through Directional Porous Plugs (DPP) circulates liquid steel, melting bottom scrap skulls and homogenizing bath temperature.',
      'Inverter-Fed AC EAF (Q-ONE): Positions solid-state power electronic converters and capacitor banks on the secondary side of the transformer.',
      'Operating at variable frequencies above 1 kHz, it achieves unity power factor (cos φ ≈ 1.0), eliminates grid flicker without external SVC/STATCOM compensators, and cuts process energy consumption by up to 10%.'
    ]
  }
];

// ==========================================
// SECTION 6 DATA: COMPARISON & QUIZ
// ==========================================

const COMPARISON_MATRIX = [
  {
    metric: 'Capital Expenditure (CapEx)',
    eaf: {
      rating: 'Low – Moderate (~$300–$450/t)',
      badge: 'Best Economics',
      detail: 'Vastly lower upfront capital expenditure. Eliminates coke ovens, sinter plants, and massive blast furnace stoves.'
    },
    bfbof: {
      rating: 'Very High ($1,000+/t capacity)',
      badge: 'Mega-Scale Only',
      detail: 'Requires multi-billion-dollar integrated infrastructure including coke batteries, pellet plants, BF, and BOF converters.'
    },
    induction: {
      rating: 'Very Low',
      badge: 'Micro-Foundry Scale',
      detail: 'Lowest initial equipment cost for small-tonnage shops, but constrained in batch size and transformer power density.'
    }
  },
  {
    metric: 'Operational Flexibility',
    eaf: {
      rating: 'Superior (Start / Stop On-Demand)',
      badge: 'Agile Batch Mode',
      detail: 'Operates in 60–90 min tap-to-tap cycles; can easily pause during peak electricity tariff hours or adjust output to market demand.'
    },
    bfbof: {
      rating: 'Rigid (15–20 Year Campaign)',
      badge: 'Continuous 24/7',
      detail: 'Blast furnaces cannot be shut down and restarted easily; stopping causes catastrophic solidification ("freezing") of the hearth.'
    },
    induction: {
      rating: 'High (Small Heats)',
      badge: 'Batch Capable',
      detail: 'Can start and stop between heats, though requires a liquid heel or dense charge for optimal electromagnetic coupling.'
    }
  },
  {
    metric: 'Carbon Intensity (tCO₂ / t Steel)',
    eaf: {
      rating: '0.55 – 0.65 tCO₂ / t steel',
      badge: '~75% Lower CO₂',
      detail: 'Dramatic reduction in carbon footprint when melting recycled scrap; drops even further with renewable grid power and green H₂-DRI.'
    },
    bfbof: {
      rating: '> 2.0 – 2.3 tCO₂ / t steel',
      badge: 'Carbon Intensive',
      detail: 'Relies on metallurgical coal/coke as a chemical reductant (Fe₂O₃ + 3CO → 2Fe + 3CO₂), generating massive Scope 1 emissions.'
    },
    induction: {
      rating: '0.65 – 0.90 tCO₂ / t steel',
      badge: '100% Grid Dependent',
      detail: 'Lacks chemical oxygen energy assist (32.7% in EAF), requiring higher electrical kWh/t from the power grid.'
    }
  },
  {
    metric: 'Chemical Refining (De-P & De-S)',
    eaf: {
      rating: 'Advanced Active Slag Refining',
      badge: 'Special Alloy Capable',
      detail: 'Excels at removing unwanted Phosphorus (P) and Sulfur (S) via superheated basic CaO-MgO foamy slag and supersonic oxygen lancing.'
    },
    bfbof: {
      rating: 'High (Hot Metal Pre-Treatment + BOF)',
      badge: 'Virgin Ore Purity',
      detail: 'High chemical refining capability in the BOF converter plus very low residual tramp elements (Cu, Sn, Ni) from virgin iron ore.'
    },
    induction: {
      rating: 'Minimal ("Melt What You Charge")',
      badge: 'No De-P / De-S',
      detail: 'Induction coils heat only the metal while leaving top slag cold and unreactive—making phosphorus and sulfur removal nearly impossible.'
    }
  },
  {
    metric: 'Raw Material Charge Flexibility',
    eaf: {
      rating: '100% Scrap, Hot/Cold DRI, HBI, Pig Iron',
      badge: 'Omnivorous Burden',
      detail: 'Seamlessly processes heavy/light scrap, 600°C Hot DRI (saving 150 kWh/t), and high-carbon pig iron in any ratio.'
    },
    bfbof: {
      rating: 'Iron Ore + Coking Coal (Max ~25% Scrap)',
      badge: 'Ore Dependent',
      detail: 'Restricted to sintered/pelletized iron ore and coke in the BF, with limited coolant scrap additions in the BOF.'
    },
    induction: {
      rating: 'Clean, Pre-Sorted Low-P/S Scrap Only',
      badge: 'Strict Scrap Spec',
      detail: 'Must purchase expensive, clean, low-phosphorus scrap or high-purity DRI since impurities cannot be refined out.'
    }
  }
];

const QUIZ_QUESTIONS = [
  {
    q: 'In a standard EAF heat energy audit, what percentage of total energy input is supplied by electrical power vs. exothermic chemical oxidation reactions?',
    options: [
      '90.0% Electrical / 10.0% Chemical Oxidation',
      '50.2% Electrical / 32.7% Exothermic Chemical Oxidation',
      '32.7% Electrical / 50.2% Fuel Combustion',
      '75.0% Electrical / 25.0% Slag Formation'
    ],
    correct: 1,
    explanation:
      'Electrical energy via the transformer supplies 50.2% of total energy input, while exothermic chemical reactions (oxidation of Si, C, Mn, and Fe) provide 32.7%, followed by fuel combustion (6.8%), electrode oxidation (3.3%), and slag formation (2.0%).'
  },
  {
    q: 'How much additional electrical energy is wasted if an operator superheats the molten steel bath by +60°C above the target tapping temperature?',
    options: [
      '2.5 kWh per tonne of steel',
      '12.5 kWh per tonne of steel',
      '45.0 kWh per tonne of steel',
      '150.0 kWh per tonne of steel'
    ],
    correct: 1,
    explanation:
      'Overheating the liquid steel bath by just +60°C requires an extra 12.5 kWh/t of electrical energy (~0.208 kWh/t per °C) and accelerates refractory lining erosion.'
  },
  {
    q: 'During Foaming Slag practice, what chemical reaction expands the slag layer from 4 inches to 12 inches to shroud the electric arc?',
    options: [
      'CaCO₃ → CaO + CO₂ (Limestone calcination)',
      'FeO + C → Fe + CO↑ (Injected carbon reacting with iron oxide in slag)',
      'Si + O₂ → SiO₂ (Silicon oxidation)',
      '2P + 5O → P₂O₅ (Dephosphorization)'
    ],
    correct: 1,
    explanation:
      'Injecting granular coal (C) alongside oxygen causes carbon to reduce iron oxide in the slag (FeO + C → Fe + CO↑), generating millions of CO gas bubbles that expand the slag from 4" to 12" and save 2%–3% of total energy.'
  },
  {
    q: 'Why can an Electric Arc Furnace (EAF) produce high-value, low-phosphorus special alloy steels while a basic Induction Furnace (IF) cannot?',
    options: [
      'Induction furnaces cannot reach 1,600°C',
      'EAFs use overhead arcs and oxygen lancing to keep a basic CaO-rich slag hot and chemically reactive to strip out P and S',
      'EAFs only melt virgin iron ore',
      'Induction furnaces use graphite electrodes that contaminate the melt with phosphorus'
    ],
    correct: 1,
    explanation:
      'In an Induction Furnace, electromagnetic eddy currents heat only the metal while the top slag remains cold and viscous. An EAF superheats a basic CaO-MgO foamy slag with intense arcs and supersonic O₂, actively removing Phosphorus (P) and Sulfur (S).'
  }
];

// ==========================================
// COMPONENT 1: EAF ANATOMY SVG (7 HOTSPOTS)
// ==========================================

const EAFAnatomySVG = ({ selectedId, onSelect }) => {
  return (
    <div className="relative w-full bg-slate-950/90 rounded-2xl border border-slate-800/90 p-3 sm:p-5 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-2 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            3-Phase UHP AC Electric Arc Furnace • 7-Subsystem Cross-Section
          </span>
        </div>
        <span className="text-xs text-sky-400 bg-sky-950/70 border border-sky-800/60 px-2.5 py-1 rounded-full font-medium">
          Click numbered pins (1–7) to inspect engineering specs
        </span>
      </div>

      <svg
        viewBox="0 0 800 540"
        className="w-full h-auto max-h-[520px] select-none"
        role="img"
        aria-label="Interactive 2D Cross-Section of an Electric Arc Furnace"
      >
        <defs>
          <linearGradient id="moltenSteelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="slagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="refractoryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="electrodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="45%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="arcGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="arcFlash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. ROCKER CRADLE & TILTING BASE */}
        <g onClick={() => onSelect('tapping')} className="cursor-pointer">
          <rect x="170" y="490" width="460" height="22" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <path
            d="M 220 440 Q 400 515 580 440 L 595 452 Q 400 532 205 452 Z"
            fill="#334155"
            stroke={selectedId === 'tapping' ? '#fbbf24' : '#64748b'}
            strokeWidth={selectedId === 'tapping' ? '2.5' : '1.5'}
          />
          <line x1="250" y1="490" x2="235" y2="430" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
          <line x1="550" y1="490" x2="565" y2="430" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
          <text x="135" y="478" fill="#94a3b8" fontSize="10.5" fontFamily="monospace">
            ◄ DE-SLAG TILT (-6°)
          </text>
          <text x="560" y="478" fill="#fbbf24" fontSize="10.5" fontFamily="monospace">
            EBT TAP TILT (+12°) ►
          </text>
        </g>

        {/* 2. REFRACTORY VESSEL & HEARTH */}
        <g onClick={() => onSelect('vessel')} className="cursor-pointer">
          <path
            d="M 190 215 L 190 365 Q 190 455 320 465 L 520 465 Q 635 455 645 385 L 645 340 L 595 325 L 595 215 Z"
            fill="url(#refractoryGrad)"
            stroke={selectedId === 'vessel' ? '#f59e0b' : '#94a3b8'}
            strokeWidth={selectedId === 'vessel' ? '3.5' : '2'}
          />
          <path
            d="M 212 220 L 212 355 Q 212 432 325 440 L 515 440 Q 612 432 620 380 L 620 350 L 575 335 L 575 220 Z"
            fill="#7c2d12"
            fillOpacity="0.65"
            stroke="#ea580c"
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />
          {[230, 252, 274, 296].map((yPos, idx) => (
            <React.Fragment key={idx}>
              <rect x="196" y={yPos} width="16" height="17" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
              <rect x="578" y={yPos} width="16" height="17" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            </React.Fragment>
          ))}
        </g>

        {/* 3. METALLIC CHARGE & MOLTEN BATH */}
        <g onClick={() => onSelect('charge')} className="cursor-pointer">
          <path
            d="M 215 215 L 215 352 Q 215 422 325 428 L 515 428 Q 600 422 608 375 L 608 352 L 574 338 L 574 215 Z"
            fill="#090d16"
          />
          <path
            d="M 216 335 L 574 335 L 608 352 L 608 375 Q 600 422 515 428 L 325 428 Q 216 422 216 352 Z"
            fill="url(#moltenSteelGrad)"
            stroke={selectedId === 'charge' ? '#fef08a' : 'none'}
            strokeWidth="2"
          />
          <path
            d="M 214 302 Q 270 294 330 303 T 450 300 T 575 304 L 575 336 L 215 336 Z"
            fill="url(#slagGrad)"
            stroke="#fbbf24"
            strokeWidth="1"
          />
          <text x="395" y="322" textAnchor="middle" fill="#fef3c7" fontSize="10.5" fontWeight="bold">
            12" FOAMING SLAG BLANKET (CaO • MgO • FeO • CO↑)
          </text>
          <text x="395" y="376" textAnchor="middle" fill="#fffbeb" fontSize="13" fontWeight="bold">
            MOLTEN STEEL BATH (1600°C – 1650°C | 56.7% Energy)
          </text>
          <text x="395" y="395" textAnchor="middle" fill="#fed7aa" fontSize="10" fontFamily="monospace">
            Scrap + 600°C Hot DRI + Pig Iron (85%–92% Yield)
          </text>
        </g>

        {/* 7. BOTTOM POROUS PLUGS (AR / N2 STIRRING) */}
        <g onClick={() => onSelect('stirring')} className="cursor-pointer">
          {[350, 410, 470].map((px, idx) => (
            <g key={idx}>
              <rect
                x={px - 8}
                y="426"
                width="16"
                height="24"
                rx="2"
                fill="#a855f7"
                stroke="#f3e8ff"
                strokeWidth={selectedId === 'stirring' ? '2.5' : '1'}
              />
              {/* Rising Inert Gas Plume */}
              <circle cx={px} cy="405" r="3.5" fill="#e9d5ff" opacity="0.85">
                <animate attributeName="cy" from="420" to="342" dur={`${1.1 + idx * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={px + 4} cy="375" r="2.5" fill="#e9d5ff" opacity="0.7">
                <animate attributeName="cy" from="415" to="340" dur={`${0.9 + idx * 0.25}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </g>

        {/* 6. SLAG DOOR & EBT TAP HOLE */}
        <g onClick={() => onSelect('tapping')} className="cursor-pointer">
          <rect
            x="176"
            y="292"
            width="42"
            height="42"
            rx="4"
            fill="#1e293b"
            stroke={selectedId === 'tapping' ? '#fbbf24' : '#f97316'}
            strokeWidth="2"
          />
          <text x="165" y="284" textAnchor="end" fill="#fb923c" fontSize="11" fontWeight="bold">
            SLAG DOOR
          </text>
          <text x="165" y="298" textAnchor="end" fill="#94a3b8" fontSize="9.5">
            (8.6% Slag Heat Loss)
          </text>

          <rect x="576" y="418" width="24" height="36" rx="3" fill="#fbbf24" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M 562 475 L 570 525 L 612 525 L 620 475 Z" fill="#334155" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 568 495 L 614 495 L 610 522 L 572 522 Z" fill="#f97316" />
          <text x="640" y="435" fill="#fbbf24" fontSize="11" fontWeight="bold">
            EBT TAP HOLE
          </text>
          <text x="640" y="449" fill="#94a3b8" fontSize="9.5">
            (Saves 7–25 kWh/t)
          </text>
        </g>

        {/* 1. WATER-COOLED ROOF & 4TH HOLE EXHAUST ELBOW */}
        <g onClick={() => onSelect('roof')} className="cursor-pointer">
          <path
            d="M 180 210 Q 395 140 610 210 L 595 224 Q 395 162 195 224 Z"
            fill="#0369a1"
            stroke={selectedId === 'roof' ? '#38bdf8' : '#7dd3fc'}
            strokeWidth={selectedId === 'roof' ? '3.5' : '2'}
          />
          {[220, 250, 280, 500, 530, 560].map((cx, i) => (
            <circle key={i} cx={cx} cy="196" r="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          ))}
          <path d="M 325 172 L 465 172 L 455 196 L 335 196 Z" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
          <path
            d="M 485 182 L 515 125 L 555 110 L 555 135 L 530 145 L 508 188 Z"
            fill="#334155"
            stroke="#ef4444"
            strokeWidth="1.5"
          />
          <text x="562" y="118" fill="#f87171" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            ~1100°C Off-Gas (11.8% Loss)
          </text>
          <text x="562" y="132" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
            → To Shaft Pre-Heater / Baghouse
          </text>
        </g>

        {/* 2. 3-PHASE GRAPHITE ELECTRODES & ARCS */}
        <g onClick={() => onSelect('electrodes')} className="cursor-pointer">
          <rect x="330" y="38" width="130" height="14" rx="4" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
          {[
            { x: 342, phase: 'Ø1' },
            { x: 386, phase: 'Ø2' },
            { x: 430, phase: 'Ø3' }
          ].map((el, i) => (
            <g key={i}>
              <rect
                x={el.x}
                y="45"
                width="24"
                height="228"
                rx="3"
                fill="url(#electrodeGrad)"
                stroke={selectedId === 'electrodes' ? '#38bdf8' : '#94a3b8'}
                strokeWidth={selectedId === 'electrodes' ? '2.5' : '1.5'}
              />
              <path d={`M ${el.x} 255 L ${el.x + 24} 255 L ${el.x + 20} 276 L ${el.x + 4} 276 Z`} fill="#f97316" />
              <text x={el.x + 12} y="70" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {el.phase}
              </text>
            </g>
          ))}
          <circle cx="354" cy="292" r="24" fill="url(#arcFlash)" />
          <circle cx="398" cy="292" r="28" fill="url(#arcFlash)" />
          <circle cx="442" cy="292" r="24" fill="url(#arcFlash)" />
          <g filter="url(#arcGlow)">
            <path d="M 354 275 L 344 288 L 362 296 L 348 308" stroke="#e0f2fe" strokeWidth="3.5" fill="none" />
            <path d="M 398 275 L 408 287 L 389 295 L 402 308" stroke="#7dd3fc" strokeWidth="4" fill="none" />
            <path d="M 442 275 L 434 289 L 450 297 L 438 308" stroke="#e0f2fe" strokeWidth="3.5" fill="none" />
          </g>
        </g>

        {/* 3. COHERENT JET OXYGEN LANCE & CARBON INJECTOR */}
        <g onClick={() => onSelect('lance')} className="cursor-pointer">
          <path
            d="M 675 215 L 525 292 L 532 304 L 682 227 Z"
            fill="#0e7490"
            stroke={selectedId === 'lance' ? '#22d3ee' : '#67e8f9'}
            strokeWidth="2"
          />
          <path d="M 526 298 L 465 325 L 478 336 Z" fill="#22d3ee" fillOpacity="0.65" filter="url(#arcGlow)" />
          <text x="675" y="198" textAnchor="end" fill="#22d3ee" fontSize="11" fontWeight="bold">
            COHERENT O₂ + CARBON LANCE
          </text>
          <text x="675" y="211" textAnchor="end" fill="#94a3b8" fontSize="9.5">
            (32.7% Exothermic Energy Input)
          </text>
        </g>

        {/* INTERACTIVE NUMBERED HOTSPOT PINS (1 TO 7) */}
        {ANATOMY_COMPONENTS.map((comp, idx) => {
          const isSelected = selectedId === comp.id;
          return (
            <g key={comp.id} onClick={() => onSelect(comp.id)} className="cursor-pointer">
              {isSelected && (
                <circle
                  cx={comp.hotspotPos.x}
                  cy={comp.hotspotPos.y}
                  r="22"
                  fill="none"
                  stroke={comp.color}
                  strokeWidth="2.5"
                >
                  <animate attributeName="r" from="14" to="26" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.9" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={comp.hotspotPos.x}
                cy={comp.hotspotPos.y}
                r={isSelected ? '15' : '13'}
                fill={isSelected ? comp.color : '#0f172a'}
                stroke={comp.color}
                strokeWidth="2.5"
              />
              <text
                x={comp.hotspotPos.x}
                y={comp.hotspotPos.y + 4}
                textAnchor="middle"
                fill={isSelected ? '#0f172a' : '#f8fafc'}
                fontSize="12"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {idx + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ==========================================
// COMPONENT 2: TAP-TO-TAP SIMULATOR SVG
// ==========================================

const TapToTapSimulatorSVG = ({ currentStepData }) => {
  const { step, furnaceTilt, temp, powerMW } = currentStepData;
  const electrodeYOffset =
    step === 1 ? -115 : step === 2 ? 12 : step === 3 ? 4 : step === 4 ? -45 : -65;
  const isRoofOpen = step === 1;

  return (
    <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden shadow-2xl">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: currentStepData.accent }}
          />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
            STAGE {step}/6: {currentStepData.status}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-orange-400">
            BATH TEMP: <strong>{temp}°C</strong>
          </span>
          <span className="text-sky-400">
            ARC POWER: <strong>{powerMW} MW</strong>
          </span>
          <span className="text-amber-300">
            TILT: <strong>{furnaceTilt > 0 ? `+${furnaceTilt}°` : `${furnaceTilt}°`}</strong>
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 760 440"
        className="w-full h-auto max-h-[430px] select-none"
        role="img"
        aria-label={`Animated EAF Simulation - Step ${step}: ${currentStepData.title}`}
      >
        <defs>
          <linearGradient id="simMolten" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="simSlag" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        <line x1="60" y1="395" x2="700" y2="395" stroke="#334155" strokeWidth="3" />

        {/* Left Slag Pot */}
        <g>
          <path
            d="M 85 335 L 95 392 L 155 392 L 165 335 Z"
            fill="#1e293b"
            stroke={step === 4 ? '#fb923c' : '#475569'}
            strokeWidth="2"
          />
          {step >= 4 && <path d="M 92 365 L 158 365 L 153 390 L 97 390 Z" fill="#d97706" />}
          <text x="125" y="414" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            Slag Pot
          </text>
        </g>

        {/* Right Pre-Heated Teeming Ladle */}
        <g>
          <path
            d="M 555 318 L 568 392 L 642 392 L 655 318 Z"
            fill="#1e293b"
            stroke={step === 5 ? '#fbbf24' : '#64748b'}
            strokeWidth="2.5"
          />
          {step === 5 && (
            <g>
              <path d="M 562 342 L 648 342 L 640 390 L 570 390 Z" fill="url(#simMolten)" />
              <path d="M 640 230 L 665 230 L 655 275 L 645 275 Z" fill="#475569" stroke="#cbd5e1" />
              <circle cx="645" cy="290" r="3.5" fill="#38bdf8" />
              <circle cx="638" cy="306" r="3" fill="#fde047" />
              <circle cx="632" cy="322" r="3.5" fill="#38bdf8" />
              <text x="672" y="252" fill="#38bdf8" fontSize="10" fontWeight="bold">
                + FeSi / FeMn / Al
              </text>
              <text x="672" y="265" fill="#94a3b8" fontSize="9.5">
                Deoxidizers & Alloys
              </text>
            </g>
          )}
          <text x="605" y="414" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace">
            Pre-Heated Ladle
          </text>
        </g>

        {/* TILTING FURNACE ASSEMBLY */}
        <g
          style={{
            transform: `rotate(${furnaceTilt}deg)`,
            transformOrigin: '380px 310px',
            transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          <path
            d="M 210 190 L 210 305 Q 210 368 310 375 L 485 375 Q 565 368 575 315 L 575 285 L 535 272 L 535 190 Z"
            fill="#334155"
            stroke="#94a3b8"
            strokeWidth="2.5"
          />
          <path
            d="M 228 194 L 228 300 Q 228 352 315 358 L 480 358 Q 548 352 555 310 L 555 292 L 518 280 L 518 194 Z"
            fill="#090d16"
            stroke={step === 6 ? '#a855f7' : '#ea580c'}
            strokeWidth={step === 6 ? '3' : '2'}
          />

          {step === 1 && (
            <g>
              <path
                d="M 232 345 L 260 250 L 325 235 L 385 225 L 445 240 L 515 275 L 515 355 L 232 355 Z"
                fill="#475569"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              <text x="375" y="275" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                STRATIFIED HEAVY & LIGHT SCRAP
              </text>
              <text x="375" y="305" textAnchor="middle" fill="#fde047" fontSize="10.5" fontFamily="monospace">
                + Hot/Cold DRI, Pig Iron & CaO/MgO Fluxes
              </text>
              <text x="375" y="340" textAnchor="middle" fill="#fb923c" fontSize="10">
                Light Scrap Cushion on Bottom Hearth
              </text>
            </g>
          )}

          {step === 2 && (
            <g>
              <path
                d="M 230 302 L 520 302 L 552 310 Q 542 352 480 357 L 315 357 Q 230 352 230 302 Z"
                fill="url(#simMolten)"
              />
              <polygon points="230,305 230,235 295,265 315,305" fill="#475569" stroke="#cbd5e1" />
              <polygon points="516,305 516,238 450,268 430,305" fill="#475569" stroke="#cbd5e1" />
              <text x="375" y="336" textAnchor="middle" fill="#fffbeb" fontSize="11" fontWeight="bold">
                MOLTEN POOL FORMING (UHP HIGH-VOLTAGE LONG ARCS)
              </text>
            </g>
          )}

          {(step === 3 || step === 4 || step === 5) && (
            <g>
              <path
                d="M 230 286 L 522 286 L 554 295 L 554 312 Q 545 352 480 357 L 315 357 Q 230 352 230 300 Z"
                fill="url(#simMolten)"
              />
              {step !== 5 && (
                <path
                  d="M 225 258 Q 300 248 375 258 T 520 258 L 520 288 L 228 288 Z"
                  fill="url(#simSlag)"
                />
              )}
              {step === 3 && (
                <g>
                  {[280, 320, 360, 405, 445, 480].map((bx, idx) => (
                    <circle
                      key={idx}
                      cx={bx}
                      cy={275 + (idx % 2) * 14}
                      r="5"
                      fill="#fef08a"
                      stroke="#f97316"
                      strokeWidth="1.5"
                    >
                      <animate
                        attributeName="cy"
                        from="325"
                        to="255"
                        dur={`${0.9 + idx * 0.15}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                  <text x="375" y="328" textAnchor="middle" fill="#fffbeb" fontSize="11" fontWeight="bold">
                    EXOTHERMIC OXIDATION (32.7% ENERGY) + 12" FOAMING SLAG
                  </text>
                </g>
              )}
            </g>
          )}

          {step === 6 && (
            <g>
              <path d="M 265 344 L 495 344 Q 475 357 380 357 Q 285 357 265 344 Z" fill="#ea580c" />
              <line x1="375" y1="150" x2="375" y2="275" stroke="#cbd5e1" strokeWidth="6" />
              <circle cx="375" cy="275" r="8" fill="#a855f7" />
              <path d="M 375 275 L 230 265 L 230 295 Z" fill="#c084fc" fillOpacity="0.45" />
              <path d="M 375 275 L 518 265 L 518 295 Z" fill="#c084fc" fillOpacity="0.45" />
              <text x="375" y="320" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">
                FETTLING MgO-C REFRACTORY & PACKING EBT WITH OLIVINE SAND
              </text>
            </g>
          )}

          {step === 3 && (
            <g>
              <line x1="595" y1="205" x2="470" y2="272" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" />
              <path d="M 470 272 L 415 302 L 430 312 Z" fill="#67e8f9" />
              <text x="590" y="195" textAnchor="end" fill="#22d3ee" fontSize="11" fontWeight="bold">
                Coherent O₂ + Carbon Injection
              </text>
            </g>
          )}

          <g
            style={{
              transform: isRoofOpen ? 'translate(215px, -65px) rotate(18deg)' : 'translate(0px, 0px)',
              transition: 'transform 0.7s ease-in-out'
            }}
          >
            <path
              d="M 200 188 Q 375 132 550 188 L 538 200 Q 375 150 212 200 Z"
              fill="#0284c7"
              stroke="#7dd3fc"
              strokeWidth="2"
            />
            <g
              style={{
                transform: `translateY(${electrodeYOffset}px)`,
                transition: 'transform 0.6s ease-out'
              }}
            >
              {[330, 368, 406].map((ex, i) => (
                <rect
                  key={i}
                  x={ex}
                  y="55"
                  width="18"
                  height="185"
                  rx="2"
                  fill="#334155"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              ))}
              {(step === 2 || step === 3) && (
                <g>
                  <circle cx="339" cy="252" r="22" fill="#38bdf8" fillOpacity="0.45" />
                  <circle cx="377" cy="252" r="26" fill="#e0f2fe" fillOpacity="0.6" />
                  <circle cx="415" cy="252" r="22" fill="#38bdf8" fillOpacity="0.45" />
                  <path
                    d="M 339 240 L 330 255 L 348 262 L 335 275 M 377 240 L 386 254 L 369 262 L 380 275 M 415 240 L 406 254 L 424 262 L 412 275"
                    stroke="#e0f2fe"
                    strokeWidth="3.5"
                    fill="none"
                  />
                </g>
              )}
            </g>
          </g>
        </g>

        {step === 1 && (
          <g>
            <path d="M 310 30 L 440 30 L 425 115 L 325 115 Z" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
            <line x1="325" y1="115" x2="295" y2="148" stroke="#f59e0b" strokeWidth="4" />
            <line x1="425" y1="115" x2="455" y2="148" stroke="#f59e0b" strokeWidth="4" />
            <path d="M 335 115 L 415 115 L 435 225 L 315 225 Z" fill="#f59e0b" fillOpacity="0.28" />
            <text x="375" y="75" textAnchor="middle" fill="#fef3c7" fontSize="12" fontWeight="bold">
              CLAMSHELL BUCKET
            </text>
          </g>
        )}

        {step === 4 && (
          <g>
            <path d="M 212 268 Q 150 278 130 365 L 146 365 Q 168 292 218 282 Z" fill="#f59e0b" />
            <text x="145" y="245" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">
              FLUSHING P₂O₅-RICH SLAG
            </text>
          </g>
        )}

        {step === 5 && (
          <g>
            <path d="M 548 345 Q 585 352 595 385 L 612 385 Q 602 342 558 335 Z" fill="#fef08a" />
            <text x="615" y="210" textAnchor="middle" fill="#fde047" fontSize="11.5" fontWeight="bold">
              1600°C–1650°C EBT STREAM
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// MAIN SUITE APPLICATION
// ==========================================

export default function App() {
  // Active View Tab (Strictly 1 of 6 sections at a time)
  const [activeSectionId, setActiveSectionId] = useState('anatomy');

  // Section 1 State: Anatomy Inspector
  const [selectedAnatomyId, setSelectedAnatomyId] = useState('electrodes');

  // Section 2 State: Tap-to-Tap Simulator
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Section 3 State: Material Balance, Energy Audit & SEC Simulator
  const [chargeMetallicTonnes, setChargeMetallicTonnes] = useState(125); // 100-180t
  const [yieldEfficiencyPct, setYieldEfficiencyPct] = useState(89.5); // 85% - 92%
  const [selectedEnergySlice, setSelectedEnergySlice] = useState(ENERGY_OUTPUT_STREAMS[1]); // Default to Exhaust Off-Gas Loss
  const [secTapToTapMin, setSecTapToTapMin] = useState(68); // 50 to 180 mins
  const [secTapTempC, setSecTapTempC] = useState(1620); // 1600 to 1720°C
  const [furnaceScaleType, setFurnaceScaleType] = useState('modern'); // 'mini' (35t), 'modern' (120t), 'mega' (220t)

  // Section 4 State: Operational Best Practices Lab
  const [foamingSlagEnabled, setFoamingSlagEnabled] = useState(true); // 4" vs 12"
  const [hotDriPct, setHotDriPct] = useState(50); // 0 to 70% Hot DRI at 600°C
  const [avoidTempOvershoot, setAvoidTempOvershoot] = useState(true); // Avoid +60°C overshoot (saves 12.5 kWh/t)
  const [coherentJetMode, setCoherentJetMode] = useState('lancing'); // 'burner' vs 'lancing'
  const [electrodeBestPractice, setElectrodeBestPractice] = useState(true); // 1.2 kg/t vs 2.4 kg/t

  // Section 5 State: Advanced Hardware Retrofits Configurator
  const [installedTechIds, setInstalledTechIds] = useState([
    'uhp_impedance',
    'ai_servo',
    'ebt_system',
    'shaft_preheat',
    'stirring_inverter'
  ]);
  const [selectedTechId, setSelectedTechId] = useState('uhp_impedance');
  const [ebtCompareMode, setEbtCompareMode] = useState('ebt'); // 'spout' vs 'ebt'

  // Section 6 State: Carbon Abatement & Quiz
  const [annualProductionMt, setAnnualProductionMt] = useState(2.0);
  const [eafIntensity, setEafIntensity] = useState(0.60);
  const [bfBofIntensity, setBfBofIntensity] = useState(2.15);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Auto-play timer for Section 2 Tap-to-Tap cycle
  useEffect(() => {
    if (!isAutoPlaying || activeSectionId !== 'cycle') return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % CYCLE_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeSectionId]);

  // Helper to navigate next/previous section
  const currentSectionIndex = NAVIGATION_SECTIONS.findIndex((s) => s.id === activeSectionId);
  const currentSectionMeta = NAVIGATION_SECTIONS[currentSectionIndex] || NAVIGATION_SECTIONS[0];

  const goToSection = (id) => {
    setActiveSectionId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // LIVE ENGINEERING CALCULATIONS
  // ==========================================

  // Section 1 & 2 Lookups
  const selectedAnatomy =
    ANATOMY_COMPONENTS.find((c) => c.id === selectedAnatomyId) || ANATOMY_COMPONENTS[0];
  const currentStepData = CYCLE_STEPS[currentStepIndex];

  // Section 3A: Material Balance Calculations
  const nonMetallicFluxTonnes = +(chargeMetallicTonnes * 0.065).toFixed(1); // ~65 kg/t lime + coal + alloys
  const electrodeMassKg = Math.round(chargeMetallicTonnes * 1.4); // ~1.4 kg/t
  const liquidSteelOutputTonnes = +((chargeMetallicTonnes * yieldEfficiencyPct) / 100).toFixed(1);
  const solidSlagOutputTonnes = +(chargeMetallicTonnes * 0.125).toFixed(1); // ~125 kg/t
  const offGasDustOutputTonnes = +(chargeMetallicTonnes * 0.019).toFixed(1); // ~19 kg/t baghouse EAF dust

  // Section 3C: Specific Energy Consumption (SEC) Model
  // Base SEC at 60 min TTT and 1600°C: ~385 kWh/t for mega, 405 for modern, 465 for mini
  const scalePenaltyKwh = furnaceScaleType === 'mega' ? -15 : furnaceScaleType === 'modern' ? 0 : 65;
  // Standing thermal loss increases by ~1.65 kWh/t per minute beyond 60 mins (so 180 min adds ~198 kWh/t -> ~600+ kWh/t)
  const timePenaltyKwh = Math.round((secTapToTapMin - 60) * 1.65);
  // Temperature overshoot penalty: strictly +12.5 kWh/t per +60°C above 1600°C (0.20833 kWh/t per °C)
  const tempOvershootC = Math.max(0, secTapTempC - 1600);
  const tempPenaltyKwh = +((tempOvershootC / 60) * 12.5).toFixed(1);
  const calculatedSecKwh = Math.round(400 + scalePenaltyKwh + timePenaltyKwh + tempPenaltyKwh);

  // Section 4: Operational Best Practices Cumulative Savings
  const foamingSlagSavedKwh = foamingSlagEnabled ? 15 : 0; // 2-3% of total energy (~15 kWh/t)
  const hotDriSavedKwh = Math.round((hotDriPct / 50) * 150); // 50% Hot DRI @ 600°C saves 150 kWh/t
  const tempDisciplineSavedKwh = avoidTempOvershoot ? 12.5 : 0; // Avoiding +60°C overshoot saves 12.5 kWh/t
  const electrodeConsumptionKgT = electrodeBestPractice ? 1.2 : 2.4;
  const totalBestPracticeKwhSaved = +(
    foamingSlagSavedKwh +
    hotDriSavedKwh +
    tempDisciplineSavedKwh +
    (coherentJetMode === 'lancing' ? 9 : 0)
  ).toFixed(1);

  // Section 5: Advanced Technologies Retrofit Calculator
  const toggleTechRetrofit = (id) => {
    setInstalledTechIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const baselineUnoptimizedSec = 520; // Baseline conventional plant kWh/t
  const totalTechSavedKwh = ADVANCED_TECH_MODULES.reduce(
    (sum, mod) => (installedTechIds.includes(mod.id) ? sum + mod.secSavingKwh : sum),
    0
  );
  const retrofittedPlantSec = baselineUnoptimizedSec - totalTechSavedKwh; // Reaches ~363 kWh/t when all 5 active (within 350-400 world-class benchmark)
  const selectedTechObj =
    ADVANCED_TECH_MODULES.find((m) => m.id === selectedTechId) || ADVANCED_TECH_MODULES[0];

  // Section 6: Carbon Abatement Calculations
  const totalBfBofEmissions = annualProductionMt * bfBofIntensity;
  const totalEafEmissions = annualProductionMt * eafIntensity;
  const annualCo2Saved = totalBfBofEmissions - totalEafEmissions;
  const reductionPercentage = Math.round(((bfBofIntensity - eafIntensity) / bfBofIntensity) * 100);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Ambient Industrial Glow Backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[550px] h-[320px] bg-orange-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-20 right-1/4 w-[480px] h-[300px] bg-sky-500/10 rounded-full blur-[130px]" />
      </div>

      {/* ========================================================= */}
      {/* PERSISTENT MULTI-SECTION INDUSTRIAL HEADER & NAVIGATOR     */}
      {/* ========================================================= */}
      <header className="relative z-30 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md sticky top-0 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-3">
          {/* Top Brand & Progress Indicator Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-sky-500 text-slate-950 shadow-lg shadow-orange-500/20 shrink-0">
                <Flame className="w-6 h-6 stroke-[2.3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    Metallurgical Engineering Suite
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                    Module {currentSectionMeta.number} of 06
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white mt-0.5">
                  Electric Arc Furnace (EAF){' '}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-sky-400 bg-clip-text text-transparent">
                    Engineering & Energy Optimization Suite
                  </span>
                </h1>
              </div>
            </div>

            {/* Global Benchmark Quick Pill */}
            <div className="flex items-center gap-3 self-start md:self-auto bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CO₂: 0.55–0.65 t/t</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5 text-sky-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Target SEC: 350–400 kWh/t</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="hidden sm:flex items-center gap-1.5 text-amber-400">
                <Scale className="w-3.5 h-3.5" />
                <span>Yield: 85%–92%</span>
              </div>
            </div>
          </div>

          {/* 6-Module Dedicated Navigation Bar */}
          <nav
            aria-label="EAF Engineering Modules"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 pt-2.5"
          >
            {NAVIGATION_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => goToSection(sec.id)}
                  className={`group flex flex-col justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-900 border-orange-500/80 shadow-lg shadow-orange-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  {isActive && (
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sec.accent}`}
                    />
                  )}
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`text-xs font-bold truncate ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {sec.shortTitle}
                    </span>
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-mono mt-1 truncate ${
                      isActive ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    {sec.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ========================================================= */}
      {/* ACTIVE MODULE VIEWPORT (SINGLE FOCUSED VIEW PER TAB)      */}
      {/* ========================================================= */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active Section Title Banner */}
        <div className="mb-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
              <span>MODULE {currentSectionMeta.number} OF 06</span>
              <span>•</span>
              <span className="text-sky-400">{currentSectionMeta.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {currentSectionMeta.fullTitle}
            </h2>
            <p className="text-sm text-slate-300 mt-1">{currentSectionMeta.subtitle}</p>
          </div>

          {/* Step Dots Indicator */}
          <div className="flex items-center gap-1.5 shrink-0">
            {NAVIGATION_SECTIONS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                title={s.shortTitle}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  s.id === activeSectionId
                    ? 'w-8 bg-gradient-to-r from-orange-500 to-sky-400'
                    : idx < currentSectionIndex
                    ? 'w-2.5 bg-slate-600 hover:bg-slate-400'
                    : 'w-2.5 bg-slate-800 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* VIEW 1: EAF ANATOMY & STRUCTURAL ARCHITECTURE                     */}
        {/* ================================================================= */}
        {activeSectionId === 'anatomy' && (
          <div className="space-y-6">
            {/* Quick Hotspot Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/50 border border-slate-800/80 p-3 rounded-2xl">
              <span className="text-xs font-mono uppercase text-slate-400 px-2">
                Select Subsystem (1–7):
              </span>
              {ANATOMY_COMPONENTS.map((comp, idx) => {
                const isSelected = selectedAnatomyId === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedAnatomyId(comp.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-400 text-orange-200 font-bold shadow-sm'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    #{idx + 1} {comp.name.split(' ')[0]} {comp.name.split(' ')[1]}
                  </button>
                );
              })}
            </div>

            {/* 2-Column Interactive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <EAFAnatomySVG
                  selectedId={selectedAnatomyId}
                  onSelect={(id) => setSelectedAnatomyId(id)}
                />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div
                  className="bg-slate-950 border-2 rounded-2xl p-5 sm:p-6 shadow-2xl transition-all"
                  style={{ borderColor: selectedAnatomy.color }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-xl text-slate-950 font-bold"
                        style={{ backgroundColor: selectedAnatomy.color }}
                      >
                        {React.createElement(selectedAnatomy.icon, { className: 'w-6 h-6' })}
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {selectedAnatomy.category}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-snug">
                          {selectedAnatomy.name}
                        </h3>
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full font-semibold shrink-0"
                      style={{
                        backgroundColor: `${selectedAnatomy.color}20`,
                        color: selectedAnatomy.color,
                        border: `1px solid ${selectedAnatomy.color}50`
                      }}
                    >
                      {selectedAnatomy.badge}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono">
                    <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-slate-400">Thermal Regime:</span>
                    <span className="text-amber-300 font-bold">{selectedAnatomy.tempRange}</span>
                  </div>

                  <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                    {selectedAnatomy.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Engineering Specifications & Energy Role
                    </h4>
                    {selectedAnatomy.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/60 px-3.5 py-2 rounded-lg border border-slate-800/70 text-xs gap-1"
                      >
                        <span className="text-slate-400 font-medium shrink-0">{spec.label}:</span>
                        <span className="text-slate-100 font-mono font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All 7 Subsystems Quick Directory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ANATOMY_COMPONENTS.map((comp, index) => {
                    const active = selectedAnatomyId === comp.id;
                    return (
                      <button
                        key={comp.id}
                        onClick={() => setSelectedAnatomyId(comp.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-slate-800/90 border-orange-500/80 shadow-md'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0"
                          style={{
                            backgroundColor: active ? comp.color : '#1e293b',
                            color: active ? '#0f172a' : comp.color
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-100 truncate">{comp.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{comp.badge}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: THE 60-90 MINUTE TAP-TO-TAP CYCLE SIMULATOR               */}
        {/* ================================================================= */}
        {activeSectionId === 'cycle' && (
          <div className="space-y-6">
            {/* Playback & Timeline Controls */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-bold text-white">
                    Interactive 6-Stage Tap-to-Tap Batch Controller (60–90 Min Standard Cycle)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentStepIndex(
                        (prev) => (prev - 1 + CYCLE_STEPS.length) % CYCLE_STEPS.length
                      );
                    }}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      isAutoPlaying
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                        : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                    }`}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause Auto-Cycle</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Auto-Play 6 Steps</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentStepIndex((prev) => (prev + 1) % CYCLE_STEPS.length);
                    }}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentStepIndex(0);
                    }}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer"
                    title="Reset to Step 1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {CYCLE_STEPS.map((st, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isPassed = idx < currentStepIndex;
                  return (
                    <button
                      key={st.step}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentStepIndex(idx);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-950 border-2 shadow-lg'
                          : isPassed
                          ? 'bg-slate-950/60 border-slate-800 opacity-90'
                          : 'bg-slate-950/40 border-slate-800/70 opacity-70 hover:opacity-100'
                      }`}
                      style={{ borderColor: isCurrent ? st.accent : undefined }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span
                          className="px-2 py-0.5 rounded font-bold"
                          style={{
                            backgroundColor: isCurrent ? st.accent : '#1e293b',
                            color: isCurrent ? '#0f172a' : '#94a3b8'
                          }}
                        >
                          STEP {st.step}
                        </span>
                        <span className="text-slate-400 text-[10px]">{st.duration}</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1 mt-1">{st.title}</p>
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>0 MIN (BUCKET CHARGE)</span>
                  <span className="text-amber-400 font-bold">
                    ACTIVE STAGE WINDOW: {currentStepData.duration} ({currentStepData.timeProgress}% ELAPSED)
                  </span>
                  <span>85–90 MIN (TURNAROUND COMPLETE)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${currentStepData.timeProgress}%`,
                      background: 'linear-gradient(90deg, #f59e0b 0%, #38bdf8 50%, #fbbf24 100%)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Simulator + Telemetry Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <TapToTapSimulatorSVG currentStepData={currentStepData} />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>MOLTEN BATH TEMP</span>
                      <Thermometer className="w-4 h-4 text-orange-400" />
                    </div>
                    <p className="text-2xl font-extrabold text-white mt-1 font-mono">
                      {currentStepData.temp}°C
                    </p>
                    <div className="w-full h-2 bg-slate-900 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (currentStepData.temp / 1700) * 100)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Target Tap: 1600°C–1650°C</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>TRANSFORMER POWER</span>
                      <Zap className="w-4 h-4 text-sky-400" />
                    </div>
                    <p className="text-2xl font-extrabold text-sky-400 mt-1 font-mono">
                      {currentStepData.powerMW} MW
                    </p>
                    <div className="w-full h-2 bg-slate-900 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-500"
                        style={{ width: `${(currentStepData.powerMW / 95) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 truncate">
                      {currentStepData.voltageTap}
                    </p>
                  </div>
                </div>

                <div
                  className="bg-slate-950 border-2 rounded-2xl p-5 space-y-4 shadow-xl"
                  style={{ borderColor: currentStepData.accent }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-mono font-bold px-2.5 py-1 rounded-md text-slate-950"
                      style={{ backgroundColor: currentStepData.accent }}
                    >
                      STEP {currentStepData.step} OF 6 • {currentStepData.duration}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Vessel Tilt: {currentStepData.furnaceTilt}°
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{currentStepData.title}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {currentStepData.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-xs font-mono uppercase text-slate-400">
                      Process Metallurgy & Control Actions:
                    </p>
                    {currentStepData.details.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: currentStepData.accent }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs font-mono">
                    <span className="text-amber-400 font-bold">PHASE CHEMISTRY: </span>
                    <span className="text-slate-300">{currentStepData.metallurgy}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: ENERGY AUDITING: MATERIAL BALANCES, LOSSES & SEC          */}
        {/* ================================================================= */}
        {activeSectionId === 'auditing' && (
          <div className="space-y-8">
            {/* SUB-MODULE 3A: INTERACTIVE MATERIAL BALANCE & YIELD EFFICIENCY */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Sub-Module 3A • Mass Conservation Audit
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Interactive Material Balance & Yield Efficiency Calculator (85%–92%)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Input metallics (scrap, DRI, pig iron) and non-metallics (lime, coke, ferro-alloys, graphite electrodes) are weighed against output liquid steel, solid slag, and off-gas dust.
                  </p>
                </div>
                <div className="bg-emerald-950/50 border border-emerald-500/40 px-4 py-2 rounded-xl text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                    Metallic Yield Efficiency
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-400">
                    {yieldEfficiencyPct.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Sliders */}
                <div className="lg:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">TOTAL METALLIC CHARGE INPUT:</span>
                      <span className="text-orange-400 font-bold">{chargeMetallicTonnes} Tonnes</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="200"
                      step="5"
                      value={chargeMetallicTonnes}
                      onChange={(e) => setChargeMetallicTonnes(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>80t Heat</span>
                      <span>140t Heat</span>
                      <span>200t Heat</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">YIELD EFFICIENCY (85%–92% BENCHMARK):</span>
                      <span className="text-emerald-400 font-bold">{yieldEfficiencyPct.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="85.0"
                      max="92.0"
                      step="0.5"
                      value={yieldEfficiencyPct}
                      onChange={(e) => setYieldEfficiencyPct(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>85% (High Slag/Rust Scrap)</span>
                      <span>88.5% Avg</span>
                      <span>92% (Clean Scrap + Coherent O₂)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Yield Definition:</strong> Ratio of liquid steel tapped ({liquidSteelOutputTonnes}t) to total metallic charge ({chargeMetallicTonnes}t). Iron lost as FeO in slag and baghouse dust accounts for the 8%–15% difference.
                  </div>
                </div>

                {/* Flow Diagram: Inputs -> Furnace -> Outputs */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  {/* Inputs Column */}
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-500/40">
                      <span className="text-[10px] font-mono uppercase text-orange-400">
                        Input Metallics
                      </span>
                      <p className="text-xl font-mono font-bold text-white mt-0.5">
                        {chargeMetallicTonnes.toFixed(1)} t
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Scrap, DRI & Pig Iron
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40">
                      <span className="text-[10px] font-mono uppercase text-sky-400">
                        Input Non-Metallics
                      </span>
                      <p className="text-lg font-mono font-bold text-white mt-0.5">
                        {nonMetallicFluxTonnes} t Flux/Coal
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        + {electrodeMassKg} kg Graphite Electrodes
                      </p>
                    </div>
                  </div>

                  {/* Center Furnace Processing */}
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 text-center">
                    <Flame className="w-8 h-8 text-orange-500 mb-1" />
                    <span className="text-xs font-mono font-bold text-white">EAF MASS BALANCE</span>
                    <span className="text-[11px] font-mono text-amber-400 mt-1">
                      1,600°C–1,650°C
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-400 mt-2 hidden sm:block" />
                  </div>

                  {/* Outputs Column */}
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/50">
                      <span className="text-[10px] font-mono uppercase text-emerald-300">
                        1. Liquid Steel Output
                      </span>
                      <p className="text-xl font-mono font-extrabold text-emerald-400">
                        {liquidSteelOutputTonnes} t ({yieldEfficiencyPct}%)
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40">
                      <span className="text-[10px] font-mono uppercase text-amber-300">
                        2. Solid Slag Output
                      </span>
                      <p className="text-base font-mono font-bold text-white">
                        {solidSlagOutputTonnes} t (~125 kg/t)
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/40">
                      <span className="text-[10px] font-mono uppercase text-rose-300">
                        3. Off-Gas Baghouse Dust
                      </span>
                      <p className="text-base font-mono font-bold text-white">
                        {offGasDustOutputTonnes} t (~19 kg/t)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SUB-MODULE 3B: COMPLETE HEAT ENERGY BALANCE (INPUTS VS OUTPUTS & LOSSES) */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                  Sub-Module 3B • Where Does All the Energy Go?
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Complete EAF Thermal Energy Balance (Inputs vs. 56.7% Useful Steel & 43.3% Losses)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Click any energy input or heat loss slice below to inspect how steel engineers measure, audit, and recover that specific thermal stream.
                </p>
              </div>

              {/* Dual Stacked Visual Bars */}
              <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                {/* Energy Inputs Stacked Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-sky-400 font-bold">
                      ENERGY INPUTS (50.2% ELECTRICAL + 32.7% EXOTHERMIC OXIDATION + FUEL/ELECTRODES/SLAG)
                    </span>
                    <span className="text-slate-400">100% Total Input</span>
                  </div>
                  <div className="w-full h-10 rounded-xl overflow-hidden flex border border-slate-800">
                    {ENERGY_INPUT_STREAMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedEnergySlice(item)}
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                        className="h-full flex items-center justify-center text-[11px] font-mono font-bold text-slate-950 hover:opacity-90 transition-opacity cursor-pointer border-r border-slate-950/30 overflow-hidden"
                        title={`${item.name}: ${item.pct}%`}
                      >
                        {item.pct >= 6 && `${item.pct}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Energy Outputs & Losses Stacked Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      ENERGY OUTPUTS: 56.7% MOLTEN STEEL vs. 43.3% TOTAL ENVIRONMENTAL LOSSES
                    </span>
                    <span className="text-rose-400 font-bold">43.3% Heat Lost!</span>
                  </div>
                  <div className="w-full h-10 rounded-xl overflow-hidden flex border border-slate-800">
                    {ENERGY_OUTPUT_STREAMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedEnergySlice(item)}
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                        className="h-full flex items-center justify-center text-[11px] font-mono font-bold text-slate-950 hover:opacity-90 transition-opacity cursor-pointer border-r border-slate-950/30 overflow-hidden"
                        title={`${item.name}: ${item.pct}%`}
                      >
                        {item.pct >= 6 && `${item.pct}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Stream Audit Callout Box */}
                {selectedEnergySlice && (
                  <div
                    className="p-4 rounded-xl bg-slate-900/90 border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    style={{ borderColor: selectedEnergySlice.color }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-mono font-bold px-2 py-0.5 rounded text-slate-950"
                          style={{ backgroundColor: selectedEnergySlice.color }}
                        >
                          {selectedEnergySlice.pct}% OF TOTAL ENERGY
                        </span>
                        <h4 className="text-sm font-bold text-white">{selectedEnergySlice.name}</h4>
                      </div>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {selectedEnergySlice.auditNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Detailed Breakdown Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Inputs List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase text-slate-400 pb-1 border-b border-slate-800">
                      Energy Input Breakdown
                    </h4>
                    {ENERGY_INPUT_STREAMS.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedEnergySlice(st)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedEnergySlice?.id === st.id
                            ? 'bg-slate-900 border-sky-500/60'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-3 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: st.color }}
                          />
                          <span className="text-xs text-slate-200 truncate">{st.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white ml-2">
                          {st.pct}%
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Outputs & Losses List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase text-slate-400 pb-1 border-b border-slate-800">
                      Energy Outputs & 43.3% Loss Drivers
                    </h4>
                    {ENERGY_OUTPUT_STREAMS.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedEnergySlice(st)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedEnergySlice?.id === st.id
                            ? 'bg-slate-900 border-orange-500/60'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-3 h-3 rounded-sm shrink-0"
                            style={{ backgroundColor: st.color }}
                          />
                          <span className="text-xs text-slate-200 truncate">{st.name}</span>
                        </div>
                        <span
                          className={`text-xs font-mono font-bold ml-2 ${
                            st.isUseful ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {st.pct}% {st.isUseful ? '(Useful)' : '(Loss)'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SUB-MODULE 3C: SPECIFIC ENERGY CONSUMPTION (SEC) SIMULATOR */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Sub-Module 3C • Ultimate Furnace Efficiency KPI
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Specific Energy Consumption (SEC) Interactive Simulator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Explore how <strong>Furnace Scale</strong>, <strong>Tap-to-Tap Time (180 min → 60 min)</strong>, and <strong>Tapping Temperature Overshoot (+12.5 kWh/t per +60°C)</strong> dictate SEC across plants (from 415 kWh/t modern EAFs to &gt;675 kWh/t older mini-EAFs).
                  </p>
                </div>

                {/* Live SEC Gauge */}
                <div className="bg-slate-950 border-2 border-amber-500/60 px-5 py-3 rounded-2xl text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Simulated Plant SEC
                  </span>
                  <span
                    className={`text-3xl font-mono font-extrabold ${
                      calculatedSecKwh <= 415
                        ? 'text-emerald-400'
                        : calculatedSecKwh <= 520
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {calculatedSecKwh} kWh/t
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 6 Cols: Interactive SEC Controls */}
                <div className="lg:col-span-6 space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  {/* Factor 1: Furnace Scale */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-300 block">
                      1. Furnace Vessel Scale (Wall Surface-Area-to-Volume Ratio):
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'mini', label: 'Older Mini-EAF (30t)', sub: '+65 kWh/t wall loss' },
                        { id: 'modern', label: 'Modern EAF (120t)', sub: 'Standard Baseline' },
                        { id: 'mega', label: 'Ultra-Large (220t+)', sub: '-15 kWh/t scale gain' }
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => setFurnaceScaleType(sc.id)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            furnaceScaleType === sc.id
                              ? 'bg-orange-500/20 border-orange-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <p className="text-xs font-bold">{sc.label}</p>
                          <p className="text-[10px] font-mono text-amber-300 mt-0.5">{sc.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Factor 2: Tap-to-Tap Cycle Time (TTT) */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">2. TAP-TO-TAP TIME (TTT):</span>
                      <span className="text-sky-400 font-bold">
                        {secTapToTapMin} mins ({timePenaltyKwh >= 0 ? `+${timePenaltyKwh}` : timePenaltyKwh} kWh/t)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="180"
                      step="5"
                      value={secTapToTapMin}
                      onChange={(e) => setSecTapToTapMin(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>50–60 min (&lt;400 kWh/t)</span>
                      <span>120 min</span>
                      <span>180 min (~600+ kWh/t)</span>
                    </div>
                  </div>

                  {/* Factor 3: Final Tapping Temperature Overshoot */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-300">3. FINAL TAPPING TEMPERATURE:</span>
                      <span className="text-rose-400 font-bold">
                        {secTapTempC}°C (+{tempOvershootC}°C overshoot = +{tempPenaltyKwh} kWh/t)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1600"
                      max="1720"
                      step="10"
                      value={secTapTempC}
                      onChange={(e) => setSecTapTempC(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                      <span>1600°C (Optimal Target)</span>
                      <span>1660°C (+60°C = +12.5 kWh/t)</span>
                      <span>1720°C (+120°C = +25.0 kWh/t)</span>
                    </div>
                  </div>
                </div>

                {/* Right 6 Cols: Benchmark Comparison Spectrum */}
                <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    Global SEC Benchmark Spectrum (kWh per Tonne of Steel)
                  </h4>

                  <div className="space-y-3.5 my-auto">
                    {/* World-Class Benchmark */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-emerald-400 font-bold">
                          World-Class Best-in-Class (Advanced Retrofits)
                        </span>
                        <span className="text-emerald-400 font-bold">350 – 400 kWh/t</span>
                      </div>
                      <div className="w-full h-5 bg-slate-900 rounded-lg overflow-hidden p-0.5">
                        <div className="h-full bg-emerald-500 rounded" style={{ width: '52%' }} />
                      </div>
                    </div>

                    {/* Efficient Modern Plant */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-sky-400 font-bold">
                          Efficient Modern EAF Plant Benchmark
                        </span>
                        <span className="text-sky-400 font-bold">~415 kWh/t</span>
                      </div>
                      <div className="w-full h-5 bg-slate-900 rounded-lg overflow-hidden p-0.5">
                        <div className="h-full bg-sky-500 rounded" style={{ width: '58%' }} />
                      </div>
                    </div>

                    {/* User Simulated Plant */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-amber-300 font-bold">
                          ► YOUR SIMULATED FURNACE OPERATING POINT
                        </span>
                        <span className="text-amber-300 font-bold">{calculatedSecKwh} kWh/t</span>
                      </div>
                      <div className="w-full h-6 bg-slate-900 rounded-lg overflow-hidden p-0.5 border border-amber-500/50">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded transition-all duration-300"
                          style={{ width: `${Math.min(100, (calculatedSecKwh / 720) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Older Mini-EAF */}
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-rose-400 font-bold">
                          Older Mini-EAFs / Long 180-Min TTT
                        </span>
                        <span className="text-rose-400 font-bold">&gt; 600 – 675+ kWh/t</span>
                      </div>
                      <div className="w-full h-5 bg-slate-900 rounded-lg overflow-hidden p-0.5">
                        <div className="h-full bg-rose-600 rounded" style={{ width: '94%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400">Engineering Takeaway:</strong> Shortening Tap-to-Tap Time (TTT) from <strong>180 minutes down to 60 minutes</strong> slashes fixed standing heat losses, dropping SEC from <strong>~600 kWh/t to under 400 kWh/t</strong>. Meanwhile, overheating the bath by <strong>+60°C wastes +12.5 kWh/t</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 4: OPERATIONAL BEST PRACTICES FOR PEAK EFFICIENCY            */}
        {/* ================================================================= */}
        {activeSectionId === 'practices' && (
          <div className="space-y-6">
            {/* Top Cumulative Savings Banner */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/40 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  Zero-CapEx Operational Discipline
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Interactive 5-Practice Optimization Lab
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  Configure the 5 operational practices below to see how foaming slag, 600°C Hot DRI charging, temperature discipline, coherent O₂ jets, and electrode management cut electrical demand.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0 bg-slate-950/90 border border-slate-800 px-5 py-3 rounded-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Cumulative Power Saved
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-400">
                    -{totalBestPracticeKwhSaved} kWh/t
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Electrode Rate
                  </span>
                  <span className="text-2xl font-mono font-extrabold text-sky-400">
                    {electrodeConsumptionKgT} kg/t
                  </span>
                </div>
              </div>
            </div>

            {/* 5 Interactive Practice Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* PRACTICE 1: FOAMING SLAG PRACTICE (6 Cols) */}
              <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-orange-400 uppercase">
                      Practice 01 • Thermal Arc Shrouding
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      1. Foaming Slag Practice (4" → 12" Expansion)
                    </h4>
                  </div>
                  <button
                    onClick={() => setFoamingSlagEnabled(!foamingSlagEnabled)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                      foamingSlagEnabled
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {foamingSlagEnabled ? 'ACTIVE: 12" FOAMY SLAG' : 'OFF: 4" EXPOSED ARC'}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  During flat-bath melting, exposed arcs radiate intense heat onto sidewall refractories. Injecting granular coal alongside oxygen reacts with iron oxide (<strong className="text-amber-300 font-mono">FeO + C → Fe + CO↑</strong>), expanding the slag from <strong>4 inches to 12 inches</strong> to bury the arc and save <strong>2%–3% of total energy</strong>.
                </p>

                {/* Interactive SVG Visual: 4" Exposed vs 12" Foaming Slag */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <svg viewBox="0 0 420 155" className="w-full h-auto">
                    {/* Sidewall Water Panels */}
                    <rect x="15" y="15" width="16" height="125" rx="3" fill={foamingSlagEnabled ? '#0284c7' : '#ef4444'} />
                    <rect x="389" y="15" width="16" height="125" rx="3" fill={foamingSlagEnabled ? '#0284c7' : '#ef4444'} />
                    {/* Molten Steel Bath */}
                    <rect x="31" y="105" width="358" height="35" fill="#ea580c" />
                    {/* Slag Layer (4 inch thin vs 12 inch thick foam) */}
                    <rect
                      x="31"
                      y={foamingSlagEnabled ? '48' : '90'}
                      width="358"
                      height={foamingSlagEnabled ? '57' : '15'}
                      fill="#d97706"
                      fillOpacity={foamingSlagEnabled ? '0.88' : '0.95'}
                    />
                    {/* CO Bubbles when Foaming */}
                    {foamingSlagEnabled &&
                      [75, 120, 165, 255, 300, 345].map((cx, i) => (
                        <circle key={i} cx={cx} cy={68 + (i % 2) * 14} r="5" fill="#fef08a" opacity="0.75" />
                      ))}
                    {/* Graphite Electrode */}
                    <rect x="192" y="10" width="36" height="62" rx="3" fill="#475569" stroke="#cbd5e1" />
                    {/* Electric Arc */}
                    <circle cx="210" cy="84" r="18" fill="#38bdf8" fillOpacity="0.6" />
                    {/* Radiation Rays if Exposed */}
                    {!foamingSlagEnabled && (
                      <g stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3">
                        <line x1="190" y1="80" x2="35" y2="45" />
                        <line x1="230" y1="80" x2="385" y2="45" />
                        <text x="210" y="35" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                          SEVERE SIDEWALL RADIATION LOSS (4" THIN SLAG)
                        </text>
                      </g>
                    )}
                    {foamingSlagEnabled && (
                      <text x="210" y="34" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                        ARC SHROUDED INSIDE 12" FOAMY SLAG (SAVES 2%–3% ENERGY)
                      </text>
                    )}
                    <text x="210" y="127" textAnchor="middle" fill="#fffbeb" fontSize="10" fontWeight="bold">
                      MOLTEN STEEL BATH (1620°C)
                    </text>
                  </svg>
                </div>
              </div>

              {/* PRACTICE 2: HOT DRI (600°C) & HOT METAL CHARGING (6 Cols) */}
              <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-sky-400 uppercase">
                        Practice 02 • Sensible & Chemical Heat
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        2. Hot DRI (600°C) & Hot Metal Charging
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      -{hotDriSavedKwh} kWh/t Saved
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    Instead of loading room-temperature materials, feeding Direct Reduced Iron (DRI) at <strong>600°C</strong> directly from an adjacent shaft reactor introduces massive sensible heat. Combined with dissolved carbon in pig iron, charging <strong>50% hot DRI trims electrical demand by up to 150 kWh/t</strong>.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">600°C HOT DRI CHARGE SHARE:</span>
                    <span className="text-amber-400 font-bold">
                      {hotDriPct}% Hot DRI → Saves {hotDriSavedKwh} kWh/t
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="70"
                    step="5"
                    value={hotDriPct}
                    onChange={(e) => setHotDriPct(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>0% (Cold Charge Only)</span>
                    <span className="text-emerald-400 font-bold">50% Hot DRI (-150 kWh/t)</span>
                    <span>70% Hot DRI (-210 kWh/t)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">DRI FEED TEMPERATURE</span>
                    <span className="text-orange-400 font-bold text-base">600°C Pneumatic/Gravity</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">PIG IRON CARBON ASSIST</span>
                    <span className="text-sky-400 font-bold text-base">4.0%–4.5% C Exothermic</span>
                  </div>
                </div>
              </div>

              {/* PRACTICE 3: STRICT TEMP CONTROL & FAST TURNAROUND (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase">
                    Practice 03 • Thermal Discipline
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    3. Strict Temp Control & &lt;60 Min Turnaround
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Avoiding an unnecessary <strong>+60°C superheat overshoot saves 12.5 kWh/t</strong> and preserves refractory brickwork. Standardizing scrap segregation keeps Tap-to-Tap Times <strong>under 60 minutes</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setAvoidTempOvershoot(!avoidTempOvershoot)}
                    className={`w-full p-3 rounded-xl border text-left font-mono text-xs cursor-pointer transition-all flex items-center justify-between ${
                      avoidTempOvershoot
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                    }`}
                  >
                    <span>
                      {avoidTempOvershoot
                        ? '✓ Strict 1620°C Target (No +60°C Overshoot)'
                        : '✗ +60°C Superheat Overshoot Active'}
                    </span>
                    <span className="font-bold">
                      {avoidTempOvershoot ? '-12.5 kWh/t' : '+12.5 kWh/t'}
                    </span>
                  </button>
                </div>
              </div>

              {/* PRACTICE 4: COHERENT JET O2 & BURNER MANAGEMENT (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase">
                    Practice 04 • Dual-Mode Injectors
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    4. Coherent Jet O₂ & Sidewall Burners
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Sidewall oxy-fuel burners melt peripheral cold spots between electrodes during bore-down, then transition to <strong>coherent supersonic O₂ lancing</strong> once a pool forms—<strong>shortening cycle times by 3–6 minutes</strong> and boosting steel yields.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCoherentJetMode('burner')}
                    className={`p-2.5 rounded-xl border text-xs font-mono cursor-pointer ${
                      coherentJetMode === 'burner'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Mode 1: Bore-Down Burner
                  </button>
                  <button
                    onClick={() => setCoherentJetMode('lancing')}
                    className={`p-2.5 rounded-xl border text-xs font-mono cursor-pointer ${
                      coherentJetMode === 'lancing'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Mode 2: Coherent O₂ (-3 to -6 min)
                  </button>
                </div>
              </div>

              {/* PRACTICE 5: ELECTRODE MANAGEMENT EXCELLENCE (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 uppercase">
                    Practice 05 • Graphite Conservation
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    5. Electrode Management (1.2 kg/t Benchmark)
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Preventing mechanical joint breakage via proper scrap loading (no heavy chunks at top), minimizing sidewall oxidation, and optimizing arc length brings graphite consumption down to <strong>1.2 kg per tonne of steel</strong>.
                  </p>
                </div>

                <button
                  onClick={() => setElectrodeBestPractice(!electrodeBestPractice)}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs cursor-pointer transition-all flex items-center justify-between ${
                    electrodeBestPractice
                      ? 'bg-purple-950/40 border-purple-500/60 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>
                    {electrodeBestPractice
                      ? '✓ Exemplary Electrode Care Active'
                      : 'Legacy Unoptimized Electrode Wear'}
                  </span>
                  <span className="font-bold text-sm">
                    {electrodeConsumptionKgT} kg/t
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 5: ADVANCED ENERGY-EFFICIENT TECHNOLOGIES (350-400 kWh/t)    */}
        {/* ================================================================= */}
        {activeSectionId === 'technologies' && (
          <div className="space-y-6">
            {/* Top Retrofit Waterfall & World-Class SEC Target Banner */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
                    Hardware & Digital Frontier • World-Class 350–400 kWh/t Target
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Interactive Plant Retrofit Configurator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Toggle each of the 5 state-of-the-art technologies on or off to see how modern steel plants drive Specific Energy Consumption down into the global benchmark zone (<strong>350–400 kWh/t</strong>).
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-slate-950 border-2 border-emerald-500/50 px-5 py-3 rounded-2xl shrink-0">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Unoptimized Baseline
                    </span>
                    <span className="text-lg font-mono font-bold text-slate-400 line-through">
                      {baselineUnoptimizedSec} kWh/t
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                      Retrofitted Plant SEC
                    </span>
                    <span className="text-3xl font-mono font-extrabold text-emerald-400">
                      {retrofittedPlantSec} kWh/t
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Toggleable Technology Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {ADVANCED_TECH_MODULES.map((mod, idx) => {
                  const isInstalled = installedTechIds.includes(mod.id);
                  const isSelected = selectedTechId === mod.id;
                  return (
                    <div
                      key={mod.id}
                      onClick={() => setSelectedTechId(mod.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-950 border-2 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:bg-slate-950'
                      }`}
                      style={{ borderColor: isSelected ? mod.color : undefined }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                            Tech 0{idx + 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTechRetrofit(mod.id);
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                              isInstalled
                                ? 'bg-emerald-500 text-slate-950'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {isInstalled ? 'INSTALLED ✓' : 'BYPASSED'}
                          </button>
                        </div>
                        <p className="text-xs font-bold text-white leading-snug">{mod.title}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">SEC Impact:</span>
                        <span className="font-bold" style={{ color: mod.color }}>
                          -{mod.secSavingKwh} kWh/t
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deep-Dive Inspector for Selected Advanced Technology */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left 7 Cols: Engineering Deep-Dive */}
              <div
                className="lg:col-span-7 bg-slate-950 border-2 rounded-2xl p-6 flex flex-col justify-between space-y-5"
                style={{ borderColor: selectedTechObj.color }}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {selectedTechObj.category}
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${selectedTechObj.color}20`,
                        color: selectedTechObj.color,
                        border: `1px solid ${selectedTechObj.color}50`
                      }}
                    >
                      {selectedTechObj.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedTechObj.title}</h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedTechObj.summary}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-slate-400">
                    How It Works & Quantitative Plant Impact:
                  </h4>
                  {selectedTechObj.engineeringMechanics.map((mech, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: selectedTechObj.color }}
                      />
                      <span>{mech}</span>
                    </div>
                  ))}
                </div>

                {/* Special Quantitative KPI Pills */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      UHP + SERIES REACTOR
                    </span>
                    <span className="text-sm font-mono font-bold text-sky-400">
                      -33% Peak Isc / -50% Tip Stress
                    </span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      EBT + BOTTOM STIRRING
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-400">
                      7–25 + 5–30 kWh/t Saved
                    </span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      &gt;1 kHz Q-ONE INVERTER
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      Unity PF • -10% Energy
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Interactive EBT vs Spout & High-Impedance Visualizer */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-amber-400">
                    Interactive Subsystem Comparator
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setEbtCompareMode('spout')}
                      className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                        ebtCompareMode === 'spout'
                          ? 'bg-rose-500/20 border border-rose-500 text-rose-300 font-bold'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Legacy Spout Tap
                    </button>
                    <button
                      onClick={() => setEbtCompareMode('ebt')}
                      className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                        ebtCompareMode === 'ebt'
                          ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Modern EBT Tap
                    </button>
                  </div>
                </div>

                {/* SVG Comparing Conventional Spout vs EBT */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                  <svg viewBox="0 0 380 210" className="w-full h-auto">
                    {ebtCompareMode === 'spout' ? (
                      <g>
                        {/* High 38° Tilt Vessel */}
                        <g transform="rotate(28 170 110)">
                          <path
                            d="M 70 60 L 70 125 Q 70 155 150 155 L 265 135 L 235 60 Z"
                            fill="#334155"
                            stroke="#f87171"
                            strokeWidth="2"
                          />
                          <path d="M 75 95 L 250 115 L 260 132 L 145 150 Q 75 150 75 120 Z" fill="#ea580c" />
                          <path d="M 75 84 L 245 104 L 250 115 L 75 95 Z" fill="#d97706" />
                        </g>
                        {/* Long Exposed Stream + Slag Carryover */}
                        <path d="M 245 142 Q 275 162 280 198 L 292 198 Q 288 155 252 135 Z" fill="#f97316" />
                        <text x="190" y="25" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">
                          LEGACY SPOUT: 38° TILT • SLAG MIXING • SLOW TAP
                        </text>
                      </g>
                    ) : (
                      <g>
                        {/* Low 12° Tilt EBT Vessel */}
                        <g transform="rotate(10 170 110)">
                          <path
                            d="M 70 60 L 70 125 Q 70 155 150 155 L 255 155 L 255 115 L 225 105 L 225 60 Z"
                            fill="#334155"
                            stroke="#34d399"
                            strokeWidth="2"
                          />
                          <path d="M 75 95 L 250 95 L 250 150 L 145 150 Q 75 150 75 120 Z" fill="#ea580c" />
                          <path d="M 75 80 L 222 80 L 222 95 L 75 95 Z" fill="#d97706" />
                          <rect x="235" y="148" width="12" height="14" fill="#fde047" />
                        </g>
                        {/* Compact Vertical EBT Stream */}
                        <rect x="228" y="165" width="12" height="35" fill="#fef08a" />
                        <text x="190" y="25" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                          EBT SYSTEM: 12° TILT • HOT HEEL • SAVES 7–25 kWh/t
                        </text>
                      </g>
                    )}
                  </svg>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Tap Time Reduction:</span>
                    <span className="text-emerald-400 font-bold">Up to 7 minutes faster</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Energy Savings:</span>
                    <span className="text-amber-300 font-bold">7 – 25 kWh/t steel</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Slag-Free Practice:</span>
                    <span className="text-sky-300 font-bold">Retains Hot Heel inside hearth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 6: SUMMARY, 3-WAY TECH COMPARISON & KNOWLEDGE CHECK          */}
        {/* ================================================================= */}
        {activeSectionId === 'summary' && (
          <div className="space-y-8">
            {/* EXECUTIVE KEY TAKEAWAYS (5 PILLARS FROM SUMMARY) */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-mono uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>Executive Synthesis • 5 Core Optimization Pillars</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {[
                  {
                    title: '1. Decarbonization Champion',
                    stat: '0.55–0.65 tCO₂/t',
                    desc: 'Scrap-based EAF steelmaking cuts carbon emissions by ~75% compared to >2.0 tCO₂/t in primary BF-BOF routes.',
                    color: '#10b981'
                  },
                  {
                    title: '2. Energy Distribution',
                    stat: '50.2% Elec / 32.7% Chem',
                    desc: 'Molten steel retains 56.7% of total energy, while 43.3% is lost via off-gases (11.8%), cooling water (10.3%), and radiation/slag.',
                    color: '#38bdf8'
                  },
                  {
                    title: '3. Operational Quick-Wins',
                    stat: '12" Foam & <60m TTT',
                    desc: 'Foaming slag saves 2%–3% energy, while preventing a +60°C temperature overshoot saves 12.5 kWh/t.',
                    color: '#f59e0b'
                  },
                  {
                    title: '4. Sensible Heat Recovery',
                    stat: '-150 kWh/t (Hot DRI)',
                    desc: 'Charging 50% hot DRI at 600°C cuts power by up to 150 kWh/t; shaft pre-heaters recover 1,100°C off-gas energy.',
                    color: '#fb923c'
                  },
                  {
                    title: '5. Technological Frontiers',
                    stat: '350–400 kWh/t SEC',
                    desc: 'UHP high-impedance reactors, AI neural control, EBT, bottom stirring, and >1 kHz Q-ONE inverters reach world-class SEC.',
                    color: '#a855f7'
                  }
                ].map((pillar, i) => (
                  <div
                    key={i}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        className="text-xs font-mono font-extrabold px-2 py-0.5 rounded inline-block mb-2 text-slate-950"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {pillar.stat}
                      </span>
                      <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARBON INTENSITY CHART & PLANT ABATEMENT SIMULATOR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Carbon Intensity Comparison (tCO₂ per Tonne of Crude Steel)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Recycled scrap EAF (0.55–0.65 tCO₂/t) vs. traditional primary BF-BOF (&gt;2.0 tCO₂/t).
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                    -{reductionPercentage}% CO₂ Reduction
                  </span>
                </div>

                <div className="space-y-4 my-auto">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-bold text-white">
                        Electric Arc Furnace (Recycled Scrap EAF)
                      </span>
                      <span className="font-mono font-extrabold text-sky-400">
                        {eafIntensity.toFixed(2)} tCO₂ / t
                      </span>
                    </div>
                    <div className="w-full h-8 bg-slate-900 rounded-xl p-1 border border-slate-800">
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 flex items-center justify-end pr-2"
                        style={{ width: `${(eafIntensity / 2.5) * 100}%` }}
                      >
                        <span className="text-[10px] font-mono font-bold text-slate-950">
                          0.55–0.65
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-bold text-white">
                        Blast Furnace–Basic Oxygen Furnace (BF-BOF)
                      </span>
                      <span className="font-mono font-extrabold text-red-400">
                        {bfBofIntensity.toFixed(2)} tCO₂ / t
                      </span>
                    </div>
                    <div className="w-full h-8 bg-slate-900 rounded-xl p-1 border border-slate-800">
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-end pr-3"
                        style={{ width: `${(bfBofIntensity / 2.5) * 100}%` }}
                      >
                        <span className="text-[10px] font-mono font-bold text-white">
                          &gt;2.0 tCO₂/t Primary Route
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">
                      EAF Factor ({eafIntensity.toFixed(2)} tCO₂/t):
                    </span>
                    <input
                      type="range"
                      min="0.55"
                      max="0.65"
                      step="0.01"
                      value={eafIntensity}
                      onChange={(e) => setEafIntensity(parseFloat(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">
                      BF-BOF Factor ({bfBofIntensity.toFixed(2)} tCO₂/t):
                    </span>
                    <input
                      type="range"
                      min="2.00"
                      max="2.40"
                      step="0.05"
                      value={bfBofIntensity}
                      onChange={(e) => setBfBofIntensity(parseFloat(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400">
                    Plant Scale Decarbonization
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Annual CO₂ Abatement Calculator
                  </h3>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">ANNUAL PLANT OUTPUT:</span>
                    <span className="text-amber-400 font-bold">{annualProductionMt.toFixed(1)}M Tonnes/yr</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={annualProductionMt}
                    onChange={(e) => setAnnualProductionMt(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>

                <div className="bg-emerald-950/30 border-2 border-emerald-500/50 rounded-2xl p-4 text-center">
                  <p className="text-xs font-mono uppercase text-emerald-300">
                    Annual CO₂ Emissions Avoided
                  </p>
                  <p className="text-3xl font-extrabold font-mono text-emerald-400 my-1">
                    {annualCo2Saved.toFixed(2)} Million tCO₂ / yr
                  </p>
                  <p className="text-xs text-slate-300">
                    ({totalEafEmissions.toFixed(2)}M tCO₂ in EAF vs. {totalBfBofEmissions.toFixed(2)}M tCO₂ in BF-BOF)
                  </p>
                </div>
              </div>
            </div>

            {/* 3-WAY TECHNOLOGY MATRIX */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-mono uppercase text-slate-300">
                    <th className="py-3.5 px-5 w-1/5">Benchmark Criterion</th>
                    <th className="py-3.5 px-5 w-[27%] bg-sky-950/30 border-x border-sky-500/30 text-sky-300">
                      Electric Arc Furnace (EAF)
                    </th>
                    <th className="py-3.5 px-5 w-[26%]">Blast Furnace (BF-BOF)</th>
                    <th className="py-3.5 px-5 w-[27%]">Basic Induction Furnace (IF)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                  {COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-3.5 px-5 font-bold text-white align-top">{row.metric}</td>
                      <td className="py-3.5 px-5 bg-sky-950/15 border-x border-sky-500/20 align-top space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sky-300">{row.eaf.rating}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                            {row.eaf.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{row.eaf.detail}</p>
                      </td>
                      <td className="py-3.5 px-5 align-top space-y-1">
                        <span className="font-semibold text-slate-200 block">{row.bfbof.rating}</span>
                        <p className="text-xs text-slate-400">{row.bfbof.detail}</p>
                      </td>
                      <td className="py-3.5 px-5 align-top space-y-1">
                        <span className="font-semibold text-slate-200 block">{row.induction.rating}</span>
                        <p className="text-xs text-slate-400">{row.induction.detail}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* INTERACTIVE KNOWLEDGE CHECK QUIZ */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-sky-400">
                    Interactive Engineering Verification
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    EAF Metallurgy & Energy Optimization Knowledge Check
                  </h3>
                </div>
                <button
                  onClick={() => setQuizAnswers({})}
                  className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                >
                  Reset Answers
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZ_QUESTIONS.map((item, qIdx) => {
                  const selectedOpt = quizAnswers[qIdx];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === item.correct;
                  return (
                    <div
                      key={qIdx}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <p className="text-xs sm:text-sm font-bold text-white">
                          Q{qIdx + 1}. {item.q}
                        </p>
                        <div className="space-y-1.5">
                          {item.options.map((opt, oIdx) => {
                            const chosen = selectedOpt === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() =>
                                  setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                                }
                                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                                  !isAnswered
                                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300'
                                    : oIdx === item.correct
                                    ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                                    : chosen
                                    ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                                    : 'bg-slate-900/30 border-slate-800/50 text-slate-500'
                                }`}
                              >
                                <span>{opt}</span>
                                {isAnswered && oIdx === item.correct && (
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                                {isAnswered && chosen && oIdx !== item.correct && (
                                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {isAnswered && (
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed border ${
                            isCorrect
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                              : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                          }`}
                        >
                          <strong>{isCorrect ? 'Correct! ' : 'Engineering Explanation: '}</strong>
                          {item.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BOTTOM MODULE PAGINATION BAR (PREVIOUS / NEXT SECTION)     */}
        {/* ========================================================= */}
        <div className="mt-10 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {currentSectionIndex > 0 ? (
            <button
              onClick={() => goToSection(NAVIGATION_SECTIONS[currentSectionIndex - 1].id)}
              className="w-full sm:w-auto flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Previous Module
                </span>
                <span className="text-sm font-bold text-white">
                  {NAVIGATION_SECTIONS[currentSectionIndex - 1].shortTitle}
                </span>
              </div>
            </button>
          ) : (
            <div />
          )}

          <div className="text-xs font-mono text-slate-400">
            Viewing Section {currentSectionIndex + 1} of {NAVIGATION_SECTIONS.length}
          </div>

          {currentSectionIndex < NAVIGATION_SECTIONS.length - 1 ? (
            <button
              onClick={() => goToSection(NAVIGATION_SECTIONS[currentSectionIndex + 1].id)}
              className="w-full sm:w-auto flex items-center justify-end gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-right shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-900 block font-bold">
                  Next Engineering Module
                </span>
                <span className="text-sm font-extrabold">
                  {NAVIGATION_SECTIONS[currentSectionIndex + 1].shortTitle}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => goToSection(NAVIGATION_SECTIONS[0].id)}
              className="w-full sm:w-auto flex items-center justify-end gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-sky-400 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Return to Module 01 (EAF Anatomy)</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}