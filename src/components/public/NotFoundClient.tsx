'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  ArrowLeft,
  Compass,
  Layers,
  PackageCheck,
  Briefcase,
  Mail,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function NotFoundClient() {
  const quickLinks = [
    {
      title: 'Home',
      desc: 'Return to our main landing page',
      href: '/',
      icon: Home,
      color: 'bg-emerald-50 text-[#008738] border-emerald-200/80',
    },
    {
      title: 'Contracting Services',
      desc: 'Civil, electromechanical & industrial solutions',
      href: '/contracting-services',
      icon: Layers,
      color: 'bg-blue-50 text-blue-700 border-blue-200/80',
    },
    {
      title: 'Trading Services',
      desc: 'Material supply, equipment & logistics',
      href: '/trading-services',
      icon: PackageCheck,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    },
    {
      title: 'Projects & Portfolio',
      desc: 'Explore our completed industrial works',
      href: '/projects',
      icon: Briefcase,
      color: 'bg-amber-50 text-amber-700 border-amber-200/80',
    },
    {
      title: 'Contact Us',
      desc: 'Get in touch with our team directly',
      href: '/contact',
      icon: Mail,
      color: 'bg-teal-50 text-teal-700 border-teal-200/80',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto">
      {/* Kicker Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008738] font-heading text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
        <ShieldAlert className="w-3.5 h-3.5 text-[#008738]" />
        <span>Error 404 • Page Not Found</span>
      </div>

      {/* Reduced 404 Number Display */}
      <div className="relative mb-2 select-none">
        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-extrabold text-[#008738] tracking-tight leading-none">
          404
        </h1>
      </div>

      {/* Reduced Headline */}
      <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight max-w-lg mt-2">
        Page Not Found
      </h2>

      {/* Reduced Subtitle */}
      <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-md mt-2 leading-relaxed font-normal">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>

      {/* Primary Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008738] hover:bg-[#00702e] text-white font-heading font-bold text-xs shadow-md shadow-[#008738]/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        <button
          onClick={() => typeof window !== 'undefined' && window.history.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-heading font-bold text-xs shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Go Back</span>
        </button>
      </div>

      {/* Quick Navigation Destination Grid */}
      <div className="mt-12 w-full text-left bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <h3 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#008738]" />
            <span>Popular Destinations</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group p-3.5 rounded-xl bg-slate-50/70 hover:bg-emerald-50/40 border border-slate-200/70 hover:border-emerald-200 transition-all duration-200 flex items-start gap-3"
              >
                <div className={`p-2 rounded-lg border ${link.color} shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs text-slate-900 group-hover:text-[#008738] transition-colors">
                      {link.title}
                    </h4>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#008738] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="font-sans text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {link.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
