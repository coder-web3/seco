'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, X } from 'lucide-react';

function AnimatedNumber({ value, duration = 2200 }: { value: string; duration?: number }) {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const prefix = numericMatch ? value.substring(0, value.indexOf(numericMatch[0])) : '';
  const suffix = numericMatch ? value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length) : value;

  useEffect(() => {
    const node = elementRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          if (targetNumber === 0) return;

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Smooth easeOutCubic curve
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * targetNumber);

            setDisplayCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayCount(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasAnimated, targetNumber, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {hasAnimated ? displayCount : 0}
      {suffix}
    </span>
  );
}

interface AboutSectionProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  yearsExperience?: string;
  imageUrl?: string;
  videoUrl?: string;
  stats?: Array<{ value: string; label: string }>;
  stripBadgeLine1?: string;
  stripBadgeGreen?: string;
  stripBadgeLine2?: string;
}

export default function AboutSection({
  kicker = 'ABOUT SECO LINE',
  titleLine1 = 'Built on Trust.',
  titleLine2Green = 'Driven by a Greater Tomorrow.',
  description = 'SECO LINE is a Saudi Arabian construction and contracting company committed to building more than structures — we build opportunities, stronger communities and a more sustainable future for the Kingdom.',
  primaryCtaText = 'Learn More About Us',
  primaryCtaLink = '/about',
  yearsExperience = '25+',
  imageUrl = '/assets/images/about-secoline.jpg',
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  stats = [
    { value: '250+', label: 'Projects Delivered' },
    { value: '100+', label: 'Trusted Clients' },
    { value: '13+', label: 'Cities Across KSA' },
    { value: '25+', label: 'Years of Experience' },
  ],
  stripBadgeLine1 = 'A STRONGER',
  stripBadgeGreen = 'SAUDI ARABIA',
  stripBadgeLine2 = 'TOGETHER',
}: AboutSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);
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

  return (
    <section ref={sectionRef} className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 bg-[#F8FAFD] overflow-hidden border-y border-slate-200/80">
      {/* Background Layer 1: Ambient Glowing Radial Light Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#15B83E]/10 via-[#084BA4]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-gradient-to-tl from-[#084BA4]/10 via-[#15B83E]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      {/* Background Layer 2: Micro Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Background Layer 3: Dot Matrix Accent Clusters */}
      <div className="absolute top-12 right-12 w-48 h-48 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-12 left-8 w-40 h-40 bg-[radial-gradient(#15B83E_1px,transparent_1px)] [background-size:14px_14px] opacity-20 pointer-events-none hidden lg:block" />

      {/* Background Layer 4: Top & Bottom Laser Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#15B83E]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#084BA4]/30 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Top Grid: Left Content Column & Right PNG Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className={`lg:col-span-5 space-y-6 pt-2 lg:pt-0 z-20 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Kicker Tag */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-0.5 bg-[#008738] rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0D2137] font-heading">
                {kicker}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
              {titleLine1} <br />
              <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">{titleLine2Green}</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              {description}
            </p>

            {/* Action Buttons: Primary Pill CTA & Watch Our Journey Button */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-3">
              <Link
                href={primaryCtaLink}
                className="bg-[#008738] hover:bg-[#00702e] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 group"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-3.5 group cursor-pointer text-left focus:outline-none"
                aria-label="Our Journey Video"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-[#0D2137] group-hover:bg-[#008738] group-hover:text-white group-hover:border-[#008738] transition-all duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0D2137] group-hover:text-[#008738] transition-colors leading-tight">
                    Our Journey
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    2 Min Video
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Clean PNG Image Layer Display */}
          <div className={`lg:col-span-7 relative flex items-center justify-center lg:justify-end transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            
            <div className="relative w-full max-w-3xl flex items-center justify-center overflow-hidden">
              
              {/* Left Opacity Soft Gradient Fade Overlay to eliminate harsh white line */}
              <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFD] via-[#F8FAFD]/70 to-transparent z-10 pointer-events-none" />

              {/* User's Uploaded Custom PNG / Image Artwork with Smooth Left Mask Fade */}
              <img 
                src={imageUrl} 
                alt="About SECO LINE" 
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.01] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_100%)]"
              />

              {/* Floating Glassmorphism Badge (25+ Years of Building Progress) */}
              <div className={`absolute top-6 left-6 sm:top-12 sm:left-12 lg:left-14 bg-gradient-to-br from-white/95 via-white/85 to-blue-50/70 backdrop-blur-2xl p-6 sm:p-7 rounded-[1.25rem] border border-white/90 shadow-[0_20px_40px_-10px_rgba(7,25,44,0.12)] max-w-[190px] sm:max-w-[220px] z-20 transition-all duration-700 delay-350 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
              } hover:scale-105`}>
                <div className="text-4xl sm:text-5xl font-bold text-[#06182C] tracking-tight font-heading leading-none">
                  {yearsExperience}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#3A4D62] mt-3 leading-snug font-sans">
                  Years of Building<br />Progress
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Horizontal Counter Statistics Bar with Entrance Animated Border */}
        <div className={`pt-2 transition-all duration-700 delay-400 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative rounded-2xl p-[1px] overflow-hidden bg-slate-200/60 shadow-[0_15px_35px_rgba(7,25,44,0.05)] group">
            
            {/* Entrance Animated Top Glowing Border Line */}
            <div 
              className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#15B83E] to-transparent transition-all duration-1000 delay-500 ease-out origin-left z-20 ${
                inView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />

            {/* Entrance Animated Bottom Glowing Border Line */}
            <div 
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#084BA4] to-transparent transition-all duration-1000 delay-700 ease-out origin-right z-20 ${
                inView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`}
            />

            {/* Inner Premium Card Body */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[15px] p-6 sm:p-7 grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70">
              
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''} text-center sm:text-left space-y-1.5 transition-all duration-300 hover:translate-y-[-2px] group/stat`}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-[#071324] tracking-tight font-heading leading-none transition-colors duration-300 group-hover/stat:text-[#15B83E]">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#5B6E82] transition-colors duration-300 group-hover/stat:text-slate-900">
                    {stat.label}
                  </div>
                </div>
              ))}

              {/* 5th Column Accent Badge */}
              <div className="pt-4 md:pt-0 md:pl-6 col-span-2 md:col-span-1 flex flex-col justify-center font-mono">
                <div className="w-7 h-0.5 bg-[#15B83E] mb-2.5 transition-all duration-300 group-hover:w-10" />
                <div className="text-[10px] sm:text-[11px] font-semibold text-[#5B6E82] tracking-[0.18em] uppercase leading-relaxed">
                  {stripBadgeLine1}<br />
                  <span className="text-[#15B83E] font-bold">{stripBadgeGreen}</span><br />
                  {stripBadgeLine2}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Video Modal Popup */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={videoUrl}
                title="About SECO LINE Journey"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
