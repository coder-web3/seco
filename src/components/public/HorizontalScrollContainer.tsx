'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollContainerProps {
  badgeText: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function HorizontalScrollContainer({
  badgeText,
  title,
  subtitle,
  children,
}: HorizontalScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-[2rem] p-7 sm:p-9 shadow-sm space-y-6">
      {/* Header Row with Left & Right Scroll Arrow Controls */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#15B83E] font-mono">
            <span className="w-4 h-[2px] bg-[#15B83E]" />
            <span>{badgeText}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0D2137] font-heading">
            {title}
          </h2>
          <p className="text-slate-500 text-xs">{subtitle}</p>
        </div>

        {/* Interactive Left & Right Arrow Navigation Controls */}
        <div className="flex items-center gap-2 bg-slate-50/80 p-1 rounded-full border border-slate-200/80">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
            className="w-8.5 h-8.5 rounded-full bg-white hover:bg-[#15B83E] text-slate-700 hover:text-white border border-slate-200/80 transition-all duration-300 flex items-center justify-center shadow-xs active:scale-95 cursor-pointer group"
          >
            <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            className="w-8.5 h-8.5 rounded-full bg-white hover:bg-[#15B83E] text-slate-700 hover:text-white border border-slate-200/80 transition-all duration-300 flex items-center justify-center shadow-xs active:scale-95 cursor-pointer group"
          >
            <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Single Row Scrollable Cards Container */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-emerald-500/40 scrollbar-track-slate-100 snap-x snap-mandatory focus:outline-none scroll-smooth"
      >
        {children}
      </div>
    </div>
  );
}
