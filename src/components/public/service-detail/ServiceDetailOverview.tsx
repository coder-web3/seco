'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, ShieldCheck, Users, Award } from 'lucide-react';

interface ServiceDetailOverviewProps {
  title: string;
  content?: string | null;
  imageUrl?: string | null;
  kicker?: string;
  overviewTitle?: string;
  overviewTitleGreen?: string;
  feature1Title?: string;
  feature1Desc?: string;
  feature2Title?: string;
  feature2Desc?: string;
  feature3Title?: string;
  feature3Desc?: string;
  pdfDownloadUrl?: string;
}

export default function ServiceDetailOverview({
  title,
  content,
  imageUrl,
  kicker = 'OVERVIEW',
  overviewTitle = 'Service',
  overviewTitleGreen = 'Overview',
  feature1Title = 'Safety First',
  feature1Desc = 'A secure work environment for a better tomorrow.',
  feature2Title = 'Experienced Teams',
  feature2Desc = 'Skilled professionals delivering proven results.',
  feature3Title = 'Quality & Precision',
  feature3Desc = 'Built to last with attention to every detail.',
  pdfDownloadUrl = '/SECO_LINE_PROFILE.pdf',
}: ServiceDetailOverviewProps) {
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

  const overviewImage = imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80';

  const defaultDescription = content || `SECO LINE delivers reliable and high-quality civil construction and contracting solutions for industrial, commercial, and infrastructure projects across Saudi Arabia. Our experienced teams, modern equipment, and structured project execution approach ensure projects are completed safely, on time, and to the highest standards.`;

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12 font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Overview Content & Features (6 Cols) */}
        <div className={`lg:col-span-6 space-y-5 sm:space-y-6 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Header Kicker & Headline */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
              <span className="w-5 h-[2px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
              <span>{kicker}</span>
            </div>

            {/* Headline - Overview Section */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] font-heading tracking-tight leading-[1.12]">
              {overviewTitle} <span className="text-[#15B83E] font-semibold">{overviewTitleGreen}</span>
            </h2>

            <div className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed whitespace-pre-line space-y-2 pt-1">
              <p>{defaultDescription}</p>
            </div>
          </div>

          {/* 3 Key Feature Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            
            {/* Feature 1 */}
            <div className="group bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 hover:bg-white hover:border-[#15B83E]/50 hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center mb-2.5 group-hover:bg-[#15B83E] group-hover:text-white transition-colors duration-300 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                {feature1Title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug font-normal">
                {feature1Desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 hover:bg-white hover:border-[#15B83E]/50 hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center mb-2.5 group-hover:bg-[#15B83E] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                {feature2Title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug font-normal">
                {feature2Desc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 hover:bg-white hover:border-[#15B83E]/50 hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center mb-2.5 group-hover:bg-[#15B83E] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-[#0D2137] font-heading group-hover:text-[#15B83E] transition-colors">
                {feature3Title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug font-normal">
                {feature3Desc}
              </p>
            </div>

          </div>

          {/* Action CTAs Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            
            {/* Primary Consultation Pill Button */}
            <Link
              href="/contact#contact-form-section"
              className="group relative inline-flex items-center gap-2 bg-[#15B83E] hover:bg-[#129c35] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-[0_4px_25px_rgba(21,184,62,0.4)] hover:shadow-[0_6px_35px_rgba(21,184,62,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-95 font-heading uppercase tracking-wider"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Download Profile Pill Button */}
            <a
              href={pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0D2137] font-semibold text-xs sm:text-sm px-5 py-3 rounded-full border border-slate-300 hover:border-[#15B83E] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 font-heading tracking-wider"
            >
              <span>Download Company Profile</span>
              <Download className="w-4 h-4 text-[#15B83E] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>

          </div>

        </div>

        {/* RIGHT COLUMN: Visual Card (6 Cols) */}
        <div className={`lg:col-span-6 relative transition-all duration-700 delay-200 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Main Angled Polygon Cutout Container */}
          <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-[4/3] group">
            <img 
              src={overviewImage} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Ambient Dark Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A12] via-transparent to-black/30 pointer-events-none" />

            {/* Top Right Vertical Tagline Overlay Card */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-[#070E18]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 text-right">
              <div className="w-[2px] h-8 bg-[#15B83E] rounded-full shadow-[0_0_8px_#15B83E]" />
              <div className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-slate-200 leading-tight">
                <div>YOUR VISION</div>
                <div className="text-[#15B83E]">OUR EXPERTISE</div>
                <div>REAL SOLUTIONS</div>
              </div>
            </div>

            {/* Bottom Floating Glassmorphic Stats Bar */}
            <div className="absolute bottom-3.5 inset-x-3.5 z-10 bg-[#070E18]/90 backdrop-blur-xl border border-slate-700/80 p-3.5 rounded-2xl shadow-xl text-white">
              <div className="grid grid-cols-3 gap-2 items-center divide-x divide-slate-800 text-center">
                
                {/* Stat 1 */}
                <div className="px-1.5 space-y-0.5">
                  <div className="text-sm sm:text-base font-semibold font-heading text-white flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15B83E] inline-block" />
                    <span>250+</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 uppercase">Projects Delivered</div>
                </div>

                {/* Stat 2 */}
                <div className="px-1.5 space-y-0.5">
                  <div className="text-sm sm:text-base font-semibold font-heading text-white flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15B83E] inline-block" />
                    <span>20+</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 uppercase">Years Experience</div>
                </div>

                {/* Stat 3 */}
                <div className="px-1.5 space-y-0.5">
                  <div className="text-sm sm:text-base font-semibold font-heading text-[#15B83E] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#15B83E]" />
                    <span>100%</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 uppercase">Safety Standard</div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
