'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Truck, 
  PackageCheck, 
  ArrowRight, 
  PhoneCall, 
  Building2, 
  Layers, 
  CheckCircle2, 
  Zap
} from 'lucide-react';

interface TradingHeroProps {
  kicker?: string;
  titleLine1?: string;
  titleGreen?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  bgImageUrl?: string;
  badge1Value?: string;
  badge1Label?: string;
  badge2Value?: string;
  badge2Label?: string;
  badge3Value?: string;
  badge3Label?: string;
}

export default function TradingHero({
  kicker = 'INDUSTRIAL TRADING DIVISION',
  titleLine1 = 'Certified Industrial Supply &',
  titleGreen = 'Material Trading Solutions',
  subtitle = 'SECO LINE provides high-spec industrial materials, certified safety PPE, structural steel, piping systems, and heavy machinery — empowering mega infrastructure, energy, and commercial projects across Saudi Arabia.',
  ctaText = 'Request Material Quote',
  ctaLink = '/contact',
  secondaryCtaText = 'Speak with Procurement',
  secondaryCtaLink = '/contact',
  bgImageUrl = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
  badge1Value = '10,000+',
  badge1Label = 'Certified Sourced Items',
  badge2Value = '24/7',
  badge2Label = 'Rapid On-Site Supply',
  badge3Value = '100%',
  badge3Label = 'Kingdom-Wide Coverage',
}: TradingHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);

    const node = sectionRef.current;
    if (!node) return () => clearTimeout(timer);

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
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const isVisible = mounted || inView;

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex flex-col justify-between overflow-hidden bg-[#040A12] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 mb-0 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-800/90 font-sans select-none"
    >
      {/* Ambient Radial Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-[#15B83E]/15 rounded-full blur-[130px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#0284C7]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#15B83E]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Modern High-Tech Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#15B83E_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      {/* 1. Dynamic Diagonal Cutout Hero Image Layer (Right Half) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none overflow-hidden">
        
        {/* Angled Masking Container */}
        <div className="absolute inset-0 lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0%_100%)] bg-[#071322]">
          
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
            style={{
              backgroundImage: `url('${bgImageUrl}')`,
              backgroundPosition: 'center 40%',
            }}
          >
            {/* Dark Gradient Overlay Fades */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/80 to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040A12]/90 via-transparent to-transparent hidden lg:block" />
          </div>

          {/* Floating High-Tech Material Card overlay */}
          <div className="absolute bottom-10 right-10 hidden xl:flex items-center gap-4 bg-[#070E18]/85 backdrop-blur-xl border border-slate-700/80 p-4 rounded-2xl shadow-2xl z-20">
            <div className="w-12 h-12 rounded-xl bg-[#15B83E]/20 border border-[#15B83E]/50 flex items-center justify-center text-[#15B83E]">
              <PackageCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">SUPPLY GUARANTEE</div>
              <div className="text-sm font-bold text-white font-heading">ISO & Aramco Compliant</div>
              <div className="text-[11px] text-[#15B83E] font-medium flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                <span>Fast Logistics & Bulk Rates</span>
              </div>
            </div>
          </div>

        </div>

        {/* Diagonal Glowing Green Laser Line Separator */}
        <svg 
          className="absolute inset-y-0 left-0 h-full w-[22%] hidden lg:block text-none stroke-[#15B83E] drop-shadow-[0_0_15px_#15B83E]"
          viewBox="0 0 100 700" 
          preserveAspectRatio="none"
          strokeWidth="3.5"
        >
          <line x1="68" y1="0" x2="0" y2="700" />
        </svg>
      </div>

      {/* 2. Top Right Vertical Tagline */}
      <div className={`absolute top-6 right-8 hidden lg:flex items-center gap-3 z-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="w-[3px] h-10 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-[10px] xl:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase leading-snug font-mono text-right">
          <div>CERTIFIED</div>
          <div>MATERIALS</div>
          <div>RAPID</div>
          <div className="text-[#15B83E]">LOGISTICS</div>
        </div>
      </div>

      {/* 3. Middle Floating Kingdom Badge */}
      <div className={`absolute top-24 right-[30%] hidden xl:flex items-center gap-3 z-20 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      }`}>
        <div className="w-[3px] h-9 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-xs font-bold tracking-[0.2em] text-slate-200 uppercase font-mono bg-[#070E18]/85 backdrop-blur-md px-3.5 py-1.5 rounded-r-xl border-y border-r border-slate-700/50 shadow-lg text-right">
          <span className="text-slate-400 text-[10px] block">NATIONWIDE TRADING</span>
          <span className="block text-white">SERVING ALL SAUDI REGIONS</span>
        </div>
      </div>

      {/* 4. Main Hero Content */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 lg:pt-12 pb-6 my-auto">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          
          {/* Top Pill Kicker */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#15B83E]/10 border border-[#15B83E]/30 text-xs font-bold uppercase tracking-[0.2em] text-[#15B83E] font-mono shadow-[0_0_15px_rgba(21,184,62,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15B83E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15B83E]"></span>
              </span>
              <span>{kicker}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.08] font-heading transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {titleLine1}{' '}
            <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">
              {titleGreen}
            </span>
          </h1>

          {/* Paragraph Description */}
          <p className={`text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl font-sans transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {subtitle}
          </p>

          {/* Key Feature Badges Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl pt-1 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            
            {/* Feature 1 */}
            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#15B83E]/50 transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-inner">
                <ShieldCheck className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-[#15B83E] transition-colors leading-snug">
                Certified Quality
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#15B83E]/50 transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-inner">
                <Truck className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-[#15B83E] transition-colors leading-snug">
                Rapid Logistics
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#15B83E]/50 transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-inner">
                <Zap className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-[#15B83E] transition-colors leading-snug">
                Bulk Pricing
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className={`flex flex-wrap items-center gap-4 sm:gap-5 pt-2 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <Link
              href={ctaLink}
              className="group relative inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-[0_4px_30px_rgba(21,184,62,0.45)] hover:shadow-[0_6px_40px_rgba(21,184,62,0.65)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            <Link
              href={secondaryCtaLink}
              className="group inline-flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 transition-all duration-300"
            >
              <PhoneCall className="w-4 h-4 text-[#15B83E]" />
              <span>{secondaryCtaText}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 5. Bottom Stats & Saudi Vision 2030 Badge Bar */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pb-6 pt-2 border-t border-slate-800/60 bg-[#040A12]/60 backdrop-blur-md">
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Stat Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Stat 1 */}
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <Layers className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {badge1Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{badge1Value}</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <Truck className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {badge2Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{badge2Value}</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <Building2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#15B83E] group-hover:text-white transition-colors">
                  {badge3Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{badge3Value}</div>
              </div>
            </div>

          </div>

          {/* Right Corner Vision 2030 Emblem */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <div className="bg-[#070E18]/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-4 shadow-xl hover:border-[#15B83E]/40 transition-all duration-300">
              <div className="flex flex-col items-center justify-center border-r border-slate-700/80 pr-4">
                <div className="text-[9px] tracking-widest font-mono text-slate-400 uppercase">VISION</div>
                <div className="text-xl sm:text-2xl font-black tracking-tighter text-white font-heading">
                  20<span className="text-[#15B83E]">30</span>
                </div>
                <div className="text-[7px] tracking-tight text-slate-400 uppercase">KINGDOM OF SAUDI ARABIA</div>
              </div>

              <div className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase leading-snug">
                <div>PREMIUM</div>
                <div>TRADING</div>
                <div className="text-[#15B83E]">SOLUTIONS</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
