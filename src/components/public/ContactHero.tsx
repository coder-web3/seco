'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, ShieldCheck, MapPin, Send } from 'lucide-react';

interface ContactHeroProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  subtitle?: string;
  enquiryLink?: string;
  phoneDisplay?: string;
  bgImageUrl?: string;
  overlayImageUrl?: string;
}

export default function ContactHero({
  kicker = 'CONTACT SECO LINE',
  titleLine1 = "Let's Build Something",
  titleLine2Green = 'Stronger Together.',
  subtitle = "Whether you're planning a new project, looking for specialized industrial support, or exploring a long-term partnership, our team is ready to understand your requirements and provide the right solution.",
  enquiryLink = '#contact-form-section',
  phoneDisplay = '+966 11 456 7890',
  bgImageUrl = 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
  overlayImageUrl,
}: ContactHeroProps) {
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
  const heroImage = bgImageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80';

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (enquiryLink.startsWith('#')) {
      e.preventDefault();
      const targetId = enquiryLink.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between overflow-hidden bg-[#050C16] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 mb-10 shadow-2xl border border-slate-800/80 font-sans select-none"
    >
      
      {/* 1. Full Hero Background Image Layer with Ambient Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/85 to-[#040A12]/60" />
      </div>

      {/* Ambient Radial Green/Blue Orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#15B83E]/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#084BA4]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#15B83E]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 2. Right Side Industrial Refinery Plant Background Layer */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none overflow-hidden">
        
        {/* Polygon Mask Container for Angled Cut Out Effect */}
        <div className="absolute inset-0 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0%_100%)] bg-[#071322]">
          
          {/* Refinery Plant Sunset Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
            style={{
              backgroundImage: `url('${heroImage}')`,
              backgroundPosition: 'center 35%',
            }}
          >
            {/* Dark Gradient Overlays for Readability & Cinematic Look */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-slate-950/20" />
          </div>

          {/* Optional Overlay Image Slot */}
          {overlayImageUrl && (
            <div className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center pointer-events-none p-4">
              <img 
                src={overlayImageUrl} 
                alt="SECO LINE Industrial Engineer" 
                className="max-h-[95%] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

        </div>

        {/* Diagonal Glowing Green Laser Line */}
        <svg 
          className="absolute inset-y-0 left-0 h-full w-[25%] hidden lg:block text-none stroke-[#15B83E] drop-shadow-[0_0_12px_#15B83E]"
          viewBox="0 0 100 700" 
          preserveAspectRatio="none"
          strokeWidth="3"
        >
          <line x1="72" y1="0" x2="0" y2="700" />
        </svg>

      </div>

      {/* 3. Top Right Vertical Tagline */}
      <div className={`absolute top-8 right-10 hidden lg:flex items-center gap-3 z-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="w-[3px] h-12 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-[10px] xl:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase leading-snug font-mono text-right">
          <div>BUILDING</div>
          <div>INDUSTRIES</div>
          <div>FOR A BRIGHTER</div>
          <div className="text-white">TOMORROW</div>
        </div>
      </div>

      {/* 4. Middle Right Saudi Arabia Tagline */}
      <div className={`absolute top-32 right-[30%] hidden xl:flex items-center gap-3 z-20 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      }`}>
        <div className="w-[3px] h-9 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-xs font-bold tracking-[0.22em] text-slate-200 uppercase font-mono bg-[#070E18]/85 backdrop-blur-md px-3 py-1 rounded-r-lg border-y border-r border-slate-700/40 text-right">
          A
          <span className="block text-white">STRONGER</span>
          <span className="block text-[#15B83E]">SAUDI ARABIA</span>
        </div>
      </div>

      {/* 5. Main Content Area */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-10 pt-8 sm:pt-12 lg:pt-14 pb-6 my-auto">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Top Green Accent Kicker */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-6 h-[2.5px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
              <span>{kicker}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] font-heading transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {titleLine1}{' '}
            <span className="text-[#15B83E] drop-shadow-[0_0_25px_rgba(21,184,62,0.45)] inline-block font-bold">
              {titleLine2Green}
            </span>
          </h1>

          {/* Paragraph Description */}
          <p className={`text-slate-300 text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-2xl font-sans transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {subtitle}
          </p>

          {/* Action CTAs Row */}
          <div className={`flex flex-wrap items-center gap-4 sm:gap-5 pt-3 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            
            {/* Primary Green CTA Button with Hover Glow Animation */}
            <a
              href={enquiryLink}
              onClick={scrollToForm}
              className="group relative inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.45)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.65)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer font-heading uppercase tracking-wider"
            >
              <span>Send an Enquiry</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            {/* Secondary Glass Outline Call Button with Icon Hover Animation */}
            <a
              href={`tel:${phoneDisplay.replace(/[^0-9+]/g, '')}`}
              className="group inline-flex items-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-slate-700/80 hover:border-[#15B83E]/60 transition-all duration-300 hover:scale-[1.03] active:scale-95 font-heading uppercase tracking-wider backdrop-blur-md"
            >
              <div className="w-6 h-6 rounded-full bg-[#15B83E]/10 flex items-center justify-center text-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300">
                <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span>Call Our Team</span>
            </a>

          </div>

          {/* Bottom Left Tagline Ribbon */}
          <div className={`pt-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-slate-700" />
              <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
                PEOPLE &nbsp;|&nbsp; SOLUTIONS &nbsp;|&nbsp; PROGRESS &nbsp;|&nbsp; TOGETHER
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. Bottom Bar & Location Tag */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-10 pb-6 pt-2 border-t border-slate-800/60 bg-[#040A12]/40 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          
          {/* Bottom Left Location Tag */}
          <div className={`flex items-center gap-2.5 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="w-5 h-[2px] bg-[#15B83E]" />
            <span className="font-bold tracking-widest uppercase text-slate-300">RIYADH, SAUDI ARABIA</span>
          </div>

          {/* Bottom Right Trusted Partner Tagline */}
          <div className={`flex items-center gap-2.5 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="w-5 h-[2px] bg-[#15B83E]" />
            <span className="font-bold tracking-widest uppercase text-slate-300">
              SAUDI ARABIA'S TRUSTED INDUSTRIAL PARTNER
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}
