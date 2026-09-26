'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  HardHat, 
  Cog, 
  Wrench, 
  Layers, 
  Truck, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Sparkles 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  HardHat,
  Cog,
  Wrench,
  Layers,
  Truck,
  Users,
  ShieldCheck,
  Building2,
  Sparkles,
};

interface ServiceItem {
  id?: number;
  title: string;
  excerpt?: string;
  content?: string;
  slug?: string;
  imageUrl?: string | null;
  icon?: any;
  color?: string;
}

interface ContractingCapabilitiesGridProps {
  services?: any[];
}

export default function ContractingCapabilitiesGrid({ services }: ContractingCapabilitiesGridProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const defaultCapabilities: ServiceItem[] = [
    {
      title: 'Civil Execution & Construction',
      excerpt: 'Turnkey industrial civil execution, heavy foundation laying, structural steel erection, earthworks, and infrastructure development.',
      icon: HardHat,
      color: 'green',
    },
    {
      title: 'Mechanical & Industrial Piping',
      excerpt: 'High-pressure piping fabrication, industrial equipment erection, structural steel assembly, and plant maintenance.',
      icon: Cog,
      color: 'navy',
    },
    {
      title: 'Electrical & Instrumentation (MEP)',
      excerpt: 'Industrial power distribution, armored cable laying, control panel setup, transformer stations, and testing.',
      icon: Wrench,
      color: 'green',
    },
    {
      title: 'Scaffolding & Access Solutions',
      excerpt: 'Certified heavy-duty industrial scaffolding design, erection, and dismantling services adhering strictly to Aramco HSE standards.',
      icon: Layers,
      color: 'navy',
    },
    {
      title: 'Equipment Rental & Lifting Services',
      excerpt: 'Modern heavy equipment fleet including mobile cranes, forklifts, generators, air compressors, and access platforms.',
      icon: Truck,
      color: 'green',
    },
    {
      title: 'Manpower Supply & Project Support',
      excerpt: 'Deployment of qualified engineers, supervisors, certified welders, fitters, riggers, and skilled workforce.',
      icon: Users,
      color: 'navy',
    },
    {
      title: 'Quality & HSE Auditing',
      excerpt: 'Safety-conscious planning, site risk audits, environmental compliance, and quality control supervision.',
      icon: ShieldCheck,
      color: 'green',
    },
    {
      title: 'Infrastructure & Site Development',
      excerpt: 'Site preparation, concrete works, drainage networks, roads, asphalt paving, and industrial fencing.',
      icon: Building2,
      color: 'navy',
    },
  ];

  const itemsToRender: ServiceItem[] = services && services.length > 0
    ? services.map((s, idx) => ({
        id: s.id,
        title: s.title,
        excerpt: s.excerpt || s.content || '',
        slug: s.slug,
        imageUrl: s.imageUrl,
        icon: s.iconName ? (ICON_MAP[s.iconName] || ShieldCheck) : defaultCapabilities[idx % defaultCapabilities.length].icon,
        color: idx % 2 === 0 ? 'green' : 'navy',
      }))
    : defaultCapabilities;

  return (
    <section ref={sectionRef} id="services-list" className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 space-y-10 select-none font-sans">
      
      {/* 1. High-Impact Section Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-5 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="text-slate-400 font-mono">02</span>
            <span className="w-5 h-[2px] bg-[#15B83E]" />
            <span>CONTRACTING CAPABILITIES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
            World-Class Contracting &{' '}
            <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-bold">
              Industrial Execution.
            </span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
            Delivering safe, high-precision engineering and contracting solutions tailored for Saudi Arabia's industrial, commercial, and infrastructure sectors.
          </p>
        </div>

        {/* Discipline Pill Indicator */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3.5 py-1.5 bg-slate-900 text-white rounded-full text-[11px] font-bold font-mono tracking-wider shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#15B83E] animate-pulse" />
            <span>{itemsToRender.length} CORE DISCIPLINES</span>
          </div>
        </div>
      </div>

      {/* 2. Compact 4-Column Card Grid (4 Cards per Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {itemsToRender.map((item, idx) => {
          const Icon = typeof item.icon === 'function' ? item.icon : (ICON_MAP[item.icon] || ShieldCheck);
          const isGreen = item.color === 'green';
          const cardNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

          return (
            <div
              key={item.id || idx}
              className={`group relative bg-white border border-slate-200/90 rounded-[1.75rem] p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + idx * 80}ms` }}
            >
              {/* Full Card Overlay Link */}
              <Link
                href={item.slug ? `/contracting-services/${item.slug}` : '/contact'}
                className="absolute inset-0 z-20 cursor-pointer"
                aria-label={`View ${item.title} details`}
              />

              {/* Faint Background Watermark Step Number */}
              <div className="absolute top-4 right-6 text-4xl sm:text-5xl font-black font-mono text-slate-200/50 select-none group-hover:text-[#15B83E]/20 transition-colors duration-300">
                {cardNum}
              </div>

              <div className="relative z-10 space-y-3.5 pointer-events-none">
                
                {/* Top Icon Box */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                    isGreen
                      ? 'bg-emerald-50 text-[#15B83E] border border-emerald-200/80 group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(21,184,62,0.35)] group-hover:scale-110'
                      : 'bg-slate-100 text-[#0D2137] border border-slate-200 group-hover:bg-[#0D2137] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(13,33,55,0.35)] group-hover:scale-110'
                  }`}>
                    <Icon className="w-6 h-6 transition-transform duration-300" />
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#15B83E] transition-colors">
                    {cardNum}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0D2137] font-heading leading-snug group-hover:text-[#15B83E] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-xs leading-relaxed font-normal line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Optional Image with Opacity & Blend Effect */}
                {item.imageUrl && (
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mt-2.5 border border-slate-200/80 shadow-inner group-hover:border-[#15B83E]/40 transition-colors">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                )}

              </div>

              {/* Card Footer Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between relative z-10 pointer-events-none">
                <span className="group/btn inline-flex items-center gap-1.5 text-[11px] font-bold text-[#15B83E] group-hover:text-[#129c35] font-heading uppercase tracking-wider transition-colors">
                  <span>Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="text-[10px] font-semibold text-slate-400 font-mono">
                  SECO
                </span>
              </div>

              {/* Bottom Gradient Accent Line on Hover */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#15B83E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          );
        })}
      </div>

    </section>
  );
}
