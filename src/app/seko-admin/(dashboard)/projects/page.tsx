'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit, Trash2, Check, X, Loader2, Image as ImageIcon, Star, Sparkles, CheckCircle2, Upload, Save, Edit3 } from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface ProjectImage {
  id?: number;
  mediaUrl: string;
  caption?: string;
  sortOrder?: number;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  client?: string | null;
  category?: string | null;
  excerpt?: string | null;
  content?: string | null;
  coverImage?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  images?: ProjectImage[];
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'gallery' | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    client: '',
    category: '',
    excerpt: '',
    content: '',
    coverImage: '',
    isFeatured: false,
    isPublished: true,
    sortOrder: 0,
    images: [] as string[],
  });

  // Hero Section State
  const [heroForm, setHeroForm] = useState({
    kicker: 'OUR PORTFOLIO',
    titleLine1: 'Delivered Landmark',
    titleLine2: 'Industrial & Civil',
    titleGreen: 'Projects',
    subtitle: 'Explore landmark contracting executions, high-pressure piping installations, structural steel fabrication, and material supply delivered for Saudi Aramco, SABIC, SEC, and major EPC partners across',
    badge1Text: 'Safety Excellence',
    badge2Text: 'Aramco Certified',
    badge3Text: 'Kingdom Logistics',
    stat1Value: '150+',
    stat1Label: 'Projects Delivered',
    stat2Value: '100%',
    stat2Label: 'Aramco & ISO Compliant',
    stat3Value: 'SAR 500M+',
    stat3Label: 'Contracting Volume',
    bgImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80',
    overlayImageUrl: '',
  });

  const [savingHero, setSavingHero] = useState(false);
  const [heroSuccessMsg, setHeroSuccessMsg] = useState<string | null>(null);
  const [uploadingHeroBg, setUploadingHeroBg] = useState(false);
  const [heroMediaPickerOpen, setHeroMediaPickerOpen] = useState(false);
  const [showHeroEditor, setShowHeroEditor] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch('/api/admin/projects/hero');
      const data = await res.json();
      if (data.success && data.hero) {
        const h = data.hero;
        setHeroForm({
          kicker: h.kicker || 'OUR PORTFOLIO',
          titleLine1: h.titleLine1 || 'Delivered Landmark',
          titleLine2: h.titleLine2 || 'Industrial & Civil',
          titleGreen: h.titleGreen || 'Projects',
          subtitle: h.subtitle || '',
          badge1Text: h.badge1Text || 'Safety Excellence',
          badge2Text: h.badge2Text || 'Aramco Certified',
          badge3Text: h.badge3Text || 'Kingdom Logistics',
          stat1Value: h.stat1Value || '150+',
          stat1Label: h.stat1Label || 'Projects Delivered',
          stat2Value: h.stat2Value || '100%',
          stat2Label: h.stat2Label || 'Aramco & ISO Compliant',
          stat3Value: h.stat3Value || 'SAR 500M+',
          stat3Label: h.stat3Label || 'Contracting Volume',
          bgImageUrl: h.bgImageUrl || '',
          overlayImageUrl: h.overlayImageUrl || '',
        });
      }
    } catch (err) {
      console.error('Failed to load projects hero:', err);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    setHeroSuccessMsg(null);
    try {
      const res = await fetch('/api/admin/projects/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setHeroSuccessMsg('Projects Hero section settings updated successfully!');
        setTimeout(() => setHeroSuccessMsg(null), 4000);
      } else {
        alert(data.error || 'Failed to save projects hero settings.');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving projects hero settings.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleDirectHeroBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroBg(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.media?.fileUrl) {
        setHeroForm((prev) => ({ ...prev, bgImageUrl: data.media.fileUrl }));
        setHeroSuccessMsg(`Uploaded hero image "${file.name}"!`);
        setTimeout(() => setHeroSuccessMsg(null), 4000);
      } else {
        alert(data.error || 'Failed to upload image.');
      }
    } catch (err: any) {
      alert(err.message || 'Error uploading image.');
    } finally {
      setUploadingHeroBg(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      client: '',
      category: '',
      excerpt: '',
      content: '',
      coverImage: '',
      isFeatured: false,
      isPublished: true,
      sortOrder: projects.length + 1,
      images: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      slug: p.slug,
      client: p.client || '',
      category: p.category || '',
      excerpt: p.excerpt || '',
      content: p.content || '',
      coverImage: p.coverImage || '',
      isFeatured: p.isFeatured,
      isPublished: p.isPublished,
      sortOrder: p.sortOrder,
      images: (p.images || []).map((img) => img.mediaUrl),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          setProjects(projects.map((p) => (p.id === editingProject.id ? data.project : p)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          setProjects([...projects, data.project]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-8 max-w-7xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projects & Case Studies Management</h1>
          <p className="text-sm text-slate-500 mt-1">Showcase delivered client work, manage landing hero banner, and curate project portfolios.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHeroEditor(!showHeroEditor)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-emerald-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-xs"
          >
            <Edit3 className="w-4 h-4 text-emerald-600" />
            <span>{showHeroEditor ? 'Hide Hero Editor' : 'Edit Projects Hero'}</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition border border-indigo-700/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Hero Section Editor Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Projects Page Hero Banner Settings</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Customize kicker tag, title lines, subtitle paragraph, features badges, bottom statistics, and background showcase image on the public projects page.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowHeroEditor(!showHeroEditor)}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
          >
            {showHeroEditor ? 'Hide Form' : 'Edit Hero Content'}
          </button>
        </div>

        {heroSuccessMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{heroSuccessMsg}</span>
          </div>
        )}

        {showHeroEditor && (
          <form onSubmit={handleSaveHero} className="space-y-5 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kicker Tag
                </label>
                <input
                  type="text"
                  value={heroForm.kicker}
                  onChange={(e) => setHeroForm({ ...heroForm, kicker: e.target.value })}
                  placeholder="OUR PORTFOLIO"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Title Line 1 (White Text)
                </label>
                <input
                  type="text"
                  value={heroForm.titleLine1}
                  onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                  placeholder="Delivered Landmark"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Title Line 2
                </label>
                <input
                  type="text"
                  value={heroForm.titleLine2}
                  onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                  placeholder="Industrial & Civil"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Title Green Highlight
                </label>
                <input
                  type="text"
                  value={heroForm.titleGreen}
                  onChange={(e) => setHeroForm({ ...heroForm, titleGreen: e.target.value })}
                  placeholder="Projects"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtitle Paragraph
              </label>
              <textarea
                rows={2}
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                placeholder="Explore landmark contracting executions..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Feature Badge 1
                </label>
                <input
                  type="text"
                  value={heroForm.badge1Text}
                  onChange={(e) => setHeroForm({ ...heroForm, badge1Text: e.target.value })}
                  placeholder="Safety Excellence"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Feature Badge 2
                </label>
                <input
                  type="text"
                  value={heroForm.badge2Text}
                  onChange={(e) => setHeroForm({ ...heroForm, badge2Text: e.target.value })}
                  placeholder="Aramco Certified"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Feature Badge 3
                </label>
                <input
                  type="text"
                  value={heroForm.badge3Text}
                  onChange={(e) => setHeroForm({ ...heroForm, badge3Text: e.target.value })}
                  placeholder="Kingdom Logistics"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Bottom Statistics Row */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Bottom Banner Statistics Counter Badges</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Stat 1 Label</label>
                    <input
                      type="text"
                      value={heroForm.stat1Label}
                      onChange={(e) => setHeroForm({ ...heroForm, stat1Label: e.target.value })}
                      placeholder="Projects Delivered"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Stat 1 Value</label>
                    <input
                      type="text"
                      value={heroForm.stat1Value}
                      onChange={(e) => setHeroForm({ ...heroForm, stat1Value: e.target.value })}
                      placeholder="150+"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Stat 2 Label</label>
                    <input
                      type="text"
                      value={heroForm.stat2Label}
                      onChange={(e) => setHeroForm({ ...heroForm, stat2Label: e.target.value })}
                      placeholder="Aramco & ISO Compliant"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Stat 2 Value</label>
                    <input
                      type="text"
                      value={heroForm.stat2Value}
                      onChange={(e) => setHeroForm({ ...heroForm, stat2Value: e.target.value })}
                      placeholder="100%"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Stat 3 Label</label>
                    <input
                      type="text"
                      value={heroForm.stat3Label}
                      onChange={(e) => setHeroForm({ ...heroForm, stat3Label: e.target.value })}
                      placeholder="Contracting Volume"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Stat 3 Value</label>
                    <input
                      type="text"
                      value={heroForm.stat3Value}
                      onChange={(e) => setHeroForm({ ...heroForm, stat3Value: e.target.value })}
                      placeholder="SAR 500M+"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Background Image Upload & Media Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Hero Showcase Image URL & Direct Upload
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={heroForm.bgImageUrl}
                  onChange={(e) => setHeroForm({ ...heroForm, bgImageUrl: e.target.value })}
                  placeholder="https://... or /uploads/..."
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <label className="px-4 py-2 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition shadow-xs">
                  {uploadingHeroBg ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>{uploadingHeroBg ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDirectHeroBgUpload}
                    disabled={uploadingHeroBg}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setHeroMediaPickerOpen(true)}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#008738] text-xs font-bold rounded-xl flex items-center gap-1.5 transition border border-emerald-200"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Media</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingHero}
                className="px-6 py-2.5 bg-[#008738] hover:bg-[#00702e] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition disabled:opacity-50"
              >
                {savingHero ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Hero...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Projects Hero Section</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-base font-medium text-slate-700">No projects added yet</p>
          <p className="text-xs text-slate-400 mt-1">Create your first case study to showcase on the portfolio page.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Project</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Featured</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {project.coverImage ? (
                        <img src={project.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                          {project.title.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-900">{project.title}</p>
                        <p className="text-xs font-mono text-slate-400">{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">
                    <span className="px-2 py-0.5 bg-slate-100 rounded-md">{project.category || 'General'}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600">{project.client || '—'}</td>
                  <td className="px-6 py-4">
                    {project.isFeatured ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {project.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="e.g. Aura Corp"
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Enterprise Software, Fintech, E-Commerce"
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Short Excerpt
                  </label>
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Case Study Narrative
                  </label>
                  <textarea
                    rows={5}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cover Image
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      placeholder="/uploads/... or https://..."
                      className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaTarget('cover')}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Choose</span>
                    </button>
                  </div>
                  {form.coverImage && (
                    <div className="mt-2 p-1 bg-slate-50 rounded-lg inline-block border border-slate-200">
                      <img src={form.coverImage} alt="Cover preview" className="h-16 object-cover rounded" />
                    </div>
                  )}
                </div>

                {/* Additional gallery images */}
                <div className="md:col-span-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Project Screenshots / Gallery Images ({form.images.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => setMediaTarget('gallery')}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Gallery Image
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {form.images.map((imgUrl, i) => (
                      <div key={i} className="relative group w-20 h-20 rounded-lg border border-slate-200 overflow-hidden">
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) })}
                          className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded hover:bg-red-600 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2 md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Featured on Homepage</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={mediaTarget !== null}
        onClose={() => setMediaTarget(null)}
        onSelect={(url) => {
          if (mediaTarget === 'cover') setForm({ ...form, coverImage: url });
          if (mediaTarget === 'gallery') setForm({ ...form, images: [...form.images, url] });
        }}
        title="Select Project Image"
      />

      <MediaPickerModal
        isOpen={heroMediaPickerOpen}
        onClose={() => setHeroMediaPickerOpen(false)}
        onSelect={(url) => setHeroForm({ ...heroForm, bgImageUrl: url })}
        title="Select Projects Hero Image from Server"
      />
    </div>
  );
}
