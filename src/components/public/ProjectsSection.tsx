'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

export interface IndustryItem {
  id: string | number;
  number?: string;
  title: string;
  category?: string;
  imageUrl?: string;
  linkUrl?: string;
}

const defaultIndustries: IndustryItem[] = [
  {
    id: '1',
    number: '01',
    title: 'Oil & Gas Piping & Energy',
    category: 'Oil & Gas',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    linkUrl: '/trading-services',
  },
  {
    id: '2',
    number: '02',
    title: 'Civil Construction & Infrastructure',
    category: 'Civil & Structural',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    linkUrl: '/contracting-services',
  },
  {
    id: '3',
    number: '03',
    title: 'Petrochemical & Industrial Facilities',
    category: 'Industrial',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    linkUrl: '/services',
  },
  {
    id: '4',
    number: '04',
    title: 'Heavy Machinery & Material Supply',
    category: 'Equipment & Logistics',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    linkUrl: '/trading-services',
  },
];

interface ProjectsSectionProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
  bgImageUrl?: string;
  projects?: IndustryItem[];
}

export default function ProjectsSection({
  kicker = 'OUR INDUSTRIES',
  titleLine1 = 'Powering Key Industries',
  titleLine2Green = 'Across Saudi Arabia',
  description = 'We deliver integrated solutions tailored to the unique needs of diverse industries, helping our clients build, operate and grow toward a more sustainable future.',
  viewAllLink = '/contact',
  viewAllText = 'Get In Touch',
  bgImageUrl = '/assets/images/about-secoline.jpg',
  projects,
}: ProjectsSectionProps = {}) {
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeIndustriesList = projects && projects.length > 0 ? projects : defaultIndustries;

  return (
    <section ref={sectionRef} className="relative py-10 sm:py-14 bg-[#F8FAFD] overflow-hidden border-b border-slate-200/80">
      {/* Background Layer 1: Ambient Color Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#15B83E]/10 via-[#084BA4]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#084BA4]/10 via-[#15B83E]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/4" />

      {/* Background Layer 2: Architectural Vector Line Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Background Layer 3: Tech Dot Matrix Background Accents */}
      <div className="absolute top-12 left-16 w-48 h-48 bg-[radial-gradient(#084BA4_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-12 right-20 w-44 h-44 bg-[radial-gradient(#15B83E_1px,transparent_1px)] [background-size:14px_14px] opacity-25 pointer-events-none hidden lg:block" />

      {/* Background Layer 4: Top & Bottom Laser Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#084BA4]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#15B83E]/40 to-transparent pointer-events-none" />

      {/* Main Widescreen Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Top Split Layout: Left Architectural Chamfer Overlay & Main Section Block */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column Architectural Facade Overlay */}
          <div className="hidden xl:flex xl:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 group flex-col justify-between p-6">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${bgImageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-950/30 to-black/20" />

            {/* Top Tag */}
            <div className="relative z-10 font-mono text-[10px] font-bold tracking-[0.22em] text-white/90 uppercase leading-snug">
              <div>SECO LINE</div>
              <div className="text-emerald-400">INDUSTRIES</div>
            </div>

            {/* Vertical Accent Typography */}
            <div className="relative z-10 my-auto py-8">
              <div className="text-[11px] font-bold tracking-[0.25em] text-white uppercase leading-relaxed font-mono">
                <div>QUALITY</div>
                <div>SPACES</div>
                <div>FOR A</div>
                <div><span className="text-emerald-400">BRIGHTER</span></div>
                <div>TOMORROW</div>
              </div>
              <div className="w-8 h-0.5 bg-[#008738] my-3" />
            </div>

            {/* Bottom Tag */}
            <div className="relative z-10 font-mono text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase">
              2026 ED.
            </div>
          </div>

          {/* Right Main Section Content Block */}
          <div className="xl:col-span-10 space-y-8">
            
            {/* Header Split Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              
              {/* Left Title & Description Block */}
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0D2137] font-heading">
                    {kicker}
                  </span>
                  <div className="w-8 h-0.5 bg-[#008738] rounded-full" />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.08] font-heading">
                  {titleLine1}{' '}
                  <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">
                    {titleLine2Green}
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
                  <p className="sm:col-span-8 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {description}
                  </p>

                  <div className="sm:col-span-4 flex items-center gap-3 border-l-2 border-slate-200 pl-4 font-mono">
                    <div className="w-0.5 h-10 bg-[#008738]" />
                    <div className="text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase leading-snug">
                      <div>BUILT</div>
                      <div>FOR A</div>
                      <div><span className="text-[#0D2137]">STRONGER</span></div>
                      <div>TOMORROW</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right CTA Button & Accent Tag */}
              <div className="flex flex-col items-start lg:items-end justify-between gap-6">
                <div className="hidden lg:flex items-center gap-3 text-right font-mono">
                  <div className="w-8 h-0.5 bg-slate-300" />
                  <div className="text-[11px] font-bold tracking-[0.22em] text-slate-400 uppercase">
                    PEOPLE / SPACES / PROGRESS
                  </div>
                </div>

                <Link
                  href={viewAllLink}
                  className="bg-[#008738] hover:bg-[#00702e] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
                >
                  <span>{viewAllText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

            {/* Asymmetric Bento Cards Grid (No filter tabs, no arrow buttons on cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4">
              
              {/* Column 1: Card 01 (Oil & Gas) */}
              <div 
                className={`lg:col-span-5 relative group rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[4/3] lg:aspect-auto min-h-[360px] lg:min-h-[460px] transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${activeIndustriesList[0]?.imageUrl || defaultIndustries[0].imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                {/* Bottom Info Glass Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {activeIndustriesList[0]?.number || '01'}
                      </span>
                      <div className="w-4 h-0.5 bg-emerald-400" />
                      <span className="text-[11px] font-medium text-slate-300 font-mono">
                        {activeIndustriesList[0]?.category || 'Oil & Gas'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                      {activeIndustriesList[0]?.title || 'Oil & Gas Piping & Energy'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Column 2: Card 02 (Civil Construction) */}
              <div 
                className={`lg:col-span-4 relative group rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[4/3] lg:aspect-auto min-h-[360px] lg:min-h-[460px] transition-all duration-700 delay-150 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${activeIndustriesList[1]?.imageUrl || defaultIndustries[1].imageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {activeIndustriesList[1]?.number || '02'}
                      </span>
                      <div className="w-4 h-0.5 bg-emerald-400" />
                      <span className="text-[11px] font-medium text-slate-300 font-mono">
                        {activeIndustriesList[1]?.category || 'Civil & Structural'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                      {activeIndustriesList[1]?.title || 'Civil Construction & Infrastructure'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Column 3: Stacked Cards 03 & 04 */}
              <div className="lg:col-span-3 flex flex-col gap-6 justify-between">
                
                {/* Card 03 (Petrochemical) */}
                <div 
                  className={`relative group rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 h-full min-h-[210px] transition-all duration-700 delay-300 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${activeIndustriesList[2]?.imageUrl || defaultIndustries[2].imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {activeIndustriesList[2]?.number || '03'}
                        </span>
                        <div className="w-3 h-0.5 bg-emerald-400" />
                        <span className="text-[10px] font-medium text-slate-300 font-mono">
                          {activeIndustriesList[2]?.category || 'Industrial'}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                        {activeIndustriesList[2]?.title || 'Petrochemical & Industrial Facilities'}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Card 04 (Heavy Machinery) */}
                <div 
                  className={`relative group rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 h-full min-h-[210px] transition-all duration-700 delay-450 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${activeIndustriesList[3]?.imageUrl || defaultIndustries[3].imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {activeIndustriesList[3]?.number || '04'}
                        </span>
                        <div className="w-3 h-0.5 bg-emerald-400" />
                        <span className="text-[10px] font-medium text-slate-300 font-mono">
                          {activeIndustriesList[3]?.category || 'Equipment & Logistics'}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white font-heading group-hover:text-emerald-300 transition-colors">
                        {activeIndustriesList[3]?.title || 'Heavy Machinery & Material Supply'}
                      </h4>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Feature Highlights Horizontal Row */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Tag */}
          <div className="flex items-center gap-3 font-mono">
            <div className="w-8 h-0.5 bg-slate-300" />
            <div className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase leading-snug">
              <div>MORE THAN</div>
              <div>CONSTRUCTION</div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          {/* Feature 1 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 text-[#0D2137] flex items-center justify-center flex-shrink-0 group-hover:bg-[#008738] group-hover:text-white transition-colors duration-300 shadow-sm">
              <Layers className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0D2137] font-heading">Diverse Portfolio</h4>
              <p className="text-xs text-slate-500 font-medium">Across Key Sectors</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          {/* Feature 2 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 text-[#0D2137] flex items-center justify-center flex-shrink-0 group-hover:bg-[#008738] group-hover:text-white transition-colors duration-300 shadow-sm">
              <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0D2137] font-heading">Strategic Locations</h4>
              <p className="text-xs text-slate-500 font-medium">Across Saudi Arabia</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          {/* Feature 3 */}
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 text-[#0D2137] flex items-center justify-center flex-shrink-0 group-hover:bg-[#008738] group-hover:text-white transition-colors duration-300 shadow-sm">
              <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0D2137] font-heading">Built to Last</h4>
              <p className="text-xs text-slate-500 font-medium">Quality in Every Detail</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-slate-200" />

          {/* Right Tag */}
          <div className="flex items-center gap-3 text-right font-mono">
            <div className="text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase leading-snug">
              <div>SPACES</div>
              <div>PEOPLE</div>
              <div><span className="text-[#008738]">PROGRESS</span></div>
            </div>
            <div className="w-8 h-0.5 bg-[#008738]" />
          </div>

        </div>

      </div>
    </section>
  );
}
