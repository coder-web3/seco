'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ClipboardList, ShieldCheck, CheckCircle2, Rocket } from 'lucide-react';

interface ServiceDetailProcessProps {
  kicker?: string;
  title1?: string;
  title2Green?: string;
  subtitle?: string;
  processStepsJson?: string;
}

export default function ServiceDetailProcess({
  kicker = 'EXECUTION METHODOLOGY',
  title1 = 'Our Structured',
  title2Green = '4-Step Execution Process',
  subtitle = 'From initial consultation to final testing and commissioning, our structured workflow ensures flawless execution across every project milestone.',
  processStepsJson,
}: ServiceDetailProcessProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const defaultSteps = [
    {
      num: '01',
      title: 'Consultation & Technical Scope',
      description: 'In-depth assessment of engineering specifications, site conditions, client requirements, and safety compliance.',
      icon: ClipboardList,
    },
    {
      num: '02',
      title: 'Resource Planning & Mobilization',
      description: 'Allocation of certified equipment, skilled manpower, materials, and comprehensive HSE risk mitigation setup.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Safe Execution & Quality Audits',
      description: 'Field execution conducted under strict Aramco & ISO safety standards with continuous QA/QC inspection milestones.',
      icon: CheckCircle2,
    },
    {
      num: '04',
      title: 'Testing, Commissioning & Handover',
      description: 'Final load testing, quality certification, documentation sign-off, and seamless project commissioning.',
      icon: Rocket,
    },
  ];

  const defaultIcons = [ClipboardList, ShieldCheck, CheckCircle2, Rocket];

  let steps = defaultSteps;
  if (processStepsJson) {
    try {
      const parsed = JSON.parse(processStepsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        steps = parsed.map((item: any, idx: number) => ({
          num: item.num || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
          title: item.title || `Phase ${idx + 1}`,
          description: item.description || '',
          icon: defaultIcons[idx % defaultIcons.length],
        }));
      }
    } catch (err) {
      console.error('Error parsing processStepsJson:', err);
    }
  }

  return (
    <section ref={sectionRef} className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12 font-sans select-none">
      
      {/* Section Header */}
      <div className={`space-y-2.5 max-w-2xl border-b border-slate-200/80 pb-4 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#15B83E] font-heading">
          <span className="w-5 h-[2px] bg-[#15B83E] shadow-[0_0_8px_#15B83E]" />
          <span>{kicker}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0D2137] tracking-tight leading-[1.12] font-heading">
          {title1} <span className="text-[#15B83E] font-semibold">{title2Green}</span>
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`group relative bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-[#15B83E]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + idx * 80}ms` }}
            >
              {/* Background Step Number Watermark */}
              <div className="absolute top-2.5 right-4 text-3xl font-bold font-mono text-slate-100 group-hover:text-[#15B83E]/15 transition-colors">
                {step.num}
              </div>

              <div className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#15B83E] flex items-center justify-center group-hover:bg-[#15B83E] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#15B83E]">
                    PHASE {step.num}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#0D2137] font-heading leading-snug group-hover:text-[#15B83E] transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
