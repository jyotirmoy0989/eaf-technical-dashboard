import { Droplets, Flame, Layers, Shield, Wind, Zap } from 'lucide-react';

export const ANATOMY_COMPONENTS = [
  {
    id: 'electrodes',
    name: '3-Phase Graphite Electrodes',
    category: 'Power Delivery System',
    tempRange: 'Up to 3,500°C (Arc Core)',
    icon: Zap,
    color: '#38bdf8', // Electric blue
    badge: 'AC High-Intensity',
    description:
      'Massive columns of high-purity artificial graphite suspended vertically through the furnace roof. Arranged in a 3-phase delta configuration, they conduct immense alternating current (AC) to strike high-intensity electrical arcs directly against the metallic charge.',
    specs: [
      { label: 'Current Capacity', value: '40,000 – 120,000 Amps' },
      { label: 'Diameter', value: '500 mm – 750 mm' },
      { label: 'Regulation', value: 'Hydraulic Servo-Controlled Hoists' }
    ],
    hotspotPos: { x: 400, y: 120 }
  },
  {
    id: 'roof',
    name: 'Water-Cooled Roof & Delta',
    category: 'Structural Containment',
    tempRange: 'Water-Cooled (< 80°C Panel)',
    icon: Shield,
    color: '#60a5fa',
    badge: 'Swinging Gantry',
    description:
      'Constructed from heavy-duty tubular steel panels circulating pressurized cooling water to withstand extreme radiant heat and arc flare. The center features a high-alumina refractory "delta" section that electrically insulates the three graphite electrodes.',
    specs: [
      { label: 'Operation', value: 'Swings aside via hydraulic gantry for top charging' },
      { label: 'Fume Extraction', value: '4th hole exhaust port for off-gas capture' },
      { label: 'Center Section', value: 'Castable high-alumina refractory delta' }
    ],
    hotspotPos: { x: 265, y: 175 }
  },
  {
    id: 'lance',
    name: 'Supersonic Oxygen Lance',
    category: 'Chemical Energy & Refining',
    tempRange: 'Exothermic Reaction Zone',
    icon: Wind,
    color: '#22d3ee',
    badge: 'Mach 2.0 O₂ Jet',
    description:
      'Water-cooled copper-tipped injector that fires supersonic jets of pure oxygen into the molten bath. Drives exothermic oxidation of silicon, manganese, phosphorus, and carbon—releasing substantial chemical heat while creating a protective "foamy slag" layer.',
    specs: [
      { label: 'Gas Velocity', value: 'Supersonic (Mach 1.8 – 2.2)' },
      { label: 'Primary Reactions', value: 'C + ½O₂ → CO | Si + O₂ → SiO₂' },
      { label: 'Secondary Role', value: 'Carbon injection for slag foaming (shielding arcs)' }
    ],
    hotspotPos: { x: 560, y: 250 }
  },
  {
    id: 'charge',
    name: 'Metallic Charge & Molten Bath',
    category: 'Process Metallurgy',
    tempRange: '1,600°C – 1,650°C',
    icon: Flame,
    color: '#f97316',
    badge: 'Scrap + DRI + Flux',
    description:
      'The stratified raw material burden inside the shell. Consists of heavy and light shredded steel scrap, Direct Reduced Iron (DRI), and pig iron, blended with calcitic limestone (CaO) and dolomite (MgO) fluxes that coalesce into a floating liquid slag layer on top of the refined steel.',
    specs: [
      { label: 'Raw Materials', value: 'Recycled Steel Scrap, DRI, HBI, Pig Iron' },
      { label: 'Flux Agents', value: 'Limestone (CaO) & Dolomite (MgO) for dephosphorization' },
      { label: 'Slag Function', value: 'Traps oxidized impurities & insulates molten pool' }
    ],
    hotspotPos: { x: 400, y: 330 }
  },
  {
    id: 'vessel',
    name: 'Refractory-Lined Vessel & Hearth',
    category: 'Thermal Containment',
    tempRange: 'Withstands > 1,700°C',
    icon: Layers,
    color: '#f59e0b',
    badge: 'Magnesia-Carbon',
    description:
      'A barrel-shaped steel shell Divided into water-cooled upper sidewalls and a deep lower hearth lined with resin-bonded Magnesia-Carbon (MgO-C) bricks and ramming mass. Engineered to hold 100 to 300+ tonnes of swirling liquid metal without breach.',
    specs: [
      { label: 'Hearth Lining', value: 'Sintered Magnesia & MgO-C Refractory Bricks' },
      { label: 'Upper Sidewalls', value: 'Water-cooled copper/steel cage panels' },
      { label: 'Maintenance', value: 'Hot gunning / "fettling" between every batch' }
    ],
    hotspotPos: { x: 300, y: 410 }
  },
  {
    id: 'tapping',
    name: 'Slag Door & Tilting / EBT System',
    category: 'Mechanical Discharge',
    tempRange: '1,650°C Tapping Stream',
    icon: Droplets,
    color: '#fbbf24',
    badge: 'Rocker Tilt Cradle',
    description:
      'Mounted on heavy hydraulic toothed rockers, the entire furnace tilts backward (-5° to -8°) to skim floating dirty slag out the rear slag door, and tilts forward (+12° to +15°) to tap pure molten steel through the Eccentric Bottom Tap (EBT) hole into a pre-heated ladle.',
    specs: [
      { label: 'Backward Tilt', value: 'Slag flushing & bath temperature/chemistry sampling' },
      { label: 'Forward Tilt / EBT', value: 'Slag-free bottom tapping into metallurgical ladle' },
      { label: 'Ladle Additions', value: 'Ferro-alloys (FeSi, FeMn) & Aluminum deoxidizers' }
    ],
    hotspotPos: { x: 545, y: 405 }
  }
];
export const CYCLE_STEPS = [
  {
    step: 1,
    title: 'Charge Mix Preparation & Charging',
    duration: '0 – 12 mins',
    timeProgress: 13,
    temp: 450,
    powerMW: 0,
    voltageTap: 'OFF (Interlocked)',
    furnaceTilt: 0,
    status: 'Roof Swung Open • Bucket Drop',
    accent: '#f59e0b',
    summary:
      'Heavy scrap, light scrap, DRI, pig iron, and fluxes (limestone and dolomite) are loaded into the furnace using large clam-shell charging buckets.',
    details: [
      'Water-cooled roof and electrodes lift and swing aside to expose the open refractory hearth.',
      'Carefully layered charge bucket drops light scrap on the bottom (cushioning the hearth), heavy scrap in the middle, and high-density scrap/DRI with limestone & dolomite fluxes.',
      ' Often performed in 1 to 2 bucket drops depending on scrap bulk density.'
    ],
    metallurgy: 'Solid-state stratified burden: Fe scrap + DRI + CaCO₃ / MgCO₃ fluxes.'
  },
  {
    step: 2,
    title: 'Melting (Bore-In & Main Melt)',
    duration: '12 – 50 mins',
    timeProgress: 52,
    temp: 1540,
    powerMW: 85,
    voltageTap: 'Intermediate → High Voltage Long Arc',
    furnaceTilt: 0,
    status: 'High-Intensity AC Arcs Active',
    accent: '#38bdf8',
    summary:
      'Lowering the electrodes to strike arcs. Intermediate voltage taps penetrate the top layer of light scrap, followed by high-voltage long arcs once a molten pool forms.',
    details: [
      'Phase 2A (Bore-In): Electrodes lower and strike intermediate-voltage short arcs to bore down into the top layer of light scrap, protecting the roof and sidewalls from radiant flare.',
      'Phase 2B (Main Melt): Once a liquid pool forms at the hearth bottom, the transformer switches to high-voltage long arcs for maximum power input.',
      'Second bucket (if required) is charged once the initial scrap collapses into the cave.'
    ],
    metallurgy: 'Rapid phase transition: Solid scrap liquefies; limestone calcines into active CaO slag.'
  },
  {
    step: 3,
    title: 'Oxidation & Chemical Refining',
    duration: '50 – 68 mins',
    timeProgress: 74,
    temp: 1620,
    powerMW: 62,
    voltageTap: 'Medium Tap (Submerged in Foamy Slag)',
    furnaceTilt: 0,
    status: 'O₂ Injection • Exothermic Bath Boil',
    accent: '#22d3ee',
    summary:
      'Injecting oxygen into the molten bath to burn off impurities like silicon, manganese, carbon, and phosphorus. These exothermic reactions release substantial heat directly into the bath.',
    details: [
      'Supersonic oxygen lance injects O₂ directly into the molten bath.',
      'Impurities oxidize rapidly: Silicon (Si → SiO₂), Manganese (Mn → MnO), and Phosphorus (P → P₂O₅) get captured into the basic CaO-MgO slag layer.',
      'Carbon oxidizes to CO gas bubbles (C + ½O₂ → CO), creating a vigorous "carbon boil" and foaming the slag to submerge the electric arcs and boost thermal efficiency.'
    ],
    metallurgy: 'Exothermic impurity removal: Dephosphorization, decarburization & thermal homogenization.'
  },
  {
    step: 4,
    title: 'De-Slagging',
    duration: '68 – 75 mins',
    timeProgress: 83,
    temp: 1635,
    powerMW: 15,
    voltageTap: 'Low Holding Power / Arcs Raised',
    furnaceTilt: -6,
    status: 'Backward Tilt (-6°) • Slag Flushing',
    accent: '#fb923c',
    summary:
      'Tilting the furnace backward to pour off the dirty, impurity-laden floating slag layer through the rear slag door.',
    details: [
      'Hydraulic rockers tilt the entire furnace shell backward toward the slag door.',
      'Foamy, oxidized slag containing trapped P₂O₅, SiO₂, MnO, and non-metallic inclusions overflows out into the slag pot below.',
      'Removing phosphorus-rich slag before tapping is critical so phosphorus does not revert back into the liquid steel during deoxidation.'
    ],
    metallurgy: 'Physical separation of low-density oxidized slag (ρ ≈ 3.2 g/cm³) from dense liquid steel (ρ ≈ 7.0 g/cm³).'
  },
  {
    step: 5,
    title: 'Tapping',
    duration: '75 – 82 mins',
    timeProgress: 91,
    temp: 1645,
    powerMW: 0,
    voltageTap: 'OFF (Electrodes Raised)',
    furnaceTilt: 11,
    status: 'Forward Tilt (+11°) • Ladle Pouring',
    accent: '#fbbf24',
    summary:
      'Tilting forward (or opening a bottom tap hole) to pour refined liquid steel into a pre-heated ladle at roughly 1600°C–1650°C while adding deoxidizers and ferro-alloys.',
    details: [
      'Furnace tilts forward and opens the Eccentric Bottom Tap (EBT) slide gate.',
      'Refined liquid steel at 1600°C–1650°C streams cleanly into a pre-heated teeming ladle positioned beneath the furnace.',
      'Deoxidizers (Aluminum, Ferrosilicon) and alloying elements (Ferromanganese, Chromium, Vanadium) are dropped into the tapping stream to hit target grade chemistry.'
    ],
    metallurgy: 'Slag-free tapping with small "liquid heel" retained; deoxidation & alloy trimming in ladle.'
  },
  {
    step: 6,
    title: 'Furnace Turnaround & Fettling',
    duration: '82 – 90 mins',
    timeProgress: 100,
    temp: 1180,
    powerMW: 0,
    voltageTap: 'OFF (Safe Inspection Mode)',
    furnaceTilt: 0,
    status: 'Refractory Inspection • Fettling',
    accent: '#a855f7',
    summary:
      'Inspecting the refractory lining, repairing damaged areas ("fettling"), and preparing the hearth and tap hole for the next batch.',
    details: [
      'Furnace returns to level upright position; operators or robotic manipulators inspect the MgO-C refractory slag line and hearth banks.',
      'Damaged or eroded refractory zones are sprayed with magnesia gunning mix ("fettling") to restore wall thickness.',
      'The bottom tap hole is closed and packed with refractory sand, completing the 60–90 minute tap-to-tap cycle.'
    ],
    metallurgy: 'Refractory sintering & EBT sand packing to ensure safe containment for the next heat.'
  }
];

