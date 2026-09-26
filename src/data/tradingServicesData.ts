export interface TradingItem {
  name: string;
  spec: string;
}

export interface TradingServiceCategory {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  imageUrl: string;
  heroBgUrl: string;
  tags: string[];
  features: string[];
  itemsSupplied: TradingItem[];
  standards: string[];
}

export const TRADING_SERVICES_DATA: TradingServiceCategory[] = [
  {
    slug: 'industrial-valves-piping',
    title: 'Industrial Valves & Piping',
    shortDesc: 'High-pressure carbon steel, stainless steel valves, flanges, fittings, and industrial piping systems.',
    fullDesc: 'SECO LINE provides certified high-pressure industrial valves, flanges, seamless steel pipes, and piping accessories designed for critical applications across oil & gas refineries, petrochemical plants, desalination facilities, and heavy industrial plants in Saudi Arabia.',
    iconName: 'Layers',
    badge: 'High Pressure Spec',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    heroBgUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    tags: ['Gate & Globe Valves', 'Seamless Pipes', 'Flanges & Gaskets'],
    features: [
      'API 6D & API 600 Certified Valves',
      'High-Pressure Carbon & Stainless Steel',
      '100% Hydrotested & NDT Inspected',
      'Traceable Mill Test Certificates (MTC 3.1)'
    ],
    itemsSupplied: [
      { name: 'Gate, Globe & Check Valves', spec: 'Class 150 to 2500, Flanged & Butt-Weld' },
      { name: 'Seamless & Welded Steel Pipes', spec: 'ASTM A106 / A53 / API 5L Gr. B' },
      { name: 'High-Pressure Forged Fittings', spec: '3000# & 6000# Threaded & Socket Weld' },
      { name: 'Flanges & Spiral Wound Gaskets', spec: 'ANSI B16.5 WN, Blind, Slip-On' },
    ],
    standards: ['Saudi Aramco Approved', 'SABIC Compliant', 'ISO 9001:2015', 'API 6D Certified'],
  },
  {
    slug: 'safety-equipment-ppe',
    title: 'Safety Equipment & PPE',
    shortDesc: 'Full-spectrum HSE gear, site safety supplies, fire-retardant clothing, and respiratory protection.',
    fullDesc: 'We supply high-grade Health, Safety & Environment (HSE) protective wear and site equipment. Designed to meet strict OSHA and Saudi Aramco safety regulations, our PPE range ensures maximum worker protection across high-risk industrial sites.',
    iconName: 'ShieldCheck',
    badge: 'HSE & OSHA Certified',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    heroBgUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    tags: ['Visors & Helmets', 'FR Coveralls', 'Safety Harnesses'],
    features: [
      'OSHA & EN Standard Compliance',
      'Nomex & Pyrovatex Fire-Retardant Fabric',
      'High-Altitude Fall Protection Gear',
      'Gas Detection & Respiratory Apparatus'
    ],
    itemsSupplied: [
      { name: 'Hard Hats & Face Visors', spec: 'ANSI Z89.1 Class E Certified' },
      { name: 'Fire-Retardant Coveralls (FRC)', spec: 'NFPA 2112 / EN ISO 11612' },
      { name: 'Full-Body Safety Harnesses', spec: 'EN 361 Double Lanyard with Shock Absorber' },
      { name: 'Respiratory Protection Systems', spec: '3M N95 & Half-Mask Air Purifying' },
    ],
    standards: ['OSHA Compliant', 'ANSI / ISEA Approved', 'EN ISO Certified', 'Aramco HSE Spec'],
  },
  {
    slug: 'tools-hardware-supply',
    title: 'Tools & Hardware Supply',
    shortDesc: 'Professional hand tools, power tools, hydraulic equipment, pneumatic tools, and heavy hardware.',
    fullDesc: 'SECO LINE trades heavy-duty industrial tools and hardware for precision mechanical assembly, plant turnarounds, and civil execution. From hydraulic torque equipment to heavy rigging gear, we deliver reliability on every job.',
    iconName: 'Wrench',
    badge: 'Heavy Duty Grade',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    heroBgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    tags: ['Torque Wrenches', 'Power Tools', 'Rigging Gear'],
    features: [
      'Calibrated Hydraulic Torque Tools',
      'Heavy-Duty Pneumatic Impact Wrenches',
      'Certified Lifting Slings & Shackles',
      'High-Tensile Fasteners & Anchor Bolts'
    ],
    itemsSupplied: [
      { name: 'Hydraulic Torque Wrenches', spec: 'Up to 35,000 Nm Torque Range' },
      { name: 'Pneumatic Power Tools', spec: 'Industrial Air Impact Wrenches & Grinders' },
      { name: 'High Fasteners & Stud Bolts', spec: 'ASTM A193 B7 / B16 & A194 2H' },
      { name: 'Rigging & Lifting Shackles', spec: 'Crosby Type Bow Shackles & Wire Ropes' },
    ],
    standards: ['ISO Calibrated', 'CE Certified', 'DIN / ASME Specs', 'Heavy Industrial Grade'],
  },
  {
    slug: 'electrical-instrumentation',
    title: 'Electrical & Instrumentation',
    shortDesc: 'Explosion-proof electrical fittings, armored cables, junction boxes, and process instrumentation.',
    fullDesc: 'Complete electrical and process control supply for hazardous and non-hazardous industrial areas. We provide ATEX/IECEx certified explosion-proof enclosures, power cables, and precision measuring instruments.',
    iconName: 'PackageCheck',
    badge: 'ATEX / IECEx Spec',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    heroBgUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80',
    tags: ['Armored Cables', 'Cable Trays', 'Control Panels'],
    features: [
      'ATEX & IECEx Zone 1 & 2 Explosion Proof',
      'Low & Medium Voltage Armored Cables',
      'Galvanized & Stainless Steel Cable Trays',
      'Digital Pressure & Temperature Transmitters'
    ],
    itemsSupplied: [
      { name: 'Armored LV/MV Power Cables', spec: 'IEC 60502-1 XLPE/SWA/PVC' },
      { name: 'Explosion-Proof Junction Boxes', spec: 'Ex d / Ex e Stainless Steel Enclosures' },
      { name: 'Cable Trays & Ladder Conduits', spec: 'Hot-Dip Galvanized & SS316' },
      { name: 'Process Transmitters & Gauges', spec: '4-20mA HART Digital Transmitters' },
    ],
    standards: ['IECEx Certified', 'ATEX Approved', 'SEC / Aramco Spec', 'ISO Certified'],
  },
  {
    slug: 'heavy-equipment-machinery',
    title: 'Heavy Equipment & Machinery',
    shortDesc: 'Supply and trading of heavy construction machinery, access platforms, and mobile generators.',
    fullDesc: 'Trading and fleet supply of heavy industrial machinery, diesel power generators, air compressors, and access platforms. Fully maintained and certified for deployment in major Saudi infrastructure and energy sites.',
    iconName: 'Truck',
    badge: 'Site-Ready Fleet',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    heroBgUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80',
    tags: ['Generators', 'Scaffolding', 'Forklifts'],
    features: [
      'Silent Heavy Diesel Generators',
      'Certified Mobile Air Compressors',
      'Telescopic Boom Lifts & Forklifts',
      'Heavy Heavy-Duty Modular Scaffolding'
    ],
    itemsSupplied: [
      { name: 'Mobile Power Generators', spec: '50 kVA to 1250 kVA Soundproofed' },
      { name: 'Industrial Air Compressors', spec: '375 CFM to 1100 CFM High Pressure' },
      { name: 'Rough Terrain Forklifts', spec: '3 Ton to 15 Ton Lifting Capacity' },
      { name: 'Scaffolding Systems', spec: 'Cuplock & Ringlock Certified Materials' },
    ],
    standards: ['Aramco Inspection Verified', 'Third Party Certified', 'ISO Safety Approved'],
  },
  {
    slug: 'structural-steel-materials',
    title: 'Structural Steel & Construction Materials',
    shortDesc: 'Certified structural beams, plates, rebar, wire mesh, and specialized civil construction consumables.',
    fullDesc: 'We supply high-yield structural steel, plates, rebar, and construction consumables to major civil contractors across the Kingdom. Certified mill origin with full compliance to Saudi building codes.',
    iconName: 'Building2',
    badge: 'Aramco Standard',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    heroBgUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    tags: ['H & I Beams', 'Deformed Rebar', 'Steel Plates'],
    features: [
      'High-Yield ASTM A36 / A572 Grade 50 Steel',
      'Deformed Steel Rebar (BS 4449 Grade 500B)',
      'Structural Steel Beams (HEA, HEB, IPE, UB)',
      'Industrial Epoxy Coatings & Paints'
    ],
    itemsSupplied: [
      { name: 'Structural Steel H-Beams & I-Beams', spec: 'UB / UC / HEA / HEB Standard Profiles' },
      { name: 'Deformed Steel Rebar Bars', spec: '8mm to 40mm Grade 500B' },
      { name: 'Hot-Rolled Carbon Steel Plates', spec: '6mm to 100mm Thickness' },
      { name: 'Industrial Protective Coatings', spec: 'Epoxy, Polyurethane & Zinc Primers' },
    ],
    standards: ['SABIC Steel Certified', 'ASTM Compliant', 'Saudi Building Code (SBC)', 'ISO 9001'],
  },
];
