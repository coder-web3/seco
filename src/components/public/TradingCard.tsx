'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Wrench, 
  PackageCheck, 
  Truck, 
  Building2, 
  LucideIcon 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Layers,
  ShieldCheck,
  Wrench,
  PackageCheck,
  Truck,
  Building2,
};

interface TradingCardProps {
  slug: string;
  title: string;
  shortDesc: string;
  badge: string;
  imageUrl: string;
  tags: any[];
  iconName: string;
  index: number;
}

export default function TradingCard({
  slug,
  title,
  shortDesc,
  badge,
  imageUrl,
  tags = [],
  iconName,
  index,
}: TradingCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50 + index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  const IconComponent = iconMap[iconName] || Layers;

  return (
    <Link
      href={`/trading-services/${slug}`}
      className={`group relative h-[350px] sm:h-[360px] rounded-[2rem] overflow-hidden border border-slate-800/90 bg-[#060E1A] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-[0_20px_50px_rgba(21,184,62,0.25)] hover:border-[#15B83E]/70 transition-all duration-500 ease-out transform cursor-pointer ${
        mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      {/* 1. Blended Background Image with Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-45 transition-all duration-700 ease-out group-hover:scale-110 pointer-events-none"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* Dark Ambient Gradient Blend Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-[#040A12]/85 to-[#040A12]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[#15B83E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Glowing Laser Edge Indicator */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#15B83E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* 2. Top Header Row: Icon + Badge */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Animated Icon Box */}
        <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-[#15B83E] flex items-center justify-center shadow-md group-hover:bg-[#15B83E] group-hover:text-white group-hover:border-[#15B83E] group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(21,184,62,0.5)] transition-all duration-500">
          <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-105" />
        </div>

        {/* Micro Category Badge */}
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#15B83E] bg-[#15B83E]/10 px-3 py-1 rounded-full border border-[#15B83E]/30 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>{badge}</span>
        </span>
      </div>

      {/* 3. Middle Content: Title + Short Excerpt */}
      <div className="relative z-10 space-y-2 mt-2">
        <h3 className="text-base sm:text-lg font-bold text-white font-heading group-hover:text-[#15B83E] transition-colors leading-snug line-clamp-1">
          {title}
        </h3>

        <p className="text-slate-300 text-xs sm:text-xs font-medium font-sans leading-relaxed line-clamp-2">
          {shortDesc}
        </p>

        {/* Concise Tags Row */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          {Array.isArray(tags) && tags.slice(0, 3).map((tag: any, idx: number) => {
            const tagName = typeof tag === 'object' && tag !== null ? (tag.name || tag.title || '') : String(tag || '');
            if (!tagName) return null;
            return (
              <span
                key={idx}
                className="text-[10px] font-medium text-slate-300 bg-slate-900/80 border border-slate-800 px-2.5 py-0.5 rounded-md group-hover:border-slate-700 transition-colors"
              >
                {tagName}
              </span>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Sleek Action Link */}
      <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#15B83E] transition-all duration-300">
          <span>Explore Material Supply</span>
          <ArrowRight className="w-4 h-4 text-[#15B83E] transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>

    </Link>
  );
}
