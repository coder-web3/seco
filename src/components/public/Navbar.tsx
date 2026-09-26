'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, PhoneCall, Mail, MapPin, Clock, Phone, Linkedin, Instagram, Twitter } from 'lucide-react';

interface NavbarProps {
  siteName?: string;
  logoUrl?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  address?: string | null;
  workingHours?: string | null;
  socialLinks?: string | null;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Trading Services', href: '/trading-services' },
  { label: 'Contracting Services', href: '/contracting-services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ 
  siteName = 'SECO LINE', 
  logoUrl, 
  contactPhone,
  contactEmail,
  address,
  workingHours,
  socialLinks,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(logoUrl || '/assets/images/logo.png');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let socials: any = {};
  try {
    socials = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks || {};
  } catch {
    socials = {};
  }

  const phoneDisplay = contactPhone || '+966 11 123 4567';
  const emailDisplay = contactEmail || 'info@secoline.sa';
  const addressDisplay = address || 'Riyadh, Saudi Arabia';
  const hoursDisplay = workingHours || 'Sun - Thu: 8:00 AM - 5:00 PM';

  return (
    <header className="sticky top-0 z-50 font-sans">
      
      {/* Top Bar: Contact Info & Socials */}
      <div className="relative bg-gradient-to-r from-[#050B14] via-[#091526] to-[#050B14] text-slate-300 border-b border-slate-800/80 py-2 sm:py-2.5 px-3 sm:px-8 text-xs font-sans">
        {/* Subtle Green Laser Accent Line on Bottom of Top Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#15B83E]/70 to-transparent pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto flex items-center justify-start sm:justify-between gap-2.5 sm:gap-4 overflow-x-auto whitespace-nowrap [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10 py-0.5">
          
          {/* Left: Email & Address Pill Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 font-medium flex-shrink-0">
            <a href={`mailto:${emailDisplay}`} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#15B83E]/60 px-3.5 py-1 rounded-full backdrop-blur-md transition-all duration-300 hover:text-white flex-shrink-0">
              <Mail className="w-3.5 h-3.5 text-[#15B83E]" />
              <span>{emailDisplay}</span>
            </a>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full backdrop-blur-md flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#15B83E]" />
              <span>{addressDisplay}</span>
            </div>
          </div>

          {/* Right: Phone & Social Media Glass Badges */}
          <div className="flex items-center gap-2.5 sm:gap-4 font-medium flex-shrink-0">
            <a href={`tel:${phoneDisplay.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 bg-[#15B83E]/10 hover:bg-[#15B83E]/20 border border-[#15B83E]/40 px-3.5 py-1 rounded-full text-[#15B83E] hover:text-white transition-all duration-300 font-mono font-bold flex-shrink-0">
              <Phone className="w-3.5 h-3.5" />
              <span>{phoneDisplay}</span>
            </a>

            <div className="w-px h-3.5 bg-slate-800 flex-shrink-0" />

            <div className="flex items-center gap-2 flex-shrink-0">
              <a href={socials.linkedin || '#'} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href={socials.instagram || '#'} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href={socials.twitter || '#'} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 border border-white/10 hover:border-[#15B83E] hover:text-[#15B83E] text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0" aria-label="X Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Floating Header Navbar */}
      <div className={`transition-all duration-300 pt-2 pb-2 px-3 sm:px-5 lg:px-8 ${
        scrolled ? 'bg-slate-900/10 backdrop-blur-xl py-1.5' : 'bg-transparent'
      }`}>
        <div className="max-w-[1600px] mx-auto bg-white/95 backdrop-blur-2xl rounded-2xl lg:rounded-full shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100/80 flex items-center justify-between p-2 lg:p-2 lg:pr-2.5 transition-all duration-300 hover:shadow-[0_16px_50px_-10px_rgba(0,0,0,0.12)]">
        
        {/* Left Section: Brand Logo */}
        <div className="flex items-center gap-3.5 pl-2 sm:pl-4">
          <Link href="/" className="flex items-center gap-3 group">
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt={siteName} 
                className="h-11 sm:h-13 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 [image-rendering:-webkit-optimize-contrast]"
                onError={() => setLogoSrc(null)} 
              />
            ) : (
              <div className="flex items-center gap-3.5">
                {/* Premium Vector Ribbon S Logo with Gradient & Subtle Hover Animation */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                    <path
                      d="M20 35 C20 18, 45 15, 65 25 C85 35, 80 55, 55 60 L35 65 C15 70, 15 90, 40 95 C65 100, 85 85, 85 70"
                      stroke="url(#blue-grad-nav)"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <path
                      d="M80 65 C80 82, 55 85, 35 75 C15 65, 20 45, 45 40 L65 35 C85 30, 85 10, 60 5 C35 0, 15 15, 15 30"
                      stroke="url(#green-grad-nav)"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="blue-grad-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0052CC" />
                        <stop offset="100%" stopColor="#00A3FF" />
                      </linearGradient>
                      <linearGradient id="green-grad-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00C853" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                {/* Brand Name */}
                <div className="flex flex-col leading-none">
                  <div className="flex items-center text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                    <span className="text-[#07192C]">SECO</span>
                    <span className="text-[#00C853] ml-1">LINE</span>
                  </div>
                  <span className="text-sm font-bold text-[#07192C] tracking-wider mt-1 font-sans dir-rtl">
                    سيكو لاين
                  </span>
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Center Navigation Links: Ultra-Unique Glass Morphic Pills */}
        <nav className="hidden lg:flex items-center gap-2 bg-slate-900/5 p-1.5 rounded-full border border-slate-200/80 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-xs sm:text-sm font-bold tracking-wide uppercase font-heading rounded-full transition-all duration-300 group flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#07192C] to-[#0D2B4A] text-white border-[#15B83E]/60 shadow-[0_4px_14px_rgba(7,25,44,0.35)] scale-[1.03]'
                    : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/90 hover:border-[#008738] hover:text-[#008738] hover:shadow-md'
                }`}
              >
                <span>{link.label}</span>
                {isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15B83E] shadow-[0_0_8px_#15B83E] animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008738] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Phone & CTA */}
        <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
          {/* Right Dark Blue Curved Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#07192C] via-[#0D2B4A] to-[#123A63] text-white rounded-full p-1.5 pl-4 flex items-center gap-3 sm:gap-4 shadow-md shadow-slate-900/10">
            {/* Phone Call Button */}
            <a
              href={`tel:${phoneDisplay.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2.5 group hover:opacity-95 transition"
            >
              <div className="relative w-9 h-9 rounded-full bg-[#0052CC] flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <span className="absolute inset-0 rounded-full bg-blue-400/40 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                <PhoneCall className="w-4 h-4 relative z-10" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-300 font-medium leading-tight">Call Us Anytime</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {phoneDisplay}
                </span>
              </div>
            </a>

            {/* Shimmer CTA Button */}
            <Link
              href="/contact"
              className="relative overflow-hidden group bg-gradient-to-r from-[#00D056] to-[#00B84B] hover:from-[#00E55E] hover:to-[#00C853] text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all duration-300 active:scale-95"
            >
              {/* Shimmer Overlay */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10">Get a Quote</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Mobile Actions & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={`tel:${phoneDisplay.replace(/[^0-9+]/g, '')}`}
            className="w-9 h-9 rounded-full bg-[#0052CC] hover:bg-blue-700 text-white flex items-center justify-center shadow-md active:scale-95 transition"
            aria-label="Call Us"
            title={`Call ${phoneDisplay}`}
          >
            <PhoneCall className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden max-w-[1440px] mx-auto mt-2 bg-white/98 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-slate-100 space-y-3 animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between transition ${
                    isActive
                      ? 'bg-[#E8F8EE] text-[#00A843] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00C853]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <a
              href={`tel:${phoneDisplay.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#07192C] to-[#123A63] text-white rounded-xl text-sm font-semibold shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0052CC] flex items-center justify-center text-white">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <span>Call Us: {phoneDisplay}</span>
              </div>
            </a>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#00D056] to-[#00B84B] text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-sm"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
