'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Building2, HardHat, ChevronRight } from 'lucide-react';

interface ServiceDetailHeroProps {
  title: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  phoneDisplay?: string;
  kicker?: string;
  heroSubtitleText?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  heroTaglineText?: string;
}

export default function ServiceDetailHero({
  title,
  excerpt,
  imageUrl,
  kicker = 'OUR SERVICE ☰',
  heroSubtitleText = 'Strong Foundations. A Sustainable Tomorrow.',
  stat1Value = '20+',
  stat1Label = 'Years of Experience',
  stat2Value = '200+',
  stat2Label = 'Projects Delivered',
  stat3Value = '100%',
  stat3Label = 'Commitment to Safety',
  heroTaglineText = 'BUILDING A STRONGER TOMORROW',
}: ServiceDetailHeroProps) {
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

  // Split title dynamically into main white text and green highlighted ending
  const titleParts = title.trim().split(' ');
  let line1 = title;
  let line2Green = '';

  if (titleParts.length > 2) {
    const midIndex = Math.ceil(titleParts.length / 2);
    line1 = titleParts.slice(0, midIndex).join(' ');
    line2Green = titleParts.slice(midIndex).join(' ');
  } else if (titleParts.length === 2) {
    line1 = titleParts[0];
    line2Green = titleParts[1];
  }

  const bgImage = imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80';

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between overflow-hidden bg-[#050C16] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 mb-10 shadow-2xl border border-slate-800/80 font-sans select-none"
    >
      
      {/* 1. Full Hero Background Image Layer with Dark Ambient Gradient Fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/90 to-[#040A12]/40" />
      </div>

      {/* Ambient Radial Green/Blue Orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#15B83E]/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#084BA4]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#15B83E]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 2. Right Side Industrial Construction Sunset Image Polygon Layer */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] pointer-events-none overflow-hidden">
        
        {/* Angled Cut-Out Polygon Container */}
        <div className="absolute inset-0 lg:[clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] bg-[#071322]">
          
          {/* Construction Site Sunset Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundPosition: 'center 35%',
            }}
          >
            {/* Mobile Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-slate-950/20" />
          </div>

        </div>

        {/* Diagonal Glowing Green Laser Edge Line */}
        <svg 
          className="absolute inset-y-0 left-0 h-full w-[26%] hidden lg:block text-none stroke-[#15B83E] drop-shadow-[0_0_15px_#15B83E]"
          viewBox="0 0 100 700" 
          preserveAspectRatio="none"
          strokeWidth="3"
        >
          <line x1="80" y1="0" x2="0" y2="700" />
        </svg>

      </div>

      {/* 3. Top Breadcrumb Bar & Vertical Tagline */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-10 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-4">
        
        {/* Breadcrumb Navigation */}
        <nav className={`flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <Link href="/" className="text-slate-300 hover:text-[#15B83E] transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <Link href="/contracting-services" className="text-slate-300 hover:text-[#15B83E] transition">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[#15B83E] font-bold truncate max-w-[220px] sm:max-w-none">{title}</span>
        </nav>

        {/* Top Right Vertical Tagline Box */}
        <div className={`hidden lg:flex items-center gap-3 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="w-[2.5px] h-9 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
          <div className="text-[10px] font-bold tracking-[0.22em] text-slate-300 uppercase leading-snug font-mono text-right">
            <div>EXCELLENCE</div>
            <div>PRECISION</div>
            <div className="text-[#15B83E]">SAFETY FIRST</div>
          </div>
        </div>

      </div>

      {/* 4. Main Hero Content Area */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-8 my-auto">
        <div className="max-w-2xl space-y-3.5 sm:space-y-4">
          
          {/* Top Green Accent Kicker */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
              <span>{kicker}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12] font-heading transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {line1}{' '}
            {line2Green && (
              <span className="text-[#15B83E] drop-shadow-[0_0_20px_rgba(21,184,62,0.45)] inline-block font-semibold">
                {line2Green}
              </span>
            )}
          </h1>

          {/* Subtitle & Paragraph Description */}
          <div className={`space-y-1.5 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide font-heading">
              {heroSubtitleText}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl font-sans">
              {excerpt || 'We deliver integrated civil construction solutions that power industries, connect communities, and create lasting value across Saudi Arabia.'}
            </p>
          </div>

          {/* Action CTAs Row */}
          <div className={`flex flex-wrap items-center gap-3.5 pt-2 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            
            {/* Primary Green Glowing Pill CTA Button */}
            <Link
              href="/contact#contact-form-section"
              className="group relative inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.45)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.65)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer font-heading uppercase tracking-wider"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Dark Charcoal Pill CTA Button */}
            <Link
              href="/contracting-services"
              className="group inline-flex items-center gap-2 bg-[#1C2433] hover:bg-[#253043] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-700/80 hover:border-[#15B83E]/60 transition-all duration-300 hover:scale-[1.02] active:scale-95 font-heading uppercase tracking-wider shadow-md"
            >
              <span>Explore Our Services</span>
            </Link>

          </div>

        </div>
      </div>

      {/* 5. Bottom Floating Glassmorphic Stats Bar */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-10 pb-5 pt-3.5 border-t border-slate-800/80 bg-[#060D18]/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center text-xs font-sans">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
              <HardHat className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold font-heading text-white group-hover:text-[#15B83E] transition-colors">{stat1Value}</div>
              <div className="text-[11px] text-slate-400 font-normal">{stat1Label}</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold font-heading text-white group-hover:text-[#15B83E] transition-colors">{stat2Value}</div>
              <div className="text-[11px] text-slate-400 font-normal">{stat2Label}</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[#15B83E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#15B83E] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold font-heading text-white group-hover:text-[#15B83E] transition-colors">{stat3Value}</div>
              <div className="text-[11px] text-slate-400 font-normal">{stat3Label}</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="hidden lg:flex items-center gap-3 border-l border-slate-800 pl-6">
            <div className="w-1.5 h-8 bg-[#15B83E] rounded-full shadow-[0_0_8px_#15B83E]" />
            <div className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-slate-300 leading-snug">
              {heroTaglineText.split(' ').map((word, i) => (
                <div key={i} className={i === heroTaglineText.split(' ').length - 1 ? 'text-[#15B83E]' : ''}>
                  {word}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
