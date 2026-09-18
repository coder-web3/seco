import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Briefcase, ArrowRight, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await prisma.seoSetting.findUnique({ where: { pageKey: 'projects' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Projects & Portfolio - Seko Agency',
    description: seo?.metaDescription || 'Explore case studies and bespoke software solutions we have engineered for market leaders.',
  };
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  }).catch(() => []);

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Featured Portfolio</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Delivered Client Work
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Explore production web applications, enterprise dashboards, and digital products we’ve architected.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">
                    {project.title}
                  </div>
                )}
                {project.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-lg">
                    {project.category}
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-xs font-semibold text-slate-400 mb-1">{project.client}</p>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {project.title}
                </h2>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {project.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center text-xs font-semibold text-indigo-600 gap-1 group-hover:gap-2 transition-all">
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
