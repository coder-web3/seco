'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, HardHat, Handshake, Leaf } from 'lucide-react';

interface AboutCtaBannerProps {
  kicker?: string;
  titleLine1?: string;
  titleGreen?: string;
  buttonText?: string;
  buttonLink?: string;
  value1?: string;
  value2?: string;
  value3?: string;
  imageUrl?: string;
  overlayText?: string;
}

export default function AboutCtaBanner({
  kicker = "LET'S BUILD TOGETHER",
  titleLine1 = 'Partner with SECO LINE',
  titleGreen = 'for a Stronger Tomorrow',
  buttonText = 'Get In Touch',
  buttonLink = '/contact',
  value1 = 'Reliable Solutions',
  value2 = 'Long-Term Partnerships',
  value3 = 'Sustainable Growth',
  imageUrl = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
  overlayText = 'BUILDING INDUSTRIES EMPOWERING PEOPLE',
}: AboutCtaBannerProps) {
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

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-6 select-none overflow-hidden">
      <div className={`relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#070E18] shadow-2xl border border-slate-800/80 flex flex-col lg:flex-row items-stretch min-h-[300px] sm:min-h-[360px] transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Left Dark Navy Panel */}
        <div className="lg:w-7/12 relative z-10 p-6 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8 bg-gradient-to-r from-[#050C16] via-[#070E18] to-[#070E18]">
          
          {/* Top Kicker & Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-4 h-[2px] bg-[#15B83E]" />
              <span>{kicker}</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white font-heading tracking-tight leading-[1.12]">
              {titleLine1} <br />
              <span className="text-[#15B83E] font-bold">{titleGreen}</span>
            </h2>
          </div>

          {/* Action Button & Badges Row */}
          <div className="flex flex-wrap items-center gap-8 pt-2">
            
            {/* Primary Green Pill Button */}
            <Link
              href={buttonLink}
              className="group relative inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.4)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            {/* 3 Value Indicators */}
            <div className="flex flex-wrap items-center gap-6 border-l border-slate-700/80 pl-6">
              
              <div className="flex items-center gap-2.5">
                <HardHat className="w-5 h-5 text-[#15B83E]" />
                <span className="text-xs font-semibold text-slate-200 leading-tight">
                  {value1}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Handshake className="w-5 h-5 text-[#15B83E]" />
                <span className="text-xs font-semibold text-slate-200 leading-tight">
                  {value2}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-[#15B83E]" />
                <span className="text-xs font-semibold text-slate-200 leading-tight">
                  {value3}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Industrial Worker & Plant Photo */}
        <div className="lg:w-5/12 relative min-h-[280px] lg:min-h-full bg-slate-900 overflow-hidden">
          {/* Worker Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundPosition: 'center 40%',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#070E18] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#070E18] lg:via-[#070E18]/40 lg:to-transparent" />
          </div>

          {/* Wall Engraving Text Overlay */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-right hidden sm:block pointer-events-none">
            <div className="text-xs lg:text-sm font-mono font-black tracking-[0.25em] text-white/90 uppercase leading-relaxed drop-shadow-lg">
              {overlayText}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
