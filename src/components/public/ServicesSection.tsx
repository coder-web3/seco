'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Building2, 
  Layers, 
  Paintbrush, 
  Leaf, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface ServiceItem {
  id: string | number;
  title: string;
  excerpt: string;
  slug: string;
  iconName?: string;
  imageUrl: string;
}

interface ServicesSectionProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  description?: string;
  services?: ServiceItem[];
  allServicesLink?: string;
  bannerImageUrl?: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: 1,
    title: 'Building Construction',
    excerpt: 'High-quality commercial, residential and mixed-use developments.',
    slug: 'building-construction',
    iconName: 'building',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Infrastructure Works',
    excerpt: 'Critical infrastructure for stronger, more connected communities.',
    slug: 'infrastructure-works',
    iconName: 'layers',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Interior Fit-Out',
    excerpt: 'Functional, inspiring spaces built around your vision.',
    slug: 'interior-fit-out',
    iconName: 'paintbrush',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Sustainable Solutions',
    excerpt: 'Smarter, greener construction for a better tomorrow.',
    slug: 'sustainable-solutions',
    iconName: 'leaf',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Turnkey Project Management',
    excerpt: 'End-to-end site engineering, quality assurance, and project delivery.',
    slug: 'turnkey-project-management',
    iconName: 'briefcase',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ServicesSection({
  kicker = 'OUR SERVICES',
  titleLine1 = 'Complete Construction',
  titleLine2Green = 'Solutions for a Brighter Tomorrow',
  description = 'From concept to completion, SECO LINE delivers integrated construction and contracting services that create lasting value for people, businesses and communities across Saudi Arabia.',
  services = defaultServices,
  allServicesLink = '/services',
  bannerImageUrl = '/assets/images/about-secoline.jpg',
}: ServicesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const getServiceIcon = (name?: string, index: number = 0) => {
    switch (name) {
      case 'building':
        return <Building2 className="w-5 h-5 transition-colors group-hover:text-white" />;
      case 'layers':
        return <Layers className="w-5 h-5 transition-colors group-hover:text-white" />;
      case 'paintbrush':
        return <Paintbrush className="w-5 h-5 transition-colors group-hover:text-white" />;
      case 'leaf':
        return <Leaf className="w-5 h-5 transition-colors group-hover:text-white" />;
      default:
        const icons = [
          <Building2 key="1" className="w-5 h-5 transition-colors group-hover:text-white" />,
          <Layers key="2" className="w-5 h-5 transition-colors group-hover:text-white" />,
          <Paintbrush key="3" className="w-5 h-5 transition-colors group-hover:text-white" />,
          <Leaf key="4" className="w-5 h-5 transition-colors group-hover:text-white" />,
          <Briefcase key="5" className="w-5 h-5 transition-colors group-hover:text-white" />,
        ];
        return icons[index % icons.length];
    }
  };

  return (
    <section ref={sectionRef} className="relative py-10 sm:py-14 bg-[#FAFCFF] overflow-hidden border-b border-slate-200/80">
      {/* Background Layer 1: Ambient Glowing Radial Light Orbs */}
      <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-gradient-to-l from-[#15B83E]/10 via-[#084BA4]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#084BA4]/8 via-[#15B83E]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/4" />

      {/* Background Layer 2: Architectural Vector Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Background Layer 3: Tech Dot Matrix Background Accents */}
      <div className="absolute top-8 left-12 w-56 h-56 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:18px_18px] opacity-40 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-16 right-16 w-48 h-48 bg-[radial-gradient(#15B83E_1px,transparent_1px)] [background-size:14px_14px] opacity-25 pointer-events-none hidden lg:block" />

      {/* Background Layer 4: Top & Bottom Accent Border Ribbons */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#084BA4]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#15B83E]/40 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-12">
        
        {/* Top Split Header: Title (Left) & Architectural Image Banner (Right) */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Left Header Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Kicker Tag */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-0.5 bg-[#008738] rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0D2137] font-heading">
                {kicker}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
              {titleLine1} <br />
              <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">
                {titleLine2Green}
              </span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              {description}
            </p>
          </div>

          {/* Right Column: Clean Banner Image Container */}
          <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[300px] rounded-3xl overflow-hidden group">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${bannerImageUrl}')` }}
            />
          </div>

        </div>

        {/* Center: Scroll Navigation Controls & Single Row Scrollable Cards Container */}
        <div className="space-y-4">
          
          {/* Scroll Navigation Buttons (Mobile / Tablet / Desktop Controls) */}
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">
              Swipe or Scroll to Explore Capabilities ({services.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#008738] text-slate-700 hover:text-white border border-slate-200 shadow-sm flex items-center justify-center transition-all duration-200 focus:outline-none"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#008738] text-slate-700 hover:text-white border border-slate-200 shadow-sm flex items-center justify-center transition-all duration-200 focus:outline-none"
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Single Row Horizontal Scrollable Container with Staggered Entrance Cascade */}
          <div 
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 pt-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((item, idx) => {
              const delayMs = idx * 140;
              return (
                <div
                  key={item.id}
                  className={`flex-shrink-0 w-[290px] sm:w-[330px] md:w-[350px] snap-start bg-white rounded-3xl border border-slate-200/80 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 overflow-hidden flex flex-col justify-between group p-3 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${delayMs}ms` }}
                >
                  {/* Card Top Image & Floating Icon Badge */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    
                    {/* Floating Icon Badge Overlapping Image */}
                    <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-lg flex items-center justify-center text-[#0D2137] group-hover:bg-[#008738] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      {getServiceIcon(item.iconName, idx)}
                    </div>
                  </div>

                  {/* Card Main Body Content */}
                  <div className="px-3 pb-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0D2137] font-heading group-hover:text-[#008738] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-1.5 line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>

                    {/* Learn More Link */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#008738] group-hover:gap-2.5 transition-all">
                      <Link href={`/services/${item.slug}`} className="flex items-center gap-1.5">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Bar: Explore All Services CTA Button & Subtext Accent */}
        <div className={`pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href={allServicesLink}
              className="bg-[#008738] hover:bg-[#00702e] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 group w-full sm:w-auto"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="hidden sm:block w-px h-8 bg-slate-300/80" />

            <div className="hidden sm:block text-[10px] sm:text-[11px] font-semibold text-[#5B6E82] tracking-[0.18em] uppercase leading-tight font-mono">
              <div>DIFFERENT SPACES</div>
              <div>A BRIGHTER TOMORROW</div>
            </div>
          </div>

          {/* Right Bottom Accent Text */}
          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 tracking-widest uppercase font-mono select-none">
            <div className="w-10 sm:w-16 h-px bg-slate-300" />
            <span>SECO LINE &nbsp;|&nbsp; EST. 2015</span>
          </div>
        </div>

      </div>
    </section>
  );
}
