'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, ShieldCheck, Cog, Leaf, X } from 'lucide-react';

interface AboutHeroProps {
  kicker?: string;
  titleLine1?: string;
  titleGreen?: string;
  subtitle?: string;
  storyLink?: string;
  videoUrl?: string;
  bgImageUrl?: string;
  badge1Value?: string;
  badge1Label?: string;
  badge2Value?: string;
  badge2Label?: string;
  badge3Value?: string;
  badge3Label?: string;
}

export default function AboutHero({
  kicker = 'ABOUT SECO LINE',
  titleLine1 = 'ENGINEERING & INDUSTRIAL',
  titleGreen = 'SERVICES',
  subtitle = 'SECO LINE is a leading multi-disciplinary contractor providing civil execution, scaffolding, equipment rental, manpower supply, and industrial trading solutions across Saudi Arabia.',
  storyLink = '#our-story',
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  bgImageUrl = 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
  badge1Value = '15+',
  badge1Label = 'Safety First',
  badge2Value = '500+',
  badge2Label = 'Quality in Everything',
  badge3Value = '100%',
  badge3Label = 'Sustainable Growth',
}: AboutHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[72vh] flex flex-col justify-between overflow-hidden w-full max-w-full bg-[#050C16] text-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] mx-2 sm:mx-6 mt-2 mb-0 shadow-2xl border border-slate-800/80 font-sans select-none">
      
      {/* 1. Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${bgImageUrl}')`,
          backgroundPosition: 'right 30% center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/90 to-transparent lg:hidden" />
      </div>

      {/* 2. Curved Organic Glass Cutout Overlay (Desktop Layout) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        <svg 
          className="absolute left-0 top-0 h-full w-[65%] text-[#040A12] drop-shadow-[15px_0_35px_rgba(0,0,0,0.7)]"
          viewBox="0 0 700 700" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 L520,0 C590,120 440,240 540,380 C630,500 500,620 480,700 L0,700 Z" />
        </svg>

        <svg 
          className="absolute left-0 top-0 h-full w-[65%] text-none stroke-[#15B83E]/30"
          viewBox="0 0 700 700" 
          preserveAspectRatio="none"
          strokeWidth="3"
          fill="none"
        >
          <path d="M520,0 C590,120 440,240 540,380 C630,500 500,620 480,700" />
        </svg>
      </div>

      {/* 3. Top Right Vertical Tagline */}
      <div className={`absolute top-8 right-8 hidden lg:flex items-center gap-3 z-20 transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="w-[3px] h-12 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-[10px] xl:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase leading-snug font-mono">
          <div>PEOPLE</div>
          <div>SOLUTIONS</div>
          <div>PROGRESS</div>
          <div className="text-white">TOGETHER</div>
        </div>
      </div>

      {/* 4. Middle Glass Banner Tagline */}
      <div className={`absolute top-28 right-[32%] hidden xl:flex items-center gap-3 z-20 transition-all duration-1000 delay-300 ${
        mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      }`}>
        <div className="w-[3px] h-10 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
        <div className="text-xs font-bold tracking-[0.22em] text-slate-200 uppercase font-mono bg-[#070E18]/80 backdrop-blur-md px-3 py-1.5 rounded-r-lg border-y border-r border-slate-700/40">
          A STRONGER
          <span className="block text-white">SAUDI ARABIA</span>
          <span className="block text-[#15B83E]">TOGETHER</span>
        </div>
      </div>

      {/* 5. Main Content Area */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-10 pt-10 lg:pt-14 pb-6 my-auto">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          
          <div className={`transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E]" />
              <span>{kicker}</span>
            </div>
          </div>

          <h1 className={`text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.12] font-heading transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {titleLine1}{' '}
            <span className="text-[#15B83E] drop-shadow-[0_0_25px_rgba(21,184,62,0.45)] inline-block font-bold">
              {titleGreen}
            </span>
          </h1>

          <p className={`text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl font-sans transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {subtitle}
          </p>

          <div className={`flex flex-wrap items-center gap-5 pt-2 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            
            <a
              href={storyLink}
              className="group relative inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.4)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            <button
              onClick={() => setVideoOpen(true)}
              className="group flex items-center gap-3.5 text-left cursor-pointer focus:outline-none"
            >
              <div className="w-11 h-11 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(21,184,62,0.5)]">
                <Play className="w-4 h-4 fill-current ml-0.5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-white text-sm font-bold group-hover:text-[#15B83E] transition-colors">
                  Watch Company Video
                </div>
                <div className="text-slate-400 text-xs font-semibold">2 Min Video</div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* 6. Bottom Bar & Badges */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-10 pb-6 pt-2">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {badge1Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{badge1Value}</div>
              </div>
            </div>

            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <Cog className="w-6 h-6 transition-transform duration-700 group-hover:rotate-90" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {badge2Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{badge2Value}</div>
              </div>
            </div>

            <div className="group flex items-center gap-3.5 cursor-default">
              <div className="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] group-hover:border-[#15B83E] group-hover:bg-[#15B83E]/10 group-hover:shadow-[0_0_15px_rgba(21,184,62,0.3)] transition-all duration-300">
                <Leaf className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-[#15B83E] transition-colors">
                  {badge3Label}
                </div>
                <div className="text-xs font-mono text-[#15B83E] font-semibold">{badge3Value}</div>
              </div>
            </div>

          </div>

          <div className={`transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <div className="bg-[#070E18]/85 backdrop-blur-xl border border-slate-700/70 rounded-2xl p-4 sm:p-5 flex items-center gap-5 shadow-2xl hover:border-[#15B83E]/40 transition-all duration-300">
              <div className="flex flex-col items-center justify-center border-r border-slate-700/80 pr-4">
                <div className="text-[10px] tracking-widest font-mono text-slate-300 uppercase">VISION</div>
                <div className="text-2xl sm:text-3xl font-black tracking-tighter text-white font-heading">
                  20<span className="text-[#15B83E]">30</span>
                </div>
                <div className="text-[8px] tracking-tight text-slate-400 uppercase">KINGDOM OF SAUDI ARABIA</div>
              </div>

              <div className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase leading-snug">
                <div>BUILT</div>
                <div>FOR A</div>
                <div className="text-[#15B83E]">BRIGHTER</div>
                <div>TOMORROW</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition focus:outline-none"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={videoUrl}
                title="SECO LINE Company Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
