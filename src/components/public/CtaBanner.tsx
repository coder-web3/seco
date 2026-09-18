'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface CtaBannerProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function CtaBanner({
  badge = 'START YOUR PROJECT TODAY',
  title = 'Ready to Build Your Next Landmark in Saudi Arabia?',
  subtitle = 'Partner with SECO LINE for world-class construction, engineering, and infrastructure solutions aligned with Saudi Vision 2030.',
  primaryCtaText = 'Get a Free Quote',
  primaryCtaLink = '/contact',
  secondaryCtaText = 'Talk with Experts',
  secondaryCtaLink = '/contact',
}: CtaBannerProps) {
  return (
    <section className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 my-1 sm:my-2">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#070E18] via-[#0A1628] to-[#070E18] text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-14 shadow-2xl border border-slate-800/90 font-sans">
        {/* Background Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
        
        {/* Dark Ambient Gradient Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#15B83E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#084BA4]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Side Content */}
        <div className="space-y-3.5 text-center lg:text-left max-w-3xl">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#15B83E]/15 border border-[#15B83E]/30 text-[#15B83E] text-xs font-bold uppercase tracking-[0.2em] font-heading">
            <span className="w-2 h-2 rounded-full bg-[#15B83E] animate-pulse" />
            <span>{badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-[1.2] font-heading drop-shadow-md">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base font-normal leading-relaxed drop-shadow-sm">
            {subtitle}
          </p>
        </div>

        {/* Right Side Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
          <Link
            href={primaryCtaLink}
            className="w-full sm:w-auto bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={secondaryCtaLink}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-6 py-4 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 group whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-[#15B83E]" />
            <span>{secondaryCtaText}</span>
          </Link>
        </div>

      </div>
    </div>
  </section>
);
}
