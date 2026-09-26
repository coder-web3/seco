import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  PhoneCall, 
  Clock, 
  FileCheck, 
  Award,
  Globe2
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import TradingHero from '@/components/public/TradingHero';
import TradingCard from '@/components/public/TradingCard';
import { TRADING_SERVICES_DATA } from '@/data/tradingServicesData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trading Services - SECO LINE',
  description: 'Industrial supply, high-pressure valves, piping, materials, tools, safety equipment, electrical fittings, and heavy machinery trading solutions across Saudi Arabia.',
};

export default async function TradingServicesPage() {
  const [dbServices, heroData] = await Promise.all([
    prisma.tradingService.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    }).catch(() => []),
    prisma.tradingServicesHeroSetting.findFirst().catch(() => null),
  ]);

  // Combine DB data with fallback to static dataset if DB is empty
  const displayServices = dbServices.length > 0 ? dbServices.map(s => {
    let tagsArr: string[] = [];
    try {
      tagsArr = typeof s.tags === 'string' ? JSON.parse(s.tags) : s.tags || [];
    } catch {
      tagsArr = s.tags ? [s.tags] : [];
    }
    return {
      slug: s.slug,
      title: s.title,
      shortDesc: s.shortDesc || '',
      badge: s.badge || 'Division',
      imageUrl: s.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      tags: Array.isArray(tagsArr) ? tagsArr : [],
      iconName: s.iconName || 'Layers',
    };
  }) : TRADING_SERVICES_DATA;

  const valueProps = [
    {
      title: 'Aramco & Sabic Compliant',
      desc: 'All materials supplied strictly comply with Kingdom standards and international certifications.',
      icon: Award,
    },
    {
      title: 'Nationwide Saudi Logistics',
      desc: 'Direct transport & rapid dispatch across Jubail, Dammam, Riyadh, Jeddah, Yanbu, and NEOM.',
      icon: Globe2,
    },
    {
      title: '24/7 Priority Material Quotation',
      desc: 'Dedicated technical procurement specialists ready to process urgent RFQs within hours.',
      icon: Clock,
    },
    {
      title: 'Full Material Test Certificates (MTC)',
      desc: 'Complete traceability and quality documentation provided with every single shipment.',
      icon: FileCheck,
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 select-none font-sans bg-slate-50/50">
      
      {/* 1. Ultra-Premium Full Width Hero Section */}
      <TradingHero
        kicker={heroData?.badgeText || undefined}
        titleLine1={heroData?.titleLine1 || undefined}
        titleGreen={heroData?.titleGreen || undefined}
        subtitle={heroData?.subtitle || undefined}
        badge1Value={heroData?.stat1Value || undefined}
        badge1Label={heroData?.stat1Label || undefined}
        badge2Value={heroData?.stat2Value || undefined}
        badge2Label={heroData?.stat2Label || undefined}
        badge3Value={heroData?.stat3Value || undefined}
        badge3Label={heroData?.stat3Label || undefined}
        bgImageUrl={heroData?.bgImageUrl || undefined}
      />

      {/* 2. Compact & Unique Material Supply Cards Grid */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10 pt-2">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-6 h-[2px] bg-[#15B83E]" />
              <span>PRODUCTS & MATERIAL SUPPLY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
              Core{' '}
              <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-bold">
                Trading Divisions
              </span>{' '}
              & Capabilities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium font-sans">
              Click on any trading division below to view technical specifications, available grades, and direct quote requests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold bg-slate-900 hover:bg-[#15B83E] text-white px-5 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Submit General RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Compact Cards Grid with Entrance & Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayServices.map((cat, idx) => (
            <TradingCard
              key={cat.slug}
              slug={cat.slug}
              title={cat.title}
              shortDesc={cat.shortDesc}
              badge={cat.badge}
              imageUrl={cat.imageUrl}
              tags={cat.tags}
              iconName={cat.iconName}
              index={idx}
            />
          ))}
        </div>

      </section>

      {/* 3. Why Choose SECO Line Trading (Value Proposition Section) */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-4">
        <div className="bg-[#050C16] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#15B83E]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-10">
            
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#15B83E] font-mono">
                <span className="w-5 h-[2px] bg-[#15B83E]" />
                <span>THE SECO TRADING ADVANTAGE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                Why Contractors Trust <span className="text-[#15B83E]">SECO LINE</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We combine technical expertise, certified quality assurance, and rapid Saudi Arabia supply chain logistics to keep your operations moving forward without delay.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueProps.map((vp, idx) => {
                const VpIcon = vp.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-[#15B83E]/50 transition-all duration-300 space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#15B83E]/10 border border-[#15B83E]/30 flex items-center justify-center text-[#15B83E]">
                      <VpIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading">{vp.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{vp.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Banner */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-2">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-[#070E18] via-[#0D1F35] to-[#070E18] p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#15B83E] font-mono">
              <span>NEED CUSTOM MATERIAL SPECIFICATIONS?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Talk to Our Technical Procurement Division
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Fast sourcing, competitive wholesale material pricing, and guaranteed delivery schedules to all industrial cities and job sites across Saudi Arabia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 whitespace-nowrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_4px_30px_rgba(21,184,62,0.45)] transition-all duration-300 hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Trading Division</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
