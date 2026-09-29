'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Linkedin, Instagram, Youtube, Twitter, ChevronRight } from 'lucide-react';

interface FooterProps {
  siteName?: string;
  tagline?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  socialLinks?: string | null;
  footerText?: string | null;
  logoUrl?: string | null;
  footerImageUrl?: string | null;
}

export default function Footer({
  siteName = 'SECO LINE',
  tagline = 'Delivering reliable industrial & construction solutions for a stronger, more sustainable tomorrow across Saudi Arabia.',
  contactEmail = 'info@secoline.com.sa',
  contactPhone = '+966 11 456 7890',
  address = 'Riyadh, Kingdom of Saudi Arabia',
  socialLinks,
  footerText,
  logoUrl,
  footerImageUrl,
}: FooterProps) {
  let socials: any = {};
  try {
    socials = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks || {};
  } catch {
    socials = {};
  }

  const currentYear = new Date().getFullYear();
  const footerBgImage = footerImageUrl || '/assets/images/about-secoline.jpg';

  return (
    <footer className="relative bg-[#070E18] text-slate-300 overflow-hidden border-t border-slate-800/80 font-sans">
      
      {/* Main Top Section Grid */}
      <div className="max-w-[1700px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* Left Block: Company Details & Navigation Links (Col 1-8 on desktop) */}
          <div className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-10">
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Col 1: Brand Info & Contact List */}
              <div className="sm:col-span-4 space-y-6">
                
                {/* Brand Logo & Tagline */}
                <div className="space-y-3">
                  <Link href="/" className="inline-block group">
                    <div className="bg-white p-3 sm:p-3.5 rounded-2xl shadow-md border border-slate-100/90 inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <img 
                        src={logoUrl || '/assets/images/logo.png'} 
                        alt={siteName} 
                        className="h-14 sm:h-16 max-w-[220px] sm:max-w-[240px] w-auto object-contain" 
                      />
                    </div>
                  </Link>

                  <div className="w-10 h-0.5 bg-[#15B83E] rounded-full" />

                  <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-xs">
                    {tagline}
                  </p>
                </div>

                {/* Direct Contact Info with Glass Circle Icons */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition">
                    <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] shadow-sm flex-shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-[11px] leading-snug">{address}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition">
                    <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] shadow-sm flex-shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <a href={`tel:${contactPhone}`} className="font-medium font-mono text-[11px] hover:underline">
                      {contactPhone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition">
                    <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] shadow-sm flex-shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <a href={`mailto:${contactEmail}`} className="font-medium text-[11px] hover:underline">
                      {contactEmail}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300 hover:text-white transition">
                    <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-[#15B83E] shadow-sm flex-shrink-0">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <a href="https://www.secoline.com.sa/" target="_blank" rel="noreferrer" className="font-medium hover:underline font-mono text-[11px]">
                      www.secoline.com.sa
                    </a>
                  </div>
                </div>

              </div>

              {/* Col 2: QUICK LINKS Navigation */}
              <div className="sm:col-span-2 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] font-heading">QUICK LINKS</h4>
                  <div className="w-6 h-0.5 bg-[#15B83E] rounded-full" />
                </div>
                <ul className="space-y-2.5 text-xs font-medium text-slate-300">
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'About Us', href: '/about' },
                    { label: 'Projects', href: '/projects' },
                    { label: 'Gallery', href: '/gallery' },
                    { label: 'Blogs', href: '/blog' },
                    { label: 'Contact Us', href: '/contact' },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link 
                        href={item.href} 
                        className="group flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors duration-200 py-0.5 text-[11px]"
                      >
                        <ChevronRight className="w-3 h-3 text-[#15B83E] transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: CONTRACTING SERVICES Navigation */}
              <div className="sm:col-span-3 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[#15B83E] text-xs font-bold uppercase tracking-[0.2em] font-heading">CONTRACTING</h4>
                  <div className="w-6 h-0.5 bg-[#15B83E] rounded-full" />
                </div>
                <ul className="space-y-2.5 text-xs font-medium text-slate-300">
                  {[
                    { label: 'All Contracting Services', href: '/contracting-services' },
                    { label: 'Civil Construction & Infra', href: '/contracting-services/civil-construction-infrastructure' },
                    { label: 'Mechanical & Piping Works', href: '/contracting-services/mechanical-piping-works' },
                    { label: 'Electrical & Instrumentation', href: '/contracting-services/electrical-instrumentation-works' },
                    { label: 'Maintenance & Facility Mgmt', href: '/contracting-services/maintenance-facility-management' },
                    { label: 'Equipment & Heavy Lifting', href: '/contracting-services/heavy-equipment-machinery-rental' },
                    { label: 'Manpower & Scaffolding', href: '/contracting-services/skilled-manpower-scaffolding' },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link 
                        href={item.href} 
                        className={`group flex items-center gap-1.5 transition-colors duration-200 py-0.5 text-[11px] ${
                          idx === 0 ? 'text-[#15B83E] font-bold hover:text-white' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <ChevronRight className="w-3 h-3 text-[#15B83E] transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: TRADING SERVICES Navigation Widget */}
              <div className="sm:col-span-3 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[#15B83E] text-xs font-bold uppercase tracking-[0.2em] font-heading">TRADING DIVISIONS</h4>
                  <div className="w-6 h-0.5 bg-[#15B83E] rounded-full" />
                </div>
                <ul className="space-y-2.5 text-xs font-medium text-slate-300">
                  {[
                    { label: 'All Trading Services', href: '/trading-services' },
                    { label: 'Industrial Valves & Piping', href: '/trading-services/industrial-valves-piping' },
                    { label: 'Safety Equipment & PPE', href: '/trading-services/safety-equipment-ppe' },
                    { label: 'Tools & Hardware Supply', href: '/trading-services/tools-hardware-supply' },
                    { label: 'Electrical & Instrumentation', href: '/trading-services/electrical-instrumentation' },
                    { label: 'Heavy Machinery Trading', href: '/trading-services/heavy-equipment-machinery' },
                    { label: 'Structural Steel & Materials', href: '/trading-services/structural-steel-materials' },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link 
                        href={item.href} 
                        className={`group flex items-center gap-1.5 transition-colors duration-200 py-0.5 text-[11px] ${
                          idx === 0 ? 'text-[#15B83E] font-bold hover:text-white' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <ChevronRight className="w-3 h-3 text-[#15B83E] transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Built On Purpose Accent Badge */}
            <div className="pt-6 border-t border-slate-800/60 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-[#15B83E] rounded-full shadow-[0_0_8px_rgba(21,184,62,0.6)]" />
              <div className="text-[10px] font-bold text-slate-400 tracking-[0.22em] uppercase font-mono leading-tight">
                <div>BUILT ON PURPOSE</div>
                <div className="text-[#15B83E]">FOR A STRONGER TOMORROW</div>
              </div>
            </div>

          </div>

          {/* Right Block: Architectural Slanted Industrial Facade (Col 9-12 on desktop) */}
          <div className="lg:col-span-4 relative min-h-[420px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800/80 group">
            
            {/* Industrial Local Landmark Artwork Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('${footerBgImage}')` }}
            />

            {/* Premium Gradient Overlays for High-Contrast Luxury Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070E18] via-[#070E18]/50 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070E18] via-[#070E18]/40 to-transparent" />

            {/* Slanted Green Laser Line Accent */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#15B83E] via-[#084BA4] to-transparent shadow-[0_0_15px_rgba(21,184,62,0.8)] hidden lg:block" />

            {/* Architectural Engraving Top Left */}
            <div className="absolute top-8 left-8 sm:left-12 z-20 font-mono">
              <div className="text-[11px] font-bold tracking-[0.25em] text-white/90 uppercase drop-shadow-md">
                SAUDI ARABIA
              </div>
              <div className="text-[11px] font-bold tracking-[0.25em] text-white/90 uppercase drop-shadow-md mt-0.5">
                A STRONGER
              </div>
              <div className="text-[11px] font-bold tracking-[0.25em] text-[#15B83E] uppercase drop-shadow-md mt-0.5">
                TOMORROW
              </div>
              <div className="w-12 h-0.5 bg-[#15B83E] mt-2 shadow-[0_0_8px_rgba(21,184,62,0.8)]" />
            </div>

            {/* Floating Glassmorphism Showcase Card Overlay */}
            <div className="absolute bottom-8 left-8 right-8 sm:left-12 sm:right-12 z-20">
              <div className="p-5 sm:p-6 bg-[#070E18]/85 backdrop-blur-xl rounded-2xl border border-slate-700/80 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#15B83E] uppercase font-mono">
                    PROJECT SHOWCASE
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#15B83E] animate-pulse" />
                </div>

                <div className="text-sm sm:text-base font-bold text-white font-heading leading-snug">
                  Kingdom Infrastructure & Landmark Development
                </div>

                <div className="text-xs text-slate-300 font-sans leading-relaxed">
                  Delivering sustainable, high-precision engineering solutions across Saudi Arabia.
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>SAUDI VISION 2030</span>
                  <span className="text-[#15B83E] font-bold">SECO LINE</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Copyright & Saudi Vision 2030 Bar */}
      <div className="border-t border-slate-800/80 bg-[#050A12] py-5 px-6 sm:px-12 relative z-10">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          
          {/* Left: Copyright */}
          <div>
            {(footerText || `© ${currentYear} SECO LINE. All rights reserved.`).replace(/\.?\s*Powered by.*$/i, '')}
          </div>

          {/* Center: Brand Slogan Divider */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <div className="w-12 h-px bg-slate-800" />
            <span>ENGINEERING A STRONGER TOMORROW</span>
            <div className="w-12 h-px bg-slate-800" />
          </div>

          {/* Right: Social Media Icons & Saudi Vision 2030 Badge */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-sans">
                Follow Us:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={socials.linkedin || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socials.instagram || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={socials.youtube || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={socials.twitter || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition"
                  aria-label="X Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-6 bg-slate-800" />

            {/* Saudi Vision 2030 Emblem */}
            <div className="flex items-center gap-2 text-white font-sans group">
              <div className="text-right leading-none">
                <div className="text-[10px] font-black tracking-widest text-slate-300">VISION</div>
                <div className="text-sm font-extrabold text-[#15B83E] font-mono tracking-tighter">2030</div>
              </div>
              <div className="text-[9px] font-bold tracking-widest text-slate-400 border-l border-slate-700 pl-2 uppercase leading-snug">
                <div>المملكة العربية السعودية</div>
                <div className="text-slate-300">KINGDOM OF SAUDI ARABIA</div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
