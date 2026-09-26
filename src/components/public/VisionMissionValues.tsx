'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, Target, Trophy, HardHat, ShieldCheck, Users, TrendingUp, Layers, Cog, Truck, Wrench } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Trophy,
  HardHat,
  ShieldCheck,
  Users,
  TrendingUp,
  Layers,
  Cog,
  Truck,
  Wrench,
  Eye,
  Target,
};

interface ValueItem {
  num?: string;
  title: string;
  desc: string;
  icon?: string;
  color?: string;
}

interface VisionMissionValuesProps {
  kicker?: string;
  titleLine1?: string;
  titleGreen?: string;
  description?: string;
  skylineImageUrl?: string;
  badgeText?: string;
  visionTitle?: string;
  visionDesc?: string;
  missionTitle?: string;
  missionDesc?: string;
  valuesList?: ValueItem[];
}

export default function VisionMissionValues({
  kicker = 'VISION, MISSION & CORE VALUES',
  titleLine1 = 'Guided by Purpose.',
  titleGreen = 'Committed to a Stronger Tomorrow.',
  description = 'At SECO LINE, our vision, mission and core values guide everything we do. They reflect our commitment to delivering safe, high-quality and sustainable industrial solutions, while building long-term partnerships and creating lasting value for Saudi Arabia.',
  skylineImageUrl = 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80',
  badgeText = 'A STRONGER SAUDI ARABIA THROUGH PARTNERSHIP',
  visionTitle = 'Our Vision',
  visionDesc = 'To become a trusted industrial solutions partner recognized for quality, safety, innovation, operational excellence and dependable service.',
  missionTitle = 'Our Mission',
  missionDesc = 'To deliver reliable, professional and efficient industrial solutions through skilled people, technical expertise, modern equipment and responsible execution.',
  valuesList,
}: VisionMissionValuesProps) {
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

  const defaultValues: ValueItem[] = [
    { num: '01', title: 'Quality', desc: 'Maintain contracting, civil execution, materials and customer service excellence.', icon: 'Trophy', color: 'green' },
    { num: '02', title: 'Safety', desc: 'Prioritize health, safety and environmental protection in all operations.', icon: 'HardHat', color: 'navy' },
    { num: '03', title: 'Integrity', desc: 'Operate with honesty, transparency and professionalism.', icon: 'ShieldCheck', color: 'green' },
    { num: '04', title: 'Commitment', desc: 'Focus on timely completion, reliable support and client satisfaction.', icon: 'Users', color: 'navy' },
    { num: '05', title: 'Continuous Improvement', desc: 'Improve services through modern techniques and industry best practices.', icon: 'TrendingUp', color: 'green' },
  ];

  const values = valuesList && valuesList.length > 0 ? valuesList : defaultValues;

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 space-y-12 select-none overflow-hidden">
      
      {/* 1. Header Section & Riyadh Skyline Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Headline Block */}
        <div className={`lg:col-span-6 space-y-4 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="text-slate-400 font-mono">02</span>
            <span className="w-4 h-[2px] bg-[#15B83E]" />
            <span>{kicker}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
            {titleLine1} <br />
            <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">{titleGreen}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            {description}
          </p>
        </div>

        {/* Right Skyline Banner with Hexagonal Vision 2030 Badge */}
        <div className={`lg:col-span-6 relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden min-h-[280px] sm:min-h-[340px] shadow-2xl border border-slate-200/80 bg-slate-900 transition-all duration-1000 delay-200 ${
          inView ? 'opacity-100 translate-x-0' : 'opacity-0 sm:translate-x-8'
        }`}>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('${skylineImageUrl}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/30 to-transparent" />
          </div>

          <div className="absolute top-6 right-8 text-right hidden sm:block">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase leading-snug drop-shadow-md">
              <div>BUILDING</div>
              <div>SUSTAINABLE</div>
              <div>INDUSTRIES</div>
              <div className="text-[#15B83E]">FOR GENERATIONS</div>
            </div>
          </div>

          <div className="absolute left-4 right-4 sm:left-6 sm:right-auto top-1/2 -translate-y-1/2 bg-[#070E18]/90 backdrop-blur-xl border border-slate-700/80 p-5 sm:p-7 rounded-[2rem] text-white shadow-2xl space-y-4 max-w-none sm:max-w-[280px]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-[#15B83E] rounded-full shadow-[0_0_8px_#15B83E]" />
              <div className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase leading-tight">
                {badgeText}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">VISION</div>
                <div className="text-2xl font-black tracking-tight font-heading">
                  20<span className="text-[#15B83E]">30</span>
                </div>
                <div className="text-[7px] text-slate-400 font-mono uppercase">KINGDOM OF SAUDI ARABIA</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Our Vision & Our Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Card 1: Our Vision */}
        <div className={`group relative bg-white border border-slate-200/90 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:border-[#15B83E]/50 transition-all duration-500 overflow-hidden ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="absolute top-6 right-8 text-6xl font-black font-mono text-slate-200/50 select-none group-hover:text-[#15B83E]/20 transition-colors">
            01
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#15B83E] text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0D2137] font-heading">
                {visionTitle}
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {visionDesc}
            </p>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#15B83E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Card 2: Our Mission */}
        <div className={`group relative bg-white border border-slate-200/90 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:border-blue-500/50 transition-all duration-500 overflow-hidden ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="absolute top-6 right-8 text-6xl font-black font-mono text-slate-200/50 select-none group-hover:text-blue-500/20 transition-colors">
            02
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0D2137] text-white flex items-center justify-center shadow-lg shadow-slate-900/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <Target className="w-7 h-7 text-[#0088FF]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0D2137] font-heading">
                {missionTitle}
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {missionDesc}
            </p>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0088FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

      </div>

      {/* 3. Our Core Values */}
      <div className="space-y-6 pt-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-[#0D2137] font-heading">
            <span className="w-6 h-[3px] bg-[#15B83E] rounded-full" />
            <span>Our Core Values</span>
          </div>

          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 font-heading">
            THE VALUES THAT DRIVE US FORWARD
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((v, idx) => {
            const Icon = ICON_MAP[v.icon || ''] || ShieldCheck;
            const isGreen = v.color === 'green';
            return (
              <div
                key={idx}
                className={`group relative bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${
                    isGreen 
                      ? 'bg-[#15B83E] shadow-md shadow-emerald-500/20 group-hover:scale-110 group-hover:shadow-emerald-500/40' 
                      : 'bg-[#0D2137] shadow-md shadow-slate-900/20 group-hover:scale-110 group-hover:bg-[#0088FF]'
                  }`}>
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  <span className="text-lg font-mono font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                    {v.num || `0${idx + 1}`}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                    {v.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>

                <div className={`absolute top-0 inset-x-0 h-1 transition-all duration-300 ${
                  isGreen ? 'bg-[#15B83E]' : 'bg-[#0B1727]'
                } opacity-0 group-hover:opacity-100`} />
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
