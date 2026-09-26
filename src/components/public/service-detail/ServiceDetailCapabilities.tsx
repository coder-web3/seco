'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  HardHat, 
  Building2, 
  Waypoints, 
  Factory, 
  Briefcase, 
  Wrench,
  X,
  CheckCircle2,
  Send,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface CapabilityCard {
  id?: string;
  title: string;
  description: string;
  detailedContent: string;
  highlights: string[];
  imageUrl: string;
  icon: any;
}

interface ServiceDetailCapabilitiesProps {
  serviceTitle: string;
  kicker?: string;
  title1?: string;
  title2Green?: string;
  subtitle?: string;
  capabilitiesJson?: string;
}

export default function ServiceDetailCapabilities({
  serviceTitle,
  kicker = 'OUR OTHER SERVICES',
  title1 = 'Explore Our',
  title2Green = 'Other Services',
  subtitle = 'Explore our specialized engineering, contracting, and construction capabilities tailored to your project scope across Saudi Arabia.',
  capabilitiesJson,
}: ServiceDetailCapabilitiesProps) {
  const [inView, setInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCapability, setSelectedCapability] = useState<CapabilityCard | null>(null);
  
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Keyboard shortcut (Escape key) to close modal dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCapability(null);
      }
    };

    if (selectedCapability) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCapability]);

  const defaultCapabilities: CapabilityCard[] = [
    {
      id: 'earthworks',
      title: 'Earthworks & Site Preparation',
      description: 'Excavation, grading, and ground improvement for solid foundations.',
      detailedContent: 'SECO LINE provides comprehensive site preparation, bulk earthmoving, and foundation grading utilizing heavy machinery and laser-guided grading technology. From preliminary soil stabilization to precision trenching and foundation excavation, our teams ensure strict adherence to geotechnical standards across industrial and commercial sites.',
      highlights: [
        'Bulk Excavation & Precision Grading',
        'Soil Stabilization & Ground Improvement',
        'Laser-Guided Trenching & Backfilling',
        'Geotechnical Compliance & Testing'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
      icon: HardHat,
    },
    {
      id: 'structural',
      title: 'Structural Construction',
      description: 'Reinforced concrete and steel structures for industrial and commercial projects.',
      detailedContent: 'We specialize in the erection and pouring of high-tolerance reinforced concrete and structural steel frameworks. Our structural engineering team delivers durable superstructures, multi-story frameworks, and pre-cast concrete installations designed for seismic resilience and maximum structural longevity.',
      highlights: [
        'Reinforced Concrete Foundations & Columns',
        'Heavy Structural Steel Erection',
        'Pre-cast & Post-tensioned Concrete Systems',
        'Seismic Design & Structural Quality Audits'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      icon: Building2,
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      description: 'Roads, utilities, drainage, and supporting infrastructure works.',
      detailedContent: 'Delivering large-scale municipal and industrial infrastructure, including asphalt paving, storm water drainage networks, underground utility installation, and street lighting. We execute complex civil infrastructure projects with high precision and minimal operational disruption.',
      highlights: [
        'Asphalt Paving & Sub-grade Construction',
        'Storm Water & Sewage Utility Networks',
        'Underground Electrical & Piping Trenching',
        'Road Marking & Traffic Safety Barriers'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80',
      icon: Waypoints,
    },
    {
      id: 'industrial',
      title: 'Industrial Construction',
      description: 'Production plants, warehouses, and heavy-duty facilities.',
      detailedContent: 'Turnkey construction for manufacturing plants, logistics warehouses, and processing facilities. Our engineering solutions integrate heavy-duty slab flooring, overhead crane runways, specialized HVAC ventilation systems, and hazardous material containment structures.',
      highlights: [
        'Turnkey Warehouse & Factory Construction',
        'Heavy Industrial Floor Slabs (High-Tolerance)',
        'Overhead Crane Runway Infrastructure',
        'Cleanrooms & Industrial Ventilation Setup'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      icon: Factory,
    },
    {
      id: 'special',
      title: 'Special Structures',
      description: 'Tanks, foundations, substations, and other complex builds.',
      detailedContent: 'Specialized expertise in custom civil engineering structures, including electrical substations, industrial storage tank foundations, heavy machinery basements, retaining walls, and customized concrete containment pits engineered for extreme load demands.',
      highlights: [
        'High-Voltage Electrical Substation Pads',
        'Storage Tank Basements & Containments',
        'Heavy Equipment Machinery Foundations',
        'Reinforced Retaining Wall Systems'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      icon: Briefcase,
    },
    {
      id: 'renovation',
      title: 'Renovation & Expansion',
      description: 'Upgrades and extensions to support growing operations.',
      detailedContent: 'Revitalizing and expanding existing commercial and industrial assets. We manage structural retrofitting, footprint extensions, facility reconfigurations, and modern exterior cladding while ensuring safe continuous operations during construction.',
      highlights: [
        'Structural Retrofitting & Strengthening',
        'Facility Footprint Extensions',
        'Facade Renewal & Architectural Cladding',
        'Interior Space Reconfiguration & Fit-Out'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
      icon: Wrench,
    },
  ];

  const defaultIcons = [HardHat, Building2, Waypoints, Factory, Briefcase, Wrench];

  let capabilities: CapabilityCard[] = defaultCapabilities;
  if (capabilitiesJson) {
    try {
      const parsed = JSON.parse(capabilitiesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        capabilities = parsed.map((item: any, idx: number) => ({
          id: item.id || `cap-${idx}`,
          title: item.title || `Capability ${idx + 1}`,
          description: item.description || '',
          detailedContent: item.detailedContent || item.description || '',
          highlights: Array.isArray(item.highlights) 
            ? item.highlights 
            : (typeof item.highlights === 'string' && item.highlights ? item.highlights.split('\n').filter(Boolean) : []),
          imageUrl: item.imageUrl || defaultCapabilities[idx % defaultCapabilities.length].imageUrl,
          icon: defaultIcons[idx % defaultIcons.length],
        }));
      }
    } catch (err) {
      console.error('Error parsing capabilitiesJson:', err);
    }
  }

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    const cardWidth = 280;
    const newIndex = Math.min(
      capabilities.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setCurrentIndex(newIndex);
  };

  const formattedCounter = `0${currentIndex + 1} / 0${capabilities.length}`;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedCapability(null);
    }
  };

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12 font-sans select-none overflow-hidden relative">
      
      {/* 1. Header Bar with Carousel Controls */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/90 pb-5 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="w-5 h-[2px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
            <span>{kicker}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
            {title1}{' '}
            <span className="text-[#15B83E] font-semibold">{title2Green}</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              title="Previous Service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-[#15B83E] hover:text-white hover:border-[#15B83E] text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
              title="Next Service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-500">
            <span className="w-3.5 h-[2px] bg-slate-300" />
            <span>{formattedCounter}</span>
          </div>
        </div>
      </div>

      {/* 2. One-Row Scrollable Cards Container (5 Cards per View on Desktop) */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-4 pt-6 pb-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {capabilities.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === currentIndex;

          return (
            <div
              key={idx}
              onClick={() => setSelectedCapability(item)}
              className={`group relative bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#15B83E]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden flex-none w-[260px] sm:w-[275px] lg:w-[calc(20%-13px)] min-w-[250px] snap-start cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${isActive ? 'ring-2 ring-[#15B83E] shadow-md' : ''}`}
              style={{ transitionDelay: `${60 + idx * 50}ms` }}
              title="Click to view details & inquire"
            >
              <div className="space-y-3 relative z-10">
                
                {/* Top Thumbnail Image Container */}
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-900 border border-slate-100 group">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Circular Icon Badge Overlay */}
                  <div className="absolute bottom-2 left-2 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[#15B83E] flex items-center justify-center shadow-md group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Hover Overlay Hint Badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[#15B83E]" />
                    <span>View Detail</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-semibold text-[#0D2137] font-heading leading-snug group-hover:text-[#15B83E] transition-colors line-clamp-2 min-h-[2.4rem]">
                  {item.title}
                </h3>

                {/* Short Description */}
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-3">
                  {item.description}
                </p>

              </div>

              {/* Bottom Card Footer with Arrow */}
              <div className="pt-3 mt-1 flex items-center justify-between border-t border-slate-100/80 relative z-10">
                <span className="text-[11px] font-semibold text-[#15B83E] group-hover:underline">
                  Quick View & Contact
                </span>

                <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center group-hover:bg-[#15B83E] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Interactive Service Detail Popup Modal Dialog */}
      {selectedCapability && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 font-sans transform transition-all duration-300 scale-100 my-auto">
            
            {/* Modal Header Visual Image Banner */}
            <div className="relative w-full h-52 sm:h-64 bg-slate-950 overflow-hidden">
              <img 
                src={selectedCapability.imageUrl} 
                alt={selectedCapability.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Close Button (Top Right Glass Button) */}
              <button 
                onClick={() => setSelectedCapability(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-[#15B83E] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer z-20 group"
                title="Close popup (Esc)"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>

              {/* Top Left Service Tag */}
              <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#15B83E] font-heading bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-md">
                  {kicker}
                </span>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-5">
              
              {/* Service Title */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D2137] font-heading tracking-tight leading-snug">
                  {selectedCapability.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#15B83E] mt-1 font-heading flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  SECO LINE Certified Engineering Capability
                </p>
              </div>

              {/* Detailed Overview Paragraph */}
              <div className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                {selectedCapability.detailedContent}
              </div>

              {/* Highlights & Scope Checklist Grid */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-heading">
                  Key Capabilities & Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCapability.highlights.map((highlight, hIdx) => (
                    <div 
                      key={hIdx} 
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#15B83E] flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer: Contact Page Button & Close Button */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-normal">
                  Need a quick quote or technical proposal for this service?
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedCapability(null)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <Link
                    href="/contact#contact-form-section"
                    onClick={() => setSelectedCapability(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#15B83E] hover:bg-[#12a036] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg hover:shadow-[#15B83E]/20 active:scale-98 cursor-pointer font-heading"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire / Contact Us</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
