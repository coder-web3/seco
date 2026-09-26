'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, ShieldCheck, Clock, Globe } from 'lucide-react';

interface ServiceDetailCtaProps {
  serviceTitle: string;
  kicker?: string;
  title1?: string;
  title2Green?: string;
  description?: string;
  buttonText?: string;
  phone?: string;
  badge1?: string;
  badge2?: string;
  badge3?: string;
}

export default function ServiceDetailCta({
  serviceTitle,
  kicker = 'START A CONVERSATION',
  title1 = 'Ready to Execute',
  title2Green = 'Your Next Project?',
  description = 'Connect with SECO LINE\'s engineering team today to review scope, specifications, equipment allocation, and scheduling across Saudi Arabia.',
  buttonText = 'Get a Free Proposal',
  phone = '+966 12 345 6789',
  badge1 = 'Rapid 24h Response',
  badge2 = 'ISO & Aramco Standards',
  badge3 = 'Nationwide Saudi Execution',
}: ServiceDetailCtaProps) {
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

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-10 select-none font-sans">
      <div className={`relative overflow-hidden bg-[#050C16] text-white rounded-[2.5rem] lg:rounded-[3rem] p-7 sm:p-10 lg:p-12 shadow-2xl border border-slate-800/90 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* 1. Background Construction Image Layer with Overlay Gradients */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/90 to-[#040A12]/60" />
        </div>

        {/* Ambient Radial Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#15B83E]/18 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#084BA4]/18 rounded-full blur-[100px] pointer-events-none" />

        {/* Diagonal Glowing Green Laser Accent */}
        <svg 
          className="absolute inset-y-0 right-1/3 h-full w-[20%] hidden lg:block text-none stroke-[#15B83E]/60 drop-shadow-[0_0_12px_#15B83E] pointer-events-none"
          viewBox="0 0 100 700" 
          preserveAspectRatio="none"
          strokeWidth="2.5"
        >
          <line x1="80" y1="0" x2="0" y2="700" />
        </svg>

        {/* 2. Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Trust Highlights (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
              <span>{kicker}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading tracking-tight leading-[1.15] text-white">
              {title1}{' '}
              <span className="text-[#15B83E] drop-shadow-[0_0_20px_rgba(21,184,62,0.45)] inline-block font-semibold">
                {serviceTitle}
              </span>{' '}
              {title2Green}
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Trust Highlights Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-[10px] sm:text-xs text-slate-300">
              {badge1 && (
                <div className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/80">
                  <Clock className="w-3.5 h-3.5 text-[#15B83E]" />
                  <span>{badge1}</span>
                </div>
              )}
              {badge2 && (
                <div className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15B83E]" />
                  <span>{badge2}</span>
                </div>
              )}
              {badge3 && (
                <div className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/80">
                  <Globe className="w-3.5 h-3.5 text-[#15B83E]" />
                  <span>{badge3}</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: High-Impact Action Buttons (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3.5">
            
            {/* Primary Green Glowing Button */}
            <Link
              href="/contact#contact-form-section"
              className="group relative inline-flex items-center justify-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.45)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.65)] transition-all duration-300 hover:scale-[1.02] active:scale-95 font-heading uppercase tracking-wider text-center cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Glass Call Button */}
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="group inline-flex items-center justify-center gap-2.5 bg-[#0D1826]/90 hover:bg-[#132236] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-slate-700/90 hover:border-[#15B83E]/60 transition-all duration-300 hover:scale-[1.02] active:scale-95 font-heading uppercase tracking-wider text-center backdrop-blur-md"
            >
              <div className="w-5 h-5 rounded-full bg-[#15B83E]/15 flex items-center justify-center text-[#15B83E] group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300">
                <Phone className="w-3 h-3 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <span className="font-mono">CALL {phone}</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
