import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'services' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Our Services - Seko Agency',
    description: seo?.metaDescription || 'Explore our full capabilities in modern software architecture, custom CMS, cloud pipelines, and UI/UX.',
  };
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  }).catch(() => []);

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Core Competencies</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Capabilities & Solutions
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          From custom database-driven applications to resilient cloud infrastructure, we deliver end-to-end technical excellence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold font-mono text-slate-400">
                  0{index + 1}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {service.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {service.excerpt || service.content}
              </p>

              {service.imageUrl && (
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mt-4 border border-slate-100">
                  <img src={service.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                <span>Read Full Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Inquire
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
