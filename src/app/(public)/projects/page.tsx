import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProjectsHero from '@/components/public/ProjectsHero';
import ProjectsClientGrid from '@/components/public/ProjectsClientGrid';
import { 
  ShieldCheck, 
  Award, 
  Globe2, 
  Clock, 
  FileCheck, 
  PhoneCall, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'projects' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Projects & Portfolio - SECO LINE Contracting & Material Supply',
    description: seo?.metaDescription || 'Explore executed industrial, civil, piping, MEP, and equipment supply mega-projects delivered for Saudi Aramco, SABIC, SEC, and major EPC contractors across Saudi Arabia.',
  };
}

export default async function ProjectsPage() {
  const [dbProjects, dbHero] = await Promise.all([
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    }).catch(() => []),
    (prisma as any).projectsHeroSetting?.findFirst().catch(() => null) ?? Promise.resolve(null),
  ]);

  const formattedProjects = dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    client: p.client || 'Saudi Arabia Enterprise Client',
    category: p.category || 'Contracting & Execution',
    excerpt: p.excerpt || p.content || '',
    coverImage: p.coverImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    location: 'Saudi Arabia',
    year: '2025',
  }));

  const heroProps = dbHero ? {
    kicker: dbHero.kicker || 'OUR PORTFOLIO',
    titleLine1: dbHero.titleLine1 || 'Delivered Landmark',
    titleLine2: dbHero.titleLine2 || 'Industrial & Civil',
    titleGreen: dbHero.titleGreen || 'Projects',
    subtitle: dbHero.subtitle || 'Explore landmark contracting executions, high-pressure piping installations, structural steel fabrication, and material supply delivered for Saudi Aramco, SABIC, SEC, and major EPC partners across',
    badge1Text: dbHero.badge1Text || 'Safety Excellence',
    badge2Text: dbHero.badge2Text || 'Aramco Certified',
    badge3Text: dbHero.badge3Text || 'Kingdom Logistics',
    stat1Value: dbHero.stat1Value || '150+',
    stat1Label: dbHero.stat1Label || 'Projects Delivered',
    stat2Value: dbHero.stat2Value || '100%',
    stat2Label: dbHero.stat2Label || 'Aramco & ISO Compliant',
    stat3Value: dbHero.stat3Value || 'SAR 500M+',
    stat3Label: dbHero.stat3Label || 'Contracting Volume',
    bgImageUrl: dbHero.bgImageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    overlayImageUrl: dbHero.overlayImageUrl || undefined,
  } : undefined;

  const valueProps = [
    {
      title: 'Zero Incident Safety Record',
      desc: 'Strict adherence to Aramco HSE guidelines, site risk assessments, and zero LTI standards across all field operations.',
      icon: ShieldCheck,
    },
    {
      title: 'Aramco & SABIC Certified Execution',
      desc: 'All projects executed strictly under Kingdom standards, 01-SAMSS specs, and international ASTM/ASME codes.',
      icon: Award,
    },
    {
      title: 'Kingdom-Wide Site Mobilization',
      desc: 'Rapid deployment of certified manpower, heavy machinery, scaffolding, and piping materials across Jubail, Yanbu, Dammam, and NEOM.',
      icon: Globe2,
    },
    {
      title: 'Full Documentation & Traceability',
      desc: 'Complete QA/QC sign-off, hydrostatic pressure testing logs, and Material Test Certificates (MTC 3.1) provided with every delivery.',
      icon: FileCheck,
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 select-none font-sans bg-slate-50/50">
      
      {/* 1. Ultra-Premium Full Width Hero Banner */}
      <ProjectsHero {...heroProps} />

      {/* 2. Interactive Projects Filter & Non-Clickable Card Showcase Grid */}
      <ProjectsClientGrid initialProjects={formattedProjects} />

      {/* 3. The SECO Execution Standard (Value Proposition Grid) */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-4">
        <div className="bg-[#050C16] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#15B83E]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-10">
            
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#15B83E] font-mono">
                <span className="w-5 h-[2px] bg-[#15B83E]" />
                <span>THE SECO EXECUTION STANDARD</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                Engineering <span className="text-[#15B83E]">Precision & Reliability</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We combine deep technical expertise, certified quality assurance, and rapid Saudi Arabia logistics to execute mega-projects on schedule without compromising safety.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueProps.map((vp, idx) => {
                const VpIcon = vp.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-[#15B83E]/50 transition-all duration-300 space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#15B83E]/10 border border-[#15B83E]/30 flex items-center justify-center text-[#15B83E]">
                      <VpIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading">{vp.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{vp.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Bottom Project Enquiry CTA Banner */}
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-2">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-[#070E18] via-[#0D1F35] to-[#070E18] p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#15B83E] font-mono">
              <span>HAVE A STRATEGIC PROJECT REQUIREMENT?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Talk to Our Contracting & Material Sourcing Division
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Partner with SECO LINE for high-pressure piping supply, civil execution, MEP engineering, equipment rental, or certified technical manpower.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 whitespace-nowrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#15B83E] hover:bg-[#129c35] text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_4px_30px_rgba(21,184,62,0.45)] transition-all duration-300 hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Submit Project Inquiry</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
