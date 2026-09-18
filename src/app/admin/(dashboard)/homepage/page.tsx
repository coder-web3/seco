'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Save, Loader2, Image as ImageIcon, Plus, Trash2, CheckCircle2, Layers, ShieldCheck, Building2, Briefcase, ExternalLink, ArrowRight } from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface StatItem {
  id: number;
  label: string;
  value: string;
  prefix?: string | null;
  suffix?: string | null;
  sortOrder: number;
  isVisible: boolean;
}

interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
}

const defaultProcessSteps: ProcessStepItem[] = [
  {
    number: '01',
    title: 'Consult & Understand',
    description: 'We listen to your goals, assess your needs and define the right approach.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '02',
    title: 'Plan & Design',
    description: 'Our team develops detailed plans, technical solutions and timelines for successful execution.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '03',
    title: 'Build & Execute',
    description: 'We bring plans to life with precision, quality materials and strict safety standards.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '04',
    title: 'Monitor & Assure',
    description: 'We maintain rigorous quality control, ensuring every detail meets our high standards.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
  },
  {
    number: '05',
    title: 'Deliver & Support',
    description: 'We complete on time and continue to support for long-term value.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HomepageAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mediaTarget, setMediaTarget] = useState<string | null>(null);

  const [form, setForm] = useState({
    // Hero
    heroBadge: '',
    heroTitle: '',
    heroTitleLine2Green: '',
    heroSubtitle: '',
    heroCtaText: '',
    heroCtaLink: '',
    heroImageUrl: '',

    // About
    aboutKicker: '',
    aboutSnippetTitle: '',
    aboutTitleLine2Green: '',
    aboutSnippetContent: '',
    aboutSnippetImage: '',
    aboutSnippetLink: '',
    aboutCtaText: '',

    // Services
    servicesKicker: '',
    servicesTitleLine1: '',
    servicesTitleLine2Green: '',
    servicesDescription: '',
    servicesImageUrl: '',

    // Process
    processKicker: '',
    processTitleLine1: '',
    processTitleLine2Green: '',
    processDescription: '',
    processConsultationLink: '',
    processImageUrl: '',

    // Projects
    projectsKicker: '',
    projectsTitleLine1: '',
    projectsTitleLine2Green: '',
    projectsDescription: '',
    projectsImageUrl: '',

    // CTA Banner
    ctaTitle: '',
    ctaSubtitle: '',
    ctaButtonText: '',
    ctaButtonLink: '',
  });

  const [processSteps, setProcessSteps] = useState<ProcessStepItem[]>(defaultProcessSteps);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [newStat, setNewStat] = useState({ label: '', value: '', suffix: '+' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [homeRes, statsRes] = await Promise.all([
        fetch('/api/admin/homepage'),
        fetch('/api/admin/homepage-stats'),
      ]);

      if (homeRes.status === 401 || statsRes.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      const homeData = await homeRes.json();
      const statsData = await statsRes.json();

      if (homeData.success && homeData.homepage) {
        const h = homeData.homepage;
        setForm({
          heroBadge: h.heroBadge || 'CONSTRUCTING A BETTER TOMORROW',
          heroTitle: h.heroTitle || 'Spaces Today',
          heroTitleLine2Green: h.heroTitleLine2Green || 'Greater Tomorrow',
          heroSubtitle: h.heroSubtitle || 'At SECO LINE, we build more than structures — we create lasting spaces for people, businesses and communities across Saudi Arabia.',
          heroCtaText: h.heroCtaText || 'Get a Free Quote',
          heroCtaLink: h.heroCtaLink || '/contact',
          heroImageUrl: h.heroImageUrl || '',

          aboutKicker: h.aboutKicker || 'ABOUT SECO LINE',
          aboutSnippetTitle: h.aboutSnippetTitle || 'Built on Trust.',
          aboutTitleLine2Green: h.aboutTitleLine2Green || 'Driven by a Greater Tomorrow.',
          aboutSnippetContent: h.aboutSnippetContent || 'SECO LINE is a Saudi Arabian construction and contracting company committed to building more than structures — we build opportunities, stronger communities and a more sustainable future for the Kingdom.',
          aboutSnippetImage: h.aboutSnippetImage || '/assets/images/about-secoline.jpg',
          aboutSnippetLink: h.aboutSnippetLink || '/about',
          aboutCtaText: h.aboutCtaText || 'Learn More About Us',

          servicesKicker: h.servicesKicker || 'OUR SERVICES',
          servicesTitleLine1: h.servicesTitleLine1 || 'Complete Construction',
          servicesTitleLine2Green: h.servicesTitleLine2Green || 'Solutions for a Brighter Tomorrow',
          servicesDescription: h.servicesDescription || 'From concept to completion, SECO LINE delivers integrated construction and contracting services that create lasting value for people, businesses and communities across Saudi Arabia.',
          servicesImageUrl: h.servicesImageUrl || '/assets/images/about-secoline.jpg',

          processKicker: h.processKicker || 'OUR PROCESS',
          processTitleLine1: h.processTitleLine1 || 'From Vision',
          processTitleLine2Green: h.processTitleLine2Green || 'to a Lasting Reality',
          processDescription: h.processDescription || 'We follow a structured and transparent process to ensure every project is delivered with quality, efficiency and long-term value.',
          processConsultationLink: h.processConsultationLink || '/contact',
          processImageUrl: h.processImageUrl || '/assets/images/about-secoline.jpg',

          projectsKicker: h.projectsKicker || 'FEATURED PROJECTS',
          projectsTitleLine1: h.projectsTitleLine1 || 'Supporting Projects',
          projectsTitleLine2Green: h.projectsTitleLine2Green || 'Across Industries',
          projectsDescription: h.projectsDescription || 'From landmark developments to essential infrastructure, SECO LINE delivers spaces that inspire growth and strengthen communities across Saudi Arabia.',
          projectsImageUrl: h.projectsImageUrl || '/assets/images/about-secoline.jpg',

          ctaTitle: h.ctaTitle || 'Ready to Build Your Next Landmark in Saudi Arabia?',
          ctaSubtitle: h.ctaSubtitle || 'Partner with SECO LINE for world-class construction, engineering, and infrastructure solutions aligned with Saudi Vision 2030.',
          ctaButtonText: h.ctaButtonText || 'Get a Free Quote',
          ctaButtonLink: h.ctaButtonLink || '/contact',
        });

        if (h.processStepsJson) {
          try {
            const parsed = JSON.parse(h.processStepsJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProcessSteps(parsed);
            }
          } catch (e) {
            console.error('Failed to parse process steps JSON', e);
          }
        }
      }

      if (statsData.success && statsData.stats) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error('Failed to load homepage content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      const payload = {
        ...form,
        processStepsJson: JSON.stringify(processSteps),
      };

      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('All homepage sections and cards content saved to database successfully!');
        setTimeout(() => setSuccessMessage(null), 4500);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleProcessStepChange = (index: number, field: keyof ProcessStepItem, value: string) => {
    const updated = [...processSteps];
    updated[index] = { ...updated[index], [field]: value };
    setProcessSteps(updated);
  };

  const handleAddProcessStep = () => {
    const nextNum = (processSteps.length + 1).toString().padStart(2, '0');
    setProcessSteps([
      ...processSteps,
      {
        number: nextNum,
        title: 'New Process Step',
        description: 'Describe what happens during this step of the project.',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
      },
    ]);
  };

  const handleDeleteProcessStep = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
  };

  const handleAddStat = async () => {
    if (!newStat.label || !newStat.value) return;
    try {
      const res = await fetch('/api/admin/homepage-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newStat,
          sortOrder: stats.length + 1,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStats([...stats, data.stat]);
        setNewStat({ label: '', value: '', suffix: '+' });
      }
    } catch (err) {
      console.error('Add stat error:', err);
    }
  };

  const handleDeleteStat = async (id: number) => {
    try {
      await fetch(`/api/admin/homepage-stats?id=${id}`, { method: 'DELETE' });
      setStats(stats.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Delete stat error:', err);
    }
  };

  const handleStatChange = (id: number, field: keyof StatItem, value: any) => {
    setStats(stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSaveStat = async (statItem: StatItem) => {
    try {
      const res = await fetch('/api/admin/homepage-stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statItem),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Counter "${statItem.label}" updated in database!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Update stat error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Homepage Section & Cards Content Manager</h1>
        <p className="text-sm text-slate-500 mt-1">
          Edit titles, green highlights, descriptions, images, and card content for all homepage sections.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 animate-in fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Quick Navigation Banners for Services & Projects Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 rounded-2xl text-white flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Services Cards Manager</span>
            </div>
            <h3 className="text-base font-bold">Manage Public Service Cards</h3>
            <p className="text-xs text-slate-300">Add, edit, or remove service cards & icons</p>
          </div>
          <Link
            href="/admin/services"
            className="px-4 py-2 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <span>Edit Cards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 rounded-2xl text-white flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Projects Cards Manager</span>
            </div>
            <h3 className="text-base font-bold">Manage Bento Portfolio Cards</h3>
            <p className="text-xs text-slate-300">Upload portfolio images & edit project details</p>
          </div>
          <Link
            href="/admin/projects"
            className="px-4 py-2 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <span>Edit Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Hero Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-600" />
              <span>1. Hero Section</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Top Showcase Banner</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Kicker Tag (Top Small Label)
              </label>
              <input
                type="text"
                value={form.heroBadge}
                onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                placeholder="CONSTRUCTING A BETTER TOMORROW"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 1 (Dark Text)
              </label>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                placeholder="Spaces Today"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 2 (Green Gradient Highlight)
              </label>
              <input
                type="text"
                value={form.heroTitleLine2Green}
                onChange={(e) => setForm({ ...form, heroTitleLine2Green: e.target.value })}
                placeholder="Greater Tomorrow"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Hero Subtitle Paragraph
              </label>
              <textarea
                rows={3}
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                placeholder="At SECO LINE, we build more than structures..."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                value={form.heroCtaText}
                onChange={(e) => setForm({ ...form, heroCtaText: e.target.value })}
                placeholder="Get a Free Quote"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Link
              </label>
              <input
                type="text"
                value={form.heroCtaLink}
                onChange={(e) => setForm({ ...form, heroCtaLink: e.target.value })}
                placeholder="/contact"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Hero Background Image
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.heroImageUrl}
                  onChange={(e) => setForm({ ...form, heroImageUrl: e.target.value })}
                  placeholder="/uploads/... or https://..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('hero')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. About SECO LINE Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>2. About SECO LINE Section</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Chamfer Frame & Glass Badge</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Kicker Tag
              </label>
              <input
                type="text"
                value={form.aboutKicker}
                onChange={(e) => setForm({ ...form, aboutKicker: e.target.value })}
                placeholder="ABOUT SECO LINE"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Headline Line 1 (Dark Text)
              </label>
              <input
                type="text"
                value={form.aboutSnippetTitle}
                onChange={(e) => setForm({ ...form, aboutSnippetTitle: e.target.value })}
                placeholder="Built on Trust."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Headline Line 2 (Green Gradient Highlight)
              </label>
              <input
                type="text"
                value={form.aboutTitleLine2Green}
                onChange={(e) => setForm({ ...form, aboutTitleLine2Green: e.target.value })}
                placeholder="Driven by a Greater Tomorrow."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                About Description Paragraph
              </label>
              <textarea
                rows={3}
                value={form.aboutSnippetContent}
                onChange={(e) => setForm({ ...form, aboutSnippetContent: e.target.value })}
                placeholder="SECO LINE is a Saudi Arabian construction and contracting company..."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={form.aboutCtaText}
                onChange={(e) => setForm({ ...form, aboutCtaText: e.target.value })}
                placeholder="Learn More About Us"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Button Link
              </label>
              <input
                type="text"
                value={form.aboutSnippetLink}
                onChange={(e) => setForm({ ...form, aboutSnippetLink: e.target.value })}
                placeholder="/about"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                About Section Artwork Image (PNG / Photo)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.aboutSnippetImage}
                  onChange={(e) => setForm({ ...form, aboutSnippetImage: e.target.value })}
                  placeholder="/uploads/... or /assets/images/about-secoline.jpg"
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('about')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Our Services Section Header & Cards Link */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>3. Our Services Section</span>
            </h2>
            <Link
              href="/admin/services"
              className="text-xs text-[#008738] hover:underline font-bold flex items-center gap-1"
            >
              <span>Manage Service Cards</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Kicker Tag
              </label>
              <input
                type="text"
                value={form.servicesKicker}
                onChange={(e) => setForm({ ...form, servicesKicker: e.target.value })}
                placeholder="OUR SERVICES"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 1 (Dark Text)
              </label>
              <input
                type="text"
                value={form.servicesTitleLine1}
                onChange={(e) => setForm({ ...form, servicesTitleLine1: e.target.value })}
                placeholder="Complete Construction"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 2 (Green Gradient Highlight)
              </label>
              <input
                type="text"
                value={form.servicesTitleLine2Green}
                onChange={(e) => setForm({ ...form, servicesTitleLine2Green: e.target.value })}
                placeholder="Solutions for a Brighter Tomorrow"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Services Description Paragraph
              </label>
              <textarea
                rows={2}
                value={form.servicesDescription}
                onChange={(e) => setForm({ ...form, servicesDescription: e.target.value })}
                placeholder="From concept to completion, SECO LINE delivers..."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Services Right Banner Image (Skyline / Architectural Photo)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.servicesImageUrl}
                  onChange={(e) => setForm({ ...form, servicesImageUrl: e.target.value })}
                  placeholder="/assets/images/about-secoline.jpg or /uploads/..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('services')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Call-to-Action Banner Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span>4. Call-to-Action Banner Section</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">1600px Dark Luxury Banner</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                CTA Banner Title
              </label>
              <input
                type="text"
                value={form.ctaTitle}
                onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
                placeholder="Ready to Build Your Next Landmark in Saudi Arabia?"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                CTA Banner Subtitle / Paragraph
              </label>
              <textarea
                rows={2}
                value={form.ctaSubtitle}
                onChange={(e) => setForm({ ...form, ctaSubtitle: e.target.value })}
                placeholder="Partner with SECO LINE for world-class construction..."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                value={form.ctaButtonText}
                onChange={(e) => setForm({ ...form, ctaButtonText: e.target.value })}
                placeholder="Get a Free Quote"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Button Link
              </label>
              <input
                type="text"
                value={form.ctaButtonLink}
                onChange={(e) => setForm({ ...form, ctaButtonLink: e.target.value })}
                placeholder="/contact"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Our Process Section Header & Interactive Step Cards Editor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>4. Our Process Section & Step Cards</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Animated Laser Wave Flow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Kicker Tag
              </label>
              <input
                type="text"
                value={form.processKicker}
                onChange={(e) => setForm({ ...form, processKicker: e.target.value })}
                placeholder="OUR PROCESS"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 1 (Dark Text)
              </label>
              <input
                type="text"
                value={form.processTitleLine1}
                onChange={(e) => setForm({ ...form, processTitleLine1: e.target.value })}
                placeholder="From Vision"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 2 (Green Gradient Highlight)
              </label>
              <input
                type="text"
                value={form.processTitleLine2Green}
                onChange={(e) => setForm({ ...form, processTitleLine2Green: e.target.value })}
                placeholder="to a Lasting Reality"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Process Description Paragraph
              </label>
              <textarea
                rows={2}
                value={form.processDescription}
                onChange={(e) => setForm({ ...form, processDescription: e.target.value })}
                placeholder="We follow a structured and transparent process..."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Consultation CTA Link
              </label>
              <input
                type="text"
                value={form.processConsultationLink}
                onChange={(e) => setForm({ ...form, processConsultationLink: e.target.value })}
                placeholder="/contact"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Process Right Banner Image (Skyline / Architectural Photo)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.processImageUrl}
                  onChange={(e) => setForm({ ...form, processImageUrl: e.target.value })}
                  placeholder="/assets/images/about-secoline.jpg or /uploads/..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('process')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Process Step Cards Editor */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Process Flow Step Cards ({processSteps.length} Steps)
              </h3>
              <button
                type="button"
                onClick={handleAddProcessStep}
                className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-lg flex items-center gap-1.5 transition border border-emerald-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step Card</span>
              </button>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#008738]">
                      Step {step.number || `0${idx + 1}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteProcessStep(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Delete Step Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Step Number</label>
                      <input
                        type="text"
                        value={step.number}
                        onChange={(e) => handleProcessStepChange(idx, 'number', e.target.value)}
                        placeholder="01"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-9">
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Step Title</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleProcessStepChange(idx, 'title', e.target.value)}
                        placeholder="e.g. Consult & Understand"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-semibold focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Step Description</label>
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => handleProcessStepChange(idx, 'description', e.target.value)}
                        placeholder="Brief summary of what happens in this process step..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Step Thumbnail Image URL</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={step.imageUrl}
                          onChange={(e) => handleProcessStepChange(idx, 'imageUrl', e.target.value)}
                          placeholder="https://... or /uploads/..."
                          className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setMediaTarget(`processStep_${idx}`)}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 hover:bg-slate-100 transition"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Media</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Featured Projects Section Header & Bento Projects Link */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>5. Featured Projects Section</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs text-[#008738] hover:underline font-bold flex items-center gap-1"
            >
              <span>Manage Bento Projects</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Kicker Tag
              </label>
              <input
                type="text"
                value={form.projectsKicker}
                onChange={(e) => setForm({ ...form, projectsKicker: e.target.value })}
                placeholder="FEATURED PROJECTS"
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 1 (Dark Text)
              </label>
              <input
                type="text"
                value={form.projectsTitleLine1}
                onChange={(e) => setForm({ ...form, projectsTitleLine1: e.target.value })}
                placeholder="Real Projects."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Title Line 2 (Green Gradient Highlight)
              </label>
              <input
                type="text"
                value={form.projectsTitleLine2Green}
                onChange={(e) => setForm({ ...form, projectsTitleLine2Green: e.target.value })}
                placeholder="Lasting Impact."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Projects Description Paragraph
              </label>
              <textarea
                rows={2}
                value={form.projectsDescription}
                onChange={(e) => setForm({ ...form, projectsDescription: e.target.value })}
                placeholder="From landmark developments to essential infrastructure..."
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Section Facade / Background Image
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.projectsImageUrl}
                  onChange={(e) => setForm({ ...form, projectsImageUrl: e.target.value })}
                  placeholder="/assets/images/about-secoline.jpg or /uploads/..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('projects')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-[#008738] hover:bg-[#00702e] text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-700/20 flex items-center gap-2 transition disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Content to MySQL...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Homepage Sections & Cards</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* 6. Stats Management Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Homepage Statistics & Live Counter Strip</h2>
            <p className="text-xs text-slate-500 mt-0.5">Edit counter values, suffixes, and labels live on the homepage strip.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#008738]">Counter #{s.id}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteStat(s.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition"
                  title="Delete Counter"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Value</label>
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) => handleStatChange(s.id, 'value', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg font-bold text-[#008738] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Suffix</label>
                  <input
                    type="text"
                    value={s.suffix || ''}
                    onChange={(e) => handleStatChange(s.id, 'suffix', e.target.value)}
                    className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg font-bold text-[#008738] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Label</label>
                <input
                  type="text"
                  value={s.label}
                  onChange={(e) => handleStatChange(s.id, 'label', e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSaveStat(s)}
                className="w-full py-1.5 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 shadow-sm"
              >
                <Save className="w-3 h-3" />
                <span>Save Counter</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add new stat counter */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Counter Label</label>
            <input
              type="text"
              placeholder="e.g. Projects Delivered"
              value={newStat.label}
              onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
            />
          </div>
          <div className="w-28">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Value</label>
            <input
              type="text"
              placeholder="250"
              value={newStat.value}
              onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
            />
          </div>
          <div className="w-20">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Suffix</label>
            <input
              type="text"
              placeholder="+"
              value={newStat.suffix}
              onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            className="px-4 py-2 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Counter</span>
          </button>
        </div>
      </div>

      <MediaPickerModal
        isOpen={mediaTarget !== null}
        onClose={() => setMediaTarget(null)}
        onSelect={(url) => {
          if (mediaTarget === 'hero') setForm({ ...form, heroImageUrl: url });
          else if (mediaTarget === 'about') setForm({ ...form, aboutSnippetImage: url });
          else if (mediaTarget === 'services') setForm({ ...form, servicesImageUrl: url });
          else if (mediaTarget === 'process') setForm({ ...form, processImageUrl: url });
          else if (mediaTarget === 'projects') setForm({ ...form, projectsImageUrl: url });
          else if (mediaTarget && mediaTarget.startsWith('processStep_')) {
            const index = parseInt(mediaTarget.replace('processStep_', ''), 10);
            if (!isNaN(index)) {
              handleProcessStepChange(index, 'imageUrl', url);
            }
          }
        }}
        title="Select Image from Media Library"
      />
    </div>
  );
}
