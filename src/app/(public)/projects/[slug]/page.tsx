import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  }).catch(() => null);

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} - Seko Agency Portfolio`,
    description: project.excerpt || `Case study and architectural overview for ${project.title}.`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
    },
  }).catch(() => null);

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <div className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all projects</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          {project.category && (
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100">
              {project.category}
            </span>
          )}
          {project.client && (
            <span className="text-xs text-slate-500">
              Client: <strong className="text-slate-800">{project.client}</strong>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {project.title}
        </h1>

        {project.excerpt && (
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            {project.excerpt}
          </p>
        )}
      </div>

      {project.coverImage && (
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/9] bg-slate-100">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Case Study Details */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Project Overview & Architecture</h2>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {project.content || project.excerpt}
        </div>
      </div>

      {/* Gallery Screenshots */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Project Gallery & Interfaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((img) => (
              <div key={img.id} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 aspect-[4/3]">
                <img src={img.mediaUrl} alt={img.caption || ''} className="w-full h-full object-cover" />
                {img.caption && (
                  <div className="p-3 bg-white text-xs text-slate-600 border-t border-slate-100">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Inspired by this project?</h3>
          <p className="text-xs text-slate-300 mt-1">Let’s discuss building something equally remarkable for your team.</p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 whitespace-nowrap"
        >
          <span>Schedule a Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