export const COMPARISON_MATRIX = [
  {
    metric: 'Capital Expenditure (CapEx)',
    eaf: {
      rating: 'Low – Moderate',
      score: 92,
      badge: 'Best Economics',
      detail: 'Vastly lower upfront capital cost (~$300–$450/t capacity). No coke ovens, sinter plants, or massive blast furnaces required.'
    },
    bfbof: {
      rating: 'Very High',
      score: 30,
      badge: 'Mega-Scale Only',
      detail: 'Requires multi-billion-dollar integrated infrastructure ($1,000+/t capacity) including coke batteries, sinter plants, and BF stoves.'
    },
    induction: {
      rating: 'Very Low',
      score: 95,
      badge: 'Micro-Mill Scale',
      detail: 'Lowest initial equipment cost, suited for small foundries or small-tonnage rebar shops, but limited in vessel scale.'
    }
  },
  {
    metric: 'Operational Flexibility',
    eaf: {
      rating: 'Superior (Start/Stop at Will)',
      score: 95,
      badge: 'Batch Agile',
      detail: 'Can be started, paused, or shut down between 60–90 min heats to match grid electricity pricing or fluctuating market demand.'
    },
    bfbof: {
      rating: 'Rigid (Continuous 15-Yr Campaign)',
      score: 25,
      badge: 'Inflexible',
      detail: 'Blast furnaces must operate continuously 24/7 for 15–20 years; stopping causes catastrophic solidification ("freezing").'
    },
    induction: {
      rating: 'High',
      score: 85,
      badge: 'Batch Capable',
      detail: 'Flexible batch melting for small heats, though slower at melting low-density or bulky industrial scrap.'
    }
  },
  {
    metric: 'Carbon Intensity (tCO₂ / t Steel)',
    eaf: {
      rating: '0.55 – 0.65 tCO₂/t',
      score: 94,
      badge: '~72% Lower CO₂',
      detail: 'Dramatic reduction in emissions when melting recycled scrap; can approach near-zero when paired with renewable power and green H₂-DRI.'
    },
    bfbof: {
      rating: '> 2.0 – 2.3 tCO₂/t',
      score: 20,
      badge: 'Carbon Intensive',
      detail: 'Relies on metallurgical coal/coke as a chemical reductant for iron ore, generating massive direct Scope 1 CO₂ emissions.'
    },
    induction: {
      rating: '0.60 – 0.85 tCO₂/t',
      score: 82,
      badge: 'Grid Dependent',
      detail: 'Purely electrical melting without chemical oxygen energy assist, resulting in higher kWh/t electricity consumption than modern EAFs.'
    }
  },
  {
    metric: 'Chemical Refining Capability',
    eaf: {
      rating: 'Advanced Metallurgical Refining',
      score: 96,
      badge: 'Special Alloy Capable',
      detail: 'Excels at active slag-metal refining: supersonic O₂ injection and basic CaO fluxes strip out unwanted Phosphorus (P) and Sulfur (S).'
    },
    bfbof: {
      rating: 'High (Primary Virgin Ore)',
      score: 92,
      badge: 'Virgin Iron Purity',
      detail: 'Very low residual tramp elements (Cu, Ni) due to virgin iron ore, with strong BOF oxygen converter refining.'
    },
    induction: {
      rating: 'Minimal ("Melt What You Charge")',
      score: 22,
      badge: 'No De-P / De-S',
      detail: 'Cannot effectively remove Phosphorus or Sulfur because electromagnetic induction heats only the metal while leaving top slag cold and unreactive.'
    }
  },
  {
    metric: 'Raw Material Flexibility',
    eaf: {
      rating: '100% Scrap, DRI, HBI & Pig Iron',
      score: 95,
      badge: 'Omnivorous Charge',
      detail: 'Can seamlessly vary charge mix from 100% heavy/light recycled scrap to high-percentage Direct Reduced Iron (DRI) and liquid/solid pig iron.'
    },
    bfbof: {
      rating: 'Iron Ore + Coking Coal (Max ~25% Scrap)',
      score: 45,
      badge: 'Ore Dependent',
      detail: 'Restricted primarily to sintered/pelletized iron ore and metallurgical coke, with limited scrap cooling additions in the BOF.'
    },
    induction: {
      rating: 'Clean, Pre-Sorted Scrap & DRI Only',
      score: 40,
      badge: 'Strict Scrap Spec',
      detail: 'Requires clean, dense, low-phosphorus, low-sulfur scrap since impurities in the charge remain directly in the finished steel.'
    }
  }
];
