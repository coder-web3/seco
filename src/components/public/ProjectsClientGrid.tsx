'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export interface ProjectCardItem {
  id: string | number;
  title: string;
  slug?: string;
  client?: string | null;
  category?: string | null;
  excerpt?: string | null;
  coverImage?: string | null;
  location?: string | null;
  year?: string | null;
}

interface ProjectsClientGridProps {
  initialProjects?: ProjectCardItem[];
}

export default function ProjectsClientGrid({ initialProjects = [] }: ProjectsClientGridProps) {
  const projectsList = initialProjects;

  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 space-y-8 py-4 select-none">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
            <span className="w-6 h-[2px] bg-[#15B83E]" />
            <span>FEATURED PORTFOLIO & CASE STUDIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
            Executed{' '}
            <span className="bg-gradient-to-r from-[#084BA4] via-[#009E38] to-[#15B83E] bg-clip-text text-transparent font-bold">
              Mega-Projects
            </span>{' '}
            & Deliveries
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium font-sans">
            High-precision engineering and supply executions across Jubail, Yanbu, Dammam, Riyadh, and NEOM.
          </p>
        </div>
      </div>

      {/* Projects Cards Grid (NON-CLICKABLE cards, NO arrow buttons) */}
      {projectsList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">No projects available</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {projectsList.map((project, idx) => (
            <div
              key={project.id || idx}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group cursor-default"
            >
              {/* Card Media Header */}
              <div>
                <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 font-mono text-xs">
                      {project.title}
                    </div>
                  )}

                  {/* Dark Ambient Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3.5 py-1 bg-slate-950/80 backdrop-blur-md text-emerald-400 font-mono text-[11px] font-bold rounded-full border border-emerald-500/40 shadow-md">
                      {project.category || 'CONTRACTING'}
                    </span>
                  </div>

                  {/* Top Right Location / Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-slate-200 font-mono text-[10px] font-semibold rounded-full border border-slate-700 shadow-md">
                      {project.location || 'Saudi Arabia'}
                    </span>
                  </div>

                  {/* Bottom Title Accent on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      DELIVERED & OPERATIONAL
                    </span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5 text-[#15B83E] flex-shrink-0" />
                    <span className="line-clamp-1">{project.client || 'Saudi Arabia Partner'}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0D2137] font-heading leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-medium">
                    {project.excerpt || 'High-spec engineering, material supply, and turnkey contracting execution delivered under strict Aramco and Kingdom safety standards.'}
                  </p>
                </div>
              </div>

              {/* Spec Highlights Footer (NO ARROW BUTTON, NO CLICKABLE LINK) */}
              <div className="px-6 sm:px-7 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-medium">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-[#15B83E]" />
                  <span className="line-clamp-1">{project.location?.split(',')[0] || 'KSA Site'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ISO & Aramco Spec</span>
                </div>

                <div className="flex items-center gap-1 text-[#129c35] font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Verified</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}
