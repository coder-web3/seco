import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  PhoneCall, 
  FileText, 
  Award, 
  Sparkles,
  Zap,
  PackageCheck,
  Send,
  Download,
  Building2,
  Check,
  Factory,
  Globe2,
  Flame,
  FlaskConical,
  Cpu,
  Clock,
  Tag,
  Mail,
  HelpCircle,
  CheckSquare
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { TRADING_SERVICES_DATA } from '@/data/tradingServicesData';
import { HorizontalScrollContainer } from '@/components/public/HorizontalScrollContainer';

export const dynamic = 'force-dynamic';

interface TradingDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: TradingDetailPageProps): Promise<Metadata> {
  const dbCat = await prisma.tradingService.findUnique({ where: { slug: params.slug } }).catch(() => null);
  const category = dbCat ? {
    title: dbCat.title,
    fullDesc: dbCat.fullDesc || dbCat.shortDesc || '',
  } : TRADING_SERVICES_DATA.find((c) => c.slug === params.slug);

  if (!category) {
    return { title: 'Trading Service Not Found - SECO LINE' };
  }

  return {
    title: `${category.title} - SECO LINE Industrial Trading`,
    description: category.fullDesc,
  };
}

export default async function TradingDetailPage({ params }: TradingDetailPageProps) {
  const [dbCategory, allDbCategories] = await Promise.all([
    prisma.tradingService.findUnique({ where: { slug: params.slug } }).catch(() => null),
    prisma.tradingService.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ]);

  const fallbackCat = TRADING_SERVICES_DATA.find((c) => c.slug === params.slug);

  let category;
  if (dbCategory) {
    let tagsArr = [];
    let featsArr = [];
    let itemsArr = [];
    let stdsArr = [];
    let ovFeatsArr = [];
    try { tagsArr = typeof dbCategory.tags === 'string' ? JSON.parse(dbCategory.tags) : dbCategory.tags || []; } catch { tagsArr = []; }
    try { featsArr = typeof dbCategory.features === 'string' ? JSON.parse(dbCategory.features) : dbCategory.features || []; } catch { featsArr = []; }
    try { itemsArr = typeof dbCategory.itemsSupplied === 'string' ? JSON.parse(dbCategory.itemsSupplied) : dbCategory.itemsSupplied || []; } catch { itemsArr = []; }
    try { stdsArr = typeof dbCategory.standards === 'string' ? JSON.parse(dbCategory.standards) : dbCategory.standards || []; } catch { stdsArr = []; }
    try { ovFeatsArr = dbCategory.overviewFeaturesJson ? JSON.parse(dbCategory.overviewFeaturesJson) : []; } catch { ovFeatsArr = []; }

    category = {
      slug: dbCategory.slug,
      title: dbCategory.title,
      badge: dbCategory.badge || 'High Spec',
      iconName: dbCategory.iconName || 'Layers',
      imageUrl: dbCategory.imageUrl || fallbackCat?.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      heroBgUrl: dbCategory.heroBgUrl || fallbackCat?.heroBgUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
      shortDesc: dbCategory.shortDesc || fallbackCat?.shortDesc || '',
      fullDesc: dbCategory.fullDesc || fallbackCat?.fullDesc || '',
      tags: Array.isArray(tagsArr) && tagsArr.length > 0 ? tagsArr : (fallbackCat?.tags || []),
      features: Array.isArray(featsArr) && featsArr.length > 0 ? featsArr : (fallbackCat?.features || []),
      itemsSupplied: Array.isArray(itemsArr) && itemsArr.length > 0 ? itemsArr : (fallbackCat?.itemsSupplied || []),
      standards: Array.isArray(stdsArr) && stdsArr.length > 0 ? stdsArr : (fallbackCat?.standards || []),
      
      overviewKicker: dbCategory.overviewKicker || 'DIVISION OVERVIEW & STRATEGIC VALUE',
      overviewTitle: dbCategory.overviewTitle || `Uncompromising Quality in`,
      overviewSubtitle: dbCategory.overviewSubtitle || 'Engineered to meet the most rigorous technical demands of Saudi Arabia’s industrial, energy, civil, and infrastructure mega-projects.',
      overviewDesc2: dbCategory.overviewDesc2 || 'Every material batch undergoes comprehensive quality control, heat traceability verification, and third-party inspection to ensure total alignment with Saudi Aramco, SABIC, SEC, and international ASTM/API standards.',
      overviewFeatures: Array.isArray(ovFeatsArr) && ovFeatsArr.length > 0 ? ovFeatsArr : [
        { title: 'Traceable Mill Specs', desc: 'Full MTC 3.1 & heat batch documentation.' },
        { title: 'Kingdom Logistics', desc: 'Rapid site delivery to all KSA regions.' },
        { title: 'Aramco Compliant', desc: 'Fully certified for energy & plant sites.' },
      ],
      pdfUrl: dbCategory.pdfUrl || '/SECO_LINE_PROFILE.pdf',
      
      categoriesKicker: dbCategory.categoriesKicker || 'PRODUCT / SERVICE CATEGORIES',
      categoriesTitle: dbCategory.categoriesTitle || 'Main Supply Classifications',
      categoriesSubtitle: dbCategory.categoriesSubtitle || '',
    };
  } else {
    category = {
      slug: fallbackCat?.slug || params.slug,
      title: fallbackCat?.title || 'Division Detail',
      badge: fallbackCat?.badge || 'High Spec',
      iconName: fallbackCat?.iconName || 'Layers',
      imageUrl: fallbackCat?.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      heroBgUrl: fallbackCat?.heroBgUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
      shortDesc: fallbackCat?.shortDesc || '',
      fullDesc: fallbackCat?.fullDesc || '',
      tags: fallbackCat?.tags || [],
      features: fallbackCat?.features || [],
      itemsSupplied: fallbackCat?.itemsSupplied || [],
      standards: fallbackCat?.standards || [],
      overviewKicker: 'DIVISION OVERVIEW & STRATEGIC VALUE',
      overviewTitle: 'Uncompromising Quality in',
      overviewSubtitle: 'Engineered to meet the most rigorous technical demands of Saudi Arabia’s industrial, energy, civil, and infrastructure mega-projects.',
      overviewDesc2: 'Every material batch undergoes comprehensive quality control, heat traceability verification, and third-party inspection to ensure total alignment with Saudi Aramco, SABIC, SEC, and international ASTM/API standards.',
      overviewFeatures: [
        { title: 'Traceable Mill Specs', desc: 'Full MTC 3.1 & heat batch documentation.' },
        { title: 'Kingdom Logistics', desc: 'Rapid site delivery to all KSA regions.' },
        { title: 'Aramco Compliant', desc: 'Fully certified for energy & plant sites.' },
      ],
      pdfUrl: '/SECO_LINE_PROFILE.pdf',
      categoriesKicker: 'PRODUCT / SERVICE CATEGORIES',
      categoriesTitle: 'Main Supply Classifications',
      categoriesSubtitle: '',
    };
  }

  if (!category) {
    notFound();
  }

  // Default Industries
  const defaultIndustries = [
    {
      name: 'Oil & Gas',
      desc: 'Upstream, midstream, refineries, offshore platforms, and pipeline transmission projects.',
      icon: Flame,
    },
    {
      name: 'Petrochemical',
      desc: 'Chemical processing, fertilizer production, cracking units, and polymer plants.',
      icon: FlaskConical,
    },
    {
      name: 'Manufacturing',
      desc: 'Heavy mechanical engineering, steel fabrication, automotive, and industrial assembly.',
      icon: Factory,
    },
    {
      name: 'Utilities & Power',
      desc: 'Power generation plants, water desalination facilities, and high-voltage transmission.',
      icon: Zap,
    },
    {
      name: 'Commercial Construction',
      desc: 'High-rise commercial towers, mixed-use developments, and corporate complexes.',
      icon: Building2,
    },
    {
      name: 'Infrastructure & Vision 2030',
      desc: 'Kingdom mega-projects including NEOM, Red Sea, Qiddiya, highways, and ports.',
      icon: Globe2,
    },
  ];

  // Parse custom industries from DB if present
  let industries = defaultIndustries;
  if (dbCategory?.industriesJson) {
    try {
      const parsedInds = JSON.parse(dbCategory.industriesJson);
      if (Array.isArray(parsedInds) && parsedInds.length > 0) {
        industries = parsedInds.map((item: any, idx: number) => ({
          name: item.name || `Industry ${idx + 1}`,
          desc: item.desc || '',
          icon: defaultIndustries[idx % defaultIndustries.length].icon,
        }));
      }
    } catch {
      industries = defaultIndustries;
    }
  }

  // Default Why SECO LINE 6 Core Pillars
  const defaultWhySecoPillars = [
    {
      title: 'Uncompromising Quality',
      desc: '100% heat batch traceable materials with Mill Test Certificates (MTC 3.1) complying with Aramco & SABIC.',
      icon: ShieldCheck,
    },
    {
      title: 'Immediate Availability',
      desc: 'Extensive local Saudi warehouse inventory for instant order fulfillment and zero-delay site supply.',
      icon: PackageCheck,
    },
    {
      title: 'Technical Expertise',
      desc: 'Experienced engineers & procurement specialists assisting with material specs and BOQ verification.',
      icon: Cpu,
    },
    {
      title: 'Competitive Pricing',
      desc: 'Direct manufacturer and mill relationships delivering tier-1 wholesale pricing for bulk procurement.',
      icon: Tag,
    },
    {
      title: 'Reliable Execution',
      desc: 'Dedicated account management overseeing order processing, QA inspection, and customs clearance.',
      icon: Award,
    },
    {
      title: 'On-Time Supply',
      desc: 'Rapid logistics dispatch network serving Jubail, Dammam, Riyadh, Jeddah, Yanbu, and NEOM.',
      icon: Truck,
    },
  ];

  // Parse custom Why SECO pillars from DB if present
  let whySecoPillars = defaultWhySecoPillars;
  if (dbCategory?.whySecoJson) {
    try {
      const parsedPillars = JSON.parse(dbCategory.whySecoJson);
      if (Array.isArray(parsedPillars) && parsedPillars.length > 0) {
        whySecoPillars = parsedPillars.map((item: any, idx: number) => ({
          title: item.title || `Pillar ${idx + 1}`,
          desc: item.desc || '',
          icon: defaultWhySecoPillars[idx % defaultWhySecoPillars.length].icon,
        }));
      }
    } catch {
      whySecoPillars = defaultWhySecoPillars;
    }
  }


  // Automatically fetch related SECO LINE services (all other divisions)
  let relatedServices = [];
  if (allDbCategories.length > 0) {
    relatedServices = allDbCategories.filter(c => c.slug !== category.slug).map(s => ({
      slug: s.slug,
      title: s.title,
      badge: s.badge || 'Division',
      imageUrl: s.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      shortDesc: s.shortDesc || '',
    }));
  } else {
    relatedServices = TRADING_SERVICES_DATA.filter((c) => c.slug !== category.slug);
  }

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 select-none font-sans bg-slate-50/50">
      
      {/* 1. Ultra-Premium Dark Hero Section with Diagonal Cutout Imagery */}
      <section className="relative min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] flex flex-col justify-between overflow-hidden bg-[#040A12] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 mb-0 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-800/90 font-sans">
        
        {/* Ambient Radial Glows */}
        <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-[#15B83E]/15 rounded-full blur-[130px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#0284C7]/15 rounded-full blur-[110px] pointer-events-none" />

        {/* Dynamic Diagonal Cutout Image Layer (Right Half) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[56%] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0%_100%)] bg-[#071322]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
              style={{
                backgroundImage: `url('${category.heroBgUrl}')`,
                backgroundPosition: 'center 40%',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/80 to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-slate-950/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040A12]/95 via-transparent to-transparent hidden lg:block" />
            </div>

            {/* Floating High-Tech Spec Card */}
            <div className="absolute bottom-10 right-10 hidden xl:flex items-center gap-4 bg-[#070E18]/85 backdrop-blur-xl border border-slate-700/80 p-4 rounded-2xl shadow-2xl z-20">
              <div className="w-12 h-12 rounded-xl bg-[#15B83E]/20 border border-[#15B83E]/50 flex items-center justify-center text-[#15B83E]">
                <PackageCheck className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">CERTIFICATION SPEC</div>
                <div className="text-sm font-bold text-white font-heading">{category.badge}</div>
                <div className="text-[11px] text-[#15B83E] font-medium flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Mill Test Traceable (MTC 3.1)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagonal Laser Line */}
          <svg 
            className="absolute inset-y-0 left-0 h-full w-[22%] hidden lg:block text-none stroke-[#15B83E] drop-shadow-[0_0_15px_#15B83E]"
            viewBox="0 0 100 700" 
            preserveAspectRatio="none"
            strokeWidth="3.5"
          >
            <line x1="68" y1="0" x2="0" y2="700" />
          </svg>
        </div>

        {/* Top Right Tagline */}
        <div className="absolute top-6 right-8 hidden lg:flex items-center gap-3 z-20">
          <div className="w-[3px] h-10 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
          <div className="text-[10px] xl:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase leading-snug font-mono text-right">
            <div>CERTIFIED</div>
            <div>SPECIFICATIONS</div>
            <div>KINGDOM</div>
            <div className="text-[#15B83E]">WIDE</div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 lg:pt-12 pb-6 my-auto space-y-5">
          
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/trading-services" className="hover:text-white transition-colors">Trading Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#15B83E]" />
            <span className="text-[#15B83E] font-semibold">{category.title}</span>
          </nav>

          <div className="max-w-2xl space-y-4">
            {/* Category Kicker Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#15B83E]/10 border border-[#15B83E]/30 text-xs font-bold uppercase tracking-[0.2em] text-[#15B83E] font-mono shadow-[0_0_15px_rgba(21,184,62,0.15)]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{category.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-heading">
              {category.title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl font-sans">
              {category.fullDesc}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {category.tags.map((tag: any, idx: number) => {
                const tagName = typeof tag === 'object' && tag !== null ? (tag.name || tag.title || '') : String(tag || '');
                if (!tagName) return null;
                return (
                  <span
                    key={idx}
                    className="text-xs font-mono font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-lg"
                  >
                    ✓ {tagName}
                  </span>
                );
              })}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-[0_4px_30px_rgba(21,184,62,0.45)] hover:shadow-[0_6px_40px_rgba(21,184,62,0.65)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <a
                href="tel:+966123456789"
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-slate-700 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#15B83E]" />
                <span>Call Procurement Specialist</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-20 border-t border-slate-800/80 bg-[#040A12]/80 backdrop-blur-md px-6 sm:px-10 py-3.5">
          <div className="w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#15B83E]" />
              <span>100% Certified Quality & Mill Test Traceability</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#15B83E]" />
              <span>Rapid Logistics across Saudi Arabia</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#15B83E]" />
              <span>Saudi Aramco & SABIC Spec Compliant</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Full Width LIGHT Theme Division Overview Section */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="bg-white border border-slate-200/90 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-lg space-y-6 sm:space-y-7 relative overflow-hidden">
          
          {/* Soft Top Right Emerald Glow Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#15B83E]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="relative z-10 space-y-2 border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold uppercase tracking-[0.2em] text-[#15B83E] font-mono shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15B83E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15B83E]"></span>
              </span>
              <span>{category.overviewKicker}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D2137] tracking-tight font-heading">
              {category.overviewTitle} <span className="text-[#15B83E]">{category.title}</span>
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans font-medium">
              {category.overviewSubtitle}
            </p>
          </div>

          {/* Grid Layout: Left Narrative & Light Feature Cards | Right Visual Card */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-start">
              
              <div className="space-y-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                <p>
                  At <strong className="text-[#0D2137] font-bold">SECO LINE</strong>, our industrial trading division specializes in supplying certified, high-grade <strong className="text-[#15B83E] font-bold">{category.title}</strong> tailored precisely to client specifications across major project sites in Saudi Arabia.
                </p>
                <p>
                  {category.overviewDesc2}
                </p>
              </div>

              {/* 3 Light Feature Cards (Proper Horizontal Flex Alignment) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {category.overviewFeatures.map((featItem: any, idx: number) => {
                  const icons = [ShieldCheck, Globe2, Award];
                  const FeatIcon = icons[idx % icons.length];
                  return (
                    <div key={idx} className="group flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#15B83E] hover:bg-emerald-50/30 transition-all duration-300 shadow-xs">
                      <div className="w-9 h-9 rounded-lg bg-[#15B83E] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform mt-0.5">
                        <FeatIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#0D2137] group-hover:text-[#15B83E] transition-colors font-heading leading-tight">
                          {featItem.title}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-snug font-normal">
                          {featItem.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons Row */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={category.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 bg-[#0D2137] hover:bg-[#15B83E] text-white text-xs font-bold px-5 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Trading Profile & Spec Sheet (PDF)</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white text-xs font-bold px-5 py-3 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.35)] transition-all hover:scale-[1.02]"
                >
                  <span>Request Instant Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Right 5 Columns: Single Premium Featured Division Image Card */}
            <div className="lg:col-span-5 flex">
              <div 
                className="relative w-full min-h-[260px] sm:min-h-[300px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group bg-slate-900 bg-cover bg-center flex flex-col justify-between p-6 sm:p-7"
                style={{ backgroundImage: `url('${category.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-[#040A12]/50 to-slate-950/20 pointer-events-none" />
                
                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-[#15B83E] px-3 py-1 rounded-full shadow-md">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>FEATURED MATERIAL DIVISION</span>
                  </span>
                </div>

                {/* Bottom Title & Details */}
                <div className="relative z-10 space-y-2 mt-auto pt-16">
                  <div className="inline-block bg-[#0D2137]/90 px-2.5 py-0.5 rounded-md text-[#15B83E] text-[10px] font-mono font-bold border border-slate-700/80">
                    SECO LINE TRADING
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading drop-shadow-md">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                    {category.shortDesc}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Main Content Grid (Technical Specs & Sticky Quick Quote Sidebar) */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
        
        {/* Left 2-Column Main Content Flow */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* SECTION 3.1: Product / Service Categories Breakdown */}
          <HorizontalScrollContainer
            badgeText={category.categoriesKicker || "PRODUCT / SERVICE CATEGORIES"}
            title={category.categoriesTitle || "Main Supply Classifications"}
            subtitle={category.categoriesSubtitle || `Explore core sub-categories within ${category.title}.`}
          >
            {category.tags.map((tagItem: any, idx: number) => {
              const tagTitle = typeof tagItem === 'object' ? (tagItem.name || tagItem.title || '') : tagItem;
              const tagDesc = typeof tagItem === 'object' && tagItem.desc ? tagItem.desc : 'Certified high-spec material supply for oil & gas, civil, mechanical, and petrochemical projects.';
              const tagImage = typeof tagItem === 'object' && (tagItem.imageUrl || tagItem.image) ? (tagItem.imageUrl || tagItem.image) : category.imageUrl;
              return (
                <div 
                  key={idx}
                  className="group relative min-w-[200px] sm:min-w-[220px] md:min-w-[230px] w-[230px] flex-shrink-0 snap-start h-[290px] rounded-2xl overflow-hidden bg-[#060E1A] text-white p-5 sm:p-6 border border-slate-800/90 hover:border-[#15B83E] hover:shadow-[0_15px_35px_rgba(21,184,62,0.25)] transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Blended Background Image with Opacity */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:opacity-75 transition-all duration-700 ease-out group-hover:scale-110 pointer-events-none"
                    style={{ backgroundImage: `url('${tagImage || category.imageUrl}')` }}
                  />
                  
                  {/* Dark Ambient Gradient Blend Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-[#040A12]/85 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-[#15B83E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#15B83E] bg-[#15B83E]/10 px-2.5 py-0.5 rounded-md border border-[#15B83E]/30 backdrop-blur-md">
                      CATEGORY 0{idx + 1}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#15B83E] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-2 mt-auto">
                    <h3 className="text-base font-extrabold text-white font-heading group-hover:text-[#15B83E] transition-colors leading-snug line-clamp-2">
                      {tagTitle}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-4">
                      {tagDesc}
                    </p>
                  </div>

                  {/* Top Glowing Laser Edge */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#15B83E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                </div>
              );
            })}
          </HorizontalScrollContainer>

          {/* SECTION 3.2: Detailed Products & Capabilities Table */}
          <div className="bg-white border border-slate-200/90 rounded-[2rem] p-7 sm:p-9 shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#15B83E] font-mono">
                <span className="w-4 h-[2px] bg-[#15B83E]" />
                <span>DETAILED PRODUCTS & CAPABILITIES</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0D2137] font-heading">
                Material Specifications & Stock Range
              </h2>
            </div>

            {/* Technical Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-2">
              {category.features.map((feat: any, idx: number) => {
                const featName = typeof feat === 'object' && feat !== null ? (feat.title || feat.name || feat.desc || '') : String(feat || '');
                if (!featName) return null;
                return (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#15B83E]/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#15B83E] flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800 leading-snug">{featName}</span>
                  </div>
                );
              })}
            </div>

            {/* Specifications Table */}
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#050C16] text-white font-mono uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="p-4 sm:p-5 font-bold">Item & Capability</th>
                    <th className="p-4 sm:p-5 font-bold">Grade & Specification</th>
                    <th className="p-4 sm:p-5 font-bold text-right">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {category.itemsSupplied.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[#0D2137] flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#15B83E]" />
                        <span>{item.name}</span>
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-slate-600">{item.spec}</td>
                      <td className="p-4 sm:p-5 text-right font-mono text-[11px]">
                        <span className="inline-flex items-center gap-1 text-[#15B83E] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                          <Check className="w-3 h-3" />
                          <span>AVAILABLE</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3.3: Industries We Support */}
          <div className="bg-white border border-slate-200/90 rounded-[2rem] p-7 sm:p-9 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#15B83E] font-mono">
                <span className="w-4 h-[2px] bg-[#15B83E]" />
                <span>SECTOR EXCELLENCE</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0D2137] font-heading">
                Industries We Support
              </h2>
              <p className="text-slate-500 text-xs">Powering core industrial and infrastructure sectors across Saudi Arabia.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {industries.map((ind, idx) => {
                const IndIcon = ind.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#15B83E]/50 hover:bg-emerald-50/20 transition-all duration-300 space-y-2.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white transition-all flex items-center justify-center shadow-md">
                      <IndIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {ind.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3.4: Why SECO LINE (6 Pillars) */}
          <div className="bg-[#050C16] text-white rounded-[2rem] p-7 sm:p-9 border border-slate-800 shadow-xl space-y-8">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#15B83E] font-mono">
                <span className="w-4 h-[2px] bg-[#15B83E]" />
                <span>THE SECO TRADING ADVANTAGE</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-heading">
                Why SECO LINE is the Preferred Industrial Supplier
              </h2>
              <p className="text-slate-400 text-xs">Key operational pillars driving trust, speed, and reliability.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whySecoPillars.map((pillar, idx) => {
                const PIlIcon = pillar.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-[#15B83E]/40 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#15B83E]/10 border border-[#15B83E]/30 flex items-center justify-center text-[#15B83E]">
                      <PIlIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white font-heading">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3.6: Automatically Display Related SECO LINE Services */}
          <HorizontalScrollContainer
            badgeText="EXPLORE DIVISIONS"
            title="Related SECO LINE Trading Divisions"
            subtitle="Explore our other specialized industrial material supply categories."
          >
            {relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                href={`/trading-services/${rel.slug}`}
                className="group relative min-w-[200px] sm:min-w-[220px] md:min-w-[230px] w-[230px] flex-shrink-0 snap-start h-[290px] rounded-2xl overflow-hidden bg-[#060E1A] text-white p-5 sm:p-6 border border-slate-800/90 hover:border-[#15B83E] hover:shadow-[0_15px_35px_rgba(21,184,62,0.25)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Blended Background Image with Opacity */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-60 transition-all duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  style={{ backgroundImage: `url('${rel.imageUrl}')` }}
                />
                
                {/* Dark Ambient Gradient Blend Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-[#040A12]/85 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[#15B83E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Badge & Arrow Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#15B83E] bg-[#15B83E]/10 px-2.5 py-0.5 rounded-md border border-[#15B83E]/30 backdrop-blur-md">
                    {rel.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/80 group-hover:border-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-slate-950 text-slate-300 transition-all duration-300 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 space-y-2 mt-auto">
                  <h3 className="text-base font-extrabold text-white font-heading group-hover:text-[#15B83E] transition-colors leading-snug line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-4">
                    {rel.shortDesc}
                  </p>
                </div>

                {/* Top Glowing Laser Edge */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#15B83E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
              </Link>
            ))}
          </HorizontalScrollContainer>

          {/* SECTION 3.7: Service Enquiry CTA ("Discuss Your Requirements") */}
          <div className="rounded-[2.5rem] bg-gradient-to-r from-[#070E18] via-[#0D1F35] to-[#070E18] p-8 sm:p-10 border border-slate-800 shadow-2xl text-white space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#15B83E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DISCUSS YOUR REQUIREMENTS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Ready to Discuss Your Material Specifications?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Our technical procurement specialists are ready to review your BOQ, verify Aramco/ASTM compliance, and issue immediate competitive proposals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_4px_30px_rgba(21,184,62,0.45)] transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Discuss Requirements Now</span>
              </Link>

              <a
                href="mailto:info@secoline.com.sa"
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-4 rounded-full border border-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#15B83E]" />
                <span>info@secoline.com.sa</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Sidebar: STICKY Instant Material RFQ Form & Standards */}
        <div className="space-y-6 lg:sticky lg:top-24 z-30 self-start">
          
          {/* Instant Material RFQ Card (Sticky Pinned) */}
          <div className="bg-white border border-slate-200/90 rounded-[2rem] p-7 shadow-xl space-y-5">
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#15B83E]">
                FAST MATERIAL QUOTE
              </div>
              <h3 className="text-xl font-extrabold text-[#0D2137] font-heading">
                Request Quick Quote
              </h3>
              <p className="text-slate-500 text-xs">
                Inquire directly for <span className="font-semibold text-slate-800">{category.title}</span> pricing.
              </p>
            </div>

            <form action="/contact" method="GET" className="space-y-3.5">
              <input 
                type="hidden" 
                name="service" 
                value={category.title} 
              />
              
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 font-mono mb-1">
                  Full Name / Company
                </label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="e.g. Saudi Construction Co." 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#15B83E] focus:ring-1 focus:ring-[#15B83E]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 font-mono mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="procurement@company.com" 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#15B83E] focus:ring-1 focus:ring-[#15B83E]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 font-mono mb-1">
                  Phone / WhatsApp
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+966 5X XXX XXXX" 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#15B83E] focus:ring-1 focus:ring-[#15B83E]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 font-mono mb-1">
                  Required Quantities & Specs
                </label>
                <textarea 
                  name="details"
                  rows={3}
                  placeholder={`Mention required sizes, grades, or bill of quantities for ${category.title}...`} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#15B83E] focus:ring-1 focus:ring-[#15B83E]"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit RFQ Request</span>
              </button>
            </form>
          </div>

        </div>

      </section>

    </div>
  );
}
