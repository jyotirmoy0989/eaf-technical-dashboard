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
  Info,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Activity,
  Award,
  BarChart3,
  Factory,
  Sparkles,
  Droplets,
  Wind,
  Wrench,
  ArrowUpRight
} from 'lucide-react';

// ==========================================
// DATA DEFINITIONS
// ==========================================

const ANATOMY_COMPONENTS = [
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

const CYCLE_STEPS = [
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

const COMPARISON_MATRIX = [
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

// ==========================================
// INTERACTIVE SVG: EAF ANATOMY DIAGRAM
// ==========================================

const EAFAnatomySVG = ({ selectedId, onSelect }) => {
  return (
    <div className="relative w-full bg-slate-950/90 rounded-2xl border border-slate-800/90 p-3 sm:p-5 overflow-hidden shadow-2xl">
      {/* Subtle Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Overlay Legend */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-2 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            3-Phase AC Electric Arc Furnace • Cross-Section Schematic
          </span>
        </div>
        <span className="text-xs text-sky-400 bg-sky-950/70 border border-sky-800/60 px-2.5 py-1 rounded-full font-medium">
          Click any hotspot or component to inspect
        </span>
      </div>

      <svg
        viewBox="0 0 800 540"
        className="w-full h-auto max-h-[520px] select-none"
        role="img"
        aria-label="Interactive 2D Cross-Section of an Electric Arc Furnace"
      >
        <defs>
          {/* Molten Steel Gradient */}
          <linearGradient id="moltenSteelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          {/* Slag Layer Gradient */}
          <linearGradient id="slagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Refractory Brick Gradient */}
          <linearGradient id="refractoryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Graphite Electrode Gradient */}
          <linearGradient id="electrodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="45%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Electric Arc Glow Filter */}
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

        {/* ======================================= */}
        {/* 1. ROCKER CRADLE & TILTING BASE         */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('tapping')}
          className="cursor-pointer transition-opacity hover:opacity-95"
        >
          {/* Concrete Pedestals */}
          <rect x="170" y="490" width="460" height="22" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          {/* Curved Hydraulic Rocker Tracks */}
          <path
            d="M 220 440 Q 400 515 580 440 L 595 452 Q 400 532 205 452 Z"
            fill="#334155"
            stroke={selectedId === 'tapping' ? '#fbbf24' : '#64748b'}
            strokeWidth={selectedId === 'tapping' ? '2.5' : '1.5'}
          />
          {/* Hydraulic Tilt Cylinders */}
          <line x1="250" y1="490" x2="235" y2="430" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
          <line x1="550" y1="490" x2="565" y2="430" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />

          {/* Direction Indicators */}
          <text x="145" y="478" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            ◄ DE-SLAG TILT (-6°)
          </text>
          <text x="565" y="478" fill="#fbbf24" fontSize="11" fontFamily="monospace">
            TAP TILT (+12°) ►
          </text>
        </g>

        {/* ======================================= */}
        {/* 2. REFRACTORY VESSEL & HEARTH           */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('vessel')}
          className="cursor-pointer"
        >
          {/* Outer Steel Furnace Shell */}
          <path
            d="M 190 215 L 190 365 Q 190 455 320 465 L 520 465 Q 635 455 645 385 L 645 340 L 595 325 L 595 215 Z"
            fill="url(#refractoryGrad)"
            stroke={selectedId === 'vessel' ? '#f59e0b' : '#94a3b8'}
            strokeWidth={selectedId === 'vessel' ? '3.5' : '2'}
          />

          {/* Refractory Brick Pattern Layer (MgO-C Bricks) */}
          <path
            d="M 212 220 L 212 355 Q 212 432 325 440 L 515 440 Q 612 432 620 380 L 620 350 L 575 335 L 575 220 Z"
            fill="#7c2d12"
            fillOpacity="0.65"
            stroke="#ea580c"
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />

          {/* Water-Cooled Upper Sidewall Panels (Left & Right) */}
          {[230, 252, 274, 296].map((yPos, idx) => (
            <React.Fragment key={idx}>
              <rect
                x="196"
                y={yPos}
                width="16"
                height="17"
                rx="3"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="1"
              />
              <rect
                x="578"
                y={yPos}
                width="16"
                height="17"
                rx="3"
                fill="#0284c7"
                stroke="#38bdf8"
                strokeWidth="1"
              />
            </React.Fragment>
          ))}
        </g>

        {/* ======================================= */}
        {/* 3. METALLIC CHARGE & MOLTEN BATH        */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('charge')}
          className="cursor-pointer"
        >
          {/* Inner Furnace Chamber Background */}
          <path
            d="M 215 215 L 215 352 Q 215 422 325 428 L 515 428 Q 600 422 608 375 L 608 352 L 574 338 L 574 215 Z"
            fill="#090d16"
          />

          {/* Liquid Molten Steel Pool (Bottom Bath) */}
          <path
            d="M 216 335 L 574 335 L 608 352 L 608 375 Q 600 422 515 428 L 325 428 Q 216 422 216 352 Z"
            fill="url(#moltenSteelGrad)"
            stroke={selectedId === 'charge' ? '#fef08a' : 'none'}
            strokeWidth="2"
          />

          {/* Foamy Slag & Limestone/Dolomite Flux Layer */}
          <path
            d="M 214 306 Q 270 298 330 307 T 450 304 T 575 308 L 575 336 L 215 336 Z"
            fill="url(#slagGrad)"
            stroke="#fbbf24"
            strokeWidth="1"
          />

          {/* Unmelted Scrap, DRI Pellets & Pig Iron Chunks in Bath */}
          <g opacity="0.9">
            {/* Scrap / Pig Iron Polygons */}
            <polygon points="245,320 275,305 290,328 255,335" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="495,318 528,304 545,325 510,334" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
            {/* DRI Pellets & Limestone Flux Nodules */}
            <circle cx="310" cy="322" r="5" fill="#fde047" />
            <circle cx="324" cy="316" r="4" fill="#e2e8f0" />
            <circle cx="468" cy="318" r="5" fill="#fde047" />
            <circle cx="482" cy="324" r="4.5" fill="#e2e8f0" />
          </g>

          {/* Labels inside Bath */}
          <text x="395" y="325" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">
            FOAMY SLAG LAYER (CaO • MgO • SiO₂ • P₂O₅)
          </text>
          <text x="395" y="382" textAnchor="middle" fill="#fffbeb" fontSize="13" fontWeight="bold">
            MOLTEN STEEL BATH (1600°C – 1650°C)
          </text>
          <text x="395" y="402" textAnchor="middle" fill="#fed7aa" fontSize="10" fontFamily="monospace">
            Melted Scrap + DRI + Pig Iron
          </text>
        </g>

        {/* ======================================= */}
        {/* 4. SLAG DOOR (LEFT) & EBT TAP (RIGHT)   */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('tapping')}
          className="cursor-pointer"
        >
          {/* Rear Slag Door (Left Side) */}
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
            (De-Slagging Outlet)
          </text>

          {/* Eccentric Bottom Tap (EBT) Hole (Right Nose) */}
          <rect
            x="576"
            y="418"
            width="24"
            height="36"
            rx="3"
            fill="#fbbf24"
            stroke="#fef08a"
            strokeWidth="1.5"
          />
          {/* Pre-heated Ladle Below EBT */}
          <path
            d="M 562 475 L 570 525 L 612 525 L 620 475 Z"
            fill="#334155"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />
          <path d="M 568 495 L 614 495 L 610 522 L 572 522 Z" fill="#f97316" />
          <text x="640" y="438" fill="#fbbf24" fontSize="11" fontWeight="bold">
            EBT TAP HOLE
          </text>
          <text x="640" y="505" fill="#cbd5e1" fontSize="10">
            Pre-Heated Ladle
          </text>
        </g>

        {/* ======================================= */}
        {/* 5. WATER-COOLED ROOF & EXHAUST ELBOW    */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('roof')}
          className="cursor-pointer"
        >
          {/* Domed Water-Cooled Roof Structure */}
          <path
            d="M 180 210 Q 395 140 610 210 L 595 224 Q 395 162 195 224 Z"
            fill="#0369a1"
            stroke={selectedId === 'roof' ? '#38bdf8' : '#7dd3fc'}
            strokeWidth={selectedId === 'roof' ? '3.5' : '2'}
          />
          {/* Cooling Water Pipe Segments in Roof */}
          {[220, 250, 280, 500, 530, 560].map((cx, i) => (
            <circle key={i} cx={cx} cy="196" r="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          ))}

          {/* Refractory Center Delta Section */}
          <path
            d="M 325 172 L 465 172 L 455 196 L 335 196 Z"
            fill="#d97706"
            stroke="#fef08a"
            strokeWidth="1.5"
          />
          {/* 4th Hole Off-Gas Fume Extraction Elbow */}
          <path
            d="M 485 182 L 515 125 L 555 110 L 555 135 L 530 145 L 508 188 Z"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text x="562" y="126" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            Off-Gas 4th Hole
          </text>
        </g>

        {/* ======================================= */}
        {/* 6. 3-PHASE GRAPHITE ELECTRODES & ARCS   */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('electrodes')}
          className="cursor-pointer"
        >
          {/* Electrode Clamp Arms / Bus Tubes */}
          <rect x="330" y="38" width="130" height="14" rx="4" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Phase A, B, C Graphite Electrodes */}
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
              {/* Incandescent Hot Tip */}
              <path
                d={`M ${el.x} 255 L ${el.x + 24} 255 L ${el.x + 20} 276 L ${el.x + 4} 276 Z`}
                fill="#f97316"
              />
              <text
                x={el.x + 12}
                y="70"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {el.phase}
              </text>
            </g>
          ))}

          {/* High-Intensity AC Electric Arcs */}
          <circle cx="354" cy="292" r="24" fill="url(#arcFlash)" />
          <circle cx="398" cy="292" r="28" fill="url(#arcFlash)" />
          <circle cx="442" cy="292" r="24" fill="url(#arcFlash)" />

          <g filter="url(#arcGlow)">
            <path
              d="M 354 275 L 344 288 L 362 296 L 348 308"
              stroke="#e0f2fe"
              strokeWidth="3.5"
              fill="none"
            />
            <path
              d="M 398 275 L 408 287 L 389 295 L 402 308"
              stroke="#7dd3fc"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M 442 275 L 434 289 L 450 297 L 438 308"
              stroke="#e0f2fe"
              strokeWidth="3.5"
              fill="none"
            />
          </g>
        </g>

        {/* ======================================= */}
        {/* 7. SUPERSONIC OXYGEN LANCE              */}
        {/* ======================================= */}
        <g
          onClick={() => onSelect('lance')}
          className="cursor-pointer"
        >
          {/* Lance Tube Entering Through Sidewall Port */}
          <path
            d="M 675 215 L 525 292 L 532 304 L 682 227 Z"
            fill="#0e7490"
            stroke={selectedId === 'lance' ? '#22d3ee' : '#67e8f9'}
            strokeWidth="2"
          />
          {/* Supersonic O2 Jet Stream */}
          <path
            d="M 526 298 L 465 325 L 478 336 Z"
            fill="#22d3ee"
            fillOpacity="0.65"
            filter="url(#arcGlow)"
          />
          <text x="665" y="205" textAnchor="end" fill="#22d3ee" fontSize="11" fontWeight="bold">
            OXYGEN LANCE (O₂)
          </text>
        </g>

        {/* ======================================= */}
        {/* 8. INTERACTIVE NUMBERED HOTSPOT PINS    */}
        {/* ======================================= */}
        {ANATOMY_COMPONENTS.map((comp, idx) => {
          const isSelected = selectedId === comp.id;
          return (
            <g
              key={comp.id}
              onClick={() => onSelect(comp.id)}
              className="cursor-pointer group"
            >
              {/* Outer Pulse Ring when Selected */}
              {isSelected && (
                <circle
                  cx={comp.hotspotPos.x}
                  cy={comp.hotspotPos.y}
                  r="22"
                  fill="none"
                  stroke={comp.color}
                  strokeWidth="2.5"
                  opacity="0.7"
                >
                  <animate
                    attributeName="r"
                    from="14"
                    to="26"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.9"
                    to="0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
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
// INTERACTIVE SVG: TAP-TO-TAP CYCLE SIMULATOR
// ==========================================

const TapToTapSimulatorSVG = ({ currentStepData }) => {
  const { step, furnaceTilt, temp, powerMW } = currentStepData;

  // Compute dynamic electrode vertical offset based on step
  const electrodeYOffset =
    step === 1 ? -115 : step === 2 ? 12 : step === 3 ? 4 : step === 4 ? -45 : -65;

  // Determine roof swing state (Step 1 swings roof open)
  const isRoofOpen = step === 1;

  return (
    <div className="relative w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden shadow-2xl">
      {/* Top Live Telemetry Strip */}
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

        {/* Stationary Floor & Pedestal */}
        <line x1="60" y1="395" x2="700" y2="395" stroke="#334155" strokeWidth="3" />

        {/* Left Slag Pot (For Step 4 De-Slagging) */}
        <g>
          <path
            d="M 85 335 L 95 392 L 155 392 L 165 335 Z"
            fill="#1e293b"
            stroke={step === 4 ? '#fb923c' : '#475569'}
            strokeWidth="2"
          />
          {step >= 4 && (
            <path d="M 92 365 L 158 365 L 153 390 L 97 390 Z" fill="#d97706" />
          )}
          <text x="125" y="414" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            Slag Pot
          </text>
        </g>

        {/* Right Pre-Heated Teeming Ladle (For Step 5 Tapping) */}
        <g>
          <path
            d="M 555 318 L 568 392 L 642 392 L 655 318 Z"
            fill="#1e293b"
            stroke={step === 5 ? '#fbbf24' : '#64748b'}
            strokeWidth="2.5"
          />
          {/* Molten Steel filling Ladle during Step 5 */}
          {step === 5 && (
            <g>
              <path
                d="M 562 342 L 648 342 L 640 390 L 570 390 Z"
                fill="url(#simMolten)"
              />
              {/* Deoxidizers & Ferro-Alloys Hopper Chute */}
              <path d="M 640 230 L 665 230 L 655 275 L 645 275 Z" fill="#475569" stroke="#cbd5e1" />
              <circle cx="645" cy="290" r="3.5" fill="#38bdf8" />
              <circle cx="638" cy="306" r="3" fill="#fde047" />
              <circle cx="632" cy="322" r="3.5" fill="#38bdf8" />
              <text x="672" y="252" fill="#38bdf8" fontSize="10" fontWeight="bold">
                + Ferro-Alloys
              </text>
              <text x="672" y="265" fill="#94a3b8" fontSize="9.5">
                & Deoxidizers
              </text>
            </g>
          )}
          <text x="605" y="414" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace">
            Steel Ladle
          </text>
        </g>

        {/* ========================================================= */}
        {/* TILTING FURNACE ASSEMBLY (Rotates around center pivot)    */}
        {/* ========================================================= */}
        <g
          style={{
            transform: `rotate(${furnaceTilt}deg)`,
            transformOrigin: '380px 310px',
            transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {/* Outer Refractory-Lined Vessel Shell */}
          <path
            d="M 210 190 L 210 305 Q 210 368 310 375 L 485 375 Q 565 368 575 315 L 575 285 L 535 272 L 535 190 Z"
            fill="#334155"
            stroke="#94a3b8"
            strokeWidth="2.5"
          />

          {/* Inner Magnesia-Carbon Refractory Lining */}
          <path
            d="M 228 194 L 228 300 Q 228 352 315 358 L 480 358 Q 548 352 555 310 L 555 292 L 518 280 L 518 194 Z"
            fill="#090d16"
            stroke={step === 6 ? '#a855f7' : '#ea580c'}
            strokeWidth={step === 6 ? '3' : '2'}
          />

          {/* STEP 1: Unmelted Stratified Scrap, DRI & Flux Pile */}
          {step === 1 && (
            <g>
              <path
                d="M 232 345 L 260 250 L 325 235 L 385 225 L 445 240 L 515 275 L 515 355 L 232 355 Z"
                fill="#475569"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              {/* Layer Callouts */}
              <text x="375" y="275" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                LIGHT & HEAVY STEEL SCRAP
              </text>
              <text x="375" y="305" textAnchor="middle" fill="#fde047" fontSize="10.5" fontFamily="monospace">
                + DRI Pellets, Pig Iron & CaO/MgO Fluxes
              </text>
              <text x="375" y="340" textAnchor="middle" fill="#fb923c" fontSize="10">
                Heavy Scrap Cushion on Hearth Bottom
              </text>
            </g>
          )}

          {/* STEP 2: Bore-in & Forming Molten Pool */}
          {step === 2 && (
            <g>
              {/* Growing Molten Pool at Bottom */}
              <path
                d="M 230 302 L 520 302 L 552 310 Q 542 352 480 357 L 315 357 Q 230 352 230 302 Z"
                fill="url(#simMolten)"
              />
              {/* Unmelted Scrap Banks on Sides */}
              <polygon points="230,305 230,235 295,265 315,305" fill="#475569" stroke="#cbd5e1" />
              <polygon points="516,305 516,238 450,268 430,305" fill="#475569" stroke="#cbd5e1" />
              <text x="375" y="336" textAnchor="middle" fill="#fffbeb" fontSize="11" fontWeight="bold">
                FORMING MOLTEN POOL (HIGH-VOLTAGE LONG ARCS)
              </text>
            </g>
          )}

          {/* STEP 3, 4, 5: Full Molten Steel Bath */}
          {(step === 3 || step === 4 || step === 5) && (
            <g>
              <path
                d="M 230 286 L 522 286 L 554 295 L 554 312 Q 545 352 480 357 L 315 357 Q 230 352 230 300 Z"
                fill="url(#simMolten)"
              />
              {/* Floating Foamy Slag Layer (Thicker in Step 3 & 4, Skimmed in Step 5) */}
              {step !== 5 && (
                <path
                  d="M 225 262 Q 300 252 375 262 T 520 262 L 520 288 L 228 288 Z"
                  fill="url(#simSlag)"
                />
              )}

              {/* Step 3 Exothermic Carbon Boil & Oxidation Bubbles */}
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
                        to="258"
                        dur={`${0.9 + idx * 0.15}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                  <text x="375" y="328" textAnchor="middle" fill="#fffbeb" fontSize="11" fontWeight="bold">
                    EXOTHERMIC OXIDATION (Si, Mn, P, C Removal)
                  </text>
                </g>
              )}
            </g>
          )}

          {/* STEP 6: Retained Liquid Heel & Refractory Fettling Spray */}
          {step === 6 && (
            <g>
              {/* Small Hot Heel Left at Bottom */}
              <path
                d="M 265 344 L 495 344 Q 475 357 380 357 Q 285 357 265 344 Z"
                fill="#ea580c"
              />
              {/* Fettling Lance Repairing Slag Line */}
              <line x1="375" y1="150" x2="375" y2="275" stroke="#cbd5e1" strokeWidth="6" />
              <circle cx="375" cy="275" r="8" fill="#a855f7" />
              {/* Magnesia Gunning Spray Cones */}
              <path
                d="M 375 275 L 230 265 L 230 295 Z"
                fill="#c084fc"
                fillOpacity="0.45"
              />
              <path
                d="M 375 275 L 518 265 L 518 295 Z"
                fill="#c084fc"
                fillOpacity="0.45"
              />
              <text x="375" y="320" textAnchor="middle" fill="#e9d5ff" fontSize="11.5" fontWeight="bold">
                FETTLING: SPRAYING MgO REFRACTORY LINING
              </text>
            </g>
          )}

          {/* Oxygen Lance Active in Step 3 */}
          {step === 3 && (
            <g>
              <line x1="595" y1="205" x2="470" y2="272" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" />
              <path d="M 470 272 L 415 302 L 430 312 Z" fill="#67e8f9" />
              <text x="590" y="195" textAnchor="end" fill="#22d3ee" fontSize="11" fontWeight="bold">
                Supersonic O₂ Injection
              </text>
            </g>
          )}

          {/* Water-Cooled Roof & 3-Phase Electrodes (Swings aside in Step 1) */}
          <g
            style={{
              transform: isRoofOpen ? 'translate(215px, -65px) rotate(18deg)' : 'translate(0px, 0px)',
              transition: 'transform 0.7s ease-in-out'
            }}
          >
            {/* Roof Arch */}
            <path
              d="M 200 188 Q 375 132 550 188 L 538 200 Q 375 150 212 200 Z"
              fill="#0284c7"
              stroke="#7dd3fc"
              strokeWidth="2"
            />
            {/* Electrodes */}
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

              {/* Active Electric Arcs in Step 2 & Step 3 */}
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

        {/* STEP 1: Clam-Shell Scrap Charging Bucket Drop */}
        {step === 1 && (
          <g>
            {/* Suspended Charging Bucket above Open Furnace */}
            <path
              d="M 310 30 L 440 30 L 425 115 L 325 115 Z"
              fill="#334155"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            {/* Open Clam-Shell Doors */}
            <line x1="325" y1="115" x2="295" y2="148" stroke="#f59e0b" strokeWidth="4" />
            <line x1="425" y1="115" x2="455" y2="148" stroke="#f59e0b" strokeWidth="4" />
            {/* Falling Scrap, DRI & Limestone Flux Stream */}
            <path
              d="M 335 115 L 415 115 L 435 225 L 315 225 Z"
              fill="#f59e0b"
              fillOpacity="0.28"
            />
            <text x="375" y="75" textAnchor="middle" fill="#fef3c7" fontSize="12" fontWeight="bold">
              CHARGING BUCKET
            </text>
          </g>
        )}

        {/* STEP 4: Pouring Slag Stream out Rear Door into Slag Pot */}
        {step === 4 && (
          <g>
            <path
              d="M 212 268 Q 150 278 130 365 L 146 365 Q 168 292 218 282 Z"
              fill="#f59e0b"
            />
            <text x="150" y="245" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">
              POURING IMPURE SLAG
            </text>
          </g>
        )}

        {/* STEP 5: Pouring Refined 1645°C Liquid Steel Stream from EBT into Ladle */}
        {step === 5 && (
          <g>
            <path
              d="M 548 345 Q 585 352 595 385 L 612 385 Q 602 342 558 335 Z"
              fill="#fef08a"
            />
            <text x="615" y="210" textAnchor="middle" fill="#fde047" fontSize="11.5" fontWeight="bold">
              1600°C–1650°C TAP STREAM
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// MAIN DASHBOARD APPLICATION
// ==========================================

export default function App() {
  // Navigation state ('all' shows executive full view, or focused section tabs)
  const [activeTab, setActiveTab] = useState('all');

  // Section 1 State: Selected Anatomy Component
  const [selectedAnatomyId, setSelectedAnatomyId] = useState('electrodes');

  // Section 2 State: Tap-to-Tap Stepper (0 to 5 index) & Auto-Play
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // Start on Melting for visual impact
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Section 3 State: Carbon Calculator Production Volume (Tonnes/year) & EAF Factor
  const [annualProductionMt, setAnnualProductionMt] = useState(2.0); // 2.0 Million Tonnes default
  const [eafIntensity, setEafIntensity] = useState(0.60); // 0.55 - 0.65 tCO2/t
  const [bfBofIntensity, setBfBofIntensity] = useState(2.15); // > 2.0 tCO2/t

  // Handle Auto-Play interval for Tap-to-Tap Cycle
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % CYCLE_STEPS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const selectedAnatomy =
    ANATOMY_COMPONENTS.find((c) => c.id === selectedAnatomyId) || ANATOMY_COMPONENTS[0];
  const currentStepData = CYCLE_STEPS[currentStepIndex];

  // Carbon Intensity Calculations
  const totalBfBofEmissions = annualProductionMt * bfBofIntensity; // Million tCO2/yr
  const totalEafEmissions = annualProductionMt * eafIntensity; // Million tCO2/yr
  const annualCo2Saved = totalBfBofEmissions - totalEafEmissions; // Million tCO2/yr
  const reductionPercentage = Math.round(((bfBofIntensity - eafIntensity) / bfBofIntensity) * 100);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Ambient Industrial Glow Header Backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[550px] h-[320px] bg-orange-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-20 right-1/4 w-[480px] h-[300px] bg-sky-500/10 rounded-full blur-[130px]" />
      </div>

      {/* ========================================== */}
      {/* HEADER & EXECUTIVE KPI RIBBON              */}
      {/* ========================================== */}
      <header className="relative z-10 border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title & Subtitle */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-sky-500 text-slate-950 shadow-lg shadow-orange-500/20 shrink-0">
                <Flame className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    Secondary Steelmaking Metallurgy
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                    3-Phase AC Technology
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
                  Anatomy & Operation of the{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-sky-400 bg-clip-text text-transparent">
                    Electric Arc Furnace (EAF)
                  </span>
                </h1>
              </div>
            </div>

            {/* Section View Switcher Tabs */}
            <nav className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'all', label: 'Full Dashboard', icon: Layers },
                { id: 'anatomy', label: '1. EAF Anatomy', icon: Zap },
                { id: 'cycle', label: '2. Tap-to-Tap Cycle', icon: Clock },
                { id: 'comparison', label: '3. CO₂ & Tech Matrix', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* MAIN CONTENT CONTAINER                     */}
      {/* ========================================== */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* TOP EXECUTIVE SUMMARY METRICS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Power Configuration</p>
              <p className="text-lg font-bold text-white">3-Phase AC Graphite Arcs</p>
              <p className="text-xs text-sky-400">High-intensity radiant & arc heat</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Tap-to-Tap Batch Cycle</p>
              <p className="text-lg font-bold text-white">60 – 90 Minutes</p>
              <p className="text-xs text-orange-400">6 sequential metallurgical stages</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Tapping Temperature</p>
              <p className="text-lg font-bold text-white">1,600°C – 1,650°C</p>
              <p className="text-xs text-amber-400">Liquefies scrap, DRI & pig iron</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Scrap-Based CO₂ Intensity</p>
              <p className="text-lg font-bold text-white">0.55 – 0.65 tCO₂/t</p>
              <p className="text-xs text-emerald-400">vs. &gt;2.0 tCO₂/t in BF-BOF</p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 1: INTERACTIVE EAF ANATOMY (2D CROSS-SECTION SVG)         */}
        {/* ================================================================= */}
        {(activeTab === 'all' || activeTab === 'anatomy') && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-orange-400 text-xs font-mono uppercase tracking-widest">
                  <Zap className="w-4 h-4" />
                  <span>Module 01 • Structural & Thermal Architecture</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Interactive EAF Anatomy & Cross-Section
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-1">
                  At its core, an Electric Arc Furnace is a massive, refractory-lined vessel designed to melt metallic raw materials using high-intensity electrical arcs. Select any numbered hotspot or component tab to inspect its engineering role.
                </p>
              </div>

              {/* Component Quick Selector Pills */}
              <div className="flex flex-wrap gap-1.5">
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
                      #{idx + 1} {comp.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main 2-Column Layout: SVG Diagram (Left) + Detailed Callout Card (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: Interactive Cross-Section SVG */}
              <div className="lg:col-span-7">
                <EAFAnatomySVG
                  selectedId={selectedAnatomyId}
                  onSelect={(id) => setSelectedAnatomyId(id)}
                />
              </div>

              {/* Right 5 Cols: Active Component Callout Inspector */}
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

                  {/* Thermal Zone Indicator */}
                  <div className="mt-4 flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono">
                    <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-slate-400">Thermal Operating Regime:</span>
                    <span className="text-amber-300 font-bold">{selectedAnatomy.tempRange}</span>
                  </div>

                  {/* Component Description */}
                  <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                    {selectedAnatomy.description}
                  </p>

                  {/* Technical Specifications List */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Key Engineering Specifications
                    </h4>
                    {selectedAnatomy.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/60 px-3.5 py-2 rounded-lg border border-slate-800/70 text-xs gap-1"
                      >
                        <span className="text-slate-400 font-medium">{spec.label}:</span>
                        <span className="text-slate-100 font-mono font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All 6 Component Directory List for Rapid Switching */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ANATOMY_COMPONENTS.map((comp, index) => {
                    const Icon = comp.icon;
                    const active = selectedAnatomyId === comp.id;
                    return (
                      <button
                        key={comp.id}
                        onClick={() => setSelectedAnatomyId(comp.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-slate-800/90 border-orange-500/80 shadow-md'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0"
                          style={{
                            backgroundColor: active ? comp.color : '#1e293b',
                            color: active ? '#0f172a' : comp.color
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-100 truncate">{comp.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{comp.badge}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 2: THE 60-90 MINUTE TAP-TO-TAP CYCLE SIMULATOR            */}
        {/* ================================================================= */}
        {(activeTab === 'all' || activeTab === 'cycle') && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
            {/* Section Header + Playback Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase tracking-widest">
                  <Clock className="w-4 h-4" />
                  <span>Module 02 • Batch Production Sequence (60–90 Mins)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  The 6-Step Tap-to-Tap Cycle Simulator
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-1">
                  Step through or auto-play the complete 60 to 90 minute batch production cycle—from scrap bucket charging and multi-voltage arc melting to supersonic oxygen refining, slag skimming, bottom tapping, and refractory fettling.
                </p>
              </div>

              {/* Playback Control Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentStepIndex((prev) => (prev - 1 + CYCLE_STEPS.length) % CYCLE_STEPS.length);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 cursor-pointer"
                  title="Previous Stage"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
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
                      <span>Auto-Play Cycle</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentStepIndex((prev) => (prev + 1) % CYCLE_STEPS.length);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 cursor-pointer"
                  title="Next Stage"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentStepIndex(0);
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer"
                  title="Reset to Step 1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 6-Step Interactive Timeline Stepper Bar */}
            <div className="space-y-3">
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
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isCurrent
                          ? 'bg-slate-950 border-2 shadow-lg'
                          : isPassed
                          ? 'bg-slate-950/60 border-slate-800 opacity-90 hover:opacity-100'
                          : 'bg-slate-950/40 border-slate-800/70 opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: isCurrent ? st.accent : undefined
                      }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span
                          className="px-2 py-0.5 rounded-md font-bold"
                          style={{
                            backgroundColor: isCurrent ? st.accent : '#1e293b',
                            color: isCurrent ? '#0f172a' : '#94a3b8'
                          }}
                        >
                          STEP {st.step}
                        </span>
                        <span className="text-slate-400 text-[11px]">{st.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-white line-clamp-1 mt-1">
                        {st.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* 0 to 90 Minute Progress Bar */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>0 MIN (BUCKET CHARGE)</span>
                  <span className="text-amber-400 font-bold">
                    ELAPSED CYCLE WINDOW: {currentStepData.duration} ({currentStepData.timeProgress}% OF BATCH)
                  </span>
                  <span>90 MIN (TURNAROUND COMPLETE)</span>
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

            {/* Simulator Workspace: Animated SVG (Left 7 Cols) + Telemetry & Step Details (Right 5 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: Dynamic Furnace Simulation SVG */}
              <div className="lg:col-span-7">
                <TapToTapSimulatorSVG currentStepData={currentStepData} />
              </div>

              {/* Right 5 Cols: Real-Time Furnace Telemetry + Stage Breakdown */}
              <div className="lg:col-span-5 space-y-4">
                {/* Live Telemetry Gauges */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Bath Temperature Gauge */}
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
                    <p className="text-[11px] text-slate-400 mt-1">Target Tapping: 1600°C–1650°C</p>
                  </div>

                  {/* Transformer Tap / Power Gauge */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>ELECTRICAL INPUT</span>
                      <Zap className="w-4 h-4 text-sky-400" />
                    </div>
                    <p className="text-2xl font-extrabold text-sky-400 mt-1 font-mono">
                      {currentStepData.powerMW} MW
                    </p>
                    <div className="w-full h-2 bg-slate-900 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-500"
                        style={{ width: `${(currentStepData.powerMW / 90) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 truncate">
                      {currentStepData.voltageTap}
                    </p>
                  </div>
                </div>

                {/* Detailed Stage Card */}
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
                      Operational Sequence & Controls:
                    </p>
                    {currentStepData.details.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: currentStepData.accent }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs font-mono">
                    <span className="text-amber-400 font-bold">METALLURGICAL STATE: </span>
                    <span className="text-slate-300">{currentStepData.metallurgy}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 3: TECHNOLOGY & CARBON INTENSITY COMPARISON               */}
        {/* ================================================================= */}
        {(activeTab === 'all' || activeTab === 'comparison') && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-8">
            <div className="border-b border-slate-800 pb-5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                <BarChart3 className="w-4 h-4" />
                <span>Module 03 • Sustainability & Metallurgical Benchmarking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Carbon Intensity & 3-Way Technology Comparison
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-1">
                Compared to traditional Blast Furnace–Basic Oxygen Furnace (BF-BOF) operations, EAF steelmaking offers vastly lower capital expenditure, superior operational flexibility, and a dramatic reduction in carbon intensity—while outperforming basic Induction Furnaces (IF) in chemical refining.
              </p>
            </div>

            {/* PART 3A: Interactive Carbon Intensity Visual Chart & Savings Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left 7 Cols: Visual Bar Chart Comparison */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white">
                      Specific Carbon Emissions (tCO₂ per Tonne of Crude Steel)
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                      -{reductionPercentage}% CO₂ Reduction with EAF
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct & indirect emissions comparison when producing steel from recycled scrap in an EAF vs. primary iron ore reduction in a BF-BOF.
                  </p>
                </div>

                {/* Horizontal Bar Chart Visualization */}
                <div className="space-y-5 my-auto">
                  {/* EAF Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-400" />
                        <span className="font-bold text-white">
                          Electric Arc Furnace (Recycled Scrap EAF)
                        </span>
                      </div>
                      <span className="font-mono font-extrabold text-sky-400 text-base">
                        {eafIntensity.toFixed(2)} tCO₂ / t steel
                      </span>
                    </div>
                    <div className="w-full h-9 bg-slate-900 rounded-xl p-1 border border-slate-800 relative">
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-300 flex items-center justify-end pr-3"
                        style={{ width: `${(eafIntensity / 2.5) * 100}%` }}
                      >
                        <span className="text-[11px] font-mono font-bold text-slate-950">
                          0.55–0.65 Benchmark
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Induction Furnace Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-400" />
                        <span className="font-semibold text-slate-300">
                          Basic Induction Furnace (IF - Scrap Melt)
                        </span>
                      </div>
                      <span className="font-mono font-bold text-amber-400">
                        0.75 tCO₂ / t steel
                      </span>
                    </div>
                    <div className="w-full h-7 bg-slate-900 rounded-xl p-1 border border-slate-800">
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-400"
                        style={{ width: `${(0.75 / 2.5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* BF-BOF Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="font-bold text-white">
                          Traditional Blast Furnace–Basic Oxygen Furnace (BF-BOF)
                        </span>
                      </div>
                      <span className="font-mono font-extrabold text-red-400 text-base">
                        {bfBofIntensity.toFixed(2)} tCO₂ / t steel
                      </span>
                    </div>
                    <div className="w-full h-9 bg-slate-900 rounded-xl p-1 border border-slate-800">
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-orange-600 via-red-500 to-rose-600 transition-all duration-300 flex items-center justify-end pr-3"
                        style={{ width: `${(bfBofIntensity / 2.5) * 100}%` }}
                      >
                        <span className="text-[11px] font-mono font-bold text-white">
                          &gt;2.0 tCO₂/t Primary Steelmaking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fine-Tune Benchmark Sliders */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>EAF Intensity Range (0.55–0.65):</span>
                      <span className="font-mono text-sky-400 font-bold">{eafIntensity.toFixed(2)} tCO₂/t</span>
                    </div>
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
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>BF-BOF Intensity (&gt;2.0):</span>
                      <span className="font-mono text-red-400 font-bold">{bfBofIntensity.toFixed(2)} tCO₂/t</span>
                    </div>
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

              {/* Right 5 Cols: Interactive Annual Production CO2 Savings Calculator */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
                    Interactive Plant Impact Simulator
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Annual Decarbonization Calculator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Adjust annual steel plant output to quantify total yearly CO₂ emissions avoided by switching from BF-BOF to scrap-based EAF.
                  </p>
                </div>

                {/* Production Volume Slider */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">ANNUAL STEEL PRODUCTION:</span>
                    <span className="text-lg font-mono font-extrabold text-amber-400">
                      {annualProductionMt.toFixed(1)} Million Tonnes / yr
                    </span>
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
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>0.5M t/yr (Mini-Mill)</span>
                    <span>2.5M t/yr</span>
                    <span>5.0M t/yr (Mega-Mill)</span>
                  </div>
                </div>

                {/* Output Comparison Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/80 border border-slate-800/90 p-3.5 rounded-xl">
                    <p className="text-[11px] font-mono text-slate-400">BF-BOF ANNUAL EMISSIONS</p>
                    <p className="text-xl font-mono font-bold text-red-400 mt-1">
                      {totalBfBofEmissions.toFixed(2)}M tCO₂
                    </p>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800/90 p-3.5 rounded-xl">
                    <p className="text-[11px] font-mono text-slate-400">EAF ANNUAL EMISSIONS</p>
                    <p className="text-xl font-mono font-bold text-sky-400 mt-1">
                      {totalEafEmissions.toFixed(2)}M tCO₂
                    </p>
                  </div>
                </div>

                {/* Net CO2 Savings Highlight Box */}
                <div className="bg-emerald-950/30 border-2 border-emerald-500/50 rounded-2xl p-4 text-center">
                  <p className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                    Total Annual CO₂ Emissions Avoided
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 my-1">
                    {annualCo2Saved.toFixed(2)} Million tCO₂ / yr
                  </p>
                  <p className="text-xs text-slate-300">
                    Equivalent to removing roughly{' '}
                    <strong className="text-white">
                      {Math.round((annualCo2Saved * 1000000) / 4.6).toLocaleString()}
                    </strong>{' '}
                    passenger vehicles from the road every year.
                  </p>
                </div>
              </div>
            </div>

            {/* PART 3B: 3-Way Technology Comparison Matrix (EAF vs. BF-BOF vs. Induction Furnace) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    3-Way Steelmaking Technology Matrix (EAF vs. BF-BOF vs. Induction Furnace)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Why EAF dominates high-value secondary steelmaking: combining low CapEx with precision chemical refining of Phosphorus (P) and Sulfur (S).
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl shrink-0">
                  ★ EAF excels at special alloy refining
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-mono uppercase text-slate-300">
                      <th className="py-4 px-5 w-1/5">Evaluation Criterion</th>
                      <th className="py-4 px-5 w-[27%] bg-sky-950/30 border-x border-sky-500/30 text-sky-300">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-sky-400" />
                          <span>Electric Arc Furnace (EAF)</span>
                        </div>
                      </th>
                      <th className="py-4 px-5 w-[26%]">
                        <div className="flex items-center gap-2">
                          <Factory className="w-4 h-4 text-orange-400" />
                          <span>Blast Furnace (BF-BOF)</span>
                        </div>
                      </th>
                      <th className="py-4 px-5 w-[27%]">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-amber-400" />
                          <span>Induction Furnace (IF)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {COMPARISON_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        {/* Criterion Name */}
                        <td className="py-4 px-5 font-bold text-white align-top">
                          {row.metric}
                        </td>

                        {/* EAF Column (Highlighted) */}
                        <td className="py-4 px-5 bg-sky-950/15 border-x border-sky-500/20 align-top space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sky-300">{row.eaf.rating}</span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                              {row.eaf.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{row.eaf.detail}</p>
                        </td>

                        {/* BF-BOF Column */}
                        <td className="py-4 px-5 align-top space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-200">{row.bfbof.rating}</span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {row.bfbof.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{row.bfbof.detail}</p>
                        </td>

                        {/* Induction Furnace Column */}
                        <td className="py-4 px-5 align-top space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-200">{row.induction.rating}</span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {row.induction.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {row.induction.detail}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Metallurgical Refining Deep-Dive Callout Banner (EAF vs Induction) */}
              <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-sky-950/40 border border-orange-500/40 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0 mt-0.5">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Why EAF Excels Over Basic Induction Furnaces (IF) in Chemical Refining
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      In an <strong className="text-amber-300">Induction Furnace</strong>, electromagnetic eddy currents heat only the metallic charge while the top slag remains relatively cold and viscous—making dephosphorization and desulfurization nearly impossible. In contrast, an <strong className="text-sky-300">Electric Arc Furnace</strong> strikes intense overhead arcs and injects supersonic oxygen directly into the bath, superheating a reactive basic <span className="font-mono text-orange-300">CaO-MgO</span> foamy slag that actively strips out unwanted <strong>Phosphorus (P)</strong> and <strong>Sulfur (S)</strong> to produce high-value, special alloy steel grades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 py-5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-semibold text-slate-300">
              Anatomy and Operation of the Electric Arc Furnace (EAF)
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            3-Phase AC Tap-to-Tap Cycle (60–90 min) • 1600°C–1650°C • 0.55–0.65 tCO₂/t Steel
          </div>
        </div>
      </footer>
    </div>
  );
}