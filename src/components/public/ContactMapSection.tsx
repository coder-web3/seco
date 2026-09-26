'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface ContactMapSectionProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  address?: string;
  mapEmbedUrl?: string;
  directMapsUrl?: string;
}

export default function ContactMapSection({
  kicker = 'LOCATION & HEADQUARTERS',
  titleLine1 = 'Visit Our Headquarters in',
  titleLine2Green = 'Riyadh, Saudi Arabia.',
  address = 'Building No. 2341, Salahuddin Al Ayyubi Street, Al Malaz District, Riyadh 12841, Saudi Arabia',
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231920.08945892582!2d46.54233777598822!3d24.72539828551403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa',
  directMapsUrl = 'https://maps.google.com/?q=Riyadh+Saudi+Arabia',
}: ContactMapSectionProps) {
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
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-6 select-none font-sans">
      <div className={`space-y-6 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/90 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E]" />
              <span>{kicker}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2137] font-heading tracking-tight">
              {titleLine1}{' '}
              <span className="text-[#15B83E] font-bold">{titleLine2Green}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#15B83E] flex-shrink-0" />
              <span>{address}</span>
            </p>
          </div>

          {/* Open in Google Maps Action Button with Icon Hover Animation */}
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-[#0D2137] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] font-heading uppercase tracking-wider flex-shrink-0 border border-slate-800 hover:border-[#15B83E]/50"
          >
            <Navigation className="w-4 h-4 text-[#15B83E] transition-transform duration-300 group-hover:rotate-45" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Embedded Map iFrame Card */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 h-[240px] sm:h-[280px] lg:h-[320px] group hover:border-[#15B83E]/40 transition-colors duration-500">
          
          <iframe
            title="SECO LINE Location Map"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter contrast-[1.05] grayscale-[0.15] group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Floating Glassmorphic Headquarters Emblem */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-3 bg-[#070E18]/85 backdrop-blur-xl border border-slate-700/80 p-3 sm:p-3.5 rounded-xl shadow-2xl text-white group-hover:border-[#15B83E]/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#15B83E] shadow-sm flex-shrink-0">
              <MapPin className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-bold font-heading text-white flex items-center gap-2">
                <span>SECO LINE HEADQUARTERS</span>
                <span className="w-2 h-2 rounded-full bg-[#15B83E] animate-pulse" />
              </div>
              <div className="text-[11px] font-mono text-slate-300">Riyadh, Kingdom of Saudi Arabia</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
