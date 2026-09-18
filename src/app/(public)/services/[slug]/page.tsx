import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} - Seko Agency`,
    description: service.excerpt || `Full details and capabilities for ${service.title}.`,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!service || !service.isPublished) {
    notFound();
  }

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all services</span>
        </Link>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {service.title}
        </h1>

        {service.excerpt && (
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            {service.excerpt}
          </p>
        )}
      </div>

      {service.imageUrl && (
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] bg-slate-100">
          <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Service Overview & Capabilities</h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {service.content || 'Comprehensive solution crafted according to your enterprise requirements.'}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Ready to implement this solution?</h3>
          <p className="text-xs text-indigo-100 mt-1">Get in touch with our engineering group to discuss scope and timelines.</p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-white text-indigo-600 font-bold text-xs rounded-xl shadow-md transition hover:bg-indigo-50 flex items-center gap-2 whitespace-nowrap"
        >
          <span>Request a Quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
