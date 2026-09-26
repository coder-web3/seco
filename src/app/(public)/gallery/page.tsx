import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Sparkles, Camera, ShieldCheck, Award, Layers } from 'lucide-react';
import GalleryShowcase from '@/components/public/GalleryShowcase';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'gallery' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Media & Project Gallery - SECO LINE',
    description: seo?.metaDescription || 'Explore visual documentation of our industrial trading divisions, civil execution projects, high-pressure piping assemblies, and heavy machinery fleet across Saudi Arabia.',
  };
}

const DEFAULT_CATEGORIES = [
  { name: 'Oil & Gas Piping', slug: 'oil-gas-piping' },
  { name: 'Civil & Structural', slug: 'civil-structural' },
  { name: 'Heavy Machinery', slug: 'heavy-machinery' },
  { name: 'Site HSE & Safety', slug: 'site-hse-safety' },
  { name: 'Industrial Equipment', slug: 'industrial-equipment' },
];

const DEFAULT_ITEMS = [
  {
    id: 101,
    title: 'High-Pressure Valve Assembly & QA Hydrotest',
    mediaUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1400&q=80',
    description: 'API 6D certified gate & globe valve inspection at Jubail industrial facility.',
    category: { id: 1, name: 'Oil & Gas Piping', slug: 'oil-gas-piping' },
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 102,
    title: 'Heavy Structural Steel Fabrication & Welding',
    mediaUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    description: 'Precision MIG/TIG welding of structural steel beams for commercial tower.',
    category: { id: 2, name: 'Civil & Structural', slug: 'civil-structural' },
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: 103,
    title: 'Heavy Mobile Crane & Access Rig Fleet',
    mediaUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80',
    description: 'Deployment of 100-ton mobile cranes for refinery expansion project in Yanbu.',
    category: { id: 3, name: 'Heavy Machinery', slug: 'heavy-machinery' },
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: 104,
    title: 'Site Safety Team & Flame-Retardant PPE Inspection',
    mediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
    description: 'HSE compliance review and Nomex fire-retardant coverall equipment verification.',
    category: { id: 4, name: 'Site HSE & Safety', slug: 'site-hse-safety' },
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: 105,
    title: 'High-Voltage Electrical & ATEX Junction Box Units',
    mediaUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1400&q=80',
    description: 'Explosion-proof electrical instrumentation setup for petrochemical processing plant.',
    category: { id: 5, name: 'Industrial Equipment', slug: 'industrial-equipment' },
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: 106,
    title: 'Seamless Steel Pipe Warehouse Inventory Dispatch',
    mediaUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80',
    description: 'ASTM A106 Gr. B seamless steel pipe dispatch from Riyadh central warehouse.',
    category: { id: 1, name: 'Oil & Gas Piping', slug: 'oil-gas-piping' },
    sortOrder: 6,
    isPublished: true,
  },
];

export default async function GalleryPage() {
  const [dbCategories, dbItems, dbHero] = await Promise.all([
    prisma.galleryCategory.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.galleryItem.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    }).catch(() => []),
    (prisma as any).galleryHeroSetting?.findFirst().catch(() => null) ?? Promise.resolve(null),
  ]);

  const categories = dbCategories.length > 0 ? dbCategories : DEFAULT_CATEGORIES.map((c, i) => ({ id: i + 1, ...c }));
  const items = dbItems.length > 0 ? dbItems : DEFAULT_ITEMS;

  const hero = {
    kicker: dbHero?.kicker || 'MEDIA & VISUAL GALLERY',
    titleLine1: dbHero?.titleLine1 || 'Engineering Excellence &',
    titleGreen: dbHero?.titleGreen || 'Project Showcase',
    subtitle: dbHero?.subtitle || "Explore curated visual documentation of SECO LINE's industrial material supply, high-pressure piping assemblies, civil engineering sites, and heavy machinery operations across the Kingdom.",
    badge1Text: dbHero?.badge1Text || 'High-Resolution Project Photography',
    badge2Text: dbHero?.badge2Text || 'Aramco & SABIC Site Inspection Verification',
    badge3Text: dbHero?.badge3Text || '100% Certified Operational Standards',
    bgImageUrl: dbHero?.bgImageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 font-sans select-none bg-slate-50/50">
      
      {/* 1. Ultra-Premium Dark Luxury Hero Header */}
      <section className="relative min-h-[420px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden bg-[#040A12] text-white rounded-none sm:rounded-[2.5rem] mx-0 sm:mx-4 lg:mx-6 mt-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-800/90 font-sans">
        
        {/* Ambient Radial Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#15B83E]/15 rounded-full blur-[130px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#0284C7]/15 rounded-full blur-[110px] pointer-events-none" />

        {/* Diagonal Hero Image Layer Right Side */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0%_100%)] bg-[#071322]">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105 opacity-80"
              style={{
                backgroundImage: `url('${hero.bgImageUrl}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#040A12] via-[#040A12]/80 to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040A12]/95 via-transparent to-transparent hidden lg:block" />
            </div>
          </div>

          <svg 
            className="absolute inset-y-0 left-0 h-full w-[22%] hidden lg:block text-none stroke-[#15B83E] drop-shadow-[0_0_15px_#15B83E]"
            viewBox="0 0 100 700" 
            preserveAspectRatio="none"
            strokeWidth="3.5"
          >
            <line x1="68" y1="0" x2="0" y2="700" />
          </svg>
        </div>

        {/* Top Right Tagline */}
        <div className="absolute top-6 right-8 hidden lg:flex items-center gap-3 z-20">
          <div className="w-[3px] h-10 bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E]" />
          <div className="text-[10px] xl:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase leading-snug font-mono text-right">
            <div>VISUAL</div>
            <div>DOCUMENTATION</div>
            <div>SAUDI</div>
            <div className="text-[#15B83E]">PROJECTS</div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 pb-6 my-auto space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#15B83E]/10 border border-[#15B83E]/30 text-xs font-bold uppercase tracking-[0.2em] text-[#15B83E] font-mono shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15B83E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15B83E]"></span>
            </span>
            <span>{hero.kicker}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
            {hero.titleLine1} <span className="text-[#15B83E]">{hero.titleGreen}</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
            {hero.subtitle}
          </p>
        </div>

        {/* Bottom Hero Stats Bar */}
        <div className="relative z-20 border-t border-slate-800/80 bg-[#040A12]/80 backdrop-blur-md px-6 sm:px-10 py-3.5">
          <div className="w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#15B83E]" />
              <span>{hero.badge1Text}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#15B83E]" />
              <span>{hero.badge2Text}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#15B83E]" />
              <span>{hero.badge3Text}</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Interactive Filterable Gallery Grid + Lightbox */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <GalleryShowcase initialItems={items as any} categories={categories} />
      </section>

    </div>
  );
}
