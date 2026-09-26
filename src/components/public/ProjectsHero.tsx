'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, HardHat, Handshake, Building2 } from 'lucide-react';

interface ProjectsHeroProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleGreen?: string;
  subtitle?: string;
  badge1Text?: string;
  badge2Text?: string;
  badge3Text?: string;
  exploreLink?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  bgImageUrl?: string;
  overlayImageUrl?: string;
}

export default function ProjectsHero({
  kicker = 'OUR PORTFOLIO',
  titleLine1 = 'Delivered Landmark',
  titleLine2 = 'Industrial & Civil',
  titleGreen = 'Projects',
  subtitle = 'Explore landmark contracting executions, high-pressure piping installations, structural steel fabrication, and material supply delivered for Saudi Aramco, SABIC, SEC, and major EPC partners across',
  badge1Text = 'Safety Excellence',
  badge2Text = 'Aramco Certified',
  badge3Text = 'Kingdom Logistics',
  exploreLink = '#projects-grid',
  stat1Value = '150+',
  stat1Label = 'Projects Delivered',
  stat2Value = '100%',
  stat2Label = 'Aramco & ISO Compliant',
  stat3Value = 'SAR 500M+',
  stat3Label = 'Contracting Volume',
  bgImageUrl = 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
  overlayImageUrl,
}: ProjectsHeroProps) {
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

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between overflow-hidden bg-[#050C16] text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 mb-0 shadow-2xl border border-slate-800/80 font-sans select-none"
    >
      
      {/* 1. Full Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${heroImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/85 to-[#040A12]/60" />
      </div>

      {/* Ambient Radial Green/Teal Light Orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#15B83E]/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#084BA4]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#15B83E]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 2. Right Side Diagonal Cutout Hero Image Section */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none overflow-hidden">
        
        {/* Angled Polygon Mask Container */}
        <div className="absolute inset-0 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0%_100%)] bg-[#071322]">
          
          {/* Refinery Plant Photo Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
            style={{
              backgroundImage: `url('${heroImage}')`,
              backgroundPosition: 'center 35%',
            }}
          >
            {/* Soft Ambient Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-slate-950/20" />
          </div>

          {/* Optional 3D PNG Overlay Slot */}
          {overlayImageUrl && (
            <div className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center pointer-events-none p-4">
              <img 
                src={overlayImageUrl} 
                alt="3D Industrial Artwork" 
                className="max-h-[92%] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

        </div>

        {/* Diagonal Glowing Green Laser Edge Line */}
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
      <div className={`absolute top-6 right-8 hidden lg:flex items-center gap-3 z-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="w-[3px] h-10 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-[10px] xl:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase leading-snug font-mono text-right">
          <div>BUILDING</div>
          <div>INDUSTRIES</div>
          <div>EMPOWERING</div>
          <div className="text-white">PEOPLE</div>
        </div>
      </div>

      {/* 4. Middle Right Saudi Arabia Dot Map Emblem */}
      <div className={`absolute top-24 right-[32%] hidden xl:flex items-center gap-3 z-20 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      }`}>
        <div className="w-[3px] h-9 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-xs font-bold tracking-[0.22em] text-slate-200 uppercase font-mono bg-[#070E18]/85 backdrop-blur-md px-3 py-1 rounded-r-lg border-y border-r border-slate-700/40 text-right">
          PROUDLY
          <span className="block text-white">CONTRIBUTING TO A STRONGER</span>
          <span className="block text-[#15B83E]">SAUDI ARABIA</span>
        </div>
      </div>

      {/* 5. Main Content Area */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-10 pt-7 sm:pt-9 lg:pt-10 pb-4 my-auto">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          
          {/* Top Green Accent Kicker */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E]" />
              <span>{kicker}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.12] font-heading transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {titleLine1}{' '}
            <span className="text-[#15B83E] drop-shadow-[0_0_25px_rgba(21,184,62,0.45)] inline-block font-bold">
              {titleLine2} {titleGreen}
            </span>
          </h1>

          {/* Paragraph Description */}
          <p className={`text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl font-sans transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {subtitle}{' '}
            <span className="text-[#15B83E] font-bold">Saudi Arabia.</span>
          </p>

          {/* 3 Feature Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl pt-1 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            
            {/* Feature 1 */}
            <div className="group flex items-center gap-3 cursor-default p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-[#15B83E]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(21,184,62,0.4)] transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-xs font-bold text-white group-hover:text-[#15B83E] transition-colors leading-tight">
                {badge1Text}
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group flex items-center gap-3 cursor-default p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-[#15B83E]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(21,184,62,0.4)] transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <Award className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-xs font-bold text-white group-hover:text-[#15B83E] transition-colors leading-tight">
                {badge2Text}
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group flex items-center gap-3 cursor-default p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-[#15B83E]/50 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(21,184,62,0.4)] transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                <Building2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="text-xs font-bold text-white group-hover:text-[#15B83E] transition-colors leading-tight">
                {badge3Text}
              </div>
            </div>

          </div>

          {/* Action CTAs Row */}
          <div className={`flex flex-wrap items-center gap-5 pt-1 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <a
              href={exploreLink}
              className="group relative inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.4)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>

        </div>
      </div>

      {/* 6. Bottom Bar & Badges */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-10 pb-5 pt-2">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          
          {/* Bottom Badges Row with Hover Animations */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Stat Badge 1 */}
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <HardHat className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {stat1Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{stat1Value}</div>
              </div>
            </div>

            {/* Stat Badge 2 */}
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <CheckCircle2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {stat2Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{stat2Value}</div>
              </div>
            </div>

            {/* Stat Badge 3 */}
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <Handshake className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {stat3Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{stat3Value}</div>
              </div>
            </div>

          </div>

          {/* Right Corner Trusted Badge */}
          <div className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <div className="bg-[#070E18]/85 backdrop-blur-xl border border-slate-700/70 rounded-2xl p-3.5 sm:p-4 flex items-center gap-4 shadow-2xl hover:border-[#15B83E]/40 transition-all duration-300">
              <div className="flex flex-col items-center justify-center border-r border-slate-700/80 pr-4">
                <div className="text-[10px] tracking-widest font-mono text-slate-300 uppercase">VISION</div>
                <div className="text-xl sm:text-2xl font-black tracking-tighter text-white font-heading">
                  20<span className="text-[#15B83E]">30</span>
                </div>
                <div className="text-[7px] tracking-tight text-slate-400 uppercase">KINGDOM OF SAUDI ARABIA</div>
              </div>

              <div className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase leading-snug">
                <div>TRUSTED</div>
                <div>ACROSS</div>
                <div className="text-[#15B83E]">SAUDI ARABIA</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
