'use client';

import React, { useState, useEffect } from 'react';
import { Search, Save, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import MediaPickerModal from '@/components/admin/MediaPickerModal';

interface SeoItem {
  id: number;
  pageKey: string;
  metaTitle: string;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
}

const PAGE_KEYS = [
  { key: 'home', label: 'Homepage' },
  { key: 'about', label: 'About Us Page' },
  { key: 'services', label: 'Services Page' },
  { key: 'projects', label: 'Projects & Portfolio' },
  { key: 'gallery', label: 'Gallery Page' },
  { key: 'blog', label: 'Blog Listing' },
  { key: 'contact', label: 'Contact Page' },
];

export default function SeoSettingsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [seoMap, setSeoMap] = useState<Record<string, SeoItem>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  useEffect(() => {
    fetchSeoList();
  }, []);

  const fetchSeoList = async () => {
    try {
      const res = await fetch('/api/admin/seo-settings');
      const data = await res.json();
      if (data.success && data.seoList) {
        const map: Record<string, SeoItem> = {};
        data.seoList.forEach((item: SeoItem) => {
          map[item.pageKey] = item;
        });
        setSeoMap(map);
      }
    } catch (err) {
      console.error('Failed to load SEO:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentItem = seoMap[activeTab] || {
    id: 0,
    pageKey: activeTab,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogImage: '',
    canonicalUrl: '',
  };

  const updateCurrentField = (field: keyof SeoItem, value: string) => {
    setSeoMap((prev) => ({
      ...prev,
      [activeTab]: {
        ...currentItem,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/admin/seo-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`SEO settings for "${activeTab}" saved to MySQL!`);
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error('Save SEO error:', err);
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
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SEO & Open Graph Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage search engine optimization and social preview cards per page.</p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {PAGE_KEYS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActiveTab(p.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
              activeTab === p.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Meta Tags ({PAGE_KEYS.find((p) => p.key === activeTab)?.label})
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Meta Title *
            </label>
            <input
              type="text"
              required
              value={currentItem.metaTitle || ''}
              onChange={(e) => updateCurrentField('metaTitle', e.target.value)}
              placeholder="e.g. Services - Seko Agency"
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">Recommended: 50-60 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={currentItem.metaDescription || ''}
              onChange={(e) => updateCurrentField('metaDescription', e.target.value)}
              placeholder="Brief summary displayed in Google search results..."
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">Recommended: 120-160 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Meta Keywords (comma separated)
            </label>
            <input
              type="text"
              value={currentItem.metaKeywords || ''}
              onChange={(e) => updateCurrentField('metaKeywords', e.target.value)}
              placeholder="web development, agency, nextjs, mysql"
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Open Graph (OG) Share Image
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={currentItem.ogImage || ''}
                onChange={(e) => updateCurrentField('ogImage', e.target.value)}
                placeholder="/uploads/... or https://..."
                className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setMediaModalOpen(true)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Media Library</span>
              </button>
            </div>
            {currentItem.ogImage && (
              <div className="mt-2 p-2 bg-slate-50 rounded-lg inline-block border border-slate-200 max-w-xs">
                <img src={currentItem.ogImage} alt="OG Preview" className="h-20 object-cover rounded" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Canonical URL (Optional)
            </label>
            <input
              type="url"
              value={currentItem.canonicalUrl || ''}
              onChange={(e) => updateCurrentField('canonicalUrl', e.target.value)}
              placeholder="https://example.com/services"
              className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
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
                <span>Save SEO Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      <MediaPickerModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => updateCurrentField('ogImage', url)}
        title="Select Open Graph Image"
      />
    </div>
  );
}
