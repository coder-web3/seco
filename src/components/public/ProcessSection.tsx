'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  Settings, 
  ShieldCheck, 
  Users, 
  Building2,
  ChevronRight,
  X 
} from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  isGreenIcon?: boolean;
  icon: React.ReactNode;
  imageUrl: string;
}

interface ProcessSectionProps {
  kicker?: string;
  titleLine1?: string;
  titleLine2Green?: string;
  description?: string;
  consultationLink?: string;
  stepsJson?: string | null;
  bannerImageUrl?: string;
}

const defaultSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consult & Understand',
    description: 'We listen to your goals, assess your needs and define the right approach.',
    isGreenIcon: false,
    icon: <MessageSquare className="w-5 h-5 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '02',
    title: 'Plan & Design',
    description: 'Our team develops detailed plans, technical solutions and timelines for successful execution.',
    isGreenIcon: true,
    icon: <FileText className="w-5 h-5 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '03',
    title: 'Build & Execute',
    description: 'We bring plans to life with precision, quality materials and strict safety standards.',
    isGreenIcon: false,
    icon: <Settings className="w-5 h-5 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '04',
    title: 'Monitor & Assure',
    description: 'We maintain rigorous quality control, ensuring every detail meets our high standards.',
    isGreenIcon: true,
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '05',
    title: 'Deliver & Support',
    description: 'We complete on time and continue to support for long-term value.',
    isGreenIcon: false,
    icon: <Users className="w-5 h-5 text-white" />,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
  },
];

