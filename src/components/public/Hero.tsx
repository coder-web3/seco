'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, HardHat, ShieldCheck, Leaf, X } from 'lucide-react';

interface HeroProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  videoUrl?: string;
  bgImageUrl?: string;
}

export default function Hero({
  kicker = 'CONSTRUCTING A BETTER TOMORROW',
  titleLine1 = 'Spaces Today',
  titleLine2Green = 'Greater Tomorrow',
  subtitle = 'At SECO LINE, we build more than structures — we create lasting spaces for people, businesses and communities across Saudi Arabia.',
  primaryCtaText = 'Get a Free Quote',
  primaryCtaLink = '/contact',
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  bgImageUrl,
}: HeroProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [inView, setInView] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Dynamic rotating phrases for the highlighted headline line
  const dynamicPhrases = React.useMemo(() => {
    const list = [
      titleLine2Green,
      'Sustainable Future',
      'Architectural Excellence',
      'Saudi Vision 2030',
      'Unmatched Quality',
    ].filter((p): p is string => Boolean(p && p.trim().length > 0));

    return list.length > 0 ? list : ['Greater Tomorrow'];
  }, [titleLine2Green]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = dynamicPhrases[phraseIndex % dynamicPhrases.length] || '';

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, dynamicPhrases]);

  useEffect(() => {
    // Mount trigger for immediate hero animation unveil
    const timer = setTimeout(() => setInView(true), 80);

    const handleScroll = () => {
      if (window.scrollY <= 1200) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax offsets calculation
  const bgParallax = scrollY * 0.22;
  const titleParallax = scrollY * -0.32;
  const subtitleParallax = scrollY * -0.2;
  const ctaParallax = scrollY * -0.12;

  return (
    <section ref={sectionRef} className="relative min-h-[65vh] sm:min-h-[70vh] lg:min-h-[72vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white rounded-[2.5rem] lg:rounded-[3rem] mx-3 sm:mx-6 mt-2 mb-0 shadow-2xl border border-slate-800/80 font-sans">
      {/* Background Image Layer with Depth Parallax */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-out ${
          inView ? 'opacity-100' : 'opacity-80'
        }`}
        style={{ 
          backgroundImage: `url('${bgImageUrl || '/assets/images/hero-clean-bg.jpg'}')`,
          transform: `translate3d(0, ${bgParallax}px, 0) scale(${1.04 + scrollY * 0.0002})`,
          willChange: 'transform',
        }}
      >
        {/* Dark Luxury Gradient Overlays for Rich Image Atmosphere & 100% Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070E18] via-[#070E18]/65 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070E18]/90 via-slate-950/45 to-[#070E18]/80" />
      </div>

      {/* Left Concrete Wall Architectural Engraving Overlay (Desktop Only) */}
      <div className={`absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 pointer-events-none select-none z-10 transition-all duration-1000 delay-300 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}>
        <div className="w-1 h-28 bg-[#15B83E] rounded-full shadow-[0_0_12px_rgba(21,184,62,0.6)]" />
        <div className="text-[11px] lg:text-xs font-black tracking-[0.22em] text-white/80 uppercase leading-relaxed font-mono">
          <div>BUILDING</div>
          <div>PEOPLE</div>
          <div>SPACES</div>
          <div className="text-[#15B83E]">TOMORROW</div>
        </div>
      </div>

      {/* Right Concrete Wall Architectural Engraving Overlay (Desktop Only) */}
      <div className={`absolute right-6 lg:left-auto lg:right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 pointer-events-none select-none z-10 transition-all duration-1000 delay-300 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        <div className="text-[11px] lg:text-xs font-black tracking-[0.22em] text-white/80 uppercase leading-relaxed text-right font-mono">
          <div>SAUDI ARABIA</div>
          <div className="text-[#15B83E]">STRONGER</div>
          <div>TOGETHER</div>
        </div>
        <div className="w-1 h-20 bg-[#15B83E] rounded-full shadow-[0_0_12px_rgba(21,184,62,0.6)]" />
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-10 pt-8 sm:pt-10 pb-4 text-center my-auto space-y-4 sm:space-y-5">
        
        {/* Sub-heading / Kicker Tag with Scroll Parallax */}
        {kicker && (
          <div 
            className={`inline-block transition-transform duration-300 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transform: `translate3d(0, ${scrollY * -0.15}px, 20px)`,
              opacity: Math.max(1 - scrollY / 400, 0),
              willChange: 'transform, opacity',
            }}
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#15B83E] bg-[#070E18]/85 backdrop-blur-md px-5 py-2 rounded-full border border-[#15B83E]/40 shadow-lg font-heading">
              <span className="w-2 h-2 rounded-full bg-[#15B83E] animate-ping" />
              <span>{kicker}</span>
            </span>
          </div>
        )}

        {/* Main Headline with Parallax & Dynamic Typewriter Phrase Switcher */}
        <div 
          className={`space-y-2 transition-all duration-300 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transform: `translate3d(0, ${titleParallax}px, 45px) scale(${Math.max(1 - scrollY * 0.0004, 0.92)})`,
            opacity: Math.max(1 - scrollY / 600, 0),
            willChange: 'transform, opacity',
          }}
        >
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl mx-auto font-heading drop-shadow-lg">
            {titleLine1} <br />
            
            {/* Dynamic Typewriter Animated Phrase */}
            <span className="relative inline-flex items-center justify-center min-h-[1.25em] px-2 py-1">
              <span className="bg-gradient-to-r from-[#15B83E] via-[#00E55E] to-[#10B981] bg-clip-text text-transparent font-bold drop-shadow-[0_4px_20px_rgba(21,184,62,0.45)]">
                {displayText || dynamicPhrases[phraseIndex % dynamicPhrases.length]}
              </span>
              <span className="ml-1.5 inline-block w-[3.5px] h-[0.85em] bg-[#15B83E] rounded-full shadow-[0_0_10px_#15B83E] animate-pulse align-middle" />
            </span>
          </h1>

          {/* Dynamic Phrase Carousel Stepper Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {dynamicPhrases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPhraseIndex(idx);
                  setDisplayText('');
                  setIsDeleting(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === phraseIndex 
                    ? 'w-7 bg-[#15B83E] shadow-[0_0_8px_#15B83E]' 
                    : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Jump to title phrase ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Subtitle Paragraph with Differential Scroll Parallax */}
        {subtitle && (
          <p 
            className={`text-slate-300 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm transition-transform duration-200 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transform: `translate3d(0, ${subtitleParallax}px, 25px)`,
              opacity: Math.max(1 - scrollY / 500, 0),
              willChange: 'transform, opacity',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* CTA Buttons Row with Interactive Hover & Depth Parallax */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 transition-all duration-700 delay-450 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            transform: `translate3d(0, ${ctaParallax}px, 35px)`,
            opacity: Math.max(1 - scrollY / 450, 0),
            willChange: 'transform, opacity',
          }}
        >
          <Link
            href={primaryCtaLink}
            className="bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 group"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4 text-[#15B83E] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      {/* Architectural Bottom Bar */}
      <div className={`relative z-10 bg-[#070E18]/85 backdrop-blur-md border-t border-slate-800/80 py-4 px-6 sm:px-12 transition-all duration-700 delay-600 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-300 font-heading">
          <div className="flex items-center gap-2">
            <HardHat className="w-4 h-4 text-[#15B83E]" />
            <span>Strict Safety Standards</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-slate-800" />

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#15B83E]" />
            <span>Highest Quality Contracting</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-slate-800" />

          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#15B83E]" />
            <span>Sustainable Construction Solutions</span>
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
                title="SECO LINE Video Showcase"
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
