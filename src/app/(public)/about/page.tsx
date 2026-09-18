import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight, CheckCircle2, ShieldCheck, Target, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'about' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'About Us - SECO LINE',
    description: seo?.metaDescription || 'Learn about our engineering philosophy, team, and track record.',
  };
}

export default async function AboutPage() {
  const about = await prisma.aboutPage.findFirst().catch(() => null);

  const heading = about?.heading || 'Building the Future of Web & Enterprise Technology';
  const subheading = about?.subheading || 'A dedicated team of technologists, strategists, and designers committed to exceptional craft.';
  const story = about?.story || 'Founded with a clear vision to bridge high-performance engineering with modern user-centric design, SECO LINE has evolved into a premier digital partner.';
  const mission = about?.mission || 'To empower forward-thinking organizations with resilient, high-speed, and secure digital platforms.';
  const vision = about?.vision || 'To be the global benchmark for bespoke software craftsmanship.';
  const experienceYears = about?.experienceYears || '8+';
  const imageUrl = about?.imageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
  const secondaryImageUrl = about?.secondaryImageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Company Overview</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {heading}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {subheading}
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] bg-slate-100">
          <img src={imageUrl} alt="Studio workspace" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] md:aspect-auto bg-slate-100 relative">
          <img src={secondaryImageUrl} alt="Engineering session" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-3xl font-extrabold">{experienceYears}</span>
            <span className="text-xs text-slate-200">Years of continuous engineering excellence</span>
          </div>
        </div>
      </div>

      {/* Narrative Story */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-slate-900">Our Origins & Approach</h2>
          <div className="whitespace-pre-line space-y-4">
            {story}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50/60 border border-indigo-100 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{mission}</p>
        </div>

        <div className="bg-violet-50/60 border border-violet-100 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-md shadow-violet-600/20">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{vision}</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-slate-900 text-white rounded-3xl p-10 space-y-4">
        <h2 className="text-2xl font-bold">Have a project in mind?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Let’s discuss your technical goals and how our custom database-driven solutions can accelerate your deliverables.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