export default function ProcessSection({
  kicker = 'OUR PROCESS',
  titleLine1 = 'From Vision',
  titleLine2Green = 'to a Lasting Reality',
  description = 'We follow a structured and transparent process to ensure every project is delivered with quality, efficiency and long-term value.',
  consultationLink = '/contact',
  stepsJson,
  bannerImageUrl = '/assets/images/about-secoline.jpg',
}: ProcessSectionProps) {
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  let activeSteps = defaultSteps;
  if (stepsJson) {
    try {
      const parsed = JSON.parse(stepsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const iconList = [
          <MessageSquare key="1" className="w-5 h-5 text-white" />,
          <FileText key="2" className="w-5 h-5 text-white" />,
          <Settings key="3" className="w-5 h-5 text-white" />,
          <ShieldCheck key="4" className="w-5 h-5 text-white" />,
          <Users key="5" className="w-5 h-5 text-white" />,
        ];
        activeSteps = parsed.map((item: any, idx: number) => ({
          number: item.number || `0${idx + 1}`,
          title: item.title,
          description: item.description,
          isGreenIcon: idx % 2 !== 0,
          icon: iconList[idx % iconList.length],
          imageUrl: item.imageUrl || defaultSteps[idx % defaultSteps.length].imageUrl,
        }));
      }
    } catch (e) {
      console.error('Failed to parse stepsJson:', e);
    }
  }

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 sm:py-14 bg-[#F7FAFD] overflow-hidden border-b border-slate-200/80">
      {/* Background Layer 1: Ambient Radial Color Glows */}
      <div className="absolute top-0 left-10 w-[600px] h-[600px] bg-gradient-to-br from-[#15B83E]/8 via-[#084BA4]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/3" />
      <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-gradient-to-tl from-[#084BA4]/10 via-[#15B83E]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      {/* Background Layer 2: Architectural Vector Line Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_65%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Background Layer 3: Tech Dot Grid Patterns */}
      <div className="absolute top-10 right-10 w-44 h-44 bg-[radial-gradient(#084BA4_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-[radial-gradient(#15B83E_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none hidden lg:block" />

      {/* Background Layer 4: Top & Bottom Laser Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#15B83E]/35 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#084BA4]/30 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Top Header Split: Headline (Left) & Right Architectural Frame (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Header Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Kicker Tag */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0D2137] font-heading">
                {kicker}
              </span>
              <div className="w-8 h-0.5 bg-[#008738] rounded-full" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.08] font-heading">
              {titleLine1} <br />
              <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-semibold">
                {titleLine2Green}
              </span>
            </h2>

            {/* Description Paragraph & Subtext Accent */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <p className="sm:col-span-8 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {description}
              </p>
              
              <div className="sm:col-span-4 flex items-center gap-3 border-l border-slate-200 pl-4 font-mono">
                <div className="w-0.5 h-10 bg-[#008738]" />
                <div className="text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase leading-snug">
                  <div>A STRUCTURED</div>
                  <div>APPROACH</div>
                  <div>FOR A <span className="text-[#0D2137]">BETTER</span></div>
                  <div>TOMORROW</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Banner Image Container */}
          <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[300px] rounded-[2.5rem] overflow-hidden group">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${bannerImageUrl}')` }}
            />
          </div>

        </div>

        {/* Center Process Flow: Animated Curved Wave Path & 5 Sequential Step Cards */}
        <div className="relative pt-12 pb-4">
          
          {/* Animated SVG Path with Arrowhead Markers & Traveling Laser Orbs (Desktop Only, Behind Cards) */}
          <div className="absolute top-4 left-0 right-0 h-28 pointer-events-none hidden lg:block z-0">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1000 90" 
              preserveAspectRatio="none"
            >
              <defs>
                {/* Glow Drop Shadow Filter */}
                <filter id="neonDropGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00C853" floodOpacity="0.75" />
                </filter>
                
                {/* Sharp Architectural Chevron Arrowhead Marker */}
                <marker 
                  id="greenArrowMarker" 
                  viewBox="0 0 16 16" 
                  refX="14" 
                  refY="8" 
                  markerWidth="10" 
                  markerHeight="10" 
                  orient="auto"
                >
                  <path d="M 1,2 L 14,8 L 1,14 L 5,8 Z" fill="#00C853" stroke="#008738" strokeWidth="1" />
                </marker>
                
                {/* Flow Gradient */}
                <linearGradient id="flowPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0D2137" />
                  <stop offset="35%" stopColor="#008738" />
                  <stop offset="70%" stopColor="#00A843" />
                  <stop offset="100%" stopColor="#00C853" />
                </linearGradient>
              </defs>

              {/* Base Subtle Track Line */}
              <path
                d="M 100,45 C 180,10 220,10 300,45 C 380,80 420,80 500,45 C 580,10 620,10 700,45 C 780,80 820,80 900,45"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="2.5"
                strokeDasharray="5 5"
              />

              {/* Animated Glowing Flow Path */}
              <path
                d="M 100,45 C 180,10 220,10 300,45 C 380,80 420,80 500,45 C 580,10 620,10 700,45 C 780,80 820,80 900,45"
                fill="none"
                stroke="url(#flowPulseGrad)"
                strokeWidth="3.5"
                filter="url(#neonDropGlow)"
                markerEnd="url(#greenArrowMarker)"
                strokeDasharray="1000"
                strokeDashoffset={inView ? '0' : '1000'}
                className="transition-all duration-[2600ms] ease-out"
              />

              {/* Continuous Travelling Glowing Laser Particle (Lead Orb) */}
              <g>
                <circle r="5" fill="#00FF66" filter="url(#neonDropGlow)">
                  <animateMotion
                    path="M 100,45 C 180,10 220,10 300,45 C 380,80 420,80 500,45 C 580,10 620,10 700,45 C 780,80 820,80 900,45"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="2.5" fill="#FFFFFF">
                  <animateMotion
                    path="M 100,45 C 180,10 220,10 300,45 C 380,80 420,80 500,45 C 580,10 620,10 700,45 C 780,80 820,80 900,45"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Continuous Travelling Laser Particle (Second Pulse Follower) */}
              <g>
                <circle r="4" fill="#008738" opacity="0.85" filter="url(#neonDropGlow)">
                  <animateMotion
                    path="M 100,45 C 180,10 220,10 300,45 C 380,80 420,80 500,45 C 580,10 620,10 700,45 C 780,80 820,80 900,45"
                    dur="3.2s"
                    begin="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </div>

          {/* 5 Sequential Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {activeSteps.map((step, idx) => {
              const delayMs = idx * 180;
              return (
                <div
                  key={step.number}
                  className={`bg-white rounded-3xl border border-slate-200/80 shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-500 p-5 flex flex-col justify-between group overflow-hidden relative ${
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${delayMs}ms` }}
                >
                  {/* Top Glowing Pulse Node Badge Above Card */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
                    <span className={`absolute w-5 h-5 rounded-full ${step.isGreenIcon ? 'bg-[#008738]/40 animate-ping' : 'bg-[#0D2137]/30'}`} />
                    <span className={`relative w-3.5 h-3.5 rounded-full border-2 border-white shadow-md ${
                      step.isGreenIcon ? 'bg-[#008738]' : 'bg-[#0D2137]'
                    }`} />
                  </div>

                  <div>
                    {/* Step Number & Icon Badge Header */}
                    <div className="flex items-center justify-between mb-4 pt-1">
                      <span className={`text-2xl font-black font-mono ${step.isGreenIcon ? 'text-[#008738]' : 'text-slate-400'}`}>
                        {step.number}
                      </span>
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 ${
                        step.isGreenIcon ? 'bg-[#008738] shadow-emerald-700/20' : 'bg-[#0D2137] shadow-slate-900/20'
                      }`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="text-base font-bold text-[#0D2137] font-heading group-hover:text-[#008738] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Bottom Image Thumbnail with Hover Zoom */}
                  <div className="mt-5 rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 relative">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                    
                    {/* Arrow Indicator Pill in Card */}
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#008738] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Consultation CTA Banner & Skyline Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4">
          
          {/* Left Consultation Pill Box */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-full border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#008738] flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0D2137] font-heading leading-tight">
                  Let's Build Your Next Project
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Partner with SECO LINE for reliable, high-quality construction solutions.
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-200" />

            <Link
              href={consultationLink}
              className="bg-[#008738] hover:bg-[#00702e] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-md shadow-emerald-700/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group flex-shrink-0 w-full sm:w-auto justify-center"
            >
              <span>Get a Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Right Bottom Accent Text & Skyline Overlay */}
          <div className="lg:col-span-4 flex items-center justify-end font-mono">
            <div className="flex items-center gap-3 text-right">
              <div className="text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase leading-tight">
                <div>SAUDI ARABIA</div>
                <div>A STRONGER</div>
                <div><span className="text-[#008738]">TOMORROW</span></div>
              </div>
              <div className="w-8 h-0.5 bg-[#008738]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
