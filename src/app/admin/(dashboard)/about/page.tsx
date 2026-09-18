'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Save, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

export default function AboutPageAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mediaTarget, setMediaTarget] = useState<'main' | 'secondary' | null>(null);

  const [form, setForm] = useState({
    heading: '',
    subheading: '',
    story: '',
    mission: '',
    vision: '',
    experienceYears: '',
    imageUrl: '',
    secondaryImageUrl: '',
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about');
      const data = await res.json();
      if (data.success && data.about) {
        const a = data.about;
        setForm({
          heading: a.heading || '',
          subheading: a.subheading || '',
          story: a.story || '',
          mission: a.mission || '',
          vision: a.vision || '',
          experienceYears: a.experienceYears || '',
          imageUrl: a.imageUrl || '',
          secondaryImageUrl: a.secondaryImageUrl || '',
        });
      }
    } catch (err) {
      console.error('Failed to load about page:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('About page details updated in MySQL!');
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
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
    <div className="p-8 max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">About Page Content</h1>
        <p className="text-sm text-slate-500 mt-1">Manage company background, narrative, mission, and leadership images.</p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Introduction</h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Main Heading *
            </label>
            <input
              type="text"
              required
              value={form.heading}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Subheading
            </label>
            <textarea
              rows={2}
              value={form.subheading}
              onChange={(e) => setForm({ ...form, subheading: e.target.value })}
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Years in Business
            </label>
            <input
              type="text"
              value={form.experienceYears}
              onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
              placeholder="e.g. 8+"
              className="w-48 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Company Narrative & Pillars</h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Our Story (Markdown or Paragraphs)
            </label>
            <textarea
              rows={6}
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-xs"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Our Mission
              </label>
              <textarea
                rows={4}
                value={form.mission}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Our Vision
              </label>
              <textarea
                rows={4}
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Primary Studio Image
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/uploads/... or https://..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('main')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose</span>
                </button>
              </div>
              {form.imageUrl && (
                <div className="mt-2 p-2 bg-slate-50 rounded-lg inline-block border border-slate-200 max-w-xs">
                  <img src={form.imageUrl} alt="About Preview" className="h-24 object-cover rounded" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Secondary Image
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={form.secondaryImageUrl}
                  onChange={(e) => setForm({ ...form, secondaryImageUrl: e.target.value })}
                  placeholder="/uploads/... or https://..."
                  className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMediaTarget('secondary')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose</span>
                </button>
              </div>
              {form.secondaryImageUrl && (
                <div className="mt-2 p-2 bg-slate-50 rounded-lg inline-block border border-slate-200 max-w-xs">
                  <img src={form.secondaryImageUrl} alt="Secondary Preview" className="h-24 object-cover rounded" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to MySQL...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save About Page</span>
              </>
            )}
          </button>
        </div>
      </form>

      <MediaPickerModal
        isOpen={mediaTarget !== null}
        onClose={() => setMediaTarget(null)}
        onSelect={(url) => {
          if (mediaTarget === 'main') setForm({ ...form, imageUrl: url });
          if (mediaTarget === 'secondary') setForm({ ...form, secondaryImageUrl: url });
        }}
        title="Select About Page Image"
      />
    </div>
  );
}
