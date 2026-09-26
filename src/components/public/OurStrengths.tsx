'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layers, Cog, Users, Truck, ShieldCheck, Wrench, Trophy, HardHat, Eye, Target } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Layers,
  Cog,
  Users,
  Truck,
  ShieldCheck,
  Wrench,
  Trophy,
  HardHat,
  Eye,
  Target,
};

interface StrengthItem {
  title: string;
  desc: string;
  icon?: string;
  color?: string;
}

interface OurStrengthsProps {
  kicker?: string;
  titleLine1?: string;
  titleGreen?: string;
  description?: string;
  tagline?: string;
  imageUrl?: string;
  badgeText?: string;
  strengthsList?: StrengthItem[];
}

export default function OurStrengths({
  kicker = 'OUR STRENGTHS',
  titleLine1 = 'Our',
  titleGreen = 'Strengths',
  description = 'Our operating model is designed to combine technical services, project resources and industrial supply into practical solutions for client requirements.',
  tagline = 'ENGINEERING TODAY FOR A STRONGER TOMORROW',
  imageUrl = 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
  badgeText = 'PEOPLE | SOLUTIONS | PROGRESS | TOGETHER',
  strengthsList,
}: OurStrengthsProps) {
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
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const defaultStrengths: StrengthItem[] = [
    { title: 'INTEGRATED CAPABILITY', desc: 'Multiple contracting, support and trading services coordinated through one platform.', icon: 'Layers', color: 'green' },
    { title: 'TECHNICAL EXPERTISE', desc: 'Engineering, supervision, skilled trades and industrial project support.', icon: 'Cog', color: 'navy' },
    { title: 'SKILLED WORKFORCE', desc: 'Skilled, semi-skilled and specialized personnel across project disciplines.', icon: 'Users', color: 'green' },
    { title: 'PROJECT SUPPORT', desc: 'Logistics, scaffolding, temporary facilities and material delivery support.', icon: 'Truck', color: 'navy' },
    { title: 'HSE FOCUS', desc: 'Safety-conscious planning and execution aligned with project requirements.', icon: 'ShieldCheck', color: 'green' },
    { title: 'EQUIPMENT CAPABILITY', desc: 'Heavy equipment, access equipment and specialized lifting solutions.', icon: 'Wrench', color: 'navy' },
  ];

  const strengths = strengthsList && strengthsList.length > 0 ? strengthsList : defaultStrengths;

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-10 space-y-10 select-none overflow-hidden">
      
      {/* Top Header Row with Refinery Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Headline Block */}
        <div className={`lg:col-span-6 space-y-3 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="text-slate-400 font-mono">03</span>
            <span className="w-4 h-[2px] bg-[#15B83E]" />
            <span>{kicker}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
            {titleLine1} <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">{titleGreen}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            {description}
          </p>
        </div>

        {/* Middle Vertical Tagline */}
        <div className={`lg:col-span-2 hidden lg:flex flex-col justify-center border-l-2 border-[#15B83E] pl-4 py-2 transition-all duration-700 delay-200 ${
          inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <div className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase leading-relaxed">
            {tagline}
          </div>
        </div>

        {/* Right Refinery Imagery */}
        <div className={`lg:col-span-4 relative rounded-[2rem] overflow-hidden min-h-[220px] shadow-xl bg-slate-900 border border-slate-200/80 transition-all duration-1000 delay-300 ${
          inView ? 'opacity-100 translate-x-0' : 'opacity-0 sm:translate-x-8'
        }`}>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />
          </div>

          {/* Right Bottom Glass Overlay */}
          <div className="absolute right-4 bottom-4 bg-[#070E18]/85 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-700/60 text-right">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-300 uppercase leading-tight">
              {badgeText}
            </div>
          </div>
        </div>

      </div>

      {/* 6 Strength Cards Grid (2x3 Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((item, idx) => {
          const Icon = ICON_MAP[item.icon || ''] || Layers;
          const isGreen = item.color === 'green';
          return (
            <div
              key={idx}
              className={`group relative bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 overflow-hidden ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
            >
              {/* Icon Box */}
              <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                isGreen 
                  ? 'bg-emerald-50 text-[#15B83E] border border-emerald-200/80 group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30' 
                  : 'bg-slate-100 text-[#0D2137] border border-slate-200 group-hover:bg-[#0D2137] group-hover:text-white group-hover:shadow-lg group-hover:shadow-slate-900/30'
              }`}>
                <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Text Area */}
              <div className="space-y-1.5">
                <h3 className="text-sm sm:text-base font-semibold text-[#0D2137] font-heading uppercase tracking-wide group-hover:text-[#15B83E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Hover Left Accent Line */}
              <div className={`absolute left-0 inset-y-0 w-1 transition-all duration-300 ${
                isGreen ? 'bg-[#15B83E]' : 'bg-[#0B1727]'
              } opacity-0 group-hover:opacity-100`} />
            </div>
          );
        })}
      </div>

    </section>
  );
}
